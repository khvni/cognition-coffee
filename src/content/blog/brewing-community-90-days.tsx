import type { FC } from "react"
import { ProsePullQuote } from "@/components/mdx/ProsePullQuote"
import { ProseWaxFigure } from "@/components/mdx/ProseWaxFigure"

export const frontmatter = {
  title: "Brewing Community: What I'd Build for Cognition in 90 Days",
  description:
    "A concrete first-quarter plan for Cognition's developer community: curriculum, a global meetup network, and an ambassador flywheel.",
  date: "2026-06-13",
  category: "The Proposal",
  order: 1,
  draft: false,
}

const Content: FC = () => (
  <>
    <p>
      Cognition built the first AI software engineer. That alone changes how people write code. But a product this important doesn't reach its potential through feature releases and documentation pages. It reaches it through a community that teaches the world how to use it.
    </p>
    <p>
      Right now, Cognition is early in that work. Cursor already runs events in over 200 cities. They have ambassadors, a content machine, and a grassroots identity built around coffee shops and local builders. Cognition has Devin, a Discord, and a Luma calendar. That's a starting position, not a moat.
    </p>
    <p>
      This post is the plan I'd run in the first 90 days of building Cognition's developer community. Three programs, sequenced to build on each other, designed to create a self-sustaining engine rather than a string of one-off events.
    </p>
    <ProsePullQuote>
      The best developer communities aren't audiences. They're operating systems, with curriculum, local chapters, and a feedback loop that makes the product better.
    </ProsePullQuote>
    <h2>The case for starting now</h2>
    <p>
      Devin is a new kind of tool. It's not a copilot that autocompletes your next line. It's an autonomous engineer you direct at problems. That takes a different way of thinking, and right now, most developers are still figuring it out by trial and error.
    </p>
    <p>
      Cursor understood early that community speeds adoption. Their Cafe Cursor format (take over a coffee shop, bring credits and good energy, let people build together) created warmth at scale. But warmth without structure doesn't compound. Events end. Attendees scatter. The energy fades until the next one.
    </p>
    <p>
      What Cognition needs is a community engine: curriculum that creates competence, chapters that create belonging, and ambassadors that create reach. Sequenced properly, each one feeds the next.
    </p>
    <h2>What's missing today</h2>
    <ProseWaxFigure caption="Current state of Cognition's community infrastructure">
      <p>
        <strong>Devin University</strong> exists, but offers no structured learning path and no credential. Developers can't prove mastery.
      </p>
      <p>
        <strong>The ambassador program</strong> is a Google Form. No tiers, no portal, no structured feedback-to-product loop.
      </p>
      <p>
        <strong>Events</strong> run on Luma, but without local chapter ownership behind them. Each event starts from zero.
      </p>
    </ProseWaxFigure>
    <p>
      None of this is a criticism. It's a map of greenfield. Cognition has been shipping product. The community layer is the natural next build.
    </p>
    <h2>The 90-day plan</h2>
    <h3>Days 0–30: The House Roast, curriculum and certification</h3>
    <p>
      The first priority is giving people a structured path from "curious about Devin" to "confident Devin orchestrator." Three tracks:
    </p>
    <ul>
      <li>
        <strong>Devin 101</strong>: the first agent workflow, the orchestrator mindset, PR review basics. The on-ramp.
      </li>
      <li>
        <strong>Advanced Workflows</strong>: multi-repo orchestration, Devin fleets, MCP integrations, playbook authoring, the non-coding use cases most tutorials skip.
      </li>
      <li>
        <strong>Devin for Teams</strong>: rollout patterns, knowledge onboarding, enterprise governance. The content that sells seats.
      </li>
    </ul>
    <p>
      Each track ends with an earnable certification badge. Developers love credentials: they signal competence to hiring managers and give community members something to work toward.
    </p>
    <ProsePullQuote>
      Nobody has formal Devin certification yet. Cursor has great educational content but no credential. This is greenfield.
    </ProsePullQuote>
    <p>
      The curriculum isn't just courses. It's community-contributed playbooks, hands-on labs, and a strong focus on non-coding use cases (research synthesis, living documentation, design-system maintenance, GTM automation) that reach users beyond senior engineers.
    </p>
    <h3>Days 30–60: Single-Origin Series, Cafe Cognition</h3>
    <p>
      With a curriculum in place, the next step is getting people together. Cafe Cognition is the meetup format: pop-ups in coffee shops, Devin credits, live demos, and local builders sharing what they've built.
    </p>
    <p>
      But what sets this apart from a one-off event series is the <strong>meetup-in-a-box kit</strong>—everything a host needs in one package: run-of-show, slide deck, live-demo script, swag templates, and a photo checklist. Make it easy enough that a motivated developer in Bangalore or Berlin can run a Cafe Cognition with no coordination overhead.
    </p>
    <p>
      Pilot in SF and NYC first. Measure repeat attendance, builds shipped, and host satisfaction, not just headcount.
    </p>
    <ProseWaxFigure caption="The meetup-in-a-box kit">
      <ul>
        <li>
          <strong>Run-of-show template</strong>: minute-by-minute schedule that works for 15 or 50 people
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
          <strong>Photo checklist</strong>: the 5 shots that make great social proof
        </li>
        <li>
          <strong>Host leaderboard</strong>: recognition and perks that turn great organizers into a flywheel
        </li>
      </ul>
    </ProseWaxFigure>
    <h3>Days 60–90: The Roasters' Guild, the ambassador program</h3>
    <p>
      The curriculum creates practitioners. The meetups create local energy. The ambassador program turns the most active members into a lasting multiplier.
    </p>
    <p>Three tiers, each with clear expectations and rewards:</p>
    <ul>
      <li>
        <strong>Contributor</strong>: entry tier. Share builds publicly, host a first event, get early access to features and beta programs.
      </li>
      <li>
        <strong>Advocate</strong>: consistent organizers and content creators. Co-branded workshops, swag drops, and a direct line to the DevRel team.
      </li>
      <li>
        <strong>Champion</strong>: regional leaders. A product-feedback seat at the table, flagship event budget, and recognition that matters on a resume.
      </li>
    </ul>
    <p>
      The key piece is the feedback loop: a weekly Devin Office Hours where ambassadors surface real problems users hit, which feeds into community playbooks and back to the product team. This isn't a megaphone. It's a two-way channel.
    </p>
    <h2>Why me</h2>
    <p>
      I've done this before, at a smaller scale, from scratch, with no budget.
    </p>
    <p>
      I founded the Muslim Tech Collaborative at UC Berkeley and scaled it from one campus club to 30+ university chapters and 4 city hubs across a three-tier model in 18 months. That meant building the same infrastructure this plan describes: a chapter-in-a-box playbook, tiered leadership, and a national coordination layer that let local leaders run independently while staying aligned.
    </p>
    <p>
      I TA'd Berkeley's CS 61B (Data Structures) alongside 90 course staff, teaching 1,800 students. That's where I learned to build educational systems that scale: clear progression, hands-on labs, peer mentorship, and a culture where the best students become the next generation of teachers.
    </p>
    <p>
      I'm a top-200 global Devin power user on the Max plan. I build communities about developer tools, and I use those tools deeply enough to know what's worth teaching and where the documentation falls short.
    </p>
    <p>
      And I built this entire site (the one you're reading) with Devin. Multiple parallel sessions, a shared design system, collision-free workstreams. The medium is the message.
    </p>
    <ProsePullQuote>
      I'd rather build the strategy than just pitch it. That's what this site is.
    </ProsePullQuote>
    <h2>Let's talk</h2>
    <p>
      This isn't a manifesto. It's a working plan, and an open invitation to compare notes.
    </p>
    <p>
      The programs are sequenced. The proof points are real. The community playbook is battle-tested. And the first deliverable (this site, built with the product it's about) already exists.
    </p>
    <p>
      If any of this resonates, I'd love to walk through the details:{" "}
      <a href="/#menu">the full menu</a>,{" "}
      <a href="/blog/cafe-cursor-to-cafe-cognition/">
        the playbook behind Cafe Cognition
      </a>
      , or <a href="/blog/devin-beyond-code/">how Devin reaches beyond code</a>.
    </p>
    <p>
      Let's brew something. <a href="/about#contact">Get in touch</a>.
    </p>
  </>
)

export default Content
