/** Design tokens - reusable className fragments. Weight: 400 body, 500 headings, never >500. */

export const text = {
  eyebrow: "font-mono text-[12px] uppercase tracking-wide text-muted",
  pageTitle: "text-[1.75rem] font-medium leading-tight tracking-tight text-ink",
  subtitle: "text-[1.375rem] leading-[1.7] font-medium text-ink",
  body: "text-[1rem] leading-[1.625] text-ink",
  small: "text-[0.875rem] text-muted",
  label: "font-mono text-[12px] text-muted",
} as const

export type TextPreset = keyof typeof text
