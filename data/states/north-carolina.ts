export const northCarolinaCities = [
  // Mecklenburg County
  { name: 'Charlotte', slug: 'charlotte', county: 'Mecklenburg County' },
  { name: 'Huntersville', slug: 'huntersville', county: 'Mecklenburg County' },
  { name: 'Matthews', slug: 'matthews', county: 'Mecklenburg County' },
  { name: 'Mint Hill', slug: 'mint-hill', county: 'Mecklenburg County' },
  { name: 'Pineville', slug: 'pineville', county: 'Mecklenburg County' },
  { name: 'Cornelius', slug: 'cornelius', county: 'Mecklenburg County' },
  { name: 'Davidson', slug: 'davidson', county: 'Mecklenburg County' },
  // Wake County
  { name: 'Raleigh', slug: 'raleigh', county: 'Wake County' },
  { name: 'Cary', slug: 'cary', county: 'Wake County' },
  { name: 'Apex', slug: 'apex', county: 'Wake County' },
  { name: 'Wake Forest', slug: 'wake-forest', county: 'Wake County' },
  { name: 'Garner', slug: 'garner', county: 'Wake County' },
  { name: 'Morrisville', slug: 'morrisville', county: 'Wake County' },
  { name: 'Fuquay-Varina', slug: 'fuquay-varina', county: 'Wake County' },
  { name: 'Holly Springs', slug: 'holly-springs', county: 'Wake County' },
  // Guilford County
  { name: 'Greensboro', slug: 'greensboro', county: 'Guilford County' },
  { name: 'High Point', slug: 'high-point', county: 'Guilford County' },
  { name: 'Jamestown', slug: 'jamestown', county: 'Guilford County' },
  // Forsyth County
  { name: 'Winston-Salem', slug: 'winston-salem', county: 'Forsyth County' },
  { name: 'Kernersville', slug: 'kernersville', county: 'Forsyth County' },
  { name: 'Lewisville', slug: 'lewisville', county: 'Forsyth County' },
  // Cumberland County
  { name: 'Fayetteville', slug: 'fayetteville', county: 'Cumberland County' },
  { name: 'Hope Mills', slug: 'hope-mills', county: 'Cumberland County' },
  { name: 'Spring Lake', slug: 'spring-lake', county: 'Cumberland County' },
  // Durham County
  { name: 'Durham', slug: 'durham', county: 'Durham County' },
  { name: 'Chapel Hill', slug: 'chapel-hill', county: 'Durham County' },
  // Buncombe County
  { name: 'Asheville', slug: 'asheville', county: 'Buncombe County' },
  { name: 'Woodfin', slug: 'woodfin', county: 'Buncombe County' },
  { name: 'Weaverville', slug: 'weaverville', county: 'Buncombe County' },
  // Cabarrus County
  { name: 'Concord', slug: 'concord', county: 'Cabarrus County' },
  { name: 'Kannapolis', slug: 'kannapolis', county: 'Cabarrus County' },
  { name: 'Harrisburg', slug: 'harrisburg', county: 'Cabarrus County' },
  // Union County
  { name: 'Monroe', slug: 'monroe', county: 'Union County' },
  { name: 'Stallings', slug: 'stallings', county: 'Union County' },
  { name: 'Indian Trail', slug: 'indian-trail', county: 'Union County' },
  { name: 'Waxhaw', slug: 'waxhaw', county: 'Union County' },
  // Gaston County
  { name: 'Gastonia', slug: 'gastonia', county: 'Gaston County' },
  { name: 'Belmont', slug: 'belmont', county: 'Gaston County' },
  { name: 'Mount Holly', slug: 'mount-holly', county: 'Gaston County' },
  { name: 'Cramerton', slug: 'cramerton', county: 'Gaston County' },
  // Additional high-volume cities
  { name: 'Wilmington', slug: 'wilmington', county: 'New Hanover County' },
  { name: 'Jacksonville', slug: 'jacksonville', county: 'Onslow County' },
  { name: 'Rocky Mount', slug: 'rocky-mount', county: 'Nash County' },
  { name: 'Burlington', slug: 'burlington', county: 'Alamance County' },
  { name: 'Wilson', slug: 'wilson', county: 'Wilson County' },
  { name: 'Greenville', slug: 'greenville', county: 'Pitt County' },
  { name: 'Goldsboro', slug: 'goldsboro', county: 'Wayne County' },
  { name: 'Hickory', slug: 'hickory', county: 'Catawba County' },
  { name: 'Mooresville', slug: 'mooresville', county: 'Iredell County' },
  { name: 'Sanford', slug: 'sanford', county: 'Lee County' },
  { name: 'Asheboro', slug: 'asheboro', county: 'Randolph County' },
  { name: 'Statesville', slug: 'statesville', county: 'Iredell County' },
] as const

export const northCarolinaCounties = [
  { name: 'Mecklenburg County', slug: 'mecklenburg-county' },
  { name: 'Wake County', slug: 'wake-county' },
  { name: 'Guilford County', slug: 'guilford-county' },
  { name: 'Forsyth County', slug: 'forsyth-county' },
  { name: 'Cumberland County', slug: 'cumberland-county' },
  { name: 'Durham County', slug: 'durham-county' },
  { name: 'Buncombe County', slug: 'buncombe-county' },
  { name: 'Cabarrus County', slug: 'cabarrus-county' },
  { name: 'Union County', slug: 'union-county' },
  { name: 'Gaston County', slug: 'gaston-county' },
] as const

export type NorthCarolinaCity = typeof northCarolinaCities[number]
export type NorthCarolinaCounty = typeof northCarolinaCounties[number]
