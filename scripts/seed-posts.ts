import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { blogPosts } from "../src/content/blog"

const posts = blogPosts.map(({ slug, frontmatter: fm, Content }) => ({
  slug,
  title: fm.title,
  date: fm.date,
  excerpt: fm.description ?? "",
  content: renderToStaticMarkup(React.createElement(Content)),
}))

console.log(JSON.stringify(posts, null, 2))
