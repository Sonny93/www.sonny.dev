---
title: 'Cacher l''IP de mon VPS derrière Cloudflare, sans changer d''hébergeur DNS'
description: 'Comment passer un domaine derrière le proxy Cloudflare pour masquer l''IP réelle de son serveur, quel que soit le registrar, avec le durcissement ufw qui va avec.'
tags: ['cloudflare', 'dns', 'docker', 'security', 'sysadmin']
publishedAt: 2026-07-11
lang: 'fr'
urlSlug: 'cloudflare-proxy-vps'
---

# Cacher l'IP de mon VPS derrière Cloudflare, sans changer d'hébergeur DNS

Objectif simple : mon domaine reste enregistré chez mon registrar habituel, mais personne ne doit tomber sur l'IP réelle de mon VPS en résolvant `mondomaine.fr`. Pas besoin d'un tunnel sortant façon Cloudflare Tunnel ici, juste le proxy Cloudflare classique, le petit nuage orange, qui s'intercale entre le monde et mon serveur.

Un point à clarifier avant de commencer : le proxy Cloudflare n'est pas une option qu'on active sur une zone DNS restée chez le registrar d'origine. C'est une fonctionnalité propre aux zones **actives** sur Cloudflare, ce qui veut dire déléguer les nameservers du domaine à Cloudflare. Le domaine reste acheté et enregistré là où il l'était (OVH, Gandi, Namecheap, peu importe), seule la gestion de la zone DNS change de mains. La démarche est identique quel que soit le registrar, seul l'écran où on va modifier les nameservers change.

## Étape 1 : ajouter le domaine à Cloudflare

