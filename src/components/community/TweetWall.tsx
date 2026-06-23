import React, { useRef, type FC } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { tweets as defaultTweets, type Tweet } from "@/data/tweets"

const XLogo: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export const TweetWall: FC<{ tweets?: Tweet[] }> = ({ tweets = defaultTweets }) => {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
      variants={prefersReduced ? undefined : container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {tweets.map((tweet) => (
        <motion.a
          key={tweet.url}
          href={tweet.url}
          target="_blank"
          rel="noopener noreferrer"
          className="tweet-card group block rounded-win border border-line bg-canvas p-5 shadow-card transition-shadow duration-200 hover:shadow-card-lift"
          variants={prefersReduced ? undefined : item}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={tweet.avatar}
                alt={tweet.author}
                className="size-10 rounded-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget
                  target.style.display = "none"
                }}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{tweet.author}</p>
                <p className="truncate text-sm text-muted">{tweet.handle}</p>
              </div>
            </div>
            <XLogo className="h-4 w-4 flex-shrink-0 text-muted transition-colors group-hover:text-ink" />
          </div>
          <p className="mt-3 text-base leading-relaxed text-ink line-clamp-4">{tweet.text}</p>
          {tweet.date && <p className="mt-3 text-xs text-muted">{tweet.date}</p>}
        </motion.a>
      ))}
    </motion.div>
  )
}
