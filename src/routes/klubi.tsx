import { createFileRoute } from "@tanstack/react-router";
import { Shield, Target, Users, Heart } from "lucide-react";
import { PitchBackground } from "@/components/site/PitchBackground";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/klubi")({
  head: () => ({
    meta: [
      { title: "Klubi — JK SEPPS" },
      { name: "description", content: "JK SEPPS klubi lugu, väärtused ja peatreener Madis Sepp." },
      { property: "og:title", content: "Klubi — JK SEPPS" },
      { property: "og:description", content: "Klubi lugu, väärtused ja meeskond." },
    ],
  }),
  component: KlubiPage,
});

const values = [
  { icon: Shield, title: "Distsipliin", desc: "Õigeaegsus, pühendumus ja austus kaaslaste vastu." },
  { icon: Target, title: "Arendus", desc: "Iga trenn on samm paremaks. Tehnika, taktika, mõtteviis." },
  { icon: Users, title: "Meeskond", desc: "Mängija mängija eest. Klubi mängija eest." },
  { icon: Heart, title: "Kirg", desc: "Ilma armastuseta mängu vastu pole võitu." },
];

function KlubiPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 text-primary"><PitchBackground /></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <Reveal>
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Klubi</div>
            <h1 className="font-display text-6xl uppercase leading-[0.9] tracking-tight sm:text-8xl">
              Üks klubi.<br /><span className="text-primary">Üks perekond.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-foreground/70">
              JK SEPPS on jalgpalliklubi ERASPORDIKOOL SEPPSi all. Treenime mängijaid,
              kes tahavad rohkem — paremat tehnikat, kõvemat võistlusvaimu ja päris meeskonda.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Meie väärtused" title={<>Mis paneb meid <span className="text-primary">mängima</span></>} />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-white/10 bg-card p-6 transition-colors hover:border-primary/60">
                <v.icon className="text-primary" size={28} />
                <h3 className="mt-5 font-display text-2xl uppercase">{v.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/30 via-pitch-deep/30 to-transparent p-10">
              <div className="absolute inset-0 text-primary/30"><PitchBackground /></div>
              <div className="relative flex h-full flex-col justify-end">
                <div className="font-display text-7xl uppercase leading-none">Madis<br />Sepp</div>
                <div className="mt-3 text-sm uppercase tracking-[0.2em] text-foreground/60">Peatreener · direktor</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Peatreener" title={<>Mees, kes klubi <span className="text-primary">ehitas.</span></>}>
              Madis Sepp juhib JK SEPPSi ja ERASPORDIKOOL SEPPSi. Treenerina paneb ta
              rõhku tehnikale, distsipliinile ja sellele, et mängija lahkuks väljakult
              parema inimesena, kui ta saabus.
            </SectionHeading>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="mailto:madis@sepps.eu" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">madis@sepps.eu</a>
              <a href="tel:+37253363247" className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10">+372 53 36 3247</a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}