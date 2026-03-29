export interface RankingRow {
  keyword: string
  position: number | null
  impressions: number
  clicks: number
  ctr: number
}

interface GscSearchAnalyticsRow {
  keys: string[]
  position: number
  impressions: number
  clicks: number
  ctr: number
}

interface GscResponse {
  rows?: GscSearchAnalyticsRow[]
}

/**
 * Fetch keyword ranking data from Google Search Console.
 * Uses a service account JWT to authenticate.
 */
export async function fetchGscRankings(keywords: string[]): Promise<RankingRow[]> {
  const clientEmail = process.env.GOOGLE_SC_CLIENT_EMAIL
  const privateKeyRaw = process.env.GOOGLE_SC_PRIVATE_KEY
  const siteUrl = process.env.GOOGLE_SC_SITE ?? 'https://helpfulhomebuyersusa.com'

  if (!clientEmail || !privateKeyRaw) throw new Error('Google Search Console credentials not set')

  // Replace escaped newlines in the PEM key (common in env vars)
  const privateKey = privateKeyRaw.replace(/\\n/g, '\n')

  const token = await getServiceAccountToken(clientEmail, privateKey)

  // GSC allows up to 25,000 rows; filter by dimension = query
  const endDate = new Date().toISOString().slice(0, 10)
  const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 5000,
        dataState: 'all',
      }),
    }
  )

  if (!res.ok) throw new Error(`GSC API error ${res.status}: ${await res.text()}`)

  const data = await res.json() as GscResponse
  const rows: GscSearchAnalyticsRow[] = data.rows ?? []

  // Build a map from query → row
  const byQuery = new Map<string, GscSearchAnalyticsRow>()
  for (const row of rows) {
    byQuery.set(row.keys[0].toLowerCase(), row)
  }

  return keywords.map(keyword => {
    const row = byQuery.get(keyword.toLowerCase())
    return {
      keyword,
      position: row ? Math.round(row.position * 10) / 10 : null,
      impressions: row?.impressions ?? 0,
      clicks: row?.clicks ?? 0,
      ctr: row ? Math.round(row.ctr * 10000) / 100 : 0,
    }
  })
}

// ---------------------------------------------------------------------------
// Service account JWT (no external library needed)
// ---------------------------------------------------------------------------

async function getServiceAccountToken(clientEmail: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const exp = now + 3600

  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const payload = base64url(JSON.stringify({
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp,
  }))

  const signingInput = `${header}.${payload}`

  // Import the RSA private key
  const pemBody = privateKey
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, '')

  const keyDer = Uint8Array.from(atob(pemBody), c => c.charCodeAt(0))

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    keyDer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signatureBytes = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(signingInput)
  )

  const signature = base64url(signatureBytes)
  const jwt = `${signingInput}.${signature}`

  // Exchange JWT for access token
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })

  if (!tokenRes.ok) throw new Error(`GSC token exchange failed: ${await tokenRes.text()}`)
  const { access_token } = await tokenRes.json() as { access_token: string }
  return access_token
}

function base64url(input: string | ArrayBuffer): string {
  let bytes: Uint8Array
  if (typeof input === 'string') {
    bytes = new TextEncoder().encode(input)
  } else {
    bytes = new Uint8Array(input)
  }
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}
