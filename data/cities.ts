export interface CityFaq {
  q: string
  a: string
}

export interface City {
  name: string
  slug: string
  county: string
  region: 'northern-va' | 'richmond' | 'hampton-roads' | 'central-va'
  nearbySlug?: string[]
  faqs?: CityFaq[]
}

export const cities: City[] = [
  // Northern Virginia — Fairfax County
  { name: 'Fairfax', slug: 'fairfax', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['vienna', 'annandale', 'centreville'], faqs: [
    { q: 'How fast can you buy my house in Fairfax?', a: 'We can close on your Fairfax home in as few as 7 days, or on your timeline — whatever works best for you.' },
    { q: 'Do you buy houses in any condition in Fairfax County?', a: 'Yes — we buy homes in any condition throughout Fairfax County, including properties that need major repairs, have code violations, or are facing foreclosure.' },
    { q: 'Will you buy my Fairfax home if it has a tenant?', a: 'Absolutely. We regularly purchase tenant-occupied properties in Fairfax County and handle the transition so you don\'t have to.' },
    { q: 'Do I need a real estate agent to sell my house in Fairfax?', a: 'No. We buy directly from homeowners in Fairfax with no agents, no commissions, and no listing fees — keeping more money in your pocket.' },
    { q: 'What types of Fairfax properties do you buy?', a: 'We buy single-family homes, townhouses, condos, and duplexes throughout Fairfax City and Fairfax County, regardless of condition or situation.' },
  ] },
  { name: 'Vienna', slug: 'vienna', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['fairfax', 'mclean', 'reston'] },
  { name: 'Annandale', slug: 'annandale', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['fairfax', 'springfield', 'falls-church'] },
  { name: 'Springfield', slug: 'springfield', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['annandale', 'burke', 'fairfax'] },
  { name: 'Burke', slug: 'burke', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['springfield', 'fairfax'] },
  { name: 'Centreville', slug: 'centreville', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['chantilly', 'fairfax', 'manassas'] },
  { name: 'Chantilly', slug: 'chantilly', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['centreville', 'ashburn', 'sterling'] },
  { name: 'Reston', slug: 'reston', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['herndon', 'vienna', 'sterling'], faqs: [
    { q: 'Can you buy my Reston townhome or condo quickly?', a: 'Yes — we purchase Reston townhomes, condos, and single-family homes fast, often closing within 7–14 days regardless of condition.' },
    { q: 'Do you handle Reston Association (RA) compliance issues?', a: 'We\'re familiar with Reston Association rules and can buy your property even if there are outstanding compliance issues or HOA violations.' },
    { q: 'Will you buy my Reston house if I\'m relocating for work?', a: 'Absolutely. We specialize in fast closings for Reston homeowners relocating — we can often match your move-out date perfectly.' },
    { q: 'How do you determine your cash offer for my Reston home?', a: 'We look at recent Reston comparable sales, the property\'s condition, and repair costs to give you the highest fair cash offer we can.' },
    { q: 'Are there any hidden fees when selling my Reston home to you?', a: 'None whatsoever. We pay all closing costs in Reston transactions and there are no agent commissions or hidden charges.' },
  ] },
  { name: 'Herndon', slug: 'herndon', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['reston', 'sterling', 'chantilly'], faqs: [
    { q: 'How quickly can you close on my Herndon home?', a: 'We can close your Herndon home sale in as little as 7 days — perfect if you\'re relocating for a tech job or need to move fast.' },
    { q: 'Do you buy older Herndon homes that need updating?', a: 'Yes. We buy Herndon homes in any condition — whether they need cosmetic updates or full renovation, no repairs are ever required from you.' },
    { q: 'Can you help if I\'m behind on my Herndon mortgage?', a: 'Yes. We work with Herndon homeowners facing foreclosure and can often close fast enough to protect your credit and put cash in your hands.' },
    { q: 'Do you buy Herndon properties with unpermitted additions?', a: 'We buy Herndon homes as-is, including those with unpermitted work. You won\'t need to retroactively permit anything before closing.' },
    { q: 'Is there any obligation when I request a cash offer for my Herndon house?', a: 'None. Our cash offer for your Herndon home is completely free and you\'re under no obligation to accept it.' },
  ] },
  { name: 'McLean', slug: 'mclean', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['vienna', 'falls-church', 'arlington'] },
  { name: 'Falls Church', slug: 'falls-church', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['mclean', 'annandale', 'arlington'] },
  // Northern Virginia — Arlington
  { name: 'Arlington', slug: 'arlington', county: 'Arlington County', region: 'northern-va', nearbySlug: ['falls-church', 'alexandria', 'mclean'], faqs: [
    { q: 'How fast can you close on my Arlington home?', a: 'We close Arlington purchases in as few as 7 days. If you need more time to move out, we can adjust the timeline to suit you.' },
    { q: 'Do you buy condos and high-rise units in Arlington?', a: 'Yes — we buy condos, townhomes, and single-family homes throughout Arlington County, including units in Rosslyn, Ballston, and Clarendon high-rises.' },
    { q: 'My Arlington home needs significant work — will you still buy it?', a: 'Absolutely. We buy Arlington properties in any condition, from minor cosmetic issues to homes needing complete renovation. No repairs required.' },
    { q: 'Can you buy my Arlington home if I have little equity?', a: 'Yes. We work with Arlington homeowners in various equity situations and can sometimes find creative solutions even for low-equity properties.' },
    { q: 'What makes you different from iBuyers like Opendoor in Arlington?', a: 'Unlike iBuyers, we\'re local Arlington buyers who charge zero fees or commissions and can close on a flexible timeline that works for you.' },
  ] },
  // Northern Virginia — Alexandria
  { name: 'Alexandria', slug: 'alexandria', county: 'City of Alexandria', region: 'northern-va', nearbySlug: ['arlington', 'springfield'], faqs: [
    { q: 'How quickly can you close on my Alexandria house?', a: 'We can close on your Alexandria home in as little as 7 days — ideal if you need to move fast or avoid foreclosure.' },
    { q: 'Do you buy historic homes in Old Town Alexandria?', a: 'Yes. We purchase all Alexandria properties including historic Old Town homes, regardless of their condition, age, or any renovation restrictions.' },
    { q: 'What if my Alexandria condo has HOA issues or unpaid dues?', a: 'We can still buy your Alexandria condo. We\'re experienced with HOA complications and can often work out a solution that gets you cash fast.' },
    { q: 'Are there any fees when selling my house to you in Alexandria?', a: 'None. We cover all closing costs and charge zero commissions. The offer we make is exactly what you walk away with.' },
    { q: 'Can you buy my Alexandria house if I\'m going through a divorce?', a: 'Yes — we work with homeowners in Alexandria going through divorce and can close quickly on a timeline that fits your legal process.' },
  ] },
  // Northern Virginia — Loudoun County
  { name: 'Ashburn', slug: 'ashburn', county: 'Loudoun County', region: 'northern-va', nearbySlug: ['sterling', 'leesburg', 'chantilly'] },
  { name: 'Sterling', slug: 'sterling', county: 'Loudoun County', region: 'northern-va', nearbySlug: ['ashburn', 'herndon', 'leesburg'] },
  { name: 'Leesburg', slug: 'leesburg', county: 'Loudoun County', region: 'northern-va', nearbySlug: ['ashburn', 'sterling'] },
  // Northern Virginia — Prince William County
  { name: 'Manassas', slug: 'manassas', county: 'Prince William County', region: 'northern-va', nearbySlug: ['woodbridge', 'centreville'], faqs: [
    { q: 'How quickly can you close on my Manassas home?', a: 'We can close on your Manassas or Manassas Park home in as little as 7 days, or on the schedule that works best for you.' },
    { q: 'Do you buy inherited properties in Manassas?', a: 'Yes. We regularly purchase inherited homes in Manassas and can work with estates, probate situations, and multiple heirs to simplify the process.' },
    { q: 'Will you buy my Manassas house if it\'s been a rental and has damage?', a: 'Absolutely. We buy rental properties and landlord-owned homes in Manassas in any condition — tenant damage, deferred maintenance, and all.' },
    { q: 'Do I need to clean out my Manassas house before selling?', a: 'No. Leave whatever you don\'t want. We handle cleanout after closing on all Manassas properties we purchase.' },
    { q: 'Is a cash offer for my Manassas home really free with no obligation?', a: 'Yes. Requesting a cash offer for your Manassas home costs nothing and you\'re never obligated to accept.' },
  ] },
  { name: 'Woodbridge', slug: 'woodbridge', county: 'Prince William County', region: 'northern-va', nearbySlug: ['manassas', 'dale-city'], faqs: [
    { q: 'How fast can you buy my house in Woodbridge?', a: 'We can close on your Woodbridge home in as few as 7 days. We work around your schedule so the timeline fits your needs.' },
    { q: 'Do you buy Woodbridge homes near the commuter lots or Potomac Mills area?', a: 'Yes — we buy homes throughout Woodbridge, including neighborhoods near Potomac Mills, Lake Ridge, and the VRE station areas.' },
    { q: 'Will you buy my Woodbridge home if it has water damage or mold?', a: 'Absolutely. We purchase Woodbridge properties with water damage, mold, foundation issues, or any other problems. No remediation needed.' },
    { q: 'Can you buy my Woodbridge home if I\'m in pre-foreclosure?', a: 'Yes. We move quickly and have helped many Woodbridge homeowners in pre-foreclosure sell before it impacts their credit.' },
    { q: 'Do you charge fees or commissions in Woodbridge?', a: 'No fees, no commissions, ever. We pay all closing costs on Woodbridge purchases — what we offer is what you receive.' },
  ] },
  { name: 'Dale City', slug: 'dale-city', county: 'Prince William County', region: 'northern-va', nearbySlug: ['woodbridge', 'manassas'] },
  { name: 'Dumfries', slug: 'dumfries', county: 'Prince William County', region: 'northern-va', nearbySlug: ['woodbridge', 'dale-city'] },
  // Richmond Region
  { name: 'Richmond', slug: 'richmond', county: 'City of Richmond', region: 'richmond', nearbySlug: ['henrico', 'chesterfield', 'colonial-heights'], faqs: [
    { q: 'How fast can you close on my Richmond home?', a: 'We can close on your Richmond home in as few as 7 days. Whether you\'re in The Fan, Church Hill, or Southside, we move on your timeline.' },
    { q: 'Do you buy Richmond homes in up-and-coming neighborhoods like Scott\'s Addition?', a: 'Yes — we buy houses throughout Richmond, from established neighborhoods like Carytown to transitional areas like Manchester and Fulton Hill.' },
    { q: 'Can you help me sell my Richmond rental property fast?', a: 'Absolutely. We buy Richmond rental properties — occupied or vacant — quickly and handle all the logistics so you can cash out and move on.' },
    { q: 'Do you buy Richmond homes with structural issues?', a: 'Yes. We purchase Richmond homes with foundation problems, roof damage, structural issues, and anything else — no repairs required from you.' },
    { q: 'Are there fees or commissions when selling my Richmond house to you?', a: 'Zero fees, zero commissions. We pay all closing costs on every Richmond home we buy. Your offer is your payout.' },
  ] },
  { name: 'Henrico', slug: 'henrico', county: 'Henrico County', region: 'richmond', nearbySlug: ['richmond', 'glen-allen', 'mechanicsville'], faqs: [
    { q: 'How fast can you close on my Henrico County home?', a: 'We can close on your Henrico home in as little as 7 days — from Short Pump to Highland Springs, we move quickly throughout the county.' },
    { q: 'Do you buy Henrico homes near Willow Lawn or Regency Square?', a: 'Yes, we buy homes in all Henrico County neighborhoods including those near West Broad Street, Tuckahoe, and Innsbrook.' },
    { q: 'Will you buy my Henrico house if the roof needs replacing?', a: 'Absolutely. Roofs, HVAC, plumbing, electrical — we buy Henrico homes needing any type of repair without asking you to fix anything first.' },
    { q: 'Can you help if I\'m selling a Henrico home after a death in the family?', a: 'Yes. We handle estate and probate sales in Henrico County with sensitivity and efficiency, making the process as easy as possible for your family.' },
    { q: 'Are your Henrico cash offers competitive with the open market?', a: 'Our Henrico offers reflect fair market value minus repair costs — you avoid months of uncertainty, repairs, and 3–6% in commissions.' },
  ] },
  { name: 'Chesterfield', slug: 'chesterfield', county: 'Chesterfield County', region: 'richmond', nearbySlug: ['richmond', 'midlothian', 'colonial-heights'], faqs: [
    { q: 'How quickly can you close on my Chesterfield County home?', a: 'We can close on your Chesterfield home in as little as 7 days, whether you\'re in Midlothian, Chester, or any other part of the county.' },
    { q: 'Do you buy homes in Chesterfield County\'s newer subdivisions?', a: 'Yes — we buy homes throughout Chesterfield County, from newer subdivisions near Midlothian Turnpike to older neighborhoods closer to Richmond.' },
    { q: 'Will you buy my Chesterfield home if I\'m behind on HOA dues?', a: 'Yes. We handle outstanding HOA dues as part of the closing process on Chesterfield properties, so you don\'t need to pay them out of pocket first.' },
    { q: 'Can you buy my Chesterfield home if I\'m going through bankruptcy?', a: 'We work with Chesterfield homeowners in bankruptcy and can coordinate with your attorney to ensure the sale complies with the bankruptcy process.' },
    { q: 'Do I have to make repairs before selling my Chesterfield house?', a: 'Not at all. We buy Chesterfield homes strictly as-is — whatever condition the property is in, we take it off your hands without any repairs.' },
  ] },
  { name: 'Midlothian', slug: 'midlothian', county: 'Chesterfield County', region: 'richmond', nearbySlug: ['chesterfield', 'richmond'] },
  { name: 'Glen Allen', slug: 'glen-allen', county: 'Henrico County', region: 'richmond', nearbySlug: ['henrico', 'richmond', 'mechanicsville'] },
  { name: 'Mechanicsville', slug: 'mechanicsville', county: 'Hanover County', region: 'richmond', nearbySlug: ['glen-allen', 'henrico', 'richmond'] },
  { name: 'Colonial Heights', slug: 'colonial-heights', county: 'Colonial Heights', region: 'richmond', nearbySlug: ['chesterfield', 'richmond', 'petersburg'] },
  { name: 'Petersburg', slug: 'petersburg', county: 'City of Petersburg', region: 'richmond', nearbySlug: ['colonial-heights', 'chesterfield'] },
  { name: 'Hopewell', slug: 'hopewell', county: 'City of Hopewell', region: 'richmond', nearbySlug: ['colonial-heights', 'petersburg'] },
  { name: 'Short Pump', slug: 'short-pump', county: 'Henrico County', region: 'richmond', nearbySlug: ['glen-allen', 'henrico'] },
  // Hampton Roads
  { name: 'Virginia Beach', slug: 'virginia-beach', county: 'City of Virginia Beach', region: 'hampton-roads', nearbySlug: ['norfolk', 'chesapeake'], faqs: [
    { q: 'How fast can you buy my Virginia Beach house?', a: 'We can close on your Virginia Beach home in as little as 7 days — from the Oceanfront to Sandbridge to the Green Run area.' },
    { q: 'Do you buy Virginia Beach homes near the water or in flood zones?', a: 'Yes. We buy oceanfront, bay-front, and flood-zone properties in Virginia Beach as-is, regardless of flood insurance status or FEMA map designations.' },
    { q: 'Will you buy my Virginia Beach home if I\'m a military seller with PCS orders?', a: 'Absolutely. We close fast to fit your PCS timeline and have helped many Virginia Beach military families at NAS Oceana and JEB Little Creek.' },
    { q: 'Do you buy vacation rental homes and condos in Virginia Beach?', a: 'Yes — we buy condos, vacation rentals, and investment properties throughout Virginia Beach, occupied or vacant, in any condition.' },
    { q: 'What neighborhoods in Virginia Beach do you buy in?', a: 'All of them — from the Oceanfront resort area and Hilltop to Kempsville, Great Neck, Centerville, and Pungo. If it\'s in Virginia Beach, we buy it.' },
  ] },
  { name: 'Norfolk', slug: 'norfolk', county: 'City of Norfolk', region: 'hampton-roads', nearbySlug: ['virginia-beach', 'chesapeake', 'portsmouth'], faqs: [
    { q: 'How quickly can you close on my Norfolk home?', a: 'We close Norfolk homes in as few as 7 days. If you\'re PCS\'ing or need fast cash, we work around your military or civilian timeline.' },
    { q: 'Do you buy Norfolk homes with flooding or hurricane damage?', a: 'Yes. We buy Norfolk properties with flood damage, storm damage, and water intrusion — as-is, no remediation required from you.' },
    { q: 'Will you buy my Norfolk home if I\'m facing a PCS move?', a: 'Absolutely. We work with military families at NAS Norfolk, NSB Little Creek, and all Norfolk bases to close fast around PCS orders.' },
    { q: 'Do you buy Ghent or Ocean View homes in Norfolk?', a: 'Yes — we buy homes in every Norfolk neighborhood, from Ghent and Larchmont to Ocean View, Granby, and Wards Corner.' },
    { q: 'Are there commissions or fees when selling my Norfolk house?', a: 'None. We pay all closing costs and charge zero commissions. Every Norfolk homeowner keeps the full amount of our offer.' },
  ] },
  { name: 'Chesapeake', slug: 'chesapeake', county: 'City of Chesapeake', region: 'hampton-roads', nearbySlug: ['norfolk', 'suffolk', 'virginia-beach'], faqs: [
    { q: 'How quickly can you close on my Chesapeake home?', a: 'We close Chesapeake homes in as few as 7 days — whether you\'re in Greenbrier, Deep Creek, Western Branch, or Great Bridge.' },
    { q: 'Do you buy Chesapeake homes in low-lying or flood-prone areas?', a: 'Yes. We purchase Chesapeake properties in flood-prone areas as-is. We understand the local terrain and price our offers accordingly.' },
    { q: 'Will you buy my Chesapeake house if it needs a new septic system?', a: 'Absolutely. Septic issues, well problems, and rural property challenges are no obstacle — we buy Chesapeake homes in any condition.' },
    { q: 'Can you buy my large Chesapeake property on acreage?', a: 'Yes. We buy all types of Chesapeake properties, including homes on large lots and rural acreage in the southern part of the city.' },
    { q: 'Is the cash offer process for my Chesapeake home really that simple?', a: 'Yes — you request an offer, we visit the property, we give you a no-obligation cash offer, and you choose your closing date. That\'s it.' },
  ] },
  { name: 'Hampton', slug: 'hampton', county: 'City of Hampton', region: 'hampton-roads', nearbySlug: ['newport-news', 'york-county'], faqs: [
    { q: 'How fast can you buy my Hampton, VA house?', a: 'We can close on your Hampton home in as little as 7 days — ideal for military families at Langley AFB or anyone needing to move quickly.' },
    { q: 'Do you buy older Hampton homes in historic areas?', a: 'Yes. We buy older Hampton homes in Phoebus, Wythe, and other historic districts regardless of their condition or needed repairs.' },
    { q: 'Will you buy my Hampton home if I\'m on a fixed income and can\'t make repairs?', a: 'Absolutely. We buy Hampton homes as-is so you never have to spend a dime on repairs. You get cash without lifting a hammer.' },
    { q: 'Can you buy my Hampton house fast if I have Langley PCS orders?', a: 'Yes. We\'ve helped many Langley-Eustis military families sell their Hampton homes quickly to meet PCS reporting dates.' },
    { q: 'What types of Hampton properties do you purchase?', a: 'We buy single-family homes, townhomes, duplexes, and small multi-family properties throughout Hampton in any condition.' },
  ] },
  { name: 'Newport News', slug: 'newport-news', county: 'City of Newport News', region: 'hampton-roads', nearbySlug: ['hampton', 'williamsburg'], faqs: [
    { q: 'How quickly can you close on my Newport News home?', a: 'We close Newport News homes in as few as 7 days. From Denbigh to Hidenwood to the Shipyard area, we move fast on your schedule.' },
    { q: 'Do you buy Newport News homes near Fort Eustis or the Shipyard?', a: 'Yes — we buy homes throughout Newport News including neighborhoods near Joint Base Langley-Eustis and the Newport News Shipbuilding area.' },
    { q: 'Will you buy my Newport News house if it has code violations?', a: 'Yes. We purchase Newport News properties with code violations, deferred maintenance, and structural issues — all as-is with no repairs needed.' },
    { q: 'Can you buy my Newport News home if I\'m going through foreclosure?', a: 'We move quickly to help Newport News homeowners in foreclosure sell before the auction date, preserving their credit and getting them cash.' },
    { q: 'Is there any cost to get a cash offer for my Newport News home?', a: 'No cost, no obligation. We assess your Newport News property and provide a cash offer completely free of charge.' },
  ] },
  { name: 'Suffolk', slug: 'suffolk', county: 'City of Suffolk', region: 'hampton-roads', nearbySlug: ['chesapeake', 'norfolk'] },
  { name: 'Portsmouth', slug: 'portsmouth', county: 'City of Portsmouth', region: 'hampton-roads', nearbySlug: ['norfolk', 'chesapeake'] },
  { name: 'Williamsburg', slug: 'williamsburg', county: 'City of Williamsburg', region: 'hampton-roads', nearbySlug: ['newport-news', 'york-county'] },
  { name: 'York County', slug: 'york-county', county: 'York County', region: 'hampton-roads', nearbySlug: ['williamsburg', 'newport-news'] },
  { name: 'James City County', slug: 'james-city-county', county: 'James City County', region: 'hampton-roads', nearbySlug: ['williamsburg', 'york-county'] },
  // Additional Northern VA
  { name: 'Stafford', slug: 'stafford', county: 'Stafford County', region: 'northern-va', nearbySlug: ['fredericksburg', 'woodbridge'] },
  { name: 'Fredericksburg', slug: 'fredericksburg', county: 'City of Fredericksburg', region: 'northern-va', nearbySlug: ['stafford', 'spotsylvania'] },
  { name: 'Spotsylvania', slug: 'spotsylvania', county: 'Spotsylvania County', region: 'northern-va', nearbySlug: ['fredericksburg', 'stafford'] },
  { name: 'Gainesville', slug: 'gainesville', county: 'Prince William County', region: 'northern-va', nearbySlug: ['manassas', 'haymarket'] },
  { name: 'Haymarket', slug: 'haymarket', county: 'Prince William County', region: 'northern-va', nearbySlug: ['gainesville', 'manassas'] },
  { name: 'Lake Ridge', slug: 'lake-ridge', county: 'Prince William County', region: 'northern-va', nearbySlug: ['woodbridge', 'dale-city'] },
  { name: 'Occoquan', slug: 'occoquan', county: 'Prince William County', region: 'northern-va', nearbySlug: ['woodbridge', 'lake-ridge'] },
  { name: 'Lorton', slug: 'lorton', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['springfield', 'woodbridge'] },
  { name: 'Oakton', slug: 'oakton', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['vienna', 'fairfax'] },
  { name: 'Great Falls', slug: 'great-falls', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['mclean', 'reston'] },
  { name: 'Clifton', slug: 'clifton', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['centreville', 'fairfax'] },
  { name: 'Purcellville', slug: 'purcellville', county: 'Loudoun County', region: 'northern-va', nearbySlug: ['leesburg', 'ashburn'] },
  { name: 'Aldie', slug: 'aldie', county: 'Loudoun County', region: 'northern-va', nearbySlug: ['chantilly', 'ashburn'] },
  { name: 'South Riding', slug: 'south-riding', county: 'Loudoun County', region: 'northern-va', nearbySlug: ['chantilly', 'aldie'] },
  // Additional Richmond
  { name: 'Hanover', slug: 'hanover', county: 'Hanover County', region: 'richmond', nearbySlug: ['mechanicsville', 'richmond'] },
  { name: 'Ashland', slug: 'ashland', county: 'Hanover County', region: 'richmond', nearbySlug: ['hanover', 'mechanicsville'] },
  { name: 'Bon Air', slug: 'bon-air', county: 'Chesterfield County', region: 'richmond', nearbySlug: ['chesterfield', 'richmond'] },
  { name: 'Chester', slug: 'chester', county: 'Chesterfield County', region: 'richmond', nearbySlug: ['colonial-heights', 'chesterfield'] },
  // Additional Hampton Roads
  { name: 'Poquoson', slug: 'poquoson', county: 'City of Poquoson', region: 'hampton-roads', nearbySlug: ['york-county', 'hampton'] },
  { name: 'Isle of Wight', slug: 'isle-of-wight', county: 'Isle of Wight County', region: 'hampton-roads', nearbySlug: ['suffolk', 'chesapeake'] },
  { name: 'Smithfield', slug: 'smithfield', county: 'Isle of Wight County', region: 'hampton-roads', nearbySlug: ['isle-of-wight', 'suffolk'] },
  { name: 'Franklin', slug: 'franklin', county: 'City of Franklin', region: 'hampton-roads', nearbySlug: ['suffolk', 'isle-of-wight'] },
  { name: 'Emporia', slug: 'emporia', county: 'City of Emporia', region: 'hampton-roads', nearbySlug: ['franklin', 'suffolk'] },
  { name: 'Cape Charles', slug: 'cape-charles', county: 'Northampton County', region: 'hampton-roads', nearbySlug: ['chesapeake', 'norfolk'] },
  // Northern Virginia — additional
  { name: 'Manassas Park', slug: 'manassas-park', county: 'City of Manassas Park', region: 'northern-va', nearbySlug: ['manassas', 'centreville'] },
  // Richmond — additional
  { name: 'Goochland', slug: 'goochland', county: 'Goochland County', region: 'richmond', nearbySlug: ['short-pump', 'glen-allen'] },
  { name: 'Powhatan', slug: 'powhatan', county: 'Powhatan County', region: 'richmond', nearbySlug: ['midlothian', 'chesterfield'] },
  { name: 'Highland Springs', slug: 'highland-springs', county: 'Henrico County', region: 'richmond', nearbySlug: ['henrico', 'richmond'] },
  { name: 'Tuckahoe', slug: 'tuckahoe', county: 'Henrico County', region: 'richmond', nearbySlug: ['short-pump', 'richmond'] },
  { name: 'Sandston', slug: 'sandston', county: 'Henrico County', region: 'richmond', nearbySlug: ['henrico', 'richmond'] },
  // Northern VA — additional Stafford/Spotsylvania
  { name: 'Culpeper', slug: 'culpeper', county: 'Culpeper County', region: 'northern-va', nearbySlug: ['fredericksburg', 'warrenton'] },
  { name: 'Warrenton', slug: 'warrenton', county: 'Fauquier County', region: 'northern-va', nearbySlug: ['manassas', 'culpeper'] },
  { name: 'Front Royal', slug: 'front-royal', county: 'Warren County', region: 'northern-va', nearbySlug: ['warrenton', 'leesburg'] },
  { name: 'Winchester', slug: 'winchester', county: 'City of Winchester', region: 'northern-va', nearbySlug: ['front-royal', 'leesburg'] },
  { name: 'Bristow', slug: 'bristow', county: 'Prince William County', region: 'northern-va', nearbySlug: ['gainesville', 'manassas'] },
  { name: 'Nokesville', slug: 'nokesville', county: 'Prince William County', region: 'northern-va', nearbySlug: ['manassas', 'haymarket'] },
  // Central / Western Virginia
  { name: 'Roanoke', slug: 'roanoke', county: 'City of Roanoke', region: 'central-va', nearbySlug: ['salem', 'vinton'], faqs: [
    { q: 'How fast can you close on my Roanoke home?', a: 'We can close on your Roanoke home in as little as 7 days, whether you\'re in South Roanoke, Grandin Village, or the Roanoke Valley.' },
    { q: 'Do you buy Roanoke homes in any condition?', a: 'Yes — we buy Roanoke homes as-is, from lightly dated properties to those needing major structural work. No repairs are ever required.' },
    { q: 'Can you help me sell my Roanoke home if I\'m behind on taxes?', a: 'Absolutely. We work with Roanoke homeowners facing tax liens and can often close fast enough to resolve the issue and put cash in your hands.' },
    { q: 'Do you buy Roanoke properties in flood-prone areas near the river?', a: 'Yes. We buy Roanoke properties near the Roanoke River and in low-lying areas as-is, understanding local flood risk in our pricing.' },
    { q: 'Is there any fee to get a cash offer for my Roanoke house?', a: 'None. Getting a cash offer for your Roanoke home is completely free and you\'re under no obligation to accept.' },
  ] },
  { name: 'Fredericksburg', slug: 'fredericksburg', county: 'City of Fredericksburg', region: 'northern-va', nearbySlug: ['stafford', 'spotsylvania'], faqs: [
    { q: 'How quickly can you close on my Fredericksburg home?', a: 'We can close on your Fredericksburg home in as few as 7 days — perfect if you\'re relocating to DC or need fast cash from your equity.' },
    { q: 'Do you buy older historic homes in downtown Fredericksburg?', a: 'Yes. We purchase historic homes in the Fredericksburg Old Town area and surrounding neighborhoods regardless of age, condition, or historic restrictions.' },
    { q: 'Will you buy my Fredericksburg house if it needs major work?', a: 'Absolutely. Roof, HVAC, foundation, plumbing — we buy Fredericksburg homes needing any level of repairs without asking you to fix a thing.' },
    { q: 'Can you buy my Fredericksburg home if I\'m being transferred to DC or Quantico?', a: 'Yes. We specialize in fast closings for Fredericksburg homeowners heading to the DC metro area or nearby military bases like Quantico.' },
    { q: 'Are there any fees when selling my Fredericksburg house to you?', a: 'No fees, no commissions. We pay all closing costs on every Fredericksburg home we purchase. Your offer is your payout.' },
  ] },
  { name: 'Charlottesville', slug: 'charlottesville', county: 'City of Charlottesville', region: 'central-va', nearbySlug: ['waynesboro', 'staunton'], faqs: [
    { q: 'How fast can you close on my Charlottesville home?', a: 'We can close on your Charlottesville home in as little as 7 days, whether you\'re near UVA, downtown, or in the surrounding Albemarle County area.' },
    { q: 'Do you buy Charlottesville homes near UVA or in the Belmont neighborhood?', a: 'Yes — we buy homes throughout Charlottesville including near UVA, Belmont, Fry\'s Spring, Barracks Road, and all surrounding neighborhoods.' },
    { q: 'Will you buy my Charlottesville rental property with tenants in place?', a: 'Absolutely. We purchase tenant-occupied properties in Charlottesville and handle the transition, so you can exit your landlord responsibilities quickly.' },
    { q: 'Can you buy my Charlottesville house during the academic year without disruption?', a: 'Yes. We handle the entire closing process discreetly and can work around any tenant or occupancy schedule.' },
    { q: 'Do you pay fair prices for Charlottesville homes given the strong market?', a: 'Our Charlottesville offers reflect the local market — you skip agent commissions, repair costs, and months of uncertainty for a guaranteed close.' },
  ] },
  { name: 'Lynchburg', slug: 'lynchburg', county: 'City of Lynchburg', region: 'central-va', nearbySlug: ['bedford', 'amherst'], faqs: [
    { q: 'How quickly can you close on my Lynchburg home?', a: 'We can close your Lynchburg home in as little as 7 days — from Boonsboro and Rivermont to Wyndhurst and the Hill City neighborhoods.' },
    { q: 'Do you buy Lynchburg homes in any condition?', a: 'Yes. We purchase Lynchburg homes as-is regardless of condition, age, or needed repairs. No cleaning or fix-up required.' },
    { q: 'Will you buy my Lynchburg home if I\'m a Liberty University-area landlord looking to sell?', a: 'Absolutely. We buy student rental properties and investor-owned homes in Lynchburg quickly, occupied or vacant.' },
    { q: 'Can you help me sell my Lynchburg house if there\'s a lien on it?', a: 'Yes. We work with Lynchburg homeowners who have liens, judgments, or other title complications and can help resolve them at closing.' },
    { q: 'Is the process for selling my Lynchburg home to you really that simple?', a: 'Yes — request an offer, we visit, we give you a no-obligation cash offer, you pick your closing date. Simple and stress-free.' },
  ] },
  { name: 'Harrisonburg', slug: 'harrisonburg', county: 'City of Harrisonburg', region: 'central-va', nearbySlug: ['staunton', 'waynesboro'], faqs: [
    { q: 'How fast can you buy my Harrisonburg house?', a: 'We can close on your Harrisonburg home in as few as 7 days — whether you\'re near JMU, downtown, or in the surrounding Rockingham County area.' },
    { q: 'Do you buy Harrisonburg rental properties near JMU?', a: 'Yes. We purchase student rental homes and investment properties near James Madison University quickly, with tenants or vacant.' },
    { q: 'Will you buy my Harrisonburg home if it needs significant updates?', a: 'Absolutely. Outdated kitchens, old systems, deferred maintenance — we buy Harrisonburg homes as-is without asking you to invest another dollar.' },
    { q: 'Can you buy my Harrisonburg home if I\'m relocating out of the Shenandoah Valley?', a: 'Yes. We close quickly to match your relocation timeline so you\'re not managing a property from a distance.' },
    { q: 'Are there any fees when I sell my Harrisonburg home to you?', a: 'None whatsoever. No commissions, no closing cost fees. What we offer is exactly what you receive at closing.' },
  ] },
]
