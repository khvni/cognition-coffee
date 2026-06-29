import { createPostHogClient } from "../lib/posthog"

interface Env {
  ADMIN_PASSWORD: string
  POSTHOG_KEY: string
  POSTHOG_HOST: string
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { password } = await context.request.json() as { password: string }
  if (password !== context.env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: "Invalid password" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  if (context.env.POSTHOG_KEY && context.env.POSTHOG_HOST) {
    const posthog = createPostHogClient(context.env)
    posthog.capture({ distinctId: "admin", event: "admin_logged_in" })
    await posthog.shutdown()
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `admin_session=${btoa(password)}; Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=86400`,
    },
  })
}
