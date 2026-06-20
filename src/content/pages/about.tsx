import React, { type FC } from "react"
import { ProsePullQuote } from "@/components/prose/ProsePullQuote"
import { SOCIALS } from "@/data/experience"

export const frontmatter = {
  title: "Ali Khani",
  description: "Community builder, AI-native GTM engineer, top-200 Devin power user.",
  eyebrow: "About",
}

const Content: FC = () => (
  <>
    <p>
      Community builder and AI-native GTM engineer in the Bay Area. Scaled a tech nonprofit from one Berkeley club to 30+ chapters. Top-200 Devin power user. Built this site with Devin to show what a Devin community could be.
    </p>

    <ProsePullQuote>
      Devin gives engineers superpowers. I build the community that teaches the world how to use them.
    </ProsePullQuote>

    <h2>What I do</h2>

    <h3>Build</h3>

    <p>
      Top-200 Devin power user. Ship open-source agent harnesses and internal AI tooling at Keysight. This site was orchestrated with Devin across parallel sessions.
    </p>

    <h3>Teach</h3>

    <p>
      TA'd Berkeley CS 61B (1,800 students, 90 staff). Ran weekly leadership lectures across the MTC chapter network. Wrote Quora answers reaching 7M+ views.
    </p>

    <h3>Connect</h3>

    <p>
      Founded the Muslim Tech Collaborative and scaled it to 30+ chapters and 4 city hubs on a three-tier model.
    </p>

    <h2>Why Cognition</h2>

    <ul>
      <li>Early in community — the greenfield I do best in.</li>
      <li>Cursor leads on events; I bring a sustained chapter network they lack.</li>
      <li>Power user first, community builder second. Credibility plus reach.</li>
    </ul>

    <h2>Let's talk</h2>

    <p>
      The fastest way to reach me is email:{" "}
      <a href="mailto:byalikhani@gmail.com">byalikhani@gmail.com</a>. I'm also on{" "}
      {SOCIALS.map((s, i) => (
        <React.Fragment key={s.href}>
          {i > 0 && (i === SOCIALS.length - 1 ? ", and " : ", ")}
          <a href={s.href}>{s.label}</a>
        </React.Fragment>
      ))}.
    </p>
  </>
)

export default Content
