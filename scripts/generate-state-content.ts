/**
 * Generates state-specific legal content for the programmatic SEO pages.
 * Usage:
 *   npx tsx scripts/generate-state-content.ts                     # all missing
 *   npx tsx scripts/generate-state-content.ts --dry-run           # print prompts only
 *   npx tsx scripts/generate-state-content.ts --state virginia    # one state
 *   npx tsx scripts/generate-state-content.ts --situation foreclosure  # one situation
 */
import Anthropic from '@anthropic-ai/sdk'
import fs from 'node:fs'
import path from 'node:path'
import { registeredStates } from '../lib/state-context'
import { getCitiesForState } from '../lib/state-data'
import type { StateContent } from '../data/state-content/types'

const TOP_SITUATIONS = [
  'foreclosure',
  'inherited',
  'divorce',
  'probate',
  'behind-payments',
  'tax-lien',
  'fire-damage',
  'vacant',
  'tired-landlord',
  'code-violations',
  'senior-transition',
  'pre-foreclosure',
  'hoarder-house',
  'out-of-state-landlord',
  'reverse-mortgage',
  'job-relocation',
  'military-pcs',
  'irs-lien',
  'bankruptcy',
  'medical-bills',
] as const

type TopSituation = typeof TOP_SITUATIONS[number]

const SITUATION_PROMPTS: Record<TopSituation, string> = {
  foreclosure:
    "the judicial vs non-judicial foreclosure process, including the timeline from notice of default to auction, any statutory right of redemption, and the homeowner's rights during this process",
  inherited:
    'the probate process for real estate, whether probate is required or if affidavit procedures apply for small estates, typical timeline from death to clear title, and any estate tax thresholds specific to this state',
  divorce:
    'how marital real property is handled in divorce, whether the state is equitable distribution or community property, and whether court approval is required to sell a jointly-owned home during divorce proceedings',
  probate:
    'the probate administration process for real estate, whether independent administration is available without court approval at each step, the Muniment of Title or simplified affidavit procedures, and typical timeline from filing to close',
  'behind-payments':
    'the foreclosure timeline for homeowners who have missed mortgage payments, the period from first missed payment to notice of default, and the options available before the auction date',
  'tax-lien':
    "the property tax delinquency process including when liens attach, the tax sale or tax deed process, the homeowner's right of redemption after a tax sale, and any hardship programs available",
  'fire-damage':
    'the permit and code requirements for fire-damaged properties, whether a condemned property can still be sold, and the city or county abatement process that could affect the timeline',
  vacant:
    "any state or local regulations affecting vacant properties, including nuisance ordinances, vacancy registration requirements, and how prolonged vacancy affects the owner's rights",
  'tired-landlord':
    'the landlord-tenant law framework, specifically tenant rights when a property is sold, required notice periods before closing with tenants in place, and any rent control or just-cause eviction rules that apply',
  'code-violations':
    'how open code violations and unpermitted work are handled in property sales, whether violations transfer with the title, city-run abatement programs that could place liens, and how condemned status affects a sale',
  'senior-transition':
    'the legal and financial considerations for seniors selling a home to transition to assisted living or memory care, including Medicaid look-back rules for home equity, any homestead exemption implications, and power-of-attorney requirements for a sale when the owner has diminished capacity',
  'pre-foreclosure':
    "Virginia's non-judicial pre-foreclosure process specifically — from the first missed payment through the Notice of Default and the 14-day trustee sale notice window, distinguishing pre-foreclosure from active foreclosure, and what options a homeowner has during the NOD period before the auction is advertised",
  'hoarder-house':
    'how severely cluttered or hoarding-condition properties are handled under state code enforcement, whether local health departments can issue condemnation or abatement orders for hoarding conditions, and how the presence of biohazards or structural damage from accumulation affects a cash sale timeline',
  'out-of-state-landlord':
    'the landlord-tenant laws that apply when a non-resident property owner sells a tenant-occupied rental, including required notice periods to tenants before closing, whether leases transfer to the buyer by operation of law, and any state withholding requirements on sale proceeds for non-resident sellers',
  'reverse-mortgage':
    "the HECM and proprietary reverse mortgage payoff process in this state when a borrower dies or vacates, the 30-day due-and-payable notice and 6-month extension window under HUD rules, and how Virginia title companies handle federal HUD lien discharge — distinguishing federal HECM rules from any state-level reverse mortgage statutes",
  'job-relocation':
    'the practical legal and financial considerations for a homeowner who must sell quickly due to a job relocation, including typical Virginia closing timelines, whether a home sale contingency can be waived, and how a cash sale compares to a traditional listing when the seller has a hard start-date deadline',
  'military-pcs':
    "the Servicemembers Civil Relief Act (SCRA) protections available to military homeowners during a PCS move, Virginia-specific considerations for VA loan payoffs on a quick sale, and the resources available at major Virginia installations (Fort Belvoir, Quantico, Pentagon area) for military families who must sell on short PCS timelines",
  'irs-lien':
    'how federal IRS tax liens attach to real property in Virginia, the IRS Certificate of Discharge (Form 14135) process that allows a sale to close despite an outstanding lien, the typical timeline for IRS lien discharge, and how Virginia title companies handle federal lien payoffs at closing — noting that IRS lien rules are federal and apply uniformly regardless of state',
  bankruptcy:
    'how Chapter 7 and Chapter 13 bankruptcy affect a homeowner\'s ability to sell their Virginia home, the automatic stay and how it interacts with a pending sale, whether the bankruptcy trustee must approve a sale, and the homestead exemption under Virginia Code § 34-4 that protects up to $25,000 of home equity in bankruptcy proceedings',
  'medical-bills':
    'how medical debt and hospital liens can attach to real property in Virginia, the Virginia Hospital Lien Act and whether unpaid medical bills can become judgment liens on a home, and the practical process for clearing medical judgment liens at closing so a cash buyer can take clear title',
}

