# BRAND.md — The Cognition Coffee Company

## The idea

A concept site that reads as **a natural extension of cognition.ai and
devin.ai**, same Devin blue, same editorial wax-paper aesthetic, but with the warmth
of an **artisan coffee roaster**. Built as a Gatsby mock-OS on a warm beige canvas
with near-black ink and Devin blue as the single accent. "The Cognition Coffee Company" is the conceit: a place
that serves community to the people who build with the first AI software engineer.

**Brand intensity: balanced hybrid.** Equal parts coffee co. and AI lab. Coffee shows up
as language and motif (roasts, the menu, Cafe Cognition, "freshly brewed"), never as
kitsch. The AI-lab half keeps it credible: numbered sections, mono labels, the VT100
terminal, the Devin otter, real metrics.

## Who it's for

- **Primary audience:** developers who build with Devin, and the Cognition team thinking
  about community. Minimalist taste; values builders who ship and teach. The site should
  feel like it was made by someone who already *is* the community it describes.
- **Secondary:** the broader developer-tools and AI-agents community, and the public.

## Voice & tone

- **Direct & conversational.** Plain language, addressed to a peer.
- **Metric-driven.** Every claim carries a number (30+ chapters, 1,800 students, 7M+
  views, top-200 Devin user). Numbers over adjectives.
- **Action verbs.** Build, ship, teach, scale, brew, roast, pour.
- **Metaphor-rich but legible.** "Operating systems for communities," "the orchestrator
  mindset," coffee roasts — used to clarify, not to obscure.
- **Confident, not hype.** Substance over exclamation marks.
- **Show, don't tell.** The meta-narrative ("built with Devin") is the strongest proof.

### Signature lines (reusable)
- "Freshly brewed community for the first AI software engineer."
- "Devin gives engineers superpowers. I build the community that teaches the world how to use them."
- "Cognition built the engineer. This is how you build the community."

## Motifs (the visual vocabulary)

1. **Wax paper** — warm, translucent cream surfaces floating over the beige canvas.
   The central motif (from Cognition's blog graphics). Realized as `panel` surfaces
   and the `ProseWaxFigure` prose component.
2. **Devin blue selection** — highlighting any text reveals `#317CFF`. Always on
   (`::selection` in `global.css`).
3. **Numbered sections** — `01 / 02 / 03` with mono eyebrows, like cognition.ai.
4. **The Devin otter** — the mascot (plushies, Slackbot, @devinai). The OS desktop
   uses the otter photo as wallpaper (under a subtle CRT overlay); the `Otter`
   component renders the ASCII mark for inline use.
5. **VT100 terminal** — the Devin CLI launch aesthetic (`devin@...:~$`), good for
   heroes and the "built with Devin" beat. Geist Mono carries the terminal type.
6. **Espresso (dark roast) sections** — inverted dark-brown bands for rhythm/contrast.
7. **Editorial serif** — **STIX Two Text** for blog/article titles and long-form body
   (the cognition.ai/blog reading look). UI, nav, and non-article headings use **Geist
   Sans**; eyebrows, labels, and code use **Geist Mono**.
8. **Texture** — subtle paper grain and dot-grid; halftone/dither and isometric
   wireframe accents are welcome (see Cognition blog thumbnails) but keep them subtle.

## Don't

- Don't drift into a literal cartoon coffee-shop. Keep the AI-lab credibility.
- Don't use stock-y gradients, drop shadows, or generic SaaS hero blobs.
- Don't overuse the otter or emoji. One otter, used well.
- Don't claim affiliation with Cognition. The framing is an independent concept.
- Don't invent metrics. Verified data only (`src/data/`).
