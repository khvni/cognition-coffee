import React, { useEffect, useRef } from "react"
import { motion, useDragControls, useMotionValue } from "framer-motion"
import { useApp, type WindowItem } from "@/context/App"
import { AppIcon } from "./AppIcon"

type Props = { item: WindowItem }

const MIN_W = 360
const MIN_H = 260
const TASKBAR_H = 40

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
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label={`Close ${item.title}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => closeWindow(item.key)}
            className="size-3 rounded-full bg-[#e0655a] transition-transform hover:scale-110"
          />
          <button
            type="button"
            aria-label={`Minimize ${item.title}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => minimizeWindow(item.key, true)}
            className="size-3 rounded-full bg-[#e3b341] transition-transform hover:scale-110"
          />
          <button
            type="button"
            aria-label={`Maximize ${item.title}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => toggleMaximize(item.key)}
            className="size-3 rounded-full bg-[#8bbf6b] transition-transform hover:scale-110"
          />
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
