#!/usr/bin/env bash
# Sync all env vars from .env.local to the linked Vercel project
# Usage: ./scripts/sync-env-to-vercel.sh [--prod]
#   --prod also sets production environment (default: preview only)

set -euo pipefail

ENV_FILE=".env.local"
ENVS="production preview"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Error: $ENV_FILE not found"
  exit 1
fi

echo "Syncing $ENV_FILE to Vercel..."
echo ""

while IFS='=' read -r key value; do
  # Skip comments and empty lines
  [[ "$key" =~ ^#.*$ ]] && continue
  [[ -z "$key" ]] && continue
  [[ -z "$value" ]] && continue

  echo "  Setting $key..."
  for env in $ENVS; do
    # Remove existing (ignore errors if not found)
    vercel env rm "$key" "$env" --yes 2>/dev/null || true
    # Add new value
    printf '%s' "$value" | vercel env add "$key" "$env" --yes 2>/dev/null || \
      echo "    Warning: Could not set $key in $env"
  done
done < <(grep -v '^#' "$ENV_FILE" | grep '=')

echo ""
echo "Done! Run 'vercel deploy --prod' to apply."
