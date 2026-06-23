import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import type { OnboardingStep } from "@/data/onboarding"

type OnboardingTerminalProps = {
  steps: OnboardingStep[]
  onComplete: () => void
}

const CHAR_MS = 30
const LINE_PAUSE_MS = 400

const GLOW = "0 0 8px rgba(49,124,255,0.6), 0 0 20px rgba(49,124,255,0.25)"

const CrtOverlay: React.FC = () => {
  const reduce = useReducedMotion()
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(125% 120% at 50% 48%, transparent 56%, rgba(0,0,0,0.4) 100%)",
            "repeating-linear-gradient(to right, rgba(60,140,255,0.02) 0 1px, rgba(60,140,255,0.01) 1px 2px, transparent 2px 3px)",
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.03) 0 1px, transparent 1px 3px)",
          ].join(","),
        }}
      />
      {!reduce && (
        <>
          <motion.div
            className="absolute inset-0 bg-accent/5 mix-blend-overlay"
            initial={{ opacity: 0.03 }}
            animate={{ opacity: [0.02, 0.05, 0.025, 0.045, 0.02] }}
            transition={{ duration: 0.16, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-x-0 top-0 h-1/3"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, transparent, rgba(49,124,255,0.03) 45%, rgba(49,124,255,0.05) 50%, transparent)",
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

const Cursor: React.FC = () => (
  <motion.span
    className="inline-block font-mono text-accent"
    style={{ textShadow: GLOW }}
    animate={{ opacity: [1, 0] }}
    transition={{ duration: 0.7, repeat: Infinity, ease: "steps(2)" }}
  >
    _
  </motion.span>
)

function useStepIndex(steps: OnboardingStep[]) {
  const lookup = useMemo(() => {
    const m = new Map<string, number>()
    steps.forEach((s, i) => m.set(s.id, i))
    return m
  }, [steps])
  return lookup
}

export const OnboardingTerminal: React.FC<OnboardingTerminalProps> = ({ steps, onComplete }) => {
  const stepIndex = useStepIndex(steps)
  const [currentId, setCurrentId] = useState(steps[0]?.id ?? "")
  const [typed, setTyped] = useState("")
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [showChoices, setShowChoices] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const step = steps[stepIndex.get(currentId) ?? 0]
  const lines = step?.lines ?? []
  const doneTyping = lineIdx >= lines.length

  useEffect(() => {
    setTyped("")
    setLineIdx(0)
    setCharIdx(0)
    setShowChoices(false)
  }, [currentId])

  useEffect(() => {
    if (!step || doneTyping) {
      if (step) setShowChoices(true)
      return
    }

    const line = lines[lineIdx]
    if (charIdx < line.length) {
      timerRef.current = setTimeout(() => {
        setTyped((prev) => prev + line[charIdx])
        setCharIdx((c) => c + 1)
      }, CHAR_MS)
    } else {
      timerRef.current = setTimeout(() => {
        setTyped((prev) => prev + "\n")
        setLineIdx((l) => l + 1)
        setCharIdx(0)
      }, LINE_PAUSE_MS)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [step, lines, lineIdx, charIdx, doneTyping])

  const goTo = useCallback(
    (nextId: string) => {
      if (stepIndex.has(nextId)) setCurrentId(nextId)
    },
    [stepIndex],
  )

  if (!step) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]">
      <CrtOverlay />

      <div className="relative z-10 w-full max-w-[640px] px-6">
        <pre
          className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-accent"
          style={{ textShadow: GLOW }}
        >
          {typed}
          {!doneTyping && <Cursor />}
        </pre>

        <AnimatePresence>
          {showChoices && step.choices && (
            <motion.div
              className="mt-6 flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {step.choices.map((c) => (
                <button
                  key={`${c.label}-${c.next}`}
                  type="button"
                  onClick={() => goTo(c.next)}
                  className="cursor-pointer rounded border border-accent/40 px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/10"
                >
                  {c.label}
                </button>
              ))}
            </motion.div>
          )}

          {showChoices && step.final && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                type="button"
                onClick={onComplete}
                className="cursor-pointer rounded bg-accent px-6 py-2.5 font-mono text-sm text-canvas transition-colors hover:bg-accent-ink"
              >
                Begin
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={onComplete}
        className="absolute bottom-6 right-6 z-10 cursor-pointer font-mono text-xs text-muted transition-colors hover:text-accent"
      >
        Skip
      </button>
    </div>
  )
}
