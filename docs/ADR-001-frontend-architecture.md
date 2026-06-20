# ADR-001 — Applying /fardeem-frontend to Cognition Coffee

**Status:** Accepted · **Date:** 2026-06 · **Scope:** `devin/fardeem-frontend` → `devin/os-uiux-overhaul`

## Context

[`/fardeem-frontend`](../.devin/skills/fardeem-frontend/SKILL.md) lists 15 architecture
principles for a frontend meant to scale to a billion-dollar app. Cognition Coffee is a
**static Gatsby 5 site** (React 18 + TypeScript): a mock desktop "OS" of draggable windows
plus a plain "Site" view, toggled at runtime. There is **no backend, no API, no server
state, no auth, no real-time** — every page is a `.tsx` content component compiled at build
time.

So several principles have nothing to bind to. Forcing them on a static site is exactly the
over-engineering `/poteto-mode` and `/caveman` forbid. This ADR evaluates **all 15** and
records what we built, what was already true, and what is genuinely N/A — so the decision is
on the record instead of cargo-culted.

## Decision summary

| # | Principle | Verdict | Notes |
|---|-----------|---------|-------|
| 1 | Generate client code from OpenAPI specs | **N/A** | No backend or API. There are no backend types to generate; content is `.tsx` compiled at build. |
| 2 | TanStack Query for server state | **N/A** | No server state. The one async-shaped seam (`getEvents()` in `src/lib/events.ts`) returns mock data; adding a query cache would wrap nothing. |
| 3 | Architect sync/offline from day 1 | **N/A** | No user data and no mutations to sync. A static bundle is already fully offline-capable once the CDN/SW caches it. |
| 4 | Real router with data loaders | **Already satisfied** | Gatsby owns routing and build-time data (`gatsby-node.ts` generates every route). Swapping in TanStack Router would fight the framework — the skill itself says don't fight your SSG. |
| 5 | Type-safe query params as first-class | **Implemented** | `nuqs` typed parsers drive `?mode`, `?open`, `?focus`. See "Implemented" below. |
| 6 | One state solution for server state; xstate/store for bespoke | **Implemented (spirit)** | No server state to consolidate. The bespoke need — OS window interaction — is modeled in XState, exactly the "bespoke needs → xstate" carve-out. |
| 7 | Model interactive apps as state machines (XState) | **Implemented (headline)** | The windowed OS is the textbook "things coming in/out of view" case. `src/os/osMachine.ts` is the single source of truth. |
| 8 | React Compiler eliminates useMemo/useCallback | **Implemented** | `babel-plugin-react-compiler` (target 18) wired into Gatsby's Babel pipeline; build stays green and the OS was re-verified in-browser. |
| 9 | Agent-first design system, not raw Tailwind | **Implemented (adapted)** | Constraint: keep Tailwind. We formalized the agent-first layer instead — tokens + brand primitives + [`COMPONENTS.md`](./COMPONENTS.md) + `/impeccable`. |
| 10 | Hack your router to fit your needs (drawers as routes) | **Implemented (adapted)** | The OS turns each Gatsby route into a **window** rather than a full page; deep-links restore an arrangement. "Here's a route, make it a window." |
| 11 | Suspense + ErrorBoundary over isPending/isError | **Implemented (ErrorBoundary)** | Branded `ErrorBoundary` wraps both shells. Suspense omitted on purpose — nothing is async/lazy, so there is no loading state to model. |
| 12 | Blessed WebSocket/SSE path on day 1 | **N/A** | No real-time features and no server to push from. |
| 13 | Don't use Next.js for SPAs | **Already satisfied** | Static Gatsby, not Next. |
| 14 | Deploy on Cloudflare or Vercel | **Already satisfied** | Cloudflare Pages via GitHub Actions (`.github/workflows/deploy.yml`; see [DEPLOY.md](./DEPLOY.md)). |
| 15 | Build the factory that builds the thing | **Already satisfied** | The repo *is* a factory: `.tsx` content registries + `gatsby-node.ts` route codegen, the `src/lib/apps.ts` single-source app registry, vendored `/poteto` `/caveman` `/impeccable` skills, `AGENTS.md`, and the `deslop` gate. |

