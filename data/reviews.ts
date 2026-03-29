interface Review {
  name: string
  location: string
  text: string
  rating: number
}

const stateReviews: Record<string, Review[]> = {
  virginia: [
    { name: 'Michael R.', location: 'Fairfax, VA', text: 'I needed to sell fast due to a job relocation. They gave me a fair cash offer in 24 hours and we closed in 9 days. Zero hassle.', rating: 5 },
    { name: 'Sandra T.', location: 'Richmond, VA', text: 'Inherited a property that needed a ton of work. They bought it as-is, no repairs required. Process was smooth from start to finish.', rating: 5 },
    { name: 'James W.', location: 'Hampton, VA', text: 'Was behind on payments and facing foreclosure. They moved fast and helped me avoid it. Professional and honest throughout.', rating: 5 },
    { name: 'Patricia M.', location: 'Alexandria, VA', text: 'Sold my rental property with tenants still in place. No evictions, no drama. They handled everything after closing.', rating: 5 },
    { name: 'Robert K.', location: 'Chesapeake, VA', text: 'My house had foundation issues no buyer would touch. They made a fair offer and closed in two weeks. Lifesaver.', rating: 5 },
  ],
  texas: [
    { name: 'Carlos G.', location: 'Dallas, TX', text: 'Sold my house in 10 days after a divorce. They handled everything professionally and the process was painless.', rating: 5 },
    { name: 'Jennifer L.', location: 'Houston, TX', text: 'Had a rental with code violations piling up. They bought it as-is and I walked away clean. Highly recommend.', rating: 5 },
    { name: 'Marcus D.', location: 'Austin, TX', text: 'Needed to relocate for work fast. Cash offer in 24 hours, closed in 12 days. Could not have asked for more.', rating: 5 },
    { name: 'Angela P.', location: 'San Antonio, TX', text: 'Inherited a property from my parents that needed major repairs. They took it off my hands quickly and fairly.', rating: 5 },
    { name: 'Brian H.', location: 'Fort Worth, TX', text: 'Behind on my mortgage and stressed out. They gave me a fair price and closed before the foreclosure date. Thank you.', rating: 5 },
  ],
  florida: [
    { name: 'Maria S.', location: 'Miami, FL', text: 'Hurricane damage made our home unsellable on the market. They bought it as-is and closed in two weeks.', rating: 5 },
    { name: 'David C.', location: 'Orlando, FL', text: 'Going through a tough divorce and needed to sell fast. Fair offer, fast close, zero drama. Exactly what I needed.', rating: 5 },
    { name: 'Lisa N.', location: 'Tampa, FL', text: 'Sold my mother-in-law\'s estate home without any repairs or cleanout. They handled it all. Truly helpful.', rating: 5 },
    { name: 'Thomas B.', location: 'Jacksonville, FL', text: 'Tired landlord with a problem tenant. They bought the property with the tenant in place. Smooth and professional.', rating: 5 },
    { name: 'Rachel F.', location: 'Fort Lauderdale, FL', text: 'Facing foreclosure with no options left. They closed in 8 days and saved my credit. Cannot thank them enough.', rating: 5 },
  ],
  georgia: [
    { name: 'Anthony J.', location: 'Atlanta, GA', text: 'Sold my rental property that had been sitting vacant for a year. Cash offer in a day, closed in two weeks.', rating: 5 },
    { name: 'Denise W.', location: 'Savannah, GA', text: 'Inherited a house from my aunt and had no idea what to do. They walked me through everything. Fair and fast.', rating: 5 },
    { name: 'Kevin M.', location: 'Augusta, GA', text: 'My house needed a new roof and HVAC. No buyer would touch it. They bought it as-is in 10 days.', rating: 5 },
    { name: 'Stephanie R.', location: 'Marietta, GA', text: 'Behind on payments with a lien on the property. They sorted it all out and I got cash at closing.', rating: 5 },
    { name: 'Darren T.', location: 'Sandy Springs, GA', text: 'Relocating out of state for a new job. They closed on my timeline and the whole process was seamless.', rating: 5 },
  ],
  ohio: [
    { name: 'Jason P.', location: 'Columbus, OH', text: 'Sold a house I inherited that was in terrible shape. No repairs, no cleanup. They handled everything.', rating: 5 },
    { name: 'Michelle B.', location: 'Cleveland, OH', text: 'Facing foreclosure and running out of time. They closed in 9 days and helped me protect my credit.', rating: 5 },
    { name: 'Gregory L.', location: 'Cincinnati, OH', text: 'Tired landlord done with midnight maintenance calls. They bought my rental with tenants in place. Relief.', rating: 5 },
    { name: 'Tanya H.', location: 'Akron, OH', text: 'Needed to sell during a divorce. One fair offer for both of us. Clean, fast, professional.', rating: 5 },
    { name: 'William S.', location: 'Toledo, OH', text: 'House had mold and water damage. They made an honest offer and closed quickly. No hassle at all.', rating: 5 },
  ],
  'north-carolina': [
    { name: 'Amanda K.', location: 'Charlotte, NC', text: 'Sold my parents\' home after they moved to assisted living. No repairs, no showings. They made it easy.', rating: 5 },
    { name: 'Derek J.', location: 'Raleigh, NC', text: 'Job transfer gave me 30 days to move. They closed in 14 days and I was free to relocate on time.', rating: 5 },
    { name: 'Crystal M.', location: 'Greensboro, NC', text: 'Had a vacant property costing me money every month. They gave me a fair offer and closed fast.', rating: 5 },
    { name: 'Nathan R.', location: 'Durham, NC', text: 'Behind on property taxes for two years. They bought the house, paid off the taxes, and I walked away with cash.', rating: 5 },
    { name: 'Brenda W.', location: 'Winston-Salem, NC', text: 'Fire-damaged house that no agent would list. They bought it as-is. Professional from start to finish.', rating: 5 },
  ],
  'south-carolina': [
    { name: 'Travis D.', location: 'Columbia, SC', text: 'Inherited a house 500 miles away. They handled everything locally and I signed remotely. Could not be easier.', rating: 5 },
    { name: 'Heather L.', location: 'Charleston, SC', text: 'Going through divorce and needed the house sold fast. Fair offer, no drama, closed in two weeks.', rating: 5 },
    { name: 'Aaron B.', location: 'Greenville, SC', text: 'My rental had major foundation issues. They bought it as-is and I did not have to spend a dime on repairs.', rating: 5 },
    { name: 'Nicole P.', location: 'Spartanburg, SC', text: 'Facing foreclosure with no hope. They closed before my auction date and saved my credit. Truly grateful.', rating: 5 },
    { name: 'Ryan G.', location: 'Rock Hill, SC', text: 'Sold a hoarder house that had been in my family for decades. No cleanup required. They took it all.', rating: 5 },
  ],
  illinois: [
    { name: 'Michael T.', location: 'Chicago, IL', text: 'Had a property with code violations the city was fining me for. They bought it fast and the fines stopped.', rating: 5 },
    { name: 'Laura K.', location: 'Naperville, IL', text: 'Sold my mother\'s estate home in 12 days. No cleanout, no repairs. They made a painful process easier.', rating: 5 },
    { name: 'Steven R.', location: 'Rockford, IL', text: 'Behind on mortgage and stressed. They gave me a fair offer and closed before foreclosure hit. Thank you.', rating: 5 },
    { name: 'Karen W.', location: 'Aurora, IL', text: 'Tired landlord with three rentals. They bought all three in one transaction. Clean and professional.', rating: 5 },
    { name: 'Christopher J.', location: 'Joliet, IL', text: 'House sat on the market for 6 months with an agent. They bought it in 10 days after I gave up on listing.', rating: 5 },
  ],
  michigan: [
    { name: 'Daniel F.', location: 'Detroit, MI', text: 'Vacant house that was becoming a liability. They bought it fast and I stopped paying insurance and taxes.', rating: 5 },
    { name: 'Sarah M.', location: 'Grand Rapids, MI', text: 'Needed to sell during divorce. They were fair, professional, and closed on our court-ordered timeline.', rating: 5 },
    { name: 'Andre W.', location: 'Lansing, MI', text: 'Inherited a property in rough shape. They bought it as-is, no questions asked. Smooth process.', rating: 5 },
    { name: 'Emily D.', location: 'Ann Arbor, MI', text: 'Relocated for work and needed to sell immediately. Cash offer in 24 hours, closed in 11 days. Impressed.', rating: 5 },
    { name: 'Paul H.', location: 'Sterling Heights, MI', text: 'Property had water damage and mold. No buyer would touch it. They made a fair offer and closed quickly.', rating: 5 },
  ],
  'new-york': [
    { name: 'Anthony V.', location: 'New York City, NY', text: 'Sold a brownstone that needed everything. They bought it as-is and I avoided months of renovation headaches.', rating: 5 },
    { name: 'Linda S.', location: 'Buffalo, NY', text: 'Facing foreclosure in winter. They closed in 8 days and I kept my dignity. Professional throughout.', rating: 5 },
    { name: 'Joseph C.', location: 'Rochester, NY', text: 'Inherited a duplex from my uncle. They handled the probate sale smoothly and I got cash in two weeks.', rating: 5 },
    { name: 'Diane M.', location: 'Albany, NY', text: 'Tired landlord with a property I could not manage remotely. They bought it with the tenant in place.', rating: 5 },
    { name: 'Frank R.', location: 'Syracuse, NY', text: 'Behind on taxes for three years. They paid everything off at closing and I still walked away with money.', rating: 5 },
  ],
  'new-jersey': [
    { name: 'Richard A.', location: 'Newark, NJ', text: 'Sold a fire-damaged property no one else would buy. Fair cash offer, closed in 12 days. Very grateful.', rating: 5 },
    { name: 'Victoria T.', location: 'Jersey City, NJ', text: 'Going through a difficult divorce. They gave us one fair number and we split it clean. No drama.', rating: 5 },
    { name: 'George P.', location: 'Paterson, NJ', text: 'Had a property with an HOA lien and back taxes. They resolved everything at closing. Truly professional.', rating: 5 },
    { name: 'Susan K.', location: 'Trenton, NJ', text: 'My rental had been vacant for months costing me money. They bought it fast and I stopped the bleeding.', rating: 5 },
    { name: 'Albert D.', location: 'Camden, NJ', text: 'Condemned property the city wanted torn down. They bought it, handled the city, and I got cash. Amazing.', rating: 5 },
  ],
  california: [
    { name: 'Jessica L.', location: 'Los Angeles, CA', text: 'Sold a rental with a problem tenant. They bought it as-is with the tenant in place. No eviction needed.', rating: 5 },
    { name: 'Raymond H.', location: 'San Diego, CA', text: 'Inherited a house from my grandmother. They handled everything — probate, title, closing. All I did was sign.', rating: 5 },
    { name: 'Christina W.', location: 'San Francisco, CA', text: 'Needed to sell fast for a cross-country move. Cash offer same day, closed in 10 days. Exceeded expectations.', rating: 5 },
    { name: 'Mark S.', location: 'Sacramento, CA', text: 'Behind on mortgage with no way to catch up. They closed before foreclosure and I walked away with equity.', rating: 5 },
    { name: 'Diana R.', location: 'Fresno, CA', text: 'House had foundation and termite damage. No retail buyer would make an offer. They bought it in a week.', rating: 5 },
  ],
  arizona: [
    { name: 'Roberto M.', location: 'Phoenix, AZ', text: 'Sold a property going through probate. They worked with my attorney and made the process painless.', rating: 5 },
    { name: 'Catherine B.', location: 'Tucson, AZ', text: 'Facing foreclosure after a medical emergency. They closed in 9 days and I kept some equity. Grateful.', rating: 5 },
    { name: 'Tyler J.', location: 'Mesa, AZ', text: 'Vacant house costing me thousands a year. They bought it quickly and I stopped the financial drain.', rating: 5 },
    { name: 'Monica G.', location: 'Chandler, AZ', text: 'Going through divorce and needed the house gone. One offer, one closing, both parties satisfied.', rating: 5 },
    { name: 'Keith W.', location: 'Scottsdale, AZ', text: 'Tired of being a landlord. They bought my rental property and I did not have to evict anyone. Smooth.', rating: 5 },
  ],
  colorado: [
    { name: 'Justin F.', location: 'Denver, CO', text: 'Relocated for work and could not afford two mortgages. They closed in 11 days. Huge weight off my shoulders.', rating: 5 },
    { name: 'Megan R.', location: 'Colorado Springs, CO', text: 'Inherited a mountain cabin that needed major work. They bought it as-is. No repairs, no hassle.', rating: 5 },
    { name: 'Patrick D.', location: 'Aurora, CO', text: 'Behind on payments with no way out. They gave me a fair cash offer and closed before foreclosure.', rating: 5 },
    { name: 'Ashley T.', location: 'Fort Collins, CO', text: 'Sold a rental with water damage and a difficult tenant. They handled everything. Professional and fair.', rating: 5 },
    { name: 'Brandon K.', location: 'Lakewood, CO', text: 'My house sat on the market for 4 months. They bought it in under two weeks after I pulled the listing.', rating: 5 },
  ],
  connecticut: [
    { name: 'Edward L.', location: 'Hartford, CT', text: 'Sold a multifamily property that needed too much work. They made a fair offer and closed fast. Relieved.', rating: 5 },
    { name: 'Donna M.', location: 'Bridgeport, CT', text: 'Facing foreclosure and running out of options. They closed in 10 days and I avoided the worst outcome.', rating: 5 },
    { name: 'Scott B.', location: 'New Haven, CT', text: 'Inherited a house from my father and lived out of state. They handled everything locally. Great experience.', rating: 5 },
    { name: 'Janet H.', location: 'Stamford, CT', text: 'Divorce required a quick sale. They gave us a fair number and closed on our attorney\'s timeline.', rating: 5 },
    { name: 'Timothy R.', location: 'Waterbury, CT', text: 'Property had liens and back taxes. They resolved everything at closing and I walked away with cash.', rating: 5 },
  ],
}

