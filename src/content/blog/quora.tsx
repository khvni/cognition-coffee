import React, { type FC } from "react"
import { ProsePullQuote } from "@/components/prose/ProsePullQuote"

export const frontmatter = {
  title: "What writing on Quora taught me about marketing",
  description:
    "Seven million views on a Quora account I won't link. What the feedback loop taught me about marketing.",
  date: "2026-06-12",
  category: "Field Notes",
  order: 4,
  draft: false,
}

const Content: FC = () => (
  <>
    <p>
      I learned marketing by accident, on a question-and-answer site, under a fake name, at fourteen. The site was Quora. The education came from a feedback loop I couldn't fake or bribe: strangers deciding, in real time, whether to keep reading what I wrote.
    </p>
    <p>
      I have over seven million views on that account, which I will not be linking you to. The number isn't the point. The point is what writing there taught me about how messages travel, why some land and some die, and what marketing actually is when you strip away the jargon.
    </p>
    <p>
      The feedback was instant and honest. I could post advice I was completely unqualified to give and watch it climb. I could write what I was sure was my best work and watch it fizzle. Strangers owe you nothing. If they kept reading, something was working. If they didn't, something wasn't.
    </p>
    <p>
      I started paying attention to why. The patterns showed up: the hook that stops the scroll, the paragraph break that creates momentum, the short sentence after a long one. Writing is visual attention design. You're not just choosing words; you're designing attention. A body of text can be shaped, cut, and arranged to pull readers forward or let them drift away.
    </p>
    <ProsePullQuote>
      A hundred cultists beats a thousand people who feel meh.
    </ProsePullQuote>
    <p>
      The lesson became reach versus resonance. A thousand indifferent users forget you by the time they close the tab. A hundred people who are genuinely sold become missionaries. They convert their friends, defend your work in comments, and keep the thing alive past your own direct involvement.
    </p>
    <p>
      That instinct is what I used later to build the Muslim Tech Collaborative. The message has to stay sharp enough to survive every layer of the game. You hook them with something they can't forget. You cook a dish whose first bite makes them want another.
    </p>
    <p>
      I don't touch the account anymore. Some of what's there is as embarrassing as I warned you. But seven million views from strangers who owed me nothing is a number that doesn't lie.
    </p>
  </>
)

export default Content
