import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ThankYouClient } from './thank-you-client'

export const metadata: Metadata = {
  title: 'Thank You — We Received Your Request | Helpful Home Buyers USA',
  description: 'We received your property information. Expect to hear from us within 24 hours with your cash offer.',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <ThankYouClient />
      <Footer />
    </>
  )
}
