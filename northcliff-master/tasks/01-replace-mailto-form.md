# Task 01 — Replace mailto contact form with real backend

**Tier:** 1 (highest priority)
**Type:** CREATE
**Estimated effort:** 1–2 hours

## Problem
`/contact.html` uses `mailto:` which opens the user's default mail app. Major drop-off — many users don't have mail set up, are on work computers, or just bail at the friction. This is likely the single biggest leak in the leasing funnel.

## Goal
Replace mailto with a real form submission that:
1. Posts to a backend (Vercel serverless function)
2. Sends an email to Jennifer with the lead details
3. Sends a confirmation email to the prospect
4. Optionally writes to a Google Sheet or CRM for tracking
5. Includes a hidden honeypot field for spam prevention

## Recommended stack
- **Email service:** Resend (best Vercel integration, 3k emails/month free) or SendGrid
- **Backend:** Vercel serverless function (`/api/contact.ts` or `/api/contact.js`)
- **Spam:** Honeypot field + optional Cloudflare Turnstile

## Implementation steps
1. Sign up for Resend (or SendGrid). Get API key.
2. Add `RESEND_API_KEY` to Vercel environment variables.
3. Create `/api/contact.ts` — see `snippets/contact-form-handler.ts` for starter code.
4. Update `contact.html` form to POST to `/api/contact` instead of mailto.
5. Add honeypot field (hidden input named `website` or similar — bots fill it, humans don't).
6. Add JavaScript to handle the submit, show a "Thanks, we got it!" success state.
7. Test thoroughly — submit a real lead and confirm both emails arrive.

## Form fields (recommended)
- Name (required)
- Email (required)
- Phone (required)
- Desired move-in timing (dropdown: 0-6 mo / 6-12 mo / 12+ mo / flexible)
- Unit type interest (multi-select: 1BR, 2BR, 3BR, not sure)
- Notes (optional textarea)
- Honeypot (hidden)

## Acceptance criteria
- [ ] Form POSTs to `/api/contact` (not mailto)
- [ ] Jennifer receives an email at jennifer@sentrypark.com with all field values
- [ ] Prospect receives an auto-confirmation email
- [ ] Submitting twice quickly is throttled (rate limit)
- [ ] Honeypot field catches basic bot submissions
- [ ] Success state shows in the UI, no full page reload
- [ ] Form is keyboard accessible and mobile-friendly
