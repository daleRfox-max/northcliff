# Task 12 — Construction progress timeline

**Tier:** 2
**Type:** CREATE
**Maintenance:** Ongoing — update monthly

## Problem
December 2027 is far away. Visitors today have no reason to come back next month. Without a return-visit mechanism, you lose the slow-build audience.

## Goal
A visual construction timeline showing milestones (past, current, upcoming), updated monthly with photos. Doubles as monthly newsletter content for the waitlist.

## Timeline structure

```
🟢 [DONE]      Site Prep & Permitting
🟢 [DONE]      Groundbreaking
🟡 [CURRENT]   Foundation Work
⚪ [UPCOMING]  Framing                  — Est. Q3 2026
⚪ [UPCOMING]  Roofing & Exterior        — Est. Q1 2027
⚪ [UPCOMING]  Interior Finishes         — Est. Q3 2027
⚪ [UPCOMING]  Pre-Leasing Opens         — Est. Oct 2027
⚪ [UPCOMING]  Grand Opening             — Dec 2027
```

Each milestone is a card with:
- Status indicator (done / in progress / upcoming)
- Milestone name
- Estimated or actual date
- Optional photo from that phase
- Optional short blurb ("Foundation complete on Building A and B")

## Behavior options
- **Static page section** — simple, just update HTML monthly
- **Blog/posts approach** — each milestone gets a dedicated post (good for SEO)
- **Interactive timeline** — hover/tap reveals photos and details (more design work)

**Recommended:** Start static, add blog functionality once you have 3+ posts of momentum.

## Photo strategy
- Drone shot from same angle each month — shows literal building progress
- Detail shots: foundation pour, framing milestone, etc.
- Optional: short video clips embedded as GIFs
- Watermark photos with NorthCliff logo for social sharing

## Email integration
Pair each timeline update with a monthly newsletter to the waitlist (Task 06). "Progress Update: Foundation Complete" type subject lines.

## SEO bonus
- Each timeline post can be its own URL: `/progress/foundation-complete`
- Adds fresh content for Google
- Local search loves construction project pages

## Acceptance criteria
- [ ] Timeline section live with current state
- [ ] At least 4 milestones documented
- [ ] At least 1 photo per completed milestone
- [ ] Process documented for who updates it monthly
- [ ] Integrates with waitlist email cadence
