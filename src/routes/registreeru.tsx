import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Copy, Check } from "lucide-react";
import { PageIntro, btnPrimary, btnSecondary } from "@/components/site/PageIntro";
import { REGISTRATION_BODY, REGISTRATION_EMAIL, REGISTRATION_MAILTO } from "@/lib/registration";

export const Route = createFileRoute("/registreeru")({
  head: () => ({
    meta: [
      { title: "Registreeri laps trenni — JK SEPPS" },
      { name: "description", content: "Registreeri laps JK SEPPSi jalgpallitrenni eeltäidetud e-kirjaga." },
      { property: "og:title", content: "Registreeri laps trenni — JK SEPPS" },
      { property: "og:description", content: "Saada meile registreerimiskiri ja leiame lapsele sobiva treeninggrupi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RegistreeruPage,
});

function CopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={btnSecondary + " h-10 px-4"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 2000);
        } catch {
          /* ignore */
        }
      }}
    >
      {done ? <Check size={14} /> : <Copy size={14} />} {done ? "Kopeeritud" : label}
    </button>
  );
}

function RegistreeruPage() {
  return (
    <div>
      <PageIntro eyebrow="Registreerimine" title="Registreeri laps trenni">
        Vajuta allolevat nuppu, täida avanevas e-kirjas andmed ja saada kiri meile.
      </PageIntro>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
          <div>
            <a href={REGISTRATION_MAILTO} className={btnPrimary}>
              <Mail size={16} /> Ava registreerimiskiri
            </a>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Kiri avaneb sinu e-posti rakenduses. Registreerimissoovi edastamiseks tuleb kiri ise ära saata.
            </p>

            <h2 className="font-display mt-10 text-2xl">Kuidas see käib</h2>
            <ol className="mt-5 space-y-5">
              {[
                { t: "Ava registreerimiskiri", d: "Nupp avab eeltäidetud kirja aadressile info@sepps.eu." },
                { t: "Täida andmed", d: "Lisa lapse ja vanema nimi ning isikukood, kontakttelefon, kodune aadress, tervislikud eripärad, varasem kogemus ja vajadusel lisainfo." },
                { t: "Saada kiri ära", d: "Võtame sinuga ühendust ja leiame lapse vanusele ning oskustele sobiva treeninggrupi." },
              ].map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</div>
                  <div>
                    <div className="font-semibold">{s.t}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-border bg-cool p-6">
            <h2 className="font-display text-xl">Kui e-posti rakendus ei avane</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Kopeeri aadress ja kirjamall ning saada kiri oma e-postist aadressile{" "}
              <span className="font-semibold text-foreground">{REGISTRATION_EMAIL}</span>.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <CopyButton text={REGISTRATION_EMAIL} label="Kopeeri aadress" />
              <CopyButton text={REGISTRATION_BODY} label="Kopeeri kirjamall" />
            </div>
            <pre className="mt-5 whitespace-pre-wrap rounded-xl border border-border bg-background p-4 font-body text-sm leading-relaxed">{REGISTRATION_BODY}</pre>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
          Eelistad helistada? Võta ühendust õppejuhi Merlyn Leimaniga aadressil{" "}
          <a className="text-primary hover:underline" href="mailto:merlyn@sepps.eu">merlyn@sepps.eu</a> või telefonil{" "}
          <a className="text-primary hover:underline" href="tel:+37256287449">+372 56 28 7449</a>.
        </div>
      </section>
    </div>
  );
}
