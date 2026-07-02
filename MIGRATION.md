# Migration plan: AdonisJS + Inertia + React → Astro (zero-JS-framework)

## Why

Current stack (AdonisJS 7, Inertia, React, session/shield/cors middleware) is a full
backend framework serving 3 routes and 7 markdown blog posts with no database and no
auth. Real need: static portfolio + blog, content versioned as markdown in git,
animated background, i18n. Astro fits this directly — content collections, native
i18n routing, zero client JS by default.

## Scope decision: no UI framework

Nothing here requires React (or any framework) at runtime:

- **Starfield background** → vanilla `<canvas>` + one `<script>`. Existing
  `inertia/components/starfield.tsx` is already framework-agnostic logic wrapped in
  JSX — port the `useEffect` body directly to a plain TS module, drop the component
  shell. `space_background.tsx` (three.js version) can be dropped or ported the same
  way if the warp-on-navigation effect is kept (needs a `document.addEventListener`
  on Astro's `astro:page-load` / view-transition event instead of `inertia:start`).
- **Locale switcher** → static `<a href="/fr/...">` / `<a href="/en/...">` links.
  Astro's built-in i18n routing (`i18n.locales`, `Astro.currentLocale`,
  `getRelativeLocaleUrl()`) handles path generation; active-locale highlighting is
  pure CSS (`aria-current` + `:where([aria-current])` selector).
- **Page transitions** → Astro View Transitions API (`<ClientRouter />`), replaces
  `use_page_transition.tsx` + Inertia's `inertia:start` event.

No `@astrojs/react` integration needed. No client-side hydration islands at all,
unless a future feature genuinely requires interactivity.

## Target stack

- **Astro** (static output, `output: 'static'`)
- **Content Collections** (`src/content/posts/*.md` with Zod schema) — replaces
  `data/posts.json` + `data/posts/*.md` + `PostMarkdownLoader` + `PostService` +
  `post_collection.ts` + `post_transformer.ts`
- **Astro i18n routing**, no default locale at root — both `fr` and `en` always
  prefixed (`i18n.routing.prefixDefaultLocale: true`, `/` redirects or 404s, every
  page lives under `/fr/...` or `/en/...`) — replaces Lingui + `.po` catalogs +
  `locale_switcher`
- **Markdown rendering**: Astro's built-in remark/rehype pipeline + `shiki` (Astro
  ships Shiki integration natively) — replaces `markdown-it` + `@shikijs/markdown-it`
- **UnoCSS or Tailwind** for styling — UnoCSS has an official Astro integration
  (`@unocss/astro`), so `uno.config.ts` (presets, shortcuts, typography) carries over
  almost unchanged
- **Deploy target**: GitHub Pages, via official `withastro/action` + `actions/deploy-pages`
  GitHub Actions workflow, triggered on push to `main`. Custom domain `www.sonny.dev`
  via `public/CNAME` — so `site: 'https://www.sonny.dev'`, no `base` needed.

## Content mapping

| Current | New |
|---|---|
| `data/posts.json` + `data/posts/*.md` | `src/content/posts/*.md` (frontmatter: title, slug from filename, description, tags, publishedAt) |
| `data/experiences.json` | `src/content/experiences/*.json` or single `src/data/experiences.ts` (no per-item routing needed, plain data import is fine) |
| `data/projects.json` | same treatment as experiences |
| `inertia/locales/{fr,en}/messages.po` | Astro i18n: either per-locale content collections (`posts/fr/`, `posts/en/`) or a small `src/i18n/ui.ts` dictionary for UI strings (nav labels, "min read", etc.) |

## Component/page mapping

All filenames snake_case (matches current codebase convention — no PascalCase files,
including `.astro` files).

