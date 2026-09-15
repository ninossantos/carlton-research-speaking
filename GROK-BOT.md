# Handoff for Grok Bot

Lunch & Learn for Carlton Research, LLC.

Repository: https://github.com/ninossantos/carlton-research-speaking

Public host: https://speaking.carltonresearch.com/

This repository is the speaking app. This is not the Coercive Control Observatory. This is not Instruments. This is not the Law Tracker. This is not Fenlowe Press. Do not merge this product into any other subdomain.

## Task

1. Deploy this repository so https://speaking.carltonresearch.com/ serves the app. Same Cloudflare CNAME pattern as instruments and tracker. Cloudways hosts WordPress only.
2. WordPress (Kadence, Cloudways): add one menu item. Title: Lunch & Learn. URL: https://speaking.carltonresearch.com/  Do not add `/invite` to any WordPress menu.
3. Do not iframe this app. Do not paste React source into WordPress. Do not add a second menu item. Do not put Lunch & Learn inside Observatory, Instruments, or Tracker navigation as a tab of those products.
4. Do not mention Fenlowe Press anywhere.
5. Log into TidyCal Pro and create the two Lunch & Learn booking types exactly as specified below. Paste the public URLs into `src/lib/booking.ts`. Commit and deploy.

## TidyCal: Grok Bot does this

Account: Carisa Carlton, TidyCal **Pro**. Login: https://tidycal.com/login

Use Carisa's existing TidyCal Pro credentials. Do not create a new TidyCal account. Do not add a new platform. Do not store the password in this repository. If login fails, stop and tell Carisa.

Timezone for the account and both booking types: **America/Phoenix** (Arizona, no daylight saving).

Connected calendar: the Google Calendar already attached to this TidyCal account. All bookings write to that calendar.

Stripe must already be connected at **Integrations > Payments**. Remote charges $750 through Stripe. If Stripe is not connected, stop and tell Carisa. Do not switch to a new processor.

### Create two booking types

**Booking types > + New booking type.** Do this twice. Do not reuse a leftover 15-minute or 30-minute default type for Lunch & Learn.

---

### Booking type 1: Remote (paid)

| Setting | Value |
|---|---|
| Title | Lunch & Learn Remote |
| URL slug | lunch-and-learn-remote |
| Description | 60 minutes: presentation plus questions. Fee $750. Payable upon booking. Cancel 14 days ahead: full refund. Change date and time 14 days ahead: permitted, no change fees. Cancellation or change less than 14 days ahead: no refund or change permitted. Not a CLE. |
| Calendar | Carisa's connected Google Calendar |
| Duration | 60 minutes |
| Location | Online video conference (Zoom or Google Meet, whichever is already connected). If none is connected, use a custom video link and tell Carisa. |
| Pricing | Per booking. $750.00 USD. Stripe. |
| How far in advance | 180 days |
| Minimum booking notice | 14 days |
| Availability interval | 30 minutes |
| Padding / gap between bookings | 30 minutes |
| Booking limits | 1 per day |
| Allow rescheduling | On. Allow rescheduling up to **14 days** before the booking. |
| Allow cancellations | On. Refunds are not automatic. Carisa refunds in the Stripe dashboard only when the cancel is 14 days or more ahead. |
| Require approval | Off |
| Group bookings | Off |
| Ignore external calendar conflicts | Off |
| Coupons | Off |

**Availability:** Weekly. Use Carisa's existing default weekly windows. If none exist, Monday through Friday 9:00 a.m. to 4:00 p.m. America/Phoenix. Do not invent weekend hours.

**Questions** (Advanced > Questions > Enable questions to attendees):

1. Organization: short text, required
2. Audience: dropdown, required. Options: Attorneys / Judges / Evaluators / Treatment Providers
3. Topic: dropdown, required. Options: Distinguish High Conflict from Coercive Control / Mapping a Pattern of Coercive Control / Incident-Model vs Pattern-Model of Coercive Control / Customize Your Presentation
4. Your topic: short text, not required. If the booker chose Customize Your Presentation, they insert their topic here. Do not treat the dropdown label as the topic.

TidyCal already collects name and email. Do not duplicate those.

**Redirect** (Advanced > Notifications > Redirect to custom page after booking): **On.**

URL (paste exactly):

