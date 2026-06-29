# The Cognition Coffee Company

> Builders sharing what they ship, with the buzz of a coffee shop.

[`cognitioncoffee.co`](https://cognitioncoffee.co) is a concept site for what Devin's
community could feel like. It's built as a **PostHog-style mock OS**: a desktop with
draggable windows, plus a normal arranged-pages "site" view you can toggle at runtime.
The OS is an homage to two things at once: Cognition's early thesis around cloud agents
with their own VMs, and the internet cafes of the early 2000s where the earliest in-real-life
developer communities formed. The Devin otter is the wallpaper.

## The concept in one breath

A great product earns a great community. The "menu" is the plan for turning Devin's users
into a community that teaches the world how to build with agents:

| # | Roast | Program |
|---|-------|---------|
| 01 | The House Roast | **Devin Mastery Curriculum & Certification** |
| 02 | Single-Origin Series | **Cafe Cognition, a global meetup network** |
| 03 | Recruitment | **The Devin Ambassador Program** |

Plus a redesigned community home and a set of field notes on community and agents.

## What's in the OS

The desktop is a real app registry (`src/lib/apps.ts`). Open any of these as a window:

- **Welcome** — the homepage and the pitch.
- **Menu** — the three-roast program above, ordered off a real menu UI.
- **Blog** — field notes and the proposal (see below).
- **Community** — Devin's community page, redesigned.
- **About** — who I am and what I do.
- **Terminal** — a UNIX-like terminal you can poke around in.
- **Snake**, **Space Invaders**, **Pong** — playable, vendored in `static/vendor/games/`.
- **Dangerous Dave** — the classic DOS platformer, newly added (OSS from
  [AkhilRaja/Dave](https://github.com/AkhilRaja/Dave)).
- **scott.png** — an Easter egg. It's just Scott.

Prefer to read? Hit the mode toggle and the whole thing flattens into a normal site.

## Field notes

The blog is where the thinking lives. Current posts:

- **What I'd Build for Cognition** — the concrete game plan: curriculum, meetups, ambassadors.
- **From Cafe Cursor to Cognition Coffee** — the playbook for a sustained chapter network.
- **Scaling MTC to 30+ university chapters** — three years of community building, from 8 people at Berkeley.
- **Great internal hackathons** — a rough manual on hosting hackathons that actually go somewhere.
- **What writing on Quora taught me about marketing** — 7M+ views as a teenager, and what stuck.
- **How I built Cognition Coffee using Devin** — the features, the PRs, the process.

## Tech stack

- **[Gatsby 5](https://www.gatsbyjs.com)** + **React 18** + **TypeScript**
- **[Tailwind CSS v3](https://tailwindcss.com)** via `gatsby-plugin-postcss`
- **`.tsx` content** — each post/page exports `frontmatter` + a default React component (no MDX)
- **[framer-motion](https://www.framer.com/motion/)** for window dragging and reveals
- **PostHog** analytics — `posthog-js` on the client, `posthog-node` in Cloudflare Functions
- Self-hosted fonts (Fontsource): **Geist Sans** (`font-sans`) + **Geist Mono** (`font-mono`)
- Hosted on **Cloudflare Pages** via GitHub Actions (build, upload source maps, deploy)

## Quickstart

```bash
npm install
env -u ELECTRON_RUN_AS_NODE npm run dev      # http://localhost:8000
env -u ELECTRON_RUN_AS_NODE npm run build    # static output to ./public
env -u ELECTRON_RUN_AS_NODE npm run serve    # preview the production build
env -u ELECTRON_RUN_AS_NODE npm run test     # vitest
env -u ELECTRON_RUN_AS_NODE npm run clean    # wipe cache + public
npm run deploy                                # build + publish to Cloudflare Pages
```

> The `env -u ELECTRON_RUN_AS_NODE` prefix unsets a variable that, when inherited from
> an Electron-based host, breaks the Node child processes Gatsby and Vitest spawn. Always
> include it when running build/test/dev from inside such an environment.

## Project map

```
src/
  components/   OS shell primitives (Wrapper, Desktop, AppWindow, TaskBar, ModeToggle, AppIcon, Otter)
                GamePage.tsx (shell for the vendored games)
  context/      App.tsx (OS/site mode state)
  pages/        index.tsx · blog.tsx (React pages)
  templates/    blog-post.tsx · content-page.tsx (look up content by slug from registries)
  content/blog/ Field notes (.tsx) + index.ts registry
  content/pages/ Site pages (.tsx) + index.ts registry
  data/         initiatives.ts · experience.ts · menu.ts · community.ts · tweets.ts (verified content)
  lib/          site.ts (nav/meta) · apps.ts (app registry) · events.ts · os-session.ts
  styles/       global.css (design-token source of truth)
functions/      Cloudflare Pages Functions (api/: posts, experience, menu, auth, upload)
static/
  vendor/games/ Vendored game builds (pong, snake, space-invaders)
gatsby-node.ts  Creates routes from content registries; mirrors @/ webpack alias
gatsby-browser.tsx / gatsby-ssr.tsx  Wrap pages in AppProvider + Wrapper
docs/
  BRAND.md          Brand concept, voice, motifs
  DESIGN_SYSTEM.md  Colors, type, components, do/don't
  ARCHITECTURE.md   Routes, data model, page specs
  DEPLOY.md         Cloudflare Pages setup
```

Conventions for contributors (and agents) live in [`AGENTS.md`](AGENTS.md).

---

*A concept project by [Ali Khani](https://alikhani.co). Not affiliated with Cognition.*
