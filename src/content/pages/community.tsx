import React, { type FC, useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { eventCities, communityPhotos, voices, events, links, redditLinks } from "@/data/community"

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

      <section className="mb-20">
        <Reveal>
          <p className="text-base leading-relaxed text-ink" style={{ maxWidth: "36rem", textWrap: "pretty" }}>
            From San Francisco to São Paulo, builders meet up to hack with Devin,
            share what they've shipped, and push each other forward. No keynotes,
            no vendor booths — just laptops, good coffee, and the people next to you.
          </p>
        </Reveal>
      </section>

      <section className="mb-20">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {communityPhotos.map((photo, i) => (
            <Polaroid key={photo.src} src={photo.src} alt={photo.alt} caption={photo.caption} delay={i * 0.06} />
          ))}
        </div>
      </section>

      <section className="mb-20">
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

      <section className="mb-20">
        <Reveal>
          <EventMap />
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-muted text-sm mt-4 text-center">
            {eventCities.map((c) => c.name).join(" · ")}
          </p>
        </Reveal>
      </section>

      <section className="mb-20">
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

      <section className="mb-20">
        <Reveal>
          <h2 className="section-heading" id="events-heading">Upcoming events</h2>
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
      </section>

      <section className="mb-20">
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
                <span>104,609 members — conversation, showcases, help</span>
              </a>
            </li>
          </Reveal>
          <Reveal delay={0.1}>
            <li className="entry-row">
              <a href={links.luma} target="_blank" rel="noopener" className="entry-link">
                <strong>Events on Luma</strong>
                <span>Global calendar — find a chapter near you</span>
              </a>
            </li>
          </Reveal>
          <Reveal delay={0.15}>
            <li className="entry-row">
              <a href={links.ambassador} target="_blank" rel="noopener" className="entry-link">
                <strong>Become an ambassador</strong>
                <span>Host events, get funding, early access</span>
              </a>
            </li>
          </Reveal>
          <Reveal delay={0.2}>
            <li className="entry-row">
              <a href={links.eventSupport} className="entry-link">
                <strong>Event support</strong>
                <span>Need help planning a Devin event? Reach out</span>
              </a>
            </li>
          </Reveal>
          {redditLinks.map((r, i) => (
            <Reveal key={r.name} delay={0.25 + i * 0.05}>
              <li className="entry-row">
                <a href={r.href} target="_blank" rel="noopener" className="entry-link">
                  <strong>{r.name}</strong>
                  <span>Reddit</span>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Content
