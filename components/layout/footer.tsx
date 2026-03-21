import Link from 'next/link'
import { siteConfig } from '@/config/site'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="text-white font-semibold mb-2">Helpful Home Buyers USA</p>
          <p>We buy houses for cash in Virginia. Fair offers, fast closings, zero hassle.</p>
          <p className="mt-2">
            <a href={`tel:${siteConfig.phone}`} className="text-amber-400 hover:text-amber-300 font-semibold">
              {siteConfig.phoneDisplay}
            </a>
          </p>
        </div>
        <div>
          <p className="text-white font-semibold mb-2">Service Areas</p>
          <ul className="space-y-1">
            <li>Northern Virginia</li>
            <li>Richmond, VA</li>
            <li>Hampton Roads</li>
            <li>Virginia Beach / Norfolk</li>
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-2">Quick Links</p>
          <ul className="space-y-1">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/property-information" className="hover:text-white transition-colors">Get My Offer</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 text-center py-4 text-slate-500">
        © {year} Helpful Home Buyers USA. We are not real estate agents. We are direct cash buyers.
      </div>
    </footer>
  )
}
