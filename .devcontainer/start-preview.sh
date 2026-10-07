#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

node -e 'if (Number(process.versions.node.split(".")[0]) !== 24) { console.error("Node.js 24 is required."); process.exit(1); }'
if [[ ! -f node_modules/next/dist/bin/next ]]; then
  echo "Dependencies are missing. Run npm ci, then retry this script." >&2
  exit 1
fi

# Codespaces serves forwarded ports over HTTPS, while Next listens on HTTP.
if [[ "${CODESPACES:-false}" == "true" ]]; then
  export COOKIE_SECURE=true
fi

preview_ready() {
  node --input-type=module <<'JS'
try {
  const health = await fetch('http://127.0.0.1:3000/api/health', {signal: AbortSignal.timeout(2000)});
  if (!health.ok || (await health.json()).ok !== true) process.exit(1);
  const home = await fetch('http://127.0.0.1:3000', {signal: AbortSignal.timeout(3000)});
  if (!home.ok || !(await home.text()).includes('Görünür değil')) process.exit(1);
} catch {
  process.exit(1);
}
JS
}

if preview_ready; then
  echo "Contrast is already running. Open port 3000 in the Ports panel."
  exit 0
fi

mkdir -p .data
umask 077
preview_log=.data/preview.log
nohup npm run dev -- --port 3000 > "$preview_log" 2>&1 < /dev/null &
preview_pid=$!

for preview_attempt in {1..60}; do
  if preview_ready; then
    echo "Contrast preview is ready. Open port 3000 in the Ports panel."
    echo "Keep Port Visibility set to Private."
    exit 0
  fi
  if ! kill -0 "$preview_pid" 2>/dev/null; then
    echo "Preview stopped during startup. Check .data/preview.log." >&2
    exit 1
  fi
  sleep 0.5
done

echo "Preview did not become ready. Check .data/preview.log." >&2
exit 1
