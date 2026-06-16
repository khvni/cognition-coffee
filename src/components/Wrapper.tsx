import React from "react"
import { Link } from "gatsby"
import { AnimatePresence } from "framer-motion"
import { useApp } from "@/context/App"
import { APPS } from "@/lib/apps"
import { Desktop } from "./Desktop"
import { AppWindow } from "./AppWindow"
import { TaskBar } from "./TaskBar"
import { ModeToggle } from "./ModeToggle"

const NAV = APPS.filter((a) => a.id !== "home")

const SiteNav: React.FC = () => (
  <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur">
    <nav className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-3">
      <Link to="/" className="text-[15px] font-semibold tracking-tight text-ink">
        cognition<span className="text-accent-ink">.coffee</span>
      </Link>
      <ul className="ml-2 hidden items-center gap-1 sm:flex">
        {NAV.map((a) => (
          <li key={a.id}>
            <Link
              to={a.path}
              className="rounded-md px-2.5 py-1.5 text-[14px] text-muted transition-colors hover:bg-panel hover:text-ink"
              activeClassName="bg-panel text-ink"
            >
              {a.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </nav>
  </header>
)

const SiteFooter: React.FC = () => (
  <footer className="border-t border-line">
    <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
      <p>The Cognition Coffee Company — a Devin community concept by Ali Khani.</p>
      <p className="font-mono text-[12px]">cognitioncoffee.co</p>
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
        <main className="mx-auto w-full max-w-reader flex-1 px-5 py-10">{children}</main>
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
