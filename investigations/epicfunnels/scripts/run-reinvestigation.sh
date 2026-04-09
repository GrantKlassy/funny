#!/usr/bin/env bash
# Fresh re-investigation of the epicfunnels.net scam network.
# Compares current state against the 2026-04-08 baseline.
#
# Run from repo root: bash investigations/epicfunnels/scripts/run-reinvestigation.sh
# Requires: podman, scam-investigator image
# Build:    podman build -t scam-investigator -f Containerfile.investigator .

set -euo pipefail

OUTDIR="investigations/epicfunnels/artifacts/reinvestigation-$(date +%Y-%m-%d)"
IMAGE="scam-investigator"
mkdir -p "$OUTDIR"

if ! podman image exists "$IMAGE"; then
  echo "Building $IMAGE..."
  podman build -t "$IMAGE" -f Containerfile.investigator .
fi

echo "Output directory: $OUTDIR"
echo ""

###############################################################################
echo "=== Probe 1: DNS Re-resolution (all domains + subdomains) ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
DOMAINS="epicfunnels.net noodledit.com mydailysurge.com phef6trk.com"
EPIC_SUBS="jessica jenny kylie afiliados socio socios evento app demo link m vpn www webmail"
NOODLE_SUBS="b sassets www"
MDS_SUBS="explore signup trck 1 5 15 25 31"
RESOLVERS="8.8.8.8 1.1.1.1 9.9.9.9"

echo "{"
echo "  \"probe\": \"dns_recheck\","
echo "  \"timestamp\": \"$(date -Iseconds)\","
echo "  \"results\": ["

first=true
for domain in $DOMAINS; do
  for resolver in $RESOLVERS; do
    a_records=$(dig +short @"$resolver" "$domain" A 2>/dev/null | tr "\n" "," | sed "s/,$//")
    ns_records=$(dig +short @"$resolver" "$domain" NS 2>/dev/null | tr "\n" "," | sed "s/,$//")
    if [ "$first" = true ]; then first=false; else echo ","; fi
    printf "    {\"domain\": \"%s\", \"resolver\": \"%s\", \"a\": \"%s\", \"ns\": \"%s\"}" "$domain" "$resolver" "$a_records" "$ns_records"
  done
done

# epicfunnels.net subdomains
for sub in $EPIC_SUBS; do
  fqdn="${sub}.epicfunnels.net"
  result=$(dig +short @8.8.8.8 "$fqdn" A 2>/dev/null | head -1)
  echo ","
  printf "    {\"domain\": \"%s\", \"resolver\": \"8.8.8.8\", \"a\": \"%s\", \"type\": \"subdomain\"}" "$fqdn" "$result"
done

# noodledit.com subdomains
for sub in $NOODLE_SUBS; do
  fqdn="${sub}.noodledit.com"
  result=$(dig +short @8.8.8.8 "$fqdn" A 2>/dev/null | head -1)
  echo ","
  printf "    {\"domain\": \"%s\", \"resolver\": \"8.8.8.8\", \"a\": \"%s\", \"type\": \"subdomain\"}" "$fqdn" "$result"
done

# mydailysurge.com subdomains
for sub in $MDS_SUBS; do
  fqdn="${sub}.mydailysurge.com"
  result=$(dig +short @8.8.8.8 "$fqdn" A 2>/dev/null | head -1)
  echo ","
  printf "    {\"domain\": \"%s\", \"resolver\": \"8.8.8.8\", \"a\": \"%s\", \"type\": \"subdomain\"}" "$fqdn" "$result"
done

# Email DNS records
echo ","
mx=$(dig +short @8.8.8.8 epicfunnels.net MX 2>/dev/null | tr "\n" "," | sed "s/,$//")
printf "    {\"domain\": \"epicfunnels.net\", \"resolver\": \"8.8.8.8\", \"mx\": \"%s\", \"type\": \"email\"}" "$mx"
echo ","
spf=$(dig +short @8.8.8.8 epicfunnels.net TXT 2>/dev/null | grep spf | tr -d "\"" | head -1)
printf "    {\"domain\": \"epicfunnels.net\", \"resolver\": \"8.8.8.8\", \"spf\": \"%s\", \"type\": \"email\"}" "$spf"
echo ","
dmarc=$(dig +short @8.8.8.8 _dmarc.epicfunnels.net TXT 2>/dev/null | tr -d "\"" | head -1)
printf "    {\"domain\": \"_dmarc.epicfunnels.net\", \"resolver\": \"8.8.8.8\", \"dmarc\": \"%s\", \"type\": \"email\"}"  "$dmarc"

