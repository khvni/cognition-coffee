import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { PhotoCarousel, type Photo } from "../PhotoCarousel"

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, transition, variants, ...rest } = props
      return <div {...rest}>{children}</div>
    },
  },
  useInView: () => true,
  useReducedMotion: () => false,
}))

const photos: Photo[] = [
  { src: "/a.jpg", alt: "A", caption: "Caption A" },
  { src: "/b.jpg", alt: "B", caption: "Caption B" },
]

describe("PhotoCarousel", () => {
  it("duplicates photos for seamless looping", () => {
    render(<PhotoCarousel photos={photos} />)
    expect(screen.getAllByAltText("A")).toHaveLength(2)
    expect(screen.getAllByAltText("B")).toHaveLength(2)
    expect(screen.getAllByText("Caption A")).toHaveLength(2)
  })

  it("renders nothing when photos is empty", () => {
    const { container } = render(<PhotoCarousel photos={[]} />)
    expect(container.firstChild).toBeNull()
  })
})
