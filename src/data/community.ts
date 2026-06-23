export const communityPhotos: { src: string; alt: string; caption: string }[] = [
  { src: "/community/cafe-coding-1.jpg", alt: "People laughing and coding together at a cafe", caption: "Cognition Coffee, SF" },
  { src: "/community/park-coding-2.jpg", alt: "Two developers pair programming on a project", caption: "Hack Night, Lagos" },
  { src: "/community/beach-coding-7.jpg", alt: "Group of builders hacking at a table with laptops", caption: "Devin Workshop, Berlin" },
  { src: "/community/nature-coding-8.jpg", alt: "Person coding on a laptop at a cafe window", caption: "Builders everywhere" },
  { src: "/community/coworking-4.jpg", alt: "People collaborating at a coworking meetup", caption: "AI Builders Night, Vienna" },
  { src: "/community/library-coding-3.jpg", alt: "Team building together at a community event", caption: "Hackathon, São Paulo" },
]

export const links = {
  luma: "https://lu.ma/devin",
  ambassador: "https://docs.google.com/forms/d/e/1FAIpQLSfMxOlLzPnG1-o8AoyrG4L-LoFZiJpJ-gZKJwgkr7MvhMVu8Q/viewform",
  eventSupport: "mailto:community@cognition.ai",
  discord: "https://discord.com/invite/GjCYNGChrw",
}

type FaqLink = { label: string; href: string; external?: boolean }

export const faqs: { question: string; answer: string; links?: FaqLink[] }[] = [
  {
    question: "What is the Devin community?",
    answer: "A global group of builders, hosts, and teams who ship with Devin online and in person.",
    links: [{ label: "Join Discord", href: links.discord }],
  },
  {
    question: "How do I join?",
    answer: "Jump into Discord to meet everyone, or find a local event near you.",
    links: [
      { label: "Join Discord", href: links.discord },
      { label: "Find events", href: links.luma },
    ],
  },
  {
    question: "How do I host an event?",
    answer: "We can help with venue, funding, and swag. Reach out and we will get you started.",
    links: [{ label: "Get event support", href: links.eventSupport, external: false }],
  },
  {
    question: "What is the ambassador program?",
    answer: "Devin Ambassadors lead local communities, host events, and unlock Contributor, Editor, and Correspondent tiers.",
    links: [{ label: "Apply to lead", href: links.ambassador }],
  },
  {
    question: "How is Devin on Campus different?",
    answer: "Devin on Campus is for student-run university chapters. Ambassadors lead city and regional communities.",
  },
]
