import React, { useState, useEffect } from "react"
import { Link, type HeadFC } from "gatsby"
import { SEO } from "@/components/SEO"
import { blogPosts } from "@/content/blog"
import { Container, Text, Badge } from "@/components/ui"

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
      category: p.frontmatter.category,
      title: api?.title ?? p.frontmatter.title,
      description: api?.excerpt ?? p.frontmatter.description,
      date: api?.date ?? p.frontmatter.date,
    }
  })

  return (
    <Container as="section" className="py-8">
      <Text as="p" preset="eyebrow">Devin Daily</Text>
      <h1 className="mt-3 text-4xl font-medium text-ink">Field notes on community and agents</h1>
      <Text as="p" preset="subtitle" className="mt-3">
        Working notes on building a developer community for the first AI software engineer.
      </Text>

      <ul className="mt-8 divide-y divide-line border-y border-line">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`} className="group block py-5">
              {post.category && <Badge>{post.category}</Badge>}
              <h2 className="mt-1 text-2xl font-medium text-ink group-hover:text-accent-ink">
                {post.title}
              </h2>
              {post.description && (
                <Text as="p" preset="small" className="mt-1 text-[14px]">{post.description}</Text>
              )}
              {post.date && (
                <Text as="p" preset="label" className="mt-2">{fmtDate(post.date)}</Text>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default BlogIndex

export const Head: HeadFC = () => <SEO title="Devin Daily" description="Field notes on community and agents." />
