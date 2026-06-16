import React from "react"
import { graphql, type HeadProps, type PageProps } from "gatsby"
import { SEO } from "@/components/SEO"

type Data = {
  mdx: {
    frontmatter: { title: string; description?: string; eyebrow?: string }
  }
}

const ContentPage: React.FC<PageProps<Data>> = ({ data, children }) => {
  const fm = data.mdx.frontmatter
  return (
    <article className="mx-auto w-full max-w-reader px-6 py-8">
      <header className="border-b border-line pb-6">
        {fm.eyebrow && <p className="font-mono text-[12px] uppercase tracking-wide text-accent-ink">{fm.eyebrow}</p>}
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">{fm.title}</h1>
        {fm.description && <p className="mt-3 text-[1.05rem] text-muted">{fm.description}</p>}
      </header>
      <div className="prose mt-8">{children}</div>
    </article>
  )
}

export default ContentPage

export const Head: React.FC<HeadProps<Data>> = ({ data }) => (
  <SEO title={data.mdx.frontmatter.title} description={data.mdx.frontmatter.description} />
)

export const query = graphql`
  query ContentPage($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        eyebrow
      }
    }
  }
`
