# Task 18 — Alt text with local SEO keywords

**Tier:** 3
**Type:** EDIT

## Problem
Alt text is currently descriptive but doesn't include location-based keywords. Image search and AI-driven search are increasingly important — alt text helps both.

## Goal
Rewrite alt text to be:
1. Accurate and descriptive (for accessibility — this is the primary purpose)
2. Naturally include location keywords where genuinely relevant
3. Avoid keyword stuffing

## Examples

### Hero rendering
**Before:** `Rendering of NorthCliff Commons apartment building with beige siding, rust-brown accents, black balconies, and evergreen surroundings`
**After:** `NorthCliff Commons apartment building in Shelton, WA — beige siding with rust-brown accents, black balconies, and Pacific Northwest evergreens`

### 3-bedroom floor plan
**Before:** `Detailed three-bedroom apartment floor plan showing room labels, dimensions, baths, closets, laundry, and stairs`
**After:** `3 bedroom apartment floor plan at NorthCliff Commons Shelton WA — shows room dimensions, two bathrooms, closets, laundry, and stair locations`

### Building A/B first floor
**Before:** `Detailed Building A and B first floor plan...`
**After:** `Building A and B first floor plan at NorthCliff Commons Shelton — kitchens, living rooms, bedrooms, baths, entries, and private patios`

### Garage plan
**Before:** `Detailed garage and carport plan...`
**After:** `Garage and carport parking plan at NorthCliff Commons apartments Shelton WA — bay divisions, dimensions, and structural footprint`

## Rules
- Don't repeat the exact same alt text across multiple images
- Don't write `Shelton WA apartments Shelton WA apartments` — Google penalizes that
- Stay under 125 characters where possible
- For purely decorative images, use `alt=""` (not missing) so screen readers skip them
- Use sentence case, not Title Case

## Acceptance criteria
- [ ] Every content image has descriptive, keyword-natural alt text
- [ ] No two images share identical alt text
- [ ] Decorative images correctly use `alt=""`
- [ ] Alt text reads naturally if read aloud by a screen reader
