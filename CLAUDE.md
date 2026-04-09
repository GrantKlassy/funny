# funny

I think they might actually be funny
Home Assistant works over wifi now :think:
Also that TikTok like, that was pretty cool :)
It's at least somewhat funny
Investigate!!

## Investigation: epicfunnels.net

Initial questions when the site was discovered:

- Is Lovable AI being abused to mass-produce scam sites, or is the platform itself compromised? (supply chain angle)
- Is this state-sponsored infrastructure? (honeypot, surveillance)
- Or just standard scam operators using cheap AI tooling?

**Rule: investigation only.** No building exploit code, replicating infrastructure, or creating tools. Research and document.

## Findings

See [investigations/epicfunnels/](investigations/epicfunnels/) for the full write-up.

**TL;DR**: CPA affiliate scam funnel. Lovable AI-generated landing page, 4 connected domains (epicfunnels.net, noodledit.com, mydailysurge.com, phef6trk.com), full email infrastructure (Roundcube 1.6.11 + SMTP/IMAP on AWS EC2), asset CDN on Google Cloud Storage, affiliate tracker now sinkholed. Multiple brands ("GetnGoods", "MyDailySurge") suggest a repeatable operation.

## Git Rules

- All commits must be authored and committed as `grantklassy <28637437+GrantKlassy@users.noreply.github.com>`
- Never add `Co-Authored-By` trailers — GitHub counts them as contributors
- Push via the `github.com-gk` SSH alias only

