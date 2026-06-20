# The Cognition Coffee Company

> A community strategy for the people who build with Devin — designed and built with Devin.

[`cognitioncoffee.co`](https://cognitioncoffee.co) is a concept site: part **artisan
coffee roaster**, part **applied-AI lab**. It imagines what a thriving developer community
around [Cognition](https://cognition.ai)'s Devin could look like, and lays out a concrete
plan to get there — rendered in the cognition.ai / devin.ai design language (Devin blue
`#317CFF` on wax-paper cream).

## The concept in one breath

A great product earns a great community. This site proposes the "menu" that turns Devin's
users into a community that teaches the world how to build with agents:

| # | Roast | Program |
|---|-------|---------|
| 01 | The House Roast | **Devin Mastery Curriculum & Certification** |
| 02 | Single-Origin Series | **Cafe Cognition — a global meetup network** |
| 03 | The Roasters' Guild | **The Devin Ambassador Program** |

Plus a reimagined community home and a set of field notes on community and agents.

## Tech stack

- **[Gatsby 5](https://www.gatsbyjs.com)** (static site generator) + **React 18** + **TypeScript**
- **[Tailwind CSS v3](https://tailwindcss.com)** + PostCSS via `gatsby-plugin-postcss`
- **`.tsx` content** — each post/page exports `frontmatter` + a default React component (no MDX)
- **PostHog-style desktop-OS UI** with a plain-site mode toggle (`framer-motion` for window dragging)
- **PostHog** analytics (`posthog-js`)
- Self-hosted fonts (Fontsource): Inter (sans), IBM Plex Mono (mono)
- Hosted on **Cloudflare Pages** (via GitHub Actions)

## Quickstart

```bash
npm install
npm run dev      # http://localhost:8000
npm run build    # static output to ./public
npm run serve    # preview the production build
npm run deploy   # build + publish to Cloudflare Pages
```

## Project map

```
src/
  components/   OS shell primitives (Wrapper, Desktop, AppWindow, TaskBar, ModeToggle, AppIcon, Otter)
  context/      App.tsx (OS/site mode state)
  pages/        index.tsx · blog.tsx (React pages)
  templates/    blog-post.tsx · content-page.tsx (look up content by slug from registries)
  content/blog/ Field notes (.tsx) + index.ts registry
  content/pages/ Site pages (.tsx) + index.ts registry
  data/         initiatives.ts · experience.ts (verified content + data)
  lib/          site.ts (nav/meta) · events.ts · apps.ts · os-session.ts
  styles/       global.css (design-token source of truth)
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
