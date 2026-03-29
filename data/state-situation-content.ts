export type StateSituationContent = {
  headline: string
  legalContext: string
  faqs: { q: string; a: string }[]
}

const genericProbate = (stateName: string): StateSituationContent => ({
  headline: `Sell a Probate Property in ${stateName} | Cash Offer in 24 Hours`,
  legalContext: `Probate in ${stateName} requires the court to appoint a personal representative (executor or administrator) before estate real property can be sold. The personal representative has fiduciary duties to all heirs and creditors. A cash sale is typically the fastest way to liquidate estate real estate and distribute proceeds to the heirs.`,
  faqs: [
    {
      q: `Can you sell a house while it's in probate in ${stateName}?`,
      a: `Yes — once the court appoints a personal representative with authority over real property, they can accept a cash offer and proceed to closing. We work directly with your estate attorney and can often close within 14–21 days of executor authorization.`,
    },
    {
      q: 'Do heirs have to agree on the sale?',
      a: 'In most cases, all beneficiaries with an interest in the property must consent or the court must approve the sale. We handle the paperwork coordination and work with your probate attorney to satisfy the court requirements.',
    },
    {
      q: 'Do we have to clean out the house before selling?',
      a: 'No. We buy probate properties exactly as-is, including all contents. Leave whatever the family does not want.',
    },
    {
      q: 'What if the estate still has debts?',
      a: 'That is very common. The sale proceeds are used to pay estate debts at closing, and the balance is distributed to heirs. We coordinate with the title company and your attorney to handle this correctly.',
    },
  ],
})

const genericTitleIssues = (stateName: string): StateSituationContent => ({
  headline: `Title Problems in ${stateName}? We Buy Houses With Liens & Title Issues`,
  legalContext: `In ${stateName}, a property with clouds on title — including unpaid liens, judgments, IRS levies, HOA super liens, or missing heir issues — cannot be transferred until those clouds are resolved. Our in-house attorneys handle curative title work at no out-of-pocket cost to you. We identify the problem, cure it, and close — you receive your net proceeds without paying legal fees upfront.`,
  faqs: [
    {
      q: `Can you buy a house with a lien on it in ${stateName}?`,
      a: 'Yes. Liens are typically paid off from the sale proceeds at closing. Our attorneys review the title commitment, negotiate with lienholders when possible, and ensure the title passes cleanly to us.',
    },
    {
      q: 'What kinds of title problems can you handle?',
      a: 'Mechanic\'s liens, judgment liens, IRS federal tax liens, HOA liens, code violation liens, open permits, missing heirs, divorce decree issues, and deeds with defects. We have handled all of these.',
    },
    {
      q: 'How long does curative title work take?',
      a: 'It depends on the complexity. Simple lien payoffs close in 7–14 days. Missing heir searches or contested claims can take 30–60 days. We give you an honest timeline on the first call.',
    },
    {
      q: 'Do I have to pay for the title attorneys?',
      a: 'No. We pay all curative title legal fees. You receive the agreed net proceeds at closing with no upfront costs.',
    },
  ],
})

const genericSurplusFunds = (stateName: string): StateSituationContent => ({
  headline: `Foreclosure Surplus Funds in ${stateName} | Get What You're Owed`,
  legalContext: `When a foreclosure sale in ${stateName} generates more than the amount owed to the lender plus costs, the excess — called surplus funds — must be held by the court or the foreclosing party for the former homeowner. Many homeowners never claim these funds because they don't know they exist or miss the claim deadline. We help you identify and recover surplus funds owed to you, and can buy your property before foreclosure to protect your equity entirely.`,
  faqs: [
    {
      q: `How do I know if I'm owed surplus funds from a foreclosure in ${stateName}?`,
      a: 'After a foreclosure sale, the foreclosing attorney or the court clerk files a notice with the surplus amount. We can research your former property\'s sale records and determine whether excess proceeds were generated.',
    },
    {
      q: 'Is there a deadline to claim surplus funds?',
      a: `Yes — every state has a claim deadline, typically ranging from 1 to 5 years after the foreclosure sale. In many states, unclaimed funds eventually transfer to the state treasury. Act quickly. Contact us and we'll determine your exact deadline in ${stateName}.`,
    },
    {
      q: 'Can you buy my house before it goes to foreclosure so I keep more equity?',
      a: 'Yes — this is often the best option. If we buy before the foreclosure auction, you avoid a foreclosure record, protect your credit, and may receive significantly more than any surplus funds would provide. We can often close within 7 days.',
    },
    {
      q: 'Do you charge fees to recover surplus funds?',
      a: 'We connect you with surplus recovery attorneys who typically work on contingency — you owe nothing upfront. Fees are taken from the recovered amount. We receive no portion of your surplus funds recovery.',
    },
  ],
})

