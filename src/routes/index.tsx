import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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
          <h2 id="topics-heading" className="cr-h2" style={{ marginTop: 0 }}>
            {CLE.agendaHeading}
          </h2>
          <p className="cr-body" style={{ color: "#4a5567" }}>{CLE.agendaSubline}</p>
          <div className="cr-grid3 mt-6">
            {CLE.agenda.map((block) => (
              <div
                key={block.title}
                className="cr-card flex flex-col text-left"
              >
                <span className="cr-kicker">{block.minutes}</span>
                <span className="cr-card-title mt-2">{block.title}</span>
                <span className="cr-card-text mt-2">{block.line}</span>
              </div>
            ))}
          </div>
          <div className="cr-zone">
            <h2 className="cr-h2">{CLE.sessionTopicsHeading}</h2>
            <ol className="cr-body list-decimal space-y-3 pl-5">
              {CLE.sessionTopics.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="booking-details"
          className="cr-panel"
                  >
          <h2 className="cr-h2">{CLE.receivesHeading}</h2>
          <p className="cr-body" style={{ color: "#4a5567" }}>{CLE.receivesSubline}</p>
          <ul className="cr-services-list mt-4 grid gap-2 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-4">
            {CLE.receives.map((item) => (
              <li
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section
          id="book"
          className="cr-card cr-zone-card"
          style={{ color: "#1e2d40" }}
        >
          <h2 className="cr-h2">{CLE.bookHeading}</h2>
          <p className="cr-body" style={{ color: "#4a5567" }}>{CLE.bookIntro}</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {CLE.groups.map((g) => (
              <div key={g.label} className="cr-card" style={{ background: "#f3f0eb" }}>
                <p className="cr-kicker">{g.label}</p>
                <p className="mt-2 font-display text-3xl text-ink">{g.price}</p>
                <p className="mt-1" style={{ color: "#1e2d40" }}>{g.sub}</p>
                <div className="mt-5">
                  <a className="cr-btn" href={g.href} target="_blank" rel="noreferrer">
                    {g.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-3xl" style={{ color: "#4a5567" }}>{CLE.availability}</p>
          <p className="mt-1 max-w-3xl" style={{ color: "#4a5567" }}>{CLE.coming}</p>
        </section>

        <section aria-labelledby="terms-heading" style={{ paddingTop: "1.75rem", borderTop: "1px solid rgba(132, 145, 154, 0.22)" }}>
          <h2 id="terms-heading" className="cr-h2">
            Terms
          </h2>
          <div className="cr-body space-y-2" style={{ color: "#4a5567" }}>
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
