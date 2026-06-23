interface Env {
  GITHUB_TOKEN: string
  GITHUB_REPO: string
  ADMIN_PASSWORD: string
}

interface AboutContent {
  description: string
  paragraphs: string[]
}

const FILE_PATH = "content/about.json"

const DEFAULT_CONTENT: AboutContent = {
  description: "Community builder in the Bay Area. I work on GTM at Keysight and founded MTC.",
  paragraphs: [
    "I'm a community builder in the Bay Area. I work on go-to-market at Keysight, finding ways to put AI to work across the business.",
    "Before that I founded MTC, a national tech nonprofit that grew from one Berkeley club to 30+ chapters across North America. My background runs through software, security, data, and AI at startups and public companies.",
    "I built this site with Devin to prove what a community for the first AI software engineer could be.",
  ],
}

function isAuthed(request: Request, env: Env): boolean {
  const cookie = request.headers.get("Cookie") || ""
  const match = cookie.match(/admin_session=([^;]+)/)
  if (!match) return false
  try {
    return atob(match[1]) === env.ADMIN_PASSWORD
  } catch {
    return false
  }
}

async function getAboutFile(env: Env): Promise<{ content: AboutContent; sha: string }> {
  const res = await fetch(
    `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${FILE_PATH}`,
    { headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, "User-Agent": "cognition-coffee-admin" } }
  )
  if (!res.ok) {
    if (res.status === 404) return { content: DEFAULT_CONTENT, sha: "" }
    throw new Error(`GitHub API error: ${res.status}`)
  }
  const data = await res.json() as { content: string; sha: string }
  const decoded = atob(data.content.replace(/\n/g, ""))
  return { content: JSON.parse(decoded), sha: data.sha }
}

async function writeAboutFile(env: Env, content: AboutContent, sha: string, message: string): Promise<void> {
  const body: Record<string, string> = {
    message,
    content: btoa(JSON.stringify(content, null, 2)),
    branch: "main",
  }
  if (sha) body.sha = sha

  const res = await fetch(
    `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${FILE_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        "User-Agent": "cognition-coffee-admin",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  )
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GitHub write failed: ${res.status} ${err}`)
  }
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { content } = await getAboutFile(context.env)
  return new Response(JSON.stringify(content), {
    headers: { "Content-Type": "application/json" },
  })
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
  if (!isAuthed(context.request, context.env)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  const incoming = await context.request.json() as Partial<AboutContent>
  const { content: current, sha } = await getAboutFile(context.env)

  const updated: AboutContent = {
    description: typeof incoming.description === "string" ? incoming.description : current.description,
    paragraphs: Array.isArray(incoming.paragraphs) ? incoming.paragraphs.filter((p) => typeof p === "string") : current.paragraphs,
  }

  await writeAboutFile(context.env, updated, sha, "content: update about page")
  return new Response(JSON.stringify(updated), { headers: { "Content-Type": "application/json" } })
}
