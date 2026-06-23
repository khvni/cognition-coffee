import React, { useState, useEffect } from "react"
import { type HeadProps, type PageProps } from "gatsby"
import { motion, useReducedMotion } from "framer-motion"
import { SEO } from "@/components/SEO"
import { contentPages } from "@/content/pages"
import { stagger } from "@/lib/motion"
import type { AboutContent } from "@/content/pages/about"

type PageContext = { slug: string }

const ContentPage: React.FC<PageProps> = ({ pageContext }) => {
  const { slug } = pageContext as PageContext
  const page = contentPages.find((p) => p.slug === slug)
  const prefersReduced = useReducedMotion()
  const [about, setAbout] = useState<AboutContent | null>(null)

  useEffect(() => {
    if (page?.frontmatter.layout !== "about") return
    const controller = new AbortController()
    fetch("/api/about", { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then(setAbout)
      .catch(() => setAbout(null))
    return () => controller.abort()
  }, [page?.frontmatter.layout])

  if (!page) return null
  const { Content, frontmatter: fm } = page
  const isGrid = fm.layout === "grid"
  const isAbout = fm.layout === "about"

  if (isAbout) {
    return (
      <div className="page-column about-page">
        <Content about={about} />
      </div>
    )
  }

  return (
    <motion.div
      className={isGrid ? "page-column-wide" : "page-column"}
      variants={prefersReduced ? undefined : stagger.container}
      initial="hidden"
      animate="show"
    >
      <motion.h1
        variants={prefersReduced ? undefined : stagger.item}
        className="m-0 mb-4 text-[1.75rem] font-medium leading-tight tracking-tight text-ink text-balance"
      >
        {fm.title}
      </motion.h1>
      {fm.description && (
        <motion.p variants={prefersReduced ? undefined : stagger.item} className="lead text-pretty">
          {fm.description}
        </motion.p>
      )}
      <motion.div variants={prefersReduced ? undefined : stagger.slide} className={isGrid ? "mt-12" : "prose mt-12"}>
        <Content />
      </motion.div>
    </motion.div>
  )
}

export default ContentPage

export const Head: React.FC<HeadProps> = ({ pageContext }) => {
  const { slug } = pageContext as PageContext
  const page = contentPages.find((p) => p.slug === slug)
  if (!page) return null
  return <SEO title={page.frontmatter.title} description={page.frontmatter.description} />
}
