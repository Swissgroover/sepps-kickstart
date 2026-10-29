import { createFileRoute, redirect } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PitchBackground } from "@/components/site/PitchBackground";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { RegistrationForm } from "@/components/site/RegistrationForm";
import { registrationOnlyMode } from "@/lib/registration-only";

export const Route = createFileRoute("/registreeru")({
  beforeLoad: () => {
    if (registrationOnlyMode) throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "Registreeru trenni — JK SEPPS" },
      { name: "description", content: "Täida vorm ja saada JK SEPPSile lapse trenni registreerimissoov." },
      { property: "og:title", content: "Registreeru trenni — JK SEPPS" },
      { property: "og:description", content: "Liitu klubi trenniga." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RegistreeruPage,
});

function RegistreeruPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 text-primary"><PitchBackground /></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <Reveal>
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Registreeru</div>
            <h1 className="font-display text-6xl uppercase leading-[0.9] tracking-tight sm:text-8xl">
              Astu esimene samm  <span className="text-primary">jalgpalli juurde.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-foreground/70">
              Liitumine on lihtne! Võta meiega ühendust e-posti teel ning leiame sinu lapse vanusele ja oskustele sobiva treeninggrupi. Ootame väljakule nii algajaid kui ka juba kogenumaid noori jalgpallureid.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <SectionHeading eyebrow="Samm haaval" title={<>Kolm <span className="text-primary">sammu</span> ja oled meiega</>} />
            <ol className="mt-10 space-y-6">
              {["Täida vorm.", "Saada registreerimissoov.", "Lepime trenni tulemise kokku."].map((t, i) => (
                <li key={t} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-lg text-primary-foreground">
                    {i + 1}
                  </div>
                  <div className="font-display text-2xl uppercase">{t}</div>
                </li>
              ))}
            </ol>
            <ul className="mt-10 space-y-2 text-sm text-foreground/70">
              {["Tasuta proovitrenn", "2014-2017 vanusegrupid", "Kogenud treenerid"].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <Check size={14} className="text-primary" /> {x}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
              <div className="relative">
                <h3 className="font-display text-4xl uppercase leading-none">Tule meiega trenni</h3>
                <p className="mt-3 text-sm text-foreground/70">
                  Täida allolev vorm ja saada meile lapse registreerimissoov. Võtame sinuga ühendust ja lepime kokku, millise grupi treeningule tulla.
                </p>
                <RegistrationForm />
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
