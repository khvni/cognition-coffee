import React from "react"
import type { HeadFC } from "gatsby"
import { GamePage } from "@/components/GamePage"
import { SEO } from "@/components/SEO"

const SnakePage: React.FC = () => (
  <GamePage
    title="Snake"
    src="/vendor/games/snake/index.html"
    credit="https://github.com/anlbora/SnakeGame---JavaScript"
  />
)

export default SnakePage

export const Head: HeadFC = () => <SEO title="Snake" />
