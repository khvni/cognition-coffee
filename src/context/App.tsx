/**
 * App provider — wires the {@link osMachine} to React and mirrors its state into
 * type-safe URL query params (`?mode=os&open=menu,about&focus=about`) via nuqs, so
 * any desktop arrangement is shareable and restorable by URL. The machine is the
 * single source of truth; this layer is the React + URL boundary.
 */
import React, { createContext, useContext, useEffect, useRef } from "react"
import { navigate } from "gatsby"
import { useMachine } from "@xstate/react"
import { NuqsAdapter } from "nuqs/adapters/react"
import { parseAsArrayOf, parseAsStringEnum, parseAsStringLiteral, useQueryState } from "nuqs"
import { appForPath, APPS, type AppId } from "@/lib/apps"
import { isMobile } from "@/lib/mobile"
import { osMachine, type Experience, type WindowItem } from "@/os/osMachine"

export type { Experience, WindowItem } from "@/os/osMachine"

type AppContextValue = {
  experience: Experience
  setExperience: (e: Experience) => void
  windows: WindowItem[]
  focusedKey: string | null
  open: (path: string) => void
  closeWindow: (key: string) => void
  focusWindow: (key: string) => void
  minimizeWindow: (key: string, value?: boolean) => void
  toggleMaximize: (key: string) => void
  moveWindow: (key: string, x: number, y: number) => void
  resizeWindow: (key: string, w: number, h: number) => void
  constraintsRef: React.RefObject<HTMLDivElement | null>
}

const AppContext = createContext<AppContextValue | null>(null)

export const useApp = (): AppContextValue => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within <AppProvider>")
  return ctx
}

const isBrowser = typeof window !== "undefined"
const APP_IDS = APPS.map((a) => a.id)
const pathForId = (id: AppId) => APPS.find((a) => a.id === id)?.path
/** Strip Gatsby's trailing slash so `location.pathname` matches the `APPS` paths. */
const normPath = (p: string) => p.replace(/\/+$/, "") || "/"

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
  const [urlOpen, setUrlOpen] = useQueryState("open", openParser)
  const [urlFocus, setUrlFocus] = useQueryState("focus", focusParser)

  const booted = useRef(false)
  const restoring = useRef(false)
  const restoreQueue = useRef<string[]>([])
  const focusTarget = useRef<AppId | null>(null)
  const modeMounted = useRef(false)

  /** Navigate within the OS, preserving query state so a window-open doesn't drop the URL. */
  const go = (path: string) => {
    void navigate(isBrowser ? path + window.location.search : path)
  }

  // Reconcile the current Gatsby page into a window on route change, and pump the
  // deep-link restore queue (one navigation opens one queued window at a time).
  useEffect(() => {
    const pathname = normPath(location.pathname)
    const app = appForPath(pathname)
    const vw = isBrowser ? window.innerWidth : 1280
    const vh = isBrowser ? window.innerHeight : 800
    send({ type: "OPEN", app, path: pathname, title: app.title, element, vw, vh })

    if (restoring.current) {
      const rest = restoreQueue.current.filter((p) => p !== pathname)
      restoreQueue.current = rest
      if (rest.length) {
        go(rest[0])
      } else {
        restoring.current = false
        const target = focusTarget.current
        const p = target && pathForId(target)
        if (p) send({ type: "FOCUS_PATH", path: p })
      }
    }
    // location.key changes on every navigation; element is captured per-route.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.key])

  // Boot: restore mode + window arrangement from the URL once, on the client.
  useEffect(() => {
    if (booted.current || !isBrowser) return
    booted.current = true
    if (mobile.current) {
      send({ type: "SET_MODE", mode: "site" })
      return
    }
    if (urlMode) send({ type: "SET_MODE", mode: urlMode })
    else if (window.innerWidth < 880) send({ type: "SET_MODE", mode: "site" })

    const curAppPath = appForPath(location.pathname).path
    const queue = Array.from(
      new Set(urlOpen.map(pathForId).filter((p): p is string => !!p && p !== curAppPath))
    )
    focusTarget.current = urlFocus
    if (queue.length) {
      restoring.current = true
      restoreQueue.current = queue
      go(queue[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Mirror machine → URL once booted (skipped while restoring and on mobile).
  useEffect(() => {
    if (!booted.current || restoring.current || mobile.current) return
    const ids = Array.from(new Set(windows.map((w) => w.app.id)))
    const focusId = windows.find((w) => w.key === focusedKey)?.app.id ?? null
    void setUrlOpen(ids.length ? ids : null)
    void setUrlFocus(focusId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windows, focusedKey])

  useEffect(() => {
    if (!modeMounted.current) {
      modeMounted.current = true
      return
    }
    void setUrlMode(experience)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experience])

  const value: AppContextValue = {
    experience,
    setExperience: (e) => {
      if (!mobile.current) send({ type: "SET_MODE", mode: e })
    },
    windows,
    focusedKey,
    open: (path) => go(path),
    closeWindow: (key) => send({ type: "CLOSE", key }),
    focusWindow: (key) => send({ type: "FOCUS", key }),
    minimizeWindow: (key, val) => send({ type: "MINIMIZE", key, value: val }),
    toggleMaximize: (key) => {
      const wn = windows.find((w) => w.key === key)
      send(wn?.maximized ? { type: "RESTORE", key } : { type: "MAXIMIZE", key })
    },
    moveWindow: (key, x, y) => send({ type: "MOVE", key, x, y }),
    resizeWindow: (key, w, h) => send({ type: "RESIZE", key, w, h }),
    constraintsRef,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
