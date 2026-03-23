import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { InstantOfferEstimator } from '@/components/instant-offer-estimator'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: `Instant Cash Offer Estimator | ${siteConfig.name}`,
  description: `Get an instant cash offer estimate for your ${siteConfig.stateName} home. Enter your address and see your offer range in under 60 seconds. No obligation, no repairs, no agent fees.`,
  alternates: { canonical: `${siteConfig.url}/instant-offer` },
  openGraph: {
    title: `Instant Cash Offer Estimator | ${siteConfig.name}`,
    description: `See your cash offer range in 60 seconds. We buy houses in ${siteConfig.stateName} — any condition, any situation.`,
    url: `${siteConfig.url}/instant-offer`,
    type: 'website',
  },
}

export default function InstantOfferPage() {
  return (
    <>
      <Header />
      <main
        className="min-h-[80vh] py-16 px-4"
        style={{ background: 'linear-gradient(135deg, #0F1E3C 0%, #1a2a4a 60%, #0F1E3C 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <InstantOfferEstimator />
        </div>
      </main>
      <Footer />

      {/* CSS animations for loading spinner + step fade-in */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes stepFadeIn {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  )
}
