import React, { type FC } from "react"
import { motion } from "framer-motion"

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

const SHADOW =
  "0px 0px 0px 1px rgba(0,0,0,0.06), 0px 1px 2px -1px rgba(0,0,0,0.06), 0px 2px 4px 0px rgba(0,0,0,0.04)"
const SHADOW_LIFT =
  "0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 8px -2px rgba(0,0,0,0.08), 0px 4px 12px 0px rgba(0,0,0,0.06)"

const cities = [
  "Barcelona", "Tokyo", "Nairobi", "San Francisco", "London",
  "S\u00e3o Paulo", "Berlin", "Bangalore", "New York", "Seoul",
  "Lagos", "Vancouver", "Bogot\u00e1", "Vienna",
]

const stats = [
  { value: "58+", label: "cities" },
  { value: "1,400+", label: "attendees" },
  { value: "12\u00d7", label: "productivity" },
  { value: "$492M", label: "run-rate" },
]

type WireEntry = {
  tag: string
  time: string
  text: string
  author?: string
  href?: string
}

const wire: WireEntry[] = [
  { tag: "VOICE", time: "Jun 21", author: "@kr0der", text: "\u201ci tried Devin when it was released and tried it again now, and i can confirm this billboard is true\u201d" },
  { tag: "EVENT", time: "Jul 4", text: "Devin Hackathon: Agents Of Chaos \u2014 Vancouver", href: "https://lu.ma/devin" },
  { tag: "VOICE", time: "Jun 19", author: "@morganlinton", text: "\u201cHoly moly, is it fast\u201d" },
  { tag: "PRESS", time: "Jun 18", text: "Goldman Sachs testing Devin AI" },
  { tag: "MEDIA", time: "Jun 15", text: "CodeWithHarry: 558K views \u2014 I Tried Devin" },
  { tag: "VOICE", time: "Jun 14", author: "@petergyang", text: "\u201cHave to give the Devin/Windsurf team flowers\u201d" },
]

const tagColor: Record<string, string> = {
  VOICE: "text-muted bg-panel",
  EVENT: "text-accent-ink bg-accent/10",
  PRESS: "text-muted bg-panel",
  MEDIA: "text-muted bg-panel",
}

const voices = [
  { name: "Scott Wu", handle: "@ScottWu46", text: "We merged 154 Devin PRs internally at Cognition in our best week" },
  { name: "Piyush Puri", handle: "@ppuri96", text: "Devin works like an autonomous engineer that you interact with through Slack, Linear, and GitHub" },
  { handle: "@trillhause_", text: "This is the first cloud agent that feels good" },
  { name: "Morgan Linton", handle: "@morganlinton", text: "Using Devin\u2019s model to start, SWE-1.6 Fast. And holy moly, is it fast." },
  { handle: "@kr0der", text: "i tried Devin when it was released and tried it again now, and i can confirm this billboard is true" },
  { name: "Peter Yang", handle: "@petergyang", text: "Have to give the Devin/Windsurf team flowers for staying\u2026 I know many AI native builders who love Devin now" },
]

const events = [
  { name: "Devin Hackathon: Agents Of Chaos", city: "Vancouver", date: "Jul 4" },
  { name: "AI Builders Night", city: "Vienna", date: "Jul 10" },
  { name: "Devin Medell\u00edn Workshop", city: "Medell\u00edn", date: "Jul 15" },
  { name: "Hackathon Cognition S\u00e3o Paulo", city: "S\u00e3o Paulo", date: "Jul 18" },
  { name: "Cognition Coffee Berlin", city: "Berlin", date: "Jul 22" },
  { name: "Devin Hack Night", city: "Bangalore", date: "Jul 25" },
  { name: "Devin Office Hours", city: "Remote", date: "Jul 29" },
  { name: "Orchestrating Fleets of Devins", city: "London", date: "Aug 1" },
]

const formats = [
  { name: "Cognition Coffee", desc: "Cafe takeovers \u2014 builders meet over espresso and ship side-projects with Devin." },
  { name: "Hack Nights", desc: "Evening build sessions. Bring a laptop, leave with a deployed project." },
  { name: "Workshops", desc: "Hands-on playbooks, fleet orchestration, and advanced prompting patterns." },
  { name: "Office Hours", desc: "Weekly live sessions with the Devin team. Ask anything." },
]

