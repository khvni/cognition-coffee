import React, { useState, useEffect } from "react"
import { Link, type HeadFC } from "gatsby"
import { motion, useReducedMotion } from "framer-motion"
import { SEO } from "@/components/SEO"
import { blogPosts } from "@/content/blog"
import { stagger } from "@/lib/motion"

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

interface ApiPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}

const staticPosts = [...blogPosts]
  .filter((p) => !p.frontmatter.draft)
  .sort((a, b) => a.frontmatter.order - b.frontmatter.order)

const BlogIndex: React.FC = () => {
  const [apiPosts, setApiPosts] = useState<ApiPost[]>([])
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => (r.ok ? r.json() : []))
      .then(setApiPosts)
      .catch(() => setApiPosts([]))
  }, [])

  const apiMap = new Map(apiPosts.map((p) => [p.slug, p]))

  const posts = staticPosts.map((p) => {
    const api = apiMap.get(p.slug)
    return {
      slug: p.slug,
      title: api?.title ?? p.frontmatter.title,
      description: api?.excerpt ?? p.frontmatter.description,
      date: api?.date ?? p.frontmatter.date,
    }
  })

  return (
    <motion.div
      className="page-column"
      variants={prefersReduced ? undefined : stagger.container}
      initial="hidden"
      animate="show"
    >
      <motion.h1
        variants={prefersReduced ? undefined : stagger.item}
        className="m-0 mb-4 text-[1.75rem] font-medium leading-tight tracking-tight text-ink text-balance"
      >
        Blog
      </motion.h1>
      <motion.p variants={prefersReduced ? undefined : stagger.item} className="lead text-pretty">
        Field notes on building a developer community for the first AI software engineer.
      </motion.p>

      <motion.section
        variants={prefersReduced ? undefined : stagger.item}
        className="section-block mt-14"
        aria-labelledby="posts-heading"
      >
        <h2 className="section-heading" id="posts-heading">Posts</h2>
        <ul className="entry-list dated-list">
          {posts.map((post) => (
            <li key={post.slug} className="entry-row">
              <Link className="entry-link" to={`/blog/${post.slug}`}>
                <span>
                  <strong>{post.title}</strong>
                  {post.description && <span className="block text-pretty">{post.description}</span>}
                </span>
                {post.date && <time className="tabular-nums">{fmtDate(post.date)}</time>}
              </Link>
            </li>
          ))}
        </ul>
      </motion.section>
    </motion.div>
  )
}

export default BlogIndex

export const Head: HeadFC = () => <SEO title="Blog" description="Field notes on community and agents." />
