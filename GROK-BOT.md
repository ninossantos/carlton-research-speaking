# Grok Bot: implement Lunch & Learn

Lunch & Learn for Carlton Research, LLC.

Repository: https://github.com/ninossantos/carlton-research-speaking

Public host: https://speaking.carltonresearch.com/

The app is already built in this repository. Your job is to deploy it and connect WordPress, Cloudflare, TidyCal, and Workspace mail. Do not rewrite the React app. Do not change copy. Do not redesign.

## Launch now (Grok Bot does this)

Build is complete. TidyCal redirect is set. Book remote is live at https://tidycal.com/mscarisa/lunch-and-learn. Do not change those.

**You deploy. You run the quote-mail test.** Grok Build cannot SSH the speaking host.

1. Deploy `main` from https://github.com/ninossantos/carlton-research-speaking so all three URLs serve the app, not the placeholder:
   - https://speaking.carltonresearch.com/
   - https://speaking.carltonresearch.com/quote
   - https://speaking.carltonresearch.com/invite
   Cloudflare must send `/quote` and `/invite` to the Node origin. Not WordPress. If `/quote` still says "Content ships when the Grok Build lands," the deploy failed.
2. Confirm host env already has `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `GOOGLE_OAUTH_REFRESH_TOKEN`. Also `MAIL_FROM=carisa@carltonresearch.com`, `MAIL_AUTH=google_oauth`, `QUOTE_TO=carisa@carltonresearch.com`. Do not print secrets. Do not replace the refresh token with a Playground token.
3. Submit one test on https://speaking.carltonresearch.com/quote (required fields filled, topic 01, name Quote Delivery Test). Pass: screen says **Request sent** and `carisa@carltonresearch.com` receives `Travel quote request:` with Reply-To as the test host. Fail: stop and tell Carisa. Do not use Gmail in the browser as the test.
4. WordPress (Kadence): one menu item, Lunch & Learn, URL https://speaking.carltonresearch.com/. No iframe. No `/quote` or `/invite` in the menu.
5. Cloudflare Configuration Rules: URI Path contains `/invite` or `/quote` then `X-Robots-Tag` = `noindex, nofollow, noarchive`.

Then stop. Do not rewrite talks. Do not create a second TidyCal type. Do not grey out Book remote.

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
4. TidyCal redirects to `/invite`.

**In person**

1. Pick a topic.
2. Click Request a travel quote. That opens `/quote`.
3. Form emails carisa@carltonresearch.com. Confirmation: quote within 24 to 48 hours.
4. Carisa replies with travel plus $1,500. Travel paid at booking is non-refundable.
5. After payment clears, hold two days on Google Calendar and email the host `/invite?format=in-person`.

Do not put a TidyCal in-person booking type on the public site. `TIDYCAL_IN_PERSON` in `src/lib/booking.ts` stays empty.

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

Quote email delivery is ON. Refresh token verified HTTP 200 under CR Grok Build Mail (cr-grok-build-mail) on 15 September 2026. Same client ID as the refresh token. Do not print secrets. Do not replace the refresh token with a Playground token.

## 3. Cloudflare

DNS: `speaking.carltonresearch.com` CNAME, same pattern as instruments and tracker. Proxied. HTTPS.

Configuration Rules (response header `X-Robots-Tag` = `noindex, nofollow, noarchive`):

- URI Path contains `/invite`
- URI Path contains `/quote`

`public/robots.txt` already disallows `/invite` and `/quote`. Keep that file.

## 4. WordPress (Kadence, Cloudways)

On https://carltonresearch.com/ add **one** menu item:

- Title: Lunch & Learn
- URL: https://speaking.carltonresearch.com/

Do not add a second speaking item. Do not add `/invite`. Do not add `/quote`. Do not iframe.

## 5. TidyCal: remote only

Public remote URL (already wired):

```
https://tidycal.com/mscarisa/lunch-and-learn
```

Redirect is already On. Carisa confirmed 15 September 2026. Do not change the redirect URL. Do not create a second remote type. Do not point Book remote at a Stripe Payment Link.

## 6. In-person hold (after payment, not on the public site)

In-person does not use TidyCal. After travel plus $1,500 clears, you email:

```
https://speaking.carltonresearch.com/invite?format=in-person
```

Then hold two days on Google Calendar:

1. 60-minute busy event on the presentation date and time. Title: `Lunch & Learn`.
2. All-day busy event the day before. Title: `Travel hold: Lunch & Learn`.

If payment never clears, do not hold the dates.

## 7. Verify

1. All three URLs serve the app.
2. Book remote is burgundy and opens TidyCal.
3. Quote form test emails carisa@.
4. Fenlowe Press does not appear.

## What Grok Bot does not do

- Do not rewrite talks, terms, or brand colors.
- Do not iframe this app on WordPress.
- Do not change TidyCal.
- Do not grey out Book remote.
- Do not create an in-person TidyCal type.
- Do not commit GOOGLE_OAUTH_* or any password.
- Do not send as mscarisa@gmail.com.
- Do not mention Fenlowe Press.
