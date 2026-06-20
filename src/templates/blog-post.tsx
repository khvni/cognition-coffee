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

  return (
    <div className="page-column">
      <Link to="/blog" className="font-mono text-[12px] text-muted transition-colors hover:text-ink">
        ← Blog
      </Link>
      <h1 className="mt-6 text-[1.75rem] font-medium leading-tight tracking-tight text-ink">{title}</h1>
      {description && <p className="mt-3 text-[1.125rem] leading-relaxed text-muted">{description}</p>}
      {date && <p className="mt-2 font-mono text-[12px] text-muted">{fmtDate(date)}</p>}
      <div className="prose mt-10">
        {apiPost ? (
          <div className="prose-content" dangerouslySetInnerHTML={{ __html: apiPost.content }} />
        ) : (
          <Content />
        )}
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
