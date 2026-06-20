import type { GatsbyNode } from "gatsby"
import fs from "fs"
import path from "path"

/** Run the React Compiler (target 18) ahead of Gatsby's Babel transforms. */
export const onCreateBabelConfig: GatsbyNode["onCreateBabelConfig"] = ({ actions }) => {
  actions.setBabelPlugin({
    name: "babel-plugin-react-compiler",
    options: { target: "18" },
  })
}

/** Mirror the tsconfig "@/*" -> "src/*" alias for webpack so imports resolve. */
export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: { "@": path.resolve(__dirname, "src") },
    },
  })
}

/** Discover content slugs from the filesystem (avoid importing .tsx into Node). */
const slugsFrom = (dir: string): string[] =>
  fs
    .readdirSync(path.resolve(__dirname, dir))
    .filter((f) => f.endsWith(".tsx") && f !== "index.tsx")
    .map((f) => f.replace(/\.tsx$/, ""))

/** Create routes from the .tsx content files. Templates look up content by slug. */
export const createPages: GatsbyNode["createPages"] = async ({ actions }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve("./src/templates/blog-post.tsx")
  const pageTemplate = path.resolve("./src/templates/content-page.tsx")

  slugsFrom("src/content/blog").forEach((slug) => {
    createPage({ path: `/blog/${slug}`, component: blogTemplate, context: { slug } })
  })

  slugsFrom("src/content/pages").forEach((slug) => {
    createPage({ path: `/${slug}`, component: pageTemplate, context: { slug } })
  })
}
