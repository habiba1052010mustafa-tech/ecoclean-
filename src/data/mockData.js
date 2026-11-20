// Mock Data and Constants for EcoClean Platform (Egypt)

export const WASTE_TYPES = [
  {
    id: 'plastic',
    name: 'Plastic & Packaging',
    nameAr: 'بلاستيك ومواد تعبئة',
    icon: 'Package',
    color: '#0284c7', // sky
    bgColor: '#e0f2fe',
    description: 'Bottles, single-use bags, polystyrene foam, cups, containers',
    ecoImpact: 'Takes 450+ years to decompose; clogs Nile canals and kills wildlife.',
    recyclingValue: 'High recyclable value (PET/HDPE).'
  },
  {
    id: 'organic',
    name: 'Organic & Food Waste',
    nameAr: 'مخلفات عضوية وطعام',
    icon: 'Apple',
    color: '#16a34a', // green
    bgColor: '#dcfce7',
    description: 'Rotting food, restaurant grease/scraps, fruit peelings, market refuse',
    ecoImpact: 'Primary cause of strong foul odors, flies, cockroaches, and methane gas emissions.',
    recyclingValue: 'Can be converted into organic compost & bio-gas.'
  },
  {
    id: 'electronic',
    name: 'Electronic & E-Waste',
    nameAr: 'مخلفات إلكترونية',
    icon: 'Cpu',
    color: '#7c3aed', // purple
    bgColor: '#ede9fe',
    description: 'Wires, old monitors, smartphone batteries, circuit boards, small appliances',
    ecoImpact: 'Contains toxic heavy metals (lead, mercury, cadmium) that contaminate groundwater.',
    recyclingValue: 'Valuable precious metals recovery when processed properly.'
  },
  {
    id: 'construction',
    name: 'Construction Debris (Debsh)',
    nameAr: 'مخلفات بناء وهدم (دبش)',
    icon: 'HardHat',
    color: '#ea580c', // orange
    bgColor: '#ffedd5',
    description: 'Concrete chunks, red bricks, broken ceramic tiles, gypsum, sand rubble',
    ecoImpact: 'Severely blocks public pedestrian walkways and creates airborne silica dust.',
    recyclingValue: 'Can be crushed into recycled road base aggregate.'
  },
  {
    id: 'hazardous',
    name: 'Hazardous & Medical Waste',
    nameAr: 'مخلفات خطرة وطبية',
    icon: 'Biohazard',
    color: '#dc2626', // red
    bgColor: '#fee2e2',
    description: 'Syringes, expired medications, pesticide cans, chemical paint buckets, sharp glass',
    ecoImpact: 'Extremely critical public health biohazard; infection and toxic chemical risk.',
    recyclingValue: 'Requires specialized high-temperature medical autoclaving/incineration.'
  }
];

export const SEVERITY_LEVELS = [
  {
    level: 'Low',
    levelAr: 'منخفض',
    score: 1,
    color: '#10b981',
    bgColor: '#d1fae5',
    borderColor: '#6ee7b7',
    points: 50,
    timeframe: 'Cleaned within 72 hours',
    description: 'Minor localized litter or small overflow. No road obstruction, minimal odor.',
    badge: 'Standard Cleanup'
  },
  {
    level: 'Medium',
    levelAr: 'متوسط',
    score: 2,
    color: '#f59e0b',
    bgColor: '#fef3c7',
    borderColor: '#fcd34d',
    points: 100,
    timeframe: 'Cleaned within 36 hours',
    description: 'Noticeable waste accumulation, foul odors starting, insect breeding, pedestrian obstacle.',
    badge: 'Priority Response'
  },
  {
    level: 'High',
    levelAr: 'مرتفع / خطير',
    score: 3,
    color: '#ef4444',
    bgColor: '#fee2e2',
    borderColor: '#fca5a5',
    points: 200,
    timeframe: 'Urgent Dispatch (< 12 hours)',
    description: 'CRITICAL: Severe toxic/medical hazards, massive road blockage, intense stench, or extreme pest swarm near schools/hospitals.',
    badge: 'Emergency Dispatch'
  }
];

