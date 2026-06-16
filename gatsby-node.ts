import type { GatsbyNode } from "gatsby"
import path from "path"

/** Mirror the tsconfig "@/*" -> "src/*" alias for webpack so imports resolve. */
export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: { "@": path.resolve(__dirname, "src") },
    },
  })
}

/**
 * Programmatically create routes from content files:
 *   - content/blog/*.mdx  -> /blog/<slug>   (blog-post template)
 *   - content/pages/*.mdx -> /<slug>        (content-page template; about, community, menu)
 * Slug comes from the filename (exposed as fields.fileSlug). The MDX body is
 * attached to each template via the ?__contentFilePath query param, the
 * canonical gatsby-plugin-mdx v5 mechanism.
 */
export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql<{
    blog: { nodes: { id: string; fields: { fileSlug: string }; internal: { contentFilePath: string } }[] }
    pages: { nodes: { id: string; fields: { fileSlug: string }; internal: { contentFilePath: string } }[] }
  }>(`
    query {
      blog: allMdx(filter: { internal: { contentFilePath: { regex: "/content/blog//" } } }) {
        nodes {
          id
          fields {
            fileSlug
          }
          internal {
            contentFilePath
          }
        }
      }
      pages: allMdx(filter: { internal: { contentFilePath: { regex: "/content/pages//" } } }) {
        nodes {
          id
          fields {
            fileSlug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors || !result.data) {
    reporter.panicOnBuild("Error loading MDX content", result.errors)
    return
  }

  const blogTemplate = path.resolve("./src/templates/blog-post.tsx")
  const pageTemplate = path.resolve("./src/templates/content-page.tsx")

  result.data.blog.nodes.forEach((node) => {
    createPage({
      path: `/blog/${node.fields.fileSlug}`,
      component: `${blogTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    })
  })

  result.data.pages.nodes.forEach((node) => {
    createPage({
      path: `/${node.fields.fileSlug}`,
      component: `${pageTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    })
  })
}

/** Expose each MDX file's filename as fields.fileSlug for routing. */
export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions, getNode }) => {
  if (node.internal.type !== "Mdx") return
  const parent = node.parent ? getNode(node.parent) : undefined
  const name = (parent as { name?: string } | undefined)?.name ?? ""
  actions.createNodeField({ node, name: "fileSlug", value: name })
}