// State-specific rich content for the 5 highest-volume states

const txProbate: StateSituationContent = {
  headline: 'Sell a Probate Property in Texas | Cash Offer in 24 Hours',
  legalContext: 'Texas probate is governed by the Texas Estates Code. Independent administration is the most common form in Texas, allowing executors to sell property without court approval at each step — this makes Texas probate faster than most states. Texas also offers a Muniment of Title procedure for simple estates with no unpaid debts, allowing direct title transfer without formal probate administration. The Texas Small Estate Affidavit is available for estates under $75,000 with no real property.',
  faqs: [
    {
      q: 'Can an executor sell a house without court approval in Texas?',
      a: 'In Texas independent administration, yes. The executor can accept an offer, sign a contract, and close without seeking court approval for each transaction. This is the most common form of probate in Texas and significantly speeds up the process.',
    },
    {
      q: 'What is Muniment of Title in Texas?',
      a: 'Muniment of Title is a simplified Texas probate procedure that transfers real property directly to heirs without appointing an administrator. It requires no debt other than real estate liens, a valid will, and it is typically completed in 2–4 months.',
    },
    {
      q: 'How fast can we close a probate sale in Texas?',
      a: 'With independent administration, 14–21 days after the executor signs the contract. With dependent administration requiring court approval, add 30–60 days for the hearing.',
    },
    {
      q: 'Do Texas probate sales require court confirmation?',
      a: 'Only in dependent administration cases. Most Texas estates use independent administration, which does not require court confirmation of a real estate sale.',
    },
  ],
}

const flProbate: StateSituationContent = {
  headline: 'Sell a Probate Property in Florida | Cash Offer in 24 Hours',
  legalContext: 'Florida probate is governed by Chapters 731–735 of the Florida Statutes. Florida has two main probate tracks: Summary Administration (for estates under $75,000 or when the decedent died more than 2 years ago) and Formal Administration. Formal Administration requires a 90-day creditor window after filing a Notice of Administration. Florida homestead property has special protections — if the property was the decedent\'s primary residence, surviving spouse or minor children have priority rights that must be addressed before a sale can close.',
  faqs: [
    {
      q: 'Can you sell a Florida homestead property in probate?',
      a: 'Yes, but homestead property in Florida has special protections. If there is a surviving spouse or minor children, their consent or court approval is required. Our team has experience with Florida homestead probate sales and will coordinate with your estate attorney.',
    },
    {
      q: 'What is Summary Administration in Florida and does it apply to my estate?',
      a: 'Summary Administration is available when the estate value (excluding homestead) is under $75,000, or if the decedent died more than 2 years ago. It is faster than Formal Administration and does not require appointment of a personal representative.',
    },
    {
      q: 'How long does Florida probate take?',
      a: 'Summary Administration can be completed in 4–8 weeks. Formal Administration takes a minimum of 5–6 months due to the 90-day creditor waiting period. A cash sale can close as soon as the personal representative has authority to sell.',
    },
    {
      q: 'Does Florida probate require court approval to sell real estate?',
      a: 'In Formal Administration, the personal representative can usually sell real estate without court approval unless the will requires it or an interested party objects. We will verify this with your probate attorney at the start of the process.',
    },
  ],
}

