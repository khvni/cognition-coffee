import React, { type FC } from "react"
import { ProsePullQuote } from "@/components/prose/ProsePullQuote"
import { ProseWaxFigure } from "@/components/prose/ProseWaxFigure"

export const frontmatter = {
  title: "MTC's 30+ college chapters",
  description:
    "How I took a single student club at UC Berkeley and scaled it into a national organization with 30+ chapters, regional hubs, and the operational infrastructure to keep it running.",
  date: "2026-06-23",
  category: "Community",
  order: 0,
  draft: false,
}

const Content: FC = () => (
  <>
    <p>
      I started MTC in spring 2023 at UC Berkeley. One club, eight people, building a website for a community service. Three years later it's 30+ university chapters, city hubs in the Bay Area, Seattle, Houston, Atlanta, and New York, a community platform with 100+ organic members, and a $500K grant offer on the table.
    </p>
    <p>
      This is about what I learned building it. What we did well, how we did it, and what I'd do differently. I'll cover the three pillars that MTC runs on: projects, education, and professional development. And the operational infrastructure that makes it all repeatable across 30+ chapters.
    </p>

    <h2>The starting point</h2>
    <p>
      The first MTC meeting had 8 people. We didn't write a mission statement or plan a five-year roadmap. We built a website. Then we built another one. Then we ran a coding workshop for high schoolers.
    </p>
    <p>
      People don't join communities because of a mission. They join because there's something to do and someone to do it with. The mission comes later, after they've shown up three times.
    </p>
    <ProsePullQuote>
      Action first, identity second. The mission is a lagging indicator, not a leading one.
    </ProsePullQuote>
    <p>
      By the end of the first year, students at other universities started asking how to start their own chapters. That's when the real work began. Not building things ourselves, but building a system so other people could build things.
    </p>

    <h2>Projects: the old model and where it's headed</h2>
    <p>
      MTC's consulting arm, Pulse Consulting, started the way most student projects start. Several engineers and a PM would take on a consulting project for a local nonprofit or small business. Before AI, that meant web dev or inventory tracking tools. Useful, but slow. Teams of five or six, semester-long timelines, a lot of hand-holding.
    </p>
    <p>
      Post-AI, the math changes. We're exploring how to build more complex, bespoke solutions on compressed timelines with smaller teams equipped with agents. A student with Devin and a mentor can ship what used to take a whole team a semester.
    </p>
    <p>
      Here's the new model, based on texts I sent to a friend running an MTC chapter.
    </p>
    <p>
      First, formalize the role. Make it stipend-based and selective. Don't just ask people to volunteer time out of their busy work and school schedules. Application-based, for the win.
    </p>
    <p>
      Second, pair each builder with a technical mentor. The mentor volunteers and provides the basis for the project. Could even be an idea they want to build out and explore but don't have time to do themselves. The mentor gives the student or new grad who's actually building it the direction they need.
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
      Organically, this also means the builder has a direct connection with someone further along in their career. Someone who can vouch for their work ethic, technical ability, and coachability. Someone who can get them hired for internships and full-time roles afterwards.
    </p>
    <ProsePullQuote>
      How better to scout talent than to cultivate it from within?
    </ProsePullQuote>

    <h2>Education: pre-AI and post-AI</h2>
    <p>
      MTC Youth started as coding workshops at a local community center. We taught Python to middle and high schoolers. The kids were polite about it. They learned loops and functions and made a calculator. It was fine.
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
      MTC Youth is now formalizing into region-based chapters, paired with university MTC chapters that provide mentorship. Berkeley pairs with local high schools. Stanford pairs with others. The university students teach the workshops. The high schoolers build.
    </p>

    <h2>Professional development: events that actually work</h2>
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
      Technical workshops were the third leg. We'd bring in an experienced engineer, usually someone a few years out of school, to teach something hands-on. React basics. How to set up a CI pipeline. How to read a stack trace. The bar was low but the value was high because students got to ask questions they couldn't ask in a lecture hall of 300.
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
    <p>
      This year we also helped advise and organize mtchacks.com at UIUC. A large-scale hackathon with embroidered hoodies, stickers, sponsor t-shirts, the full production. It's coming back next year bigger. The hackathon is the highest-stakes event format we run. It tests the national infrastructure the hardest. Sponsors, judges, venue, food, swag, website, registration, a weekend of logistics. The fact that a chapter at UIUC could pull this off with remote support from the national team is proof the system works.
    </p>

    <h2>The operational infrastructure</h2>
    <p>
      Running 30+ chapters is not about giving a great speech once a year. It's about building the machinery so that a chapter president at NYU can run an event without calling me. Here's what we built.
    </p>

    <h3>Centralized Slack</h3>
    <p>
      Every chapter lead gets invited to a centralized Slack workspace on the nonprofit plan. This is the spine of the whole organization. Chapter presidents can DM me directly. Regional leads have their own channels. There's a #chapter-presidents channel for cross-chapter questions, a #events channel for sharing what's working, and per-chapter channels for local coordination.
    </p>
    <p>
      The Slack isn't just a chat tool. It's the closest thing we have to organizational memory. When a new chapter president takes over, they inherit the channel history and can scroll back to see how previous leaders handled the same problems.
    </p>

    <h3>Canva templates and branding kit</h3>
    <p>
      Every chapter needs to promote its events. Most chapter leads are not designers. So we built a set of Canva templates for Instagram posts, event flyers, and story graphics. A chapter lead can duplicate the template, swap the text, and have a postable graphic in five minutes.
    </p>
    <p>
      We paired that with an internal branding kit. Logo files, color palette, typography, usage guidelines. The goal is that any chapter anywhere can produce materials that look like MTC, not like a student club guessing at a brand. Chapters self-generate their logo from the template, I approve it, and they're live.
    </p>

    <h3>NotebookLM for chapter operations</h3>
    <p>
      This is the newest piece and the one I'm most excited about. We took every SOP, chapter operations doc, event planning guide, board recruitment playbook, and best-practice writeup we had, and loaded them into a shareable NotebookLM notebook.
    </p>
    <p>
      Chapter leads can open it in their browser, type a question in plain English, and get an answer grounded in our actual documentation. "How do I book a room on campus?" "What's the budget for a kickoff event?" "How do I run a board election?" The notebook pulls from the source docs and cites them. No more scrolling through a 40-page Notion page or waiting for me to reply to a Slack DM.
    </p>
    <ProsePullQuote>
      A chapter lead at 11pm can get an answer to "how do I structure my board" without waiting for anyone to be online.
    </ProsePullQuote>

    <h3>Notion speaker CRM</h3>
    <p>
      One of the hardest parts of running a chapter is finding speakers. Every chapter reinvents this. So we built a Notion database inside MTC National that serves as a rolodex of industry speakers we've hosted across all chapters.
    </p>
    <p>
      Each entry has the speaker's name, company, topic, which chapter hosted them, when, contact info, and notes on how the event went. A chapter president at NYU can search the database, see that Berkeley hosted a founder from Levels.fyi in spring 2024, and reach out with context. "Hey, you spoke at MTC Berkeley last year. We're running a fireside chat series at NYU and would love to have you."
    </p>
    <p>
      It's not a polished CRM. It's a Notion table with a lot of rows. But it works because the data is real and the contact points are warm.
    </p>

    <h3>Quarterly regional syncs</h3>
    <p>
      Every quarter, I run a regional sync for each region. Bay Area. SoCal. Chicago. Atlanta. Texas. East Coast. Every chapter president in the region gets on a call. We go around the room. Each president shares what's working, what's broken, and what they're planning next.
    </p>
    <p>
      The syncs serve three purposes. First, troubleshooting. If Berkeley's board is having a motivation problem, chances are SJSU is too, and hearing how Stanford handled it last semester saves everyone time. Second, idea exchange. An event format that worked at Davis can be copied at UCSC the next week. Third, accountability. If a president knows they're presenting at the sync, they ship things.
    </p>
    <p>
      I also hop on one-on-one calls with chapter presidents whenever they ask. Direct access to me is not gated. If a president texts me at 10pm with a board crisis, I call them back. The organization is small enough that this still works, and it's the highest-leverage thing I do.
    </p>
    <ProseWaxFigure caption="The coordination cadence">
      <p>
        <strong>Weekly:</strong> Slack. Async, always on. Chapter leads DM me directly.
      </p>
      <p>
        <strong>Quarterly:</strong> Regional syncs. All chapter presidents in a region on one call. Round-robin updates.
      </p>
      <p>
        <strong>On-demand:</strong> 1:1 calls with chapter presidents. Anytime they ask.
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
      The second mistake was letting every decision get re-litigated. Studio or Moon Works. Chapter logo strategy. Whether to push for the grant now or build momentum first. Without a hard external deadline, "yes" quietly becomes "later." We'd have the same five items on the agenda for 13 weeks straight.
    </p>
    <p>
      The fix is forcing functions. June 1, 2026 is our current one. Every active chapter has to be onboarded into our platform by then. That aligns with spring board recruitment, so it's a real deadline, not an arbitrary one.
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
