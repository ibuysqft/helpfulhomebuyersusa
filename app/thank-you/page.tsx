import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Thank You | We Received Your Request',
  description: 'Thank you for contacting us. We will be in touch within 24 hours with your cash offer.',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-slate-900 min-h-[70vh] flex items-center px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="text-6xl">✅</div>
            <h1 className="text-4xl font-bold">
              Thank You — <span className="text-amber-400">We Got It!</span>
            </h1>
            <p className="text-xl text-slate-300">
              We&apos;ve received your information and will reach out within{' '}
              <strong className="text-white">24 hours</strong> with your cash offer.
            </p>
            <p className="text-slate-400">
              In the meantime, if you have any questions feel free to call or text us directly:
            </p>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xl px-8 py-4 rounded-lg transition-colors"
            >
              {siteConfig.phoneDisplay}
            </a>
            <p className="text-slate-500 text-sm pt-4">
              <Link href="/" className="text-slate-400 hover:text-white underline">
                ← Back to home
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
