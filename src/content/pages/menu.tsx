import React, { type FC } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { stagger } from "@/lib/motion"

export const frontmatter = {
  title: "Programs",
  description: "Three community programs for Devin: curriculum, meetups, and ambassadors.",
  eyebrow: "Programs",
}

const curriculum = [
  { name: "Devin 101", desc: "The first agent workflow, the orchestrator mindset, PR review basics." },
  { name: "Advanced Workflows", desc: "Multi-repo orchestration, fleets of Devins, MCP, automations, playbooks." },
  { name: "Devin for Teams", desc: "Rollout patterns, knowledge onboarding, enterprise governance." },
  { name: "Certification", desc: "Earnable, verifiable badges. Developers love credentials." },
]

const meetups = [
  { name: "Cafe Cognition", desc: "Take over a cafe for a day. Coffee, credits, and builders." },
  { name: "Devin Days", desc: "Quarterly flagship hack days in tech hubs." },
  { name: "Meetup-in-a-box", desc: "Decks, demo scripts, swag templates, and a run-of-show in one kit." },
  { name: "Host leaderboard", desc: "Recognition and perks that turn hosts into a flywheel." },
]

const ambassadors = [
  { name: "Contributor", desc: "Entry tier: share builds, host first events, early access." },
  { name: "Advocate", desc: "Consistent organizers and creators: co-branded workshops and swag." },
  { name: "Champion", desc: "Regional leaders: a product-feedback seat and flagship event budget." },
  { name: "Feedback loop", desc: "Weekly Devin Office Hours feeding community playbooks and the product team." },
]

const experience = [
  { name: "Keysight Technologies", date: "Dec 2025 – present", desc: "Growth Insights / GTM Engineer. AI-native GTM driving partnerships and lead-gen across 6+ verticals; a main operator for internal AI tooling." },
  { name: "Bloom", date: "Feb – Apr 2025", desc: "Co-founder & CEO. AI conference matchmaking; idea to live product in 6 days, first paying customer in 4, ran live for 550+ attendees." },
  { name: "Muslim Tech Collaborative", date: "2023 – present", desc: "Founder & National Lead. One Berkeley club to 30+ chapters and 4 city hubs on a three-tier model." },
  { name: "UC Berkeley", date: "Grad. Dec 2024", desc: "B.S. Computer Science, CS 61B TA. Taught Data Structures to 1,800 students alongside 90 staff." },
  { name: "Five9", date: "2023", desc: "Product Security Intern. Product security on contact-center infrastructure." },
]

const Content: FC = () => {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div variants={prefersReduced ? undefined : stagger.container}>
      <motion.div variants={prefersReduced ? undefined : stagger.item} className="intro-copy">
        <p className="text-pretty">Three programs that build on each other: a curriculum that creates competence, a meetup network that creates belonging, and an ambassador program that creates reach.</p>
      </motion.div>

      <motion.section variants={prefersReduced ? undefined : stagger.item} className="section-block mt-14" aria-labelledby="curriculum-heading">
        <h2 className="section-heading" id="curriculum-heading">01 — Devin Mastery Curriculum</h2>
        <p className="text-pretty text-muted mb-4">Turn curious developers into certified Devin orchestrators. A three-track curriculum with hands-on labs, community playbooks, and earnable certification badges.</p>
        <ul className="entry-list">
          {curriculum.map((c) => (
            <li key={c.name} className="entry-row">
              <span className="entry-link">
                <strong>{c.name}</strong>
                <span className="text-pretty">{c.desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section variants={prefersReduced ? undefined : stagger.item} className="section-block" aria-labelledby="meetups-heading">
        <h2 className="section-heading" id="meetups-heading">02 — Cafe Cognition Meetups</h2>
        <p className="text-pretty text-muted mb-4">A global meetup network, not one-off pop-ups. A repeatable local-chapter engine with a meetup-in-a-box kit.</p>
        <ul className="entry-list">
          {meetups.map((m) => (
            <li key={m.name} className="entry-row">
              <span className="entry-link">
                <strong>{m.name}</strong>
                <span className="text-pretty">{m.desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section variants={prefersReduced ? undefined : stagger.item} className="section-block" aria-labelledby="ambassadors-heading">
        <h2 className="section-heading" id="ambassadors-heading">03 — Devin Ambassadors</h2>
        <p className="text-pretty text-muted mb-4">Turn top power users into an evangelist flywheel. A three-tier program with a portal, recognition, and a weekly feedback loop to the product team.</p>
        <ul className="entry-list">
          {ambassadors.map((a) => (
            <li key={a.name} className="entry-row">
              <span className="entry-link">
                <strong>{a.name}</strong>
                <span className="text-pretty">{a.desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section variants={prefersReduced ? undefined : stagger.item} className="section-block" aria-labelledby="experience-heading">
        <h2 className="section-heading" id="experience-heading">Experience</h2>
        <ul className="entry-list dated-list">
          {experience.map((e) => (
            <li key={e.name} className="entry-row">
              <span className="entry-link">
                <span>
                  <strong>{e.name}</strong>
                  <span className="block text-pretty">{e.desc}</span>
                </span>
                <time className="tabular-nums">{e.date}</time>
              </span>
            </li>
          ))}
        </ul>
      </motion.section>
    </motion.div>
  )
}

export default Content
