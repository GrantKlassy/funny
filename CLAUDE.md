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

**TL;DR**: CPA affiliate scam funnel disguised as a sweepstakes. Lovable AI-generated landing page, 6 connected domains (epicfunnels.net, noodledit.com, mydailysurge.com, phef6trk.com, olivimails.com, myamericanprizes.com), full email infrastructure (Roundcube 1.6.11 + SMTP/IMAP on AWS EC2), asset CDN on Google Cloud Storage, affiliate tracker now sinkholed. Multiple brands ("GetnGoods", "MyDailySurge", "MyAmericanPrizes") with 10+ social media accounts across 4 platforms. Wayback Machine reveals operation dates to December 2023 with 7 different affiliate IDs through the tracker. AMOE sweepstakes system integration, Jornaya lead intelligence, ActiveProspect TCPA — professionally assembled legal cover for AI-generated garbage. EC2 IP on Spamhaus blocklist. 11 open ports including passwordless Redis. 0 working parts.

## Git Rules

- All commits must be authored and committed as `grantklassy <28637437+GrantKlassy@users.noreply.github.com>`
- Never add `Co-Authored-By` trailers — GitHub counts them as contributors
- Push via the `github.com-gk` SSH alias only

