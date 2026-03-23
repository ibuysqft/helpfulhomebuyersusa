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

const situationFaqTemplates: Record<string, { question: string; answer: string }[]> = {
  'short-sale': [
    { question: 'What is a short sale and how does it work?', answer: 'A short sale is when your lender agrees to accept less than what you owe on the mortgage. We negotiate directly with your lender, handle all paperwork, and pay nothing out of pocket.' },
    { question: 'How long does a short sale take in {{state}}?', answer: 'Most short sales take 30–90 days depending on the lender. We\'ve done them faster when there\'s a foreclosure deadline involved.' },
    { question: 'Will I owe money after a short sale?', answer: 'In most cases, no. Many lenders waive the deficiency, especially in {{state}}. We\'ll walk you through what to expect based on your specific lender.' },
    { question: 'Can I do a short sale if foreclosure is already scheduled?', answer: 'Yes — as long as the sale hasn\'t happened. The sooner you contact us, the more time we have to stop it.' },
    { question: 'Do I need my own attorney for a short sale?', answer: 'We work with our own title and legal team. You don\'t need to hire anyone — we handle everything.' },
  ],
  'hecm-short-sale': [
    { question: 'What is a HECM short sale?', answer: 'A HECM (Home Equity Conversion Mortgage) is a reverse mortgage backed by HUD/FHA. A HECM short sale happens when the loan balance exceeds the home\'s value. We submit the package to your servicer and handle the HUD approval process.' },
    { question: 'Who pays for a HECM short sale?', answer: 'You pay nothing. All costs are covered by us. Heirs of the estate have no personal liability for any deficiency on a HECM loan.' },
    { question: 'How long does a HECM short sale take?', answer: 'Typically 60–120 days depending on the servicer. We\'ve worked with all major HECM servicers and know how to move things along.' },
    { question: 'Can heirs sell a home with a reverse mortgage?', answer: 'Yes. Heirs have 6–12 months from the borrower\'s death (or departure from the home) to sell or refinance before the loan comes due.' },
    { question: 'What if the home needs repairs and has a reverse mortgage?', answer: 'We buy as-is. You don\'t need to do any repairs. The lender and HUD account for condition in the appraisal process.' },
  ],
  'title-issues': [
    { question: 'What kinds of title problems can you handle?', answer: 'We\'ve dealt with IRS liens, judgment liens, HOA liens, code violations, missing heirs, forged deeds, incorrect legal descriptions, and more. Our attorneys handle it all.' },
    { question: 'Do I need to hire my own attorney if there are title issues?', answer: 'No. Our legal team handles all curative title work. We pay those fees — you don\'t write a check for anything.' },
    { question: 'How long does it take to cure a title problem?', answer: 'Depends on complexity. Simple liens can be cleared in days. Missing heir cases or court-ordered quieting of title can take 30–90 days. We\'ll give you an honest timeline upfront.' },
    { question: 'Can you still buy my house if there are multiple liens?', answer: 'Yes. We pay off all recorded liens at closing from the sale proceeds. You get whatever is left after liens and our purchase price.' },
    { question: 'What if the title issue can\'t be resolved?', answer: 'In rare cases where title truly cannot be cured, we\'ll tell you honestly. But we solve the vast majority of title problems and do it at no cost to you.' },
  ],
  'sheriff-sale': [
    { question: 'How fast can you close before a sheriff sale?', answer: 'We\'ve closed in as few as 5 days when there\'s a deadline. Call us immediately — the sooner we start, the better.' },
    { question: 'What happens to my equity at a sheriff sale?', answer: 'In most cases you lose it. Sheriff sales are public auctions that often sell well below market value, and you see nothing above the debt. We pay fair market value.' },
    { question: 'Can I still sell if I\'m already in foreclosure?', answer: 'Yes, up until the gavel falls. Even the day before a sheriff sale, if the paperwork can be done, we can stop it.' },
    { question: 'What about a tax sale — is that the same thing?', answer: 'Similar but handled by the county tax authority instead of a court. We buy before tax sales too. The same urgency applies — call us immediately.' },
    { question: 'Will selling before a sheriff sale hurt my credit less?', answer: 'Yes. A short sale or cash sale before a sheriff sale is significantly less damaging to your credit than a foreclosure judgment.' },
  ],
  'tax-lien': [
    { question: 'How much back tax can you buy through?', answer: 'We\'ve bought homes with 10+ years of delinquent taxes. There\'s no amount we won\'t consider.' },
    { question: 'What happens to the delinquent taxes at closing?', answer: 'We pay them off in full from the purchase proceeds. You owe nothing.' },
    { question: 'Can I sell if the county has already started a tax sale process?', answer: 'Usually yes, if we move quickly. The county can be paid off right up until the tax sale date in most cases.' },
    { question: 'Will I owe income tax on money I receive?', answer: 'That depends on your overall tax situation. We recommend talking to a CPA, but selling a primary residence often has significant tax exclusions.' },
  ],
  'probate': [
    { question: 'Do I need probate to be complete before selling?', answer: 'Not always. In many cases we can open escrow and even close during probate, with court approval. We work with your probate attorney.' },
    { question: 'Who pays the probate attorney?', answer: 'We do — it comes out of the sale proceeds, so there\'s no out-of-pocket cost for the estate or heirs.' },
    { question: 'What if there are multiple heirs who disagree?', answer: 'We\'ve navigated contested estates before. We work with all parties and their counsel to reach agreement. The key is getting everyone on the same page early.' },
    { question: 'Does the property have to be cleaned out first?', answer: 'No. We buy as-is. Leave whatever you don\'t want — furniture, clothing, belongings. We handle the rest.' },
  ],
}

export function getSituationFaqs(situationKey: string, config: StateConfig) {
  const templates = situationFaqTemplates[situationKey]
  if (!templates) return null
  return templates.map(faq => ({
    question: applyStateTokens(faq.question, config),
    answer: applyStateTokens(faq.answer, config),
  }))
}

/** Virginia backward-compat default — used on Virginia site where stateConfig isn't available at data layer */
export const homepageFaqs = faqTemplates.map(faq => ({
  question: faq.question.replace(/\{\{state\}\}/g, 'Virginia').replace(/\{\{stateAbbr\}\}/g, 'VA').replace(/\{\{markets\}\}/g, 'Northern Virginia, Richmond VA, Hampton Roads VA'),
  answer: faq.answer.replace(/\{\{state\}\}/g, 'Virginia').replace(/\{\{stateAbbr\}\}/g, 'VA').replace(/\{\{markets\}\}/g, 'Northern Virginia, Richmond VA, Hampton Roads VA'),
}))
