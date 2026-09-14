export type TalkId = "high-conflict" | "map-pattern" | "incident-vs-pattern";
export type RoleId = "attorney" | "judge" | "office-manager" | "hr";
export type FormatId = "remote" | "in-person";

export type Prong = {
  id: "repetition" | "relatedness" | "continuity" | "asymmetry";
  label: string;
  line: string;
};

export type Beat = {
  at: number;
  line: string;
  prongs: [boolean, boolean, boolean, boolean];
  visual: "split" | "stack" | "flash" | "lock";
};

export type Talk = {
  id: TalkId;
  title: string;
  short: string;
  promise: string;
  takeaways: [string, string, string];
  opening: Beat[];
  artifacts: string[];
};

export const PRONGS: Prong[] = [
  {
    id: "repetition",
    label: "Repetition",
    line: "The conduct returns. Once is not a pattern.",
  },
  {
    id: "relatedness",
    label: "Relatedness",
    line: "The acts belong to one course, not a pile of unrelated fights.",
  },
  {
    id: "continuity",
    label: "Continuity",
    line: "The course holds across time. Calibrate to the record.",
  },
  {
    id: "asymmetry",
    label: "Asymmetry",
    line: "One party organizes the field. Mutual combat does not qualify.",
  },
];

export const ROLES: { id: RoleId; label: string; lens: string }[] = [
  {
    id: "attorney",
    label: "Attorney",
    lens: "What a file can prove, and what a file cannot.",
  },
  {
    id: "judge",
    label: "Judge",
    lens: "A testable pattern, not a story of conflict.",
  },
  {
    id: "office-manager",
    label: "Office Manager",
    lens: "What to keep, what to date-stamp, what not to characterize.",
  },
  {
    id: "hr",
    label: "Human Resources",
    lens: "Personnel files often already hold the sequence. Incident reports miss a course of conduct.",
  },
];

export const TALKS: Talk[] = [
  {
    id: "high-conflict",
    title: "Distinguish High Conflict from Coercive Control",
    short: "High Conflict from Coercive Control",
    promise: "Conflict makes noise. Coercive control organizes a field. The hour teaches the difference.",
    takeaways: [
      "Conflict is not evidence of coercive control.",
      "High conflict can be loud, mutual, and still fail every prong of a pattern.",
      "A pattern requires repetition, relatedness, continuity, and asymmetry. Fail one prong, and the pattern fails.",
    ],
    artifacts: ["Raised voices", "Mutual filings", "One-sided schedule", "Locked accounts"],
    opening: [
      { at: 0, line: "High conflict fights.", prongs: [false, false, false, false], visual: "split" },
      { at: 2800, line: "Coercive control organizes.", prongs: [false, false, false, false], visual: "split" },
      { at: 5600, line: "The difference is not volume.", prongs: [false, false, false, false], visual: "split" },
      { at: 8400, line: "The difference is pattern.", prongs: [false, false, false, false], visual: "split" },
      { at: 11200, line: "Repetition: the conduct returns.", prongs: [true, false, false, false], visual: "lock" },
      { at: 14000, line: "Relatedness: the acts belong to one course.", prongs: [true, true, false, false], visual: "lock" },
      { at: 16800, line: "Continuity: the course holds across time.", prongs: [true, true, true, false], visual: "lock" },
      { at: 19600, line: "Asymmetry: one party organizes the field.", prongs: [true, true, true, true], visual: "lock" },
      {
        at: 23000,
        line: "Mutual combat can be ugly and still fail the test.",
        prongs: [true, true, true, true],
        visual: "lock",
      },
    ],
  },
  {
    id: "map-pattern",
    title: "How to Map a Pattern of Coercive Control",
    short: "How to Map a Pattern",
    promise: "A file is a sequence. The hour shows how to read it without turning conflict into a pattern.",
    takeaways: [
      "Read texts, email, location logs, financial controls, and litigation history in sequence.",
      "Isolated or clustered behaviors do not establish a pattern.",
      "A pattern must meet four prongs: repetition, relatedness, continuity, and asymmetry. Findings map to peer-reviewed literature.",
    ],
    artifacts: ["Texts", "Email", "Location logs", "Financial controls", "Filings"],
    opening: [
      { at: 0, line: "A file is a sequence.", prongs: [false, false, false, false], visual: "stack" },
      { at: 2600, line: "Texts.", prongs: [false, false, false, false], visual: "stack" },
      { at: 4200, line: "Email.", prongs: [false, false, false, false], visual: "stack" },
      { at: 5800, line: "Location.", prongs: [false, false, false, false], visual: "stack" },
      { at: 7400, line: "Money.", prongs: [false, false, false, false], visual: "stack" },
      { at: 9000, line: "Filings.", prongs: [false, false, false, false], visual: "stack" },
      { at: 11200, line: "Repetition, calibrated to the record.", prongs: [true, false, false, false], visual: "lock" },
      { at: 14000, line: "Relatedness: one course, not a pile.", prongs: [true, true, false, false], visual: "lock" },
      { at: 16800, line: "Continuity across the corpus.", prongs: [true, true, true, false], visual: "lock" },
      { at: 19600, line: "Asymmetry, or the pattern fails.", prongs: [true, true, true, true], visual: "lock" },
      {
        at: 23000,
        line: "Fail one prong, and you do not have a pattern.",
        prongs: [true, true, true, true],
        visual: "lock",
      },
    ],
  },
  {
    id: "incident-vs-pattern",
    title: "Incident-Model vs Pattern-Model of Coercive Control",
    short: "Incident-Model vs Pattern-Model",
    promise: "An incident asks what happened that day. A pattern asks what held across days.",
    takeaways: [
      "The incident model looks for a discrete event, often a visible injury, often a single day.",
      "The pattern model tests a course of conduct: repetition, relatedness, continuity, and asymmetry.",
      "Family-law files and workplace files both default to the day. Coercive control lives in the course.",
    ],
    artifacts: ["One day", "One report", "The course", "The corpus"],
    opening: [
      { at: 0, line: "An incident asks what happened that day.", prongs: [false, false, false, false], visual: "flash" },
      { at: 3200, line: "A bruise. A shouting match. A write-up.", prongs: [false, false, false, false], visual: "flash" },
      { at: 6400, line: "A pattern asks what held across days.", prongs: [false, false, false, false], visual: "stack" },
      { at: 9600, line: "Courts default to the day. So does HR.", prongs: [false, false, false, false], visual: "split" },
      { at: 12800, line: "Repetition never fits an incident frame.", prongs: [true, false, false, false], visual: "lock" },
      { at: 15600, line: "Relatedness needs more than one act.", prongs: [true, true, false, false], visual: "lock" },
      { at: 18400, line: "Continuity is a temporal test.", prongs: [true, true, true, false], visual: "lock" },
      { at: 21200, line: "Asymmetry is the last gate.", prongs: [true, true, true, true], visual: "lock" },
      {
        at: 24400,
        line: "Change the model, and the record changes what it can show.",
        prongs: [true, true, true, true],
        visual: "lock",
      },
    ],
  },
];

export function talkById(id: TalkId | null) {
  return TALKS.find((t) => t.id === id) ?? null;
}

export function roleById(id: RoleId | null) {
  return ROLES.find((r) => r.id === id) ?? null;
}

export function titleCasePreserve(title: string) {
  return title;
}
