import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: `SMS Terms | ${siteConfig.name}`,
  description: `SMS messaging terms and conditions for ${siteConfig.name}.`,
  alternates: { canonical: `${siteConfig.url}/sms-terms` },
  robots: { index: true, follow: true },
}

export default function SmsTermsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-slate-900 py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2">SMS Terms &amp; Conditions</h1>
            <p className="text-slate-400">Last updated: March 2026</p>
          </div>
        </section>

        <section className="py-12 px-4 bg-slate-800">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">

            <h2>Program Description</h2>
            <p>
              {siteConfig.name} offers SMS messaging to communicate with you about your property inquiry,
              cash offer updates, and related real estate services. By providing your phone number and
              submitting a form on our website, you agree to receive text messages from us.
            </p>

            <h2>Consent</h2>
            <p>
              By submitting your phone number on our website, you expressly consent to receive recurring
              automated and non-automated SMS and MMS messages from {siteConfig.name} at the mobile number
              you provide. Consent is not a condition of purchase or service.
            </p>

            <h2>Message Frequency</h2>
            <p>
              Message frequency varies based on your inquiry and our follow-up process. You may receive
              up to 5 messages per week related to your property inquiry.
            </p>

            <h2>Message &amp; Data Rates</h2>
            <p>
              Standard message and data rates may apply depending on your mobile carrier and plan.
              {siteConfig.name} does not charge for SMS messages, but your carrier may.
            </p>

            <h2>How to Opt Out</h2>
            <p>
              You may opt out of receiving SMS messages at any time by replying <strong>STOP</strong> to
              any text message you receive from us. After opting out, you will receive one final
              confirmation message. To re-subscribe, reply <strong>START</strong>.
            </p>

            <h2>Help</h2>
            <p>
              For help, reply <strong>HELP</strong> to any SMS message or contact us at{' '}
              <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a> or visit our{' '}
              <a href="/contact">Contact page</a>.
            </p>

            <h2>Supported Carriers</h2>
            <p>
              Our SMS program is supported by all major US carriers including AT&amp;T, T-Mobile, Verizon,
              Sprint, and others. Carrier support may vary.
            </p>

            <h2>Privacy</h2>
            <p>
              Your mobile number and messaging history are handled in accordance with our{' '}
              <a href="/privacy-policy">Privacy Policy</a>. We do not sell or share your mobile number
              with third parties for their own marketing purposes.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about these SMS Terms, contact us at{' '}
              <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a> or through our{' '}
              <a href="/contact">Contact page</a>.
            </p>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