| Current | New |
|---|---|
| `inertia/layouts/base_layout.tsx` | `src/layouts/base_layout.astro` |
| `inertia/layouts/default_layout.tsx`, `post_layout.tsx` | `src/layouts/default_layout.astro`, `post_layout.astro` (or merge into one with a slot) |
| `inertia/pages/home.tsx` | `src/pages/[locale]/index.astro` |
| `inertia/pages/posts/show_posts.tsx` | `src/pages/[locale]/blog/index.astro` |
| `inertia/pages/posts/show_post.tsx` | `src/pages/[locale]/blog/[slug].astro` (`getStaticPaths` over content collection) |
| `inertia/components/navigation/navbar.tsx`, `footer.tsx`, `navigation_links.tsx` | `src/components/navigation/navbar.astro`, `footer.astro`, `navigation_links.astro` |
| `inertia/components/posts/post_item.tsx`, `post_list.tsx` | `src/components/posts/post_item.astro`, `post_list.astro` |
| `inertia/components/section_title.tsx` | `src/components/section_title.astro` |
| `inertia/components/timeline/vertical_timeline.tsx` | `src/components/timeline/vertical_timeline.astro` |
| `inertia/components/locale_switcher.tsx` | `src/components/locale_switcher.astro` (static links, no JS) |
| `inertia/components/space_background.tsx` | `src/scripts/space_background.ts` (three.js logic, framework-stripped) + `<canvas>` in `base_layout.astro`, loaded via `<script>` |
| `inertia/components/starfield.tsx` | dropped — superseded by `space_background.tsx`, was already dead code (see last commit analysis) |
| `inertia/hooks/use_headroom.tsx` | small vanilla scroll listener script (`src/scripts/use_headroom.ts`), or drop if not essential |
| `inertia/css/app.css` | `src/styles/global.css` (unchanged content, just moved) |
| `resources/views/inertia_layout.edge` | folded into `base_layout.astro` `<head>` |

## Phases

1. **Scaffold** — `pnpm create astro`, wire `@unocss/astro`, port `uno.config.ts`,
   set up `astro.config.ts` with i18n (`locales: ['fr', 'en']`, no default locale at
   root, `routing: { prefixDefaultLocale: true }`).
2. **Content collections** — define `src/content/config.ts` schema for posts, migrate
   `data/posts/*.md` verbatim (frontmatter + body), migrate experiences/projects data.
3. **Layouts & static components** — `base_layout`, `default_layout`, `post_layout`,
   `navbar`, `footer`, `section_title`, `post_item`/`post_list`, `vertical_timeline`
   (all `.astro`, snake_case filenames).
4. **i18n** — wire `/fr/`, `/en/` prefixes on every route, port UI strings, build
   `locale_switcher.astro`, `constants/routes.ts` + `lib/localized_url.ts` helper.
5. **Space background script** — port `space_background.tsx` three.js logic to
   vanilla TS module (`scripts/space_background.ts`), hook warp-speed trigger into
   Astro View Transitions instead of `inertia:start`.
6. **Pages** — home, blog index, blog post detail, 404.
7. **Parity pass** — visually compare against current site (screenshots side by side),
   check SEO tags (`<title>`, meta description, OG tags per post).
8. **Deploy** — GitHub Actions (`withastro/action` + `actions/deploy-pages`), `public/CNAME`
   for `www.sonny.dev`, wire build + preview, cut over DNS.
9. **Cleanup** — remove AdonisJS/Inertia/React deps and files once parity confirmed.

## Non-goals / explicitly dropped

- Session, CORS, Shield middleware — no longer relevant, no server.
- Any future contact form / auth: out of scope for this migration. If needed later,
  it'd be a separate small API (Astro server endpoint or external service), not a
  reason to keep Adonis.

## Notes on link type-safety

Astro has no built-in typed-routes equivalent to Next.js — `getRelativeLocaleUrl(locale, path)`
(from `astro:i18n`) takes plain `string` params, so a typo'd path segment compiles fine
and only 404s at runtime. To close this gap:

- Define route paths as a single `const` object (same pattern already used in the
  current codebase's `inertia/constants/urls.ts`), e.g. `src/constants/routes.ts`:
  ```ts
  export const ROUTES = {
    home: '',
    blog: 'blog',
    post: (slug: string) => `blog/${slug}`,
  } as const;
  ```
- Wrap `getRelativeLocaleUrl` in a small helper, e.g. `src/lib/localized_url.ts`, that
  takes a `ROUTES` value (not a raw string) so callers can't pass an arbitrary path:
  ```ts
  import { getRelativeLocaleUrl } from 'astro:i18n';
  import type { ROUTES } from '~/constants/routes';

  export function localizedUrl(locale: string, route: string) {
    return getRelativeLocaleUrl(locale, route);
  }
  ```
- Every internal link goes through `localizedUrl(locale, ROUTES.blog)` etc. — never a
  hardcoded string. This doesn't give full compile-time route-existence checking, but
  it does eliminate typos and centralizes any future route renames to one file.

## Decisions locked

- No default locale at root — `/fr/...` and `/en/...` always prefixed, `/` is not a
  valid page (404 or redirect to a locale, TBD at implementation time).
- Keep the three.js warp-speed background (`space_background.tsx`) as-is for now.
  Simplifying to the dependency-free 2D canvas version stays an option to revisit
  later if three.js proves to be more weight than it's worth.
- Custom domain `www.sonny.dev` via GitHub Pages `public/CNAME`.
- All filenames snake_case, including `.astro` files — no PascalCase anywhere.
