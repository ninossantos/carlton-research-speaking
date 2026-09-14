import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CONTACT_EMAIL,
  FIRM,
  IN_PERSON_FEE,
  PRINCIPAL,
  REMOTE_FEE,
  TERMS,
} from "@/lib/booking";
import { inviteBlurb, packetReady, takeawaysFor, type PacketInput } from "@/lib/packet";
import { roleById, talkById } from "@/lib/talks";

export function OneSheet({ input }: { input: PacketInput }) {
  const talk = talkById(input.talkId);
  const role = roleById(input.role);
  const ready = packetReady(input);
  const takes = takeawaysFor(input);
  const blurb = inviteBlurb(input);
  const [copied, setCopied] = useState(false);

  if (!talk) {
    return (
      <p className="text-muted">Pick a room. The one-sheet writes itself from that hour.</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        id="one-sheet"
        className="rounded-[var(--radius-lg)] border border-border bg-surface-2 p-6 shadow-[var(--shadow-border)] sm:p-8"
      >
        <p className="text-center font-display text-xs uppercase tracking-[0.14em] text-gold">
          {FIRM}
        </p>
        <h2 className="mt-3 text-center font-display text-2xl uppercase tracking-[0.06em] text-ink">
          Lunch & Learn
        </h2>
        <p className="mt-2 text-center text-sm text-muted">{PRINCIPAL}</p>
        <div className="mx-auto mt-4 h-px w-24 bg-gold" />

        <h3 className="mt-6 text-lg text-fg">{talk.title}</h3>
        <p className="mt-2 text-fg">{talk.promise}</p>
        <p className="mt-3 text-sm text-muted">{TERMS.duration}</p>

        <p className="mt-6 text-sm font-bold text-ink">Takeaways</p>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-fg">
          {takes.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>

        <table className="mt-6 w-full text-sm">
          <caption className="mb-0 caption-top text-left font-display text-sm text-gold">
            The Hour
          </caption>
          <tbody>
            <Row k="Room" v={role ? role.label : "Name the role in the architect"} />
            <Row
              k="Format"
              v={
                input.format === "remote"
                  ? "Remote"
                  : input.format === "in-person"
                    ? `In person${input.city.trim() ? ` · ${input.city.trim()}` : ""}`
                    : "Remote or in person"
              }
            />
            <Row
              k="Fee"
              v={
                input.format === "remote"
                  ? `$${REMOTE_FEE.toLocaleString("en-US")}, payable at booking`
                  : input.format === "in-person"
                    ? `$${IN_PERSON_FEE.toLocaleString("en-US")} plus travel, both due to lock the date`
                    : "Remote $750 · In person $1,500 plus travel"
              }
            />
            <Row k="Organization" v={input.org.trim() || "—"} />
            <Row k="Host" v={input.hostName.trim() || "—"} />
            <Row k="Window" v={input.preferredWeek.trim() || "—"} />
          </tbody>
        </table>

        <p className="mt-6 text-sm text-muted">
          {TERMS.notCle} {TERMS.notDiagnostic}
        </p>
        <p className="mt-2 text-sm text-muted">{CONTACT_EMAIL}</p>
      </div>

      <div className="no-print flex flex-wrap gap-3">
        <Button
          variant="outline"
          disabled={!ready}
          onClick={() => window.print()}
        >
          Print the one-sheet
        </Button>
        <Button
          variant="ghost"
          disabled={!blurb}
          onClick={async () => {
            await navigator.clipboard.writeText(blurb);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
          }}
        >
          {copied ? "Blurb copied" : "Copy the invite blurb"}
        </Button>
      </div>

      {blurb ? (
        <blockquote className="no-print border-l-2 border-gold pl-4 text-sm text-muted">
          {blurb}
        </blockquote>
      ) : (
        <p className="no-print text-sm text-muted">
          Finish the architect: role, format, organization, name, and email
          {input.format === "in-person" ? ", plus city" : ""}.
        </p>
      )}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <tr className="odd:bg-surface even:bg-surface-2">
      <th className="w-36 bg-ink px-3 py-2 text-left text-xs font-semibold text-surface">{k}</th>
      <td className="px-3 py-2 text-fg">{v}</td>
    </tr>
  );
}
