import React, { type HeadFC } from "react"
import { SEO } from "@/components/SEO"

const NotFoundPage: React.FC = () => {
  React.useEffect(() => {
    const path = window.location.pathname
    const reloaded = window.sessionStorage.getItem("cc.404-reload") === path
    if (!reloaded) {
      window.sessionStorage.setItem("cc.404-reload", path)
      window.location.reload()
      return
    }
    window.sessionStorage.removeItem("cc.404-reload")
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
