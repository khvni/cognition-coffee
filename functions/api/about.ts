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

function encodeBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)))
}

function decodeBase64(b64: string): string {
  return decodeURIComponent(escape(atob(b64)))
}

const DEFAULT_CONTENT: AboutContent = {
  description: "Software engineer by day, community builder by night, based in Berkeley. I automate GTM at Keysight and founded MTC, now 30+ chapters across North America.",
  paragraphs: [
    "Software engineer by day, community builder by night.",
    "In high school, I wrote on Quora under a pseudonym and went viral with 7M+ views.",
    "In college, I founded MTC - a home for Muslim builders to solve the world's problems, now across 30+ of North America's greatest universities and cities.",
    "At Keysight, I'm automating GTM workflows across every industry vertical to help unlock the next billion dollars in revenue.",
    "I've hosted various hackathons, build nights, technical workshops, fireside chats, panels, and every other variation of a tech event you can think of. I've spoken at conferences and taught Berkeley's foundational CS 61A and CS 61B courses to thousands of students.",
    "I play tennis in SF, roadtrip around California every chance I get, and am currently learning photography with my wife's Fujifilm X-S20.",
    "What I do is who I am: leveraging my talents, in pursuit of excellence, to do good in this world.",
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
  const decoded = decodeBase64(data.content.replace(/\n/g, ""))
  return { content: JSON.parse(decoded), sha: data.sha }
}

async function writeAboutFile(env: Env, content: AboutContent, sha: string, message: string): Promise<void> {
  const body: Record<string, string> = {
    message,
    content: encodeBase64(JSON.stringify(content, null, 2)),
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

  try {
    const incoming = await context.request.json() as Partial<AboutContent>
    const { content: current, sha } = await getAboutFile(context.env)

    const updated: AboutContent = {
      description: typeof incoming.description === "string" ? incoming.description : current.description,
      paragraphs: Array.isArray(incoming.paragraphs) ? incoming.paragraphs.filter((p) => typeof p === "string") : current.paragraphs,
    }

    await writeAboutFile(context.env, updated, sha, "content: update about page")
    return new Response(JSON.stringify(updated), { headers: { "Content-Type": "application/json" } })
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Save failed" }), { status: 500 })
  }
}
