import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type FaqLink = { label: string; href: string; external?: boolean }

type FaqItem = {
  question: string
  answer: string
  links?: FaqLink[]
}

export const FAQ: React.FC<{ items: FaqItem[] }> = ({ items }) => {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.05 }}
          className="overflow-hidden rounded-win bg-panel shadow-card"
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left font-sans transition-colors hover:bg-canvas active:scale-[0.99]"
            aria-expanded={open === i}
          >
            <span className="text-[0.9375rem] font-medium text-ink [text-wrap:balance]">{item.question}</span>
            <span className="flex-none text-[0.9375rem] text-muted" aria-hidden="true">
              {open === i ? "−" : "+"}
            </span>
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
                <p className="px-4 pb-4 text-[0.9375rem] leading-relaxed text-muted [text-wrap:pretty]">
                  {item.answer}
                  {item.links && item.links.length > 0 && (
                    <span className="ml-1">
                      {item.links.map((link, idx) => (
                        <React.Fragment key={link.href}>
                          <a
                            href={link.href}
                            target={link.external !== false ? "_blank" : undefined}
                            rel={link.external !== false ? "noopener" : undefined}
                            className="text-accent-ink no-underline transition-colors hover:underline"
                          >
                            {link.label}
                          </a>
                          {idx < item.links.length - 1 ? " and " : ""}
                        </React.Fragment>
                      ))}
                      .
                    </span>
                  )}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
