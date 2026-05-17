# Task 03 — Sticky mobile contact bar

**Tier:** 1
**Type:** CREATE

## Problem
Mobile users have to scroll to find Jennifer's contact info or the form. Every scroll is a drop-off opportunity.

## Goal
Floating bottom bar visible on all mobile screens (hidden on desktop) with 4 actions: **Call | Text | Email | Join List**.

## Implementation
1. Fixed-position bar at `bottom: 0`, full width, hidden on viewport widths above 768px.
2. Four equal-width buttons. Use icons + short labels.
3. Tap behaviors:
   - **Call** → `tel:+13602291220`
   - **Text** → `sms:+13602291220`
   - **Email** → `mailto:jennifer@sentrypark.com` (here mailto is fine — it's a direct shortcut, not a form replacement)
   - **Join List** → smooth-scroll to the lead form anchor `#leasing-form`
4. Add subtle drop shadow above the bar so it visually separates from content.
5. Add `padding-bottom: 64px` (or whatever the bar height is) to the body on mobile so the bar doesn't cover content.

## Styling notes
- Background: dark (matches site palette) with white icons/text
- Height: ~60px
- Sits above any other floating element
- Z-index: 50+
- Smooth show/hide on scroll is optional but nice

## Acceptance criteria
- [ ] Bar visible on mobile (<768px), hidden on desktop
- [ ] All 4 buttons work as specified
- [ ] Bar doesn't cover footer or form fields
- [ ] Tap targets are 44px+ tall (Apple HIG minimum)
- [ ] Works in both portrait and landscape
