import React, { type FC } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { frontmatter as fm3, default as Content3 } from "./hackathons"
import { frontmatter as fm4, default as Content4 } from "./quora"
import { frontmatter as fm5, default as Content5 } from "./technical"
import { frontmatter as fm6, default as Content6 } from "./mtc"
import canonicalPosts from "../../../content/posts.json"

const WORDS_PER_MINUTE = 267

export function readingTime(text: string): number {
  const plain = text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
  const words = plain.length > 0 ? plain.split(" ").length : 0
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

function readingTimeFromComponent(Content: FC): number {
  return readingTime(renderToStaticMarkup(React.createElement(Content)))
}

export type BlogPost = {
  slug: string
  frontmatter: typeof fm3
  Content: FC
  readingTime: number
}

export const blogPosts: BlogPost[] = [
  { slug: "hackathons", frontmatter: fm3, Content: Content3, readingTime: readingTimeFromComponent(Content3) },
  { slug: "quora", frontmatter: fm4, Content: Content4, readingTime: readingTimeFromComponent(Content4) },
  { slug: "technical", frontmatter: fm5, Content: Content5, readingTime: readingTimeFromComponent(Content5) },
  { slug: "mtc", frontmatter: fm6, Content: Content6, readingTime: readingTimeFromComponent(Content6) },
]

export const readingTimeBySlug = new Map(
  canonicalPosts.map((p) => [p.slug, readingTime(p.content)])
)
