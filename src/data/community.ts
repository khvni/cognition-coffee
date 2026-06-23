export const cities = [
  "Barcelona", "Tokyo", "Nairobi", "San Francisco", "London",
  "S\u00e3o Paulo", "Berlin", "Bangalore", "New York", "Seoul",
  "Lagos", "Vancouver", "Bogot\u00e1", "Vienna",
]

export const stats = [
  { value: "58+", label: "cities" },
  { value: "1,400+", label: "attendees" },
  { value: "12\u00d7", label: "productivity" }, // TODO: verify source
  { value: "$492M", label: "run-rate" }, // TODO: verify source
]

export type WireEntry = {
  tag: string
  time: string
  text: string
  author?: string
  href?: string
}

export const wire: WireEntry[] = [
  { tag: "VOICE", time: "Jun 21", author: "@kr0der", text: "\u201ci tried Devin when it was released and tried it again now, and i can confirm this billboard is true\u201d" },
  { tag: "EVENT", time: "Jul 4", text: "Devin Hackathon: Agents Of Chaos \u2014 Vancouver", href: "https://lu.ma/devin" },
  { tag: "VOICE", time: "Jun 19", author: "@morganlinton", text: "\u201cHoly moly, is it fast\u201d" },
  { tag: "PRESS", time: "Jun 18", text: "Goldman Sachs testing Devin AI" },
  { tag: "MEDIA", time: "Jun 15", text: "CodeWithHarry: 558K views \u2014 I Tried Devin" },
  { tag: "VOICE", time: "Jun 14", author: "@petergyang", text: "\u201cHave to give the Devin/Windsurf team flowers\u201d" },
]

export const tagColor: Record<string, string> = {
  VOICE: "text-muted bg-panel",
  EVENT: "text-accent-ink bg-accent/10",
  PRESS: "text-muted bg-panel",
  MEDIA: "text-muted bg-panel",
}

export const voices = [
  { name: "Scott Wu", handle: "@ScottWu46", text: "We merged 154 Devin PRs internally at Cognition in our best week" },
  { name: "Piyush Puri", handle: "@ppuri96", text: "Devin works like an autonomous engineer that you interact with through Slack, Linear, and GitHub" },
  { handle: "@trillhause_", text: "This is the first cloud agent that feels good" },
  { name: "Morgan Linton", handle: "@morganlinton", text: "Using Devin\u2019s model to start, SWE-1.6 Fast. And holy moly, is it fast." },
  { handle: "@kr0der", text: "i tried Devin when it was released and tried it again now, and i can confirm this billboard is true" },
  { name: "Peter Yang", handle: "@petergyang", text: "Have to give the Devin/Windsurf team flowers for staying\u2026 I know many AI native builders who love Devin now" },
]

export const events = [
  { name: "Devin Hackathon: Agents Of Chaos", city: "Vancouver", date: "Jul 4" },
  { name: "AI Builders Night", city: "Vienna", date: "Jul 10" },
  { name: "Devin Medell\u00edn Workshop", city: "Medell\u00edn", date: "Jul 15" },
  { name: "Hackathon Cognition S\u00e3o Paulo", city: "S\u00e3o Paulo", date: "Jul 18" },
  { name: "Cognition Coffee Berlin", city: "Berlin", date: "Jul 22" },
  { name: "Devin Hack Night", city: "Bangalore", date: "Jul 25" },
  { name: "Devin Office Hours", city: "Remote", date: "Jul 29" },
  { name: "Orchestrating Fleets of Devins", city: "London", date: "Aug 1" },
]

export const formats = [
  { name: "Cognition Coffee", desc: "Cafe takeovers \u2014 builders meet over espresso and ship side-projects with Devin." },
  { name: "Hack Nights", desc: "Evening build sessions. Bring a laptop, leave with a deployed project." },
  { name: "Workshops", desc: "Hands-on playbooks, fleet orchestration, and advanced prompting patterns." },
  { name: "Office Hours", desc: "Weekly live sessions with the Devin team. Ask anything." },
]

export const tiers = [
  { name: "Student Builder", desc: "Students and early-career devs building with Devin.", perks: ["API credits", "Community recognition", "Devin swag"] },
  { name: "Community Organizer", desc: "Run local chapters and events in your city.", perks: ["Compute credits", "Early access", "Product feedback channel", "Event funding"] },
  { name: "Enterprise Champion", desc: "Ship Devin at scale inside your org.", perks: ["Priority API/compute", "Direct eng Slack", "Early access", "Speaking opportunities"] },
]

export const links = [
  { label: "Discord", href: "https://discord.gg/GjCYNGChrw", desc: "Daily conversation, project showcases, help threads" },
  { label: "Events on Luma", href: "https://lu.ma/devin", desc: "Global event calendar \u2014 find a chapter near you" },
  { label: "GitHub Discussions", href: "https://github.com/cognition-labs/devin/discussions", desc: "Long-form questions, RFCs, community playbooks" },
]
