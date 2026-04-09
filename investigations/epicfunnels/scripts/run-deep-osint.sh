#!/usr/bin/env bash
# Deep OSINT investigation: 12 new avenues for the epicfunnels.net scam network.
# Covers: Wayback Machine, M365 tenant, GA/GTM, social media, threat intel,
#         Webflow CMS, ActiveProspect/CPA, GCS buckets, IP neighbors, SMTP,
#         Lovable AI, Cloudflare Workers.
#
# Run from repo root: bash investigations/epicfunnels/scripts/run-deep-osint.sh
# Requires: podman, scam-investigator image
# Build:    podman build -t scam-investigator -f Containerfile.investigator .

set -euo pipefail

OUTDIR="investigations/epicfunnels/artifacts/deep-osint-$(date +%Y-%m-%d)"
IMAGE="scam-investigator"
mkdir -p "$OUTDIR"

if ! podman image exists "$IMAGE"; then
  echo "Building $IMAGE..."
  podman build -t "$IMAGE" -f Containerfile.investigator .
fi

echo "Output directory: $OUTDIR"
echo "Started: $(date -Iseconds)"
echo ""

###############################################################################
echo "=== Avenue 1: Wayback Machine / Internet Archive ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "{"
echo "  \"probe\": \"wayback_machine\","
echo "  \"timestamp\": \"$(date -Iseconds)\","
echo "  \"results\": {"

for domain in epicfunnels.net noodledit.com mydailysurge.com phef6trk.com olivimails.com; do
  echo "    \"${domain}\": {"

  # CDX API query: all archived URLs for this domain
  cdx=$(curl -sL --connect-timeout 30 --max-time 60 \
    "https://web.archive.org/cdx/search/cdx?url=${domain}/*&output=json&limit=200&fl=timestamp,original,statuscode,mimetype" 2>/dev/null || echo "[]")
  count=$(echo "$cdx" | jq "length - 1" 2>/dev/null || echo "0")
  [ "$count" -lt 0 ] && count=0

  # Get unique URLs
  urls=$(echo "$cdx" | jq -r ".[1:][]?[1]" 2>/dev/null | sort -u | head -50 | tr "\n" "," | sed "s/,$//")

  # Get date range
  first_ts=$(echo "$cdx" | jq -r ".[1]?[0] // empty" 2>/dev/null)
  last_ts=$(echo "$cdx" | jq -r ".[-1]?[0] // empty" 2>/dev/null)

  printf "      \"snapshot_count\": %s,\n" "$count"
  printf "      \"first_snapshot\": \"%s\",\n" "$first_ts"
  printf "      \"last_snapshot\": \"%s\",\n" "$last_ts"
  printf "      \"unique_urls\": \"%s\"\n" "$urls"

  if [ "$domain" != "olivimails.com" ]; then echo "    },"; else echo "    }"; fi
done

# Check key subdomains too
echo "  },"
echo "  \"subdomains\": {"

for sub in jessica.epicfunnels.net jenny.epicfunnels.net kylie.epicfunnels.net \
           socios.epicfunnels.net afiliados.epicfunnels.net evento.epicfunnels.net \
           app.epicfunnels.net explore.mydailysurge.com; do
  cdx=$(curl -sL --connect-timeout 30 --max-time 60 \
    "https://web.archive.org/cdx/search/cdx?url=${sub}/*&output=json&limit=50&fl=timestamp,original,statuscode" 2>/dev/null || echo "[]")
  count=$(echo "$cdx" | jq "length - 1" 2>/dev/null || echo "0")
  [ "$count" -lt 0 ] && count=0
  first_ts=$(echo "$cdx" | jq -r ".[1]?[0] // empty" 2>/dev/null)

  printf "    \"%s\": {\"snapshot_count\": %s, \"first_snapshot\": \"%s\"}" "$sub" "$count" "$first_ts"
  if [ "$sub" != "explore.mydailysurge.com" ]; then echo ","; fi
done

echo ""
echo "  }"
echo "}"
' > "$OUTDIR/wayback.json" 2>&1
echo "  -> $OUTDIR/wayback.json"

###############################################################################
echo ""
echo "=== Avenue 2: Microsoft 365 Tenant Enumeration ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "{"
echo "  \"probe\": \"m365_tenant\","
echo "  \"timestamp\": \"$(date -Iseconds)\","

# OpenID configuration
echo "  \"openid_config\": "
openid=$(curl -sL --connect-timeout 15 --max-time 30 \
  "https://login.microsoftonline.com/epicfunnels.net/.well-known/openid-configuration" 2>/dev/null || echo "{}")
echo "$openid" | jq . 2>/dev/null || echo "$openid"
echo "  ,"

# GetUserRealm
echo "  \"user_realm\": \""
realm=$(curl -sL --connect-timeout 15 --max-time 30 \
  "https://login.microsoftonline.com/getuserrealm.srf?login=test@epicfunnels.net&xml=1" 2>/dev/null || echo "")
echo "$realm" | tr "\"" "\\047"
echo "\","

# Autodiscover
echo "  \"autodiscover\": {"
auto_status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 15 --max-time 30 \
  "https://autodiscover-s.outlook.com/autodiscover/autodiscover.json/v1.0/test@epicfunnels.net?Protocol=ActiveSync" 2>/dev/null || echo "000")
auto_body=$(curl -sL --connect-timeout 15 --max-time 30 \
  "https://autodiscover-s.outlook.com/autodiscover/autodiscover.json/v1.0/test@epicfunnels.net?Protocol=ActiveSync" 2>/dev/null | head -20 | tr "\"" "\\047")
printf "    \"status\": \"%s\",\n    \"response\": \"%s\"\n" "$auto_status" "$auto_body"
echo "  },"

# MX hex identifier lookup
echo "  \"mx_identifier\": {"
mx_hex="16d4f49190c7"
printf "    \"hex\": \"%s\",\n" "$mx_hex"
mx_resolve=$(dig +short @8.8.8.8 "_dc-mx.${mx_hex}.epicfunnels.net" A 2>/dev/null | head -1)
printf "    \"resolves_to\": \"%s\"\n" "$mx_resolve"
echo "  }"

echo "}"
' > "$OUTDIR/m365-tenant.json" 2>&1
echo "  -> $OUTDIR/m365-tenant.json"

###############################################################################
echo ""
echo "=== Avenue 3: Google Analytics / GTM Container Intelligence ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "{"
echo "  \"probe\": \"ga_gtm_intel\","
echo "  \"timestamp\": \"$(date -Iseconds)\","

# Fetch GTM container JS
echo "  \"gtm_container\": {"
gtm_status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 15 --max-time 30 \
  "https://www.googletagmanager.com/gtm.js?id=GTM-N3JVLCTN" 2>/dev/null || echo "000")
printf "    \"status\": \"%s\",\n" "$gtm_status"

if [ "$gtm_status" = "200" ]; then
  gtm_js=$(curl -sL --connect-timeout 15 --max-time 30 \
    "https://www.googletagmanager.com/gtm.js?id=GTM-N3JVLCTN" 2>/dev/null)

  # Extract tracking IDs
  ga_ids=$(echo "$gtm_js" | grep -oP "G-[A-Z0-9]+" | sort -u | tr "\n" "," | sed "s/,$//")
  ua_ids=$(echo "$gtm_js" | grep -oP "UA-[0-9]+-[0-9]+" | sort -u | tr "\n" "," | sed "s/,$//")
  fb_pixels=$(echo "$gtm_js" | grep -oP "\"pixel_id\":\"[0-9]+\"" | sort -u | tr "\n" "," | sed "s/,$//")
  domains_ref=$(echo "$gtm_js" | grep -oP "[a-z0-9-]+\.(com|net|org|io)" | sort -u | tr "\n" "," | sed "s/,$//")
  urls=$(echo "$gtm_js" | grep -oP "https?://[^\"\x27 ,}]+" | sort -u | head -30 | tr "\n" "," | sed "s/,$//")

  printf "    \"ga_ids\": \"%s\",\n" "$ga_ids"
  printf "    \"ua_ids\": \"%s\",\n" "$ua_ids"
  printf "    \"fb_pixels\": \"%s\",\n" "$fb_pixels"
  printf "    \"domains_referenced\": \"%s\",\n" "$domains_ref"
  printf "    \"urls_found\": \"%s\",\n" "$urls"

  # Container size
  gtm_size=$(echo "$gtm_js" | wc -c)
  printf "    \"container_size_bytes\": %s\n" "$gtm_size"
else
  printf "    \"error\": \"failed to fetch\"\n"
fi
echo "  },"

# Also check if the scam pages themselves have GA/GTM
echo "  \"scam_page_tracking\": {"
jessica_page=$(curl -sL --connect-timeout 15 --max-time 30 "https://jessica.epicfunnels.net/" 2>/dev/null)
jessica_ga=$(echo "$jessica_page" | grep -oP "G-[A-Z0-9]+" | sort -u | tr "\n" "," | sed "s/,$//")
jessica_gtm=$(echo "$jessica_page" | grep -oP "GTM-[A-Z0-9]+" | sort -u | tr "\n" "," | sed "s/,$//")
jessica_fb=$(echo "$jessica_page" | grep -oP "fbq\(.*?[0-9]{10,}" | head -5 | tr "\n" "," | sed "s/,$//")
printf "    \"jessica_ga\": \"%s\",\n" "$jessica_ga"
printf "    \"jessica_gtm\": \"%s\",\n" "$jessica_gtm"
printf "    \"jessica_fb_pixel\": \"%s\"\n" "$jessica_fb"
echo "  }"

echo "}"
' > "$OUTDIR/ga-gtm-intel.json" 2>&1
echo "  -> $OUTDIR/ga-gtm-intel.json"

###############################################################################
echo ""
echo "=== Avenue 4: @GetnGoods Social Media Footprint ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "{"
echo "  \"probe\": \"social_media\","
echo "  \"timestamp\": \"$(date -Iseconds)\","
echo "  \"results\": {"

# Twitter/X - @GetnGoods
echo "    \"twitter_getngoods\": {"
tw_status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 15 --max-time 30 \
  -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36" \
  "https://x.com/GetnGoods" 2>/dev/null || echo "000")
printf "      \"status\": \"%s\"\n" "$tw_status"
echo "    },"

# Twitter/X - @mydailysurge
echo "    \"twitter_mydailysurge\": {"
tw2_status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 15 --max-time 30 \
  -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36" \
  "https://x.com/mydailysurge" 2>/dev/null || echo "000")
printf "      \"status\": \"%s\"\n" "$tw2_status"
echo "    },"

# Instagram profiles
echo "    \"instagram\": {"
for handle in getngoods mydailysurge theupgradeclub jessytheupgradeclub; do
  ig_status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 15 --max-time 30 \
    -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36" \
    "https://www.instagram.com/${handle}/" 2>/dev/null || echo "000")
  printf "      \"%s\": \"%s\"" "$handle" "$ig_status"
  if [ "$handle" != "jessytheupgradeclub" ]; then echo ","; fi
done
echo ""
echo "    },"

# TikTok profiles
echo "    \"tiktok\": {"
for handle in getngoods mydailysurge; do
  tt_status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 15 --max-time 30 \
    -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36" \
    "https://www.tiktok.com/@${handle}" 2>/dev/null || echo "000")
  printf "      \"%s\": \"%s\"" "$handle" "$tt_status"
  if [ "$handle" != "mydailysurge" ]; then echo ","; fi
done
echo ""
echo "    },"

# Facebook pages
echo "    \"facebook\": {"
for handle in getngoods mydailysurge; do
  fb_status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 15 --max-time 30 \
    -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36" \
    "https://www.facebook.com/${handle}" 2>/dev/null || echo "000")
  printf "      \"%s\": \"%s\"" "$handle" "$fb_status"
  if [ "$handle" != "mydailysurge" ]; then echo ","; fi
done
echo ""
echo "    }"

echo "  }"
echo "}"
' > "$OUTDIR/social-media.json" 2>&1
echo "  -> $OUTDIR/social-media.json"

###############################################################################
echo ""
echo "=== Avenue 5: Scam Database / Threat Intel Cross-Reference ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "{"
echo "  \"probe\": \"threat_intel\","
echo "  \"timestamp\": \"$(date -Iseconds)\","

# Spamhaus DNSBL checks
echo "  \"spamhaus\": {"
IP="13.220.193.170"
REVERSED="170.193.220.13"
for zone in zen.spamhaus.org bl.spamcop.net dnsbl.sorbs.net b.barracudacentral.org; do
  result=$(dig +short "${REVERSED}.${zone}" 2>/dev/null | head -1)
  printf "    \"%s\": \"%s\"" "$zone" "$result"
  if [ "$zone" != "b.barracudacentral.org" ]; then echo ","; fi
done
echo ""
echo "  },"

# VirusTotal URL lookups (just check HTTP status — we cannot use the API without a key)
echo "  \"virustotal_reachable\": {"
for domain in epicfunnels.net noodledit.com mydailysurge.com phef6trk.com; do
  vt_status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 15 --max-time 30 \
    "https://www.virustotal.com/gui/domain/${domain}" 2>/dev/null || echo "000")
  printf "    \"%s\": \"%s\"" "$domain" "$vt_status"
  if [ "$domain" != "phef6trk.com" ]; then echo ","; fi
done
echo ""
echo "  },"

# URLhaus check
echo "  \"urlhaus\": {"
for domain in epicfunnels.net phef6trk.com noodledit.com mydailysurge.com; do
  uh_result=$(curl -sL --connect-timeout 15 --max-time 30 \
    -d "host=${domain}" "https://urlhaus-api.abuse.ch/v1/host/" 2>/dev/null)
  uh_count=$(echo "$uh_result" | jq -r ".urls_online // 0" 2>/dev/null || echo "error")
  uh_status=$(echo "$uh_result" | jq -r ".query_status // empty" 2>/dev/null || echo "error")
  printf "    \"%s\": {\"query_status\": \"%s\", \"urls_online\": \"%s\"}" "$domain" "$uh_status" "$uh_count"
  if [ "$domain" != "mydailysurge.com" ]; then echo ","; fi
done
echo ""
echo "  },"

# Google Safe Browsing (via transparency report page status)
echo "  \"safe_browsing_page\": {"
for domain in epicfunnels.net phef6trk.com; do
  gsb_status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 15 --max-time 30 \
    "https://transparencyreport.google.com/safe-browsing/search?url=${domain}" 2>/dev/null || echo "000")
  printf "    \"%s\": \"%s\"" "$domain" "$gsb_status"
  if [ "$domain" != "phef6trk.com" ]; then echo ","; fi
done
echo ""
echo "  },"

# PhishTank check
echo "  \"phishtank\": {"
for domain in epicfunnels.net phef6trk.com; do
  pt_status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 15 --max-time 30 \
    "https://phishtank.org/target_search.php?target=${domain}" 2>/dev/null || echo "000")
  printf "    \"%s\": \"%s\"" "$domain" "$pt_status"
  if [ "$domain" != "phef6trk.com" ]; then echo ","; fi
