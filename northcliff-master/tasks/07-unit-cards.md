# Task 07 — Unit summary cards before PDFs

**Tier:** 2
**Type:** CREATE

## Problem
Floor plan thumbnails currently link straight to "Open Detailed PDF." Most prospects won't open a PDF on mobile — and even on desktop, it's a heavy commitment for a casual browser.

## Goal
Add a clean summary card for each unit type *before* the PDF link, giving the at-a-glance info renters actually want.

## Card content (per unit type)
- Unit name (e.g. "3 Bedroom Residence")
- Bedrooms / bathrooms
- Estimated square footage
- Parking included (garage/carport/surface)
- Key features (private patio, in-unit laundry, etc.)
- "Ask About This Unit" button → opens form pre-filled with unit selection
- "View Detailed Plan" button → existing PDF link or full image

## Card hierarchy
```
[Floor Plan Thumbnail Image]
3 Bedroom · 2 Bath · ~1,250 sqft
Private patio · Attached garage · In-unit laundry
[Ask About This Unit] [View Detailed Plan]
```

## Layout
Grid of cards (2 columns desktop, 1 column mobile). Each card has the thumbnail prominently at the top.

## Unit types to cover (based on current site)
- 1 Bedroom (if it exists — confirm)
- 2 Bedroom (if it exists — confirm)
- 3 Bedroom Residence
- Building A/B First Floor (multi-unit overview)
- Building A/B Second Floor
- Building C/D First Floor
- Building C/D 3 Bedroom
- Garage & Carport (parking overview)

Consider whether all of these should appear as user-facing cards, or whether some (building-level plans) belong in a separate "Detailed Plans" section.

## Acceptance criteria
- [ ] Each unit type has a summary card with at-a-glance specs
- [ ] "Ask About This Unit" pre-fills the lead form with unit selection
- [ ] PDF link still available for those who want detail
- [ ] Cards are visually consistent and mobile-responsive
