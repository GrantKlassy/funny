# Third-Party Intelligence: The Legal Cover Stack

Who are the companies providing legitimacy infrastructure to the Moxxi Media scam network?

---

## Quick Reference: Every Identifying Detail

### The Operator: Moxxi Media

- **M365 tenant**: `moxximedia.onmicrosoft.com`
- **M365 tenant ID**: `MS=ms46839871`
- **Second M365 tenant** (deleted): `MS=ms66511106` on epicfunnels.net
- **DKIM**: `selector1-myamericanprizes-com._domainkey.moxximedia.onmicrosoft.com`
- **Registered domain**: none — `moxximedia.com` is not registered
- **Sponsor address**: 68 White Street, Suite 7-291, Red Bank, NJ 07701 (**UPS Store #3488, mailbox #291**)
- **Contact email**: `support@mydailysurge.com`
- **Zendesk**: `mydailysurge.zendesk.com/hc/en-us`
- **DMARC reporting**: `ed520975d12843c3ae17217ffb324256@dmarc-reports.cloudflare.net`
- **MX (M365)**: `myamericanprizes-com.mail.protection.outlook.com`
- **Platform backend**: CustomerTestConnect (Express.js + Handlebars)
- **Apple domain verification**: `ySS9fHR4xXuFRiE0` on myamericanprizes.com
- **Google Search Console**: `qWPTL9H_t4lE4Lja7ZwdNCdmGBQEaTmtJiX7KpXbkxM` on epicfunnels.net
- **Spamhaus**: blocklisted (CSS — Combined Spam Sources)

### Confirmed Operator: Moxxi Digital (NYC)

- **Company**: Moxxi Digital (d/b/a Moxxi Media, d/b/a Reward Zinga)
- **BBB address**: 68 White St #7-291, Red Bank, NJ 07701 (UPS Store #3488, mailbox 291)
- **Office**: 85 Broad St, New York, NY 10004 (WeWork)
- **Website**: moxxi.io (registered May 23, 2023, GoDaddy)
- **BBB rating**: D+ (file opened 12/5/2024, 1 unanswered complaint)
- **Employees**: 36
- **Status**: Bootstrapped, profitable
- **Business model**: "Promotion-based marketing that drives first-party data capture, compliant lead opt-in lead generation, and ROI-focused customer acquisition at scale"
- **Corporate ancestor**: Fluent, Inc. (NASDAQ: FLNT) — sued by FTC in July 2023 for operating consent farms
- **Leadership**: 4 of 5 known leaders came directly from Fluent Inc
- **Full operator deep dive**: See [OPERATOR-INTEL.md](OPERATOR-INTEL.md)

#### Leadership Team

| Name | Title | Fluent Inc Role | Key Detail |
|------|-------|----------------|------------|
| **Morris Laniado** | President & Co-Founder | AVP, Data Revenue | Ran lead sales at Fluent. Lives in Monmouth County NJ (Red Bank). Founded Jade Global Group LLC in Red Bank. |
| **Kevin Riehl** | CPO & Co-Founder | Director of Product | Created "The Smart Wallet" at Fluent. Rutgers NJ education. |
| **Jeffrey Kauffman** | General Counsel | Co-GC & Chief Compliance Officer | Managed regulatory compliance at Fluent during FTC investigation. Previously at Affinion Group ($30M settlement). |
| **Carl Augustin** | VP Media & BD | Director of Publisher Development | 7 years at Fluent (2015-2022). Founding member of Fluent Inc. |
| **Daniel Palevo** | Director of Account Mgmt (departed) | — | Now at BMG360 |

#### Additional Domain

- `rewardzinga.com` — Cloudflare (cass/felicity NS, same account), registered 2024-04-10, ScamAdviser trust score 0/100, documented subscription scam ($9.90 "shipping" -> $89-299/month charges)

### Infrastructure

- **AWS EC2**: `13.220.193.170` (us-east-1)
- **EC2 reverse DNS**: `ec2-13-220-193-170.compute-1.amazonaws.com`
- **EC2 internal hostname**: `ip-172-26-15-175.ec2.internal` (leaked via SMTP)
- **GCP**: `34.36.210.5` (mydailysurge.com)
- **GCS bucket 1**: `b.noodledit.com` — 747 objects, 122.4 MB, publicly listable
- **GCS bucket 2**: `sassets.noodledit.com` — 28 objects, publicly listable
- **Hestia CP**: v1.9.4 on port 8083, hostname `fqdn.olivimails.com`
- **Redis**: 7.4.7 on port 6379, no auth, Docker container, 500 cached Lua scripts, 4 cryptojacking payloads
- **PostgreSQL**: port 5432, exposed to internet
- **Node.js**: port 3000, HTTP 500 on all endpoints (crashed)
- **Cloudflare account 1** (cass/felicity NS): myamericanprizes.com, noodledit.com, mydailysurge.com
- **Cloudflare account 2** (cheryl/logan NS): epicfunnels.net

### Domains (9)

- `myamericanprizes.com` — GoDaddy, registered **2023-08-22**, expires 2026-08-22
- `phef6trk.com` — Squarespace, registered 2024-06-25, **sinkholed to 10.0.0.1**
- `noodledit.com` — Cloudflare, registered 2024-10-18, GCS asset CDN
- `mydailysurge.com` — Cloudflare, registered 2025-03-19, SEO content farm
- `epicfunnels.net` — Sav.com, registered 2025-08-26, scam landing pages + email
- `olivimails.com` — **expired**, EC2 hostname only
- `easyscanamoe.com` — SCA Promotions AMOE system
- `snagalot.com` — mirrors giveaway rules
- `myamericanprizes1.com` — variant/backup domain

### CPA Tracker (phef6trk.com)

- **Sinkholed**: A record `10.0.0.1`, AAAA `fd25:ef1b:4b44:1::1`
- **7 affiliate IDs**: `FGK5P4`, `361GFK`, `JNS98R`, `KZDWFR`, `R1HQJL`, `THFD9F`, `7LKLK3`
- **6+ campaign IDs**: `2Z57CD5`, `24X9WZ1`, `2JSKXKP`, `2M5TG68`, `2RX68SJ`, `JHMHC2`
- **Offer IDs** (`__po`): 610, 611, 612, 628, 704, 709
- **Publisher IDs** (`sub1`): 42358, 47429, 51398, 18603, 6823cf198c7f65155e8a7999

### Social Media Accounts (10+)

- **Twitter/X**: @GetnGoods, @mydailysurge
- **Instagram**: @getngoods, @mydailysurge, @theupgradeclub, @jessytheupgradeclub
- **TikTok**: @getngoods, @mydailysurge, @jessytheupgradeclub (58.4K followers)
- **Facebook**: @getngoods, @mydailysurge

### Compliance Vendors

- **ActiveProspect verification (epicfunnels.net)**: `M+mUYgTDEprxDUAdcdobLA==`
- **ActiveProspect verification (myamericanprizes.com)**: `DdrUnuCT8xESAT7uOdJmqg==`
- **Jornaya**: referenced in privacy policy on explore.mydailysurge.com
- **SCA Promotions**: prize administrator, 3030 LBJ Freeway Suite 300, Dallas TX 75234
- **EasyScan AMOE key**: `4j8lbrw52v`
- **Lovable AI project ID**: `p98pqg`
- **Google Analytics**: `G-BSTM4RV28F`
- **Google Tag Manager**: `GTM-N3JVLCTN`
- **Webflow site ID**: `68129c0789b42b5281896601`
- **Ve Global / veinteractive.com**: retargeting platform in GTM

### Brands (15+)

- GetnGoods, MyDailySurge, PrizeZappy, SnagNGoods, PrizeZar, PlayZoodle
- HealthPlanScouts, Fresh Health Plan, LendliV2, Prismique, CheckGo
- BenefitsAccessCenter, TheDailyTipJar, OPG Housing, CustomerTestConnect
- MyAmericanPrizes (legal entity name on sweepstakes rules)

### Key People at Third-Party Companies

- **Steve Rafferty** — CEO/Founder, ActiveProspect (Austin, TX)
- **Bob Hamman** — Founder, SCA Promotions (Dallas, TX), professional bridge player
- **Chris Hamman** — VP/Executive Director, SCA Promotions
- **Morris Laniado** — Co-Founder/President, Moxxi Digital (NYC), ex-Fluent Inc.

---

## The Stack

```
VICTIM fills out form on scam page (fake iPhone giveaway / fake gov benefits portal)
    │
    ▼
ACTIVEPROSPECT generates TrustedForm certificate ("proof" of consent)
    │
    ▼
JORNAYA assigns LeadiD, tracks session behavior (now same company as ActiveProspect)
    │
    ▼
SCA PROMOTIONS / EASYSCAN AMOE wraps everything in sweepstakes legal compliance
    │
    ▼
Lead is packaged: consent certificate + behavioral data + sweepstakes compliance
    │
    ▼
Lead sold to CPA network buyer (insurance companies, loan companies, etc.)
    │
    ▼
Buyer defends TCPA lawsuits: "We have TrustedForm + Jornaya + AMOE"
    │
    ▼
Victim gets spam calls. No food stamps. No iPhone. No rental assistance.
```

Cost to the scammer: ActiveProspect TrustedForm Certify is **free** for publishers. Jornaya JS tag is free to embed. SCA Promotions charges for prize administration but the "prize" is a single $1,000 drawing per year. Total legal cover cost: minimal. Total harm: industrial scale.

---

## 1. ActiveProspect — The Consent Washing Machine

### Company Profile

| Field | Value |
|-------|-------|
| **Legal Name** | ActiveProspect, Inc. |
| **HQ** | 4203 Guadalupe St, Austin, TX |
| **Founded** | 2004 |
| **CEO/Founder** | Steve Rafferty |
| **Employees** | ~159 |
| **Backed By** | Five Elms Capital (growth investment, April 2020) |
| **Products** | TrustedForm (consent certificates), LeadConduit (lead routing/validation) |

### What They Do

ActiveProspect sells TCPA compliance infrastructure. Their flagship product, **TrustedForm**, generates a "Certificate of Authenticity" every time a consumer submits a form on a page with their JavaScript tag. The certificate is then attached to the lead as it moves through the CPA pipeline. Downstream buyers (insurance companies, loan providers, etc.) use the certificate to defend against TCPA lawsuits — "Look, we have independent third-party proof of consent."

### The January 2026 Acquisition

On **January 8, 2026**, ActiveProspect acquired **Verisk Marketing Solutions** (VMS) from Verisk Analytics (announced via [GlobeNewsWire](https://www.globenewswire.com/news-release/2026/01/08/3215813/0/en/Verisk-Announces-Sale-of-its-Marketing-Solutions-Business-to-ActiveProspect.html) and [ActiveProspect blog](https://activeprospect.com/blog/activeprospect-has-acquired-verisk-marketing-solutions/)).

VMS was formed from the merger of **Jornaya** and **Infutor**. This means:

- **ActiveProspect and Jornaya are now the same company**
- The two "separate" compliance vendors in the Moxxi Media scam's legal cover are actually one entity
- Combined, they "certify over 1 billion opt-in leads annually"
- This is a near-monopoly on TCPA consent verification in the lead gen industry

TCPAWorld (an industry blog by attorney Eric Troutman) [called the deal](https://tcpaworld.com/2026/01/08/woah-huge-tcpaworld-news-as-active-prospect-devours-jornaya-and-i-love-to-see-it/) a "huge win for the good guys." The irony of that headline, given who's using the product.

### How Scammers Use ActiveProspect

The sign-up process has no meaningful vetting:

1. Create a **free** TrustedForm Certify account (self-service, online)
2. Add your domain
3. Verify domain ownership via DNS TXT record (automated — no human review)
4. Embed the TrustedForm JavaScript tag on your forms
5. Every form submission now generates a "Certificate of Authenticity"
6. Sell leads with certificates attached — buyers accept them as proof of consent

ActiveProspect verifies that **a form was submitted**. It does not verify that **the underlying offer is legitimate**. A fake government benefits portal that harvests personal data from people who can't afford food generates the same TrustedForm certificate as a legitimate insurance quote page.

### Integration Into This Scam

Two ActiveProspect domain verifications found in DNS:

- **epicfunnels.net**: `activeprospect-domain-verification=M+mUYgTDEprxDUAdcdobLA==`
- **myamericanprizes.com**: `activeprospect-domain-verification=DdrUnuCT8xESAT7uOdJmqg==`

Two separate verification keys = either two ActiveProspect accounts or one account with two verified domains. No evidence ActiveProspect has ever flagged, investigated, or deplatformed the operation — despite it running fake government benefit portals, being Spamhaus blocklisted, having a sinkholed tracker, and operating a TikTok engagement bot network.

---

## 2. Jornaya — Now Part of ActiveProspect

### Company Profile

| Field | Value |
|-------|-------|
| **Original Name** | LeadiD → Jornaya |
| **Acquired By** | Verisk Analytics → sold to ActiveProspect (Jan 8, 2026) |
| **Products** | LeadiD (consumer session tracking), TCPA Guardian (consent verification) |
| **Role** | Behavioral data and consent chain documentation |

### What They Do

When a publisher integrates Jornaya's JavaScript tag, the system assigns a unique **LeadiD** to each consumer session. It then tracks behavioral data: which pages the consumer visited, how long they spent on each page, how many form fields they interacted with, whether they visited competing sites, and whether they've been shopping across multiple lead generation properties.

Downstream lead buyers use Jornaya's **TCPA Guardian** to verify consent in real-time before dialing. If the Jornaya record shows the consumer interacted with the form and the consent language was present, the lead is cleared for automated dialing.

### What Jornaya Does for the Scam

When a victim fills out a form on a scam page, Jornaya's JS tag creates a consent record. This record follows the lead through the CPA pipeline. Downstream buyers verify the Jornaya LeadiD before purchasing. The Jornaya record "proves" the lead gave consent — even though they were tricked by a fake government benefits page or a fake iPhone giveaway.

Jornaya's own marketing says it detects "bots and suspicious patterns." The scam operation has an active engagement bot network on TikTok. But Jornaya tracks form submissions, not social media bots — the bot traffic is upstream of Jornaya's visibility.

### The Double Privacy Policy

The privacy policy on `explore.mydailysurge.com` links to both:
- `activeprospect.com/privacy-policy`
- `jornaya.com/consumer-privacy-policy/`

Two privacy policies for what is now one company. The scam's terms and conditions reference both as if they're independent compliance vendors. They haven't been since January 8, 2026.

---

## 3. SCA Promotions — EasyScan AMOE

### Company Profile

| Field | Value |
|-------|-------|
| **Legal Name** | SCA Promotions, Inc. |
| **HQ** | 3030 LBJ Freeway, Suite 300, Dallas, TX 75234 |
| **Founded** | 1986 |
| **Founder** | Bob Hamman (professional bridge player) |
| **VP/Executive Director** | Chris Hamman |
| **BBB Accredited** | **No** |
| **Claims** | "Covered billions of dollars in risk, awarded over $253 million in prizes" |

### What EasyScan AMOE Is

US sweepstakes law requires every promotion to offer a free entry method — an **Alternative Means of Entry** (AMOE). Without it, a "sweepstakes" that requires purchase or personal data submission becomes an illegal lottery.

SCA Promotions' patented **EasyScan AMOE** is a digital system that replaces the traditional mail-in entry. It provides a web form where consumers can enter the sweepstakes without purchasing anything or submitting personal data to the operator. This satisfies the FTC's no-purchase-necessary requirement.

### SCA's Role in the Scam

SCA Promotions is the **prize administrator** for the MyAmericanPrizes / MyDailySurge operation:

- The AMOE system for this operation: `easyscanamoe.com/easyscan/default/enter?amoe_key=4j8lbrw52v`
- The mail-in entry address goes to SCA's office: **3030 LBJ Freeway, Suite 300, Dallas, TX 75234**
- The sweepstakes "prize": **one $1,000 cash award** per year, random drawing
- The sweepstakes rules are governed by **Texas law** (SCA's home state)
- SCA handles the legal compliance framework that prevents the FTC from immediately classifying the operation as an illegal lottery

SCA is a legitimate company providing sweepstakes infrastructure as a service. They get paid regardless of whether the client's underlying marketing is predatory. Whether SCA knows their client is running fake government benefit portals for people who can't afford food, impersonating SNAP applications and unemployment insurance — that is an open question.

### Complaints

SCA Promotions has complaints on [ScamPulse](https://www.scampulse.com/sca-promotions-reviews), [Sitejabber](https://www.sitejabber.com/reviews/scapromotions.com), and [BBB](https://www.bbb.org/us/tx/dallas/profile/advertising-agencies/s-c-a-promotions-0875-29865) (not accredited) about non-payment of prizes and questionable verification procedures. One complaint alleges an insider rigged a sweepstakes and SCA never paid the $1,000,000 prize.

### Recent Expansion

SCA recently partnered with SCCG Management to bring EasyScan AMOE to the social gaming and iGaming sectors — expanding their sweepstakes compliance infrastructure into new industries.

---

## 4. Moxxi Media — The Ghost Entity

### What We Know

The operating entity behind `myamericanprizes.com` is **Moxxi Media**, identified via DKIM selectors:

```
selector1._domainkey → selector1-myamericanprizes-com._domainkey.moxximedia.onmicrosoft.com
selector2._domainkey → selector2-myamericanprizes-com._domainkey.moxximedia.onmicrosoft.com
```

M365 tenant ID: `MS=ms46839871`. The domain `moxximedia.com` is **not registered**. They exist only as a Microsoft 365 tenant with no public website, no domain, no corporate registration under that exact name.

### Three "Moxxi" Entities Found Online

| Entity | Location | Leadership | Business | Match Likelihood |
|--------|----------|------------|----------|------------------|
| **Moxxi Digital** | New York City | Morris Laniado (Co-Founder/President) | Performance marketing, CPA lead gen | **HIGH** |
| **Moxxi Media** | Minneapolis, MN | Kari Whittemore | Social media management (19 Facebook likes) | LOW |
| **Moxxi Marketing** | Unknown | Kari Whittemore | Website design, SEO | LOW |

### Moxxi Digital — The Suspicious Match

**Moxxi Digital** is a NYC-based performance marketing company:

- **Co-Founder/President**: Morris Laniado
- **Background**: Previously at **Fluent, Inc.** (NYSE: FLNT — a major publicly traded performance marketing/lead gen company), SelectQuote Insurance Services, and Jade Global Group
- **Education**: Bachelor's in Entrepreneurship, Communications, & Political Science from Baruch College (2007-2011)
- **Employees**: ~26
- **Status**: Bootstrapped, profitable
- **Business model**: "Promotion-based marketing that drives lead opt-in lead generation and ROI-focused customer acquisition at scale"
- **Technology**: "Proprietary martech and adtech applications combined with automation and AI"

The M365 tenant is `moxxiMEDIA` but the public company calls itself `moxxiDIGITAL`. This could be:
- An older name (media → digital rebrand)
- A subsidiary or DBA
- A completely different entity that happens to share a naming convention

**The business model matches exactly.** "Promotion-based marketing that drives opt-in lead generation" is a precise description of what the scam operation does. Morris Laniado's background at Fluent, Inc. — one of the largest CPA lead generation companies in the US — provides exactly the industry connections and expertise required to build and operate an industrial-scale lead gen operation like this one.

**This is not a confirmed identification.** The M365 tenant name mismatch (media vs. digital) leaves room for this to be a different "Moxxi" entity. But the business model alignment, the CPA lead gen expertise, and the Fluent Inc. pedigree make Moxxi Digital the strongest candidate by far.

---

## 5. The Sponsor Address — A UPS Store Mailbox

Both MyAmericanPrizes and MyDailySurge list their sponsor address as:

> **68 White Street, Suite 7-291, Red Bank, NJ 07701**

This address is **The UPS Store #3488**.

- "Suite 7" is the UPS Store's suite number within the building at 68 White Street
- "291" is the **mailbox number** within the UPS Store
- UPS Store mailboxes provide a street address (not a PO Box) for precisely this purpose — to make a mailbox look like a real office
- The UPS Store at this location offers shipping, printing, notary, and mailbox rental services
- Phone: (732) 530-0664

The operation has no physical office at this address. It's a rented mailbox in a strip mall UPS Store in Red Bank, New Jersey.

**Contact email**: `support@mydailysurge.com`

**Zendesk help center**: `mydailysurge.zendesk.com/hc/en-us` — live and operational, confirms the Zendesk reference found in the epicfunnels.net SPF record (`include:mail.zendesk.com`).

---

## 6. New Domains Discovered

### snagalot.com (Domain #8)

Hosts the **identical $1,000 giveaway rules** as myamericanprizes.com at `/1000-giveaway-rules-map`. Same sponsor (MyAmericanPrizes), same address (68 White St UPS Store), same SCA Promotions prize administration, same AMOE key (`4j8lbrw52v`), same Zendesk support link.

### myamericanprizes1.com (Domain #9)

Variant domain hosting the same $1,000 giveaway rules at `/1000-giveaway-rules`. Identical content to myamericanprizes.com rules page. The `1` suffix suggests either a backup domain, an A/B test, or a domain created when the original was flagged.

### Updated Domain Count

| # | Domain | Role | Status |
|---|--------|------|--------|
| 1 | myamericanprizes.com | OG sweepstakes brand, Moxxi Media M365 | Active |
| 2 | phef6trk.com | CPA affiliate tracker | Sinkholed (10.0.0.1) |
| 3 | noodledit.com | Asset CDN (GCS buckets) | Active |
| 4 | mydailysurge.com | SEO content farm + sweepstakes | Active |
| 5 | epicfunnels.net | Scam landing pages + email | Active |
| 6 | olivimails.com | EC2 hostname (shadow domain) | Expired |
| 7 | easyscanamoe.com | AMOE sweepstakes entry (SCA Promotions) | Active (third-party) |
| 8 | snagalot.com | Giveaway rules mirror | Active |
| 9 | myamericanprizes1.com | Variant/backup domain | Active |

---

## 7. The Terms and Conditions — What Victims Agree To

The MyDailySurge terms and conditions (served from myamericanprizes.com) explicitly state:

**Data sharing with "Marketing Partners"**: Defined as "advertisers, including telemarketing partners, and persons with whom we share your personal information." Users who respond to survey questions consent to having their answers shared "with the Marketing Partners named in the consent."

**TCPA consent**: "For the avoidance of doubt...you agree to arbitrate any dispute related to any emails, text messages or telephone calls you may receive from us or our Marketing Partners." Users consent to "telemarketing or SMS/text messaging."

**Arbitration**: Mandatory arbitration with 30-day opt-out window. Governed by Texas law (SCA Promotions' home state). Administered through the American Arbitration Association.

**Translation**: When you enter your personal information on a fake government benefits page hoping to get food stamps, you've "consented" to receive telemarketing calls from an unlimited number of unnamed "Marketing Partners." If you want to sue, you can't — it's binding arbitration in Texas. The operation's lawyers thought of everything.

---

## 8. The Ecosystem

These are not four separate companies independently providing services. This is a **vertically integrated compliance stack** purpose-built for the CPA lead generation industry:

- **ActiveProspect** (Austin, TX) provides the consent certificate
- **Jornaya** (now ActiveProspect) provides the behavioral tracking and consent chain
- **SCA Promotions** (Dallas, TX) provides the sweepstakes legal wrapper
- **Moxxi Media** (UPS Store mailbox, Red Bank, NJ) operates the scam pages, brands, and infrastructure

ActiveProspect acquired Jornaya three months before this investigation. The scam's privacy policy still references them as separate companies. A lead generated on a fake food stamps page now gets consent-verified by a company that processes a billion leads a year, tracked by a behavioral intelligence platform that was independent until January, wrapped in sweepstakes compliance by a 40-year-old Dallas company founded by a bridge player, and sold to advertisers who can point to all of this as proof they followed the law.

The victim enters their name, address, phone, and income on a page impersonating a government benefit. They get nothing. Their data gets everything: a TrustedForm certificate, a Jornaya LeadiD, AMOE compliance, TCPA consent documentation, and a one-way ticket to the data broker pipeline.

---

## Sources

- [ActiveProspect acquires Verisk Marketing Solutions](https://activeprospect.com/blog/activeprospect-has-acquired-verisk-marketing-solutions/) (Jan 8, 2026)
- [Verisk press release](https://www.globenewswire.com/news-release/2026/01/08/3215813/0/en/Verisk-Announces-Sale-of-its-Marketing-Solutions-Business-to-ActiveProspect.html) (GlobeNewsWire)
- [TCPAWorld coverage](https://tcpaworld.com/2026/01/08/woah-huge-tcpaworld-news-as-active-prospect-devours-jornaya-and-i-love-to-see-it/)
- [ActiveProspect domain verification docs](https://support.activeprospect.com/hc/en-us/articles/44098193614996-Confirm-Domain-Ownership)
- [TrustedForm Certify setup](https://activeprospect.com/blog/trustedform-setup/)
- [Five Elms Capital portfolio](https://www.fiveelms.com/company/activeprospect/)
- [SCA Promotions — EasyScan AMOE](https://scapromotions.com/easyscanamoe/)
- [SCA Promotions — About](https://scapromotions.com/about/)
- [SCA Promotions BBB](https://www.bbb.org/us/tx/dallas/profile/advertising-agencies/s-c-a-promotions-0875-29865)
- [MyAmericanPrizes CPA listing (Affplus)](https://www.affplus.com/o/myamericanprizes-amazon-giveaway-us-cpl-personal-approval)
- [The UPS Store #3488, 68 White St, Red Bank NJ](https://locations.theupsstore.com/nj/red-bank/68-white-st)
- [MyDailySurge Zendesk Help Center](https://mydailysurge.zendesk.com/hc/en-us)
- [Jornaya TCPA Guardian](https://www.jornaya.com/products/tcpa-guardian/)
- [Consent tools compared: TrustedForm vs Jornaya](https://www.claim.supply/blog/consent-verification-tools-compared/)
