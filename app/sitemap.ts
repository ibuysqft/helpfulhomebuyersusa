import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import { getStateConfig, registeredStates } from '@/lib/state-context'
import { getCitiesForState } from '@/lib/state-data'
import { getSituations } from '@/data/situations'
import { situationCityMatrix } from '@/data/situation-city-matrix'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url
  const stateConfig = getStateConfig()
  const stateAbbr = stateConfig.abbr.toLowerCase()
  const cities = getCitiesForState(stateConfig.slug)
  const situations = getSituations(stateConfig.slug)

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/instant-offer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${base}/property-information`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/net-proceeds-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/quiz`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/whats-my-house-worth`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/referral-partners`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/newsletter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/reviews`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/sell-my-house-fast-vs-listing-with-agent`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/as-is-home-buyers-virginia`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ]

  const cityPages: MetadataRoute.Sitemap = cities.map(city => ({
    url: `${base}/sell-my-house-fast-${city.slug}-${stateAbbr}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const situationPages: MetadataRoute.Sitemap = situations.map(s => ({
    url: `${base}/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const matrixPages: MetadataRoute.Sitemap = situationCityMatrix.map(entry => ({
    url: `${base}/${entry.situationSlug}-${entry.citySlug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('slug, published_at')
    .eq('status', 'published')

  const blogPages: MetadataRoute.Sitemap = (blogPosts ?? []).map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.published_at ? new Date(post.published_at) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('slug, created_at')
    .eq('published', true)

  const caseStudyPages: MetadataRoute.Sitemap = [
    { url: `${base}/case-studies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...(caseStudies ?? []).map(cs => ({
      url: `${base}/case-studies/${cs.slug}`,
      lastModified: cs.created_at ? new Date(cs.created_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  const hubPages: MetadataRoute.Sitemap = [
    { url: `${base}/probate`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/curative-title`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/surplus-funds`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ]

  const stateSituationKeys = ['probate', 'title-issues', 'surplus-funds'] as const
  const stateSituationPages: MetadataRoute.Sitemap = stateSituationKeys.flatMap(key =>
    registeredStates.map(state => ({
      url: `${base}/${key}-${state.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  const TOP_SITUATIONS_FOR_SITEMAP = [
    'foreclosure', 'inherited', 'divorce', 'probate', 'behind-payments',
    'tax-lien', 'fire-damage', 'vacant', 'tired-landlord', 'code-violations',
    'senior-transition', 'pre-foreclosure', 'hoarder-house', 'out-of-state-landlord',
    'reverse-mortgage', 'job-relocation', 'military-pcs', 'irs-lien',
    'bankruptcy', 'medical-bills',
  ]

  const programmaticHubPages: MetadataRoute.Sitemap = registeredStates.flatMap(state =>
    TOP_SITUATIONS_FOR_SITEMAP.map(situation => ({
      url: `${base}/${state.slug}/${situation}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  )

  const programmaticCityPages: MetadataRoute.Sitemap = registeredStates.flatMap(state => {
    const stateCities = getCitiesForState(state.slug).slice(0, 20)
    return TOP_SITUATIONS_FOR_SITEMAP.flatMap(situation =>
      stateCities.map(city => ({
        url: `${base}/${state.slug}/${situation}/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    )
  })

  return [...staticPages, ...cityPages, ...situationPages, ...matrixPages, ...blogPages, ...caseStudyPages, ...hubPages, ...stateSituationPages, ...programmaticHubPages, ...programmaticCityPages]
}
