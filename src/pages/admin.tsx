import React, { useState, useEffect, useCallback } from "react"
import type { HeadFC } from "gatsby"
import { SEO } from "@/components/SEO"
import { TiptapEditor } from "@/components/editor/Editor"

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}

type View = "list" | "edit"

const AdminPage: React.FC = () => {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")

  const [posts, setPosts] = useState<Post[]>([])
  const [view, setView] = useState<View>("list")
  const [editing, setEditing] = useState<Post | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [html, setHtml] = useState("")

  const fetchPosts = useCallback(async () => {
    const res = await fetch("/api/posts")
    if (res.ok) setPosts(await res.json())
  }, [])

  useEffect(() => {
    if (authed) fetchPosts()
  }, [authed, fetchPosts])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      setAuthed(true)
    } else {
      setAuthError("Wrong password")
    }
  }

  const openNew = () => {
    setEditing(null)
    setTitle("")
    setExcerpt("")
    setHtml("")
    setView("edit")
    setError("")
  }

  const openEdit = (post: Post) => {
    setEditing(post)
    setTitle(post.title)
    setExcerpt(post.excerpt)
    setHtml(post.content)
    setView("edit")
    setError("")
  }

  const handleSave = async () => {
    if (!title.trim()) { setError("Title required"); return }
    setSaving(true)
    setError("")

    const payload = { title, excerpt, content: html }
    const url = editing ? `/api/posts/${editing.slug}` : "/api/posts"
    const method = editing ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    setSaving(false)
    if (res.ok) {
      await fetchPosts()
      setView("list")
    } else {
      const data = await res.json().catch(() => ({ error: "Save failed" }))
      setError(data.error || "Save failed")
    }
  }

  const handleDelete = async (post: Post) => {
    if (!window.confirm(`Delete "${post.title}"?`)) return
    const res = await fetch(`/api/posts/${post.slug}`, { method: "DELETE" })
    if (res.ok) fetchPosts()
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
          <h1 className="text-2xl font-medium text-ink">Admin</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded border border-line bg-surface px-3 py-2 text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
          {authError && <p className="text-sm text-red-600">{authError}</p>}
          <button
            type="submit"
            className="w-full rounded bg-ink py-2 font-mono text-sm text-canvas hover:bg-accent-ink"
          >
            Log in
          </button>
        </form>
      </div>
    )
  }

  if (view === "edit") {
    return (
      <div className="mx-auto max-w-reader px-6 py-8">
        <button onClick={() => setView("list")} className="font-mono text-xs text-muted hover:text-ink">
          &larr; Back
        </button>
        <h1 className="mt-4 text-2xl font-medium text-ink">
          {editing ? "Edit post" : "New post"}
        </h1>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full rounded border border-line bg-surface px-3 py-2 text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Excerpt (optional)"
            className="w-full rounded border border-line bg-surface px-3 py-2 text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
          <TiptapEditor content={html} onChange={setHtml} />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded bg-ink px-4 py-2 font-mono text-sm text-canvas hover:bg-accent-ink disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-reader px-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-ink">Posts</h1>
        <button
          onClick={openNew}
          className="rounded bg-ink px-3 py-1.5 font-mono text-xs text-canvas hover:bg-accent-ink"
        >
          New post
        </button>
      </div>

      {posts.length === 0 ? (
        <p className="mt-8 text-muted">No posts yet.</p>
      ) : (
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {posts.map((post) => (
            <li key={post.slug} className="flex items-center justify-between py-4">
              <div>
                <p className="text-lg font-medium text-ink">{post.title}</p>
                <p className="font-mono text-xs text-muted">{post.date}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(post)}
                  className="rounded border border-line px-2 py-1 font-mono text-xs text-muted hover:text-ink"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post)}
                  className="rounded border border-line px-2 py-1 font-mono text-xs text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AdminPage

export const Head: HeadFC = () => <SEO title="Admin" />
