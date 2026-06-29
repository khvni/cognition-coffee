import React, { type FC } from "react"
import { ProsePullQuote } from "@/components/prose/ProsePullQuote"
import { ProseWaxFigure } from "@/components/prose/ProseWaxFigure"

export const frontmatter = {
  title: "From Cafe Cursor to Cognition Coffee",
  description:
    "Cursor turned coffee shops into a 200-city community engine. Here's the playbook for doing it for Devin, and where a sustained chapter network beats pop-ups.",
  date: "2026-06-11",
  category: "Playbook",
  order: 2,
  draft: false,
}

const Content: FC = () => (
  <>
    <p>
      The best thing Cursor did for developer community wasn't a feature. It was a format.
    </p>
    <p>
      Cafe Cursor: take over a coffee shop for a day, bring credits and stickers, invite local builders, and let them work. No pitch. They've done it in over 200 cities, with events on Luma and ambassadors posting warm, candid photos that make you wish you'd been there.
    </p>
    <p>
      It's genuinely impressive. And it's exactly the model Cognition should study, adapt, and then surpass.
    </p>
    <p>
      But pop-ups are sparks. Some catch, most fade until someone decides to run the next one. A pop-up is a point on a timeline. A chapter is a line.
    </p>
    <h2>What Cursor got right</h2>
    <p>
      <strong>The venue matters.</strong> A cafe signals craft, not lead-gen.
    </p>
    <p>
      <strong>Low friction wins.</strong> No fees, no gates. Show up, build, leave.
    </p>
    <p>
      <strong>Social proof compounds.</strong> The tweet wall does more for adoption than any product demo.
    </p>
    <ProsePullQuote>
      The tweet wall makes the tool feel like something a community owns, not something a company sells.
    </ProsePullQuote>
    <h2>Where pop-ups hit a ceiling</h2>
    <p>
      When Cursor runs a Cafe Cursor in Austin, it's great for the people who attend. But no one in Austin owns the Cursor community. The next month, someone has to decide to do it again.
    </p>
    <p>
      I learned this the hard way. When I founded the Muslim Tech Collaborative at UC Berkeley, the first thing we did was run events. They went well, and then the semester ended and we had to rebuild momentum from scratch.
    </p>
    <p>
      The breakthrough was a chapter model: local leaders, a shared playbook, and city autonomy. One Berkeley club became 30+ university chapters and 4 city hubs in 18 months.
    </p>
    <h2>The Cognition Coffee playbook</h2>
    <p>
      Combine Cafe Cursor's warmth with MTC's chapter structure.
    </p>
    <p>
      Every host gets a <strong>meetup-in-a-box kit</strong>: run-of-show, slide deck, live-demo script, swag files, and a photo checklist. The leaderboard tracks events, reach, and feedback, turning great hosts into repeat hosts.
    </p>
    <ProseWaxFigure caption="The three-tier chapter model">
      <p>
        Local hosts run events using the kit. Regional champions coordinate hosts and carry feedback to the product team. DevRel maintains the brand, kit, and leaderboard. Distributed ownership lets a small central team scale globally.
      </p>
    </ProseWaxFigure>
    <h2>Metrics that matter</h2>
    <p>
      Don't count total attendees. Count active chapters, repeat hosts, builds shipped, and organic events run without HQ coordination.
    </p>
    <ProsePullQuote>
      The number that matters most is how many hosts run a second event.
    </ProsePullQuote>
    <p>
      If those numbers keep rising without the central team pushing, the engine is working.
    </p>
    <hr />
    <p>
      Read next:{" "}
      <a href="/blog/brewing-community/#days-6090-recruitment--the-ambassador-program">
        Recruitment
      </a>
      ,{" "}
      <a href="/blog/brewing-community/#days-030-the-house-roast--curriculum-and-certification">
        the curriculum
      </a>
      , or the full{" "}
      <a href="/blog/brewing-community/">90-day plan</a>.{" "}
      <a href="/about#contact">Let's talk</a>.
    </p>
  </>
)

export default Content
