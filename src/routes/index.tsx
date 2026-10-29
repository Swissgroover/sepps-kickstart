import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shirt, UserPlus, Trophy } from "lucide-react";
import { PitchBackground } from "@/components/site/PitchBackground";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JK SEPPS — Jalgpalliklubi" },
      {
        name: "description",
        content:
          "JK SEPPS — kirglik Eesti jalgpalliklubi. Tutvu klubiga, telli vormid ja registreeru trenni.",
      },
      { property: "og:title", content: "JK SEPPS — Jalgpalliklubi" },
      {
        property: "og:description",
        content: "Kirglik Eesti jalgpalliklubi. Trennid, võistlused ja vormid.",
      },
    ],
  }),
  component: Index,
});

function Hero() {
  return (
    <section className="hero-root relative overflow-hidden bg-ink">
      <img
        src="/images/hero-team.png"
        alt="JK SEPPS meeskond"
        className="absolute inset-0 h-full w-full object-cover object-[28%_30%] sm:object-[40%_30%]"
      />


      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pb-32 sm:pt-28">
        <div className="flex flex-col gap-8">

          <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] uppercase leading-[0.85] tracking-tight [text-shadow:0_2px_18px_rgba(0,0,0,0.65)]">
            <span className="block">
              <span className="hero-word inline-block">Kasva</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word inline-block text-stroke">koos</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word inline-block text-primary">SEPPS-iga.</span>
            </span>
          </h1>

          <p className="hero-sub max-w-xl text-base text-foreground/70 [text-shadow:0_1px_4px_rgba(0,0,0,0.95),0_0_18px_rgba(0,0,0,0.7)] sm:text-lg">
            Meie juures saavad lapsed jalgpalli mängida, uusi oskusi õppida ja meeskonnast rõõmu tunda. Trennis pingutame koos ning mängudel hoiame üksteisele pöialt.
          </p>

          <div className="flex flex-wrap items-stretch gap-3">
            <Link
              to="/registreeru"
              className="hero-cta group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 text-sm font-semibold text-foreground shadow-[0_2px_16px_rgba(0,0,0,0.45)] transition-colors hover:bg-white/10"
            >
              Registreeru trenni
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/vormid"
              className="hero-cta group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 text-sm font-semibold text-foreground shadow-[0_2px_16px_rgba(0,0,0,0.45)] transition-colors hover:bg-white/10"
            >
              <Shirt size={16} /> Telli vorm
            </Link>
          </div>

        </div>
      </div>
    </section>

  );
}

function FeatureCards() {
  const cards = [
    {
      to: "/klubi",
      icon: Trophy,
      title: "Meie klubi",
      desc: "Loe, kes me oleme ja mida laste treenimisel oluliseks peame.",
      link: "Tutvu klubiga",
    },
    {
      to: "/registreeru",
      icon: UserPlus,
      title: "Tule trenni",
      desc: "Kirjuta meile ja leiame lapsele sobiva treeninggrupi.",
      link: "Registreeru trenni",
    },
    {
      to: "/vormid",
      icon: Shirt,
      title: "Klubivorm",
      desc: "Meie treening- ja võistlusvormid leiad iSporti e-poest.",
      link: "Vaata vorme",
    },
  ] as const;

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Järgmine samm"
          title={
            <>
              Tut

function AboutTeaser() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0 text-primary/40">
        <PitchBackground />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 md:grid-cols-2 md:items-center">
        <Reveal>
          <SectionHeading
            eyebrow="Klubist"
            title={
              <>
                Pall, kirg, <span className="text-primary">perekond.</span>
              </>
            }
          >
            JK SEPPS on ERASPORDIKOOL SEPPSi jalgpalliklubi, kus aitame lastel ja noortel avastada jalgpalli võlu. Arendame tehnilisi oskusi, meeskonnatööd, enesekindlust ja sportlikke väärtusi, mis saadavad neid kogu eluks.
          </SectionHeading>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { k: "Distsipliin", v: "Õpime olema täpsed, pühendunud ja austama nii meeskonnakaaslasi kui ka vastaseid." },
              { k: "Tehnika", v: "Iga treening on võimalus õppida midagi uut ja saada enesekindlamaks palliga." },
              { k: "Meeskond", v: "Koos toetame üksteist, õpime koostööd ning tähistame ühiseid õnnestumisi." },
              { k: "Rõõm", v: "Armastus jalgpalli vastu on parim motivatsioon arenemiseks." },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-white/10 bg-card/80 p-5">
                <div className="font-display text-2xl uppercase text-primary">{x.k}</div>
                <div className="mt-1 text-sm text-foreground/70">{x.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div>
      <Hero />
      <FeatureCards />
      <AboutTeaser />
    </div>
  );
}
