import { useBuilder } from "@/lib/builder/context";
import { Slider } from "@/components/ui/slider";
import { StepHeader } from "./Step1Template";
import { ratingTier } from "@/lib/builder/ratingColor";

export function Step4Rating() {
  const { state, dispatch } = useBuilder();
  const tier = ratingTier(state.overall);
  return (
    <div>
      <StepHeader
        title="Üldreiting"
        subtitle="Kaardi keskse numbri väärtus vahemikus 40–99. Värv muutub automaatselt taseme järgi."
      />
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <div
          className="font-display text-[128px] leading-none"
          style={{
            background: `linear-gradient(180deg, ${tier.from}, ${tier.to})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
          aria-live="polite"
        >
          {state.overall}
        </div>
        <div
          className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest"
          style={{
            background: `linear-gradient(135deg, ${tier.from}, ${tier.to})`,
            color: tier.text,
          }}
        >
          {tier.label}
        </div>
        <Slider
          min={40}
          max={99}
          step={1}
          value={[state.overall]}
          onValueChange={(v) => {
            dispatch({ type: "setOverall", overall: v[0]! });
            dispatch({ type: "complete", step: 4 });
          }}
          aria-label="Üldreiting"
          aria-valuetext={`Üldreiting ${state.overall}`}
          className="w-full max-w-md"
        />
        <div className="flex w-full max-w-md justify-between text-xs uppercase tracking-widest text-white/40">
          <span>40</span>
          <span>70</span>
          <span>99</span>
        </div>
      </div>
    </div>
  );
}