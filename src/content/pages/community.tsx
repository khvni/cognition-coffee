import React, { type FC } from "react"

export const frontmatter = {
  title: "Community",
  description: "Chapters, events, and a weekly feedback loop for Devin builders.",
  eyebrow: "Community",
}

const targets = [
  { value: "30+ cities", label: "Cafe Cognition cities (target Year 1)" },
  { value: "4 hubs", label: "Devin Days flagship hubs" },
  { value: "3 tiers", label: "Ambassador tiers" },
  { value: "1 weekly", label: "Devin Office hours" },
]

const events = [
  { name: "Devin Day SF", place: "San Francisco, USA", date: "Jul 12" },
  { name: "Cafe Cognition NYC", place: "New York, USA", date: "Jul 15" },
  { name: "Devin Builders Meetup", place: "Austin, USA", date: "Jul 18" },
  { name: "Orchestrating Fleets of Devins", place: "London, UK", date: "Jul 22" },
  { name: "Devin Hack Night", place: "Bangalore, India", date: "Jul 26" },
  { name: "Cafe Cognition Berlin", place: "Berlin, Germany", date: "Jul 29" },
  { name: "Devin office Hours (virtual)", place: "Remote", date: "Aug 1" },
  { name: "Non-coding Devin: Research & Docs", place: "Toronto, Canada", date: "Aug 5" },
]

const Content: FC = () => (
  <>
    <div className="intro-copy">
      <p>Curriculum, local chapters, and a feedback loop that makes the product better.</p>
      <p>A global calendar centralized on Luma, with chapters running in parallel across tech hubs.</p>
    </div>

    <section className="section-block mt-14" aria-labelledby="targets-heading">
      <h2 className="section-heading" id="targets-heading">Targets</h2>
      <ul className="entry-list">
        {targets.map((t) => (
          <li key={t.label} className="entry-row">
            <span className="entry-link">
              <strong>{t.value}</strong>
              <span>{t.label}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>

    <section className="section-block" aria-labelledby="events-heading">
      <h2 className="section-heading" id="events-heading">Upcoming events</h2>
      <ul className="entry-list dated-list">
        {events.map((e) => (
          <li key={e.name} className="entry-row">
            <span className="entry-link">
              <span>
                <strong>{e.name}</strong>
                <span className="block">{e.place}</span>
              </span>
              <time>{e.date}</time>
            </span>
          </li>
        ))}
      </ul>
    </section>

    <section className="section-block" aria-labelledby="involved-heading">
      <h2 className="section-heading" id="involved-heading">Get involved</h2>
      <p>
        Join the conversation on{" "}
        <a href="https://discord.gg/GjCYNGChrw">Discord</a>.
      </p>
    </section>
  </>
)

export default Content
