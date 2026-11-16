import { describe, test } from "node:test";
import { strictEqual } from "node:assert";
import { trialPolicy } from "./training";

describe("New player trial policy", () => {
  test("the trial is free", () => strictEqual(trialPolicy.free, true));
  test("the trial lasts one month", () => strictEqual(trialPolicy.months, 1));
  test("group places are limited", () => strictEqual(trialPolicy.limitedGroupPlaces, true));
  test("the trainer decides admission", () => strictEqual(trialPolicy.admissionDecisionMaker, "trainer"));
  test("admission is decided after the trial", () => strictEqual(trialPolicy.admissionDecisionTiming, "after-trial"));
});