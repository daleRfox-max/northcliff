# Task 16 — Dedicated 1200x630 Open Graph image

**Tier:** 3
**Type:** CREATE

## Problem
When someone shares the site link in a text, Facebook post, or email, the link preview uses whatever image is set as `og:image`. Currently it pulls the building rendering — fine, but unbranded and not optimized.

## Goal
A purpose-built 1200x630 image that:
- Includes the NorthCliff Commons logo
- Says "Now Pre-Leasing" or "Opening December 2027"
- Shows the building rendering as background
- Includes the address (1220 Jones St., Shelton WA)
- Looks polished and intentional

## Specs
- **Dimensions:** 1200 × 630 pixels (Facebook/LinkedIn/iMessage standard)
- **File format:** JPG or PNG, optimized to <300KB
- **Filename suggestion:** `northcliff-og-image.jpg`
- **Location:** `/assets/og/northcliff-og-image.jpg`

## Tools for creating
- Figma (free, browser-based)
- Canva (templates available)
- Photoshop / Affinity / Pixelmator
- Or commission a designer for one-time premium look

## HTML to add (head of every page)
```html
<!-- Open Graph -->
<meta property="og:title" content="NorthCliff Commons | New Apartments in Shelton, WA">
<meta property="og:description" content="43 new luxury apartments in Shelton, WA. Opening December 2027.">
<meta property="og:image" content="https://northcliff.vercel.app/assets/og/northcliff-og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://northcliff.vercel.app">
<meta property="og:type" content="website">
<meta property="og:site_name" content="NorthCliff Commons">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="NorthCliff Commons | New Apartments in Shelton, WA">
<meta name="twitter:description" content="43 new luxury apartments in Shelton, WA. Opening December 2027.">
<meta name="twitter:image" content="https://northcliff.vercel.app/assets/og/northcliff-og-image.jpg">
```

## Test after deploying
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
- iMessage: text the link to yourself and confirm preview looks right

## Per-page variants (optional but premium)
- Homepage: hero/branded image
- /floor-plans: floor plan visual + "View Plans"
- /location: map + address
- /about: builder/team image

## Acceptance criteria
- [ ] 1200x630 OG image created and uploaded
- [ ] OG and Twitter meta tags added to every page
- [ ] Image renders correctly when link is shared on Facebook, iMessage, LinkedIn
- [ ] File size <300KB
- [ ] Image is on-brand and includes core info
