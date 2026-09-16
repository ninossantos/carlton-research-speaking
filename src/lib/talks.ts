export type TalkId = "high-conflict" | "map-pattern" | "incident-vs-pattern" | "customize";
export type RoleId = "attorney" | "judge" | "evaluator" | "treatment-provider";
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
    line: "The conduct persists. Twice is not a pattern.",
  },
  {
    id: "relatedness",
    label: "Relatedness",
    line: "The tactics share a goal: psychological domination and control.",
  },
  {
    id: "continuity",
    label: "Continuity",
    line: "The course of conduct holds across time.",
  },
  {
    id: "asymmetry",
    label: "Asymmetry",
    line: "One party dominates in volume and range of tactics.",
  },
];

export const ROLES: { id: RoleId; label: string; lens: string }[] = [
  {
    id: "attorney",
    label: "Attorneys",
    lens: "What a file can prove.",
  },
  {
    id: "judge",
    label: "Judges",
    lens: "A testable pattern, not a story of conflict.",
  },
  {
    id: "evaluator",
    label: "Evaluators",
    lens: "The evaluation must test a course of conduct, not a single incident.",
  },
  {
    id: "treatment-provider",
    label: "Treatment Providers",
    lens: "The treatment file must track a course of conduct, not a single incident.",
  },
];

export const TALKS: Talk[] = [
  {
    id: "high-conflict",
    title: "Distinguish High Conflict from Coercive Control",
    short: "High Conflict from Coercive Control",
    promise:
      "Conflict is episodic and bilateral. Coercive control is directional and cumulative. The presentation teaches how to distinguish them.",
    takeaways: [
      "Conflict is not evidence of coercive control.",
      "How to read elements of coercion in communication records.",
      "A pattern requires repetition, relatedness, continuity, and asymmetry. Fail one prong, and the pattern fails.",
    ],
    artifacts: ["Raised voices", "Mutual filings", "One-sided schedule", "Locked accounts"],
    opening: [
      { at: 0, line: "The difference between conflict and coercion.", prongs: [false, false, false, false], visual: "split" },
      { at: 2800, line: "Elements of coercion.", prongs: [false, false, false, false], visual: "split" },
      { at: 5600, line: "Repetition: the conduct returns.", prongs: [true, false, false, false], visual: "lock" },
      { at: 8400, line: "Relatedness: the acts share one goal.", prongs: [true, true, false, false], visual: "lock" },
      { at: 11200, line: "Continuity: the course holds across time.", prongs: [true, true, true, false], visual: "lock" },
      { at: 14000, line: "Asymmetry: bilateral element is missing.", prongs: [true, true, true, true], visual: "lock" },
      {
        at: 17400,
        line: "Combat can be ugly and still fail the test.",
        prongs: [true, true, true, true],
        visual: "lock",
      },
    ],
  },
  {
    id: "map-pattern",
    title: "Mapping a Pattern of Coercive Control",
    short: "Mapping a Pattern of Coercive Control",
    promise: "How to map repetition, relatedness, continuity, and asymmetry to form a pattern or disprove a pattern.",
    takeaways: [
      "A pattern must meet four prongs: repetition, relatedness, continuity, and asymmetry.",
      "How to establish repetition and continuity.",
      "How to evidence the difference between anomalies, clusters, and patterns.",
    ],
    artifacts: ["Texts", "Email", "Location logs", "Financial controls", "Filings"],
    opening: [
      {
        at: 0,
        line: "Repetition: clustered around a stressful event or repetition over time.",
        prongs: [true, false, false, false],
        visual: "lock",
      },
      { at: 3200, line: "Relatedness: one course, not a pile.", prongs: [true, true, false, false], visual: "lock" },
      { at: 6000, line: "Continuity across a corpus.", prongs: [true, true, true, false], visual: "lock" },
      { at: 8800, line: "Asymmetry, or the pattern fails.", prongs: [true, true, true, true], visual: "lock" },
      {
        at: 12200,
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
    promise: "The incident model asks what happened today. A pattern model asks what has been happening all along.",
    takeaways: [
      "The incident model looks for a discrete event, often a visible injury, often a single day.",
      "Building a case of nuances.",
      "The pattern model tests a course of conduct: repetition, relatedness, continuity, and asymmetry.",
    ],
    artifacts: ["One day", "One report", "The course", "The corpus"],
    opening: [
      { at: 0, line: "An incident asks what happened that day.", prongs: [false, false, false, false], visual: "flash" },
      { at: 3200, line: "A bruise. A shouting match. A write-up.", prongs: [false, false, false, false], visual: "flash" },
      {
        at: 6400,
        line: "A pattern asks what has been happening all along.",
        prongs: [false, false, false, false],
        visual: "lock",
      },
      { at: 9600, line: "Courts default to an incident.", prongs: [false, false, false, false], visual: "lock" },
      {
        at: 12800,
        line: "Repetition: coercive control never fits an incident frame.",
        prongs: [true, false, false, false],
        visual: "lock",
      },
      { at: 15600, line: "How coercive tactics are related", prongs: [true, true, false, false], visual: "lock" },
      { at: 18400, line: "Continuity is a temporal test.", prongs: [true, true, true, false], visual: "lock" },
      { at: 21200, line: "Asymmetry is the last gate.", prongs: [true, true, true, true], visual: "lock" },
      {
        at: 24400,
        line: "Change the model, and the evidence changes.",
        prongs: [true, true, true, true],
        visual: "lock",
      },
    ],
  },
  {
    id: "customize",
    title: "Customize Your Coercive Control Presentation",
    short: "Customize Your Coercive Control Presentation",
    promise: "Contact us with questions you would like answered at your Lunch & Learn.",
    takeaways: [
      "Name the questions this presentation must answer.",
      "The presentation stays sixty minutes: presentation plus questions.",
      "Customized for your needs.",
    ],
    artifacts: ["Your questions", "Your file", "Your audience", "The presentation"],
    opening: [
      { at: 0, line: "Bring the questions.", prongs: [false, false, false, false], visual: "lock" },
      { at: 2800, line: "Name the topic.", prongs: [false, false, false, false], visual: "lock" },
      {
        at: 5600,
        line: "Sixty minutes. Presentation plus questions.",
        prongs: [false, false, false, false],
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

export function isTalkId(v: unknown): v is TalkId {
  return TALKS.some((t) => t.id === v);
}

export function isRoleId(v: unknown): v is RoleId {
  return ROLES.some((r) => r.id === v);
}

export function isFormatId(v: unknown): v is FormatId {
  return v === "remote" || v === "in-person";
}
