---
title: 'Hiding my VPS''s IP behind Cloudflare, without switching DNS providers'
description: 'How to put a domain behind the Cloudflare proxy to mask a server''s real IP, whatever the registrar, plus the matching ufw hardening.'
tags: ['cloudflare', 'dns', 'docker', 'security', 'sysadmin']
publishedAt: 2026-07-11
lang: 'en'
urlSlug: 'cloudflare-proxy-vps'
---

# Hiding my VPS's IP behind Cloudflare, without switching DNS providers

Simple goal: my domain stays registered with my usual registrar, but nobody should land on my VPS's real IP by resolving `mydomain.com`. No need for an outbound tunnel like Cloudflare Tunnel here, just the classic Cloudflare proxy, the little orange cloud, sitting between the world and my server.

One thing to clarify before starting: the Cloudflare proxy isn't something you can turn on for a DNS zone that stays with the original registrar. It's a feature tied to zones that are **active** on Cloudflare, which means delegating the domain's nameservers to Cloudflare. The domain stays bought and registered wherever it already was (OVH, Gandi, Namecheap, whatever), only the DNS zone management changes hands. The process is the same regardless of registrar, only the screen where you edit the nameservers changes.

## Step 1: add the domain to Cloudflare

A free Cloudflare account is enough. **Add a site**, enter the domain. Cloudflare scans existing records (automatic import of the current zone, worth double-checking anyway, the import sometimes misses exotic entries like SPF/DKIM) and hands over two nameservers to set.

## Step 2: change the nameservers at the registrar

In the registrar's interface (at OVH: Manager → domain page → **DNS Servers**), replace the current nameservers with the two given by Cloudflare. Propagation usually takes a few hours, sometimes up to 24-48h.

Check that the change took effect:

```bash
dig NS mydomain.com +short
```

Cloudflare also sends an email as soon as the zone goes active.

## Step 3: the proxied A record

In the Cloudflare dashboard, DNS section of the zone, a regular `A` record pointing to the VPS's public IP:

```
Type  : A
Name  : @ (or subdomain)
IPv4  : VPS_IP
Proxy : enabled (orange cloud)
```

Orange cloud means public traffic goes through Cloudflare, the VPS's IP is never exposed in DNS resolution. Grey cloud means plain DNS, IP visible in the clear, no protection.

Same logic applies to an `AAAA` record if the VPS has a public IPv6 address: proxy it too, or don't publish one at all. An unproxied `AAAA` record defeats the whole point of hiding the IPv4 one, since it points straight at the origin.

## Step 4: SSL/TLS set to Full (strict), not Flexible

In **SSL/TLS** → mode **Full (strict)**. Flexible mode (the default on some accounts) only encrypts between the visitor and Cloudflare: the Cloudflare → VPS leg goes back to plain HTTP, which defeats a good chunk of the point and can even trigger redirect loops if the app forces HTTPS on the origin side.

Full strict needs a valid certificate on the server side. Two options:

- a regular Let's Encrypt cert (already in place if Traefik or nginx manages one);
- better suited to this exact case: Cloudflare's [Origin CA certificate](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/), generated from the dashboard, valid for 15 years, trusted only by Cloudflare (makes sense, it only serves the edge → origin leg).

## Step 5: ufw, only let Cloudflare in

