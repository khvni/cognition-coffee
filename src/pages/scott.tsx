import React from "react"
import { SEO } from "@/components/SEO"

const ScottPage: React.FC = () => (
  <div className="flex h-full w-full items-center justify-center">
    <img
      src="/scott.png"
      alt="Scott"
      className="h-full w-full object-contain"
    />
  </div>
)

export default ScottPage

export const Head = () => <SEO title="scott.png" />
