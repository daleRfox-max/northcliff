# Task 17 — Optimize images (WebP/AVIF, lazy loading)

**Tier:** 3
**Type:** EDIT

## Problem
Current images are likely JPGs sized for desktop. On mobile, they're oversized — slow loads hurt Core Web Vitals, which directly affects Google local search rankings. They also cost users mobile data.

## Goal
Convert all images to modern formats and enable lazy loading for everything below the fold.

## Changes

### 1. Convert JPGs to WebP (or AVIF)
- WebP: ~30% smaller than JPG, supported everywhere
- AVIF: ~50% smaller than JPG, supported on modern browsers (with WebP fallback)
- Tools: `sharp` (Node.js), `cwebp` CLI, Squoosh.app, or `imagemin`

### 2. Serve responsive sizes
Use `<picture>` element with multiple sources:
```html
<picture>
  <source srcset="image-800.avif 800w, image-1600.avif 1600w" type="image/avif">
  <source srcset="image-800.webp 800w, image-1600.webp 1600w" type="image/webp">
  <img src="image-800.jpg" srcset="image-800.jpg 800w, image-1600.jpg 1600w"
       sizes="(max-width: 768px) 100vw, 50vw"
       alt="..." loading="lazy" decoding="async">
</picture>
```

### 3. Add `loading="lazy"` to below-the-fold images
Hero rendering should remain eager-loaded. Everything else (floor plans, gallery, amenity icons) gets `loading="lazy"`.

### 4. Vercel Image Optimization (recommended)
If using Next.js, switch all `<img>` to `<Image>` from `next/image`. Vercel handles all the above automatically.

If staying on plain HTML, consider adding the `@vercel/og` package for runtime image optimization, or pre-process at build time.

## Specific files to optimize
```
/assets/northcliff-rendering-rust-beige.jpg  — hero (keep eager-load)
/assets/plans/detailed-clean/*.jpg            — all floor plans (lazy)
```

## Performance targets
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms
- Total page weight (mobile): < 1.5MB

Test with PageSpeed Insights: https://pagespeed.web.dev/

## Acceptance criteria
- [ ] All JPGs have WebP and ideally AVIF equivalents
- [ ] Below-fold images use `loading="lazy"`
- [ ] Hero image is preloaded for fastest LCP
- [ ] PageSpeed mobile score: 85+
- [ ] PageSpeed desktop score: 95+
- [ ] No layout shift on image load (explicit width/height on `<img>`)
