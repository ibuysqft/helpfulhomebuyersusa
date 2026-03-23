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
  'code-violations': [
    { question: 'Do I have to fix the code violations before you buy?', answer: 'No. We buy as-is with open code violations. We handle all city and county resolution after closing at our own expense.' },
    { question: 'What if the city has condemned the property?', answer: 'We still buy condemned properties. A condemnation order limits who can occupy the home, but it doesn\'t prevent a sale. We\'ve bought many condemned homes.' },
    { question: 'Will open permits hurt the sale?', answer: 'Not with us. Open permits are our problem after closing. We price accordingly and handle them ourselves.' },
    { question: 'How do you set a price on a code-violation property?', answer: 'We look at the cost to cure the violations and price based on the home\'s condition after those repairs. We\'ll walk you through our reasoning.' },
  ],
  'hoarder-house': [
    { question: 'Do I really not have to clean anything out?', answer: 'Correct. Leave every item exactly as it is. We\'ve bought homes where we had to create a path to walk through. It doesn\'t change our ability to buy.' },
    { question: 'How do you set a price on a hoarder home?', answer: 'We estimate cleanout costs and any underlying damage, then price accordingly. We\'ll be transparent about how we arrive at the number.' },
    { question: 'Is the process confidential?', answer: 'Completely. We don\'t use for-sale signs, we don\'t broadcast the address, and our crew is professional and discreet.' },
    { question: 'What if there are animals or biohazards?', answer: 'We\'ve dealt with it. Our team handles specialty cleanouts including biohazard situations. It affects the price but not whether we buy.' },
  ],
  'foundation-problems': [
    { question: 'Why can\'t I just list it with an agent?', answer: 'Most conventional lenders won\'t fund a mortgage on a home with active foundation issues. That eliminates most buyers. We pay cash — no lender, no problem.' },
    { question: 'Do I need to get a foundation inspection first?', answer: 'No. We do our own evaluation during the walkthrough. You don\'t need to pay for reports or get multiple opinions.' },
    { question: 'What kinds of foundation problems do you buy?', answer: 'Cracked slabs, bowing basement walls, pier-and-beam settling, heaving from soil movement — all of it. We\'ve seen every type.' },
    { question: 'Will the price be much lower because of foundation issues?', answer: 'It will reflect the cost of repairs, yes. But you avoid paying agent commissions, closing costs, repair bills, and months of carrying costs. The net is often comparable.' },
  ],
  'mold-damage': [
    { question: 'Do I have to disclose mold when selling?', answer: 'Yes, in most states you are required to disclose known material defects including mold. We already know — you won\'t be hiding anything from us.' },
    { question: 'Can buyers get a mortgage on a home with mold?', answer: 'Rarely. Most lenders require remediation before they\'ll fund. That\'s why we pay cash — no bank, no problem.' },
    { question: 'What if the mold is throughout the whole house?', answer: 'Doesn\'t matter. We buy regardless of the extent. We price based on remediation cost and still close.' },
    { question: 'How do you handle the mold after you buy it?', answer: 'We bring in a licensed remediation company. It\'s our problem, not yours.' },
  ],
  'irs-lien': [
    { question: 'Can I sell a house with an IRS lien on it?', answer: 'Yes. The IRS lien attaches to the sale proceeds. The lien gets paid at closing from what we pay you — you don\'t come out of pocket.' },
    { question: 'What if the IRS lien is larger than the home\'s value?', answer: 'The IRS has a process to discharge or subordinate liens on property sales. We\'ve navigated this before and work with your title company to handle it.' },
    { question: 'Do I need a tax attorney?', answer: 'Not necessarily, but it\'s often helpful. We can connect you with resources if needed. Our title team handles the mechanics of lien payoff.' },
    { question: 'How long does it take to close with an IRS lien?', answer: 'Typically 2–4 weeks longer than a standard sale to get IRS discharge documentation. We factor this into the timeline upfront.' },
  ],
  'hoa-lien': [
    { question: 'Can the HOA actually foreclose on my home?', answer: 'Yes, in most states. HOAs have the right to foreclose for unpaid assessments. In states like FL, NV, CO, and DC, the HOA super lien can take priority even over a first mortgage.' },
    { question: 'Do I have to pay the HOA balance before selling?', answer: 'No. The HOA balance gets paid from sale proceeds at closing. You don\'t write a check — it comes out of what we pay.' },
    { question: 'What if the HOA amount is very large with penalties?', answer: 'We negotiate with HOAs regularly. Sometimes we can settle for less than the full balance. We\'ll be honest about what\'s realistic.' },
    { question: 'What states have super lien laws?', answer: 'FL, NV, CO, CT, DC, HI, MD, MA, MN, NJ, OR, and WA have varying super lien statutes. This is exactly why you need a buyer who knows the rules.' },
  ],
  'bankruptcy': [
    { question: 'Can I sell my home while in bankruptcy?', answer: 'Yes, but it requires court approval. We work with bankruptcy trustees and understand the process. The trustee approves the sale price and terms.' },
    { question: 'Do I keep any of the proceeds from a bankruptcy sale?', answer: 'That depends on exemptions and what you\'re owed. Your bankruptcy attorney can advise on how much equity is protected under your state\'s exemptions.' },
    { question: 'What\'s the difference between Chapter 7 and Chapter 13 for selling a home?', answer: 'Chapter 7 involves liquidation — the trustee may sell assets. Chapter 13 is a reorganization — you may be able to keep the home or sell with court approval. We\'ve worked with both.' },
    { question: 'How long does a court-approved sale take?', answer: 'Typically 30–60 days after filing a motion to sell. We can help accelerate where possible and work within the court\'s timeline.' },
  ],
  'pre-foreclosure': [
    { question: 'What is a Notice of Default and how much time do I have?', answer: 'A NOD is the official start of the foreclosure process. Timelines vary by state — from as few as 30 days in some states to 6+ months in others. We\'ll tell you exactly where you stand.' },
    { question: 'Is it better to sell during pre-foreclosure than after?', answer: 'Yes. During pre-foreclosure you still own the property and control the sale. You can negotiate terms and keep equity. After the auction you have nothing.' },
    { question: 'Will selling during pre-foreclosure stop the process?', answer: 'Yes. Once we close, the lender is paid off and the foreclosure is stopped permanently.' },
    { question: 'Does a pre-foreclosure show on my credit?', answer: 'The missed payments do. But a foreclosure completion is far more damaging. Selling before the auction date significantly limits the credit impact.' },
  ],
  'senior-transition': [
    { question: 'Does the senior have to be present for the walkthrough or closing?', answer: 'No. We can work with family members, power of attorney holders, or elder care attorneys. We accommodate whatever the situation requires.' },
    { question: 'What if the home needs major work and the family lives far away?', answer: 'Perfect situation for us. We buy as-is, handle all the cleanup, and wire the proceeds. No one has to fly in or manage contractors.' },
    { question: 'Can we close on a date that works around the move to the facility?', answer: 'Absolutely. We set the closing date around your family\'s needs. If you need 60 days, you have 60 days.' },
    { question: 'Is this confidential?', answer: 'Completely. We are discreet, professional, and treat your family\'s situation with the respect it deserves.' },
  ],
  'tired-landlord': [
    { question: 'Do I have to evict the tenants before selling?', answer: 'No. We buy with tenants in place. We take over the landlord-tenant relationship at closing and handle everything from there.' },
    { question: 'What if the tenants have damaged the property?', answer: 'We buy damaged rentals. We factor condition into our offer. You don\'t need to make any repairs or withhold their security deposit on our behalf.' },
    { question: 'What if the tenant has a long-term lease?', answer: 'We buy subject to existing leases. As the new owner, we\'re bound by the lease terms — that\'s our problem, not yours.' },
    { question: 'Do I need to notify tenants before the sale?', answer: 'Most states require some form of notice before showing or transferring. We know local landlord-tenant law and help you stay compliant without tipping off difficult tenants prematurely.' },
  ],
  'out-of-state': [
    { question: 'Do I have to come back to close?', answer: 'No. We use remote closings with a local notary. You sign from wherever you are and we wire the proceeds.' },
    { question: 'How do you see the property if I\'m not local?', answer: 'We do the walkthrough ourselves. You don\'t need to be there. We\'ll give you an honest assessment of condition.' },
    { question: 'What if the property is occupied by tenants or family members?', answer: 'We handle coordination with whoever is on-site. You just communicate with us — we handle the local logistics.' },
    { question: 'Can you buy an inherited property in another state?', answer: 'Yes. We work in all 15 states in our network. If the property is in a state we cover, we can buy it regardless of where you live.' },
  ],
  'medical-bills': [
    { question: 'How fast can you actually close?', answer: 'As fast as 5–7 days. If there\'s a pressing medical or financial deadline, tell us and we\'ll do everything possible to hit it.' },
    { question: 'Can I sell even if I\'m still living in the home during treatment?', answer: 'Yes. We can set a flexible move-out date so you have time to make alternative arrangements without rushing.' },
    { question: 'Will I get a fair price in this situation?', answer: 'We give the same fair offer we would to anyone. We don\'t take advantage of difficult situations — our reputation depends on it.' },
    { question: 'What if there are also liens from medical creditors on the property?', answer: 'Medical liens on real property get paid off at closing from proceeds, just like any other lien. We\'ve seen this before.' },
  ],
  'military-relocation': [
    { question: 'What if my orders come faster than expected?', answer: 'Call us the day you get orders. We can move as fast as 7 days. We understand military timelines don\'t negotiate.' },
    { question: 'Can I use my VA loan benefits if I sell to you?', answer: 'Your VA loan entitlement is restored after the loan is paid off at closing, which happens when we buy the home. You can use your VA benefits again on your next purchase.' },
    { question: 'What if I\'m upside down on the home after buying at the peak?', answer: 'We handle short sales and subject-to purchases for military sellers too. You may not need to come out of pocket — let\'s talk through your numbers.' },
    { question: 'Can a spouse or family member handle the sale if I\'m already deployed?', answer: 'Yes. With a power of attorney, a family member can sign on your behalf. We work with military families in exactly this situation regularly.' },
  ],
  'job-loss': [
    { question: 'Can you close before my next mortgage payment is due?', answer: 'If you call today, in most cases yes. A 7-day close means we can often get ahead of the next payment cycle.' },
    { question: 'Will this hurt my credit?', answer: 'Selling your home does not hurt your credit. If anything, eliminating the mortgage payment and catching up any arrears helps your financial picture.' },
    { question: 'What if I\'m already in arrears?', answer: 'We can often cover past-due amounts from the sale proceeds. Tell us how far behind you are and we\'ll work the math.' },
    { question: 'What if I don\'t have anywhere to go after closing?', answer: 'We can build a short leaseback period into the deal so you have time to find housing. Many sellers stay 30–60 days post-close while they get situated.' },
  ],
  'downsizing': [
    { question: 'Can I leave furniture and belongings I don\'t want?', answer: 'Yes. Take what matters and leave the rest. We handle cleanout after closing.' },
    { question: 'What if I want to close on a specific date for tax or timing reasons?', answer: 'You set the closing date. We close when you\'re ready — no pressure to rush or wait.' },
    { question: 'Is a cash offer competitive with what a Realtor would get?', answer: 'After agent commissions (5–6%), repairs, holding costs, and months of waiting, many sellers net more with us. Ask us to walk you through the math.' },
    { question: 'Can I sell if there\'s still a small mortgage balance?', answer: 'Absolutely. The remaining balance is paid off at closing from the proceeds.' },
  ],
  'underwater': [
    { question: 'What are my options if I owe more than the home is worth?', answer: 'Short sale (we negotiate with your lender), subject-to (we take over payments), or deed-in-lieu are the main paths. We\'ll tell you which makes sense for your situation.' },
    { question: 'Will I owe money after a short sale?', answer: 'In most cases no — lenders typically waive the deficiency. We\'ll be specific about what to expect based on your lender.' },
    { question: 'What is subject-to and is it legal?', answer: 'Subject-to means we buy the home and take over the mortgage payments while the loan stays in your name until we refinance or sell. It is completely legal.' },
    { question: 'What happens to my credit?', answer: 'That depends on the path. A short sale is less damaging than foreclosure. A subject-to where we make all payments on time can actually help your credit recover.' },
  ],
  'subto': [
    { question: 'What does "subject-to" mean exactly?', answer: 'We purchase your home and take over making your mortgage payments. The deed transfers to us, but the loan stays in your name until we refinance or sell the property.' },
    { question: 'What if you miss a payment — what happens to my credit?', answer: 'This is the key risk. We take it seriously. We escrow payments and have a track record of on-time payments. We\'ll put our obligations in writing and you have recourse if we default.' },
    { question: 'Why would you do this instead of getting your own loan?', answer: 'Your existing loan rate, terms, and assumable balance make it attractive for us. It also lets us help sellers who don\'t have enough equity for a traditional sale.' },
    { question: 'How do I get fully out of the loan?', answer: 'When we sell or refinance the property, your loan is paid off in full. We include a timeline for this in the purchase agreement.' },
    { question: 'How much equity do I need for a subject-to to make sense?', answer: 'Subject-to works best when there\'s some equity but not enough for a traditional sale after agent commissions and closing costs. We\'ll tell you honestly if it\'s the right fit.' },
  ],
  'free-and-clear': [
    { question: 'How does seller financing work?', answer: 'Instead of receiving the full price at closing, you act as the bank. We make monthly payments to you — principal plus interest — just like a mortgage. Secured by the property.' },
    { question: 'What if I need some cash now but want monthly payments too?', answer: 'We can structure a hybrid — a down payment at closing plus monthly payments for the balance. You choose the split.' },
    { question: 'What interest rate would I earn?', answer: 'Negotiable. Typically 5–8% depending on term. That\'s significantly better than most fixed-income alternatives with the security of real estate.' },
    { question: 'What if you stop making payments?', answer: 'You retain a lien on the property and can foreclose if we default — the same protection a bank has. The property is your collateral.' },
    { question: 'What are the tax advantages?', answer: 'An installment sale lets you spread your capital gains over the years you receive payments instead of owing tax on the full gain in the year of sale. Talk to your CPA.' },
  ],
  'capital-gains': [
    { question: 'What is an installment sale?', answer: 'An IRS-recognized sale structure where you receive payments over multiple years. You only pay capital gains tax as you receive each payment, instead of on the entire gain in year one.' },
    { question: 'Does this apply to a primary residence?', answer: 'Primary residences often qualify for up to $250,000 ($500,000 for couples) in capital gains exclusion. Installment sales are most valuable for investment properties and second homes above those thresholds.' },
    { question: 'What do I need from my CPA?', answer: 'Share the sale price, your cost basis, and the installment payment schedule with your CPA. They\'ll model the tax savings across the payment years. We can provide the numbers.' },
    { question: 'Can I do a partial installment sale?', answer: 'Yes. Receive a down payment at closing and installment payments for the rest. The down payment portion is taxable in year one; the rest is spread over time.' },
  ],
  'wont-appraise': [
    { question: 'Why can\'t my house get a conventional mortgage?', answer: 'Lenders require properties to meet minimum standards for habitability, safety, and value. Unusual properties, severe condition issues, mixed-use, or rural locations can all cause lenders to decline.' },
    { question: 'What types of properties have trouble getting financed?', answer: 'Homes under 600 sq ft, properties on small lots, mixed residential/commercial, rural acreage, homes with major structural issues, or any property an appraiser flags as "non-conforming."' },
    { question: 'Does paying cash mean you pay less?', answer: 'Not necessarily. We pay based on value. What you save is the certainty — no deal falling through because a lender got cold feet.' },
    { question: 'What about land or unusual properties?', answer: 'We buy land, unusual structures, partially built homes, and other non-standard properties. Call us — if we\'ve seen it before, we\'ll tell you.' },
  ],
  'take-over-payments': [
    { question: 'How does "taking over payments" work?', answer: 'We step into your shoes on the mortgage. The deed transfers to us at closing, and we take over making the monthly payments going forward. Your name comes off the property and you are relieved of the obligation.' },
    { question: 'Will my lender know?', answer: 'Yes. We handle the closing transparently. The lender is notified as part of the deed transfer process. We manage the relationship with your lender from that point on.' },
    { question: 'What happens to my credit?', answer: 'Once the deed transfers and we take over payments, you are no longer responsible for the loan. Future missed payments would be on us, not you. It can help your credit by removing a large monthly obligation.' },
    { question: 'Do I need equity for this to work?', answer: 'No. This approach works even if you owe more than the home is worth or have no equity at all. The goal is to relieve you of the payment burden — not to extract equity.' },
    { question: 'How fast can this close?', answer: 'Typically 7–14 days once we agree on terms. We handle all the paperwork. Your relief starts immediately after closing.' },
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
