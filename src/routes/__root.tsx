import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const APP_NAME = "Lunch & Learn | Carlton Research, LLC";

const SCHEMA_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://carltonresearch.com/#organization",
      "name": "Carlton Research, LLC",
      "legalName": "Carlton Research, LLC",
      "url": "https://carltonresearch.com/",
      "logo": "https://carltonresearch.com/wp-content/uploads/2026/09/seed-of-life-512.png",
      "image": "https://carltonresearch.com/wp-content/uploads/2026/09/seed-of-life-512.png",
      "description": "Carlton Research, LLC provides coercive control forensic services for attorneys, courts, and evaluators. Founded in October 2020 in Laguna Beach, California. CEO and founder Carisa Carlton.",
      "email": "carisa@carltonresearch.com",
      "telephone": "+1-323-999-1376",
      "foundingDate": "2020-10",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1968 South Coast Highway #2461",
        "addressLocality": "Laguna Beach",
        "addressRegion": "CA",
        "postalCode": "92651",
        "addressCountry": "US"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "founder": {
        "@id": "https://carltonresearch.com/about/#person"
      },
      "employee": {
        "@id": "https://carltonresearch.com/about/#person"
      },
      "knowsAbout": [
        "Coercive control",
        "Coercive control forensic analysis",
        "Expert witness testimony on coercive control",
        "Pattern analysis of longitudinal communication records",
        "Technology-facilitated coercive control",
        "Family law evidence"
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "@id": "https://carltonresearch.com/#service-coercive-control-forensics",
            "name": "Coercive Control Forensic Services",
            "serviceType": "Coercive control forensic analysis and expert witness services",
            "provider": {
              "@id": "https://carltonresearch.com/#organization"
            },
            "url": "https://carltonresearch.com/services/",
            "areaServed": {
              "@type": "Country",
              "name": "United States"
            }
          }
        }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/carlton-research"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://carltonresearch.com/about/#person",
      "name": "Carisa Carlton",
      "honorificSuffix": "M.A.",
      "url": "https://carltonresearch.com/about/",
      "image": "https://carltonresearch.com/wp-content/uploads/2026/09/carisa-carlton-headshot.jpg",
      "jobTitle": [
        "CEO",
        "Founder"
      ],
      "description": "Carisa Carlton is an anthropologist and sociologist with 10 years of coercive control research, including courtroom research. She is the author of The Codebook for Identifying Coercive Control in Longitudinal Artifacts. CEO and founder of Carlton Research, LLC.",
      "worksFor": {
        "@id": "https://carltonresearch.com/#organization"
      },
      "knowsAbout": [
        "Coercive control",
        "Coercive control research",
        "Courtroom research on coercive control",
        "Pattern analysis of longitudinal communication records"
      ],
      "sameAs": [
        "https://www.linkedin.com/in/carisacarlton",
        "https://carltonresearch.com/about/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://speaking.carltonresearch.com/#website",
      "url": "https://speaking.carltonresearch.com/",
      "name": "Lunch & Learn | Carlton Research, LLC",
      "description": "Lunch & Learn with Carisa Carlton, M.A. Coercive control speaking for attorneys, courts, and evaluators. Sixty minutes. Four topics. Remote or in person.",
      "publisher": {
        "@id": "https://carltonresearch.com/#organization"
      },
      "inLanguage": "en-US"
    }
  ]
} as const;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Lunch & Learn with Carisa Carlton, M.A. Sixty minutes. Four topics. Remote or in person.",
      },
      { name: "theme-color", content: "#090a0c" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;0,700;1,700&family=Playfair+Display:wght@700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
    scripts: [
      {
        type: "text/javascript",
        children: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "vo79yxbwn3");`,
      },
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-27NW00E2L1",
        async: true,
      },
      {
        children:
          "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-27NW00E2L1',{cookie_domain:'auto'});",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(SCHEMA_GRAPH),
      },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `/* <![CDATA[ */
var SlimStatParams = {
 transport: "ajax",
 ajaxurl: "https://carltonresearch.com/wp-admin/admin-ajax.php",
 ajaxurl_ajax: "https://carltonresearch.com/wp-admin/admin-ajax.php"
};
/* ]]> */`,
          }}
        />
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/wp/wp-slimstat/tags/5.5.0/wp-slimstat.min.js"
        />
      </body>
    </html>
  ),
});
