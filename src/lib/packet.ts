import {
  CONTACT_EMAIL,
  FIRM,
  IN_PERSON_FEE,
  IN_PERSON_HOLD_DAYS,
  NOTICE_DAYS,
  PRINCIPAL,
  REMOTE_FEE,
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

export function inviteBlurb(input: PacketInput) {
  const talk = talkById(input.talkId);
  const role = roleById(input.role);
  if (!talk || !input.format) return "";

  const org = input.org.trim() || "our office";
  const where =
    input.format === "remote"
      ? "remote"
      : input.city.trim()
        ? `in person in ${input.city.trim()}`
        : "in person";
  const fee =
    input.format === "remote"
      ? `$${REMOTE_FEE.toLocaleString("en-US")}`
      : `$${IN_PERSON_FEE.toLocaleString("en-US")} plus travel`;
  const hold =
    input.format === "in-person"
      ? ` The calendar holds ${IN_PERSON_HOLD_DAYS} full days.`
      : "";
  const week = input.preferredWeek.trim()
    ? ` Preferred window: ${input.preferredWeek.trim()}.`
    : "";
  const lens = role ? ` Framed for a ${role.label.toLowerCase()}.` : "";

  return [
    `Please join a 60-minute lunch-and-learn with ${PRINCIPAL}, ${FIRM}.`,
    `Title: ${talk.title}.`,
    talk.promise,
    `Format: ${where}. Fee: ${fee}, payable at booking.${hold}${week}${lens}`,
    `Host: ${input.hostName.trim() || "TBD"}, ${org}.`,
    `Questions: ${CONTACT_EMAIL}.`,
  ].join(" ");
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
    `Who attends: ${role?.label ?? "[role]"}`,
    `Talk: ${talk.title}`,
    input.talkId === "customize"
      ? `Questions for the hour: ${input.questions.trim() || "[questions]"}`
      : null,
    `Format: ${input.format === "remote" ? "Remote" : "In person"}`,
    input.format === "in-person" ? `City: ${input.city.trim() || "[city]"}` : "City: n/a (remote)",
    `Preferred window: ${input.preferredWeek.trim() || "[week]"}`,
    "",
    TERMS.duration,
    input.format === "remote" ? TERMS.remoteFee : TERMS.inPersonFee,
    input.format === "remote" ? TERMS.remoteCancel : TERMS.travel,
    input.format === "in-person" ? TERMS.hold : TERMS.remoteChange,
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
    ? `Lunch & Learn request: ${talk.short}`
    : "Lunch & Learn request";
  return {
    subject,
    body: packetLetter(input),
  };
}
