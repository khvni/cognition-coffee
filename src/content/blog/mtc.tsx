import React, { type FC } from "react"
import { ProsePullQuote } from "@/components/prose/ProsePullQuote"
import { ProseWaxFigure } from "@/components/prose/ProseWaxFigure"

export const frontmatter = {
  title: "MTC's 30+ college chapters",
  description:
    "I started MTC at UC Berkeley in spring 2023 with 8 people. Three years later: 30+ chapters, city hubs, and a $500K grant offer sitting unclaimed. What worked, and what I'd do differently.",
  date: "2026-06-26",
  category: "Community",
  order: 0,
  draft: false,
}

const Content: FC = () => (
  <>
    <p>
      I started MTC in spring 2023 at UC Berkeley. One club, eight people, building a website for a community service. Three years later it's 30+ university chapters, city hubs in the Bay Area, Seattle, Houston, Atlanta, and New York, a community platform with 100+ organic members, and a $500K grant offer on the table.
    </p>

    <h2>How it started</h2>
    <p>
      We didn't write a mission statement or plan a five-year roadmap. We built a website. Then another one. Then a coding workshop for high schoolers.
    </p>
    <p>
      People don't join communities because of a mission. They join because there's something to do and someone to do it with. The mission comes later, after they've shown up three times.
    </p>
    <ProsePullQuote>
      Action first, identity second. The mission is a lagging indicator.
    </ProsePullQuote>
    <p>
      By the end of the first year, students at other universities started asking how to start their own chapters. That's when the work shifted from building things to building a system so other people could build things.
    </p>

    <h2>Pulse Consulting</h2>
    <p>
      MTC's consulting arm, Pulse Consulting, started the way most student projects start. Several engineers and a PM would take on a project for a local nonprofit or small business. Before AI, that meant web dev or inventory tracking tools. Useful, but slow. Teams of five or six, semester-long timelines, a lot of hand-holding.
    </p>
    <p>
      Post-AI, a student with Devin and a mentor can ship what used to take a whole team a semester. Here's the new model, based on texts I sent to a friend running a chapter.
    </p>
    <p>
      First, formalize the role. Stipend-based, selective, application-based. Don't ask people to volunteer time out of busy work and school schedules.
    </p>
    <p>
      Second, pair each builder with a technical mentor who volunteers and brings the project, maybe an idea they want built but don't have time to build themselves.
    </p>
    <ProseWaxFigure caption="The new projects model">
      <p>
        <strong>Mentor</strong> brings the project, the stack, and the timeline. <strong>Builder</strong> does the work with AI agents and ships. <strong>MTC</strong> provides the structure, the match, and the network.
      </p>
      <p>
        Old model: 5-6 students, one semester, one PM, lots of meetings. New model: 1 builder, 1 mentor, AI agents, six weeks, real output.
      </p>
    </ProseWaxFigure>
    <p>
      The mentor sets up a GitHub repo, picks the stack, and gives clear direction. "Use these technologies to build out the site. We need this done in six weeks. Text me updates every day and we'll check in every week to see where your progress is at."
    </p>
    <p>
      The builder also gets a direct line to someone further along who can vouch for them and help them get hired for internships and full-time roles afterwards.
    </p>

    <h2>MTC Youth</h2>
    <p>
      MTC Youth started as coding workshops at a local community center. We taught Python to middle and high schoolers. The kids were polite about it. They learned loops and functions and made a calculator. It was fine.
    </p>
    <p>
      Then in April 2025 I ran a vibe coding workshop at a local school using Replit. About 20 middle schoolers. Within 20 minutes they were building things I didn't expect. A 3D Minecraft clone. Flappy Bird but with Steve Harvey's face. Doom. A cat-themed Pomodoro timer. I had never seen a group of kids that excited about coding.
    </p>
    <p>
      I <a href="https://x.com/alikhvni/status/1913328421062758720" target="_blank" rel="noopener noreferrer">posted about it on X</a> and it took off. 18,000 views, 253 likes. Karpathy and Amjad from Replit both saw it. These kids weren't learning syntax. They were building. The AI handled the syntax. They handled the ideas.
    </p>
    <p>
      That workshop changed how I think about education. Before AI, we taught tools. Now we can teach taste. The bottleneck isn't "can you write a for loop." It's "can you describe what you want to build." That's a much more fun problem to teach.
    </p>
    <p>
      MTC Youth is becoming region-based chapters, each paired with a university MTC chapter that supplies mentors. Berkeley pairs with local high schools. Stanford with others. The university students teach the workshops. The high schoolers build.
    </p>

    <h2>Events</h2>
    <p>
      The best event MTC Berkeley ever ran was a career fair in Hearst Mining Building. That's Berkeley Engineering's largest venue. The lobby is massive. We filled it with companies and students and it felt like a real conference, not a student club event.
    </p>
    <p>
      Venue matters. Book the engineering school's flagship building and companies take you more seriously, students show up dressed, the energy changes.
    </p>
    <p>
      We also ran fireside chats with founders and engineers. The format that worked best was short. 30 minutes of conversation, 15 minutes of Q&A, then food and mingling. No slides. No pitch. Just a person who's done something interesting talking about how they did it.
    </p>
    <p>
      Technical workshops were the third leg. We'd bring in an experienced engineer, usually someone a few years out of school, to teach something hands-on. React basics. How to set up a CI pipeline. How to read a stack trace. Students got to ask questions they couldn't ask in a lecture hall of 300.
    </p>
    <p>
      This year we helped organize mtchacks.com at UIUC, a full-production hackathon with embroidered hoodies, stickers, and sponsor t-shirts, coming back bigger next year. A hackathon is the highest-stakes format we run: sponsors, judges, venue, food, swag, registration, a weekend of logistics.
    </p>

    <h2>How 30 chapters stay coordinated</h2>
    <p>
      Running 30+ chapters means building the machinery so a chapter president at NYU can run an event without calling me.
    </p>
    <p>
      The backbone is a centralized Slack on the nonprofit plan. Every chapter lead gets in, and chapter presidents can DM me directly. Regional leads have their own channels. There's a #chapter-presidents channel for cross-chapter questions, a #events channel for sharing what's working, and per-chapter channels for local coordination. The Slack is the closest thing we have to organizational memory. When a new chapter president takes over, they inherit the channel history and can scroll back to see how previous leaders handled the same problems.
    </p>
    <p>
      Most chapter leads aren't designers, so we built Canva templates for Instagram posts, event flyers, and story graphics. A chapter lead can duplicate the template, swap the text, and have a postable graphic in five minutes. We paired that with an internal branding kit: logo files, color palette, typography, usage guidelines. Any chapter anywhere can produce materials that look like MTC. A chapter generates its logo from the template, I approve it, and it's live.
    </p>
    <p>
      We loaded every SOP, ops doc, event guide, and board playbook into a shared NotebookLM notebook. A chapter lead opens it in their browser, types "how do I book a room on campus" or "what's the budget for a kickoff event," and gets an answer pulled from our actual docs, with citations. No more scrolling a 40-page Notion page or waiting on me to reply to a Slack DM.
    </p>
    <ProsePullQuote>
      A chapter lead at 11pm can get an answer to "how do I structure my board" without waiting for anyone to be online.
    </ProsePullQuote>
    <p>
      Finding speakers is the hardest part of running a chapter, and every chapter reinvents it. So we keep a Notion database inside MTC National: a rolodex of every industry speaker any chapter has hosted, with name, company, topic, which chapter, when, contact info, and how the event went. A president at NYU can see that Berkeley hosted a founder from Levels.fyi in spring 2024 and reach out with context: "Hey, you spoke at MTC Berkeley last year. We're running a fireside chat series at NYU and would love to have you." It's a Notion table with a lot of rows, not a polished CRM. It works because the data is real and the contact points are warm.
    </p>
    <p>
      Every quarter I run a regional sync for each region. Bay Area. SoCal. Chicago. Atlanta. Texas. East Coast. Every chapter president in the region gets on a call, and we go around the room. Each president shares what's working, what's broken, and what they're planning next. If Berkeley's board has a motivation problem, chances are SJSU does too, and hearing how Stanford handled it last semester saves everyone time. An event format that worked at Davis gets copied at UCSC the next week. And a president who knows they're presenting at the sync ships things.
    </p>
    <p>
      I also hop on one-on-one calls with chapter presidents whenever they ask. If a president texts me at 10pm with a board crisis, I call them back. The org is small enough that this still works, and it's the most useful thing I do.
    </p>

    <h2>What I'd do differently</h2>
    <p>
      The biggest mistake was staying volunteer-only for too long. Yousef, who leads our platform team, said it best. "We tried to do it volunteer based for the longest time. It wasn't working. Then I hired Osama and what we couldn't do in a year we did in three months."
    </p>
    <p>
      We have a $500K grant offer that's been sitting unclaimed for nine months because the precondition is hiring a full-time lead.
    </p>
    <ProsePullQuote>
      The one place MTC shipped in 2026 is the one place there is a paid contractor.
    </ProsePullQuote>
    <p>
      The second mistake was letting every decision get re-litigated. Studio or Moon Works. Chapter logo strategy. Whether to push for the grant now or build momentum first. Without a hard external deadline, "yes" quietly becomes "later." We'd have the same five items on the agenda for 13 weeks straight.
    </p>
    <p>
      The fix is forcing functions. June 1, 2026 is our current one. Every active chapter has to be onboarded into our platform by then. That aligns with spring board recruitment, so it's a real deadline.
    </p>
    <p>
      The third mistake was breadth. MTC Bay Area defined 10 core areas: hackathons, professional development, career development, tech infrastructure, community growth, university ops, design and marketing, education and youth, Pulse Consulting, entrepreneurship. Ten areas for a volunteer team of six. That's a wish list, not a strategy.
    </p>
    <p>
      The honest question is whether MTC should narrow to Pulse Consulting only. Consulting is the highest-value thing we do. It generates revenue and gives students real project experience. Everything else is either a funnel into consulting or a distraction from it.
    </p>

    <h2>What's next</h2>
    <p>
      Close the grant. Hire paid operators. Pick a focus and kill the rest. The only thing between us and $500K is an email. We need another Osama: a $500/month VA for chapter outreach and Slack admin, and a community admin for LinkedIn and Instagram cadence. And we need to stop trying to do ten things.
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
