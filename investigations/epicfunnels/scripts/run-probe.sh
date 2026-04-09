#!/usr/bin/env bash
# Deep read-only probe of exposed services on 13.220.193.170 (epicfunnels/Moxxi Digital).
# Fills gaps from prior investigations: full Redis enumeration, PostgreSQL discovery,
# nmap service scan, Node.js app probing, GCS inventory, Hestia panel enumeration.
#
# Run from repo root: bash investigations/epicfunnels/scripts/run-probe.sh
# Requires: podman, scam-investigator image (with redis-tools, postgresql-client, nmap)
# Build:    podman build -t scam-investigator -f Containerfile.investigator .
#
# GROUND RULES:
#   - READ-ONLY: No SET/DEL/CONFIG SET/FLUSHALL on Redis.
#     No INSERT/UPDATE/DELETE/DROP on PostgreSQL. No writes anywhere.
#   - No brute forcing. Anonymous/no-password connections only.
#   - No PII extraction. Schema and counts only for tables with user data.
#   - All tools are standard open-source (nmap, redis-cli, psql, curl, ncat, openssl).

set -uo pipefail
# Note: -e intentionally omitted. Individual podman containers may exit non-zero
# (e.g., psql returns 2 when auth fails) and we want the script to continue
# through all 6 probes regardless. Each probe writes its own JSON output file.

OUTDIR="investigations/epicfunnels/artifacts/deep-probe-$(date +%Y-%m-%d)"
IMAGE="scam-investigator"
TARGET="13.220.193.170"
mkdir -p "$OUTDIR"

# Ensure image exists and has the new tools
if ! podman image exists "$IMAGE"; then
  echo "[*] Building $IMAGE..."
  podman build -t "$IMAGE" -f Containerfile.investigator .
elif ! podman run --rm "$IMAGE" which redis-cli >/dev/null 2>&1; then
  echo "[*] Rebuilding $IMAGE (missing redis-tools)..."
  podman rmi "$IMAGE" 2>/dev/null || true
  podman build -t "$IMAGE" -f Containerfile.investigator .
fi

echo "=== Deep Probe: $TARGET ==="
echo "Output: $OUTDIR"
echo "Started: $(date -Iseconds)"
echo ""

###############################################################################
echo "[1/6] Redis Full Enumeration..."
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
TARGET="13.220.193.170"
PORT=6379
RC="redis-cli -h $TARGET -p $PORT --no-auth-warning"

# JSON-escape a string via jq
je() { printf "%s" "$1" | jq -Rs .; }

# Test connectivity
if ! $RC PING 2>/dev/null | grep -q PONG; then
  printf "{\"probe\":\"redis_full\",\"error\":\"connection_failed\",\"timestamp\":\"%s\"}\n" "$(date -Iseconds)"
  exit 0
fi

# ---- Capture raw outputs ----
info_raw=$($RC INFO all 2>/dev/null || echo "ERROR")
config_raw=$($RC CONFIG GET "*" 2>/dev/null || echo "ERROR")
client_raw=$($RC CLIENT LIST 2>/dev/null || echo "ERROR")
slowlog_raw=$($RC SLOWLOG GET 128 2>/dev/null || echo "ERROR")
memory_raw=$($RC MEMORY STATS 2>/dev/null || echo "ERROR")
acl_raw=$($RC ACL LIST 2>/dev/null || echo "ERROR: ACL not supported")
module_raw=$($RC MODULE LIST 2>/dev/null || echo "ERROR: no modules")
cluster_raw=$($RC CLUSTER INFO 2>/dev/null || echo "ERROR: not in cluster mode")
cmd_count=$($RC --raw COMMAND COUNT 2>/dev/null || echo "-1")
latency_raw=$($RC LATENCY LATEST 2>/dev/null || echo "")

# ---- Database sizes (all 16) ----
db_json="{"
for db in $(seq 0 15); do
  count=$($RC -n "$db" --raw DBSIZE 2>/dev/null || echo "0")
  [ "$db" -gt 0 ] && db_json="$db_json,"
  db_json="$db_json \"$db\": $count"
done
db_json="$db_json }"

