'use client'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'

const situationLinks = [
  { href: '/foreclosure-help-virginia', label: 'Facing Foreclosure' },
  { href: '/probate-help-virginia', label: 'Probate / Estate Sale' },
  { href: '/tax-lien-help-virginia', label: 'Behind on Property Taxes' },
  { href: '/divorce-help-virginia', label: 'Going Through Divorce' },
  { href: '/inherited-help-virginia', label: 'Inherited a House' },
  { href: '/fire-damage-help-virginia', label: 'Fire or Water Damage' },
  { href: '/tired-landlord-help-virginia', label: 'Tired Landlord' },
  { href: '/behind-payments-help-virginia', label: 'Behind on Payments' },
]

const areaLinks = [
  { href: '/sell-my-house-fast-richmond-va', label: 'Richmond' },
  { href: '/sell-my-house-fast-norfolk-va', label: 'Norfolk' },
  { href: '/sell-my-house-fast-virginia-beach-va', label: 'Virginia Beach' },
  { href: '/sell-my-house-fast-chesapeake-va', label: 'Chesapeake' },
  { href: '/sell-my-house-fast-arlington-va', label: 'Arlington' },
  { href: '/sell-my-house-fast-alexandria-va', label: 'Alexandria' },
  { href: '/sell-my-house-fast-roanoke-va', label: 'Roanoke' },
  { href: '/sell-my-house-fast-newport-news-va', label: 'Newport News' },
  { href: '/states', label: 'View All States →' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [situationsOpen, setSituationsOpen] = useState(false)
  const [areasOpen, setAreasOpen] = useState(false)
  const { locale, setLocale, t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo + trust badge */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/"
            className="text-xl font-semibold shrink-0"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
          >
            Helpful Homebuyers USA
          </Link>
          <span
            className="hidden sm:inline-block text-xs px-2 py-0.5 rounded-full border border-slate-200 whitespace-nowrap"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
          >
            4.9&#9733; 200+ Reviews
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
          <Link href="/about" className="text-slate-600 hover:text-blue-600 transition-colors">{t('nav_about')}</Link>
          <Link href="/#how-it-works" className="text-slate-600 hover:text-blue-600 transition-colors">{t('nav_how_it_works')}</Link>

          {/* Situations dropdown */}
          <div className="relative" onMouseEnter={() => setSituationsOpen(true)} onMouseLeave={() => setSituationsOpen(false)}>
            <button className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
              Situations
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {situationsOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1">
                {situationLinks.map(link => (
                  <Link key={link.href} href={link.href} className="block px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm">
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Areas We Serve dropdown */}
          <div className="relative" onMouseEnter={() => setAreasOpen(true)} onMouseLeave={() => setAreasOpen(false)}>
            <button className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
              Areas We Serve
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {areasOpen && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1">
                {areaLinks.map(link => (
                  <Link key={link.href} href={link.href} className="block px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm">
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/#reviews" className="text-slate-600 hover:text-blue-600 transition-colors">{t('nav_reviews')}</Link>
          <Link href="/contact" className="text-slate-600 hover:text-blue-600 transition-colors">{t('nav_contact')}</Link>
          <Link href="/referral-partners" className="text-slate-600 hover:text-blue-600 transition-colors">Referrals</Link>

          {/* Language toggle */}
          <button
            onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
            className="text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-300 hover:border-slate-400 transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
            aria-label="Switch language"
          >
            {locale === 'en' ? 'ES' : 'EN'}
          </button>

          <Link
            href="/property-information"
            className="text-white font-semibold px-5 py-2 rounded-lg min-h-[44px] flex items-center"
            style={{ background: 'var(--color-cta)' }}
          >
            {t('nav_get_offer')}
          </Link>
        </nav>

        {/* Phone visible at sm, hidden on md+ */}
        <a
          href={`tel:${siteConfig.phone}`}
          className="font-semibold text-sm hidden sm:flex items-center gap-1 md:hidden min-h-[44px]"
          style={{ color: 'var(--color-cta)', fontFamily: 'var(--font-body)' }}
        >
          {siteConfig.phoneDisplay}
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden text-slate-600 hover:text-slate-900 min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden border-t bg-white px-4 py-4 flex flex-col gap-4"
          style={{ borderColor: 'var(--color-border)', fontFamily: 'var(--font-body)' }}
        >
          <Link href="/about" className="text-slate-600 hover:text-blue-600 py-1" onClick={() => setOpen(false)}>{t('nav_about')}</Link>
          <Link href="/#how-it-works" className="text-slate-600 hover:text-blue-600 py-1" onClick={() => setOpen(false)}>{t('nav_how_it_works')}</Link>
          <Link href="/#reviews" className="text-slate-600 hover:text-blue-600 py-1" onClick={() => setOpen(false)}>{t('nav_reviews')}</Link>

          {/* Mobile: Situations */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Situations</p>
            <div className="flex flex-col gap-1 pl-2">
              {situationLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-slate-600 hover:text-blue-600 py-0.5 text-sm" onClick={() => setOpen(false)}>{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Mobile: Areas We Serve */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Areas We Serve</p>
            <div className="flex flex-col gap-1 pl-2">
              {areaLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-slate-600 hover:text-blue-600 py-0.5 text-sm" onClick={() => setOpen(false)}>{link.label}</Link>
              ))}
            </div>
          </div>

          <Link href="/contact" className="text-slate-600 hover:text-blue-600 py-1" onClick={() => setOpen(false)}>{t('nav_contact')}</Link>
          <Link href="/referral-partners" className="text-slate-600 hover:text-blue-600 py-1" onClick={() => setOpen(false)}>Referral Partners</Link>
          <button
            onClick={() => { setLocale(locale === 'en' ? 'es' : 'en'); setOpen(false) }}
            className="text-left text-sm font-semibold py-1"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {locale === 'en' ? '🇲🇽 Español' : '🇺🇸 English'}
          </button>
          <a
            href={`tel:${siteConfig.phone}`}
            className="font-bold min-h-[44px] flex items-center"
            style={{ color: 'var(--color-cta)' }}
          >
            {siteConfig.phoneDisplay}
          </a>
          <Link
            href="/property-information"
            className="text-white font-semibold px-5 py-3 rounded-lg text-center min-h-[44px] flex items-center justify-center"
            style={{ background: 'var(--color-cta)' }}
            onClick={() => setOpen(false)}
          >
            {t('nav_get_offer')}
          </Link>
        </div>
      )}
    </header>
  )
}
