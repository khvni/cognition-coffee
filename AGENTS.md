# AGENTS.md — Conventions for building cognitioncoffee.co

Read this fully before touching code.

## The one-paragraph brief

**The Cognition Coffee Company** is a concept site presenting a developer-community
strategy for Cognition's Devin. It's built as a **PostHog-style mock OS**: a desktop
with draggable windows plus a normal arranged-pages "site" view, toggled at runtime.
The look is **clean and minimal** — a white canvas (`#ffffff`), near-black ink, and **Devin blue
`#317CFF` as the single accent** — with the Devin otter as the OS wallpaper (a photo
under a subtle CRT overlay). Stack is **Gatsby 5 (React 18 + TypeScript)**; all page
content is authored in `.tsx` content components.

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
- **`deslop` before every PR** — a git-diff slop detector
  (`github.com/dabit3/deslop`). Run `deslop -b main` and `deslop score` on your
  branch. **Required gate: 0 high-severity findings and a slop score in the clean band
  (0–19).** It flags AI tells — obvious comments, triple null-checks, debug logs, empty
  catch blocks, needless try/catch. Fix them, don't suppress them.

> Note on comments: deslop rightly flags *obvious in-function comments* as slop. The
> intentional file-header docblocks (explaining brand/architecture intent) are not slop —
> keep those terse and purposeful, and don't add line-by-line narration inside functions.

## Golden rules

1. **The design system is law.** Colors, fonts, radii, and shadows are Tailwind tokens
   in `tailwind.config.js` (`theme.extend`); base/prose styles live in
   `src/styles/global.css`. Never hardcode a hex that exists as a token — use the
   classes (`text-accent-ink`, `border-accent`, `bg-canvas`) or `theme("colors.x")`.
2. **Reuse the primitives.** The OS/site shell is built from `Wrapper`, `Desktop`,
   `AppWindow`, `TaskBar`, `ModeToggle`, `Otter`, and `AppIcon`. Compose them; don't reinvent.
3. **Verified copy only.** Every metric about Ali is real and lives in `src/data/`.
   Do **not** invent stats, dates, or achievements. If unsure, leave a `TODO` and ask.
4. **Keep it clean.** Geist Sans is the universal typeface (`font-sans`); headers
   use weight 500, body uses weight 400, **never exceed weight 500**.
   Eyebrows/labels/code use **mono** (`font-mono`, Geist Mono). The accent is Devin
   blue, applied sparingly; highlighting text must reveal it (set via `::selection`).
5. **Scope your changes.** Touch only the files your task needs, so parallel work
   doesn't collide.
6. **It must build.** Run `npm run build` before you finish. Zero errors. Fix warnings
   you introduce.
7. **No new deps without reason.** Prefer the existing stack. If you must add one, use
   `npm install` (latest), and note it in your PR description.

## Conventions

- **Content**: page bodies are `.tsx` components in `src/content/pages/` (`/about`,
  `/community`, `/menu`) and blog posts are `.tsx` components in `src/content/blog/`.
  Each file exports a `frontmatter` object and a default React component. Registries at
  `src/content/blog/index.ts` and `src/content/pages/index.ts` export arrays consumed by
  `gatsby-node.ts` and the page templates. Routes are generated in `gatsby-node.ts`
  (blog → `/blog/<slug>`, pages → `/<slug>`); `src/pages/index.tsx` and `blog.tsx` are
  React pages. No MDX, no `gatsby-plugin-mdx`, no `gatsby-source-filesystem`.
- **Data lives in `src/data/` and `src/lib/`**, not inline in pages, so multiple pages
  share one source of truth.
- **Images**: put static assets in `static/` (served at the site root). `public/` is
  Gatsby **build output** — gitignored, wiped by `gatsby clean`; never put sources there.
  Prefer SVG for marks/textures; compress anything > ~500 KB before committing.
- **`@` alias**: `@/*` → `src/*`. It's configured in `tsconfig.json` **and** mirrored
  into webpack via `onCreateWebpackConfig` in `gatsby-node.ts` — update both if it moves.
- **Accessibility**: real `alt` text, semantic headings (one `<h1>` per page),
  visible focus states (already styled), color contrast AA.
- **Responsive**: design mobile-first; test at 375px, 768px, 1280px.

## Commit / PR etiquette

- Small, scoped commits. Conventional-ish messages (`feat:`, `fix:`, `content:`,
  `style:`, `docs:`).
- One PR per logical change. In the description, list files touched and any new deps.
- Don't reformat files you didn't change.
- Don't push to `main` directly if a branch workflow is set up.
- **NEVER add "Co-authored by Devin" or any Devin attribution to commits.** All commits should be from the user only.

## What "done" looks like for any page

- [ ] Builds clean (`npm run build`)
- [ ] **`deslop -b main` → 0 high-severity; `deslop score` in the clean band (0–19)**
- [ ] Built in `/poteto-mode`; coded `/caveman`-concise; UI follows `/impeccable`
- [ ] Uses tokens + brand primitives (no rogue hexes/fonts)
- [ ] Real, verified copy (or clearly-marked `TODO`)
- [ ] Responsive at 375 / 768 / 1280
- [ ] Accessible (headings, alt text, focus, contrast)
- [ ] Selection highlight is Devin blue; sans/mono used per role
- [ ] `npm run build` (`gatsby build`) generates every route; both OS and site modes work
