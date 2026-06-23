import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { TaskBar } from "../TaskBar"

const mockFocusWindow = vi.fn()
const mockMinimizeWindow = vi.fn()

const mockWindows = [
  { key: "w1", title: "Programs", app: { id: "menu", icon: "menu" }, minimized: false },
  { key: "w2", title: "Blog", app: { id: "blog", icon: "blog" }, minimized: true },
  { key: "w3", title: "About", app: { id: "about", icon: "about" }, minimized: false },
]

vi.mock("@/context/App", () => ({
  useApp: () => ({
    windows: mockWindows,
    focusedKey: "w1",
    focusWindow: mockFocusWindow,
    minimizeWindow: mockMinimizeWindow,
  }),
}))

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div>{children}</div>,
    span: ({ children, ...props }: any) => <span>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: () => false,
}))

vi.mock("../ModeToggle", () => ({
  ModeToggle: () => <div data-testid="mode-toggle" />,
}))

vi.mock("../AppIcon", () => ({
  AppIcon: ({ id }: any) => <span data-testid={`icon-${id}`} />,
}))

beforeEach(() => {
  vi.clearAllMocks()
  vi.useFakeTimers()
  vi.setSystemTime(new Date("2025-03-15T14:30:00"))
})

describe("TaskBar", () => {
  it("shows brand text", () => {
    render(<TaskBar />)
    expect(screen.getByText("Cognition")).toBeInTheDocument()
    expect(screen.getByText("Coffee")).toBeInTheDocument()
  })

  it("renders pills for open windows", () => {
    render(<TaskBar />)
    expect(screen.getByTitle("Programs")).toBeInTheDocument()
    expect(screen.getByTitle("Blog")).toBeInTheDocument()
    expect(screen.getByTitle("About")).toBeInTheDocument()
  })

  it("click focused window minimizes it", () => {
    render(<TaskBar />)
    fireEvent.click(screen.getByTitle("Programs"))
    expect(mockMinimizeWindow).toHaveBeenCalledWith("w1", true)
  })

  it("click minimized window restores it", () => {
    render(<TaskBar />)
    fireEvent.click(screen.getByTitle("Blog"))
    expect(mockMinimizeWindow).toHaveBeenCalledWith("w2", false)
  })

  it("click unfocused window focuses it", () => {
    render(<TaskBar />)
    fireEvent.click(screen.getByTitle("About"))
    expect(mockFocusWindow).toHaveBeenCalledWith("w3")
  })

  it("displays clock time", () => {
    render(<TaskBar />)
    const time = screen.getByText(/\d{1,2}:\d{2}/)
    expect(time).toBeInTheDocument()
  })
})
