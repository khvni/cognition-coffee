import React, { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import type { OnboardingStep } from "@/data/onboarding"

type Props = {
  steps: OnboardingStep[]
  onComplete: () => void
}

const CHAR_MS = 28
const LINE_PAUSE = 400

const GLOW = {
  textShadow: "0 0 8px rgb(var(--accent-rgb) / 0.6), 0 0 20px rgb(var(--accent-rgb) / 0.25)",
} as const

const Crt: React.FC = () => {
  const reduce = useReducedMotion()
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[10001] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(125% 120% at 50% 48%, transparent 56%, rgba(0,0,0,0.35) 100%)",
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0.15) 0 1px, transparent 1px 3px)",
          ].join(","),
        }}
      />
      {!reduce && (
        <motion.div
          className="absolute inset-0 bg-accent/[0.03] mix-blend-overlay"
          initial={{ opacity: 0.02 }}
          animate={{ opacity: [0.02, 0.05, 0.025, 0.045, 0.02] }}
          transition={{ duration: 0.16, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  )
}

const Cursor: React.FC = () => (
  <motion.span
    className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.15em] bg-accent"
    animate={{ opacity: [1, 1, 0, 0] }}
    transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }}
    style={GLOW}
  />
)

export const OnboardingTerminal: React.FC<Props> = ({ steps, onComplete }) => {
  const [stepId, setStepId] = useState(steps[0]?.id ?? "")
  const [typed, setTyped] = useState("")
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [doneTyping, setDoneTyping] = useState(false)
  const [showChoices, setShowChoices] = useState(false)
  const [inputVal, setInputVal] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const step = steps.find((s) => s.id === stepId) ?? steps[0]
  const lines = step?.lines ?? []

  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null }
  }, [])

  useEffect(() => {
    return clearTimer
  }, [clearTimer])

  useEffect(() => {
    if (doneTyping || !lines.length) return

    const line = lines[lineIdx]
    if (line === undefined) {
      setDoneTyping(true)
      timerRef.current = setTimeout(() => setShowChoices(true), 300)
      return
    }

    if (charIdx <= line.length) {
      timerRef.current = setTimeout(() => {
        setTyped((prev) => {
          const built = lines.slice(0, lineIdx).join("\n") + (lineIdx > 0 ? "\n" : "") + line.slice(0, charIdx)
          return built
        })
        if (charIdx < line.length) {
          setCharIdx((c) => c + 1)
        } else {
          timerRef.current = setTimeout(() => {
            setLineIdx((l) => l + 1)
            setCharIdx(0)
          }, LINE_PAUSE)
        }
      }, CHAR_MS)
    }

    return clearTimer
  }, [lineIdx, charIdx, doneTyping, lines, clearTimer])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [typed, showChoices])

  const goTo = useCallback((nextId: string) => {
    clearTimer()
    setStepId(nextId)
    setTyped("")
    setLineIdx(0)
    setCharIdx(0)
    setDoneTyping(false)
    setShowChoices(false)
    setInputVal("")
  }, [clearTimer])

  useEffect(() => {
    if (showChoices) inputRef.current?.focus()
  }, [showChoices])

  const handleInputSubmit = useCallback(() => {
    const val = inputVal.trim().toLowerCase()
    if (!val || !step?.choices) return
    const match = step.choices.find((c) =>
      c.label.toLowerCase().startsWith(val)
    )
    if (match) goTo(match.next)
  }, [inputVal, step, goTo])

  if (!step) return null

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0a0a0a]">
      <Crt />
      <div
        ref={scrollRef}
        className="relative z-[10002] h-full w-full max-w-2xl overflow-y-auto bg-[#0a0a0a] px-8 py-12 sm:px-14 sm:py-24"
      >
        <pre
          className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-accent"
          style={GLOW}
        >
          {typed}
          {!doneTyping && <Cursor />}
        </pre>

        <AnimatePresence>
          {showChoices && !step.final && step.choices && (
            <motion.div
              className="mt-8 space-y-4"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="flex flex-wrap gap-3">
                {step.choices.map((c) => (
                  <button
                    key={c.next}
                    type="button"
                    onClick={() => goTo(c.next)}
                    className="cursor-pointer rounded border border-accent/40 px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/10"
                    style={GLOW}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 font-mono text-sm text-accent" style={GLOW}>
                <span aria-hidden="true">&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleInputSubmit() }}
                  className="flex-1 border-none bg-transparent font-mono text-sm text-accent outline-none placeholder:text-accent/30"
                  placeholder="type a choice"
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
              </div>
            </motion.div>
          )}

          {showChoices && step.final && (
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <button
                type="button"
                onClick={onComplete}
                className="cursor-pointer rounded bg-accent px-6 py-2.5 font-mono text-sm text-white transition-colors hover:bg-accent-ink"
                style={{ textShadow: "none" }}
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
        className="fixed bottom-6 right-6 z-[10003] cursor-pointer font-mono text-xs text-muted transition-colors hover:text-accent"
      >
        Skip
      </button>
    </div>
  )
}
