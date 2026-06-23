import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { AppWindow } from "../AppWindow"

const mockFocusWindow = vi.fn()
const mockCloseWindow = vi.fn()
const mockMinimizeWindow = vi.fn()
const mockToggleMaximize = vi.fn()
const mockUpdateWindow = vi.fn()
const mockConstraintsRef = { current: null }

vi.mock("@/context/App", () => ({
  useApp: () => ({
    focusWindow: mockFocusWindow,
    closeWindow: mockCloseWindow,
    minimizeWindow: mockMinimizeWindow,
    toggleMaximize: mockToggleMaximize,
    updateWindow: mockUpdateWindow,
    focusedKey: "test-key",
    constraintsRef: mockConstraintsRef,
  }),
}))

vi.mock("framer-motion", () => {
  const motionValue = (v: number) => ({ get: () => v, set: vi.fn() })
  return {
    motion: {
      div: ({ children, style, ...props }: any) => {
        const safeStyle: Record<string, any> = {}
        if (style) {
          for (const [k, v] of Object.entries(style)) {
            if (typeof v !== "object" || v === null) safeStyle[k] = v
          }
        }
        const domSafe: Record<string, any> = {}
        const blocked = new Set([
          "drag", "dragControls", "dragListener", "dragMomentum",
          "dragConstraints", "dragElastic", "initial", "animate",
          "exit", "transition", "onAnimationComplete", "whileHover",
          "whileTap", "variants", "onMouseDownCapture", "onPointerDownCapture", "onDragEnd",
        ])
        for (const [k, v] of Object.entries(props)) {
          if (!blocked.has(k)) domSafe[k] = v
        }
        return <div style={safeStyle} onMouseDown={props.onMouseDownCapture ?? props.onPointerDownCapture} {...domSafe}>{children}</div>
      },
    },
    useDragControls: () => ({ start: vi.fn() }),
    useMotionValue: motionValue,
    useReducedMotion: () => false,
    AnimatePresence: ({ children }: any) => <>{children}</>,
  }
})

vi.mock("../AppIcon", () => ({
  AppIcon: ({ id }: any) => <span data-testid={`icon-${id}`} />,
}))

const baseItem = {
  key: "test-key",
  title: "Test App",
  app: { id: "menu" as const, title: "Programs", path: "/menu", icon: "menu" as const, size: { w: 680, h: 560 }, blurb: "", desktop: true },
  element: <div>App Content</div>,
  x: 100,
  y: 50,
  w: 600,
  h: 400,
  z: 10,
  minimized: false,
  maximized: false,
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe("AppWindow", () => {
  it("renders with correct title and icon", () => {
    render(<AppWindow item={baseItem} />)
    expect(screen.getByText("Test App")).toBeInTheDocument()
    expect(screen.getByTestId("icon-menu")).toBeInTheDocument()
  })

  it("renders app content", () => {
    render(<AppWindow item={baseItem} />)
    expect(screen.getByText("App Content")).toBeInTheDocument()
  })

  it("close button calls closeWindow", () => {
    render(<AppWindow item={baseItem} />)
    const closeBtn = screen.getByLabelText("Close Test App")
    fireEvent.click(closeBtn)
    expect(mockCloseWindow).toHaveBeenCalledWith("test-key")
  })

  it("minimize button calls minimizeWindow", () => {
    render(<AppWindow item={baseItem} />)
    const minBtn = screen.getByLabelText("Minimize Test App")
    fireEvent.click(minBtn)
    expect(mockMinimizeWindow).toHaveBeenCalledWith("test-key", true)
  })

  it("maximize button calls toggleMaximize", () => {
    render(<AppWindow item={baseItem} />)
    const maxBtn = screen.getByLabelText("Maximize Test App")
    fireEvent.click(maxBtn)
    expect(mockToggleMaximize).toHaveBeenCalledWith("test-key")
  })

  it("double-click title bar toggles maximize", () => {
    render(<AppWindow item={baseItem} />)
    const titleBar = screen.getByText("Test App").closest("[style*='cursor']")!
    fireEvent.doubleClick(titleBar)
    expect(mockToggleMaximize).toHaveBeenCalledWith("test-key")
  })

  it("focuses window on mousedown", () => {
    render(<AppWindow item={baseItem} />)
    const dialog = screen.getByRole("dialog")
    fireEvent.mouseDown(dialog)
    expect(mockFocusWindow).toHaveBeenCalledWith("test-key")
  })

  it("resize handle exists when not maximized", () => {
    const { container } = render(<AppWindow item={baseItem} />)
    const handle = container.querySelector(".cursor-se-resize")
    expect(handle).toBeInTheDocument()
  })

  it("resize handle hidden when maximized", () => {
    const { container } = render(<AppWindow item={{ ...baseItem, maximized: true }} />)
    const handle = container.querySelector(".cursor-se-resize")
    expect(handle).not.toBeInTheDocument()
  })

  it("minimized window has pointer-events none", () => {
    const { container } = render(<AppWindow item={{ ...baseItem, minimized: true }} />)
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.style.pointerEvents).toBe("none")
  })
})
