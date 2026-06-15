import { createFileRoute } from "@tanstack/react-router";
import { Mail, Check } from "lucide-react";
import { PitchBackground } from "@/components/site/PitchBackground";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/registreeru")({
  head: () => ({
    meta: [
      { title: "Registreeru trenni — JK SEPPS" },
      { name: "description", content: "Liitu JK SEPPSiga — saada lihtne e-kiri ja saame trenniga ühele lainele." },
      { property: "og:title", content: "Registreeru trenni — JK SEPPS" },
      { property: "og:description", content: "Liitu klubi trenniga." },
    ],
  }),
  component: RegistreeruPage,
});

const mailBody = encodeURIComponent(
  `Tere!\n\nSooviksin registreerida trenni.\n\nMängija nimi:\nVanus / sünniaeg:\nVanema nimi (alaealise puhul):\nKontakttelefon:\nVarasem kogemus:\nLisainfo:\n\nTänan!`,
);
const MAILTO = `mailto:info@sepps.eu?subject=${encodeURIComponent("Trenni registreerimine")}&body=${mailBody}`;

function RegistreeruPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 text-primary"><PitchBackground /></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <Reveal>
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Registreeru</div>
            <h1 className="font-display text-6xl uppercase leading-[0.9] tracking-tight sm:text-8xl">
              Tule <span className="text-primary">väljakule.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-foreground/70">
              Liitumine on lihtne — saada meile e-kiri ja võtame sinuga ühendust,
              et leida sobiv trennigrupp.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <SectionHeading eyebrow="Samm haaval" title={<>Kolm <span className="text-primary">sammu</span> ja oled meiega</>} />
            <ol className="mt-10 space-y-6">
              {[
                { t: "Vajuta nuppu", d: "Avab eeltäidetud e-kirja sinu e-posti programmis." },
                { t: "Täida andmed", d: "Mängija nimi, vanus, kontakt ja varasem kogemus — kõik ühe minutiga." },
                { t: "Saada ära", d: "Meie info-meeskond võtab sinuga ühendust ja lepib trenniaja kokku." },
              ].map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-lg text-primary-foreground">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-display text-2xl uppercase">{s.t}</div>
                    <div className="mt-1 text-sm text-foreground/70">{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card p-8">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
              <div className="relative">
                <Mail className="text-primary" size={32} />
                <h3 className="mt-5 font-display text-4xl uppercase leading-none">Saada e-kiri</h3>
                <p className="mt-3 text-sm text-foreground/70">
                  Avab eeltäidetud kirja aadressile <span className="text-foreground">info@sepps.eu</span>.
                </p>
                <a
                  href={MAILTO}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                >
                  Registreeru trenni <Mail size={16} />
                </a>
                <ul className="mt-8 space-y-2 text-sm text-foreground/70">
                  {["Tasuta proovitrenn", "2014-2017 vanusegrupid", "Kogenud treenerid"].map((x) => (
                    <li key={x} className="flex items-center gap-2">
                      <Check size={14} className="text-primary" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-12 rounded-3xl border border-white/10 bg-ink/60 p-6 text-sm text-foreground/70">
            Eelistad helistada? Võta ühendust õppejuhi Merlyn Leimaniga aadressil{" "}
            <a className="text-primary hover:underline" href="mailto:merlyn@sepps.eu">merlyn@sepps.eu</a>{" "}
            või telefonil <a className="text-primary hover:underline" href="tel:+37256287449">+372 56 28 7449</a>.
          </div>
        </Reveal>
      </section>
    </div>
  );
}
