import type { Metadata } from 'next'
import { Phone } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { LeadForm } from '@/components/lead-form'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Contact Us | Cash Home Buyers Virginia',
  description: `Contact ${siteConfig.name}. Call us at ${siteConfig.phoneDisplay} or fill out the form to get your cash offer today.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-slate-900 py-20 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold">
                Contact <span className="text-amber-400">Us</span>
              </h1>
              <p className="text-xl text-slate-300">
                Have questions? Ready to get your cash offer? We&apos;re here to help.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone size={20} aria-hidden={true} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Phone / Text</p>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-amber-400 hover:text-amber-300 text-lg font-bold"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                    <p className="text-slate-400 text-sm">Available 8am–8pm, 7 days a week</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 text-xl">✉️</span>
                  <div>
                    <p className="text-white font-semibold">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-amber-400 hover:text-amber-300"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 text-xl">📍</span>
                  <div>
                    <p className="text-white font-semibold">Service Area</p>
                    <p className="text-slate-300">All of Virginia — Northern VA, Richmond, Hampton Roads, and surrounding areas</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Get Your Cash Offer</h2>
              <LeadForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
