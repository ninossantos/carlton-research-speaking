import { FIRM, FIRM_ORIGIN } from "@/lib/booking";

export const OBSERVATORY_ORIGIN = "https://observatory.carltonresearch.com";

export const practiceNav = [
  { href: `${FIRM_ORIGIN}/`, label: "Home" },
  { href: `${OBSERVATORY_ORIGIN}/`, label: "Coercive Control Observatory" },
  { href: "/", label: "Lunch & Learn", current: true as const },
  { href: `${FIRM_ORIGIN}/services/`, label: "Services" },
  { href: `${FIRM_ORIGIN}/about/`, label: "About" },
  { href: `${FIRM_ORIGIN}/contact/`, label: "Contact" },
] as const;

export const legalNav = [
  { href: `${FIRM_ORIGIN}/privacy-policy/`, label: "Privacy Policy" },
  { href: `${FIRM_ORIGIN}/terms-of-service/`, label: "Terms of Service" },
  { href: `${FIRM_ORIGIN}/copyright-notice/`, label: "Copyright Notice" },
] as const;

/** Calendar year in America/Phoenix. Rolls on January 1 in Arizona. */
export function copyrightYear(now = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Phoenix",
    year: "numeric",
  }).format(now);
}

export function copyrightLine(now = new Date()) {
  return `© ${copyrightYear(now)} ${FIRM}`;
}
