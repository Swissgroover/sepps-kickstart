import { createFileRoute } from "@tanstack/react-router";
import { Camera } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PageIntro, btnPrimary, btnSecondary } from "@/components/site/PageIntro";

export const Route = createFileRoute("/klubi")({
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
  { title: "Distsipliin", desc: "Õigeaegsus, pühendumus ja austus kaaslaste vastu." },
  { title: "Areng", desc: "Iga trenn on samm paremaks: tehnika, taktika ja mõtteviis." },
  { title: "Meeskond", desc: "Mängija mängija eest, klubi mängija eest." },
  { title: "Kirg", desc: "Armastus mängu vastu annab jõudu areneda." },
];

function KlubiPage() {
  return (
    <div>
      <PageIntro eyebrow="Klubi" title="Üks klubi, ühine eesmärk">
        JK SEPPS tegutseb ERASPORDIKOOL SEPPSi koosseisus ning pakub lastele ja noortele võimalust areneda toetavas, professionaalses ja sõbralikus keskkonnas. Meie eesmärk on kujundada oskuslikke mängijaid, enesekindlaid noori ja tugeva meeskonnavaimuga inimesi.
      </PageIntro>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading eyebrow="Meie väärtused" title="Mis on meile oluline" />
        <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="border-l-4 border-primary pl-4">
              <dt className="font-semibold">{v.title}</dt>
              <dd className="mt-1 text-muted-foreground">{v.desc}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-cool">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-center">
          <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-input bg-background text-muted-foreground">
            <Camera size={28} />
            <span className="text-sm">Siia tuleb peatreeneri foto</span>
          </div>
          <div>
            <SectionHeading eyebrow="Peatreener" title="Madis Sepp">
              Madis Sepp juhib JK SEPPSi ja ERASPORDIKOOL SEPPSi tegevust. Oma töös peab ta oluliseks iga mängija individuaalset arengut, tehniliste oskuste järjepidevat täiustamist ning positiivse ja toetava treeningkeskkonna loomist. Tema eesmärk on, et iga laps lahkuks treeningult enesekindlama, oskuslikuma ja rõõmsamana kui sinna tulles.
            </SectionHeading>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="mailto:madis@sepps.eu" className={btnPrimary}>madis@sepps.eu</a>
              <a href="tel:+37253363247" className={btnSecondary}>+372 53 36 3247</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
