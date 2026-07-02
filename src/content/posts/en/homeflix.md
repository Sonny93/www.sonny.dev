---
title: "Build your own Netflix at home"
description: "Very simple guide to build your own Netflix at home. Docker, Jellyfin, Prowlarr, Jackett, Radarr, Sonarr, Jellyseer."
tags: ["docker","jellyfin","homelab","medias"]
publishedAt: 2025-11-05
lang: "en"
urlSlug: "homeflix"
---
## 1️⃣ Shared Docker network

Create the single network so all containers can talk to each other:

```bash
docker network create media_net
```

All your containers (`qbittorrent`, `radarr`, `sonarr`, `jackett`, `flaresolverr`, `prowlarr`, `jellyfin`, `jellyseer`) must be on this network:

```yaml
networks:
  media_net:
    external: true
```

---

## 🔹 2️⃣ qBittorrent

**Role** → main torrent client used by Radarr/Sonarr.

**Web access** → [http://192.168.200.57:8080](http://192.168.200.57:8080/)

**Docker service name** → `qbittorrent`

### Configuration:

1. Credentials:
   - **Username**: `media`
   - **Password**: `supersecure123`
2. In _Web UI settings_:
   - Check **Bypass authentication for clients on localhost**

     → so Docker containers can connect to it.

3. Downloads:
   - Folder: `/downloads` (already mounted at `/srv/media/downloads`)

---

## 🔹 3️⃣ Radarr and Sonarr

**Radarr (movies)** → [http://192.168.200.57:7878](http://192.168.200.57:7878/)

**Sonarr (TV shows)** → [http://192.168.200.57:8989](http://192.168.200.57:8989/)

### Shared configuration:

1. Copy the **API key** into each service (_Settings → General → API Key_).
2. Add qBittorrent as the torrent client:

   ```
   Host: qbittorrent
   Port: 8080
   Username: media
   Password: supersecure123
   ```

   → "Connection succeeded".

3. Folders:
   - Radarr → `/movies`
   - Sonarr → `/tv`
4. (Optional) Enable basic HTTP authentication if you expose the services.

---

## 🔹 4️⃣ FlareSolverr

**Role** → bypasses Cloudflare and captchas.

**Internal URL** → `http://flaresolverr:8191`

No specific configuration needed.

Just check it's on the `media_net` network.

---

## 🔹 5️⃣ Prowlarr (up to proxy configuration)

**Access** → [http://192.168.200.57:9696](http://192.168.200.57:9696/)

**Internal Docker URL** → `http://prowlarr:9696`

### Configuration:

1. Copy the **API key** (_Settings → General_).
2. Go to _Settings → Indexers → Indexer Proxies → + Add Proxy_

   → choose **FlareSolverr**

   ```
   Host: http://flaresolverr:8191
   ```

   → "Connection succeeded" then **Save**.

3. Go to _Settings → Apps → + Add Application_
   - **Radarr**

     ```
     URL: http://radarr:7878
     API Key: <radarr key>
     Server URL: http://prowlarr:9696
     Sync Level: Full Sync
     ```

   - **Sonarr**

     ```
     URL: http://sonarr:8989
     API Key: <sonarr key>
     Server URL: http://prowlarr:9696
     Sync Level: Full Sync
     ```

   → Tests ✅ "Success".

---

## 🔹 6️⃣ Jackett

**Access** → [http://192.168.200.57:9117](http://192.168.200.57:9117/)

**Internal Docker URL** → `http://jackett:9117`

### Configuration:

1. Add FlareSolverr to Jackett for YGG:
   - _Settings → Configuration → Advanced_

     ```
     Proxy Type: HTTP
     Proxy Host: flaresolverr
     Proxy Port: 8191
     ```

     → Save.

2. Add the **YGGtorrent** tracker:
   - Configure your account or cookies.
   - Test → ✅ OK.
3. Copy the **Jackett API key** (top of the homepage).
4. In Jackett → verify YGG actually returns search results.

---

## 🔹 7️⃣ Back to Prowlarr (Jackett integration)

### Adding Jackett as a Torznab indexer:

1. _Settings → Indexers → + Add Indexer → Torznab → Custom_
2. Fill in:

   ```
   Name: Jackett-YGG
   URL: http://jackett:9117/api/v2.0/indexers/yggtorrent/results/torznab/
   API Key: <Jackett API key>
   ```

   ⚠️ Note the `/torznab/` **with the trailing slash**.

3. Test → ✅ "Connection succeeded".
4. Save.
5. Verify categories (Movies / TV) are enabled.

---

## 🔹 8️⃣ Jellyfin — getting the API key

**Access** → [http://192.168.200.57:8096](http://192.168.200.57:8096/)

**Internal Docker URL** → `http://jellyfin:8096`

### Steps:

1. Log in as admin.
2. _Dashboard → Advanced → API Keys → + Create a key_
   - Name: `Jellyseer`
3. Copy this **API key** (you'll need it for Jellyseer).

---

## 🔹 9️⃣ Jellyseer

**Access** → [http://192.168.200.57:5055](http://192.168.200.57:5055/)

**Internal Docker URL** → `http://jellyseer:5055`

### Step 1 — Connect to Jellyfin

In the setup wizard:

| Field        | Value                    |
| ------------ | ------------------------ |
| Jellyfin URL | `http://jellyfin`        |
| Port         | `8096`                   |
| Use SSL      | ❌                       |
| Base URL     | _(leave blank)_          |
| Username     | your Jellyfin user       |
| Password     | your Jellyfin password   |

→ Click **Sign In** → move to the next step.

---

### Step 2 — Configure the services

### **Radarr**

```
Hostname: http://radarr:7878
API Key: <Radarr key>
Root Folder: /movies
Profile: HD-1080p (or other)
Enable Server: ✅
```

### **Sonarr**

```
Hostname: http://sonarr:8989
API Key: <Sonarr key>
Root Folder: /tv
Profile: HD-1080p (or other)
Enable Server: ✅
```

### **Prowlarr (optional but recommended)**

```
Hostname: http://prowlarr:9696
API Key: <Prowlarr key>
Enable Server: ✅
```

### **Jellyfin**

Already connected earlier (via login or API key).

→ Click **Test Connection** for each service → all ✅.

→ Click **Save / Next**.

---

# ✅ Overall summary

| Service      | Internal Docker URL | Port | API key used | Note                   |
| ------------ | -------------------- | ---- | ------------- | ----------------------- |
| qBittorrent  | qbittorrent           | 8080 | —             | Bypass local auth       |
| Radarr       | radarr                | 7878 | Radarr        | Movies                  |
| Sonarr       | sonarr                | 8989 | Sonarr        | TV shows                |
| FlareSolverr | flaresolverr          | 8191 | —             | Cloudflare proxy        |
| Prowlarr     | prowlarr              | 9696 | Prowlarr      | Centralizes indexers    |
| Jackett      | jackett               | 9117 | Jackett       | Provides YGG            |
| Jellyfin     | jellyfin              | 8096 | Jellyfin      | Media server            |
| Jellyseer    | jellyseer             | 5055 | —             | User interface          |

---

### 🔁 Full workflow chain

```
Jellyseer
  ↓ (via API)
Radarr / Sonarr
  ↓
Prowlarr
  ↓
Jackett (with FlareSolverr)
  ↓
YGG / other trackers
  ↓
qBittorrent
  ↓
Downloads → Jellyfin (media available)
```

---

You can copy-paste this procedure as-is — it's your **final, stable, validated documentation** for rebuilding the stack without missing a step.
