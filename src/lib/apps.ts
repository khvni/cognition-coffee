/** App registry - single source for OS apps and routes. */
export type AppId = "home" | "menu" | "blog" | "community" | "about" | "scott" | "terminal"

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
  /** Show in site-mode nav, footer, and index grid. Defaults to true. */
  nav?: boolean
}

export const APPS: AppDef[] = [
  { id: "home", title: "Welcome", path: "/", blurb: "The plan for Devin's community.", icon: "home", size: { w: 720, h: 460 }, center: true },
  { id: "menu", title: "Menu", path: "/menu", blurb: "Programs we can brew for ya.", icon: "menu", size: { w: 680, h: 560 }, desktop: true },
  { id: "blog", title: "Blog", path: "/blog", blurb: "Notes on community and agents.", icon: "blog", size: { w: 760, h: 600 }, desktop: true },
  { id: "community", title: "Community", path: "/community", blurb: "Chapters, events, and office hours.", icon: "community", size: { w: 680, h: 560 }, desktop: true },
  { id: "about", title: "About", path: "/about", blurb: "Community builder. MTC founder. Devin Max plan user.", icon: "about", size: { w: 640, h: 560 }, desktop: true },
  { id: "scott", title: "scott.png", path: "/scott", blurb: "It's just Scott.", icon: "scott", size: { w: 480, h: 400 }, desktop: true, nav: false },
  { id: "terminal", title: "Terminal", path: "/terminal", blurb: "A UNIX-like terminal.", icon: "terminal", size: { w: 640, h: 420 }, center: true, desktop: true, nav: false },
]

export function appForPath(pathname: string): AppDef {
  const clean = pathname.replace(/\/+$/, "") || "/"
  if (clean === "/") return APPS[0]
  if (clean.startsWith("/blog")) return APPS.find((a) => a.id === "blog")!
  const match = APPS.find((a) => a.path === clean)
  return match ?? APPS[0]
}
