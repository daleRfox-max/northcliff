# Task 19 — sitemap.xml and robots.txt

**Tier:** 3
**Type:** ADD

## Problem
Without a sitemap, Google has to crawl to discover pages. Without robots.txt, you can't control what gets indexed. Both should exist on every production site.

## Goal
Generate or manually create both files at the site root.

## robots.txt

Place at `https://northcliff.vercel.app/robots.txt`:

```
User-agent: *
Allow: /

# AI crawlers — allow (helps you appear in ChatGPT, Perplexity, Claude search)
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://northcliff.vercel.app/sitemap.xml
```

## sitemap.xml

Place at `https://northcliff.vercel.app/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://northcliff.vercel.app/</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://northcliff.vercel.app/floor-plans</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://northcliff.vercel.app/location</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://northcliff.vercel.app/leasing</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://northcliff.vercel.app/contact</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://northcliff.vercel.app/apartments-shelton-wa</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://northcliff.vercel.app/about</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

(Update `<lastmod>` dates as content changes — most static site generators handle this automatically.)

## Automated approach for Next.js
If on Next.js, install `next-sitemap`:
```
npm install next-sitemap
```
Add `next-sitemap.config.js` and a postbuild script. It auto-generates both files.

## Post-deploy: submit to Google
1. Sign up for Google Search Console: https://search.google.com/search-console
2. Verify ownership (DNS or HTML file method)
3. Submit `https://northcliff.vercel.app/sitemap.xml`
4. Same process for Bing Webmaster Tools

## Acceptance criteria
- [ ] `/robots.txt` accessible and includes Sitemap directive
- [ ] `/sitemap.xml` accessible and includes all real URLs
- [ ] AI crawlers explicitly allowed in robots.txt
- [ ] Sitemap submitted to Google Search Console
- [ ] Sitemap submitted to Bing Webmaster Tools
- [ ] No 404s in the sitemap (every URL resolves)
