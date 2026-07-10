---
title: 'Le setup serveur que j''utilise pour chaque nouvelle machine'
description: 'Procédure complète pour sécuriser un serveur Ubuntu fraîchement installé : clé SSH, utilisateur dédié, Docker, fail2ban, MAJ automatiques et MOTD.'
tags: ['linux', 'ssh', 'docker', 'security', 'sysadmin']
publishedAt: 2026-07-10
lang: 'fr'
urlSlug: 'setup-new-server'
---

# Remettre son tech lab au propre : le setup serveur que j'utilise maintenant

Après avoir enchaîné les serveurs jetables, mal configurés, réinstallés à la va-vite après un premier `sudo apt install` foireux, j'ai fini par écrire une bonne fois pour toutes la procédure que je suis à chaque nouveau serveur. Rien de révolutionnaire, mais c'est exactement ce genre de base "propre" qu'on repousse toujours à plus tard, jusqu'au jour où un mot de passe un peu trop simple finit par céder.

Voici donc comment je pars d'un Ubuntu fraîchement installé, accessible en root avec un mot de passe, pour arriver à quelque chose de sain : accès uniquement par clé SSH, utilisateur dédié, Docker opérationnel, et un minimum de durcissement (fail2ban, MAJ de sécurité automatiques, MOTD qui donne un vrai coup d'œil sur l'état de la machine).

## Étape 1 : la clé SSH, sur ma machine

Tout commence en local, pas sur le serveur. Si je n'ai pas déjà de clé pour ce projet, j'en génère une nouvelle en ed25519, plus compact et plus solide que du RSA.

**Sous Linux ou macOS**, dans un terminal :

```bash
ssh-keygen -t ed25519 -C "sonny@techlab"
```

Je garde le chemin par défaut (`~/.ssh/id_ed25519`), sauf si je veux une clé dédiée à cette machine précise. Je mets toujours une passphrase, et je l'ajoute à mon ssh-agent pour ne pas la retaper à chaque connexion :

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

**Sous Windows**, depuis Windows 10/11, le client OpenSSH est intégré nativement. Il suffit d'ouvrir PowerShell et de lancer exactement la même commande :

```powershell
ssh-keygen -t ed25519 -C "sonny@techlab"
```

La clé est générée dans `C:\Users\<toncompte>\.ssh\id_ed25519`. Pour l'ajouter à l'agent SSH (parfois désactivé par défaut sur Windows) :

```powershell
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent
ssh-add $env:USERPROFILE\.ssh\id_ed25519
```

Si `ssh-keygen` n'est pas reconnu, c'est que le client OpenSSH n'est pas installé : `Paramètres > Applications > Fonctionnalités facultatives > Ajouter une fonctionnalité > Client OpenSSH`. Alternative plus visuelle pour ceux qui préfèrent une interface graphique : PuTTYgen, l'outil de génération de clés fourni avec PuTTY.

## Étape 2 : un utilisateur qui n'est pas root

Se connecter en root en permanence, c'est le genre d'habitude qu'on regrette le jour où un script mal écrit fait n'importe quoi avec les pleins pouvoirs. Je crée donc un utilisateur dédié, `sonny` :

```bash
ssh root@IP_DU_SERVEUR
adduser sonny
usermod -aG sudo sonny
```

Petit test pour être sûr que ça fonctionne avant d'aller plus loin :

```bash
su - sonny
sudo whoami   # doit renvoyer "root"
```

## Étape 3 : envoyer ma clé sur le serveur

Toujours depuis ma machine locale, jamais depuis le serveur :

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub sonny@IP_DU_SERVEUR
```

Si `ssh-copy-id` n'est pas disponible, la version manuelle fait exactement la même chose :

```bash
cat ~/.ssh/id_ed25519.pub | ssh sonny@IP_DU_SERVEUR "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

Et surtout : je teste la connexion par clé **avant** de toucher à quoi que ce soit d'autre.

```bash
ssh sonny@IP_DU_SERVEUR
```

## Étape 4 : Docker et Docker Compose

Rien de compliqué ici, le script officiel fait le travail proprement :

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

Le plugin `docker compose` (v2) arrive automatiquement avec. Un `docker compose version` suffit à confirmer.

Ce qui compte vraiment, c'est la partie post-installation, souvent oubliée alors qu'elle est documentée noir sur blanc par Docker :
👉 https://docs.docker.com/engine/install/linux-postinstall/

Deux choses à retenir de ce guide :

```bash
# Pouvoir lancer docker sans sudo
sudo usermod -aG docker sonny
# (il faut se reconnecter, ou faire "newgrp docker")

# Démarrage automatique au boot
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```

Vérification finale :

```bash
docker run hello-world
```

## Étape 5 : fermer la porte à root et aux mots de passe

C'est l'étape où on peut se faire vraiment mal si on va trop vite. **Je ne la fais qu'après avoir confirmé que la connexion par clé avec `sonny` fonctionne.** Sinon, c'est le genre d'erreur qui coûte un aller-retour chez l'hébergeur pour une console de secours.

```bash
sudo nano /etc/ssh/sshd_config
```

Les lignes à avoir :

```
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
ChallengeResponseAuthentication no
```

Je vérifie aussi qu'aucun fichier dans `/etc/ssh/sshd_config.d/` ne vient écraser ça :

