// lib/ghl-on-market.ts

const GHL_API_URL = 'https://services.leadconnectorhq.com'

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.GHL_OM_API_KEY ?? ''}`,
  Version: '2021-07-28',
})

export async function createOnMarketContact(params: {
  agentName: string
  agentEmail: string
  agentPhone: string
  address: string
  tags?: string[]
}): Promise<{ success: boolean; contactId?: string; error?: string }> {
  const locationId = process.env.GHL_OM_LOCATION_ID
  if (!process.env.GHL_OM_API_KEY || !locationId) {
    return { success: false, error: 'GHL_OM credentials not configured' }
  }
  const [firstName, ...rest] = params.agentName.trim().split(/\s+/)
  try {
    const res = await fetch(`${GHL_API_URL}/contacts/`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        locationId,
        firstName: firstName ?? 'Agent',
        lastName: rest.join(' '),
        email: params.agentEmail,
        phone: params.agentPhone,
        tags: params.tags ?? ['mls-outreach'],
        customFields: [{ key: 'property_address', field_value: params.address }],
        source: 'hhb-on-market-pipeline',
      }),
    })
    if (!res.ok) return { success: false, error: `GHL ${res.status}: ${await res.text()}` }
    const data = await res.json().catch(() => ({}))
    return { success: true, contactId: data?.contact?.id ?? data?.id }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}

export async function enrollInSequence(
  contactId: string,
  workflowId: string
): Promise<{ success: boolean; error?: string }> {
  if (!process.env.GHL_OM_API_KEY) return { success: false, error: 'GHL_OM_API_KEY not set' }
  try {
    const res = await fetch(`${GHL_API_URL}/contacts/${contactId}/workflow/${workflowId}`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ eventStartTime: new Date().toISOString() }),
    })
    if (!res.ok) return { success: false, error: `GHL ${res.status}: ${await res.text()}` }
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}

export async function sendSmsNotification(
  toPhone: string,
  message: string
): Promise<{ success: boolean; error?: string }> {
  const locationId = process.env.GHL_OM_LOCATION_ID
  if (!process.env.GHL_OM_API_KEY || !locationId) return { success: false, error: 'GHL_OM not configured' }
  try {
    const res = await fetch(`${GHL_API_URL}/conversations/messages`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ type: 'SMS', phone: toPhone, message, locationId }),
    })
    if (!res.ok) return { success: false, error: `GHL ${res.status}` }
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}
