---
title: 'The server setup I now use for every new machine'
description: 'Full procedure to secure a freshly installed Ubuntu server: SSH key, dedicated user, Docker, fail2ban, automatic security updates and MOTD.'
tags: ['linux', 'ssh', 'docker', 'security', 'sysadmin']
publishedAt: 2026-07-10
lang: 'en'
urlSlug: 'setup-new-server'
---

# Cleaning up my tech lab: the server setup I use now

After going through one throwaway, badly configured server too many, reinstalled in a hurry after a botched first `sudo apt install`, I finally sat down and wrote out, once and for all, the procedure I now follow for every new server. Nothing groundbreaking, but it's exactly the kind of "clean" baseline that always gets pushed to later — until the day a slightly-too-simple password ends up giving way.

So here's how I go from a freshly installed Ubuntu, reachable as root with a password, to something sane: SSH-key-only access, a dedicated user, a working Docker setup, and a minimum amount of hardening (fail2ban, automatic security updates, and a MOTD that actually gives a real glance at the machine's state).

## Step 1: the SSH key, on my machine

It all starts locally, not on the server. If I don't already have a key for this project, I generate a new one in ed25519, more compact and stronger than RSA.

**On Linux or macOS**, in a terminal:

```bash
ssh-keygen -t ed25519 -C "sonny@techlab"
```

I keep the default path (`~/.ssh/id_ed25519`), unless I want a key dedicated to this specific machine. I always set a passphrase, and add it to my ssh-agent so I don't have to retype it on every connection:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

**On Windows**, from Windows 10/11, the OpenSSH client is built in natively. Just open PowerShell and run the exact same command:

```powershell
ssh-keygen -t ed25519 -C "sonny@techlab"
```

The key is generated in `C:\Users\<youraccount>\.ssh\id_ed25519`. To add it to the SSH agent (sometimes disabled by default on Windows):

```powershell
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent
ssh-add $env:USERPROFILE\.ssh\id_ed25519
```

If `ssh-keygen` isn't recognized, the OpenSSH client isn't installed: `Settings > Apps > Optional Features > Add a Feature > OpenSSH Client`. A more visual alternative for those who prefer a GUI: PuTTYgen, the key generation tool bundled with PuTTY.

## Step 2: a user that isn't root

Staying logged in as root permanently is the kind of habit you end up regretting the day a badly written script does something reckless with full privileges. So I create a dedicated user, `sonny`:

```bash
ssh root@SERVER_IP
adduser sonny
usermod -aG sudo sonny
```

A quick test to make sure it works before going further:

```bash
su - sonny
sudo whoami   # should return "root"
```

## Step 3: pushing my key to the server

Always from my local machine, never from the server:

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub sonny@SERVER_IP
```

If `ssh-copy-id` isn't available, the manual version does exactly the same thing:

```bash
cat ~/.ssh/id_ed25519.pub | ssh sonny@SERVER_IP "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

And above all: I test the key-based connection **before** touching anything else.

```bash
ssh sonny@SERVER_IP
```

## Step 4: Docker and Docker Compose

Nothing complicated here, the official script does the job cleanly:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

The `docker compose` plugin (v2) comes bundled automatically. A `docker compose version` is enough to confirm it.

What really matters is the post-installation part, often forgotten even though it's clearly documented by Docker:
👉 https://docs.docker.com/engine/install/linux-postinstall/

Two things worth remembering from that guide:

```bash
# Run docker without sudo
sudo usermod -aG docker sonny
# (requires re-logging in, or running "newgrp docker")

# Start automatically on boot
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```

Final check:

```bash
docker run hello-world
```

## Step 5: closing the door to root and passwords

This is the step where things can really go wrong if you move too fast. **I only do this after confirming that key-based login with `sonny` works.** Otherwise, it's the kind of mistake that costs a trip to the hosting provider's emergency console.

```bash
sudo nano /etc/ssh/sshd_config
```

Lines to have:

```
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
ChallengeResponseAuthentication no
```

I also check that no file in `/etc/ssh/sshd_config.d/` overrides this:

