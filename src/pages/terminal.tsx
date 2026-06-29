import React from "react"
import type { HeadFC } from "gatsby"
import { Terminal } from "@/components/Terminal"
import { SEO } from "@/components/SEO"
import { useApp } from "@/context/App"

const TerminalPage: React.FC = () => {
  const { experience } = useApp()
  if (experience === "os") {
    return (
      <div className="h-full">
        <Terminal />
      </div>
    )
  }
  return (
    <div className="mx-auto w-full max-w-page px-4 py-10 sm:px-6 sm:py-14">
      <div className="h-[calc(100vh-220px)] min-h-[420px] overflow-hidden rounded-win border border-line shadow-window">
        <Terminal />
      </div>
    </div>
  )
}

export default TerminalPage

export const Head: HeadFC = () => <SEO title="Terminal" />
