import React, { type FC } from "react"
import { motion } from "framer-motion"

export const frontmatter = {
  title: "Community",
  description: "Chapters, events, and a weekly feedback loop for Devin builders.",
  eyebrow: "Community",
}

const targets = [
  { value: "30+", unit: "cities", label: "Cognition Coffee cities (target Year 1)" },
  { value: "4", unit: "hubs", label: "Devin Days flagship hubs" },
  { value: "3", unit: "tiers", label: "Ambassador tiers" },
  { value: "1", unit: "weekly", label: "Devin Office Hours" },
]

const events = [
  { name: "Devin Day SF", place: "San Francisco, USA", date: "Jul 12" },
  { name: "Cognition Coffee NYC", place: "New York, USA", date: "Jul 15" },
  { name: "Devin Builders Meetup", place: "Austin, USA", date: "Jul 18" },
  { name: "Orchestrating Fleets of Devins", place: "London, UK", date: "Jul 22" },
  { name: "Devin Hack Night", place: "Bangalore, India", date: "Jul 26" },
  { name: "Cognition Coffee Berlin", place: "Berlin, Germany", date: "Jul 29" },
  { name: "Devin Office Hours (virtual)", place: "Remote", date: "Aug 1" },
  { name: "Non-coding Devin: Research & Docs", place: "Toronto, Canada", date: "Aug 5" },
]

const channels = [
  { label: "Discord", href: "https://discord.gg/GjCYNGChrw", desc: "Daily conversation, project showcases, help threads" },
  { label: "Office Hours", href: "#", desc: "Weekly live sessions with the Devin team" }, // TODO: real URL
  { label: "GitHub Discussions", href: "#", desc: "Long-form questions, RFCs, community playbooks" }, // TODO: real URL
]

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const Content: FC = () => (
  <motion.div initial="hidden" animate="visible" variants={stagger}>
    <motion.div className="intro-copy" variants={fadeUp}>
      <p style={{ textWrap: "balance" }}>
        Curriculum, local chapters, and a feedback loop that makes the product better.
      </p>
      <p style={{ textWrap: "pretty" }}>
        A global calendar centralized on Luma, with chapters running in parallel across tech hubs.
      </p>
    </motion.div>

    <motion.section
      className="section-block mt-14"
      aria-labelledby="targets-heading"
      variants={fadeUp}
    >
      <h2 className="section-heading" id="targets-heading">Targets</h2>
      <motion.div
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        variants={stagger}
      >
        {targets.map((t) => (
          <motion.div
            key={t.label}
            variants={fadeUp}
            className="flex flex-col gap-1 rounded-lg bg-panel p-4"
            style={{
              boxShadow:
                "0px 0px 0px 1px rgba(0,0,0,0.06), 0px 1px 2px -1px rgba(0,0,0,0.06), 0px 2px 4px 0px rgba(0,0,0,0.04)",
            }}
          >
            <span
              className="text-[1.5rem] font-medium leading-none text-ink"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {t.value}
              <span className="ml-1 text-[0.8125rem] font-normal text-muted">{t.unit}</span>
            </span>
            <span className="text-[0.8125rem] leading-snug text-muted" style={{ textWrap: "pretty" }}>
              {t.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>

    <motion.section
      className="section-block"
      aria-labelledby="events-heading"
      variants={fadeUp}
    >
      <h2 className="section-heading" id="events-heading">Upcoming events</h2>
      <motion.ul
        className="flex flex-col gap-0 rounded-lg"
        style={{
          boxShadow:
            "0px 0px 0px 1px rgba(0,0,0,0.06), 0px 1px 2px -1px rgba(0,0,0,0.06), 0px 2px 4px 0px rgba(0,0,0,0.04)",
          listStyle: "none",
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}
        variants={stagger}
      >
        {events.map((e, i) => (
          <motion.li
            key={e.name}
            variants={fadeUp}
            className="group flex items-baseline justify-between gap-4 bg-panel px-4 py-3 transition-colors hover:bg-canvas"
            style={i > 0 ? { boxShadow: "inset 0 1px 0 0 rgba(0,0,0,0.06)" } : undefined}
          >
            <span className="min-w-0">
              <span
                className="block text-[1rem] font-normal leading-relaxed text-ink"
                style={{ textWrap: "balance" }}
              >
                {e.name}
              </span>
              <span className="block text-[0.8125rem] text-muted">{e.place}</span>
            </span>
            <time
              className="shrink-0 font-mono text-[0.75rem] text-muted"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {e.date}
            </time>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>

    <motion.section
      className="section-block"
      aria-labelledby="involved-heading"
      variants={fadeUp}
    >
      <h2 className="section-heading" id="involved-heading">Get involved</h2>
      <motion.div className="flex flex-col gap-3" variants={stagger}>
        {channels.map((c) => (
          <motion.a
            key={c.label}
            href={c.href}
            {...(c.href !== "#" ? { target: "_blank", rel: "noopener" } : {})}
            variants={fadeUp}
            whileTap={{ scale: 0.96 }}
            className="group flex items-baseline justify-between gap-4 rounded-lg bg-panel px-4 py-3 no-underline transition-shadow"
            style={{
              boxShadow:
                "0px 0px 0px 1px rgba(0,0,0,0.06), 0px 1px 2px -1px rgba(0,0,0,0.06), 0px 2px 4px 0px rgba(0,0,0,0.04)",
            }}
            whileHover={{
              boxShadow:
                "0px 0px 0px 1px rgba(0,0,0,0.08), 0px 1px 2px -1px rgba(0,0,0,0.08), 0px 2px 4px 0px rgba(0,0,0,0.06)",
            }}
          >
            <span className="min-w-0">
              <span className="block text-[1rem] font-medium text-ink">{c.label}</span>
              <span className="block text-[0.8125rem] text-muted" style={{ textWrap: "pretty" }}>
                {c.desc}
              </span>
            </span>
            <svg
              className="mt-0.5 h-3 w-3 shrink-0 text-muted transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M4.5 2.5l3.5 3.5-3.5 3.5" />
            </svg>
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  </motion.div>
)

export default Content