const caProbate: StateSituationContent = {
  headline: 'Sell a Probate Property in California | Cash Offer in 24 Hours',
  legalContext: 'California probate is supervised by the Superior Court probate division. Estates with gross assets over $184,500 (adjusted periodically) must pass through formal probate, which typically takes 12–18 months. The California Independent Administration of Estates Act (IAEA) allows many estate transactions — including real estate sales — without repeated court approval. Under IAEA, the executor gives heirs a Notice of Proposed Action with 15 days to object before proceeding. Without IAEA authority, court confirmation of the sale is required, which can add 45–90 days.',
  faqs: [
    {
      q: 'What is the California court confirmation process for probate sales?',
      a: 'Without IAEA authority, a probate sale in California must be confirmed by the court. This involves a hearing where other buyers can bid against the accepted offer. The court typically requires bids at least 5% + $500 over the original offer. With IAEA authority, court confirmation is avoided.',
    },
    {
      q: 'How long does California probate take?',
      a: 'Formal California probate typically takes 12–18 months due to creditor windows, court schedules, and required publications. However, the real estate sale itself can close relatively quickly once letters testamentary or letters of administration are issued.',
    },
    {
      q: 'What is IAEA and how does it affect a probate sale?',
      a: 'The Independent Administration of Estates Act lets California executors act without court approval for most transactions. For real estate sales under IAEA, the executor notifies heirs, waits 15 days for objections, then proceeds to close — no court confirmation hearing required.',
    },
    {
      q: 'Do California probate properties sell below market value?',
      a: 'Not necessarily with a cash buyer. Probate properties often go to auction in court-confirmation cases, which can result in competitive bidding. We offer fair market-based cash prices and do not lowball probate estates.',
    },
  ],
}

const nyProbate: StateSituationContent = {
  headline: 'Sell a Probate Property in New York | Cash Offer in 24 Hours',
  legalContext: 'New York probate is handled by the Surrogate\'s Court in the county where the decedent resided. An executor named in a will must receive Letters Testamentary, and an administrator in an intestate estate receives Letters of Administration, before they have authority to sell real property. New York has a relatively straightforward process for real estate sales once letters are issued — no court confirmation is typically required. New York City boroughs have their own Surrogate\'s Court (Bronx, Kings/Brooklyn, New York/Manhattan, Queens, Richmond/Staten Island).',
  faqs: [
    {
      q: 'What authority does an executor need to sell real estate in New York?',
      a: 'Letters Testamentary (with a will) or Letters of Administration (without a will) from the Surrogate\'s Court give the executor or administrator authority to sell estate real property. Once issued, no further court approval is typically needed for the sale.',
    },
    {
      q: 'How long does New York probate take?',
      a: 'Uncontested New York probate with a will typically takes 3–6 months. Intestate estates (no will) or contested matters can take 12 months or more. We can often close within 2–3 weeks of Letters being issued.',
    },
    {
      q: 'What happens to proceeds from a New York estate sale?',
      a: 'Sale proceeds are deposited into the estate account. The executor pays estate debts, taxes, and administration costs, then distributes the balance to beneficiaries according to the will or New York\'s intestacy laws.',
    },
    {
      q: 'Do all New York estate heirs need to agree to the sale?',
      a: 'If the executor has authority under the Letters to sell real property, they can proceed without unanimous heir consent, though the executor has fiduciary duties to all beneficiaries. Any disputes should be addressed with the probate attorney before closing.',
    },
  ],
}

const gaProbate: StateSituationContent = {
  headline: 'Sell a Probate Property in Georgia | Cash Offer in 24 Hours',
  legalContext: 'Georgia probate is handled by the Probate Court in the county where the decedent lived. Georgia allows for solemn form and common form probate. The administrator or executor must be appointed before estate real property can be sold. Georgia\'s Year\'s Support law gives a surviving spouse (and minor children) a priority claim on estate assets before other creditors, which can affect how much equity is available to heirs. Georgia also allows a simplified non-intervention administration for some estates.',
  faqs: [
    {
      q: 'What is Georgia Year\'s Support and how does it affect a probate sale?',
      a: 'Georgia\'s Year\'s Support law allows a surviving spouse (and minor children) to claim a portion of estate assets before creditors are paid. This claim must be resolved before selling estate real property. We work with your estate attorney to address Year\'s Support claims as part of the sale process.',
    },
    {
      q: 'How long does Georgia probate take?',
      a: 'Uncontested Georgia probate typically takes 3–6 months, though the process can be faster in some counties. Once the administrator has authority, we can close a real estate sale in 14–21 days.',
    },
    {
      q: 'Does a Georgia executor need court approval to sell real estate?',
      a: 'If the will grants independent authority, no court approval is needed. Otherwise, the executor may need to petition the court. Our team will confirm the requirements with your attorney at the start of the process.',
    },
    {
      q: 'Can you buy a house in a Georgia estate if there is no will?',
      a: 'Yes. When there is no will, the court appoints an administrator who then has authority over estate assets including real property. The intestate succession laws determine which heirs receive proceeds.',
    },
  ],
}

