'use client'
import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { siteConfig } from '@/config/site'

const STATE_NAME = process.env.NEXT_PUBLIC_STATE ?? 'Virginia'
const IS_NATIONAL = process.env.NEXT_PUBLIC_IS_NATIONAL === 'true'

const steps = [
  {
    number: '1',
    title: 'Submit a lead',
    desc: "Fill out the form below with the seller's contact info and situation.",
  },
  {
    number: '2',
    title: 'We close the deal',
    desc: 'Our team contacts the seller, makes an offer, and handles everything through closing.',
  },
  {
    number: '3',
    title: 'You get paid',
    desc: 'Receive $2,500–$5,000 by wire transfer within 5 business days of closing.',
  },
]

const whoShouldRefer = [
  { icon: '🏡', label: 'Real Estate Agents' },
  { icon: '⚖️', label: 'Attorneys & Paralegals' },
  { icon: '📋', label: 'Wholesalers' },
  { icon: '💼', label: 'Financial Advisors' },
  { icon: '🏦', label: 'Mortgage Brokers' },
  { icon: '👨‍👩‍👧', label: 'Family & Friends' },
]

export default function ReferralPartnersPage() {
  const [form, setForm] = useState({
    referrer_name: '',
    referrer_email: '',
    referrer_phone: '',
    seller_name: '',
    seller_address: '',
    seller_phone: '',
    situation: '',
    notes: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/referral-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <>
      <Header />
      <main className="bg-slate-900 text-white">

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Referral Partner Program</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            Refer a Seller,<br />
            <span className="text-amber-400">Earn $2,500–$5,000</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Know someone who needs to sell their {IS_NATIONAL ? 'home' : `${STATE_NAME} home`} fast? Send them our way — and get paid at closing. No license required. No paperwork. Just a referral.
          </p>
        </section>

        {/* Who Should Refer */}
        <section className="bg-slate-800/50 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-center text-xl font-semibold text-white mb-8">Who Refers to Us</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {whoShouldRefer.map(item => (
                <div key={item.label} className="flex items-center gap-3 bg-slate-800 rounded-lg px-4 py-3">
                  <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                  <span className="text-slate-200 font-medium text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto px-4 py-14">
          <h2 className="text-center text-xl font-semibold text-white mb-10">How It Works</h2>
          <ol className="flex flex-col sm:flex-row gap-6 sm:gap-0">
            {steps.map((step, idx) => (
              <li key={step.number} className="flex-1 flex flex-col items-center text-center relative">
                {idx < steps.length - 1 && (
                  <span
                    className="hidden sm:block absolute top-5 left-1/2 w-full h-px bg-slate-700 z-0"
                    aria-hidden="true"
                  />
                )}
                <span className="w-10 h-10 rounded-full bg-amber-500 text-slate-900 font-bold text-lg flex items-center justify-center mb-3 z-10 shrink-0">
                  {step.number}
                </span>
                <p className="text-white font-semibold mb-1">{step.title}</p>
                <p className="text-slate-400 text-sm max-w-[180px]">{step.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Requirements */}
        <section className="bg-slate-800/50 py-10">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-xl font-semibold text-white mb-4">Requirements</h2>
            <ul className="text-slate-300 space-y-2 text-sm">
              <li>Seller must be motivated to sell (not just testing the market)</li>
              <li>Property must be located in {IS_NATIONAL ? 'one of our service areas' : STATE_NAME}</li>
              <li>Referral must be submitted <em>before</em> we make contact with the seller</li>
              <li>Payment issued by wire transfer within 5 business days of closing</li>
            </ul>
          </div>
        </section>

        {/* Submission Form */}
        <section className="max-w-2xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-2">Submit a Referral</h2>
          <p className="text-slate-400 text-center text-sm mb-8">
            Questions? Call us at{' '}
            <a href={`tel:${siteConfig.phone}`} className="text-amber-400 hover:underline">
              {siteConfig.phoneDisplay}
            </a>
          </p>

          {status === 'success' ? (
            <div className="bg-green-900/40 border border-green-700 rounded-xl px-6 py-8 text-center">
              <div className="text-4xl mb-3" aria-hidden="true">✓</div>
              <h3 className="text-white font-bold text-xl mb-2">Referral Submitted!</h3>
              <p className="text-slate-300 text-sm">
                We&apos;ll reach out to the seller and keep you posted. You&apos;ll receive a confirmation email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Referrer info */}
              <fieldset>
                <legend className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-4">Your Information</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="referrer_name" className="block text-sm text-slate-300 mb-1">Your Name <span className="text-red-400">*</span></label>
                    <input
                      id="referrer_name"
                      name="referrer_name"
                      type="text"
                      required
                      value={form.referrer_name}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="referrer_email" className="block text-sm text-slate-300 mb-1">Your Email <span className="text-red-400">*</span></label>
                    <input
                      id="referrer_email"
                      name="referrer_email"
                      type="email"
                      required
                      value={form.referrer_email}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="referrer_phone" className="block text-sm text-slate-300 mb-1">Your Phone</label>
                    <input
                      id="referrer_phone"
                      name="referrer_phone"
                      type="tel"
                      value={form.referrer_phone}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="(703) 555-1234"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Seller info */}
              <fieldset>
                <legend className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-4">Seller Information</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="seller_name" className="block text-sm text-slate-300 mb-1">Seller Name</label>
                    <input
                      id="seller_name"
                      name="seller_name"
                      type="text"
                      value={form.seller_name}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="seller_phone" className="block text-sm text-slate-300 mb-1">Seller Phone <span className="text-red-400">*</span></label>
                    <input
                      id="seller_phone"
                      name="seller_phone"
                      type="tel"
                      required
                      value={form.seller_phone}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="(571) 555-9876"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="seller_address" className="block text-sm text-slate-300 mb-1">Property Address <span className="text-red-400">*</span></label>
                    <input
                      id="seller_address"
                      name="seller_address"
                      type="text"
                      required
                      value={form.seller_address}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="123 Main St, City, State 00000"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="situation" className="block text-sm text-slate-300 mb-1">Seller Situation</label>
                    <select
                      id="situation"
                      name="situation"
                      value={form.situation}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select a situation…</option>
                      <option value="foreclosure">Foreclosure / Pre-foreclosure</option>
                      <option value="probate">Probate / Inherited property</option>
                      <option value="divorce">Divorce</option>
                      <option value="relocation">Relocation</option>
                      <option value="behind-on-payments">Behind on payments</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="notes" className="block text-sm text-slate-300 mb-1">Additional Notes</label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={form.notes}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                      placeholder="Anything else we should know…"
                    />
                  </div>
                </div>
              </fieldset>

              {errorMsg && (
                <p className="text-red-400 text-sm text-center">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 disabled:opacity-60 text-slate-900 font-bold text-lg px-8 py-4 rounded-lg transition-colors min-h-[56px]"
              >
                {status === 'submitting' ? 'Submitting…' : 'Submit Referral'}
              </button>

              <p className="text-xs text-slate-500 text-center">
                By submitting you confirm you have the seller&apos;s permission to share their contact information.
              </p>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
