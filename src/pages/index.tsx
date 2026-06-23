import React from "react"
import { Link, type HeadFC } from "gatsby"
import { BIO, SOCIALS } from "@/data/experience"
import { APPS } from "@/lib/apps"
import { SEO } from "@/components/SEO"

const sections = APPS.filter((a) => a.id !== "home" && a.nav !== false)

const socialIcons: Record<string, React.ReactNode> = {
  X: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z"/></svg>,
  GitHub: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.11 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .3z"/></svg>,
  LinkedIn: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>,
}

const stagger = (i: number): React.CSSProperties =>
  ({ "--stagger": i } as React.CSSProperties)

const IndexPage: React.FC = () => (
  <div className="page-column">
    <div className="reveal" style={stagger(0)}>
      <h1 className="m-0 mb-4 text-[1.375rem] font-medium leading-[1.7] tracking-tight text-ink [text-wrap:balance]">
        Cognition Coffee
      </h1>
      <p className="m-0 text-[0.9375rem] font-normal leading-[1.6] text-ink/60 [text-wrap:pretty]">{BIO.hook}</p>
    </div>

    <div className="social-row reveal" style={stagger(1)} aria-label="Social links">
      {SOCIALS.map((s) => (
        <a key={s.label} href={s.href} aria-label={s.label} rel="me noopener" target="_blank" className="transition-[color,transform] duration-150 ease-out hover:text-ink">
          {socialIcons[s.label] ?? null}
        </a>
      ))}
    </div>

    <section className="section-block" aria-labelledby="menu-heading">
      <h2
        className="section-heading reveal font-mono uppercase tracking-[0.06em] text-[0.6875rem]"
        id="menu-heading"
        style={stagger(2)}
      >
        Links
      </h2>
      <ul className="entry-list">
        {sections.map((a, i) => (
          <li
            key={a.id}
            className="entry-row reveal"
            style={stagger(3 + i)}
          >
            <Link className="entry-link py-1.5" to={a.path}>
              <strong>{a.title}</strong>
              <span className="[text-wrap:pretty]">{a.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>

  </div>
)

export default IndexPage

export const Head: HeadFC = () => <SEO />
