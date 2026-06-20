import type { GatsbyConfig } from "gatsby"

/**
 * Cognition Coffee — Gatsby site config.
 * Content (pages + blog) is authored as .tsx content components under
 * src/content/ and sourced directly via registries in gatsby-node.ts.
 */
const config: GatsbyConfig = {
  siteMetadata: {
    title: "The Cognition Coffee Company",
    description:
      "Freshly brewed community for the first AI software engineer.",
    siteUrl: "https://cognitioncoffee.co",
    author: "Ali Khani",
  },
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-postcss"],
}

export default config
