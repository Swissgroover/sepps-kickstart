import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { PageIntro, btnPrimary, btnSecondary } from "@/components/site/PageIntro";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/vormid")({
  head: () => ({
    meta: [
      { title: "Vormid — JK SEPPS" },
      { name: "description", content: "Telli JK SEPPS treening- ja võistlusvorm otse iSport poest." },
      { property: "og:title", content: "Vormid — JK SEPPS" },
      { property: "og:description", content: "Treening- ja võistlusvorm klubi värvides." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: VormidPage,
});

const SHOP_URL = "https://isport.ee/tootekategooria/klubid/jk-sepps/";

function VormidPage() {
  return (
    <div>
      <PageIntro eyebrow="Vormid" title="Klubi treening- ja võistlusvorm">
        JK SEPPSi treening- ja võistlusvarustuse saad mugavalt tellida meie koostööpartneri iSporti e-poest. Vali sobiv suurus ning ülejäänu eest hoolitseb iSport.
      </PageIntro>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "Treeningvorm", desc: "Igapäevaseks trenniks, klubi värvides." },
            { title: "Võistlusvorm", desc: "Mängupäevaks, ametlik komplekt klubi sümboolikaga." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border p-6">
              <h3 className="font-display text-2xl">{c.title}</h3>
              <p className="mt-2 text-muted-foreground">{c.desc}</p>
              <a href={SHOP_URL} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                Telli iSportist <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-soft">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <SectionHeading eyebrow="Tellimine" title="Kuidas tellida" />
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { t: "Vali tooted", d: "Mine iSporti e-poodi ja vali klubi kategooriast sobivad esemed." },
              { t: "Kontrolli suurust", d: "Vaata suurustabelit. Kahtluse korral küsi treenerilt." },
              { t: "Kohaletoimetus", d: "iSport toimetab tellimuse kokkulepitud viisil kohale." },
            ].map((s, i) => (
              <li key={s.t}>
                <div className="text-sm font-bold text-primary">{i + 1}. samm</div>
                <div className="mt-1 font-semibold">{s.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={SHOP_URL} target="_blank" rel="noreferrer" className={btnPrimary}>
              Ava iSporti e-pood <ExternalLink size={16} />
            </a>
            <a href={`mailto:info@sepps.eu?subject=${encodeURIComponent("Vormi tellimine")}`} className={btnSecondary}>
              Küsi abi
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
