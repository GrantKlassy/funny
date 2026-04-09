# epicfunnels.net Investigation

CPA affiliate scam funnel built with Lovable AI, distributed via TikTok.

## Timeline

- **2024-06-25**: phef6trk.com registered (affiliate tracker)
- **2024-10-18**: noodledit.com registered (asset CDN)
- **2025-08-26**: epicfunnels.net registered
- **2025-08-28**: AWS EC2 server provisioned (nginx last-modified date)
- **2025-09-29**: iPhone promo image uploaded to GCS
- **2026-01-25**: Let's Encrypt cert on mail server expired (not renewed)
- **2026-03-15**: jessica.epicfunnels.net page last modified
- **2026-04-08**: Investigation conducted

## Scam Flow

1. Victim gets link (TikTok/social media) to jessica.epicfunnels.net
2. Sees "You've been selected to win an iPhone 17 Pro Max!" with countdown timer
3. Fake "Recent Winners" section using 8 Unsplash stock photos as testimonials
4. Social proof toast notifications ("claimed a spot") via Sonner
5. Color variants: Cosmic Orange, Deep Blue, Silver
6. CTA: "Confirm -> Answer survey -> Claim prize"
7. Click triggers `navigator.sendBeacon("/api/continue-click")` for tracking
8. Then `window.location.href = "/api/continue"` for redirect
9. Both endpoints HTTP 302 to `https://www.phef6trk.com/FGK5P4/2Z57CD5/`
10. That's a CPA affiliate tracking link — operator gets paid per victim click-through
11. Tracker now sinkholed (10.0.0.1) — funnel is broken, infrastructure still live

## Network Map

### Domains

| Domain | Registrar | DNS | Role |
|--------|-----------|-----|------|
| **epicfunnels.net** | Sav.com (2025-08-26) | Cloudflare (cheryl/logan) | Scam landing page + email |
| **noodledit.com** | Cloudflare (2024-10-18) | Cloudflare (cass/felicity) | Asset CDN (GCS backend) |
| **mydailysurge.com** | Unknown | Cloudflare (cass/felicity) | Second brand (Google Cloud, currently 404) |
| **phef6trk.com** | Squarespace (2024-06-25) | Google Cloud DNS | CPA affiliate tracker (sinkholed) |

noodledit.com and mydailysurge.com share identical Cloudflare nameservers (cass/felicity) — same Cloudflare account. epicfunnels.net uses different CF nameservers (cheryl/logan).

### Infrastructure

**AWS EC2 (us-east-1)**: 13.220.193.170
- Reverse DNS: `ec2-13-220-193-170.compute-1.amazonaws.com`
- Internal hostname (leaked via SMTP banner): `ip-172-26-15-175.ec2.internal`
- Web: nginx default "Success!" page
- SMTP 587: OPEN
- IMAP 143: OPEN
- IMAP 993 (SSL): OPEN, `IMAP4rev1 AUTH=PLAIN AUTH=LOGIN`, banner: "Mail Delivery Agent"
- Port 25: BLOCKED (AWS default)

**Google Cloud**: mydailysurge.com (34.36.210.5), noodledit.com assets (GCS buckets)

**Cloudflare**: All domains proxied through Cloudflare

### Email Infrastructure

Roundcube 1.6.11 at webmail.epicfunnels.net:
- MX: `_dc-mx.16d4f49190c7.epicfunnels.net` -> 13.220.193.170
- SPF: `v=spf1 a mx ip4:13.220.193.170 -all` (hard fail)
- DMARC: `v=DMARC1; p=quarantine; pct=100`
- Session cookie: HttpOnly but NOT Secure
- Exposed paths (403): `/CHANGELOG.md`, `/SQL/`, `/config/`, `/logs/`

Two SSL certs:
- Mail server direct: Let's Encrypt R13, **EXPIRED Jan 25, 2026**
- Webmail via Cloudflare: Google Trust Services WE1, wildcard `*.epicfunnels.net`, valid Feb-May 2026

### Asset CDN

JS bundle references on noodledit.com:
- `b.noodledit.com/promotions/iphone17promax1000.png` (392KB PNG, EXIF stripped)
- `sassets.noodledit.com/pages/logo_mydailysurge.svg` (programmatically generated, no editor metadata)

Both served from Google Cloud Storage (identified via `x-guploader-uploadid`, `x-goog-*` headers).

### Scam Page

- Lovable AI confirmed: OG images hosted on `lovable.dev`
- Tech: Vite + React SPA + Tailwind CSS (Lovable default stack)
- JS bundle: ~350KB original, ~592KB beautified
- Brands: "GetnGoods" (meta author, @GetnGoods twitter), "MyDailySurge" (logo in assets)
- `robots: noindex, nofollow`

## Conclusion

Real-world example of Guardio Labs' VibeScamming research. Lovable AI (scored 1.8/10 — most exploitable tool tested) used to generate a scam funnel page. Multi-domain infrastructure with shared Cloudflare accounts, email capability (SPF+DMARC+Roundcube), and CPA affiliate monetization. Multiple brands suggest a repeatable operation.

## Artifacts Captured (2026-04-08)

All saved in [artifacts/](artifacts/) before infrastructure goes down:

- [x] `jessica-page.html` — raw HTML snapshot (1.4KB, Vite SPA shell)
- [x] `index-CUlwK__p.js` — JS bundle (349KB)
- [x] `index-CUlwK__p.pretty.js` — beautified JS (591KB)
- [x] `index-D8N5ZY6U.css` — CSS bundle (65KB)
- [x] `iphone17promax1000.png` — promo image from b.noodledit.com (392KB)
- [x] `logo_mydailysurge.svg` — brand logo from sassets.noodledit.com (11KB)
- [x] `ssl-cert-direct.pem` — Let's Encrypt R13 cert from mail server (expired Jan 25, 2026)
- [x] `ssl-cert-cloudflare.pem` — Google Trust WE1 wildcard cert via Cloudflare (valid through May 20, 2026)
- [x] `dns-records.txt` — full dig output for all domains (MX, TXT/SPF, DMARC, NS, A, PTR)
- [x] `favicon.ico` — site favicon (20KB)
- [ ] Screenshots (headless browser capture) — TODO, needs headless Chrome/Playwright

## Follow-up Investigation (2026-04-08)

Containerized re-investigation confirmed the write-up findings and revealed changes:

### What's Still Live
- jessica.epicfunnels.net serving the scam page (HTML + JS + CSS)
- Both API endpoints (`/api/continue-click`, `/api/continue`) still 302 → `phef6trk.com/FGK5P4/2Z57CD5/`
- noodledit.com asset CDN (b. and sassets. subdomains) still serving promo image + logo
- Email infrastructure: SMTP 587, IMAP 143, IMAP 993 all responding on 13.220.193.170
- SMTP banner still leaking internal hostname: `ip-172-26-15-175.ec2.internal`
- Roundcube paths `/CHANGELOG.md`, `/SQL/`, `/config/`, `/logs/` still return 403

### What Changed
- **phef6trk.com**: still sinkholed at `10.0.0.1` across all major resolvers (Google, Cloudflare, Quad9). Whois now returns empty — registrar may have scrubbed records
- **mydailysurge.com**: now returning 404 via Google Frontend — second brand appears abandoned
- **Roundcube version string**: no longer visible on login page (may have been patched or page changed)
- **noodledit.com main page**: returns empty response (no content served at root)
- **Direct SSL cert**: still expired (Jan 25, 2026), Cloudflare auto-renewed wildcard masking it