// Title issues state-specific content

const txTitleIssues: StateSituationContent = {
  headline: 'Title Problems in Texas? We Buy Houses With Liens & Judgments',
  legalContext: 'Texas has strong homestead protections that limit certain forced lien attachments to the homestead, but judgment liens, IRS tax liens, mechanic\'s liens for authorized improvements, and HOA assessment liens can all cloud title. Texas\'s Constitution exempts the homestead from forced sale for most debts, but this protection does not extend to purchase-money mortgages, home equity loans, contractor liens for work done on the home, or IRS federal tax liens. Title companies in Texas require all known liens to be paid off or released before issuing a title policy.',
  faqs: [
    { q: 'Can a judgment lien attach to my Texas homestead?', a: 'In Texas, judgment liens generally cannot be enforced against your homestead — but they can attach to the homestead as a lien when you sell. The lien must typically be paid off or the lienholder must release it before a clean title policy can be issued. We handle this at closing.' },
    { q: 'What about IRS tax liens on a Texas property?', a: 'IRS federal tax liens follow the property, not the person, and can attach to Texas homestead property despite homestead protections. We work with the IRS lien process and can subordinate or pay off the lien at closing.' },
    { q: 'How long does curative title work take in Texas?', a: 'Simple lien payoffs from sale proceeds take 7–14 days. Missing heir or contested claim situations take 30–90 days depending on complexity.' },
    { q: 'Do I need to hire my own attorney for title issues in Texas?', a: 'No. Our in-house attorneys handle all curative work at no out-of-pocket cost to you. We deduct fees from closing proceeds only.' },
  ],
}

const flTitleIssues: StateSituationContent = {
  headline: 'Title Problems in Florida? We Buy Houses With Liens & Title Issues',
  legalContext: 'Florida has a strong homestead exemption that protects the primary residence from most forced sales, but it does not prevent lien attachment for property taxes, HOA assessments (including Florida\'s super lien priority for 12 months of assessments), mechanic\'s liens, and IRS federal tax liens. Florida also requires specific notice procedures for certain lien holders before a property can be sold. Homestead status in Florida can complicate probate sales and transfers to non-family purchasers.',
  faqs: [
    { q: 'What is Florida\'s HOA super lien?', a: 'Florida Statute 720.3085 gives HOAs a "super lien" priority for up to 12 months of unpaid assessments. This lien can survive a foreclosure by a first mortgage lender. We handle HOA super liens directly at closing.' },
    { q: 'Can you buy a Florida property with open code violations?', a: 'Yes. We buy Florida properties with open code violations, unpermitted improvements, and condemnations. We handle the municipal lien and code resolution after closing.' },
    { q: 'Does Florida homestead protection prevent a sale?', a: 'No — homestead protection prevents most forced sales, but the homeowner can voluntarily sell. If there are heirs or a surviving spouse with homestead rights, their consent may be required.' },
    { q: 'How do you handle mechanic\'s liens in Florida?', a: 'Florida has a 1-year window (90 days in some cases) for mechanic\'s liens to be filed after work is completed. We review the title commitment, identify any recorded or potential mechanic\'s liens, and negotiate a resolution before closing.' },
  ],
}

