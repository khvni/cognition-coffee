import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const Chevron: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 flex-none text-muted transition-transform duration-200"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

type FaqItem = {
  question: string
  answer: string
}

export const FAQ: React.FC<{ items: FaqItem[] }> = ({ items }) => {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div key={i} className="border-b border-line">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-ink"
            aria-expanded={open === i}
          >
            <span className="text-[0.9375rem] font-medium text-ink [text-wrap:balance]">{item.question}</span>
            <Chevron open={open === i} />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <p className="pb-4 text-[0.9375rem] leading-relaxed text-muted [text-wrap:pretty]">{item.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
