/** TidyCal event URLs. Paste the live links before Grok Bot deploys. */
export const TIDYCAL_REMOTE = "";
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
  remoteFee: `Remote fee: $${REMOTE_FEE.toLocaleString("en-US")}, payable at booking.`,
  remoteCancel: `Cancel at least ${NOTICE_DAYS} days before the date: the $${REMOTE_FEE.toLocaleString("en-US")} returns in full.`,
  remoteChange: `Change the date at least ${NOTICE_DAYS} days before: the hour moves. Inside ${NOTICE_DAYS} days, the fee stays and the date stays.`,
  inPersonFee: `In-person speaking fee: $${IN_PERSON_FEE.toLocaleString("en-US")}, payable at booking.`,
  travel: "Travel is quoted for the city named, from Phoenix, Arizona. Travel is non-refundable. Travel plus the speaking fee must both be paid before the date locks.",
  hold: `In-person holds ${IN_PERSON_HOLD_DAYS} full calendar days: travel plus the hour.`,
  availability: "TidyCal shows in-person availability only. A travel quote follows the city you name. The date locks when both fees clear.",
  notCle: "Not a CLE. A CLE follows the book.",
  notDiagnostic: "Not diagnostic of a pattern of coercive control. Not legal advice.",
  notClinical:
    "Carlton Research does not perform clinical evaluations and does not recommend parenting time.",
} as const;

export function tidyCalOrMailto(kind: "remote" | "in-person", mailto: string) {
  if (kind === "remote" && TIDYCAL_REMOTE) return { href: TIDYCAL_REMOTE, external: true };
  if (kind === "in-person" && TIDYCAL_IN_PERSON) return { href: TIDYCAL_IN_PERSON, external: true };
  return { href: mailto, external: false };
}

export function mailtoHref(subject: string, body: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
