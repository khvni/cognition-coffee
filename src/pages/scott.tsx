import React from "react"
import { SEO } from "@/components/SEO"

const ScottPage: React.FC = () => (
  <div className="flex items-center justify-center p-4">
    <img
      src="/scott.png"
      alt="Scott"
      className="max-h-[70vh] max-w-full rounded-lg shadow-card"
    />
  </div>
)

export default ScottPage

export const Head = () => <SEO title="scott.png" />