# DKIM probes (new)
for selector in default google selector1 selector2 dkim mail; do
  dkim=$(dig +short @8.8.8.8 "${selector}._domainkey.epicfunnels.net" TXT 2>/dev/null | tr -d "\"" | head -1)
  if [ -n "$dkim" ]; then
    echo ","
    printf "    {\"domain\": \"%s._domainkey.epicfunnels.net\", \"resolver\": \"8.8.8.8\", \"dkim\": \"%s\", \"type\": \"email\"}" "$selector" "$dkim"
  fi
done

echo ""
echo "  ]"
echo "}"
' > "$OUTDIR/dns-recheck.json" 2>&1
echo "  -> $OUTDIR/dns-recheck.json"

###############################################################################
echo ""
echo "=== Probe 2: Subdomain Liveness (HTTP status) ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
TARGETS="
jessica.epicfunnels.net
jenny.epicfunnels.net
kylie.epicfunnels.net
afiliados.epicfunnels.net
socio.epicfunnels.net
socios.epicfunnels.net
evento.epicfunnels.net
app.epicfunnels.net
demo.epicfunnels.net
link.epicfunnels.net
webmail.epicfunnels.net
www.epicfunnels.net
epicfunnels.net
noodledit.com
mydailysurge.com
explore.mydailysurge.com
"

echo "{"
echo "  \"probe\": \"subdomain_liveness\","
echo "  \"timestamp\": \"$(date -Iseconds)\","
echo "  \"results\": ["

first=true
for target in $TARGETS; do
  status=$(curl -sI -o /dev/null -w "%{http_code}" --connect-timeout 10 --max-time 15 "https://${target}/" 2>/dev/null || echo "000")
  server=$(curl -sI --connect-timeout 10 --max-time 15 "https://${target}/" 2>/dev/null | grep -i "^server:" | head -1 | sed "s/server: //i" | tr -d "\r")
  location=$(curl -sI --connect-timeout 10 --max-time 15 "https://${target}/" 2>/dev/null | grep -i "^location:" | head -1 | sed "s/location: //i" | tr -d "\r")

  if [ "$first" = true ]; then first=false; else echo ","; fi
  printf "    {\"target\": \"%s\", \"http_status\": \"%s\", \"server\": \"%s\", \"location\": \"%s\"}" "$target" "$status" "$server" "$location"
done

# CDN asset checks
for url in "https://b.noodledit.com/promotions/iphone17promax1000.png" "https://b.noodledit.com/promotions/macbook1000.png" "https://sassets.noodledit.com/pages/logo_mydailysurge.svg"; do
  status=$(curl -sI -o /dev/null -w "%{http_code}" --connect-timeout 10 --max-time 15 "$url" 2>/dev/null || echo "000")
  echo ","
  printf "    {\"target\": \"%s\", \"http_status\": \"%s\", \"type\": \"asset\"}" "$url" "$status"
done

# API redirect check (critical: has operator switched trackers?)
echo ","
api_headers=$(curl -sI --connect-timeout 10 --max-time 15 "https://jessica.epicfunnels.net/api/continue" 2>/dev/null)
api_status=$(echo "$api_headers" | head -1 | awk "{print \$2}")
api_location=$(echo "$api_headers" | grep -i "^location:" | head -1 | sed "s/location: //i" | tr -d "\r")
printf "    {\"target\": \"jessica.epicfunnels.net/api/continue\", \"http_status\": \"%s\", \"location\": \"%s\", \"type\": \"api_redirect\"}" "$api_status" "$api_location"

