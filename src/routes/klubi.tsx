import { createFileRoute, redirect } from "@tanstack/react-router";
import { Shield, Target, Users, Heart, Trophy } from "lucide-react";
import { PitchBackground } from "@/components/site/PitchBackground";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { registrationOnlyMode } from "@/lib/registration-only";

export const Route = createFileRoute("/klubi")({
  beforeLoad: () => {
    if (registrationOnlyMode) throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "Klubi — JK SEPPS" },
      { name: "description", content: "JK SEPPS klubi lugu, väärtused ja peatreener Madis Sepp." },
      { property: "og:title", content: "Klubi — JK SEPPS" },
      { property: "og:description", content: "Klubi lugu, väärtused ja meeskond." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: KlubiPage,
});

const values = [
  { icon: Shield, title: "Mängija enne tulemust", desc: "Noortejalgpalli tulemus on oluline, kuid see ei tohi tulla mängija pikaajalise arengu arvelt. Tahame võita, kuid veel rohkem tahame arendada mängijaid, kes oskavad tulevikus mängida kõrgemal tasemel." },
  { icon: Target, title: "Pikaajaline areng", desc: "Mängija arengut ei hinnata ühe mängu, kuu ega hooaja põhjal. Jalgpalluri kujunemine võtab aastaid ning meie ülesanne on hoida fookus pikemal teekonnal." },
  { icon: Users, title: "Individuaalne mängija", desc: "Meeskond annab mängijale keskkonna, kuid areng toimub individuaalselt. Iga mängija tugevused, nõrkused ja arengukiirus on erinevad." },
  { icon: Heart, title: "Kõrged standardid", desc: "Kõrgemale tasemele jõudmine nõuab häid harjumusi, järjepidevust ja õiget suhtumist igasse treeningusse." },
  { icon: Trophy, title: "Järgmine tase", desc: "Saaremaa eraldatus seab mängijate arengule omad piirid. Siin puuduvad tippklubid ja kõrgeima taseme igapäevane konkurents. Meie ülesanne on arendada mängijaid võimalikult hästi ning aidata neil õigel hetkel ja õiges vanuses liikuda järgmisele tasemele ehk tugevamasse jalgpallikeskkonda." },
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
              Üks klubi.<br /><span className="text-primary">Ühine eesmärk.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-foreground/70">
              JK SEPPSi eesmärk on arendada noori jalgpallureid ja aidata neil jõuda võimalikult kõrgele tasemele. Loome selleks keskkonna, kus mängijatele esitatakse kõrgeid nõudmisi, treenitakse eesmärgipäraselt ning iga mängija saab võimaluse oma potentsiaali maksimaalselt realiseerida.
            </p>
            <p className="mt-5 max-w-2xl text-lg text-foreground/70">
              Me ei vaata ainult seda, milline on mängija täna, vaid seda, milliseks mängijaks võib ta aastate jooksul kujuneda. Selleks kõigeks on vaja aga kvaliteetset treeningkeskkonda, järjepidevat tööd, kodu toetust ja mängija enda tahet areneda.
            </p>
            <p className="mt-5 max-w-2xl text-lg text-foreground/70">
              Noortejalgpallis ei määra arengut üks mäng, turniir ega hooaja tulemus. Meie fookus on pikaajalisel tööl ja mängijate ettevalmistamisel järgmiseks tasemeks.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Meie väärtused" title={<>Mis paneb meid <span className="text-primary">mängima</span></>} />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08} className={i === 4 ? "md:col-span-2" : ""}>
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
                <div className="mt-3 text-sm uppercase tracking-[0.2em] text-foreground/60">JK SEPPSi peatreener</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Peatreener" title={<>Treener, kes  <span className="text-primary">inspireerib.</span></>}>
              Madis vastutab JK SEPPSi sportliku suuna ja mängijate arengukeskkonna eest. Treeneritöös on tema fookuses mängija individuaalne areng, tehniliste oskuste kõrge tase, mängu mõistmine ning järjepidev töö pikemaajaliste eesmärkide nimel. Samuti peab ta treeningutel oluliseks töökust ning positiivse ja toetava treeningkeskkonna loomist.
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