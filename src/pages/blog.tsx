import React from "react"
import { graphql, Link, type HeadFC, type PageProps } from "gatsby"
import { SEO } from "@/components/SEO"

type Data = {
  allMdx: {
    nodes: Array<{
      id: string
      fields: { fileSlug: string }
      frontmatter: { title: string; description?: string; date?: string; category?: string }
    }>
  }
}

const BlogIndex: React.FC<PageProps<Data>> = ({ data }) => (
  <section className="mx-auto w-full max-w-reader px-6 py-8">
    <p className="font-mono text-[12px] uppercase tracking-wide text-accent-ink">Devin Daily</p>
    <h1 className="mt-3 font-serif text-4xl font-semibold text-ink">Field notes on community and agents</h1>
    <p className="mt-3 text-[1.05rem] text-muted">
      Working notes on building a developer community for the first AI software engineer.
    </p>

    <ul className="mt-8 divide-y divide-line border-y border-line">
      {data.allMdx.nodes.map((post) => (
        <li key={post.id}>
          <Link to={`/blog/${post.fields.fileSlug}`} className="group block py-5">
            {post.frontmatter.category && (
              <span className="font-mono text-[11px] uppercase tracking-wide text-accent-ink">
                {post.frontmatter.category}
              </span>
            )}
            <h2 className="mt-1 font-serif text-2xl font-semibold text-ink group-hover:text-accent-ink">
              {post.frontmatter.title}
            </h2>
            {post.frontmatter.description && <p className="mt-1 text-[14px] text-muted">{post.frontmatter.description}</p>}
            {post.frontmatter.date && <p className="mt-2 font-mono text-[12px] text-muted">{post.frontmatter.date}</p>}
          </Link>
        </li>
      ))}
    </ul>
  </section>
)

export default BlogIndex

export const Head: HeadFC = () => <SEO title="Devin Daily" description="Field notes on community and agents." />

export const query = graphql`
  query BlogIndex {
    allMdx(
      filter: { internal: { contentFilePath: { regex: "/content/blog/" } }, frontmatter: { draft: { ne: true } } }
      sort: { frontmatter: { order: ASC } }
    ) {
      nodes {
        id
        fields {
          fileSlug
        }
        frontmatter {
          title
          description
          date(formatString: "MMMM D, YYYY")
          category
        }
      }
    }
  }
`