const caTitleIssues: StateSituationContent = {
  headline: 'Title Problems in California? We Buy Houses With Liens & Title Issues',
  legalContext: 'California title issues commonly include IRS federal tax liens, mechanics\' liens (California has a robust lien law giving contractors direct lien rights), judgment liens recorded in the county recorder\'s office, property tax delinquencies, HOA assessment liens, and clouds from divorce decrees or ambiguous deeds. California\'s Preliminary Change of Ownership Report (PCOR) must be filed at transfer and can reveal hidden ownership disputes. California does not have an HOA super lien equivalent.',
  faqs: [
    { q: 'How do California mechanic\'s liens work?', a: 'In California, contractors, subcontractors, and material suppliers can record a mechanic\'s lien within 90 days of project completion. These liens must be paid or bonded over before a clean title can be transferred. We handle all mechanic\'s lien resolution.' },
    { q: 'Can you buy a California property with an IRS lien?', a: 'Yes. IRS federal tax liens follow the property. We work with the IRS through their Certificate of Discharge process or pay the lien from closing proceeds to obtain a clear title.' },
    { q: 'What if the property has a lis pendens filed in California?', a: 'A lis pendens (notice of pending action) clouds title until the underlying lawsuit is resolved or the lis pendens is expunged. We review the underlying action and advise on the best path to resolution before closing.' },
    { q: 'Do you handle title issues from California divorces?', a: 'Yes — divorce decrees that don\'t properly transfer title, community property issues, and quitclaim deed defects are common. Our attorneys review the divorce documents and cure any defects before closing.' },
  ],
}

const nyTitleIssues: StateSituationContent = {
  headline: 'Title Problems in New York? We Buy Houses With Liens & Title Issues',
  legalContext: 'New York title issues frequently involve judgment liens (which attach to all real property in the county where recorded), mechanic\'s liens, estate liens from decedent debts, municipality water and sewer liens, and HPD violations in New York City. New York City properties may also have HDFC, PACE, or NYC HPD regulatory agreements that restrict transfer. New York\'s expansive lien law and court system mean title curative work may require court proceedings in some cases.',
  faqs: [
    { q: 'Do New York judgment liens attach to real property automatically?', a: 'Yes — in New York, a judgment docketed in the county clerk\'s office automatically becomes a lien on all real property the debtor owns in that county. The lien must be paid off or subordinated before transfer.' },
    { q: 'What are NYC HPD violations and how do they affect a sale?', a: 'NYC HPD (Housing Preservation and Development) violations for building code issues can become liens if not corrected. We buy NYC properties with open HPD violations and handle resolution after closing.' },
    { q: 'How do mechanic\'s liens work in New York?', a: 'In New York, contractors have 8 months (4 months for single-family homeowner improvements) to file a mechanic\'s lien after the last day of work. These are filed with the county clerk and must be resolved before closing.' },
    { q: 'Can you buy a New York property with estate or tax liens?', a: 'Yes. Estate administration liens, NYS tax warrants, and IRS liens are paid from sale proceeds at closing. We work with your estate attorney and the taxing authorities to ensure clean title.' },
  ],
}

const gaTitleIssues: StateSituationContent = {
  headline: 'Title Problems in Georgia? We Buy Houses With Liens & Title Issues',
  legalContext: 'Georgia title problems typically include fi. fa. (fieri facias) judgment liens recorded in the county where the property is located, mechanic\'s and materialman\'s liens (Georgia has a 395-day preliminary notice window for contractors), IRS tax liens, delinquent property taxes (Georgia counties can sell tax deeds or tax lien certificates after 12 months of non-payment), and HOA assessment liens. Georgia\'s year\'s support law for surviving spouses can also create clouds on title in estate situations.',
  faqs: [
    { q: 'What is a fi. fa. lien in Georgia?', a: 'A fieri facias (fi. fa.) is a court-ordered writ that, when recorded in the county deed records, creates a lien on all real property the debtor owns in that county. It must be paid or released before title can be transferred.' },
    { q: 'How do Georgia mechanic\'s liens work?', a: 'Georgia contractors must file a preliminary notice within 30 days of first furnishing services or materials, and must file the lien claim within 90 days of project completion. These liens must be resolved at or before closing.' },
    { q: 'Can you buy a Georgia property with delinquent taxes?', a: 'Yes. Back property taxes are paid from sale proceeds at closing. If a tax deed has already been issued to the county or a tax sale investor, the situation is more complex — contact us immediately as there are redemption deadlines.' },
    { q: 'Do HOA liens prevent a Georgia home sale?', a: 'HOA assessment liens in Georgia can be foreclosed if not paid, but they are resolved at closing from sale proceeds. We buy properties with HOA liens and handle payoff as part of the closing.' },
  ],
}

