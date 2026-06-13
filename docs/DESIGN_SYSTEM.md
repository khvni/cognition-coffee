# DESIGN_SYSTEM.md

The source of truth is **`src/styles/global.css`** (`@theme` tokens). This doc explains
intent. Never hardcode a value that exists as a token.

## Colors

Extracted from live cognition.ai CSS (June 2026) + a coffee-warm extension.

### Cognition core
| Token | Hex | Use |
|-------|-----|-----|
| `--color-paper` | `#EDECEB` | Primary background (wax-paper cream) |
| `--color-foam` | `#F5F1E8` | Lighter surface / banded sections |
| `--color-card` | `#F7F6F5` | Card surface |
| `--color-ink` | `#202020` | Primary text |
| `--color-ink-soft` | `#3A3A3A` | Secondary text |
| `--color-slate` | `#626870` | Muted text |
| `--color-line` | `#20202014` | Hairline borders (8% ink) |
| `--color-blue` | **`#317CFF`** | **Devin blue** — links, CTAs, selection, accents |
| `--color-blue-soft` | `#F2F5FA` | Blue tint backgrounds |
| `--color-coral` / `--color-amber` | `#FA5050` / `#FCBB00` | Sparing editorial accents (stamps) |

### Coffee warmth (the hybrid half)
| Token | Hex | Use |
|-------|-----|-----|
| `--color-espresso` | `#221912` | Dark-roast inverted sections (`.roast`) |
| `--color-roast` | `#4A3526` | Medium brown |
| `--color-crema` | `#C8A06B` | Crema/latte highlight (accents on dark) |
| `--color-kraft` | `#D9C5A0` | Cardboard/kraft panels (`WaxPaper tone="kraft"`) |
| `--color-bean` | `#6F4E37` | Coffee-bean brown (roast labels) |

**Rule:** blue is the only saturated accent in light sections. Coffee tones carry the
warmth; coral/amber are for rare "stamp" moments only.

## Typography

Self-hosted via Fontsource. Swap the three `--font-*` vars if Ali licenses the real
Cognition faces (STKBureauSerif / NBInternationalPro / GeistMono).

| Role | Token | Face | Used for |
|------|-------|------|----------|
| Serif | `--font-serif` | **Fraunces Variable** | Headlines (h1–h3) + **blog body** |
| Sans | `--font-sans` | **Geist Variable** | UI, marketing body, nav |
| Mono | `--font-mono` | **Geist Mono Variable** | Eyebrows, terminal, code, labels, stats |

- Headlines: weight ~380, letter-spacing −0.01em, `text-wrap: balance`.
- Blog: title + subheaders + body all serif (the cognition.ai/blog look). Measure ~68ch.
- `::selection` is Devin blue everywhere (and crema on `.roast`).

## Components (brand primitives)

| Component | Purpose |
|-----------|---------|
| `Section.astro` | Numbered section wrapper (`index`, `eyebrow`, `tone="roast"`) |
| `WaxPaper.astro` | Translucent grainy panel (`tone="cream" \| "kraft" \| "roast"`) |
| `Terminal.astro` | VT100 terminal frame (`prompt`, `title`) |
| `OtterAscii.astro` | The Devin otter in ASCII |
| `Hexagon.astro` | Cognition-style hexagon + coffee-bean mark |
| `Nav.astro` | Sticky nav; **Resources** hover dropdown (Blog/Community/About) |
| `Footer.astro` | Dark-roast footer |

### Utility classes (in `global.css`)
- `.eyebrow` — mono uppercase label
- `.wax` / `.grain` — frosted panel + paper-grain overlay
- `.roast` — espresso inverted surface
- `.link-blue` — blue underlined prose link

## Spacing & layout
- Container: `max-w-6xl` (content), `max-w-2xl` (blog reading).
- Section vertical rhythm: `py-20` mobile / `py-28` desktop.
- Radii: `--radius-card` 6px, pills 999px.
- Motion: subtle. `--ease-out-soft`; hover lifts of `-translate-y-0.5`. Respect
  `prefers-reduced-motion` for anything larger.

## Do / Don't
- ✅ Compose `WaxPaper` + `Section`; use tokens; serif headlines; blue selection.
- ❌ Rogue hexes, second sans/serif, heavy shadows, generic SaaS gradients, emoji spam.
