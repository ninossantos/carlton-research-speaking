import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { CLE, CLE_VIDEO_PLACEHOLDER, CLE_VIDEO_YOUTUBE_ID } from "@/lib/booking";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: CLE.pageTitle },
      { name: "description", content: CLE.metaDescription },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <SiteHeader tagline="Coercive Control CLE Course" bookLabel="Book the Coercive Control CLE course" />
      <main id="main" className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-5 py-12 sm:px-8 sm:py-16">
        <section className="text-center">
          <h1
            className="mt-4 font-display text-ink"
            style={{ fontSize: "clamp(2.25rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.02em" }}
          >
            {CLE.title}
          </h1>
          <p
            className="mx-auto mt-5 max-w-2xl font-sans"
            style={{ fontWeight: 400, fontSize: "1.15rem", color: "#4a5567" }}
          >
            {CLE.subtitle}
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-fg">{CLE.format}</p>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-muted">{CLE.intro}</p>
        </section>

        {CLE_VIDEO_YOUTUBE_ID || CLE_VIDEO_PLACEHOLDER ? (
          <section aria-label="Course video" className="mx-auto w-full max-w-4xl">
            <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface-2 shadow-[var(--shadow-border)]">
              {CLE_VIDEO_YOUTUBE_ID ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${CLE_VIDEO_YOUTUBE_ID}?rel=0`}
                  title="Mapping a Pattern of Coercive Control"
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-300 text-sm font-bold uppercase tracking-widest text-muted">
                  Course video
                </div>
              )}
            </div>
          </section>
        ) : null}

        <section aria-labelledby="topics-heading">
          <h2 id="topics-heading" className="text-2xl">
            {CLE.agendaHeading}
          </h2>
          <p className="mt-2 max-w-2xl text-muted">{CLE.agendaSubline}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {CLE.agenda.map((block) => (
              <div
                key={block.title}
                className="flex min-h-44 flex-col rounded-[var(--radius-md)] border border-border bg-surface-2 p-5 text-left"
              >
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-gold">{block.minutes}</span>
                <span className="mt-3 font-display text-xl leading-snug text-ink">{block.title}</span>
                <span className="mt-3 text-sm text-muted">{block.line}</span>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <h2 className="text-2xl">{CLE.sessionTopicsHeading}</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-fg">
              {CLE.sessionTopics.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="booking-details"
          className="rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[var(--shadow-border)] sm:p-8"
        >
          <h2 className="text-2xl">{CLE.receivesHeading}</h2>
          <p className="mt-2 max-w-2xl text-muted">{CLE.receivesSubline}</p>
          <ul className="mt-6 grid gap-2 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-4">
            {CLE.receives.map((item) => (
              <li
                key={item}
                className="rounded-[var(--radius-sm)] border border-border bg-surface-2 px-3 py-2 text-sm font-semibold text-fg"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section
          id="book"
          className="rounded-[var(--radius-lg)] border border-border bg-ink px-5 py-8 text-surface sm:px-8"
        >
          <h2 className="font-display text-3xl uppercase tracking-[0.06em] text-surface">{CLE.bookHeading}</h2>
          <p className="mt-3 max-w-2xl text-sm text-gold-soft">{CLE.bookIntro}</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {CLE.groups.map((g) => (
              <div key={g.label} className="rounded-[var(--radius-md)] border border-faint/30 bg-fg p-5">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-gold">{g.label}</p>
                <p className="mt-2 font-display text-3xl text-surface">{g.price}</p>
                <p className="mt-1 text-sm text-surface/80">{g.sub}</p>
                <Button className="mt-6 w-full" variant="primary" asChild>
                  <a href={g.href} target="_blank" rel="noreferrer">
                    {g.cta}
                  </a>
                </Button>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-gold-soft">{CLE.availability}</p>
          <p className="mt-2 max-w-3xl text-sm text-gold-soft">{CLE.coming}</p>
        </section>

        <section aria-labelledby="terms-heading" className="border-t border-border pt-10">
          <h2 id="terms-heading" className="text-2xl">
            Terms
          </h2>
          <div className="mt-4 max-w-3xl space-y-2 text-sm text-muted">
            {CLE.terms.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="pt-4">{CLE.azDisclaimer}</p>
          </div>
        </section>
      </main>
      <SiteFooter note="Mapping a Pattern of Coercive Control is a proprietary CLE program of Carlton Research, LLC. All rights reserved." />
    </div>
  );
}
