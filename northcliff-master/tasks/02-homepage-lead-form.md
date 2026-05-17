# Task 02 — Add lead form above the fold on homepage

**Tier:** 1
**Type:** CREATE
**Depends on:** Task 01 (backend must exist first)

## Problem
The lead form lives at `/contact.html`. Users have to click away from the homepage to inquire — significant drop-off.

## Goal
Embed the lead form directly on the homepage, visible without scrolling on desktop and reachable within one scroll on mobile. Duplicate it lower in the leasing section.

## Implementation
1. Build a reusable form component (React) or include block (HTML) that POSTs to `/api/contact`.
2. Place one instance in the hero section (right column or directly below hero text).
3. Place a second instance in the existing "Leasing" section near the bottom of the page.
4. Both forms should share the same backend endpoint and confirmation flow.

## Layout suggestions
- **Desktop hero:** Two-column layout. Left: rendering + hero copy + CTAs. Right: compact 4-field form (name, email, phone, "I'm interested in" dropdown).
- **Mobile:** Form moves below the hero copy. Keep it tight — no more than 4 fields visible by default with optional "Add details" expander.

## Fields (homepage version — keep short)
- Name
- Email
- Phone
- Unit interest (dropdown)
- Submit button: "Get Availability Updates"

The longer form at `/contact.html` can stay as the "full inquiry" experience.

## Acceptance criteria
- [ ] Form visible above the fold on desktop
- [ ] Form reachable within one scroll on mobile
- [ ] Submitting works end-to-end (same backend as Task 01)
- [ ] Same form appears in the leasing section near the bottom
- [ ] Mobile keyboard behavior is correct (email field triggers email keyboard, phone field triggers number pad)
