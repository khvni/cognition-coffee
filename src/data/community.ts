/**
 * Devin Community - stats, voices, events, and program data.
 * Stats and quotes provided by project owner. Verify before publishing.
 */

export const CITIES = [
  "Barcelona", "Tokyo", "Nairobi", "San Francisco", "London", "São Paulo",
  "Berlin", "Bangalore", "New York", "Seoul", "Lagos", "Vancouver",
]

export const STATS = [
  { value: "58+", label: "cities" },
  { value: "1,400+", label: "attendees" },
  { value: "12x", label: "productivity" },
  { value: "$492M", label: "run-rate" },
]

export type Voice = { name?: string; handle: string; text: string }

export const VOICES: Voice[] = [
  { name: "Scott Wu", handle: "@ScottWu46", text: "We merged 154 Devin PRs internally at Cognition in our best week" },
  { name: "Morgan Linton", handle: "@morganlinton", text: "Using Devin's model to start, SWE-1.6 Fast. And holy moly, is it fast." },
  { handle: "@trillhause_", text: "This is the first cloud agent that feels good" },
  { name: "Piyush Puri", handle: "@ppuri96", text: "Devin works like an autonomous engineer that you interact with through Slack, Linear, and GitHub" },
  { handle: "@kr0der", text: "i tried Devin when it was released and tried it again now, and i can confirm this billboard is true" },
  { name: "Peter Yang", handle: "@petergyang", text: "Have to give the Devin/Windsurf team flowers for staying... I know many AI native builders who love Devin now" },
]

export const EVENTS = [
  { name: "Devin Hackathon: Agents Of Chaos", city: "Vancouver", date: "Jul 4" },
  { name: "AI Builders Night", city: "Vienna", date: "Jul 10" },
  { name: "Devin Medellin Workshop", city: "Medellín", date: "Jul 15" },
  { name: "Hackathon Cognition São Paulo", city: "São Paulo", date: "Jul 18" },
  { name: "Cognition Coffee Berlin", city: "Berlin", date: "Jul 22" },
  { name: "Devin Hack Night", city: "Bangalore", date: "Jul 25" },
  { name: "Devin Office Hours", city: "Remote", date: "Jul 29" },
  { name: "Orchestrating Fleets of Devins", city: "London", date: "Aug 1" },
]

export const EVENT_FORMATS = [
  { name: "Cognition Coffee", desc: "Cafe takeovers — builders meet over espresso and ship side-projects with Devin." },
  { name: "Hack Nights", desc: "Evening build sessions. Bring a laptop, leave with a deployed project." },
  { name: "Workshops", desc: "Hands-on on playbooks, fleet orchestration, and advanced prompting." },
  { name: "Office Hours", desc: "Weekly live sessions with the Devin team. Ask anything." },
]

export const AMBASSADOR_TIERS = [
  { name: "Student Builder", desc: "Students and early-career devs building with Devin.", perks: ["API credits", "Community recognition", "Devin swag"] },
  { name: "Community Organizer", desc: "Run local chapters and events in your city.", perks: ["Compute credits", "Early access", "Product feedback channel", "Event funding"] },
  { name: "Enterprise Champion", desc: "Ship Devin at scale inside your org.", perks: ["Priority API/compute", "Direct eng Slack", "Early access", "Speaking opportunities", "Custom swag"] },
]

export const COMMUNITY_LINKS = [
  { label: "Discord", href: "https://discord.gg/GjCYNGChrw", desc: "Daily conversation, project showcases, help threads" },
  { label: "Events on Luma", href: "https://lu.ma/devin", desc: "Global event calendar — find a chapter near you" },
  { label: "GitHub Discussions", href: "https://github.com/cognition-labs/devin/discussions", desc: "Long-form questions, RFCs, community playbooks" },
]
