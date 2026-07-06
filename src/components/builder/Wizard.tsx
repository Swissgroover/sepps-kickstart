import { useEffect, useRef } from "react";
import { useBuilder } from "@/lib/builder/context";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Step1Template } from "./steps/Step1Template";
import { Step2Photo } from "./steps/Step2Photo";
import { Step3Info } from "./steps/Step3Info";
import { Step4Rating } from "./steps/Step4Rating";
import { Step5Stats } from "./steps/Step5Stats";
import { Step6Finish } from "./steps/Step6Finish";
import { Step7Size } from "./steps/Step7Size";
import { Step8Quantity } from "./steps/Step8Quantity";
import { Step9Summary } from "./steps/Step9Summary";
import { STEP_TITLES } from "@/lib/builder/catalog";

const STEPS = [
  Step1Template,
  Step2Photo,
  Step3Info,
  Step4Rating,
  Step5Stats,
  Step6Finish,
  Step7Size,
  Step8Quantity,
  Step9Summary,
];

export function Wizard() {
  const { state, dispatch } = useBuilder();
  const Current = STEPS[state.currentStep - 1]!;
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled || !ref.current) return;
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, x: 24 },
        { autoAlpha: 1, x: 0, duration: 0.4, ease: "power3.out" },
      );
    })();
    return () => {
      cancelled = true;
    };
  }, [state.currentStep]);

  const isLast = state.currentStep === STEPS.length;
  const isFirst = state.currentStep === 1;

  return (
    <section
      className="flex min-h-full flex-col gap-8"
      aria-labelledby={`step-${state.currentStep}-title`}
    >
      <div ref={ref} className="flex-1">
        <Current />
      </div>

      {!isLast && (
        <div className="sticky bottom-0 -mx-4 mt-auto flex items-center justify-between gap-3 border-t border-white/10 bg-slate-950/80 px-4 py-4 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-5">
          <Button
            variant="ghost"
            onClick={() => dispatch({ type: "back" })}
            disabled={isFirst}
            className="text-white/70 hover:text-white disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" /> Tagasi
          </Button>
          <div className="hidden text-xs uppercase tracking-widest text-white/40 sm:block">
            Järgmine · {STEP_TITLES[state.currentStep]}
          </div>
          <Button
            onClick={() => dispatch({ type: "next" })}
            className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30 hover:brightness-110"
          >
            Edasi <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </section>
  );
}