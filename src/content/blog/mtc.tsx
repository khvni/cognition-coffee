import React, { type FC } from "react"

export const frontmatter = {
  title: "Scaling MTC to 30+ university chapters",
  description: "Three years building MTC, from 8 people at Berkeley to 30+ university chapters.",
  date: "2026-06-26",
  category: "Community",
  order: 0,
  draft: false,
}

const Content: FC = () => (
  <>
    <p>
      I started MTC in spring 2023 at UC Berkeley. One club, eight people. Three years later. 30+
      university chapters, city hubs in the Bay Area, Seattle, Houston, Atlanta, and New York, and a
      community Slack with 100+ organic members.
    </p>
    <p>We didn't start with a mission statement. We built something.</p>
    <p>
      People don't join organizations because of a vision. They join because there's something to do.
      The mission is a lagging indicator.
    </p>
    <p>
      The best event we ran at Berkeley was a career fair at Hearst Mining Building, Berkeley
      Engineering's largest venue. We filled it with companies and students and it felt like a real
      conference. Venue matters. Book the flagship building and companies show up, students dress
      differently, the energy shifts.
    </p>
    <p>
      We also ran fireside chats: 30 minutes of conversation, 15 of Q&A, food after. No slides. Just
      a founder talking about what they actually did. We ran technical workshops too, usually
      someone a few years out teaching something students couldn't ask in a 300-person lecture.
    </p>
    <p>
      This year we helped organize{" "}
      <a href="https://mtchacks.com" target="_blank" rel="noopener noreferrer">
        mtchacks.com
      </a>{" "}
      at UIUC, a full-production hackathon with embroidered hoodies, sponsor t-shirts, and a full
      weekend of logistics.
    </p>
    <p>
      Our Projects division went through a full overhaul when AI coding tools got good. The old model
      was five or six students, one semester, writing software by hand, lots of meetings, modest
      output. Now it's 1-3 student devs paired with a technical mentor from industry who acts as an
      external PM: they check in once a week, set the tech stack, define the product requirements, and
      translate those into concrete technical requirements for the students to execute. The students
      build using Cursor, Claude Code, Antigravity, and Codex. A team that used to take a semester to
      ship something ships in six weeks. The student gets real project experience and a direct
      reference from someone already in the industry.
    </p>
    <p>
      MTC Youth started as Python workshops at a community center. Then in April 2025 I ran a vibe
      coding session with about 20 middle schoolers using Replit. Within 20 minutes they built a 3D
      Minecraft clone, Flappy Bird with Steve Harvey's face, and a cat-themed Pomodoro timer. I{" "}
      <a
        href="https://x.com/alikhvni/status/1913328421062758720"
        target="_blank"
        rel="noopener noreferrer"
      >
        posted about it on X
      </a>
      . 18,000 views. Karpathy and Amjad from Replit both saw it. These kids weren't learning
      syntax. The AI handled the syntax. They handled the ideas.
    </p>
    <p>
      Running 30+ chapters means building the machinery so a president at NYU can run an event
      without calling me. Every chapter lead is on a centralized Slack with regional channels and a
      #chapter-presidents channel. New presidents scroll back and see how the last one handled the
      same problems.
    </p>
    <p>
      We loaded every ops doc into a NotebookLM notebook. A chapter lead types "how do I book a room
      on campus" at 11pm and gets an answer from our actual docs. We also keep a Notion database of
      every speaker any chapter has hosted, with contact info and notes on how the event went. It
      works because the data is real.
    </p>
    <p>Every quarter I run a regional sync. Each president shares what's working and what's broken.</p>
    <p>A format that worked at UC Davis showed up at UCSC the following week.</p>
    <p>
      I built MTC from one Berkeley club to 30+ chapters. I'm building Cognition Coffee to do the
      same thing for Devin.{" "}
      <a href="/blog/game-plan/">The game plan is here</a>.{" "}
      <a href="/about">Let's talk</a>.
    </p>
  </>
)

export default Content
