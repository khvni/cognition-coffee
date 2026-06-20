# COMPONENTS.md

The agent-first layer (principle #9). Build the OS/site shell by **composing these
primitives**, not by reinventing them.

## How they fit together

```
<AppProvider>                     ← runs osMachine, mirrors state ⇄ URL (nuqs) + localStorage
  <Wrapper>                       ← chooses os | site, wraps each in <ErrorBoundary>
    os:   <Desktop/> + <AppWindow/>* + <TaskBar/>
    site: <SiteNav/> + page + <SiteFooter/>
```

## Brand primitives

### `Wrapper` — `src/components/Wrapper.tsx`

Top-level chrome. Reads `experience` from `useApp()` and renders OS or site shell. Both
wrapped in `ErrorBoundary`.

- **Props:** `{ children: ReactNode }` (the Gatsby page).
- **Compose, don't fork:** add chrome here; don't branch mode logic in pages.
- Also houses `SiteNav`, `SiteFooter`, and `Wordmark` (internal).

### `Desktop` — `src/components/Desktop.tsx`

Wallpaper + CRT overlay + launchable app icons. Double-click → `open(app.path)`.

- **Props:** none — reads `open` from `useApp()` and `APPS` (filtered to `desktop: true`).
- **Locked:** wallpaper asset (`/wallpapers/otter-desktop.jpg`) and CRT treatment are brand.

### `AppWindow` — `src/components/AppWindow.tsx`

Draggable, resizable window (framer-motion). Titlebar (macOS traffic lights + icon +
title), content, resize handle.

- **Props:** `{ item: WindowItem }` (machine's window record).
- **Intent in, not state:** calls `useApp()` methods (`focusWindow`, `closeWindow`,
  `minimizeWindow`, `toggleMaximize`, `updateWindow`); never owns state.

### `TaskBar` — `src/components/TaskBar.tsx`

Bottom bar: wordmark, window pills (click to focus/minimize), ModeToggle, clock.

- **Props:** none — reads `windows`, `focusedKey` from `useApp()`.

### `ModeToggle` — `src/components/ModeToggle.tsx`

OS ⇄ Site segmented switch. Returns null on mobile (`isMobile()` — enforces mobile
site-only guard).

- **Props:** none — reads `experience`, `setExperience` from `useApp()`.

### `AppIcon` — `src/components/AppIcon.tsx`

Per-app gradient tile + sheen + SVG glyph. Used by Desktop (large), TaskBar, AppWindow
(title).

- **Props:** `{ id: AppId; size?: number; className?: string }` (size default 22).
- **Locked:** glyphs and colors are brand.

### `Otter` — `src/components/Otter.tsx`

Faint monospace ASCII Devin otter, wallpaper texture, `aria-hidden`.

- **Props:** none.

### `ErrorBoundary` — `src/components/ErrorBoundary.tsx`

Class boundary (principle #11). Catches render errors, shows branded fallback (wordmark +
reload button).

- **Props:** `{ children: ReactNode }`.

## UI primitives — `src/components/ui/`

Barrel-exported from `src/components/ui/index.ts`. Use these instead of raw Tailwind for
buttons, cards, text, and layout in new pages and components.

### `Button`

- **Props:** `React.ButtonHTMLAttributes` + `{ variant?: "primary" | "secondary" | "ghost"; size?: "sm" | "md" }`.
- Variants use design tokens (`bg-ink`, `border-line`, `bg-panel`).

### `Badge`

- **Props:** `{ className?: string; children: ReactNode }`.
- Mono eyebrow pill: `rounded-full`, `font-mono`, `text-accent-ink`.

### `Card`

- **Props:** `{ as?: ElementType; hover?: boolean; className?: string; children: ReactNode }`.
- Uses `rounded-win`, `border-line`, `bg-panel`, `shadow-card`.

### `Container`

- **Props:** `{ as?: ElementType; className?: string; children: ReactNode }`.
- Applies `SITE_CONTAINER` from `src/lib/layout.ts` (`mx-auto w-full max-w-reader px-6`).

### `Stack`

- **Props:** `{ direction?: "vertical" | "horizontal"; gap?: string; as?: ElementType; className?: string; children: ReactNode }`.
- Flex layout helper. Default: vertical, `gap-3`.

### `Text`

- **Props:** `{ as?: ElementType; preset?: TextPreset; className?: string; children: ReactNode }`.
- Maps to text presets from `src/lib/tokens.ts` (`eyebrow`, `pageTitle`, `subtitle`, `body`, `small`, `label`).

## Prose primitives — `src/components/prose/`

### `ProsePullQuote` / `ProseWaxFigure`

Styled content components for long-form editorial. Used inside `.prose` content.

### `EventList` / `MenuList` / `StatGrid`

Content-specific components for the community and menu pages.

## Editor — `src/components/editor/Editor.tsx`

Tiptap rich-text editor used by the admin page (`/admin`). Extensions: StarterKit + Link.
Toolbar: bold, italic, H2, H3, bullet list, ordered list, blockquote, link.

- **Props:** `{ content: string; onChange: (html: string) => void }`.

## State access — `useApp()`

Every OS primitive reads state via one hook. `useApp()` exposes:

| Field / method | Purpose |
|----------------|---------|
| `experience`, `setExperience(e)` | Current OS/Site mode + setter (no-op on mobile) |
| `toggleExperience()` | Flip between OS and Site |
| `windows`, `focusedKey` | Open windows and the focused one |
| `open(path)` | Navigate within OS, opening/raising a window |
| `closeWindow(key)`, `closeAll()` | Window lifecycle |
| `focusWindow(key)` | Raise + un-minimize |
| `minimizeWindow(key, value?)` | Toggle or set minimized |
| `toggleMaximize(key)` | Toggle maximized state |
| `updateWindow(key, patch)` | Commit geometry after drag/resize |
| `constraintsRef` | Drag-bounds ref for the desktop |

## App registry — `src/lib/apps.ts`

`APPS: AppDef[]` is the single source for OS apps and routes. Desktop, TaskBar,
AppWindow, and URL parsers all read it. Each entry: `id`, `title`, `path`, `blurb`,
`icon`, `size`, `center?`, `desktop?`, `nav?`.

## Token layer

| File | Purpose |
|------|---------|
| `tailwind.config.js` (`theme.extend`) | Color, font, shadow, radius, max-width tokens |
| `src/styles/global.css` | Base + `.prose` + `.win-scroll` styles |
| `src/lib/tokens.ts` | Text preset className fragments (`eyebrow`, `pageTitle`, etc.) |
| `src/lib/layout.ts` | `SITE_CONTAINER` shared layout string |

## Backend — `functions/api/`

Cloudflare Functions providing auth and blog CMS CRUD:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth` | POST | Password auth → session cookie |
| `/api/posts` | GET | List all posts |
| `/api/posts` | POST | Create post (authed) |
| `/api/posts/[slug]` | PUT | Update post (authed) |
| `/api/posts/[slug]` | DELETE | Delete post (authed) |

Storage: `content/posts.json` via the GitHub Contents API. Types: `Post` interface
(currently duplicated; candidate for shared types file per principle #1).
