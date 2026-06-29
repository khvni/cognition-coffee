/**
 * First-visit mobile-only notice telling visitors the site is best on desktop.
 * Rendered once at the app root (see gatsby-browser.tsx). Dismissal persists in
 * localStorage so it shows only on the first mobile visit.
 */
import React, { useCallback, useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"

const STORAGE_KEY = "cognitioncoffee.desktopNotice.acknowledged"
const MOBILE_QUERY = "(max-width: 768px)"

function isAcknowledged(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1"
  } catch {
    return true
  }
}

function acknowledge(): void {
  try {
    localStorage.setItem(STORAGE_KEY, "1")
  } catch {}
}

export const DesktopNotice: React.FC = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (isAcknowledged()) return
    const mql = window.matchMedia(MOBILE_QUERY)
    if (!mql.matches) return
    setOpen(true)
    const onResize = (e: MediaQueryListEvent) => {
      if (!e.matches) setOpen(false)
    }
    mql.addEventListener("change", onResize)
    return () => mql.removeEventListener("change", onResize)
  }, [])

  const dismiss = useCallback(() => {
    setOpen(false)
    acknowledge()
  }, [])

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? setOpen(true) : dismiss())}>
      <DialogContent
        className="max-w-[340px] p-6"
        onPointerDownOutside={dismiss}
        onEscapeKeyDown={dismiss}
      >
        <DialogTitle className="text-[17px]">Howdy!</DialogTitle>
        <DialogDescription className="mt-2 text-[14px] text-ink/70">
          This site is best experienced on desktop - we&apos;ve got an OS mode for you to
          play around with there!
        </DialogDescription>
        <div className="mt-5 flex justify-end">
          <Button
            autoFocus
            onClick={dismiss}
            className="bg-accent text-canvas hover:opacity-90"
          >
            Continue to Cognition Coffee
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
