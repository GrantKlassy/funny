#!/usr/bin/env bash
# Reproducible investigation of the epicfunnels.net scam network.
# Run from the repo root: bash investigations/epicfunnels/scripts/run-investigation.sh
#
# Requires: podman, the scam-investigator image built from Containerfile.investigator
# Build:    podman build -t scam-investigator -f Containerfile.investigator .

set -euo pipefail

OUTDIR="investigations/epicfunnels"
IMAGE="scam-investigator"

if ! podman image exists "$IMAGE"; then
  echo "Building $IMAGE..."
  podman build -t "$IMAGE" -f Containerfile.investigator .
fi

echo "=== Container 1: noodledit.com + MyDailySurge ==="
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "=== NOODLEDIT.COM MAIN PAGE ==="
curl -sL https://noodledit.com/ | head -100

echo ""
echo "=== SUBDOMAIN ENUMERATION ==="
for sub in www b sassets api app admin dashboard login cdn static assets media img images upload uploads files blog shop store pay payment; do
  result=$(dig +short "$sub.noodledit.com" 2>/dev/null)
  if [ -n "$result" ]; then echo "$sub.noodledit.com -> $result"; fi
done

echo ""
echo "=== IPHONE PROMO IMAGE EXIF ==="
curl -sL "https://b.noodledit.com/promotions/iphone17promax1000.png" -o /tmp/promo.png 2>/dev/null
exiftool /tmp/promo.png 2>/dev/null

echo ""
echo "=== MYDAILYSURGE SVG METADATA ==="
curl -sL "https://sassets.noodledit.com/pages/logo_mydailysurge.svg" | head -5
echo ""
curl -sL "https://sassets.noodledit.com/pages/logo_mydailysurge.svg" | strings | grep -iE "(author|creator|generator|adobe|inkscape|figma|sketch|canva|lovable)" | head -10

echo ""
echo "=== MYDAILYSURGE.COM ==="
dig mydailysurge.com +short 2>/dev/null
dig mydailysurge.com NS +short 2>/dev/null
curl -sI https://mydailysurge.com/ 2>&1 | head -15

echo ""
echo "=== RELATIONSHIP: NAMESERVER COMPARISON ==="
echo "epicfunnels.net NS:"; dig epicfunnels.net NS +short 2>/dev/null
echo "noodledit.com NS:"; dig noodledit.com NS +short 2>/dev/null
'

echo ""
echo "=== Container 2: JS bundle deep analysis ==="
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
curl -sL "https://jessica.epicfunnels.net/assets/index-CUlwK__p.js" -o /tmp/bundle.js 2>/dev/null
echo "Bundle size: $(wc -c < /tmp/bundle.js) bytes"
npx -y js-beautify /tmp/bundle.js > /tmp/bundle.pretty.js 2>/dev/null
echo "Beautified: $(wc -c < /tmp/bundle.pretty.js) bytes"

echo ""
echo "=== FETCH/SUBMIT HANDLERS ==="
grep -n -iE "(\.submit|fetch\(|XMLHttpRequest|\.post\(|\.send\(|axios|formData|sendBeacon)" /tmp/bundle.pretty.js | head -20

echo ""
echo "=== REDIRECT/NAVIGATION ==="
grep -n -iE "(window\.location|window\.open|navigate|redirect)" /tmp/bundle.pretty.js | grep -v "reactjs.org" | head -20

echo ""
echo "=== ALL HARDCODED URLS ==="
grep -oP "https?://[a-zA-Z0-9._/-]+" /tmp/bundle.pretty.js | sort -u

echo ""
echo "=== BRAND NAMES ==="
grep -n -iE "(getngoods|mydailysurge|noodledit|epicfunnels)" /tmp/bundle.pretty.js | head -20

echo ""
echo "=== SCAM STRINGS ==="
grep -n -iE "(congratulations|winner|claim|prize|reward|selected|exclusive|limited|hurry|expire)" /tmp/bundle.pretty.js | head -30
'

echo ""
echo "=== Container 3: Email infrastructure ==="
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "=== ROUNDCUBE VERSION ==="
curl -sL http://webmail.epicfunnels.net/ 2>&1 | grep -o "rcversion:[0-9]*"

echo ""
echo "=== SMTP 587 ==="
timeout 10 bash -c "echo QUIT | ncat -w5 13.220.193.170 587" 2>&1 || echo "timeout/refused"

echo ""
echo "=== IMAP 143 ==="
timeout 10 bash -c "echo LOGOUT | ncat -w5 13.220.193.170 143" 2>&1 || echo "timeout/refused"

echo ""
echo "=== IMAP 993 (SSL) ==="
timeout 10 bash -c "echo QUIT | ncat --ssl -w5 13.220.193.170 993" 2>&1 || echo "timeout/refused"

echo ""
echo "=== SSL CERT (mail server direct) ==="
echo | timeout 10 openssl s_client -connect 13.220.193.170:443 -servername epicfunnels.net 2>/dev/null | openssl x509 -noout -text 2>/dev/null | grep -E "(Subject:|Issuer:|DNS:|Not Before|Not After)"

echo ""
echo "=== SSL CERT (webmail via cloudflare) ==="
echo | timeout 10 openssl s_client -connect webmail.epicfunnels.net:443 -servername webmail.epicfunnels.net 2>/dev/null | openssl x509 -noout -text 2>/dev/null | grep -E "(Subject:|Issuer:|DNS:|Not Before|Not After)"

echo ""
echo "=== REVERSE DNS ==="
dig -x 13.220.193.170 +short 2>/dev/null

echo ""
echo "=== ROUNDCUBE PATH EXPOSURE ==="
for path in /installer/ /INSTALL /README.md /CHANGELOG.md /SQL/ /config/ /logs/; do
  code=$(curl -so /dev/null -w "%{http_code}" "http://webmail.epicfunnels.net${path}" 2>/dev/null)
  echo "webmail.epicfunnels.net${path} -> HTTP $code"
done
'

echo ""
echo "=== Container 4: API endpoints + tracker ==="
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "=== /api/continue-click ==="
curl -sI "https://jessica.epicfunnels.net/api/continue-click" 2>&1 | head -10

echo ""
echo "=== /api/continue ==="
curl -sI "https://jessica.epicfunnels.net/api/continue" 2>&1 | head -10

echo ""
echo "=== PHEF6TRK.COM WHOIS ==="
whois phef6trk.com 2>&1 | grep -iE "(domain name|registrar|creation|expiry|name server|status)" | head -15

echo ""
echo "=== PHEF6TRK.COM DNS (sinkhole check) ==="
dig @8.8.8.8 phef6trk.com +short 2>/dev/null
dig @1.1.1.1 phef6trk.com +short 2>/dev/null
dig @9.9.9.9 phef6trk.com +short 2>/dev/null
'

echo ""
echo "Done. $(date -Iseconds)"