# ---- Extract key INFO fields ----
redis_version=$(echo "$info_raw" | grep "^redis_version:" | cut -d: -f2 | tr -d "\r")
uptime_days=$(echo "$info_raw" | grep "^uptime_in_days:" | cut -d: -f2 | tr -d "\r")
connected_clients=$(echo "$info_raw" | grep "^connected_clients:" | cut -d: -f2 | tr -d "\r")
used_memory_human=$(echo "$info_raw" | grep "^used_memory_human:" | cut -d: -f2 | tr -d "\r")
total_system_memory_human=$(echo "$info_raw" | grep "^total_system_memory_human:" | cut -d: -f2 | tr -d "\r")
num_cached_scripts=$(echo "$info_raw" | grep "^number_of_cached_scripts:" | cut -d: -f2 | tr -d "\r")
num_cached_scripts=${num_cached_scripts:-0}
cached_scripts_mem=$(echo "$info_raw" | grep "^used_memory_scripts_human:" | cut -d: -f2 | tr -d "\r")
executable=$(echo "$info_raw" | grep "^executable:" | cut -d: -f2 | tr -d "\r")
config_file_info=$(echo "$info_raw" | grep "^config_file:" | cut -d: -f2 | tr -d "\r")
os_info=$(echo "$info_raw" | grep "^os:" | cut -d: -f2- | tr -d "\r")
process_id=$(echo "$info_raw" | grep "^process_id:" | cut -d: -f2 | tr -d "\r")
tcp_port=$(echo "$info_raw" | grep "^tcp_port:" | cut -d: -f2 | tr -d "\r")
total_connections=$(echo "$info_raw" | grep "^total_connections_received:" | cut -d: -f2 | tr -d "\r")
total_commands=$(echo "$info_raw" | grep "^total_commands_processed:" | cut -d: -f2 | tr -d "\r")
role=$(echo "$info_raw" | grep "^role:" | cut -d: -f2 | tr -d "\r")
rdb_last_save=$(echo "$info_raw" | grep "^rdb_last_save_time:" | cut -d: -f2 | tr -d "\r")
aof_enabled=$(echo "$info_raw" | grep "^aof_enabled:" | cut -d: -f2 | tr -d "\r")

# ---- Build JSON output ----
echo "{"
echo "  \"probe\": \"redis_full\","
echo "  \"timestamp\": \"$(date -Iseconds)\","
echo "  \"target\": \"$TARGET:$PORT\","
echo ""
echo "  \"summary\": {"
printf "    \"redis_version\": \"%s\",\n" "$redis_version"
printf "    \"os\": %s,\n" "$(je "$os_info")"
printf "    \"process_id\": \"%s\",\n" "$process_id"
printf "    \"uptime_days\": \"%s\",\n" "$uptime_days"
printf "    \"connected_clients\": \"%s\",\n" "$connected_clients"
printf "    \"used_memory\": \"%s\",\n" "$used_memory_human"
printf "    \"total_system_memory\": \"%s\",\n" "$total_system_memory_human"
printf "    \"cached_lua_scripts\": \"%s\",\n" "$num_cached_scripts"
printf "    \"cached_scripts_memory\": \"%s\",\n" "$cached_scripts_mem"
printf "    \"total_connections_received\": \"%s\",\n" "$total_connections"
printf "    \"total_commands_processed\": \"%s\",\n" "$total_commands"
printf "    \"role\": \"%s\",\n" "$role"
printf "    \"rdb_last_save_time\": \"%s\",\n" "$rdb_last_save"
printf "    \"aof_enabled\": \"%s\",\n" "$aof_enabled"
printf "    \"executable\": \"%s\",\n" "$executable"
printf "    \"config_file\": \"%s\"\n" "$config_file_info"
echo "  },"
echo ""
echo "  \"info_raw\": $(je "$info_raw"),"
echo "  \"config_raw\": $(je "$config_raw"),"
echo "  \"client_list_raw\": $(je "$client_raw"),"
echo "  \"slowlog_raw\": $(je "$slowlog_raw"),"
echo "  \"memory_stats_raw\": $(je "$memory_raw"),"
echo "  \"acl_list_raw\": $(je "$acl_raw"),"
echo "  \"module_list_raw\": $(je "$module_raw"),"
echo "  \"cluster_info_raw\": $(je "$cluster_raw"),"
printf "  \"command_count\": %s,\n" "$cmd_count"
echo "  \"latency_latest_raw\": $(je "$latency_raw"),"
echo ""
echo "  \"database_sizes\": $db_json,"
echo ""

# ---- Key inventory per non-empty database ----
echo "  \"key_inventory\": {"

first_db=true
for db in $(seq 0 15); do
  count=$($RC -n "$db" --raw DBSIZE 2>/dev/null || echo "0")
  [ "$count" = "0" ] && continue

  if [ "$first_db" = true ]; then first_db=false; else printf ",\n"; fi
  echo "    \"db$db\": ["

  cursor=0
  first_key=true
  seen_keys=""
  while true; do
    scan_result=$($RC -n "$db" --raw SCAN "$cursor" COUNT 100 2>/dev/null || echo "0")
    new_cursor=$(echo "$scan_result" | head -1)
    keys=$(echo "$scan_result" | tail -n +2)

    while IFS= read -r key; do
      [ -z "$key" ] && continue
      # Deduplicate (SCAN cursor can return same key twice)
      echo "$seen_keys" | grep -qxF "$key" 2>/dev/null && continue
      seen_keys="$seen_keys
