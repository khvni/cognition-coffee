import React, { useCallback, useEffect, useState } from "react"
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
import { ErrorBoundary } from "./ErrorBoundary"
import { OnboardingTerminal } from "./OnboardingTerminal"
import { ONBOARDING_FLOW } from "@/data/onboarding"
import { trackEvent } from "@/lib/posthog"

declare global {
  interface Window {
    __onboardingName?: string
  }
}

const NAV = APPS.filter((a) => a.id !== "home" && a.nav !== false)

const Logo: React.FC<{ nav?: boolean }> = ({ nav }) => (
  <img
    src="/cognitioncoffee.png"
    alt="Cognition Coffee"
    width={nav ? 36 : 28}
    height={nav ? 36 : 28}
    className={nav ? "object-contain sm:size-7" : "object-contain"}
  />
)

const SiteNav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-chrome">
      <nav className={`${SITE_CONTAINER} flex items-center gap-2 py-2.5`}>
        <Link to="/" className="inline-flex min-h-[40px] items-center gap-2 text-[15px] font-medium tracking-tight text-ink">
          <Logo nav />
          <span className="sm:hidden">Cognition Coffee</span>
        </Link>
        <ul className="ml-1 hidden items-center gap-0.5 sm:flex">
          {NAV.map((a) => (
            <li key={a.id}>
              <Link
                to={a.path}
                className="flex min-h-[40px] items-center rounded-md px-3 text-[14px] text-ink/70 transition-colors hover:bg-panel hover:text-ink"
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
            className="grid size-11 place-items-center rounded-md text-ink/70 transition-colors hover:bg-panel hover:text-ink sm:hidden"
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
                className="flex min-h-[44px] items-center rounded-md px-3 text-[15px] text-ink/70 transition-colors hover:bg-panel hover:text-ink"
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

const footerLink = "inline-flex min-h-[32px] items-center text-[13px] text-ink/70 transition-colors hover:text-ink"

const SiteFooter: React.FC = () => (
  <footer className="mt-24 border-t border-line bg-chrome">
    <div className={`${SITE_CONTAINER} py-12`}>
      <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <Link to="/" className="inline-flex min-h-[36px] items-center gap-2 text-[15px] font-medium tracking-tight text-ink">
            <Logo />
          </Link>
          <p className="mt-2 text-[13px] leading-relaxed text-ink/70">
            Built with Devin. Made for builders.
          </p>
        </div>
        <div className="flex gap-6 sm:gap-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink/60">Pages</p>
            <ul className="mt-3 space-y-1">
              {NAV.map((a) => (
                <li key={a.id}>
                  <Link to={a.path} className={footerLink} activeClassName="text-ink">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink/60">Elsewhere</p>
            <ul className="mt-3 space-y-1">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className={footerLink}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-10 border-t border-line pt-6 font-mono text-[12px] text-ink/60">cognitioncoffee.co</p>
    </div>
  </footer>
)

const ONBOARD_SESSION_KEY = "ccvm_onboarded"

function hasOnboarded(): boolean {
  if (typeof window === "undefined") return true
  try {
    return sessionStorage.getItem(ONBOARD_SESSION_KEY) === "1"
  } catch {
    return true
  }
}

function setOnboarded() {
  if (typeof window === "undefined") return
  try {
    sessionStorage.setItem(ONBOARD_SESSION_KEY, "1")
  } catch {}
}

/** Top-level chrome. `os` renders the windowed desktop; `site` renders pages inline. */
export const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { experience, windows, constraintsRef, closeAll, open } = useApp()
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    if (!hasOnboarded()) {
      setShowOnboarding(true)
      trackEvent("onboarding_started")
    }
  }, [])

  const handleNameEntered = useCallback((name: string) => {
    if (typeof window !== "undefined") {
      window.__onboardingName = name
    }
  }, [])

  const completeOnboarding = useCallback(() => {
    setOnboarded()
    closeAll()
    open("/terminal")
    setShowOnboarding(false)
    trackEvent("onboarding_completed")
  }, [closeAll, open])

  const skipOnboarding = useCallback(() => {
    setOnboarded()
    closeAll()
    open("/terminal")
    setShowOnboarding(false)
    trackEvent("onboarding_skipped")
    trackEvent("onboarding_completed")
  }, [closeAll, open])

  if (experience === "site") {
    return (
      <ErrorBoundary>
        <div className="site-shell flex min-h-screen flex-col bg-canvas text-ink">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
          >
            Skip to content
          </a>
          <SiteNav />
          <main id="main-content" tabIndex={-1} className="w-full flex-1">{children}</main>
          <SiteFooter />
        </div>
        {showOnboarding && (
          <OnboardingTerminal steps={ONBOARDING_FLOW} onComplete={completeOnboarding} onSkip={skipOnboarding} onNameEntered={handleNameEntered} />
        )}
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <div ref={constraintsRef} className="relative h-screen w-screen overflow-hidden bg-canvas text-ink">
        <Desktop />
        <AnimatePresence>
          {windows.map((w) => (
            <AppWindow key={w.key} item={w} />
          ))}
        </AnimatePresence>
        <TaskBar />
        {showOnboarding && (
          <OnboardingTerminal steps={ONBOARDING_FLOW} onComplete={completeOnboarding} onSkip={skipOnboarding} onNameEntered={handleNameEntered} />
        )}
      </div>
    </ErrorBoundary>
  )
}