export const EGYPT_GOVERNORATES = [
  { id: 'cairo', name: 'Cairo (القاهرة)', center: [30.0444, 31.2357], zoom: 12 },
  { id: 'giza', name: 'Giza (الجيزة)', center: [30.0131, 31.2089], zoom: 12 },
  { id: 'alexandria', name: 'Alexandria (الإسكندرية)', center: [31.2001, 29.9187], zoom: 12 },
  { id: 'qalyubia', name: 'Qalyubia (القليوبية)', center: [30.3292, 31.2168], zoom: 11 },
  { id: 'dakahlia', name: 'Dakahlia / Mansoura (الدقهلية)', center: [31.0409, 31.3785], zoom: 12 },
  { id: 'gharbia', name: 'Gharbia / Tanta (الغربية)', center: [30.7865, 31.0004], zoom: 12 },
  { id: 'assuit', name: 'Assiut (أسيوط)', center: [27.1809, 31.1837], zoom: 12 }
];

export const EGYPT_AUTHORITIES = [
  {
    id: 'ccba',
    name: 'Cairo Cleaning & Beautification Authority (CCBA)',
    nameAr: 'الهيئة العامة لنظافة وتجميل القاهرة',
    jurisdiction: 'Cairo Governorate',
    hotline: '152',
    avatar: '🏛️'
  },
  {
    id: 'wmra',
    name: 'Waste Management Regulatory Authority (WMRA)',
    nameAr: 'جهاز تنظيم إدارة المخلفات - وزارة البيئة',
    jurisdiction: 'National & High-Hazard Inspection',
    hotline: '19808',
    avatar: '🇪🇬'
  },
  {
    id: 'alex_clean',
    name: 'Nahdet Misr Environmental Services (Alexandria)',
    nameAr: 'شركة نهضة مصر للخدمات البيئية الحديثة',
    jurisdiction: 'Alexandria Coastline & Districts',
    hotline: '175',
    avatar: '🌊'
  },
  {
    id: 'giza_env',
    name: 'Giza Hygiene & Cleanliness Agency',
    nameAr: 'هيئة نظافة وتجميل الجيزة',
    jurisdiction: 'Giza & 6th of October City',
    hotline: '114',
    avatar: '🏢'
  }
];

export const SAMPLE_PRESET_IMAGES = [
  {
    id: 'sample-plastic-cairo',
    title: 'Plastic Bottle Spill - Nasr City',
    url: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80',
    type: 'plastic',
    severity: 'Medium',
    odor: true,
    insects: true,
    estimatedWeightKg: 45,
    governorate: 'cairo',
    locationName: 'Nasr City, Makram Ebeid St., Cairo',
    lat: 30.0626,
    lng: 31.3415
  },
  {
    id: 'sample-organic-market',
    title: 'Rotting Market Organic Waste - Dokki',
    url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    type: 'organic',
    severity: 'High',
    odor: true,
    insects: true,
    estimatedWeightKg: 120,
    governorate: 'giza',
    locationName: 'Dokki, Midan المساحة, Giza',
    lat: 30.0382,
    lng: 31.2120
  },
  {
    id: 'sample-debris-shubra',
    title: 'Construction Debris - Shubra El Kheima',
    url: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
    type: 'construction',
    severity: 'Medium',
    odor: false,
    insects: false,
    estimatedWeightKg: 450,
    governorate: 'qalyubia',
    locationName: 'Shubra El Kheima Industrial Ring, Qalyubia',
    lat: 30.1286,
    lng: 31.2422
  },
  {
    id: 'sample-medical-cairo',
    title: 'Unsecured Medical/Hazardous Waste - Heliopolis',
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    type: 'hazardous',
    severity: 'High',
    odor: true,
    insects: false,
    estimatedWeightKg: 18,
    governorate: 'cairo',
    locationName: 'Near Roxy Square & Clinics, Heliopolis, Cairo',
    lat: 30.0934,
    lng: 31.3198
  }
];