done
echo ""
echo "  }"

echo "}"
' > "$OUTDIR/threat-intel.json" 2>&1
echo "  -> $OUTDIR/threat-intel.json"

###############################################################################
echo ""
echo "=== Avenue 6: Webflow CMS Content Extraction ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "{"
echo "  \"probe\": \"webflow_cms\","
echo "  \"timestamp\": \"$(date -Iseconds)\","

# Sitemap
echo "  \"sitemap\": {"
sitemap=$(curl -sL --connect-timeout 15 --max-time 30 \
  "https://explore.mydailysurge.com/sitemap.xml" 2>/dev/null || echo "")
sitemap_status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 15 \
  "https://explore.mydailysurge.com/sitemap.xml" 2>/dev/null || echo "000")

# Extract URLs from sitemap
urls=$(echo "$sitemap" | grep -oP "<loc>[^<]+" | sed "s/<loc>//" | head -100)
url_count=$(echo "$urls" | grep -c "http" 2>/dev/null || echo "0")
printf "  \"status\": \"%s\",\n" "$sitemap_status"
printf "  \"url_count\": %s,\n" "$url_count"
printf "  \"urls\": [\n"
first=true
echo "$urls" | while read -r url; do
  [ -z "$url" ] && continue
  if [ "$first" = true ]; then first=false; else printf ",\n"; fi
  printf "    \"%s\"" "$url"
