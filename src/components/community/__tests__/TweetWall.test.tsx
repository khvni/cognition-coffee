import React from "react"
import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { TweetWall } from "../TweetWall"

vi.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(({ children, ...props }: any, ref: any) => {
      const { initial, animate, transition, variants, ...rest } = props
      return <div ref={ref} {...rest}>{children}</div>
    }),
    a: React.forwardRef(({ children, ...props }: any, ref: any) => {
      const { initial, animate, transition, variants, ...rest } = props
      return <a ref={ref} {...rest}>{children}</a>
    }),
  },
  useInView: () => true,
  useReducedMotion: () => false,
}))

vi.mock("@/data/tweets", () => ({
  tweets: [
    { text: "Hello world", author: "Alice", handle: "@alice", url: "https://x.com/alice/status/1", date: "Jun 1" },
    { text: "Devin is great", author: "Bob", handle: "@bob", url: "https://x.com/bob/status/2" },
  ],
}))

describe("TweetWall", () => {
  it("renders default tweets", () => {
    render(<TweetWall />)
    expect(screen.getByText("Hello world")).toBeInTheDocument()
    expect(screen.getByText("Alice")).toBeInTheDocument()
    expect(screen.getByText("@alice")).toBeInTheDocument()
    expect(screen.getByText("Jun 1")).toBeInTheDocument()
  })

  it("links each card to the original tweet in a new tab", () => {
    render(<TweetWall />)
    const links = screen.getAllByRole("link")
    expect(links[0]).toHaveAttribute("href", "https://x.com/alice/status/1")
    expect(links[0]).toHaveAttribute("target", "_blank")
  })
})
