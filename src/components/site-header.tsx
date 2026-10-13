import { practiceNav } from "@/lib/nav";

const CURRENT = "Lunch & Learn";

export function SiteHeader({
  tagline = "Lunch & Learn",
}: {
  bookHref?: string;
  tagline?: string;
  bookLabel?: string;
  current?: boolean;
}) {
  return (
    <header className="cr-header">
      <div className="cr-header-inner">
        <a href="/" className="cr-brand">
          <img src="/favicon.png" width={40} height={40} alt="" decoding="async" className="cr-brand-mark" />
          <span className="cr-brand-text">
            <span className="cr-wordmark">Carlton Research, LLC</span>
            <span className="cr-kicker-head">{tagline}</span>
          </span>
        </a>
        <nav aria-label="Carlton Research" className="cr-nav-desktop">
          {practiceNav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={item.label === CURRENT ? "page" : undefined}
              className="cr-nav-link"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <details className="cr-nav-mobile">
          <summary className="cr-menu-btn">Menu</summary>
          <nav aria-label="Carlton Research" className="cr-drawer">
            {practiceNav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-current={item.label === CURRENT ? "page" : undefined}
                className="cr-nav-link"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
