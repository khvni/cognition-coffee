import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { Desktop } from "../Desktop"

const mockOpen = vi.fn()
vi.mock("@/context/App", () => ({
  useApp: () => ({ open: mockOpen }),
}))

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...filterDomProps(props)}>{children}</span>,
  },
  useReducedMotion: () => false,
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

vi.mock("../AppIcon", () => ({
  AppIcon: ({ id, size }: any) => <span data-testid={`icon-${id}`} data-size={size} />,
}))

function filterDomProps(props: Record<string, any>) {
  const blocked = new Set([
    "initial", "animate", "exit", "transition", "layoutId",
    "whileHover", "whileTap", "variants", "onAnimationComplete",
  ])
  const out: Record<string, any> = {}
  for (const [k, v] of Object.entries(props)) {
    if (!blocked.has(k)) out[k] = v
  }
  return out
}

vi.mock("@/lib/apps", () => ({
  APPS: [
    { id: "home", title: "Welcome", path: "/", icon: "home", desktop: false, size: { w: 720, h: 460 }, blurb: "" },
    { id: "menu", title: "Programs", path: "/menu", icon: "menu", desktop: true, size: { w: 680, h: 560 }, blurb: "" },
    { id: "blog", title: "Blog", path: "/blog", icon: "blog", desktop: true, size: { w: 760, h: 600 }, blurb: "" },
    { id: "community", title: "Community", path: "/community", icon: "community", desktop: true, size: { w: 680, h: 560 }, blurb: "" },
    { id: "about", title: "About", path: "/about", icon: "about", desktop: true, size: { w: 640, h: 560 }, blurb: "" },
    { id: "scott", title: "scott.png", path: "/scott", icon: "scott", desktop: true, size: { w: 480, h: 400 }, blurb: "" },
    { id: "terminal", title: "Terminal", path: "/terminal", icon: "terminal", desktop: true, size: { w: 640, h: 420 }, blurb: "" },
  ],
}))

const desktopApps = [
  { id: "menu", title: "Programs", path: "/menu", icon: "menu", desktop: true },
  { id: "blog", title: "Blog", path: "/blog", icon: "blog", desktop: true },
  { id: "community", title: "Community", path: "/community", icon: "community", desktop: true },
  { id: "about", title: "About", path: "/about", icon: "about", desktop: true },
  { id: "scott", title: "scott.png", path: "/scott", icon: "scott", desktop: true },
  { id: "terminal", title: "Terminal", path: "/terminal", icon: "terminal", desktop: true },
]

const mockLocalStorage = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((k: string) => store[k] ?? null),
    setItem: vi.fn((k: string, v: string) => { store[k] = v }),
    removeItem: vi.fn((k: string) => { delete store[k] }),
    clear: vi.fn(() => { store = {} }),
    get length() { return Object.keys(store).length },
    key: vi.fn((i: number) => Object.keys(store)[i] ?? null),
  }
})()

beforeEach(() => {
  vi.clearAllMocks()
  mockLocalStorage.clear()
  Object.defineProperty(window, "localStorage", { value: mockLocalStorage, writable: true })
})

describe("Desktop", () => {
  it("renders icons for all apps with desktop: true", () => {
    render(<Desktop />)
    for (const app of desktopApps) {
      expect(screen.getByText(app.title)).toBeInTheDocument()
    }
  })

  it("does not render home (desktop: false)", () => {
    render(<Desktop />)
    expect(screen.queryByText("Welcome")).not.toBeInTheDocument()
  })

  it("calls open on click (no drag)", () => {
    render(<Desktop />)
    const btn = screen.getByRole("button", { name: /Programs/i })
    const wrapper = btn.parentElement!

    fireEvent.pointerDown(wrapper, { clientX: 100, clientY: 100 })
    fireEvent.pointerUp(wrapper, { clientX: 100, clientY: 100 })

    expect(mockOpen).toHaveBeenCalledWith("/menu")
  })

  it("does not fire click when dragged beyond 4px threshold", () => {
    render(<Desktop />)
    const btn = screen.getByRole("button", { name: /Programs/i })
    const wrapper = btn.parentElement!

    fireEvent.pointerDown(wrapper, { clientX: 100, clientY: 100 })
    fireEvent.pointerMove(wrapper, { clientX: 110, clientY: 100 })
    fireEvent.pointerUp(wrapper, { clientX: 110, clientY: 100 })

    expect(mockOpen).not.toHaveBeenCalled()
  })

  it("updates position on drag end", () => {
    render(<Desktop />)
    const btn = screen.getByRole("button", { name: /Programs/i })
    const wrapper = btn.parentElement!

    fireEvent.pointerDown(wrapper, { clientX: 0, clientY: 0 })
    fireEvent.pointerMove(wrapper, { clientX: 50, clientY: 60 })
    fireEvent.pointerUp(wrapper, { clientX: 50, clientY: 60 })

    expect(mockLocalStorage.setItem).toHaveBeenCalled()
    const saved = JSON.parse(mockLocalStorage.setItem.mock.calls[0][1])
    expect(saved.menu).toEqual({ x: 62, y: 72 })
  })

  it("opens app via keyboard Enter", () => {
    render(<Desktop />)
    const btn = screen.getByRole("button", { name: /Programs/i })
    fireEvent.keyDown(btn, { key: "Enter" })
    expect(mockOpen).toHaveBeenCalledWith("/menu")
  })

  it("opens app via keyboard Space", () => {
    render(<Desktop />)
    const btn = screen.getByRole("button", { name: /Blog/i })
    fireEvent.keyDown(btn, { key: " " })
    expect(mockOpen).toHaveBeenCalledWith("/blog")
  })

  it("loads positions from localStorage", () => {
    const stored = { menu: { x: 200, y: 300 }, blog: { x: 50, y: 50 } }
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(stored))

    render(<Desktop />)
    const btn = screen.getByRole("button", { name: /Programs/i })
    const wrapper = btn.parentElement!
    expect(wrapper.style.transform).toContain("200")
  })

  it("CRT overlay has pointer-events-none", () => {
    const { container } = render(<Desktop />)
    const crt = container.querySelector("[aria-hidden='true'].pointer-events-none")
    expect(crt).toBeInTheDocument()
  })
})