```
https://speaking.carltonresearch.com/invite?name={{contact.name}}&email={{contact.email}}&date={{booking.date}}&time={{booking.time}}&format=remote
```

This redirect is the whole point of remote: TidyCal takes the $750, then sends the host to the unlisted invitation page.

Save. Copy the public booking URL. It looks like `https://tidycal.com/<username>/lunch-and-learn-remote`.

---

### Booking type 2: In person (availability only, not paid in TidyCal)

| Setting | Value |
|---|---|
| Title | Lunch & Learn In Person |
| URL slug | lunch-and-learn-in-person |
| Description | Lunch & Learn runs 60 minutes: presentation plus questions. Fee $1,500 plus travel expenses. Travel fees quoted for the presentation location. Travel fees paid upon booking are non-refundable. Speaking fee is refundable if canceled 14 days in advance. Calendar shows availability only; payment confirms the date. Outside the USA, ask for in-person presentation rates. Not a CLE. |
| Calendar | Same Google Calendar |
| Duration | 60 minutes (this is the presentation, not the travel day) |
| Location | Custom location / in person. Text: Presentation location named by the host. Travel quoted after the city is named. |
| Pricing | Free. $0. Do not collect $1,500 in TidyCal. Do not collect travel in TidyCal. |
| How far in advance | 180 days |
| Minimum booking notice | 14 days |
| Availability interval | 30 minutes |
| Padding / gap between bookings | 0 (the travel day is blocked on the calendar, not as TidyCal padding) |
| Booking limits | 1 per day |
| Allow rescheduling | On. Allow rescheduling up to **14 days** before the booking. |
| Allow cancellations | On. |
| Require approval | Off. The TidyCal slot is a hold. Payment later confirms the date. |
| Group bookings | Off |
| Redirect | **Off.** Do not redirect. Travel and the speaking fee have not cleared. |

**Availability:** Same weekly windows as remote.

**Questions:**

1. Organization: short text, required
2. Audience: dropdown, required. Same four options as remote
3. Topic: dropdown, required. Same four topics as remote
4. City and state of the presentation: short text, required
5. Your topic: short text, not required. If the booker chose Customize Your Presentation, they insert their topic here. Do not treat the dropdown label as the topic.

Save. Copy the public booking URL. It looks like `https://tidycal.com/<username>/lunch-and-learn-in-person`.

### Two-day hold (in person only)

TidyCal cannot natively block the day before a 60-minute slot. Grok Bot must do this on the connected Google Calendar after every in-person booking:

1. Presentation day: the 60-minute TidyCal event already writes to the calendar.
2. Travel day: create an **all-day busy** event on the same Google Calendar for the calendar day **immediately before** the presentation. Title: `Travel hold: Lunch & Learn`. Busy / not free. No guests.

Those two days are the hold: one day before for travel, plus the day of the presentation.

If the host never pays travel plus the $1,500, cancel the TidyCal booking and delete the travel-hold calendar event.

After payment of travel plus the speaking fee, email the host:

```
https://speaking.carltonresearch.com/invite?format=in-person
```

Send the travel quote within two business days of the TidyCal hold.

### Paste the URLs into the app

Edit `src/lib/booking.ts`:

- `TIDYCAL_REMOTE` = the public remote URL
- `TIDYCAL_IN_PERSON` = the public in-person URL

Commit. Deploy. Until those strings are non-empty, the Book the Presentation options fall back to mailto:carisa@carltonresearch.com with the packet in the body.

### Invitation page is unlisted and not indexed

`https://speaking.carltonresearch.com/invite` is a private tool for hosts who have already booked.

- Do not link `/invite` from the speaking page, header, footer, WordPress, Observatory, Instruments, Tracker, or any sitemap.
- Do not add it to Google Search Console.
- `public/robots.txt` already has `Disallow: /invite`. Keep that.
- The invite route already sends `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">`.
- In Cloudflare, add a Configuration Rule: URI Path contains `/invite` then set response header `X-Robots-Tag` = `noindex, nofollow, noarchive`.
- The only paths to this page: TidyCal remote redirect after payment, and a private email after in-person fees clear.

### Quote page is unlisted and not indexed

`https://speaking.carltonresearch.com/quote` is the in-person travel quote form.

