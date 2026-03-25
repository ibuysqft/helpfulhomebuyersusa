import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Terms of Service | Helpful Home Buyers USA',
  description: 'Terms of Service for Helpful Home Buyers USA — terms governing your use of our website and services.',
  alternates: { canonical: `${siteConfig.url}/terms-of-service` },
  robots: { index: true, follow: true },
}

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-slate-900 py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
            <p className="text-slate-400">Last updated: March 2026</p>
          </div>
        </section>

        <section className="py-12 px-4 bg-slate-800">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the website at helpfulhomebuyersusa.com (the &ldquo;Site&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Site.
            </p>

            <h2>2. Services Description</h2>
            <p>
              {siteConfig.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) provides information about our cash home buying services. Any offer to purchase real estate is made in a separate written agreement and is not binding until both parties sign a written purchase contract.
            </p>

            <h2>3. No Real Estate Advice</h2>
            <p>
              The information on this Site is for general informational purposes only and does not constitute real estate, legal, financial, or tax advice. You should consult qualified professionals before making any real estate decisions.
            </p>

            <h2>4. Cash Offers</h2>
            <p>
              Any cash offer we provide is based on information you supply and our preliminary assessment of the property. Offers are subject to verification of property condition, title review, and other due diligence. We reserve the right to modify or withdraw any offer prior to execution of a written purchase agreement.
            </p>

            <h2>5. Communications Consent</h2>
            <p>
              By submitting your contact information, you consent to being contacted by {siteConfig.name} via phone, text message, and email regarding your property inquiry. You may opt out of text messages at any time by replying STOP. Standard message and data rates may apply.
            </p>

            <h2>6. Accuracy of Information</h2>
            <p>
              We make reasonable efforts to keep information on the Site accurate and up to date. However, we make no warranty that information is complete, accurate, or current. Property values, market conditions, and other information may change without notice.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, {siteConfig.name} shall not be liable for any indirect, incidental, special, or consequential damages arising out of or related to your use of this Site or our services.
            </p>

            <h2>8. Intellectual Property</h2>
            <p>
              All content on this Site, including text, images, and graphics, is the property of {siteConfig.name} and is protected by applicable copyright and trademark laws. You may not reproduce or distribute content without our written permission.
            </p>

            <h2>9. Third-Party Links</h2>
            <p>
              Our Site may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites. Links do not constitute endorsement.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the Commonwealth of Virginia, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Virginia.
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Continued use of the Site after changes are posted constitutes your acceptance of the revised Terms.
            </p>

            <h2>12. Contact</h2>
            <p>
              Questions about these Terms? Contact us at:
            </p>
            <ul>
              <li>Phone: <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a></li>
              <li>Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
            </ul>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
