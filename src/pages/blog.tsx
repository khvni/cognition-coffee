import React from "react"
import { Link, type HeadFC } from "gatsby"
import { SEO } from "@/components/SEO"
import { blogPosts } from "@/content/blog"
import { SITE_CONTAINER } from "@/lib/layout"

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

const posts = [...blogPosts]
  .filter((p) => !p.frontmatter.draft)
  .sort((a, b) => a.frontmatter.order - b.frontmatter.order)

const BlogIndex: React.FC = () => (
  <section className={`${SITE_CONTAINER} py-8`}>
    <p className="font-mono text-[12px] uppercase tracking-wide text-accent-ink">Devin Daily</p>
    <h1 className="mt-3 text-4xl font-medium text-ink">Field notes on community and agents</h1>
    <p className="mt-3 text-[1.05rem] text-muted">
      Working notes on building a developer community for the first AI software engineer.
    </p>

    <ul className="mt-8 divide-y divide-line border-y border-line">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link to={`/blog/${post.slug}`} className="group block py-5">
            {post.frontmatter.category && (
              <span className="font-mono text-[11px] uppercase tracking-wide text-accent-ink">
                {post.frontmatter.category}
              </span>
            )}
            <h2 className="mt-1 text-2xl font-medium text-ink group-hover:text-accent-ink">
              {post.frontmatter.title}
            </h2>
            {post.frontmatter.description && (
              <p className="mt-1 text-[14px] text-muted">{post.frontmatter.description}</p>
            )}
            {post.frontmatter.date && (
              <p className="mt-2 font-mono text-[12px] text-muted">{fmtDate(post.frontmatter.date)}</p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  </section>
)

export default BlogIndex

export const Head: HeadFC = () => <SEO title="Devin Daily" description="Field notes on community and agents." />
