---
title: "Créer son propre netflix à la maison"
description: "Guide très simple pour créer son propre netflix à la maison. Docker, Jellyfin, Prowlarr, Jackett, Radarr, Sonarr, Jellyseer."
tags: ["docker","jellyfin","homelab","medias"]
publishedAt: 2025-11-05
---
## 1️⃣ Réseau Docker partagé

Créer le réseau unique pour que tous les conteneurs puissent communiquer :

```bash
docker network create media_net
```

Tous tes conteneurs (`qbittorrent`, `radarr`, `sonarr`, `jackett`, `flaresolverr`, `prowlarr`, `jellyfin`, `jellyseer`) doivent être dans ce réseau :

```yaml
networks:
  media_net:
    external: true
```

---

## 🔹 2️⃣ qBittorrent

**Rôle** → client torrent principal utilisé par Radarr/Sonarr.

**Accès Web** → [http://192.168.200.57:8080](http://192.168.200.57:8080/)

**Docker service name** → `qbittorrent`

### Configuration :

1. Identifiants :
   - **Username** : `media`
   - **Password** : `supersecure123`
2. Dans _Web UI settings_ :
   - Coche **Bypass authentication for clients on localhost**

     → pour que les conteneurs Docker puissent s’y connecter.

3. Téléchargements :
   - Dossier : `/downloads` (déjà monté sur `/srv/media/downloads`)

---

## 🔹 3️⃣ Radarr et Sonarr

**Radarr (films)** → [http://192.168.200.57:7878](http://192.168.200.57:7878/)

**Sonarr (séries)** → [http://192.168.200.57:8989](http://192.168.200.57:8989/)

### Configuration commune :

1. Copie la **clé API** dans chaque service (_Settings → General → API Key_).
2. Ajoute qBittorrent comme client torrent :

   ```
   Host : qbittorrent
   Port : 8080
   Username : media
   Password : supersecure123
   ```

   → “Connection succeeded”.

3. Dossiers :
   - Radarr → `/movies`
   - Sonarr → `/tv`
4. (Optionnel) Active l’authentification HTTP basique si tu exposes les services.

---

## 🔹 4️⃣ FlareSolverr

**Rôle** → contourne Cloudflare et les captchas.

**URL interne** → `http://flaresolverr:8191`

Aucune configuration spécifique.

Vérifie seulement qu’il est bien dans le réseau `media_net`.

---

## 🔹 5️⃣ Prowlarr (jusqu’à la configuration du proxy)

**Accès** → [http://192.168.200.57:9696](http://192.168.200.57:9696/)

**URL interne Docker** → `http://prowlarr:9696`

### Configuration :

1. Copie la **clé API** (_Settings → General_).
2. Va dans _Settings → Indexers → Indexer Proxies → + Add Proxy_

   → choisis **FlareSolverr**

   ```
   Host : http://flaresolverr:8191
   ```

   → “Connection succeeded” puis **Save**.

3. Va dans _Settings → Apps → + Add Application_
   - **Radarr**

     ```
     URL : http://radarr:7878
     API Key : <clé radarr>
     Server URL : http://prowlarr:9696
     Sync Level : Full Sync
     ```

   - **Sonarr**

     ```
     URL : http://sonarr:8989
     API Key : <clé sonarr>
     Server URL : http://prowlarr:9696
     Sync Level : Full Sync
     ```

   → Tests ✅ “Success”.

---

## 🔹 6️⃣ Jackett

**Accès** → [http://192.168.200.57:9117](http://192.168.200.57:9117/)

**URL interne Docker** → `http://jackett:9117`

### Configuration :

1. Ajoute FlareSolverr dans Jackett pour YGG :
   - _Settings → Configuration → Advanced_

     ```
     Proxy Type : HTTP
     Proxy Host : flaresolverr
     Proxy Port : 8191
     ```

     → Save.

2. Ajoute le tracker **YGGtorrent** :
   - Configure ton compte ou cookies.
   - Test → ✅ OK.
3. Copie la **clé API Jackett** (haut de page d’accueil).
4. Dans Jackett → vérifie que YGG donne bien des résultats de recherche.

---

## 🔹 7️⃣ Retour sur Prowlarr (intégration Jackett)

### Ajout de Jackett comme indexeur Torznab :

1. _Settings → Indexers → + Add Indexer → Torznab → Custom_
2. Renseigne :

   ```
   Name : Jackett-YGG
   URL : http://jackett:9117/api/v2.0/indexers/yggtorrent/results/torznab/
   API Key : <clé API Jackett>
   ```

   ⚠️ Note bien le `/torznab/` **avec le slash final**.

3. Test → ✅ “Connection succeeded”.
4. Sauvegarde.
5. Vérifie que les catégories (Movies / TV) sont activées.

---

## 🔹 8️⃣ Jellyfin — récupération de la clé API

**Accès** → [http://192.168.200.57:8096](http://192.168.200.57:8096/)

**URL interne Docker** → `http://jellyfin:8096`

### Étapes :

1. Connecte-toi en admin.
2. _Dashboard → Avancé → Clés API → + Créer une clé_
   - Nom : `Jellyseer`
3. Copie cette **clé API** (tu en auras besoin dans Jellyseer).

---

## 🔹 9️⃣ Jellyseer

**Accès** → [http://192.168.200.57:5055](http://192.168.200.57:5055/)

**URL interne Docker** → `http://jellyseer:5055`

### Étape 1 — Connexion à Jellyfin

Dans le setup :

| Champ        | Valeur                   |
| ------------ | ------------------------ |
| Jellyfin URL | `http://jellyfin`        |
| Port         | `8096`                   |
| Use SSL      | ❌                       |
| URL Base     | _(laisser vide)_         |
| Username     | ton utilisateur Jellyfin |
| Password     | mot de passe Jellyfin    |

→ Clique **Sign In** → passe à l’étape suivante.

---

### Étape 2 — Configurer les services

### **Radarr**

```
Hostname : http://radarr:7878
API Key : <clé Radarr>
Root Folder : /movies
Profile : HD-1080p (ou autre)
Enable Server : ✅
```

### **Sonarr**

```
Hostname : http://sonarr:8989
API Key : <clé Sonarr>
Root Folder : /tv
Profile : HD-1080p (ou autre)
Enable Server : ✅
```

### **Prowlarr (optionnel mais recommandé)**

```
Hostname : http://prowlarr:9696
API Key : <clé Prowlarr>
Enable Server : ✅
```

### **Jellyfin**

Déjà connecté précédemment (via login ou API key).

→ Clique sur **Test Connection** pour chaque service → tous ✅.

→ Clique sur **Save / Next**.

---

# ✅ Résumé global

| Service      | URL interne Docker | Port | Clé API utilisée | Note                  |
| ------------ | ------------------ | ---- | ---------------- | --------------------- |
| qBittorrent  | qbittorrent        | 8080 | —                | Bypass local auth     |
| Radarr       | radarr             | 7878 | Radarr           | Films                 |
| Sonarr       | sonarr             | 8989 | Sonarr           | Séries                |
| FlareSolverr | flaresolverr       | 8191 | —                | Proxy Cloudflare      |
| Prowlarr     | prowlarr           | 9696 | Prowlarr         | Centralise indexeurs  |
| Jackett      | jackett            | 9117 | Jackett          | Fournit YGG           |
| Jellyfin     | jellyfin           | 8096 | Jellyfin         | Serveur média         |
| Jellyseer    | jellyseer          | 5055 | —                | Interface utilisateur |

---

### 🔁 Chaîne de fonctionnement complète

```
Jellyseer
  ↓ (via API)
Radarr / Sonarr
  ↓
Prowlarr
  ↓
Jackett (avec FlareSolverr)
  ↓
YGG / autres trackers
  ↓
qBittorrent
  ↓
Téléchargements → Jellyfin (médias dispo)
```

---

Tu peux copier-coller cette procédure telle quelle — c’est ta **documentation finale stable et validée** pour reconstruire la stack sans rien oublier.
