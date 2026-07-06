import { useBuilder } from "@/lib/builder/context";
import { SIZES } from "@/lib/builder/catalog";
import { formatEur } from "@/lib/builder/pricing";
import { StepHeader } from "./Step1Template";
import { cn } from "@/lib/utils";

export function Step7Size() {
  const { state, dispatch } = useBuilder();
  return (
    <div>
      <StepHeader title="Suurus" subtitle="Kaardi füüsilised mõõtmed." />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {SIZES.map((s) => {
          const active = state.size === s.id;
          const scale = s.id === "small" ? 0.75 : s.id === "medium" ? 0.9 : 1.05;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                dispatch({ type: "setSize", size: s.id });
                dispatch({ type: "complete", step: 7 });
              }}
              className={cn(
                "flex flex-col items-center gap-3 rounded-2xl border p-5 text-center transition-all",
                active
                  ? "border-blue-400 bg-blue-500/10 ring-1 ring-blue-400/40"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:-translate-y-0.5",
              )}
              aria-pressed={active}
            >
              <div
                className="rounded-lg border border-white/20 bg-gradient-to-br from-white/10 to-white/[0.02]"
                style={{ width: 44 * scale, height: 62 * scale, transition: "all 0.3s" }}
              />
              <div>
                <div className="font-display text-lg uppercase tracking-widest text-white">
                  {s.name}
                </div>
                <div className="text-xs text-white/50">{s.dimensions}</div>
              </div>
              <div className="text-sm tabular-nums text-white/70">
                {s.addPerUnit === 0 ? "Sisaldub" : `+ ${formatEur(s.addPerUnit)}`}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}