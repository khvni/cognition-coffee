import { PostHog } from "posthog-node"

export interface PostHogEnv {
  POSTHOG_KEY: string
  POSTHOG_HOST: string
}

export function createPostHogClient(env: PostHogEnv): PostHog {
  return new PostHog(env.POSTHOG_KEY, {
    host: env.POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
    enableExceptionAutocapture: true,
  })
}
