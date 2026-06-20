# COMPONENTS.md

The agent-first layer (principle #9). Build the OS/site shell by **composing these
primitives**, not by reinventing them. Tokens live in `tailwind.config.js`
(see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)); state lives in the XState machine
(see [ADR-001](./ADR-001-frontend-architecture.md)). Reference token classes
(`bg-canvas`, `text-accent-ink`, `border-line`) — never raw hexes.

## How they fit together

```
<AppProvider>                     ← runs osMachine, mirrors state ⇄ URL (nuqs)
  <Wrapper>                       ← chooses os | site, wraps each in <ErrorBoundary>
    os:   <Desktop/> + <AppWindow/>* + <TaskBar/>
    site: <SiteNav/> + page + <SiteFooter/>
```

`gatsby-browser.tsx` / `gatsby-ssr.tsx` wrap every page in `<AppProvider><Wrapper>`. Both read
the OS app list from the single registry `src/lib/apps.ts` (`APPS`), so a new app/route is
added in exactly one place.

## Primitives

### `Wrapper` — `src/components/Wrapper.tsx`
Top-level chrome. Reads `experience` from `useApp()` and renders the windowed desktop (`os`) or
the plain arranged-pages site (`site`). Both branches are wrapped in `ErrorBoundary`.
- **Props:** `{ children: ReactNode }` (the active Gatsby page).
- **Compose, don't fork:** add chrome here; don't branch mode logic in pages.

### `Desktop` — `src/components/Desktop.tsx`
The OS backdrop: otter wallpaper + vintage CRT overlay (`Crt`, scanlines/grille/vignette, with
a reduced-motion guard) and the launchable app-icon grid. Double-click (or keyboard-activate)
an icon → `open(app.path)`.
- **Props:** none — reads `open` from `useApp()` and `APPS` (filtered to `desktop: true`).
- **Locked:** wallpaper asset and CRT treatment are part of the brand; don't alter.

### `AppWindow` — `src/components/AppWindow.tsx`
One draggable, resizable window (`framer-motion`). Renders the title bar (traffic-light
controls + icon + title), the routed content, and the resize handle. Drag is constrained to the
desktop; `onDragEnd` commits the position to the machine (`MOVE`). Maximize insets 8px on each
side; double-click the title bar toggles it. Honors `prefers-reduced-motion`.
- **Props:** `{ item: WindowItem }` (the machine's window record: `key, app, path, title,
  element, x, y, w, h, z, minimized, maximized`).
- **Intent in, not state:** calls `useApp()` methods (`focusWindow`, `closeWindow`,
  `minimizeWindow`, `toggleMaximize`, `moveWindow`, `resizeWindow`) — it never owns window
  state.

### `TaskBar` — `src/components/TaskBar.tsx`
Bottom OS bar: brand wordmark, a pill per open window (click to focus / minimize / restore),
the `ModeToggle`, and a live clock. Active vs minimized pills are styled from `focusedKey` +
`minimized`.
- **Props:** none — reads `windows`, `focusedKey`, `focusWindow`, `minimizeWindow` from
  `useApp()`.

### `ModeToggle` — `src/components/ModeToggle.tsx`
Segmented OS ⇄ Site switch. Calls `setExperience(...)`, which the provider mirrors to
`?mode=`. **Returns `null` on mobile** (`isMobile()`), enforcing the deliberate mobile
OS-bypass guard — mobile stays site-only.
- **Props:** none — reads `experience`, `setExperience` from `useApp()`.

### `AppIcon` — `src/components/AppIcon.tsx`
Bespoke real-OS-style app tile: per-app gradient + sheen + inset rim with an SVG glyph. Used by
`Desktop` (large launchers), `TaskBar`, and `AppWindow` (title bars).
- **Props:** `{ id: AppId; size?: number; className?: string }` (`size` default 22).
- **Locked:** glyphs and colors are brand assets; don't recolor.

### `Otter` — `src/components/Otter.tsx`
Faint monospace ASCII Devin-otter mascot, rendered as wallpaper texture (`aria-hidden`, low
opacity) so it never competes with icons.
- **Props:** none.

### `ErrorBoundary` — `src/components/ErrorBoundary.tsx`
Class boundary (principle #11). Catches render errors anywhere in the shell and shows a calm,
on-brand fallback (wordmark + reload button) instead of a white screen.
- **Props:** `{ children: ReactNode }`.

## State access — `useApp()` (`src/context/App.tsx`)

Every primitive reads OS state through one hook rather than prop-drilling. `useApp()` exposes a
projection of the machine plus intent methods:

| Field / method | Purpose |
|----------------|---------|
| `experience`, `setExperience(e)` | Current OS/Site mode + setter (no-op on mobile) |
| `windows`, `focusedKey` | The open windows and which one is focused |
| `open(path)` | Navigate within the OS, opening/raising a window for that route |
| `closeWindow`, `focusWindow`, `minimizeWindow`, `toggleMaximize` | Window lifecycle intent |
| `moveWindow(key,x,y)`, `resizeWindow(key,w,h)` | Commit geometry after drag/resize |
| `constraintsRef` | Drag-bounds ref for the desktop surface |

Rule of thumb: **primitives express intent, the machine owns state, the provider owns the
URL.** Don't add `useState` for window state in a component — add an event to the machine.

## App registry — `src/lib/apps.ts`

`APPS: AppDef[]` is the single source for OS apps and their routes
(`id, title, path, blurb, icon, size, center?, desktop?`). `Desktop`, `TaskBar`, `AppWindow`,
and the URL parsers all read from it. `appForPath(pathname)` resolves which app owns a route.
Add an app once here and it appears everywhere.
