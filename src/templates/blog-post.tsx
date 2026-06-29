import React, { useState, useEffect } from "react"
import { Link, type HeadProps, type PageProps } from "gatsby"
import { SEO } from "@/components/SEO"
import { blogPosts } from "@/content/blog"
import { BIO, SOCIALS } from "@/data/experience"

type PageContext = { slug: string }

interface ApiPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}

const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

const fmtDateShort = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric" })

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

  const others = blogPosts
    .filter((p) => p.slug !== slug && !p.frontmatter.draft)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

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
        {date && (
          <p
            className="mt-8 m-0 text-[0.75rem] text-muted"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {fmtDate(date)}
          </p>
        )}
        <h1
          className="mt-3 text-[2rem] font-medium leading-tight tracking-tight text-ink"
          style={{ textWrap: "balance" }}
        >
          {title}
        </h1>
      </div>

      {description && (
        <div className="post-stagger" style={{ "--stagger": s++ } as React.CSSProperties}>
          <p
            className="mt-4 text-[1.125rem] leading-relaxed text-muted"
            style={{ textWrap: "pretty" }}
          >
            {description}
          </p>
        </div>
      )}

      <div className="post-stagger" style={{ "--stagger": s++ } as React.CSSProperties}>
        <div className="prose mt-10" style={{ textWrap: "pretty" }}>
          {apiPost ? (
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: apiPost.content }} />
          ) : (
            <Content />
          )}
        </div>
      </div>

      {others.length > 0 && (
        <div className="post-stagger mt-20" style={{ "--stagger": s++ } as React.CSSProperties}>
          <div className="h-[3px] w-5 rounded bg-accent" />
          <h2 className="section-heading mt-6">Read next</h2>
          <ul className="entry-list dated-list">
            {others.map((p) => (
              <li key={p.slug}>
                <Link className="entry-link" to={`/blog/${p.slug}`}>
                  <strong>{p.frontmatter.title}</strong>
                  <time style={{ fontVariantNumeric: "tabular-nums" }}>
                    {fmtDateShort(p.frontmatter.date)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="post-stagger mt-20" style={{ "--stagger": s++ } as React.CSSProperties}>
        <div className="h-[3px] w-5 rounded bg-accent" />
        <div className="mt-6 flex items-start gap-4">
          <img
            src="/avatar-ali-khani.jpg"
            alt={BIO.name}
            width={56}
            height={56}
            className="rounded-full border border-line"
          />
          <div className="flex-1">
            <p className="m-0 font-medium text-ink">{BIO.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{BIO.oneLiner}</p>
            <div className="mt-3 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="font-mono text-xs text-muted hover:text-accent"
                  target="_blank"
                  rel="me noopener"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
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
