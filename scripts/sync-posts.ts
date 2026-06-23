import { writeFileSync } from "fs"
import { resolve } from "path"
import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { blogPosts } from "@/content/blog"

const outPath = resolve(__dirname, "..", "content", "posts.json")

const posts = blogPosts.map((post) => {
  const { Content, frontmatter: fm } = post
  const html = renderToStaticMarkup(React.createElement(Content))
  return {
    slug: post.slug,
    title: fm.title,
    date: fm.date,
    excerpt: fm.description,
    content: html,
  }
})

writeFileSync(outPath, JSON.stringify(posts, null, 2))
console.log(`Synced ${posts.length} posts to content/posts.json`)
