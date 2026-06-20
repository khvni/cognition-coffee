import React from "react"

/** Headline metrics as a hairline-divided grid of cells. */
export const StatGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-win border border-line bg-line sm:grid-cols-4">
    {children}
  </dl>
)

export const Stat: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => (
  <div className="bg-panel p-4">
    <dt className="font-mono text-[1.75rem] leading-none text-ink">{value}</dt>
    <dd className="mt-2 font-sans text-[0.78rem] leading-snug text-muted">{children}</dd>
  </div>
)

export default StatGrid
