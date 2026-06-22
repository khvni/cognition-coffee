import React, { useState, useEffect } from "react"
import { Link, type HeadFC } from "gatsby"
import { SEO } from "@/components/SEO"
import { blogPosts } from "@/content/blog"

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

interface ApiPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}

const staticPosts = [...blogPosts]
  .filter((p) => !p.frontmatter.draft)
  .sort((a, b) => a.frontmatter.order - b.frontmatter.order)

const BlogIndex: React.FC = () => {
  const [apiPosts, setApiPosts] = useState<ApiPost[]>([])

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => (r.ok ? r.json() : []))
      .then(setApiPosts)
      .catch(() => setApiPosts([]))
  }, [])

  const apiMap = new Map(apiPosts.map((p) => [p.slug, p]))

  const posts = staticPosts.map((p) => {
    const api = apiMap.get(p.slug)
    return {
      slug: p.slug,
      title: api?.title ?? p.frontmatter.title,
      description: api?.excerpt ?? p.frontmatter.description,
      date: api?.date ?? p.frontmatter.date,
      category: p.frontmatter.category,
    }
  })

  return (
    <div className="page-column">
      <div className="post-stagger" style={{ "--stagger": 0 } as React.CSSProperties}>
        <h1 className="m-0 mb-4 text-[1.75rem] font-medium leading-tight tracking-tight text-ink" style={{ textWrap: "balance" }}>
          Field Notes
        </h1>
      </div>
      <div className="post-stagger" style={{ "--stagger": 1 } as React.CSSProperties}>
        <p className="lead" style={{ textWrap: "pretty" }}>
          Notes on building a developer community for the first AI software engineer.
        </p>
      </div>

      <section className="mt-14 post-stagger" style={{ "--stagger": 2 } as React.CSSProperties} aria-labelledby="posts-heading">
        <h2 className="section-heading" id="posts-heading">Posts</h2>
        <ul className="flex flex-col gap-3 m-0 p-0 list-none">
          {posts.map((post, i) => (
            <li
              key={post.slug}
              className="blog-stagger"
              style={{ "--stagger": i } as React.CSSProperties}
            >
              <Link className="blog-card block no-underline" to={`/blog/${post.slug}`}>
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  {post.category && (
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-muted">
                      {post.category}
                    </span>
                  )}
                  {post.date && (
                    <time
                      className="font-mono text-[0.75rem] text-muted shrink-0"
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {fmtDate(post.date)}
                    </time>
                  )}
                </div>
                <h3
                  className="m-0 text-[1.0625rem] font-medium leading-snug text-ink"
                  style={{ textWrap: "balance" }}
                >
                  {post.title}
                </h3>
                {post.description && (
                  <p
                    className="m-0 mt-1.5 text-[0.9375rem] leading-relaxed text-muted"
                    style={{ textWrap: "pretty" }}
                  >
                    {post.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default BlogIndex

export const Head: HeadFC = () => <SEO title="Blog" description="Field notes on community and agents." />