// Surplus funds state-specific content

const txSurplusFunds: StateSituationContent = {
  headline: 'Foreclosure Surplus Funds in Texas | Get What You\'re Owed',
  legalContext: 'In Texas, non-judicial foreclosure sales (the most common type) are governed by the Texas Property Code. If a foreclosure auction generates more than the outstanding mortgage balance plus costs, the excess must be paid to junior lienholders first, then to the former homeowner. The trustee is required to account for surplus funds, and you must file a claim. There is no statutory deadline for a former homeowner to claim surplus funds in Texas, but the sooner you act, the easier recovery is. Texas also has a 2-year right of redemption for tax lien sales (Tax Code §34.21).',
  faqs: [
    { q: 'How do I claim surplus funds after a Texas foreclosure?', a: 'Contact the trustee named in the foreclosure notice or the foreclosing lender\'s attorney. Request an accounting of the sale proceeds and any surplus. If they do not respond, a surplus funds attorney can send a formal demand or file a court petition.' },
    { q: 'What is the Texas right of redemption for tax sales?', a: 'If your property was sold at a tax foreclosure sale in Texas, you have 2 years to redeem it by paying the purchaser the sale price plus 25% (or 50% in the second year) plus any taxes they paid. Contact us immediately — the clock is ticking.' },
    { q: 'Can you buy my house before the Texas foreclosure to preserve my equity?', a: 'Yes — this is the best outcome for most homeowners. If we close before the foreclosure auction, you receive the full equity above your debts rather than only the surplus (if any) left after auction costs. We can close in as little as 7 days.' },
    { q: 'Are foreclosure surplus funds companies in Texas legitimate?', a: 'Many are legitimate, but some charge excessive fees (up to 50% of recovery). Be cautious. We connect you with attorneys who work on reasonable contingency fees and give you a clear accounting of costs before you sign anything.' },
  ],
}

const flSurplusFunds: StateSituationContent = {
  headline: 'Foreclosure Surplus Funds in Florida | Get What You\'re Owed',
  legalContext: 'Florida is a judicial foreclosure state, meaning all foreclosures go through the court system. Under Florida Statute §45.032, when a foreclosure auction generates surplus funds, the clerk of court holds the money. The junior lienholder has 60 days to file a claim, and the former owner has 60 days after the junior lienholders\' deadline (or 1 year from the certificate of sale, whichever is first) to claim surplus funds. Many Florida homeowners miss this deadline. If unclaimed, funds eventually transfer to the state unclaimed property program.',
  faqs: [
    { q: 'How long do I have to claim Florida foreclosure surplus funds?', a: 'Under Florida Statute §45.032, former homeowners typically have 1 year from the certificate of sale (issued the day of the auction) to file a claim. Do not wait — contact us today to determine your exact deadline.' },
    { q: 'Where are Florida foreclosure surplus funds held?', a: 'Surplus funds from Florida court foreclosure sales are held by the clerk of the circuit court in the county where the foreclosure occurred. You (or your attorney) file a motion with that court to claim the funds.' },
    { q: 'Do I need an attorney to claim Florida foreclosure surplus funds?', a: 'While not required, an attorney is strongly recommended given court procedures and filing deadlines. We connect you with Florida surplus recovery attorneys who work on contingency — no upfront fees.' },
    { q: 'What if I missed the Florida surplus funds deadline?', a: 'After the court claim deadline, unclaimed funds go to Florida\'s Department of Financial Services under the Unclaimed Property program. You can still file a claim there, often without a court petition. Contact us — we can help regardless of where the funds are held.' },
  ],
}

