interface Env {
  GITHUB_TOKEN: string
  GITHUB_REPO: string
  ADMIN_PASSWORD: string
}

interface OrderingOption {
  label: string
  choices: string[]
  multi?: boolean
}

interface MenuItem {
  id: string
  name: string
  image: string
  subcaption: string
  description: string
  breakdown: string[]
  orderingOptions: OrderingOption[]
}

interface MenuSection {
  id: string
  title: string
  subtitle: string
  items: MenuItem[]
}

const FILE_PATH = "content/menu.json"

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

async function getMenuFile(env: Env): Promise<{ content: MenuSection[]; sha: string }> {
  const res = await fetch(
    `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${FILE_PATH}`,
    { headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, "User-Agent": "cognition-coffee-admin" } }
  )
  if (!res.ok) {
    if (res.status === 404) return { content: [], sha: "" }
    throw new Error(`GitHub API error: ${res.status}`)
  }
  const data = await res.json() as { content: string; sha: string }
  const decoded = atob(data.content.replace(/\n/g, ""))
  return { content: JSON.parse(decoded), sha: data.sha }
}

async function writeMenuFile(env: Env, menu: MenuSection[], sha: string, message: string): Promise<void> {
  const body: Record<string, string> = {
    message,
    content: btoa(JSON.stringify(menu, null, 2)),
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
  const { content } = await getMenuFile(context.env)
  return new Response(JSON.stringify(content), {
    headers: { "Content-Type": "application/json" },
  })
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
  if (!isAuthed(context.request, context.env)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  const incoming = await context.request.json() as MenuSection[]
  if (!Array.isArray(incoming)) {
    return new Response(JSON.stringify({ error: "Menu must be an array of sections" }), { status: 400 })
  }

  const { content: current, sha } = await getMenuFile(context.env)
  const updated = incoming.length ? incoming : current

  await writeMenuFile(context.env, updated, sha, "content: update menu")
  return new Response(JSON.stringify(updated), { headers: { "Content-Type": "application/json" } })
}
