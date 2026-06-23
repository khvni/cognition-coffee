import type { FC } from "react"
import { frontmatter as fm1, default as Content1 } from "./game-plan"
import { frontmatter as fm2, default as Content2 } from "./learnings"
import { frontmatter as fm3, default as Content3 } from "./hackathons"
import { frontmatter as fm4, default as Content4 } from "./quora"
import { frontmatter as fm5, default as Content5 } from "./cognition-coffee"
import { frontmatter as fm6, default as Content6 } from "./mtc"
import canonicalPosts from "../../../content/posts.json"

export function readingTime(text: string): number {
  const plain = text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
  const words = plain.length > 0 ? plain.split(" ").length : 0
  return Math.min(4, Math.max(1, Math.ceil(words / 200)))
}

export const readingTimeBySlug = new Map(
  canonicalPosts.map((p) => [p.slug, readingTime(p.content)])
)

export type BlogPost = {
  slug: string
  frontmatter: typeof fm1
  Content: FC
}

export const blogPosts: BlogPost[] = [
  { slug: "game-plan", frontmatter: fm1, Content: Content1 },
  { slug: "learnings", frontmatter: fm2, Content: Content2 },
  { slug: "hackathons", frontmatter: fm3, Content: Content3 },
  { slug: "quora", frontmatter: fm4, Content: Content4 },
  { slug: "cognition-coffee", frontmatter: fm5, Content: Content5 },
  { slug: "mtc", frontmatter: fm6, Content: Content6 },
]
