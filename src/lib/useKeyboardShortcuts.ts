import { useEffect } from "react"
import { navigate } from "gatsby"
import type { Experience, WindowItem } from "@/os/osMachine"

type Opts = {
  experience: Experience
  windows: WindowItem[]
  focusedKey: string | null
  closeWindow: (key: string) => void
  minimizeWindow: (key: string, value?: boolean) => void
  toggleMaximize: (key: string) => void
  onHelp: () => void
}

const isTypingTarget = (el: Element | null): boolean => {
  if (!el) return false
  const tag = el.tagName
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true
  if ((el as HTMLElement).isContentEditable) return true
  return false
}

/** Linear-style single-letter shortcuts for OS mode. Fires only when not typing and no modifiers. */
export const useKeyboardShortcuts = (o: Opts) => {
  useEffect(() => {
    if (o.experience !== "os") return
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return
      const el = document.activeElement
      if (isTypingTarget(el)) return

      const focused = o.focusedKey ? o.windows.find((w) => w.key === o.focusedKey) : null

      if (e.key === "Escape") {
        if (focused && !focused.minimized) o.closeWindow(focused.key)
        return
      }
      if (e.key === "?") {
        e.preventDefault()
        o.onHelp()
        return
      }

      const k = e.key.toLowerCase()
      switch (k) {
        case "w":
          if (focused && !focused.minimized) o.closeWindow(focused.key)
          break
        case "m":
          if (focused) o.minimizeWindow(focused.key, !focused.minimized)
          break
        case "f":
          if (focused) o.toggleMaximize(focused.key)
          break
        case "t":
          void navigate("/terminal")
          break
        case "h":
          void navigate("/")
          break
        default:
          return
      }
      e.preventDefault()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [o])
}
