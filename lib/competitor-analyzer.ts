export interface CompetitorPage {
  url: string
  rankPosition: number
  wordCount: number
  headings: string[]
  faqQuestions: string[]
  schemaTypes: string[]
}

export interface CompetitorContext {
  topCompetitorWordCount: number
  targetWordCount: number
  missingTopics: string[]
  missingFaqs: string[]
}

const SCRAPERAPI_KEY = process.env.SCRAPERAPI_KEY

/**
 * Fetch top 5 organic Google results for a keyword via ScraperAPI.
 */
export async function fetchSerpResults(keyword: string): Promise<Array<{ url: string; position: number }>> {
  if (!SCRAPERAPI_KEY) throw new Error('SCRAPERAPI_KEY not set')

  const encoded = encodeURIComponent(keyword)
  const url = `https://api.scraperapi.com/?api_key=${SCRAPERAPI_KEY}&url=https://www.google.com/search?q=${encoded}&num=10&render=false&country_code=us`

  const res = await fetch(url, { signal: AbortSignal.timeout(30_000) })
  if (!res.ok) throw new Error(`ScraperAPI SERP fetch failed: ${res.status}`)

  const html = await res.text()

  // Extract organic result URLs from Google HTML
  const results: Array<{ url: string; position: number }> = []
  const hrefRegex = /<a[^>]+href="(https?:\/\/[^"&]+)"/g
  let match
  const seen = new Set<string>()
  const skipDomains = ['google.com', 'youtube.com', 'facebook.com', 'twitter.com', 'instagram.com', 'yelp.com', 'wikipedia.org']

  while ((match = hrefRegex.exec(html)) !== null && results.length < 5) {
    const href = match[1]
    try {
      const parsed = new URL(href)
      const domain = parsed.hostname.replace('www.', '')
      if (skipDomains.some(d => domain.includes(d))) continue
      if (seen.has(domain)) continue
      seen.add(domain)
      results.push({ url: href, position: results.length + 1 })
    } catch {
      // skip malformed URLs
    }
  }

  return results
}

/**
 * Scrape a competitor page and extract SEO-relevant content signals.
 */
export async function scrapeCompetitorPage(url: string): Promise<Omit<CompetitorPage, 'rankPosition'>> {
  if (!SCRAPERAPI_KEY) throw new Error('SCRAPERAPI_KEY not set')

  const scraperUrl = `https://api.scraperapi.com/?api_key=${SCRAPERAPI_KEY}&url=${encodeURIComponent(url)}&render=false`
  const res = await fetch(scraperUrl, { signal: AbortSignal.timeout(30_000) })

  if (!res.ok) {
    return { url, wordCount: 0, headings: [], faqQuestions: [], schemaTypes: [] }
  }

  const html = await res.text()

  // Strip scripts/styles/nav/footer before analysis
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')

  // Word count from visible text
  const text = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const wordCount = text.split(' ').filter(w => w.length > 2).length

  // Extract H2 and H3 headings
  const headings: string[] = []
  const headingRegex = /<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi
  let hMatch
  while ((hMatch = headingRegex.exec(body)) !== null) {
    const clean = hMatch[1].replace(/<[^>]+>/g, '').trim()
    if (clean.length > 5 && clean.length < 120) headings.push(clean)
  }

  // Extract FAQ questions (look for common FAQ patterns)
  const faqQuestions: string[] = []
  const faqRegex = /<(?:dt|[^>]+class="[^"]*(?:faq|question|accordion)[^"]*")[^>]*>([\s\S]*?)<\/(?:dt|[^>]+)>/gi
  let fMatch
  while ((fMatch = faqRegex.exec(body)) !== null) {
    const clean = fMatch[1].replace(/<[^>]+>/g, '').trim()
    if (clean.endsWith('?') && clean.length > 10 && clean.length < 150) {
      faqQuestions.push(clean)
    }
  }
  // Also pick up any sentence that ends with ? in H3s (common FAQ pattern)
  for (const h of headings) {
    if (h.endsWith('?') && !faqQuestions.includes(h)) faqQuestions.push(h)
  }

  // Extract JSON-LD schema types
  const schemaTypes: string[] = []
  const schemaRegex = /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi
  let sMatch
  while ((sMatch = schemaRegex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(sMatch[1])
      const types = Array.isArray(parsed) ? parsed.map((p: { '@type'?: string }) => p['@type']).filter(Boolean) : [parsed['@type']].filter(Boolean)
      schemaTypes.push(...types)
    } catch {
      // skip invalid JSON
    }
  }

  return { url, wordCount, headings, faqQuestions, schemaTypes: [...new Set(schemaTypes)] }
}

/**
 * Analyze competitor snapshots to identify content gaps vs our existing coverage.
 */
export function analyzeGaps(
  ourHeadings: string[],
  ourFaqs: string[],
  competitors: CompetitorPage[]
): CompetitorContext {
  const topWordCount = Math.max(...competitors.map(c => c.wordCount), 800)
  const targetWordCount = Math.max(Math.round(topWordCount * 1.2), 1500)

  const ourTopicsLower = new Set(ourHeadings.map(h => h.toLowerCase()))
  const ourFaqsLower = new Set(ourFaqs.map(f => f.toLowerCase()))

  const allCompetitorTopics = competitors.flatMap(c => c.headings)
  const allCompetitorFaqs = competitors.flatMap(c => c.faqQuestions)

  // Topics that appear in 2+ competitors but not in our content
  const topicFreq = new Map<string, number>()
  for (const topic of allCompetitorTopics) {
    const key = topic.toLowerCase()
    if (!ourTopicsLower.has(key)) {
      topicFreq.set(key, (topicFreq.get(key) ?? 0) + 1)
    }
  }
  const missingTopics = [...topicFreq.entries()]
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([topic]) => topic)

  // FAQ questions missing from our content
  const faqFreq = new Map<string, number>()
  for (const faq of allCompetitorFaqs) {
    const key = faq.toLowerCase()
    if (!ourFaqsLower.has(key)) {
      faqFreq.set(faq, (faqFreq.get(faq) ?? 0) + 1)
    }
  }
  const missingFaqs = [...faqFreq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([faq]) => faq)

  return { topCompetitorWordCount: topWordCount, targetWordCount, missingTopics, missingFaqs }
}
