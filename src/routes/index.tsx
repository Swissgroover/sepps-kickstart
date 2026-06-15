import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shirt, UserPlus, Trophy } from "lucide-react";
import { useGsap } from "@/lib/use-gsap";
import { Marquee } from "@/components/site/Marquee";
import { PitchBackground } from "@/components/site/PitchBackground";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { HeroGoalScene } from "@/components/site/HeroGoalScene";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JK SEPPS — Jalgpalliklubi" },
      { name: "description", content: "JK SEPPS — kirglik Eesti jalgpalliklubi. Tutvu klubiga, telli vormid ja registreeru trenni." },
      { property: "og:title", content: "JK SEPPS — Jalgpalliklubi" },
      { property: "og:description", content: "Kirglik Eesti jalgpalliklubi. Trennid, võistlused ja vormid." },
    ],
  }),
  component: Index,
});

function Hero() {
  const ref = useGsap<HTMLDivElement>(({ gsap, scope }) => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(".hero-eyebrow", { autoAlpha: 0, y: 12, duration: 0.6 })
      .from(".hero-word", { yPercent: 110, autoAlpha: 0, duration: 1, stagger: 0.12 }, "-=0.2")
      .from(".hero-sub", { autoAlpha: 0, y: 16, duration: 0.7 }, "-=0.5")
      .from(".hero-cta", { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.1 }, "-=0.4")
      .from(".hero-meta", { autoAlpha: 0, y: 10, duration: 0.6, stagger: 0.08 }, "-=0.4");

    gsap.to(".hero-pitch", {
      yPercent: 8,
      ease: "none",
      scrollTrigger: { trigger: scope, start: "top top", end: "bottom top", scrub: true },
    });
  }, []);

  return (
    <section ref={ref} className="hero-root relative overflow-hidden bg-ink">
      <div className="hero-pitch absolute inset-0 text-primary">
        <PitchBackground />
      </div>
      <div className="absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-[360px] w-[360px] rounded-full bg-pitch-glow/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-24 pt-20 sm:px-6 sm:pb-32 sm:pt-28 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
        <div className="flex flex-col gap-8">
          <div className="hero-eyebrow inline-flex w-max items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-foreground/80">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pitch-pulse" />
            Eesti jalgpalliklubi
          </div>

          <h1 className="font-display text-[clamp(3.5rem,11vw,9rem)] uppercase leading-[0.85] tracking-tight">
            <span className="block overflow-hidden">
              <span className="hero-word inline-block">Mängi</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word inline-block text-stroke">nagu</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word inline-block text-primary">SEPPS.</span>
            </span>
          </h1>

          <p className="hero-sub max-w-xl text-base text-foreground/70 sm:text-lg">
            Klubi, kus iga trenn on lahing ja iga mängija loeb. Tule väljakule —
            treeningud, võistlused ja päris jalgpalli vaim ootavad.
          </p>

          <div className="flex flex-wrap items-stretch gap-3">
            <Link
              to="/registreeru"
              className="hero-cta group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Registreeru trenni
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/vormid"
              className="hero-cta group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
            >
              <Shirt size={16} /> Telli vorm
            </Link>
          </div>

          <div className="mt-2 flex flex-wrap items-end gap-x-10 gap-y-6 text-sm text-foreground/60">
            <div className="hero-meta">
              <div className="font-display text-4xl leading-none text-foreground">100+</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em]">mängijat</div>
            </div>
            <div className="hero-meta">
              <div className="font-display text-4xl leading-none text-foreground">5x</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em]">nädalas trenni</div>
            </div>
            <div className="hero-meta">
              <div className="font-display text-4xl leading-none text-foreground">1</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em]">klubi · 1 perekond</div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <HeroGoalScene />
        </div>
      </div>
    </section>
  );
}

function FeatureCards() {
  const cards = [
    { to: "/klubi", icon: Trophy, title: "Klubi lugu", desc: "Kes me oleme, mille eest mängime ja kuhu liigume." },
    { to: "/vormid", icon: Shirt, title: "Treening- ja võistlusvorm", desc: "Telli klubi vormid otse iSport poest." },
    { to: "/registreeru", icon: UserPlus, title: "Tule trenni", desc: "Saada e-kiri ja liitu järgmise trenniga." },
  ] as const;

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <Reveal>
        <SectionHeading eyebrow="Liigu edasi" title={<>Kolm sammu <span className="text-primary">väljakule</span></>}>
          Vali, kust alustada — kõik teed viivad palli juurde.
        </SectionHeading>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.to} delay={i * 0.1}>
            <Link
              to={c.to}
              className="group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-card p-8 transition-colors hover:border-primary/60"
            >
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary/0 blur-3xl transition-colors duration-500 group-hover:bg-primary/30" />
              <c.icon className="text-primary" size={28} />
              <h3 className="mt-6 font-display text-3xl uppercase tracking-tight">{c.title}</h3>
              <p className="mt-3 text-sm text-foreground/70">{c.desc}</p>
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Vaata <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function AboutTeaser() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0 text-primary/40">
        <PitchBackground />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 md:grid-cols-2 md:items-center">
        <Reveal>
          <SectionHeading eyebrow="Klubist" title={<>Pall, kirg, <span className="text-primary">perekond.</span></>}>
            JK SEPPS on ERASPORDIKOOL SEPPSi jalgpalliklubi. Treenime noori mängijaid,
            kes tahavad rohkem kui ainult mängida — me ehitame mängumehi ja mängunaisi
            kogu eluks.
          </SectionHeading>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { k: "Distsipliin", v: "Tule õigel ajal. Anna kõik." },
              { k: "Tehnika", v: "Iga puutest paremaks." },
              { k: "Meeskond", v: "Üksi kiiresti, koos kaugele." },
              { k: "Rõõm", v: "Ilma rõõmuta pole jalgpalli." },
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
      <Marquee items={["JK SEPPS", "Eesti", "Football Club", "Since 2020", "Pall · Kirg · Perekond"]} />
      <FeatureCards />
      <AboutTeaser />
    </div>
  );
}
