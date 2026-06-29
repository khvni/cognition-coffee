import type { FC } from "react"
import { frontmatter as fm2, default as Content2 } from "./community"
import { frontmatter as fm3, default as Content3 } from "./menu"

export type PageFrontmatter = {
  title: string
  description?: string
  eyebrow?: string
  layout?: "grid" | "community"
}

export type ContentPage = {
  slug: string
  frontmatter: PageFrontmatter
  Content: FC
}

export const contentPages: ContentPage[] = [
  { slug: "community", frontmatter: fm2, Content: Content2 },
  { slug: "menu", frontmatter: fm3, Content: Content3 },
]
