# Task 20 — Analytics + pixel install

**Tier:** 3
**Type:** ADD
**Important:** Install BEFORE running paid ads

## Problem
You're not measuring anything. Without analytics, you don't know which traffic sources drive leads, which pages convert, or whether ad spend works.

## Goal
Install a baseline analytics stack:
1. Vercel Analytics (privacy-friendly, built-in if on Vercel)
2. Google Tag (gtag.js) → Google Analytics 4
3. Meta Pixel (for when you run Facebook/Instagram ads)
4. Optional: Microsoft Clarity (free session recordings + heatmaps)

## Recommended stack

### Vercel Analytics
If hosted on Vercel:
```bash
npm install @vercel/analytics
```
```jsx
import { Analytics } from "@vercel/analytics/react";
// Inside your root layout:
<Analytics />
```

### Google Analytics 4
1. Create GA4 property at https://analytics.google.com
2. Get Measurement ID (`G-XXXXXXXXXX`)
3. Add to `<head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Meta Pixel
1. Create at https://business.facebook.com/events_manager
2. Get Pixel ID
3. Add base code to `<head>`:
```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

### Microsoft Clarity (free, optional)
Highly recommended — gives you session recordings and heatmaps for free. https://clarity.microsoft.com

## Conversion events to track
Once installed, configure these conversion events:
- **Lead form submission** (Task 01 form) — name it `lead_form_submit`
- **Waitlist signup** (Task 06 form) — name it `waitlist_signup`
- **Phone click** (`tel:` link) — name it `phone_click`
- **Email click** (`mailto:` link) — name it `email_click`
- **PDF download** (floor plan PDFs) — name it `floor_plan_download`

For Meta Pixel:
- Lead form → `fbq('track', 'Lead')`
- Phone click → `fbq('track', 'Contact')`

## Cookie/consent considerations
Washington State doesn't currently have a strict consent law, but GDPR-style banners are good practice if you'll get any traffic from outside the US. Consider:
- Cookiebot (free tier)
- Klaro (open source, lightweight)
- Or skip for now if US-only traffic

## Acceptance criteria
- [ ] At least one analytics platform installed and verified (test event fires correctly)
- [ ] Meta Pixel installed and verified (use Facebook Pixel Helper Chrome extension)
- [ ] Conversion events configured for form submits and contact clicks
- [ ] Test conversions show up in respective dashboards within 24 hours
- [ ] Document the IDs/tokens somewhere safe (1Password, etc.)
