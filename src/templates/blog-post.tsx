import React from "react"
import { Link, type HeadProps, type PageProps } from "gatsby"
import { SEO } from "@/components/SEO"
import { blogPosts } from "@/content/blog"
import { SITE_CONTAINER } from "@/lib/layout"

type PageContext = { slug: string }

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

const BlogPost: React.FC<PageProps> = ({ pageContext }) => {
  const { slug } = pageContext as PageContext
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return null
  const { Content, frontmatter: fm } = post
  return (
    <article className={`${SITE_CONTAINER} py-8`}>
      <Link to="/blog" className="font-mono text-[12px] text-muted hover:text-ink">
        ← Devin Daily
      </Link>
      <header className="mt-4 border-b border-line pb-6">
        {fm.category && <p className="font-mono text-[12px] uppercase tracking-wide text-accent-ink">{fm.category}</p>}
        <h1 className="mt-2 text-4xl font-medium text-ink">{fm.title}</h1>
        {fm.description && <p className="mt-3 text-[1.05rem] text-muted">{fm.description}</p>}
        {fm.date && <p className="mt-3 font-mono text-[12px] text-muted">{fmtDate(fm.date)}</p>}
      </header>
      <div className="prose mt-8">
        <Content />
      </div>
    </article>
  )
}

export default BlogPost

export const Head: React.FC<HeadProps> = ({ pageContext }) => {
  const { slug } = pageContext as PageContext
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return null
  return <SEO title={post.frontmatter.title} description={post.frontmatter.description} />
}
