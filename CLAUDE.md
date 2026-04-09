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

**TL;DR**: CPA affiliate scam funnel operated by **Moxxi Digital** (NYC, d/b/a Moxxi Media, d/b/a Reward Zinga) — a consent farm lead generation company founded by veterans of **Fluent, Inc.** (NASDAQ: FLNT), which was sued by the FTC in July 2023 for the exact same scam. 4 of 5 known Moxxi leaders came from Fluent: **Morris Laniado** (President, ex-Fluent AVP Data Revenue), **Kevin Riehl** (CPO, ex-Fluent Director of Product, created "The Smart Wallet"), **Jeffrey Kauffman** (General Counsel, ex-Fluent Chief Compliance Officer, ex-Affinion Group), **Carl Augustin** (VP, ex-Fluent founding member). moxxi.io registered May 2023 (2 months before FTC sued Fluent), myamericanprizes.com registered August 2023 (1 month after). Brand name "MyAmericanPrizes" echoes Fluent subsidiary "American Prize Center LLC." Same playbook: fake sweepstakes harvest TCPA consent, leads sold to telemarketers/insurance companies. Same vendors: ActiveProspect + Jornaya (Laniado had direct relationship with Jornaya at Fluent). 10 connected domains including rewardzinga.com (subscription scam, ScamAdviser score 0/100). Laniado lives in Monmouth County NJ, founded Jade Global Group LLC in Red Bank NJ — the town where Moxxi's UPS Store mailbox is. 85 Broad St NYC (WeWork) office, 36 employees, bootstrapped/profitable, actively hiring via Greenhouse. BBB rated D+. Fluent's total regulatory damage: $6.45M+ (FTC $2.5M consent farm, NY AG $3.7M fake net neutrality comments, PA AG $250K illegal robocalls). Kauffman's previous employer Affinion Group settled for $30M across 46 states. See [OPERATOR-INTEL.md](investigations/epicfunnels/OPERATOR-INTEL.md) for the full operator deep dive, [THIRD-PARTY-INTEL.md](investigations/epicfunnels/THIRD-PARTY-INTEL.md) for third-party companies.

## Git Rules

- All commits must be authored and committed as `grantklassy <28637437+GrantKlassy@users.noreply.github.com>`
- Never add `Co-Authored-By` trailers — GitHub counts them as contributors
- Push via the `github.com-gk` SSH alias only

