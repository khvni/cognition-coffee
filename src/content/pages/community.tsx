import React, { useState, useEffect, type FC } from "react"
import { motion } from "framer-motion"

export const frontmatter = {
  title: "Community",
  description: "The front page of the Devin builder community.",
  eyebrow: "Community",
}

const EASE = [0.25, 0.1, 0.25, 1] as const

const container = {
  visible: { transition: { staggerChildren: 0.07 } },
}

const fade = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
}

type WireEntry = {
  tag: string
  time: string
  text: string
  author?: string
  href?: string
}

const WIRE: WireEntry[] = [
  {
    tag: "VOICE",
    time: "Jun 21",
    text: "\u201ci tried Devin when it was released and tried it again now, and i can confirm this billboard is true\u201d",
    author: "@kr0der",
  },
  {
    tag: "EVENT",
    time: "Jul 4",
    text: "Devin Hackathon: Agents Of Chaos \u2014 Vancouver",
    href: "https://lu.ma/devin",
  },
  {
    tag: "VOICE",
    time: "Jun 19",
    text: "\u201cHoly moly, is it fast\u201d",
    author: "@morganlinton",
  },
  { tag: "PRESS", time: "Jun 18", text: "Goldman Sachs testing Devin AI" },
  {
    tag: "MEDIA",
    time: "Jun 15",
    text: "CodeWithHarry: 558K views \u2014 I Tried Devin",
  },
]

const STATS = [
  { value: "58+", label: "cities" },
  { value: "$492M", label: "run-rate" },
  { value: "12\u00d7", label: "productivity" },
  { value: "1,400+", label: "attendees" },
  { value: "154", label: "PRs / week" },
]

const EVENTS = [
  { name: "Devin Hackathon: Agents Of Chaos", city: "Vancouver", date: "Jul 4" },
  { name: "AI Builders Night", city: "Vienna", date: "Jul 8" },
  { name: "Devin Medell\u00edn Workshop", city: "Medell\u00edn", date: "Jul 12" },
  { name: "Hackathon Cognition", city: "S\u00e3o Paulo", date: "Jul 18" },
]

const TIERS = [
  { n: "I", title: "Contributor", desc: "Host local events, earn credits" },
  {
    n: "II",
    title: "Editor",
    desc: "Lead a city chapter, early access + stipend",
  },
  {
    n: "III",
    title: "Correspondent",
    desc: "Enterprise champion, direct product influence",
  },
]

const CHANNELS = [
  {
    label: "Discord",
    href: "https://discord.gg/GjCYNGChrw",
    desc: "Daily conversation and project showcases",
  },
  {
    label: "lu.ma/devin",
    href: "https://lu.ma/devin",
    desc: "Full event calendar",
  },
  {
    label: "GitHub Discussions",
    href: "#",
    desc: "Long-form questions and community playbooks",
  },
]

const TAG_BG: Record<string, string> = {
  VOICE: "bg-panel",
  EVENT: "bg-accent/10 text-accent-ink",
  PRESS: "bg-panel",
  MEDIA: "bg-panel",
}

const Arrow: FC = () => (
  <svg
    className="h-3 w-3 shrink-0 text-muted transition-transform group-hover:translate-x-0.5"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path d="M4.5 2.5l3.5 3.5-3.5 3.5" />
  </svg>
)

const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

