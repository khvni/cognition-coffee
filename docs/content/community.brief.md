# Content brief — Community page (the centerpiece)

Goal: show a warmer, more centralized home for the Devin community than the current
`devin.ai/community` (which is just 5 cards + a Google Form). Borrow Cursor's warmth
without copying it; keep Cognition's editorial restraint.

## What Cursor does well (model, don't clone)
- "Join the global Cursor community." Cafe Cursor / Workshops / Meetups / Hackathons.
- Tweet wall of real events as social proof; an interactive **globe** + chronological,
  Luma-powered RSVP list. Stats: 700+ events, 200+ cities, 80+ countries, 300+ ambassadors.
- Tone: human, coffee-forward, low-friction.

## What Cognition has today (the gap we fix)
- `devin.ai/community`: Events (luma.com/devin), Ambassadors (Google Form), Event Support
  (Form), Discord (`discord.gg/GjCYNGChrw`), Reddit (r/CognitionLabs). That's it.
- They *already* use Luma + Discord — so this is a presentation/coordination gap, not a
  tooling gap. Lean into that: "the pieces exist; here's the home they deserve."

## Sections (in `community.astro`)
1. **Hero** — "Join the global Devin community." Honest nod to the current page.
2. **Vision stats** — framed as targets (Y1), not fake current numbers. See `COMMUNITY_STATS`.
3. **What we do** — Cafe Cognition / Workshops / Meetups / Hackathons (wax-paper cards + imagery).
4. **Upcoming events** — mock data via `getEvents()` (Luma-ready). Needs the **interactive
   globe** (workstream 🅑) plotting `MOCK_EVENTS` lat/lng, plus a filterable list.
5. **Programs** — Ambassadors (3 tiers), Devin Office Hours, Discord (real link), Event Support.

## Tone guardrails
- Be candid that this is a *proposed redesign*, not the official page.
- "Cafe Cognition" is the coffee-brand parallel to Cafe Cursor — own it tastefully.
- Stats are targets/vision; never present invented current numbers as real.
