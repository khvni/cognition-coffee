import React, { type FC } from "react"
import { motion } from "framer-motion"
import { cities, stats, wire, tagColor, voices, events, formats, tiers, links } from "@/data/community"

export const frontmatter = {
  title: "The Devin Community",
  description: "Where builders meet, hack, and ship — in 58 cities and counting.",
  eyebrow: "Community",
  layout: "grid" as const,
}

const ease = [0.25, 0.1, 0.25, 1] as const
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }
const up = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}
const vp = { once: true, margin: "-80px" as const }

const Content: FC = () => (
  <div className="flex flex-col gap-20 sm:gap-24">
    <motion.div
      initial="hidden" whileInView="visible" viewport={vp} variants={container}
      className="win-scroll -mx-6 flex gap-3 overflow-x-auto px-6 pb-4 sm:-mx-0 sm:px-0"
    >
      {cities.map((city) => (
        <motion.figure key={city} variants={up} className="flex-none">
          <div
            className="h-36 w-52 rounded-lg bg-panel shadow-card sm:h-44 sm:w-64"
            role="img"
            aria-label={`Community event in ${city}`}
          />
          <figcaption className="mt-2 font-mono text-[0.6875rem] text-muted">{city}</figcaption>
        </motion.figure>
      ))}
    </motion.div>

    <motion.section
      initial="hidden" whileInView="visible" viewport={vp} variants={container}
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      aria-label="Community metrics"
    >
      {stats.map((s) => (
        <motion.div
          key={s.label} variants={up}
          className="flex flex-col gap-1 rounded-lg bg-panel p-5 shadow-card"
        >
          <span className="font-mono text-[1.5rem] font-medium leading-none text-ink" style={{ fontVariantNumeric: "tabular-nums" }}>
            {s.value}
          </span>
          <span className="text-[0.8125rem] text-muted">{s.label}</span>
        </motion.div>
      ))}
    </motion.section>

    <motion.section
      initial="hidden" whileInView="visible" viewport={vp} variants={container}
      aria-labelledby="wire-heading"
    >
      <motion.h2 className="section-heading" id="wire-heading" variants={up}>The Wire</motion.h2>
      <motion.div variants={container} className="flex flex-col">
        {wire.map((w, i) => (
          <motion.div
            key={i} variants={up}
            className="flex flex-col gap-1 py-3"
            style={i > 0 ? { boxShadow: "inset 0 1px 0 0 rgba(0,0,0,0.06)" } : undefined}
          >
            <div className="flex items-center gap-2">
              <span className={`inline-block rounded px-1.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider ${tagColor[w.tag] ?? "text-muted bg-panel"}`}>
                {w.tag}
              </span>
              <time className="font-mono text-[0.625rem] text-muted" style={{ fontVariantNumeric: "tabular-nums" }}>
                {w.time}
              </time>
            </div>
            <p className="m-0 text-[0.875rem] leading-snug text-ink" style={{ textWrap: "pretty" }}>
              {w.author && <span className="font-medium">{w.author}: </span>}
              {w.href ? (
                <a href={w.href} target="_blank" rel="noopener" className="text-ink no-underline hover:underline">
                  {w.text}
                </a>
              ) : w.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>

    <motion.section
      initial="hidden" whileInView="visible" viewport={vp} variants={container}
      aria-labelledby="voices-heading"
    >
      <motion.h2 className="section-heading" id="voices-heading" variants={up}>Community voices</motion.h2>
      <motion.div className="columns-1 gap-3 sm:columns-2 lg:columns-3" variants={container}>
        {voices.map((v) => (
          <motion.blockquote
            key={v.handle} variants={up}
            className="mb-3 break-inside-avoid rounded-lg bg-panel p-4 shadow-card"
          >
            <p className="m-0 text-[0.9375rem] leading-relaxed text-ink" style={{ textWrap: "pretty" }}>
              &ldquo;{v.text}&rdquo;
            </p>
            <footer className="mt-3 text-[0.8125rem] text-muted">
              {v.name && <span className="font-medium text-ink">{v.name} </span>}
              <span className="font-mono text-[0.75rem]">{v.handle}</span>
            </footer>
          </motion.blockquote>
        ))}
      </motion.div>
    </motion.section>

    <motion.section
      initial="hidden" whileInView="visible" viewport={vp} variants={container}
      aria-labelledby="events-heading"
    >
      <motion.h2 className="section-heading" id="events-heading" variants={up}>Upcoming events</motion.h2>
      <motion.ul
        className="m-0 flex list-none flex-col overflow-hidden rounded-lg p-0 shadow-card"
        variants={container}
      >
        {events.map((e, i) => (
          <motion.li
            key={e.name} variants={up}
            className="group flex items-baseline justify-between gap-4 bg-panel px-4 py-3 transition-colors hover:bg-canvas"
            style={i > 0 ? { boxShadow: "inset 0 1px 0 0 rgba(0,0,0,0.06)" } : undefined}
          >
            <span className="min-w-0">
              <span className="block text-[0.9375rem] leading-relaxed text-ink" style={{ textWrap: "balance" }}>{e.name}</span>
              <span className="block text-[0.8125rem] text-muted">{e.city}</span>
            </span>
            <time className="shrink-0 font-mono text-[0.75rem] text-muted" style={{ fontVariantNumeric: "tabular-nums" }}>
              {e.date}
            </time>
          </motion.li>
        ))}
      </motion.ul>
      <motion.a
        href="https://lu.ma/devin" target="_blank" rel="noopener" variants={up}
        whileTap={{ scale: 0.96 }}
        className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.75rem] text-accent-ink no-underline transition-colors hover:text-ink"
      >
        Full calendar on lu.ma/devin
        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4.5 2.5l3.5 3.5-3.5 3.5" />
        </svg>
      </motion.a>
    </motion.section>

    <motion.section
      initial="hidden" whileInView="visible" viewport={vp} variants={container}
      aria-labelledby="formats-heading"
    >
      <motion.h2 className="section-heading" id="formats-heading" variants={up}>What we do</motion.h2>
      <motion.div className="grid gap-3 sm:grid-cols-2" variants={container}>
        {formats.map((f) => (
          <motion.div
            key={f.name} variants={up}
            className="rounded-lg bg-panel p-5 shadow-card"
          >
            <h3 className="m-0 text-[1rem] font-medium leading-snug text-ink">{f.name}</h3>
            <p className="m-0 mt-1.5 text-[0.8125rem] leading-relaxed text-muted" style={{ textWrap: "pretty" }}>
              {f.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>

    <motion.section
      initial="hidden" whileInView="visible" viewport={vp} variants={container}
      aria-labelledby="ambassador-heading"
    >
      <motion.h2 className="section-heading" id="ambassador-heading" variants={up}>Ambassador program</motion.h2>
      <motion.p
        variants={up}
        className="mb-6 max-w-prose text-[0.9375rem] leading-relaxed text-muted"
        style={{ textWrap: "pretty" }}
      >
        Help grow the Devin community in your city. Get early access, credits, and a direct line to the team.
      </motion.p>
      <motion.div className="grid gap-3 sm:grid-cols-3" variants={container}>
        {tiers.map((t) => (
          <motion.div
            key={t.name} variants={up}
            className="flex flex-col rounded-lg bg-panel p-5 shadow-card"
          >
            <h3 className="m-0 text-[1rem] font-medium leading-snug text-ink">{t.name}</h3>
            <p className="m-0 mt-1.5 text-[0.8125rem] leading-relaxed text-muted" style={{ textWrap: "pretty" }}>
              {t.desc}
            </p>
            <ul className="m-0 mt-4 flex list-none flex-col gap-1.5 p-0">
              {t.perks.map((p) => (
                <li key={p} className="flex items-center gap-2 text-[0.8125rem] text-ink">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
      <motion.a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfMxOlKVqCnSyY2aAX3RYdCEYRc0u7wzaKQ79UqZCC6hs1TIw/viewform"
        target="_blank" rel="noopener" variants={up}
        whileTap={{ scale: 0.96 }}
        className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[0.875rem] font-medium text-white no-underline transition-opacity hover:opacity-90"
      >
        Apply to become an ambassador
      </motion.a>
    </motion.section>

    <motion.section
      initial="hidden" whileInView="visible" viewport={vp} variants={container}
      aria-labelledby="involved-heading"
    >
      <motion.h2 className="section-heading" id="involved-heading" variants={up}>Get involved</motion.h2>
      <motion.div className="flex flex-col gap-3" variants={container}>
        {links.map((l) => (
          <motion.a
            key={l.label}
            href={l.href} target="_blank" rel="noopener"
            variants={up}
            whileTap={{ scale: 0.96 }}
            className="group flex items-baseline justify-between gap-4 rounded-lg bg-panel px-4 py-3 no-underline shadow-card transition-shadow hover:shadow-card-lift"
          >
            <span className="min-w-0">
              <span className="block text-[1rem] font-medium text-ink">{l.label}</span>
              <span className="block text-[0.8125rem] text-muted" style={{ textWrap: "pretty" }}>{l.desc}</span>
            </span>
            <svg className="mt-0.5 h-3 w-3 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4.5 2.5l3.5 3.5-3.5 3.5" />
            </svg>
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  </div>
)

export default Content
