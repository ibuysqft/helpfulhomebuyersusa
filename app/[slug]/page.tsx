import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { LeadForm } from '@/components/lead-form'
import { FaqSection } from '@/components/faq-section'
import { TrustBar } from '@/components/trust-bar'
import { HowItWorks } from '@/components/how-it-works'
import { siteConfig } from '@/config/site'
import { situations } from '@/data/situations'
import { cities } from '@/data/cities'
import { homepageFaqs } from '@/data/faqs'
import { situationCityMatrix } from '@/data/situation-city-matrix'

interface Props { params: Promise<{ slug: string }> }

function getSituationBySlug(slug: string) {
  return situations.find(s => s.slug === slug)
}

function getMatrixEntry(slug: string) {
  return situationCityMatrix.find(
    entry => `${entry.situationSlug}-${entry.citySlug}` === slug
  )
}

export async function generateStaticParams() {
  const situationParams = situations.map(s => ({ slug: s.slug }))
  const matrixParams = situationCityMatrix.map(entry => ({
    slug: `${entry.situationSlug}-${entry.citySlug}`,
  }))
  return [...situationParams, ...matrixParams]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const situation = getSituationBySlug(slug)
  if (situation) {
    return {
      title: `${situation.label} | Cash Home Buyers Virginia`,
      description: `${situation.description} We buy houses for cash in Virginia — any condition, close in 7 days.`,
      alternates: { canonical: `${siteConfig.url}/${slug}` },
    }
  }
  const entry = getMatrixEntry(slug)
  if (entry) {
    return {
      title: `${entry.situationLabel} in ${entry.cityName}, VA | Cash Offer`,
      description: `We help homeowners in ${entry.cityName}, ${entry.county} who are ${entry.situationLabel.toLowerCase()}. Cash offer in 24 hours. Close in 7 days.`,
      alternates: { canonical: `${siteConfig.url}/${slug}` },
    }
  }
  return {}
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params

  // Situation-only page
  const situation = getSituationBySlug(slug)
  if (situation) {
    const relatedCities = cities.slice(0, 10)
    const localSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      telephone: siteConfig.phone,
      url: siteConfig.url,
      areaServed: 'Virginia',
    }
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
        <Header />
        <main>
          <section className="bg-slate-900 py-20 px-4">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="text-5xl">{situation.icon}</div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {situation.label} <span className="text-amber-400">We Can Help</span>
                </h1>
                <p className="text-xl text-slate-300">{situation.description}</p>
                <ul className="space-y-2 text-slate-300">
                  {[
                    'Cash offer within 24 hours',
                    'Close in 7 days or on your schedule',
                    'Buy as-is — no repairs required',
                    'We pay all closing costs',
                    'No agents, no commissions',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-amber-400 font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-block bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Call {siteConfig.phoneDisplay}
                </a>
              </div>
              <LeadForm />
            </div>
          </section>

          <TrustBar />
          <HowItWorks />
          <FaqSection faqs={homepageFaqs} title="Frequently Asked Questions" />

          {/* Related city links */}
          <section className="py-12 px-4 bg-slate-900">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-white mb-6 text-center">
                We Serve All of Virginia
              </h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {relatedCities.map(city => (
                  <Link
                    key={city.slug}
                    href={`/${situation.slug}-${city.slug}`}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    {city.name}, VA →
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 px-4 bg-amber-500 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Get Your Cash Offer Today
            </h2>
            <p className="text-slate-800 mb-6">No obligation. Response within 24 hours.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/property-information"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-lg transition-colors"
              >
                Get My Cash Offer
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-8 py-4 rounded-lg transition-colors"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  // Situation × City matrix page
  const entry = getMatrixEntry(slug)
  if (entry) {
    const city = cities.find(c => c.slug === entry.citySlug)
    const situation2 = situations.find(s => s.slug === entry.situationSlug)
    if (!city || !situation2) notFound()

    const localSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      telephone: siteConfig.phone,
      url: siteConfig.url,
      areaServed: [city.name, city.county],
    }

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
        <Header />
        <main>
          <section className="bg-slate-900 py-20 px-4">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="text-5xl">{situation2.icon}</div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {situation2.label} in{' '}
                  <span className="text-amber-400">{city.name}, VA</span>
                </h1>
                <p className="text-xl text-slate-300">
                  We buy houses for cash in {city.name}, {city.county} —{' '}
                  {situation2.description.toLowerCase()}
                </p>
                <ul className="space-y-2 text-slate-300">
                  {[
                    `Serving all of ${city.county}`,
                    'Cash offer within 24 hours',
                    'Close in 7 days or on your schedule',
                    'Buy as-is — no repairs required',
                    'We pay all closing costs',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-amber-400 font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-block bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Call {siteConfig.phoneDisplay}
                </a>
              </div>
              <LeadForm city={city.name} />
            </div>
          </section>

          <TrustBar />
          <HowItWorks />
          <FaqSection faqs={homepageFaqs} title={`FAQ: ${situation2.label} in ${city.name}`} />

          <section className="py-16 px-4 bg-amber-500 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Get Your {city.name} Cash Offer Today
            </h2>
            <p className="text-slate-800 mb-6">No obligation. Response within 24 hours.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/property-information"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-lg transition-colors"
              >
                Get My Cash Offer
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-8 py-4 rounded-lg transition-colors"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  notFound()
}
