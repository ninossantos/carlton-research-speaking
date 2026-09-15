import nodemailer from "nodemailer";
import { CONTACT_EMAIL, FIRM } from "@/lib/booking";
import { env } from "@/lib/env.server";
import { quoteLetter, type QuotePayload, type QuoteResult } from "@/lib/quote";

export function quoteMailConfigured() {
  return Boolean(env("QUOTE_SMTP_USER") && env("QUOTE_SMTP_PASS"));
}

export async function sendQuoteEmail(data: QuotePayload): Promise<QuoteResult> {
  if (!quoteMailConfigured()) return { ok: false, reason: "workspace-pending" };

  const host = env("QUOTE_SMTP_HOST") || "smtp.gmail.com";
  const port = Number(env("QUOTE_SMTP_PORT") || "465");
  const user = env("QUOTE_SMTP_USER")!;
  const pass = env("QUOTE_SMTP_PASS")!;
  const to = env("QUOTE_TO") || CONTACT_EMAIL;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `${FIRM} <${user}>`,
      to,
      replyTo: `${data.name} <${data.email}>`,
      subject: `Travel quote request: ${data.name}`,
      text: quoteLetter(data),
    });
    return { ok: true, sent: true };
  } catch {
    return { ok: false, reason: "send-failed" };
  }
}