echo ","
click_headers=$(curl -sI --connect-timeout 10 --max-time 15 "https://jessica.epicfunnels.net/api/continue-click" 2>/dev/null)
click_status=$(echo "$click_headers" | head -1 | awk "{print \$2}")
click_location=$(echo "$click_headers" | grep -i "^location:" | head -1 | sed "s/location: //i" | tr -d "\r")
printf "    {\"target\": \"jessica.epicfunnels.net/api/continue-click\", \"http_status\": \"%s\", \"location\": \"%s\", \"type\": \"api_redirect\"}" "$click_status" "$click_location"

echo ""
echo "  ]"
echo "}"
' > "$OUTDIR/subdomain-liveness.json" 2>&1
echo "  -> $OUTDIR/subdomain-liveness.json"

###############################################################################
echo ""
echo "=== Probe 3: EC2 Port Scan ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
TARGET="13.220.193.170"
PORTS="22 25 80 143 443 587 993 3000 3306 5432 6379 8080 8443 9090 27017"

echo "{"
echo "  \"probe\": \"port_scan\","
echo "  \"timestamp\": \"$(date -Iseconds)\","
echo "  \"target\": \"$TARGET\","
echo "  \"results\": ["

first=true
for port in $PORTS; do
  if timeout 5 ncat -w3 -z "$TARGET" "$port" 2>/dev/null; then
    status="open"
  else
    status="closed"
  fi

  if [ "$first" = true ]; then first=false; else echo ","; fi
  printf "    {\"port\": %d, \"status\": \"%s\"}" "$port" "$status"
done

echo ""
echo "  ],"

# Grab banners on known open ports
echo "  \"banners\": {"

# SMTP 587 banner
smtp_banner=$(timeout 5 bash -c "echo QUIT | ncat -w3 $TARGET 587" 2>&1 | head -3 | tr "\n" " " | tr "\"" "\\047")
printf "    \"587\": \"%s\"," "$smtp_banner"

# IMAP 143 banner
imap_banner=$(timeout 5 bash -c "echo LOGOUT | ncat -w3 $TARGET 143" 2>&1 | head -3 | tr "\n" " " | tr "\"" "\\047")
printf "    \"143\": \"%s\"," "$imap_banner"

# HTTP 80
http_banner=$(curl -sI --connect-timeout 5 --max-time 10 "http://$TARGET/" 2>/dev/null | head -5 | tr "\n" " " | tr "\"" "\\047")
printf "    \"80\": \"%s\"," "$http_banner"

# Node.js 3000
node_banner=$(curl -sI --connect-timeout 5 --max-time 10 "http://$TARGET:3000/" 2>/dev/null | head -5 | tr "\n" " " | tr "\"" "\\047")
printf "    \"3000\": \"%s\"" "$node_banner"

echo ""
echo "  }"
echo "}"
' > "$OUTDIR/port-scan.json" 2>&1
echo "  -> $OUTDIR/port-scan.json"

