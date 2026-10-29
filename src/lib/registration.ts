export const REGISTRATION_EMAIL = "info@sepps.eu";
export const REGISTRATION_SUBJECT = "Lapse registreerimine JK SEPPSi trenni";
export const REGISTRATION_FIELDS = [
  "Lapse nimi",
  "Lapse isikukood",
  "Vanema nimi",
  "Vanema isikukood",
  "Kontakttelefon",
  "Kodune aadress",
  "Tervislikud eripärad",
  "Varasem kogemus",
  "Lisainfo",
] as const;

export const REGISTRATION_BODY = [
  "Tere!",
  "",
  "Sooviksin registreerida lapse trenni.",
  "",
  ...REGISTRATION_FIELDS.map((f) => `${f}:`),
  "",
  "Tänan!",
].join("\n");

export const REGISTRATION_MAILTO = `mailto:${REGISTRATION_EMAIL}?subject=${encodeURIComponent(
  REGISTRATION_SUBJECT,
)}&body=${encodeURIComponent(REGISTRATION_BODY.replace(/\n/g, "\r\n"))}`;
