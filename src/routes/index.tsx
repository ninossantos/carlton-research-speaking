import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RoomPicker } from "@/components/room-picker";
import { KineticOpening } from "@/components/kinetic-opening";
import { BookingIntake } from "@/components/invite-architect";
import { BookingPanel } from "@/components/booking-panel";
import { hydrateBriefing, useBriefing } from "@/lib/store";
import { TERMS } from "@/lib/booking";
import { PRONGS, isTalkId, talkById, type TalkId } from "@/lib/talks";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    topic: isTalkId(search.topic)
      ? search.topic
      : isTalkId(search.room)
        ? search.room
        : undefined,
  }),
  component: Home,
});

function Home() {
  const { topic } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  const briefing = useBriefing();
  const talk = talkById(briefing.talkId);

  useEffect(() => {
    hydrateBriefing();
  }, []);

  useEffect(() => {
    if (topic) useBriefing.getState().setTalk(topic);
  }, [topic]);

  function pickTopic(id: TalkId) {
    briefing.setTalk(id);
    void navigate({ search: { topic: id } });
    window.setTimeout(() => {
      document.getElementById("briefing")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  const packet = {
    talkId: briefing.talkId,
    role: briefing.role,
    format: briefing.format,
    org: briefing.org,
    city: briefing.city,
    hostName: briefing.hostName,
    hostEmail: briefing.hostEmail,
    preferredWeek: briefing.preferredWeek,
    questions: briefing.questions,
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <SiteHeader />
      <main id="main" className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-5 py-12 sm:px-8 sm:py-16">
        <section className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">Schedule a Presentation</p>
          <h1 className="mt-4 font-display text-4xl uppercase tracking-wider text-ink sm:text-5xl md:text-6xl">
            Lunch & Learn
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-fg">Carisa Carlton, M.A.</p>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-fg">
            Sixty minutes: presentation plus questions.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
            For attorneys, judges, evaluators, and treatment providers.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted">Remote or in person. Not a CLE.</p>
        </section>

        <section aria-labelledby="topics-heading">
          <h2 id="topics-heading" className="text-2xl">
            Pick a Topic
          </h2>
          <p className="mt-2 max-w-2xl text-muted">Then build the engagement for your audience.</p>
          <div className="mt-6">
            <RoomPicker value={briefing.talkId} onChange={pickTopic} />
          </div>
        </section>

        {talk ? (
          <section id="briefing" className="flex flex-col gap-10">
            <KineticOpening talk={talk} />

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2 className="text-2xl">What the Hour Leaves</h2>
                <ol className="mt-4 list-decimal space-y-3 pl-5 text-fg">
                  {talk.takeaways.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
                <p className="mt-6 text-sm text-muted">{TERMS.duration}</p>
              </div>
              <aside className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
                <h3 className="text-base not-italic">Four prongs. A pattern needs all four.</h3>
                <ul className="mt-4 space-y-3">
                  {PRONGS.map((p) => (
                    <li key={p.id}>
                      <p className="font-semibold text-ink">{p.label}</p>
                      <p className="text-sm text-muted">{p.line}</p>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>
        ) : null}

        <BookingIntake />

        <BookingPanel input={packet} />

        <p className="text-sm text-muted">
          After the date locks and the fee clears,{" "}
          <a href="/invite" className="text-primary underline underline-offset-4 hover:text-ink">
            build an invite
          </a>
          .
        </p>

        <section aria-labelledby="terms-heading" className="border-t border-border pt-10">
          <h2 id="terms-heading" className="text-2xl">
            Terms
          </h2>
          <ul className="mt-4 max-w-3xl space-y-2 text-sm text-muted">
            <li>{TERMS.duration}</li>
            <li>{TERMS.remoteFee}</li>
            {TERMS.remotePoints.map((line) => (
              <li key={line}>{line}</li>
            ))}
            <li>{TERMS.inPersonFee}</li>
            {TERMS.inPersonPoints.map((line) => (
              <li key={line}>{line}</li>
            ))}
            <li>{TERMS.hold}</li>
            <li>{TERMS.geoPrice}</li>
            <li>{TERMS.notCle}</li>
            <li>{TERMS.notDiagnostic}</li>
            <li>{TERMS.notClinical}</li>
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
