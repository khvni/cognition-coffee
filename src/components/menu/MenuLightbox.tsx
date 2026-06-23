import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { MenuItem } from "@/data/menu"
import type { CartEntry } from "./Cart"

type Props = {
  item: MenuItem | null
  onClose: () => void
  onAddToCart: (entry: CartEntry) => void
}

type Selections = Record<string, string | string[]>

export const MenuLightbox: React.FC<Props> = ({ item, onClose, onAddToCart }) => {
  const [selected, setSelected] = useState<Selections>({})
  const [instructions, setInstructions] = useState("")

  useEffect(() => {
    if (item) {
      setSelected({})
      setInstructions("")
    }
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

  const toggleSingle = (label: string, choice: string) =>
    setSelected((prev) => {
      const next = { ...prev }
      if (next[label] === choice) delete next[label]
      else next[label] = choice
      return next
    })

  const toggleMulti = (label: string, choice: string) =>
    setSelected((prev) => {
      const cur = Array.isArray(prev[label]) ? prev[label] as string[] : []
      const next = cur.includes(choice) ? cur.filter((c) => c !== choice) : [...cur, choice]
      const out = { ...prev }
      if (next.length === 0) delete out[label]
      else out[label] = next
      return out
    })

  const handleAdd = () => {
    if (!item) return
    onAddToCart({
      key: `${item.id}-${Date.now()}`,
      itemId: item.id,
      itemName: item.name,
      itemImage: item.image,
      selections: selected,
      instructions: instructions.trim(),
    })
    onClose()
  }

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
                <details className="lightbox-details">
                  <summary className="lightbox-details__summary">
                    <span className="lightbox-section-heading" id="lb-breakdown">What's Included</span>
                    <svg className="lightbox-details__chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <ol className="lightbox-breakdown">
                    {item.breakdown.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </details>
              </section>

              <section className="lightbox-section" aria-labelledby="lb-options">
                <h3 className="lightbox-section-heading" id="lb-options">Customize Your Order</h3>
                <div className="lightbox-options">
                  {item.orderingOptions.map((opt) => (
                    <fieldset key={opt.label} className="lightbox-option-group">
                      <legend className="lightbox-option-legend">
                        {opt.label}
                        {opt.multi && <span className="lightbox-option-hint">Pick any</span>}
                      </legend>
                      <div className="lightbox-radio-group">
                        {opt.choices.map((choice) => {
                          const isMulti = opt.multi
                          const isChecked = isMulti
                            ? Array.isArray(selected[opt.label]) && (selected[opt.label] as string[]).includes(choice)
                            : selected[opt.label] === choice
                          return (
                            <label key={choice} className="lightbox-radio">
                              <input
                                type={isMulti ? "checkbox" : "radio"}
                                name={`opt-${item.id}-${opt.label}`}
                                value={choice}
                                checked={isChecked}
                                onChange={() =>
                                  isMulti ? toggleMulti(opt.label, choice) : toggleSingle(opt.label, choice)
                                }
                              />
                              <span className={`lightbox-radio__indicator${isMulti ? " lightbox-radio__indicator--check" : ""}`} aria-hidden="true" />
                              <span className="lightbox-radio__text">{choice}</span>
                            </label>
                          )
                        })}
                      </div>
                    </fieldset>
                  ))}
                </div>
              </section>

              <section className="lightbox-section" aria-labelledby="lb-instructions">
                <h3 className="lightbox-section-heading" id="lb-instructions">Special Instructions</h3>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Add any notes about timing, audience, or special requests..."
                  className="lightbox-instructions"
                  rows={3}
                />
              </section>
            </div>

            <div className="lightbox-footer">
              <button type="button" className="lightbox-add" onClick={handleAdd}>
                Add to Order
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
