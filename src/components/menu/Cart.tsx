import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export type CartEntry = {
  key: string
  itemId: string
  itemName: string
  itemImage: string
  selections: Record<string, string | string[]>
  instructions?: string
}

type Props = {
  items: CartEntry[]
  onRemove: (key: string) => void
  onClear: () => void
}

const formatSelections = (sels: Record<string, string | string[]>): string =>
  Object.entries(sels)
    .map(([label, val]) => `${label}: ${Array.isArray(val) ? val.join(", ") : val}`)
    .join(" · ")

export const Cart: React.FC<Props> = ({ items, onRemove, onClear }) => {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)

  if (items.length === 0 && !sent) return null

  const handleSend = () => {
    setSent(true)
    setOpen(false)
    onClear()
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <>
      {sent && (
        <motion.div
          className="cart-toast"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 10l3.5 3.5L15 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Order sent. We'll get brewing.
        </motion.div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="cart-panel"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cart-header">
                <h2 className="cart-title">Your Order</h2>
                <button type="button" className="cart-clear" onClick={onClear}>
                  Clear
                </button>
              </div>

              {items.length === 0 ? (
                <p className="cart-empty">Your order is empty. Pick something from the menu.</p>
              ) : (
                <ul className="cart-list" role="list">
                  {items.map((entry) => (
                    <li key={entry.key} className="cart-item">
                      <img src={entry.itemImage} alt="" className="cart-item__img" loading="lazy" />
                      <div className="cart-item__body">
                        <h3 className="cart-item__name">{entry.itemName}</h3>
                        <p className="cart-item__selections">{formatSelections(entry.selections)}</p>
                        {entry.instructions && (
                          <p className="cart-item__instructions">Note: {entry.instructions}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        className="cart-item__remove"
                        onClick={() => onRemove(entry.key)}
                        aria-label={`Remove ${entry.itemName}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {items.length > 0 && (
                <button type="button" className="cart-send" onClick={handleSend}>
                  Send Order
                  <span className="cart-send__count">{items.length}</span>
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && items.length > 0 && (
        <motion.button
          type="button"
          className="cart-fab"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
          onClick={() => setOpen(true)}
          aria-label={`View your order, ${items.length} item${items.length > 1 ? "s" : ""}`}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M3 4h2l1.5 8h7L15 6H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="7" cy="14.5" r="1.2" fill="currentColor" />
            <circle cx="12.5" cy="14.5" r="1.2" fill="currentColor" />
          </svg>
          <span>View Order</span>
          <span className="cart-fab__count">{items.length}</span>
        </motion.button>
      )}
    </>
  )
}
