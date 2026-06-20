import React, { useEffect, useState } from "react"
import { useApp } from "@/context/App"
import { isMobile } from "@/lib/mobile"

/** Switches between the desktop OS experience and the plain arranged-page site. */
export const ModeToggle: React.FC = () => {
  const { experience, setExperience } = useApp()
  const [mobile, setMobile] = useState(false)
  useEffect(() => { setMobile(isMobile()) }, [])
  if (mobile) return null
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-panel p-0.5 text-[12px]">
      <button
        type="button"
        onClick={() => setExperience("os")}
        aria-pressed={experience === "os"}
        className={`flex min-h-[34px] items-center rounded-full px-3.5 transition-colors ${
          experience === "os" ? "bg-ink text-panel" : "text-muted hover:text-ink"
        }`}
      >
        OS
      </button>
      <button
        type="button"
        onClick={() => setExperience("site")}
        aria-pressed={experience === "site"}
        className={`flex min-h-[34px] items-center rounded-full px-3.5 transition-colors ${
          experience === "site" ? "bg-ink text-panel" : "text-muted hover:text-ink"
        }`}
      >
        Site
      </button>
    </div>
  )
}
