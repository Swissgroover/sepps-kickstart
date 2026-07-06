import { BASE_PRICE, FINISH_MAP, SIZE_MAP } from "./catalog";
import type { BuilderState } from "./types";

export interface PriceBreakdownLine {
  label: string;
  amount: number;
}

export interface PriceResult {
  perUnit: number;
  subtotal: number;
  total: number;
  lines: PriceBreakdownLine[];
}

export function computePrice(state: Pick<BuilderState, "size" | "finish" | "quantity">): PriceResult {
  const size = SIZE_MAP[state.size];
  const finish = FINISH_MAP[state.finish];
  const perUnit = BASE_PRICE + size.addPerUnit + finish.addPerUnit;
  const qty = Math.max(1, state.quantity);
  const subtotal = perUnit * qty;
  const total = subtotal;
  return {
    perUnit,
    subtotal,
    total,
    lines: [
      { label: `Baashind (${size.name})`, amount: BASE_PRICE + size.addPerUnit },
      { label: `Viimistlus (${finish.name})`, amount: finish.addPerUnit },
      { label: `Ühik × ${qty}`, amount: perUnit * qty - perUnit },
    ],
  };
}

export function formatEur(amount: number): string {
  return new Intl.NumberFormat("et-EE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(amount);
}