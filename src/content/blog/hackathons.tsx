import React, { type FC } from "react"
import { ProsePullQuote } from "@/components/prose/ProsePullQuote"

export const frontmatter = {
  title: "Great internal hackathons",
  description:
    "A rough manual on how to break the pattern of forgettable corporate hackathons and host winning ones, from running internal hackathons at Keysight.",
  date: "2026-06-28",
  category: "Field Notes",
  order: 5,
  draft: false,
}

const Content: FC = () => (
  <>
    <p>
      Most corporate hackathons produce a graveyard of demos that don't stick. Having run several internal hackathons for both engineering and GTM teams in my current company, Keysight, I've put together a rough manual on how to break that pattern and host winning hackathons.
    </p>
    <h2>The baseline</h2>
    <p>
      An internal hackathon, run well, brings you ideas, cross-team trust, and hands-on time with new tools. Run poorly, you burn a week of goodwill with leadership.
    </p>
    <p>
      Only a minority of hackathons start with a defined objective and a way to measure it. The bottleneck isn't the weekend itself, but rather the planning before and the follow-through afterwards.
    </p>
    <h2>Scoping around a goal</h2>
    <p>
      Tech Twitter's latest craze is around loops and <code>/goals</code>.
    </p>
    <p>
      To scope your event, decide why you're running this before you pick a date, time, or venue. From there, you can figure out who's invited, how long it runs, what gets judged, and how you'll know it served its purpose.
    </p>
    <p>
      You might want product ideas, higher engagement, fewer data silos, hands-on time with a new tool, hidden talent surfaced, new or improved internal tooling, or a signal for experimentation. Narrowing down is the hard part.
    </p>
    <h3>Make it falsifiable</h3>
    <p>
      It helps to use Charlie Munger's inversion principle when choosing a goal.
    </p>
    <p>
      Write the goal so you could be wrong.
    </p>
    <p>
      You can have an event that's an innovation engine, a recruiting stunt, a team offsite, or a marketing moment. It can't be all four. Pick one, have one or two others be side benefits, and design around your primary outcome.
    </p>
    <p>
      Saying your goal with the hackathon is to "increase engagement" is not measurable, but something like "At least 60% of the org participates, and three projects enter a real backlog within 30 days"
    </p>
    <blockquote>
      <p>is more viable to work with.</p>
    </blockquote>
    <h2>What you're really moving: skill, not output</h2>
    <p>
      Post-2023, AI and automation hackathons have unlocked non-technical teammates' ability to compete more seriously.
    </p>
    <p>
      The real output of internal hackathons can be measured by people's ability to climb a capability curve. The payoff shows up months later when more people can clear the next step easily.
    </p>
    <p>
      I like Ramp's model for how they describe the tiers of their internal adoption. It goes something like this:
    </p>
    <ul>
      <li><code>L0</code> - Occasional chat user: Pastes the odd question into ChatGPT. No workflow has actually changed.</li>
      <li><code>L1</code> - Dabbler: Has tried custom GPTs, assistants, or a coding agent. Sees the possibility but hasn't compounded it into anything repeatable.</li>
      <li><code>L2</code> - Workflow automator: Has built an app, script, or agent that automates part of their own job with a real trigger, input, and human checkpoint.</li>
      <li><code>L3</code> - Systems builder: Builds the connectors, skills, and templates that raise everyone else's ceiling. A force multiplier, not just personally productive.</li>
    </ul>
    <p>
      With an internal hackathon, design for moving the broad middle from <code>L1</code> to <code>L2</code>: one person, one repeatable workflow.
    </p>
    <p>
      Don't optimize the weekend to try and mint a few <code>L3</code> platform builders.
    </p>
    <ProsePullQuote>
      Compounding wins arise when you enable the rest of the team to install what builders ship in your hackathon. The more people you enable to build, the more you enable them to ship.
    </ProsePullQuote>
    <h2>Timeline, roles, and access</h2>
    <p>
      End-to-end, a single hackathon typically takes 30-40 days to organize.
    </p>
    <p>
      Responsibilities break down into three categories:
    </p>
    <ul>
      <li>Secure sponsorship</li>
      <li>Lock in logistics</li>
      <li>Promote, promote, promote</li>
    </ul>
    <p>
      Starting off, it helps to start small: one team or org. Loop in IT, HR, Legal, and Comms early on to help amplify your abilities.
    </p>
    <p>
      Ownership is critical, too!
    </p>
    <p>
      Name a single owner for communications, and explicit owners for registration, mentoring, judging, prizes, logistics, and infrastructure. Diffuse ownership is how details will fall through otherwise.
    </p>
    <p>
      There's also another landmine in enterprise to watch out for:
    </p>
    <p>
      Access.
    </p>
    <p>
      In a governed company, live demos will usually die on access rather than on code. It can take weeks to get SSO app registration, data permissions, and model licensing cleared. The depth of your hackathon improves greatly when demos are built on approved data rather than a hand-exported CSV file.
    </p>
    <h2>Format and duration</h2>
    <p>
      There's no one-size-fits-all for every org. Adjust the length and shape of your event to the goal and who you need in the room.
    </p>
    <p>
      Some common formats:
    </p>
    <ul>
      <li><strong>Classic sprint:</strong> 24-48 hours of high energy and focus. Tradeoff: all-nighter culture excludes parents, caregivers, and anyone who does better work rested.</li>
      <li><strong>Hack week:</strong> 5 days, 9-5 (or 9-9 if you prefer). More inclusive, less burnout, deeper builds. Tradeoff: competes with the day job.</li>
      <li><strong>Company-wide:</strong> 1-2 days. There's less disruption across sites if everyone's focused on this. Tradeoff: you get less depth per project.</li>
      <li><strong>Virtual/hybrid:</strong> Flexible dates means you can reach distributed teams. Tradeoff: you need deliberate pacing and async tooling, or the energy flatlines.</li>
    </ul>
    <p>
      The sweet spot is typically 48 hours across three calendar days.
    </p>
    <p>
      For example: kick off Wednesday afternoon, checkpoint on Thursday, and present and judge on Friday afternoon.
    </p>
    <p>
      Cap demos at 5-10 minutes (if including presentation slides) plus a few minutes for questions. Shorter slots force clarity on what's being communicated.
    </p>
    <p>
      Also note: Programs that still glorify sleep deprivation get a loud weekend but a narrow crowd. If you want broad participation for your hackathon, do not require overnight work.
    </p>
    <h2>Themes and problem statements</h2>
    <p>
      A workable theme will name a real pain, is tight enough to focus the room, and still leaves room for solutions that you didn't predict.
    </p>
    <p>
      "Innovate!" sounds great... but it's too vague.
    </p>
    <p>
      So, not great.
    </p>
    <p>
      A pre-written spec is too tight.
    </p>
    <p>
      Also not great.
    </p>
    <p>
      Frame challenges as business problems over technical homework. "Build a RAG pipeline" will pull in an army of engineers, but engineers are rarely where the unresolved pain lives. "Cut prep time before a customer meeting" will pull in finance, ops, support, and marketing alongside engineering.
    </p>
    <p>
      AI hackathons, in particular, should bias towards internal tooling and knowledge-worker friction. This could be repetitive lookups, manual reports, or meeting notes that nobody trusts. Aim to unlock territories less crowded than R&D demos and attract sharp non-engineering demos that show where the next themes should come from.
    </p>
    <p>
      You can run open "build anything" tracks alongside themed tracks (where it's easier to judge and follow-up) to kick off. In mature programs, two themed challenges + a wildcard category is a winning formula.
    </p>
    <h2>Team formation: the curious &amp; the capable</h2>
    <p>
      Mixed functions beat monoculture.
    </p>
    <p>
      Teams that can blend engineering with product, ops, marketing, or finance tend to ship more useful work than all-engineer or all-PM groups.
    </p>
    <p>
      At least one person should care about the problem domain so the result is useful, not just clever.
    </p>
    <p>
      For AI hackathons, assign coaches/mentors explicitly.
    </p>
    <p>
      Pair non-technical builders with a smaller set of AI-fluent engineers who will unblock rather than take over the keyboard. Your mentors are there to help a peer reach "shipped" instead of stalling on setup.
    </p>
    <p>
      In practice, you can go run a skill-matching channel for folks without teams. The consensus sweet spot for team sizes is 3-4 people. Smaller teams typically lack bandwidth; larger ones spend time coordinating rather than building.
    </p>
    <p>
      For first events, also consider seeding a few cross-functional teams so others can see the pattern you want.
    </p>
    <h2>Running the days</h2>
    <p>
      Over-communicate, then communicate again.
    </p>
    <ProsePullQuote>
      A message needs to be said seven times before it lands.
    </ProsePullQuote>
    <p>
      State the goal when you announce the event, restate it at kickoff, and post it where people are working.
    </p>
    <p>
      The most common day-one surprise is discovering that your hackers have no idea what the hackathon is actually for.
    </p>
    <p>
      Manage the rest of the business in advance, too!
    </p>
    <p>
      The first reaction from other leaders is, "So all development stops for three days?"
    </p>
    <p>
      Email them early explaining what the event is, why it matters, and which requests (i.e., genuine emergencies) still get attention vs. which wait (everything else). Get their buy-in before the event, not during it.
    </p>
    <p>
      A few other tips:
    </p>
    <ul>
      <li>Run a pre-event idea session a week or two ahead so people block time and arrive with a sketch.</li>
      <li>Hold a midway check-in during the hackathon so mentors can catch teams that wandered while there's still time.</li>
      <li>Schedule breaks, feed people well, and set a clear end time. Breaks work better as milestones than as guilt.</li>
      <li>Keep swag modest! Stickers beat custom tees for a first run.</li>
      <li>Don't let logistics eat up the week. :)</li>
    </ul>
    <h2>Judging and prizes</h2>
    <p>
      Publish judging criteria before teams start.
    </p>
    <p>
      Opaque scoring is the fastest way to lose trust.
    </p>
    <p>
      Typical dimensions:
    </p>
    <ul>
      <li>Innovation</li>
      <li>Feasibility</li>
      <li>Impact</li>
      <li>Execution</li>
      <li>Fit to theme</li>
    </ul>
    <p>
      Adding in several small categories, e.g. "most valuable to customers" and "most valuable to employees", can also help spread recognition and cut the winner-takes-all resentment.
    </p>
    <p>
      For AI hackathons, score whether the build changed real work and if someone else can reuse it.
    </p>
    <p>
      Ask what existed before the event versus what was built during it, especially when teams extend internal projects.
    </p>
    <p>
      For choosing judges, mix in senior leaders, domain experts, and peers as judges, and send out the rubric early.
    </p>
    <p>
      Prizes, too, should matter without overshadowing the work. Time with leadership or a conference ticket travels well. So does good hardware. (Few truly know that the difference between a good keyboard and a great one can be life-changing.)
    </p>
    <p>
      The real prize that people remember, though, is rarer: budget and a roadmap slot to keep building.
    </p>
    <h2>The 5% problem: life after the demo</h2>
    <p>
      Most hackathons' demos will die after that Awards slide.
    </p>
    <p>
      Winners will be announced, inboxes will refill, and within a quarter most of your entire projects lineup is dead. About 5% of them, at best, will last more than five months.
    </p>
    <p>
      Treat continuation as a system you design:
    </p>
    <ul>
      <li>Record demos, write up projects, and keep the contact list ASAP.</li>
      <li>Define how a promising build gets a sponsor, some engineering help, and a real slot in the backlog.</li>
      <li>Publish reusable workflows in a shared library.</li>
      <li>Schedule 30-, 60-, and 90-day check-ins so blockers surface while you can still help.</li>
    </ul>
    <h2>Measure what worked</h2>
    <p>
      There's three types of indicators:
    </p>
    <ul>
      <li><strong>Leading</strong> - Participation rate and diversity across functions; number &amp; quality of ideas; pre vs. post confidence with the tools.</li>
      <li><strong>Lagging</strong> - Projects that continue and ship; documented time saved or cost avoided; participant retention; movement on capability ladder (see above).</li>
      <li><strong>Qualitative</strong> - Talent surfaced; cross-silo relationships; visible appetite for experimentation.</li>
    </ul>
    <p>
      Similar to how engineering orgs track internal tooling, you can borrow these metrics too:
    </p>
    <ul>
      <li>Active usage</li>
      <li>Sessions per user</li>
      <li>Share of work that's AI-assisted</li>
      <li>Reusable skills published</li>
      <li>Adoption by others</li>
    </ul>
    <h2>How these things go wrong</h2>
    <ul>
      <li>Themes are vague.</li>
      <li>Stakeholders add requirements the week before.</li>
      <li>No mentors, so non-technical teams stall on setup while engineers race ahead.</li>
      <li>No afterlife - winners are announced and then silence.</li>
      <li>The event is built for coders only.</li>
      <li>Overnight work is treated as a virtue to shrink who can participate.</li>
      <li>Demos only run on someone's laptop.</li>
      <li>Too many goals at once.</li>
      <li>Your published challenge was never trial-built, so nobody can finish in time.</li>
    </ul>
    <h2>How these things go right</h2>
    <ul>
      <li>Leadership treats hackathons as a way of working, not an annual party.</li>
      <li>Start before the perfect budget.</li>
      <li>Raise the floor before the ceiling.</li>
      <li>Provide builders a channel, office hours, and airtime at the next all-hands.</li>
      <li>Clear, precise, well-scoped goal.</li>
      <li>Explicit owners for comms, judging, mentoring, logistics, &amp; infra.</li>
      <li>Route promising projects onto a funded roadmap path.</li>
    </ul>
    <p>
      Ball's in your court now.
    </p>
    <p>
      Hit me up on{" "}
      <a href="https://x.com/alikhvni" target="_blank" rel="noopener noreferrer">X</a>
      ,{" "}
      <a href="https://linkedin.com/in/khni" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      , or via{" "}
      <a href="mailto:byalikhani@gmail.com">email</a>
      {" "}with your learnings.
    </p>
  </>
)

export default Content
