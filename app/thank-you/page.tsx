import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Thank You | We Received Your Request',
  description: 'Thank you for contacting us. We will be in touch within 24 hours with your cash offer.',
  robots: { index: false, follow: false },
}

const steps = [
  {
    number: '1',
    title: 'We review your property',
    timeframe: 'Within 1 hour',
  },
  {
    number: '2',
    title: 'We prepare your cash offer',
    timeframe: 'Within 24 hours',
  },
  {
    number: '3',
    title: 'We present your offer',
    timeframe: 'On your schedule',
  },
]

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="bg-slate-900 min-h-[80vh] flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-xl w-full mx-auto text-center space-y-8">

          {/* Checkmark */}
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="w-20 h-20"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="11" fill="#16a34a" />
              <path
                d="M7 12.5l3.5 3.5 6.5-7"
                stroke="#ffffff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              We Got It!{' '}
              <span className="text-amber-400">Your Offer is Being Prepared</span>
            </h1>
            <p className="text-lg text-slate-300">
              You&apos;ll hear from us within{' '}
              <strong className="text-white">24 hours</strong>.
              Want to talk sooner?
            </p>
          </div>

          {/* Primary CTA */}
          <div className="space-y-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-900 font-bold text-xl px-8 py-4 rounded-lg transition-colors w-full sm:w-auto justify-center"
            >
              <Phone size={20} aria-hidden={true} />
              Call Now for Faster Service
            </a>
            <p className="text-2xl font-semibold text-amber-400 tracking-wide">
              {siteConfig.phoneDisplay}
            </p>
          </div>

          {/* What Happens Next */}
          <div className="pt-4">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-6">
              What Happens Next
            </h2>
            <ol className="flex flex-col sm:flex-row gap-0 sm:gap-0 relative">
              {steps.map((step, idx) => (
                <li
                  key={step.number}
                  className="flex-1 flex flex-col items-center relative group"
                >
                  {/* Connector line — horizontal on desktop */}
                  {idx < steps.length - 1 && (
                    <>
                      {/* Desktop horizontal line */}
                      <span
                        className="hidden sm:block absolute top-5 left-1/2 w-full h-px bg-slate-700 z-0"
                        aria-hidden="true"
                      />
                      {/* Mobile vertical line */}
                      <span
                        className="block sm:hidden w-px h-8 bg-slate-700 mt-2 mb-0"
                        aria-hidden="true"
                      />
                    </>
                  )}

                  <div className="flex flex-col items-center text-center px-3 z-10 pb-6 sm:pb-0">
                    <span className="w-10 h-10 rounded-full bg-amber-500 text-slate-900 font-bold text-lg flex items-center justify-center mb-3 shrink-0">
                      {step.number}
                    </span>
                    <p className="text-white font-semibold text-sm leading-snug mb-1">
                      {step.title}
                    </p>
                    <p className="text-slate-400 text-xs">{step.timeframe}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Trust row */}
          <div className="pt-2 border-t border-slate-800">
            <p className="text-slate-400 text-sm">
              No obligation&nbsp;&nbsp;·&nbsp;&nbsp;No repairs needed&nbsp;&nbsp;·&nbsp;&nbsp;We pay closing costs
            </p>
          </div>

          {/* Back link */}
          <p className="text-slate-600 text-sm">
            <Link href="/" className="text-slate-500 hover:text-slate-300 underline transition-colors">
              ← Back to home
            </Link>
          </p>

        </div>
      </main>
      <Footer />
    </>
  )
}
