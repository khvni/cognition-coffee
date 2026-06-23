import React, { type FC } from "react"
import { ProsePullQuote } from "@/components/prose/ProsePullQuote"

export const frontmatter = {
  title: "How to run an internal hackathon that actually goes somewhere",
  description:
    "I organized a hackathon for GTM teams and wrote up what I learned. The lessons that held up are in this guide.",
  date: "2026-06-11",
  category: "Field Notes",
  order: 5,
  draft: false,
}

const Content: FC = () => (
  <>
    <p>
      Most corporate hackathons produce a weekend of energy and a graveyard of demos. The ones that stick spend organizer time on two boring things: clarity before, and a funded path after.
    </p>
    <h2>1. The honest baseline</h2>
    <p>
      Run well, you get ideas, cross-team trust, and hands-on time with new tools. Run poorly, you burn goodwill and leadership writes off hackathons for years.
    </p>
    <p>
      The research is blunt: about 35% of projects show follow-up activity, and about 5% are alive five months later. The bottleneck is the planning before and the follow-through after, not the weekend itself.
    </p>
    <ProsePullQuote cite="Benjamin Levick, Head of Internal AI, Ramp">
      Most companies wait for an executive mandate and formal funding before starting. We had conceptual support and a culture where people could lend their time freely. That was enough.
    </ProsePullQuote>
    <h2>2. Pick one falsifiable goal</h2>
    <p>
      Decide why you're running this before you pick a date or theme. An event that tries to be an innovation engine, recruiting stunt, and marketing moment usually fails at all three.
    </p>
    <blockquote>
      <p>
        <strong>Make it falsifiable</strong>
      </p>
      <p>
        "Increase engagement" is not measurable. "At least 60% of the org participates, and three projects enter a real backlog within 30 days" is. Without a number, sponsors cannot tell if it worked.
      </p>
    </blockquote>
    <h2>3. What you're really moving: skill, not output</h2>
    <p>
      For AI hackathons, the output that lasts is people climbing a capability curve. The payoff shows up months later.
    </p>
    <p>
      Design for moving the broad middle from dabbler to workflow automator: one person, one repeatable workflow. Expect only 10-20% of the org to build agents themselves. Everyone else wins when they can install what builders ship.
    </p>
    <h2>4. Format and afterlife</h2>
    <p>
      Most teams land on 48 hours across three days: kick off, checkpoint, present. Cap demos at ten minutes. Plan 30-40 days to organize.
    </p>
    <p>
      Most playbooks stop at the awards slide. Capture demos and the contact list before the weekend ends. Define how a build earns a sponsor and a backlog slot. Publish reusable workflows so one weekend build becomes someone else's Tuesday install. Check in at 30, 60, and 90 days.
    </p>
    <ProsePullQuote cite="operating pattern behind programs that keep hackathon output alive">
      Build from the center, drive from the spokes.
    </ProsePullQuote>
    <h2>5. How these go wrong</h2>
    <ul>
      <li>Themes stay vague, or stakeholders bolt on requirements the week before.</li>
      <li>No mentors, so non-technical teams stall on setup while engineers race ahead.</li>
      <li>No afterlife: winners announced, then silence.</li>
      <li>Built for coders only, so the largest pool of pain never shows up.</li>
      <li>Access never lands, so the demo only ever ran on someone's laptop.</li>
    </ul>
    <h2>6. A starting checklist</h2>
    <ul>
      <li>
        <input type="checkbox" disabled /> Write the one primary goal as a measurable claim
      </li>
      <li>
        <input type="checkbox" disabled /> Name owners for comms, judging, mentoring, logistics, and infra
      </li>
      <li>
        <input type="checkbox" disabled /> Frame themes as business problems, and trial-run them for feasibility
      </li>
      <li>
        <input type="checkbox" disabled /> File access, SSO, and data requests early, with a manual fallback
      </li>
      <li>
        <input type="checkbox" disabled /> Open by restating the goal; checkpoint at the mid-point
      </li>
      <li>
        <input type="checkbox" disabled /> Judge on real use and reusability, not demo polish
      </li>
      <li>
        <input type="checkbox" disabled /> Capture outputs and route winners onto a funded roadmap
      </li>
    </ul>
    <p>
      <strong>Takeaway:</strong> the weekend is the visible part. Spend your effort on the parts most teams skip, and you get a company that works differently, not a fond memory.
    </p>
  </>
)

export default Content
