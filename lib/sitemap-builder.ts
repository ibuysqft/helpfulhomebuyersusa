const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://helpfulhomebuyersusa.com'

const STATIC_URLS = [
  { loc: `${BASE}/`, priority: '1.0', changefreq: 'weekly' },
  { loc: `${BASE}/about`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE}/contact`, priority: '0.8', changefreq: 'monthly' },
  { loc: `${BASE}/property-information`, priority: '0.9', changefreq: 'monthly' },
  { loc: `${BASE}/blog`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${BASE}/foreclosure-help-virginia`, priority: '0.9', changefreq: 'monthly' },
  { loc: `${BASE}/probate-estate-sale-virginia`, priority: '0.9', changefreq: 'monthly' },
  { loc: `${BASE}/tax-lien-help-virginia`, priority: '0.9', changefreq: 'monthly' },
  { loc: `${BASE}/divorce-home-sale-virginia`, priority: '0.9', changefreq: 'monthly' },
  { loc: `${BASE}/inherited-house-virginia`, priority: '0.9', changefreq: 'monthly' },
  { loc: `${BASE}/fire-damage-house-virginia`, priority: '0.9', changefreq: 'monthly' },
  { loc: `${BASE}/vacant-house-virginia`, priority: '0.9', changefreq: 'monthly' },
  { loc: `${BASE}/behind-on-payments-virginia`, priority: '0.9', changefreq: 'monthly' },
]

export function buildSitemapXml(
  citySlugs: string[],
  situationSlugs: string[],
  blogSlugs: string[],
  situationCityCombos?: Array<{ situationSlug: string; citySlug: string }>
) {
  const now = new Date().toISOString().split('T')[0]

  const cityUrls = citySlugs.map(slug => ({
    loc: `${BASE}/sell-my-house-fast-${slug}-va`,
    lastmod: now, priority: '0.9', changefreq: 'monthly',
  }))

  const situationUrls = situationSlugs.map(slug => ({
    loc: `${BASE}/${slug}`,
    lastmod: now, priority: '0.9', changefreq: 'monthly',
  }))

  const matrixUrls = (situationCityCombos ?? []).map(({ situationSlug, citySlug }) => ({
    loc: `${BASE}/${situationSlug}-${citySlug}-va`,
    lastmod: now, priority: '0.7', changefreq: 'monthly',
  }))

  const blogUrls = blogSlugs.map(slug => ({
    loc: `${BASE}/blog/${slug}`,
    lastmod: now, priority: '0.6', changefreq: 'monthly',
  }))

  const allUrls = [...STATIC_URLS.map(u => ({ ...u, lastmod: now })), ...cityUrls, ...situationUrls, ...matrixUrls, ...blogUrls]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`
}
