export interface Neighborhood {
  slug: string
  name: string
  city: string
  citySlug: string
  region: string
  description: string
}

export const neighborhoods: Neighborhood[] = [
  // Alexandria
  { slug: 'del-ray-alexandria', name: 'Del Ray', city: 'Alexandria', citySlug: 'alexandria', region: 'Northern Virginia', description: 'Del Ray is a charming Alexandria neighborhood known for its walkable streets, vintage bungalows, and thriving local restaurant scene.' },
  { slug: 'old-town-alexandria', name: 'Old Town', city: 'Alexandria', citySlug: 'alexandria', region: 'Northern Virginia', description: 'Old Town Alexandria is a historic waterfront district lined with 18th-century row houses, boutique shops, and cobblestone streets along the Potomac River.' },
  { slug: 'seminary-hill-alexandria', name: 'Seminary Hill', city: 'Alexandria', citySlug: 'alexandria', region: 'Northern Virginia', description: 'Seminary Hill is a quiet Alexandria neighborhood featuring mid-century homes and easy access to both the Beltway and Reagan National Airport.' },
  { slug: 'rosemont-alexandria', name: 'Rosemont', city: 'Alexandria', citySlug: 'alexandria', region: 'Northern Virginia', description: 'Rosemont is a sought-after Alexandria neighborhood with craftsman bungalows and cape cods just minutes from the DC Metro system.' },

  // Arlington
  { slug: 'clarendon-arlington', name: 'Clarendon', city: 'Arlington', citySlug: 'arlington', region: 'Northern Virginia', description: 'Clarendon is a vibrant Arlington neighborhood along the Orange Line corridor, known for its urban energy, condos, and walkable amenities.' },
  { slug: 'ballston-arlington', name: 'Ballston', city: 'Arlington', citySlug: 'arlington', region: 'Northern Virginia', description: 'Ballston is a high-density Arlington neighborhood anchored by Ballston Quarter mall and one of the busiest Metro stops on the Orange Line.' },
  { slug: 'pentagon-city-arlington', name: 'Pentagon City', city: 'Arlington', citySlug: 'arlington', region: 'Northern Virginia', description: 'Pentagon City is a major commercial and residential hub in Arlington adjacent to the Pentagon, offering high-rise condos and top retail access.' },
  { slug: 'columbia-pike-arlington', name: 'Columbia Pike', city: 'Arlington', citySlug: 'arlington', region: 'Northern Virginia', description: 'Columbia Pike is a diverse, revitalizing Arlington corridor with affordable housing stock and an active community redevelopment effort.' },
  { slug: 'aurora-highlands-arlington', name: 'Aurora Highlands', city: 'Arlington', citySlug: 'arlington', region: 'Northern Virginia', description: 'Aurora Highlands is a stable south Arlington neighborhood featuring classic brick colonials and close proximity to Reagan National Airport.' },

  // Fairfax
  { slug: 'fairfax-city-center', name: 'Fairfax City Center', city: 'Fairfax', citySlug: 'fairfax', region: 'Northern Virginia', description: 'Fairfax City Center is the historic downtown core of Fairfax City, featuring older single-family homes and walkable proximity to City Hall and Old Town Fairfax.' },
  { slug: 'fair-lakes-fairfax', name: 'Fair Lakes', city: 'Fairfax', citySlug: 'fairfax', region: 'Northern Virginia', description: 'Fair Lakes is a large planned community in Fairfax County with townhomes, single-family homes, and a major retail corridor along Route 50.' },
  { slug: 'oak-hill-fairfax', name: 'Oak Hill', city: 'Fairfax', citySlug: 'fairfax', region: 'Northern Virginia', description: 'Oak Hill is an established Fairfax County community with executive-style homes, mature tree canopy, and easy access to Dulles Toll Road.' },

  // Reston
  { slug: 'north-point-reston', name: 'North Point', city: 'Reston', citySlug: 'reston', region: 'Northern Virginia', description: 'North Point is one of Reston\'s original planned villages featuring a mix of condos, townhomes, and single-family homes around North Shore Drive.' },
  { slug: 'south-lakes-reston', name: 'South Lakes', city: 'Reston', citySlug: 'reston', region: 'Northern Virginia', description: 'South Lakes is a Reston village centered on Lake Thoreau and Lake Newport, offering waterfront townhomes and established single-family homes.' },
  { slug: 'reston-town-center', name: 'Town Center', city: 'Reston', citySlug: 'reston', region: 'Northern Virginia', description: 'Reston Town Center is the walkable urban core of Reston, now anchored by a Silver Line Metro station and a growing collection of high-rise residences.' },

  // Herndon
  { slug: 'downtown-herndon', name: 'Downtown Herndon', city: 'Herndon', citySlug: 'herndon', region: 'Northern Virginia', description: 'Downtown Herndon is the historic town center featuring Victorian-era homes, local shops, and the recently extended Silver Line Metro access.' },
  { slug: 'franklin-farm-herndon', name: 'Franklin Farm', city: 'Herndon', citySlug: 'herndon', region: 'Northern Virginia', description: 'Franklin Farm is a large planned community in Herndon with a variety of townhomes and single-family homes built in the 1980s and 1990s.' },

  // Woodbridge / Prince William
  { slug: 'lake-ridge-woodbridge', name: 'Lake Ridge', city: 'Woodbridge', citySlug: 'woodbridge', region: 'Northern Virginia', description: 'Lake Ridge is a large Prince William County community with waterfront properties along Occoquan Reservoir and a mix of townhomes and single-family homes.' },
  { slug: 'potomac-mills-woodbridge', name: 'Potomac Mills Area', city: 'Woodbridge', citySlug: 'woodbridge', region: 'Northern Virginia', description: 'The Potomac Mills area of Woodbridge is a high-density corridor with a mix of newer townhomes and retail-adjacent residential neighborhoods.' },
  { slug: 'dale-city-woodbridge', name: 'Dale City', city: 'Woodbridge', citySlug: 'woodbridge', region: 'Northern Virginia', description: 'Dale City is one of the largest unincorporated communities in Virginia, featuring affordable single-family homes and townhomes in Prince William County.' },

  // Richmond
  { slug: 'the-fan-richmond', name: 'The Fan', city: 'Richmond', citySlug: 'richmond', region: 'Richmond Metro', description: 'The Fan is Richmond\'s premier historic neighborhood, featuring beautifully preserved Victorian row houses along Monument Avenue and near VCU.' },
  { slug: 'church-hill-richmond', name: 'Church Hill', city: 'Richmond', citySlug: 'richmond', region: 'Richmond Metro', description: 'Church Hill is Richmond\'s oldest neighborhood, offering panoramic city views, restored antebellum homes, and a growing restaurant and arts scene.' },
  { slug: 'scotts-addition-richmond', name: "Scott's Addition", city: 'Richmond', citySlug: 'richmond', region: 'Richmond Metro', description: "Scott's Addition is Richmond's hottest urban neighborhood, transforming former industrial buildings into breweries, condos, and creative businesses." },
  { slug: 'carytown-richmond', name: 'Carytown', city: 'Richmond', citySlug: 'richmond', region: 'Richmond Metro', description: 'Carytown is Richmond\'s beloved shopping and dining district, with eclectic boutiques, restaurants, and a mix of historic bungalows and craftsman homes.' },
  { slug: 'forest-hill-richmond', name: 'Forest Hill', city: 'Richmond', citySlug: 'richmond', region: 'Richmond Metro', description: 'Forest Hill is a south Richmond neighborhood known for its namesake park, mature trees, and a mix of older brick homes and craftsman bungalows.' },
  { slug: 'manchester-richmond', name: 'Manchester', city: 'Richmond', citySlug: 'richmond', region: 'Richmond Metro', description: 'Manchester is a rapidly redeveloping south Richmond neighborhood across the James River, attracting artists, young professionals, and new condo developments.' },
  { slug: 'northside-richmond', name: 'Northside', city: 'Richmond', citySlug: 'richmond', region: 'Richmond Metro', description: 'Northside Richmond encompasses several historic neighborhoods including Bellevue and Ginter Park, known for large craftsman and colonial revival homes.' },
  { slug: 'bryan-park-richmond', name: 'Bryan Park', city: 'Richmond', citySlug: 'richmond', region: 'Richmond Metro', description: 'Bryan Park is a north Richmond neighborhood anchored by its namesake park, featuring modest brick ranchers and colonials popular with first-time buyers.' },

  // Henrico
  { slug: 'short-pump-henrico', name: 'Short Pump', city: 'Henrico', citySlug: 'henrico', region: 'Richmond Metro', description: 'Short Pump is Henrico County\'s premier western suburb, featuring upscale retail, newer single-family homes, and top-rated schools.' },
  { slug: 'innsbrook-henrico', name: 'Innsbrook', city: 'Henrico', citySlug: 'henrico', region: 'Richmond Metro', description: 'Innsbrook is a major west Henrico business and residential district featuring office parks, apartment communities, and nearby retail corridors.' },
  { slug: 'tuckahoe-henrico', name: 'Tuckahoe', city: 'Henrico', citySlug: 'henrico', region: 'Richmond Metro', description: 'Tuckahoe is an established west Henrico neighborhood with well-maintained ranch and colonial homes popular with families seeking top-tier public schools.' },

  // Chesterfield
  { slug: 'midlothian-chesterfield', name: 'Midlothian', city: 'Chesterfield', citySlug: 'chesterfield', region: 'Richmond Metro', description: 'Midlothian is Chesterfield County\'s most desirable suburb, featuring planned communities, top schools, and newer construction single-family homes.' },
  { slug: 'bon-air-chesterfield', name: 'Bon Air', city: 'Chesterfield', citySlug: 'chesterfield', region: 'Richmond Metro', description: 'Bon Air is an older Chesterfield neighborhood just southwest of Richmond, featuring stately older homes, mature lots, and a quiet suburban character.' },
  { slug: 'chester-chesterfield', name: 'Chester', city: 'Chesterfield', citySlug: 'chesterfield', region: 'Richmond Metro', description: 'Chester is a growing Chesterfield community along the Route 1 and I-95 corridor, featuring a mix of older single-family homes and newer subdivisions.' },

  // Norfolk
  { slug: 'ghent-norfolk', name: 'Ghent', city: 'Norfolk', citySlug: 'norfolk', region: 'Hampton Roads', description: 'Ghent is Norfolk\'s most walkable and artsy neighborhood, featuring early 20th-century row houses, boutique restaurants, and proximity to EVMS and ODU.' },
  { slug: 'ocean-view-norfolk', name: 'Ocean View', city: 'Norfolk', citySlug: 'norfolk', region: 'Hampton Roads', description: 'Ocean View is a beachfront Norfolk neighborhood along the Chesapeake Bay, featuring a mix of cottages, ranchers, and newer waterfront construction.' },
  { slug: 'larchmont-norfolk', name: 'Larchmont', city: 'Norfolk', citySlug: 'norfolk', region: 'Hampton Roads', description: 'Larchmont is one of Norfolk\'s most prestigious neighborhoods, featuring large brick homes on tree-lined streets near Lafayette River.' },
  { slug: 'granby-street-norfolk', name: 'Granby Street Corridor', city: 'Norfolk', citySlug: 'norfolk', region: 'Hampton Roads', description: 'The Granby Street corridor is Norfolk\'s urban entertainment spine, with a mix of older residential stock and proximity to downtown amenities.' },

  // Virginia Beach
  { slug: 'sandbridge-virginia-beach', name: 'Sandbridge', city: 'Virginia Beach', citySlug: 'virginia-beach', region: 'Hampton Roads', description: 'Sandbridge is a secluded Virginia Beach beachfront community south of the resort area, featuring vacation homes and year-round waterfront residences.' },
  { slug: 'oceanfront-virginia-beach', name: 'Oceanfront', city: 'Virginia Beach', citySlug: 'virginia-beach', region: 'Hampton Roads', description: 'The Virginia Beach Oceanfront resort area features high-rise condos, vacation rental homes, and a dense mix of hospitality and residential properties along Atlantic Avenue.' },
  { slug: 'hilltop-virginia-beach', name: 'Hilltop', city: 'Virginia Beach', citySlug: 'virginia-beach', region: 'Hampton Roads', description: 'Hilltop is a central Virginia Beach neighborhood anchored by its namesake retail corridor, featuring established single-family homes and convenient access across the city.' },
  { slug: 'great-neck-virginia-beach', name: 'Great Neck', city: 'Virginia Beach', citySlug: 'virginia-beach', region: 'Hampton Roads', description: 'Great Neck is a prestigious north Virginia Beach peninsula neighborhood featuring waterfront homes, executive estates, and top-rated schools.' },
  { slug: 'kempsville-virginia-beach', name: 'Kempsville', city: 'Virginia Beach', citySlug: 'virginia-beach', region: 'Hampton Roads', description: 'Kempsville is a large central Virginia Beach community with a wide range of housing from modest ranchers to larger colonials, popular for its value and convenience.' },

  // Chesapeake
  { slug: 'greenbrier-chesapeake', name: 'Greenbrier', city: 'Chesapeake', citySlug: 'chesapeake', region: 'Hampton Roads', description: 'Greenbrier is Chesapeake\'s main commercial and residential hub in the north, featuring newer townhomes, condos, and established single-family subdivisions.' },
  { slug: 'great-bridge-chesapeake', name: 'Great Bridge', city: 'Chesapeake', citySlug: 'chesapeake', region: 'Hampton Roads', description: 'Great Bridge is a historic Chesapeake neighborhood known for its waterways, lock system, and a mix of established neighborhoods and newer subdivisions.' },
  { slug: 'deep-creek-chesapeake', name: 'Deep Creek', city: 'Chesapeake', citySlug: 'chesapeake', region: 'Hampton Roads', description: 'Deep Creek is a north Chesapeake community along the Intracoastal Waterway, featuring working-class neighborhoods and waterfront properties.' },
  { slug: 'western-branch-chesapeake', name: 'Western Branch', city: 'Chesapeake', citySlug: 'chesapeake', region: 'Hampton Roads', description: 'Western Branch is a suburban Chesapeake community with a strong mix of single-family homes and townhomes popular with Norfolk and Portsmouth commuters.' },

  // Hampton
  { slug: 'phoebus-hampton', name: 'Phoebus', city: 'Hampton', citySlug: 'hampton', region: 'Hampton Roads', description: 'Phoebus is a historic Hampton neighborhood with an arts-focused Main Street revival, older Victorian and craftsman homes, and proximity to Fort Monroe.' },
  { slug: 'wythe-hampton', name: 'Wythe', city: 'Hampton', citySlug: 'hampton', region: 'Hampton Roads', description: 'Wythe is an established Hampton waterfront neighborhood along the Hampton Roads harbor, featuring older brick homes and water views.' },
  { slug: 'buckroe-beach-hampton', name: 'Buckroe Beach', city: 'Hampton', citySlug: 'hampton', region: 'Hampton Roads', description: 'Buckroe Beach is Hampton\'s public beachfront community on the Chesapeake Bay, featuring beach cottages, bungalows, and seasonal vacation homes.' },

  // Newport News
  { slug: 'denbigh-newport-news', name: 'Denbigh', city: 'Newport News', citySlug: 'newport-news', region: 'Hampton Roads', description: 'Denbigh is Newport News\'s largest suburban community in the north, featuring affordable single-family homes and townhomes near Ft. Eustis.' },
  { slug: 'hidenwood-newport-news', name: 'Hidenwood', city: 'Newport News', citySlug: 'newport-news', region: 'Hampton Roads', description: 'Hidenwood is a stable mid-city Newport News neighborhood featuring brick ranchers and colonials near Christopher Newport University.' },
  { slug: 'hilton-newport-news', name: 'Hilton', city: 'Newport News', citySlug: 'newport-news', region: 'Hampton Roads', description: 'Hilton is a north Newport News waterfront neighborhood on the James River with older homes and strong community character near the Mariners\' Museum.' },

  // Roanoke
  { slug: 'south-roanoke', name: 'South Roanoke', city: 'Roanoke', citySlug: 'roanoke', region: 'Central Virginia', description: 'South Roanoke is the city\'s most prestigious neighborhood, featuring large early 20th-century homes on spacious lots near Roanoke Country Club.' },
  { slug: 'grandin-village-roanoke', name: 'Grandin Village', city: 'Roanoke', citySlug: 'roanoke', region: 'Central Virginia', description: 'Grandin Village is a beloved Roanoke walkable neighborhood with a charming commercial corridor, craftsman bungalows, and a historic movie theater.' },
  { slug: 'old-southwest-roanoke', name: 'Old Southwest', city: 'Roanoke', citySlug: 'roanoke', region: 'Central Virginia', description: 'Old Southwest Roanoke is a National Register historic district with one of the highest concentrations of Victorian-era architecture in Virginia.' },

  // Charlottesville
  { slug: 'belmont-charlottesville', name: 'Belmont', city: 'Charlottesville', citySlug: 'charlottesville', region: 'Central Virginia', description: 'Belmont is Charlottesville\'s trendiest neighborhood, featuring renovated bungalows, walkable restaurant row, and strong appreciation near UVA.' },
  { slug: 'frys-spring-charlottesville', name: "Fry's Spring", city: 'Charlottesville', citySlug: 'charlottesville', region: 'Central Virginia', description: "Fry's Spring is a quiet south Charlottesville neighborhood bordering the UVA Grounds, popular with faculty and graduate students." },
  { slug: 'downtown-mall-charlottesville', name: 'Downtown Mall Area', city: 'Charlottesville', citySlug: 'charlottesville', region: 'Central Virginia', description: 'The Downtown Mall area of Charlottesville features condos, lofts, and historic homes within walking distance of the nationally recognized pedestrian mall.' },

  // Lynchburg
  { slug: 'boonsboro-lynchburg', name: 'Boonsboro', city: 'Lynchburg', citySlug: 'lynchburg', region: 'Central Virginia', description: 'Boonsboro is Lynchburg\'s most sought-after neighborhood, featuring executive homes, a country club, and excellent schools on the city\'s west side.' },
  { slug: 'rivermont-lynchburg', name: 'Rivermont', city: 'Lynchburg', citySlug: 'lynchburg', region: 'Central Virginia', description: 'Rivermont is a historic Lynchburg neighborhood along the James River featuring grand Victorian homes and proximity to Randolph College.' },
  { slug: 'wyndhurst-lynchburg', name: 'Wyndhurst', city: 'Lynchburg', citySlug: 'lynchburg', region: 'Central Virginia', description: 'Wyndhurst is a newer mixed-use Lynchburg development featuring townhomes, condos, and single-family homes in a walkable village-style setting.' },

  // Harrisonburg
  { slug: 'downtown-harrisonburg', name: 'Downtown Harrisonburg', city: 'Harrisonburg', citySlug: 'harrisonburg', region: 'Central Virginia', description: 'Downtown Harrisonburg is a revitalized urban core near JMU featuring student housing, renovated older homes, and a growing arts and dining scene.' },
  { slug: 'east-market-harrisonburg', name: 'East Market', city: 'Harrisonburg', citySlug: 'harrisonburg', region: 'Central Virginia', description: 'East Market is a diverse Harrisonburg neighborhood featuring affordable older housing stock and a multicultural community character near the city center.' },
]
