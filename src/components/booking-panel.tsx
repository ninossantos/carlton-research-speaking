import { Button } from "@/components/ui/button";
import {
  IN_PERSON_FEE,
  REMOTE_FEE,
  TERMS,
  mailtoHref,
  tidyCalOrMailto,
} from "@/lib/booking";
import { mailtoFor, packetReady, type PacketInput } from "@/lib/packet";

export function BookingPanel({ input }: { input: PacketInput }) {
  const ready = packetReady(input);
  const mail = mailtoFor(input);
  const remote = tidyCalOrMailto("remote", mailtoHref(mail.subject, mail.body));
  const quoteParams = new URLSearchParams();
  if (input.talkId) quoteParams.set("topic", input.talkId);
  if (input.hostName.trim()) quoteParams.set("name", input.hostName.trim());
  if (input.hostEmail.trim()) quoteParams.set("email", input.hostEmail.trim());
  if (input.city.trim()) quoteParams.set("address", input.city.trim());
  const quoteHref = quoteParams.size ? `/quote?${quoteParams.toString()}` : "/quote";

  return (
    <section
      id="book"
      className="rounded-[var(--radius-lg)] border border-border bg-ink px-5 py-8 text-surface sm:px-8"
    >
      <h2 className="font-display text-3xl uppercase tracking-[0.06em] text-surface">Book the Presentation</h2>
      <p className="mt-3 max-w-2xl text-sm text-gold-soft">{TERMS.presentationLength}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[var(--radius-md)] border border-faint/30 bg-fg p-5">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-gold">Remote</p>
          <p className="mt-2 font-display text-3xl text-surface">
            ${REMOTE_FEE.toLocaleString("en-US")}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gold-soft">
            {TERMS.remotePoints.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <Button
            className="mt-6 w-full"
            variant="primary"
            disabled={!ready || input.format === "in-person"}
            asChild={ready && input.format !== "in-person"}
          >
            {ready && input.format !== "in-person" ? (
              <a href={remote.href} target={remote.external ? "_blank" : undefined} rel="noreferrer">
                Book remote
              </a>
            ) : (
              <span>Book remote</span>
            )}
          </Button>
          {input.format === "in-person" ? (
            <p className="mt-3 text-xs text-faint">Switch the format above to remote to use this option.</p>
          ) : null}
        </div>

        <div className="rounded-[var(--radius-md)] border border-faint/30 bg-fg p-5">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-gold">In Person</p>
          <p className="mt-2 font-display text-3xl text-surface">
            ${IN_PERSON_FEE.toLocaleString("en-US")}
            <span className="ml-2 font-sans text-base font-semibold text-gold-soft">
              plus travel expenses
            </span>
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gold-soft">
            {TERMS.inPersonPoints.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <div className="mt-6">
            <Button variant="primary" className="w-full" asChild>
              <a href={quoteHref}>Request a travel quote</a>
            </Button>
          </div>
        </div>
      </div>

      <p className="mt-6 max-w-3xl text-sm text-gold-soft">{TERMS.geoPrice}</p>
    </section>
  );
}
