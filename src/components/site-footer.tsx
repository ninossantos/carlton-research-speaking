import { FIRM, TERMS } from "@/lib/booking";
import { copyrightLine, legalNav, practiceNav } from "@/lib/nav";

export function SiteFooter({ note }: { note?: string } = {}) {
  return (
    <footer className="cr-footer">
      <div className="cr-footer-top">
        <img src="/favicon.png" width={40} height={40} alt="" decoding="async" className="h-10 w-10 shrink-0 object-contain" />
        <nav aria-label="Carlton Research footer" className="cr-footer-nav">
          {practiceNav.map((item) => item.label === "Evidence Vault" ? { href: "https://speaking.carltonresearch.com/", label: "Lunch & Learn" } : item).map((item) => (
            <a key={item.href} href={item.href} aria-current={item.label === "Lunch & Learn" ? "page" : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="cr-footer-note">
        <p>{note ?? <>Lunch & Learn is a proprietary program of {FIRM}. All rights reserved. {TERMS.notCle}</>}</p>
      </div>
      <div className="cr-footer-legal">
        <div className="cr-footer-legal-inner">
          <span className="cr-tagline">Carlton Research Set the Gold Standard for Evaluating Coercive Control</span>
          <a className="cr-link" href="https://carltonresearch.com/is-this-coercive-control/">
            <em>Is it Coercive Control?</em> Free check here
          </a>
          <span>{copyrightLine()}</span>
          <span className="cr-legal-group">
            {legalNav.map((item, i) => (
              <span key={item.href} className="cr-legal-group">
                {i > 0 ? <span aria-hidden="true" className="cr-dot">·</span> : null}
                <a className="cr-link" href={item.href}>{item.label}</a>
              </span>
            ))}
          </span>
          <a
            className="cr-linkedin"
            href="https://www.linkedin.com/company/carlton-research/"
            target="_blank"
            rel="noreferrer"
            aria-label="Carlton Research on LinkedIn"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2.5" y="2.5" width="19" height="19" rx="3" />
              <path d="M7.5 10.5v6M7.5 7.5v.01M11 16.5v-6M11 13c0-1.6 1-2.5 2.4-2.5s2.1.9 2.1 2.5v3.5" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
