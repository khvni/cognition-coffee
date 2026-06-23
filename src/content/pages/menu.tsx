import React, { useState, useEffect, useRef, useCallback, type FC } from "react"
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
  const [currentSection, setCurrentSection] = useState(MENU_SECTIONS[0].id)
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section")
            if (id) setCurrentSection(id)
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    )
    sectionRefs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = useCallback((id: string) => {
    const el = sectionRefs.current.get(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  return (
    <>
      <nav className="menu-nav" aria-label="Menu categories">
        <div className="menu-nav__track">
          {MENU_SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`menu-nav__pill${currentSection === s.id ? " menu-nav__pill--active" : ""}`}
              onClick={() => scrollTo(s.id)}
              aria-current={currentSection === s.id ? "true" : undefined}
            >
              {s.title}
            </button>
          ))}
        </div>
      </nav>

      {MENU_SECTIONS.map((section) => (
        <section
          key={section.id}
          data-section={section.id}
          ref={(el) => {
            if (el) sectionRefs.current.set(section.id, el)
          }}
          className="menu-section"
          aria-labelledby={`section-${section.id}`}
        >
          <h2 className="menu-section__title" id={`section-${section.id}`}>
            {section.title}
          </h2>
          <p className="menu-section__subtitle">{section.subtitle}</p>
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
