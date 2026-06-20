import React from "react"
import { Link, type HeadFC } from "gatsby"
import { BIO } from "@/data/experience"
import { APPS } from "@/lib/apps"
import { AppIcon } from "@/components/AppIcon"
import { SEO } from "@/components/SEO"
import { SITE_CONTAINER } from "@/lib/layout"

const launchers = APPS.filter((a) => a.id !== "home")

const IndexPage: React.FC = () => (
  <section className={`${SITE_CONTAINER} py-8`}>
    <p className="font-mono text-[12px] uppercase tracking-wide text-accent-ink">The Cognition Coffee Company</p>
    <h1 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">{BIO.hook}</h1>
    <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">{BIO.oneLiner}</p>

    <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {launchers.map((a) => (
        <li key={a.id}>
          <Link
            to={a.path}
            className="flex items-start gap-3 rounded-win border border-line bg-panel p-4 shadow-card transition-colors hover:border-accent-ink"
          >
            <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-canvas text-ink">
              <AppIcon id={a.icon} size={18} />
            </span>
            <span>
              <span className="block text-[15px] font-medium text-ink">{a.title}</span>
              <span className="block text-[13px] text-muted">{a.blurb}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
)

export default IndexPage

export const Head: HeadFC = () => <SEO />
