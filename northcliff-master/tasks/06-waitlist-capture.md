# Task 06 — Waitlist capture (low-friction form)

**Tier:** 1
**Type:** CREATE
**Depends on:** Task 01 (backend)

## Problem
The lead form (Task 02) is great for high-intent prospects, but lower-intent visitors won't fill out a 5-field form. You need a 30-second capture path for people who are curious but not ready to "inquire."

## Goal
A 3-field waitlist form: **Name | Email | Bedroom Preference**. Submits to a list Jennifer can nurture monthly.

## Implementation options

**Option A — Use the same backend as Task 01**
Add a `formType: "waitlist"` flag in the POST body. The serverless function routes waitlist submissions to a Google Sheet or Mailchimp/ConvertKit list while still notifying Jennifer.

**Option B — Use a dedicated email marketing tool**
Embed a Mailchimp, ConvertKit, or Beehiiv signup form directly. Pro: Jennifer gets a real marketing list, with unsubscribe handling, segments, and broadcast tools built in. Con: another tool to manage.

**Recommendation:** Option B (ConvertKit or Mailchimp) — Jennifer will want broadcast/email capability anyway for monthly construction updates (see Task 12).

## Placement
- Right side of hero or below hero on mobile (Task 02 covers the primary form; this is the *secondary* lower-commitment option)
- Repeat in a dedicated "Stay Updated" section between Floor Plans and Location
- Inside the FAQ section (Task 10) under "How do I join the priority leasing list?"

## Suggested copy
> **Stay in the loop.**
> Get monthly construction updates, floor plan releases, and first access to leasing when NorthCliff Commons opens December 2027.
>
> [Name] [Email] [1BR / 2BR / 3BR / Not sure ▾]
> **Join the List**

## Acceptance criteria
- [ ] 3 fields only, completes in <30 seconds
- [ ] Submissions land in a manageable list (sheet, Mailchimp, ConvertKit, or similar)
- [ ] Jennifer notified of each new signup
- [ ] Confirmation email/state on submit
- [ ] Works on mobile keyboard