const tiers = [
  { name: "Student Builder", desc: "Students and early-career devs building with Devin.", perks: ["API credits", "Community recognition", "Devin swag"] },
  { name: "Community Organizer", desc: "Run local chapters and events in your city.", perks: ["Compute credits", "Early access", "Product feedback channel", "Event funding"] },
  { name: "Enterprise Champion", desc: "Ship Devin at scale inside your org.", perks: ["Priority API/compute", "Direct eng Slack", "Early access", "Speaking opportunities"] },
]

const links = [
  { label: "Discord", href: "https://discord.gg/GjCYNGChrw", desc: "Daily conversation, project showcases, help threads" },
  { label: "Events on Luma", href: "https://lu.ma/devin", desc: "Global event calendar \u2014 find a chapter near you" },
  { label: "GitHub Discussions", href: "https://github.com/cognition-labs/devin/discussions", desc: "Long-form questions, RFCs, community playbooks" },
]

const Content: FC = () => (
  <div className="flex flex-col gap-20 sm:gap-24">
    {/* Photo strip */}
    <motion.div
      initial="hidden" whileInView="visible" viewport={vp} variants={container}
      className="win-scroll -mx-6 flex gap-3 overflow-x-auto px-6 pb-4 sm:-mx-0 sm:px-0"
    >
      {cities.map((city) => (
        <motion.figure key={city} variants={up} className="flex-none">
          <div
            className="h-36 w-52 rounded-lg bg-panel sm:h-44 sm:w-64"
            style={{ boxShadow: SHADOW }}
            role="img"
            aria-label={`Community event in ${city}`}
          />
          <figcaption className="mt-2 font-mono text-[0.6875rem] text-muted">{city}</figcaption>
        </motion.figure>
      ))}
    </motion.div>

    {/* Stats */}
    <motion.section
      initial="hidden" whileInView="visible" viewport={vp} variants={container}
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      aria-label="Community metrics"
    >
      {stats.map((s) => (
        <motion.div
          key={s.label} variants={up}
          className="flex flex-col gap-1 rounded-lg bg-panel p-5"
          style={{ boxShadow: SHADOW }}
        >
          <span className="font-mono text-[1.5rem] font-medium leading-none text-ink" style={{ fontVariantNumeric: "tabular-nums" }}>
            {s.value}
          </span>
          <span className="text-[0.8125rem] text-muted">{s.label}</span>
        </motion.div>
      ))}
    </motion.section>

    {/* The Wire */}
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

    {/* Community voices */}
    <motion.section
      initial="hidden" whileInView="visible" viewport={vp} variants={container}
      aria-labelledby="voices-heading"
    >
      <motion.h2 className="section-heading" id="voices-heading" variants={up}>Community voices</motion.h2>
      <motion.div className="columns-1 gap-3 sm:columns-2 lg:columns-3" variants={container}>
        {voices.map((v) => (
          <motion.blockquote
            key={v.handle} variants={up}
            className="mb-3 break-inside-avoid rounded-lg bg-panel p-4"
            style={{ boxShadow: SHADOW }}
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

    {/* Upcoming events */}
    <motion.section
      initial="hidden" whileInView="visible" viewport={vp} variants={container}
      aria-labelledby="events-heading"
    >
      <motion.h2 className="section-heading" id="events-heading" variants={up}>Upcoming events</motion.h2>
      <motion.ul
        className="flex flex-col overflow-hidden rounded-lg"
        style={{ boxShadow: SHADOW, listStyle: "none", margin: 0, padding: 0 }}
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

    {/* Event types */}
    <motion.section
      initial="hidden" whileInView="visible" viewport={vp} variants={container}
      aria-labelledby="formats-heading"
    >
      <motion.h2 className="section-heading" id="formats-heading" variants={up}>What we do</motion.h2>
      <motion.div className="grid gap-3 sm:grid-cols-2" variants={container}>
        {formats.map((f) => (
          <motion.div
            key={f.name} variants={up}
            className="rounded-lg bg-panel p-5"
            style={{ boxShadow: SHADOW }}
          >
            <h3 className="m-0 text-[1rem] font-medium leading-snug text-ink">{f.name}</h3>
            <p className="m-0 mt-1.5 text-[0.8125rem] leading-relaxed text-muted" style={{ textWrap: "pretty" }}>
              {f.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>

    {/* Ambassador program */}
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
            className="flex flex-col rounded-lg bg-panel p-5"
            style={{ boxShadow: SHADOW }}
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

    {/* Get involved */}
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
            className="group flex items-baseline justify-between gap-4 rounded-lg bg-panel px-4 py-3 no-underline"
            style={{ boxShadow: SHADOW }}
            whileHover={{ boxShadow: SHADOW_LIFT }}
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
