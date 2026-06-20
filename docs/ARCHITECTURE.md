# ARCHITECTURE.md

## Stack

- **Gatsby 5** static site generator + **React 18** + **TypeScript**
- **Tailwind CSS v3** + PostCSS (`gatsby-plugin-postcss`)
- **Content**: `.tsx` components (no MDX, no `gatsby-plugin-mdx`, no `gatsby-source-filesystem`)
- **OS UI**: PostHog-style desktop shell with a plain-site mode toggle
- **Animation**: `framer-motion` (window dragging/transitions)
- **Analytics**: PostHog (`posthog-js`)
- **Path alias**: `@/` → `src/` (tsconfig + `gatsby-node.ts` webpack alias)
- **Fonts**: `@fontsource-variable/inter` (sans), `@fontsource/ibm-plex-mono` (mono)

## Routes

Pages are created two ways:

1. **Filesystem pages** — `src/pages/index.tsx` (`/`) and `src/pages/blog.tsx` (`/blog`).
2. **Programmatic pages** — `gatsby-node.ts` iterates the content registries and calls
   `createPage` for each entry.

| Route | Source | Template | Notes |
|-------|--------|----------|-------|
| `/` | `src/pages/index.tsx` | — | Hero, proof bar, **The Menu** (3 initiatives), "built with Devin", CTA |
| `/blog` | `src/pages/blog.tsx` | — | Editorial index ("The Roastery") |
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

`gatsby-node.ts` reads each registry and creates a page per entry:
- blog → `/blog/<slug>` using `src/templates/blog-post.tsx`
- pages → `/<slug>` using `src/templates/content-page.tsx`

Templates receive the slug via `pageContext`, look up the matching entry in the registry,
and render its `Content` component.

## OS / site shell

`gatsby-browser.tsx` and `gatsby-ssr.tsx` wrap every page in `<AppProvider>` + `<Wrapper>`.
`Wrapper` renders either the windowed desktop (`os` mode) or a plain arranged-pages site
(`site` mode), toggled at runtime. State lives in `src/context/App.tsx`.

| Component | Purpose |
|-----------|---------|
| `Wrapper` | Chooses `os` vs `site` mode and renders the appropriate shell |
| `Desktop` | The windowed desktop surface (icons, wallpaper) |
| `AppWindow` | A draggable window (`framer-motion`) |
| `TaskBar` | Bottom bar with running apps + mode toggle |
| `AppIcon` | Desktop launcher icon |
| `ModeToggle` | Switch between OS and site modes |
| `Otter` | ASCII Devin otter wallpaper |

## Navigation (`src/lib/site.ts`)

- **The Menu** → `/#menu` (the 3-program proposal on the homepage)
- **Resources ▾** (hover dropdown) → **Blog** `/blog` · **Community** `/community` · **About** `/about`
- CTA: **Let's talk ☕** → `/about#contact`

## Data model

All verified content lives outside the page templates:

| File | Exports | Consumed by |
|------|---------|-------------|
| `src/lib/site.ts` | `SITE`, `NAV`, `CTA` | Nav, Footer, pages |
| `src/data/initiatives.ts` | `INITIATIVES[]` (the 3 programs) | Home `/#menu` |
| `src/data/experience.ts` | `BIO`, `PROOF_POINTS`, `PILLARS`, `EXPERIENCE`, `WHY_COGNITION` | About, Home proof bar |
| `src/lib/events.ts` | `getEvents()`, `COMMUNITY_STATS`, `MOCK_EVENTS`, providers | Community |
| `src/lib/apps.ts` | OS app definitions | Desktop, TaskBar |

### Events: mock now, Luma-ready
`src/lib/events.ts` defines an `EventProvider` interface with a working `mockProvider`
and a stubbed `lumaProvider`. The UI calls `getEvents()` and never touches the source.
To go live later, implement `lumaProvider` against `https://luma.com/devin` and flip
`eventProvider`. **No UI change required.**

## Page specs (what each page is trying to do)

### `/` Home
Hero (hook + thesis + VT100 otter) → proof bar (5 metrics) → **The Menu** (3 wax-paper
initiative cards) → "built with Devin" dark-roast meta beat → closing CTA.

### `/community` — the centerpiece (redesign of devin.ai/community)
Today's real page is 5 links + a Google Form. This redesign borrows Cursor's warmth:
hero → vision stats → **What we do** (Cafe Cognition / Workshops / Meetups / Hackathons)
→ **Upcoming events** (mock, Luma-ready) with an **interactive globe** (TODO) →
**Programs** (Ambassadors / Office Hours / Discord / Event Support). Discord link is real
(`discord.gg/GjCYNGChrw`).

### `/about` — Ali Khani
Intro + coordinates → Build/Teach/Connect pillars → experience timeline → why this, why
now → contact (email + X + GitHub).

### `/blog` — "The Roastery"
Editorial index of 3 posts. Posts are the proof-of-thinking:
1. *Brewing Community: What I'd Build for Cognition in 90 Days* (the proposal)
2. *From Cafe Cursor to Cafe Cognition* (the playbook)
3. *Devin Beyond Code* (the differentiator)

## Build & deploy
- Static output. `npm run build` (`gatsby build`) → `./public`.
- Deploy to Cloudflare Pages via GitHub Actions (`.github/workflows/deploy.yml`):
  `wrangler pages deploy public --project-name=cognition-coffee`.
- `siteUrl` is set in `gatsby-config.ts` (`siteMetadata.siteUrl`) for correct canonical URLs.
