# ☕ The Cognition Coffee Company

> A community strategy for **Cognition** — built with Devin, before applying.

`cognitioncoffee.co` is a portfolio + proposal site for the **Developer Community
Manager** role at [Cognition](https://cognition.ai) (makers of Devin, the first AI
software engineer). It's framed as a tasteful hybrid: part **artisan coffee roaster**,
part **applied AI research lab** — a natural extension of the cognition.ai / devin.ai
design language, in the signature **Devin blue (`#317CFF`)** on **wax-paper cream**.

It is a "show, don't tell" pitch to hiring manager **Nader Dabit**: three concrete,
executable community programs, a redesigned community page, and a personal story —
all orchestrated with Devin itself.

---

## The concept in one breath

Cursor turned coffee shops into a 200-city community engine (Cafe Cursor). Cognition
has the product and the potential but not yet the reach. **The Cognition Coffee Company**
proposes the menu that gets them there:

| # | Roast | Program |
|---|-------|---------|
| 01 | The House Roast | **Devin Mastery Curriculum & Certification** |
| 02 | Single-Origin Series | **Cafe Cognition — Global Meetup Network** |
| 03 | The Roasters' Guild | **Devin Ambassador Program** |

---

## Tech stack

- **[Astro 6](https://astro.build)** (static) — matches devin.ai's stack
- **[Tailwind CSS v4](https://tailwindcss.com)** via `@tailwindcss/vite`
- **MDX** content collections for the blog
- **Self-hosted fonts** (Fontsource): Fraunces (serif), Geist (sans), Geist Mono
  — stand-ins for Cognition's STKBureauSerif / NBInternationalPro / GeistMono
- Deploy target: **Vercel / Netlify / Cloudflare Pages** (static)

## Quickstart

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to ./dist
npm run preview
```

## Project map

```
src/
  components/      Brand primitives (Nav, Footer, WaxPaper, Terminal, OtterAscii, Hexagon, Section)
  layouts/         Base.astro (shell) · BlogPost.astro (editorial serif)
  pages/           index · community · about · blog/[...slug]
  content/blog/    3 blog posts (MDX) — currently outline stubs
  data/            initiatives.ts · experience.ts  (verified copy/data)
  lib/             site.ts (nav/meta) · events.ts (mock events + Luma adapter)
  styles/          global.css (the design-token source of truth)
docs/
  BRAND.md         Brand concept, voice, motifs
  DESIGN_SYSTEM.md Colors, type, components, do/don't
  ARCHITECTURE.md  Routes, data model, page specs
  ORCHESTRATION.md How multiple Devins build this in parallel  ← start here
  content/         Page + blog content briefs
```

## Building this out with a fleet of Devins

This repo is **intentionally scaffolded, not finished.** The foundation (design
system, layout, nav, brand components, data layer, page skeletons) is in place so
that **multiple Devin sessions can build the remaining work in parallel without
colliding**. See **[`docs/ORCHESTRATION.md`](docs/ORCHESTRATION.md)** for the
collision-free workstream breakdown, **[`docs/HANDOFF.md`](docs/HANDOFF.md)** for the
ready-to-paste Devin Cloud session prompts + launch steps, and **[`AGENTS.md`](AGENTS.md)**
for the conventions every Devin must follow (incl. `/poteto-mode`, `/caveman`,
`/impeccable`, and the `deslop` gate).

## Status

🟡 **Scaffold.** Builds and runs. Pages render with real structure + verified copy.
Remaining work (per workstream): finished blog prose, interactive community globe,
richer hero motion, program deep-dive pages, imagery, polish, and deploy.

---

*Not affiliated with Cognition (yet). Built by [Ali Khani](https://alikhani.co).*
