import { FIRM, FIRM_ORIGIN, TERMS } from "@/lib/booking";

const practiceNav = [
  { href: `${FIRM_ORIGIN}/`, label: "Home" },
  { href: "/", label: "Lunch-and-Learn" },
  { href: `${FIRM_ORIGIN}/services/`, label: "Services" },
  { href: `${FIRM_ORIGIN}/about/`, label: "About" },
  { href: `${FIRM_ORIGIN}/contact/`, label: "Contact" },
];

const secondaryNav = [
  { href: `${FIRM_ORIGIN}/privacy-policy/`, label: "Privacy Policy" },
  { href: `${FIRM_ORIGIN}/terms-of-service/`, label: "Terms of Service" },
  { href: `${FIRM_ORIGIN}/copyright-notice/`, label: "Copyright Notice" },
];

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
          Lunch-and-Learn is a proprietary program of {FIRM}. All rights reserved. {TERMS.notCle}{" "}
          {TERMS.notDiagnostic} {TERMS.notClinical}
        </p>
        <nav aria-label="Carlton Research" className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {practiceNav.map((item) => (
            <a key={item.href} href={item.href} className="text-muted hover:text-ink hover:underline">
              {item.label}
            </a>
          ))}
        </nav>
        <div role="separator" aria-hidden="true" className="h-px w-full bg-gold" />
        <nav aria-label="Legal" className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {secondaryNav.map((item) => (
            <a key={item.href} href={item.href} className="text-muted hover:text-ink hover:underline">
              {item.label}
            </a>
          ))}
        </nav>
        <p className="text-sm text-muted">
          Forensic practice:{" "}
          <a className="text-primary underline underline-offset-4 hover:text-ink" href={FIRM_ORIGIN}>
            carltonresearch.com
          </a>
        </p>
      </div>
    </footer>
  );
}
