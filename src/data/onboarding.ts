export type OnboardingStep = {
  id: string
  lines: string[]
  choices?: {
    label: string
    next: string
  }[]
  final?: boolean
}

export const ONBOARDING_FLOW: OnboardingStep[] = [
  {
    id: 'boot',
    lines: [
      'POST check... OK. 640K ought to be enough for anybody.',
      'Loading cognition-coffee v0.1.0...',
      '',
      'Welcome to the Cognition Coffee terminal.',
      "You've found the back room. Not many people make it here.",
    ],
    choices: [{ label: '> Initialize', next: 'pitch' }],
  },
  {
    id: 'pitch',
    lines: [
      "This is Ali Khani's pitch for building Cognition's developer community.",
      'The thesis is simple:',
      'Devin gives engineers superpowers. The community teaches the world how to use them.',
      "This site was built with Devin \u2014 to show, not tell, what's possible.",
    ],
    choices: [
      { label: '> Tell me about the design', next: 'design' },
      { label: "> I'm ready to explore", next: 'launch' },
    ],
  },
  {
    id: 'design',
    lines: [
      'Cognition gave Devin his own machine. A full VM to think and build in.',
      'This site borrows that idea: a virtual desktop you can explore.',
      "It's a nod to internet cafes circa 2003 \u2014 when going online felt like going somewhere.",
    ],
    choices: [
      { label: '> What are the programs?', next: 'programs' },
      { label: "> Let's begin", next: 'launch' },
    ],
  },
  {
    id: 'programs',
    lines: [
      'Three programs, like items on a cafe menu:',
      "House Roast \u2014 curriculum and workshops for learning to work with Devin.",
      "Single-Origin \u2014 local meetups and office hours in 30+ cities.",
      "Roasters' Guild \u2014 a three-tier ambassador program for Devin advocates.",
    ],
    choices: [{ label: '> Begin', next: 'launch' }],
  },
  {
    id: 'launch',
    lines: [
      'The desktop is loading.',
      'Welcome to Cognition Coffee.',
    ],
    final: true,
  },
]
