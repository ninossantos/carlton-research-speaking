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

/** CLE course offering (speaking page). Copy is verbatim from the approved CLE rewrite. */
export const TIDYCAL_CLE_GROUP_5 =
  "https://tidycal.com/mscarisa/mapping-a-pattern-of-coercive-control-private-firm-session-for-a-group-of-5";
export const TIDYCAL_CLE_GROUP_10 =
  "https://tidycal.com/mscarisa/mapping-a-pattern-of-coercive-control-private-firm-session-for-a-group-of-10";

export const CLE = {
  pageTitle: "Mapping a Pattern of Coercive Control | CLE Course | Carlton Research, LLC",
  metaDescription:
    "Mapping a Pattern of Coercive Control, a 120 minute live CLE course on Google Meet for one firm. 2.0 CLE hours. Presented by Carisa Carlton, M.A., Carlton Research, LLC.",
  title: "Mapping a Pattern of Coercive Control",
  presenter: "Carisa Carlton, M.A., Carlton Research, LLC",
  subtitle: "Continuing Legal Education",
  format: "120 minutes live on Google Meet. 2.0 CLE hours. Private firm session.",
  intro:
    "Attorneys learn to identify and document a pattern of coercive control across longitudinal artifacts such as messages, emails, and other time stamped communication records using peer reviewed categories of coercion and a mathematical model of pattern analysis, and then how to present that pattern analysis as expert evidence. Because the session is private, a firm team learns the method together and brings its own questions to a dedicated Q&A period.",
  agendaHeading: "Timed Agenda",
  agendaSubline: "120 minutes: Mapping the Pattern, Expert Evidence, and Questions and Answers.",
  agenda: [
    {
      minutes: "60 minutes",
      title: "Mapping the Pattern",
      line: "Applying the Codebook for Identifying Coercive Control in Longitudinal Artifacts to records to document a pattern of coercive control",
    },
    {
      minutes: "30 minutes",
      title: "Expert Evidence",
      line: "Evaluating and presenting coercive control analysis as expert evidence under Federal Rule 702 and Daubert",
    },
    {
      minutes: "30 minutes",
      title: "Questions and Answers",
      line: "Attorney questions on method, artifacts, and expert evidence",
    },
  ],
  sessionTopicsHeading: "Session Topics",
  sessionTopics: [
    "Define Coercive Control Cleanly",
    "Distinguish coercive control from high conflict: what tactics count",
    "Define Pattern",
    "Coding artifacts with the Codebook for Identifying Coercive Control in Longitudinal Artifacts",
    "Testing Patterns",
    "How Pattern Differs from Anomalies and Clustered Behavior",
    "Challenging Coercive Control Expert Witnesses and their Opinions",
  ],
  receivesHeading: "What Your Firm Receives",
  receivesSubline: "Every session includes",
  receives: [
    "Structured Agenda",
    "Written Course Material & Handout",
    "Remote Attendance (Google Meet)",
    "Attendance Tracking",
    "Evaluation Form",
    "Certificate of Attendance (listing attorney name, bar number, course title, date)",
    "2.0 CLE credits (or more in some jurisdictions)",
  ],
  bookHeading: "Schedule Mapping a Pattern of Coercive Control CLE Course",
  bookIntro: "Book a private session for a group of 5 or a group of 10 attorneys.",
  groups: [
    { label: "Group of 5", price: "$700", sub: "Group Price for up to 5 Attorneys", cta: "Book for 5 Attorneys", href: TIDYCAL_CLE_GROUP_5 },
    { label: "Group of 10", price: "$1,400", sub: "Group Price for up to 10 Attorneys", cta: "Book for 10 Attorneys", href: TIDYCAL_CLE_GROUP_10 },
  ],
  availability: "Currently available as a CLE in Arizona, Connecticut, and New Hampshire.",
  coming: "Coming December 2026: Missouri, Alaska, Hawaii, and New Jersey",
  terms: [
    "Course length: 120 minutes",
    "Credit: 2.0 CLE hours",
    "Fee: $700 per group of 5; $1,400 per group of 10",
    "Payment: payable upon booking",
    "Cancel 14 days or more ahead: full refund.",
    "Change date and time 14 days or more ahead: permitted, no change fees.",
    "Cancellation or change less than 14 days ahead: no refund or change permitted.",
  ],
  azDisclaimer:
    "The State Bar of Arizona does not approve or accredit CLE activities for the Mandatory Continuing Legal Education requirement. This activity may qualify for up to 2.0 hours toward your annual CLE requirement for the State Bar of Arizona, including 0 hour(s) of professional responsibility.",
} as const;

/** YouTube video ID for the CLE course video. Empty = video section hidden. */
export const CLE_VIDEO_YOUTUBE_ID: string = "";
/** Preview-only: show a gray "Course video" placeholder when no ID is set. Keep false in commits. */
export const CLE_VIDEO_PLACEHOLDER: boolean = false;
