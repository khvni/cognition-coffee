export type OnboardingStep = {
  id: string
  lines: string[]
  choices?: { label: string; next: string }[]
  final?: boolean
}

export const ONBOARDING_FLOW: OnboardingStep[] = []
