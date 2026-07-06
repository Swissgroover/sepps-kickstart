import { useBuilder } from "@/lib/builder/context";
import { StepHeader } from "./Step1Template";
import { PriceBreakdown } from "../parts/PriceBreakdown";
import { Button } from "@/components/ui/button";
import { computePrice } from "@/lib/builder/pricing";
import { addToCart } from "@/lib/builder/storage";
import { toast } from "sonner";
import { CheckCircle2, Pencil, ShoppingBag, RefreshCcw } from "lucide-react";
import { TEMPLATE_MAP, FINISH_MAP, SIZE_MAP } from "@/lib/builder/catalog";

export function Step9Summary() {
  const { state, dispatch, reset } = useBuilder();
  const price = computePrice(state);
  const t = TEMPLATE_MAP[state.template];
  const displayName =
    state.info.displayName?.trim() ||
    `${state.info.firstName} ${state.info.lastName}`.trim() ||
    "—";

  const handleAdd = () => {
    addToCart({
      id: `${Date.now()}`,
      createdAt: Date.now(),
      state,
      total: price.total,
    });
    dispatch({ type: "complete", step: 9 });
    toast.success("Kaart lisatud ostukorvi", {
      description: `${displayName} · ${t.name} · × ${state.quantity}`,
    });
  };

  return (
    <div>
      <StepHeader title="Kokkuvõte" subtitle="Kontrolli valikud üle. Kõik sammud on veel muudetavad." />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <SummaryRow label="Mängija" value={displayName} onEdit={() => dispatch({ type: "goto", step: 3 })} />
          <SummaryRow
            label="Positsioon"
            value={`${state.info.position} · ${state.info.preferredFoot === "both" ? "Mõlemad" : state.info.preferredFoot === "left" ? "Vasak jalg" : "Parem jalg"}`}
            onEdit={() => dispatch({ type: "goto", step: 3 })}
          />
          <SummaryRow label="Klubi / rahvus" value={`${state.info.club || "—"} · ${state.info.nationality || "—"}`} onEdit={() => dispatch({ type: "goto", step: 3 })} />
          <SummaryRow label="Reiting" value={String(state.overall)} onEdit={() => dispatch({ type: "goto", step: 4 })} />
          <SummaryRow label="Template" value={t.name} onEdit={() => dispatch({ type: "goto", step: 1 })} />
          <SummaryRow label="Viimistlus" value={FINISH_MAP[state.finish].name} onEdit={() => dispatch({ type: "goto", step: 6 })} />
          <SummaryRow label="Suurus" value={SIZE_MAP[state.size].name} onEdit={() => dispatch({ type: "goto", step: 7 })} />
          <SummaryRow label="Kogus" value={`× ${state.quantity}`} onEdit={() => dispatch({ type: "goto", step: 8 })} />
        </div>

        <div className="space-y-4">
          <PriceBreakdown />
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/70">
            <div className="flex items-center gap-2 text-white">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span className="font-semibold">Eeldatav tarne</span>
            </div>
            <p className="mt-1 text-white/60">7–10 tööpäeva Eesti-siseselt.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleAdd}
              size="lg"
              className="flex-1 min-w-[200px] bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30 hover:brightness-110"
            >
              <ShoppingBag className="h-5 w-5" />
              Lisa ostukorvi
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => dispatch({ type: "goto", step: 1 })}
              className="border-white/15 bg-white/5 text-white hover:bg-white/10"
            >
              <Pencil className="h-4 w-4" /> Muuda
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => {
                reset();
                toast("Alustatud uuesti");
              }}
              className="text-white/70 hover:text-white"
            >
              <RefreshCcw className="h-4 w-4" /> Uuesti algusest
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-2 last:border-0 last:pb-0">
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-widest text-white/40">{label}</div>
        <div className="truncate text-sm text-white">{value}</div>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="text-xs uppercase tracking-widest text-blue-300 hover:text-blue-200"
      >
        Muuda
      </button>
    </div>
  );
}