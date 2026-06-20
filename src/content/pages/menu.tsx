import React, { type FC } from "react"
import { ProseWaxFigure } from "@/components/prose/ProseWaxFigure"

export const frontmatter = {
  title: "The Menu",
  description:
    "A developer-community strategy for Devin, served three ways, plus the experience behind it.",
  eyebrow: "The Menu",
}

const Content: FC = () => (
  <>
    <p>
      Three programs, sequenced to build on each other: a curriculum that creates competence, a meetup network that creates belonging, and an ambassador program that creates reach. Each is framed as a coffee roast, but the substance is concrete and executable.
    </p>

    <h2>01 — The House Roast</h2>

    <p>
      <strong>Devin Mastery Curriculum &amp; Certification.</strong> Turn curious developers into certified Devin orchestrators.
    </p>

    <p>
      Devin University exists, but there's no structured path and no credential. The House Roast is a three-track curriculum with hands-on labs, community-contributed playbooks, and earnable certification badges.
    </p>

    <ul>
      <li>
        <strong>Devin 101</strong> — the first agent workflow, the orchestrator mindset, PR review basics.
      </li>
      <li>
        <strong>Advanced Workflows</strong> — multi-repo orchestration, fleets of Devins, MCP, automations, playbooks.
      </li>
      <li>
        <strong>Devin for Teams</strong> — rollout patterns, knowledge onboarding, enterprise governance.
      </li>
      <li>
        <strong>Certification</strong> — earnable, verifiable badges. Developers love credentials.
      </li>
    </ul>

    <ProseWaxFigure caption="The proof behind the roast">
      TA'd Berkeley CS 61B — 1,800 students, 90 course staff — and ran weekly MTC leadership lectures across 30+ campuses. Teaching systems that scale are the whole point.
    </ProseWaxFigure>

    <h2>02 — Single-Origin Series</h2>

    <p>
      <strong>Cafe Cognition, a global meetup network.</strong> A sustained local-chapter network, not just one-off pop-ups.
    </p>

    <p>
      Cursor runs 700+ events across 200+ cities. Cognition has a Luma calendar and a Discord, but no repeatable local-chapter engine. Single-Origin closes that gap with a meetup-in-a-box kit.
    </p>

    <ul>
      <li>
        <strong>Cafe Cognition</strong> — take over a cafe for a day. Coffee, credits, and builders.
      </li>
      <li>
        <strong>Devin Days</strong> — quarterly flagship hack days in tech hubs.
      </li>
      <li>
        <strong>Meetup-in-a-box</strong> — decks, demo scripts, swag templates, and a run-of-show in one kit.
      </li>
      <li>
        <strong>Host leaderboard</strong> — recognition and perks that turn hosts into a flywheel.
      </li>
    </ul>

    <ProseWaxFigure caption="The proof behind the roast">
      Scaled MTC from one Berkeley club to 30+ university chapters and 4 city hubs in 18 months, on the exact chapter-network motion this program needs.
    </ProseWaxFigure>

    <h2>03 — The Roasters' Guild</h2>

    <p>
      <strong>Devin Ambassador Program.</strong> Turn the top power users into an evangelist flywheel.
    </p>

    <p>
      Today the ambassador program is a Google Form. The Roasters' Guild is a three-tier program with a portal, recognition, and a weekly feedback loop straight back to the product team.
    </p>

    <ul>
      <li>
        <strong>Contributor</strong> — entry tier: share builds, host first events, early access.
      </li>
      <li>
        <strong>Advocate</strong> — consistent organizers and creators: co-branded workshops and swag.
      </li>
      <li>
        <strong>Champion</strong> — regional leaders: a product-feedback seat and flagship event budget.
      </li>
      <li>
        <strong>Feedback loop</strong> — weekly Devin Office Hours feeding community playbooks and the product team.
      </li>
    </ul>

    <h2>Experience</h2>

    <ul>
      <li>
        <strong>Keysight Technologies</strong> — Growth Insights / GTM Engineer (Dec 2025 – present). AI-native GTM driving partnerships and lead-gen across 6+ verticals; a main operator for internal AI tooling.
      </li>
      <li>
        <strong>Bloom</strong> — Co-founder &amp; CEO (Feb – Apr 2025). AI conference matchmaking; idea to live product in 6 days, first paying customer in 4, ran live for 550+ attendees.
      </li>
      <li>
        <strong>Muslim Tech Collaborative</strong> — Founder &amp; National Lead (2023 – present). One Berkeley club to 30+ chapters and 4 city hubs on a three-tier model.
      </li>
      <li>
        <strong>UC Berkeley</strong> — B.S. Computer Science, CS 61B TA (Grad. Dec 2024). Taught Data Structures to 1,800 students alongside 90 staff.
      </li>
      <li>
        <strong>Five9</strong> — Product Security Intern (2023). Product security on contact-center infrastructure.
      </li>
    </ul>
  </>
)

export default Content
