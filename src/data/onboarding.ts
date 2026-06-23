export type OnboardingStep = {
  id: string
  lines: string[]
  choices?: { label: string; next: string }[]
  final?: boolean
}

export const ONBOARDING_FLOW: OnboardingStep[] = [
  {
    id: "boot",
    lines: [
      "POST... OK",
      "MEM 8192K... VERIFIED",
      "LOADING COGNITION COFFEE OS v0.1.0",
      "",
      "Welcome to the Cognition Coffee terminal.",
      "You've found the back room. Not many people make it here.",
    ],
    choices: [{ label: "> Initialize", next: "pitch" }],
  },
  {
    id: "pitch",
    lines: [
      "This is Ali Khani's pitch for building Cognition's developer community.",
      "",
      "The thesis is simple:",
      "Devin gives engineers superpowers.",
      "The community teaches the world how to use them.",
      "",
      "This entire site was built with Devin - to show, not tell, what's possible.",
    ],
    choices: [
      { label: "> Tell me about the design", next: "design" },
      { label: "> I'm ready to explore", next: "launch" },
    ],
  },
  {
    id: "design",
    lines: [
      "Cognition gave Devin his own machine. A full VM to think and build in.",
      "This site borrows that idea - a virtual desktop you can explore.",
      "",
      "It's also a nod to the internet cafes of the early 2000s.",
      "When going online felt like going somewhere.",
    ],
    choices: [
      { label: "> What are the programs?", next: "programs" },
      { label: "> Let's begin", next: "launch" },
    ],
  },
  {
    id: "programs",
    lines: [
      "Three programs, like items on a cafe menu:",
      "",
      "  House Roast - curriculum and workshops for learning to work with Devin.",
      "  Single-Origin - local meetups and office hours in 30+ cities.",
      "  Roasters' Guild - a three-tier ambassador program for Devin advocates.",
      "",
      "Each one is designed to scale. Browse the Menu to see the full breakdown.",
    ],
    choices: [{ label: "> Let's begin", next: "launch" }],
  },
  {
    id: "launch",
    lines: [
      "Loading desktop...",
      "",
      "Welcome to Cognition Coffee.",
    ],
    final: true,
  },
]
