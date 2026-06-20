import React, { type FC } from "react"
import { ProsePullQuote } from "@/components/prose/ProsePullQuote"
import { SOCIALS } from "@/data/experience"

export const frontmatter = {
  title: "Ali Khani",
  description:
    "Community builder and AI-native GTM engineer. Top-200 global Devin power user.",
  eyebrow: "About",
}

const Content: FC = () => (
  <>
    <p>
      I'm a community builder and AI-native GTM engineer based in the San Francisco Bay Area. I scaled a national tech nonprofit from one Berkeley club to 30+ chapters, and I'm a top-200 global Devin power user. I built this site with Devin to show, not tell, what a community for Devin could be.
    </p>

    <ProsePullQuote>
      Devin gives engineers superpowers. I build the community that teaches the world how to use them.
    </ProsePullQuote>

    <h2>What I do</h2>

    <p>
      I build the connective tissue around developer tools: the curriculum that creates competence, the chapters that create belonging, and the programs that turn power users into a flywheel. My background sits at the intersection of three things.
    </p>

    <h3>Build</h3>

    <p>
      I ship with agents. I'm a top-200 global Devin power user, I build open-source agent harnesses, and I ship internal AI tooling at Keysight. This whole site was orchestrated with Devin across multiple parallel sessions on a shared design system.
    </p>

    <h3>Teach</h3>

    <p>
      I make hard things shippable. I TA'd Berkeley's CS 61B alongside 90 course staff, teaching 1,800 students, and ran weekly leadership lectures across the MTC chapter network. As a teen I wrote answers on Quora that reached 7M+ views. I turn complex tools into things people actually use.
    </p>

    <h3>Connect</h3>

    <p>
      I build operating systems for communities. I founded the Muslim Tech Collaborative and scaled it to 30+ university chapters and 4 city hubs on a three-tier model with a meetup-in-a-box playbook. I don't just join communities; I architect them.
    </p>

    <h2>Why Cognition</h2>

    <ul>
      <li>Cognition is early in community. That's the greenfield I do my best work in.</li>
      <li>Cursor is ahead on events; I can bring a sustained chapter network they don't have.</li>
      <li>I'm a power user first and a community builder second. Technical credibility plus reach.</li>
      <li>I'd rather build the strategy than just describe it, so I did.</li>
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
