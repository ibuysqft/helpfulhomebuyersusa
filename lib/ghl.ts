const GHL_API_URL = 'https://services.leadconnectorhq.com'
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID ?? 'Jy8irfJWPVtq3vycsvx4'

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
  const apiKey = process.env.GHL_API_KEY
  if (!apiKey) {
    console.warn('GHL_API_KEY not set — skipping GHL push')
    return { success: false, error: 'GHL_API_KEY not configured' }
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const res = await fetch(`${GHL_API_URL}/contacts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        Version: '2021-07-28',
      },
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        phone: payload.phone,
        address1: payload.address,
        source: 'helpfulhomebuyersusa.com',
        tags: ['website-lead', payload.sourceCity ?? ''].filter(Boolean),
        customFields: [
          { key: 'property_condition', field_value: payload.condition },
          { key: 'source_city', field_value: payload.sourceCity ?? '' },
          { key: 'source_url', field_value: payload.sourceUrl ?? '' },
          { key: 'utm_source', field_value: payload.utmSource ?? '' },
          { key: 'utm_medium', field_value: payload.utmMedium ?? '' },
          { key: 'utm_campaign', field_value: payload.utmCampaign ?? '' },
        ],
      }),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!res.ok) {
      const body = await res.text()
      return { success: false, error: `GHL HTTP ${res.status}: ${body}` }
    }

    const data = await res.json().catch(() => ({}))
    return { success: true, contactId: data?.contact?.id ?? data?.id }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('GHL API failed:', msg)
    return { success: false, error: msg }
  }
}