Net: **5 implemented** (#5, #7, #8, #9, #10 — plus #6/#11 in spirit), **4 already satisfied**
(#4, #13, #14, #15), **4 N/A** (#1, #2, #3, #12).

## Implemented

### #7 — XState OS machine *(headline)*

Window state (open windows, focus/z-order, minimize/maximize, geometry, OS⇄Site mode) was
spread across `App.tsx`/`Desktop.tsx`/`AppWindow.tsx` as `useState`/`useEffect`. It now lives
in one machine, [`src/os/osMachine.ts`](../src/os/osMachine.ts):

- **Context:** `windows[]`, `focusedKey`, `topZ`, `keySeq`.
- **Events:** `OPEN`, `CLOSE`, `FOCUS`, `FOCUS_PATH`, `MINIMIZE`, `MAXIMIZE`, `RESTORE`,
  `MOVE`, `RESIZE`, `SET_MODE`.
- **States:** top-level `os` / `site`, switched by a guarded `SET_MODE`.

`OPEN` dedupes by `path` (re-opening a route raises and un-minimizes the existing window
rather than spawning a duplicate). React stays a thin view: `src/context/App.tsx` runs the
machine via `useMachine` and exposes intent methods (`open`, `focusWindow`, …). **No visual or
behavioral change** — drag, focus-on-click, traffic-light hover controls, the minimize
animation, taskbar, wallpaper, and CRT overlay are all preserved; this is a refactor, not a
redesign.

### #5 / #10 — Typed URL state with nuqs

`src/context/App.tsx` mirrors the machine into type-safe query params with `nuqs`, so any
desktop arrangement is shareable and restorable by URL:

```ts
const modeParser  = parseAsStringEnum<Experience>(["os", "site"])
const openParser  = parseAsArrayOf(parseAsStringLiteral(APP_IDS)).withDefault([])
const focusParser = parseAsStringLiteral(APP_IDS)
// → ?mode=os&open=menu,about&focus=about
```

The machine is the source of truth; the URL is a projection of it. On boot we replay the URL
once (open each window, then `FOCUS_PATH` the target); afterwards the machine drives the URL.
This is also our take on #10 — rather than bolt a router library on, we treat **each Gatsby
route as a window** and let the URL encode the whole arrangement.

> One subtlety worth recording: Gatsby's `location.pathname` carries a trailing slash
> (`/menu/`) but `APPS[].path` does not (`/menu`). The restore queue compares the two, so
> `App.tsx` normalizes with `normPath()` before comparing. Without it the deep-link restore
> queue never drains.

### #8 — React Compiler

`babel-plugin-react-compiler@1.0.0` + `react-compiler-runtime@1.0.0` are wired into Gatsby's
Babel pipeline in `gatsby-node.ts`:

```ts
export const onCreateBabelConfig: GatsbyNode["onCreateBabelConfig"] = ({ actions }) => {
  actions.setBabelPlugin({ name: "babel-plugin-react-compiler", options: { target: "18" } })
}
```

`target: "18"` is required because the app is React 18 (the runtime supplies the memo-cache
hook the compiler emits). Verified: `gatsby build` stays green (9/9 pages), the compiler's
runtime cache appears in the output bundle (proving it actually transforms components, not a
silent no-op), and the full OS was re-exercised in-browser with the compiler on
(deep-link restore, focus-on-click, drag, minimize) with no regressions or console warnings.
The codebase had **zero** manual `useMemo`/`useCallback`/`memo` to delete.

### #9 — Agent-first design system (kept Tailwind, formalized the layer)

The constraint is to preserve the visual layer, so Tailwind stays. The agent-first layer is
the **tokens** (`tailwind.config.js` `theme.extend`, documented in
[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)) plus the **brand primitives** now catalogued in
[COMPONENTS.md](./COMPONENTS.md). Agents compose `Wrapper`/`Desktop`/`AppWindow`/`TaskBar`/
`ModeToggle`/`AppIcon` and reference token classes (`bg-canvas`, `text-accent-ink`) — never
raw hexes — which is the maintainability win the principle is after.

### #11 — ErrorBoundary

[`src/components/ErrorBoundary.tsx`](../src/components/ErrorBoundary.tsx) wraps both the OS and
Site shells in `Wrapper.tsx` with a calm, on-brand fallback (wordmark + reload). Suspense is
deliberately **not** added: nothing in the tree is async or lazy, so there is no pending state
to suspend on — inventing one would be the fabrication the skill warns against.

## Explicitly not done (and why)

- **#1 OpenAPI, #2 TanStack Query, #3 sync/offline, #12 WebSockets/SSE** — no backend, server
  state, or real-time exists to bind these to. Building them would add dependencies and
  indirection around nothing.
- **#4 TanStack Router** — Gatsby already provides routing + data loading; replacing it is a
  framework migration, not an improvement.
- **Suspense (part of #11)** — no async boundary to model.
- **Next.js / removing Tailwind** — out of scope by constraint and by principle (#13, #9).

## Consequences

- Window behavior is now testable and reasoned about in one file; adding an event or state is
  localized to the machine.
- A desktop arrangement is a URL — shareable, bookmarkable, restorable.
- React Compiler keeps renders cheap without hand-memoization, and sets the codebase up to
  drop `useMemo`/`useCallback` reflexes going forward.
- Dependencies added (all stable, published well over 7 days ago): `xstate`, `@xstate/react`,
  `nuqs`, `babel-plugin-react-compiler`, `react-compiler-runtime`.
