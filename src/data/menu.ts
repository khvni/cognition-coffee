/**
 * Menu catalog - structured like a coffee-shop ordering system.
 * Each section is a "menu category"; items are "menu options" with
 * ordering variations (like customizing a DoorDash catering order).
 *
 * Sections are authored in src/data/menu-sections/*.ts and composed here.
 */

export type OrderingOption = {
  label: string
  choices: string[]
  multi?: boolean
}

export type MenuItem = {
  id: string
  name: string
  image: string
  subcaption: string
  description: string
  breakdown: string[]
  orderingOptions: OrderingOption[]
}

export type MenuSection = {
  id: string
  title: string
  subtitle: string
  items: MenuItem[]
}

import { ambassadorsSection } from "./menu-sections/ambassadors"
import { devEventsSection } from "./menu-sections/dev-events"
import { universitySection } from "./menu-sections/university"
import { contentSection } from "./menu-sections/content"
import { cultureSection } from "./menu-sections/culture"

export const MENU_SECTIONS: MenuSection[] = [
  ambassadorsSection,
  devEventsSection,
  universitySection,
  contentSection,
  cultureSection,
]
