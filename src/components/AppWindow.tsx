import React, { useEffect, useRef } from "react"
import { motion, useDragControls, useMotionValue } from "framer-motion"
import { useApp, type WindowItem } from "@/context/App"
import { AppIcon } from "./AppIcon"

type Props = { item: WindowItem }

const MIN_W = 360
const MIN_H = 260
const TASKBAR_H = 40

// macOS-semantic control hues (kept subdued); glyphs use a dark tint for AA.
const TRAFFIC = { close: "#e0655a", minimize: "#e3b341", zoom: "#8bbf6b" } as const
const GLYPH = "rgba(0,0,0,0.6)"

const glyphProps = { viewBox: "0 0 12 12", className: "size-2.5", "aria-hidden": true } as const

const CloseGlyph: React.FC = () => (
  <svg {...glyphProps} fill="none" stroke={GLYPH} strokeWidth={1.5} strokeLinecap="round">
    <path d="M3.4 3.4L8.6 8.6M8.6 3.4L3.4 8.6" />
  </svg>
)

const MinimizeGlyph: React.FC = () => (
  <svg {...glyphProps} fill="none" stroke={GLYPH} strokeWidth={1.5} strokeLinecap="round">
    <path d="M3 6H9" />
  </svg>
)

const ZoomGlyph: React.FC<{ maximized: boolean }> = ({ maximized }) => (
  <svg {...glyphProps} fill={GLYPH}>
    {maximized ? (
      <>
        <path d="M6.4 6.4V3L3 6.4Z" />
        <path d="M5.6 5.6V9L9 5.6Z" />
      </>
    ) : (
      <>
        <path d="M2.8 2.8H6.3L2.8 6.3Z" />
        <path d="M9.2 9.2H5.7L9.2 5.7Z" />
      </>
    )}
  </svg>
)

type LightProps = { color: string; label: string; onClick: () => void; children: React.ReactNode }

const Light: React.FC<LightProps> = ({ color, label, onClick, children }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    onPointerDown={(e) => e.stopPropagation()}
    onClick={onClick}
    style={{ backgroundColor: color }}
    className="grid size-3.5 cursor-pointer place-items-center rounded-full shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.22)] transition-transform active:scale-90 motion-reduce:transition-none"
  >
    <span className="pointer-events-none scale-75 opacity-0 transition duration-150 group-hover/lights:scale-100 group-hover/lights:opacity-100 group-focus-within/lights:scale-100 group-focus-within/lights:opacity-100 motion-reduce:transition-none">
      {children}
    </span>
  </button>
)

/** A single draggable, resizable OS window rendered on the desktop. */
export const AppWindow: React.FC<Props> = ({ item }) => {
  const { focusWindow, closeWindow, minimizeWindow, toggleMaximize, updateWindow, focusedKey, constraintsRef } = useApp()
  const dragControls = useDragControls()
  const x = useMotionValue(item.x)
  const y = useMotionValue(item.y)
  const focused = focusedKey === item.key

  // Keep motion values in sync when position is changed elsewhere (e.g. unmaximize).
  useEffect(() => {
    x.set(item.x)
    y.set(item.y)
  }, [item.x, item.y, x, y])

  const resizing = useRef<{ startX: number; startY: number; w: number; h: number } | null>(null)

  const onResizePointerMove = (e: PointerEvent) => {
    const r = resizing.current
    if (!r) return
    const w = Math.max(MIN_W, r.w + (e.clientX - r.startX))
    const h = Math.max(MIN_H, r.h + (e.clientY - r.startY))
    updateWindow(item.key, { w, h })
  }

  const onResizePointerUp = () => {
    resizing.current = null
    window.removeEventListener("pointermove", onResizePointerMove)
    window.removeEventListener("pointerup", onResizePointerUp)
  }

  const startResize = (e: React.PointerEvent) => {
    e.stopPropagation()
    focusWindow(item.key)
    resizing.current = { startX: e.clientX, startY: e.clientY, w: item.w, h: item.h }
    window.addEventListener("pointermove", onResizePointerMove)
    window.addEventListener("pointerup", onResizePointerUp)
  }

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", onResizePointerMove)
      window.removeEventListener("pointerup", onResizePointerUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (item.minimized) return null

  const maximized = item.maximized
  const positionStyle: React.CSSProperties = maximized
    ? { left: 8, top: 8, right: 8, bottom: TASKBAR_H + 8, width: "auto", height: "auto" }
    : { left: 0, top: 0, width: item.w, height: item.h }

  return (
    <motion.div
      className="absolute flex flex-col overflow-hidden rounded-win border border-line bg-panel shadow-window"
      style={{ ...positionStyle, x: maximized ? 0 : x, y: maximized ? 0 : y, zIndex: item.z }}
      drag={!maximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0}
      onMouseDownCapture={() => focusWindow(item.key)}
      onDragEnd={() => updateWindow(item.key, { x: x.get(), y: y.get() })}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.14, ease: "easeOut" }}
    >
      <div
        className={`flex h-9 shrink-0 items-center gap-2 border-b border-line px-3 ${focused ? "bg-canvas" : "bg-panel"}`}
        onPointerDown={(e) => {
          if (!maximized) dragControls.start(e)
        }}
        onDoubleClick={() => toggleMaximize(item.key)}
        style={{ cursor: maximized ? "default" : "grab" }}
      >
        <div className="group/lights flex items-center gap-2 motion-safe:transition-transform motion-safe:duration-150 motion-safe:hover:-translate-y-px">
          <Light color={TRAFFIC.close} label={`Close ${item.title}`} onClick={() => closeWindow(item.key)}>
            <CloseGlyph />
          </Light>
          <Light color={TRAFFIC.minimize} label={`Minimize ${item.title}`} onClick={() => minimizeWindow(item.key, true)}>
            <MinimizeGlyph />
          </Light>
          <Light
            color={TRAFFIC.zoom}
            label={`${maximized ? "Restore" : "Maximize"} ${item.title}`}
            onClick={() => toggleMaximize(item.key)}
          >
            <ZoomGlyph maximized={maximized} />
          </Light>
        </div>
        <div className="ml-1 flex min-w-0 items-center gap-1.5 text-ink/70">
          <AppIcon id={item.app.icon} size={14} />
          <span className="truncate text-[13px] font-medium">{item.title}</span>
        </div>
      </div>

      <div className="win-scroll min-h-0 flex-1 overflow-auto bg-panel">{item.element}</div>

      {!maximized && (
        <div
          onPointerDown={startResize}
          className="absolute bottom-0 right-0 size-4 cursor-se-resize"
          style={{
            backgroundImage:
              "linear-gradient(135deg, transparent 0 50%, rgba(21,23,26,0.25) 50% 60%, transparent 60% 70%, rgba(21,23,26,0.25) 70% 80%, transparent 80%)",
          }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  )
}
