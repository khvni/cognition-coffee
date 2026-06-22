import React, { useState, useEffect } from "react"
import { Link, type HeadProps, type PageProps } from "gatsby"
import { SEO } from "@/components/SEO"
import { blogPosts } from "@/content/blog"

type PageContext = { slug: string }

interface ApiPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

const BlogPost: React.FC<PageProps> = ({ pageContext }) => {
  const { slug } = pageContext as PageContext
  const post = blogPosts.find((p) => p.slug === slug)
  const [apiPost, setApiPost] = useState<ApiPost | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/posts/${slug}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then(setApiPost)
      .catch(() => setApiPost(null))
    return () => controller.abort()
  }, [slug])

  if (!post) return null
  const { Content, frontmatter: fm } = post

  const title = apiPost?.title ?? fm.title
  const description = apiPost?.excerpt ?? fm.description
  const date = apiPost?.date ?? fm.date

  let s = 0

  return (
    <div className="page-column">
      <div className="post-stagger" style={{ "--stagger": s++ } as React.CSSProperties}>
        <Link to="/blog" className="back-link">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Blog
        </Link>
      </div>

      <div className="post-stagger" style={{ "--stagger": s++ } as React.CSSProperties}>
        {fm.category && (
          <span className="inline-block mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-muted">
            {fm.category}
          </span>
        )}
        <h1
          className="mt-3 text-[1.75rem] font-medium leading-tight tracking-tight text-ink"
          style={{ textWrap: "balance" }}
        >
          {title}
        </h1>
      </div>

      {description && (
        <div className="post-stagger" style={{ "--stagger": s++ } as React.CSSProperties}>
          <p className="mt-3 text-[1.125rem] leading-relaxed text-muted" style={{ textWrap: "pretty" }}>
            {description}
          </p>
        </div>
      )}

      <div className="post-stagger" style={{ "--stagger": s++ } as React.CSSProperties}>
        {date && (
          <p className="mt-2 font-mono text-[0.75rem] text-muted" style={{ fontVariantNumeric: "tabular-nums" }}>
            {fmtDate(date)}
          </p>
        )}
      </div>

      <div className="post-stagger" style={{ "--stagger": s++ } as React.CSSProperties}>
        <div className="prose mt-10" style={{ textWrap: "pretty" }}>
          {apiPost ? (
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: apiPost.content }} />
          ) : (
            <Content />
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogPost

export const Head: React.FC<HeadProps> = ({ pageContext }) => {
  const { slug } = pageContext as PageContext
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return null
  return <SEO title={post.frontmatter.title} description={post.frontmatter.description} />
}
