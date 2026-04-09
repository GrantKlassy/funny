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

### explore.mydailysurge.com — The SEO Content Farm

Discovered alive at `explore.mydailysurge.com` (HTTP 200) while `mydailysurge.com` itself 404s. This is the **SEO/content marketing arm** of the operation:

- **Platform**: Webflow (site ID `68129c0789b42b5281896601`)
- **Last published**: Thu Mar 26, 2026 11:23:53 UTC
- **Google Analytics**: `G-BSTM4RV28F`
- **Google Tag Manager**: `GTM-N3JVLCTN`
- **Content categories**: Personal Finance, Travel, Home Design, Wellness
- **Stock photos**: Pexels (not Unsplash like the scam page)
- **CSS filename**: `staging-mydailysurge-v1` — still marked as staging
- **Blog CMS**: Webflow CMS with article templates, category pages, sidebar navigation

This is a **legitimate-looking lifestyle blog** designed to build domain authority and drive organic traffic. The scam funnels on epicfunnels.net are the monetization layer — the blog is the traffic funnel.

### Certificate Transparency — Full Subdomain History

CT logs reveal subdomains that **once existed** but are now NXDOMAIN, proving scale-up/scale-down operations:

**epicfunnels.net** (formerly active, now NXDOMAIN):
- `jessica.epicfunnels.net` — **still live** (the one we found)
- `jenny.epicfunnels.net` — person-named funnel #2
- `kylie.epicfunnels.net` — person-named funnel #3
- `afiliados.epicfunnels.net` — Spanish for "affiliates"
- `socio.epicfunnels.net` — Spanish for "partner"
- `socios.epicfunnels.net` — Spanish for "partners"
- `evento.epicfunnels.net` — Spanish for "event"
- `app.epicfunnels.net`, `demo.epicfunnels.net`, `link.epicfunnels.net`, `m.epicfunnels.net`, `vpn.epicfunnels.net`

The Spanish subdomains (afiliados, socio, socios, evento) suggest the operator is **Spanish-speaking** or targeting Spanish-speaking markets alongside English ones.

The person-named subdomains (jessica, jenny, kylie) confirm the TikTok distribution model — each name is a personalized funnel ("Jessica said I could win!").

**mydailysurge.com** CT history:
- Numbered subdomains `1.` through `31.` — **daily rotating landing pages** (all 404 now)
- `explore.` — Webflow content blog (still live)
- `signup.` — registration page (404)
- `trck.` — tracking subdomain (404)

### EC2 Server — More Than Mail

Full port scan of 13.220.193.170 reveals additional services:

| Port | Service | Status | Notes |
|------|---------|--------|-------|
| 22 | SSH | OPEN | |
| 25 | SMTP | BLOCKED | AWS default |
| 80 | HTTP | OPEN | nginx "Success!" page |
| 443 | HTTPS | OPEN | Redirects to HTTP (expired cert) |
| 587 | SMTP Submission | OPEN | Banner: `ip-172-26-15-175.ec2.internal` |
| 143 | IMAP | OPEN | Dovecot |
| 993 | IMAPS | OPEN | `AUTH=PLAIN AUTH=LOGIN` |
| 3000 | **Node.js app** | OPEN | **HTTP 500 Internal Server Error** — crashed |
| 5432 | **PostgreSQL** | OPEN | Database exposed to internet |

**Port 3000** is a crashed Node.js application — likely the backend that handles `/api/continue-click` and `/api/continue` redirects (fronted by Cloudflare Workers or Pages).

**Port 5432** is a PostgreSQL database **listening on the public internet** — a significant security misconfiguration. This likely stores click tracking data, funnel analytics, or email records.

### Asset CDN — Multiple Scam Variants

The noodledit.com GCS buckets contain assets for **multiple scam campaigns**:

- `b.noodledit.com/promotions/iphone17promax1000.png` — iPhone 17 Pro Max (current campaign)
- `b.noodledit.com/promotions/macbook1000.png` — **MacBook variant** (204KB, same 720px format)
- 3 iPhone color variant WebP images on jessica.epicfunnels.net itself (Cosmic Orange 558KB, Deep Blue 477KB, Silver 394KB)

