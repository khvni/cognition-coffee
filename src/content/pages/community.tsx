import React, { type FC, useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { eventCities, communityPhotos, voices, events, links, redditLinks } from "@/data/community"

export const frontmatter = {
  title: "The Devin Community",
  description: "Where Devin builders meet, hack, and ship — in 58 cities and counting.",
  eyebrow: "Community",
  layout: "grid" as const,
}

const ease = [0.25, 0.1, 0.25, 1] as const
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }
const up = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }
const vp = { once: true, margin: "-80px" as const }

const SHADOW_CARD = "0px 0px 0px 1px rgba(0,0,0,0.06), 0px 1px 2px -1px rgba(0,0,0,0.06), 0px 2px 4px 0px rgba(0,0,0,0.04)"
const SHADOW_CARD_LIFT = "0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 8px -2px rgba(0,0,0,0.08), 0px 4px 12px 0px rgba(0,0,0,0.06)"

const stats = [
  { value: "58+", label: "cities" },
  { value: "1,400+", label: "attendees" },
  { value: "12x", label: "productivity" },
  { value: "$492M", label: "run-rate" },
]

const formats = [
  { name: "Cognition Coffee", desc: "Cafe takeovers — builders meet over espresso and ship side-projects with Devin." },
  { name: "Hack Nights", desc: "Evening build sessions. Bring a laptop, leave with a deployed project." },
  { name: "Workshops", desc: "Hands-on playbooks, fleet orchestration, and advanced prompting." },
  { name: "Office Hours", desc: "Weekly live sessions with the Devin team. Ask anything." },
]

const tiers = [
  { name: "Student Builder", desc: "Students and early-career devs building with Devin.", perks: ["API credits", "Community recognition", "Devin swag"] },
  { name: "Community Organizer", desc: "Run local chapters and events in your city.", perks: ["Compute credits", "Early access", "Product feedback channel", "Event funding"] },
  { name: "Enterprise Champion", desc: "Ship Devin at scale inside your org.", perks: ["Priority API/compute", "Direct eng Slack", "Early access", "Speaking opportunities", "Custom swag"] },
]

function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * end))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return { ref, count }
}

function toMercator(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * 100
  const latRad = (lat * Math.PI) / 180
  const y = (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) * 50
  return { x, y }
}

