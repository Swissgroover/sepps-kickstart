import { useEffect, useRef } from "react";
import { useBuilder } from "@/lib/builder/context";
import { TEMPLATE_MAP } from "@/lib/builder/catalog";
import { ratingTier } from "@/lib/builder/ratingColor";
import { STAT_LABELS } from "@/lib/builder/catalog";
import { Crown, Star } from "lucide-react";

export function CardPreview() {
  const { state } = useBuilder();
  const t = TEMPLATE_MAP[state.template];
  const tier = ratingTier(state.overall);

  const displayName =
    state.info.displayName?.trim() ||
    `${state.info.firstName} ${state.info.lastName}`.trim() ||
    "SINU NIMI";

  const cardRef = useRef<HTMLDivElement | null>(null);

  // GSAP flip when template changes
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled || !cardRef.current) return;
      gsap.fromTo(
        cardRef.current,
        { rotationY: -18, opacity: 0.4, scale: 0.96 },
        { rotationY: 0, opacity: 1, scale: 1, duration: 0.55, ease: "power3.out" },
      );
    })();
    return () => {
      cancelled = true;
    };
  }, [state.template]);

  const stats = state.stats;
  const statOrder: Array<keyof typeof stats> = ["pac", "sho", "pas", "dri", "def", "phy"];

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div
        className="relative"
        style={{
          perspective: "1200px",
          filter: `drop-shadow(0 30px 60px ${t.glow})`,
        }}
      >
        <div
          ref={cardRef}
          className="relative aspect-[3/4.4] w-[280px] overflow-hidden rounded-[28px] sm:w-[320px] lg:w-[360px]"
          style={{
            background: t.background,
            color: t.text,
            boxShadow:
              "inset 0 0 0 1.5px " +
              t.frame +
              ", inset 0 60px 120px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.45)",
          }}
          role="img"
          aria-label={`Kaardi eelvaade – ${displayName}, ${state.info.position}, reiting ${state.overall}`}
        >
          {/* pattern overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(120% 60% at 50% -20%, rgba(255,255,255,0.35), transparent 60%), radial-gradient(80% 60% at 50% 120%, rgba(0,0,0,0.35), transparent 60%)",
            }}
          />
          {/* chalk lines */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.09]"
            viewBox="0 0 300 440"
            aria-hidden
          >
            <path d="M0 90 H300" stroke={t.accent} strokeWidth="1" />
            <path d="M0 320 H300" stroke={t.accent} strokeWidth="1" />
            <circle cx="150" cy="220" r="70" stroke={t.accent} strokeWidth="1" fill="none" />
          </svg>

          {/* Top bar: rating + position | flag/club */}
          <div className="relative z-10 flex items-start justify-between p-5">
            <div className="flex flex-col items-center gap-1">
              <div
                className="font-display text-[44px] leading-none"
                style={{
                  background: `linear-gradient(180deg, ${tier.from}, ${tier.to})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {state.overall}
              </div>
              <div
                className="rounded-md px-1.5 py-0.5 text-[11px] font-bold tracking-widest"
                style={{ background: t.chip, color: t.accent }}
              >
                {state.info.position || "POS"}
              </div>
              <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest opacity-80">
                <FootDot foot={state.info.preferredFoot} accent={t.accent} />
                {state.info.preferredFoot === "both" ? "Mõlemad" : state.info.preferredFoot === "left" ? "Vasak" : "Parem"}
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 text-right">
              <FlagBadge code={state.info.nationality} accent={t.accent} chip={t.chip} />
              <div
                className="max-w-[120px] truncate rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
                style={{ background: t.chip, color: t.accent }}
              >
                {state.info.club || "KLUBI"}
              </div>
              {state.info.jerseyNumber && (
                <div
                  className="font-display text-3xl leading-none"
                  style={{ color: t.accent }}
                >
                  #{state.info.jerseyNumber}
                </div>
              )}
            </div>
          </div>

          {/* Photo mask */}
          <div className="relative z-0 -mt-4 flex h-[190px] items-end justify-center overflow-hidden">
            {state.photo ? (
              <img
                src={state.photo.dataUrl}
                alt=""
                className="h-full w-full object-cover"
                style={{
                  transform: `translate(${state.photo.offsetX}px, ${state.photo.offsetY}px) scale(${state.photo.scale})`,
                  transformOrigin: "center center",
                  transition: "transform 0.25s ease-out",
                }}
                draggable={false}
              />
            ) : (
              <PhotoPlaceholder accent={t.accent} />
            )}
          </div>

          {/* Name + badges */}
          <div className="relative z-10 px-5">
            <div className="flex items-center justify-center gap-2">
              {state.info.captain && (
                <span
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black"
                  style={{ background: t.accent, color: t.text }}
                  title="Captain"
                >
                  C
                </span>
              )}
              <h3
                className="font-display text-center text-[26px] leading-none tracking-wide"
                style={{ color: t.accent }}
              >
                {displayName.toUpperCase()}
              </h3>
              {state.info.mvp && (
                <span
                  className="inline-flex h-6 items-center justify-center gap-1 rounded-full px-2 text-[10px] font-black"
                  style={{ background: t.accent, color: t.text }}
                  title="MVP"
                >
                  <Star className="h-3 w-3" /> MVP
                </span>
              )}
            </div>
            <div
              className="mx-auto mt-2 h-px w-24 opacity-40"
              style={{ background: t.accent }}
            />
          </div>

          {/* Stats grid */}
          <div className="relative z-10 mt-3 grid grid-cols-3 gap-x-4 gap-y-2 px-6 pb-6 text-center">
            {statOrder.map((k) => (
              <div key={k} className="flex flex-col items-center leading-none">
                <span className="font-display text-2xl" style={{ color: t.accent }}>
                  {stats[k]}
                </span>
                <span
                  className="mt-0.5 text-[10px] font-bold tracking-widest opacity-75"
                  style={{ color: t.accent }}
                >
                  {STAT_LABELS[k]}
                </span>
              </div>
            ))}
          </div>

          {/* corner tier chip */}
          <div
            className="absolute right-3 top-3 rotate-6 rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-widest"
            style={{
              background: `linear-gradient(135deg, ${tier.from}, ${tier.to})`,
              color: tier.text,
            }}
          >
            {tier.label}
          </div>

          {/* Captain crown overlay */}
          {state.info.captain && (
            <Crown
              className="absolute right-4 bottom-4 h-5 w-5 opacity-80"
              style={{ color: t.accent }}
              aria-hidden
            />
          )}
        </div>
      </div>

      <p className="text-xs uppercase tracking-[0.2em] text-white/40">
        {t.name} · {t.tagline}
      </p>
    </div>
  );
}

function FootDot({ foot, accent }: { foot: string; accent: string }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 rounded-full"
      style={{ background: accent }}
      aria-hidden
    />
  );
}

function FlagBadge({ code, accent, chip }: { code: string; accent: string; chip: string }) {
  const value = (code || "EE").toUpperCase().slice(0, 3);
  return (
    <div
      className="rounded-md px-2 py-0.5 text-[11px] font-bold tracking-widest"
      style={{ background: chip, color: accent }}
      title={value}
    >
      {value}
    </div>
  );
}

function PhotoPlaceholder({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-auto opacity-30" aria-hidden>
      <circle cx="100" cy="80" r="34" fill={accent} />
      <path
        d="M40 200 C 40 140, 160 140, 160 200 Z"
        fill={accent}
      />
    </svg>
  );
}