import { FIRM, TERMS } from "@/lib/booking";
import { copyrightLine, legalNav, practiceNav } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 sm:px-8">
        <p className="flex items-center gap-3 font-display text-lg text-ink">
          <img
            src="/favicon.png"
            width={40}
            height={40}
            alt=""
            decoding="async"
            className="h-10 w-10 shrink-0 object-contain"
          />
          <span>{FIRM}</span>
        </p>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          Lunch & Learn is a proprietary program of {FIRM}. All rights reserved. {TERMS.notCle}
        </p>
        <nav aria-label="Carlton Research" className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {practiceNav.map((item) => (
            <a key={item.href} href={item.href} className="text-muted hover:text-ink hover:underline">
              {item.label}
            </a>
          ))}
        </nav>
        <div role="separator" aria-hidden="true" className="h-px w-full bg-gold" />
        <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="text-muted">{copyrightLine()}</span>
          {legalNav.map((item) => (
            <a key={item.href} href={item.href} className="text-muted hover:text-ink hover:underline">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
