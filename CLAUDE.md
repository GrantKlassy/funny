# funny

I think they might actually be funny
The TikTok is definitely funny
It's at least somewhat funny
Investigate this thingie

## Investigation: epicfunnels.net

Initial questions when the site was discovered:

- Is Lovable AI being abused to mass-produce scam sites, or is the platform itself compromised? (supply chain angle)
- Is this state-sponsored infrastructure? (honeypot, surveillance)
- Or just standard scam operators using cheap AI tooling?

**Rule: investigation only.** No building exploit code, replicating infrastructure, or creating tools. Research and document.

## Findings

See [investigations/epicfunnels/](investigations/epicfunnels/) for the full write-up.

**TL;DR**: CPA affiliate scam funnel operated by Moxxi Media (moxximedia.onmicrosoft.com M365 tenant), running a CustomerTestConnect backend (Express.js + Handlebars) behind Lovable AI-generated landing pages. 9 connected domains (epicfunnels.net, noodledit.com, mydailysurge.com, phef6trk.com, olivimails.com (expired), myamericanprizes.com (OG since Aug 2023), easyscanamoe.com (AMOE system), snagalot.com (rules mirror), myamericanprizes1.com (variant)). 15+ brand names across 8 verticals — sweepstakes, electronics, vehicles, luxury, gas rewards, government benefits fraud, health insurance lead gen, lending — including GetnGoods, MyDailySurge, PrizeZappy, PlayZoodle, HealthPlanScouts, Fresh Health Plan, LendliV2, Prismique, OPG Housing, BenefitsAccessCenter, and more. 747+ GCS bucket assets actively updated (most recent: 2026-04-08). M365 email on myamericanprizes.com, Roundcube on epicfunnels.net, both on AWS EC2. 11 open ports including passwordless Redis (compromised by third-party cryptojacking botnet — attack failed, Docker container), exposed PostgreSQL, exposed Hestia admin panel. Spamhaus blocklisted. 10+ social media accounts across 4 platforms plus active engagement bot network. Full TCPA legal cover: ActiveProspect + Jornaya (same company since Jan 2026 acquisition), SCA Promotions EasyScan AMOE (Dallas, TX) — professionally assembled legal cover for AI-generated garbage. Sponsor address is a UPS Store mailbox (68 White St #7-291, Red Bank NJ = UPS Store #3488). Moxxi Digital (NYC, founded by ex-Fluent Inc. exec Morris Laniado) is the strongest candidate for the moxximedia M365 tenant — "promotion-based marketing that drives opt-in lead generation at scale." Operation dates to December 2023 with 7 affiliate IDs through sinkholed tracker. CPA tracker sinkholed, Node.js backend crashed, olivimails.com expired. 0 working parts of the actual monetization. See [THIRD-PARTY-INTEL.md](investigations/epicfunnels/THIRD-PARTY-INTEL.md) for the full third-party company deep dive.

## Git Rules

- All commits must be authored and committed as `grantklassy <28637437+GrantKlassy@users.noreply.github.com>`
- Never add `Co-Authored-By` trailers — GitHub counts them as contributors
- Push via the `github.com-gk` SSH alias only

