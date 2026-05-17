# Full Master List — Rationale & Priorities

This is the merged, deduplicated, prioritized list combining two independent audits (ChatGPT and Claude) of https://northcliff.vercel.app.

---

## Tier 1 — Conversion fundamentals (highest impact)

### 1. Replace mailto contact form with real backend [CREATE]
The current `/contact.html` opens the user's default mail app via `mailto:`. A large percentage of users abandon at that step — they don't have their mail app set up, they're on a work computer, or they just don't want the friction. Replace with a Vercel serverless function that posts to Resend, Formspree, SendGrid, or Web3Forms. Add a hidden honeypot field for spam. Auto-send a confirmation email to the prospect so they feel the submission landed.

**Why this is #1:** This is probably the single biggest leak in your funnel. Every other improvement is downstream of fixing this.

### 2. Add lead form above the fold on the homepage [CREATE]
Don't make people click to `/contact.html`. Embed the form right on the homepage with fields: name, phone, email, desired move-in timing, unit type (1BR/2BR/3BR), notes. Duplicate it in the leasing section near the bottom.

### 3. Sticky mobile contact bar [CREATE]
Floating bottom bar on phones: **Call | Text | Email | Join Interest List**. Most renters search on mobile. This alone will lift conversions noticeably.

### 4. Rewrite hero section with specifics [EDIT]
Current: *"A bright new luxury apartment community coming to 1220 Jones St."*

Replace with something concrete:
> **"43 new luxury apartments in Shelton, WA — 1, 2, and 3 bedrooms with private patios, garages, and Mason County quiet. Now accepting leasing interest. Opening December 2027."**

Get the unit count, bedroom mix, key amenity, location, and opening date visible without scrolling.

### 5. Stronger primary CTA copy [EDIT]
Replace *"Inquire About Leasing"* with **"Join the Priority Leasing List"** or **"Get Availability Updates"** — softer commitment, higher click-through for a project 1.5+ years out.

### 6. Waitlist capture form [CREATE]
Lower-friction than the full lead form. Just name + email + bedroom preference. Pipe submissions to Google Sheets via webhook, Mailchimp, or ConvertKit so Jennifer can nurture monthly. This is the bridge between "interested" and "ready to lease."

---

## Tier 2 — Content depth

### 7. Unit summary cards before PDFs [CREATE]
Currently plan thumbnails dump straight into "Open Detailed PDF." Add a card layer first showing: bedroom/bath count, est. square footage, parking, expected price range (if shareable), then "View Floor Plan" and "Ask About This Unit." PDFs become the detail layer, not the entry point.

### 8. Visual floor plan thumbnails replace text PDF links [EDIT]
Floor plan jpgs already exist on the page — make them the clickable card with a clear "View Full Plan" CTA, instead of the current text-heavy layout that buries the visual.

### 9. Renter-focused amenities cards [CREATE]
Don't just describe — itemize. Quick visual cards:
- New construction (2027)
- Private balconies / patios
- Garage & covered parking
- In-unit laundry *(only if accurate — confirm)*
- Modern kitchens
- Quiet Mason County residential setting
- 1, 2, and 3 bedroom options

### 10. FAQ section [CREATE]
Common renter questions, each ending with a soft CTA back to the form:
- When does NorthCliff Commons open?
- How do I join the priority leasing list?
- Where is it located? What's nearby?
- Is parking / a garage available?
- What floor plans are offered?
- When will pricing be announced?
- Who do I contact for leasing?

### 11. About the Development / Builder section [CREATE]
You're the developer AND the GC — that's huge trust capital. Short block: F&S Construction, Mason County roots, local builder doing local apartments. Faceless out-of-area developers lose to this every time. Both audits flagged this as underweighted.

### 12. Construction progress timeline [CREATE]
December 2027 opening means people need a reason to come back. Visual timeline:
🔲 Groundbreaking → 🔲 Foundation → 🔲 Framing → 🔲 Exterior → 🔲 Pre-leasing → ✅ Grand Opening

Update with photos as you go. Doubles as monthly email content for Jennifer to send the waitlist. Huge SEO bonus too.

---

## Tier 3 — SEO & technical (compounding long-term)

### 13. JSON-LD schema markup [ADD]
Add structured data blocks for: `ApartmentComplex`, `LocalBusiness`, `PostalAddress`, `ContactPoint`, and `Place`. This is what gets you into Google rich results, Maps, and AI answer engines (ChatGPT, Perplexity, Google AI Overview). Starter code in `snippets/json-ld-schema.html`.

### 14. Page titles & meta descriptions for local search [EDIT]
Current title is fine but generic. Target real search queries:
- "New apartments in Shelton WA"
- "Apartments for rent Shelton Washington"
- "Luxury apartments Mason County"
- "NorthCliff Commons Shelton"

Each page needs its own title and meta description.

### 15. Separate URL pages for SEO [CREATE]
Currently it's a one-pager. Break out into:
- `/floor-plans`
- `/location`
- `/leasing`
- `/contact`
- `/apartments-shelton-wa` (SEO landing page)
- `/about` (the builder story)

Each ranks independently. **Important caveat:** keep the homepage as the visual one-pager too — these are additive, not a replacement. Losing the one-page feel would hurt design quality.

### 16. Dedicated 1200x630 Open Graph image [CREATE]
Right now shared links pull the building rendering, which is fine but unbranded. Make a real OG image with the NorthCliff logo, "Now Pre-Leasing," "Opening Dec 2027," 1220 Jones St. Add Twitter card meta tag too.

### 17. Optimize images for performance [EDIT]
Convert floor plan and rendering JPGs to WebP or AVIF. Add `loading="lazy"` to everything below the fold. Current images are likely oversized for mobile and hurt Core Web Vitals — which directly affects local search rankings.

### 18. Alt text with local SEO keywords [EDIT]
Naturally work "Shelton WA apartments," "Mason County apartment," "3 bedroom apartment Shelton" into image alt text where it fits.

### 19. sitemap.xml and robots.txt [ADD]
Confirm Vercel is generating these; if not, add them manually.

### 20. Analytics + pixel install [ADD]
Vercel Analytics or Plausible (free, lightweight) + Meta Pixel + Google Tag. You'll want this in place *before* you start running ads.

---

## Tier 4 — Polish

### 21. Make contact info visually louder [EDIT]
Jennifer's name, number, and email are present but understated. Bigger type, more prominent placement, every instance is a tap-to-call `tel:` or `mailto:` link.

### 22. Conversion copy rewrite [EDIT]
Replace generic phrases with renter-pull language:
> *"Be among the first to receive floor plan releases, pricing updates, construction progress, and leasing availability for NorthCliff Commons."*

Apply this voice across the leasing and waitlist sections.

### 23. Photo gallery with lightbox [ADD]
Renderings + finish boards (kitchen materials, bath samples, flooring) + site plan aerial + neighborhood photos. Use PhotoSwipe or a simple React lightbox.

---

## Where the two audits disagreed

- **ChatGPT didn't catch the mailto form problem.** Now item #1 — it's a real conversion leak, not a polish item.
- **ChatGPT recommended fully separating into multi-page.** Better answer: keep the one-pager design AND add SEO landing pages. Going pure multi-page on a project this visual would feel like a downgrade.
- **Claude's original list included more on Vercel Analytics, Meta Pixel, schema specifics, image optimization.** ChatGPT was lighter on technical/performance.
- **ChatGPT was stronger on the amenities-card structure, FAQ specifics, and CTA wording.** All incorporated.
