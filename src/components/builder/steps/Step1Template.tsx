import { useBuilder } from "@/lib/builder/context";
import { TEMPLATES } from "@/lib/builder/catalog";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function Step1Template() {
  const { state, dispatch } = useBuilder();
  return (
    <div>
      <StepHeader
        title="Vali kaardi disain"
        subtitle="Iga template annab kaardile oma isikupära. Muutused ilmuvad eelvaates kohe."
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {TEMPLATES.map((t) => {
          const active = state.template === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                dispatch({ type: "setTemplate", template: t.id });
                dispatch({ type: "complete", step: 1 });
              }}
              className={cn(
                "group relative aspect-[3/4] overflow-hidden rounded-2xl border p-3 text-left transition-all",
                active
                  ? "border-white/60 ring-2 ring-blue-400/60"
                  : "border-white/10 hover:border-white/30 hover:-translate-y-0.5",
              )}
              style={{ background: t.background }}
              aria-pressed={active}
            >
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(120% 60% at 50% -20%, rgba(255,255,255,0.4), transparent 60%)",
                }}
              />
              <div
                className="relative flex h-full flex-col justify-between"
                style={{ color: t.text }}
              >
                <span
                  className="font-display text-lg uppercase tracking-widest"
                  style={{ color: t.accent }}
                >
                  {t.name}
                </span>
                <span className="text-[11px] uppercase tracking-widest opacity-80">
                  {t.tagline}
                </span>
              </div>
              {active && (
                <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-slate-900">
                  <Check className="h-4 w-4" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function StepHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-6">
      <h2 className="font-display text-2xl uppercase tracking-widest text-white sm:text-3xl">
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm text-white/60">{subtitle}</p>}
    </header>
  );
}