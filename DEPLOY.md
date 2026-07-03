# Deploy: GitHub Pages

Static Astro build, deployed by `.github/workflows/deploy.yml` on every
published release (or manually via _Actions → Deploy to GitHub Pages → Run workflow_).
First deploy happens when this branch is merged into `main`.

## One-time repository settings

1. **Settings → Pages → Build and deployment → Source**: select **GitHub Actions**.
2. **Settings → Pages → Custom domain**: enter `www.sonny.dev` and save.
   The repo already ships `public/CNAME` (copied to the site root at build time),
   so the setting survives redeploys.
3. **Settings → Pages → Enforce HTTPS**: check it once the domain verifies
   (the checkbox only becomes available after DNS resolves and the certificate
   is provisioned — can take a few minutes to an hour).

## DNS records (manual cutover)

At the DNS provider for `sonny.dev`:

| Type    | Name  | Value                         |
| ------- | ----- | ----------------------------- |
| `CNAME` | `www` | `<github-username>.github.io` |

Optional, to make the apex `sonny.dev` reach GitHub Pages too (it will redirect
to `www.sonny.dev` since that is the configured custom domain):

- `ALIAS`/`ANAME` record on the apex pointing to `<github-username>.github.io`, or
- `A` records on the apex to GitHub Pages IPs: `185.199.108.153`,
  `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  (and `AAAA` equivalents `2606:50c0:8000::153` … `8003::153`).

## What the workflow does

- **build**: `withastro/action@v6` — installs pnpm 11 + Node 24 (pinned in
  `.mise.toml`), runs `pnpm run build`, then uploads `dist/` as the Pages
  artifact.
- **deploy**: `actions/deploy-pages@v5` into the `github-pages` environment.

`dist/` contains `CNAME`, `favicon.svg`, `robots.txt` and
`sitemap-index.xml` alongside the pages.
