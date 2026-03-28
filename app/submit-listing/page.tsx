import type { Metadata } from 'next'
import { SubmitListingClient } from './SubmitListingClient'

export const metadata: Metadata = {
  title: 'Submit Your Listing | Helpful Home Buyers',
  description: 'Listing agents: get a cash offer on your property in 24 hours.',
  robots: 'noindex',
}

export default function SubmitListingPage() {
  return <SubmitListingClient />
}
