import React, { useCallback, useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useApp } from "@/context/App"
import { APPS, type AppDef } from "@/lib/apps"
import { AppIcon } from "./AppIcon"

const WALLPAPER = "/wallpapers/otter-desktop.jpg"

/** Vintage CRT treatment: scanlines + aperture grille + vignette, with optional phosphor flicker. */
const Crt: React.FC = () => {
  const reduce = useReducedMotion()
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(125% 120% at 50% 48%, transparent 56%, rgba(10,8,6,0.24) 100%)",
            "repeating-linear-gradient(to right, rgba(255,40,40,0.03) 0 1px, rgba(40,255,40,0.03) 1px 2px, rgba(40,40,255,0.03) 2px 3px)",
            "repeating-linear-gradient(to bottom, rgba(18,14,10,0.08) 0 1px, transparent 1px 3px)",
          ].join(","),
        }}
      />
      {!reduce && (
        <>
          <motion.div
            className="absolute inset-0 bg-[#FFFBEB] mix-blend-overlay"
            initial={{ opacity: 0.04 }}
            animate={{ opacity: [0.03, 0.06, 0.035, 0.055, 0.03] }}
            transition={{ duration: 0.16, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-x-0 top-0 h-1/3"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.07) 50%, transparent)",
            }}
            initial={{ y: "-120%" }}
            animate={{ y: "320%" }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}
    </div>
  )
}

const ICON_STORE_KEY = "ccvm.icon-positions"
const ICON_GAP = 88

type IconPos = { x: number; y: number }
type IconPositions = Record<string, IconPos>

function defaultPositions(icons: AppDef[]): IconPositions {
  const pos: IconPositions = {}
  icons.forEach((app, i) => {
    pos[app.id] = { x: 12, y: 12 + i * ICON_GAP }
  })
  return pos
}

function loadPositions(icons: AppDef[]): IconPositions {
  if (typeof window === "undefined") return defaultPositions(icons)
  try {
    const raw = window.localStorage.getItem(ICON_STORE_KEY)
    if (!raw) return defaultPositions(icons)
    const parsed = JSON.parse(raw) as IconPositions
    const defaults = defaultPositions(icons)
    icons.forEach((app) => {
      if (!parsed[app.id]) parsed[app.id] = defaults[app.id]
    })
    return parsed
  } catch {
    return defaultPositions(icons)
  }
}

function savePositions(pos: IconPositions) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(ICON_STORE_KEY, JSON.stringify(pos))
}

type DraggableIconProps = {
  app: AppDef
  pos: IconPos
  onDragEnd: (id: string, x: number, y: number) => void
  onOpen: (path: string) => void
}

const DraggableIcon: React.FC<DraggableIconProps> = ({ app, pos, onDragEnd, onOpen }) => {
  const dragging = useRef(false)
  const startPos = useRef({ x: 0, y: 0 })
  const startMouse = useRef({ x: 0, y: 0 })
  const elRef = useRef<HTMLDivElement>(null)
  const moved = useRef(false)

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true
    moved.current = false
    startPos.current = { x: pos.x, y: pos.y }
    startMouse.current = { x: e.clientX, y: e.clientY }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }, [pos])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - startMouse.current.x
    const dy = e.clientY - startMouse.current.y
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved.current = true
    if (!elRef.current) return
    elRef.current.style.transform = `translate(${startPos.current.x + dx}px, ${startPos.current.y + dy}px)`
  }, [])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return
    dragging.current = false
    ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    const dx = e.clientX - startMouse.current.x
    const dy = e.clientY - startMouse.current.y
    if (moved.current) {
      const el = elRef.current
      const iw = el?.offsetWidth ?? 80
      const ih = el?.offsetHeight ?? 88
      const nx = Math.min(window.innerWidth - iw, Math.max(0, startPos.current.x + dx))
      const ny = Math.min(window.innerHeight - 40 - ih, Math.max(0, startPos.current.y + dy))
      onDragEnd(app.id, nx, ny)
    } else {
      onOpen(app.path)
    }
  }, [app.id, app.path, onDragEnd, onOpen])

  const handleKeyOpen = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(app.path) }
  }, [app.path, onOpen])

  return (
    <div
      ref={elRef}
      className="absolute"
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <button
        type="button"
        onKeyDown={handleKeyOpen}
        className="group flex w-20 cursor-default flex-col items-center gap-1.5 rounded-md px-1 py-2 text-center transition-colors hover:bg-panel/25 focus-visible:bg-panel/30"
      >
        <span
          className="block transition-transform group-hover:-translate-y-0.5"
          style={{ filter: "drop-shadow(0 6px 10px rgba(16,12,8,0.34))" }}
        >
          <AppIcon id={app.icon} size={50} />
        </span>
        <span className="rounded bg-panel/75 px-1.5 py-0.5 text-[12px] font-medium leading-tight text-ink backdrop-blur-sm">
          {app.title}
        </span>
      </button>
    </div>
  )
}

/** The OS backdrop: the otter photo wallpaper under a vintage CRT overlay, plus launchable app icons. */
export const Desktop: React.FC = () => {
  const { open } = useApp()
  const icons = APPS.filter((a) => a.desktop)
  const [positions, setPositions] = useState<IconPositions>(() => loadPositions(icons))

  useEffect(() => {
    setPositions(loadPositions(icons))
  }, [icons.length])

  const handleDragEnd = useCallback((id: string, x: number, y: number) => {
    setPositions((prev) => {
      const next = { ...prev, [id]: { x, y } }
      savePositions(next)
      return next
    })
  }, [])

  return (
    <div className="absolute inset-0 bottom-10 overflow-hidden bg-wallpaper">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundImage: `url(${WALLPAPER})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />

      <div className="relative h-full w-full">
        {icons.map((app) => (
          <DraggableIcon
            key={app.id}
            app={app}
            pos={positions[app.id] ?? { x: 12, y: 12 }}
            onDragEnd={handleDragEnd}
            onOpen={open}
          />
        ))}
      </div>

      <Crt />
    </div>
  )
}
