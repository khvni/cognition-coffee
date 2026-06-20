import React from "react"
import { Link, type HeadFC } from "gatsby"
import { SEO } from "@/components/SEO"
import { blogPosts } from "@/content/blog"
import { Container, Text, Badge } from "@/components/ui"

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

const posts = [...blogPosts]
  .filter((p) => !p.frontmatter.draft)
  .sort((a, b) => a.frontmatter.order - b.frontmatter.order)

const BlogIndex: React.FC = () => (
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
            {post.frontmatter.category && <Badge>{post.frontmatter.category}</Badge>}
            <h2 className="mt-1 text-2xl font-medium text-ink group-hover:text-accent-ink">
              {post.frontmatter.title}
            </h2>
            {post.frontmatter.description && (
              <Text as="p" preset="small" className="mt-1 text-[14px]">{post.frontmatter.description}</Text>
            )}
            {post.frontmatter.date && (
              <Text as="p" preset="label" className="mt-2">{fmtDate(post.frontmatter.date)}</Text>
            )}
          </Link>
        </li>
      ))}
    </ul>
  </Container>
)

export default BlogIndex

export const Head: HeadFC = () => <SEO title="Devin Daily" description="Field notes on community and agents." />