const caSurplusFunds: StateSituationContent = {
  headline: 'Foreclosure Surplus Funds in California | Get What You\'re Owed',
  legalContext: 'California has both judicial and non-judicial (trustee\'s sale) foreclosures. For trustee\'s sales, California Civil Code §2924j requires the trustee to hold surplus funds for 30 days for junior lienholder claims, then pay the former homeowner. Former homeowners must submit a written claim within 30 days of the trustee\'s notice (which the trustee sends to the last known address). If not claimed, funds go to the county treasurer after the claim period. For judicial foreclosures, surplus funds are held by the court clerk.',
  faqs: [
    { q: 'How long do I have to claim California trustee\'s sale surplus funds?', a: 'California Civil Code §2924j gives former homeowners 30 days after the trustee sends written notice to file a written claim. If the trustee cannot locate you, they publish notice. Miss this window and the funds may go to the county — but you can still file with the county treasurer.' },
    { q: 'What if I never received notice of surplus funds from the California trustee?', a: 'The trustee is required to send notice to your last known address. If you moved and did not receive notice, you may still have a claim — either directly with the trustee (if within the claim period) or with the California State Controller\'s Unclaimed Property Division.' },
    { q: 'California has a 3-month right of redemption for judicial foreclosures — what does that mean?', a: 'After a judicial foreclosure sale in California, the former homeowner has a 3-month right of redemption (or 1 year in some cases) to repurchase the property by paying the purchase price plus interest and costs. This is separate from surplus funds.' },
    { q: 'Can you buy my California home before the trustee\'s sale to protect my equity?', a: 'Yes — a pre-foreclosure sale almost always results in more money for you than any surplus from a trustee\'s sale. We close fast, pay off your mortgage, and you keep all remaining equity. Call us the moment you receive a Notice of Default.' },
  ],
}

const nySurplusFunds: StateSituationContent = {
  headline: 'Foreclosure Surplus Funds in New York | Get What You\'re Owed',
  legalContext: 'New York is a judicial foreclosure state with some of the longest foreclosure timelines in the nation — often 2–5 years from default to sale. When a New York foreclosure auction generates surplus funds, they are deposited with the county clerk or referee. Former homeowners have 10 years to claim surplus funds in New York under RPAPL §1361. Despite this generous window, many homeowners never claim funds they are owed because they do not know the sale occurred or generated a surplus.',
  faqs: [
    { q: 'How long do I have to claim New York foreclosure surplus funds?', a: 'Under RPAPL §1361, former homeowners have 10 years from the referee\'s deed to claim surplus funds held by the referee or county. This is one of the longest windows in the nation — but do not wait, as locating funds and filing claims becomes harder over time.' },
    { q: 'Where are New York foreclosure surplus funds held?', a: 'Surplus funds from a judicial foreclosure sale are typically held by the referee appointed by the court, or deposited with the court. Your attorney files a motion in the foreclosure case to obtain release of the surplus.' },
    { q: 'New York foreclosures take years — does that affect my options?', a: 'Yes — because New York foreclosures are so slow, homeowners have more time to pursue a pre-foreclosure sale and protect their equity. We can often close in 2–3 weeks, which is far faster than waiting for the foreclosure to complete.' },
    { q: 'What is a New York foreclosure referee and what do they do with surplus funds?', a: 'A referee is appointed by the court to conduct the auction and hold the proceeds. After paying the foreclosing lender and other lienholders, the referee holds the surplus pending a court order directing payment to the former owner or junior lienholders.' },
  ],
}

const gaSurplusFunds: StateSituationContent = {
  headline: 'Foreclosure Surplus Funds in Georgia | Get What You\'re Owed',
  legalContext: 'Georgia uses a non-judicial foreclosure process, which is one of the fastest in the nation — as short as 37 days from default notice to auction. When a Georgia foreclosure auction generates a surplus, the foreclosing lender (through their attorney) is responsible for holding the funds. Under OCGA §44-14-161, a deficiency judgment can only be obtained if the lender goes back to court. Surplus funds in Georgia must be paid to the former owner or junior lienholders. Georgia also has a statutory right of redemption for tax lien sales of 12 months.',
  faqs: [
    { q: 'How do I claim surplus funds from a Georgia non-judicial foreclosure?', a: 'Contact the foreclosing lender\'s attorney immediately. They hold any surplus funds. Request a written accounting of the sale proceeds. If they do not respond, a Georgia surplus recovery attorney can send a demand letter or file suit.' },
    { q: 'Georgia foreclosures happen in 37 days — what are my options?', a: 'Georgia\'s fast foreclosure timeline makes acting early critical. If you receive a Notice of Sale, contact us immediately. We can often close in 7 days — before the auction — protecting your equity far better than any surplus recovery would.' },
    { q: 'What is Georgia\'s right of redemption for tax sales?', a: 'Georgia property owners have 12 months to redeem property sold at a county tax sale under OCGA §48-4-40. During redemption, you pay the purchaser the sale price plus 20% (first year) plus any taxes paid. Contact us immediately if your property was sold at a Georgia tax sale.' },
    { q: 'Do I need an attorney to recover Georgia foreclosure surplus funds?', a: 'It is strongly recommended. The foreclosing attorney holds the funds and may not proactively notify you. A surplus recovery attorney can send a demand, negotiate, or file a petition in Superior Court if needed. We connect you with Georgia attorneys who work on contingency.' },
  ],
}

