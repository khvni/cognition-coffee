import type { FC } from "react"
import { ProsePullQuote } from "@/components/prose/ProsePullQuote"

export const frontmatter = {
  title: "The View Counter",
  description:
    "I have 7 million views on a Quora account I will not link you to. Here is what the number taught me.",
  date: "2026-06-12",
  category: "Field Notes",
  order: 4,
  draft: false,
}

const Content: FC = () => (
  <>
    <p>
      I have over seven million views on a Quora account I will not be linking you to. I purged most of the evidence. What's left is embarrassing enough.
    </p>
    <p>
      I started writing on Quora at fourteen. I was a freshman with a theory about social media: that it would corrupt me, put me in contact with the wrong people, and derail whatever great ambition I had for myself at the time. So instead of Instagram, I found Quora — a question-and-answer site where I could absorb information about science, philosophy, technology, and history. A corner of the internet I could curate to feed my mind rather than rot it.
    </p>
    <p>
      Eventually I started writing answers. I did this under a pseudonym — Allen Kinney, initials AK, mirroring my real ones. A fake name let me say true things without a teacher, a parent, or a classmate reading over my shoulder. Nobody upvoted Allen out of friendship. Nobody was kind to him because they sat next to him in homeroom. When his answers worked, it was because they worked. When they didn't, they died quietly at two hundred views.
    </p>
    <p>
      The anonymity freed me. To be cringe is to be free. I wrote every chance I got: on my phone between classes, on the school computers during library lunch, on my laptop at home until two in the morning. By spring 2018 I was deep into teen Quora — a niche I rose through fast and told absolutely no one about. My double life: unremarkable student in the hallway, minor internet personality at night.
    </p>
    <p>
      The part I didn't expect was how much Quora taught me. Not in an inspirational way — in the way a scoreboard teaches you. I could post advice I was completely unqualified to give and watch it climb to fifty thousand views. I could write what I was sure was the sharpest thing I'd ever made and watch it fizzle at ten upvotes. The feedback was instant and honest. Strangers owe you nothing. If they kept reading, something was working. If they didn't, something wasn't.
    </p>
    <p>
      I started paying attention to why. Over time the patterns showed up. A hook that stopped the scroll. A paragraph break that created momentum instead of killing it. The single short sentence after a long one. Writing, I realized, is a visual act as much as a linguistic one — you're not just choosing words, you're designing attention. A body of text can be shaped, cut, and arranged to pull readers forward or let them drift away. That craft is learnable. Quora taught it to me through a thousand small failures, in real time.
    </p>
    <p>
      In less than a year, I was one of the most-viewed writers on the platform.
    </p>
    <p>
      My friend — who I'd pulled into my Quora escapade — cared about views. He found me crossing seven million and wanted to talk about the number. I was focused on my latest answer: who was reading it, what the comments said, whether it had started a conversation. The raw metric didn't interest me. The quorum did. Could I get strangers to actually start talking because of something I made?
    </p>

    <ProsePullQuote>
      A hundred cultists beats a thousand people who feel meh.
    </ProsePullQuote>

    <p>
      That instinct grew into something I didn't have a name for yet. I ran a Discord server called the Frozen Calculator Army — a long story whose origin I no longer remember beyond an edited photo of a TI-84 CE calculator — that became one of the most active communities in teen Quora. Not the biggest. The most engaged. Members shipped things without being asked. They brought in their friends. They kept showing up after I'd stopped paying close attention.
    </p>
    <p>
      That's when I understood the difference between reach and resonance. A thousand meh users forget you exist by the time they close the tab. A hundred people who are genuinely sold become missionaries. They convert their friends, defend your work in comments, and keep the thing alive past your own direct involvement. The goal isn't a big number. The goal is a small group who won't shut up about what you've built.
    </p>
    <p>
      Quora gave me the marketing instinct. It taught me how to communicate — not just through writing, but across every medium I'd later use: in-person pitches, emails, blog posts, presentations, technical guides. The underlying skill is the same. You're always transmitting a message. The question is whether it arrives intact and leaves the receiver hungry for more.
    </p>
    <p>
      The work I later did with MTC ran on exactly that instinct. Evangelizing a mission to a small, skeptical group of students. Building a great institution is like a good game of telephone: the message stays clear through every layer because the original signal was sharp enough to survive the journey. You hook them with something they can't forget. You cook a dish whose first bite makes them want another.
    </p>
    <p>
      I don't touch the account anymore. Some of what's there is as embarrassing as I warned you. But it also has seven million views from strangers who owed me nothing — and that number doesn't lie.
    </p>
  </>
)

export default Content