###############################################################################
echo ""
echo "=== Probe 4: SSL Certificate Check ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "{"
echo "  \"probe\": \"ssl_certs\","
echo "  \"timestamp\": \"$(date -Iseconds)\","
echo "  \"results\": ["

check_cert() {
  local host="$1"
  local sni="$2"
  local label="$3"

  cert_info=$(echo | timeout 10 openssl s_client -connect "$host" -servername "$sni" 2>/dev/null | openssl x509 -noout -subject -issuer -dates -ext subjectAltName 2>/dev/null || echo "FAILED")
  subject=$(echo "$cert_info" | grep "subject=" | sed "s/subject=//" | tr "\"" "\\047")
  issuer=$(echo "$cert_info" | grep "issuer=" | sed "s/issuer=//" | tr "\"" "\\047")
  not_before=$(echo "$cert_info" | grep "notBefore=" | sed "s/notBefore=//")
  not_after=$(echo "$cert_info" | grep "notAfter=" | sed "s/notAfter=//")
  san=$(echo "$cert_info" | grep "DNS:" | tr "\"" "\\047" | sed "s/^ *//" | head -1)

  printf "    {\"label\": \"%s\", \"host\": \"%s\", \"sni\": \"%s\", \"subject\": \"%s\", \"issuer\": \"%s\", \"not_before\": \"%s\", \"not_after\": \"%s\", \"san\": \"%s\"}" \
    "$label" "$host" "$sni" "$subject" "$issuer" "$not_before" "$not_after" "$san"
}

check_cert "13.220.193.170:443" "epicfunnels.net" "direct-ec2"
echo ","
check_cert "jessica.epicfunnels.net:443" "jessica.epicfunnels.net" "jessica-via-cf"
echo ","
check_cert "jenny.epicfunnels.net:443" "jenny.epicfunnels.net" "jenny-via-cf"
echo ","
check_cert "kylie.epicfunnels.net:443" "kylie.epicfunnels.net" "kylie-via-cf"
echo ","
check_cert "webmail.epicfunnels.net:443" "webmail.epicfunnels.net" "webmail-via-cf"

echo ""
echo "  ]"
echo "}"
' > "$OUTDIR/ssl-certs.json" 2>&1
echo "  -> $OUTDIR/ssl-certs.json"

###############################################################################
echo ""
echo "=== Probe 5: Tracker Sinkhole Verification ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "{"
echo "  \"probe\": \"tracker_sinkhole\","
echo "  \"timestamp\": \"$(date -Iseconds)\","

# DNS across resolvers
echo "  \"dns\": {"
for resolver in 8.8.8.8 1.1.1.1 9.9.9.9; do
  a=$(dig +short @"$resolver" phef6trk.com A 2>/dev/null | head -1)
  ns=$(dig +short @"$resolver" phef6trk.com NS 2>/dev/null | tr "\n" "," | sed "s/,$//")
  printf "    \"%s\": {\"a\": \"%s\", \"ns\": \"%s\"}" "$resolver" "$a" "$ns"
  if [ "$resolver" != "9.9.9.9" ]; then echo ","; fi
done
echo ""
echo "  },"

# Whois
echo "  \"whois\": {"
whois_out=$(whois phef6trk.com 2>&1)
registrar=$(echo "$whois_out" | grep -i "Registrar:" | head -1 | sed "s/.*Registrar: *//" | tr "\"" "\\047")
status=$(echo "$whois_out" | grep -i "Domain Status:" | head -3 | sed "s/.*Status: *//" | tr "\n" "," | sed "s/,$//")
creation=$(echo "$whois_out" | grep -i "Creation Date:" | head -1 | sed "s/.*Date: *//" | tr -d "\r")
expiry=$(echo "$whois_out" | grep -i "Expir" | head -1 | sed "s/.*Date: *//" | tr -d "\r")
printf "    \"registrar\": \"%s\",\n    \"status\": \"%s\",\n    \"creation\": \"%s\",\n    \"expiry\": \"%s\"" "$registrar" "$status" "$creation" "$expiry"
echo ""
echo "  },"

# HTTP attempt
echo "  \"http_attempt\": {"
http_result=$(curl -sI --connect-timeout 10 --max-time 15 "https://www.phef6trk.com/FGK5P4/2Z57CD5/" 2>&1 | head -5 | tr "\n" " " | tr "\"" "\\047")
printf "    \"result\": \"%s\"" "$http_result"
echo ""
echo "  }"

echo "}"
' > "$OUTDIR/tracker-status.json" 2>&1
echo "  -> $OUTDIR/tracker-status.json"

###############################################################################
echo ""
echo "=== Probe 6: explore.mydailysurge.com Changes ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "{"
echo "  \"probe\": \"explore_mydailysurge\","
echo "  \"timestamp\": \"$(date -Iseconds)\","

# Fetch headers
headers=$(curl -sI --connect-timeout 10 --max-time 15 "https://explore.mydailysurge.com/" 2>/dev/null)
status=$(echo "$headers" | head -1 | awk "{print \$2}")
last_modified=$(echo "$headers" | grep -i "last-modified:" | head -1 | sed "s/last-modified: //i" | tr -d "\r")
server=$(echo "$headers" | grep -i "^server:" | head -1 | sed "s/server: //i" | tr -d "\r")
printf "  \"http_status\": \"%s\",\n" "$status"
printf "  \"last_modified\": \"%s\",\n" "$last_modified"
printf "  \"server\": \"%s\",\n" "$server"

# Fetch page and extract key markers
page=$(curl -sL --connect-timeout 10 --max-time 30 "https://explore.mydailysurge.com/" 2>/dev/null)
published=$(echo "$page" | grep -o "Last Published:.*" | head -1 | tr "\"" "\\047")
ga_id=$(echo "$page" | grep -oP "G-[A-Z0-9]+" | head -1)
gtm_id=$(echo "$page" | grep -oP "GTM-[A-Z0-9]+" | head -1)
webflow_id=$(echo "$page" | grep -oP "wf-site=\"[^\"]+\"" | head -1 | grep -oP "\"[^\"]+\"" | tr -d "\"")
title=$(echo "$page" | grep -oP "<title>[^<]+" | head -1 | sed "s/<title>//" | tr "\"" "\\047")
article_count=$(echo "$page" | grep -c "w-dyn-item" 2>/dev/null || echo "0")

printf "  \"last_published_comment\": \"%s\",\n" "$published"
printf "  \"google_analytics\": \"%s\",\n" "$ga_id"
printf "  \"google_tag_manager\": \"%s\",\n" "$gtm_id"
printf "  \"webflow_site_id\": \"%s\",\n" "$webflow_id"
printf "  \"title\": \"%s\",\n" "$title"
printf "  \"article_count\": %s,\n" "$article_count"

# Check robots.txt
robots_status=$(curl -sI -o /dev/null -w "%{http_code}" --connect-timeout 10 "https://explore.mydailysurge.com/robots.txt" 2>/dev/null || echo "000")
robots_content=""
if [ "$robots_status" = "200" ]; then
  robots_content=$(curl -sL --connect-timeout 10 "https://explore.mydailysurge.com/robots.txt" 2>/dev/null | head -20 | tr "\n" " " | tr "\"" "\\047")
fi
printf "  \"robots_txt_status\": \"%s\",\n" "$robots_status"
printf "  \"robots_txt\": \"%s\",\n" "$robots_content"

# Check sitemap.xml
sitemap_status=$(curl -sI -o /dev/null -w "%{http_code}" --connect-timeout 10 "https://explore.mydailysurge.com/sitemap.xml" 2>/dev/null || echo "000")
printf "  \"sitemap_status\": \"%s\",\n" "$sitemap_status"

# Check if mydailysurge.com root still 404s
root_status=$(curl -sI -o /dev/null -w "%{http_code}" --connect-timeout 10 --max-time 15 "https://mydailysurge.com/" 2>/dev/null || echo "000")
printf "  \"root_domain_status\": \"%s\"\n" "$root_status"

echo "}"
' > "$OUTDIR/explore-changes.json" 2>&1
echo "  -> $OUTDIR/explore-changes.json"

###############################################################################
echo ""
echo "=== Probe 7: Certificate Transparency (crt.sh) ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "{"
echo "  \"probe\": \"ct_logs\","
echo "  \"timestamp\": \"$(date -Iseconds)\","
echo "  \"results\": {"

for domain in epicfunnels.net noodledit.com mydailysurge.com phef6trk.com; do
  ct=$(curl -s --connect-timeout 30 --max-time 60 "https://crt.sh/?q=%25.${domain}&output=json" 2>/dev/null)
  if [ -z "$ct" ] || [ "$ct" = "null" ]; then
    ct="[]"
  fi
  # Count entries and extract unique common names
  count=$(echo "$ct" | jq length 2>/dev/null || echo "0")
  names=$(echo "$ct" | jq -r ".[].common_name" 2>/dev/null | sort -u | tr "\n" "," | sed "s/,$//")
  # Get most recent entry date
  latest=$(echo "$ct" | jq -r ".[0].entry_timestamp // empty" 2>/dev/null)

  printf "    \"%s\": {\"total_entries\": %s, \"unique_names\": \"%s\", \"latest_entry\": \"%s\"}" "$domain" "$count" "$names" "$latest"
  if [ "$domain" != "phef6trk.com" ]; then echo ","; fi
done

echo ""
echo "  }"
echo "}"
' > "$OUTDIR/ct-logs-new.json" 2>&1
echo "  -> $OUTDIR/ct-logs-new.json"

###############################################################################
echo ""
echo "=== Probe 8: New Discovery Probes ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "{"
echo "  \"probe\": \"new_discoveries\","
echo "  \"timestamp\": \"$(date -Iseconds)\","

# Check if Lovable OG image is still up
lovable_status=$(curl -sI -o /dev/null -w "%{http_code}" --connect-timeout 10 "https://lovable.dev/opengraph-image-p98pqg.png" 2>/dev/null || echo "000")
printf "  \"lovable_og_image_status\": \"%s\",\n" "$lovable_status"

# ACME challenge records (indicates active Let'\''s Encrypt renewal)
echo "  \"acme_challenges\": {"
first=true
for sub in jessica jenny kylie ""; do
  if [ -n "$sub" ]; then
    fqdn="_acme-challenge.${sub}.epicfunnels.net"
  else
    fqdn="_acme-challenge.epicfunnels.net"
  fi
  acme=$(dig +short @8.8.8.8 "$fqdn" TXT 2>/dev/null | head -1)
  if [ "$first" = true ]; then first=false; else echo ","; fi
  printf "    \"%s\": \"%s\"" "$fqdn" "$acme"
done
echo ""
echo "  },"

# Check Roundcube login page (version detection)
echo "  \"roundcube\": {"
rc_page=$(curl -sL --connect-timeout 10 --max-time 15 "https://webmail.epicfunnels.net/" 2>/dev/null)
rc_version=$(echo "$rc_page" | grep -o "rcversion:[0-9]*" | head -1)
rc_title=$(echo "$rc_page" | grep -oP "<title>[^<]+" | head -1 | sed "s/<title>//" | tr "\"" "\\047")
rc_status=$(curl -sI -o /dev/null -w "%{http_code}" --connect-timeout 10 "https://webmail.epicfunnels.net/" 2>/dev/null || echo "000")
printf "    \"status\": \"%s\",\n    \"version\": \"%s\",\n    \"title\": \"%s\"\n" "$rc_status" "$rc_version" "$rc_title"
echo "  },"

# Roundcube paths still exposed?
echo "  \"roundcube_paths\": {"
first=true
for path in /installer/ /INSTALL /README.md /CHANGELOG.md /SQL/ /config/ /logs/; do
  code=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 10 "https://webmail.epicfunnels.net${path}" 2>/dev/null || echo "000")
  if [ "$first" = true ]; then first=false; else echo ","; fi
  printf "    \"%s\": \"%s\"" "$path" "$code"
done
echo ""
echo "  },"

# Check jessica.epicfunnels.net page content hash (has it changed?)
echo "  \"jessica_page\": {"
jessica_hash=$(curl -sL --connect-timeout 10 --max-time 30 "https://jessica.epicfunnels.net/" 2>/dev/null | sha256sum | awk "{print \$1}")
jessica_status=$(curl -sI -o /dev/null -w "%{http_code}" --connect-timeout 10 "https://jessica.epicfunnels.net/" 2>/dev/null || echo "000")
printf "    \"status\": \"%s\",\n    \"content_sha256\": \"%s\"\n" "$jessica_status" "$jessica_hash"
echo "  },"

# Check for new jessica.epicfunnels.net JS bundle name (has it been redeployed?)
echo "  \"jessica_assets\": {"
jessica_page=$(curl -sL --connect-timeout 10 --max-time 30 "https://jessica.epicfunnels.net/" 2>/dev/null)
js_files=$(echo "$jessica_page" | grep -oP "assets/index-[^\"]+\.js" | tr "\n" "," | sed "s/,$//")
css_files=$(echo "$jessica_page" | grep -oP "assets/index-[^\"]+\.css" | tr "\n" "," | sed "s/,$//")
printf "    \"js_bundles\": \"%s\",\n    \"css_bundles\": \"%s\"\n" "$js_files" "$css_files"
echo "  }"

echo "}"
' > "$OUTDIR/new-discoveries.json" 2>&1
echo "  -> $OUTDIR/new-discoveries.json"

echo ""
echo "=== All probes complete. $(date -Iseconds) ==="
echo "Results in: $OUTDIR/"
ls -la "$OUTDIR/"
