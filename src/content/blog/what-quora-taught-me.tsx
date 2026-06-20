import type { FC } from "react"
import { ProsePullQuote } from "@/components/mdx/ProsePullQuote"

export const frontmatter = {
  title: "The View Counter",
  description:
    "At fourteen I told a friend that writing answers on Quora was my replacement for social media. He thought I was insane. Then he tried it. Here is the lesson we both took from a refresh button and a number that wouldn't lie.",
  date: "2026-06-12",
  category: "Field Notes",
  order: 4,
  draft: false,
}

const Content: FC = () => (
  <>
    <p>
      When I was fourteen, I told a friend that my replacement for social media was writing answers on Quora. He said it was the stupidest thing he had ever heard. Then he went home, opened Quora, and wrote for four hours straight.
    </p>
    <p>
      Years later he turned that night into{" "}
      <a href="https://press.alif.build/p/what-writing-on-quora-taught-me-about">an essay</a>. I am the weird friend in it. He is not wrong about me.
    </p>
    <p>
      This is my side. It starts earlier — by the time I talked him into it, I was already gone. I wrote under a pseudonym, Allen Kinney, because a fake name let me say true things without a teacher, a parent, or a classmate reading over my shoulder.{" "}
      <a href="https://www.quora.com/profile/Allen-Kinney">The account</a> is still up.
    </p>
    <h2>1. The number that wouldn't lie</h2>
    <p>
      I was not the kid who kept a journal. I came home, skipped my homework, and wrote answers until two in the morning. I would publish something, hate it by midnight, delete it, and write it again from scratch. Then I would refresh the page to watch the view count move.
    </p>
    <p>
      That counter was the whole point. Grades ran through a rubric. Likes on a feed were a popularity contest with people who already knew me. Quora was neither. If an answer was good, strangers who owed me nothing read it to the end and shared it. If it was bad, it died at two hundred views and stayed there.
    </p>
    <p>
      No algorithm to game. No social debt to call in. Just one question, asked over and over: does this land?
    </p>
    <h2>2. Learning to read the signal</h2>
    <p>
      Some nights it landed hard. A throwaway answer about parental advice climbed past fifty thousand views in a week. The next one, which I was sure was sharper, stalled and never moved.
    </p>
    <p>
      At first I had no idea why. Then the pattern showed itself. I could see what made someone stop scrolling, what made them send a piece to a friend, and exactly where they lost interest and left. Writing, deleting, rewriting: the loop was a teacher that never flattered me.
    </p>
    <p>
      By the time I stopped, the account had crossed seven million views all-time. I later purged most of it; about 1.7 million views are still public today. The big number came from a teenager skipping homework to chase a refresh button, which is either tragic or the most useful thing I ever did by accident.
    </p>
    <ProsePullQuote cite="the lesson, learned twice">
      You cannot tell yourself you are good at something. Other people have to tell you.
    </ProsePullQuote>
    <p>
      That is the line my friend landed on in his essay. It is the one I would put on a wall. For a couple of years I competed with adults who had been paid to write for decades. The only scoreboard that counted was whether real people kept reading. You can believe your own work is brilliant. I did, constantly. The belief is worth nothing until someone who is not you confirms it.
    </p>
    <h2>3. Why the pseudonym mattered</h2>
    <p>
      Allen Kinney was not hiding. He was a clean slate. Nobody upvoted him out of friendship or pity. When his answers worked, it was because they worked. When they failed, no reputation softened the landing.
    </p>
    <p>
      That is rare, and worth chasing on purpose. Most feedback we get is contaminated by who we are to the person giving it. A pseudonym stripped that out and left only the signal. It taught me to trust the cold number over the warm comment. The warm comment is usually about me. The number is about the work.
    </p>
    <h2>4. What it actually trained</h2>
    <p>
      I do not write on Quora anymore. I build communities. From the outside those look like different jobs. They are the same job.
    </p>
    <p>
      A community is a view counter you cannot fake. You can tell yourself the event was a hit, the curriculum is great, the tool is obviously worth adopting. None of it is true until the people you built it for tell you. And they tell you the same way strangers told me: by coming back, by bringing a friend, by shipping something and posting it without being asked.
    </p>
    <p>
      I grew a tech community from one campus club to more than thirty chapters. I was not running a marketing plan. I was watching the counter. Which chapters kept meeting after the founder graduated. Which events people crossed a city to attend. Which formats quietly died at two hundred views. Same instinct, bigger room.
    </p>
    <p>
      That instinct is the one I would bring to building Cognition's developer community. Not telling developers Devin is good, which is just me upvoting my own answer. Building the place where they tell each other, where the signal is loud and honest, and where the community itself is the verdict. The best version of that job is a view counter for an entire ecosystem. I have been learning to read one since I was fourteen.
    </p>
    <p>
      See{" "}
      <a href="/blog/brewing-community-90-days/">what I'd build in the first 90 days</a>
      , or <a href="/about#contact">get in touch</a>.
    </p>
  </>
)

export default Content
