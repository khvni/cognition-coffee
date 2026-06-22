import React, { useState, type FC } from "react"
import { MENU_SECTIONS, type MenuItem } from "@/data/menu"
import { MenuCard } from "@/components/menu/MenuCard"
import { MenuLightbox } from "@/components/menu/MenuLightbox"

export const frontmatter = {
  title: "The Menu",
  description: "Browse the catalog. Pick a program. Customize the execution.",
  eyebrow: "Menu",
  layout: "grid" as const,
}

const Content: FC = () => {
  const [active, setActive] = useState<MenuItem | null>(null)

  return (
    <>
      {MENU_SECTIONS.map((section) => (
        <section
          key={section.id}
          className="menu-section"
          aria-labelledby={`section-${section.id}`}
        >
          <div className="menu-section__header">
            <h2 className="menu-section__title" id={`section-${section.id}`}>
              {section.title}
            </h2>
            <p className="menu-section__subtitle">{section.subtitle}</p>
          </div>
          <ul className="menu-grid" role="list">
            {section.items.map((item) => (
              <li key={item.id}>
                <MenuCard item={item} onClick={() => setActive(item)} />
              </li>
            ))}
          </ul>
        </section>
      ))}
      <MenuLightbox item={active} onClose={() => setActive(null)} />
    </>
  )
}

export default Content
