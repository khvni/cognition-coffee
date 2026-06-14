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

- **[Astro 6](https://astro.build)** (static output)
- **[Tailwind CSS v4](https://tailwindcss.com)** via `@tailwindcss/vite`
- **MDX** content collections for the blog
- **Self-hosted fonts** (Fontsource): Fraunces (serif), Geist (sans), Geist Mono
- Hosted on **Cloudflare Pages**

## Quickstart

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to ./dist
npm run preview
npm run deploy   # build + publish to Cloudflare Pages
```

## Project map

```
src/
  components/   Brand primitives (Nav, Footer, WaxPaper, Terminal, OtterAscii, Hexagon, Section)
  layouts/      Base.astro (shell) · BlogPost.astro (editorial serif)
  pages/        index · community · about · blog/[...slug] · menu/[slug]
  content/blog/ Field notes (MDX)
  data/         initiatives.ts · experience.ts (content + data)
  lib/          site.ts (nav/meta) · events.ts (events + Luma adapter)
  styles/       global.css (design-token source of truth)
docs/
  BRAND.md          Brand concept, voice, motifs
  DESIGN_SYSTEM.md  Colors, type, components, do/don't
  ARCHITECTURE.md   Routes, data model, page specs
  DEPLOY.md         Cloudflare Pages setup
```

Conventions for contributors (and agents) live in [`AGENTS.md`](AGENTS.md).

---

*A concept project by [Ali Khani](https://alikhani.co). Not affiliated with Cognition.*
