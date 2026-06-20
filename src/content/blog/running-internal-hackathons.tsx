import type { FC } from "react"
import { ProsePullQuote } from "@/components/mdx/ProsePullQuote"

export const frontmatter = {
  title: "How to run an internal hackathon that actually goes somewhere",
  description:
    "Most corporate hackathons produce a weekend of energy and a graveyard of demos. The ones that stick do boring work up front, and even more boring work after the demos. This guide is that work.",
  date: "2026-06-11",
  category: "Field Notes",
  order: 5,
  draft: false,
}

const Content: FC = () => (
  <>
    <p>
      Most corporate hackathons produce a weekend of energy and a graveyard of demos. The ones that stick spend organizer time on two boring things: clarity before, and a funded path after. Here is that work.
    </p>
    <h2>1. The honest baseline</h2>
    <p>
      Run well, you get ideas, cross-team trust, and hands-on time with new tools. Run poorly, you burn goodwill and leadership writes off hackathons for years.
    </p>
    <p>
      The research is blunt (<a href="https://doi.org/10.1109/TSE.2018.2862550">Nolte et al., IEEE 2020</a>;{" "}
      <a href="https://doi.org/10.1007/s10606-021-09408-9">Pe-Than et al., CSCW 2022</a>). About 35% of projects show any follow-up activity. About 5% are still alive five months later. The bottleneck is rarely the weekend. It is the planning before and the follow-through after.
    </p>
    <p>
      The hackathon is the cheap part. The expensive part is the funded path that turns good demos into tools people use.
    </p>
    <ProsePullQuote cite="Benjamin Levick, Head of Internal AI, Ramp">
      Most companies wait for an executive mandate and formal funding before starting. We had conceptual support and a culture where people could lend their time freely. That was enough.
    </ProsePullQuote>
    <h2>2. Pick one falsifiable goal</h2>
    <p>
      Decide why you are running this before you pick a date or theme. That choice shapes who is invited, how long it runs, and what gets judged.
    </p>
    <p>
      An event that tries to be an innovation engine, a recruiting stunt, and a marketing moment usually fails at all of them. Pick the primary goal; treat the rest as side benefits.
    </p>
    <blockquote>
      <p>
        <strong>Make it falsifiable</strong>
      </p>
      <p>
        Write the goal so you could be wrong. "Increase engagement" is not measurable. "At least 60% of the org participates, and three projects enter a real backlog within 30 days" is. Without a number, sponsors cannot tell if it worked.
      </p>
    </blockquote>
    <h2>3. What you're really moving: skill, not output</h2>
    <p>
      For AI hackathons, the output that lasts is not the demo deck. It is people climbing a capability curve, and the payoff shows up months later.
    </p>
    <table>
      <thead>
        <tr>
          <th>Level</th>
          <th>Name</th>
          <th>What it looks like</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>L0</td>
          <td>Occasional chat user</td>
          <td>Pastes the odd question into a chatbot. No workflow has changed.</td>
        </tr>
        <tr>
          <td>L1</td>
          <td>Dabbler</td>
          <td>
            Has tried a custom GPT or coding agent. Sees the possibility, hasn't made it repeatable.
          </td>
        </tr>
        <tr>
          <td>L2</td>
          <td>Workflow automator</td>
          <td>
            Built an app or agent that automates part of their own job, with a real trigger and a human checkpoint.
          </td>
        </tr>
        <tr>
          <td>L3</td>
          <td>Systems builder</td>
          <td>Builds the connectors and templates that raise everyone else's ceiling.</td>
        </tr>
      </tbody>
    </table>
    <p>
      Design for moving the broad middle from L1 to L2: one person, one repeatable workflow. Expect only 10-20% of the org to build agents themselves. Everyone else wins when they can install what builders ship.
    </p>
    <h2>4. Format and duration</h2>
    <p>
      Most corporate teams land on about 48 hours across three calendar days: kick off Wednesday afternoon, checkpoint mid-week, present and judge on day three. Cap demos at ten minutes; short slots force clarity. Plan on 30-40 days to organize.
    </p>
    <p>
      One caution: programs that glorify sleep deprivation get a loud weekend and a narrow crowd. If you want non-engineers and caregivers in the room, skip the overnight.
    </p>
    <h2>5. The 5% problem: life after the demo</h2>
    <p>
      Most playbooks stop at the awards slide. Inboxes refill, and within a quarter the projects are dead. Treat follow-through as a system, not a hope. Capture demos and the contact list before the weekend ends. Define how a promising build earns a sponsor and a backlog slot. Publish reusable workflows so one person's weekend build becomes someone else's Tuesday install. Check in at 30, 60, and 90 days.
    </p>
    <ProsePullQuote cite="operating pattern behind programs that keep hackathon output alive">
      Build from the center, drive from the spokes.
    </ProsePullQuote>
    <p>
      A small central team owns the platform, connectors, and training. Functional teams build on top and send requirements back. Projects ride shared rails instead of dying as one-offs.
    </p>
    <h2>6. How these go wrong</h2>
    <ul>
      <li>Themes stay vague, or stakeholders bolt on requirements the week before.</li>
      <li>No mentors, so non-technical teams stall on setup while engineers race ahead.</li>
      <li>No afterlife: winners announced, then silence.</li>
      <li>Built for coders only, so the largest pool of pain never shows up.</li>
      <li>Access never lands, so the demo only ever ran on someone's laptop.</li>
    </ul>
    <h2>7. How the best programs do it</h2>
    <p>
      <strong>Microsoft's Global Hackathon</strong> grew from a 2014 culture experiment into the largest private hackathon reported: open to all employees, with work allowed before and after the weekend. Leadership treats it as a way of working, not an annual party.
    </p>
    <p>
      <strong>
        <a href="https://engineering.ramp.com/">Ramp</a>
      </strong>{" "}
      is the more copyable AI case. It started with one part-time PM, little budget, and a culture where people could lend time without a mandate.
    </p>
    <table>
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Active on AI tools</td>
          <td>99.5% of the team</td>
        </tr>
        <tr>
          <td>Internal apps shipped in six weeks</td>
          <td>1,500+</td>
        </tr>
        <tr>
          <td>Non-engineers in one hackathon</td>
          <td>700, coached by ~100 engineers</td>
        </tr>
      </tbody>
    </table>
    <p>
      The lesson that holds at any scale: investment followed results at Ramp, not the reverse. Start before the perfect budget, make L1 frictionless, and plan to replace your tools every few months. Problems stay; vendors and models churn.
    </p>
    <h2>8. A starting checklist</h2>
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
