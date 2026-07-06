import type { BuilderState, CartEntry } from "./types";

const STATE_KEY = "sepps.builder.v1";
const CART_KEY = "sepps.builder.cart.v1";

export function loadState(): BuilderState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STATE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BuilderState;
  } catch {
    return null;
  }
}

let saveTimer: ReturnType<typeof setTimeout> | null = null;
export function saveState(state: BuilderState) {
  if (typeof window === "undefined") return;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      window.localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch {
      /* quota — ignore */
    }
  }, 250);
}

export function clearState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STATE_KEY);
}

export function loadCart(): CartEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartEntry[]) : [];
  } catch {
    return [];
  }
}

export function addToCart(entry: CartEntry) {
  if (typeof window === "undefined") return;
  const list = loadCart();
  list.push(entry);
  window.localStorage.setItem(CART_KEY, JSON.stringify(list));
}