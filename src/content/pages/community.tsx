import React, { type FC } from "react"
import { ProseWaxFigure } from "@/components/prose/ProseWaxFigure"

export const frontmatter = {
  title: "Community",
  description:
    "A redesigned home for the Devin community: chapters, events, and a weekly feedback loop.",
  eyebrow: "Community",
}

const Content: FC = () => (
  <>
    <p>
      A developer community isn't an audience. It's an operating system: curriculum, local chapters, and a feedback loop that makes the product better. Here's what that could look like for Devin.
    </p>

    <h2>What this could look like</h2>

    <ul>
      <li>
        <strong>30+</strong> Cafe Cognition cities (target Year 1)
      </li>
      <li>
        <strong>4</strong> Devin Days flagship hubs
      </li>
      <li>
        <strong>3</strong> ambassador tiers
      </li>
      <li>
        <strong>1</strong> weekly Devin office Hours
      </li>
    </ul>

    <h2>Upcoming events</h2>

    <p>
      A sample of a plausible global Cafe Cognition calendar. Events centralize on Luma the way Cursor centralizes theirs.
    </p>

    <ul>
      <li>
        <strong>Devin Day SF</strong> — San Francisco, USA · Jul 12
      </li>
      <li>
        <strong>Cafe Cognition NYC</strong> — New York, USA · Jul 15
      </li>
      <li>
        <strong>Devin Builders Meetup</strong> — Austin, USA · Jul 18
      </li>
      <li>
        <strong>Orchestrating Fleets of Devins</strong> — London, UK · Jul 22
      </li>
      <li>
        <strong>Devin Hack Night</strong> — Bangalore, India · Jul 26
      </li>
      <li>
        <strong>Cafe Cognition Berlin</strong> — Berlin, Germany · Jul 29
      </li>
      <li>
        <strong>Devin office Hours (virtual)</strong> — Remote · Aug 1
      </li>
      <li>
        <strong>Non-coding Devin: Research &amp; Docs</strong> — Toronto, Canada · Aug 5
      </li>
    </ul>

    <h2>Voices from the community</h2>

    <ProseWaxFigure caption="Representative community voices">
      <p>
        "Cafe Cognition was the first time I met other Devin users IRL. Shipped a PR during the event." — Priya S., Bangalore
      </p>
      <p>
        "Running 5 Devins in parallel changed how I think about delegation." — Marcus T., Berlin
      </p>
      <p>
        "Office Hours every Thursday is my anchor. The community unblocks me faster than any docs." — Yuki M., Tokyo
      </p>
    </ProseWaxFigure>

    <h2>Get involved</h2>

    <p>
      Join the conversation on{" "}
      <a href="https://discord.gg/GjCYNGChrw">Discord</a>, and watch this space for the first Cafe Cognition near you.
    </p>
  </>
)

export default Content