done
echo ""
echo "  ]"
echo "  },"

# Check key pages for operator identity leaks
echo "  \"identity_pages\": {"
for path in /about /contact /privacy-policy /terms /terms-of-service /legal /team /authors; do
  code=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 10 --max-time 15 \
    "https://explore.mydailysurge.com${path}" 2>/dev/null || echo "000")
  printf "    \"%s\": \"%s\"" "$path" "$code"
  if [ "$path" != "/authors" ]; then echo ","; fi
done
echo ""
echo "  },"

# Fetch first few articles and extract metadata
echo "  \"articles\": ["
homepage=$(curl -sL --connect-timeout 15 --max-time 30 "https://explore.mydailysurge.com/" 2>/dev/null)
# Extract article links
article_links=$(echo "$homepage" | grep -oP "href=\"/[a-z0-9-]+\"" | sed "s/href=\"//" | sed "s/\"//" | sort -u | head -10)

first=true
for slug in $article_links; do
  [ -z "$slug" ] && continue
  article_url="https://explore.mydailysurge.com${slug}"
  article=$(curl -sL --connect-timeout 10 --max-time 20 "$article_url" 2>/dev/null)
  title=$(echo "$article" | grep -oP "<title>[^<]+" | head -1 | sed "s/<title>//" | tr "\"" "\\047")
  author=$(echo "$article" | grep -oiP "(author|by)[^<]*?[A-Z][a-z]+ [A-Z][a-z]+" | head -1 | tr "\"" "\\047")
  meta_author=$(echo "$article" | grep -oP "name=\"author\"[^>]*content=\"[^\"]+\"" | grep -oP "content=\"[^\"]+\"" | sed "s/content=\"//" | sed "s/\"//" | head -1)
  ext_links=$(echo "$article" | grep -oP "href=\"https?://[^\"]+\"" | grep -v "mydailysurge\|webflow\|googleapis\|gstatic\|google" | head -10 | tr "\n" "," | sed "s/,$//")

  if [ "$first" = true ]; then first=false; else printf ",\n"; fi
  printf "    {\"slug\": \"%s\", \"title\": \"%s\", \"author\": \"%s\", \"meta_author\": \"%s\", \"external_links\": \"%s\"}" \
    "$slug" "$title" "$author" "$meta_author" "$ext_links"
