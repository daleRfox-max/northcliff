# Claude Code Instructions — NorthCliff Master

This folder contains the prioritized action plan for improving https://northcliff.vercel.app to maximize leasing inquiries for NorthCliff Commons (43-unit apartment community, Shelton WA, opening Dec 2027).

## How to use this folder

When the user asks you to work on something from this list:

1. **Read `README.md` first** to see the full task list and current state.
2. **Open the relevant `tasks/##-*.md` file** for the item being worked on — it contains the problem, goal, implementation details, and acceptance criteria.
3. **Check `snippets/`** for starter code that can be adapted.
4. **Reference `docs/master-list.md`** for full rationale on why each task matters.

## Task numbering convention

- Tasks are tiered 1–4 by priority
- Tier 1 (conversion fundamentals) should be done first
- Tier 4 (polish) should be done last
- Some tasks have dependencies — check the "Depends on:" line at the top of each task file

## When implementing

- Match the existing site's design language (clean, modern, Pacific Northwest feel)
- Keep changes incremental — one task per PR/commit
- After each task, update `README.md` to check off the item
- Don't invent amenities, finishes, or features — verify with Dale (the owner-developer) before claiming anything specific

## Site facts (verified)

- **Name:** NorthCliff Commons
- **Address:** 1220 Jones St., Shelton, WA 98584
- **Units:** 43 across 4 buildings (A, B, C, D)
- **Bedroom mix:** 1, 2, and 3 bedroom plans
- **Parking:** Garage and carport
- **Opening:** December 2027
- **Leasing contact:** Jennifer Fox · 360-229-1220 · jennifer@sentrypark.com
- **Developer/GC:** Dale (owner) / F&S Construction & Septic LLC (Shelton, WA)

## Things NOT to assume without confirming

- In-unit laundry (mentioned as "VERIFY" in amenities task)
- Specific square footage per unit
- Pricing
- Amenities not in the verified list above

When in doubt, ask the user.
