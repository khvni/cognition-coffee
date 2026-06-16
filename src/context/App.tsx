import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { navigate } from "gatsby"
import { appForPath, type AppDef } from "@/lib/apps"

export type Experience = "os" | "site"

export type WindowItem = {
  key: string
  app: AppDef
  /** The exact pathname this window represents (a blog post differs from /blog). */
  path: string
  title: string
  element: React.ReactNode
  x: number
  y: number
  w: number
  h: number
  z: number
  minimized: boolean
  maximized: boolean
}

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

export const useApp = (): AppContextValue => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within <AppProvider>")
  return ctx
}

const STORE_KEY = "ccvm.experience"
let keySeq = 0
const nextKey = () => `win-${++keySeq}`

const isBrowser = typeof window !== "undefined"

/** Stagger new windows so they don't stack perfectly. */
function defaultPosition(app: AppDef, count: number, vw: number, vh: number) {
  const w = Math.min(app.size.w, vw - 32)
  const h = Math.min(app.size.h, vh - 96)
  if (app.center) {
    return { x: Math.max(16, (vw - w) / 2), y: Math.max(40, (vh - h) / 2 - 10), w, h }
  }
  const offset = (count % 6) * 28
  return { x: 80 + offset, y: 64 + offset, w, h }
}

type ProviderProps = {
  element: React.ReactNode
  location: { pathname: string; key?: string; state?: unknown }
  children: React.ReactNode
}

export const AppProvider: React.FC<ProviderProps> = ({ element, location, children }) => {
  const [experience, setExperienceState] = useState<Experience>("os")
  const [windows, setWindows] = useState<WindowItem[]>([])
  const [focusedKey, setFocusedKey] = useState<string | null>(null)
  const constraintsRef = useRef<HTMLDivElement | null>(null)
  const topZ = useRef(10)

  const setExperience = useCallback((e: Experience) => {
    setExperienceState(e)
    if (isBrowser) window.localStorage.setItem(STORE_KEY, e)
  }, [])

  const toggleExperience = useCallback(() => {
    setExperienceState((prev) => {
      const next = prev === "os" ? "site" : "os"
      if (isBrowser) window.localStorage.setItem(STORE_KEY, next)
      return next
    })
  }, [])

  // Restore saved mode; default to "site" on narrow screens.
  useEffect(() => {
    if (!isBrowser) return
    const saved = window.localStorage.getItem(STORE_KEY) as Experience | null
    if (saved === "os" || saved === "site") {
      setExperienceState(saved)
    } else if (window.innerWidth < 880) {
      setExperienceState("site")
    }
  }, [])

  const focusWindow = useCallback((key: string) => {
    topZ.current += 1
    const z = topZ.current
    setWindows((prev) => prev.map((wn) => (wn.key === key ? { ...wn, z, minimized: false } : wn)))
    setFocusedKey(key)
  }, [])

  const closeWindow = useCallback((key: string) => {
    setWindows((prev) => prev.filter((wn) => wn.key !== key))
    setFocusedKey((prev) => (prev === key ? null : prev))
  }, [])

  const closeAll = useCallback(() => {
    setWindows([])
    setFocusedKey(null)
  }, [])

  const minimizeWindow = useCallback((key: string, value?: boolean) => {
    setWindows((prev) => prev.map((wn) => (wn.key === key ? { ...wn, minimized: value ?? !wn.minimized } : wn)))
  }, [])

  const toggleMaximize = useCallback((key: string) => {
    setWindows((prev) => prev.map((wn) => (wn.key === key ? { ...wn, maximized: !wn.maximized } : wn)))
  }, [])

  const updateWindow = useCallback((key: string, patch: WindowPatch) => {
    setWindows((prev) => prev.map((wn) => (wn.key === key ? { ...wn, ...patch } : wn)))
  }, [])

  const open = useCallback((path: string, opts?: { newWindow?: boolean }) => {
    void navigate(path, { state: { newWindow: opts?.newWindow ?? false } })
  }, [])

  // Reconcile the current Gatsby page into a window whenever the route changes.
  useEffect(() => {
    const pathname = location.pathname
    const app = appForPath(pathname)
    const state = (location.state ?? {}) as { newWindow?: boolean }
    const vw = isBrowser ? window.innerWidth : 1280
    const vh = isBrowser ? window.innerHeight : 800

    setWindows((prev) => {
      const existing = prev.find((wn) => wn.path === pathname)
      topZ.current += 1
      const z = topZ.current

      if (existing && !state.newWindow) {
        setFocusedKey(existing.key)
        return prev.map((wn) => (wn.key === existing.key ? { ...wn, element, title: app.title, z, minimized: false } : wn))
      }

      const key = nextKey()
      const pos = defaultPosition(app, prev.length, vw, vh)
      const win: WindowItem = {
        key,
        app,
        path: pathname,
        title: app.title,
        element,
        ...pos,
        z,
        minimized: false,
        maximized: false,
      }
      setFocusedKey(key)
      return [...prev, win]
    })
    // location.key changes on every navigation; element is captured per-route.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.key])

  const value = useMemo<AppContextValue>(
    () => ({
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
    }),
    [experience, setExperience, toggleExperience, windows, focusedKey, open, closeWindow, closeAll, focusWindow, minimizeWindow, toggleMaximize, updateWindow]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
