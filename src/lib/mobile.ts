const MOBILE_BREAKPOINT = 768

const isBrowser = typeof window !== "undefined"

export function isMobile(): boolean {
  if (!isBrowser) return false
  if (window.innerWidth <= MOBILE_BREAKPOINT) return true
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}