done

echo ""
echo "  ]"
echo "}"
' > "$OUTDIR/webflow-cms.json" 2>&1
echo "  -> $OUTDIR/webflow-cms.json"

###############################################################################
echo ""
echo "=== Avenue 7: ActiveProspect / CPA Network Investigation ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "{"
echo "  \"probe\": \"cpa_network\","
echo "  \"timestamp\": \"$(date -Iseconds)\","

# Decode the ActiveProspect verification
echo "  \"activeprospect_verification\": {"
ap_b64="M+mUYgTDEprxDUAdcdobLA=="
ap_decoded=$(echo "$ap_b64" | base64 -d 2>/dev/null | xxd -p | tr -d "\n")
printf "    \"base64\": \"%s\",\n" "$ap_b64"
printf "    \"hex\": \"%s\",\n" "$ap_decoded"
printf "    \"length_bytes\": %d\n" "$(echo "$ap_b64" | base64 -d 2>/dev/null | wc -c)"
echo "  },"

# Analyze the tracker path components
echo "  \"tracker_path_analysis\": {"
printf "    \"full_path\": \"/FGK5P4/2Z57CD5/\",\n"
printf "    \"component_1\": \"FGK5P4\",\n"
printf "    \"component_2\": \"2Z57CD5\",\n"
printf "    \"note\": \"Likely affiliate_id/campaign_id or offer_id/tracking_id\"\n"
echo "  },"

# Check known CPA tracker platforms for the phef6trk pattern
echo "  \"tracker_platform_clues\": {"
# The domain name "phef6trk" contains "trk" (tracker) - common in affiliate tracking
# Check if the domain pattern matches known CPA platforms
printf "    \"domain_pattern\": \"phef6trk = random prefix + trk suffix\",\n"
printf "    \"trk_suffix\": \"Common in: HasOffers/TUNE, Everflow, CAKE, Voluum, RedTrack\",\n"

# Check whois for phef6trk.com in detail
whois_out=$(whois phef6trk.com 2>&1)
registrar=$(echo "$whois_out" | grep -i "Registrar:" | head -1 | sed "s/.*Registrar: *//" | tr "\"" "\\047")
creation=$(echo "$whois_out" | grep -i "Creation Date:" | head -1 | sed "s/.*Date: *//" | tr -d "\r")
updated=$(echo "$whois_out" | grep -i "Updated Date:" | head -1 | sed "s/.*Date: *//" | tr -d "\r")
ns=$(echo "$whois_out" | grep -i "Name Server:" | tr -d "\r" | sed "s/.*Server: *//" | tr "\n" "," | sed "s/,$//")
printf "    \"registrar\": \"%s\",\n" "$registrar"
printf "    \"creation_date\": \"%s\",\n" "$creation"
printf "    \"updated_date\": \"%s\",\n" "$updated"
printf "    \"nameservers\": \"%s\"\n" "$ns"
echo "  },"

# Historical DNS for phef6trk.com - check if it ever pointed somewhere other than 10.0.0.1
echo "  \"phef6trk_dns_history\": {"
# Check multiple record types
for type in A AAAA MX TXT NS SOA; do
  result=$(dig +short @8.8.8.8 phef6trk.com "$type" 2>/dev/null | tr "\n" "," | sed "s/,$//")
  printf "    \"%s\": \"%s\"" "$type" "$result"
  if [ "$type" != "SOA" ]; then echo ","; fi
done
echo ""
echo "  }"

echo "}"
' > "$OUTDIR/cpa-network.json" 2>&1
echo "  -> $OUTDIR/cpa-network.json"

###############################################################################
echo ""
echo "=== Avenue 8: GCS Bucket Enumeration ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "{"
echo "  \"probe\": \"gcs_buckets\","
echo "  \"timestamp\": \"$(date -Iseconds)\","

# Try direct GCS bucket access patterns
echo "  \"bucket_discovery\": {"

# Check if buckets are listable
for bucket in noodledit.com b.noodledit.com sassets.noodledit.com; do
  list_status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 15 --max-time 30 \
    "https://storage.googleapis.com/${bucket}/" 2>/dev/null || echo "000")
  printf "    \"storage_googleapis_com/%s\": \"%s\"" "$bucket" "$list_status"
  echo ","
done
echo ""
echo "  },"

# Brute-force promotions/ path for other products
echo "  \"promotions_brute\": {"
for product in samsung iphone ipad macbook airpods giftcard playstation xbox cash amazon \
               walmart visa mastercard ps5 nintendo switch laptop tablet watch; do
  for ext in .png _1000.png .webp .jpg; do
    url="https://b.noodledit.com/promotions/${product}${ext}"
    status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 5 --max-time 10 "$url" 2>/dev/null || echo "000")
    if [ "$status" != "000" ] && [ "$status" != "404" ] && [ "$status" != "403" ]; then
      printf "    \"%s%s\": \"%s\",\n" "$product" "$ext" "$status"
    fi
  done
