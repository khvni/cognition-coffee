# ARCHITECTURE.md

## Routes

| Route | File | Status | Notes |
|-------|------|--------|-------|
| `/` | `pages/index.astro` | 🟢 built | Hero, proof bar, **The Menu** (3 initiatives), "built with Devin", CTA |
| `/community` | `pages/community.astro` | 🟡 structure | **Centerpiece.** Redesign of devin.ai/community. Needs interactive globe + polish |
| `/about` | `pages/about.astro` | 🟢 built | Bio, Build/Teach/Connect, timeline, why-Cognition, contact |
| `/blog` | `pages/blog/index.astro` | 🟢 built | Editorial index ("The Roastery") |
| `/blog/<slug>` | `pages/blog/[...slug].astro` | 🟡 stubs | 3 posts exist as **outline stubs**; prose TODO |
| `/menu/<slug>` | _not created_ | 🔴 todo | Optional deep-dive page per initiative |
| `sitemap-index.xml` | auto | 🟢 | via `@astrojs/sitemap` |

## Navigation (`src/lib/site.ts`)

- **The Menu** → `/#menu` (the 3-program proposal on the homepage)
- **Resources ▾** (hover dropdown) → **Blog** `/blog` · **Community** `/community` · **About** `/about`
- CTA: **Let's talk ☕** → `/about#contact`

The Resources dropdown is pure CSS hover (`group-hover`) with a mobile fallback toggle.

## Data model

All verified content lives outside the page templates:

| File | Exports | Consumed by |
|------|---------|-------------|
| `src/lib/site.ts` | `SITE`, `NAV`, `CTA` | Nav, Footer, Base, pages |
| `src/data/initiatives.ts` | `INITIATIVES[]` (the 3 programs) | Home `/#menu`, future `/menu/[slug]` |
| `src/data/experience.ts` | `BIO`, `PROOF_POINTS`, `PILLARS`, `EXPERIENCE`, `WHY_COGNITION` | About, Home proof bar |
| `src/lib/events.ts` | `getEvents()`, `COMMUNITY_STATS`, `MOCK_EVENTS`, providers | Community |
| `src/content.config.ts` | `blog` collection schema | Blog index + post route |

### Events: mock now, Luma-ready
`src/lib/events.ts` defines an `EventProvider` interface with a working `mockProvider`
and a stubbed `lumaProvider`. The UI calls `getEvents()` and never touches the source.
To go live later, implement `lumaProvider` against `https://luma.com/devin` and flip
`eventProvider`. **No UI change required.**

## Page specs (what each page is trying to do)

### `/` Home — the pitch
Hero (hook + thesis + VT100 otter) → proof bar (5 metrics) → **The Menu** (3 wax-paper
initiative cards) → "built with Devin" dark-roast meta beat → closing CTA to Nader.

### `/community` — the centerpiece (redesign of devin.ai/community)
Today's real page is 5 links + a Google Form. This redesign borrows Cursor's warmth:
hero → vision stats → **What we do** (Cafe Cognition / Workshops / Meetups / Hackathons)
→ **Upcoming events** (mock, Luma-ready) with an **interactive globe** (TODO) →
**Programs** (Ambassadors / Office Hours / Discord / Event Support). Discord link is real
(`discord.gg/GjCYNGChrw`).

### `/about` — Ali Khani
Intro + coordinates → Build/Teach/Connect pillars → experience timeline → why-Cognition
(permissionless apprenticeship) → contact (email + X), addressed to Nader.

### `/blog` — "The Roastery"
Editorial serif index of 3 posts. Posts are the proof-of-thinking:
1. *Brewing Community: What I'd Build for Cognition in 90 Days* (the proposal)
2. *From Cafe Cursor to Cafe Cognition* (the playbook)
3. *Devin Beyond Code* (the differentiator)

## Build & deploy
- Static output (`output: "static"`). `npm run build` → `./dist`.
- Deploy to Vercel/Netlify/Cloudflare Pages. Set custom domain `cognitioncoffee.co`.
- `site` is set in `astro.config.mjs` for correct canonical + sitemap URLs.
