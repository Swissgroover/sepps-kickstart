import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Check, CheckCircle2, AlertCircle } from "lucide-react";
import { PitchBackground } from "@/components/site/PitchBackground";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { registrationSchema, type RegistrationInput } from "@/lib/registration";

export const Route = createFileRoute("/registreeru")({
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

type FieldDef = { name: keyof RegistrationInput; label: string; required?: boolean; type?: string; multiline?: boolean; hint?: string; autoComplete?: string; inputMode?: "numeric" | "tel" | "email" };

const fields: FieldDef[] = [
  { name: "childName", label: "Lapse nimi", required: true },
  { name: "childCode", label: "Lapse isikukood", required: true, inputMode: "numeric" },
  { name: "parentName", label: "Vanema nimi", required: true, autoComplete: "name" },
  { name: "parentCode", label: "Vanema isikukood", required: true, inputMode: "numeric" },
  { name: "phone", label: "Kontakttelefon", required: true, type: "tel", inputMode: "tel", autoComplete: "tel" },
  { name: "email", label: "Vanema e-post", required: true, type: "email", inputMode: "email", autoComplete: "email" },
  { name: "address", label: "Kodune aadress", required: true, autoComplete: "street-address" },
  { name: "health", label: "Tervislikud eripärad", multiline: true, hint: "Lisa ainult info, millega treener peab lapse turvaliseks osalemiseks arvestama." },
  { name: "experience", label: "Varasem kogemus", multiline: true },
  { name: "notes", label: "Lisainfo", multiline: true },
];

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none transition-colors focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/50";

function RegistrationForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    mode: "onTouched",
  });

  const onSubmit = async (input: RegistrationInput) => {
    if (status === "sending") return;
    const parsed = registrationSchema.safeParse(input);
    if (!parsed.success) return;
    const r = parsed.data;
    setStatus("sending");
    // Honeypot filled → pretend success, send nothing.
    if (r.website) {
      setStatus("sent");
      return;
    }
    try {
      const cfg = await fetch("/api/public/register").then((x) => x.json()).catch(() => null);
      if (!cfg?.ok || !cfg.key) throw new Error("not_configured");
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: cfg.key,
          subject: "Trenni registreerimine",
          from_name: "JK SEPPS registreerimine",
          email: r.email,
          replyto: r.email,
          botcheck: "",
          "Lapse nimi": r.childName,
          "Lapse isikukood": r.childCode,
          "Vanema nimi": r.parentName,
          "Vanema isikukood": r.parentCode,
          Kontakttelefon: r.phone,
          "Vanema e-post": r.email,
          "Kodune aadress": r.address,
          "Tervislikud eripärad": r.health || "-",
          "Varasem kogemus": r.experience || "-",
          Lisainfo: r.notes || "-",
        }),
      });
      const out = await res.json().catch(() => null);
      setStatus(res.ok && out?.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="flex items-start gap-3 rounded-2xl border border-primary/40 bg-primary/10 p-5 text-sm">
        <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={20} />
        <p>Aitäh! Sinu registreerimissoov on saadetud. Võtame sinuga ühendust ja lepime kokku trenni tulemise.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-4">
      <p className="text-xs text-foreground/60">Tärniga (*) märgitud väljad on kohustuslikud.</p>
      {fields.map((f) => {
        const err = errors[f.name]?.message;
        const id = `reg-${f.name}`;
        const describedBy = [f.hint ? `${id}-hint` : "", err ? `${id}-err` : ""].filter(Boolean).join(" ") || undefined;
        return (
          <div key={f.name}>
            <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
              {f.label}{f.required && <span className="text-primary"> *</span>}
            </label>
            {f.multiline ? (
              <textarea id={id} rows={3} className={inputCls} aria-invalid={!!err} aria-describedby={describedBy} {...register(f.name)} />
            ) : (
              <input id={id} type={f.type ?? "text"} inputMode={f.inputMode} autoComplete={f.autoComplete} className={inputCls} aria-invalid={!!err} aria-required={f.required} aria-describedby={describedBy} {...register(f.name)} />
            )}
            {f.hint && <p id={`${id}-hint`} className="mt-1 text-xs text-foreground/60">{f.hint}</p>}
            {err && <p id={`${id}-err`} className="mt-1 text-xs text-destructive">{err}</p>}
          </div>
        );
      })}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Veebileht<input tabIndex={-1} autoComplete="off" {...register("website")} /></label>
      </div>
      {status === "error" && (
        <div role="alert" className="flex items-start gap-3 rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm">
          <AlertCircle className="mt-0.5 shrink-0 text-destructive" size={18} />
          <p>Saatmine ei õnnestunud. Proovi uuesti või võta meiega ühendust aadressil{" "}
            <a className="text-primary hover:underline" href="mailto:info@sepps.eu">info@sepps.eu</a>.</p>
        </div>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
      >
        {status === "sending" ? "Saadan…" : "Saada registreerimissoov"} <Send size={16} />
      </button>
    </form>
  );
}

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
              Liitumine on lihtne! Võta meiega ühendust e-posti teel ning leiame sinu lapse vanusele ja oskustele sobiva treeninggrupi. Ootame väljakule nii algajaid kui ka juba kogenumaid noori jalgpallureid.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <SectionHeading eyebrow="Samm haaval" title={<>Kolm <span className="text-primary">sammu</span> ja oled meiega</>} />
            <ol className="mt-10 space-y-6">
              {["Täida vorm.", "Saada registreerimissoov.", "Lepime trenni tulemise kokku."].map((t, i) => (
                <li key={t} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-lg text-primary-foreground">
                    {i + 1}
                  </div>
                  <div className="font-display text-2xl uppercase">{t}</div>
                </li>
              ))}
            </ol>
            <ul className="mt-10 space-y-2 text-sm text-foreground/70">
              {["Tasuta proovitrenn", "2014-2017 vanusegrupid", "Kogenud treenerid"].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <Check size={14} className="text-primary" /> {x}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
              <div className="relative">
                <h3 className="font-display text-4xl uppercase leading-none">Tule meiega trenni</h3>
                <p className="mt-3 text-sm text-foreground/70">
                  Täida allolev vorm ja saada meile lapse registreerimissoov. Võtame sinuga ühendust ja lepime kokku, millise grupi treeningule tulla.
                </p>
                <RegistrationForm />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-12 rounded-3xl border border-white/10 bg-ink/60 p-6 text-sm text-foreground/70">
            Eelistad helistada? Võta ühendust õppejuhi Merlyn Leimaniga aadressil{" "}
            <a className="text-primary hover:underline" href="mailto:merlyn@sepps.eu">merlyn@sepps.eu</a>{" "}
            või telefonil <a className="text-primary hover:underline" href="tel:+37256287449">+372 56 28 7449</a>.
          </div>
        </Reveal>
      </section>
    </div>
  );
}
