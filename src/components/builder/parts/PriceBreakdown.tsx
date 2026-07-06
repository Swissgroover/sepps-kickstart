import { useBuilder } from "@/lib/builder/context";
import { computePrice, formatEur } from "@/lib/builder/pricing";
import { FINISH_MAP, SIZE_MAP } from "@/lib/builder/catalog";

export function PriceBreakdown() {
  const { state } = useBuilder();
  const price = computePrice(state);
  const size = SIZE_MAP[state.size];
  const finish = FINISH_MAP[state.finish];
  return (
    <dl className="space-y-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm">
      <div className="flex items-baseline justify-between">
        <dt className="text-white/60">Suurus</dt>
        <dd className="font-medium text-white">
          {size.name} <span className="text-white/40">· {size.dimensions}</span>
        </dd>
      </div>
      <div className="flex items-baseline justify-between">
        <dt className="text-white/60">Viimistlus</dt>
        <dd className="font-medium text-white">{finish.name}</dd>
      </div>
      <div className="flex items-baseline justify-between">
        <dt className="text-white/60">Ühiku hind</dt>
        <dd className="tabular-nums text-white">{formatEur(price.perUnit)}</dd>
      </div>
      <div className="flex items-baseline justify-between">
        <dt className="text-white/60">Kogus</dt>
        <dd className="tabular-nums text-white">× {state.quantity}</dd>
      </div>
      <div className="mt-3 flex items-baseline justify-between border-t border-white/10 pt-3">
        <dt className="font-display text-lg uppercase tracking-widest text-white/70">Kokku</dt>
        <dd className="font-display text-2xl tabular-nums text-white">
          {formatEur(price.total)}
        </dd>
      </div>
    </dl>
  );
}