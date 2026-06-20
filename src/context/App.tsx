import React, { createContext, useContext, useEffect, useRef } from "react"
import { navigate } from "gatsby"
import { useMachine } from "@xstate/react"
import { useQueryState, parseAsStringEnum, parseAsArrayOf, parseAsStringLiteral } from "nuqs"
import { NuqsAdapter } from "nuqs/adapters/react"
import { osMachine, type Experience, type WindowItem } from "@/os/osMachine"
import { appForPath, APPS, type AppId } from "@/lib/apps"
import { isMobile } from "@/lib/mobile"

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
const APP_IDS = APPS.map((a) => a.id)
const pathForId = (id: AppId) => APPS.find((a) => a.id === id)?.path
const normPath = (p: string) => p.replace(/\/+$/, "") || "/"

const STORE_KEY = "ccvm.experience"

const modeParser = parseAsStringEnum<Experience>(["os", "site"])
const openParser = parseAsArrayOf(parseAsStringLiteral(APP_IDS)).withDefault([])
const focusParser = parseAsStringLiteral(APP_IDS)

type ProviderProps = {
  element: React.ReactNode
  location: { pathname: string; key?: string; state?: unknown }
  children: React.ReactNode
}

export const AppProvider: React.FC<ProviderProps> = (props) => (
  <NuqsAdapter>
    <AppProviderInner {...props} />
  </NuqsAdapter>
)

const AppProviderInner: React.FC<ProviderProps> = ({ element, location, children }) => {
  const [state, send] = useMachine(osMachine)
  const experience = state.value as Experience
  const { windows, focusedKey } = state.context
  const constraintsRef = useRef<HTMLDivElement | null>(null)

  const mobile = useRef(isBrowser && isMobile())

  const [urlMode, setUrlMode] = useQueryState("mode", modeParser)
  const [, setUrlOpen] = useQueryState("open", openParser)
  const [, setUrlFocus] = useQueryState("focus", focusParser)

  const booted = useRef(false)

  useEffect(() => {
    if (!isBrowser || booted.current) return
    booted.current = true
    mobile.current = isMobile()
    if (mobile.current) { send({ type: "SET_MODE", mode: "site" }); return }

    const savedLocal = window.localStorage.getItem(STORE_KEY) as Experience | null
    const initial = urlMode ?? savedLocal ?? (window.innerWidth < 880 ? "site" : "os")
    if (initial !== "os") send({ type: "SET_MODE", mode: initial })
  }, [urlMode, send])

  useEffect(() => {
    if (!isBrowser) return
    window.localStorage.setItem(STORE_KEY, experience)
  }, [experience])

  useEffect(() => {
    if (!isBrowser || !booted.current) return
    void setUrlMode(experience === "os" ? null : experience)
    const ids = windows.map((wn) => {
      const app = APPS.find((a) => normPath(a.path) === normPath(wn.path))
      return app?.id
    }).filter((id): id is AppId => !!id)
    void setUrlOpen(ids.length ? ids : null)
    const focusApp = windows.find((wn) => wn.key === focusedKey)
    const focusId = focusApp ? APPS.find((a) => normPath(a.path) === normPath(focusApp.path))?.id : undefined
    void setUrlFocus(focusId ?? null)
  }, [experience, windows, focusedKey, setUrlMode, setUrlOpen, setUrlFocus])

  const restoreQueue = useRef<string[] | null>(null)

  useEffect(() => {
    if (!isBrowser || !booted.current || restoreQueue.current !== null) return
    if (!urlMode) return
    const qOpen = new URLSearchParams(window.location.search).get("open")
    const qFocus = new URLSearchParams(window.location.search).get("focus")
    if (!qOpen) return
    const ids = qOpen.split(",").filter((id): id is AppId => APP_IDS.includes(id as AppId))
    if (!ids.length) return
    const paths = ids.map(pathForId).filter((p): p is string => !!p)
    restoreQueue.current = paths
    const focusPath = qFocus ? pathForId(qFocus as AppId) : undefined
    if (paths.length && paths[0] !== normPath(location.pathname)) {
      void navigate(paths[0])
    }
    if (focusPath) {
      setTimeout(() => send({ type: "FOCUS_PATH", path: normPath(focusPath) }), 120)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const pathname = normPath(location.pathname)
    const app = appForPath(pathname)
    const vw = isBrowser ? window.innerWidth : 1280
    const vh = isBrowser ? window.innerHeight : 800

    send({ type: "OPEN", app, path: pathname, title: app.title, element, vw, vh })

    const queue = restoreQueue.current
    if (queue) {
      const idx = queue.indexOf(pathname)
      const next = idx >= 0 && idx < queue.length - 1 ? queue[idx + 1] : null
      if (next) {
        void navigate(next)
      } else {
        restoreQueue.current = null
      }
    }
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

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
