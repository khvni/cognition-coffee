import React, { useState, useEffect, useRef, useCallback, type FC } from "react"
import { MENU_SECTIONS, fetchMenu, type MenuItem, type MenuSection } from "@/data/menu"
import { MenuCard } from "@/components/menu/MenuCard"
import { MenuLightbox } from "@/components/menu/MenuLightbox"
import { Cart, type CartEntry } from "@/components/menu/Cart"

export const frontmatter = {
  title: "The Menu",
  description: "Hungry for some bright ideas? Here's what we can brew for ya.",
  eyebrow: "Menu",
  layout: "grid" as const,
}

const Content: FC = () => {
  const [active, setActive] = useState<MenuItem | null>(null)
  const [cart, setCart] = useState<CartEntry[]>([])
  const [sections, setSections] = useState<MenuSection[]>(MENU_SECTIONS)
  const [loading, setLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState(MENU_SECTIONS[0].id)
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    let cancelled = false
    fetchMenu()
      .then((data) => {
        if (!cancelled && data.length) {
          setSections(data)
          setCurrentSection(data[0].id)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
    return () => { cancelled = true }
  }, [])

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
  }, [sections])

  const scrollTo = useCallback((id: string) => {
    const el = sectionRefs.current.get(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const addToCart = useCallback((entry: CartEntry) => {
    setCart((prev) => [...prev, entry])
  }, [])

  const removeFromCart = useCallback((key: string) => {
    setCart((prev) => prev.filter((e) => e.key !== key))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  return (
    <>
      <nav className="menu-nav" aria-label="Menu categories">
        <div className="menu-nav__track">
          {sections.map((s) => (
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

      {loading && (
        <div className="py-12 text-center">
          <p className="font-mono text-sm text-muted">Loading menu…</p>
        </div>
      )}

      {sections.map((section) => (
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

      <MenuLightbox item={active} onClose={() => setActive(null)} onAddToCart={addToCart} />
      <Cart items={cart} onRemove={removeFromCart} onClear={clearCart} />
    </>
  )
}

export default Content
