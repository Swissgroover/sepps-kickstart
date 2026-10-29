// @ts-ignore bun built-in test runner
import { expect, test } from "bun:test";
import { REGISTRATION_MAILTO } from "./registration";

const url = new URL(REGISTRATION_MAILTO);

test("recipient is info@sepps.eu", () => {
  expect(url.pathname).toBe("info@sepps.eu");
});

test("subject is exact", () => {
  expect(url.searchParams.get("subject")).toBe("Lapse registreerimine JK SEPPSi trenni");
});

test("body matches template exactly", () => {
  expect(url.searchParams.get("body")!.replace(/\r\n/g, "\n")).toBe(
    "Tere!\n\nSooviksin registreerida lapse trenni.\n\nLapse nimi:\nLapse isikukood:\nVanema nimi:\nVanema isikukood:\nKontakttelefon:\nKodune aadress:\nTervislikud eripärad:\nVarasem kogemus:\nLisainfo:\n\nTänan!",
  );
});
