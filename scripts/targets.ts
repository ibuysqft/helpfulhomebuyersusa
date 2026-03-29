#!/usr/bin/env npx tsx
// scripts/targets.ts
// Usage:
//   npm run targets list
//   npm run targets add county "Loudoun" VA
//   npm run targets add city "Virginia Beach" VA
//   npm run targets remove "Loudoun"
//   npm run targets pause "Loudoun"
//   npm run targets resume "Loudoun"

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

const [, , cmd, ...args] = process.argv

async function list() {
  const { data } = await supabase
    .from('scrape_targets')
    .select('*')
    .order('state')
    .order('type')
    .order('value')
  if (!data?.length) {
    console.log('No targets.')
    return
  }
  console.log('\nScrape Targets:')
  console.log('\u2500'.repeat(50))
  for (const t of data) {
    const status = t.active ? '\u2713' : '\u2717'
    console.log(
      `${status}  [${t.type.padEnd(6)}] ${t.value.padEnd(20)} ${t.state}`,
    )
  }
  console.log('\u2500'.repeat(50))
  console.log(
    `${data.filter((t: { active: boolean }) => t.active).length} active, ${data.filter((t: { active: boolean }) => !t.active).length} paused\n`,
  )
}

async function add(type: string, value: string, state: string) {
  const { error } = await supabase
    .from('scrape_targets')
    .upsert({ type, value, state: state.toUpperCase(), active: true })
  if (error) {
    console.error('Error:', error.message)
    return
  }
  console.log(`\u2713 Added: ${type} "${value}" ${state.toUpperCase()}`)
}

async function remove(value: string) {
  const { error } = await supabase
    .from('scrape_targets')
    .delete()
    .ilike('value', value)
  if (error) {
    console.error('Error:', error.message)
    return
  }
  console.log(`\u2713 Removed: "${value}"`)
}

async function setActive(value: string, active: boolean) {
  const { error } = await supabase
    .from('scrape_targets')
    .update({ active })
    .ilike('value', value)
  if (error) {
    console.error('Error:', error.message)
    return
  }
  console.log(`\u2713 ${active ? 'Resumed' : 'Paused'}: "${value}"`)
}

switch (cmd) {
  case 'list':
    await list()
    break
  case 'add':
    await add(args[0], args[1], args[2] ?? 'VA')
    break
  case 'remove':
    await remove(args[0])
    break
  case 'pause':
    await setActive(args[0], false)
    break
  case 'resume':
    await setActive(args[0], true)
    break
  default:
    console.log(
      'Usage: npm run targets <list|add|remove|pause|resume> [args]',
    )
    console.log('  list')
    console.log('  add county "Loudoun" VA')
    console.log('  remove "Loudoun"')
    console.log('  pause "Fairfax"')
    console.log('  resume "Fairfax"')
}
