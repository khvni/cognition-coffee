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
      Devin is a new kind of tool. You don't autocomplete your next line with it. You direct an autonomous engineer at problems. That takes a different way of thinking, and most developers are still figuring it out by trial and error.
    </p>
    <p>
      A product this important doesn't reach its potential through feature releases and docs. It reaches it through a community that teaches the world how to use it. Cursor already runs events in over 200 cities with ambassadors and a grassroots identity. Cognition has Devin, a Discord, and a Luma calendar. That's a starting position, not a moat.
    </p>
    <ProsePullQuote>
      The best developer communities aren't audiences. They're operating systems, with curriculum, local chapters, and a feedback loop that makes the product better.
    </ProsePullQuote>
    <h2>What's missing today</h2>
    <ProseWaxFigure caption="Current state of Cognition's community infrastructure">
      <p>
        <strong>Devin University</strong> exists, but offers no structured learning path and no credential. Developers can't prove mastery.
      </p>
      <p>
        <strong>The ambassador program</strong> is a Google Form. No tiers, no portal, no feedback-to-product loop.
      </p>
      <p>
        <strong>Events</strong> run on Luma, but without local chapter ownership. Each event starts from zero.
      </p>
    </ProseWaxFigure>
    <p>
      None of this is a criticism. It's a map of greenfield. The community layer is the natural next build.
    </p>
    <h2>The plan</h2>
    <h3>Curriculum and certification</h3>
    <p>
      Give people a structured path from "curious about Devin" to "confident power user." Three tracks: Devin 101 (first agent workflow, PR review basics), Advanced Workflows (multi-repo, fleets, MCP, playbooks), and Devin for Teams (rollout patterns, governance). Each track ends with an earnable certification badge. Nobody has formal Devin certification yet. That's greenfield.
    </p>
    <h3>Meetups: Cognition Coffee</h3>
    <p>
      With curriculum in place, get people together. Cognition Coffee is the meetup format: pop-ups in coffee shops, Devin credits, live demos. What sets it apart is a <strong>meetup-in-a-box kit</strong> so a motivated developer in Bangalore or Berlin can run one with no coordination overhead.
    </p>
    <ProseWaxFigure caption="The meetup-in-a-box kit">
      <ul>
        <li>
          <strong>Run-of-show template</strong>: minute-by-minute schedule for 15 or 50 people
        </li>
        <li>
          <strong>Slide deck</strong>: branded, editable, with speaker notes
        </li>
        <li>
          <strong>Live-demo script</strong>: a working Devin workflow hosts can present or riff on
        </li>
        <li>
          <strong>Swag templates</strong>: sticker sheets, name badges, table cards
        </li>
        <li>
          <strong>Host leaderboard</strong>: perks that turn great organizers into hosts who recruit the next round
        </li>
      </ul>
    </ProseWaxFigure>
    <p>
      Pilot in SF and NYC first. Measure repeat attendance, builds shipped, and host satisfaction, not just headcount.
    </p>
    <h3>Ambassadors: the Roasters' Guild</h3>
    <p>
      Curriculum creates practitioners. Meetups create local energy. The ambassador program turns the most active members into a lasting multiplier. Three tiers: Contributor (share builds, host a first event, get beta access), Advocate (consistent organizers with a direct line to DevRel), and Champion (regional leaders with a product-feedback seat and flagship event budget).
    </p>
    <p>
      The key piece is the feedback loop: weekly Devin Office Hours where ambassadors surface real problems users hit, which feeds community playbooks and back to the product team.
    </p>
    <h2>Why me</h2>
    <p>
      I founded the Muslim Tech Collaborative at UC Berkeley and scaled it from one campus club to 30+ university chapters and 4 city hubs in 18 months. That meant building the same infrastructure this plan describes: a chapter-in-a-box playbook, tiered leadership, and a coordination layer that let local leaders run independently.
    </p>
    <p>
      I also{" "}
      <a href="https://sp23.datastructur.es/staff.html" target="_blank" rel="noopener noreferrer">
        TA'd Berkeley's CS 61B (Data Structures)
      </a>
      , one of Berkeley's largest and most foundational CS courses. Roughly 1,800 students enroll each semester, supported by about 90 course staff. The course teaches Java, data structures (lists, trees, hash tables, graphs), and core algorithms.
    </p>
    <p>
      The structure is what taught me how educational systems work at scale. Professors lecture. TAs lead weekly discussion sections. Tutors and TAs staff labs and office hours. Programming projects and homeworks are graded by an autograder that gives students instant feedback the moment they submit. Weekly labs and discussion sections keep everyone on pace. The best students come back as the next generation of staff. That loop is what I want to build for Devin.
    </p>
    <p>
      I use Devin daily on the Max plan and I build communities about developer tools. I know the product deeply enough to know what's worth teaching and where the documentation falls short.
    </p>
    <p>
      And I built this entire site with Devin. Multiple parallel sessions, a shared design system, collision-free workstreams. The medium is the message.
    </p>
    <ProsePullQuote>
      I'd rather build the strategy than just pitch it. That's what this site is.
    </ProsePullQuote>
    <h2>Let's talk</h2>
    <p>
      This is a working plan, and an open invitation to compare notes. If any of it resonates, I'd love to walk through{" "}
      <a href="/#menu">the full menu</a> or{" "}
      <a href="/blog/cafe-cognition/">the playbook behind Cognition Coffee</a>.
    </p>
    <p>
      Let's brew something. <a href="/about#contact">Get in touch</a>.
    </p>
  </>
)

export default Content
