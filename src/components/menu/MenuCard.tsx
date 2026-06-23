import React from "react"
import type { MenuItem } from "@/data/menu"

type Props = {
  item: MenuItem
  onClick: () => void
  onAddToCart?: () => void
}

export const MenuCard: React.FC<Props> = ({ item, onClick, onAddToCart }) => (
  <div className="menu-card">
    <div className="menu-card__media">
      <button
        type="button"
        className="menu-card__image"
        onClick={onClick}
        aria-label={`View details for ${item.name}`}
      >
        <img src={item.image} alt={item.name} loading="lazy" />
      </button>
      <button
        type="button"
        className="menu-card__expand"
        onClick={onClick}
        aria-label={`View details for ${item.name}`}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {onAddToCart && (
        <button
          type="button"
          className="menu-card__add"
          onClick={(e) => { e.stopPropagation(); onAddToCart() }}
          aria-label={`Add ${item.name} to order`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
    <button
      type="button"
      className="menu-card__body"
      onClick={onClick}
      aria-label={`View details for ${item.name}`}
    >
      <h3 className="menu-card__name">{item.name}</h3>
    </button>
  </div>
)
