# The Complete Scam Flow

A comprehensive map of every domain, subdomain, DNS record, service, page, and connection in the epicfunnels.net CPA scam operation.

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

    subgraph SCAM_PAGE["SCAM PAGE — jessica.epicfunnels.net"]
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

## The Full Infrastructure

```mermaid
flowchart TD
    subgraph DOMAINS["ALL 5 DOMAINS"]
        direction LR
        D_EPIC["epicfunnels.net\nRegistrar: Sav.com\nRegistered: 2025-08-26\nCF NS: cheryl/logan"]
        D_NOODLE["noodledit.com\nRegistrar: Cloudflare\nRegistered: 2024-10-18\nCF NS: cass/felicity"]
        D_SURGE["mydailysurge.com\nRegistrar: unknown\nCF NS: cass/felicity"]
        D_TRACKER["phef6trk.com\nRegistrar: SCRUBBED\nRegistered: 2024-06-25\nNS: EMPTY"]
        D_OLIVI["olivimails.com\nNo public DNS\nNo CT logs\nShadow domain"]
    end

    subgraph SHARED_CF["SHARED CLOUDFLARE ACCOUNTS"]
        CF1["Account 1\ncheryl/logan"]
        CF2["Account 2\ncass/felicity"]
    end

    D_EPIC --- CF1
    D_NOODLE --- CF2
    D_SURGE --- CF2

    style D_TRACKER fill:#c92127,color:#fff
    style D_OLIVI fill:#555,color:#fff
    style CF2 fill:#f96,color:#000
```

## epicfunnels.net — Subdomains & DNS

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
        DKIM["DKIM\nmail._domainkey.epicfunnels.net\nv=DKIM1; k=rsa;\np=DKIM-SUPPORT-IS-NOT-ACTIVATED\n(placeholder — never completed)"]
        GOOGLE_V["TXT: google-site-verification=\nqWPTL9H_t4lE4Lja7ZwdNCdmGBQEaTmtJiX7KpXbkxM"]
        MS_V["TXT: MS=ms66511106\n(Microsoft 365 verified)"]
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
```

## mydailysurge.com — The SEO Content Farm

```mermaid
flowchart TD
    subgraph SURGE_SUBS["mydailysurge.com SUBDOMAINS"]
        SURGE_ROOT["mydailysurge.com\nA: 34.36.210.5 (Google Cloud)\nStatus: 404"]
        EXPLORE["explore.mydailysurge.com\nA: 104.21.71.114 (Cloudflare)\nStatus: LIVE\nWebflow blog"]
        SIGNUP["signup.mydailysurge.com\nA: 34.36.210.5\nStatus: 404"]
        TRCK["trck.mydailysurge.com\nA: 34.36.210.5\nStatus: 404"]
        DAILY["1.mydailysurge.com through\n31.mydailysurge.com\nA: 34.36.210.5\nAll 404\n(daily rotating landing pages)"]
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
```

## noodledit.com — Asset CDN

```mermaid
flowchart TD
    subgraph NOODLE["noodledit.com (CF: cass/felicity)"]
        NOODLE_ROOT["noodledit.com\nRoot: empty response"]
        B_SUB["b.noodledit.com\nA: 104.21.50.252 / 172.67.215.119"]
        S_SUB["sassets.noodledit.com\nA: 104.21.50.252 / 172.67.215.119"]
    end

    subgraph GCS["GOOGLE CLOUD STORAGE"]
        IPHONE_1000["b.noodledit.com/promotions/\niphone17promax1000.png (392KB)"]
        IPHONE_FULL["b.noodledit.com/promotions/\niphone17promax.png (427KB, hi-res)"]
        MACBOOK["b.noodledit.com/promotions/\nmacbook1000.png (204KB)"]
        LOGO["sassets.noodledit.com/pages/\nlogo_mydailysurge.svg (11KB)"]
    end

    subgraph SCAM_IMAGES["ON jessica.epicfunnels.net ITSELF"]
        ORANGE["iphone-cosmicorange-prqXxnzj.webp\n558KB"]
        BLUE["iphone-deepblue-UwoIw3eQ.webp\n477KB"]
        SILVER["iphone-silver-JpOn6eFE.webp\n394KB"]
    end

    B_SUB --> IPHONE_1000 & IPHONE_FULL & MACBOOK
    S_SUB --> LOGO

    style GCS fill:#4285f4,color:#fff
