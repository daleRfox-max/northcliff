# Task 23 — Photo gallery with lightbox

**Tier:** 4
**Type:** ADD

## Problem
The site has only the exterior rendering and floor plan images. Renters want to see more — finishes, surroundings, the neighborhood, the team. A proper gallery dramatically improves perceived quality.

## Goal
A photo gallery section with a lightbox for full-screen viewing.

## Content to include (in priority order)
1. **Exterior renderings** — multiple angles (front, side, courtyard)
2. **Interior renderings** — living rooms, kitchens, bedrooms, bathrooms
3. **Finish boards** — kitchen materials, bath materials, flooring options
4. **Site plan aerial** — bird's-eye view of all 4 buildings + parking + landscaping
5. **Neighborhood photos** — Shelton/Mason County context (parks, downtown, water views)
6. **Construction progress photos** (from Task 12)
7. **Team photos** — Dale, Jennifer, F&S Construction team
8. **Logo / branding shots** — for press kit and social

## Implementation options

### Option A: PhotoSwipe (recommended)
- Open-source, mobile-friendly lightbox
- ~30KB
- Touch gestures, keyboard nav, zoom
- https://photoswipe.com/

### Option B: yet-another-react-lightbox
- React-native if you're on Next.js
- Simple API
- https://yet-another-react-lightbox.com/

### Option C: Custom build
- Full control, more work
- Tailwind + Headless UI for modal handling

## Layout
- Grid: 4 columns desktop, 2 columns tablet, 1 (or 2 narrow) mobile
- Masonry layout for visual interest if images have varied aspect ratios
- Thumbnails: 600x600 displayed, 1200x1200 served for retina
- Click/tap opens lightbox with full-resolution image

## Don't include
- Stock photos pretending to be the property
- Anything misleading (e.g., a "pool" image if there's no pool)
- Low-resolution renderings — better to skip than to show grainy

## Acceptance criteria
- [ ] Gallery section live with at least 8 images
- [ ] Lightbox works on desktop and mobile
- [ ] Images are lazy-loaded (Task 17)
- [ ] Captions visible in lightbox
- [ ] Keyboard navigation works (arrow keys, escape)
- [ ] All images optimized (WebP/AVIF)
- [ ] No layout shift when gallery loads
