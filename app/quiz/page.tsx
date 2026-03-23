import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SituationQuiz } from '@/components/situation-quiz'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: `What's the Best Way to Sell My House? | ${siteConfig.stateName} Seller Quiz`,
  description: `Not sure whether to take a cash offer, list your home, or explore creative financing? Take our 60-second quiz to find the right path for your exact situation in ${siteConfig.stateName}.`,
  alternates: { canonical: `${siteConfig.url}/quiz` },
  openGraph: {
    title: `Find the Right Way to Sell Your ${siteConfig.stateName} Home — 60-Second Quiz`,
    description: `Answer 3 questions and we'll show you the best option: cash offer, equity retention, foreclosure relief, or creative financing. Personalized results instantly.`,
    url: `${siteConfig.url}/quiz`,
    type: 'website',
  },
}

export default function QuizPage() {
  return (
    <>
      <Header />
      <main>
        <SituationQuiz />
      </main>
      <Footer />
    </>
  )
}
