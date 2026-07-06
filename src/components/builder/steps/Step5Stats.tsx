import { useBuilder } from "@/lib/builder/context";
import { Slider } from "@/components/ui/slider";
import { STAT_LABELS, STAT_LONG } from "@/lib/builder/catalog";
import { StepHeader } from "./Step1Template";
import type { StatKey } from "@/lib/builder/types";

export function Step5Stats() {
  const { state, dispatch } = useBuilder();
  const order: StatKey[] = ["pac", "sho", "pas", "dri", "def", "phy"];
  return (
    <div>
      <StepHeader
        title="Statistika"
        subtitle="Iga näitaja 1–99. Muudatused peegelduvad kaardile kohe."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {order.map((k) => (
          <div
            key={k}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20"
          >
            <div className="mb-2 flex items-baseline justify-between">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-white/60">
                  {STAT_LABELS[k]}
                </div>
                <div className="text-xs text-white/40">{STAT_LONG[k]}</div>
              </div>
              <div className="font-display text-3xl tabular-nums text-white">
                {state.stats[k]}
              </div>
            </div>
            <Slider
              min={1}
              max={99}
              step={1}
              value={[state.stats[k]]}
              onValueChange={(v) => {
                dispatch({ type: "setStats", patch: { [k]: v[0] } as Partial<typeof state.stats> });
                dispatch({ type: "complete", step: 5 });
              }}
              aria-label={STAT_LONG[k]}
              aria-valuetext={`${STAT_LONG[k]} ${state.stats[k]}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}