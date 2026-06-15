import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, Facebook, ExternalLink } from "lucide-react";
import { PitchBackground } from "@/components/site/PitchBackground";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — JK SEPPS" },
      { name: "description", content: "Võta JK SEPPSi meeskonnaga ühendust — Merlyn, Madis, Kaiti ja Oliver." },
      { property: "og:title", content: "Kontakt — JK SEPPS" },
      { property: "og:description", content: "Kontaktid ja klubi meeskond." },
    ],
  }),
  component: KontaktPage,
});

const people = [
  { name: "Merlyn Leiman", role: "ERASPORDIKOOL SEPPSi õppejuht", mail: "merlyn@sepps.eu", tel: "+372 56 28 7449" },
  { name: "Madis Sepp", role: "Peatreener ja direktor", mail: "madis@sepps.eu", tel: "+372 53 36 3247" },
  { name: "Kaiti Enno", role: "Infojuht", mail: "info@sepps.eu", tel: "+372 54 51 1800" },
  { name: "Oliver Moring", role: "Klienditoe- ja haldusspetsialist", mail: "sepps@sepps.eu", tel: "+372 53 00 6717" },
];

function KontaktPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 text-primary"><PitchBackground /></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <Reveal>
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Kontakt</div>
            <h1 className="font-display text-6xl uppercase leading-[0.9] tracking-tight sm:text-8xl">
              Räägime <span className="text-primary">jalgpallist.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-foreground/70">
              Küsimused, registreerimine, koostöö — meeskond vastab heameelega.
              Üldaadress on <a className="text-primary hover:underline" href="mailto:info@sepps.eu">info@sepps.eu</a>.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Meeskond" title={<>Inimesed klubi <span className="text-primary">taga</span></>} />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {people.map((p, i) => (
            <Reveal key={p.mail} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-card p-7 transition-colors hover:border-primary/60">
                <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-primary/10 blur-3xl transition-colors group-hover:bg-primary/30" />
                <div className="relative">
                  <div className="font-display text-3xl uppercase tracking-tight">{p.name}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-foreground/60">{p.role}</div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={`mailto:${p.mail}`} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
                      <Mail size={14} /> {p.mail}
                    </a>
                    <a href={`tel:${p.tel.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/10">
                      <Phone size={14} /> {p.tel}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            <a href="https://www.facebook.com/p/JK-SEPPS-100084304296076/" target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-3xl border border-white/10 bg-ink p-6 transition-colors hover:border-primary/60">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-foreground/60">Jälgi</div>
                <div className="font-display text-3xl uppercase">Facebook</div>
              </div>
              <Facebook className="text-primary transition-transform group-hover:scale-110" />
            </a>
            <a href="https://isport.ee/tootekategooria/klubid/jk-sepps/" target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-3xl border border-white/10 bg-ink p-6 transition-colors hover:border-primary/60">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-foreground/60">Pood</div>
                <div className="font-display text-3xl uppercase">iSport · vormid</div>
              </div>
              <ExternalLink className="text-primary transition-transform group-hover:scale-110" />
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}