/** Default reviews for national or unknown slugs */
const nationalReviews: Review[] = [
  { name: 'Michael R.', location: 'Fairfax, VA', text: 'I needed to sell fast due to a job relocation. They gave me a fair cash offer in 24 hours and we closed in 9 days. Zero hassle.', rating: 5 },
  { name: 'Carlos G.', location: 'Dallas, TX', text: 'Sold my house in 10 days after a divorce. They handled everything professionally and the process was painless.', rating: 5 },
  { name: 'Maria S.', location: 'Miami, FL', text: 'Hurricane damage made our home unsellable on the market. They bought it as-is and closed in two weeks.', rating: 5 },
  { name: 'Anthony J.', location: 'Atlanta, GA', text: 'Sold my rental property that had been sitting vacant for a year. Cash offer in a day, closed in two weeks.', rating: 5 },
  { name: 'Amanda K.', location: 'Charlotte, NC', text: 'Sold my parents\' home after they moved to assisted living. No repairs, no showings. They made it easy.', rating: 5 },
]

/**
 * Returns reviews for a given state slug.
 * Falls back to a curated national set for unknown slugs.
 */
export function getReviewsForState(stateSlug: string): Review[] {
  return stateReviews[stateSlug] ?? nationalReviews
}

/**
 * Picks a deterministic-but-varying set of reviews per build.
 * Uses a simple seed from the state slug to shuffle, then takes the first `count`.
 */
export function pickReviews(stateSlug: string, count: number = 3): Review[] {
  const pool = getReviewsForState(stateSlug)
  if (pool.length <= count) return pool

  // Simple deterministic shuffle seeded by slug character codes
  const seed = stateSlug.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (seed * (i + 1) + i) % (i + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, count)
}
