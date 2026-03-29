'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CheckCircle, XCircle, Phone } from 'lucide-react'
import { siteConfig } from '@/config/site'

const GOOD_FIT = [
  'Your home needs repairs or is in poor condition',
  'You\'re behind on payments or facing foreclosure',
  'You inherited a property you need to sell',
  'You\'re going through a divorce and need a fast sale',
  'You need to close in under 30 days',
  'You want to avoid agent fees and open houses',
]

const BAD_FIT = [
  'You want full retail market value',
  'Your home is in perfect condition and you have time to list',
  'You have a mobile home or manufactured home',
]

export default function CashOfferPage() {
  const router = useRouter()
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')

  function handleStart(e: React.FormEvent) {
    e.preventDefault()
    if (!address.trim()) {
      setError('Please enter the property address.')
      return
    }
    const encoded = encodeURIComponent(address.trim())
    router.push(`/property-information?address=${encoded}`)
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white">

      {/* Minimal header — no nav links */}
      <header className="border-b border-white/[0.06] px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-bold text-lg text-white">Helpful Home Buyers USA</span>
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-2 text-amber-400 font-semibold text-sm hover:text-amber-300 transition-colors"
          >
            <Phone size={15} aria-hidden />
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full mb-5 uppercase tracking-wide">
            Cash Offer in 24 Hours
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            We Buy Houses That<br className="hidden sm:block" /> Need Work — Fast
          </h1>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            Foreclosure, probate, inherited, major repairs, divorce, code violations — if your house needs work
            or you need a fast close, we&apos;re your buyer. No agents. No fees. Close in as little as 7 days.
          </p>

          {/* Address entry */}
          <form onSubmit={handleStart} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="text"
              value={address}
              onChange={e => { setAddress(e.target.value); setError('') }}
              placeholder="Enter property address"
              aria-label="Property address"
              className="flex-1 bg-slate-800 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 focus:outline-none focus:border-amber-500 transition-colors"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3.5 rounded-xl transition-colors whitespace-nowrap"
            >
              Get My Offer →
            </button>
          </form>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          <p className="text-slate-500 text-sm mt-3">No obligation. No fees. We&apos;ll call within 24 hours.</p>
        </div>
      </section>

      {/* Pre-qualify block */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto bg-slate-800 border border-white/[0.06] rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Is Your Home a Good Fit?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                <CheckCircle size={16} aria-hidden /> We&apos;re the right buyer if…
              </h3>
              <ul className="space-y-2.5">
                {GOOD_FIT.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-slate-300 text-sm">
                    <CheckCircle size={15} className="text-green-400 shrink-0 mt-0.5" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-slate-400 font-semibold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                <XCircle size={16} aria-hidden /> We&apos;re NOT the right fit if…
              </h3>
              <ul className="space-y-2.5">
                {BAD_FIT.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-slate-400 text-sm">
                    <XCircle size={15} className="text-red-400 shrink-0 mt-0.5" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA repeat */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
            <p className="text-slate-300 mb-4 text-sm">Ready to get started? Enter your address above or call us now.</p>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <Phone size={16} aria-hidden />
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { stat: '7 days', label: 'Minimum close time' },
            { stat: '$0', label: 'Fees or commissions' },
            { stat: 'Any condition', label: 'No repairs needed' },
          ].map(({ stat, label }) => (
            <div key={stat}>
              <div className="text-2xl font-extrabold text-amber-400">{stat}</div>
              <div className="text-slate-400 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer — minimal */}
      <footer className="border-t border-white/[0.06] px-4 py-6 text-center">
        <p className="text-slate-500 text-xs">
          &copy; {new Date().getFullYear()} Helpful Home Buyers USA &mdash;{' '}
          <Link href="/privacy-policy" className="underline hover:text-slate-300">Privacy Policy</Link>
          {' '}&mdash;{' '}
          <Link href="/terms-of-service" className="underline hover:text-slate-300">Terms</Link>
        </p>
        <p className="text-slate-600 text-xs mt-2 max-w-lg mx-auto">
          We pay cash but below retail market value. If you want full retail price, listing with an agent may serve you better.
          By submitting, you consent to receive calls and SMS (including automated messages) at the number provided. Msg &amp; data rates may apply. Reply STOP to opt out.
        </p>
      </footer>
    </main>
  )
}
