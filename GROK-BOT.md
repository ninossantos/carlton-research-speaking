# Grok Bot: implement Lunch & Learn

Lunch & Learn for Carlton Research, LLC.

Repository: https://github.com/ninossantos/carlton-research-speaking

Public host: https://speaking.carltonresearch.com/

The app is already built in this repository. Your job is to deploy it and connect WordPress, Cloudflare, TidyCal, and Workspace mail. Do not rewrite the React app. Do not change copy. Do not redesign.

## What this is

An interactive speaking site. Four topics. Kinetic opening with Pause, Play, and Replay. Remote booking through TidyCal at $750. In-person travel quotes through an unlisted form at `/quote`. After payment, an unlisted invitation page at `/invite`.

## What this is not

- Not the Coercive Control Observatory
- Not Instruments
- Not the Law Tracker
- Not Fenlowe Press
- Not a CLE
- Not a WordPress page
- Not an iframe inside Kadence

Do not merge this product into any other subdomain. Do not mention Fenlowe Press. Do not put Lunch & Learn inside Observatory, Instruments, or Tracker navigation.

## Pages

| URL | Public? | Indexed? | Purpose |
|---|---|---|---|
| https://speaking.carltonresearch.com/ | Yes | Yes | Speaking page. Menu title: Lunch & Learn |
| https://speaking.carltonresearch.com/quote | Linked only from In Person on the speaking page | No | Travel quote request. Emails carisa@ |
| https://speaking.carltonresearch.com/invite | No public link | No | One-sheet after payment |

Do not add `/quote` or `/invite` to WordPress, header, footer, sitemaps, or Search Console.

## Visitor flow

**Remote**

1. Pick a topic on the speaking page.
2. Complete Prepare the Presentation.
3. Book remote. TidyCal charges $750 through Stripe.
4. TidyCal redirects to `/invite` with name, email, date, time, and format=remote.

**In person**

1. Pick a topic.
2. Click Request a travel quote. That opens `/quote`.
3. Form emails carisa@carltonresearch.com. Confirmation: quote within 24 to 48 hours.
4. Carisa replies with travel plus $1,500. Travel paid at booking is non-refundable.
5. After payment clears, hold two days on Google Calendar (steps below) and email the host `/invite?format=in-person`.

Do not put a TidyCal in-person booking type on the public site. `TIDYCAL_IN_PERSON` in `src/lib/booking.ts` stays empty.

## Order of work

Do these in order. Stop and tell Carisa if a step fails.

1. Deploy this repository to https://speaking.carltonresearch.com/
2. Set host env (mail). Confirm OAuth secrets already on the host. Do not print them.
3. Cloudflare DNS and robots headers
4. WordPress menu (one item)
5. TidyCal: confirm the existing remote type at https://tidycal.com/mscarisa/lunch-and-learn. Turn on the `/invite` redirect. Do not create a second remote type.
6. Verify remote, quote mail, and unlisted pages

## 1. Deploy the app

Clone https://github.com/ninossantos/carlton-research-speaking (branch `main`).

Host this Node app the same way as instruments.carltonresearch.com and the law tracker: Cloudflare in front, origin is not Cloudways WordPress. Cloudways hosts WordPress only.

```
npm ci
npm run build
```

Serve the TanStack Start production build so `/`, `/quote`, and `/invite` all resolve on speaking.carltonresearch.com.

Do not paste React into WordPress. Do not iframe the app. Do not enable the unused auth stack.

## 2. Host environment

Set these on the speaking host. Never commit them.

Public (safe):

```
MAIL_FROM=carisa@carltonresearch.com
MAIL_DOMAIN=carltonresearch.com
MAIL_AUTH=google_oauth
MAIL_ALIAS_INSIGHTS=insights@carltonresearch.com
QUOTE_TO=carisa@carltonresearch.com
```

Secrets (already set, never in git, never print):

```
GOOGLE_OAUTH_CLIENT_ID
GOOGLE_OAUTH_CLIENT_SECRET
GOOGLE_OAUTH_REFRESH_TOKEN
```

Quote email delivery is ON. Refresh token verified HTTP 200 under CR Grok Build Mail (cr-grok-build-mail) on 15 September 2026. Same client ID as the refresh token.

- From: Carlton Research, LLC <carisa@carltonresearch.com>
- To: carisa@carltonresearch.com
- Reply-To: the host who submitted `/quote`
- Scope: gmail.send
- Consent: Internal
- Cloud project: CR Grok Build Mail (cr-grok-build-mail)
- Do not enable 2FA
- Do not use App Passwords
- Do not send as mscarisa@gmail.com
- Do not send Lunch & Learn as insights@
- Do not use Zoho
- Do not inject an outreach signature on quote-request mail
- If the three GOOGLE_OAUTH_* values are missing, stop and tell Carisa. Do not fall back to SMTP.
- GOOGLE_OAUTH_REFRESH_TOKEN must stay issued to GOOGLE_OAUTH_CLIENT_ID for this project. Do not replace it with a Playground token from another client ID.
- After deploy, submit one test on https://speaking.carltonresearch.com/quote. Confirm carisa@ receives Travel quote request: and Reply-To is the test host.

Redeploy after env is confirmed.

## 3. Cloudflare

DNS: `speaking.carltonresearch.com` CNAME, same pattern as instruments and tracker. Proxied. HTTPS.

Configuration Rules (response header `X-Robots-Tag` = `noindex, nofollow, noarchive`):

