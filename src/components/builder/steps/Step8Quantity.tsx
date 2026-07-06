import { useBuilder } from "@/lib/builder/context";
import { StepHeader } from "./Step1Template";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { PriceBreakdown } from "../parts/PriceBreakdown";

export function Step8Quantity() {
  const { state, dispatch } = useBuilder();
  const dec = () => {
    dispatch({ type: "setQuantity", quantity: Math.max(1, state.quantity - 1) });
    dispatch({ type: "complete", step: 8 });
  };
  const inc = () => {
    dispatch({ type: "setQuantity", quantity: state.quantity + 1 });
    dispatch({ type: "complete", step: 8 });
  };
  return (
    <div>
      <StepHeader title="Kogus" subtitle="Kaartide arv tellimuses. Kogusumma arvutub kohe." />
      <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={dec}
              className="h-12 w-12 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10"
              aria-label="Vähenda kogust"
            >
              <Minus className="h-5 w-5" />
            </Button>
            <div
              className="font-display text-6xl tabular-nums text-white"
              aria-live="polite"
            >
              {state.quantity}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={inc}
              className="h-12 w-12 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10"
              aria-label="Suurenda kogust"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <div className="text-xs uppercase tracking-widest text-white/40">Kaarti</div>
        </div>
        <PriceBreakdown />
      </div>
    </div>
  );
}