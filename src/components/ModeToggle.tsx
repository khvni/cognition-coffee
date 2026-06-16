import React from "react"
import { useApp } from "@/context/App"

/** Switches between the desktop OS experience and the plain arranged-page site. */
export const ModeToggle: React.FC = () => {
  const { experience, setExperience } = useApp()
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-panel p-0.5 text-[12px]">
      <button
        type="button"
        onClick={() => setExperience("os")}
        aria-pressed={experience === "os"}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          experience === "os" ? "bg-ink text-panel" : "text-muted hover:text-ink"
        }`}
      >
        OS
      </button>
      <button
        type="button"
        onClick={() => setExperience("site")}
        aria-pressed={experience === "site"}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          experience === "site" ? "bg-ink text-panel" : "text-muted hover:text-ink"
        }`}
      >
        Site
      </button>
    </div>
  )
}
