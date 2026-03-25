import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Privacy Policy | Helpful Home Buyers USA',
  description: 'Privacy Policy for Helpful Home Buyers USA — how we collect, use, and protect your personal information.',
  alternates: { canonical: `${siteConfig.url}/privacy-policy` },
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-slate-900 py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
            <p className="text-slate-400">Last updated: March 2026</p>
          </div>
        </section>

        <section className="py-12 px-4 bg-slate-800">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">

            <h2>1. Information We Collect</h2>
            <p>
              When you submit a form on our website, we collect the information you provide, which may include your name, property address, phone number, and email address. We also collect standard web analytics data such as pages visited, browser type, and referring website.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information you provide to:</p>
            <ul>
              <li>Contact you about your property and prepare a cash offer</li>
              <li>Respond to your inquiries</li>
              <li>Send you information about our services if you have opted in</li>
              <li>Improve our website and services</li>
            </ul>

            <h2>3. Text Messaging and Phone Calls</h2>
            <p>
              By submitting your phone number, you consent to receive calls and text messages from {siteConfig.name} regarding your property inquiry. Message and data rates may apply. You may opt out at any time by replying STOP to any text message or by calling us directly.
            </p>
            <p>
              All calls may be recorded for quality assurance purposes. By calling or accepting a call from us, you consent to call recording in accordance with applicable law.
            </p>

            <h2>4. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, provided those parties agree to keep your information confidential.
            </p>

            <h2>5. Cookies and Tracking Technologies</h2>
            <p>
              Our website uses cookies and similar tracking technologies, including Google Analytics and Google Tag Manager, to analyze site traffic and improve your experience. You can disable cookies in your browser settings, though some features of the site may not function properly as a result.
            </p>

            <h2>6. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your data.
            </p>

            <h2>7. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal information by contacting us at the email or phone number below. We will respond to reasonable requests within 30 days.
            </p>

            <h2>8. Children&apos;s Privacy</h2>
            <p>
              Our website is not directed to children under the age of 13 and we do not knowingly collect personal information from children.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will post any changes on this page with an updated date. Continued use of our website after changes constitutes your acceptance of the revised policy.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us:
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
