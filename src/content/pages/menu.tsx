import React, { type FC } from "react"
import { ProseWaxFigure } from "@/components/prose/ProseWaxFigure"
import { MenuHeading, MenuList, MenuItem } from "@/components/prose/MenuList"

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

    <MenuHeading index="01">The House Roast</MenuHeading>

    <p>
      <strong>Devin Mastery Curriculum &amp; Certification.</strong> Turn curious developers into certified Devin orchestrators.
    </p>

    <p>
      Devin University exists, but there's no structured path and no credential. The House Roast is a three-track curriculum with hands-on labs, community-contributed playbooks, and earnable certification badges.
    </p>

    <MenuList>
      <MenuItem name="Devin 101">the first agent workflow, the orchestrator mindset, PR review basics.</MenuItem>
      <MenuItem name="Advanced Workflows">multi-repo orchestration, fleets of Devins, MCP, automations, playbooks.</MenuItem>
      <MenuItem name="Devin for Teams">rollout patterns, knowledge onboarding, enterprise governance.</MenuItem>
      <MenuItem name="Certification">earnable, verifiable badges. Developers love credentials.</MenuItem>
    </MenuList>

    <ProseWaxFigure caption="The proof behind the roast">
      TA'd Berkeley CS 61B — 1,800 students, 90 course staff — and ran weekly MTC leadership lectures across 30+ campuses. Teaching systems that scale are the whole point.
    </ProseWaxFigure>

    <MenuHeading index="02">Single-Origin Series</MenuHeading>

    <p>
      <strong>Cafe Cognition, a global meetup network.</strong> A sustained local-chapter network, not just one-off pop-ups.
    </p>

    <p>
      Cursor runs 700+ events across 200+ cities. Cognition has a Luma calendar and a Discord, but no repeatable local-chapter engine. Single-Origin closes that gap with a meetup-in-a-box kit.
    </p>

    <MenuList>
      <MenuItem name="Cafe Cognition">take over a cafe for a day. Coffee, credits, and builders.</MenuItem>
      <MenuItem name="Devin Days">quarterly flagship hack days in tech hubs.</MenuItem>
      <MenuItem name="Meetup-in-a-box">decks, demo scripts, swag templates, and a run-of-show in one kit.</MenuItem>
      <MenuItem name="Host leaderboard">recognition and perks that turn hosts into a flywheel.</MenuItem>
    </MenuList>

    <ProseWaxFigure caption="The proof behind the roast">
      Scaled MTC from one Berkeley club to 30+ university chapters and 4 city hubs in 18 months, on the exact chapter-network motion this program needs.
    </ProseWaxFigure>

    <MenuHeading index="03">The Roasters' Guild</MenuHeading>

    <p>
      <strong>Devin Ambassador Program.</strong> Turn the top power users into an evangelist flywheel.
    </p>

    <p>
      Today the ambassador program is a Google Form. The Roasters' Guild is a three-tier program with a portal, recognition, and a weekly feedback loop straight back to the product team.
    </p>

    <MenuList>
      <MenuItem name="Contributor">entry tier: share builds, host first events, early access.</MenuItem>
      <MenuItem name="Advocate">consistent organizers and creators: co-branded workshops and swag.</MenuItem>
      <MenuItem name="Champion">regional leaders: a product-feedback seat and flagship event budget.</MenuItem>
      <MenuItem name="Feedback loop">weekly Devin Office Hours feeding community playbooks and the product team.</MenuItem>
    </MenuList>

    <MenuHeading>Experience</MenuHeading>

    <MenuList>
      <MenuItem name="Keysight Technologies">Growth Insights / GTM Engineer (Dec 2025 – present). AI-native GTM driving partnerships and lead-gen across 6+ verticals; a main operator for internal AI tooling.</MenuItem>
      <MenuItem name="Bloom">Co-founder &amp; CEO (Feb – Apr 2025). AI conference matchmaking; idea to live product in 6 days, first paying customer in 4, ran live for 550+ attendees.</MenuItem>
      <MenuItem name="Muslim Tech Collaborative">Founder &amp; National Lead (2023 – present). One Berkeley club to 30+ chapters and 4 city hubs on a three-tier model.</MenuItem>
      <MenuItem name="UC Berkeley">B.S. Computer Science, CS 61B TA (Grad. Dec 2024). Taught Data Structures to 1,800 students alongside 90 staff.</MenuItem>
      <MenuItem name="Five9">Product Security Intern (2023). Product security on contact-center infrastructure.</MenuItem>
    </MenuList>
  </>
)

export default Content
