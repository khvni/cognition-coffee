import React from "react"

/** Numbered section title for the menu, with a quiet mono index and a rule. */
export const MenuHeading: React.FC<{ index?: string; children: React.ReactNode }> = ({ index, children }) => (
  <h2 className="flex items-baseline gap-3 border-b border-line pb-2">
    {index && <span className="font-mono text-[0.6em] font-normal tracking-widest text-accent-ink">{index}</span>}
    <span className="flex-1">{children}</span>
  </h2>
)

/** Wax-paper menu card — rows separated by hairlines on a raised panel. */
export const MenuList: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <dl className="overflow-hidden rounded-win border border-line bg-panel shadow-card">{children}</dl>
)

export const MenuItem: React.FC<{ name: React.ReactNode; children: React.ReactNode }> = ({ name, children }) => (
  <div className="grid gap-x-6 gap-y-1 border-t border-line px-5 py-3.5 first:border-t-0 sm:grid-cols-[10rem_1fr]">
    <dt className="font-sans text-[0.95rem] font-semibold leading-snug text-ink">{name}</dt>
    <dd className="font-sans text-[0.9rem] leading-relaxed text-muted">{children}</dd>
  </div>
)

export default MenuList
