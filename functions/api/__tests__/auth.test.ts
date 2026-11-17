import { describe, expect, it, vi, afterEach } from "vitest"

const { onRequestPost: login } = await import("../auth")
const { onRequestPost: createPost } = await import("../posts/index")

const env = {
  ADMIN_PASSWORD: "s3cret-coffee",
  GITHUB_TOKEN: "test-token",
  GITHUB_REPO: "khvni/cognition-coffee",
  POSTHOG_KEY: "",
  POSTHOG_HOST: "",
}

function ctx(request: Request) {
  return { request, env } as never
}

function loginRequest() {
  return new Request("https://site/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: env.ADMIN_PASSWORD }),
  })
}

function postRequest(cookie?: string) {
  return new Request("https://site/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: JSON.stringify({ title: "t", excerpt: "e", content: "c", slug: "existing" }),
  })
}

function sessionCookie(res: Response): string {
  const setCookie = res.headers.get("Set-Cookie") || ""
  return setCookie.split(";")[0].split("=").slice(1).join("=")
}

const stubGithub = () =>
  vi.stubGlobal(
    "fetch",
    vi.fn(async () =>
      new Response(
        JSON.stringify({ content: btoa(JSON.stringify([{ slug: "existing" }])), sha: "x" })
      )
    )
  )

afterEach(() => vi.unstubAllGlobals())

describe("admin session", () => {
  it("does not embed the admin password in the session cookie", async () => {
    const res = await login(ctx(loginRequest()))
    expect(res.status).toBe(200)
    const value = sessionCookie(res)
    expect(value).not.toBe(btoa(env.ADMIN_PASSWORD))
    let decoded = ""
    try {
      decoded = atob(value)
    } catch {}
    expect(decoded).not.toBe(env.ADMIN_PASSWORD)
  })

  it("accepts the issued cookie and rejects a password-derived one", async () => {
    stubGithub()
    const res = await login(ctx(loginRequest()))
    const authed = await createPost(ctx(postRequest(`admin_session=${sessionCookie(res)}`)))
    expect(authed.status).toBe(409) // past auth, hit the duplicate-slug check

    const stale = await createPost(ctx(postRequest(`admin_session=${btoa(env.ADMIN_PASSWORD)}`)))
    expect(stale.status).toBe(401)

    const anon = await createPost(ctx(postRequest()))
    expect(anon.status).toBe(401)
  })
})
