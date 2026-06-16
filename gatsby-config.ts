import type { GatsbyConfig } from "gatsby"

/**
 * Cognition Coffee — Gatsby site config.
 * Content (pages + blog) is authored in Markdown/MDX under /content and sourced
 * via gatsby-source-filesystem, then transformed by gatsby-plugin-mdx. Pages are
 * statically generated, so the desktop-OS UI keeps full SEO/crawlability.
 */
const config: GatsbyConfig = {
  siteMetadata: {
    title: "The Cognition Coffee Company",
    description:
      "A community strategy for the people who build with Devin, designed and built with Devin. Runs as a desktop OS, with a plain-website mode too.",
    siteUrl: "https://cognitioncoffee.co",
    author: "Ali Khani",
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "blog", path: `${__dirname}/content/blog` },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "pages", path: `${__dirname}/content/pages` },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "images", path: `${__dirname}/static/logos` },
    },
  ],
}

export default config
