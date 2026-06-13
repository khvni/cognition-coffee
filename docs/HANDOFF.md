# HANDOFF.md — Launching the fleet of Devins

The scaffold is done and pushed to **`github.com/khvni/cognition-coffee`**. This doc is
the turnkey handoff: how to dispatch the remaining work to **Devin Cloud**.

> Why this is a manual launch: spinning up cloud sessions consumes ACUs and runs under
> Ali's account, so the "go" button is his. Everything else (scope, prompts, env,
> guardrails) is prepared below + tracked as GitHub issues.

## Two ways to dispatch each workstream

**A. From the Devin web app** (recommended)
1. Go to <https://app.devin.ai> → **New session**.
2. Repo: `khvni/cognition-coffee`. Branch from `main`.
3. Paste the workstream prompt below. Send.

**B. From the GitHub issue queue**
Each Wave-1 workstream has an issue (label `devin` + `ws:*`). Open the issue and
**"Ask Devin"** / assign Devin, or comment `@Devin pick this up`. The issue body already
contains the full prompt.

## Environment (cloud sessions provision with)

- Node ≥ 22, npm. `npm install` then `npm run build` (must pass).
- Quality gate: `npm run slop` (deslop, by Nader Dabit) → **0 high-severity, score < 20**.
- No secrets needed; static site.

## Wave plan

```
Wave 1 (run in parallel, one Devin each):
  🅐 ws/home   🅑 ws/community   🅒 ws/blog   🅓 ws/about   🅔 ws/menu
Wave 2 (after 1 merges, single Devin):
  🅕 ws/polish  (SEO, a11y, perf, responsive QA, deploy to cognitioncoffee.co)
```

Each owns a disjoint file set (see `docs/ORCHESTRATION.md`) so parallel sessions don't collide.

---

## Copy-paste session prompts

Every prompt shares this preamble — keep it:

> You are building one workstream of **cognitioncoffee.co** (The Cognition Coffee
> Company), an Astro + Tailwind portfolio/proposal site for Cognition's Developer
> Community Manager role. Repo: `khvni/cognition-coffee`.
> **First:** read `README.md`, `AGENTS.md`, `docs/BRAND.md`, `docs/DESIGN_SYSTEM.md`,
> `docs/ARCHITECTURE.md`, `docs/ORCHESTRATION.md`.
> **Modes:** enter `/poteto-mode` (read its SKILL.md first); code `/caveman`-concise;
> apply `/impeccable` for any UI/design-system work.
> **Rules:** build ONLY the files your workstream owns; reuse the brand primitives +
> tokens; use only verified copy from `src/data/` and `docs/content/` (invent nothing).
> **Before done:** `npm run build` passes AND `npm run slop` shows 0 high-severity
> (score < 20). Test at 375/768/1280. Open ONE PR titled `ws/<name>: <summary>`.

### 🅐 ws/home
> Workstream: Home polish & motion. Owns `src/pages/index.astro` and any new
> `src/components/Hero*.astro` / `Marquee.astro`. Elevate the hero (scroll-reveal,
> subtle parallax on the wax-paper, animated proof bar), add a credibility marquee,
> refine the "built with Devin" terminal beat. Respect `prefers-reduced-motion`.

### 🅑 ws/community
> Workstream: Community centerpiece. Owns `src/pages/community.astro`, new
> `src/components/Globe.*` + `EventList.astro`, and the events bits of `src/lib/events.ts`.
> Build the interactive globe plotting `MOCK_EVENTS` lat/lng (use `cobe`), a filterable
> event list, a Cursor-style social-proof wall, and imagery for the "what we do" cards.
> Keep the Luma adapter intact (mock now, Luma-ready).

### 🅒 ws/blog
> Workstream: Blog content + reading experience. Owns `src/content/blog/*.mdx`,
> `src/pages/blog/index.astro`, `src/layouts/BlogPost.astro`, new `src/components/Prose*`.
> Write the FINAL prose for all 3 posts using `docs/content/blog/README.md`. Add
> reading-time, a TOC, and cognition.ai-style inline wax-paper figures + pull-quotes.
> Verify the serif + Devin-blue-selection editorial feel.

### 🅓 ws/about
> Workstream: About deepening. Owns `src/pages/about.astro`, `src/data/experience.ts`,
> new `src/components/Timeline.astro`. Enrich the timeline (org logos), add a "how this
> site was built with Devin" sub-section, wire a working contact (mailto is fine).
> Verified facts only (see `docs/content/about.brief.md`).

### 🅔 ws/menu
> Workstream: Menu deep-dives. Owns new `src/pages/menu/[slug].astro` and extends
> `src/data/initiatives.ts`. One page per initiative (House Roast / Single-Origin /
> Roasters' Guild) with full program design: phases, KPIs, the Cursor parallel, Ali's
> proof. Link the home cards to these. Keep existing slugs stable.

### 🅕 ws/polish  (run last)
> Workstream: Polish, SEO, a11y, deploy. Owns `astro.config.mjs`, `public/*`, new
> `src/components/SEO.astro`, small cross-cutting fixes. OG/Twitter images, favicon set,
> `robots.txt`, Lighthouse pass (perf + a11y ≥ 90), responsive QA, and deploy
> (Vercel/Netlify/CF Pages) with the `cognitioncoffee.co` domain.

---

## Definition of done (whole site)
All workstreams merged · builds green · deslop clean · Lighthouse a11y + perf ≥ 90 ·
3 finished blog posts · interactive community globe · deployed to `cognitioncoffee.co` ·
reviewed by Ali before any outreach to Nader.
