import React from "react"
import type { HeadFC } from "gatsby"
import { Terminal } from "@/components/Terminal"
import { SEO } from "@/components/SEO"

const TerminalPage: React.FC = () => (
  <div className="h-[calc(100vh-120px)] min-h-[400px]">
    <Terminal />
  </div>
)

export default TerminalPage

export const Head: HeadFC = () => <SEO title="Terminal" />
