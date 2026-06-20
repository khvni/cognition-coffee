import React from "react"
import { type HeadProps, type PageProps } from "gatsby"
import { SEO } from "@/components/SEO"
import { contentPages } from "@/content/pages"

type PageContext = { slug: string }

const ContentPage: React.FC<PageProps> = ({ pageContext }) => {
  const { slug } = pageContext as PageContext
  const page = contentPages.find((p) => p.slug === slug)
  if (!page) return null
  const { Content, frontmatter: fm } = page
  return (
    <div className="page-column">
      <h1 className="m-0 mb-4 text-[1.75rem] font-medium leading-tight tracking-tight text-ink">{fm.title}</h1>
      {fm.description && <p className="lead">{fm.description}</p>}
      <div className="prose mt-12">
        <Content />
      </div>
    </div>
  )
}

export default ContentPage

export const Head: React.FC<HeadProps> = ({ pageContext }) => {
  const { slug } = pageContext as PageContext
  const page = contentPages.find((p) => p.slug === slug)
  if (!page) return null
  return <SEO title={page.frontmatter.title} description={page.frontmatter.description} />
}
