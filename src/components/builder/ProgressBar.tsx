import { useBuilder } from "@/lib/builder/context";
import { STEP_TITLES } from "@/lib/builder/catalog";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProgressBar() {
  const { state, dispatch, isStepReachable } = useBuilder();
  const total = STEP_TITLES.length;
  const pct = Math.round(((state.currentStep - 1) / (total - 1)) * 100);

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
        <span>
          Samm {state.currentStep} / {total} · {STEP_TITLES[state.currentStep - 1]}
        </span>
        <span className="tabular-nums">{pct}%</span>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 transition-[width] duration-500 ease-out"
          style={{ width: `${Math.max(4, pct)}%` }}
        />
      </div>
      <ol className="mt-4 hidden gap-1 sm:flex">
        {STEP_TITLES.map((title, i) => {
          const step = i + 1;
          const done = state.completedSteps.includes(step);
          const active = state.currentStep === step;
          const reachable = isStepReachable(step);
          return (
            <li key={title} className="flex-1">
              <button
                type="button"
                disabled={!reachable}
                onClick={() => reachable && dispatch({ type: "goto", step })}
                className={cn(
                  "group flex w-full flex-col items-start gap-1 rounded-lg px-2 py-1.5 text-left transition-colors",
                  reachable ? "hover:bg-white/5" : "opacity-40",
                )}
                aria-current={active ? "step" : undefined}
                aria-label={`Samm ${step}: ${title}`}
              >
                <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/60">
                  <span
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full text-[10px]",
                      done
                        ? "bg-emerald-400 text-emerald-950"
                        : active
                          ? "bg-blue-500 text-white"
                          : "bg-white/10 text-white/70",
                    )}
                  >
                    {done ? <Check className="h-3 w-3" /> : step}
                  </span>
                  {title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}