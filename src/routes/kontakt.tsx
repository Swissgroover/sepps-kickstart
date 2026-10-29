import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, Facebook, ExternalLink } from "lucide-react";
import { PageIntro } from "@/components/site/PageIntro";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — JK SEPPS" },
      { name: "description", content: "Võta JK SEPPSi meeskonnaga ühendust — Merlyn, Madis, Kaiti ja Oliver." },
      { property: "og:title", content: "Kontakt — JK SEPPS" },
      { property: "og:description", content: "Kontaktid ja klubi meeskond." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: KontaktPage,
});

const people = [
  { name: "Merlyn Leiman", role: "ERASPORDIKOOL SEPPSi õppejuht", mail: "merlyn@sepps.eu", tel: "+372 56 28 7449" },
  { name: "Madis Sepp", role: "Peatreener", mail: "madis@sepps.eu", tel: "+372 53 36 3247" },
  { name: "Kaiti Enno", role: "Infojuht", mail: "info@sepps.eu", tel: "+372 54 51 1800" },
  { name: "Oliver Moring", role: "Klienditoe- ja haldusspetsialist", mail: "sepps@sepps.eu", tel: "+372 53 00 6717" },
];

function KontaktPage() {
  return (
    <div>
      <PageIntro eyebrow="Kontakt" title="Võta meiega ühendust">
        Küsimused, registreerimine või koostöö — vastame heameelega. Üldaadress on{" "}
        <a className="text-primary hover:underline" href="mailto:info@sepps.eu">info@sepps.eu</a>.
      </PageIntro>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading eyebrow="Meeskond" title="Inimesed klubi taga" />
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {people.map((p) => (
            <li key={p.mail} className="grid gap-2 py-5 md:grid-cols-[1.2fr_1fr_1fr] md:items-center">
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-muted-foreground">{p.role}</div>
              </div>
              <a href={`mailto:${p.mail}`} className="inline-flex items-center gap-2 text-primary hover:underline">
                <Mail size={15} /> {p.mail}
              </a>
              <a href={`tel:${p.tel.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-primary">
                <Phone size={15} /> {p.tel}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            { href: "https://www.facebook.com/p/JK-SEPPS-100084304296076/", k: "Jälgi meid", t: "Facebook", I: Facebook },
            { href: "https://isport.ee/tootekategooria/klubid/jk-sepps/", k: "Klubivormid", t: "iSporti e-pood", I: ExternalLink },
          ].map(({ href, k, t, I }) => (
            <a key={href} href={href} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl border border-border bg-soft p-5 transition-colors hover:border-primary">
              <div>
                <div className="text-sm text-muted-foreground">{k}</div>
                <div className="font-semibold">{t}</div>
              </div>
              <I className="text-primary" size={20} />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
