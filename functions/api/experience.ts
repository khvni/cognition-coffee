interface Env {
  GITHUB_TOKEN: string
  GITHUB_REPO: string
  ADMIN_PASSWORD: string
}

interface WorkEntry {
  mark: string
  markClass: string
  company: string
  role: string
  date: string
  logo?: string
}

const FILE_PATH = "content/experience.json"

const DEFAULT_ENTRIES: WorkEntry[] = [
  { mark: "K", markClass: "bg-[#5f7f62]", company: "Keysight", role: "Growth Insights & AI", date: "Current", logo: "" },
  { mark: "M", markClass: "bg-[#527899]", company: "MTC", role: "Founder", date: "2023-present", logo: "" },
  { mark: "B", markClass: "bg-[#151515]", company: "Bloom AI", role: "Co-Founder & CEO", date: "2025", logo: "" },
  { mark: "F", markClass: "bg-[#777]", company: "Five9", role: "Security SWE Intern", date: "2024", logo: "" },
]

function encodeBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)))
}

function decodeBase64(b64: string): string {
  return decodeURIComponent(escape(atob(b64)))
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

async function getExperienceFile(env: Env): Promise<{ content: WorkEntry[]; sha: string }> {
  const res = await fetch(
    `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${FILE_PATH}`,
    { headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, "User-Agent": "cognition-coffee-admin" } }
  )
  if (!res.ok) {
    if (res.status === 404) return { content: DEFAULT_ENTRIES, sha: "" }
    throw new Error(`GitHub API error: ${res.status}`)
  }
  const data = await res.json() as { content: string; sha: string }
  const decoded = decodeBase64(data.content.replace(/\n/g, ""))
  return { content: JSON.parse(decoded), sha: data.sha }
}

async function writeExperienceFile(env: Env, entries: WorkEntry[], sha: string, message: string): Promise<void> {
  const body: Record<string, string> = {
    message,
    content: encodeBase64(JSON.stringify(entries, null, 2)),
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
  try {
    const { content } = await getExperienceFile(context.env)
    return new Response(JSON.stringify(content), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Fetch failed" }), { status: 500 })
  }
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
  if (!isAuthed(context.request, context.env)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  try {
    const incoming = await context.request.json() as WorkEntry[]
    if (!Array.isArray(incoming)) {
      return new Response(JSON.stringify({ error: "Experience must be an array of entries" }), { status: 400 })
    }

    const { content: current, sha } = await getExperienceFile(context.env)
    const updated = incoming.length ? incoming : current

    await writeExperienceFile(context.env, updated, sha, "content: update experience")
    return new Response(JSON.stringify(updated), { headers: { "Content-Type": "application/json" } })
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Save failed" }), { status: 500 })
  }
}
