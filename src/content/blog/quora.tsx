import React, { type FC } from "react"

export const frontmatter = {
  title: "What writing on Quora taught me about marketing",
  description:
    "7M+ views in a year to avoid paying attention in class as a teenager",
  date: "2026-06-27",
  category: "Field Notes",
  order: 4,
  draft: false,
}

const Content: FC = () => (
  <>
    <p>Writing is a muscle.</p>
    <p>
      You train it, over time, with repetition and experimentation and absorption of others' best practices. But it's as much as a <em>learning</em> process as it is a <em>doing</em> process.
    </p>
    <p>Persistence without insight will otherwise lead to the same outcome.</p>
    <p>
      I learned how to write by accident, on a question-and-answer site called Quora, when I was 14 in high school.
    </p>
    <p>
      In those days, I cared very little about becoming viral, an online celebrity, or building a personal brand. My reasons, as a high schooler, were simpler: I didn't like paying attention in class, refused to be on traditional social media like IG or Snapchat, and needed an outlet to curb my boredom.
    </p>
    <p>
      In the brief year I spent writing on the site, I racked up 7M all-time views (and after purging the account of retrospectively embarrassing answers before I forgot my password to my burner email, it shows about 1.7M today).
    </p>
    <figure className="my-9">
      <img
        src="/blog/quora/quorametrics.png"
        alt="Quora analytics dashboard showing over seven million total views"
        width={616}
        height={362}
        className="h-auto w-full rounded-lg border border-line"
      />
      <figcaption className="mt-3 text-left text-xs text-muted">
        Originally, I would've linked the Quora profile until I read through the first three answers and cringed so hard I remembered why I wrote under a pseudonym.
      </figcaption>
    </figure>
    <p>
      I had access to a unique feedback loop with every answer: thousands of stranger deciding, in real time, whether to keep reading what I wrote.
    </p>
    <p>I learned how messages traveled.</p>
    <p>Why some land and some die.</p>
    <p>When you strip away the jargon, you see marketing for what it actually is.</p>
    <p>
      Feedback, too, was instant and (brutally) honest. I could post life advice on parenting and relationships (I was neither a father nor taken) and watch it climb the charts. I could write the magnum opus of my intellectual capability and watch it fizzle. Strangers online, after all, owed me nothing. If they kept reading, something got them hooked. If they didn't, something wasn't working.
    </p>
    <p>
      Over time I stopped paying attention to the why. After all, I had a more powerful tool available:
    </p>
    <p>Pattern recognition.</p>
    <p>
      The hook that stops the scroll, the paragraph break that creates momentum, the short sentence following a long one. Writing takes design, too, when attention is the most valuable currency in the world.
    </p>
    <p>
      A body of text can be shaped, cut, and arranged to pull readers forward or let them drift away.
    </p>
    <p>
      Attention can be shaped long-term, too. In the startup world, a couple hundred cultists in love with your product beats a thousand people who feel "okay" at best about it.
    </p>
    <p>My time on Quora was a lesson on reach vs. resonance.</p>
    <p>
      A thousand indifferent users could forget about me by the time they closed the tab or clicked "Back" to return to their feed. A hundred people genuinely sold on my ethos, however, could become my missionaries.
    </p>
    <p>
      They converted their friends. They defended my work in the comments. They kept my brand alive past my own direct involvement. There was a cult of personality surrounding my Quoran alter ego, unbeknownst to every classmate around me.
    </p>
    <p>That marketing instinct is what's been the fuel to every fire I've lit since:</p>
    <ul>
      <li>Turning a Science Olympiad team around from the brink of death to a state-medalling powerhouse.</li>
      <li>Teaching thousands of students in one of the world's hardest Data Structures courses how to understand the material in a simple, digestible way.</li>
      <li>Scaling the Muslim Tech Collaborative, an organization that's spread across 30+ university chapters and 5 city chapters in the US over the past 3 years, into North America's largest Muslim builders club and talent network.</li>
      <li>Organizing internal hackathons totalling hundreds of participants in engineering and GTM across my current company, Keysight.</li>
    </ul>
    <p>Evangelizing a great message requires keeping it clear, concise, and catchy.</p>
    <p>It must survive the Telephone Test. (e.g., can it survive a game of Telephone?)</p>
    <p>
      Quora was the foundation for what taught me how to evangelize any kind of message to any kind of person. Experience, after all, is hardly ever linear: with repetition, experimentation, and evolution upon insights, you can become formidable - fast.
    </p>
  </>
)

export default Content
