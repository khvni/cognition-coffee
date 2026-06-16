/**
 * wm — a framework-free window manager for the cloud-VM desktop. Owns window
 * geometry and z-order in a Map keyed by AppId, and drives the server-rendered
 * [data-window] nodes: open, close, focus, minimize, maximize, drag — all
 * clamped to the viewport. Idempotent by design: opening a live window just
 * focuses it instead of spawning a duplicate. On narrow viewports it reports
 * "kiosk" mode so windows fill the screen one at a time (Phase 8).
 */
import { getApp, type AppId } from "./os";

export type WindowState = {
  id: AppId;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  prev?: { x: number; y: number; w: number; h: number };
};

export type LayoutMode = "desktop" | "kiosk";

export type Wm = {
  open(id: AppId): void;
  close(id: AppId): void;
  focus(id: AppId): void;
  toggleMinimize(id: AppId): void;
  toggleMaximize(id: AppId): void;
  isOpen(id: AppId): boolean;
  onChange(fn: (id: AppId) => void): void;
};

const MARGIN = 14;
const CASCADE = 30;
const DOCK_SAFE = 84;

export function initWm(root: HTMLElement): Wm {
  const layer = root.querySelector<HTMLElement>("[data-win-layer]");
  if (!layer) throw new Error("wm: missing [data-win-layer]");

  const nodes = new Map<AppId, HTMLElement>();
  for (const el of layer.querySelectorAll<HTMLElement>("[data-window]")) {
    nodes.set(el.dataset.window as AppId, el);
  }

  const state = new Map<AppId, WindowState>();
  const listeners: ((id: AppId) => void)[] = [];
  let zTop = 10;
  let spawned = 0;

  const isKiosk = () => matchMedia("(max-width: 760px)").matches;

  const clamp = (s: WindowState) => {
    const vw = root.clientWidth;
    const vh = root.clientHeight - DOCK_SAFE;
    s.w = Math.min(s.w, vw - MARGIN * 2);
    s.h = Math.min(s.h, vh - MARGIN * 2);
    s.x = Math.max(MARGIN, Math.min(s.x, vw - s.w - MARGIN));
    s.y = Math.max(MARGIN, Math.min(s.y, vh - s.h - MARGIN));
  };

  const notify = (id: AppId) => listeners.forEach((fn) => fn(id));

  const render = (id: AppId) => {
    const node = nodes.get(id);
    if (!node) return;
    const s = state.get(id);
    if (!s || !s.open || s.minimized) {
      node.hidden = true;
      node.setAttribute("aria-hidden", "true");
      notify(id);
      return;
    }
    node.hidden = false;
    node.removeAttribute("aria-hidden");
    if (isKiosk() || s.maximized) {
      node.classList.add("is-max");
      node.style.left = node.style.top = "";
      node.style.width = node.style.height = "";
    } else {
      node.classList.remove("is-max");
      node.style.left = `${s.x}px`;
      node.style.top = `${s.y}px`;
      node.style.width = `${s.w}px`;
      node.style.height = `${s.h}px`;
    }
    node.style.zIndex = String(s.z);
    notify(id);
  };

  const focus = (id: AppId) => {
    const s = state.get(id);
    if (!s || !s.open) return;
    s.z = ++zTop;
    render(id);
  };

  const open = (id: AppId) => {
    let s = state.get(id);
    if (s && s.open) {
      s.minimized = false;
      focus(id);
      return;
    }
    const def = getApp(id);
    const w = def.defaultSize.w;
    const h = def.defaultSize.h;
    const offset = (spawned++ % 5) * CASCADE;
    s = {
      id,
      w,
      h,
      x: Math.round((root.clientWidth - w) / 2) + offset,
      y: Math.round((root.clientHeight - DOCK_SAFE - h) / 2) + offset,
      z: ++zTop,
      open: true,
      minimized: false,
      maximized: false,
    };
    clamp(s);
    state.set(id, s);
    render(id);
    const node = nodes.get(id);
    node?.querySelector<HTMLElement>("[data-drag]")?.focus();
  };

  const close = (id: AppId) => {
    state.delete(id);
    render(id);
  };

  const toggleMinimize = (id: AppId) => {
    const s = state.get(id);
    if (!s) return;
    s.minimized = !s.minimized;
    if (!s.minimized) focus(id);
    else render(id);
  };

  const toggleMaximize = (id: AppId) => {
    const s = state.get(id);
    if (!s) return;
    s.maximized = !s.maximized;
    focus(id);
  };

  const startDrag = (id: AppId, e: PointerEvent) => {
    const s = state.get(id);
    if (!s || s.maximized || isKiosk()) return;
    const sx = e.clientX;
    const sy = e.clientY;
    const ox = s.x;
    const oy = s.y;
    const handle = e.currentTarget as HTMLElement;
    handle.setPointerCapture(e.pointerId);
    const onMove = (ev: PointerEvent) => {
      s.x = ox + (ev.clientX - sx);
      s.y = oy + (ev.clientY - sy);
      clamp(s);
      render(id);
    };
    const onUp = () => {
      handle.removeEventListener("pointermove", onMove);
      handle.removeEventListener("pointerup", onUp);
      handle.removeEventListener("pointercancel", onUp);
    };
    handle.addEventListener("pointermove", onMove);
    handle.addEventListener("pointerup", onUp);
    handle.addEventListener("pointercancel", onUp);
  };

  for (const [id, node] of nodes) {
    node.addEventListener("pointerdown", () => focus(id));
    const bar = node.querySelector<HTMLElement>("[data-drag]");
    bar?.addEventListener("pointerdown", (e) => startDrag(id, e));
    for (const btn of node.querySelectorAll<HTMLElement>("[data-win-action]")) {
      btn.addEventListener("pointerdown", (e) => e.stopPropagation());
      btn.addEventListener("click", () => {
        const action = btn.dataset.winAction;
        if (action === "close") close(id);
        else if (action === "minimize") toggleMinimize(id);
        else if (action === "maximize") toggleMaximize(id);
      });
    }
  }

  for (const trigger of root.querySelectorAll<HTMLElement>("[data-open]")) {
    trigger.addEventListener("click", () => open(trigger.dataset.open as AppId));
  }

  addEventListener("resize", () => {
    for (const [id, s] of state) {
      if (s.open) {
        clamp(s);
        render(id);
      }
    }
  });

  return {
    open,
    close,
    focus,
    toggleMinimize,
    toggleMaximize,
    isOpen: (id) => state.get(id)?.open ?? false,
    onChange: (fn) => listeners.push(fn),
  };
}
