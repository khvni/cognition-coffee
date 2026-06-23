import React from "react"

type Props = { cite?: string; children: React.ReactNode }

/** Standout block for key sentences inside prose. */
export const ProsePullQuote: React.FC<Props> = ({ cite, children }) => (
  <figure className="my-9 pl-6 sm:pl-8">
    <blockquote className="text-[1.3rem] font-medium leading-[1.5] tracking-tight text-ink sm:text-[1.45rem]">
      {children}
    </blockquote>
    {cite && (
      <figcaption className="mt-3 text-xs uppercase tracking-wide text-muted">{cite}</figcaption>
    )}
  </figure>
)

export default ProsePullQuote
