import { FIRM_ORIGIN } from "@/lib/booking";

const practiceNav = [
  { href: `${FIRM_ORIGIN}/`, label: "Home" },
  { href: "/", label: "Lunch & Learn", current: true },
  { href: `${FIRM_ORIGIN}/services/`, label: "Services" },
  { href: `${FIRM_ORIGIN}/about/`, label: "About" },
  { href: `${FIRM_ORIGIN}/contact/`, label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-bg">
      <nav aria-label="Carlton Research" className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-stretch gap-5 overflow-x-auto px-5 sm:px-8">
          {practiceNav.map((item) =>
            "current" in item && item.current ? (
              <a
                key={item.label}
                href={item.href}
                aria-current="page"
                className="shrink-0 border-b-2 border-rule py-3 text-sm text-ink"
              >
                {item.label}
              </a>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="shrink-0 py-3 text-sm text-muted hover:text-ink"
              >
                {item.label}
              </a>
            ),
          )}
        </div>
      </nav>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="/" className="flex min-w-0 items-center gap-3 no-underline">
          <img
            src="/favicon.png"
            width={40}
            height={40}
            alt=""
            decoding="async"
            className="h-10 w-10 shrink-0 object-contain"
          />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="font-display text-lg text-ink">Carlton Research, LLC</span>
            <span className="mt-0.5 text-xs font-bold uppercase tracking-widest text-primary">
              Lunch & Learn
            </span>
          </span>
        </a>
        <a
          href="#book"
          className="shrink-0 text-sm font-semibold text-primary underline underline-offset-4 hover:text-ink"
        >
          Book the hour
        </a>
      </div>
    </header>
  );
}
