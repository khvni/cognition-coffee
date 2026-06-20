/**
 * Design tokens — reusable className fragments for typography and layout.
 * Weight rule: 400 body, 500 headings, never exceed 500 (prose headings
 * in global.css use 600 for STIX serif — that's intentional and separate).
 */

export const text = {
  eyebrow: "font-mono text-[12px] uppercase tracking-wide text-accent-ink",
  pageTitle: "text-4xl font-medium text-ink",
  subtitle: "text-[1.05rem] leading-relaxed text-muted",
  body: "text-[15px] text-ink",
  small: "text-[13px] text-muted",
  label: "font-mono text-[12px] text-muted",
} as const

export type TextPreset = keyof typeof text