export const INITIAL_REPORTS = [
  {
    id: 'rep-101',
    title: 'Huge Plastic Accumulation Near Metro Station',
    description: 'Over 200 plastic drink bottles, foam food trays, and single-use bags scattered across the sidewalk. Obstructing commuters heading to the metro.',
    wasteType: 'plastic',
    severity: 'High',
    status: 'In Progress', // 'Pending', 'In Progress', 'Cleaned'
    locationName: 'Nasr City, Abbas El Akkad & Mostafa El Nahhas, Cairo',
    governorate: 'cairo',
    lat: 30.0571,
    lng: 31.3444,
    photoBefore: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80',
    photoAfter: null,
    reportedBy: 'Nouran El-Gendy',
    userId: 'usr-1',
    timestamp: '2 hours ago',
    date: '2026-11-20',
    authority: 'Cairo Cleaning & Beautification Authority (CCBA)',
    authorityNotes: 'Cleaning crew truck #14 assigned. Waste compaction vehicle dispatched.',
    pointsAwarded: 200,
    badOdor: true,
    insectInfestation: true,
    aiConfidence: 96,
    aiTags: ['PET Plastic Bottles (89%)', 'Polyethylene Bags (92%)', 'High Volume'],
    estimatedKg: 65
  },
  {
    id: 'rep-102',
    title: 'Decomposing Vegetable & Food Scraps Behind Bakery',
    description: 'Rotting organic food waste dumped on the roadside. Extremely sharp foul smell attracting flies and stray animals. Needs immediate municipal spraying.',
    wasteType: 'organic',
    severity: 'High',
    status: 'Cleaned',
    locationName: 'Dokki, Mossaddak Street, Giza',
    governorate: 'giza',
    lat: 30.0410,
    lng: 31.2052,
    photoBefore: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    photoAfter: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    reportedBy: 'Kareem Taha',
    userId: 'current-user',
    timestamp: 'Yesterday at 4:15 PM',
    date: '2026-11-19',
    authority: 'Giza Hygiene & Cleanliness Agency',
    authorityNotes: 'Area fully cleared, disinfected with chlorine spray, and 2 new sealed bins placed.',
    pointsAwarded: 225, // with 25 bonus
    badOdor: true,
    insectInfestation: true,
    aiConfidence: 94,
    aiTags: ['Vegetable Matter (95%)', 'Pest Risk (High)', 'Severe Odor Risk'],
    estimatedKg: 110,
    cleanedAt: 'Today at 09:30 AM'
  },
  {
    id: 'rep-103',
    title: 'Disposed Computer Monitors & Hazardous Lead Batteries',
    description: 'E-waste discarded illegally next to the public park fence. Cracked screens and leaking battery fluid visible on curb.',
    wasteType: 'electronic',
    severity: 'High',
    status: 'Pending',
    locationName: 'Degla, Maadi St. 206, Cairo',
    governorate: 'cairo',
    lat: 29.9602,
    lng: 31.2785,
    photoBefore: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
    photoAfter: null,
    reportedBy: 'Youssef Mansour',
    userId: 'usr-3',
    timestamp: '5 hours ago',
    date: '2026-11-20',
    authority: 'Waste Management Regulatory Authority (WMRA)',
    authorityNotes: 'Pending specialized hazardous e-waste handling team dispatch.',
    pointsAwarded: 200,
    badOdor: false,
    insectInfestation: false,
    aiConfidence: 91,
    aiTags: ['Circuitry (88%)', 'Cathode Tubes (93%)', 'Hazardous Heavy Metals'],
    estimatedKg: 35
  },
  {
    id: 'rep-104',
    title: 'Concrete Slabs & Red Brick Debris Blocking Walkway',
    description: 'Renovation debris dumped on the sidewalk. Forcing pedestrians to walk into oncoming vehicular traffic on the Corniche side road.',
    wasteType: 'construction',
    severity: 'Medium',
    status: 'Cleaned',
    locationName: 'Mansheya Corniche Back-Street, Alexandria',
    governorate: 'alexandria',
    lat: 31.1985,
    lng: 29.8965,
    photoBefore: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
    photoAfter: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
    reportedBy: 'Mariam Adel',
    userId: 'usr-4',
    timestamp: '3 days ago',
    date: '2026-11-17',
    authority: 'Nahdet Misr Environmental Services (Alexandria)',
    authorityNotes: 'Heavy bulldozer and 5-ton dump truck dispatched. Sidewalk fully opened.',
    pointsAwarded: 125,
    badOdor: false,
    insectInfestation: false,
    aiConfidence: 97,
    aiTags: ['Concrete Rubble (98%)', 'Red Clay Bricks (95%)', 'Walkway Obstruction'],
    estimatedKg: 650,
    cleanedAt: '2 days ago'
  },
  {
    id: 'rep-105',
    title: 'Single-Use Bags & Paper Cups in Zamalek Garden',
    description: 'Picnic waste left behind on public grass lawn near Gezira Sporting Club fence. Unsightly but non-hazardous.',
    wasteType: 'plastic',
    severity: 'Low',
    status: 'Cleaned',
    locationName: 'Shagaret El Dorr St, Zamalek, Cairo',
    governorate: 'cairo',
    lat: 30.0612,
    lng: 31.2198,
    photoBefore: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=800&q=80',
    photoAfter: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80',
    reportedBy: 'Kareem Taha',
    userId: 'current-user',
    timestamp: '4 days ago',
    date: '2026-11-16',
    authority: 'Cairo Cleaning & Beautification Authority (CCBA)',
    authorityNotes: 'Gardener team collected all loose paper and plastic into recycling bins.',
    pointsAwarded: 75,
    badOdor: false,
    insectInfestation: false,
    aiConfidence: 89,
    aiTags: ['Paper Cups (85%)', 'Snack Wrappers (90%)'],
    estimatedKg: 8,
    cleanedAt: '3 days ago'
  },
  {
    id: 'rep-106',
    title: 'Chemical Containers & Solvents Dumped Near Canal',
    description: 'Empty industrial paint drums and chemical jugs dumped dangerously close to irrigation canal bank. Immediate water pollution threat.',
    wasteType: 'hazardous',
    severity: 'High',
    status: 'In Progress',
    locationName: 'Mansoura Nile Canal Edge, Dakahlia',
    governorate: 'dakahlia',
    lat: 31.0365,
    lng: 31.3654,
    photoBefore: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80',
    photoAfter: null,
    reportedBy: 'Tamer Shawky',
    userId: 'usr-6',
    timestamp: '6 hours ago',
    date: '2026-11-20',
    authority: 'Waste Management Regulatory Authority (WMRA)',
    authorityNotes: 'Environment police and decontamination unit on route.',
    pointsAwarded: 200,
    badOdor: true,
    insectInfestation: false,
    aiConfidence: 95,
    aiTags: ['Chemical Residue (94%)', 'Flammable Drum (91%)', 'Waterway Hazard'],
    estimatedKg: 85
  }
];

