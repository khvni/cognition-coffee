import React from "react"
import type { HeadFC } from "gatsby"
import { GamePage } from "@/components/GamePage"
import { SEO } from "@/components/SEO"

const PongPage: React.FC = () => (
  <GamePage
    title="Pong"
    src="/vendor/games/pong/index.html"
    credit="https://github.com/jakesgordon/javascript-pong"
  />
)

export default PongPage

export const Head: HeadFC = () => <SEO title="Pong" />
