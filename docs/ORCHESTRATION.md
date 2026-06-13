# ORCHESTRATION.md — Building this with a fleet of Devins

This site is scaffolded so the remaining work can be split across **parallel Devin
sessions** that don't step on each other. The meta-narrative ("Devin spins up a team of
Devins for large tasks") is also part of the pitch — so building it this way *is* the point.

## How to parallelize safely

The **foundation is already done** (✅ below). Each remaining workstream **owns a
disjoint set of files**, so multiple Devins can run at once and merge cleanly.

### ✅ Phase 0 — Foundation (DONE, do not redo)
Design tokens (`global.css`), `Base`/`BlogPost` layouts, `Nav`/`Footer`, brand
primitives (`WaxPaper`, `Section`, `Terminal`, `OtterAscii`, `Hexagon`), the data layer
(`site.ts`, `initiatives.ts`, `experience.ts`, `events.ts`), content schema, and page
skeletons that build green.

---

## Parallel workstreams (one Devin each)

> Each Devin: read `AGENTS.md` + `docs/DESIGN_SYSTEM.md` first. Work only on your files.
> Branch name suggestion in parentheses. Open one PR per workstream.

### 🅐 Home polish & motion  (`ws/home`)
**Owns:** `src/pages/index.astro`, `src/components/Hero*.astro` (new, if needed),
`src/components/Marquee.astro` (new).
**Do:** elevate the hero (scroll-reveal, subtle parallax on the wax paper, animated
proof bar), add a logo/credibility marquee, refine the "built with Devin" terminal beat.
Respect `prefers-reduced-motion`.
**Don't:** edit shared components, data files, or other pages.

### 🅑 Community centerpiece  (`ws/community`)
**Owns:** `src/pages/community.astro`, `src/components/Globe.*` (new),
`src/components/EventList.astro` (new), `src/lib/events.ts` (events only).
**Do:** build the **interactive globe** plotting `MOCK_EVENTS` lat/lng (e.g. `cobe` or
three.js island), a filterable event list, a tweet/social-proof wall (Cursor-style),
and the "what we do" cards with imagery. Keep the Luma adapter intact.
**Don't:** change global nav/footer or the design tokens.

### 🅒 Blog content & reading experience  (`ws/blog`)
**Owns:** `src/content/blog/*.mdx`, `src/pages/blog/index.astro`,
`src/layouts/BlogPost.astro`, `src/components/Prose*.astro` (new).
**Do:** write the **final prose** for all 3 posts (use `docs/content/blog/*`), add
reading-time, a table of contents, and cognition.ai-style inline graphics (wax-paper
figures, pull-quotes). Verify the serif/blue-selection editorial feel.
**Don't:** invent metrics; pull only from `src/data/` + the briefs.

### 🅓 About deepening  (`ws/about`)
**Owns:** `src/pages/about.astro`, `src/data/experience.ts`, `src/components/Timeline.astro` (new).
**Do:** enrich the timeline (logos from past orgs), add a "how this site was built with
Devin" sub-section (screenshots/session links), wire a working contact (mailto is fine;
or a form via a serverless function — coordinate with 🅕 if so).
**Don't:** touch other pages.

### 🅔 Menu deep-dives  (`ws/menu`)
**Owns:** `src/pages/menu/[slug].astro` (new), `src/data/initiatives.ts` (extend).
**Do:** create a dedicated page per initiative (House Roast / Single-Origin / Roasters'
Guild) with the full program design: phases, KPIs, the Cursor parallel, and Ali's proof.
Link the home cards to these. Extend the `Initiative` type as needed (keep `slug` stable).
**Don't:** rename existing slugs or break the home page's map.

### 🅕 Polish, SEO, a11y, deploy  (`ws/polish`)  ← run LAST / continuously
**Owns:** `astro.config.mjs`, `public/*` (og images, robots), `src/components/SEO.astro`
(new), small cross-cutting fixes.
**Do:** OG/Twitter card images, favicon set, `robots.txt`, Lighthouse pass (perf/a11y),
responsive QA at 375/768/1280, deploy config (Vercel/Netlify/CF Pages) + domain.
**Coordinate:** this Devin may touch many files — run it after A–E land, or in a final pass.

---

## Suggested wave plan

```
Wave 1 (parallel):   🅐 Home   🅑 Community   🅒 Blog   🅓 About   🅔 Menu
Wave 2 (single):     🅕 Polish + SEO + a11y + deploy
```

## Prompt template for each cloud Devin

```
You are building one workstream of cognitioncoffee.co (The Cognition Coffee Company),
a portfolio/proposal site for Cognition's Developer Community Manager role.

1. Read README.md, AGENTS.md, docs/BRAND.md, docs/DESIGN_SYSTEM.md, docs/ARCHITECTURE.md.
2. Your workstream is: <🅐/🅑/🅒/🅓/🅔/🅕 — paste the section from docs/ORCHESTRATION.md>.
3. Build ONLY the files your workstream owns. Reuse brand primitives + tokens.
4. Use only verified copy from src/data/ and docs/content/. Invent nothing.
5. Run `npm run build` — it must pass. Test responsive at 375/768/1280.
6. Open a single PR titled "ws/<name>: <summary>" listing files touched + any new deps.
```

## Definition of done (whole site)
All workstreams merged · builds green · Lighthouse a11y + perf ≥ 90 · 3 finished blog
posts · interactive community globe · deployed to `cognitioncoffee.co` · reviewed by Ali
before any outreach to Nader.
