import React from "react"

type Props = { caption?: string; children: React.ReactNode }

/** Callout panel for diagrams, lists, or visual asides inside prose. */
export const ProseWaxFigure: React.FC<Props> = ({ caption, children }) => (
  <figure className="my-9">
    <div className="rounded-win border border-line bg-panel px-6 py-6 text-[0.95rem] leading-relaxed text-ink/90 shadow-card sm:px-8 sm:py-7">
      {children}
    </div>
    {caption && (
      <figcaption className="mt-3 text-center font-mono text-xs uppercase tracking-wide text-muted">{caption}</figcaption>
    )}
  </figure>
)

export default ProseWaxFigure