export const INITIAL_USER = {
  id: 'current-user',
  name: 'Kareem Taha',
  nameAr: 'كريم طه',
  email: 'kareem.taha@ecoclean.eg',
  phone: '+20 100 234 5678',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  governorate: 'cairo',
  role: 'Eco Guardian',
  tier: 'Gold Tier Guardian',
  points: 1450,
  nextTierPoints: 2000,
  reportsSubmitted: 6,
  reportsCleaned: 4,
  totalWasteCleanedKg: 340,
  co2OffsetKg: 510,
  badges: [
    { id: 'b1', name: 'Nile Protector', desc: 'Reported 5+ locations along waterways', icon: 'ShieldCheck', color: '#0284c7' },
    { id: 'b2', name: 'Plastic Hunter', desc: 'Over 100kg of plastic waste cleared', icon: 'Recycle', color: '#059669' },
    { id: 'b3', name: 'Rapid Eye AI', desc: 'Verified 100% accurate AI classifications', icon: 'Sparkles', color: '#7c3aed' },
    { id: 'b4', name: 'Cairo Champion', desc: 'Ranked in top 50 citizen guardians in Cairo', icon: 'Award', color: '#f59e0b' }
  ]
};

export const REWARDS_CATALOG = [
  {
    id: 'rew-metro',
    title: 'Cairo Metro 15-Trip Transit Card',
    titleAr: 'كارت شحن مترو الأنفاق (15 رحلة)',
    category: 'transit',
    categoryName: 'Green Mobility',
    points: 450,
    originalValue: '75 EGP Value',
    icon: 'Train',
    partner: 'Egyptian National Tunnel Authority (NAT)',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    description: 'Ride the Cairo Metro Line 1, 2, or 3 cleanly while reducing vehicle carbon emissions across Greater Cairo.'
  },
  {
    id: 'rew-fawry',
    title: 'Fawry 100 EGP Supermarket & Grocery Credit',
    titleAr: 'قسيمة مشتريات فوري بقيمة 100 جنيه',
    category: 'groceries',
    categoryName: 'Food & Essentials',
    points: 750,
    originalValue: '100 EGP',
    icon: 'ShoppingBag',
    partner: 'Fawry Pay Egypt',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    description: 'Use at any supermarket, pharmacy, or grocery merchant accepting Fawry across Egypt.'
  },
  {
    id: 'rew-bill',
    title: '150 EGP Green Utility Bill Deduction',
    titleAr: 'خصم 150 جنيه من فاتورة الكهرباء أو المياه',
    category: 'bills',
    categoryName: 'Utilities',
    points: 1100,
    originalValue: '150 EGP Bill Credit',
    icon: 'Zap',
    partner: 'Egyptian Ministry of Electricity & Renewable Energy',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80',
    description: 'Direct credit toward your monthly residential electricity or water bill as a thank you for keeping your neighborhood clean.'
  },
  {
    id: 'rew-tree',
    title: 'Plant 2 Olive Trees in Greater Cairo Green Belt',
    titleAr: 'زراعة شجرتي زيتون في حزام القاهرة الأخضر',
    category: 'eco',
    categoryName: 'Environmental Action',
    points: 900,
    originalValue: 'Certificate & GPS Location',
    icon: 'TreePine',
    partner: 'Shagarha (شجرها) Initiative & Tree Bank Egypt',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
    description: 'Two fruitful, drought-resistant olive trees will be planted in your name with a personalized certificate and GPS coordinates to visit!'
  },
  {
    id: 'rew-carrefour',
    title: 'Carrefour Egypt 200 EGP E-Voucher',
    titleAr: 'كوبون كارفور مصر 200 جنيه للمنتجات المستدامة',
    category: 'groceries',
    categoryName: 'Eco-Shopping',
    points: 1500,
    originalValue: '200 EGP E-Voucher',
    icon: 'Store',
    partner: 'Majid Al Futtaim / Carrefour Egypt',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80',
    description: 'Redeemable on all fresh local produce, bulk grains, and reusable shopping bags at any Carrefour Egypt branch.'
  },
  {
    id: 'rew-bottle',
    title: 'EcoClean Insulated Stainless Steel Tumbler + Tote',
    titleAr: 'زجاجة حرارية صديقة للبيئة + حقيبة تسوق قطنية',
    category: 'eco',
    categoryName: 'Merchandise',
    points: 600,
    originalValue: 'Premium Eco Kit',
    icon: 'Coffee',
    partner: 'EcoClean Official Community Gear',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    description: 'Ditch single-use plastic bottles forever with our 750ml double-wall insulated flask and 100% Egyptian cotton reusable tote.'
  }
];

