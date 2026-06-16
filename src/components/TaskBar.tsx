import React, { useEffect, useState } from "react"
import { useApp } from "@/context/App"
import { ModeToggle } from "./ModeToggle"
import { AppIcon } from "./AppIcon"

const useClock = () => {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000 * 30)
    return () => window.clearInterval(id)
  }, [])
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

/** Bottom OS bar: brand, open-window pills, experience toggle, clock. */
export const TaskBar: React.FC = () => {
  const { windows, focusedKey, focusWindow, minimizeWindow } = useApp()
  const time = useClock()

  return (
    <div className="absolute inset-x-0 bottom-0 z-[9999] flex h-10 items-center gap-2 border-t border-line bg-panel/90 px-3 backdrop-blur">
      <span className="select-none whitespace-nowrap text-[13px] font-semibold tracking-tight text-ink">
        cognition<span className="text-accent-ink">.coffee</span>
      </span>

      <div className="mx-1 h-5 w-px bg-line" />

      <div className="win-scroll flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto">
        {windows.map((w) => {
          const active = w.key === focusedKey && !w.minimized
          return (
            <button
              key={w.key}
              type="button"
              onClick={() => (w.minimized ? minimizeWindow(w.key, false) : active ? minimizeWindow(w.key, true) : focusWindow(w.key))}
              className={`flex max-w-[170px] shrink-0 items-center gap-1.5 rounded-md border px-2 py-1 text-[12px] transition-colors ${
                active ? "border-line bg-canvas text-ink" : "border-transparent text-muted hover:bg-canvas hover:text-ink"
              } ${w.minimized ? "opacity-60" : ""}`}
              title={w.title}
            >
              <AppIcon id={w.app.icon} size={13} />
              <span className="truncate">{w.title}</span>
            </button>
          )
        })}
      </div>

      <ModeToggle />
      <span className="ml-1 select-none whitespace-nowrap font-mono text-[12px] tabular-nums text-muted">{time}</span>
    </div>
  )
}
