interface Env {
  GITHUB_TOKEN: string
  GITHUB_REPO: string
  ADMIN_PASSWORD: string
}

const DIR = "static/blog/images"
const MAX_BYTES = 5_000_000
const ALLOWED = new Set(["image/png", "image/jpeg", "image/gif", "image/webp", "image/svg+xml"])

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

function extFromType(type: string): string {
  const map: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/svg+xml": "svg",
  }
  return map[type] ?? "bin"
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  if (!isAuthed(context.request, context.env)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  try {
    const form = await context.request.formData()
    const file = form.get("file")
    if (!(file instanceof File)) {
      return new Response(JSON.stringify({ error: "No file provided" }), { status: 400 })
    }
    if (!ALLOWED.has(file.type)) {
      return new Response(JSON.stringify({ error: `Unsupported type: ${file.type}` }), { status: 400 })
    }
    if (file.size > MAX_BYTES) {
      return new Response(JSON.stringify({ error: "File too large (5 MB max)" }), { status: 413 })
    }

    const id = crypto.randomUUID().slice(0, 8)
    const ext = extFromType(file.type)
    const filename = `${id}.${ext}`
    const path = `${DIR}/${filename}`
    const bytes = new Uint8Array(await file.arrayBuffer())
    let b64 = ""
    for (let i = 0; i < bytes.length; i++) b64 += String.fromCharCode(bytes[i])
    const content = btoa(b64)

    const res = await fetch(
      `https://api.github.com/repos/${context.env.GITHUB_REPO}/contents/${path}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${context.env.GITHUB_TOKEN}`,
          "User-Agent": "cognition-coffee-admin",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: `content: upload image ${filename}`, content, branch: "main" }),
      }
    )
    if (!res.ok) {
      const err = await res.text()
      throw new Error(`GitHub write failed: ${res.status} ${err}`)
    }

    return new Response(JSON.stringify({ url: `/blog/images/${filename}` }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Upload failed" }), { status: 500 })
  }
}
