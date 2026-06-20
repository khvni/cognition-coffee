# DESIGN_SYSTEM.md

The source of truth is **`tailwind.config.js`** (`theme.extend`) for tokens and
**`src/styles/global.css`** for base + prose styles. This doc explains intent.
Never hardcode a value that exists as a token; use the classes (`text-accent-ink`,
`border-line`, `bg-canvas`) or `theme("colors.x")`.

## Colors

Warm wax-paper beige canvas, warm near-black ink, **Devin blue `#317CFF` as the
single saturated accent**. The beige sits in the same warm family as
cursor.com/community (`#ebeae5`) and cognition.ai (`#edeceb`), pushed a touch
warmer for the coffee identity.

| Token | Hex | Use |
|-------|-----|-----|
| `canvas` | `#EBE4D8` | Page / desktop base background |
| `panel` | `#F6F1E7` | Cards, windows, taskbar (warm off-white, never pure `#fff`) |
| `ink` | `#1B1A17` | Primary text (warm near-black) |
| `muted` | `#635A4C` | Secondary text (warm taupe-gray) |
| `line` | `#D8CFBE` | Hairline borders |
| `accent` | **`#317CFF`** | Devin blue — fills, selection, focus, UI accents |
| `accent-ink` | `#285AC8` | Link / UI-text blue (clears AA on `canvas` + `panel`) |
| `wallpaper` | `#C9BFA9` | Warm fallback behind the OS wallpaper image |

**Measured AA contrast** (WCAG 2.1): `ink` on `canvas` 13.8:1, on `panel` 15.5:1;
`muted` on `canvas` 5.37:1, on `panel` 6.02:1; `accent-ink` on `canvas` 4.91:1, on
`panel` 5.51:1 — all clear AA for normal text with headroom. White on `accent` is
3.85:1 (passes AA-large / UI 3:1; inherent to the brand-locked blue, so reserve it for
`::selection`, never body text).

**Rule:** blue is the only saturated accent. Highlighting any text reveals it
(`::selection` in `global.css`).

## Typography

Self-hosted via Fontsource, imported in `gatsby-browser.tsx`.

| Role | Token | Face | Used for |
|------|-------|------|----------|
| Serif | `font-serif` | **STIX Two Text** | Article body + blog/content-page titles (the editorial reading look) |
| Sans | `font-sans` | **Geist Variable** | UI, nav, buttons, launcher, non-article headings |
| Mono | `font-mono` | **Geist Mono Variable** | Eyebrows, labels, dates, code, terminal, stats |

- **Prose** (`.prose`): STIX serif body + headings, `1.125rem` / line-height `1.7`,
  measure ~`33rem` (~69 chars/line); `code`/`pre` stay Geist Mono, GFM tables use
  sans cells + mono uppercase headers. Headings weight 600 (STIX ships static
  400/500/600/700), `text-wrap: balance`.
- **Titles**: blog index/post and content-page `<h1>`/list `<h2>` use `font-serif`.
  Global chrome (TaskBar, ModeToggle, launcher) stays Geist Sans. Eyebrows/dates stay mono.
- `::selection` is Devin blue everywhere.

## Components (brand primitives)

| Component | Purpose |
|-----------|---------|
| `Wrapper` | OS/site shell; toggles desktop vs arranged-pages view |
| `Desktop` | Draggable-window desktop, wallpaper + CRT |
| `AppWindow` | Window chrome (titlebar, macOS traffic-light controls) |
| `TaskBar` | Bottom taskbar / app launcher |
| `ModeToggle` | OS ⇄ Site switch |
| `AppIcon` | Per-app icon, `<AppIcon id size />` |
| `Otter` | The Devin otter mascot |
| `ProsePullQuote` / `ProseWaxFigure` | MDX shortcodes for long-form content |

### Utility classes (`global.css`)
- `.prose` — long-form serif content
- `.os-wallpaper` — desktop wallpaper fallback layer
- `.win-scroll` — thin scrollbars inside window bodies

## Tokens (other)
- Shadows: `shadow-window`, `shadow-card`. Radius: `rounded-win` (10px).
- Reading measure: `max-w-reader` (44rem).
- Motion: subtle (`framer-motion`); respect `prefers-reduced-motion`.

## Do / Don't
- Do: use tokens; serif for article reading; Geist for UI; mono for labels; blue selection.
- Don't: rogue hexes that duplicate a token, pure `#ffffff` panels, a second sans/serif,
  heavy shadows, generic SaaS gradients, emoji spam.
