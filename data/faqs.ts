import type { StateConfig } from '@/lib/state-context'

export function applyStateTokens(text: string, config: StateConfig): string {
  return text
    .replace(/\{\{state\}\}/g, config.name)
    .replace(/\{\{stateAbbr\}\}/g, config.abbr)
    .replace(/\{\{markets\}\}/g, config.markets.join(', '))
}

const faqTemplates = [
  {
    question: 'How fast can you close on my {{state}} home?',
    answer: 'We can close in as little as 7 days, or on your timeline. Most sellers close within 2–3 weeks.',
  },
  {
    question: 'Do I need to make any repairs before selling?',
    answer: 'No. We buy houses as-is in any condition. Take what you want and leave the rest.',
  },
  {
    question: 'What areas of {{state}} do you buy houses in?',
    answer: 'We buy throughout {{state}}, including {{markets}}.',
  },
  {
    question: 'Are there any fees or commissions?',
    answer: 'None. We pay all closing costs and there are no realtor commissions. The offer we make is what you receive.',
  },
  {
    question: 'How do you calculate your cash offer?',
    answer: "We look at the property's after-repair value, the cost of needed work, and current market conditions. We aim to give you the highest fair offer we can.",
  },
  {
    question: 'Is your cash offer negotiable?',
    answer: 'Yes. Once we see the property, we can discuss the details and work toward a number that works for both sides.',
  },
  {
    question: 'What if I\'m behind on mortgage payments or taxes?',
    answer: 'Not a problem. We work with homeowners in difficult financial situations every day and can often close quickly enough to prevent further damage.',
  },
  {
    question: 'How is this different from listing with a Realtor?',
    answer: 'No showings, no repairs, no 3–6% agent commission, no waiting 60–90 days. You get certainty and speed instead of maybe getting an offer someday.',
  },
] as const

export function getHomepageFaqs(config: StateConfig) {
  return faqTemplates.map(faq => ({
    question: applyStateTokens(faq.question, config),
    answer: applyStateTokens(faq.answer, config),
  }))
}

/** Virginia backward-compat default — used on Virginia site where stateConfig isn't available at data layer */
export const homepageFaqs = faqTemplates.map(faq => ({
  question: faq.question.replace(/\{\{state\}\}/g, 'Virginia').replace(/\{\{stateAbbr\}\}/g, 'VA').replace(/\{\{markets\}\}/g, 'Northern Virginia, Richmond VA, Hampton Roads VA'),
  answer: faq.answer.replace(/\{\{state\}\}/g, 'Virginia').replace(/\{\{stateAbbr\}\}/g, 'VA').replace(/\{\{markets\}\}/g, 'Northern Virginia, Richmond VA, Hampton Roads VA'),
}))
