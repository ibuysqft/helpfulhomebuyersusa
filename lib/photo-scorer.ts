// lib/photo-scorer.ts

import Anthropic from '@anthropic-ai/sdk'
import type { PhotoScoreResult, DistressSignals } from './mls-types'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const PROMPT = `Analyze ALL provided listing photos and score property distress across 6 categories. Only award points for clearly visible distress signals.

Categories (score each 0 to max):
- kitchen (0–2): oak/laminate cabinets, dated appliances, drop ceiling, old tile
- bathrooms (0–2): harvest gold/pink fixtures, vintage tile, water stains
- flooring (0–1): carpet throughout, vinyl, stained hardwood, damaged tile
- ceilings_walls (0–1): popcorn ceilings, wood paneling, wallpaper, water damage
- exterior_roof (0–2): aging shingles, peeling paint, rotted wood, overgrown yard
- structural (0–2): visible cracks, sagging floors, boarded windows, foundation issues

Respond ONLY with valid JSON:
{
  "kitchen": 0, "bathrooms": 0, "flooring": 0,
  "ceilings_walls": 0, "exterior_roof": 0, "structural": 0,
  "signal_descriptions": ["string"],
  "repair_estimates": {
    "kitchen": [0, 0], "bathrooms": [0, 0], "flooring": [0, 0],
    "ceilings_walls": [0, 0], "exterior_roof": [0, 0]
  }
}`

async function fetchRedfinPhotos(address: string): Promise<string[]> {
  try {
    const encoded = encodeURIComponent(address)
    const res = await fetch(
      `https://www.redfin.com/stingray/do/location-autocomplete?location=${encoded}&count=1&v=2`,
      { headers: { 'User-Agent': 'Mozilla/5.0 (compatible)' } }
    )
    const text = await res.text()
    const json = JSON.parse(text.replace(/^[^{]+/, ''))
    const path = json?.payload?.exactMatch?.url ?? json?.payload?.sections?.[0]?.rows?.[0]?.url
    if (!path) return []

    const photoRes = await fetch(
      `https://www.redfin.com/stingray/api/home/details/initialInfo?path=${path}&accessLevel=1`,
      { headers: { 'User-Agent': 'Mozilla/5.0 (compatible)' } }
    )
    const photoText = await photoRes.text()
    const photoJson = JSON.parse(photoText.replace(/^[^{]+/, ''))
    const photos: string[] = photoJson?.payload?.mediaBrowserInfo?.photos?.map(
      (p: { photoUrls: { fullScreen: string } }) => p.photoUrls?.fullScreen
    ) ?? []
    return photos.filter(Boolean).slice(0, 20)
  } catch {
    return []
  }
}

export async function scorePropertyDistress(address: string): Promise<PhotoScoreResult | null> {
  const photoUrls = await fetchRedfinPhotos(address)
  if (photoUrls.length < 3) return null

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: [
        ...photoUrls.map(url => ({ type: 'image' as const, source: { type: 'url' as const, url } })),
        { type: 'text', text: PROMPT },
      ],
    }],
  })

  const raw = response.content[0]?.type === 'text' ? response.content[0].text : ''
  let parsed: {
    kitchen: number; bathrooms: number; flooring: number
    ceilings_walls: number; exterior_roof: number; structural: number
    signal_descriptions: string[]
    repair_estimates: Record<string, [number, number]>
  }
  try { parsed = JSON.parse(raw) } catch { return null }

  const signals: DistressSignals = {
    kitchen: Math.min(parsed.kitchen ?? 0, 2),
    bathrooms: Math.min(parsed.bathrooms ?? 0, 2),
    flooring: Math.min(parsed.flooring ?? 0, 1),
    ceilings_walls: Math.min(parsed.ceilings_walls ?? 0, 1),
    exterior_roof: Math.min(parsed.exterior_roof ?? 0, 2),
    structural: Math.min(parsed.structural ?? 0, 2),
  }
  const distressScore = Object.values(signals).reduce((s: number, v) => s + (typeof v === 'number' ? v : 0), 0)
  const est = parsed.repair_estimates ?? {}
  const repairEstimateLow = Object.values(est).reduce((s: number, pair) => s + (pair[0] ?? 0), 0)
  const repairEstimateHigh = Object.values(est).reduce((s: number, pair) => s + (pair[1] ?? 0), 0)

  return {
    distressScore,
    signals,
    repairEstimateLow,
    repairEstimateHigh,
    photoCount: photoUrls.length,
    signalDescriptions: parsed.signal_descriptions ?? [],
  }
}

export function distressScoreToCondition(score: number): 'poor' | 'fair' | 'good' {
  if (score >= 8) return 'poor'
  if (score >= 6) return 'fair'
  return 'good'
}
