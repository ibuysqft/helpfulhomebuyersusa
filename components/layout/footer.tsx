import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { registeredStates } from '@/lib/state-context'
import { NewsletterInlineForm } from '@/components/newsletter-inline-form'

const { stateName, stateAbbr, stateSlug, isNational } = siteConfig

// Split 15 states into 3 columns
const stateColumns = [
  registeredStates.slice(0, 5),
  registeredStates.slice(5, 10),
  registeredStates.slice(10, 15),
]

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/helpfulhomebuyersusa',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/helpfulhomebuyersusa',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@helpfulhomebuyersusa',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@helpfulhomebuyersusa',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/helpful-home-buyers-usa',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'X / Twitter',
    href: 'https://twitter.com/helpfulhomebuyersva',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'Pinterest',
    href: 'https://www.pinterest.com/helpfulhomebuyersusa',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
    ),
  },
  {
    name: 'Reddit',
    href: 'https://www.reddit.com/u/HelpfulHomeBuyersVA',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
      </svg>
    ),
  },
]

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: '#0F1E3C', fontFamily: 'var(--font-body)' }} className="text-slate-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Company */}
        <div>
          <p
            className="text-white text-base font-semibold mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Helpful Homebuyers USA
          </p>
          <p className="leading-relaxed mb-3 text-slate-400">
            National cash home buying network. Fair offers, fast closings, zero hassle. 15 states and growing.
          </p>
          <a
            href={`tel:${siteConfig.phone}`}
            className="font-semibold hover:opacity-80 transition-opacity"
            style={{ color: 'var(--color-cta)' }}
          >
            {siteConfig.phoneDisplay}
          </a>
          <p className="text-xs mt-3 text-slate-500" style={{ fontFamily: 'var(--font-body)' }}>
            Weekly market updates:
          </p>
          <NewsletterInlineForm />
        </div>

        {/* We Buy */}
        <div>
          <p className="text-white font-semibold mb-3">We Buy</p>
          <ul className="space-y-2">
            <li>
              <a
                href="https://myresolutionpath.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Foreclosure / Debt Help
              </a>
            </li>
            <li><Link href="/inherited-property" className="hover:text-white transition-colors">Inherited Property</Link></li>
            <li><Link href="/divorce" className="hover:text-white transition-colors">Divorce</Link></li>
            <li><Link href="/behind-on-payments" className="hover:text-white transition-colors">Behind on Payments</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-white font-semibold mb-3">Tools</p>
          <ul className="space-y-2">
            <li><Link href="/quiz" className="hover:text-white transition-colors">Seller Quiz</Link></li>
            <li><Link href="/instant-offer" className="hover:text-white transition-colors">Instant Offer</Link></li>
            <li><Link href="/net-proceeds-calculator" className="hover:text-white transition-colors">Net Proceeds Calc</Link></li>
            <li><Link href="/whats-my-house-worth" className="hover:text-white transition-colors">What&apos;s My House Worth</Link></li>
            <li><Link href="/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
            <li><Link href="/sell-my-house-fast-vs-listing-with-agent" className="hover:text-white transition-colors">Cash Buyer vs Agent</Link></li>
            <li><Link href={`/as-is-home-buyers-${stateSlug}`} className="hover:text-white transition-colors">Sell As-Is in {stateName}</Link></li>
            <li><Link href="/states" className="hover:text-white transition-colors" style={{ color: '#D4AF37' }}>All States →</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white font-semibold mb-3">Contact</p>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li>
              <Link href="/referral-partners" className="hover:text-white transition-colors">
                Referral Partners
              </Link>
            </li>
            <li>
              <Link
                href="/property-information"
                className="hover:text-white transition-colors"
                style={{ color: 'var(--color-cta)' }}
              >
                Get My Offer
              </Link>
            </li>
            <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="/sms-terms" className="hover:text-white transition-colors">SMS Terms</Link></li>
          </ul>
        </div>
      </div>

      {/* States We Serve */}
      <div className="border-t border-slate-800 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-white font-semibold mb-4 text-sm">States We Serve</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stateColumns.map((col, ci) => (
              <ul key={ci} className="space-y-1.5">
                {col.map((state) => (
                  <li key={state.slug}>
                    <a
                      href={`https://${state.domain}`}
                      className="hover:text-white transition-colors text-xs flex items-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span style={{ color: '#475569' }}>{state.abbr}</span>
                      {state.name}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="border-t border-slate-800 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
          <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Follow Us</p>
          <div className="flex flex-wrap justify-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-110 text-slate-400 hover:text-yellow-400"
                style={{ background: 'rgba(255,255,255,0.07)' }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Partner: Debt / Foreclosure Help */}
      <div className="border-t border-slate-800 py-4 px-4 text-center text-sm text-slate-400">
        <p>
          Facing foreclosure or debt trouble and want to keep your home?{' '}
          <a
            href="https://myresolutionpath.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:opacity-80 transition-opacity"
            style={{ color: '#D4AF37' }}
          >
            MyResolutionPath.com →
          </a>
          {' '}— loan modifications, forbearance &amp; foreclosure prevention.
        </p>
      </div>

      {/* SMS Keyword CTA */}
      <div className="border-t border-slate-800 py-4 px-4 text-center">
        <p className="text-slate-300 text-sm">
          <span className="font-semibold text-white">Text &ldquo;OFFER&rdquo; to (703) 940-1159</span>
          {' '}for an instant cash offer &mdash; we reply in minutes.
          {' '}<span className="text-slate-500 text-xs">Reply STOP to opt out.</span>
        </p>
      </div>

      <div className="border-t border-slate-800 text-center py-4 text-slate-500 text-xs">
        &copy; {year} Paramount Legacy Properties &mdash; Licensed in {stateName} &mdash; We are direct cash buyers, not real estate agents.
      </div>
    </footer>
  )
}
