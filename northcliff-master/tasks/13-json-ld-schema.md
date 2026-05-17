# Task 13 — JSON-LD schema markup

**Tier:** 3
**Type:** ADD

## Problem
The site has no structured data. Google, Bing, and AI search engines (ChatGPT, Perplexity, Google AI Overview) rely on schema markup to understand what kind of business you are. Without it, you're invisible to a growing portion of search.

## Goal
Add JSON-LD blocks for the key entity types so search engines and AI assistants can correctly represent NorthCliff Commons in results.

## Schema types to add

1. **ApartmentComplex** — primary entity type for the property
2. **LocalBusiness** — for Jennifer's leasing contact / sales operations
3. **Place** — physical location data
4. **PostalAddress** — embedded in the above
5. **ContactPoint** — Jennifer's contact details
6. **FAQPage** (after Task 10 is done) — to get FAQ rich results

## Implementation
Add a `<script type="application/ld+json">` block to the `<head>` of each page. See `snippets/json-ld-schema.html` for ready-to-paste starter blocks.

## Key fields to include
- Name: "NorthCliff Commons"
- Description (matches meta description)
- Address: 1220 Jones St., Shelton, WA 98584
- Geo coordinates (find with Google Maps)
- Telephone: +1-360-229-1220
- Email: jennifer@sentrypark.com
- Number of units: 43
- Opening date: 2027-12-01
- Image URLs (use absolute URLs)

## Testing
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org validator: https://validator.schema.org/

## Acceptance criteria
- [ ] JSON-LD block in `<head>` of homepage
- [ ] Passes Google Rich Results test with zero errors
- [ ] Includes ApartmentComplex, LocalBusiness, and FAQPage (after Task 10)
- [ ] All URLs in the schema are absolute (not relative)
- [ ] Geo coordinates are accurate
