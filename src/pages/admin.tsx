import React, { useState, useEffect, useCallback } from "react"
import type { HeadFC } from "gatsby"
import { SEO } from "@/components/SEO"
import { TiptapEditor } from "@/components/editor/Editor"
import { ErrorBoundary } from "@/components/ErrorBoundary"

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}

interface AboutContent {
  description: string
  paragraphs: string[]
}

type View = "list" | "edit" | "about"

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
  const [slug, setSlug] = useState("")
  const [slugEdited, setSlugEdited] = useState(false)
  const [excerpt, setExcerpt] = useState("")
  const [html, setHtml] = useState("")

  const [aboutDesc, setAboutDesc] = useState("")
  const [aboutParagraphs, setAboutParagraphs] = useState<string[]>([""])
  const [aboutSaving, setAboutSaving] = useState(false)
  const [aboutError, setAboutError] = useState("")
  const [aboutSaved, setAboutSaved] = useState(false)

  const fetchPosts = useCallback(async () => {
    const res = await fetch("/api/posts")
    if (res.ok) setPosts(await res.json())
  }, [])

  const fetchAbout = useCallback(async () => {
    const res = await fetch("/api/about")
    if (!res.ok) return
    const data = await res.json() as AboutContent
    setAboutDesc(data.description ?? "")
    setAboutParagraphs(data.paragraphs?.length ? data.paragraphs : [""])
  }, [])

  useEffect(() => {
    if (authed) {
      fetchPosts()
      fetchAbout()
    }
  }, [authed, fetchPosts, fetchAbout])

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
    setSlug("")
    setSlugEdited(false)
    setExcerpt("")
    setHtml("")
    setView("edit")
    setError("")
  }

  const openEdit = (post: Post) => {
    setEditing(post)
    setTitle(post.title)
    setSlug(post.slug)
    setSlugEdited(false)
    setExcerpt(post.excerpt)
    setHtml(post.content)
    setView("edit")
    setError("")
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slugEdited && !editing) {
      setSlug(value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""))
    }
  }

  const handleSlugChange = (value: string) => {
    setSlugEdited(true)
    setSlug(value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
  }

  const handleSave = async () => {
    if (!title.trim()) { setError("Title required"); return }
    if (!slug.trim()) { setError("Slug required"); return }
    setSaving(true)
    setError("")

    const payload = { title, excerpt, content: html, slug }
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

  const handleAboutSave = async () => {
    setAboutSaving(true)
    setAboutError("")
    setAboutSaved(false)
    const paragraphs = aboutParagraphs.map((p) => p.trim()).filter(Boolean)
    const res = await fetch("/api/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: aboutDesc.trim(), paragraphs }),
    })
    setAboutSaving(false)
    if (res.ok) {
      const data = await res.json() as AboutContent
      setAboutDesc(data.description)
      setAboutParagraphs(data.paragraphs.length ? data.paragraphs : [""])
      setAboutSaved(true)
      setTimeout(() => setAboutSaved(false), 2000)
    } else {
      const data = await res.json().catch(() => ({ error: "Save failed" }))
      setAboutError(data.error || "Save failed")
    }
  }

  const updateParagraph = (i: number, value: string) => {
    setAboutParagraphs((prev) => prev.map((p, idx) => (idx === i ? value : p)))
  }
  const addParagraph = () => setAboutParagraphs((prev) => [...prev, ""])
  const removeParagraph = (i: number) =>
    setAboutParagraphs((prev) => prev.filter((_, idx) => idx !== i))

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
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Title"
            className="w-full rounded border border-line bg-surface px-3 py-2 text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
          <div>
            <label className="font-mono text-xs text-muted">Slug (URL: /blog/{slug || "..."})</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder={editing ? "post-slug" : "auto-generated-from-title"}
              className="mt-1 w-full rounded border border-line bg-surface px-3 py-2 font-mono text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
            />
          </div>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Excerpt (optional)"
            className="w-full rounded border border-line bg-surface px-3 py-2 text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
          <ErrorBoundary>
            <TiptapEditor content={html} onChange={setHtml} />
          </ErrorBoundary>

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

  if (view === "about") {
    return (
      <div className="mx-auto max-w-reader px-6 py-8">
        <button onClick={() => setView("list")} className="font-mono text-xs text-muted hover:text-ink">
          &larr; Back
        </button>
        <h1 className="mt-4 text-2xl font-medium text-ink">Edit About page</h1>
        <p className="mt-2 text-sm text-muted">
          Edit the intro copy and SEO description. Avatar, social links, work, and projects sections stay as-is.
        </p>

        <div className="mt-6 space-y-6">
          <div>
            <label className="font-mono text-xs text-muted">SEO description</label>
            <input
              type="text"
              value={aboutDesc}
              onChange={(e) => setAboutDesc(e.target.value)}
              placeholder="Short description for search engines"
              className="mt-1 w-full rounded border border-line bg-surface px-3 py-2 text-ink placeholder:text-muted focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="font-mono text-xs text-muted">Intro paragraphs</label>
            <div className="mt-1 space-y-3">
              {aboutParagraphs.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <textarea
                    value={p}
                    onChange={(e) => updateParagraph(i, e.target.value)}
                    rows={3}
                    placeholder={`Paragraph ${i + 1}`}
                    className="w-full resize-y rounded border border-line bg-surface px-3 py-2 text-ink placeholder:text-muted focus:border-accent focus:outline-none"
                  />
                  {aboutParagraphs.length > 1 && (
                    <button
                      onClick={() => removeParagraph(i)}
                      className="self-start rounded border border-line px-2 py-1 font-mono text-xs text-red-600 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addParagraph}
              className="mt-3 rounded border border-line px-2 py-1 font-mono text-xs text-muted hover:text-ink"
            >
              + Add paragraph
            </button>
          </div>

          {aboutError && <p className="text-sm text-red-600">{aboutError}</p>}
          {aboutSaved && <p className="text-sm text-green-600">Saved.</p>}

          <button
            onClick={handleAboutSave}
            disabled={aboutSaving}
            className="rounded bg-ink px-4 py-2 font-mono text-sm text-canvas hover:bg-accent-ink disabled:opacity-50"
          >
            {aboutSaving ? "Saving…" : "Save About"}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-reader px-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-ink">Posts</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setView("about")}
            className="rounded border border-line px-3 py-1.5 font-mono text-xs text-muted hover:text-ink"
          >
            Edit About
          </button>
          <button
            onClick={openNew}
            className="rounded bg-ink px-3 py-1.5 font-mono text-xs text-canvas hover:bg-accent-ink"
          >
            New post
          </button>
        </div>
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
