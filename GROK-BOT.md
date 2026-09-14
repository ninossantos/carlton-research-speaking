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

- `TIDYCAL_REMOTE` — one event, 60 minutes, payment $750 required at booking (Stripe through TidyCal). Cancellation policy: 14 days for a full refund; date changes require 14 days. Inside 14 days the fee stays and the date stays.
- `TIDYCAL_IN_PERSON` — availability only. Block two full consecutive calendar days. Do not collect travel in TidyCal. Travel is quoted after the city is named. Speaking fee $1,500 plus travel, both due before the date locks. Travel is non-refundable. Outside the USA, ask for in-person prices. Published prices apply to remote presentations regardless of location.

Until those strings are non-empty, the booking doors fall back to mailto:carisa@carltonresearch.com with the packet in the body.

TidyCal intake fields to collect: organization, host name, email, talk title, who attends (attorney / judge / office manager / human resources), city (in-person only), preferred week.

After a TidyCal in-person hold, send the travel quote within two business days. The date locks when both the $1,500 and the quoted travel clear.

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
