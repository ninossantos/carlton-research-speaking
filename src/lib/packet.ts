import {
  CONTACT_EMAIL,
  FIRM,
  PRINCIPAL,
  TERMS,
} from "@/lib/booking";
import { roleById, talkById, type FormatId, type RoleId, type TalkId } from "@/lib/talks";

export type PacketInput = {
  talkId: TalkId | null;
  role: RoleId | null;
  format: FormatId | null;
  org: string;
  city: string;
  hostName: string;
  hostEmail: string;
  preferredWeek: string;
  questions: string;
};

export function packetReady(input: PacketInput) {
  if (!input.talkId || !input.role || !input.format) return false;
  if (!input.org.trim() || !input.hostName.trim() || !input.hostEmail.trim()) return false;
  if (input.format === "in-person" && !input.city.trim()) return false;
  if (input.talkId === "customize" && !input.questions.trim()) return false;
  return true;
}

export function takeawaysFor(input: PacketInput) {
  const talk = talkById(input.talkId);
  const role = roleById(input.role);
  if (!talk) return [];
  const third = role ? role.lens : talk.takeaways[2];
  return [talk.takeaways[0], talk.takeaways[1], third];
}

export function presentationTitle(input: PacketInput) {
  const talk = talkById(input.talkId);
  if (!talk) return "";
  if (talk.id === "customize") return input.questions.trim();
  return talk.title;
}

export function invitationCopy(input: PacketInput) {
  const talk = talkById(input.talkId);
  const role = roleById(input.role);
  if (!talk || !input.format) return "";

  const org = input.org.trim() || "our office";
  const title =
    presentationTitle(input) || (talk.id === "customize" ? "Insert your topic" : talk.title);
  const where =
    input.format === "remote"
      ? "remote"
      : input.city.trim()
        ? `in person in ${input.city.trim()}`
        : "in person";
  const week = input.preferredWeek.trim();
  const lens = role ? ` Framed for ${role.label.toLowerCase()}.` : "";

  return [
    `Please join a 60-minute Lunch & Learn with ${PRINCIPAL}, ${FIRM}.`,
    `Title: ${title}.`,
    talk.id === "customize" ? "" : talk.promise,
    `Audience: ${role ? role.label.toLowerCase() : "the organization"}. Format: ${where}.${lens}`,
    week ? `Date: ${week}.` : "",
    `Host: ${input.hostName.trim() || "TBD"}, ${org}.`,
    `Questions: ${CONTACT_EMAIL}.`,
  ]
    .filter(Boolean)
    .join(" ");
}

export function packetLetter(input: PacketInput) {
  const talk = talkById(input.talkId);
  const role = roleById(input.role);
  const takes = takeawaysFor(input);
  if (!talk) return "";

  const lines = [
    `To: ${CONTACT_EMAIL}`,
    `From: ${input.hostName.trim() || "[name]"} <${input.hostEmail.trim() || "[email]"}>`,
    `Organization: ${input.org.trim() || "[organization]"}`,
    `Audience: ${role?.label ?? "[audience]"}`,
    `Talk: ${presentationTitle(input) || (input.talkId === "customize" ? "[insert your topic]" : talk.title)}`,
    `Format: ${input.format === "remote" ? "Remote" : "In person"}`,
    input.format === "in-person" ? `City: ${input.city.trim() || "[city]"}` : "City: n/a (remote)",
    `Date and time: ${input.preferredWeek.trim() || "[date and time]"}`,
    "",
    TERMS.duration,
    input.format === "remote" ? TERMS.remoteFee : TERMS.inPersonFee,
    ...(input.format === "remote" ? TERMS.remotePoints : TERMS.inPersonPoints),
    TERMS.geoPrice,
    "",
    "Takeaways for this topic:",
    ...takes.map((t, i) => `${i + 1}. ${t}`),
    "",
    TERMS.notCle,
    TERMS.notDiagnostic,
  ].filter((line): line is string => line !== null);
  return lines.join("\n");
}

export function mailtoFor(input: PacketInput) {
  const talk = talkById(input.talkId);
  const subject = talk
    ? `Lunch & Learn request: ${presentationTitle(input) || talk.short}`
    : "Lunch & Learn request";
  return {
    subject,
    body: packetLetter(input),
  };
}