const EventMap: FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref} className="relative w-full overflow-hidden rounded-win bg-panel" style={{ aspectRatio: "2.5 / 1" }}>
      <svg
        viewBox="0 28 100 34"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Map of Devin community event locations"
      >
        {eventCities.map((city, i) => {
          const { x, y } = toMercator(city.lat, city.lng)
          return (
            <g key={city.name}>
              <circle
                cx={x}
                cy={y}
                r="1.4"
                className="fill-accent/10"
                style={{
                  transform: isInView ? "scale(1)" : "scale(0)",
                  transformOrigin: `${x}px ${y}px`,
                  transition: `transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`,
                }}
              />
              <circle
                cx={x}
                cy={y}
                r="0.5"
                className="fill-accent"
                style={{
                  transform: isInView ? "scale(1)" : "scale(0)",
                  transformOrigin: `${x}px ${y}px`,
                  transition: `transform 500ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 100 + 80}ms`,
                  animation: isInView ? `dot-pulse 3s ease-in-out ${i * 0.2}s infinite` : "none",
                }}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

const Polaroid: FC<{ src: string; alt: string; caption: string; delay?: number }> = ({ src, alt, caption, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay }}
      className="relative overflow-hidden rounded-win bg-canvas shadow-card"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
        <motion.img
          src={src}
          alt={alt}
          style={{ y }}
          className="absolute inset-0 w-full h-full object-cover scale-105"
          loading="lazy"
        />
      </div>
      <p className="px-3 py-2.5 text-xs text-muted font-mono tracking-wide">{caption}</p>
    </motion.div>
  )
}

const Content: FC = () => {
  const citiesCounter = useCounter(16)
  const eventsCounter = useCounter(58)
  const attendeesCounter = useCounter(1400)

  return (
    <div className="flex flex-col gap-16">
      <section>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {communityPhotos.map((photo, i) => (
            <Polaroid key={photo.src} src={photo.src} alt={photo.alt} caption={photo.caption} delay={i * 0.06} />
          ))}
        </div>
      </section>

      <motion.section
        initial="hidden" whileInView="visible" viewport={vp} variants={container}
        className="flex flex-wrap gap-x-12 gap-y-4"
        aria-label="Community metrics"
      >
        <motion.div variants={up}>
          <span ref={citiesCounter.ref} className="font-mono text-3xl font-medium tabular-nums text-ink">{citiesCounter.count}+</span>
          <span className="ml-2 text-sm text-muted">cities</span>
        </motion.div>
        <motion.div variants={up}>
          <span ref={eventsCounter.ref} className="font-mono text-3xl font-medium tabular-nums text-ink">{eventsCounter.count}+</span>
          <span className="ml-2 text-sm text-muted">events</span>
        </motion.div>
        <motion.div variants={up}>
          <span ref={attendeesCounter.ref} className="font-mono text-3xl font-medium tabular-nums text-ink">{attendeesCounter.count.toLocaleString()}+</span>
          <span className="ml-2 text-sm text-muted">attendees</span>
        </motion.div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={vp} variants={container}>
        <motion.div variants={up}>
          <EventMap />
        </motion.div>
        <motion.p variants={up} className="text-muted text-sm mt-4 text-center">
          {eventCities.map((c) => c.name).join(" · ")}
        </motion.p>
      </motion.section>

      <motion.section
        initial="hidden" whileInView="visible" viewport={vp} variants={container}
        aria-labelledby="voices-heading"
      >
        <motion.h2 className="section-heading" id="voices-heading" variants={up}>Community voices</motion.h2>
        <motion.div className="columns-1 gap-3 sm:columns-2 lg:columns-3" variants={container}>
          {voices.map((v, i) => (
            <motion.blockquote
              key={i} variants={up}
              className="mb-3 break-inside-avoid rounded-lg bg-panel p-4 shadow-card"
            >
              <p className="text-[0.9375rem] leading-relaxed text-ink text-pretty">
                &ldquo;{v.text}&rdquo;
              </p>
              <footer className="mt-3 text-sm text-muted">
                {v.author && <span className="font-medium text-ink">{v.author} </span>}
                <span className="font-mono text-xs">{v.handle}</span>
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
        <motion.ul className="flex flex-col overflow-hidden rounded-lg shadow-card" variants={container}>
          {events.map((e, i) => (
            <motion.li
              key={e.name} variants={up}
              className="group flex items-baseline justify-between gap-4 bg-panel px-4 py-3 transition-colors hover:bg-canvas"
              style={i > 0 ? { boxShadow: "inset 0 1px 0 0 rgba(0,0,0,0.06)" } : undefined}
            >
              <a href={links.luma} target="_blank" rel="noopener" className="flex items-baseline justify-between gap-4 w-full no-underline">
                <span className="min-w-0">
                  <span className="block text-[1rem] leading-relaxed text-ink text-balance">{e.name}</span>
                  <span className="block text-[0.8125rem] text-muted">{e.city}</span>
                </span>
                <time className="shrink-0 font-mono text-xs text-muted tabular-nums">{e.date}</time>
              </a>
            </motion.li>
          ))}
        </motion.ul>
        <motion.a
          href={links.luma} target="_blank" rel="noopener" variants={up}
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-muted no-underline transition-colors hover:text-ink"
        >
          All events on lu.ma/devin
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
            <motion.div key={f.name} variants={up} className="rounded-lg bg-panel p-5 shadow-card">
              <h3 className="text-[1rem] font-medium leading-snug text-ink">{f.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted text-pretty">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        initial="hidden" whileInView="visible" viewport={vp} variants={container}
        aria-labelledby="ambassador-heading"
      >
        <motion.h2 className="section-heading" id="ambassador-heading" variants={up}>Ambassador program</motion.h2>
        <motion.p variants={up} className="mb-6 text-[0.9375rem] leading-relaxed text-muted text-pretty">
          Help grow the Devin community in your city. Get early access, credits, and a direct line to the team.
        </motion.p>
        <motion.div className="grid gap-3 sm:grid-cols-3" variants={container}>
          {tiers.map((t) => (
            <motion.div key={t.name} variants={up} className="flex flex-col rounded-lg bg-panel p-5 shadow-card">
              <h3 className="text-[1rem] font-medium leading-snug text-ink">{t.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted text-pretty">{t.desc}</p>
              <ul className="mt-4 flex flex-col gap-1.5">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-ink">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        initial="hidden" whileInView="visible" viewport={vp} variants={container}
        aria-labelledby="involved-heading"
      >
        <motion.h2 className="section-heading" id="involved-heading" variants={up}>Get involved</motion.h2>
        <motion.div className="flex flex-col gap-3" variants={container}>
          <motion.a
            href={links.discord} target="_blank" rel="noopener"
            variants={up} whileTap={{ scale: 0.96 }}
            className="group flex items-baseline justify-between gap-4 rounded-lg bg-panel px-4 py-3 no-underline"
            style={{ boxShadow: SHADOW_CARD }}
            whileHover={{ boxShadow: SHADOW_CARD_LIFT }}
          >
            <span className="min-w-0">
              <span className="block text-[1rem] font-medium text-ink">Discord</span>
              <span className="block text-[0.8125rem] text-muted text-pretty">Daily conversation, project showcases, help threads</span>
            </span>
            <svg className="mt-0.5 h-3 w-3 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4.5 2.5l3.5 3.5-3.5 3.5" />
            </svg>
          </motion.a>
          <motion.a
            href={links.luma} target="_blank" rel="noopener"
            variants={up} whileTap={{ scale: 0.96 }}
            className="group flex items-baseline justify-between gap-4 rounded-lg bg-panel px-4 py-3 no-underline"
            style={{ boxShadow: SHADOW_CARD }}
            whileHover={{ boxShadow: SHADOW_CARD_LIFT }}
          >
            <span className="min-w-0">
              <span className="block text-[1rem] font-medium text-ink">Events on Luma</span>
              <span className="block text-[0.8125rem] text-muted text-pretty">Global event calendar — find a chapter near you</span>
            </span>
            <svg className="mt-0.5 h-3 w-3 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4.5 2.5l3.5 3.5-3.5 3.5" />
            </svg>
          </motion.a>
          <motion.a
            href={links.ambassador} target="_blank" rel="noopener"
            variants={up} whileTap={{ scale: 0.96 }}
            className="group flex items-baseline justify-between gap-4 rounded-lg bg-panel px-4 py-3 no-underline"
            style={{ boxShadow: SHADOW_CARD }}
            whileHover={{ boxShadow: SHADOW_CARD_LIFT }}
          >
            <span className="min-w-0">
              <span className="block text-[1rem] font-medium text-ink">Become an ambassador</span>
              <span className="block text-[0.8125rem] text-muted text-pretty">Host events, get funding, early access</span>
            </span>
            <svg className="mt-0.5 h-3 w-3 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4.5 2.5l3.5 3.5-3.5 3.5" />
            </svg>
          </motion.a>
          {redditLinks.map((r) => (
            <motion.a
              key={r.name}
              href={r.href} target="_blank" rel="noopener"
              variants={up} whileTap={{ scale: 0.96 }}
              className="group flex items-baseline justify-between gap-4 rounded-lg bg-panel px-4 py-3 no-underline"
              style={{ boxShadow: SHADOW_CARD }}
              whileHover={{ boxShadow: SHADOW_CARD_LIFT }}
            >
              <span className="min-w-0">
                <span className="block text-[1rem] font-medium text-ink">{r.name}</span>
                <span className="block text-[0.8125rem] text-muted text-pretty">Reddit</span>
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
}

export default Content