```

## The EC2 Server — Every Open Port

```mermaid
flowchart TD
    subgraph MGMT["MANAGEMENT LAYER"]
        HESTIA["Hestia Control Panel v1.9.4\n:8083 HTTPS\nCert CN: fqdn.olivimails.com\nCert Org: Hestia Control Panel\nLocation: San Francisco, CA\nCert created: Aug 28, 2025\nTLS 1.3\nCookie: HESTIASID (HttpOnly, Secure, SameSite=Strict)\n\nEXPOSED TO THE ENTIRE INTERNET"]
    end

    subgraph EC2["AWS EC2 — 13.220.193.170\nus-east-1\nReverse DNS: ec2-13-220-193-170.compute-1.amazonaws.com\nInternal hostname: ip-172-26-15-175.ec2.internal\nOS: Debian Bookworm (6.1.0-42-cloud-amd64)"]
        SSH[":22 SSH\nOpenSSH 9.2p1"]
        HTTP[":80 HTTP\nnginx 'Success!' page\n9 virtual hosts"]
        HTTPS[":443 HTTPS\nCert EXPIRED Jan 25, 2026\nRedirects to HTTP"]
        IMAP[":143 IMAP\nDovecot"]
        SMTP_SUB[":587 SMTP Submission\nBanner leaks:\nip-172-26-15-175.ec2.internal\nEHLO: SIZE 52428800, STARTTLS"]
        SMTP_25[":25 SMTP\nBLOCKED by AWS"]
        IMAPS[":993 IMAPS\nDovecot\nAUTH=PLAIN AUTH=LOGIN\nBanner: 'Mail Delivery Agent'\nCert: fqdn.olivimails.com"]
        NODE[":3000 Node.js\nHTTP 500 on ALL endpoints\n/health /status /api\n/api/continue /api/continue-click\n/.env /package.json\nCOMPLETELY DEAD"]
        PG[":5432 PostgreSQL\nEXPOSED TO INTERNET\nClick tracking / analytics"]
        REDIS[":6379 Redis 7.4.7\nrequirepass: EMPTY\nprotected-mode: NO\nbind: * (all interfaces)\nUptime: 75 days\nRunning as PID 1 in Docker\n4 keys in db0\n500 cached Lua scripts\n2.56MB used / 3.78GB system\nCOMPLETELY OPEN"]
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

## Email Infrastructure

```mermaid
flowchart TD
    subgraph EMAIL["EMAIL STACK"]
        RC["Roundcube 1.6.11\nwebmail.epicfunnels.net\nInstalled: Aug 16, 2025\nsession_lifetime: 600s\ncookie_secure: FALSE\nCSRF token: per-session"]
        RC_PATHS["Exposed paths (403 -> 301):\n/CHANGELOG.md\n/SQL/\n/config/\n/logs/\n/installer/\n/INSTALL\n/README.md"]
        DOVE["Dovecot\n:143 IMAP\n:993 IMAPS\nAUTH=PLAIN AUTH=LOGIN"]
        EXIM["SMTP\n:587 Submission\n:25 BLOCKED (AWS)\nBanner: ip-172-26-15-175.ec2.internal"]
    end

    subgraph DNS_EMAIL["EMAIL DNS"]
        MX2["MX 10 _dc-mx.16d4f49190c7.epicfunnels.net"]
        SPF_R["SPF: v=spf1 a mx ip4:13.220.193.170 -all"]
        DMARC2["DMARC: v=DMARC1; p=quarantine; pct=100"]
        DKIM2["DKIM: DKIM-SUPPORT-IS-NOT-ACTIVATED\n(placeholder key)"]
    end

    subgraph CERTS["SSL CERTIFICATES"]
        CERT_LE["Let's Encrypt R13\nepicfunnels.net\nEXPIRED Jan 25, 2026"]
        CERT_CF["Google Trust Services WE1\n*.epicfunnels.net\nValid through May 20, 2026\n(Cloudflare managed)"]
        CERT_HESTIA["Self-signed\nfqdn.olivimails.com\nO=Hestia Control Panel\nCreated Aug 28, 2025"]
        CERT_JESSICA["Let's Encrypt E8\njessica.epicfunnels.net\nValid through Apr 18, 2026"]
        CERT_JENNY["Let's Encrypt E7\njenny.epicfunnels.net\nValid through May 18, 2026"]
        CERT_KYLIE["Let's Encrypt E7\nkylie.epicfunnels.net\nValid through Jun 1, 2026"]
    end

    RC --> DOVE
    RC --> RC_PATHS
    MX2 --> DOVE
    DOVE --> EXIM

    style CERT_LE fill:#c92127,color:#fff
    style DKIM2 fill:#ffcc33,color:#000
    style CERT_HESTIA fill:#555,color:#fff
```

