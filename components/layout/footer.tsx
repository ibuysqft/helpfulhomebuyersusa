import Link from 'next/link'
import { siteConfig } from '@/config/site'

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
            We buy houses for cash in Virginia. Fair offers, fast closings, zero hassle.
          </p>
          <a
            href={`tel:${siteConfig.phone}`}
            className="font-semibold hover:opacity-80 transition-opacity"
            style={{ color: 'var(--color-cta)' }}
          >
            {siteConfig.phoneDisplay}
          </a>
        </div>

        {/* We Buy */}
        <div>
          <p className="text-white font-semibold mb-3">We Buy</p>
          <ul className="space-y-2">
            <li><Link href="/foreclosure" className="hover:text-white transition-colors">Foreclosure</Link></li>
            <li><Link href="/inherited-property" className="hover:text-white transition-colors">Inherited Property</Link></li>
            <li><Link href="/divorce" className="hover:text-white transition-colors">Divorce</Link></li>
            <li><Link href="/behind-on-payments" className="hover:text-white transition-colors">Behind on Payments</Link></li>
          </ul>
        </div>

        {/* Service Areas */}
        <div>
          <p className="text-white font-semibold mb-3">Service Areas</p>
          <ul className="space-y-2">
            <li>Northern Virginia</li>
            <li>Richmond, VA</li>
            <li>Hampton Roads</li>
            <li>Virginia Beach / Norfolk</li>
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
              <Link
                href="/property-information"
                className="hover:text-white transition-colors"
                style={{ color: 'var(--color-cta)' }}
              >
                Get My Offer
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 text-center py-4 text-slate-500 text-xs">
        &copy; {year} Paramount Legacy Properties &mdash; Licensed in Virginia &mdash; We are direct cash buyers, not real estate agents.
      </div>
    </footer>
  )
}
