interface GHLPayload {
  address: string
  phone: string
  condition: string
  sourceUrl?: string
  sourceCity?: string
  utmSource?: string | null
  utmMedium?: string | null
  utmCampaign?: string | null
}

interface GHLResult {
  success: boolean
  contactId?: string
  error?: string
}

export async function sendToGHL(payload: GHLPayload): Promise<GHLResult> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn('GHL_WEBHOOK_URL not set — skipping GHL push')
    return { success: false, error: 'GHL_WEBHOOK_URL not configured' }
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: '',
        lastName: '',
        phone: payload.phone,
        address1: payload.address,
        customField: {
          property_condition: payload.condition,
          source_city: payload.sourceCity ?? '',
          source_url: payload.sourceUrl ?? '',
          utm_source: payload.utmSource ?? '',
          utm_medium: payload.utmMedium ?? '',
          utm_campaign: payload.utmCampaign ?? '',
        },
        source: 'helpfulhomebuyersusa.com',
        tags: ['website-lead', payload.sourceCity ?? 'unknown-city'].filter(Boolean),
      }),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!res.ok) {
      const body = await res.text()
      return { success: false, error: `GHL HTTP ${res.status}: ${body}` }
    }

    const data = await res.json().catch(() => ({}))
    return { success: true, contactId: data?.id ?? data?.contactId }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('GHL webhook failed:', msg)
    return { success: false, error: msg }
  }
}
