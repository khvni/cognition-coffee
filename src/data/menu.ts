/**
 * Menu catalog - structured like a coffee-shop ordering system.
 * Each section is a "menu category"; items are "menu options" with
 * ordering variations (like customizing a DoorDash catering order).
 *
 * The canonical data lives in content/menu.json and is loaded at runtime.
 * MENU_SECTIONS is a fallback for initial render / SSR.
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

export type MenuData = MenuSection[]

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

export async function fetchMenu(): Promise<MenuSection[]> {
  const res = await fetch("/api/menu")
  if (!res.ok) throw new Error(`Failed to fetch menu: ${res.status}`)
  return (await res.json()) as MenuSection[]
}
