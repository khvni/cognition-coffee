import React, { type FC, useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { eventCities, voices, events, links } from "@/data/community"

export const frontmatter = {
  title: "Community",
  description: "Builders gathering in cities around the world to hack, ship, and share.",
  eyebrow: "Community",
}

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
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ aspectRatio: "2.4 / 1" }}>
      <svg
        viewBox="0 0 100 50"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Map of Devin community event locations"
      >
        <rect width="100" height="50" fill="none" />
        {eventCities.map((city, i) => {
          const { x, y } = toMercator(city.lat, city.lng)
          return (
            <g key={city.name}>
              <circle
                cx={x}
                cy={y}
                r="0.6"
                fill="rgba(49, 124, 255, 0.15)"
                style={{
                  transform: isInView ? "scale(1)" : "scale(0)",
                  transformOrigin: `${x}px ${y}px`,
                  transition: `transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms`,
                }}
              />
              <circle
                cx={x}
                cy={y}
                r="0.25"
                fill="#317CFF"
                className="origin-center"
                style={{
                  transform: isInView ? "scale(1)" : "scale(0)",
                  transformOrigin: `${x}px ${y}px`,
                  transition: `transform 500ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 120 + 100}ms`,
                  animation: isInView ? `dot-pulse 3s ease-in-out ${i * 0.2}s infinite` : "none",
                }}
              />
            </g>
          )
        })}
      </svg>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-canvas via-transparent to-canvas opacity-30" />
    </div>
  )
}

const PhotoParallax: FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <div ref={ref} className="relative w-full overflow-hidden rounded-win" style={{ height: "clamp(240px, 40vw, 420px)" }}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="absolute inset-0 w-full h-full object-cover scale-110"
      />
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)" }} />
    </div>
  )
}

const Reveal: FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay }}
  >
    {children}
  </motion.div>
)

const Content: FC = () => {
  const citiesCounter = useCounter(16)
  const eventsCounter = useCounter(58)
  const attendeesCounter = useCounter(1400)

  return (
    <div className="flex flex-col gap-0">

      <section className="mb-24">
        <PhotoParallax src="/menu/cafe-cognition.jpg" alt="Devin community builders at a Cognition Coffee event" />
      </section>

      <section className="mb-24">
        <Reveal>
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            <div>
              <span ref={citiesCounter.ref} className="text-3xl font-medium tabular-nums text-ink">{citiesCounter.count}+</span>
              <span className="ml-2 text-muted text-sm">cities</span>
            </div>
            <div>
              <span ref={eventsCounter.ref} className="text-3xl font-medium tabular-nums text-ink">{eventsCounter.count}+</span>
              <span className="ml-2 text-muted text-sm">events</span>
            </div>
            <div>
              <span ref={attendeesCounter.ref} className="text-3xl font-medium tabular-nums text-ink">{attendeesCounter.count.toLocaleString()}+</span>
              <span className="ml-2 text-muted text-sm">attendees</span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mb-24">
        <Reveal>
          <EventMap />
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-muted text-sm mt-4 text-center">
            {eventCities.map((c) => c.name).join(" · ")}
          </p>
        </Reveal>
      </section>

      <section className="mb-24">
        <PhotoParallax src="/menu/hack-with-devin.jpg" alt="Builders at a Devin hack night working on projects" />
      </section>

      <section className="mb-24">
        <Reveal>
          <h2 className="section-heading" id="voices-heading">What people are saying</h2>
        </Reveal>
        <div className="flex flex-col gap-12 mt-6">
          {voices.map((v, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <blockquote className="m-0 pl-0">
                <p className="text-xl leading-relaxed font-normal text-ink" style={{ textWrap: "pretty" }}>
                  "{v.text}"
                </p>
                <footer className="mt-3 text-sm text-muted">
                  {v.author && <span className="font-medium text-ink">{v.author} </span>}
                  <span className="font-mono text-xs">{v.handle}</span>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <PhotoParallax src="/menu/workshop-series.jpg" alt="Devin workshop in progress with participants building" />
      </section>

      <section className="mb-24">
        <Reveal>
          <h2 className="section-heading" id="events-heading">
            <a href={links.luma} target="_blank" rel="noopener" className="section-heading">
              Upcoming events
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 6h7M6.5 3l3 3-3 3" />
              </svg>
            </a>
          </h2>
        </Reveal>
        <ul className="entry-list dated-list mt-4">
          {events.map((e, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <li className="entry-row">
                <a href={links.luma} target="_blank" rel="noopener" className="entry-link">
                  <strong>{e.name}<span className="font-normal text-muted ml-2">{e.city}</span></strong>
                  <time className="font-mono">{e.date}</time>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.4}>
          <a
            href={links.luma}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 mt-6 text-sm text-accent-ink hover:text-ink transition-colors"
          >
            Full calendar on lu.ma/devin
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 6h7M6.5 3l3 3-3 3" />
            </svg>
          </a>
        </Reveal>
      </section>

      <section className="mb-24">
        <Reveal>
          <h2 className="section-heading" id="program-heading">Ambassador program</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed text-ink mt-4" style={{ maxWidth: "36rem", textWrap: "pretty" }}>
            Help grow the Devin community in your city. Ambassadors host local events,
            run chapters, and get early access to new features, compute credits, event
            funding, and a direct line to the engineering team.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-base leading-relaxed text-muted mt-4" style={{ maxWidth: "36rem", textWrap: "pretty" }}>
            Whether you're a student building your first project with Devin, a community
            organizer running local meetups, or an enterprise champion shipping Devin at
            scale — there's a place for you.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <a
            href={links.ambassador}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center mt-8 px-5 py-3 rounded-win bg-accent text-canvas text-sm font-medium transition-colors hover:bg-accent-ink active:scale-[0.97]"
            style={{ transitionProperty: "background-color, transform", transitionDuration: "150ms" }}
          >
            Apply to become an ambassador
          </a>
        </Reveal>
      </section>

      <section className="mb-12">
        <Reveal>
          <h2 className="section-heading" id="links-heading">Get involved</h2>
        </Reveal>
        <ul className="entry-list mt-4">
          <Reveal delay={0.05}>
            <li className="entry-row">
              <a href={links.discord} target="_blank" rel="noopener" className="entry-link">
                <strong>Discord</strong>
                <span>Daily conversation, project showcases, help threads</span>
              </a>
            </li>
          </Reveal>
          <Reveal delay={0.1}>
            <li className="entry-row">
              <a href={links.luma} target="_blank" rel="noopener" className="entry-link">
                <strong>Events on Luma</strong>
                <span>Global event calendar — find a chapter near you</span>
              </a>
            </li>
          </Reveal>
          <Reveal delay={0.15}>
            <li className="entry-row">
              <a href={links.github} target="_blank" rel="noopener" className="entry-link">
                <strong>GitHub Discussions</strong>
                <span>Long-form questions, RFCs, community playbooks</span>
              </a>
            </li>
          </Reveal>
        </ul>
      </section>
    </div>
  )
}

export default Content
