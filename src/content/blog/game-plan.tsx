import React, { type FC } from "react"
import { ProsePullQuote } from "@/components/prose/ProsePullQuote"
import { ProseWaxFigure } from "@/components/prose/ProseWaxFigure"

export const frontmatter = {
  title: "What I'd Build for Cognition",
  description:
    "A concrete plan for Cognition's developer community: curriculum, meetups, and ambassadors.",
  date: "2026-06-13",
  category: "The Proposal",
  order: 1,
  draft: false,
}

const Content: FC = () => (
  <>
    <p>
      Devin is a new kind of tool. You don't autocomplete the next line; you direct an autonomous engineer at problems. Most developers are still figuring that out by trial and error.
    </p>
    <p>
      A product this important doesn't reach its potential through feature releases. It reaches it through a community that teaches the world how to use it. Cursor already runs events in over 200 cities with ambassadors. Cognition has Devin, a Discord, and a Luma calendar. That's a starting position, not a moat.
    </p>
    <ProsePullQuote>
      The best developer communities aren't audiences. They're operating systems, with curriculum, local chapters, and a feedback loop that makes the product better.
    </ProsePullQuote>
    <h2>What's missing today</h2>
    <ProseWaxFigure caption="Current state of Cognition's community infrastructure">
      <p>
        <strong>Devin University</strong> exists, but offers no structured path and no credential.
      </p>
      <p>
        <strong>The ambassador program</strong> is a Google Form. No tiers, no portal, no feedback-to-product loop.
      </p>
      <p>
        <strong>Events</strong> run on Luma, but without local chapter ownership. Each event starts from zero.
      </p>
    </ProseWaxFigure>
    <h2>The plan</h2>
    <h3>Curriculum and certification</h3>
    <p>
      Give people a structured path from "curious about Devin" to "confident power user." Three tracks: Devin 101, Advanced Workflows, and Devin for Teams. Each ends with an earnable certification badge. Formal Devin certification is greenfield.
    </p>
    <h3>Meetups: Cognition Coffee</h3>
    <p>
      Get people together in coffee shops with a <strong>meetup-in-a-box kit</strong>: run-of-show, slide deck, live-demo script, swag, and a host leaderboard. A motivated developer in Bangalore or Berlin can run one without calling HQ.
    </p>
    <h3>Ambassadors: the Roasters' Guild</h3>
    <p>
      Three tiers: Contributor, Advocate, and Champion. The key is the feedback loop: weekly Devin Office Hours where ambassadors surface real problems users hit, which feeds community playbooks and the product team.
    </p>
    <h2>Why me</h2>
    <p>
      I founded the Muslim Tech Collaborative at UC Berkeley and scaled it from one club to 30+ university chapters and 4 city hubs in 18 months. I also{" "}
      <a href="https://sp23.datastructur.es/staff.html" target="_blank" rel="noopener noreferrer">
        TA'd Berkeley's CS 61B
      </a>
      , one of the largest foundational CS courses in the country. That structure taught me how educational systems work at scale.
    </p>
    <p>
      I use Devin daily and I build communities around developer tools. And I built this entire site with Devin. Multiple parallel sessions, a shared design system, collision-free workstreams. The medium is the message.
    </p>
    <h2>Let's talk</h2>
    <p>
      If any of this resonates, I'd love to walk through{" "}
      <a href="/#menu">the full menu</a> or{" "}
      <a href="/blog/cafe-cognition/">the Cognition Coffee playbook</a>.{" "}
      <a href="/about#contact">Get in touch</a>.
    </p>
  </>
)

export default Content
