import { CONTACT_EMAIL, FIRM } from "@/lib/booking";
import { env } from "@/lib/env.server";
import { quoteLetter, type QuotePayload, type QuoteResult } from "@/lib/quote";

const GMAIL_TOKEN = "https://oauth2.googleapis.com/token";
const GMAIL_SEND = "https://gmail.googleapis.com/gmail/v1/users/me/messages/send";

export function mailFrom() {
  return env("MAIL_FROM") || CONTACT_EMAIL;
}

export function quoteMailConfigured() {
  if ((env("MAIL_AUTH") || "google_oauth") !== "google_oauth") return false;
  return Boolean(
    env("GOOGLE_OAUTH_CLIENT_ID") &&
      env("GOOGLE_OAUTH_CLIENT_SECRET") &&
      env("GOOGLE_OAUTH_REFRESH_TOKEN") &&
      mailFrom(),
  );
}

function headerValue(value: string) {
  if (/^[\x20-\x7E]*$/.test(value)) return value;
  return `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

function rfc822(data: QuotePayload) {
  const from = `${FIRM} <${mailFrom()}>`;
  const to = env("QUOTE_TO") || CONTACT_EMAIL;
  const subject = `Travel quote request: ${data.name}`;
  const lines = [
    `From: ${from}`,
    `To: ${to}`,
    `Reply-To: ${headerValue(data.name)} <${data.email}>`,
    `Subject: ${headerValue(subject)}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "",
    quoteLetter(data),
  ];
  return lines.join("\r\n");
}

function rawMessage(data: QuotePayload) {
  return Buffer.from(rfc822(data), "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

async function accessToken() {
  const body = new URLSearchParams({
    client_id: env("GOOGLE_OAUTH_CLIENT_ID")!,
    client_secret: env("GOOGLE_OAUTH_CLIENT_SECRET")!,
    refresh_token: env("GOOGLE_OAUTH_REFRESH_TOKEN")!,
    grant_type: "refresh_token",
  });
  const res = await fetch(GMAIL_TOKEN, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { access_token?: string };
  return json.access_token || null;
}

export async function sendQuoteEmail(data: QuotePayload): Promise<QuoteResult> {
  if (!quoteMailConfigured()) return { ok: false, reason: "workspace-pending" };

  try {
    const token = await accessToken();
    if (!token) return { ok: false, reason: "send-failed" };
    const res = await fetch(GMAIL_SEND, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: rawMessage(data) }),
    });
    if (!res.ok) return { ok: false, reason: "send-failed" };
    return { ok: true, sent: true };
  } catch {
    return { ok: false, reason: "send-failed" };
  }
}
