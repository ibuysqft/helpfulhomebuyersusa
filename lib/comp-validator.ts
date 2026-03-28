// lib/comp-validator.ts

import type { CompValidationResult } from './mls-types'

const COMP_PULLER_URL =
  process.env.COMP_PULLER_URL ?? 'https://helpful-homebuyers-comp-puller.onrender.com'

export async function validateAndCalcOffer(params: {
  address: string
  sqft: number
  condition: 'poor' | 'fair' | 'good'
  dealSauceWholesale: number
  repairEstimateLow: number
  repairEstimateHigh: number
}): Promise<CompValidationResult | null> {
  try {
    const res = await fetch(`${COMP_PULLER_URL}/analyze-deal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: params.address,
        subject_sqft: params.sqft,
        condition: params.condition,
      }),
      signal: AbortSignal.timeout(30_000),
    })
    if (!res.ok) { console.error(`[comp-validator] ${res.status}`); return null }

    const data: { arv: number } = await res.json()
    const compArv = data.arv
    const dealSauceArv = params.dealSauceWholesale
    const anchorArv = Math.min(compArv, dealSauceArv)
    const repairMid = Math.round((params.repairEstimateLow + params.repairEstimateHigh) / 2)
    const maxOffer = Math.round((anchorArv - repairMid) * 0.9)
    const divergence = Math.abs(compArv - dealSauceArv) / Math.max(compArv, dealSauceArv)
    return { compArv, dealSauceArv, anchorArv, maxOffer, repairMid, divergent: divergence > 0.15 }
  } catch (err) {
    console.error('[comp-validator]', err)
    return null
  }
}