// Build the full matrix

type SituationKey = 'probate' | 'title-issues' | 'surplus-funds'
type StateSlug = 'virginia' | 'texas' | 'florida' | 'georgia' | 'ohio' | 'north-carolina' | 'south-carolina' | 'illinois' | 'michigan' | 'new-york' | 'new-jersey' | 'california' | 'arizona' | 'colorado' | 'connecticut'

const STATE_NAMES: Record<StateSlug, string> = {
  virginia: 'Virginia',
  texas: 'Texas',
  florida: 'Florida',
  georgia: 'Georgia',
  ohio: 'Ohio',
  'north-carolina': 'North Carolina',
  'south-carolina': 'South Carolina',
  illinois: 'Illinois',
  michigan: 'Michigan',
  'new-york': 'New York',
  'new-jersey': 'New Jersey',
  california: 'California',
  arizona: 'Arizona',
  colorado: 'Colorado',
  connecticut: 'Connecticut',
}

export const stateSituationContent: Record<SituationKey, Record<StateSlug, StateSituationContent>> = {
  probate: {
    texas: txProbate,
    florida: flProbate,
    california: caProbate,
    'new-york': nyProbate,
    georgia: gaProbate,
    virginia: genericProbate('Virginia'),
    ohio: genericProbate('Ohio'),
    'north-carolina': genericProbate('North Carolina'),
    'south-carolina': genericProbate('South Carolina'),
    illinois: genericProbate('Illinois'),
    michigan: genericProbate('Michigan'),
    'new-jersey': genericProbate('New Jersey'),
    arizona: genericProbate('Arizona'),
    colorado: genericProbate('Colorado'),
    connecticut: genericProbate('Connecticut'),
  },
  'title-issues': {
    texas: txTitleIssues,
    florida: flTitleIssues,
    california: caTitleIssues,
    'new-york': nyTitleIssues,
    georgia: gaTitleIssues,
    virginia: genericTitleIssues('Virginia'),
    ohio: genericTitleIssues('Ohio'),
    'north-carolina': genericTitleIssues('North Carolina'),
    'south-carolina': genericTitleIssues('South Carolina'),
    illinois: genericTitleIssues('Illinois'),
    michigan: genericTitleIssues('Michigan'),
    'new-jersey': genericTitleIssues('New Jersey'),
    arizona: genericTitleIssues('Arizona'),
    colorado: genericTitleIssues('Colorado'),
    connecticut: genericTitleIssues('Connecticut'),
  },
  'surplus-funds': {
    texas: txSurplusFunds,
    florida: flSurplusFunds,
    california: caSurplusFunds,
    'new-york': nySurplusFunds,
    georgia: gaSurplusFunds,
    virginia: genericSurplusFunds('Virginia'),
    ohio: genericSurplusFunds('Ohio'),
    'north-carolina': genericSurplusFunds('North Carolina'),
    'south-carolina': genericSurplusFunds('South Carolina'),
    illinois: genericSurplusFunds('Illinois'),
    michigan: genericSurplusFunds('Michigan'),
    'new-jersey': genericSurplusFunds('New Jersey'),
    arizona: genericSurplusFunds('Arizona'),
    colorado: genericSurplusFunds('Colorado'),
    connecticut: genericSurplusFunds('Connecticut'),
  },
}

export { STATE_NAMES }
export type { SituationKey as SituationKeyMatrix, StateSlug }