$key"

      ktype=$($RC -n "$db" --raw TYPE "$key" 2>/dev/null || echo "unknown")
      kttl=$($RC -n "$db" --raw TTL "$key" 2>/dev/null || echo "-2")
      kenc=$($RC -n "$db" OBJECT ENCODING "$key" 2>/dev/null | sed "s/(nil)/unknown/" || echo "unknown")
      # Strip redis-cli formatting from OBJECT ENCODING
      kenc=$(echo "$kenc" | tr -d "\"" | tr -d "\r")
      kmem=$($RC -n "$db" --raw MEMORY USAGE "$key" 2>/dev/null || echo "-1")

      # PII guard: skip value preview for keys that look like user data
      preview=""
      if echo "$key" | grep -qiE "(user|email|phone|lead|name|address|password|token|session|contact|person|customer|subscriber)"; then
        preview="[REDACTED - possible PII key name]"
      else
        case "$ktype" in
          string)
            raw=$($RC -n "$db" --raw GET "$key" 2>/dev/null | head -c 500 || echo "")
            preview="$raw"
            ;;
          list)
            len=$($RC -n "$db" --raw LLEN "$key" 2>/dev/null || echo "0")
            sample=$($RC -n "$db" --raw LRANGE "$key" 0 2 2>/dev/null | head -c 300 || echo "")
            preview="length=$len; first_3=$sample"
            ;;
          hash)
            len=$($RC -n "$db" --raw HLEN "$key" 2>/dev/null || echo "0")
            hkeys=$($RC -n "$db" --raw HKEYS "$key" 2>/dev/null | head -10 | tr "\n" ", " | sed "s/, $//" || echo "")
            preview="fields=$len; keys=[$hkeys]"
            ;;
          set)
            len=$($RC -n "$db" --raw SCARD "$key" 2>/dev/null || echo "0")
            sample=$($RC -n "$db" --raw SSCAN "$key" 0 COUNT 3 2>/dev/null | tail -n +2 | head -3 | tr "\n" ", " | sed "s/, $//" || echo "")
            preview="members=$len; sample=[$sample]"
            ;;
          zset)
            len=$($RC -n "$db" --raw ZCARD "$key" 2>/dev/null || echo "0")
            sample=$($RC -n "$db" --raw ZRANGE "$key" 0 2 WITHSCORES 2>/dev/null | head -6 | tr "\n" ", " | sed "s/, $//" || echo "")
            preview="members=$len; sample=[$sample]"
            ;;
          stream)
            len=$($RC -n "$db" --raw XLEN "$key" 2>/dev/null || echo "0")
            preview="stream_length=$len"
            ;;
          *)
            preview="type=$ktype"
            ;;
        esac
      fi

      [ "$first_key" = true ] && first_key=false || printf ",\n"
      printf "      {\"key\": %s, \"type\": \"%s\", \"ttl\": %s, \"encoding\": \"%s\", \"memory_bytes\": %s, \"preview\": %s}" \
        "$(je "$key")" "$ktype" "$kttl" "$kenc" "$kmem" "$(je "$preview")"
    done <<< "$keys"

    [ "$new_cursor" = "0" ] && break
    cursor="$new_cursor"
  done

  echo ""
  echo "    ]"
done

echo "  }"
echo "}"
' > "$OUTDIR/redis-full.json"
echo "  Done: redis-full.json"

###############################################################################
echo "[2/6] PostgreSQL Discovery..."
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
TARGET="13.220.193.170"
export PGCONNECT_TIMEOUT=10

je() { printf "%s" "$1" | jq -Rs .; }

echo "{"
echo "  \"probe\": \"postgresql_discovery\","
echo "  \"timestamp\": \"$(date -Iseconds)\","
echo "  \"target\": \"$TARGET:5432\","

# Try connecting with common no-password users
echo "  \"connection_attempts\": ["
first=true
for user in postgres admin root hestiacp hst_admin app web nobody; do
  result=$(psql -h "$TARGET" -U "$user" -w -d postgres -c "SELECT version();" 2>&1 | head -10)
  exit_code=$?

  [ "$first" = true ] && first=false || printf ",\n"
  printf "    {\"user\": \"%s\", \"exit_code\": %d, \"response\": %s}" "$user" "$exit_code" "$(je "$result")"
done
echo ""
echo "  ],"

# Try the postgres user specifically for deeper enumeration
echo "  \"enumeration\": {"

# Databases
db_list=$(psql -h "$TARGET" -U postgres -w -t -A -c "SELECT datname FROM pg_database WHERE datistemplate = false ORDER BY datname;" 2>&1 || echo "ERROR")
echo "    \"databases\": $(je "$db_list"),"