const Content: FC = () => {
  const [dateline, setDateline] = useState<string | null>(null)

  useEffect(() => {
    setDateline(fmtDate(new Date()))
  }, [])

  return (
    <motion.div initial="hidden" animate="visible" variants={container}>
      <motion.header
        variants={fade}
        className="border-y border-line py-6 text-center"
        style={{ margin: 0 }}
      >
        <p className="m-0 font-mono text-[0.625rem] uppercase tracking-[0.25em] text-muted">
          Vol. I
        </p>
        <h2
          className="font-serif text-[1.625rem] font-medium leading-tight text-ink"
          style={{ margin: "8px 0 0", letterSpacing: "-0.01em", textWrap: "balance" }}
        >
          The Devin Dispatch
        </h2>
        {dateline && (
          <time className="mt-2 block font-mono text-[0.6875rem] tabular-nums text-muted">
            {dateline}
          </time>
        )}
      </motion.header>

      <motion.p
        variants={fade}
        className="text-[1rem] leading-relaxed text-muted"
        style={{ margin: "24px 0 0", textWrap: "pretty" }}
      >
        What&#39;s happening in the Devin community this week.
      </motion.p>

      <motion.section variants={fade} style={{ marginTop: 40 }} aria-labelledby="dispatch-featured">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.15em] text-muted">
          Lead Story
        </span>
        <h2
          id="dispatch-featured"
          className="font-serif text-[1.5rem] font-medium leading-snug text-ink"
          style={{ margin: "8px 0 0", textWrap: "balance" }}
        >
          S&atilde;o Paulo Hackathon Draws 355+ Builders
        </h2>
        <p
          className="text-[0.9375rem] leading-relaxed text-muted"
          style={{ margin: "12px 0 0", textWrap: "pretty" }}
        >
          The largest Devin community event to date brought together developers
          from across Latin America for a weekend of building with autonomous
          coding agents. Meanwhile, Cognition shipped 659 Devin-authored PRs in
          a single week&mdash;a new internal record.
        </p>
      </motion.section>

      <motion.section variants={fade} style={{ marginTop: 56 }} aria-labelledby="dispatch-wire">
        <h2 className="section-heading" id="dispatch-wire" style={{ margin: "0 0 16px" }}>
          The Wire
        </h2>
        <motion.div variants={container} className="flex flex-col">
          {WIRE.map((w, i) => (
            <motion.div
              key={i}
              variants={fade}
              className="flex flex-col gap-1 border-t border-line py-3"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block rounded px-1.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider text-muted ${TAG_BG[w.tag] ?? "bg-panel"}`}
                >
                  {w.tag}
                </span>
                <time className="font-mono text-[0.625rem] tabular-nums text-muted">
                  {w.time}
                </time>
              </div>
              <p className="m-0 text-[0.875rem] leading-snug text-ink">
                {w.author && (
                  <span className="font-medium">{w.author}:{" "}</span>
                )}
                {w.href ? (
                  <a
                    href={w.href}
                    target="_blank"
                    rel="noopener"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {w.text}
                  </a>
                ) : (
                  w.text
                )}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section variants={fade} style={{ marginTop: 56 }} aria-labelledby="dispatch-numbers">
        <h2 className="section-heading" id="dispatch-numbers" style={{ margin: "0 0 16px" }}>
          By the Numbers
        </h2>
        <motion.div
          variants={container}
          className="grid grid-cols-3 gap-x-4 gap-y-5 border-y border-line py-5 sm:grid-cols-5"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={fade} className="text-center">
              <span className="block font-mono text-[1.125rem] font-medium leading-none tabular-nums text-ink">
                {s.value}
              </span>
              <span className="mt-1.5 block text-[0.6875rem] text-muted">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section variants={fade} style={{ marginTop: 56 }} aria-labelledby="dispatch-upcoming">
        <h2 className="section-heading" id="dispatch-upcoming" style={{ margin: "0 0 16px" }}>
          Upcoming
        </h2>
        <motion.ul
          variants={container}
          className="flex flex-col"
          style={{ margin: 0, padding: 0, listStyle: "none" }}
        >
          {EVENTS.map((e) => (
            <motion.li
              key={e.name}
              variants={fade}
              className="flex items-baseline justify-between gap-3 border-t border-line py-2.5"
            >
              <span className="min-w-0">
                <span className="block text-[0.875rem] text-ink">{e.name}</span>
                <span className="block text-[0.75rem] text-muted">{e.city}</span>
              </span>
              <time className="shrink-0 font-mono text-[0.6875rem] tabular-nums text-muted">
                {e.date}
              </time>
            </motion.li>
          ))}
        </motion.ul>
        <motion.a
          variants={fade}
          href="https://lu.ma/devin"
          target="_blank"
          rel="noopener"
          className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.75rem]"
          style={{ color: "#285AC8", textDecoration: "none" }}
          whileTap={{ scale: 0.96 }}
        >
          Full calendar on lu.ma/devin
          <Arrow />
        </motion.a>
      </motion.section>

      <motion.section variants={fade} style={{ marginTop: 56 }} aria-labelledby="dispatch-masthead">
        <h2 className="section-heading" id="dispatch-masthead" style={{ margin: "0 0 8px" }}>
          Join the Masthead
        </h2>
        <p
          className="text-[0.875rem] text-muted"
          style={{ margin: "0 0 16px", textWrap: "pretty" }}
        >
          The Devin ambassador program. Three tiers, one community.
        </p>
        <motion.div variants={container} className="flex flex-col gap-2.5">
          {TIERS.map((t) => (
            <motion.div
              key={t.title}
              variants={fade}
              className="rounded-lg bg-panel px-4 py-3 shadow-card"
            >
              <span className="font-mono text-[0.625rem] uppercase tracking-wider text-muted">
                Tier {t.n}
              </span>
              <span className="mt-0.5 block text-[0.9375rem] font-medium text-ink">
                {t.title}
              </span>
              <span
                className="block text-[0.8125rem] text-muted"
                style={{ textWrap: "pretty" }}
              >
                {t.desc}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        variants={fade}
        className="border-t border-line pt-6"
        style={{ marginTop: 56 }}
        aria-labelledby="dispatch-channels"
      >
        <h2 className="section-heading" id="dispatch-channels" style={{ margin: "0 0 16px" }}>
          Channels
        </h2>
        <motion.div className="flex flex-col gap-1" variants={container}>
          {CHANNELS.map((c) => (
            <motion.a
              key={c.label}
              href={c.href}
              {...(c.href !== "#" ? { target: "_blank", rel: "noopener" } : {})}
              variants={fade}
              whileTap={{ scale: 0.96 }}
              className="group flex items-baseline justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-panel"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <span className="min-w-0">
                <span className="block text-[0.875rem] font-medium text-ink">
                  {c.label}
                </span>
                <span className="block text-[0.75rem] text-muted">{c.desc}</span>
              </span>
              <Arrow />
            </motion.a>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  )
}

export default Content
