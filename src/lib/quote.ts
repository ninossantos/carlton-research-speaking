import { createServerFn } from "@tanstack/react-start";
import { CONTACT_EMAIL, FIRM, PRINCIPAL } from "@/lib/booking";
import { isTalkId, talkById, type TalkId } from "@/lib/talks";

export type QuotePayload = {
  topic: TalkId | "";
  customTopic: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  guests: string;
  date: string;
  time: string;
  secondDate: string;
  secondTime: string;
  notes: string;
};

export type QuoteResult =
  | { ok: true; sent: true }
  | { ok: false; reason: "invalid" | "workspace-pending" | "send-failed" };

function trim(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

export function parseQuote(input: unknown): QuotePayload {
  const d = (input ?? {}) as Record<string, unknown>;
  const topicRaw = trim(d.topic);
  return {
    topic: isTalkId(topicRaw) ? topicRaw : "",
    customTopic: trim(d.customTopic),
    name: trim(d.name),
    title: trim(d.title),
    email: trim(d.email),
    phone: trim(d.phone),
    address: trim(d.address),
    country: trim(d.country),
    guests: trim(d.guests),
    date: trim(d.date),
    time: trim(d.time),
    secondDate: trim(d.secondDate),
    secondTime: trim(d.secondTime),
    notes: trim(d.notes),
  };
}

export function quoteReady(p: QuotePayload) {
  if (!p.topic || !p.name || !p.title || !p.email || !p.phone) return false;
  if (!p.address || !p.country || !p.guests || !p.date || !p.time) return false;
  if (p.topic === "customize" && !p.customTopic) return false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) return false;
  return true;
}

export function quoteLetter(p: QuotePayload) {
  const talk = talkById(p.topic || null);
  const topicLine =
    p.topic === "customize"
      ? p.customTopic || "Insert your topic"
      : talk?.title || "";
  const lines = [
    `Lunch & Learn travel quote request`,
    "",
    `To: ${CONTACT_EMAIL}`,
    `From: ${p.name} <${p.email}>`,
    `Title: ${p.title}`,
    `Phone: ${p.phone}`,
    `Topic: ${topicLine}`,
    `Presentation address: ${p.address}`,
    `Country: ${p.country}`,
    `Approximate guests: ${p.guests}`,
    `Desired date: ${p.date}`,
    `Desired time: ${p.time}`,
    p.secondDate ? `Second date: ${p.secondDate}` : "",
    p.secondTime ? `Second time: ${p.secondTime}` : "",
    p.notes ? `Notes: ${p.notes}` : "",
    "",
    `${PRINCIPAL}`,
    FIRM,
  ].filter(Boolean);
  return lines.join("\n");
}

export const submitQuoteRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => parseQuote(input))
  .handler(async ({ data }): Promise<QuoteResult> => {
    if (!quoteReady(data)) return { ok: false, reason: "invalid" };
    const { sendQuoteEmail } = await import("./quote.server.ts");
    return sendQuoteEmail(data);
  });
