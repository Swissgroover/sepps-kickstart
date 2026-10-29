import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Camera, ExternalLink, Mail } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { btnPrimary, btnSecondary } from "@/components/site/PageIntro";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JK SEPPS — laste ja noorte jalgpalliklubi" },
      { name: "description", content: "Tule JK SEPPSi jalgpallitrenni! ERASPORDIKOOL SEPPSi jalgpalliklubi lastele ja noortele." },
      { property: "og:title", content: "JK SEPPS — laste ja noorte jalgpalliklubi" },
      { property: "og:description", content: "Kvaliteetsed treeningud ja toetav keskkond. Registreeri laps trenni." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Tule JK SEPPSi <span className="text-primary">jalgpallitrenni!</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            JK SEPPS on ERASPORDIKOOL SEPPSi jalgpalliklubi. Pakume lastele ja noortele kvaliteetseid treeninguid, põnevaid võistlusi ja toetavat keskkonda.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/registreeru" className={btnPrimary}>
              Registreeru trenni <ArrowRight size={16} />
            </Link>
            <Link to="/klubi" className={btnSecondary}>Tutvu klubiga</Link>
          </div>
        </div>
        {/* Vahetatav pildikoht: asenda päris klubifotoga */}
        <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-input bg-soft text-muted-foreground">
          <Camera size={32} />
          <span className="text-sm">Siia tuleb foto klubi treeningust</span>
        </div>
      </section>

      <section className="bg-soft">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr]">
          <SectionHeading eyebrow="Klubist" title="Meie juures on iga laps oluline">
            Aitame lastel ja noortel avastada jalgpalli võlu. Arendame tehnilisi oskusi, meeskonnatööd, enesekindlust ja sportlikke väärtusi, mis saadavad neid kogu eluks.
          </SectionHeading>
          <ul className="divide-y divide-border self-center border-y border-border">
            {[
              ["Distsipliin", "Õpime olema täpsed, pühendunud ja austama kaaslasi ning vastaseid."],
              ["Tehnika", "Iga treening on võimalus õppida midagi uut."],
              ["Meeskond", "Toetame üksteist ja tähistame ühiseid õnnestumisi."],
              ["Rõõm", "Armastus jalgpalli vastu on parim motivatsioon."],
            ].map(([k, v]) => (
              <li key={k} className="py-3">
                <span className="font-semibold">{k}.</span> <span className="text-muted-foreground">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="rounded-2xl bg-primary p-8 text-primary-foreground sm:p-10 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h2 className="font-display text-3xl">Registreeri laps trenni</h2>
            <p className="mt-2 max-w-xl text-primary-foreground/85">
              Saada meile eeltäidetud e-kiri ja leiame lapse vanusele ning oskustele sobiva treeninggrupi. Ootame nii algajaid kui ka kogenumaid.
            </p>
          </div>
          <Link
            to="/registreeru"
            className="mt-6 inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-background px-6 text-sm font-semibold text-primary md:mt-0"
          >
            <Mail size={16} /> Registreeru trenni
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">Klubivormid</span> saab tellida koostööpartneri iSporti e-poest.
          </p>
          <Link to="/vormid" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            Vaata vorme <ExternalLink size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
