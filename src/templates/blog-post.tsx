import React, { useState, useEffect } from "react"
import { Link, type HeadProps, type PageProps } from "gatsby"
import { SEO } from "@/components/SEO"
import { blogPosts } from "@/content/blog"
import { Container, Text } from "@/components/ui"

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
    <Container as="article" className="py-8">
      <Link to="/blog" className="font-mono text-[12px] text-muted hover:text-ink">
        ← Devin Daily
      </Link>
      <header className="mt-4 border-b border-line pb-6">
        {fm.category && <Text as="p" preset="eyebrow">{fm.category}</Text>}
        <h1 className="mt-2 text-4xl font-medium text-ink">{title}</h1>
        {description && <Text as="p" preset="subtitle" className="mt-3">{description}</Text>}
        {date && <Text as="p" preset="label" className="mt-3">{fmtDate(date)}</Text>}
      </header>
      <div className="prose mt-8">
        {apiPost ? (
          <div dangerouslySetInnerHTML={{ __html: apiPost.content }} />
        ) : (
          <Content />
        )}
      </div>
    </Container>
  )
}

export default BlogPost

export const Head: React.FC<HeadProps> = ({ pageContext }) => {
  const { slug } = pageContext as PageContext
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return null
  return <SEO title={post.frontmatter.title} description={post.frontmatter.description} />
}
