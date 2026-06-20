# ADR-001 — Applying /fardeem-frontend to Cognition Coffee

**Status:** Accepted · **Date:** 2026-06

## Context

Cognition Coffee is a **Gatsby 5 (React 18 + TypeScript)** static site with a mock
desktop "OS" (draggable windows, taskbar, mode toggle) plus a plain "Site" view. The
OS is the interactive headline — windows come in/out of view, maintain z-order and
geometry, and can be minimized/maximized/dragged.

Since the initial /fardeem-frontend evaluation, the codebase has grown a **backend
layer**: Cloudflare Functions (`functions/api/`) provide auth and CRUD for a blog CMS
(`/admin`), backed by the GitHub Contents API. The admin page includes a Tiptap rich-text
editor. A set of **UI primitives** (`src/components/ui/`) has also been added (Button,
Badge, Card, Container, Stack, Text).

The 15 principles are evaluated against this current state — some that were N/A before
are now deferred because there IS a backend to bind to, and some that were absent are
now partially satisfied.

## Decision summary

| # | Principle | Verdict | Notes |
|---|-----------|---------|-------|
| 1 | Generate client code from OpenAPI specs | **Deferred** | API exists (`functions/api/`) but is 3 endpoints. `Post` type duplicated 3×; shared types file is the next step. Full OpenAPI codegen when the API grows. |
| 2 | Use TanStack Query for server state | **Deferred** | Admin uses raw `fetch`+`useState` for CRUD. Works for 1 page behind auth; TanStack Query justified when admin grows beyond a handful of endpoints. |
| 3 | Architect sync/offline from day 1 | **N/A** | No client-side user data mutations or offline requirements. Admin writes to GitHub API server-side. |
| 4 | Use a real router with data loaders | **Already satisfied** | Gatsby owns routing with file-system + programmatic (`gatsby-node.ts`) page creation and data loading. Swapping to TanStack Router would be a full framework migration. |
| 5 | Make query params type-safe first-class citizens | **Implemented** | `nuqs` parsers (`parseAsStringEnum`, `parseAsArrayOf`, `parseAsStringLiteral`) project OS mode, open windows, and focused window into the URL. A desktop arrangement is now shareable: `?mode=os&open=menu,about&focus=about`. |
| 6 | One state management solution for server state | **Implemented (spirit)** | XState v5 is the single source of truth for the OS shell — the bespoke need the principle identifies. Admin server-state is too small for a dedicated library; raw fetch is honest for 3 endpoints. |
| 7 | Model interactive apps as state machines (XState) | **Implemented (headline)** | `src/os/osMachine.ts`: single machine for window lifecycle (OPEN/CLOSE/FOCUS/MINIMIZE/MAXIMIZE/RESTORE/MOVE/RESIZE), z-order, and OS⇄Site mode. The React layer is a thin view. |
| 8 | React Compiler eliminates useMemo/useCallback | **Implemented** | `babel-plugin-react-compiler` (target 18) wired via `onCreateBabelConfig` in `gatsby-node.ts`. Build stays green. |
| 9 | Agent-first design system, not raw Tailwind | **Partially satisfied** | UI primitives exist (`src/components/ui/`: Button, Badge, Card, Container, Stack, Text; `src/lib/tokens.ts` for text presets). Brand primitives (Wrapper, Desktop, AppWindow, etc.) are established. The admin page uses raw Tailwind instead of these primitives. Formalized in `docs/COMPONENTS.md`. |
| 10 | Hack your router to fit your needs | **Already satisfied** | Every Gatsby route becomes a draggable OS window. Deep-links restore desktop arrangements via the URL projection. |
| 11 | Use Suspense and ErrorBoundary | **Implemented (ErrorBoundary)** | `ErrorBoundary` wraps both OS and Site shells in `Wrapper.tsx`. Suspense is deliberately omitted — nothing in the render path is lazy/async, so there's no pending state to model. |
| 12 | Pick a blessed path for WebSockets/SSE | **N/A** | No real-time features. Admin polls via manual fetch. |
| 13 | Don't use Next.js for SPAs | **Already satisfied** | Static Gatsby. |
| 14 | Deploy on Cloudflare or Vercel | **Already satisfied** | Cloudflare Pages + Functions via GitHub Actions. |
| 15 | Build the factory that builds the thing | **Already satisfied** | `.tsx` content registries → `gatsby-node.ts` codegen → templates. Vendored skills. UI primitive barrel (`src/components/ui/index.ts`). Token presets (`src/lib/tokens.ts`). |

