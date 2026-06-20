import type { GatsbyNode } from "gatsby"
import path from "path"
import { blogPosts } from "./src/content/blog"
import { contentPages } from "./src/content/pages"

/** Mirror the tsconfig "@/*" -> "src/*" alias for webpack so imports resolve. */
export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: { "@": path.resolve(__dirname, "src") },
    },
  })
}

/** Create routes from the .tsx content registries. */
export const createPages: GatsbyNode["createPages"] = async ({ actions }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve("./src/templates/blog-post.tsx")
  const pageTemplate = path.resolve("./src/templates/content-page.tsx")

  blogPosts.forEach(({ slug }) => {
    createPage({ path: `/blog/${slug}`, component: blogTemplate, context: { slug } })
  })

  contentPages.forEach(({ slug }) => {
    createPage({ path: `/${slug}`, component: pageTemplate, context: { slug } })
  })
}
