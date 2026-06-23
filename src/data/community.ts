export const eventCities: { name: string; lat: number; lng: number }[] = [
  { name: "San Francisco", lat: 37.77, lng: -122.42 },
  { name: "New York", lat: 40.71, lng: -74.01 },
  { name: "London", lat: 51.51, lng: -0.13 },
  { name: "Tokyo", lat: 35.68, lng: 139.69 },
  { name: "Berlin", lat: 52.52, lng: 13.41 },
  { name: "São Paulo", lat: -23.55, lng: -46.63 },
  { name: "Bangalore", lat: 12.97, lng: 77.59 },
  { name: "Seoul", lat: 37.57, lng: 126.98 },
  { name: "Nairobi", lat: -1.29, lng: 36.82 },
  { name: "Barcelona", lat: 41.39, lng: 2.17 },
  { name: "Vancouver", lat: 49.28, lng: -123.12 },
  { name: "Lagos", lat: 6.52, lng: 3.38 },
  { name: "Vienna", lat: 48.21, lng: 16.37 },
  { name: "Bogotá", lat: 4.71, lng: -74.07 },
  { name: "Medellín", lat: 6.25, lng: -75.56 },
  { name: "Singapore", lat: 1.35, lng: 103.82 },
]

export const communityPhotos: { src: string; alt: string; caption: string }[] = [
  { src: "/community/cafe-coding-1.jpg", alt: "People laughing and coding together at a cafe", caption: "Cognition Coffee, SF" },
  { src: "/community/park-coding-2.jpg", alt: "Two developers pair programming on a project", caption: "Hack Night, Lagos" },
  { src: "/community/beach-coding-7.jpg", alt: "Group of builders hacking at a table with laptops", caption: "Devin Workshop, Berlin" },
  { src: "/community/nature-coding-8.jpg", alt: "Person coding on a laptop at a cafe window", caption: "Builders everywhere" },
  { src: "/community/coworking-4.jpg", alt: "People collaborating at a coworking meetup", caption: "AI Builders Night, Vienna" },
  { src: "/community/library-coding-3.jpg", alt: "Team building together at a community event", caption: "Hackathon, São Paulo" },
]

export const voices = [
  {
    text: "We merged 154 Devin PRs internally at Cognition in our best week.",
    author: "Scott Wu",
    handle: "@ScottWu46",
  },
  {
    text: "i tried Devin when it was released and tried it again now, and i can confirm this billboard is true",
    author: "",
    handle: "@kr0der",
  },
  {
    text: "Holy moly, is it fast.",
    author: "Morgan Linton",
    handle: "@morganlinton",
  },
  {
    text: "This is the first cloud agent that feels good.",
    author: "",
    handle: "@trillhause_",
  },
  {
    text: "Have to give the Devin/Windsurf team flowers for staying… I know many AI native builders who love Devin now.",
    author: "Peter Yang",
    handle: "@petergyang",
  },
  {
    text: "Devin works like an autonomous engineer that you interact with through Slack, Linear, and GitHub.",
    author: "Piyush Puri",
    handle: "@ppuri96",
  },
]

export const events = [
  { name: "Devin Hackathon: Agents Of Chaos", city: "Vancouver", date: "Jul 4" },
  { name: "AI Builders Night", city: "Vienna", date: "Jul 10" },
  { name: "Devin Workshop", city: "Medellín", date: "Jul 15" },
  { name: "Hackathon Cognition", city: "São Paulo", date: "Jul 18" },
  { name: "Cognition Coffee", city: "Berlin", date: "Jul 22" },
  { name: "Devin Hack Night", city: "Bangalore", date: "Jul 25" },
  { name: "Office Hours", city: "Remote", date: "Jul 29" },
  { name: "Orchestrating Fleets of Devins", city: "London", date: "Aug 1" },
]

export const links = {
  luma: "https://lu.ma/devin",
  ambassador: "https://docs.google.com/forms/d/e/1FAIpQLSfMxOlLzPnG1-o8AoyrG4L-LoFZiJpJ-gZKJwgkr7MvhMVu8Q/viewform",
  eventSupport: "mailto:community@cognition.ai",
  discord: "https://discord.com/invite/GjCYNGChrw",
}

export const redditLinks = [
  { name: "r/CognitionLabs", href: "https://reddit.com/r/CognitionLabs" },
  { name: "r/windsurf", href: "https://reddit.com/r/windsurf" },
  { name: "r/DevinAI", href: "https://reddit.com/r/DevinAI" },
  { name: "r/DevinDesktop", href: "https://reddit.com/r/DevinDesktop" },
]
