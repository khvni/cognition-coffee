import React, { type FC, useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { communityPhotos, links, faqs } from "@/data/community"
import { tweets } from "@/data/tweets"
import { PhotoCarousel } from "@/components/community/PhotoCarousel"
import { TweetWall } from "@/components/community/TweetWall"
import { FAQ } from "@/components/community/FAQ"
import { Button } from "@/components/ui/Button"

export const frontmatter = {
  title: "Join the global Devin community.",
  description:
    "Meet the builders, hosts, and teams shipping with Devin everywhere. Show up, ship together, and bring someone with you.",
  eyebrow: "Community",
  layout: "community" as const,
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
          <h1 className="max-w-3xl text-[1.75rem] font-medium leading-[1.35] tracking-tight text-ink [text-wrap:balance] sm:text-[2.25rem]">
            Join the global Devin community.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted [text-wrap:pretty]">
            Meet the builders, hosts, and teams shipping with Devin everywhere. Show up, ship together, and bring someone with you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href={links.discord} target="_blank" rel="noopener">
                Join Discord
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href={links.luma} target="_blank" rel="noopener">
                Find an event
              </a>
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="mb-20">
        <PhotoCarousel photos={communityPhotos} />
      </section>

      <section className="mb-20">
        <Reveal>
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            <div>
              <span ref={citiesCounter.ref} className="text-3xl font-medium tabular-nums text-ink">
                {citiesCounter.count}+
              </span>
              <span className="ml-2 text-sm text-muted">cities</span>
            </div>
            <div>
              <span ref={eventsCounter.ref} className="text-3xl font-medium tabular-nums text-ink">
                {eventsCounter.count}+
              </span>
              <span className="ml-2 text-sm text-muted">events</span>
            </div>
            <div>
              <span ref={attendeesCounter.ref} className="text-3xl font-medium tabular-nums text-ink">
                {attendeesCounter.count.toLocaleString()}+
              </span>
              <span className="ml-2 text-sm text-muted">attendees</span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mb-20">
        <Reveal>
          <h2 className="section-heading" id="voices-heading">
            What people are saying
          </h2>
        </Reveal>
        <TweetWall tweets={tweets} />
      </section>

      <section className="mb-20">
        <Reveal>
          <h2 className="section-heading" id="lead-heading">
            Lead with Devin
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink [text-wrap:pretty]">
            Devin Ambassadors are local leaders who host events, share Devin, and bring builders together. This is
            separate from Devin on Campus, which is for student-run university chapters.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted [text-wrap:pretty]">
            No tiers, no ladders, no unlocking perks. Once you're in, you're in. Every ambassador gets the same
            access: compute credits, early builds, event funding, swag, and a direct line to the team. We spoil
            you because you're doing real work, and we recognize you openly for it. The goal is simple: back
            you so you can go advocate for Devin in your city.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <a href={links.ambassador} target="_blank" rel="noopener">
                Apply to lead
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href={links.eventSupport}>Start a chapter</a>
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="mb-20">
        <Reveal>
          <h2 className="section-heading" id="links-heading">
            Get involved
          </h2>
        </Reveal>
        <ul className="mt-4 flex flex-col gap-3">
          <Reveal delay={0.05}>
            <li>
              <a href={links.discord} target="_blank" rel="noopener" className="group block">
                <span className="block text-base font-medium text-ink">Join Discord</span>
                <span className="block text-base text-muted">Meet builders, get help, and share what you ship.</span>
              </a>
            </li>
          </Reveal>
          <Reveal delay={0.1}>
            <li>
              <a href={links.luma} target="_blank" rel="noopener" className="group block">
                <span className="block text-base font-medium text-ink">Find events</span>
                <span className="block text-base text-muted">Global calendar of meetups, workshops, and hackathons.</span>
              </a>
            </li>
          </Reveal>
          <Reveal delay={0.15}>
            <li>
              <a href={links.ambassador} target="_blank" rel="noopener" className="group block">
                <span className="block text-base font-medium text-ink">Apply to lead</span>
                <span className="block text-base text-muted">Host local events with our backing, swag, and compute.</span>
              </a>
            </li>
          </Reveal>
          <Reveal delay={0.2}>
            <li>
              <a href={links.eventSupport} className="group block">
                <span className="block text-base font-medium text-ink">Get event support</span>
                <span className="block text-base text-muted">Need help planning? We can help with venue, funding, and swag.</span>
              </a>
            </li>
          </Reveal>
        </ul>
      </section>

      <section className="mb-12">
        <Reveal>
          <h2 className="section-heading" id="faq-heading">
            FAQ
          </h2>
        </Reveal>
        <div className="mt-4">
          <FAQ items={faqs} />
        </div>
      </section>
    </div>
  )
}

export default Content