done
# Check known working files as controls
for file in iphone17promax1000.png macbook1000.png iphone17promax.png; do
  status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 5 --max-time 10 \
    "https://b.noodledit.com/promotions/${file}" 2>/dev/null || echo "000")
  printf "    \"CONTROL_%s\": \"%s\"" "$file" "$status"
  if [ "$file" != "iphone17promax.png" ]; then echo ","; fi
done
echo ""
echo "  },"

# Enumerate other top-level paths
echo "  \"path_brute\": {"
for path in / /campaigns/ /funnels/ /landing/ /templates/ /v1/ /v2/ /images/ /assets/ \
            /css/ /js/ /fonts/ /logos/ /brands/ /static/ /media/ /uploads/ /public/; do
  status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 5 --max-time 10 \
    "https://b.noodledit.com${path}" 2>/dev/null || echo "000")
  if [ "$status" != "000" ] && [ "$status" != "404" ]; then
    printf "    \"%s\": \"%s\",\n" "b.noodledit.com${path}" "$status"
  fi
  status2=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 5 --max-time 10 \
    "https://sassets.noodledit.com${path}" 2>/dev/null || echo "000")
  if [ "$status2" != "000" ] && [ "$status2" != "404" ]; then
    printf "    \"%s\": \"%s\",\n" "sassets.noodledit.com${path}" "$status2"
  fi
