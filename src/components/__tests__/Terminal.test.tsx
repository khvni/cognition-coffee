import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { Terminal } from "../Terminal"

const mockOpen = vi.fn()
vi.mock("@/context/App", () => ({
  useApp: () => ({ open: mockOpen }),
}))

vi.mock("@/content/blog", () => ({ blogPosts: [] }))
vi.mock("@/data/menu", () => ({ MENU_SECTIONS: [] }))

vi.mock("@/lib/apps", () => {
  const APPS = [
    { id: "terminal", title: "Terminal", path: "/terminal", blurb: "A UNIX-like terminal.", icon: "terminal", size: { w: 760, h: 500 } },
    { id: "snake", title: "Snake", path: "/snake", blurb: "Eat, grow, don't bite your tail.", icon: "snake", size: { w: 720, h: 640 }, side: "right" },
    { id: "pong", title: "Pong", path: "/pong", blurb: "Two paddles, one ball, endless rally.", icon: "pong", size: { w: 940, h: 620 }, side: "right" },
  ]
  return {
    APPS,
    appForPath: (p: string) => APPS.find((a) => a.path === p) ?? APPS[0],
  }
})

function run(cmd: string) {
  const input = screen.getByRole("textbox")
  fireEvent.change(input, { target: { value: cmd } })
  fireEvent.keyDown(input, { key: "Enter" })
}

beforeEach(() => {
  vi.clearAllMocks()
  Element.prototype.scrollTo = vi.fn()
})

describe("Terminal filesystem", () => {
  it("lists Applications/ and Pages/ at root", () => {
    render(<Terminal />)
    run("ls")
    const listing = screen.getByText(/Applications\//)
    expect(listing.textContent).toContain("Applications/")
    expect(listing.textContent).toContain("Pages/")
    expect(listing.textContent).toContain("blog/")
    expect(listing.textContent).toContain("menu/")
  })

  it("lists games in Applications/ with title-based names derived from APPS", () => {
    render(<Terminal />)
    run("ls Applications")
    const listing = screen.getByText(/Snake\.tsx/)
    expect(listing.textContent).toContain("Snake.tsx")
    expect(listing.textContent).toContain("Pong.tsx")
  })

  it("lists the site pages in Pages/", () => {
    render(<Terminal />)
    run("ls Pages")
    const listing = screen.getByText(/home\.tsx/)
    expect(listing.textContent).toContain("home.tsx")
    expect(listing.textContent).toContain("community.tsx")
    expect(listing.textContent).toContain("about.tsx")
    expect(listing.textContent).toContain("terminal.tsx")
    expect(listing.textContent).toContain("scott.png")
  })

  it("cat shows the game description from APPS data", () => {
    render(<Terminal />)
    run("cat Applications/Snake.tsx")
    expect(screen.getByText(/Snake - Eat, grow/)).toBeInTheDocument()
  })

  it("open launches the game window via its path", () => {
    vi.useFakeTimers()
    render(<Terminal />)
    run("open Applications/Pong.tsx")
    vi.runAllTimers()
    expect(mockOpen).toHaveBeenCalledWith("/pong")
    vi.useRealTimers()
  })
})
