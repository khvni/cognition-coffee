import React from "react"
import { type HeadProps, type PageProps } from "gatsby"
import { SEO } from "@/components/SEO"
import { contentPages } from "@/content/pages"
import { Container, Text } from "@/components/ui"

type PageContext = { slug: string }

const ContentPage: React.FC<PageProps> = ({ pageContext }) => {
  const { slug } = pageContext as PageContext
  const page = contentPages.find((p) => p.slug === slug)
  if (!page) return null
  const { Content, frontmatter: fm } = page
  return (
    <Container as="article" className="py-8">
      <header className="border-b border-line pb-6">
        {fm.eyebrow && <Text as="p" preset="eyebrow">{fm.eyebrow}</Text>}
        <h1 className="mt-2 text-4xl font-medium text-ink">{fm.title}</h1>
        {fm.description && <Text as="p" preset="subtitle" className="mt-3">{fm.description}</Text>}
      </header>
      <div className="prose mt-8">
        <Content />
      </div>
    </Container>
  )
}

export default ContentPage

export const Head: React.FC<HeadProps> = ({ pageContext }) => {
  const { slug } = pageContext as PageContext
  const page = contentPages.find((p) => p.slug === slug)
  if (!page) return null
  return <SEO title={page.frontmatter.title} description={page.frontmatter.description} />
}
