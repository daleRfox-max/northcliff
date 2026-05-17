# Task 21 — Make contact info visually louder

**Tier:** 4
**Type:** EDIT

## Problem
Jennifer's name, phone, and email are present but visually understated. They blend in with surrounding text. For a contact-driven site, that's a missed opportunity.

## Goal
Make every instance of contact info visually dominant — large, clickable, and impossible to miss.

## Changes

### Leasing section
- Make Jennifer's name a larger heading (h2 or h3 weight)
- Phone number: large, bold, clearly tappable
- Email: large, bold, clearly tappable
- Add a photo of Jennifer if available (humanizes the contact)
- Surround with extra white space — let it breathe

### Footer
- Phone and email already prominent — verify both are real `tel:` and `mailto:` links
- Add hours if applicable (e.g., "Available 9 AM – 6 PM PT")

### Header / nav
- Consider adding a small "Call: 360-229-1220" link in the top-right of the nav on desktop
- On mobile, the sticky bar (Task 03) handles this

### Floor plan cards (Task 07)
- Each "Ask About This Unit" button should also have a fallback "or call Jennifer at 360-229-1220" line below it

## Technical
- All phone numbers: `<a href="tel:+13602291220">360-229-1220</a>`
- All emails: `<a href="mailto:jennifer@sentrypark.com">jennifer@sentrypark.com</a>`
- Add `aria-label` for screen readers: `aria-label="Call Jennifer Fox at 360-229-1220"`

## Acceptance criteria
- [ ] Jennifer's contact info is visually dominant in the leasing section
- [ ] Every phone number is a `tel:` link
- [ ] Every email is a `mailto:` link
- [ ] Photo of Jennifer added if available
- [ ] Contact info accessible from every page (footer minimum)
