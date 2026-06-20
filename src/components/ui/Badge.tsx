import React from "react"

type Props = { className?: string; children: React.ReactNode }

export const Badge: React.FC<Props> = ({ className, children }) => (
  <span
    className={`inline-flex items-center rounded-full bg-canvas px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-accent-ink${className ? ` ${className}` : ""}`}
  >
    {children}
  </span>
)