done
printf "    \"_done\": true\n"
echo "  }"

echo "}"
' > "$OUTDIR/gcs-buckets.json" 2>&1
echo "  -> $OUTDIR/gcs-buckets.json"

###############################################################################
echo ""
echo "=== Avenue 9: IP Neighbor Analysis ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "{"
echo "  \"probe\": \"ip_neighbors\","
echo "  \"timestamp\": \"$(date -Iseconds)\","
echo "  \"target_ip\": \"13.220.193.170\","

# Reverse DNS
echo "  \"reverse_dns\": {"
ptr=$(dig +short -x 13.220.193.170 2>/dev/null | head -1)
printf "    \"ptr\": \"%s\"\n" "$ptr"
echo "  },"

# Check a few nearby IPs for similar services
echo "  \"neighbors\": ["
first=true
for offset in $(seq 165 175); do
  ip="13.220.193.${offset}"
  ptr=$(dig +short -x "$ip" 2>/dev/null | head -1)
  # Quick check for HTTP
  http_status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 3 --max-time 5 \
    "http://${ip}/" 2>/dev/null || echo "000")

  if [ "$first" = true ]; then first=false; else echo ","; fi
  printf "    {\"ip\": \"%s\", \"ptr\": \"%s\", \"http_status\": \"%s\"}" "$ip" "$ptr" "$http_status"
done
echo ""
echo "  ],"

# Check all Cloudflare IPs associated with the domains
echo "  \"cloudflare_ips\": {"
for domain in epicfunnels.net jessica.epicfunnels.net explore.mydailysurge.com noodledit.com; do
  ips=$(dig +short @8.8.8.8 "$domain" A 2>/dev/null | tr "\n" "," | sed "s/,$//")
  printf "    \"%s\": \"%s\"" "$domain" "$ips"
  if [ "$domain" != "noodledit.com" ]; then echo ","; fi
done
echo ""
echo "  },"

# ASN lookup for the EC2 IP
echo "  \"asn\": {"
asn_info=$(dig +short TXT 170.193.220.13.origin.asn.cymru.com 2>/dev/null | head -1 | tr "\"" "\\047")
printf "    \"cymru\": \"%s\"\n" "$asn_info"
echo "  }"

echo "}"
' > "$OUTDIR/ip-neighbors.json" 2>&1
echo "  -> $OUTDIR/ip-neighbors.json"

###############################################################################
echo ""
echo "=== Avenue 10: SMTP Deep Dive ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "{"
echo "  \"probe\": \"smtp_deep\","
echo "  \"timestamp\": \"$(date -Iseconds)\","
TARGET="13.220.193.170"

# Full EHLO conversation on 587
echo "  \"smtp_587_ehlo\": {"
ehlo=$(timeout 10 bash -c "echo -e \"EHLO probe.test\nQUIT\" | ncat -w5 $TARGET 587" 2>&1 | tr "\r" " " | tr "\n" "|" | tr "\"" "\\047")
printf "    \"response\": \"%s\"\n" "$ehlo"
echo "  },"

# STARTTLS certificate on 587
echo "  \"smtp_587_starttls_cert\": {"
tls_cert=$(echo -e "EHLO probe.test\nSTARTTLS" | timeout 10 openssl s_client -connect "$TARGET:587" -starttls smtp 2>/dev/null | openssl x509 -noout -subject -issuer -dates -ext subjectAltName 2>/dev/null || echo "FAILED")
subject=$(echo "$tls_cert" | grep "subject=" | sed "s/subject=//" | tr "\"" "\\047")
issuer=$(echo "$tls_cert" | grep "issuer=" | sed "s/issuer=//" | tr "\"" "\\047")
not_after=$(echo "$tls_cert" | grep "notAfter=" | sed "s/notAfter=//")
san=$(echo "$tls_cert" | grep "DNS:" | tr "\"" "\\047" | sed "s/^ *//" | head -1)
printf "    \"subject\": \"%s\",\n    \"issuer\": \"%s\",\n    \"not_after\": \"%s\",\n    \"san\": \"%s\"\n" \
  "$subject" "$issuer" "$not_after" "$san"
echo "  },"

# IMAP CAPABILITY on 143
echo "  \"imap_143_capability\": {"
imap=$(timeout 10 bash -c "echo -e \"a001 CAPABILITY\na002 LOGOUT\" | ncat -w5 $TARGET 143" 2>&1 | tr "\r" " " | tr "\n" "|" | tr "\"" "\\047")
printf "    \"response\": \"%s\"\n" "$imap"
echo "  },"

# Check port 465 (SMTPS - not in original scan)
echo "  \"smtp_465\": {"
if timeout 5 ncat -w3 -z "$TARGET" 465 2>/dev/null; then
  printf "    \"status\": \"open\",\n"
  smtps_cert=$(echo "" | timeout 10 openssl s_client -connect "$TARGET:465" 2>/dev/null | openssl x509 -noout -subject 2>/dev/null || echo "FAILED")
  printf "    \"cert_subject\": \"%s\"\n" "$(echo "$smtps_cert" | tr "\"" "\\047")"
