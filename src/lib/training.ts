export const trialPolicy = {
  free: true,
  months: 1,
  limitedGroupPlaces: true,
  admissionDecisionMaker: "trainer",
  admissionDecisionTiming: "after-trial",
} as const;

export const trialBenefit = `Tasuta prooviperiood (${trialPolicy.months === 1 ? "üks kuu" : `${trialPolicy.months} kuud`})`;
export const trialIntroduction = `Uutele liitujatele kehtib tasuta ${trialPolicy.months === 1 ? "ühekuuline" : `${trialPolicy.months}-kuuline`} prooviperiood`;