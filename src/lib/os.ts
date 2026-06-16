/**
 * Cloud-VM OS model — the single source of truth for the mock operating system
 * that the landing page boots into. Defines the app registry every window reads
 * from, plus the client-side "VM session" persisted in localStorage behind a
 * typed, idempotent API. The email validator lives here as the one boundary
 * parser so the boot terminal and analytics never re-implement it.
 *
 * No real auth: "logging in" is a soft client-side gate, exactly as planned.
 */

export type AppId = "menu" | "blog" | "community" | "about" | "terminal";

export type AppKind = "content" | "terminal";

export type AppDef = {
  id: AppId;
  title: string;
  /** Inner SVG markup (24x24, currentColor) for the dock + desktop icon. */
  icon: string;
  kind: AppKind;
  /** Canonical route for the "open full page" link. Omitted apps have none. */
  href?: string;
  defaultSize: { w: number; h: number };
};

export type Session = {
  email?: string;
  loggedIn: boolean;
  firstVisit: boolean;
};

const STORE_KEY = "ccvm.session";

const DEFAULT_SESSION: Session = { loggedIn: false, firstVisit: true };

const ICON = {
  menu: '<path d="M8 6h11M8 12h11M8 18h11"/><circle cx="4" cy="6" r="1.1"/><circle cx="4" cy="12" r="1.1"/><circle cx="4" cy="18" r="1.1"/>',
  blog: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h5"/>',
  community: '<circle cx="9" cy="9" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><path d="M16 7a3 3 0 0 1 0 6"/><path d="M21 20c0-2.6-1.8-4.4-4-4.9"/>',
  about: '<circle cx="12" cy="9" r="3.2"/><path d="M5.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/>',
  terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/>',
} as const;

export const APPS: AppDef[] = [
  { id: "menu", title: "Menu", icon: ICON.menu, kind: "content", defaultSize: { w: 720, h: 560 } },
  { id: "blog", title: "Blog", icon: ICON.blog, kind: "content", href: "/blog", defaultSize: { w: 680, h: 560 } },
  { id: "community", title: "Community", icon: ICON.community, kind: "content", href: "/community", defaultSize: { w: 760, h: 580 } },
  { id: "about", title: "About", icon: ICON.about, kind: "content", href: "/about", defaultSize: { w: 700, h: 600 } },
  { id: "terminal", title: "Terminal", icon: ICON.terminal, kind: "terminal", defaultSize: { w: 600, h: 420 } },
];

export function getApp(id: AppId): AppDef {
  const app = APPS.find((a) => a.id === id);
  if (!app) throw new Error(`Unknown app: ${id}`);
  return app;
}

/** RFC-pragmatic email check — strict enough for a login gate, no false alarms. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Reads the persisted session, always returning a valid shape (idempotent). */
export function readSession(): Session {
  if (typeof localStorage === "undefined") return { ...DEFAULT_SESSION };
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return { ...DEFAULT_SESSION };
    const parsed = JSON.parse(raw) as Partial<Session>;
    return {
      email: typeof parsed.email === "string" ? parsed.email : undefined,
      loggedIn: parsed.loggedIn ?? false,
      firstVisit: parsed.firstVisit ?? true,
    };
  } catch {
    return { ...DEFAULT_SESSION };
  }
}

function save(session: Session): Session {
  if (typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(session));
    } catch {
      // Private-mode / quota: the session simply stays in-memory for this view.
    }
  }
  return session;
}

/** Logs the visitor in. Converges on the same state if called again. */
export function startSession(email: string): Session {
  const prev = readSession();
  return save({ ...prev, email: email.trim(), loggedIn: true });
}

/** Logs out, returning to boot. Keeps firstVisit false so the tour stays quiet. */
export function endSession(): Session {
  const prev = readSession();
  return save({ loggedIn: false, firstVisit: prev.firstVisit, email: prev.email });
}

/** Marks the guided tour as seen so it never auto-runs again. */
export function markVisited(): Session {
  return save({ ...readSession(), firstVisit: false });
}
