import { NextRequest, NextResponse } from 'next/server'
import { scorePropertyDistress, distressScoreToCondition } from '@/lib/photo-scorer'
import { validateAndCalcOffer } from '@/lib/comp-validator'
import { createClient } from '@supabase/supabase-js'

export const maxDuration = 300

export async function POST(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_IS_NATIONAL) {
    return new Response(null, { status: 204 })
  }

  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: leads, error } = await sb
    .from('mls_leads')
    .select('*')
    .eq('status', 'new')
    .not('agent_email', 'is', null)
    .not('dealsauce_wholesale', 'is', null)
    .limit(20)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!leads?.length) return NextResponse.json({ message: 'No new leads' })

  const results = { queued: 0, scored: 0, retail: 0, disqualified: 0, errors: 0 }

  for (const lead of leads) {
    try {
      const photoResult = await scorePropertyDistress(lead.address)
      if (!photoResult) {
        await sb.from('mls_leads').update({ status: 'disqualified' }).eq('id', lead.id)
        results.disqualified++
        continue
      }

      const { distressScore, signals, repairEstimateLow, repairEstimateHigh, photoCount } = photoResult

      if (distressScore < 4) {
        await sb.from('mls_leads').update({
          distress_score: distressScore,
          distress_signals: signals,
          photo_count: photoCount,
          repair_estimate_low: repairEstimateLow,
          repair_estimate_high: repairEstimateHigh,
          status: 'retail',
        }).eq('id', lead.id)
        results.retail++
        continue
      }

      const comp = await validateAndCalcOffer({
        address: lead.address,
        sqft: lead.sqft ?? 1200,
        condition: distressScoreToCondition(distressScore),
        dealSauceWholesale: lead.dealsauce_wholesale!,
        repairEstimateLow,
        repairEstimateHigh,
      })

      const nextStatus = distressScore >= 6 ? 'queued' : 'scored'
      const signalsWithFlags = comp?.divergent
        ? { ...signals, _comp_divergent: true, _comp_arv: comp.compArv, _ds_arv: comp.dealSauceArv }
        : signals

      await sb.from('mls_leads').update({
        distress_score: distressScore,
        distress_signals: signalsWithFlags,
        photo_count: photoCount,
        repair_estimate_low: repairEstimateLow,
        repair_estimate_high: repairEstimateHigh,
        comp_arv: comp?.compArv ?? null,
        max_offer: comp?.maxOffer ?? null,
        status: nextStatus,
        offer_strategy: 'cash',
      }).eq('id', lead.id)

      nextStatus === 'queued' ? results.queued++ : results.scored++
    } catch (err) {
      console.error(`[mls-score] lead ${lead.id}:`, err)
      results.errors++
    }
  }

  return NextResponse.json(results)
}
