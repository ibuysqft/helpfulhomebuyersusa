import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import { getStateConfig } from '@/lib/state-context'
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
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${base}/property-information`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
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

  return [...staticPages, ...cityPages, ...situationPages, ...matrixPages, ...blogPages]
}
