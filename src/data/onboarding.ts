export type OnboardingStep = {
  id: string
  lines: string[]
  type?: "yn" | "input" | "continue" | "final"
  /** Free-text input prompt. Used when type is "input". */
  input?: { prompt: string; next: string; placeholder?: string }
  /** Next step for "yn" or "continue" types. */
  next?: string
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
      "",
      "Ready to enter?",
    ],
    type: "yn",
    next: "name",
  },
  {
    id: "name",
    lines: ["Before we begin - what should I call you?"],
    type: "input",
    input: { prompt: "What's your first name?", next: "pitch", placeholder: "your first name" },
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
      "",
      "Press Enter to continue.",
    ],
    type: "continue",
    next: "launch",
  },
  {
    id: "launch",
    lines: [
      "Loading desktop...",
      "",
      "Welcome to Cognition Coffee.",
      "",
      "Press Enter to begin.",
    ],
    type: "final",
    final: true,
  },
]
