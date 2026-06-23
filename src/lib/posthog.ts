import posthog from "posthog-js"

declare global {
  interface Window {
    __onboardingName?: string
  }
}

let initialized = false

export function initPostHog() {
  if (initialized) return
  const key = process.env.GATSBY_POSTHOG_KEY
  const host = process.env.GATSBY_POSTHOG_HOST
  if (!key || !host) return
  posthog.init(key, {
    api_host: host,
    autocapture: false,
    disable_session_recording: true,
    loaded: (ph) => {
      if (typeof window !== "undefined" && window.__onboardingName) {
        ph.capture("onboarding_name_entered", { name: window.__onboardingName })
        ph.identify(window.__onboardingName)
      }
    },
  })
  initialized = true
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (!initialized) return
  posthog.capture(event, properties)
}

export function identifyUser(id: string, properties?: Record<string, unknown>) {
  if (!initialized) return
  posthog.identify(id, properties)
}
