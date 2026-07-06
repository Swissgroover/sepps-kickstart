import { useBuilder } from "@/lib/builder/context";
import { FINISHES } from "@/lib/builder/catalog";
import { formatEur } from "@/lib/builder/pricing";
import { StepHeader } from "./Step1Template";
import { cn } from "@/lib/utils";

export function Step6Finish() {
  const { state, dispatch } = useBuilder();
  return (
    <div>
      <StepHeader title="Viimistlus" subtitle="Vali kaardi lõpp-pind ja täienduslikud detailid." />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {FINISHES.map((f) => {
          const active = state.finish === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                dispatch({ type: "setFinish", finish: f.id });
                dispatch({ type: "complete", step: 6 });
              }}
              className={cn(
                "flex items-start justify-between rounded-2xl border p-4 text-left transition-all",
                active
                  ? "border-blue-400 bg-blue-500/10 ring-1 ring-blue-400/40"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25",
              )}
              aria-pressed={active}
            >
              <div>
                <div className="font-display text-lg uppercase tracking-widest text-white">
                  {f.name}
                </div>
                <div className="mt-1 text-xs text-white/60">{f.description}</div>
              </div>
              <div className="whitespace-nowrap text-sm tabular-nums text-white/80">
                {f.addPerUnit === 0 ? "Sisaldub" : `+ ${formatEur(f.addPerUnit)}`}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}