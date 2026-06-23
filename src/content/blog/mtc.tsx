import React, { type FC } from "react"
import { ProsePullQuote } from "@/components/prose/ProsePullQuote"
import { ProseWaxFigure } from "@/components/prose/ProseWaxFigure"

export const frontmatter = {
  title: "MTC's 30+ college chapters",
  description:
    "Turning a small room of students into a nationwide builders network with 30+ college and city chapters.",
  date: "2026-06-23",
  category: "Community",
  order: 0,
  draft: false,
}

const Content: FC = () => (
  <>
    <p>
      In spring 2023, a few students in UC Berkeley's MSA tech committee built a website. It was for janazas.org, a service to help families notify their communities when someone passed. The work was small but it felt real. That was the start of MTC.
    </p>
    <p>
      Three years later, MTC has 30+ university chapters, city hubs in the Bay Area, Seattle, Houston, Atlanta, and New York, a community platform with 100+ organic members, and a $500K grant offer sitting on the table.
    </p>
    <p>
      Here's what I learned building it.
    </p>

    <h2>Start with a project, not a pitch</h2>
    <p>
      The first MTC meeting had 8 people. We didn't talk about mission statements or five-year plans. We built janazas.org. Then we built a website for a local masjid. Then we ran a coding workshop for high schoolers.
    </p>
    <p>
      People don't join communities because of a mission. They join because there's something to do, and someone to do it with. The mission comes later, after they've already shown up three times.
    </p>
    <ProsePullQuote>
      Build the ummah by building for the ummah. Action first, identity second.
    </ProsePullQuote>

    <h2>Projects: the old model and where it's going</h2>
    <p>
      MTC's consulting arm, Pulse Consulting, started the way most student projects start. A few engineers and a PM would take on a project for a local nonprofit or small business. Before AI, that meant web dev or inventory tracking tools. Useful, but slow. Teams of five or six, semester-long timelines, and a lot of hand-holding.
    </p>
    <p>
      Post-AI, the math changes. Smaller teams can build more complex things on shorter timelines. A student with Devin and a mentor can ship what used to take a whole team a semester.
    </p>
    <p>
      The new model I'm pushing for looks like this. A technical mentor volunteers and brings the project. Could be something they want to build but don't have time for. They set up a GitHub repo, pick the stack, and give the builder direction. "Use these technologies. We need this done in six weeks. Text me updates every day. We check in weekly."
    </p>
    <p>
      The builder gets real experience, a real shipped project, and a direct connection to someone further along in their career who can vouch for them and help them get hired. The mentor gets something built that they didn't have time to build themselves.
    </p>
    <ProseWaxFigure caption="The new projects model">
      <p>
        <strong>Mentor</strong> brings the project, the stack, and the timeline. <strong>Builder</strong> does the work with AI agents and ships. <strong>MTC</strong> provides the structure, the match, and the network.
      </p>
      <p>
        The old model: 5-6 students, one semester, one PM, lots of meetings. The new model: 1 builder, 1 mentor, AI agents, six weeks, real output.
      </p>
    </ProseWaxFigure>
    <p>
      The role should be stipend-based and application-based, not volunteer. People are busy. If you want someone to own something, pay them and be selective about who takes it on.
    </p>
    <ProsePullQuote>
      How better to scout talent than to cultivate it from within?
    </ProsePullQuote>

    <h2>Education: from Python syntax to vibe coding</h2>
    <p>
      MTC Youth started as coding workshops at MCA Santa Clara. We taught Python to middle and high schoolers. The kids were polite about it. They learned loops and functions and made a calculator. It was fine.
    </p>
    <p>
      Then in April 2025 I ran a vibe coding workshop at a local school using Replit. About 20 middle schoolers. Within 20 minutes they were building things I didn't expect. A 3D Minecraft clone. Flappy Bird but with Steve Harvey's face. Doom. A cat-themed Pomodoro timer. I had never seen a group of kids that excited about coding.
    </p>
    <p>
      I <a href="https://x.com/alikhvni/status/1913328421062758720" target="_blank" rel="noopener noreferrer">posted about it on X</a> and it took off. 18,000 views, 253 likes. Karpathy and Amjad from Replit both saw it. The thing that struck me was how fast the energy shifted. These kids weren't learning syntax. They were building. The AI handled the syntax. They handled the ideas.
    </p>
    <ProsePullQuote>
      Never seen an entire group of kids become so excited about coding.
    </ProsePullQuote>
    <p>
      That workshop changed how I think about education. Before AI, we taught tools. Now we can teach taste. The bottleneck isn't "can you write a for loop." It's "can you describe what you want to build." That's a much better problem to have, and a much more fun one to teach.
    </p>
    <p>
      MTC Youth is now formalizing into region-based chapters, paired with university MTC chapters that provide mentorship. Berkeley pairs with Granada High and Averroes. Stanford pairs with Harker and West Valley CC. The university students teach the workshops. The high schoolers build. For the youth, by the youth.
    </p>

    <h2>Professional development: the career fair and the fireside</h2>
    <p>
      The best event MTC Berkeley ever ran was a career fair in Hearst Mining Building. That's Berkeley Engineering's largest venue. The lobby is massive. We filled it with companies and students and it felt like a real conference, not a student club event.
    </p>
    <p>
      The lesson: venue matters. A big, legit venue signals that this is a real thing. Companies take you more seriously when you book the engineering school's flagship building. Students show up dressed. The energy is different.
    </p>
    <p>
      We also ran fireside chats with founders and engineers. The format that worked best was short. 30 minutes of conversation, 15 minutes of Q&A, then food and mingling. No slides. No pitch. Just a person who's done something interesting talking about how they did it.
    </p>
    <p>
      Technical workshops were the third leg. We'd bring in an experienced engineer, usually someone a few years out of school, to teach something hands-on. React basics. How to set up a CI pipeline. How to read a stack trace. The bar was low but the value was high because the students got to ask questions they couldn't ask in a lecture hall of 300.
    </p>
    <ProseWaxFigure caption="What worked for events">
      <p>
        <strong>Career fair</strong> in a flagship venue. Companies pay to access students. Students get real recruiter face time.
      </p>
      <p>
        <strong>Fireside chats</strong> with founders and engineers. 30 min talk, 15 min Q&A, food after. No slides.
      </p>
      <p>
        <strong>Technical workshops</strong> led by working engineers. Hands-on, small room, lots of questions.
      </p>
    </ProseWaxFigure>

    <h2>What I'd do differently</h2>
    <p>
      The biggest mistake was staying volunteer-only for too long. Yousef, who leads our platform team, said it best. "We tried to do it volunteer based for the longest time. It wasn't working. Then I hired Osama and what we couldn't do in a year we did in three months."
    </p>
    <p>
      We have a $500K grant offer that's been sitting unclaimed for nine months because the precondition is hiring a full-time lead. The one place we shipped in 2026 is the one place we paid someone. The evidence was right there and we still didn't act on it.
    </p>
    <ProsePullQuote>
      The one place MTC shipped in 2026 is the one place there is a paid contractor.
    </ProsePullQuote>
    <p>
      The second mistake was letting every decision get re-litigated. Studio or Moon Works. Tennis club naming. Chapter logo strategy. Whether to push for the grant now or build momentum first. Without a hard external deadline, "yes" quietly becomes "later." We'd have the same five items on the agenda for 13 weeks straight.
    </p>
    <p>
      The fix is forcing functions. June 1, 2026 is our current one. Every active chapter has to be onboarded into our platform by then. That aligns with spring board recruitment, so it's a real deadline, not an arbitrary one. It's the only thing on the calendar that actually forces a decision.
    </p>
    <p>
      The third mistake was breadth. MTC Bay Area defined 10 core areas. Hackathons, professional development, career development, tech infrastructure, community growth, university ops, design and marketing, education and youth, Pulse Consulting, entrepreneurship. Ten areas for a volunteer team of six. That's not a strategy. That's a wish list.
    </p>
    <p>
      The honest question is whether MTC should narrow to Pulse Consulting only. Consulting is the highest-value, most defensible thing we do. It generates revenue, gives students real project experience, and serves the community. Everything else is either a funnel into consulting or a distraction from it.
    </p>

    <h2>What's next</h2>
    <p>
      Three things. Close the grant. Hire paid operators. Pick a focus and kill the rest.
    </p>
    <p>
      The grant is the unlock. $500K funds a full-time executive director, a community admin, and the engineering contractor we're already paying out of pocket. It turns MTC from a volunteer project into a real organization. The only thing standing between us and that money is an email.
    </p>
    <p>
      Paid operators are the proof. Yousef hiring Osama was the best decision MTC made in 2026. We need to do it again, twice. A $500/month VA for chapter outreach and Slack admin. A community admin for LinkedIn and Instagram cadence. Small costs, big leverage.
    </p>
    <p>
      And focus. Whether that's Pulse Consulting or something else, the point is to stop trying to do ten things and pick one or two. The community will be stronger for it.
    </p>

    <hr />
    <p>
      I built MTC from one Berkeley club to 30+ chapters. I'm building Cognition Coffee to do the same thing for Devin.{" "}
      <a href="/blog/game-plan/">The game plan is here</a>.{" "}
      <a href="/about">Let's talk</a>.
    </p>
  </>
)

export default Content
