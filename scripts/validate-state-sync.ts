#!/usr/bin/env tsx
/**
 * validate-state-sync.ts
 * Validates that every states/*.env file has a matching entry in proxy.ts
 * HOSTNAME_TO_SLUG map, and vice versa. Run in CI or before deploy.
 *
 * Usage: npx tsx scripts/validate-state-sync.ts
 */

import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const ROOT = join(__dirname, '..')
const STATES_DIR = join(ROOT, 'states')
const PROXY_FILE = join(ROOT, 'proxy.ts')

const proxySource = readFileSync(PROXY_FILE, 'utf-8')

// Extract all slugs from proxy.ts HOSTNAME_TO_SLUG
const slugsInProxy = new Set<string>()
const hostnameMatches = proxySource.matchAll(/'[^']+\.com':\s*'([^']+)'/g)
for (const m of hostnameMatches) {
  slugsInProxy.add(m[1])
}

// Extract all slugs from states/*.env
const slugsInEnv = new Set<string>()
const envFiles = readdirSync(STATES_DIR).filter((f) => f.endsWith('.env'))
for (const file of envFiles) {
  const content = readFileSync(join(STATES_DIR, file), 'utf-8')
  const match = content.match(/NEXT_PUBLIC_STATE_SLUG=(.+)/)
  if (match) slugsInEnv.add(match[1].trim())
}

let exitCode = 0

// Slugs in .env but missing from proxy.ts
for (const slug of slugsInEnv) {
  if (!slugsInProxy.has(slug)) {
    console.error(`MISSING in proxy.ts: slug "${slug}" (from states/${slug.replace(/-/g, '')}.env or similar)`)
    exitCode = 1
  }
}

// Slugs in proxy.ts but missing from states/*.env
for (const slug of slugsInProxy) {
  if (!slugsInEnv.has(slug)) {
    console.error(`MISSING in states/*.env: slug "${slug}" (found in proxy.ts but no matching .env)`)
    exitCode = 1
  }
}

if (exitCode === 0) {
  console.log(`✓ State sync valid — ${slugsInProxy.size} states matched (proxy.ts ↔ states/*.env)`)
}

process.exit(exitCode)
