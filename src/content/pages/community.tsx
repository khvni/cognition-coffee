import React, { type FC } from "react"
import { StatGrid, Stat } from "@/components/prose/StatGrid"
import { EventList, EventItem } from "@/components/prose/EventList"

export const frontmatter = {
  title: "Community",
  description:
    "Chapters, events, and a weekly feedback loop for Devin builders.",
  eyebrow: "Community",
}

const Content: FC = () => (
  <>
    <p>
      Curriculum, local chapters, and a feedback loop that makes the product better.
    </p>

    <h2>Targets</h2>

    <StatGrid>
      <Stat value="30+">Cafe Cognition cities (target Year 1)</Stat>
      <Stat value="4">Devin Days flagship hubs</Stat>
      <Stat value="3">ambassador tiers</Stat>
      <Stat value="1">weekly Devin office Hours</Stat>
    </StatGrid>

    <h2>Upcoming events</h2>

    <p>
      A sample global Cafe Cognition calendar, centralized on Luma.
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

    <h2>Get involved</h2>

    <p>
      Join the conversation on{" "}
      <a href="https://discord.gg/GjCYNGChrw">Discord</a>.
    </p>
  </>
)

export default Content
