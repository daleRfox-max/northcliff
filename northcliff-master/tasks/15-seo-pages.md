# Task 15 — Separate URL pages for SEO

**Tier:** 3
**Type:** CREATE

## Problem
The site is a one-pager. One-pagers rank for one set of keywords at best. Each independent page is a fresh chance to rank for different searches.

## Approach: additive, not destructive
**Keep the one-pager design as the homepage.** Add separate pages as additional ranking surfaces. Don't gut the visual flow — extend it.

## Pages to create

### /floor-plans
- All unit cards (Task 07) in detail
- Image gallery of each plan
- "Ask About This Unit" form per card
- Target keyword: "apartment floor plans Shelton WA"

### /location
- Embedded Google Map
- Description of the neighborhood, Mason County, distances to key services
- Nearby amenities list (grocery, parks, schools, hospitals, Highway 101 access)
- Target keyword: "apartments in Shelton WA location"

### /leasing
- Full lead form
- Jennifer's bio + photo (if available)
- Leasing process explanation
- FAQ specifically about leasing/timing
- Target keyword: "apartment leasing Shelton WA"

### /contact
- Already exists at `/contact.html` — migrate to `/contact` with the real backend form (Task 01)

### /apartments-shelton-wa (SEO landing page)
- Built specifically for local search
- Long-form copy: 800–1200 words about Shelton, Mason County living, what NorthCliff Commons offers, why local apartments matter
- Internal links to floor plans, location, leasing pages
- Target keyword: "apartments in Shelton WA"

### /about
- Builder story (Task 11)
- F&S Construction info
- Why a local builder matters
- Target keyword: "Shelton WA apartment developer"

### /progress (optional, if Task 12 grows into a blog)
- Construction timeline (Task 12)
- Monthly progress posts as individual URLs: `/progress/foundation-complete`, etc.

## Implementation notes
- Use consistent header/footer/nav across all pages
- Add breadcrumbs (good for SEO + UX)
- All pages link back to the homepage and to each other where logical
- Each page gets its own meta tags (Task 14) and is included in sitemap.xml (Task 19)
- Each page gets relevant JSON-LD schema (Task 13)

## Acceptance criteria
- [ ] All 6 pages live and accessible
- [ ] Homepage still has the full one-pager design
- [ ] Navigation updated to include new pages
- [ ] Each page has unique meta tags
- [ ] Internal links between pages are clean
- [ ] No broken links from the old `/contact.html`
- [ ] sitemap.xml includes all new URLs