The `1000` suffix in filenames likely refers to the "$1000" prize value used in the scam copy.

## The Full Operation Model

This is a **multi-layer CPA affiliate scam operation**:

```
Layer 1: SEO CONTENT FARM
  explore.mydailysurge.com (Webflow blog)
  Categories: Personal Finance, Travel, Home Design, Wellness
  Purpose: Build domain authority, drive organic traffic
  Analytics: G-BSTM4RV28F / GTM-N3JVLCTN

Layer 2: SCAM FUNNELS
  {jessica,jenny,kylie,...}.epicfunnels.net (Lovable AI)
  "You've been selected to win an iPhone 17 Pro Max!"
  Personalized by name for TikTok/social media distribution
  Also had MacBook variant ready

Layer 3: MONETIZATION
  phef6trk.com (CPA affiliate tracker, now sinkholed)
  Operator gets paid per victim click-through

Layer 4: INFRASTRUCTURE
  AWS EC2 ── mail (Roundcube + Dovecot) + Node.js API + PostgreSQL
  Google Cloud ── mydailysurge hosting + GCS asset buckets
  Cloudflare ── DNS proxy, SSL, possibly Workers for API routing
  Webflow ── SEO content blog
  Lovable AI ── scam page generation

Layer 5: EMAIL
  epicfunnels.net ── full email infra (SPF + DMARC + Roundcube)
  Likely used for spam distribution or affiliate communications
  Spanish affiliate portal subdomains (afiliados, socio, socios)
```

### Operator Profile

- **Language**: Likely Spanish-speaking (afiliados, socio, socios, evento subdomains)
- **Brands**: "GetnGoods" (scam pages), "MyDailySurge" (content blog)
- **Tools**: Lovable AI (scam generation), Webflow (SEO blog), standard DevOps (nginx, Dovecot, PostgreSQL, Node.js)
- **Scale**: Multiple funnel names, multiple product variants (iPhone, MacBook), numbered daily landing pages — this is a **repeatable, templated operation**
- **OpSec**: EXIF stripped, `noindex/nofollow`, Cloudflare proxied — but leaked internal hostname via SMTP, exposed PostgreSQL to internet, expired SSL cert not renewed

## Conclusion

Real-world example of Guardio Labs' VibeScamming research. Lovable AI (scored 1.8/10 — most exploitable tool tested) used to generate a scam funnel page. Multi-domain infrastructure with shared Cloudflare accounts, email capability (SPF+DMARC+Roundcube), and CPA affiliate monetization.

The deeper investigation reveals this is not a one-off — it's a **multi-brand, multi-language, templated scam factory** with an SEO content farm (Webflow) feeding traffic into AI-generated scam funnels (Lovable), monetized through CPA affiliate tracking. The operator has infrastructure for rapid deployment of new campaigns: just generate a new Lovable page, point a new subdomain, and go.

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
- [x] `macbook1000.png` — MacBook variant promo image from b.noodledit.com (204KB)
- [x] `iphone-cosmicorange-prqXxnzj.webp` — iPhone Cosmic Orange variant (558KB)
- [x] `iphone-deepblue-UwoIw3eQ.webp` — iPhone Deep Blue variant (477KB)
- [x] `iphone-silver-JpOn6eFE.webp` — iPhone Silver variant (394KB)
- [x] `explore-mydailysurge.html` — full Webflow SEO blog snapshot (61KB)
- [x] `lovable-og-image.png` — Lovable AI OG image used by scam page (258KB)
- [x] `ct-logs.txt` — certificate transparency logs for all 4 domains (31KB)
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

## Reinvestigation #2 (2026-04-09)

Full 8-probe containerized reinvestigation. All raw data in `artifacts/reinvestigation-2026-04-08/`.

### New Discoveries

