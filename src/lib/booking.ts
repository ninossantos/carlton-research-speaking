/** TidyCal event URLs. Remote is live. In-person stays empty: public path is /quote. */
export const TIDYCAL_REMOTE = "https://tidycal.com/mscarisa/lunch-and-learn";
export const TIDYCAL_IN_PERSON = "";

export const CONTACT_EMAIL = "carisa@carltonresearch.com";
export const FIRM = "Carlton Research, LLC";
export const PRINCIPAL = "Carisa Carlton, M.A.";
export const ORIGIN = "https://speaking.carltonresearch.com";
export const FIRM_ORIGIN = "https://carltonresearch.com";

export const REMOTE_FEE = 750;
export const IN_PERSON_FEE = 1500;
export const NOTICE_DAYS = 14;
export const IN_PERSON_HOLD_DAYS = 2;

export const TERMS = {
  duration: "The lunch-and-learn runs 60 minutes: presentation plus questions.",
  presentationLength: "Lunch & Learn runs 60 minutes: presentation plus questions.",
  remoteFee: `Remote presentation fee: $${REMOTE_FEE.toLocaleString("en-US")}.`,
  remotePoints: [
    "Payable upon booking.",
    `Cancel ${NOTICE_DAYS} days ahead: full refund.`,
    `Change date and time ${NOTICE_DAYS} days ahead: permitted, no change fees.`,
    `Cancellation or change less than ${NOTICE_DAYS} days ahead: no refund or change permitted.`,
  ],
  inPersonFee: `In-person speaking fee: $${IN_PERSON_FEE.toLocaleString("en-US")} plus travel expenses.`,
  inPersonPoints: [
    "Travel fees quoted for the presentation location. Travel fees paid upon booking are non-refundable.",
    `Speaking fee is refundable if canceled ${NOTICE_DAYS} days in advance.`,
    "Calendar shows availability only; payment confirms the date.",
  ],
  hold: "Two days are held to accommodate travel: the day of the presentation plus one day before for travel.",
  travel:
    "Travel fees quoted for the presentation location. Travel fees paid upon booking are non-refundable.",
  remoteGeo: "Published prices apply to remote presentations regardless of location.",
  inPersonGeo: "Outside the USA, ask for in-person presentation rates.",
  geoPrice:
    "Published prices apply to remote presentations regardless of location. Outside the USA, ask for in-person presentation rates.",
  notCle: "Not a CLE.",
  notLegal: "Not legal advice.",
  notDiagnostic: "Not diagnostic of a pattern of coercive control. Not legal advice.",
  notClinical:
    "Carlton Research does not perform clinical evaluations and does not recommend parenting time.",
  lines: [
    "The lunch-and-learn runs 60 minutes: presentation plus questions.",
    `Remote presentation fee: $${REMOTE_FEE.toLocaleString("en-US")}.`,
    `In-person speaking fee: $${IN_PERSON_FEE.toLocaleString("en-US")} plus travel expenses.`,
    "Payable upon booking.",
    `Cancel ${NOTICE_DAYS} days ahead: full refund.`,
    `Change date and time ${NOTICE_DAYS} days ahead: permitted, no change fees.`,
    `Cancellation or change less than ${NOTICE_DAYS} days ahead: no refund or change permitted.`,
    "Travel fees quoted for the presentation location. Travel fees paid upon booking are non-refundable.",
    "Published prices apply to remote presentations regardless of location.",
    "Outside the USA, ask for in-person presentation rates.",
    "Not a CLE.",
  ],
} as const;

export function tidyCalOrMailto(kind: "remote" | "in-person", mailto: string) {
  if (kind === "remote" && TIDYCAL_REMOTE) return { href: TIDYCAL_REMOTE, external: true };
  if (kind === "in-person" && TIDYCAL_IN_PERSON) return { href: TIDYCAL_IN_PERSON, external: true };
  return { href: mailto, external: false };
}

export function mailtoHref(subject: string, body: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
