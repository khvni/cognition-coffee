import React, { useEffect, useRef } from "react"

declare global {
  interface Window {
    THREE?: unknown
    VANTA?: {
      FOG: (config: Record<string, unknown>) => { destroy: () => void }
      [key: string]: unknown
    }
  }
}

const VANTA_ID = "vanta-fog-bg"

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof document === "undefined") return resolve()
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`,
    )
    if (existing) {
      if (existing.dataset.loaded === "1") return resolve()
      existing.addEventListener("load", () => resolve(), { once: true })
      existing.addEventListener("error", () => reject(), { once: true })
      return
    }
    const el = document.createElement("script")
    el.src = src
    el.async = true
    el.onload = () => {
      el.dataset.loaded = "1"
      resolve()
    }
    el.onerror = () => reject()
    document.body.appendChild(el)
  })
}

export const VantaFog: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const effectRef = useRef<{ destroy: () => void } | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    let cancelled = false

    const el = ref.current
    if (!el) return

    const THREE_SRC = "/vendor/three.r134.min.js"
    const VANTA_SRC = "/vendor/vanta.fog.min.js"

    loadScript(THREE_SRC)
      .then(() => loadScript(VANTA_SRC))
      .then(() => {
        if (cancelled || !window.VANTA || !window.THREE || !ref.current) return
        effectRef.current = window.VANTA.FOG({
          el: ref.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0xf9c041,
          midtoneColor: 0x317cff,
          lowlightColor: 0x2200ff,
          baseColor: 0xfae9cd,
          speed: 0.8,
        })
      })
      .catch(() => {})

    return () => {
      cancelled = true
      if (effectRef.current) {
        effectRef.current.destroy()
        effectRef.current = null
      }
    }
  }, [])

  return (
    <div
      id={VANTA_ID}
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    />
  )
}