export const LEADERBOARD_USERS = [
  { rank: 1, name: 'Hoda Abdel-Rahman', city: 'Alexandria', points: 4820, cleanedReports: 36, badge: 'Nile Legend', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
  { rank: 2, name: 'Mostafa El-Shazly', city: 'Cairo (Nasr City)', points: 4150, cleanedReports: 29, badge: 'Eco Titan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
  { rank: 3, name: 'Salma El-Sayed', city: 'Giza (Dokki)', points: 3890, cleanedReports: 27, badge: 'Green Pioneer', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' },
  { rank: 4, name: 'Amr Helmy', city: 'Cairo (Maadi)', points: 3200, cleanedReports: 21, badge: 'Master Ranger', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
  { rank: 5, name: 'Kareem Taha (You)', city: 'Cairo (Zamalek)', points: 1450, cleanedReports: 11, badge: 'Gold Guardian', isUser: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
  { rank: 6, name: 'Yasmine Fahmy', city: 'Mansoura', points: 1390, cleanedReports: 9, badge: 'Delta Guardian', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
  { rank: 7, name: 'Omar Radwan', city: 'Tanta', points: 1120, cleanedReports: 8, badge: 'Civic Hero', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80' }
];

export const GOVERNORATE_CLEAN_RANKINGS = [
  { governorate: 'Alexandria', score: 92, reportsTotal: 4120, resolutionRate: '94%', trend: '+8%' },
  { governorate: 'Cairo', score: 88, reportsTotal: 12450, resolutionRate: '89%', trend: '+14%' },
  { governorate: 'Giza', score: 82, reportsTotal: 8320, resolutionRate: '84%', trend: '+11%' },
  { governorate: 'Dakahlia (Mansoura)', score: 79, reportsTotal: 2940, resolutionRate: '81%', trend: '+6%' },
  { governorate: 'Qalyubia', score: 74, reportsTotal: 3410, resolutionRate: '76%', trend: '+18%' }
];