- URI Path contains `/invite`
- URI Path contains `/quote`

`public/robots.txt` already disallows `/invite` and `/quote`. Keep that file.

Do not add `/invite` or `/quote` to Google Search Console.

## 4. WordPress (Kadence, Cloudways)

On https://carltonresearch.com/ add **one** menu item:

- Title: Lunch & Learn
- URL: https://speaking.carltonresearch.com/

Do not add a second speaking item. Do not add `/invite`. Do not add `/quote`. Do not iframe. Do not paste source into a Kadence block.

## 5. TidyCal: remote only

Account: Carisa Carlton, TidyCal Pro. Login: https://tidycal.com/login

Use the existing Pro account. Do not create a new TidyCal account. Do not add a new platform. Do not store the password in this repository. If login fails, stop and tell Carisa.

Timezone: America/Phoenix (Arizona, no daylight saving).

Calendar: the Google Calendar already attached to this TidyCal account.

Stripe: already connected at Integrations > Payments. Remote charges $750 through Stripe. If Stripe is not connected, stop and tell Carisa. Do not switch processors.

Public remote URL (already wired in `src/lib/booking.ts`):

```
https://tidycal.com/mscarisa/lunch-and-learn
```

Confirm this type. Do not create a second remote type. Do not point Book remote at a Stripe Payment Link. TidyCal charges through Stripe on this type.

Do **not** create a public in-person booking type. Leave `TIDYCAL_IN_PERSON` as `""`.

On that existing TidyCal type, confirm Redirect is **On**. Destination page:

```
https://speaking.carltonresearch.com/invite
```

Optional prefill (same page):

```
https://speaking.carltonresearch.com/invite?name={{contact.name}}&email={{contact.email}}&date={{booking.date}}&time={{booking.time}}&format=remote
```

## 6. In-person hold (after payment, not on the public site)

In-person does not use TidyCal. After travel plus $1,500 clears, you email:

```
https://speaking.carltonresearch.com/invite?format=in-person
```

Then hold two days on Google Calendar:

1. On the connected Google Calendar, create a 60-minute busy event on the presentation date and time. Title: `Lunch & Learn`. Location: the address from the quote. No public guests required.
2. Create an **all-day busy** event on the calendar day immediately before. Title: `Travel hold: Lunch & Learn`. Busy. No guests.

Those two days are the hold: one day before for travel, plus the day of the presentation.

If payment never clears, do not hold the dates.

## 7. Verify before handing off

1. https://speaking.carltonresearch.com/ loads. Title Lunch & Learn. Four topics. Pause, Play, Replay on the opening. No Skip.
2. WordPress menu: one item, Lunch & Learn, pointing at that URL. No iframe.
3. Header and footer do not link `/invite` or `/quote` except the In Person button to `/quote`.
4. Open the TidyCal remote URL in a private window. Confirm $750, 60 minutes, 14-day notice, the four questions, Stripe checkout.
5. Complete a $1 test only if Carisa authorizes a test charge. Otherwise stop at checkout and confirm the price is $750.
6. After a real remote booking, confirm the browser lands on `speaking.carltonresearch.com/invite`.
7. Submit one test on https://speaking.carltonresearch.com/quote. Confirm carisa@carltonresearch.com receives `Travel quote request:` and Reply-To is the test host. Confirm the screen says the request was sent.
8. View source on `/invite` and `/quote`: robots meta is noindex, nofollow, noarchive, nosnippet. Cloudflare X-Robots-Tag matches.
9. Confirm Fenlowe Press does not appear anywhere.

## What Grok Bot does not do

- Do not rewrite talks, terms, or brand colors.
- Do not iframe TidyCal or this app on WordPress.
- Do not collect travel in TidyCal.
- Do not create a public in-person TidyCal type for this site.
- Do not turn on TidyCal redirect for in-person.
- Do not create a third booking type for CLE.
- Do not link `/invite` from any public page.
- Do not link `/quote` from WordPress or any public menu.
- Quote email is ON via Workspace Gmail OAuth. Keep GOOGLE_OAUTH_* on the host only.
- Do not enable 2FA. Do not use App Passwords.
- Do not send as mscarisa@gmail.com.
- Do not mention Fenlowe Press.
- Do not commit GOOGLE_OAUTH_* or any password.

## Copy and brand (already in the app)

Do not rewrite these. If a screen does not match, stop and tell Carisa.

- No dummy subjects (it is, there is, there are)
- No em dashes or en dashes
- American English
- Codebook is Title Case
- Not a CLE.
- Footer: Lunch & Learn is a proprietary program of Carlton Research, LLC. All rights reserved. Not a CLE.

Carlton Research, LLC  
Principal: Carisa Carlton, M.A.  
Fonts: Playfair Display (H1, all caps, #090a0c), Nunito (H2/body, #1e2d40)  
Colors: #dbb28b #d7a975 #090a0c #1e2d40 #4a5567 #84919a #f3f0eb #f8f7f3 #ffffff #6f2430

Hero: Schedule a Presentation / Lunch & Learn / Carisa Carlton, M.A. / Sixty minutes: presentation plus questions. / For attorneys, judges, evaluators, and treatment providers. / Remote or in person. Not a CLE.

Topics:

1. Distinguish High Conflict from Coercive Control
2. Mapping a Pattern of Coercive Control
3. Incident-Model vs Pattern-Model of Coercive Control
4. Customize Your Presentation

Remote: $750, payable upon booking.  
In person: $1,500 plus travel expenses. Request a travel quote.
