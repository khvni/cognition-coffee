import type { FC } from "react"
import { frontmatter as fm1, default as Content1 } from "./brewing-community"
import { frontmatter as fm2, default as Content2 } from "./cafe-cognition"
import { frontmatter as fm3, default as Content3 } from "./hackathons"
import { frontmatter as fm4, default as Content4 } from "./view-counter"
import { frontmatter as fm5, default as Content5 } from "./cognition-coffee"

export type BlogPost = {
  slug: string
  frontmatter: typeof fm1
  Content: FC
}

export const blogPosts: BlogPost[] = [
  { slug: "brewing-community", frontmatter: fm1, Content: Content1 },
  { slug: "cafe-cognition", frontmatter: fm2, Content: Content2 },
  { slug: "hackathons", frontmatter: fm3, Content: Content3 },
  { slug: "view-counter", frontmatter: fm4, Content: Content4 },
  { slug: "cognition-coffee", frontmatter: fm5, Content: Content5 },
]
