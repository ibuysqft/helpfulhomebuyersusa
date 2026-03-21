export interface City {
  name: string
  slug: string
  county: string
  region: 'northern-va' | 'richmond' | 'hampton-roads'
  nearbySlug?: string[]
}

export const cities: City[] = [
  // Northern Virginia — Fairfax County
  { name: 'Fairfax', slug: 'fairfax', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['vienna', 'annandale', 'centreville'] },
  { name: 'Vienna', slug: 'vienna', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['fairfax', 'mclean', 'reston'] },
  { name: 'Annandale', slug: 'annandale', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['fairfax', 'springfield', 'falls-church'] },
  { name: 'Springfield', slug: 'springfield', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['annandale', 'burke', 'fairfax'] },
  { name: 'Burke', slug: 'burke', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['springfield', 'fairfax'] },
  { name: 'Centreville', slug: 'centreville', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['chantilly', 'fairfax', 'manassas'] },
  { name: 'Chantilly', slug: 'chantilly', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['centreville', 'ashburn', 'sterling'] },
  { name: 'Reston', slug: 'reston', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['herndon', 'vienna', 'sterling'] },
  { name: 'Herndon', slug: 'herndon', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['reston', 'sterling', 'chantilly'] },
  { name: 'McLean', slug: 'mclean', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['vienna', 'falls-church', 'arlington'] },
  { name: 'Falls Church', slug: 'falls-church', county: 'Fairfax County', region: 'northern-va', nearbySlug: ['mclean', 'annandale', 'arlington'] },
  // Northern Virginia — Arlington
  { name: 'Arlington', slug: 'arlington', county: 'Arlington County', region: 'northern-va', nearbySlug: ['falls-church', 'alexandria', 'mclean'] },
  // Northern Virginia — Alexandria
  { name: 'Alexandria', slug: 'alexandria', county: 'City of Alexandria', region: 'northern-va', nearbySlug: ['arlington', 'springfield'] },
  // Northern Virginia — Loudoun County
  { name: 'Ashburn', slug: 'ashburn', county: 'Loudoun County', region: 'northern-va', nearbySlug: ['sterling', 'leesburg', 'chantilly'] },
  { name: 'Sterling', slug: 'sterling', county: 'Loudoun County', region: 'northern-va', nearbySlug: ['ashburn', 'herndon', 'leesburg'] },
  { name: 'Leesburg', slug: 'leesburg', county: 'Loudoun County', region: 'northern-va', nearbySlug: ['ashburn', 'sterling'] },
  // Northern Virginia — Prince William County
  { name: 'Manassas', slug: 'manassas', county: 'Prince William County', region: 'northern-va', nearbySlug: ['woodbridge', 'centreville'] },
  { name: 'Woodbridge', slug: 'woodbridge', county: 'Prince William County', region: 'northern-va', nearbySlug: ['manassas', 'dale-city'] },
  { name: 'Dale City', slug: 'dale-city', county: 'Prince William County', region: 'northern-va', nearbySlug: ['woodbridge', 'manassas'] },
  { name: 'Dumfries', slug: 'dumfries', county: 'Prince William County', region: 'northern-va', nearbySlug: ['woodbridge', 'dale-city'] },
  // Richmond Region
  { name: 'Richmond', slug: 'richmond', county: 'City of Richmond', region: 'richmond', nearbySlug: ['henrico', 'chesterfield', 'colonial-heights'] },
  { name: 'Henrico', slug: 'henrico', county: 'Henrico County', region: 'richmond', nearbySlug: ['richmond', 'glen-allen', 'mechanicsville'] },
  { name: 'Chesterfield', slug: 'chesterfield', county: 'Chesterfield County', region: 'richmond', nearbySlug: ['richmond', 'midlothian', 'colonial-heights'] },
  { name: 'Midlothian', slug: 'midlothian', county: 'Chesterfield County', region: 'richmond', nearbySlug: ['chesterfield', 'richmond'] },
  { name: 'Glen Allen', slug: 'glen-allen', county: 'Henrico County', region: 'richmond', nearbySlug: ['henrico', 'richmond', 'mechanicsville'] },
  { name: 'Mechanicsville', slug: 'mechanicsville', county: 'Hanover County', region: 'richmond', nearbySlug: ['glen-allen', 'henrico', 'richmond'] },
  { name: 'Colonial Heights', slug: 'colonial-heights', county: 'Colonial Heights', region: 'richmond', nearbySlug: ['chesterfield', 'richmond', 'petersburg'] },
  { name: 'Petersburg', slug: 'petersburg', county: 'City of Petersburg', region: 'richmond', nearbySlug: ['colonial-heights', 'chesterfield'] },
  { name: 'Hopewell', slug: 'hopewell', county: 'City of Hopewell', region: 'richmond', nearbySlug: ['colonial-heights', 'petersburg'] },
  { name: 'Short Pump', slug: 'short-pump', county: 'Henrico County', region: 'richmond', nearbySlug: ['glen-allen', 'henrico'] },
  // Hampton Roads
  { name: 'Virginia Beach', slug: 'virginia-beach', county: 'City of Virginia Beach', region: 'hampton-roads', nearbySlug: ['norfolk', 'chesapeake'] },
  { name: 'Norfolk', slug: 'norfolk', county: 'City of Norfolk', region: 'hampton-roads', nearbySlug: ['virginia-beach', 'chesapeake', 'portsmouth'] },
  { name: 'Chesapeake', slug: 'chesapeake', county: 'City of Chesapeake', region: 'hampton-roads', nearbySlug: ['norfolk', 'suffolk', 'virginia-beach'] },
  { name: 'Hampton', slug: 'hampton', county: 'City of Hampton', region: 'hampton-roads', nearbySlug: ['newport-news', 'york-county'] },
  { name: 'Newport News', slug: 'newport-news', county: 'City of Newport News', region: 'hampton-roads', nearbySlug: ['hampton', 'williamsburg'] },
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
]
