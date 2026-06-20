import type { FC } from "react"
import { frontmatter as fm1, default as Content1 } from "./brewing-community-90-days"
import { frontmatter as fm2, default as Content2 } from "./cafe-cursor-to-cafe-cognition"
import { frontmatter as fm3, default as Content3 } from "./running-internal-hackathons"
import { frontmatter as fm4, default as Content4 } from "./what-quora-taught-me"

export type BlogPost = {
  slug: string
  frontmatter: typeof fm1
  Content: FC
}

export const blogPosts: BlogPost[] = [
  { slug: "brewing-community-90-days", frontmatter: fm1, Content: Content1 },
  { slug: "cafe-cursor-to-cafe-cognition", frontmatter: fm2, Content: Content2 },
  { slug: "running-internal-hackathons", frontmatter: fm3, Content: Content3 },
  { slug: "what-quora-taught-me", frontmatter: fm4, Content: Content4 },
]
