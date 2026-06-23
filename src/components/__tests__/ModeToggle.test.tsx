import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { ModeToggle } from "../ModeToggle"

const mockSetExperience = vi.fn()
let mockExperience = "os"

vi.mock("@/context/App", () => ({
  useApp: () => ({
    experience: mockExperience,
    setExperience: mockSetExperience,
  }),
}))

vi.mock("framer-motion", () => ({
  motion: {
    span: ({ children, ...props }: any) => <span>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: () => false,
}))

let mockIsMobile = false
vi.mock("@/lib/mobile", () => ({
  isMobile: () => mockIsMobile,
}))

beforeEach(() => {
  vi.clearAllMocks()
  mockExperience = "os"
  mockIsMobile = false
})

describe("ModeToggle", () => {
  it("renders OS and Site buttons", () => {
    render(<ModeToggle />)
    expect(screen.getByText("OS")).toBeInTheDocument()
    expect(screen.getByText("Site")).toBeInTheDocument()
  })

  it("click OS button sets experience to os", () => {
    mockExperience = "site"
    render(<ModeToggle />)
    fireEvent.click(screen.getByText("OS"))
    expect(mockSetExperience).toHaveBeenCalledWith("os")
  })

  it("click Site button sets experience to site", () => {
    render(<ModeToggle />)
    fireEvent.click(screen.getByText("Site"))
    expect(mockSetExperience).toHaveBeenCalledWith("site")
  })

  it("OS button has aria-checked true when experience is os", () => {
    render(<ModeToggle />)
    expect(screen.getByText("OS")).toHaveAttribute("aria-checked", "true")
    expect(screen.getByText("Site")).toHaveAttribute("aria-checked", "false")
  })

  it("returns null on mobile", () => {
    mockIsMobile = true
    const { container } = render(<ModeToggle />)
    expect(container.innerHTML).toBe("")
  })
})
