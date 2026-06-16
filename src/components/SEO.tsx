import React from "react"
import { useStaticQuery, graphql } from "gatsby"

type Props = {
  title?: string
  description?: string
  pathname?: string
  children?: React.ReactNode
}

/** Document head for every page. Use via Gatsby's Head export. */
export const SEO: React.FC<Props> = ({ title, description, pathname, children }) => {
  const data = useStaticQuery(graphql`
    query SeoMeta {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
        }
      }
    }
  `)

  const meta = data.site.siteMetadata
  const seo = {
    title: title ? `${title} · ${meta.title}` : meta.title,
    description: description || meta.description,
    url: `${meta.siteUrl}${pathname || ""}`,
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={meta.author} />
      <link rel="canonical" href={seo.url} />
      {children}
    </>
  )
}
