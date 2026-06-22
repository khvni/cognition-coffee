import React from "react"
import type { MenuItem } from "@/data/menu"

type Props = {
  item: MenuItem
  onClick: () => void
}

export const MenuCard: React.FC<Props> = ({ item, onClick }) => (
  <button
    type="button"
    className="menu-card"
    onClick={onClick}
    aria-label={`View details for ${item.name}`}
  >
    <div className="menu-card__image">
      <img src={item.image} alt={item.name} loading="lazy" />
    </div>
    <div className="menu-card__body">
      <h3 className="menu-card__name">{item.name}</h3>
      <p className="menu-card__caption">{item.subcaption}</p>
    </div>
  </button>
)
