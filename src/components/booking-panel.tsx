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
  const inPerson = tidyCalOrMailto("in-person", mailtoHref(mail.subject, mail.body));
  const quote = mailtoHref(
    mail.subject.replace("request", "travel quote"),
    mail.body,
  );

  return (
    <section
      id="book"
      className="rounded-[var(--radius-lg)] border border-border bg-ink px-5 py-8 text-surface sm:px-8"
    >
      <h2 className="font-display text-3xl uppercase tracking-[0.06em] text-surface">Book the Presentation</h2>
      <p className="mt-3 max-w-2xl text-sm text-gold-soft">{TERMS.duration}</p>

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
            <p className="mt-3 text-xs text-faint">Switch the format above to remote to use this door.</p>
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
          <div className="mt-6 flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full border-gold text-surface hover:bg-surface hover:text-ink"
              disabled={!ready || input.format !== "in-person"}
              asChild={ready && input.format === "in-person"}
            >
              {ready && input.format === "in-person" ? (
                <a
                  href={inPerson.href}
                  target={inPerson.external ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  Check two-day availability
                </a>
              ) : (
                <span>Check two-day availability</span>
              )}
            </Button>
            <Button
              variant="primary"
              className="w-full"
              disabled={!ready || input.format !== "in-person"}
              asChild={ready && input.format === "in-person"}
            >
              {ready && input.format === "in-person" ? (
                <a href={quote}>Send packet for travel quote</a>
              ) : (
                <span>Send packet for travel quote</span>
              )}
            </Button>
          </div>
        </div>
      </div>

      <p className="mt-6 max-w-3xl text-sm text-gold-soft">{TERMS.geoPrice}</p>

      {!ready ? (
        <p className="mt-6 text-sm text-gold-soft">
          Finish the details above. The booking doors open when the packet is complete.
        </p>
      ) : null}
    </section>
  );
}
