interface Env {
  GITHUB_TOKEN: string
  GITHUB_REPO: string
  ADMIN_PASSWORD: string
}

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}

const FILE_PATH = "content/posts.json"

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

async function getPostsFile(env: Env): Promise<{ content: Post[]; sha: string }> {
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

async function writePostsFile(env: Env, posts: Post[], sha: string, message: string): Promise<void> {
  const body: Record<string, string> = {
    message,
    content: btoa(JSON.stringify(posts, null, 2)),
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

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { content } = await getPostsFile(context.env)
  return new Response(JSON.stringify(content), {
    headers: { "Content-Type": "application/json" },
  })
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  if (!isAuthed(context.request, context.env)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  const { title, excerpt, content: html } = await context.request.json() as {
    title: string; excerpt: string; content: string
  }

  const { content: posts, sha } = await getPostsFile(context.env)
  const slug = slugify(title)

  if (posts.some((p) => p.slug === slug)) {
    return new Response(JSON.stringify({ error: "Post with this slug already exists" }), { status: 409 })
  }

  const post: Post = { slug, title, date: new Date().toISOString().split("T")[0], excerpt, content: html }
  posts.unshift(post)

  await writePostsFile(context.env, posts, sha, `content: add "${title}"`)
  return new Response(JSON.stringify(post), { status: 201, headers: { "Content-Type": "application/json" } })
}
