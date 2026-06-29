import React, { type HeadFC } from "react"
import { SEO } from "@/components/SEO"

const NotFoundPage: React.FC = () => {
  React.useEffect(() => {
    window.location.replace("/")
  }, [])

  return (
    <div className="page-column pt-16 sm:pt-20">
      <p className="text-ink">Redirecting…</p>
    </div>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => (
  <>
    <SEO title="Redirecting" />
    <meta httpEquiv="refresh" content="0;url=/" />
  </>
)
