# Task 08 — Visual floor plan thumbnails replace text PDF links

**Tier:** 2
**Type:** EDIT
**Relates to:** Task 07

## Problem
The current floor plan section has thumbnails but they're competing with text-heavy descriptions and the "Open Detailed PDF" CTA. The plan images already exist on disk — they should be the star of the section, not a sidekick.

## Goal
Make the floor plan images the dominant visual element, with cleaner card structure (per Task 07).

## Changes
1. Increase floor plan image size — currently they feel small and supplementary.
2. Make the entire card clickable (not just the thumbnail).
3. Click behavior: open a lightbox (Task 23) or expand to full-size image, *not* a PDF download by default.
4. Move "Open Detailed PDF" to a secondary text link below the image (still available, just not the primary action).
5. Add subtle hover effects: image lifts slightly, overlay shows "View Plan" on hover.

## Image specs
- Convert JPGs to WebP (Task 17)
- Thumbnail: 800x600 displayed, served at 1600x1200 for retina
- Maintain aspect ratio
- Subtle border or shadow to separate from background

## File locations on current site
```
/assets/plans/detailed-clean/3-bedroom-detailed.jpg
/assets/plans/detailed-clean/building-a-first-floor-detailed.jpg
/assets/plans/detailed-clean/building-a-second-floor-detailed.jpg
/assets/plans/detailed-clean/building-c-d-3-bedroom-detailed.jpg
/assets/plans/detailed-clean/building-c-d-first-floor-detailed.jpg
/assets/plans/detailed-clean/garage-carport-detailed.jpg
```

## Acceptance criteria
- [ ] Floor plan images are visually dominant in the section
- [ ] Clicking the card opens an enlarged view (lightbox or full image)
- [ ] PDF link is still available but secondary
- [ ] Hover/tap interactions are smooth
- [ ] Mobile layout doesn't crowd the images
