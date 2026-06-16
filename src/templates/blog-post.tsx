import React from "react"
import { graphql, Link, type HeadProps, type PageProps } from "gatsby"
import { SEO } from "@/components/SEO"

type Data = {
  mdx: {
    frontmatter: { title: string; description?: string; date?: string; category?: string }
  }
}

const BlogPost: React.FC<PageProps<Data>> = ({ data, children }) => {
  const fm = data.mdx.frontmatter
  return (
    <article className="mx-auto w-full max-w-reader px-6 py-8">
      <Link to="/blog" className="font-mono text-[12px] text-muted hover:text-ink">
        ← Devin Daily
      </Link>
      <header className="mt-4 border-b border-line pb-6">
        {fm.category && <p className="font-mono text-[12px] uppercase tracking-wide text-accent-ink">{fm.category}</p>}
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">{fm.title}</h1>
        {fm.description && <p className="mt-3 text-[1.05rem] text-muted">{fm.description}</p>}
        {fm.date && <p className="mt-3 font-mono text-[12px] text-muted">{fm.date}</p>}
      </header>
      <div className="prose mt-8">{children}</div>
    </article>
  )
}

export default BlogPost

export const Head: React.FC<HeadProps<Data>> = ({ data }) => (
  <SEO title={data.mdx.frontmatter.title} description={data.mdx.frontmatter.description} />
)

export const query = graphql`
  query BlogPost($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        date(formatString: "MMMM D, YYYY")
        category
      }
    }
  }
`
