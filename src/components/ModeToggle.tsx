import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useApp } from "@/context/App"
import { isMobile } from "@/lib/mobile"

const spring = { type: "spring" as const, duration: 0.3, bounce: 0 }

/** Switches between the desktop OS experience and the plain arranged-page site. */
export const ModeToggle: React.FC = () => {
  const { experience, setExperience } = useApp()
  const [mobile, setMobile] = useState(false)
  useEffect(() => { setMobile(isMobile()) }, [])
  if (mobile) return null
  return (
    <div role="radiogroup" aria-label="Experience mode" className="relative inline-flex items-center rounded-full bg-panel p-0.5 text-[12px] shadow-card">
      <AnimatePresence initial={false}>
        <motion.span
          key={experience}
          layoutId="mode-pill"
          className="absolute inset-y-0.5 rounded-full bg-ink"
          style={{ width: "calc(50% - 2px)", left: experience === "os" ? 2 : "calc(50%)" }}
          transition={spring}
        />
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setExperience("os")}
        role="radio"
        aria-checked={experience === "os"}
        className={`relative z-[1] flex min-h-[34px] items-center rounded-full px-3.5 transition-[color] duration-150 ${
          experience === "os" ? "text-panel" : "text-muted hover:text-ink"
        }`}
      >
        OS
      </button>
      <button
        type="button"
        onClick={() => setExperience("site")}
        role="radio"
        aria-checked={experience === "site"}
        className={`relative z-[1] flex min-h-[34px] items-center rounded-full px-3.5 transition-[color] duration-150 ${
          experience === "site" ? "text-panel" : "text-muted hover:text-ink"
        }`}
      >
        Site
      </button>
    </div>
  )
}
