# BRAND.md — The Cognition Coffee Company

## The idea

A portfolio/proposal site that reads as **a natural extension of cognition.ai and
devin.ai** — same Devin blue, same editorial wax-paper aesthetic — but with the warmth
of an **artisan coffee roaster**. "The Cognition Coffee Company" is the conceit: a place
that serves community to the people who build with the first AI software engineer.

**Brand intensity: balanced hybrid.** Equal parts coffee co. and AI lab. Coffee shows up
as language and motif (roasts, the menu, Cafe Cognition, "freshly brewed"), never as
kitsch. The AI-lab half keeps it credible: numbered sections, mono labels, the VT100
terminal, the Devin otter, real metrics.

## Who it's for

- **Primary audience:** Nader Dabit (hiring manager, ex-AWS DevRel lead, deep into AI
  agents). Minimalist taste; values builders who ship and teach. The site should feel
  like it was made by someone who already *is* the community it describes.
- **Secondary:** anyone at Cognition (Russell Kaplan, Scott Wu's team), and the public.

## Voice & tone

Sharpened from Ali's previous site (replitdotcv) and verified against the vault:

- **Direct & conversational.** Opens with "Hey Cognition — heard you're hiring."
- **Metric-driven.** Every claim carries a number (30+ chapters, 1,800 students, 6M+
  views, top-200 Devin user). Numbers over adjectives.
- **Action verbs.** Build, ship, teach, scale, brew, roast, pour.
- **Metaphor-rich but legible.** "Operating systems for communities," "the orchestrator
  mindset," coffee roasts — used to clarify, not to obscure.
- **Confident, not hype.** Substance over exclamation marks. Humble where earned
  ("Not affiliated with Cognition — yet.").
- **Show, don't tell.** The meta-narrative ("built with Devin") is the strongest proof.

### Signature lines (reusable)
- "Freshly brewed community for the first AI software engineer."
- "Devin gives engineers superpowers. I build the community that teaches the world how to use them."
- "Not 'hire me.' Let's talk about how to execute this."
- "Built with Devin, before applying."

## Motifs (the visual vocabulary)

1. **Wax paper** — translucent, grainy cream panels floating over textured backdrops.
   The central motif (from Cognition's blog graphics). Component: `WaxPaper.astro`.
2. **Devin blue selection** — highlighting any text reveals `#317CFF`. Always on.
3. **Numbered sections** — `01 / 02 / 03` with mono eyebrows, like cognition.ai.
4. **The Devin otter** — the mascot (plushies, Slackbot, @devinai). Appears as VT100
   ASCII holding a coffee. Component: `OtterAscii.astro`. Higher-fidelity illustration
   welcome later.
5. **VT100 terminal** — the Devin CLI launch aesthetic (`devin@...:~$`). Component:
   `Terminal.astro`. Good for heroes and the "built with Devin" beat.
6. **Espresso (dark roast) sections** — inverted dark-brown bands for rhythm/contrast.
7. **Editorial serif** — Cognition-blog-style serif for headlines *and* long-form body.
8. **Texture** — paper grain (built in via `.grain`); halftone/dither and isometric
   wireframe accents are welcome (see Cognition blog thumbnails) but keep them subtle.

## Don't

- Don't drift into a literal cartoon coffee-shop. Keep the AI-lab credibility.
- Don't use stock-y gradients, drop shadows, or generic SaaS hero blobs.
- Don't overuse the otter or emoji. One otter, used well.
- Don't claim affiliation with Cognition. The framing is "an unsolicited proposal."
- Don't invent metrics. Verified data only (`src/data/`).
