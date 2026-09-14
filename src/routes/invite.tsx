import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RoomPicker } from "@/components/room-picker";
import { OneSheet } from "@/components/one-sheet";
import { Choice, Field } from "@/components/invite-architect";
import { hydrateBriefing, useBriefing } from "@/lib/store";
import { ORIGIN } from "@/lib/booking";
import { ROLES, isFormatId, isRoleId, isTalkId, type TalkId } from "@/lib/talks";

function asString(v: unknown) {
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}

export const Route = createFileRoute("/invite")({
  head: () => ({
    meta: [{ title: "Build an Invite | Carlton Research, LLC" }],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    topic: isTalkId(search.topic) ? search.topic : undefined,
    audience: isRoleId(search.audience) ? search.audience : undefined,
    format: isFormatId(search.format) ? search.format : undefined,
    name: asString(search.name),
    email: asString(search.email),
    date: asString(search.date),
    time: asString(search.time),
    org: asString(search.org),
  }),
  component: InvitePage,
});

function InvitePage() {
  const search = Route.useSearch();
  const s = useBriefing();

  useEffect(() => {
    hydrateBriefing();
    const next = useBriefing.getState();
    if (search.topic) next.setTalk(search.topic);
    if (search.audience) next.setRole(search.audience);
    if (search.format) next.setFormat(search.format);
    if (search.name) next.setHostName(search.name);
    if (search.email) next.setHostEmail(search.email);
    if (search.org) next.setOrg(search.org);
    if (search.date) {
      const when = search.time ? `${search.date} ${search.time}` : search.date;
      next.setPreferredWeek(when);
    }
  }, [search]);

  const packet = {
    talkId: s.talkId,
    role: s.role,
    format: s.format,
    org: s.org,
    city: s.city,
    hostName: s.hostName,
    hostEmail: s.hostEmail,
    preferredWeek: s.preferredWeek,
    questions: s.questions,
  };

  function pickTopic(id: TalkId) {
    s.setTalk(id);
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <SiteHeader bookHref="/#book" current={false} />
      <main id="main" className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-5 py-12 sm:px-8 sm:py-16">
        <section className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">After the hour is booked</p>
          <h1 className="mt-4 font-display text-4xl uppercase tracking-wider text-ink sm:text-5xl">
            Build an Invite
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-fg">
            Use this page after the date locks and the fee clears. Write a one-sheet and a blurb
            the host can send inside the organization.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted">
            For in-person hours, wait until travel and the speaking fee have both cleared. Remote
            hours write the invite once TidyCal has taken the fee.
          </p>
        </section>

        <section>
          <h2 className="text-2xl">Pick a Topic</h2>
          <p className="mt-2 max-w-2xl text-muted">The sheet follows the hour you booked.</p>
          <div className="mt-6">
            <RoomPicker value={s.talkId} onChange={pickTopic} />
          </div>
        </section>

        <section className="rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[var(--shadow-border)] sm:p-8">
          <h2 className="text-2xl">The Locked Hour</h2>
          <fieldset className="mt-8">
            <legend className="text-sm font-bold text-ink">Select your audience</legend>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {ROLES.map((role) => (
                <Choice
                  key={role.id}
                  selected={s.role === role.id}
                  onClick={() => s.setRole(role.id)}
                  label={role.label}
                />
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-6">
            <legend className="text-sm font-bold text-ink">Format</legend>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Choice
                selected={s.format === "remote"}
                onClick={() => s.setFormat("remote")}
                label="Remote"
              />
              <Choice
                selected={s.format === "in-person"}
                onClick={() => s.setFormat("in-person")}
                label="In person"
              />
            </div>
          </fieldset>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Organization" value={s.org} onChange={s.setOrg} autoComplete="organization" />
            <Field label="Host name" value={s.hostName} onChange={s.setHostName} autoComplete="name" />
            <Field
              label="Host email"
              value={s.hostEmail}
              onChange={s.setHostEmail}
              type="email"
              autoComplete="email"
            />
            <Field
              label="Date of the hour"
              value={s.preferredWeek}
              onChange={s.setPreferredWeek}
              placeholder="12 October 2026, 12:00 p.m."
            />
            {s.format === "in-person" ? (
              <Field
                label="City and state"
                value={s.city}
                onChange={s.setCity}
                placeholder="Phoenix, Arizona"
              />
            ) : null}
          </div>
        </section>

        <section>
          <h2 className="text-2xl">One-Sheet and Blurb</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Print the sheet or copy the blurb. Send either inside the organization. This page lives
            at {ORIGIN}/invite.
          </p>
          <div className="mt-6">
            <OneSheet input={packet} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
