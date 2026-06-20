import React, { type FC } from "react"
import { ProseWaxFigure } from "@/components/prose/ProseWaxFigure"
import { StatGrid, Stat } from "@/components/prose/StatGrid"
import { EventList, EventItem } from "@/components/prose/EventList"

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

    <StatGrid>
      <Stat value="30+">Cafe Cognition cities (target Year 1)</Stat>
      <Stat value="4">Devin Days flagship hubs</Stat>
      <Stat value="3">ambassador tiers</Stat>
      <Stat value="1">weekly Devin office Hours</Stat>
    </StatGrid>

    <h2>Upcoming events</h2>

    <p>
      A sample of a plausible global Cafe Cognition calendar. Events centralize on Luma the way Cursor centralizes theirs.
    </p>

    <EventList>
      <EventItem name="Devin Day SF" place="San Francisco, USA" date="Jul 12" />
      <EventItem name="Cafe Cognition NYC" place="New York, USA" date="Jul 15" />
      <EventItem name="Devin Builders Meetup" place="Austin, USA" date="Jul 18" />
      <EventItem name="Orchestrating Fleets of Devins" place="London, UK" date="Jul 22" />
      <EventItem name="Devin Hack Night" place="Bangalore, India" date="Jul 26" />
      <EventItem name="Cafe Cognition Berlin" place="Berlin, Germany" date="Jul 29" />
      <EventItem name="Devin office Hours (virtual)" place="Remote" date="Aug 1" />
      <EventItem name="Non-coding Devin: Research &amp; Docs" place="Toronto, Canada" date="Aug 5" />
    </EventList>

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