- **Redis (port 6379) NOW OPEN** on EC2 server (13.220.193.170) — not present in any previous scan. Exposed to public internet. Likely added as caching or session store layer.
- **DKIM record found**: `mail._domainkey.epicfunnels.net` has `v=DKIM1; k=rsa; p=DKIM-SUPPORT-IS-NOT-ACTIVATED` — DNS configured but DKIM was never completed. RSA key is a placeholder.
- **epicfunnels.net root domain** now resolves to Cloudflare IPs (104.21.11.211, 172.67.192.166) and serves HTTP 200

### Infrastructure Changes

| What | Before (2026-04-08) | Now (2026-04-09) | Interpretation |
|------|---------------------|-------------------|----------------|
| jenny.epicfunnels.net | Resolves (live) | NXDOMAIN | Funnel removed |
| kylie.epicfunnels.net | Resolves (live) | NXDOMAIN | Funnel removed |
| www.epicfunnels.net | NXDOMAIN | Resolves (HTTP 200) | Activated |
| epicfunnels.net root | Behind CF proxy | HTTP 200 via CF | Now serving content |
| EC2 port 6379 (Redis) | Not seen | OPEN | New service added |
| explore.mydailysurge.com proxy | Google Frontend | Cloudflare | CDN/proxy switched |
| explore.mydailysurge.com Last-Modified | Mar 26, 2026 | **Apr 5, 2026** | Content updated 3 days ago |
| Roundcube exposed paths | HTTP 403 | HTTP 301 | HTTPS redirect reconfigured |
| phef6trk.com NS records | Google Cloud DNS | EMPTY | Completely scrubbed |
| phef6trk.com whois | Squarespace registrar | EMPTY | Registrar scrubbed all records |

### What's Still the Same

- jessica.epicfunnels.net still serving the scam page (same JS bundle `index-CUlwK__p.js`, same CSS)
- `/api/continue` and `/api/continue-click` still HTTP 302 → `phef6trk.com/FGK5P4/2Z57CD5/` (broken — tracker sinkholed)
- noodledit.com CDN (b. and sassets. subdomains) still serving all assets (iPhone, MacBook, logo)
- SMTP 587 still leaking `ip-172-26-15-175.ec2.internal`
- PostgreSQL 5432 still exposed to internet
- Node.js 3000 still HTTP 500 (crashed)
- Direct SSL cert still expired (Jan 25, 2026)
- Cloudflare wildcard cert still valid through May 20, 2026
- phef6trk.com still sinkholed at 10.0.0.1 across all 3 resolvers
- Lovable AI OG image still accessible at lovable.dev
- explore.mydailysurge.com Webflow site ID, GA, GTM all unchanged
- mydailysurge.com root still 404 via Google Frontend

### Operator Behavior Analysis

The operator is **actively maintaining infrastructure** despite the broken monetization:

1. **Consolidating funnels**: Removed jenny and kylie subdomains, keeping only jessica. Possibly rotating to a single active funnel or preparing to redeploy under new names.
2. **Activating root domain**: www.epicfunnels.net and epicfunnels.net root now serve HTTP 200 — possibly building a new landing page or redirector.
3. **Adding infrastructure**: Redis on port 6379 suggests active development — adding caching, rate limiting, or session management.
4. **Updating content farm**: explore.mydailysurge.com was updated April 5 (3 days before this probe) and migrated from Google Frontend to Cloudflare. Still investing in SEO.
5. **NOT fixing the tracker**: /api/continue still points to sinkholed phef6trk.com. Either doesn't know it's sinkholed, or is preparing a new tracker and hasn't switched yet.
6. **Reconfiguring Roundcube**: Paths changed from 403 to 301, suggesting HTTPS redirect policy was updated.

### Graph Data

Network graph JSON with all entities and connections: `graph/network-graph.json`
- **63 nodes**: 4 domains, 20 subdomains, 8 IPs, 10 services, 5 platforms, 2 brands, 5 certs, 4 email configs, 4 assets, 1 tracker
- **71 edges**: resolves_to, hosts, serves, redirects_to, shared_cloudflare_account, uses_platform, has_certificate, has_email_config, backed_by, hosts_assets_for, same_operator, child_of
- Compatible with D3.js, Cytoscape.js, Sigma.js for visualization
