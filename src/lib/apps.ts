/**
 * App registry — the OS "apps" and the routes they map to.
 * Both the windowing context and the desktop/taskbar read from this single list
 * so a new app is added in exactly one place.
 */
export type AppId = "home" | "menu" | "blog" | "community" | "about"

export type AppDef = {
  id: AppId
  title: string
  path: string
  /** One-line description shown on the home launcher grid. */
  blurb: string
  /** Icon key resolved by <AppIcon />. */
  icon: AppId
  /** Default window size in OS mode. */
  size: { w: number; h: number }
  /** Center on open (used for the home window). */
  center?: boolean
  /** Show on the desktop as a launchable icon. */
  desktop?: boolean
}

export const APPS: AppDef[] = [
  { id: "home", title: "Welcome", path: "/", blurb: "Start here.", icon: "home", size: { w: 720, h: 460 }, center: true },
  { id: "menu", title: "The Menu", path: "/menu", blurb: "The community proposal, served three ways.", icon: "menu", size: { w: 680, h: 560 }, desktop: true },
  { id: "blog", title: "Devin Daily", path: "/blog", blurb: "Field notes on community and agents.", icon: "blog", size: { w: 760, h: 600 }, desktop: true },
  { id: "community", title: "Community", path: "/community", blurb: "A redesigned home for the Devin community.", icon: "community", size: { w: 680, h: 560 }, desktop: true },
  { id: "about", title: "About", path: "/about", blurb: "Who is Ali Khani?", icon: "about", size: { w: 640, h: 560 }, desktop: true },
]

/** Resolve the app definition that owns a given pathname. */
export function appForPath(pathname: string): AppDef {
  const clean = pathname.replace(/\/+$/, "") || "/"
  if (clean === "/") return APPS[0]
  if (clean.startsWith("/blog")) return APPS.find((a) => a.id === "blog")!
  const match = APPS.find((a) => a.path === clean)
  return match ?? APPS[0]
}
