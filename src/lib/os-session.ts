export type Session = { email?: string; loggedIn: boolean; firstVisit: boolean; };
const STORE_KEY = "ccvm.session";
const DEFAULT_SESSION: Session = { loggedIn: false, firstVisit: true };
export function isValidEmail(value: string): boolean { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()); }
export function readSession(): Session {
  if (typeof window === "undefined" || typeof localStorage === "undefined") return { ...DEFAULT_SESSION };
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return { ...DEFAULT_SESSION };
    return JSON.parse(raw);
  } catch { return { ...DEFAULT_SESSION }; }
}
export function saveSession(session: Session): Session {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(session)); } catch {}
  }
  return session;
}
export function startSession(email: string): Session {
  const prev = readSession();
  return saveSession({ ...prev, email: email.trim(), loggedIn: true });
}
export function endSession(): Session {
  const prev = readSession();
  return saveSession({ loggedIn: false, firstVisit: prev.firstVisit, email: prev.email });
}