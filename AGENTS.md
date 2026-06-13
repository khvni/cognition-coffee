# AGENTS.md — Conventions for building cognitioncoffee.co

You are one of several Devin sessions building **The Cognition Coffee Company**.
Read this fully before touching code. Then read the doc for **your** workstream in
[`docs/ORCHESTRATION.md`](docs/ORCHESTRATION.md).

## The one-paragraph brief

This is a portfolio + proposal site pitching Ali Khani for Cognition's **Developer
Community Manager** role, aimed at hiring manager **Nader Dabit**. The brand is a
**balanced hybrid** of an artisan coffee roaster and an applied AI lab, executed in
Cognition/Devin's visual language (Devin blue `#317CFF`, wax-paper cream `#EDECEB`,
editorial serif headlines, mono accents, the Devin otter, a VT100 terminal motif).

## Required skills & modes

Every Devin working in this repo operates in these modes. They keep the code clean,
concise, and well-engineered, and the UI distinctive (not generic "AI aesthetic").
The first three are **vendored into this repo at `.devin/skills/`**, so they're available
in any cloud session — invoke `/poteto-mode`, `/caveman`, and `/impeccable` directly.

- **`/poteto-mode`** — adopt poteto's disciplined engineering style. Read
  `.devin/skills/poteto-mode/SKILL.md` (especially its **Principles** section) **before**
  writing code. Note: its trigger list references sibling skills (`how`, `architect`,
  `unslop`, `babysit`, …) that are **not** all vendored here — apply its Principles
  regardless; don't block on a missing leaf skill.
- **`/caveman` when coding** — maximum signal, minimum tokens. Terse, well-factored
  code: no filler, no over-engineering, no defensive bloat, minimal comments, shared
  abstractions over copy-paste. Concise ≠ clever — keep it readable.
- **`/impeccable` for design-system & UI work** — apply impeccable principles when
  building or extending components, layouts, and tokens: distinctive, production-grade
  interfaces that avoid the generic AI look. Pairs with `docs/DESIGN_SYSTEM.md`.
- **`deslop` (by Nader Dabit) before every PR** — a git-diff slop detector
  (`github.com/dabit3/deslop`, installed globally on Ali's machine via
  `npm i -g github:dabit3/deslop`). Run `deslop -b main` and `deslop score` on your
  branch. **Required gate: 0 high-severity findings and a slop score in the clean band
  (0–19).** It flags AI tells — obvious comments, triple null-checks, debug logs, empty
  catch blocks, needless try/catch. Fix them, don't suppress them.

> Note on comments: deslop rightly flags *obvious in-function comments* as slop. The
> intentional file-header docblocks in this scaffold (explaining brand/architecture
> intent for the next Devin) are not slop — keep those terse and purposeful, and don't
> add new line-by-line narration inside functions.

## Golden rules

1. **The design system is law.** All colors, fonts, radii, and motifs come from
   `src/styles/global.css` (`@theme` tokens) and the components in `src/components/`.
   Never hardcode a hex that already exists as a token. Use `var(--color-blue)`, etc.
2. **Reuse the brand primitives.** `WaxPaper`, `Section`, `Terminal`, `OtterAscii`,
   `Hexagon`, `Nav`, `Footer` already exist. Compose them; don't reinvent.
3. **Verified copy only.** Every metric about Ali is real and lives in `src/data/`.
   Do **not** invent stats, dates, or achievements. If unsure, leave a `TODO` and ask.
4. **Keep it editorial.** Headlines + blog body use the **serif** (`font-serif`).
   UI/labels use **sans** (`font-sans`). Eyebrows/terminal/code use **mono** (`font-mono`).
   Highlighting text must reveal Devin blue (already set via `::selection`).
5. **Stay in your lane.** Build only the files your workstream owns (see ORCHESTRATION).
   This prevents merge collisions between parallel Devins.
6. **It must build.** Run `npm run build` before you finish. Zero errors. Fix warnings
   you introduce.
7. **No new deps without reason.** Prefer the existing stack. If you must add one, use
   `npm install` (latest), and note it in your PR description.

## Conventions

- **`\u` escapes**: Astro only interprets `\u....` inside JS expressions, **not** in
  template text or attributes. In templates use the literal character (`·`, `—`, `☕`)
  or an HTML entity (`&middot;`, `&mdash;`).
- **Astro content**: blog posts are MDX in `src/content/blog/`; schema in
  `src/content.config.ts`. Route is `src/pages/blog/[...slug].astro` (slug = file id).
- **Data lives in `src/data/` and `src/lib/`**, not inline in pages, so multiple pages
  (and Devins) share one source of truth.
- **Images**: put static assets in `public/`. Optimize before committing. Prefer SVG
  for marks/textures. Do not commit anything > ~500 KB without compressing.
- **Accessibility**: real `alt` text, semantic headings (one `<h1>` per page),
  visible focus states (already styled), color contrast AA.
- **Responsive**: design mobile-first; test at 375px, 768px, 1280px.

## Commit / PR etiquette

- Small, scoped commits. Conventional-ish messages (`feat:`, `fix:`, `content:`,
  `style:`, `docs:`).
- One PR per workstream. In the description, list files touched and any new deps.
- Don't reformat files you didn't change.
- Don't push to `main` directly if a branch workflow is set up.

## What "done" looks like for any page

- [ ] Builds clean (`npm run build`)
- [ ] **`deslop -b main` → 0 high-severity; `deslop score` in the clean band (0–19)**
- [ ] Built in `/poteto-mode`; coded `/caveman`-concise; UI follows `/impeccable`
- [ ] Uses tokens + brand primitives (no rogue hexes/fonts)
- [ ] Real, verified copy (or clearly-marked `TODO`)
- [ ] Responsive at 375 / 768 / 1280
- [ ] Accessible (headings, alt text, focus, contrast)
- [ ] Selection highlight is Devin blue; serif/sans/mono used per role
