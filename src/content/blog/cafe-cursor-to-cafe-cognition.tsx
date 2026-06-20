import type { FC } from "react"
import { ProsePullQuote } from "@/components/prose/ProsePullQuote"
import { ProseWaxFigure } from "@/components/prose/ProseWaxFigure"

export const frontmatter = {
  title: "From Cafe Cursor to Cafe Cognition: A Field Guide to a Global Meetup Network",
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
      Cafe Cursor works like this: take over a coffee shop for a day, bring credits and stickers, invite local builders, and let them work. No keynotes. No sales pitches. Just people building things together in a space that feels human. They've done it in over 200 cities, with events on Luma and ambassadors posting warm, candid photos that make you wish you'd been there.
    </p>
    <p>
      This is genuinely impressive. And it's exactly the model Cognition should study, adapt, and then surpass.
    </p>
    <p>
      Because Cafe Cursor, for all its warmth, runs on pop-up energy. Each event is a spark. Some sparks catch: a host runs another one, a local Slack channel forms, attendees become regulars. But most don't. The energy fades until someone decides to run the next one.
    </p>
    <p>There's a better architecture. I've built it.</p>
    <h2>What Cursor got right</h2>
    <p>
      Credit where it's due. Cursor's community team understood three things that most developer relations programs miss:
    </p>
    <p>
      <strong>The venue matters.</strong> A coffee shop is warmer than a co-working space. A cafe with good light and real espresso sends a signal: this is a community of people who care about craft, not a lead-gen exercise.
    </p>
    <p>
      <strong>Low friction wins.</strong> No ticket fees, no registration gauntlet, no "tell us your company size" gates. Show up. Build. Leave when you want. The format respects people's time and autonomy.
    </p>
    <p>
      <strong>Social proof compounds.</strong> The tweet wall of Cafe Cursor photos (laptops open, people laughing, latte art next to terminal windows) does more for adoption than any product demo. It makes the tool feel like something a community owns, not something a company sells.
    </p>
    <ProsePullQuote>
      The tweet wall of Cafe Cursor photos does more for adoption than any product demo. It makes the tool feel like something a community owns.
    </ProsePullQuote>
    <p>
      These instincts are right. The execution is strong. But there's a ceiling, and it's structural.
    </p>
    <h2>Where pop-ups hit a ceiling</h2>
    <p>A pop-up event is a point on a timeline. A chapter is a line.</p>
    <p>
      When Cursor runs a Cafe Cursor in Austin, it's great for the people who attend. But the next month, someone has to decide to do it again. There's no local leadership structure that makes that automatic. No one in Austin "owns" the Cursor community. They just attended an event once.
    </p>
    <p>
      This is the difference between events and chapters. Events are moments. Chapters are institutions. And institutions compound in ways that moments can't.
    </p>
    <p>
      I learned this the hard way. When I founded the Muslim Tech Collaborative at UC Berkeley, the first thing we did was run events. Speaker panels, workshops, networking nights. They went well. People came. And then the semester ended, and we had to rebuild momentum from scratch.
    </p>
    <p>
      The breakthrough was building a chapter model: a structure where local leaders owned their community, ran their own programming, and operated with a shared playbook but local autonomy. One Berkeley club became 30+ university chapters and 4 city hubs in 18 months. Not because we ran 30 times as many events, but because we built the operating system that let other people run them.
    </p>
    <ProseWaxFigure caption="Events vs. chapters: what compounds">
      <p>
        <strong>Pop-up events</strong> generate energy but require central coordination every time. Growth is linear: each event is a unit of work.
      </p>
      <p>
        <strong>Chapters</strong> generate energy <em>and</em> local ownership. Growth becomes exponential: each chapter runs its own events, recruits its own members, and adapts to its own city.
      </p>
      <p>
        <strong>The unlock:</strong> a shared playbook (meetup-in-a-box) plus tiered leadership (national, regional, local) that lets local leaders operate autonomously while staying aligned with the brand.
      </p>
    </ProseWaxFigure>
    <h2>The Cafe Cognition playbook</h2>
    <p>
      Cafe Cognition combines Cafe Cursor's warmth with MTC's chapter structure. Here's how it works.
    </p>
    <h3>The meetup-in-a-box kit</h3>
    <p>Every Cafe Cognition host gets a single package with everything they need:</p>
    <ul>
      <li>
        <strong>Run-of-show template</strong>: a minute-by-minute schedule that works for 15 or 50 attendees. Arrive, settle in, intro from the host, a 10-minute live Devin demo, open build time, show-and-tell, wrap.
      </li>
      <li>
        <strong>Slide deck</strong>: branded, editable, with speaker notes. The host doesn't need to design anything.
      </li>
      <li>
        <strong>Live-demo script</strong>: a working Devin workflow the host can present as-is or riff on. Updated monthly with new features.
      </li>
      <li>
        <strong>Swag templates</strong>: sticker sheets, name badges, table cards. Print-ready files a host can send to a local shop.
      </li>
      <li>
        <strong>Photo checklist</strong>: the five shots that make great social proof are the venue exterior, laptops open, the demo moment, candid conversation, and the group shot. These feed the tweet wall that feeds the next host's motivation.
      </li>
    </ul>
    <p>
      The kit reduces friction to near zero. A motivated developer in Bangalore, Berlin, or Buenos Aires can run a Cafe Cognition without calling anyone at Cognition HQ.
    </p>
    <h3>The host leaderboard</h3>
    <p>Good organizers are rare. When you find them, you keep them.</p>
    <p>
      The host leaderboard tracks events run, attendees reached, and community feedback. Top hosts earn perks: swag drops, Devin credits, co-branded content, and a direct line to the DevRel team. The leaderboard isn't gamification for its own sake. It's a recognition system that turns great hosts into repeat hosts.
    </p>
    <ProsePullQuote>
      The goal isn't more events. It's more <em>hosts</em>, people with local context, local networks, and the motivation to keep showing up.
    </ProsePullQuote>
    <h2>The three-tier chapter model</h2>
    <p>
      This is the architecture that made MTC scale. Three levels of ownership, each with clear responsibilities:
    </p>
    <h3>National (Cognition DevRel)</h3>
    <p>
      Sets the brand, maintains the kit, runs the leaderboard, and coordinates Devin Days (the quarterly flagships). Small team, focused on helping others run events — not on running every event itself.
    </p>
    <h3>Regional (Champions)</h3>
    <p>
      The top-tier ambassadors from{" "}
      <a href="/blog/brewing-community-90-days/#days-6090-the-roasters-guild--the-ambassador-program">
        the Roasters' Guild
      </a>
      . Each champion owns a metro area or university cluster. They coordinate local hosts, run regional events, and carry feedback from their community to the product team.
    </p>
    <h3>Local (Hosts)</h3>
    <p>
      Individual organizers who run Cafe Cognition pop-ups using the kit. They know their city: which cafe has the best light, which coworking space has reliable Wi-Fi, which local Slack channel to promote in. That local knowledge is irreplaceable, and the chapter model lets them use it.
    </p>
    <ProseWaxFigure caption="How 1 club became 30+ chapters">
      <p>At MTC, the three-tier model worked because each level had a clear job:</p>
      <ul>
        <li>
          <strong>National</strong> built the playbook and maintained brand alignment
        </li>
        <li>
          <strong>Regional leads</strong> recruited and supported local presidents
        </li>
        <li>
          <strong>Local chapters</strong> ran their own events and grew their own membership
        </li>
      </ul>
      <p>
        The result: 30+ university chapters and 4 city hubs in 18 months, with most growth coming from chapter leaders recruiting other chapter leaders, not from the national team running more events.
      </p>
    </ProseWaxFigure>
    <h2>Devin Days</h2>
    <p>
      While Cafe Cognition is the grassroots engine, Devin Days are the flagship moments. Quarterly hack days in major tech hubs (SF, NYC, Austin, London, Bangalore) that bring together the best builders, debut new features, and create content that keeps momentum between events.
    </p>
    <p>
      Think of Devin Days as a product launch crossed with a community reunion. They give the distributed chapter network something to orbit.
    </p>
    <h2>Metrics that matter</h2>
    <p>
      The temptation in community is to count big numbers: total events, total attendees, total Discord members. These are vanity metrics. They tell you how loud the megaphone is, not whether anyone's listening.
    </p>
    <p>The metrics that actually matter:</p>
    <ul>
      <li>
        <strong>Active chapters</strong>: how many local groups ran at least one event in the last 60 days
      </li>
      <li>
        <strong>Repeat hosts</strong>: the percentage of hosts who run a second event within 90 days
      </li>
      <li>
        <strong>Builds shipped</strong>: projects started or completed at Cafe Cognition events (the signal that people are learning, not just attending)
      </li>
      <li>
        <strong>Events per month (organic)</strong>: events run without central coordination, purely by local hosts using the kit
      </li>
      <li>
        <strong>Host-to-champion conversion</strong>: how many hosts graduate to regional leadership
      </li>
    </ul>
    <ProsePullQuote>
      The number that matters most isn't how many people came. It's how many hosts ran a second event.
    </ProsePullQuote>
    <p>
      These numbers track something deeper: whether the community has local ownership. If hosts keep hosting and chapters keep growing without the central team pushing, the engine is working.
    </p>
    <hr />
    <p>
      This is the playbook. It's not theoretical. It's the same architecture that scaled MTC, adapted for a product with global reach and a community that's ready to be built.
    </p>
    <p>
      The next step is{" "}
      <a href="/blog/brewing-community-90-days/#days-6090-the-roasters-guild--the-ambassador-program">
        the ambassador program that powers it
      </a>
      , and{" "}
      <a href="/blog/brewing-community-90-days/#days-030-the-house-roast--curriculum-and-certification">
        the curriculum that gives people something to teach
      </a>
      . Or start from the top:{" "}
      <a href="/blog/brewing-community-90-days/">the full 90-day plan</a>.
    </p>
    <p>
      Ready to brew? <a href="/about#contact">Let's talk</a>.
    </p>
  </>
)

export default Content
