import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import { navigate } from "gatsby"
import { useMachine } from "@xstate/react"
import { osMachine, type Experience, type WindowItem } from "@/os/osMachine"
import { appForPath, APPS } from "@/lib/apps"
import { isMobile } from "@/lib/mobile"
import { useKeyboardShortcuts } from "@/lib/useKeyboardShortcuts"
import { ShortcutsHelp } from "@/components/ShortcutsHelp"

type WindowPatch = Partial<Pick<WindowItem, "x" | "y" | "w" | "h" | "minimized" | "maximized">>

type AppContextValue = {
  experience: Experience
  setExperience: (e: Experience) => void
  toggleExperience: () => void
  windows: WindowItem[]
  focusedKey: string | null
  open: (path: string, opts?: { newWindow?: boolean }) => void
  closeWindow: (key: string) => void
  closeAll: () => void
  focusWindow: (key: string) => void
  minimizeWindow: (key: string, value?: boolean) => void
  toggleMaximize: (key: string) => void
  updateWindow: (key: string, patch: WindowPatch) => void
  constraintsRef: React.RefObject<HTMLDivElement | null>
}

const AppContext = createContext<AppContextValue | null>(null)

export type { Experience, WindowItem }

export const useApp = (): AppContextValue => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within <AppProvider>")
  return ctx
}

const isBrowser = typeof window !== "undefined"
const normPath = (p: string) => p.replace(/\/+$/, "") || "/"

const STORE_KEY = "ccvm.experience"
const BOOT_KEY = "ccvm.terminal-booted"

type ProviderProps = {
  element: React.ReactNode
  location: { pathname: string; key?: string; state?: unknown }
  children: React.ReactNode
}

export const AppProvider: React.FC<ProviderProps> = (props) => (
  <AppProviderInner {...props} />
)

const AppProviderInner: React.FC<ProviderProps> = ({ element, location, children }) => {
  const [state, send] = useMachine(osMachine)
  const experience = state.value as Experience
  const { windows, focusedKey } = state.context
  const constraintsRef = useRef<HTMLDivElement | null>(null)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)

  const mobile = useRef(isBrowser && isMobile())

  const booted = useRef(false)

  useEffect(() => {
    if (!isBrowser || booted.current) return
    booted.current = true
    mobile.current = isMobile()
    if (mobile.current) { send({ type: "SET_MODE", mode: "site" }); return }

    const savedLocal = window.localStorage.getItem(STORE_KEY) as Experience | null
    const initial = savedLocal ?? (window.innerWidth < 880 ? "site" : "os")
    if (initial !== "os") send({ type: "SET_MODE", mode: initial })

    if (initial === "os" && !window.localStorage.getItem(BOOT_KEY)) {
      window.localStorage.setItem(BOOT_KEY, "1")
      setTimeout(() => navigate("/terminal"), 80)
    }
  }, [send])

  useEffect(() => {
    if (!isBrowser) return
    window.localStorage.setItem(STORE_KEY, experience)
  }, [experience])

  useEffect(() => {
    const pathname = normPath(location.pathname)
    const app = appForPath(pathname)
    const vw = isBrowser ? window.innerWidth : 1280
    const vh = isBrowser ? window.innerHeight : 800

    send({ type: "OPEN", app, path: pathname, title: app.title, element, vw, vh })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.key])

  const setExperience = (e: Experience) => {
    if (mobile.current) return
    send({ type: "SET_MODE", mode: e })
  }

  const toggleExperience = () => {
    if (mobile.current) return
    send({ type: "SET_MODE", mode: experience === "os" ? "site" : "os" })
  }

  const open = (path: string, opts?: { newWindow?: boolean }) => {
    void navigate(path, { state: { newWindow: opts?.newWindow ?? false } })
  }

  const closeWindow = (key: string) => send({ type: "CLOSE", key })
  const closeAll = () => send({ type: "CLOSE_ALL" })
  const focusWindow = (key: string) => send({ type: "FOCUS", key })
  const minimizeWindow = (key: string, value?: boolean) => send({ type: "MINIMIZE", key, value })

  const toggleMaximize = (key: string) => {
    const win = windows.find((wn) => wn.key === key)
    if (!win) return
    send(win.maximized ? { type: "RESTORE", key } : { type: "MAXIMIZE", key })
  }

  const updateWindow = (key: string, p: WindowPatch) => {
    if (p.x !== undefined && p.y !== undefined) send({ type: "MOVE", key, x: p.x, y: p.y })
    if (p.w !== undefined && p.h !== undefined) send({ type: "RESIZE", key, w: p.w, h: p.h })
    if (p.minimized !== undefined) send({ type: "MINIMIZE", key, value: p.minimized })
    if (p.maximized !== undefined) {
      send(p.maximized ? { type: "MAXIMIZE", key } : { type: "RESTORE", key })
    }
  }

  useKeyboardShortcuts({
    experience,
    windows,
    focusedKey,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    onHelp: () => setShortcutsOpen(true),
  })

  const value: AppContextValue = {
    experience,
    setExperience,
    toggleExperience,
    windows,
    focusedKey,
    open,
    closeWindow,
    closeAll,
    focusWindow,
    minimizeWindow,
    toggleMaximize,
    updateWindow,
    constraintsRef,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
      {experience === "os" && <ShortcutsHelp open={shortcutsOpen} onOpenChange={setShortcutsOpen} />}
    </AppContext.Provider>
  )
}
