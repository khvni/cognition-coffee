import React, { useState, useEffect } from "react"
import { Link, type HeadFC } from "gatsby"
import { SEO } from "@/components/SEO"
import { blogPosts } from "@/content/blog"

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" })

interface ApiPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}

const staticPosts = [...blogPosts]
  .filter((p) => !p.frontmatter.draft)
  .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date))

const BlogIndex: React.FC = () => {
  const [apiPosts, setApiPosts] = useState<ApiPost[]>([])

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => (r.ok ? r.json() : []))
      .then(setApiPosts)
      .catch(() => setApiPosts([]))
  }, [])

  const apiMap = new Map(apiPosts.map((p) => [p.slug, p]))

  const posts = staticPosts
    .map((p) => {
      const api = apiMap.get(p.slug)
      return {
        slug: p.slug,
        title: api?.title ?? p.frontmatter.title,
        date: api?.date ?? p.frontmatter.date,
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))

  const byYear = new Map<number, typeof posts>()
  for (const post of posts) {
    const y = new Date(post.date).getFullYear()
    if (!byYear.has(y)) byYear.set(y, [])
    byYear.get(y)!.push(post)
  }
  const years = [...byYear.keys()].sort((a, b) => b - a)

  let s = 0

  return (
    <div className="page-column">
      <div className="post-stagger" style={{ "--stagger": s++ } as React.CSSProperties}>
        <h1
          className="m-0 text-[2rem] font-medium leading-tight tracking-tight text-ink"
          style={{ textWrap: "balance" }}
        >
          Blog
        </h1>
      </div>

      <div className="mt-14">
        {years.map((year) => (
          <section
            key={year}
            className="section-block post-stagger"
            style={{ "--stagger": s++ } as React.CSSProperties}
          >
            <h2 className="section-heading">{year}</h2>
            <ul className="entry-list dated-list">
              {byYear.get(year)!.map((post) => (
                <li key={post.slug}>
                  <Link className="entry-link" to={`/blog/${post.slug}`}>
                    <strong>{post.title}</strong>
                    <time style={{ fontVariantNumeric: "tabular-nums" }}>
                      {fmtDate(post.date)}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

export default BlogIndex

export const Head: HeadFC = () => (
  <SEO title="Blog" description="Notes on community and agents." />
)