```bash
grep -r "PasswordAuthentication\|PermitRootLogin" /etc/ssh/sshd_config.d/ 2>/dev/null
```

Avant de redémarrer le service, je teste la syntaxe, ça évite bien des sueurs froides :

```bash
sudo sshd -t
sudo systemctl restart sshd
```

Et surtout : j'ouvre une **nouvelle** session SSH sans fermer celle en cours, pour vérifier que tout va bien avant de couper le fil qui me relie encore au serveur.

## Étape 6 : fail2ban, parce que les bots ne se fatiguent jamais

Dès qu'un serveur est exposé sur Internet, les tentatives de connexion SSH commencent en quelques minutes. Fail2ban ne remplace pas une bonne configuration, mais il bannit automatiquement les IP trop insistantes.

```bash
sudo apt update
sudo apt install -y fail2ban
```

Je configure toujours dans un `jail.local`, jamais dans `jail.conf` qui sera écrasé à la moindre mise à jour :

```bash
sudo tee /etc/fail2ban/jail.local > /dev/null <<'EOF'
[DEFAULT]
bantime  = 1h
findtime = 10m
maxretry = 5
backend  = systemd

[sshd]
enabled  = true
port     = ssh
logpath  = %(sshd_log)s
backend  = %(sshd_backend)s
EOF

sudo systemctl enable fail2ban
sudo systemctl restart fail2ban
```

Pour vérifier que ça tourne et voir les bans en cours :

```bash
sudo fail2ban-client status sshd
```

## Étape 7 : un MOTD qui sert vraiment à quelque chose

Le MOTD par défaut d'Ubuntu, avec ses pubs pour ESM et ses infos génériques, ne m'apprend rien. J'ai fini par écrire le mien, qui affiche d'un coup d'œil la dernière connexion, l'état de la RAM, du disque, et l'uptime.

```bash
sudo apt install -y figlet

sudo tee /etc/update-motd.d/99-custom > /dev/null <<'EOF'
#!/bin/bash
LAST_IP=$(last -n 2 $USER | awk 'NR==2{print $3}')
LAST_DATE=$(last -n 2 $USER | awk 'NR==2{print $4, $5, $6, $7}')
echo "$(figlet $(logname | sed 's/./\u&/'))"
echo -e "\e[44m\e[97m  🔐 Dernière connexion : $LAST_DATE depuis $LAST_IP  \e[0m"
echo ""
echo "📅 $(date)"
echo "🖥️  $(hostname | sed 's/./\u&/') — Linux $(uname -r)"
echo "💾 RAM : $(free -h | awk '/Mem/{print $3"/"$2}') ($(free | awk '/Mem/{printf "%.0f%%", $3/$2*100}'))"
echo "💿 Disque : $(df -h / | awk 'NR==2{print $3"/"$2" ("$5")"}')"
echo "🌡️  Uptime : $(uptime -p)"
echo ""
EOF
sudo chmod +x /etc/update-motd.d/99-custom
```

Si je veux un affichage vraiment épuré, sans les scripts par défaut d'Ubuntu qui s'ajoutent au mien :

```bash
sudo chmod -x /etc/update-motd.d/10-help-text
sudo chmod -x /etc/update-motd.d/50-motd-news
sudo chmod -x /etc/update-motd.d/91-release-upgrade
```

Pas besoin de se reconnecter pour voir le résultat :

```bash
run-parts /etc/update-motd.d/
```

## Étape 8 : les mises à jour de sécurité, sans y penser

C'est probablement l'étape la plus sous-estimée. Un serveur qu'on oublie de mettre à jour finit tôt ou tard par traîner une faille connue. `unattended-upgrades` applique automatiquement les correctifs de sécurité, sans intervention manuelle.

```bash
sudo apt update
sudo apt install -y unattended-upgrades apt-listchanges
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

Je vérifie ensuite la configuration :

```bash
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```

L'essentiel à avoir décommenté (généralement déjà le cas par défaut sur Ubuntu) :

```
Unattended-Upgrade::Allowed-Origins {
        "${distro_id}:${distro_codename}-security";
        "${distro_id}ESMApps:${distro_codename}-apps-security";
        "${distro_id}ESM:${distro_codename}-infra-security";
};

Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "false";
```

Je laisse volontairement `Automatic-Reboot` à `false` : sur une machine qui fait tourner des conteneurs, je préfère garder la main sur les redémarrages plutôt que de me retrouver avec des services coupés en pleine nuit.

Un dernier détail à vérifier, dans `/etc/apt/apt.conf.d/20auto-upgrades` :

```
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
```

Et pour être sûr que tout est bien branché, un test à blanc :

```bash
sudo unattended-upgrade --dry-run --debug
```

## Ce que ça donne au final

Une fois ces huit étapes passées, j'ai un serveur qui :

- n'accepte plus de connexion en root ni par mot de passe,
- bannit automatiquement les IP qui insistent trop sur SSH,
- applique ses correctifs de sécurité sans que j'aie à y penser,
- m'affiche un vrai résumé de son état à chaque connexion,
- et fait tourner Docker proprement, prêt à accueillir les projets.

C'est loin d'être exhaustif niveau sécurité (il reste encore le firewall, le monitoring, les backups à ajouter), mais c'est la base sur laquelle je construis maintenant tous mes serveurs, et elle me fait gagner un temps fou à chaque nouvelle machine.
