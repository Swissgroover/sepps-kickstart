import { createFileRoute, redirect } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PitchBackground } from "@/components/site/PitchBackground";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { RegistrationForm } from "@/components/site/RegistrationForm";
import { trialBenefit, trialIntroduction } from "@/lib/training";
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
              Täida registreerimisvorm ning leiame sinu lapse vanusele ja oskustele sobiva treeninggrupi. Ootame väljakule nii algajaid kui ka juba kogenumaid noori jalgpallureid.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <SectionHeading eyebrow="Kvaliteetsed treeningud" title={<>Kolme sammu <span className="text-primary">kaugusel</span></>} />
            <ol className="mt-10 space-y-6">
              {["Täida vorm.", "Saada registreerimissoov.", "Lepime treeningute prooviperioodi algusaja kokku."].map((t, i) => (
                <li key={t} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-lg text-primary-foreground">
                    {i + 1}
                  </div>
                  <div className="font-display text-2xl uppercase">{t}</div>
                </li>
              ))}
            </ol>
            <ul className="mt-10 space-y-2 text-sm text-foreground/70">
              {[trialBenefit, "Kvaliteetsed treeningud", "Kogenud treenerid", "Toetav keskkond"].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <Check size={14} className="text-primary" /> {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-foreground/70">
              {trialIntroduction}. Kuna soovime hoida treeninggrupid kvaliteetse töö jaoks sobiva suurusega, on kohtade arv gruppides piiratud. Klubisse vastuvõtmise otsustab treener pärast prooviperioodi lõppu.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div id="registreerimisvorm" className="relative scroll-mt-24 overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
              <div className="relative">
                <h3 className="font-display text-4xl uppercase leading-none">Registreeru treeningutele</h3>
                <p className="mt-3 text-sm text-foreground/70">
                  Täida vorm ja registreeri laps treeningutele!
                </p>
                <RegistrationForm />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-12 rounded-3xl border border-white/10 bg-ink/60 p-6 text-sm text-foreground/70">
            Soovid enne otsustamist nõu küsida? Võta ühendust telefonil <a className="text-primary hover:underline" href="tel:+37256287449">+372 56 28 7449</a> (Merlyn Leiman) või <a className="text-primary hover:underline" href="tel:+37253363247">+372 533 63 247</a> (Madis Sepp).
          </div>
        </Reveal>
      </section>
    </div>
  );
}