if ! echo "$db_list" | grep -q "ERROR\|FATAL\|refused"; then
  # We got in. Enumerate.

  # Server version
  pg_version=$(psql -h "$TARGET" -U postgres -w -t -A -c "SELECT version();" 2>/dev/null || echo "unknown")
  echo "    \"server_version\": $(je "$pg_version"),"

  # Key settings
  settings=$(psql -h "$TARGET" -U postgres -w -t -A -F "|" -c "
    SELECT name, setting FROM pg_settings
    WHERE name IN (
      'listen_addresses','port','max_connections','shared_buffers',
      'work_mem','log_destination','log_directory','data_directory',
      'hba_file','ssl','password_encryption','timezone',
      'server_version','server_encoding','lc_collate'
    ) ORDER BY name;" 2>/dev/null || echo "ERROR")
  echo "    \"settings\": $(je "$settings"),"

  # Roles
  roles=$(psql -h "$TARGET" -U postgres -w -t -A -F "|" -c "
    SELECT rolname, rolsuper, rolcreatedb, rolcreaterole, rolcanlogin
    FROM pg_roles ORDER BY rolname;" 2>/dev/null || echo "ERROR")
  echo "    \"roles\": $(je "$roles"),"

  # Extensions
  extensions=$(psql -h "$TARGET" -U postgres -w -t -A -F "|" -c "
    SELECT extname, extversion FROM pg_extension ORDER BY extname;" 2>/dev/null || echo "ERROR")
  echo "    \"extensions\": $(je "$extensions"),"

  # Active connections
  activity=$(psql -h "$TARGET" -U postgres -w -t -A -F "|" -c "
    SELECT datname, usename, client_addr, state, left(query, 80) as query_preview
    FROM pg_stat_activity WHERE state IS NOT NULL
    ORDER BY query_start DESC NULLS LAST LIMIT 20;" 2>/dev/null || echo "ERROR")
  echo "    \"active_connections\": $(je "$activity"),"

  # Per-database table enumeration
  echo "    \"schemas\": {"
  first_db=true
  for dbname in $(psql -h "$TARGET" -U postgres -w -t -A -c "SELECT datname FROM pg_database WHERE datistemplate = false ORDER BY datname;" 2>/dev/null); do
    [ -z "$dbname" ] && continue
    [ "$first_db" = true ] && first_db=false || printf ",\n"

    # List tables with row counts (from stats, no sequential scan)
    tables=$(psql -h "$TARGET" -U postgres -w -d "$dbname" -t -A -F "|" -c "
      SELECT schemaname, relname, n_live_tup
      FROM pg_stat_user_tables
      ORDER BY n_live_tup DESC LIMIT 50;" 2>/dev/null || echo "ERROR")
    printf "      \"%s\": {\"tables\": %s" "$dbname" "$(je "$tables")"

    # For each table, get column names and types (schema only, no data)
    echo ","
    echo "        \"table_schemas\": {"
    first_tbl=true
    for tbl in $(psql -h "$TARGET" -U postgres -w -d "$dbname" -t -A -c "
      SELECT relname FROM pg_stat_user_tables ORDER BY n_live_tup DESC LIMIT 20;" 2>/dev/null); do
      [ -z "$tbl" ] && continue
      [ "$first_tbl" = true ] && first_tbl=false || printf ",\n"

      cols=$(psql -h "$TARGET" -U postgres -w -d "$dbname" -t -A -F "|" -c "
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = '$tbl' AND table_schema = 'public'
        ORDER BY ordinal_position;" 2>/dev/null || echo "ERROR")
      printf "          \"%s\": %s" "$tbl" "$(je "$cols")"
    done
    echo ""
    echo "        }"
    echo "      }"
  done
  echo ""
  echo "    }"
else
  echo "    \"note\": \"Could not authenticate. Error captured in connection_attempts.\""
fi

echo "  }"
echo "}"
' > "$OUTDIR/postgresql-discovery.json"
echo "  Done: postgresql-discovery.json"

###############################################################################
echo "[3/6] nmap Comprehensive Scan..."
###############################################################################
podman run --rm --dns 8.8.8.8 --cap-add NET_RAW "$IMAGE" bash -c '
TARGET="13.220.193.170"

je() { printf "%s" "$1" | jq -Rs .; }

echo "{"
echo "  \"probe\": \"nmap_comprehensive\","
echo "  \"timestamp\": \"$(date -Iseconds)\","
echo "  \"target\": \"$TARGET\","

# 1. Targeted scan: known ports, service versions, default scripts, OS detection
targeted=$(nmap -sV -sC -O \
  -p 22,25,80,143,443,465,587,993,3000,5432,6379,8083 \
  --open -T4 --max-retries 2 \
  -oX /tmp/nmap-targeted.xml \
  "$TARGET" 2>&1)
echo "  \"targeted_scan\": $(je "$targeted"),"

# Save XML for machine parsing
targeted_xml=$(cat /tmp/nmap-targeted.xml 2>/dev/null || echo "")
echo "  \"targeted_xml\": $(je "$targeted_xml"),"

# 2. Full port sweep: find anything the manual scan missed
echo ""
echo "  \"note_full_scan\": \"Scanning all 65535 TCP ports...\","
full_scan=$(nmap -sS -p- --open -T4 --max-retries 1 --min-rate 1000 \
  -oX /tmp/nmap-full.xml \
  "$TARGET" 2>&1)
echo "  \"full_port_scan\": $(je "$full_scan"),"

full_xml=$(cat /tmp/nmap-full.xml 2>/dev/null || echo "")
echo "  \"full_port_xml\": $(je "$full_xml"),"

# 3. Redis-specific NSE
redis_nse=$(nmap -p 6379 --script redis-info "$TARGET" 2>&1)
echo "  \"redis_nse\": $(je "$redis_nse"),"

# 4. HTTP enumeration NSE
http_nse=$(nmap -p 80,3000,8083 \
  --script http-title,http-headers,http-methods,http-git \
  "$TARGET" 2>&1)
echo "  \"http_nse\": $(je "$http_nse")"

echo "}"
' > "$OUTDIR/nmap-comprehensive.json"
echo "  Done: nmap-comprehensive.json"

###############################################################################
echo "[4/6] Node.js Application Recon..."
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
TARGET="13.220.193.170"
BASE="http://$TARGET:3000"

je() { printf "%s" "$1" | jq -Rs .; }

echo "{"
echo "  \"probe\": \"nodejs_deep\","
echo "  \"timestamp\": \"$(date -Iseconds)\","
echo "  \"target\": \"$BASE\","

# 1. Git repository exposure
echo "  \"git_exposure\": ["
first=true
for path in .git/HEAD .git/config .git/refs/heads/main .git/refs/heads/master \
            .git/objects/ .git/COMMIT_EDITMSG .git/description .gitignore; do
  status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 5 --max-time 10 "$BASE/$path" 2>/dev/null || echo "000")
  body=""
  if [ "$status" != "500" ] && [ "$status" != "000" ]; then
    body=$(curl -sL --connect-timeout 5 --max-time 10 "$BASE/$path" 2>/dev/null | head -c 500)
  fi
  [ "$first" = true ] && first=false || printf ",\n"
  printf "    {\"path\": \"%s\", \"status\": \"%s\", \"body_preview\": %s}" "$path" "$status" "$(je "$body")"
done
echo ""
echo "  ],"

# 2. Source map discovery
echo "  \"source_maps\": ["
first=true
for mapfile in assets/index-CUlwK__p.js.map assets/index-D8N5ZY6U.css.map bundle.js.map app.js.map; do
  status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 5 --max-time 10 "$BASE/$mapfile" 2>/dev/null || echo "000")
  [ "$first" = true ] && first=false || printf ",\n"
  printf "    {\"path\": \"%s\", \"status\": \"%s\"}" "$mapfile" "$status"
done
echo ""
echo "  ],"

# 3. Comprehensive path enumeration
# Flag anything that does NOT return the standard 500
echo "  \"path_enumeration\": ["
first=true
for path in / /swagger /swagger-ui /docs /api-docs /graphql /admin /debug \
            /metrics /prometheus /actuator /actuator/health /actuator/env \
            /debug/vars /debug/pprof /_debugbar \
            /server-status /nginx_status /stub_status \
            /favicon.ico /robots.txt /sitemap.xml \
            /api /api/users /api/config /api/debug /api/version /api/info \
            /api/leads /api/funnels /api/campaigns /api/webhooks \
            /api/continue /api/continue-click /api/track /api/click /api/redirect \
            /login /register /dashboard /panel \
            /webpack.config.js /tsconfig.json /package.json /package-lock.json \
            /yarn.lock /Dockerfile /docker-compose.yml \
            /.env /.env.local /.env.production \
            /node_modules/ /dist/ /build/ /src/ /public/ \
            /health /healthz /ready /readyz /livez \
            /v1 /v2 /api/v1 /api/v2; do
  status=$(curl -so /dev/null -w "%{http_code}" --connect-timeout 3 --max-time 8 "$BASE$path" 2>/dev/null || echo "000")
  [ "$first" = true ] && first=false || printf ",\n"
  # Include body preview for non-500 responses (those are interesting)
  if [ "$status" != "500" ] && [ "$status" != "000" ]; then
    body=$(curl -sL --connect-timeout 3 --max-time 8 "$BASE$path" 2>/dev/null | head -c 300)
    printf "    {\"path\": \"%s\", \"status\": \"%s\", \"interesting\": true, \"body_preview\": %s}" "$path" "$status" "$(je "$body")"
  else
    printf "    {\"path\": \"%s\", \"status\": \"%s\"}" "$path" "$status"
  fi
done
echo ""
echo "  ],"

# 4. Stack trace harvesting via malformed requests
echo "  \"error_probing\": ["

# Malformed JSON body
trace1=$(curl -sL --connect-timeout 5 --max-time 10 -X POST \
  -H "Content-Type: application/json" \
  -d "{\"invalid\":" "$BASE/api/continue" 2>/dev/null | head -c 1000)
printf "    {\"method\": \"malformed_json\", \"response\": %s},\n" "$(je "$trace1")"

# Wrong content type
trace2=$(curl -sL --connect-timeout 5 --max-time 10 -X POST \
  -H "Content-Type: application/xml" \
  -d "<xml/>" "$BASE/api/continue" 2>/dev/null | head -c 1000)
printf "    {\"method\": \"wrong_content_type\", \"response\": %s},\n" "$(je "$trace2")"

# Very long path
longpath=$(python3 -c "print(\"A\" * 5000)")
trace3=$(curl -sL --connect-timeout 5 --max-time 10 "$BASE/$longpath" 2>/dev/null | head -c 1000)
printf "    {\"method\": \"long_path_5000\", \"response\": %s},\n" "$(je "$trace3")"

# Special characters
trace4=$(curl -sL --connect-timeout 5 --max-time 10 "$BASE/api/%00%0d%0a" 2>/dev/null | head -c 1000)
printf "    {\"method\": \"null_crlf_injection\", \"response\": %s},\n" "$(je "$trace4")"

# OPTIONS method
trace5=$(curl -sL --connect-timeout 5 --max-time 10 -X OPTIONS -i "$BASE/api/continue" 2>/dev/null | head -c 1000)
printf "    {\"method\": \"options\", \"response\": %s}" "$(je "$trace5")"
echo ""
echo "  ],"

# 5. Full response headers from key endpoints
echo "  \"response_headers\": ["
first=true
for path in / /api/continue /api/continue-click /health; do
  headers=$(curl -sI --connect-timeout 5 --max-time 10 "$BASE$path" 2>/dev/null)
  [ "$first" = true ] && first=false || printf ",\n"
  printf "    {\"path\": \"%s\", \"headers\": %s}" "$path" "$(je "$headers")"
done
echo ""
echo "  ]"

echo "}"
' > "$OUTDIR/nodejs-deep.json"
echo "  Done: nodejs-deep.json"

###############################################################################
echo "[5/6] GCS Complete Inventory..."
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
je() { printf "%s" "$1" | jq -Rs .; }

# Download full bucket listings
curl -sL --connect-timeout 30 --max-time 120 \
  "https://storage.googleapis.com/b.noodledit.com/?max-keys=1000" \
  -o /tmp/gcs-b.xml 2>/dev/null

curl -sL --connect-timeout 30 --max-time 120 \
  "https://storage.googleapis.com/sassets.noodledit.com/?max-keys=1000" \
  -o /tmp/gcs-sassets.xml 2>/dev/null

# Check for pagination (>1000 objects)
if grep -q "<IsTruncated>true</IsTruncated>" /tmp/gcs-b.xml 2>/dev/null; then
  last_key=$(grep -oP "<Key>[^<]+" /tmp/gcs-b.xml | tail -1 | sed "s/<Key>//")
  curl -sL --connect-timeout 30 --max-time 120 \
    "https://storage.googleapis.com/b.noodledit.com/?max-keys=1000&marker=$last_key" \
    -o /tmp/gcs-b-p2.xml 2>/dev/null
fi

# Parse with python3 for proper XML handling
python3 -c "
import xml.etree.ElementTree as ET
import json, sys, os, re

def parse_bucket(xml_path, bucket_name):
    if not os.path.exists(xml_path):
        return {'bucket': bucket_name, 'error': 'download_failed'}

    try:
        tree = ET.parse(xml_path)
    except ET.ParseError as e:
        return {'bucket': bucket_name, 'error': str(e)}

    root = tree.getroot()
    # Handle namespace (GCS uses S3-compatible XML)
    ns = ''
    if root.tag.startswith('{'):
        ns = root.tag.split('}')[0] + '}'

    items = []
    for contents in root.iter(ns + 'Contents'):
        key_el = contents.find(ns + 'Key')
        size_el = contents.find(ns + 'Size')
        mod_el = contents.find(ns + 'LastModified')
        etag_el = contents.find(ns + 'ETag')

        key = key_el.text if key_el is not None else ''
        size = int(size_el.text) if size_el is not None else 0
        modified = mod_el.text if mod_el is not None else ''
        etag = etag_el.text.strip('\"') if etag_el is not None else ''

        items.append({
            'key': key,
            'size_bytes': size,
            'last_modified': modified,
            'etag': etag,
        })

    # Check for page 2
    p2_path = xml_path.replace('.xml', '-p2.xml')
    if os.path.exists(p2_path):
        try:
            tree2 = ET.parse(p2_path)
            root2 = tree2.getroot()
            for contents in root2.iter(ns + 'Contents'):
                key_el = contents.find(ns + 'Key')
                size_el = contents.find(ns + 'Size')
                mod_el = contents.find(ns + 'LastModified')
                etag_el = contents.find(ns + 'ETag')
                items.append({
                    'key': key_el.text if key_el is not None else '',
                    'size_bytes': int(size_el.text) if size_el is not None else 0,
                    'last_modified': mod_el.text if mod_el is not None else '',
                    'etag': etag_el.text.strip('\"') if etag_el is not None else '',
                })
        except Exception:
            pass

    items.sort(key=lambda x: x['last_modified'], reverse=True)
    total_size = sum(i['size_bytes'] for i in items)

    # Detect sensitive files
    sensitive_patterns = ['.env', '.sql', '.bak', '.dump', '.tar', '.gz', '.zip',
                          'config', 'database', 'credentials', 'secret', '.key',
                          '.pem', '.crt', 'backup', 'migration', '.csv',
                          'password', 'token', '.log']
    flagged = []
    for item in items:
        for pat in sensitive_patterns:
            if pat in item['key'].lower():
                flagged.append(item['key'])
                break

    # Categorize by directory/prefix
    categories = {}
    for item in items:
        prefix = item['key'].split('/')[0] if '/' in item['key'] else '(root)'
        if prefix not in categories:
            categories[prefix] = {'count': 0, 'total_bytes': 0}
        categories[prefix]['count'] += 1
        categories[prefix]['total_bytes'] += item['size_bytes']

    return {
        'bucket': bucket_name,
        'total_objects': len(items),
        'total_size_bytes': total_size,
        'total_size_mb': round(total_size / 1048576, 2),
        'newest': items[0] if items else None,
        'oldest': items[-1] if items else None,
        'categories': categories,
        'sensitive_files_flagged': flagged,
        'objects': items,
    }

result = {
    'probe': 'gcs_inventory',
    'timestamp': '$(date -Iseconds)',
    'b_noodledit': parse_bucket('/tmp/gcs-b.xml', 'b.noodledit.com'),
    'sassets_noodledit': parse_bucket('/tmp/gcs-sassets.xml', 'sassets.noodledit.com'),
}

print(json.dumps(result, indent=2))
"
' > "$OUTDIR/gcs-inventory.json"
echo "  Done: gcs-inventory.json"

# Also save raw XMLs
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
curl -sL --connect-timeout 30 --max-time 120 \
  "https://storage.googleapis.com/b.noodledit.com/?max-keys=1000" 2>/dev/null
' > "$OUTDIR/gcs-b-listing-full.xml"

podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
curl -sL --connect-timeout 30 --max-time 120 \
  "https://storage.googleapis.com/sassets.noodledit.com/?max-keys=1000" 2>/dev/null
' > "$OUTDIR/gcs-sassets-listing-full.xml"

###############################################################################
echo "[6/6] Hestia Panel Enumeration..."
###############################################################################
podman run --rm --dns 8.8.8.8 "$IMAGE" bash -c '
TARGET="13.220.193.170"
HESTIA="https://$TARGET:8083"

je() { printf "%s" "$1" | jq -Rs .; }

echo "{"
echo "  \"probe\": \"hestia_panel\","
echo "  \"timestamp\": \"$(date -Iseconds)\","
echo "  \"target\": \"$HESTIA\","

# 1. Login page analysis
login_page=$(curl -skL --connect-timeout 10 --max-time 15 "$HESTIA/login/" 2>/dev/null)
login_status=$(curl -sk -o /dev/null -w "%{http_code}" --connect-timeout 10 --max-time 15 "$HESTIA/login/" 2>/dev/null || echo "000")
echo "  \"login_page\": {"
printf "    \"status\": \"%s\",\n" "$login_status"
printf "    \"page_size\": %d,\n" "${#login_page}"
# Extract version and CSRF token
hestia_version=$(echo "$login_page" | grep -oP "v=[0-9.]+" | head -1 || echo "")
csrf_token_format=$(echo "$login_page" | grep -oP "name=\"token\" value=\"[^\"]*\"" | head -1 || echo "")
printf "    \"version_string\": %s,\n" "$(je "$hestia_version")"
printf "    \"csrf_token_present\": %s,\n" "$(je "$csrf_token_format")"
printf "    \"page_title\": %s\n" "$(je "$(echo "$login_page" | grep -oP "<title>[^<]+" | sed "s/<title>//" | head -1 || echo "")")"
echo "  },"

# 2. Standard info paths
echo "  \"info_paths\": ["
first=true
for path in /robots.txt /sitemap.xml /.well-known/security.txt /favicon.ico; do
  status=$(curl -sk -o /dev/null -w "%{http_code}" --connect-timeout 5 --max-time 10 "$HESTIA$path" 2>/dev/null || echo "000")
  body=""
  [ "$status" != "000" ] && [ "$status" != "403" ] && body=$(curl -skL --connect-timeout 5 --max-time 10 "$HESTIA$path" 2>/dev/null | head -c 500)
  [ "$first" = true ] && first=false || printf ",\n"
  printf "    {\"path\": \"%s\", \"status\": \"%s\", \"body_preview\": %s}" "$path" "$status" "$(je "$body")"
done
echo ""
echo "  ],"

# 3. Hestia API endpoints (GET - see what leaks without auth)
echo "  \"api_get_paths\": ["
first=true
for path in /api/ /api/v1/ /list/user/ /list/web/ /list/dns/ /list/mail/ \
            /list/db/ /list/cron/ /list/backup/ /list/fs/ /list/log/ /list/sys/ \
            /edit/ /add/ /delete/ /schedule/ /download/ /upload/ /backup/ /restore/; do
  status=$(curl -sk -o /dev/null -w "%{http_code}" --connect-timeout 5 --max-time 10 "$HESTIA$path" 2>/dev/null || echo "000")
  [ "$first" = true ] && first=false || printf ",\n"
  body=""
  if [ "$status" != "000" ] && [ "$status" != "302" ] && [ "$status" != "301" ]; then
    body=$(curl -skL --connect-timeout 5 --max-time 10 "$HESTIA$path" 2>/dev/null | head -c 300)
  fi
  printf "    {\"path\": \"%s\", \"status\": \"%s\", \"body_preview\": %s}" "$path" "$status" "$(je "$body")"
done
echo ""
echo "  ],"

# 4. POST to Hestia API with empty credentials
echo "  \"api_post_attempts\": ["

# Empty auth
post1=$(curl -sk --connect-timeout 10 --max-time 15 -X POST \
  -d "user=admin&password=" "$HESTIA/api/" 2>/dev/null | head -c 500)
post1_status=$(curl -sk -o /dev/null -w "%{http_code}" --connect-timeout 10 --max-time 15 -X POST \
  -d "user=admin&password=" "$HESTIA/api/" 2>/dev/null || echo "000")
printf "    {\"description\": \"empty_password\", \"status\": \"%s\", \"response\": %s},\n" "$post1_status" "$(je "$post1")"

# v-list-sys-info command
post2=$(curl -sk --connect-timeout 10 --max-time 15 -X POST \
  -d "user=admin&password=&cmd=v-list-sys-info&returncode=yes" "$HESTIA/api/" 2>/dev/null | head -c 500)
post2_status=$(curl -sk -o /dev/null -w "%{http_code}" --connect-timeout 10 --max-time 15 -X POST \
  -d "user=admin&password=&cmd=v-list-sys-info&returncode=yes" "$HESTIA/api/" 2>/dev/null || echo "000")
printf "    {\"description\": \"v-list-sys-info\", \"status\": \"%s\", \"response\": %s}" "$post2_status" "$(je "$post2")"
echo ""
echo "  ],"

# 5. Directory/asset enumeration
echo "  \"directory_enumeration\": ["
first=true
for path in /images/ /css/ /js/ /fonts/ /images/favicon.png /images/logo.svg \
            /js/dist/ /css/themes/ /fm/ /reset/ /error/ \
            /403.html /404.html /50x.html \
            /generate/ssl/ /generate/dns/ /list/log/auth/; do
  status=$(curl -sk -o /dev/null -w "%{http_code}" --connect-timeout 5 --max-time 10 "$HESTIA$path" 2>/dev/null || echo "000")
  [ "$first" = true ] && first=false || printf ",\n"
  printf "    {\"path\": \"%s\", \"status\": \"%s\"}" "$path" "$status"
done
echo ""
echo "  ],"

# 6. SSL certificate details
cert_info=$(echo | openssl s_client -connect "$TARGET:8083" -servername "$TARGET" 2>/dev/null | openssl x509 -noout -text 2>/dev/null | head -30)
echo "  \"ssl_certificate\": $(je "$cert_info")"

echo "}"
' > "$OUTDIR/hestia-panel.json"
echo "  Done: hestia-panel.json"

###############################################################################
echo ""
echo "=== All 6 probes complete ==="
echo "Artifacts: $OUTDIR/"
ls -lh "$OUTDIR/"
echo ""
echo "Finished: $(date -Iseconds)"