Compte Cloudflare gratuit, **Add a site**, on saisit le domaine. Cloudflare scanne les enregistrements existants (import automatique de la zone en place, à vérifier quand même, l'import loupe parfois des entrées exotiques type SPF/DKIM) et donne deux nameservers à renseigner.

## Étape 2 : changer les nameservers chez le registrar

Dans l'interface du registrar (chez OVH : Manager → fiche du domaine → **Serveurs DNS**), remplacer les nameservers actuels par les deux donnés par Cloudflare. Propagation en général sous quelques heures, parfois jusqu'à 24-48h.

Vérification que le changement a bien pris :

```bash
dig NS mondomaine.fr +short
```

Cloudflare envoie aussi un mail dès que la zone passe active.

## Étape 3 : l'enregistrement A, proxié

Dans le dashboard Cloudflare, DNS de la zone, un enregistrement `A` classique vers l'IP publique du VPS :

```
Type  : A
Nom   : @ (ou sous-domaine)
IPv4  : IP_DU_VPS
Proxy : activé (nuage orange)
```

Nuage orange = trafic public passe par Cloudflare, IP du VPS jamais exposée dans la résolution DNS. Nuage gris = DNS classique, IP visible en clair, pas de protection.

Même logique pour un enregistrement `AAAA` si le VPS a une IPv6 publique : le proxifier aussi, ou ne pas le publier du tout. Un `AAAA` non proxifié annule tout l'intérêt de masquer l'IPv4, puisqu'il pointe directement vers l'origine.

## Étape 4 : SSL/TLS en Full (strict), pas en Flexible

Dans **SSL/TLS** → mode **Full (strict)**. Le mode Flexible (par défaut sur certains comptes) chiffre uniquement entre le visiteur et Cloudflare : le tronçon Cloudflare → VPS repart en HTTP clair, ce qui casse une bonne partie de l'intérêt de la manip et peut même provoquer des boucles de redirection si l'appli force HTTPS côté origine.

Pour du Full strict, il faut un certificat valide côté serveur. Deux options :

- Let's Encrypt classique (déjà en place si Traefik ou nginx en gère un) ;
- plus adapté à ce cas précis : le [certificat Origin CA de Cloudflare](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/), généré depuis le dashboard, valide 15 ans, reconnu uniquement par Cloudflare (normal, il ne sert qu'au tronçon edge → origine).

## Étape 5 : ufw, ne laisser entrer que Cloudflare

Le nuage orange masque l'IP tant qu'elle reste secrète. Si elle fuite (ancien enregistrement en cache, scan de plage IP, historique whois d'avant la migration), n'importe qui la contacte en direct et contourne Cloudflare entièrement. Pour fermer ça pour de bon : n'accepter le trafic 80/443 que depuis les [plages IP de Cloudflare](https://www.cloudflare.com/ips/).

Ça doit couvrir l'IPv6 aussi, pas seulement l'IPv4 : une IPv6 publique sur le VPS est joignable en soi, indépendamment de l'enregistrement DNS qui pointe vers l'IPv4. Soit on filtre les plages IPv6 de la même façon que les plages IPv4, soit on désactive l'IPv6 publique sur le serveur si rien n'en a besoin.

**Si le service tourne nativement** (pas de Docker), une règle ufw classique suffit, elle passe par la chaîne `INPUT` :

```bash
for ip in $(curl -s https://www.cloudflare.com/ips-v4); do
  sudo ufw allow from "$ip" to any port 443 proto tcp
done
for ip in $(curl -s https://www.cloudflare.com/ips-v6); do
  sudo ufw allow from "$ip" to any port 443 proto tcp
done
sudo ufw deny 443/tcp
```

Même logique pour le port 80 si le service en a besoin directement (redirection HTTP→HTTPS publique, challenge ACME) : répéter les deux mêmes boucles avec le port 80 à la place de 443.

**Si le service est publié via Docker** (`ports: - "443:443"`), une règle ufw classique ne suffit pas : comme détaillé dans [mon setup serveur](/fr/blog/setup-new-server), Docker route ce trafic via la chaîne `DOCKER-USER`, en amont d'ufw, donc `ufw allow`/`ufw deny` n'ont aucun effet dessus. Il faut la variante `route`, celle qu'ufw-docker respecte :

```bash
for ip in $(curl -s https://www.cloudflare.com/ips-v4); do
  sudo ufw route allow proto tcp from "$ip" to any port 443
done
for ip in $(curl -s https://www.cloudflare.com/ips-v6); do
  sudo ufw route allow proto tcp from "$ip" to any port 443
done
```

Sans `ufw-docker` installé (voir l'étape 6 du post précédent), le port reste de toute façon ouvert à tout le monde par défaut dès qu'il est publié. La restriction par IP n'a de sens que combinée à `ufw-docker`, qui ferme d'abord tout, avant qu'on autorise sélectivement les plages Cloudflare.

**Piège si le service tournait déjà avant cette migration** : si le conteneur était exposé via `sudo ufw-docker allow mon-service 443` (la commande de l'étape 6 du post précédent), cette règle reste en place et autorise **tout Internet**, pas seulement Cloudflare. ufw évalue ses règles dans l'ordre d'ajout, la première qui matche gagne : ce vieux `ALLOW FWD ... Anywhere` passe avant les nouvelles règles Cloudflare et les rend inopérantes, sans aucune erreur ni avertissement, l'IP reste joignable en direct comme si de rien n'était. Vérifier et virer cette règle avant de faire confiance à la restriction :

```bash
sudo ufw status numbered
sudo ufw-docker delete allow mon-service 443
```

Même piège avec le port 80 si `ufw-docker allow mon-service 80` a déjà été fait. Deux choix : fermer 80 complètement (`sudo ufw-docker delete allow mon-service 80`, sans rien remettre à la place), viable si le TLS est géré entièrement par Cloudflare et qu'aucun renouvellement de certificat côté origine ne dépend d'un challenge HTTP-01 ; ou le restreindre aux plages Cloudflare comme le 443, si le reverse proxy en a besoin (redirection HTTP→HTTPS publique, challenge ACME) :

```bash
for ip in $(curl -s https://www.cloudflare.com/ips-v4); do
  sudo ufw route allow proto tcp from "$ip" to any port 80
done
for ip in $(curl -s https://www.cloudflare.com/ips-v6); do
  sudo ufw route allow proto tcp from "$ip" to any port 80
done
```

Les plages IP de Cloudflare changent occasionnellement. Un cron qui régénère les règles évite de se retrouver bloqué le jour où elles bougent :

```bash
sudo tee /etc/cron.d/cloudflare-ips > /dev/null <<'EOF'
0 4 * * 0 root curl -s https://www.cloudflare.com/ips-v4 -o /etc/cloudflare-ipv4.txt
0 4 * * 0 root curl -s https://www.cloudflare.com/ips-v6 -o /etc/cloudflare-ipv6.txt
EOF
```

(Le script de ré-application des règles ufw à partir de ce fichier dépend de la façon dont chaque service est publié, je le garde donc en dehors du cron pour éviter de faire tourner des `ufw route allow` en boucle sans contrôle.)

## Étape 6 : vérifier

Test depuis l'extérieur :

```bash
curl -I https://mondomaine.fr
```

Et surtout, vérifier que l'IP réelle du VPS ne répond plus en direct si on la contacte à la main (à condition qu'elle n'ait pas déjà fuité avant la mise en place ; sinon, rien n'empêche de la retrouver dans un historique DNS type SecurityTrails ou crt.sh, la seule vraie parade étant la restriction ufw de l'étape 5) :

```bash
curl -I --resolve mondomaine.fr:443:IP_DU_VPS https://mondomaine.fr
# doit timeout ou être refusé, pas répondre normalement
```

## Ce que j'y gagne, ce que j'y perds

Je gagne : IP réelle masquée tant qu'elle ne fuite pas, protection DDoS de base incluse gratuitement, un WAF basique activable, et un cache pour le contenu statique. Je perds : la gestion DNS n'est plus chez mon registrar d'origine mais chez Cloudflare (l'interface est de toute façon plus agréable), et je dépends d'un service tiers entre mes visiteurs et mon serveur : si Cloudflare a un incident, mon site aussi.
