# Portfolio

Personal portfolio and blog — [www.sonny.dev](https://www.sonny.dev).

## Stack

- [Astro](https://astro.build) — static output, `en`/`fr` i18n routing, Markdown content collections
- [UnoCSS](https://unocss.dev) for styling
- [oxlint](https://oxc.rs) / [oxfmt](https://oxc.rs) for linting and formatting
- [Playwright](https://playwright.dev) + [sharp](https://sharp.pixelplumbing.com) to auto-generate project screenshots
- [Knip](https://knip.dev) to catch unused files, exports and dependencies

## Project structure

```
src/
  components/   UI components (navigation, posts, projects, timeline)
  content/      Markdown blog posts (src/content/posts/{en,fr})
  data/         Static content: projects, experiences, formations
  i18n/         Locale strings and helpers
  layouts/      Page layouts
  lib/          Small pure helpers
  pages/        File-based routes, under [locale]/ for i18n
  scripts/      Client-side scripts loaded via <script src>
scripts/        Build-time Node scripts (not shipped to the browser)
```

## Commands

| Command                            | Action                                                     |
| ---------------------------------- | ---------------------------------------------------------- |
| `pnpm dev`                         | Start local dev server                                     |
| `pnpm build`                       | Build static site to `dist/`                               |
| `pnpm preview`                     | Preview the production build                               |
| `pnpm check`                       | Lint + format check + typecheck                            |
| `pnpm knip`                        | Report unused files/exports/dependencies                   |
| `pnpm screenshots:install-browser` | One-time: install the Chromium build for Playwright        |
| `pnpm screenshots:generate`        | Screenshot each project's live URL into `public/projects/` |

## Project thumbnails

Project cards on `/projects` show a screenshot of each project's live site.
`scripts/generate-project-screenshots.ts` drives headless Chromium (dark
color scheme forced) against every project's `url` in `src/data/projects.ts`,
converts the screenshot to WebP, and saves it to `public/projects/`. Projects
with no `url`, or whose page fails to load (non-2xx response), fall back to
`public/projects/placeholder.svg` automatically — no manual bookkeeping
required. Re-run `pnpm screenshots:generate` whenever a project's site
changes.

## Deploy

Deployed to GitHub Pages on every push to `main` — see [DEPLOY.md](./DEPLOY.md).
