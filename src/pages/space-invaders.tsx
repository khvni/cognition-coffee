import React from "react"
import type { HeadFC } from "gatsby"
import { GamePage } from "@/components/GamePage"
import { SEO } from "@/components/SEO"

const SpaceInvadersPage: React.FC = () => (
  <GamePage
    title="Space Invaders"
    src="/vendor/games/space-invaders/index.html"
    credit="https://github.com/dwmkerr/spaceinvaders"
  />
)

export default SpaceInvadersPage

export const Head: HeadFC = () => <SEO title="Space Invaders" />