else
  printf "    \"status\": \"closed\"\n"
fi
echo "  },"

# VRFY test (check if SMTP enumerates users)
echo "  \"smtp_vrfy\": {"
vrfy=$(timeout 10 bash -c "echo -e \"EHLO probe.test\nVRFY admin\nVRFY postmaster\nVRFY root\nVRFY info\nVRFY noreply\nQUIT\" | ncat -w5 $TARGET 587" 2>&1 | grep -E "^(252|550|553|502|500)" | tr "\r" " " | tr "\n" "|" | tr "\"" "\\047")
printf "    \"responses\": \"%s\"\n" "$vrfy"
echo "  },"

# RCPT TO test (more reliable user enumeration than VRFY)
echo "  \"smtp_rcpt\": {"
rcpt=$(timeout 15 bash -c "echo -e \"EHLO probe.test\nMAIL FROM:<test@test.com>\nRCPT TO:<admin@epicfunnels.net>\nRCPT TO:<info@epicfunnels.net>\nRCPT TO:<postmaster@epicfunnels.net>\nRCPT TO:<jessica@epicfunnels.net>\nRCPT TO:<nonexistent12345@epicfunnels.net>\nQUIT\" | ncat -w5 $TARGET 587" 2>&1 | grep -E "^(250|550|553|452|502)" | tr "\r" " " | tr "\n" "|" | tr "\"" "\\047")
printf "    \"responses\": \"%s\"\n" "$rcpt"
echo "  }"

echo "}"
' > "$OUTDIR/smtp-deep.json" 2>&1
echo "  -> $OUTDIR/smtp-deep.json"

###############################################################################
echo ""
echo "=== Avenue 11: Lovable AI Project Investigation ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "{"
echo "  \"probe\": \"lovable_ai\","
echo "  \"timestamp\": \"$(date -Iseconds)\","

# OG image metadata via exiftool
echo "  \"og_image_metadata\": {"
curl -sL --connect-timeout 15 --max-time 30 \
  "https://lovable.dev/opengraph-image-p98pqg.png" -o /tmp/lovable-og.png 2>/dev/null
if [ -f /tmp/lovable-og.png ]; then
  meta=$(exiftool -json /tmp/lovable-og.png 2>/dev/null | jq ".[0]" 2>/dev/null || echo "{}")
  printf "    \"exiftool\": %s\n" "$meta"
else
  printf "    \"error\": \"failed to download\"\n"
fi
echo "  },"

# Try various Lovable project URL patterns
echo "  \"project_urls\": {"
for url_path in \
  "projects/p98pqg" \
  "p/p98pqg" \
  "share/p98pqg" \
  "preview/p98pqg" \
  "app/p98pqg" \
  "api/projects/p98pqg"; do
  status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 10 --max-time 15 \
    "https://lovable.dev/${url_path}" 2>/dev/null || echo "000")
  printf "    \"/%s\": \"%s\"" "$url_path" "$status"
  if [ "$url_path" != "api/projects/p98pqg" ]; then echo ","; fi
done
echo ""
echo "  },"

# Check Lovable API/docs endpoints
echo "  \"lovable_api\": {"
for endpoint in /api /api/v1 /docs /robots.txt /sitemap.xml /.well-known/security.txt; do
  status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 10 --max-time 15 \
    "https://lovable.dev${endpoint}" 2>/dev/null || echo "000")
  printf "    \"%s\": \"%s\"" "$endpoint" "$status"
  if [ "$endpoint" != "/.well-known/security.txt" ]; then echo ","; fi
done
echo ""
echo "  },"

# Check if the scam page embeds any Lovable project identifiers
echo "  \"scam_page_lovable_refs\": {"
jessica_page=$(curl -sL --connect-timeout 15 --max-time 30 "https://jessica.epicfunnels.net/" 2>/dev/null)
lovable_refs=$(echo "$jessica_page" | grep -oi "lovable[^\"'\'' ]*" | sort -u | tr "\n" "," | sed "s/,$//")
gpid_refs=$(echo "$jessica_page" | grep -oP "p98pqg" | wc -l)
printf "    \"lovable_references\": \"%s\",\n" "$lovable_refs"
printf "    \"p98pqg_count\": %s\n" "$gpid_refs"
echo "  }"

echo "}"
' > "$OUTDIR/lovable-ai.json" 2>&1
echo "  -> $OUTDIR/lovable-ai.json"

###############################################################################
echo ""
echo "=== Avenue 12: Cloudflare Workers / Pages Probing ==="
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
echo "{"
echo "  \"probe\": \"cloudflare_workers\","
echo "  \"timestamp\": \"$(date -Iseconds)\","
BASE="https://jessica.epicfunnels.net"

# Cloudflare diagnostic trace
echo "  \"cf_trace\": {"
trace=$(curl -sL --connect-timeout 10 --max-time 15 "${BASE}/cdn-cgi/trace" 2>/dev/null | tr "\n" "," | sed "s/,$//")
printf "    \"data\": \"%s\"\n" "$trace"
echo "  },"

