import { useEffect, useMemo, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Field } from "@/components/invite-architect";
import { Button } from "@/components/ui/button";
import { hydrateBriefing, useBriefing } from "@/lib/store";
import { TALKS, isTalkId, type TalkId } from "@/lib/talks";
import {
  parseQuote,
  quoteReady,
  submitQuoteRequest,
  type QuotePayload,
  type QuoteResult,
} from "@/lib/quote";

function asString(v: unknown) {
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Travel Quote | Carlton Research, LLC" },
      { name: "robots", content: "noindex, nofollow, noarchive, nosnippet" },
      { name: "googlebot", content: "noindex, nofollow, noarchive, nosnippet" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    topic: isTalkId(search.topic) ? search.topic : undefined,
    name: asString(search.name),
    email: asString(search.email),
    address: asString(search.address),
  }),
  component: QuotePage,
});

const empty: QuotePayload = {
  topic: "",
  customTopic: "",
  name: "",
  title: "",
  email: "",
  phone: "",
  address: "",
  country: "",
  guests: "",
  date: "",
  time: "",
  secondDate: "",
  secondTime: "",
  notes: "",
};

function QuotePage() {
  const search = Route.useSearch();
  const [form, setForm] = useState<QuotePayload>(empty);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    hydrateBriefing();
    const s = useBriefing.getState();
    setForm((prev) => ({
      ...prev,
      topic: search.topic ?? (s.talkId ?? ""),
      customTopic: s.talkId === "customize" ? s.questions : prev.customTopic,
      name: search.name ?? s.hostName ?? "",
      email: search.email ?? s.hostEmail ?? "",
      address: search.address ?? s.city ?? "",
    }));
  }, [search]);

  function set<K extends keyof QuotePayload>(key: K, value: QuotePayload[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setResult(null);
  }

  const ready = useMemo(() => quoteReady(form), [form]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!ready || busy) return;
    setBusy(true);
    try {
      const next = await submitQuoteRequest({ data: parseQuote(form) });
      setResult(next);
    } catch {
      setResult({ ok: false, reason: "send-failed" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <SiteHeader bookHref="/#book" current={false} />
      <main id="main" className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-5 py-12 sm:px-8 sm:py-16">
        <section className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">In person</p>
          <h1 className="mt-4 font-display text-4xl uppercase tracking-wider text-ink sm:text-5xl">
            Travel Quote
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-fg">
            Request a travel quote for an in-person Lunch & Learn. You will receive a quote within 24
            to 48 hours.
          </p>
        </section>

        {result?.ok ? (
          <section className="rounded-[var(--radius-lg)] border border-border bg-surface p-5 sm:p-8">
            <h2 className="text-2xl">Request sent</h2>
            <p className="mt-3 text-fg">
              Your request was sent. You will receive a travel quote within 24 to 48 hours.
            </p>
          </section>
        ) : (
          <form
            onSubmit={onSubmit}
            className="rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[var(--shadow-border)] sm:p-8"
          >
            <fieldset>
              <legend className="text-sm font-bold text-ink">Topic</legend>
              <div className="mt-3 grid gap-2">
                {TALKS.map((talk) => (
                  <label
                    key={talk.id}
                    className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] border border-border bg-surface-2 px-3 text-sm"
                  >
                    <input
                      type="radio"
                      name="topic"
                      checked={form.topic === talk.id}
                      onChange={() => set("topic", talk.id as TalkId)}
                    />
                    <span className="font-semibold text-fg">{talk.title}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {form.topic === "customize" ? (
              <div className="mt-6">
                <Field
                  label="Your topic"
                  value={form.customTopic}
                  onChange={(v) => set("customTopic", v)}
                  placeholder="Insert your topic"
                />
              </div>
            ) : null}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Name" value={form.name} onChange={(v) => set("name", v)} autoComplete="name" />
              <Field
                label="Title"
                value={form.title}
                onChange={(v) => set("title", v)}
                autoComplete="organization-title"
              />
              <Field
                label="Email"
                value={form.email}
                onChange={(v) => set("email", v)}
                type="email"
                autoComplete="email"
              />
              <Field
                label="Phone number"
                value={form.phone}
                onChange={(v) => set("phone", v)}
                type="tel"
                autoComplete="tel"
              />
            </div>

            <div className="mt-6">
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink" htmlFor="presentation-address">
                Full presentation address
                <textarea
                  id="presentation-address"
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  rows={3}
                  className="rounded-[var(--radius-sm)] border border-border bg-surface-2 px-3 py-2 font-normal text-fg outline-none placeholder:text-faint focus:border-gold"
                />
              </label>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field
                label="Country"
                value={form.country}
                onChange={(v) => set("country", v)}
                autoComplete="country-name"
                placeholder="United States"
              />
              <Field
                label="Approximate guests"
                value={form.guests}
                onChange={(v) => set("guests", v)}
                type="number"
              />
              <Field label="Desired date" value={form.date} onChange={(v) => set("date", v)} type="date" />
              <Field label="Desired time" value={form.time} onChange={(v) => set("time", v)} type="time" />
              <Field
                label="Second date, optional"
                value={form.secondDate}
                onChange={(v) => set("secondDate", v)}
                type="date"
              />
              <Field
                label="Second time, optional"
                value={form.secondTime}
                onChange={(v) => set("secondTime", v)}
                type="time"
              />
            </div>

            <div className="mt-6">
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink" htmlFor="notes">
                Notes
                <textarea
                  id="notes"
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  rows={4}
                  className="rounded-[var(--radius-sm)] border border-border bg-surface-2 px-3 py-2 font-normal text-fg outline-none placeholder:text-faint focus:border-gold"
                />
              </label>
            </div>

            {result?.reason === "workspace-pending" ? (
              <p className="mt-6 text-sm text-muted">
                Your request was not emailed. Google Workspace is not connected yet.
              </p>
            ) : null}
            {result?.reason === "send-failed" ? (
              <p className="mt-6 text-sm text-muted">
                The request could not be sent. Write to carisa@carltonresearch.com.
              </p>
            ) : null}
            {result?.reason === "invalid" ? (
              <p className="mt-6 text-sm text-muted">Finish the required fields, then send the request.</p>
            ) : null}

            <Button type="submit" className="mt-8 w-full" disabled={!ready || busy}>
              {busy ? "Sending" : "Request a travel quote"}
            </Button>
          </form>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
