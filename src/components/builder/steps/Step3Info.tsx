import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBuilder } from "@/lib/builder/context";
import { POSITIONS } from "@/lib/builder/catalog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { StepHeader } from "./Step1Template";
import type { PlayerInfo } from "@/lib/builder/types";

const schema = z.object({
  firstName: z.string().max(40),
  lastName: z.string().max(40),
  displayName: z.string().max(40),
  position: z.string().min(1).max(4),
  preferredFoot: z.enum(["left", "right", "both"]),
  jerseyNumber: z.string().regex(/^\d{0,3}$/, "0–999"),
  nationality: z.string().max(3),
  club: z.string().max(30),
  birthYear: z.string().regex(/^(19|20)\d{2}$|^$/, "AAAA"),
  captain: z.boolean(),
  mvp: z.boolean(),
});

export function Step3Info() {
  const { state, dispatch } = useBuilder();

  const form = useForm<PlayerInfo>({
    resolver: zodResolver(schema),
    defaultValues: state.info,
    mode: "onChange",
  });

  const values = form.watch();

  useEffect(() => {
    dispatch({ type: "setInfo", patch: values });
    if (values.firstName || values.lastName || values.displayName) {
      dispatch({ type: "complete", step: 3 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    values.firstName,
    values.lastName,
    values.displayName,
    values.position,
    values.preferredFoot,
    values.jerseyNumber,
    values.nationality,
    values.club,
    values.birthYear,
    values.captain,
    values.mvp,
  ]);

  const reg = form.register;

  return (
    <div>
      <StepHeader title="Mängija info" subtitle="Kõik väljad on valikulised — jäta tühjaks, kui ei kehti." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Eesnimi">
          <Input className="builder-input" {...reg("firstName")} placeholder="Mihkel" />
        </Field>
        <Field label="Perekonnanimi">
          <Input className="builder-input" {...reg("lastName")} placeholder="Sepp" />
        </Field>
        <Field label="Kuvatav nimi (kaardil)" full>
          <Input className="builder-input" {...reg("displayName")} placeholder="M. SEPP" />
        </Field>
        <Field label="Positsioon">
          <select className="builder-select" {...reg("position")}>
            {POSITIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Eelistatud jalg">
          <select className="builder-select" {...reg("preferredFoot")}>
            <option value="right">Parem</option>
            <option value="left">Vasak</option>
            <option value="both">Mõlemad</option>
          </select>
        </Field>
        <Field label="Särgi number">
          <Input className="builder-input" inputMode="numeric" maxLength={3} {...reg("jerseyNumber")} placeholder="10" />
        </Field>
        <Field label="Rahvus (ISO)">
          <Input className="builder-input" maxLength={3} {...reg("nationality")} placeholder="EE" />
        </Field>
        <Field label="Klubi">
          <Input className="builder-input" {...reg("club")} placeholder="JK SEPPS" />
        </Field>
        <Field label="Sünniaasta">
          <Input className="builder-input" inputMode="numeric" maxLength={4} {...reg("birthYear")} placeholder="2001" />
        </Field>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Toggle
          label="Kapten"
          description="Kuvab kapteni tähise (C) kaardil"
          checked={values.captain}
          onChange={(v) => form.setValue("captain", v, { shouldDirty: true })}
        />
        <Toggle
          label="MVP"
          description="Kuvab MVP-tunnistuse tähise"
          checked={values.mvp}
          onChange={(v) => form.setValue("mvp", v, { shouldDirty: true })}
        />
      </div>
    </div>
  );
}

function Field({
  label,
  full,
  children,
}: {
  label: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <Label className="mb-1.5 block text-xs uppercase tracking-widest text-white/60">
        {label}
      </Label>
      {children}
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-white/20">
      <div>
        <div className="text-sm font-semibold text-white">{label}</div>
        <div className="text-xs text-white/50">{description}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  );
}