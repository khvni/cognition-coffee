import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useApp } from "@/context/App"
import { APPS } from "@/lib/apps"
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

/** The OS backdrop: the otter photo wallpaper under a vintage CRT overlay, plus launchable app icons. */
export const Desktop: React.FC = () => {
  const { open } = useApp()
  const icons = APPS.filter((a) => a.desktop)

  return (
    <div className="absolute inset-0 bottom-10 overflow-hidden bg-wallpaper">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundImage: `url(${WALLPAPER})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />

      <ul className="relative flex flex-col flex-wrap gap-1 p-3">
        {icons.map((app) => (
          <li key={app.id}>
            <button
              type="button"
              onDoubleClick={() => open(app.path)}
              onClick={(e) => {
                if (e.detail === 0) open(app.path)
              }}
              className="group flex w-20 flex-col items-center gap-1.5 rounded-md px-1 py-2 text-center transition-colors hover:bg-panel/25 focus-visible:bg-panel/30"
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
          </li>
        ))}
      </ul>

      <Crt />
    </div>
  )
}
