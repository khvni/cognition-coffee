# ARCHITECTURE.md

## Stack

- **Gatsby 5** static site generator + **React 18** + **TypeScript**
- **Tailwind CSS v3** + PostCSS (`gatsby-plugin-postcss`)
- **Content**: `.tsx` components (no MDX, no `gatsby-plugin-mdx`, no `gatsby-source-filesystem`)
- **OS UI**: PostHog-style desktop shell with a plain-site mode toggle
- **Animation**: `framer-motion` (window dragging/transitions)
- **OS state**: XState v5 machine (`src/os/osMachine.ts`)
- **Analytics**: PostHog (`posthog-js` client, `posthog-node` in Functions)
- **Backend**: Cloudflare Pages Functions (`functions/api/*`) for the `/admin` CMS
- **Path alias**: `@/` → `src/` (tsconfig + `gatsby-node.ts` webpack alias)
- **Fonts**: `@fontsource-variable/geist` (sans), `@fontsource-variable/geist-mono` (mono)

## Routes

Pages are created two ways:

1. **Filesystem pages** — `src/pages/*.tsx`: `/`, `/blog`, `/admin`, `/terminal`, `/scott`,
   and the games (`/snake`, `/space-invaders`, `/pong`).
2. **Programmatic pages** — `gatsby-node.ts` iterates the content registries and calls
   `createPage` for each entry.

| Route | Source | Template | Notes |
|-------|--------|----------|-------|
| `/` | `src/pages/index.tsx` | — | Welcome window: the pitch |
| `/blog` | `src/pages/blog.tsx` | — | Field notes index |
| `/admin` | `src/pages/admin.tsx` | — | Password-gated CMS (see below) |
| `/blog/<slug>` | `src/content/blog/*.tsx` | `src/templates/blog-post.tsx` | Field notes |
| `/<slug>` | `src/content/pages/*.tsx` | `src/templates/content-page.tsx` | about, community, menu |

## Content model (`.tsx` registries)

Content is plain TypeScript — no MDX, no filesystem sourcing. Each content file exports
a `frontmatter` object and a default React component:

```tsx
// src/content/blog/brewing-community.tsx
export const frontmatter = { title: "...", date: "...", slug: "brewing-community" }
export default function Post() { return <article>…</article> }
```

Registries aggregate them into arrays consumed by `gatsby-node.ts` and the templates:

| Registry | Exports | Consumed by |
|----------|---------|-------------|
| `src/content/blog/index.ts` | `blogPosts[]` (each: `frontmatter` + `Content` component) | `gatsby-node.ts`, `blog-post.tsx` |
| `src/content/pages/index.ts` | `pages[]` (each: `frontmatter` + `Content` component) | `gatsby-node.ts`, `content-page.tsx` |

`gatsby-node.ts` discovers slugs from the `.tsx` filenames in each content directory
(it does not import the registries) and creates a page per file:
- blog → `/blog/<slug>` using `src/templates/blog-post.tsx`
- pages → `/<slug>` using `src/templates/content-page.tsx`

Templates receive the slug via `pageContext`, look up the matching entry in the registry,
and render its `Content` component.

## OS / site shell

`gatsby-browser.tsx` and `gatsby-ssr.tsx` wrap every page in `<AppProvider>` + `<Wrapper>`.
`Wrapper` renders either the windowed desktop (`os` mode) or a plain arranged-pages site
(`site` mode), toggled at runtime. Window lifecycle, focus, z-order, and mode live in the
XState machine `src/os/osMachine.ts`, exposed to components through `src/context/App.tsx`.

| Component | Purpose |
|-----------|---------|
| `Wrapper` | Chooses `os` vs `site` mode and renders the appropriate shell |
| `Desktop` | The windowed desktop surface (icons, wallpaper) |
| `AppWindow` | A draggable window (`framer-motion`) |
| `TaskBar` | Bottom bar with running apps + mode toggle |
| `AppIcon` | Desktop launcher icon |
| `ModeToggle` | Switch between OS and site modes |
| `Otter` | ASCII Devin otter mark (the wallpaper itself is a photo under a CRT overlay) |

## Navigation (`src/lib/apps.ts`)

`APPS` is the single app registry: each entry's path, title, icon, window size, and flags.
`desktop: true` puts it on the desktop; `nav: false` hides it from the site-mode nav,
footer, and index grid. `appForPath()` maps a URL to its app.

## Data model

Verified content lives outside the page templates:

| Source | Holds | Consumed by |
|--------|-------|-------------|
| `src/data/experience.ts` | `BIO`, `SOCIALS`, `WORK`, `PROJECTS` | About |
| `src/data/menu.ts` + `menu-sections/` | `MENU_SECTIONS` (SSR fallback), `fetchMenu()` | Menu |
| `src/data/community.ts` | `communityPhotos`, `links`, `faqs` | Community |
| `src/data/tweets.ts` | `tweets` | Community |
| `src/lib/apps.ts` | `APPS`, `appForPath()` | Desktop, TaskBar, site nav |
| `content/*.json` | posts, menu, about, experience, projects | Functions, `src/content/blog/index.ts` |

### Hybrid content
`content/*.json` is the copy the admin edits. Pages render the bundled `.tsx`/`src/data`
version first, then fetch `/api/about`, `/api/menu`, `/api/experience` at runtime; the blog
registry merges `content/posts.json` at build time.

## Admin and API (`functions/api/`)

`/admin` logs in via `POST /api/auth` (checks `ADMIN_PASSWORD`, sets an `admin_session`
cookie). Endpoints for `posts`, `menu`, `about`, `experience`, `projects`, `upload`, and
`upload-logo` read and write files in the repo through the GitHub Contents API
(`GITHUB_TOKEN`, `GITHUB_REPO`), committing to `main`, which redeploys the site. Server
events go to PostHog when `POSTHOG_KEY`/`POSTHOG_HOST` are set. Setup:
[`DEPLOY.md`](DEPLOY.md).

## Build & deploy
- Static output. `npm run build` (`gatsby build`) → `./public`.
- Deploy to Cloudflare Pages via GitHub Actions (`.github/workflows/deploy.yml`) on push
  to `main`: `wrangler pages deploy public --project-name=cognition-coffee --branch=main`.
- `siteUrl` is set in `gatsby-config.ts` (`siteMetadata.siteUrl`) for correct canonical URLs.
