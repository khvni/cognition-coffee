/**
 * The OS state machine — single source of truth for the windowed desktop.
 * Window lifecycle (open/focus/close), z-order, minimize/maximize, geometry, and
 * the OS⇄site mode all live here so the React layer stays a thin view.
 */
import type React from "react"
import { assign, setup } from "xstate"
import type { AppDef } from "@/lib/apps"

export type Experience = "os" | "site"

export type WindowItem = {
  key: string
  app: AppDef
  path: string
  title: string
  element: React.ReactNode
  x: number
  y: number
  w: number
  h: number
  z: number
  minimized: boolean
  maximized: boolean
}

export type OsContext = {
  windows: WindowItem[]
  focusedKey: string | null
  topZ: number
  keySeq: number
}

export type OsEvent =
  | { type: "SET_MODE"; mode: Experience }
  | { type: "OPEN"; app: AppDef; path: string; title: string; element: React.ReactNode; vw: number; vh: number }
  | { type: "CLOSE"; key: string }
  | { type: "CLOSE_ALL" }
  | { type: "FOCUS"; key: string }
  | { type: "FOCUS_PATH"; path: string }
  | { type: "MINIMIZE"; key: string; value?: boolean }
  | { type: "MAXIMIZE"; key: string }
  | { type: "RESTORE"; key: string }
  | { type: "MOVE"; key: string; x: number; y: number }
  | { type: "RESIZE"; key: string; w: number; h: number }

const patch = (windows: WindowItem[], key: string, fn: (wn: WindowItem) => WindowItem): WindowItem[] =>
  windows.map((wn) => (wn.key === key ? fn(wn) : wn))

function defaultPosition(app: AppDef, count: number, vw: number, vh: number) {
  const w = Math.min(app.size.w, vw - 32)
  const h = Math.min(app.size.h, vh - 96)
  if (app.center) {
    return { x: Math.max(16, (vw - w) / 2), y: Math.max(40, (vh - h) / 2 - 10), w, h }
  }
  const offset = (count % 6) * 28
  return { x: 80 + offset, y: 64 + offset, w, h }
}

export const osMachine = setup({
  types: { context: {} as OsContext, events: {} as OsEvent },
}).createMachine({
  id: "os",
  initial: "os",
  context: { windows: [], focusedKey: null, topZ: 10, keySeq: 0 },
  on: {
    OPEN: {
      actions: assign(({ context, event }) => {
        const z = context.topZ + 1
        const existing = context.windows.find((wn) => wn.path === event.path)
        if (existing) {
          return {
            topZ: z,
            focusedKey: existing.key,
            windows: patch(context.windows, existing.key, (wn) => ({
              ...wn,
              element: event.element,
              title: event.title,
              z,
              minimized: false,
            })),
          }
        }
        const key = `win-${context.keySeq + 1}`
        const pos = defaultPosition(event.app, context.windows.length, event.vw, event.vh)
        const win: WindowItem = {
          key,
          app: event.app,
          path: event.path,
          title: event.title,
          element: event.element,
          ...pos,
          z,
          minimized: false,
          maximized: false,
        }
        return { topZ: z, keySeq: context.keySeq + 1, focusedKey: key, windows: [...context.windows, win] }
      }),
    },
    FOCUS: {
      actions: assign(({ context, event }) => {
        const z = context.topZ + 1
        return {
          topZ: z,
          focusedKey: event.key,
          windows: patch(context.windows, event.key, (wn) => ({ ...wn, z, minimized: false })),
        }
      }),
    },
    FOCUS_PATH: {
      actions: assign(({ context, event }) => {
        const target = context.windows.find((wn) => wn.path === event.path)
        if (!target) return {}
        const z = context.topZ + 1
        return {
          topZ: z,
          focusedKey: target.key,
          windows: patch(context.windows, target.key, (wn) => ({ ...wn, z, minimized: false })),
        }
      }),
    },
    CLOSE: {
      actions: assign(({ context, event }) => {
        const remaining = context.windows.filter((wn) => wn.key !== event.key)
        const needRefocus = context.focusedKey === event.key
        return {
          windows: remaining,
          focusedKey: needRefocus
            ? remaining.filter((wn) => !wn.minimized).sort((a, b) => b.z - a.z)[0]?.key ?? null
            : context.focusedKey,
        }
      }),
    },
    CLOSE_ALL: {
      actions: assign(() => ({ windows: [], focusedKey: null })),
    },
    MINIMIZE: {
      actions: assign(({ context, event }) => {
        const willMinimize = event.value ?? !context.windows.find((wn) => wn.key === event.key)?.minimized
        const z = willMinimize ? context.topZ : context.topZ + 1
        const windows = patch(context.windows, event.key, (wn) => ({
          ...wn,
          minimized: willMinimize,
          ...(!willMinimize && { z }),
        }))
        return {
          topZ: z,
          windows,
          focusedKey: willMinimize
            ? (context.focusedKey === event.key
                ? windows.filter((wn) => !wn.minimized).sort((a, b) => b.z - a.z)[0]?.key ?? null
                : context.focusedKey)
            : event.key,
        }
      }),
    },
    MAXIMIZE: {
      actions: assign(({ context, event }) => ({
        windows: patch(context.windows, event.key, (wn) => ({ ...wn, maximized: true })),
      })),
    },
    RESTORE: {
      actions: assign(({ context, event }) => ({
        windows: patch(context.windows, event.key, (wn) => ({ ...wn, maximized: false })),
      })),
    },
    MOVE: {
      actions: assign(({ context, event }) => ({
        windows: patch(context.windows, event.key, (wn) => ({ ...wn, x: event.x, y: event.y })),
      })),
    },
    RESIZE: {
      actions: assign(({ context, event }) => ({
        windows: patch(context.windows, event.key, (wn) => ({ ...wn, w: event.w, h: event.h })),
      })),
    },
  },
  states: {
    os: { on: { SET_MODE: { target: "site", guard: ({ event }) => event.mode === "site" } } },
    site: { on: { SET_MODE: { target: "os", guard: ({ event }) => event.mode === "os" } } },
  },
})