## Third-Party Integrations

```mermaid
flowchart LR
    EPIC["epicfunnels.net"] --> GSC["Google Search Console\ngoogle-site-verification=\nqWPTL9H..."]
    EPIC --> M365["Microsoft 365\nMS=ms66511106"]
    EPIC --> AP["ActiveProspect\nTCPA consent verification\n(confirms CPA lead gen)"]
    EPIC --> ZD["Zendesk\ninclude:mail.zendesk.com\n(in conflicting SPF #2)"]
    EPIC --> OUTLOOK["Outlook.com\ninclude:spf.protection.outlook.com\n(in conflicting SPF #2)"]
    EPIC --> LOVABLE["Lovable AI\nVibeScamming score: 1.8/10\nVite + React + Tailwind\nOG image on lovable.dev"]

    SURGE["explore.mydailysurge.com"] --> WEBFLOW2["Webflow\nSite ID: 68129c0789b42b5281896601"]
    SURGE --> GA["Google Analytics\nG-BSTM4RV28F"]
    SURGE --> GTM["Google Tag Manager\nGTM-N3JVLCTN"]

    style LOVABLE fill:#ff69b4,color:#000
    style AP fill:#f96,color:#000
```

## Brands

```mermaid
flowchart LR
    subgraph BRANDS["OPERATOR BRANDS"]
        GNG["GetnGoods\nTwitter: @GetnGoods\nMeta author in JS bundle\nUsed on scam pages"]
        MDS["MyDailySurge\nSEO lifestyle blog\nLogo on sassets.noodledit.com\nCategories: Finance, Travel,\nHome Design, Wellness"]
    end

    GNG --> EPIC2["epicfunnels.net\nscam funnels"]
    MDS --> EXPLORE2["explore.mydailysurge.com\ncontent farm"]
    MDS --> NOODLE2["sassets.noodledit.com\nlogo hosting"]

    style GNG fill:#1a1a2e,color:#fff
    style MDS fill:#5594cf,color:#fff
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
| Removed jenny.epicfunnels.net DNS | Apr 8-9, 2026 | Consolidating funnels |
| Removed kylie.epicfunnels.net DNS | Apr 8-9, 2026 | Consolidating funnels |
| Activated www.epicfunnels.net | Apr 8-9, 2026 | New landing strategy |
| Activated epicfunnels.net root | Apr 8-9, 2026 | Serving scam page on root |
| Added Redis on :6379 | ~Jan 24, 2026 | Active development |
| Updated explore.mydailysurge.com | Apr 5, 2026 | Still investing in SEO |
| Moved explore.mydailysurge.com to Cloudflare | Apr 5-8, 2026 | Infrastructure changes |
| Did NOT fix tracker | Still sinkholed | Doesn't know or doesn't care |
| Did NOT renew mail cert | Expired Jan 2026 | Abandoned email operations |
| Did NOT fix Node.js app | Still HTTP 500 | Backend is dead |
| Did NOT secure Redis | No auth, all interfaces | Classic |

## Stats

- **5** domains
- **21** subdomains (historical)
- **11** IP addresses
- **10** open ports on EC2
- **9** nginx virtual hosts
- **6** SSL certificates
- **4** DNS TXT records
- **3** third-party verifications
- **2** Cloudflare accounts
- **2** brands
- **2** conflicting SPF records
- **1** DKIM key that says "NOT ACTIVATED"
- **1** sinkholed tracker
- **1** dead Node.js app
- **1** completely open Redis
- **1** PostgreSQL database on the public internet
- **1** admin panel exposed to the world
- **0** working parts of the actual scam
