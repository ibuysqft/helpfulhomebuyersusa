export const arizonaCities = [
  // Maricopa County
  { name: 'Phoenix', slug: 'phoenix', county: 'Maricopa County' },
  { name: 'Mesa', slug: 'mesa', county: 'Maricopa County' },
  { name: 'Chandler', slug: 'chandler', county: 'Maricopa County' },
  { name: 'Scottsdale', slug: 'scottsdale', county: 'Maricopa County' },
  { name: 'Glendale', slug: 'glendale', county: 'Maricopa County' },
  { name: 'Gilbert', slug: 'gilbert', county: 'Maricopa County' },
  { name: 'Tempe', slug: 'tempe', county: 'Maricopa County' },
  { name: 'Peoria', slug: 'peoria', county: 'Maricopa County' },
  { name: 'Surprise', slug: 'surprise', county: 'Maricopa County' },
  { name: 'Goodyear', slug: 'goodyear', county: 'Maricopa County' },
  { name: 'Avondale', slug: 'avondale', county: 'Maricopa County' },
  { name: 'Buckeye', slug: 'buckeye', county: 'Maricopa County' },
  { name: 'Maricopa', slug: 'maricopa', county: 'Maricopa County' },
  { name: 'Tolleson', slug: 'tolleson', county: 'Maricopa County' },
  { name: 'El Mirage', slug: 'el-mirage', county: 'Maricopa County' },
  { name: 'Sun City', slug: 'sun-city', county: 'Maricopa County' },
  { name: 'Youngtown', slug: 'youngtown', county: 'Maricopa County' },
  { name: 'Litchfield Park', slug: 'litchfield-park', county: 'Maricopa County' },
  { name: 'Queen Creek', slug: 'queen-creek', county: 'Maricopa County' },
  { name: 'Apache Junction', slug: 'apache-junction', county: 'Maricopa County' },
  // Pima County
  { name: 'Tucson', slug: 'tucson', county: 'Pima County' },
  { name: 'Casas Adobes', slug: 'casas-adobes', county: 'Pima County' },
  { name: 'Catalina Foothills', slug: 'catalina-foothills', county: 'Pima County' },
  { name: 'Oro Valley', slug: 'oro-valley', county: 'Pima County' },
  { name: 'Marana', slug: 'marana', county: 'Pima County' },
  { name: 'Sahuarita', slug: 'sahuarita', county: 'Pima County' },
  { name: 'South Tucson', slug: 'south-tucson', county: 'Pima County' },
  // Pinal County
  { name: 'Casa Grande', slug: 'casa-grande', county: 'Pinal County' },
  { name: 'Coolidge', slug: 'coolidge', county: 'Pinal County' },
  { name: 'Florence', slug: 'florence', county: 'Pinal County' },
  { name: 'Eloy', slug: 'eloy', county: 'Pinal County' },
  // Yavapai County
  { name: 'Prescott', slug: 'prescott', county: 'Yavapai County' },
  { name: 'Prescott Valley', slug: 'prescott-valley', county: 'Yavapai County' },
  { name: 'Cottonwood', slug: 'cottonwood', county: 'Yavapai County' },
  { name: 'Camp Verde', slug: 'camp-verde', county: 'Yavapai County' },
  // Mohave County
  { name: 'Lake Havasu City', slug: 'lake-havasu-city', county: 'Mohave County' },
  { name: 'Bullhead City', slug: 'bullhead-city', county: 'Mohave County' },
  { name: 'Kingman', slug: 'kingman', county: 'Mohave County' },
  { name: 'Fort Mohave', slug: 'fort-mohave', county: 'Mohave County' },
  // Yuma County
  { name: 'Yuma', slug: 'yuma', county: 'Yuma County' },
  { name: 'San Luis', slug: 'san-luis', county: 'Yuma County' },
  { name: 'Somerton', slug: 'somerton', county: 'Yuma County' },
  // Coconino County
  { name: 'Flagstaff', slug: 'flagstaff', county: 'Coconino County' },
  { name: 'Page', slug: 'page', county: 'Coconino County' },
  // Cochise County
  { name: 'Sierra Vista', slug: 'sierra-vista', county: 'Cochise County' },
  { name: 'Bisbee', slug: 'bisbee', county: 'Cochise County' },
  { name: 'Douglas', slug: 'douglas', county: 'Cochise County' },
  // Navajo County
  { name: 'Show Low', slug: 'show-low', county: 'Navajo County' },
  { name: 'Winslow', slug: 'winslow', county: 'Navajo County' },
  // Apache County
  { name: 'Springerville', slug: 'springerville', county: 'Apache County' },
] as const

export const arizonaCounties = [
  { name: 'Maricopa County', slug: 'maricopa-county' },
  { name: 'Pima County', slug: 'pima-county' },
  { name: 'Pinal County', slug: 'pinal-county' },
  { name: 'Yavapai County', slug: 'yavapai-county' },
  { name: 'Mohave County', slug: 'mohave-county' },
  { name: 'Yuma County', slug: 'yuma-county' },
  { name: 'Coconino County', slug: 'coconino-county' },
  { name: 'Cochise County', slug: 'cochise-county' },
  { name: 'Navajo County', slug: 'navajo-county' },
  { name: 'Apache County', slug: 'apache-county' },
] as const

export type ArizonaCity = typeof arizonaCities[number]
export type ArizonaCounty = typeof arizonaCounties[number]
