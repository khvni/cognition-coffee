import React, { useState } from "react"
import { Link } from "gatsby"
import { AnimatePresence } from "framer-motion"
import { useApp } from "@/context/App"
import { APPS } from "@/lib/apps"
import { Desktop } from "./Desktop"
import { AppWindow } from "./AppWindow"
import { TaskBar } from "./TaskBar"
import { ModeToggle } from "./ModeToggle"
import { SITE_CONTAINER } from "@/lib/layout"
import { SOCIALS } from "@/data/experience"

const NAV = APPS.filter((a) => a.id !== "home" && a.nav !== false)

const Wordmark: React.FC = () => (
  <>The Cognition <span className="text-accent-ink">Coffee</span> Company</>
)

const SiteNav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur">
      <nav className={`${SITE_CONTAINER} flex items-center gap-2 py-2.5`}>
        <Link to="/" className="inline-flex min-h-[40px] items-center pr-2 text-[15px] font-medium tracking-tight text-ink">
          <Wordmark />
        </Link>
        <ul className="ml-1 hidden items-center gap-0.5 sm:flex">
          {NAV.map((a) => (
            <li key={a.id}>
              <Link
                to={a.path}
                className="flex min-h-[40px] items-center rounded-md px-3 text-[14px] text-muted transition-colors hover:bg-panel hover:text-ink"
                activeClassName="bg-panel text-ink"
              >
                {a.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-1.5">
          <ModeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="grid size-11 place-items-center rounded-md text-muted transition-colors hover:bg-panel hover:text-ink sm:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {menuOpen
                ? <><line x1="4" y1="4" x2="14" y2="14" /><line x1="14" y1="4" x2="4" y2="14" /></>
                : <><line x1="3" y1="5" x2="15" y2="5" /><line x1="3" y1="9" x2="15" y2="9" /><line x1="3" y1="13" x2="15" y2="13" /></>}
            </svg>
          </button>
        </div>
      </nav>
      {menuOpen && (
        <ul className="border-t border-line px-3 py-2 sm:hidden">
          {NAV.map((a) => (
            <li key={a.id}>
              <Link
                to={a.path}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[44px] items-center rounded-md px-3 text-[15px] text-muted transition-colors hover:bg-panel hover:text-ink"
                activeClassName="bg-panel text-ink"
              >
                {a.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

const FooterColumn: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <p className="font-mono text-[11px] uppercase tracking-wide text-muted">{label}</p>
    <ul className="mt-3 space-y-1">{children}</ul>
  </div>
)

const footerLink = "inline-flex min-h-[32px] items-center text-[13px] text-muted transition-colors hover:text-ink"

const SiteFooter: React.FC = () => (
  <footer className="border-t border-line">
    <div className={`${SITE_CONTAINER} py-12`}>
      <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <Link to="/" className="inline-flex min-h-[36px] items-center text-[15px] font-medium tracking-tight text-ink">
            <Wordmark />
          </Link>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">
            Built with Devin. Fueled by coffee.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <FooterColumn label="Pages">
            {NAV.map((a) => (
              <li key={a.id}>
                <Link to={a.path} className={footerLink} activeClassName="text-ink">
                  {a.title}
                </Link>
              </li>
            ))}
          </FooterColumn>
          <FooterColumn label="Elsewhere">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className={footerLink}>
                  {s.label}
                </a>
              </li>
            ))}
          </FooterColumn>
        </div>
      </div>
      <p className="mt-10 border-t border-line pt-6 font-mono text-[12px] text-muted">cognitioncoffee.co</p>
    </div>
  </footer>
)

/** Top-level chrome. `os` renders the windowed desktop; `site` renders pages inline. */
export const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { experience, windows, constraintsRef } = useApp()

  if (experience === "site") {
    return (
      <div className="flex min-h-screen flex-col bg-canvas text-ink">
        <SiteNav />
        <main className="w-full flex-1">{children}</main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div ref={constraintsRef} className="relative h-screen w-screen overflow-hidden bg-canvas text-ink">
      <Desktop />
      <AnimatePresence>
        {windows.map((w) => (
          <AppWindow key={w.key} item={w} />
        ))}
      </AnimatePresence>
      <TaskBar />
    </div>
  )
}