The orange cloud masks the IP as long as it stays secret. If it leaks (a stale cached record, an IP range scan, DNS history from before the migration), anyone can contact it directly and bypass Cloudflare entirely. To close that off for good: only accept traffic on 80/443 from [Cloudflare's IP ranges](https://www.cloudflare.com/ips/).

This needs to cover IPv6 too, not just IPv4: a public IPv6 address on the VPS is reachable on its own, independently of whatever DNS record points at the IPv4 one. Either firewall the IPv6 ranges the same way as the IPv4 ones, or disable public IPv6 on the server entirely if nothing needs it.

**If the service runs natively** (no Docker), a plain ufw rule is enough, it goes through the `INPUT` chain:

```bash
for ip in $(curl -s https://www.cloudflare.com/ips-v4); do
  sudo ufw allow from "$ip" to any port 443 proto tcp
done
for ip in $(curl -s https://www.cloudflare.com/ips-v6); do
  sudo ufw allow from "$ip" to any port 443 proto tcp
done
sudo ufw deny 443/tcp
```

Same logic for port 80 if the service needs it directly (public HTTP→HTTPS redirect, ACME challenge): repeat the same two loops with port 80 instead of 443.

**If the service is published through Docker** (`ports: - "443:443"`), a plain ufw rule isn't enough: as covered in [my server setup](/en/blog/setup-new-server), Docker routes that traffic through the `DOCKER-USER` chain, ahead of ufw, so `ufw allow`/`ufw deny` have no effect on it. You need the `route` variant instead, the one `ufw-docker` respects:

```bash
for ip in $(curl -s https://www.cloudflare.com/ips-v4); do
  sudo ufw route allow proto tcp from "$ip" to any port 443
done
for ip in $(curl -s https://www.cloudflare.com/ips-v6); do
  sudo ufw route allow proto tcp from "$ip" to any port 443
done
```

Without `ufw-docker` installed (see step 6 of the previous post), the port stays open to everyone by default the moment it's published anyway. The IP restriction only makes sense combined with `ufw-docker`, which closes everything off first, before selectively allowing Cloudflare's ranges.

**Trap if the service was already running before this migration**: if the container was exposed with `sudo ufw-docker allow my-service 443` (the command from step 6 of the previous post), that rule is still in place and allows **all of the Internet**, not just Cloudflare. ufw evaluates its rules in the order they were added, first match wins: that old `ALLOW FWD ... Anywhere` rule matches before the new Cloudflare rules and makes them useless, with no error or warning, the IP stays reachable directly as if nothing had changed. Check for it and remove it before trusting the restriction:

```bash
sudo ufw status numbered
sudo ufw-docker delete allow my-service 443
```

Same trap applies to port 80 if `ufw-docker allow my-service 80` was already run. Two options: close 80 entirely (`sudo ufw-docker delete allow my-service 80`, without adding anything back), which works if TLS is fully handled by Cloudflare and no origin-side certificate renewal depends on an HTTP-01 challenge; or restrict it to Cloudflare's ranges just like 443, if the reverse proxy needs it (public HTTP→HTTPS redirect, ACME challenge):

```bash
for ip in $(curl -s https://www.cloudflare.com/ips-v4); do
  sudo ufw route allow proto tcp from "$ip" to any port 80
done
for ip in $(curl -s https://www.cloudflare.com/ips-v6); do
  sudo ufw route allow proto tcp from "$ip" to any port 80
done
```

Cloudflare's IP ranges change occasionally. A cron job that regenerates the list avoids getting locked out the day they shift:

```bash
sudo tee /etc/cron.d/cloudflare-ips > /dev/null <<'EOF'
0 4 * * 0 root curl -s https://www.cloudflare.com/ips-v4 -o /etc/cloudflare-ipv4.txt
0 4 * * 0 root curl -s https://www.cloudflare.com/ips-v6 -o /etc/cloudflare-ipv6.txt
EOF
```

(The script that reapplies ufw rules from this file depends on how each service is published, so I keep it out of the cron to avoid running `ufw route allow` in a loop unattended.)

## Step 6: verify

Test from the outside:

```bash
curl -I https://mydomain.com
```

And most importantly, check that the VPS's real IP no longer answers directly if contacted by hand (assuming it hadn't already leaked before the migration; if it had, nothing stops anyone from finding it in a DNS history tool like SecurityTrails or crt.sh, the only real safeguard being the ufw restriction from step 5):

```bash
curl -I --resolve mydomain.com:443:VPS_IP https://mydomain.com
# should time out or be refused, not respond normally
```

## What I gain, what I lose

I gain: the real IP masked as long as it doesn't leak, basic DDoS protection included for free, a basic WAF I can turn on, and caching for static content. I lose: DNS management is no longer with my original registrar but with Cloudflare (the interface is nicer anyway), and I now depend on a third-party service sitting between my visitors and my server: if Cloudflare has an incident, so does my site.
