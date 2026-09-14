# Handoff for Grok Bot

Lunch & Learn for Carlton Research, LLC.

Repository: https://github.com/ninossantos/carlton-research-speaking

Public host: https://speaking.carltonresearch.com/

This repository is the speaking app. This is not the Coercive Control Observatory. This is not Instruments. This is not the Law Tracker. This is not Fenlowe Press. Do not merge this product into any other subdomain.

## Task

1. Deploy this repository so https://speaking.carltonresearch.com/ serves the app. Same Cloudflare CNAME pattern as instruments and tracker. Cloudways hosts WordPress only.
2. WordPress (Kadence, Cloudways): add one menu item. Title: Lunch & Learn. URL: https://speaking.carltonresearch.com/
3. Do not iframe this app. Do not paste React source into WordPress. Do not add a second menu item. Do not put Lunch & Learn inside Observatory, Instruments, or Tracker navigation as a tab of those products.
4. Do not mention Fenlowe Press anywhere.

## TidyCal (Carisa sets these up, then paste URLs)

Edit `src/lib/booking.ts`:

- `TIDYCAL_REMOTE` — one event, 60 minutes, $750 payable upon booking. Cancel 14 days ahead: full refund. Change date and time 14 days ahead: permitted, no change fees. Cancellation or change less than 14 days ahead: no refund or change permitted.
- `TIDYCAL_IN_PERSON` — availability only. Block two full consecutive calendar days. Do not collect travel in TidyCal. Travel quoted for the presentation location. Travel fees paid upon booking are non-refundable. Speaking fee $1,500 is refundable if canceled 14 days in advance. TidyCal shows availability only; payment confirms the date. Outside the USA, ask for in-person prices. Published prices apply to remote presentations regardless of location.

Until those strings are non-empty, the booking doors fall back to mailto:carisa@carltonresearch.com with the packet in the body.

TidyCal intake fields to collect: organization, host name, email, talk title, audience (attorneys / judges / evaluators / treatment providers), city (in-person only), preferred week.

After a TidyCal in-person hold, send the travel quote within two business days. Payment of travel plus the speaking fee confirms the date.

## Invite after payment

The invite does not live on the homepage. Hosts build it at https://speaking.carltonresearch.com/invite after the date locks and the fee clears.

TidyCal can redirect there. This account is on TidyCal Pro, so redirect is available. Do not add a new platform.

For the remote paid booking type:

1. Booking types → edit the remote event → Advanced → Notifications.
2. Toggle Redirect to custom page after booking.
3. URL:

`https://speaking.carltonresearch.com/invite?name={{contact.name}}&email={{contact.email}}&date={{booking.date}}&time={{booking.time}}&format=remote`

For the in-person availability type, do not auto-redirect. Travel and the speaking fee have not cleared yet. After both fees clear, email the host:

`https://speaking.carltonresearch.com/invite?format=in-person`

## Copy rules already in the app

- No dummy subjects (it is, there is, there are)
- No em dashes or en dashes
- American English
- Codebook is Title Case
- Not a CLE.
- Footer: Not diagnostic of a pattern of coercive control. Not legal advice. Carlton Research does not perform clinical evaluations and does not recommend parenting time.

## Brand

Carlton Research, LLC
Principal: Carisa Carlton, M.A.
Fonts: Playfair Display (H1, all caps, #090a0c), Nunito (H2/body, #1e2d40)
Colors: #dbb28b #d7a975 #090a0c #1e2d40 #4a5567 #84919a #f3f0eb #f8f7f3 #ffffff #6f2430
