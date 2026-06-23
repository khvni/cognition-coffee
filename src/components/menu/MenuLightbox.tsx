import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { MenuItem } from "@/data/menu"

type Props = {
  item: MenuItem | null
  onClose: () => void
}

export const MenuLightbox: React.FC<Props> = ({ item, onClose }) => {
  const [selected, setSelected] = useState<Record<string, string>>({})

  useEffect(() => {
    if (item) setSelected({})
  }, [item])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!item) return
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [item, handleKeyDown])

  return (
    <AnimatePresence initial={false}>
      {item && (
        <motion.div
          className="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-label={item.name}
        >
          <motion.div
            className="lightbox-panel"
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={onClose}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className="lightbox-image">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="lightbox-body">
              <h2 className="lightbox-title">{item.name}</h2>
              <p className="lightbox-desc">{item.description}</p>

              <section className="lightbox-section" aria-labelledby="lb-breakdown">
                <h3 className="lightbox-section-heading" id="lb-breakdown">What's Included</h3>
                <ol className="lightbox-breakdown">
                  {item.breakdown.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </section>

              <section className="lightbox-section" aria-labelledby="lb-options">
                <h3 className="lightbox-section-heading" id="lb-options">Customize</h3>
                <div className="lightbox-options">
                  {item.orderingOptions.map((opt) => (
                    <fieldset key={opt.label} className="lightbox-option-group">
                      <legend className="lightbox-option-legend">{opt.label}</legend>
                      <div className="lightbox-radio-group">
                        {opt.choices.map((choice) => (
                          <label key={choice} className="lightbox-radio">
                            <input
                              type="radio"
                              name={`opt-${item.id}-${opt.label}`}
                              value={choice}
                              checked={selected[opt.label] === choice}
                              onChange={() =>
                                setSelected((prev) => ({ ...prev, [opt.label]: choice }))
                              }
                            />
                            <span className="lightbox-radio__indicator" aria-hidden="true" />
                            <span className="lightbox-radio__text">{choice}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
