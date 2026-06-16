import React from "react"
import { useApp } from "@/context/App"
import { APPS } from "@/lib/apps"
import { AppIcon } from "./AppIcon"
import { Otter } from "./Otter"

/** The OS backdrop: wallpaper, centered mascot, and launchable app icons. */
export const Desktop: React.FC = () => {
  const { open } = useApp()
  const icons = APPS.filter((a) => a.desktop)

  return (
    <div className="os-wallpaper absolute inset-0 bottom-10 overflow-hidden">
      <div className="absolute inset-0 grid place-items-center">
        <Otter />
      </div>

      <ul className="relative flex flex-col flex-wrap gap-1 p-3">
        {icons.map((app) => (
          <li key={app.id}>
            <button
              type="button"
              onDoubleClick={() => open(app.path)}
              onClick={(e) => {
                if (e.detail === 0) open(app.path)
              }}
              className="group flex w-20 flex-col items-center gap-1 rounded-md px-1 py-2 text-center transition-colors hover:bg-ink/5 focus-visible:bg-ink/5"
            >
              <span className="grid size-12 place-items-center rounded-xl border border-line bg-panel text-ink shadow-card transition-transform group-hover:-translate-y-0.5">
                <AppIcon id={app.icon} size={24} />
              </span>
              <span className="text-[12px] font-medium leading-tight text-ink/80">{app.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
