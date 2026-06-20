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
    <article className="mx-auto w-full max-w-reader px-6 py-8">
      <header className="border-b border-line pb-6">
        {fm.eyebrow && <p className="font-mono text-[12px] uppercase tracking-wide text-accent-ink">{fm.eyebrow}</p>}
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">{fm.title}</h1>
        {fm.description && <p className="mt-3 text-[1.05rem] text-muted">{fm.description}</p>}
      </header>
      <div className="prose mt-8">
        <Content />
      </div>
    </article>
  )
}

export default ContentPage

export const Head: React.FC<HeadProps> = ({ pageContext }) => {
  const { slug } = pageContext as PageContext
  const page = contentPages.find((p) => p.slug === slug)
  if (!page) return null
  return <SEO title={page.frontmatter.title} description={page.frontmatter.description} />
}