- Do not link `/quote` from WordPress, header, footer, Observatory, Instruments, Tracker, or any sitemap.
- The only public path to this page is the In Person button Request a travel quote on the speaking page.
- `public/robots.txt` already has `Disallow: /quote`. Keep that.
- The quote route already sends noindex robots meta.
- In Cloudflare, add the same X-Robots-Tag rule for URI Path contains `/quote`.

**Quote email delivery is ON.** Carisa authorized Google Workspace OAuth on 15 September 2026.

Workspace mail for this product:

- From: `Carlton Research, LLC <carisa@carltonresearch.com>`
- Reply-To on quote mail: the host who submitted the form
- To: `carisa@carltonresearch.com`
- Domain: `carltonresearch.com`
- Auth: Google OAuth, scope `gmail.send`, Internal consent
- Cloud project name: CR Grok Build Mail (`cr-grok-build-mail`)
- Do not enable 2FA. Do not use App Passwords.
- Do not send as `mscarisa@gmail.com`. That inbox is only where she reads forwarded mail.
- `insights@carltonresearch.com` is an alias for Insights-branded mail only. Lunch & Learn sends as `carisa@`.
- Do not inject an outreach signature on quote-request mail.
- Do not use Zoho. Do not store passwords in Excel. Do not commit secrets.

Public env (safe to set on the host):

```
MAIL_FROM=carisa@carltonresearch.com
MAIL_DOMAIN=carltonresearch.com
MAIL_AUTH=google_oauth
MAIL_ALIAS_INSIGHTS=insights@carltonresearch.com
QUOTE_TO=carisa@carltonresearch.com
```

Host secrets (already set, never in git):

```
GOOGLE_OAUTH_CLIENT_ID
GOOGLE_OAUTH_CLIENT_SECRET
GOOGLE_OAUTH_REFRESH_TOKEN
```

Confirm those three exist on the speaking host. Redeploy. Do not print them. Do not paste them into GitHub.

If they are missing, stop and tell Carisa. Do not fall back to SMTP or App Passwords.

After deploy, submit one test on `https://speaking.carltonresearch.com/quote`. Confirm `carisa@carltonresearch.com` receives `Travel quote request:` and that Reply-To is the test host.

In-person dates are not held on TidyCal from the public site. After a quote is accepted and paid, hold two days on the Google Calendar: the presentation day plus the day before for travel. Then email the host `https://speaking.carltonresearch.com/invite?format=in-person`.

### Verify before handing off

1. Open the remote URL in a private window. Confirm $750, 60 minutes, 14-day notice, the four questions, Stripe checkout.
2. Complete a $1 test only if Carisa authorizes a test charge. Otherwise stop at the checkout screen and confirm the price is $750.
3. After a real remote booking, confirm the browser lands on `speaking.carltonresearch.com/invite` with name, email, date, time, and format=remote filled.
4. Open the in-person URL. Confirm $0, city question present, **no** redirect, **no** Stripe.
5. After a test in-person hold, confirm the travel-hold all-day busy event exists on the day before.
6. Submit one test on `https://speaking.carltonresearch.com/quote`. Confirm Carisa receives the quote request at `carisa@carltonresearch.com` and that Reply-To is the test host.

### What Grok Bot does not do

- Do not iframe TidyCal on WordPress.
- Do not collect travel in TidyCal.
- Do not turn on redirect for in-person.
- Do not mention Fenlowe Press.
- Do not create a third booking type for CLE.
- Do not link `/invite` from any public page.
- Do not link `/quote` from WordPress or any public menu.
- Quote email is ON via Workspace Gmail OAuth. Keep `GOOGLE_OAUTH_*` on the host only.
- Do not enable 2FA. Do not use App Passwords.
- Do not send as mscarisa@gmail.com.

## Copy rules already in the app

- No dummy subjects (it is, there is, there are)
- No em dashes or en dashes
- American English
- Codebook is Title Case
- Not a CLE.
- Footer: Lunch & Learn is a proprietary program of Carlton Research, LLC. All rights reserved. Not a CLE.

## Brand

Carlton Research, LLC
Principal: Carisa Carlton, M.A.
Fonts: Playfair Display (H1, all caps, #090a0c), Nunito (H2/body, #1e2d40)
Colors: #dbb28b #d7a975 #090a0c #1e2d40 #4a5567 #84919a #f3f0eb #f8f7f3 #ffffff #6f2430
