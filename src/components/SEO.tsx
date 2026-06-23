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
    image: `${meta.siteUrl}/og.png`,
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={meta.author} />
      <meta name="twitter:image" content={seo.image} />
      <link rel="canonical" href={seo.url} />
      <link rel="icon" type="image/png" href="/cognitioncoffee.png?v=3" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico?v=3" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3" />
      {children}
    </>
  )
}
