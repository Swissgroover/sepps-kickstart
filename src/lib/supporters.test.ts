import { describe, test } from "node:test";
import { deepStrictEqual, strictEqual } from "node:assert";
import { supporters, SUPPORTER_SPEED } from "./supporters";

describe("Supporter management", () => {
  test("supporters retain the requested stable IDs and order", () => {
    deepStrictEqual(supporters.map(({ id }) => id), ["kiveston", "saaremaa-logistika", "connecto", "smuuli-laod", "moia", "tulipunane-ou"]);
  });
  test("removing one ID leaves all other supporters in place", () => {
    deepStrictEqual(supporters.filter(({ id }) => id !== "connecto").map(({ id }) => id), ["kiveston", "saaremaa-logistika", "smuuli-laod", "moia", "tulipunane-ou"]);
  });
  test("the strip moves at 30 pixels per second", () => strictEqual(SUPPORTER_SPEED, 30));
});