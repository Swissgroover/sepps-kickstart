import { z } from "zod";

/** Validates an Estonian personal code (isikukood): length, birth date and check digit. */
export function isValidIsikukood(code: string): boolean {
  if (!/^[1-8]\d{10}$/.test(code)) return false;
  const d = code.split("").map(Number);
  const century = [1800, 1800, 1900, 1900, 2000, 2000, 2100, 2100][d[0] - 1];
  const year = century + d[1] * 10 + d[2];
  const month = d[3] * 10 + d[4];
  const day = d[5] * 10 + d[6];
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    return false;
  }
  const w1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
  const w2 = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3];
  let check = w1.reduce((s, w, i) => s + w * d[i], 0) % 11;
  if (check === 10) {
    check = w2.reduce((s, w, i) => s + w * d[i], 0) % 11;
    if (check === 10) check = 0;
  }
  return check === d[10];
}

const required = (label: string, max: number) =>
  z.string().trim().min(1, `${label} on kohustuslik.`).max(max, `${label} võib olla kuni ${max} märki.`);

const optional = (label: string, max: number) =>
  z.string().trim().max(max, `${label} võib olla kuni ${max} märki.`).optional().default("");

const isikukood = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} on kohustuslik.`)
    .refine((v) => /^\d{11}$/.test(v), `${label} peab olema 11 numbrit.`)
    .refine((v) => !/^\d{11}$/.test(v) || isValidIsikukood(v), `${label} ei ole korrektne.`);

export const TRAINING_GROUPS = ["2014/2015", "2015/2016", "2017", "2019/2020"] as const;

export const registrationSchema = z.object({
  group: z.enum(TRAINING_GROUPS, { message: "Vali treeninggrupp." }),
  childName: required("Lapse nimi", 100),
  childCode: isikukood("Lapse isikukood"),
  parentName: required("Vanema nimi", 100),
  parentCode: isikukood("Vanema isikukood"),
  phone: required("Kontakttelefon", 30).refine(
    (v) => /^\+?[\d\s()-]{6,}$/.test(v) && (v.match(/\d/g)?.length ?? 0) >= 6,
    "Sisesta korrektne telefoninumber.",
  ),
  email: required("Vanema e-post", 255).email("Sisesta korrektne e-posti aadress."),
  address: required("Kodune aadress", 200),
  health: optional("Tervislikud eripärad", 1000),
  experience: optional("Varasem kogemus", 1000),
  notes: optional("Lisainfo", 1000),
  website: z.string().optional().default(""), // honeypot
});

export type RegistrationInput = z.input<typeof registrationSchema>;
export type Registration = z.output<typeof registrationSchema>;
