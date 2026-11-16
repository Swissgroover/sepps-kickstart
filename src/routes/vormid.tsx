import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ExternalLink, Shirt, Trophy, Truck } from "lucide-react";
import { PitchBackground } from "@/components/site/PitchBackground";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { registrationOnlyMode } from "@/lib/registration-only";

export const Route = createFileRoute("/vormid")({
  beforeLoad: () => {
    if (registrationOnlyMode) throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "Vormid — JK SEPPS" },
      { name: "description", content: "Telli JK SEPPS treening- ja võistlusvorm otse iSport poest." },
      { property: "og:title", content: "Vormid — JK SEPPS" },
      { property: "og:description", content: "Treeningvorm, võistlusvorm — kõik klubi värvides." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: VormidPage,
});

const SHOP_URL = "https://isport.ee/tootekategooria/klubid/jk-sepps/";

function JerseySvg({ accent = "currentColor" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full" fill="none" aria-hidden>
      <path
        d="M50 30 L80 20 Q100 40 120 20 L150 30 L185 60 L165 90 L150 80 L150 195 Q100 210 50 195 L50 80 L35 90 L15 60 Z"
        fill={accent}
        stroke="currentColor"
        strokeWidth="2"
      />
      <text x="100" y="135" textAnchor="middle" fontSize="42" fontFamily="Bebas Neue, sans-serif" fill="currentColor">
        SEPPS
      </text>
    </svg>
  );
}

function VormidPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 text-primary"><PitchBackground /></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <Reveal>
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Vormid</div>
            <h1 className="font-display text-6xl uppercase leading-[0.9] tracking-tight sm:text-8xl">
              Kanna <span className="text-primary">klubi värve.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-foreground/70">
             JK SEPPSi treening- ja võistlusvarustuse saad mugavalt tellida meie koostööpartneri iSporti e-poest. Vali sobiv suurus ning ülejäänu eest hoolitseb juba iSport.
            </p>
            <p className="mt-4 max-w-2xl text-lg text-foreground/70">Uutel mängijatel palume tutvuda vormi tellimise juhistega.</p>
            <Button asChild className="mt-6 h-auto whitespace-normal rounded-full px-6 py-3">
              <Link to="/vormid" hash="kuidas-kaib">Vaata tellimisjuhiseid</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "Treeningvorm", desc: "Igapäevasteks treeninguteks.", icon: Shirt, accent: "var(--pitch)" },
            { title: "Võistlusvorm", desc: "Klubi esindamiseks, võistlusteks.", icon: Trophy, accent: "var(--pitch-deep)" },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <a
                href={SHOP_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-card p-8 transition-colors hover:border-primary/60"
              >
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl transition-colors group-hover:bg-primary/30" />
                <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-[1fr_auto]">
                  <div>
                    <c.icon className="text-primary" size={28} />
                    <h3 className="mt-5 font-display text-4xl uppercase">{c.title}</h3>
                    <p className="mt-3 max-w-md text-sm text-foreground/70">{c.desc}</p>
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform group-hover:scale-105">
                      Telli iSportist <ExternalLink size={14} />
                    </div>
                  </div>
                  <div className="h-40 w-32 text-white/80 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110" style={{ color: c.accent }}>
                    <JerseySvg accent={c.accent} />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="kuidas-kaib" className="scroll-mt-24 bg-ink">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="Tellimine" title={<>Kuidas <span className="text-primary">käib</span></>} />
          </Reveal>
          <Reveal>
            <div className="mt-10 border-l-4 border-primary bg-card p-6 sm:p-8">
              <h3 className="font-display text-3xl uppercase">Uus mängija – kontakteeru treeneriga ja vali välja vorminumber!</h3>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/70">Võta ühendust treeneriga ning paku välja numbreid, mis sulle meeldivad. Treener kontrollib numbri saadavust ning annab tagasisidet. Palume valida vorminumbri pärast treeneriga konsulteerimist.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Vali esemed ja sobiv suurus", d: "Mine iSpordi lehel oma klubi e-poodi ning vali soovitud esemed. Sobiva suuruse valimisel aitab suurustabel. Kahtluse korral küsi nõu treenerilt või e-poe klienditeeninduselt." },
              { n: "02", t: "Probleemide korral", d: "iSport on JK SEPPSi treening- ja võistlusvormide maaletooja. Kõigi toodetega seotud küsimuste ja probleemide korral palume pöörduda otse iSpordi klienditeeninduse poole." },
              { n: "03", t: "Kohaletoimetus", d: "Tellimus jõuab lapsevanema valitud pakiautomaati või toimetatakse kohale muul kokkulepitud viisil." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-white/10 bg-card p-6">
                  <div className="font-display text-5xl text-primary">{s.n}</div>
                  <h4 className="mt-3 font-display text-2xl uppercase">{s.t}</h4>
                  <p className="mt-2 text-sm text-foreground/70">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href={SHOP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
              <Truck size={16} /> Ava iSpordi e-pood
            </a>
            <a href="mailto:jalgpall@sepps.eu" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10">
              Küsi abi
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
