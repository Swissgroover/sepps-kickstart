import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PitchBackground } from "@/components/site/PitchBackground";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { registrationOnlyMode } from "@/lib/registration-only";
import { trialIntroduction } from "@/lib/training";

export const Route = createFileRoute("/treeningud")({
  beforeLoad: () => {
    if (registrationOnlyMode) throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "Treeningud — JK SEPPS" },
      { name: "description", content: "JK SEPPSi treeningud toetavad mängija pikaajalist arengut. Tutvu treeningkeskkonnaga ja tule tasuta ühekuulisele prooviperioodile." },
      { property: "og:title", content: "Treeningud — JK SEPPS" },
      { property: "og:description", content: "Vanusele ja arengutasemele sobivad treeningud ning tasuta ühekuuline prooviperiood." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TreeningudPage,
});

function TreeningudPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 text-primary"><PitchBackground /></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <Reveal>
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Treeningud</div>
            <h1 className="max-w-5xl font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
              Treeningkeskkond, mis toetab <span className="text-primary">mängija arengut.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-foreground/70">
              JK SEPPSi treeningute eesmärk on mängija pikaajaline areng. Treeningud on üles ehitatud nii, et mängija areneks tehniliselt, taktikaliselt, füüsiliselt ja vaimselt ning õpiks järjest paremini mängu mõistma ja iseseisvalt otsuseid tegema.
            </p>
            <p className="mt-5 max-w-3xl text-lg text-foreground/70">
              Vanuse kasvades kasvavad ka nõudmised. Soovime, et mängija õpiks treenima eesmärgipäraselt, võtma vastutust oma arengu eest ning mõistma, et järgmisele tasemele jõudmine nõuab järjepidevat tööd.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <Reveal>
          <SectionHeading title={<>Erinev vanus. Erinevad vajadused. <span className="text-primary">Sama eesmärk.</span></>}>
            Nooremates vanusegruppides on keskmes pall, liikumine, tehnilised oskused ja armastus mängu vastu. Vanemaks saades muutub treening järjest detailsemaks ning suureneb taktikalise, füüsilise ja vaimse ettevalmistuse osakaal.
          </SectionHeading>
          <p className="mt-5 max-w-3xl text-lg text-foreground/70">Me ei kiirusta arenguetappidest üle. Tugev mängija ehitatakse samm-sammult.</p>
        </Reveal>
      </section>
      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <Reveal>
            <SectionHeading title={<>Tule <span className="text-primary">proovima!</span></>}>
              Parim viis JK SEPPSiga tutvumiseks on tulla treeningutele. Registreeri laps ning leiame talle vanuse ja varasema kogemuse põhjal sobiva treeninggrupi.
            </SectionHeading>
            <p className="mt-5 max-w-3xl text-lg text-foreground/70">
              {trialIntroduction}, mille jooksul saab laps treeningutega rahulikult tutvuda ja hinnata, kas JK SEPPSi treeningkeskkond on talle sobiv.
            </p>
            <Button asChild className="mt-8 h-auto whitespace-normal rounded-full px-6 py-3">
              <Link to="/registreeru" hash="registreerimisvorm">Registreeru treeningutele <ArrowRight /></Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}