const REGISTRY_PATH = path.resolve('data/state-content/registry.ts')

function readExistingRegistry(): Record<string, Record<string, StateContent>> {
  if (!fs.existsSync(REGISTRY_PATH)) return {}
  const raw = fs.readFileSync(REGISTRY_PATH, 'utf-8')
  const match = raw.match(/export const stateContent[^=]+=\s*(\{[\s\S]*?\n\})\n\nexport/)
  if (!match) return {}
  try {
    return JSON.parse(match[1]) as Record<string, Record<string, StateContent>>
  } catch {
    return {}
  }
}

function writeRegistry(content: Record<string, Record<string, StateContent>>) {
  // Read-merge-write to avoid clobbering concurrent instances
  const onDisk = readExistingRegistry()
  for (const [stateSlug, situations] of Object.entries(onDisk)) {
    if (!content[stateSlug]) content[stateSlug] = {}
    for (const [sit, val] of Object.entries(situations)) {
      if (!content[stateSlug][sit]) content[stateSlug][sit] = val
    }
  }
  const body = JSON.stringify(content, null, 2)
  const src = `import type { StateContent } from './types'

// Generated by scripts/generate-state-content.ts — do not edit manually.
// Run: npx tsx scripts/generate-state-content.ts
export const stateContent: Record<string, Record<string, StateContent>> = ${body}

export function getStateContent(
  stateSlug: string,
  situationSlug: string,
): StateContent | null {
  return stateContent[stateSlug]?.[situationSlug] ?? null
}
`
  fs.writeFileSync(REGISTRY_PATH, src, 'utf-8')
  console.log(`✅ Wrote ${REGISTRY_PATH}`)
}

function buildPrompt(
  stateName: string,
  stateAbbr: string,
  situation: TopSituation,
  topCities: string[],
): string {
  const aspectDescription = SITUATION_PROMPTS[situation]
  return `You are writing accurate, state-specific legal context for a cash home buying company's website. Write content for ${stateName} (${stateAbbr}).

Topic: "${situation}" situations — specifically ${aspectDescription}.

Return ONLY valid JSON with this exact shape:
{
  "legalBlock": "3-4 sentence paragraph describing the legal landscape for ${situation} in ${stateName}. Be specific: name the court system, actual timelines, specific laws or codes where relevant. Do not use generic disclaimers. Write as if advising a homeowner, not providing legal advice formally.",
  "cityIntros": {
    ${topCities.map(c => `"${c}": "2-sentence opener mentioning ${c} specifically — reference the county, a local court or timeline nuance, or a hyperlocal detail. Natural, not robotic."`).join(',\n    ')}
  }
}

State: ${stateName}
Situation: ${situation}
Return only JSON, no markdown fencing.`
}

async function generateEntry(
  client: Anthropic,
  stateSlug: string,
  stateName: string,
  stateAbbr: string,
  situation: TopSituation,
  topCities: string[],
  dryRun: boolean,
): Promise<StateContent> {
  const prompt = buildPrompt(stateName, stateAbbr, situation, topCities)
  if (dryRun) {
    console.log(`\n--- PROMPT: ${stateSlug}/${situation} ---\n${prompt}\n`)
    return { legalBlock: '[DRY RUN]', cityIntros: {} }
  }
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  })
  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  const parsed = JSON.parse(text.trim()) as StateContent
  return parsed
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const stateFilter = args.find((_, i) => args[i - 1] === '--state')
  const situationFilter = args.find((_, i) => args[i - 1] === '--situation') as
    | TopSituation
    | undefined

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey && !dryRun) {
    console.error('❌ ANTHROPIC_API_KEY not set. Export it or use --dry-run.')
    process.exit(1)
  }

  const client = new Anthropic({ apiKey: apiKey ?? 'dry-run' })
  const registry = readExistingRegistry()

  const states = stateFilter
    ? registeredStates.filter(s => s.slug === stateFilter)
    : registeredStates
  const situations = situationFilter ? [situationFilter] : [...TOP_SITUATIONS]

  let generated = 0

  for (const state of states) {
    registry[state.slug] = registry[state.slug] ?? {}
    const cities = getCitiesForState(state.slug)
    const topCitySlugs = cities.slice(0, 20).map(c => c.slug)

    for (const situation of situations) {
      if (registry[state.slug][situation] && !dryRun) {
        console.log(`⏭  Skipping ${state.slug}/${situation} (already generated)`)
        continue
      }
      console.log(`🔄 Generating ${state.slug}/${situation}...`)
      try {
        const entry = await generateEntry(
          client,
          state.slug,
          state.name,
          state.abbr,
          situation as TopSituation,
          topCitySlugs,
          dryRun,
        )
        registry[state.slug][situation] = entry
        generated++
        // Write after every entry to preserve progress on interruption
        if (!dryRun) writeRegistry(registry)
      } catch (err) {
        console.error(`❌ Failed ${state.slug}/${situation}:`, err)
      }
    }
  }

  console.log(`\n✅ Done. Generated ${generated} entries.`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
