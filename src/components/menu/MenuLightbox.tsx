import React, { useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { MenuItem } from "@/data/menu"

type Props = {
  item: MenuItem | null
  onClose: () => void
}

export const MenuLightbox: React.FC<Props> = ({ item, onClose }) => {
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
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className="lightbox-header">
              <div className="lightbox-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="lightbox-title-block">
                <h2 className="lightbox-title">{item.name}</h2>
                <p className="lightbox-desc">{item.description}</p>
              </div>
            </div>

            <section className="lightbox-section" aria-labelledby="breakdown-heading">
              <h3 className="lightbox-section-heading" id="breakdown-heading">Event Breakdown</h3>
              <ol className="lightbox-breakdown">
                {item.breakdown.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </section>

            <section className="lightbox-section" aria-labelledby="options-heading">
              <h3 className="lightbox-section-heading" id="options-heading">Ordering Options</h3>
              <div className="lightbox-options">
                {item.orderingOptions.map((opt) => (
                  <div key={opt.label} className="lightbox-option-group">
                    <h4 className="lightbox-option-label">{opt.label}</h4>
                    <div className="lightbox-chips">
                      {opt.choices.map((choice) => (
                        <span key={choice} className="lightbox-chip">{choice}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