```bash
grep -r "PasswordAuthentication\|PermitRootLogin" /etc/ssh/sshd_config.d/ 2>/dev/null
```

Before restarting the service, I test the syntax — it saves a lot of cold sweat:

```bash
sudo sshd -t
sudo systemctl restart sshd
```

And above all: I open a **new** SSH session without closing the current one, to make sure everything is fine before cutting the thread still connecting me to the server.

## Step 6: fail2ban, because bots never get tired

As soon as a server is exposed to the Internet, SSH login attempts start within minutes. Fail2ban doesn't replace a good configuration, but it automatically bans IPs that get too insistent.

```bash
sudo apt update
sudo apt install -y fail2ban
```

I always configure it in a `jail.local`, never in `jail.conf`, which gets overwritten on the slightest update:

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

To verify it's running and see current bans:

```bash
sudo fail2ban-client status sshd
```

## Step 7: a MOTD that's actually useful

Ubuntu's default MOTD, with its ESM ads and generic info, doesn't tell me anything. I ended up writing my own, which shows at a glance the last login, RAM state, disk usage, and uptime.

```bash
sudo apt install -y figlet

sudo tee /etc/update-motd.d/99-custom > /dev/null <<'EOF'
#!/bin/bash
LAST_IP=$(last -n 2 $USER | awk 'NR==2{print $3}')
LAST_DATE=$(last -n 2 $USER | awk 'NR==2{print $4, $5, $6, $7}')
echo "$(figlet $(logname | sed 's/./\u&/'))"
echo -e "\e[44m\e[97m  🔐 Last login: $LAST_DATE from $LAST_IP  \e[0m"
echo ""
echo "📅 $(date)"
echo "🖥️  $(hostname | sed 's/./\u&/') — Linux $(uname -r)"
echo "💾 RAM: $(free -h | awk '/Mem/{print $3"/"$2}') ($(free | awk '/Mem/{printf "%.0f%%", $3/$2*100}'))"
echo "💿 Disk: $(df -h / | awk 'NR==2{print $3"/"$2" ("$5")"}')"
echo "🌡️  Uptime: $(uptime -p)"
echo ""
EOF
sudo chmod +x /etc/update-motd.d/99-custom
```

If I want a truly minimal display, without Ubuntu's default scripts adding to mine:

```bash
sudo chmod -x /etc/update-motd.d/10-help-text
sudo chmod -x /etc/update-motd.d/50-motd-news
sudo chmod -x /etc/update-motd.d/91-release-upgrade
```

No need to reconnect to see the result:

```bash
run-parts /etc/update-motd.d/
```

## Step 8: security updates, without thinking about it

This is probably the most underestimated step. A server you forget to update sooner or later ends up dragging along a known vulnerability. `unattended-upgrades` automatically applies security patches, with no manual intervention.

```bash
sudo apt update
sudo apt install -y unattended-upgrades apt-listchanges
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

Then I check the configuration:

```bash
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```

The essentials to have uncommented (usually already the case by default on Ubuntu):

```
Unattended-Upgrade::Allowed-Origins {
        "${distro_id}:${distro_codename}-security";
        "${distro_id}ESMApps:${distro_codename}-apps-security";
        "${distro_id}ESM:${distro_codename}-infra-security";
};

Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "false";
```

I deliberately leave `Automatic-Reboot` set to `false`: on a machine running containers, I'd rather keep control over restarts than end up with services cut off in the middle of the night.

One last thing to check, in `/etc/apt/apt.conf.d/20auto-upgrades`:

```
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
```

And to make sure everything's properly wired up, a dry run:

```bash
sudo unattended-upgrade --dry-run --debug
```

## The end result

Once these eight steps are done, I have a server that:

- no longer accepts root or password-based login,
- automatically bans IPs that get too pushy on SSH,
- applies its security patches without me having to think about it,
- shows me a real summary of its state on every connection,
- and runs Docker cleanly, ready to host projects.

It's far from exhaustive on the security front (firewall, monitoring, and backups are still missing), but it's the baseline I now build every server on, and it saves me a huge amount of time on every new machine.
