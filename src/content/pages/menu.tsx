import React, { type FC } from "react"
import { ProseWaxFigure } from "@/components/prose/ProseWaxFigure"
import { MenuHeading, MenuList, MenuItem } from "@/components/prose/MenuList"

export const frontmatter = {
  title: "Programs",
  description:
    "Three community programs for Devin: curriculum, meetups, and ambassadors.",
  eyebrow: "Programs",
}

const Content: FC = () => (
  <>
    <p>
      Three programs that build on each other: a curriculum that creates competence, a meetup network that creates belonging, and an ambassador program that creates reach.
    </p>

    <MenuHeading index="01">Devin Mastery Curriculum</MenuHeading>

    <p>
      <strong>Turn curious developers into certified Devin orchestrators.</strong> A three-track curriculum with hands-on labs, community playbooks, and earnable certification badges.
    </p>

    <MenuList>
      <MenuItem name="Devin 101">the first agent workflow, the orchestrator mindset, PR review basics.</MenuItem>
      <MenuItem name="Advanced Workflows">multi-repo orchestration, fleets of Devins, MCP, automations, playbooks.</MenuItem>
      <MenuItem name="Devin for Teams">rollout patterns, knowledge onboarding, enterprise governance.</MenuItem>
      <MenuItem name="Certification">earnable, verifiable badges. Developers love credentials.</MenuItem>
    </MenuList>

    <ProseWaxFigure caption="Proof">
      TA'd Berkeley CS 61B (1,800 students, 90 staff) and ran weekly MTC leadership lectures across 30+ campuses.
    </ProseWaxFigure>

    <MenuHeading index="02">Cafe Cognition Meetups</MenuHeading>

    <p>
      <strong>A global meetup network, not one-off pop-ups.</strong> A repeatable local-chapter engine with a meetup-in-a-box kit.
    </p>

    <MenuList>
      <MenuItem name="Cafe Cognition">take over a cafe for a day. Coffee, credits, and builders.</MenuItem>
      <MenuItem name="Devin Days">quarterly flagship hack days in tech hubs.</MenuItem>
      <MenuItem name="Meetup-in-a-box">decks, demo scripts, swag templates, and a run-of-show in one kit.</MenuItem>
      <MenuItem name="Host leaderboard">recognition and perks that turn hosts into a flywheel.</MenuItem>
    </MenuList>

    <ProseWaxFigure caption="Proof">
      Scaled MTC from one Berkeley club to 30+ chapters and 4 city hubs in 18 months.
    </ProseWaxFigure>

    <MenuHeading index="03">Devin Ambassadors</MenuHeading>

    <p>
      <strong>Turn top power users into an evangelist flywheel.</strong> A three-tier program with a portal, recognition, and a weekly feedback loop to the product team.
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