**Net:** 5 implemented (#5, #7, #8, #9 partial, #11), 4 already satisfied (#4, #10, #13, #14, #15 = 5), 2 deferred (#1, #2), 2 N/A (#3, #12).

## Implemented

### #7 — XState OS machine

`src/os/osMachine.ts` — a single XState v5 machine that is the sole source of truth for
the windowed desktop. Context holds `windows[]`, `focusedKey`, `topZ`, `keySeq`. States
are `os` and `site` (guarded `SET_MODE`). Events: `OPEN` (deduplicates by path),
`CLOSE`, `CLOSE_ALL`, `FOCUS`, `FOCUS_PATH`, `MINIMIZE`, `MAXIMIZE`, `RESTORE`, `MOVE`,
`RESIZE`.

`src/context/App.tsx` bridges the machine to React via `useMachine()`, exposes the same
`useApp()` API so no consumer component changes, and wires URL + localStorage projection.

### #5 / #10 — Typed URL state with nuqs

Three nuqs parsers mirror the machine state into the URL:

```ts
const modeParser  = parseAsStringEnum<Experience>(["os", "site"])
const openParser  = parseAsArrayOf(parseAsStringLiteral(APP_IDS)).withDefault([])
const focusParser = parseAsStringLiteral(APP_IDS)
```

The machine is the source of truth; the URL is a projection. On boot, mode resolves as
`URL → localStorage → innerWidth heuristic → default "os"`, preserving the old
returning-visitor localStorage persistence while making mode shareable via URL.

Deep-link restore uses a queue: open each window one route-change at a time, then
`FOCUS_PATH` the target. A `normPath()` helper strips Gatsby's trailing slashes so
`/menu/` matches APPS[].path `/menu`.

### #8 — React Compiler

`babel-plugin-react-compiler` (target 18) added to Gatsby's babel pipeline via
`onCreateBabelConfig` in `gatsby-node.ts`. The compiler's runtime memo-cache appears in
the output bundle. The XState refactor already eliminated the manual `useMemo` and
`useCallback` calls that were in the old `App.tsx`, so there is nothing left to manually
memoize.

### #11 — ErrorBoundary

`src/components/ErrorBoundary.tsx` — class component with `getDerivedStateFromError` and
`componentDidCatch`. Branded fallback (wordmark + "Something went sideways" + reload
button). Both the OS shell and the Site shell are wrapped in `Wrapper.tsx`.

Suspense is deliberately omitted: nothing in the render path is lazy-loaded or async.
Fabricating a `Suspense` boundary around synchronous content is the over-engineering
that `/poteto-mode` forbids.

### #9 — Agent-first design system

Tailwind kept per constraint. The agent-first layer is formalized as:

- **Tokens:** `tailwind.config.js` (`theme.extend`) + `src/lib/tokens.ts` (text presets)
  + `src/lib/layout.ts` (container).
- **UI primitives:** `src/components/ui/` — Button, Badge, Card, Container, Stack, Text.
  Barrel-exported from `src/components/ui/index.ts`.
- **Brand primitives:** Wrapper, Desktop, AppWindow, TaskBar, ModeToggle, AppIcon, Otter,
  ErrorBoundary.
- **Catalog:** `docs/COMPONENTS.md`.

## Explicitly not done (and why)

**#1 OpenAPI codegen** — the API is 3 Cloudflare Function endpoints (~200 lines total).
Full OpenAPI spec → codegen for this is over-engineering. The immediate win is a shared
`Post` type (extract from the duplicated definitions in `functions/api/posts/index.ts`,
`functions/api/posts/[slug].ts`, and `src/pages/admin.tsx`). Deferred until API scope
grows.

**#2 TanStack Query** — the admin page is the only server-state consumer (1 page, behind
auth, 3 endpoints). Raw `fetch` + `useState` is honest at this scale. When the admin
grows or the public site starts fetching dynamic data, TanStack Query becomes the
obvious next step.

**#3 Sync/offline** — no client-side user data mutations. The admin writes to GitHub API
server-side. Nothing to sync or make offline-first.

**#4 TanStack Router swap** — Gatsby's routing is the framework. Replacing it is a
migration, not an architecture decision.

**#12 WebSockets/SSE** — no real-time features exist or are planned.

**Suspense** — nothing is lazy or async in the render tree. Adding Suspense boundaries
around synchronous content adds indirection with no benefit.

## Consequences

**Dependencies added:** `xstate@5.32.0`, `@xstate/react@6.1.0`, `nuqs@2.8.9`,
`babel-plugin-react-compiler@1.0.0`, `react-compiler-runtime@1.0.0`. All stable,
published well over 7 days ago.

**Window behavior is now machine-testable.** The XState machine can be tested in
isolation without rendering — send events, assert context.

**Desktop arrangement is URL.** A `?mode=os&open=menu,about&focus=about` link
round-trips the desktop state. Mode also persists to localStorage for returning visitors.

**React Compiler drops the manual-memo reflex.** No `useMemo`, `useCallback`, or `memo`
needed. The compiler handles it.

**The admin page's raw-fetch pattern is an explicit trade-off.** It works at current
scale but is the first candidate for TanStack Query if the admin grows.
