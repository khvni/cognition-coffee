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
    }
  })

  return (
    <div className="page-column">
      <h1 className="m-0 mb-4 text-[1.75rem] font-medium leading-tight tracking-tight text-ink">Blog</h1>
      <p className="lead">Field notes on building a developer community for the first AI software engineer.</p>

      <section className="section-block mt-14" aria-labelledby="posts-heading">
        <h2 className="section-heading" id="posts-heading">Posts</h2>
        <ul className="entry-list dated-list">
          {posts.map((post) => (
            <li key={post.slug} className="entry-row">
              <Link className="entry-link" to={`/blog/${post.slug}`}>
                <span>
                  <strong>{post.title}</strong>
                  {post.description && <span className="block">{post.description}</span>}
                </span>
                {post.date && <time>{fmtDate(post.date)}</time>}
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