# API endpoint with different User-Agents
echo "  \"api_ua_test\": ["
first=true
for ua in \
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)" \
  "Mozilla/5.0 (Linux; Android 14)" \
  "Mozilla/5.0 (X11; Linux x86_64)" \
  "TikTok 33.1.3" \
  "facebookexternalhit/1.1" \
  "Googlebot/2.1" \
  "curl/8.0"; do
  headers=$(curl -sI --connect-timeout 10 --max-time 15 \
    -H "User-Agent: $ua" "${BASE}/api/continue" 2>/dev/null)
  status=$(echo "$headers" | head -1 | awk "{print \$2}")
  location=$(echo "$headers" | grep -i "^location:" | head -1 | sed "s/location: //i" | tr -d "\r")
  cf_cache=$(echo "$headers" | grep -i "cf-cache-status" | head -1 | sed "s/.*: //" | tr -d "\r")

  if [ "$first" = true ]; then first=false; else echo ","; fi
  printf "    {\"user_agent\": \"%s\", \"status\": \"%s\", \"location\": \"%s\", \"cf_cache\": \"%s\"}" \
    "$(echo "$ua" | cut -c1-50)" "$status" "$location" "$cf_cache"
done
echo ""
echo "  ],"

# API with different Accept-Language
echo "  \"api_lang_test\": ["
first=true
for lang in "en-US,en;q=0.9" "es-ES,es;q=0.9" "pt-BR,pt;q=0.9" "zh-CN,zh;q=0.9"; do
  headers=$(curl -sI --connect-timeout 10 --max-time 15 \
    -H "Accept-Language: $lang" "${BASE}/api/continue" 2>/dev/null)
  status=$(echo "$headers" | head -1 | awk "{print \$2}")
  location=$(echo "$headers" | grep -i "^location:" | head -1 | sed "s/location: //i" | tr -d "\r")

  if [ "$first" = true ]; then first=false; else echo ","; fi
  printf "    {\"lang\": \"%s\", \"status\": \"%s\", \"location\": \"%s\"}" "$lang" "$status" "$location"
done
echo ""
echo "  ],"

# API with TikTok referer
echo "  \"api_referer_test\": {"
ref_headers=$(curl -sI --connect-timeout 10 --max-time 15 \
  -H "Referer: https://www.tiktok.com/" "${BASE}/api/continue" 2>/dev/null)
ref_status=$(echo "$ref_headers" | head -1 | awk "{print \$2}")
ref_location=$(echo "$ref_headers" | grep -i "^location:" | head -1 | sed "s/location: //i" | tr -d "\r")
printf "    \"status\": \"%s\",\n    \"location\": \"%s\"\n" "$ref_status" "$ref_location"
echo "  },"

# POST to /api/continue-click (the real behavior)
echo "  \"api_post_test\": {"
post_headers=$(curl -sI -X POST --connect-timeout 10 --max-time 15 \
  -H "Content-Type: text/plain;charset=UTF-8" \
  "${BASE}/api/continue-click" 2>/dev/null)
post_status=$(echo "$post_headers" | head -1 | awk "{print \$2}")
post_location=$(echo "$post_headers" | grep -i "^location:" | head -1 | sed "s/location: //i" | tr -d "\r")
printf "    \"method\": \"POST\",\n    \"status\": \"%s\",\n    \"location\": \"%s\"\n" "$post_status" "$post_location"
echo "  },"

# Check for Cloudflare Pages/Workers specific paths
echo "  \"cf_paths\": {"
for path in /_routes.json /functions/ /_worker.js /cdn-cgi/challenge-platform/ /_next/ /api/health /api/status /api/v1 /api/track /api/click /api/redirect /api/webhook; do
  status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 5 --max-time 10 \
    "${BASE}${path}" 2>/dev/null || echo "000")
  printf "    \"%s\": \"%s\"" "$path" "$status"
  if [ "$path" != "/api/webhook" ]; then echo ","; fi
done
echo ""
echo "  },"

# Check epicfunnels.net root vs jessica subdomain (are they identical?)
echo "  \"root_vs_jessica\": {"
root_hash=$(curl -sL --connect-timeout 10 --max-time 30 "https://epicfunnels.net/" 2>/dev/null | sha256sum | awk "{print \$1}")
jessica_hash=$(curl -sL --connect-timeout 10 --max-time 30 "https://jessica.epicfunnels.net/" 2>/dev/null | sha256sum | awk "{print \$1}")
printf "    \"root_hash\": \"%s\",\n    \"jessica_hash\": \"%s\",\n    \"identical\": %s\n" \
  "$root_hash" "$jessica_hash" "$([ "$root_hash" = "$jessica_hash" ] && echo true || echo false)"
echo "  }"

echo "}"
' > "$OUTDIR/cloudflare-workers.json" 2>&1
echo "  -> $OUTDIR/cloudflare-workers.json"

###############################################################################
echo ""
echo "=== All 12 avenues complete. $(date -Iseconds) ==="
echo "Results in: $OUTDIR/"
ls -la "$OUTDIR/"
