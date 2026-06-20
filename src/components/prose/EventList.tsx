import React from "react"

/** Upcoming events as a divided list of name / place / date rows. */
export const EventList: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div role="list" className="divide-y divide-line border-y border-line">{children}</div>
)

export const EventItem: React.FC<{ name: React.ReactNode; place: string; date: string }> = ({ name, place, date }) => (
  <div role="listitem" className="flex items-baseline justify-between gap-4 py-3">
    <div className="min-w-0">
      <p className="font-sans text-[0.95rem] font-medium text-ink">{name}</p>
      <p className="mt-0.5 font-sans text-[0.82rem] text-muted">{place}</p>
    </div>
    <time className="shrink-0 font-mono text-[0.8rem] text-accent-ink">{date}</time>
  </div>
)

export default EventList
