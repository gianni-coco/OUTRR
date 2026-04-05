export interface TicketTier {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
}

export interface Event {
  id: string;
  title: string;
  location_name: string;
  starts_at: string;
  price_type: 'free' | 'paid' | 'donation';
  price_amount?: number;
  category: string;
  categoryEmoji: string;
  image_url?: string;
  description: string;
  sport_type?: string;
  home_team?: string;
  away_team?: string;
  competition?: string;
  tickets?: TicketTier[];
}

const today = new Date();
const tonight = (h: number, m = 0) => {
  const d = new Date(today);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};
const tomorrow = (h: number, m = 0) => {
  const d = new Date(today);
  d.setDate(d.getDate() + 1);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};
const daysFromNow = (days: number, h: number, m = 0) => {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};
const weekend = (h: number, m = 0) => {
  const d = new Date(today);
  const dayOfWeek = d.getDay();
  const daysUntilSat = (6 - dayOfWeek + 7) % 7 || 7;
  d.setDate(d.getDate() + daysUntilSat);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

export const mockEvents: Event[] = [
  // --- MUSIC CONCERTS & LIVE BANDS ---
  {
    id: '1',
    title: 'Tame Impala — Live at RAC Arena',
    location_name: 'RAC Arena',
    starts_at: weekend(19),
    price_type: 'paid',
    price_amount: 89,
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'Perth\'s own Tame Impala return home for an epic arena show. Expect a stunning visual production with tracks spanning all four albums. Support act TBA.',
    tickets: [
      { id: 't1-1', name: 'General Admission', price: 89, description: 'Standing floor access', available: 500 },
      { id: 't1-2', name: 'Reserved Seating', price: 119, description: 'Allocated seat in the bowl', available: 300 },
      { id: 't1-3', name: 'Gold Package', price: 249, description: 'Premium seat, merch pack, early entry & signed poster', available: 25 },
    ],
  },
  {
    id: '18',
    title: 'Spacey Jane — Sundown Tour',
    location_name: 'Fremantle Arts Centre',
    starts_at: daysFromNow(3, 18),
    price_type: 'paid',
    price_amount: 55,
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'WA indie favourites Spacey Jane play the iconic outdoor stage at Freo Arts Centre. Bring a blanket, grab a drink from the bar, and soak in the vibes.',
    tickets: [
      { id: 't18-1', name: 'General Admission', price: 55, description: 'Outdoor standing/seated', available: 400 },
      { id: 't18-2', name: 'VIP', price: 110, description: 'Front-of-stage area, dedicated bar, meet & greet', available: 40 },
    ],
  },
  {
    id: '19',
    title: 'Jazz in the Basement',
    location_name: 'The Ellington Jazz Club',
    starts_at: tonight(20),
    price_type: 'paid',
    price_amount: 25,
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'Perth\'s premier jazz venue presents an evening of smooth jazz, soul and bossa nova. Intimate candlelit setting with a full cocktail menu.',
    tickets: [
      { id: 't19-1', name: 'General Admission', price: 25, description: 'Bar seating area', available: 45 },
      { id: 't19-2', name: 'Dinner + Show', price: 65, description: 'Reserved table with 2-course meal', available: 12 },
    ],
  },
  {
    id: '20',
    title: 'Ocean Alley — Live at Metro City',
    location_name: 'Metro City',
    starts_at: daysFromNow(5, 19),
    price_type: 'paid',
    price_amount: 65,
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'Psychedelic surf-rock vibes from Ocean Alley on their national tour. Known for bangers like Confidence and Lonely Diamond. 18+ event.',
    tickets: [
      { id: 't20-1', name: 'General Admission', price: 65, description: 'Standing room', available: 600 },
      { id: 't20-2', name: 'Mezzanine', price: 95, description: 'Elevated viewing platform with bar access', available: 80 },
    ],
  },
  {
    id: '21',
    title: 'San Cisco — Rooftop Sessions',
    location_name: 'The Rechabite',
    starts_at: tomorrow(18),
    price_type: 'paid',
    price_amount: 45,
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'Fremantle indie-pop legends San Cisco play an intimate rooftop set at The Rechabite in Northbridge. Sunset drinks and good vibes guaranteed.',
    tickets: [
      { id: 't21-1', name: 'General Admission', price: 45, description: 'Rooftop access', available: 150 },
      { id: 't21-2', name: 'VIP Booth', price: 120, description: 'Private booth for 4 with bottle of wine', available: 8 },
    ],
  },
  {
    id: '22',
    title: 'Methyl Ethel — Intimate Show',
    location_name: 'Badlands Bar',
    starts_at: daysFromNow(2, 20),
    price_type: 'paid',
    price_amount: 35,
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'Perth art-rock outfit Methyl Ethel play a rare intimate show at Badlands Bar. Dreamy synths and hypnotic melodies in a 200-cap venue.',
    tickets: [
      { id: 't22-1', name: 'General Admission', price: 35, description: 'Standing room', available: 80 },
    ],
  },
  {
    id: '23',
    title: 'Acoustic Open Mic Night',
    location_name: 'The Bird',
    starts_at: tomorrow(19),
    price_type: 'free',
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'Sign up to play or just come and listen. Northbridge\'s best open mic night — all genres welcome. Backline provided, just bring your instrument.',
  },
  {
    id: '24',
    title: 'Perth Symphony Orchestra — Beethoven\'s 9th',
    location_name: 'Perth Concert Hall',
    starts_at: daysFromNow(4, 19, 30),
    price_type: 'paid',
    price_amount: 45,
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'The Perth Symphony Orchestra performs Beethoven\'s monumental 9th Symphony with full chorus. A breathtaking evening of classical music.',
    tickets: [
      { id: 't24-1', name: 'Stalls', price: 45, description: 'Ground floor seating', available: 200 },
      { id: 't24-2', name: 'Dress Circle', price: 75, description: 'Premium circle seating with best acoustics', available: 60 },
      { id: 't24-3', name: 'A-Reserve', price: 95, description: 'Front 5 rows, centre block', available: 20 },
    ],
  },
  {
    id: '25',
    title: 'Blues & Roots at the Charles',
    location_name: 'Charles Hotel',
    starts_at: tonight(19),
    price_type: 'free',
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'Free live blues and roots music every week at the Charles Hotel in North Perth. Grab a pint and enjoy local bands in the beer garden.',
  },
  {
    id: '26',
    title: 'Pond — Live at Freo Social',
    location_name: 'Freo.Social',
    starts_at: weekend(20),
    price_type: 'paid',
    price_amount: 50,
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'Perth psych-rock legends Pond bring their wild live show to Freo.Social. Expect extended jams, new material, and plenty of energy.',
    tickets: [
      { id: 't26-1', name: 'General Admission', price: 50, description: 'Standing room', available: 350 },
      { id: 't26-2', name: 'Balcony', price: 75, description: 'Elevated balcony with seating', available: 50 },
    ],
  },
  {
    id: '27',
    title: 'DJ Tigerlily — Saturday Night',
    location_name: 'Villa Nightclub',
    starts_at: weekend(22),
    price_type: 'paid',
    price_amount: 30,
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'Australian DJ Tigerlily headlines a massive Saturday night at Villa. House, EDM and electro-pop until late. 18+ event.',
    tickets: [
      { id: 't27-1', name: 'Early Bird', price: 30, description: 'Entry before 11pm', available: 100 },
      { id: 't27-2', name: 'General Admission', price: 45, description: 'Entry any time', available: 300 },
      { id: 't27-3', name: 'VIP Booth', price: 350, description: 'Private booth for 6 with bottle service', available: 6 },
    ],
  },
  // --- FOOD & DRINK ---
  {
    id: '2',
    title: 'Fremantle Street Food Market',
    location_name: 'Fremantle Markets',
    starts_at: tonight(17),
    price_type: 'free',
    category: 'Food & Drink',
    categoryEmoji: '🍽️',
    description: 'Over 30 street food vendors serving cuisines from around the world. Live music, cold drinks, and a buzzing atmosphere in the heart of Freo.',
  },
  {
    id: '14',
    title: 'Swan Valley Wine & Brew Trail',
    location_name: 'Swan Valley',
    starts_at: weekend(11),
    price_type: 'paid',
    price_amount: 40,
    category: 'Food & Drink',
    categoryEmoji: '🍽️',
    description: 'Guided tour of 5 Swan Valley wineries and craft breweries with tastings at each stop. Includes a souvenir glass and cheese platter.',
    tickets: [
      { id: 't14-1', name: 'Standard Tour', price: 40, description: '5 stops with tastings', available: 20 },
    ],
  },
  // --- OUTDOORS ---
  {
    id: '3',
    title: 'Sunrise Yoga at Cottesloe',
    location_name: 'Cottesloe Beach',
    starts_at: tomorrow(6),
    price_type: 'donation',
    category: 'Outdoors',
    categoryEmoji: '🌿',
    description: 'Start your morning with a yoga session on the sand as the sun rises over the Indian Ocean. All levels welcome. BYO mat.',
  },
  {
    id: '17',
    title: 'Kings Park Wildflower Walk',
    location_name: 'Kings Park & Botanic Garden',
    starts_at: weekend(8),
    price_type: 'free',
    category: 'Outdoors',
    categoryEmoji: '🌿',
    description: 'Guided walking tour through Kings Park showcasing native wildflowers and stunning views of the Perth skyline and Swan River.',
  },
  // --- SPORT EVENTS ---
  {
    id: '4',
    title: 'Perth Glory vs Melbourne Victory',
    location_name: 'HBF Park',
    starts_at: weekend(17),
    price_type: 'paid',
    price_amount: 35,
    category: 'Sport',
    categoryEmoji: '⚽',
    sport_type: 'Football',
    home_team: 'Perth Glory',
    away_team: 'Melbourne Victory',
    competition: 'A-League',
    description: 'Perth Glory host Melbourne Victory under lights at HBF Park. Gates open 90 minutes before kick-off with food trucks and live entertainment.',
    tickets: [
      { id: 't4-1', name: 'General Admission', price: 35, description: 'Unreserved seating', available: 500 },
      { id: 't4-2', name: 'Reserved', price: 55, description: 'Allocated seat in main stand', available: 150 },
      { id: 't4-3', name: 'Premium', price: 120, description: 'Premium seat with lounge access and food', available: 20 },
    ],
  },
  {
    id: '7',
    title: 'West Coast Eagles vs Collingwood',
    location_name: 'Optus Stadium',
    starts_at: weekend(14, 10),
    price_type: 'paid',
    price_amount: 40,
    category: 'Sport',
    categoryEmoji: '🏈',
    sport_type: 'Australian Football',
    home_team: 'West Coast Eagles',
    away_team: 'Collingwood',
    competition: 'AFL',
    description: 'The Eagles take on the Magpies at Optus Stadium. One of the biggest rivalry games of the season. Get behind the blue and gold!',
    tickets: [
      { id: 't7-1', name: 'General Admission', price: 40, description: 'Unreserved seating', available: 2000 },
      { id: 't7-2', name: 'Reserved', price: 75, description: 'Allocated seat in Members Stand', available: 300 },
      { id: 't7-3', name: 'Corporate Suite', price: 350, description: 'Private suite, catering & drinks included', available: 10 },
    ],
  },
  {
    id: '8',
    title: 'Australia vs India — 4th Test Day 3',
    location_name: 'Optus Stadium',
    starts_at: daysFromNow(3, 10),
    price_type: 'paid',
    price_amount: 55,
    category: 'Sport',
    categoryEmoji: '🏏',
    sport_type: 'Cricket',
    home_team: 'Australia',
    away_team: 'India',
    competition: 'Border-Gavaskar Trophy',
    description: 'Day 3 of the 4th Test at Perth\'s Optus Stadium. Play starts at 10am. Bring sunscreen and enjoy world-class cricket in the Perth heat.',
    tickets: [
      { id: 't8-1', name: 'General Admission', price: 55, description: 'Unreserved seating', available: 1000 },
      { id: 't8-2', name: 'Premium Stand', price: 95, description: 'Covered stand with premium views', available: 200 },
      { id: 't8-3', name: 'Terrace', price: 35, description: 'Grass hill seating', available: 500 },
    ],
  },
  {
    id: '9',
    title: 'Western Force vs Queensland Reds',
    location_name: 'HBF Park',
    starts_at: daysFromNow(2, 19),
    price_type: 'paid',
    price_amount: 30,
    category: 'Sport',
    categoryEmoji: '🏉',
    sport_type: 'Rugby',
    home_team: 'Western Force',
    away_team: 'Queensland Reds',
    competition: 'Super Rugby Pacific',
    description: 'The Western Force take on the Reds in Super Rugby Pacific. Family-friendly matchday with kids\' zone and pre-game entertainment from 5pm.',
    tickets: [
      { id: 't9-1', name: 'Adult', price: 30, description: 'General admission', available: 500 },
      { id: 't9-2', name: 'Family (2+2)', price: 70, description: '2 adults + 2 children under 16', available: 80 },
      { id: 't9-3', name: 'Hospitality', price: 140, description: 'Lounge access with food & drinks', available: 15 },
    ],
  },
  {
    id: '10',
    title: 'Hopman Cup — Semi Finals',
    location_name: 'RAC Arena',
    starts_at: daysFromNow(5, 11),
    price_type: 'paid',
    price_amount: 65,
    category: 'Sport',
    categoryEmoji: '🎾',
    sport_type: 'Tennis',
    competition: 'Hopman Cup',
    description: 'Semi-final day at Perth\'s premier tennis event. Mixed doubles and singles matches featuring the world\'s best players.',
    tickets: [
      { id: 't10-1', name: 'A-Reserve', price: 120, description: 'Best seats courtside', available: 30 },
      { id: 't10-2', name: 'B-Reserve', price: 65, description: 'Great views from mid-level', available: 200 },
      { id: 't10-3', name: 'C-Reserve', price: 35, description: 'Upper level seating', available: 400 },
    ],
  },
  {
    id: '11',
    title: 'Perth Wildcats vs Sydney Kings',
    location_name: 'RAC Arena',
    starts_at: daysFromNow(4, 19, 30),
    price_type: 'paid',
    price_amount: 30,
    category: 'Sport',
    categoryEmoji: '🏀',
    sport_type: 'Basketball',
    home_team: 'Perth Wildcats',
    away_team: 'Sydney Kings',
    competition: 'NBL',
    description: 'The Perth Wildcats, Australia\'s most successful basketball club, take on the Sydney Kings. Red Army fanzone opens at 5pm.',
    tickets: [
      { id: 't11-1', name: 'General Admission', price: 30, description: 'Unreserved seating', available: 500 },
      { id: 't11-2', name: 'Courtside', price: 150, description: 'Front row courtside experience', available: 10 },
    ],
  },
  {
    id: '12',
    title: 'Beach Volleyball Tournament',
    location_name: 'Scarborough Beach',
    starts_at: weekend(9),
    price_type: 'free',
    category: 'Sport',
    categoryEmoji: '🏐',
    sport_type: 'Volleyball',
    description: 'Open beach volleyball tournament at Scarborough. Register a team of 4 or come watch the action. Food trucks and live DJ on-site.',
  },
  {
    id: '13',
    title: 'Perth City to Surf',
    location_name: 'City Beach',
    starts_at: daysFromNow(6, 7),
    price_type: 'free',
    category: 'Sport',
    categoryEmoji: '🏃',
    sport_type: 'Running',
    competition: 'City to Surf',
    description: 'Join thousands of runners and walkers in Perth\'s iconic City to Surf fun run. 12km from the CBD to City Beach with an epic ocean finish.',
  },
  // --- ARTS & CULTURE ---
  {
    id: '5',
    title: 'AGWA Late Night — New Exhibition',
    location_name: 'Art Gallery of WA',
    starts_at: tonight(18),
    price_type: 'free',
    category: 'Arts & Culture',
    categoryEmoji: '🎨',
    description: 'Late night opening at the Art Gallery of Western Australia featuring a new exhibition of contemporary Aboriginal art. Wine and canapés served.',
  },
  // --- NIGHTLIFE ---
  {
    id: '6',
    title: 'Rooftop Sunset Session',
    location_name: 'Rooftop at QT Perth',
    starts_at: tonight(17),
    price_type: 'paid',
    price_amount: 15,
    category: 'Nightlife',
    categoryEmoji: '🌙',
    description: 'Sundowner session with DJs spinning house and disco as the sun sets over Perth. Craft cocktails and city skyline views.',
    tickets: [
      { id: 't6-1', name: 'Early Bird', price: 15, description: 'Entry before 6pm', available: 50 },
      { id: 't6-2', name: 'Standard', price: 25, description: 'Entry any time', available: 100 },
    ],
  },
  {
    id: '15',
    title: 'Stand-Up Saturday',
    location_name: 'Lazy Susan\'s Comedy Den',
    starts_at: weekend(20),
    price_type: 'paid',
    price_amount: 25,
    category: 'Nightlife',
    categoryEmoji: '🌙',
    description: 'Perth\'s best stand-up comedy night featuring local and touring comedians. Doors 7pm, show 8pm. Full bar and pizza menu.',
    tickets: [
      { id: 't15-1', name: 'Standard', price: 25, description: 'General admission', available: 60 },
      { id: 't15-2', name: 'Front Row', price: 40, description: 'Be part of the show (literally)', available: 10 },
    ],
  },
  {
    id: '16',
    title: 'Northbridge Night Market',
    location_name: 'Northbridge Piazza',
    starts_at: tomorrow(17),
    price_type: 'free',
    category: 'Nightlife',
    categoryEmoji: '🌙',
    description: 'Night market with local artisan stalls, street food, live music and buskers. Every Friday night in the heart of Northbridge.',
  },
  // --- MORE FOOD & DRINK ---
  {
    id: '28',
    title: 'Rottnest Island Seafood Festival',
    location_name: 'Thomson Bay, Rottnest Island',
    starts_at: weekend(10),
    price_type: 'paid',
    price_amount: 20,
    category: 'Food & Drink',
    categoryEmoji: '🍽️',
    description: 'Celebrate WA\'s finest seafood on Rottnest Island. Fresh crayfish, oysters, and fish tacos paired with local wines and craft beers. Ferry not included.',
    tickets: [
      { id: 't28-1', name: 'Festival Entry', price: 20, description: 'Access to all food and drink stalls', available: 300 },
      { id: 't28-2', name: 'VIP Tasting', price: 75, description: 'Guided tasting tour with 6 dishes + wine pairings', available: 30 },
    ],
  },
  {
    id: '29',
    title: 'Perth Coffee Festival',
    location_name: 'Perth Convention Centre',
    starts_at: daysFromNow(3, 9),
    price_type: 'paid',
    price_amount: 15,
    category: 'Food & Drink',
    categoryEmoji: '🍽️',
    description: 'Perth\'s biggest coffee event. Over 40 roasters, barista competitions, latte art demos, and unlimited tastings. Caffeine lovers unite.',
    tickets: [
      { id: 't29-1', name: 'General Admission', price: 15, description: 'All-day access with tastings', available: 500 },
    ],
  },
  {
    id: '30',
    title: 'Leederville Farmers Market',
    location_name: 'Leederville Village',
    starts_at: weekend(7, 30),
    price_type: 'free',
    category: 'Food & Drink',
    categoryEmoji: '🍽️',
    description: 'Fresh local produce, artisan bread, organic veggies, and homemade jams. Support WA growers and enjoy free samples every Saturday morning.',
  },
  {
    id: '31',
    title: 'Dinner Under the Stars',
    location_name: 'Elizabeth Quay',
    starts_at: daysFromNow(5, 18, 30),
    price_type: 'paid',
    price_amount: 85,
    category: 'Food & Drink',
    categoryEmoji: '🍽️',
    description: 'Long-table outdoor dining experience on the waterfront at Elizabeth Quay. 5-course menu by award-winning Perth chef. BYO wine welcome.',
    tickets: [
      { id: 't31-1', name: 'Dinner Seat', price: 85, description: '5-course meal, waterfront table', available: 60 },
      { id: 't31-2', name: 'Dinner + Wine Pairing', price: 120, description: '5-course meal with matched wines', available: 30 },
    ],
  },
  // --- MORE ARTS & CULTURE ---
  {
    id: '32',
    title: 'FRINGE WORLD — Circus Spectacular',
    location_name: 'The Pleasure Garden, Northbridge',
    starts_at: tonight(19, 30),
    price_type: 'paid',
    price_amount: 30,
    category: 'Arts & Culture',
    categoryEmoji: '🎨',
    description: 'A jaw-dropping circus and acrobatics show under the Spiegeltent. Part of Perth\'s famous FRINGE WORLD Festival. Fun for all ages.',
    tickets: [
      { id: 't32-1', name: 'Standard', price: 30, description: 'General admission', available: 200 },
      { id: 't32-2', name: 'Premium', price: 55, description: 'Front rows with complimentary drink', available: 40 },
    ],
  },
  {
    id: '33',
    title: 'Aboriginal Art Workshop',
    location_name: 'Perth Cultural Centre',
    starts_at: daysFromNow(2, 10),
    price_type: 'paid',
    price_amount: 35,
    category: 'Arts & Culture',
    categoryEmoji: '🎨',
    description: 'Learn dot painting and dreamtime storytelling techniques from Noongar artists. All materials provided. Suitable for beginners. Take home your artwork.',
    tickets: [
      { id: 't33-1', name: 'Workshop', price: 35, description: '2-hour guided session, all materials included', available: 15 },
    ],
  },
  {
    id: '34',
    title: 'Shakespeare in Kings Park',
    location_name: 'Kings Park — May Drive Lawn',
    starts_at: daysFromNow(4, 18),
    price_type: 'paid',
    price_amount: 25,
    category: 'Arts & Culture',
    categoryEmoji: '🎨',
    description: 'Outdoor performance of A Midsummer Night\'s Dream in Kings Park. BYO picnic blanket and hamper. Gates open 5pm, show at 6pm.',
    tickets: [
      { id: 't34-1', name: 'Adult', price: 25, description: 'Lawn seating', available: 200 },
      { id: 't34-2', name: 'Family (2+2)', price: 60, description: '2 adults + 2 children under 16', available: 50 },
    ],
  },
  {
    id: '35',
    title: 'WA Museum — Dinosaurs After Dark',
    location_name: 'WA Museum Boola Bardip',
    starts_at: tomorrow(18),
    price_type: 'paid',
    price_amount: 18,
    category: 'Arts & Culture',
    categoryEmoji: '🎨',
    description: 'After-hours museum event with torchlight tours of the dinosaur gallery, live science demos, and a licensed bar. Adults-only evening.',
    tickets: [
      { id: 't35-1', name: 'Entry', price: 18, description: 'After-hours museum access', available: 150 },
    ],
  },
  {
    id: '36',
    title: 'PICA Opening Night',
    location_name: 'Perth Institute of Contemporary Arts',
    starts_at: daysFromNow(3, 18),
    price_type: 'free',
    category: 'Arts & Culture',
    categoryEmoji: '🎨',
    description: 'Opening night of a new multimedia exhibition exploring climate change through the lens of WA landscapes. Free wine and live DJ.',
  },
  // --- MORE OUTDOORS ---
  {
    id: '37',
    title: 'Rottnest Island Bike & Snorkel Day',
    location_name: 'Rottnest Island',
    starts_at: weekend(7),
    price_type: 'paid',
    price_amount: 50,
    category: 'Outdoors',
    categoryEmoji: '🌿',
    description: 'Full-day guided bike and snorkel tour of Rottnest Island. Cycle to secluded bays, swim with tropical fish, and meet the quokkas. Ferry not included.',
    tickets: [
      { id: 't37-1', name: 'Bike + Snorkel', price: 50, description: 'Bike hire, snorkel gear, guided tour', available: 20 },
    ],
  },
  {
    id: '38',
    title: 'Swan River Kayak at Sunset',
    location_name: 'Matilda Bay Reserve',
    starts_at: tomorrow(17),
    price_type: 'paid',
    price_amount: 40,
    category: 'Outdoors',
    categoryEmoji: '🌿',
    description: 'Paddle along the Swan River as the sun sets behind the city. See dolphins, black swans, and the Perth skyline from the water. All equipment provided.',
    tickets: [
      { id: 't38-1', name: 'Single Kayak', price: 40, description: '90-minute guided paddle', available: 12 },
      { id: 't38-2', name: 'Double Kayak', price: 65, description: '90-minute guided paddle, 2 people', available: 8 },
    ],
  },
  {
    id: '39',
    title: 'Trail Run — Bibbulmun Track',
    location_name: 'Mundaring Weir',
    starts_at: daysFromNow(2, 6, 30),
    price_type: 'free',
    category: 'Outdoors',
    categoryEmoji: '🌿',
    description: 'Free community trail run on the Bibbulmun Track through jarrah forest. 10km loop, moderate difficulty. Meet at Mundaring Weir car park.',
  },
  {
    id: '40',
    title: 'Stargazing at Gingin Observatory',
    location_name: 'Gingin Observatory',
    starts_at: daysFromNow(4, 19),
    price_type: 'paid',
    price_amount: 20,
    category: 'Outdoors',
    categoryEmoji: '🌿',
    description: 'View the Southern Cross, Milky Way and planets through powerful telescopes. Expert astronomers guide you through the night sky. 1 hour north of Perth.',
    tickets: [
      { id: 't40-1', name: 'Adult', price: 20, description: '2-hour stargazing session', available: 40 },
      { id: 't40-2', name: 'Family (2+2)', price: 50, description: '2 adults + 2 children', available: 15 },
    ],
  },
  {
    id: '41',
    title: 'Cottesloe Sculpture by the Sea',
    location_name: 'Cottesloe Beach',
    starts_at: daysFromNow(1, 8),
    price_type: 'free',
    category: 'Outdoors',
    categoryEmoji: '🌿',
    description: 'WA\'s iconic outdoor sculpture exhibition along Cottesloe Beach. Over 70 sculptures from Australian and international artists. Free guided tours at 10am and 2pm.',
  },
  // --- MORE NIGHTLIFE ---
  {
    id: '42',
    title: 'Salsa Night',
    location_name: 'The Standard, Northbridge',
    starts_at: daysFromNow(2, 20),
    price_type: 'paid',
    price_amount: 15,
    category: 'Nightlife',
    categoryEmoji: '🌙',
    description: 'Latin dance night with a 1-hour beginner salsa lesson followed by open social dancing until midnight. No partner needed!',
    tickets: [
      { id: 't42-1', name: 'Entry + Lesson', price: 15, description: 'Lesson + social dancing', available: 60 },
    ],
  },
  {
    id: '43',
    title: 'Trivia Night — Win $500',
    location_name: 'The Moon Cafe, Northbridge',
    starts_at: daysFromNow(1, 19),
    price_type: 'free',
    category: 'Nightlife',
    categoryEmoji: '🌙',
    description: 'Weekly trivia night with a $500 bar tab for the winning team. Max 6 per team. Free entry, cheap pints, and fierce competition.',
  },
  {
    id: '44',
    title: 'Karaoke Battle Royale',
    location_name: 'Planet Royale, Northbridge',
    starts_at: tomorrow(21),
    price_type: 'free',
    category: 'Nightlife',
    categoryEmoji: '🌙',
    description: 'Competitive karaoke with audience voting and prizes. Retro arcade bar vibes. Sign up on the night. Warm up those vocal cords!',
  },
  // --- MORE MUSIC ---
  {
    id: '45',
    title: 'Mallrat — Australian Tour',
    location_name: 'Magnet House',
    starts_at: daysFromNow(6, 19),
    price_type: 'paid',
    price_amount: 55,
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'Brisbane pop sensation Mallrat brings her dreamy electronic-pop to Perth. Supporting her latest album with a full live band.',
    tickets: [
      { id: 't45-1', name: 'General Admission', price: 55, description: 'Standing room', available: 250 },
    ],
  },
  {
    id: '46',
    title: 'Reggae Sunday Sessions',
    location_name: 'Indian Ocean Hotel, Scarborough',
    starts_at: daysFromNow(3, 14),
    price_type: 'free',
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'Free Sunday arvo reggae session on the beach-side deck. Local bands, cold beers, ocean views. The perfect Perth Sunday.',
  },
  {
    id: '47',
    title: 'Stella Donnelly — Homecoming Gig',
    location_name: 'Rosemount Hotel',
    starts_at: daysFromNow(5, 20),
    price_type: 'paid',
    price_amount: 40,
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'Perth indie darling Stella Donnelly plays a homecoming show at the iconic Rosemount Hotel. Witty lyrics, infectious melodies, and a crowd that knows every word.',
    tickets: [
      { id: 't47-1', name: 'General Admission', price: 40, description: 'Standing room', available: 200 },
    ],
  },
  {
    id: '48',
    title: 'Perth Hip Hop Showcase',
    location_name: 'Jack Rabbit Slim\'s',
    starts_at: daysFromNow(1, 20),
    price_type: 'paid',
    price_amount: 20,
    category: 'Music',
    categoryEmoji: '🎵',
    description: '5 local hip-hop and R&B artists perform original sets. DJs between acts. Bowling alley vibes at Jack Rabbit Slim\'s in Northbridge.',
    tickets: [
      { id: 't48-1', name: 'Entry', price: 20, description: 'Access to show + bowling', available: 100 },
    ],
  },
  {
    id: '49',
    title: 'Country Music at the Outback Bar',
    location_name: 'The Outback Bar, Scarborough',
    starts_at: weekend(18),
    price_type: 'free',
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'Live country and folk music from WA singer-songwriters. Line dancing lessons at 7pm. Cold schooners and a sunset over the beach.',
  },
  {
    id: '50',
    title: 'Fremantle Buskers Festival',
    location_name: 'Fremantle Town Centre',
    starts_at: weekend(10),
    price_type: 'free',
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'Street performers, musicians, and circus acts take over the streets of Fremantle. Multiple stages, all-day entertainment, family friendly. Tip the artists!',
  },
  // --- CHARITY BALLS & FUNDRAISERS ---
  {
    id: '51',
    title: 'Perth Children\'s Hospital Gala Ball',
    location_name: 'Crown Perth Ballroom',
    starts_at: daysFromNow(6, 18, 30),
    price_type: 'paid',
    price_amount: 195,
    category: 'Charity',
    categoryEmoji: '💜',
    description: 'Black-tie gala raising funds for the Perth Children\'s Hospital Foundation. 3-course dinner, live band, silent auction, and celebrity guest speakers. All proceeds go to paediatric research and equipment.',
    tickets: [
      { id: 't51-1', name: 'Individual Seat', price: 195, description: 'Seated dinner, drinks package, entertainment', available: 50 },
      { id: 't51-2', name: 'Table of 10', price: 1800, description: 'Premium table with 10 seats, champagne on arrival', available: 8 },
      { id: 't51-3', name: 'Platinum Sponsor Table', price: 5000, description: 'Front table, logo on screen, VIP meet & greet, 10 seats', available: 3 },
    ],
  },
  {
    id: '52',
    title: 'Telethon Community Fundraiser',
    location_name: 'RAC Arena',
    starts_at: daysFromNow(5, 10),
    price_type: 'paid',
    price_amount: 25,
    category: 'Charity',
    categoryEmoji: '💜',
    description: 'WA\'s biggest annual charity event! Family fun day with live performances, rides, celebrity appearances, and entertainment. Every dollar goes to sick kids across Western Australia.',
    tickets: [
      { id: 't52-1', name: 'Family Pass (2+2)', price: 60, description: '2 adults + 2 children, all-day access', available: 500 },
      { id: 't52-2', name: 'Adult', price: 25, description: 'All-day access', available: 1000 },
      { id: 't52-3', name: 'Child (Under 16)', price: 10, description: 'All-day access', available: 1000 },
    ],
  },
  {
    id: '53',
    title: 'RSPCA Paws & Prosecco Evening',
    location_name: 'Lamont\'s Bishop\'s House, City Beach',
    starts_at: daysFromNow(4, 18),
    price_type: 'paid',
    price_amount: 85,
    category: 'Charity',
    categoryEmoji: '💜',
    description: 'Sunset cocktail evening supporting the RSPCA WA. Prosecco on arrival, canapes, live acoustic music, and a raffle with prizes worth over $10,000. Dogs welcome!',
    tickets: [
      { id: 't53-1', name: 'General', price: 85, description: 'Prosecco, canapes, and entertainment', available: 120 },
      { id: 't53-2', name: 'VIP', price: 150, description: 'Premium bar, gift bag, priority raffle entry', available: 30 },
    ],
  },
  {
    id: '54',
    title: 'Starlight Foundation Masquerade Ball',
    location_name: 'The Westin Perth',
    starts_at: weekend(19),
    price_type: 'paid',
    price_amount: 175,
    category: 'Charity',
    categoryEmoji: '💜',
    description: 'Venetian masquerade ball raising funds for Starlight Foundation. Masks provided on arrival, 4-course dinner, DJ, live auction, and photo booth. Dress code: formal with a touch of sparkle.',
    tickets: [
      { id: 't54-1', name: 'Individual Ticket', price: 175, description: '4-course dinner, drinks, mask, entertainment', available: 80 },
      { id: 't54-2', name: 'Couples Package', price: 320, description: '2 tickets with premium seating and champagne', available: 25 },
      { id: 't54-3', name: 'Table of 10', price: 1600, description: 'Reserved table, 2 bottles of wine, premium position', available: 6 },
    ],
  },
  {
    id: '55',
    title: 'Movember Charity Run & BBQ',
    location_name: 'Langley Park',
    starts_at: daysFromNow(3, 8),
    price_type: 'paid',
    price_amount: 30,
    category: 'Charity',
    categoryEmoji: '💜',
    description: 'Community 5km fun run followed by a charity BBQ raising money for men\'s health. Moustache fancy dress encouraged! Live music, kids\' activities, and a sausage sizzle.',
    tickets: [
      { id: 't55-1', name: 'Runner', price: 30, description: '5km run entry, t-shirt, BBQ lunch', available: 300 },
      { id: 't55-2', name: 'Spectator + BBQ', price: 15, description: 'BBQ lunch and entertainment access', available: 200 },
    ],
  },
  {
    id: '56',
    title: 'Cancer Council WA — Daffodil Dinner',
    location_name: 'Perth Convention Centre',
    starts_at: daysFromNow(5, 18),
    price_type: 'paid',
    price_amount: 150,
    category: 'Charity',
    categoryEmoji: '💜',
    description: 'Elegant fundraising dinner supporting cancer research in WA. Guest speaker from the Cancer Council, 3-course meal, live entertainment, and silent auction. Yellow dress code encouraged.',
    tickets: [
      { id: 't56-1', name: 'Individual', price: 150, description: '3-course dinner with drinks package', available: 100 },
      { id: 't56-2', name: 'Table of 8', price: 1100, description: 'Reserved table with wine', available: 10 },
    ],
  },
  {
    id: '57',
    title: 'Ronald McDonald House — Casino Night',
    location_name: 'The Melbourne Hotel, Perth',
    starts_at: daysFromNow(2, 19),
    price_type: 'paid',
    price_amount: 75,
    category: 'Charity',
    categoryEmoji: '💜',
    description: 'Vegas-style casino night for charity! $500 in play chips included, blackjack, roulette, and poker tables. Top 3 chip earners win prizes. All proceeds support families of sick children.',
    tickets: [
      { id: 't57-1', name: 'Player', price: 75, description: 'Entry, $500 play chips, 2 drinks, canapes', available: 150 },
      { id: 't57-2', name: 'High Roller', price: 150, description: 'Entry, $1500 play chips, premium bar, VIP table', available: 30 },
    ],
  },
  {
    id: '58',
    title: 'Surf Lifesaving WA — Beach Ball',
    location_name: 'Scarborough Beach Pool Marquee',
    starts_at: daysFromNow(4, 18, 30),
    price_type: 'paid',
    price_amount: 120,
    category: 'Charity',
    categoryEmoji: '💜',
    description: 'Beachside charity ball supporting Surf Lifesaving WA. Marquee on the sand, seafood feast, live band, and sunset views. Smart casual — leave the stilettos at home!',
    tickets: [
      { id: 't58-1', name: 'Individual', price: 120, description: 'Seafood dinner, drinks, entertainment', available: 150 },
      { id: 't58-2', name: 'Table of 8', price: 900, description: 'Beachfront table with 2 bottles of wine', available: 10 },
    ],
  },
  {
    id: '59',
    title: 'Salvation Army Red Shield Appeal Dinner',
    location_name: 'Frasers Restaurant, Kings Park',
    starts_at: daysFromNow(6, 18),
    price_type: 'paid',
    price_amount: 130,
    category: 'Charity',
    categoryEmoji: '💜',
    description: 'Annual fundraising dinner at Frasers with panoramic views of the Perth skyline. Supporting homelessness services and crisis support across WA. Guest speaker and live auction.',
    tickets: [
      { id: 't59-1', name: 'Individual', price: 130, description: '3-course dinner, wine, entertainment', available: 80 },
      { id: 't59-2', name: 'Table of 10', price: 1200, description: 'Premium table with window views', available: 5 },
    ],
  },
  {
    id: '60',
    title: 'Rotary Club Quiz Night Fundraiser',
    location_name: 'South Perth Community Hall',
    starts_at: tomorrow(18, 30),
    price_type: 'paid',
    price_amount: 20,
    category: 'Charity',
    categoryEmoji: '💜',
    description: 'Fun quiz night raising funds for local community projects. Teams of 8, BYO food and drinks. Prizes for 1st, 2nd and best team name. Raffle and lucky door prize.',
    tickets: [
      { id: 't60-1', name: 'Individual', price: 20, description: 'Entry and quiz participation', available: 120 },
      { id: 't60-2', name: 'Table of 8', price: 140, description: 'Reserved table for your team', available: 12 },
    ],
  },
  {
    id: '61',
    title: 'Breast Cancer WA — Pink Ribbon Brunch',
    location_name: 'Cottesloe Beach Hotel',
    starts_at: weekend(10),
    price_type: 'paid',
    price_amount: 65,
    category: 'Charity',
    categoryEmoji: '💜',
    description: 'Ladies\' brunch overlooking Cottesloe Beach raising awareness and funds for breast cancer research. Guest speakers, wellness talks, goody bags, and bottomless mimosas.',
    tickets: [
      { id: 't61-1', name: 'Brunch', price: 65, description: 'Brunch, 2 mimosas, goody bag', available: 80 },
      { id: 't61-2', name: 'VIP Brunch', price: 110, description: 'Premium seating, bottomless mimosas, extra gift pack', available: 20 },
    ],
  },
  {
    id: '62',
    title: 'Habitat for Humanity — Build-a-thon',
    location_name: 'Armadale Community Centre',
    starts_at: daysFromNow(3, 8),
    price_type: 'donation',
    category: 'Charity',
    categoryEmoji: '💜',
    description: 'Volunteer your time helping build affordable housing for families in need. No construction experience required — training provided. Free BBQ lunch for all volunteers.',
  },
  {
    id: '63',
    title: 'Midnight Oil Tribute — Bushfire Relief Concert',
    location_name: 'Astor Theatre',
    starts_at: daysFromNow(1, 19, 30),
    price_type: 'paid',
    price_amount: 45,
    category: 'Charity',
    categoryEmoji: '💜',
    description: 'Tribute concert with all proceeds going to WA bushfire relief. Local bands perform Midnight Oil, ACDC, and Aussie rock classics. Raffle and donation stations throughout.',
    tickets: [
      { id: 't63-1', name: 'General Admission', price: 45, description: 'Standing room', available: 300 },
      { id: 't63-2', name: 'Reserved Seating', price: 65, description: 'Allocated balcony seat', available: 100 },
    ],
  },
  // --- PRIDE & LGBTQ+ EVENTS ---
  {
    id: '64',
    title: 'PrideFEST — Opening Night Party',
    location_name: 'The Court Hotel, Northbridge',
    starts_at: weekend(20),
    price_type: 'paid',
    price_amount: 25,
    category: 'Pride & LGBTQ+',
    categoryEmoji: '🏳️‍🌈',
    description: 'Kick off Perth PrideFEST at the iconic Court Hotel! DJs, drag performances, and dancing until late. Celebrate love, diversity, and community. All welcome.',
    tickets: [
      { id: 't64-1', name: 'General Admission', price: 25, description: 'Entry and first drink', available: 400 },
      { id: 't64-2', name: 'VIP', price: 60, description: 'Rooftop access, premium bar, meet the performers', available: 50 },
    ],
  },
  {
    id: '65',
    title: 'Pride March Perth',
    location_name: 'Russell Square to Northbridge Piazza',
    starts_at: daysFromNow(3, 11),
    price_type: 'free',
    category: 'Pride & LGBTQ+',
    categoryEmoji: '🏳️‍🌈',
    description: 'Perth\'s annual Pride March through the city! Walk alongside thousands celebrating LGBTQ+ pride and visibility. Rainbow flags, floats, music, and after-party at Northbridge Piazza.',
  },
  {
    id: '66',
    title: 'Drag Bingo Night',
    location_name: 'Connections Nightclub',
    starts_at: tomorrow(19),
    price_type: 'paid',
    price_amount: 15,
    category: 'Pride & LGBTQ+',
    categoryEmoji: '🏳️‍🌈',
    description: 'Hilarious drag bingo hosted by Perth\'s finest queens. Win prizes, enjoy cheap drinks, and get ready for some outrageous fun. Eyes down at 7:30pm!',
    tickets: [
      { id: 't66-1', name: 'Entry + Bingo Card', price: 15, description: '3 rounds of bingo', available: 100 },
      { id: 't66-2', name: 'Table Package', price: 80, description: 'Table for 6, bingo cards, bottle of bubbly', available: 10 },
    ],
  },
  {
    id: '67',
    title: 'Rainbow Community Walk — Kings Park',
    location_name: 'Kings Park — DNA Tower',
    starts_at: daysFromNow(2, 8),
    price_type: 'free',
    category: 'Pride & LGBTQ+',
    categoryEmoji: '🏳️‍🌈',
    description: 'Relaxed morning walk through Kings Park for LGBTQ+ community and allies. Meet at the DNA Tower, walk the Lotterywest Federation Walkway, and finish with coffee at the cafe. Dogs welcome!',
  },
  {
    id: '68',
    title: 'Queer Film Night — Moonlight',
    location_name: 'Rooftop Movies, Northbridge',
    starts_at: daysFromNow(1, 19, 30),
    price_type: 'paid',
    price_amount: 20,
    category: 'Pride & LGBTQ+',
    categoryEmoji: '🏳️‍🌈',
    description: 'Outdoor screening of the Academy Award-winning Moonlight under the stars. Part of the Queer Film Series. BYO blanket, bar and food trucks on-site.',
    tickets: [
      { id: 't68-1', name: 'General Admission', price: 20, description: 'Deckchair seating', available: 120 },
      { id: 't68-2', name: 'Bean Bag', price: 30, description: 'Premium bean bag for 2', available: 20 },
    ],
  },
  {
    id: '69',
    title: 'Glitter Ball — Fundraiser for LGBTQ+ Youth',
    location_name: 'The Rechabite',
    starts_at: daysFromNow(5, 19),
    price_type: 'paid',
    price_amount: 55,
    category: 'Pride & LGBTQ+',
    categoryEmoji: '🏳️‍🌈',
    description: 'Sparkle and shine at the Glitter Ball! A fundraiser supporting LGBTQ+ youth mental health services in WA. Live music, DJ, drag shows, and a silent auction. Dress code: the more glitter the better.',
    tickets: [
      { id: 't69-1', name: 'General', price: 55, description: 'Entry, entertainment, welcome drink', available: 200 },
      { id: 't69-2', name: 'Glitter VIP', price: 110, description: 'Premium bar, front row, gift bag, meet & greet', available: 30 },
    ],
  },
  {
    id: '70',
    title: 'Rainbow Families Picnic Day',
    location_name: 'Hyde Park, North Perth',
    starts_at: weekend(10),
    price_type: 'free',
    category: 'Pride & LGBTQ+',
    categoryEmoji: '🏳️‍🌈',
    description: 'Family-friendly picnic in Hyde Park for rainbow families and allies. Face painting, games, sausage sizzle, and a chance to connect with other LGBTQ+ families in Perth.',
  },
  {
    id: '71',
    title: 'Proud & Loud Karaoke',
    location_name: 'The Court Hotel, Northbridge',
    starts_at: daysFromNow(1, 20),
    price_type: 'free',
    category: 'Pride & LGBTQ+',
    categoryEmoji: '🏳️‍🌈',
    description: 'Belting out your favourite anthems with the LGBTQ+ community. From Cher to Lady Gaga — no judgment, just joy. Hosted by a fabulous drag queen MC.',
  },
  {
    id: '72',
    title: 'Queer Book Club — Monthly Meetup',
    location_name: 'Planet Books, Northbridge',
    starts_at: daysFromNow(4, 18),
    price_type: 'free',
    category: 'Pride & LGBTQ+',
    categoryEmoji: '🏳️‍🌈',
    description: 'Monthly book club for LGBTQ+ readers and allies. This month: "Detransition, Baby" by Torrey Peters. Relaxed discussion over wine and snacks at Planet Books.',
  },
  {
    id: '73',
    title: 'Sapphic Social — Rooftop Drinks',
    location_name: 'Rooftop at QT Perth',
    starts_at: daysFromNow(2, 17),
    price_type: 'free',
    category: 'Pride & LGBTQ+',
    categoryEmoji: '🏳️‍🌈',
    description: 'Casual sunset drinks for queer women and non-binary folks. Meet new people, enjoy cocktails, and take in the city views. All welcome, just rock up!',
  },
  {
    id: '74',
    title: 'Trans Day of Visibility — Community Gathering',
    location_name: 'Perth Cultural Centre',
    starts_at: daysFromNow(3, 14),
    price_type: 'free',
    category: 'Pride & LGBTQ+',
    categoryEmoji: '🏳️‍🌈',
    description: 'Community gathering celebrating trans and gender-diverse people. Guest speakers, live music, art exhibition, and resource stalls. A safe, affirming space for everyone.',
  },
  {
    id: '75',
    title: 'Vogue Ball Perth',
    location_name: 'State Theatre Centre',
    starts_at: daysFromNow(6, 20),
    price_type: 'paid',
    price_amount: 35,
    category: 'Pride & LGBTQ+',
    categoryEmoji: '🏳️‍🌈',
    description: 'Perth\'s underground ballroom scene takes the stage! Categories include runway, vogue femme, face, and realness. All houses welcome. Audience tickets available — come cheer and be amazed.',
    tickets: [
      { id: 't75-1', name: 'Audience', price: 35, description: 'Seated audience viewing', available: 200 },
      { id: 't75-2', name: 'Front Row', price: 55, description: 'Front row with complimentary drink', available: 30 },
    ],
  },
  {
    id: '76',
    title: 'Pride Charity Fun Run — 5km Rainbow Run',
    location_name: 'South Perth Foreshore',
    starts_at: daysFromNow(4, 8),
    price_type: 'paid',
    price_amount: 30,
    category: 'Pride & LGBTQ+',
    categoryEmoji: '🏳️‍🌈',
    description: 'Colour run along the Swan River raising funds for LGBTQ+ mental health services. Get covered in rainbow powder at each kilometre! Costumes encouraged. Finish line party with live DJ.',
    tickets: [
      { id: 't76-1', name: 'Runner', price: 30, description: '5km entry, rainbow t-shirt, colour powder', available: 300 },
      { id: 't76-2', name: 'Spectator', price: 10, description: 'Colour station volunteer + finish line party', available: 100 },
    ],
  },
  // --- CROWN PERTH — CONCERTS & MUSICALS ---
  {
    id: '77',
    title: 'The Phantom of the Opera',
    location_name: 'Crown Theatre Perth',
    starts_at: daysFromNow(2, 19, 30),
    price_type: 'paid',
    price_amount: 79,
    category: 'Arts & Culture',
    categoryEmoji: '🎨',
    description: 'Andrew Lloyd Webber\'s iconic musical returns to Perth. Experience the chandelier, the music, and the magic in Crown Theatre\'s stunning 2,300-seat venue. Running for 6 weeks only.',
    tickets: [
      { id: 't77-1', name: 'C-Reserve', price: 79, description: 'Upper balcony seating', available: 200 },
      { id: 't77-2', name: 'B-Reserve', price: 129, description: 'Dress circle seating', available: 150 },
      { id: 't77-3', name: 'A-Reserve', price: 179, description: 'Stalls centre block', available: 80 },
      { id: 't77-4', name: 'Premium', price: 249, description: 'Front stalls, programme & champagne', available: 20 },
    ],
  },
  {
    id: '78',
    title: 'John Legend — An Evening with John Legend',
    location_name: 'Crown Theatre Perth',
    starts_at: daysFromNow(5, 20),
    price_type: 'paid',
    price_amount: 120,
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'Grammy and Oscar-winning artist John Legend brings his soulful piano-driven show to Crown Theatre. An intimate evening of hits including All of Me, Ordinary People, and new material.',
    tickets: [
      { id: 't78-1', name: 'B-Reserve', price: 120, description: 'Dress circle seating', available: 100 },
      { id: 't78-2', name: 'A-Reserve', price: 189, description: 'Stalls seating', available: 80 },
      { id: 't78-3', name: 'Gold', price: 289, description: 'Front 3 rows, signed poster, pre-show drinks', available: 15 },
    ],
  },
  {
    id: '79',
    title: 'Wicked — The Musical',
    location_name: 'Crown Theatre Perth',
    starts_at: weekend(14),
    price_type: 'paid',
    price_amount: 69,
    category: 'Arts & Culture',
    categoryEmoji: '🎨',
    description: 'The smash-hit Broadway musical Wicked flies into Perth! The untold story of the Witches of Oz — friendship, jealousy, and a gravity-defying showstopper. Matinee performance.',
    tickets: [
      { id: 't79-1', name: 'C-Reserve', price: 69, description: 'Upper balcony', available: 180 },
      { id: 't79-2', name: 'B-Reserve', price: 119, description: 'Dress circle', available: 120 },
      { id: 't79-3', name: 'A-Reserve', price: 169, description: 'Stalls centre', available: 60 },
      { id: 't79-4', name: 'Premium', price: 229, description: 'Premium stalls with programme & interval drinks', available: 25 },
    ],
  },
  {
    id: '80',
    title: 'Michael Bublé — Higher Tour',
    location_name: 'Crown Theatre Perth',
    starts_at: daysFromNow(4, 20),
    price_type: 'paid',
    price_amount: 130,
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'The king of swing is back! Michael Bublé performs his greatest hits with a full big band. Expect Feeling Good, Haven\'t Met You Yet, and plenty of charm.',
    tickets: [
      { id: 't80-1', name: 'B-Reserve', price: 130, description: 'Dress circle seating', available: 120 },
      { id: 't80-2', name: 'A-Reserve', price: 199, description: 'Stalls seating', available: 80 },
      { id: 't80-3', name: 'Platinum', price: 350, description: 'Front row, backstage tour, signed merch', available: 8 },
    ],
  },
  {
    id: '81',
    title: 'Hamilton — The Musical',
    location_name: 'Crown Theatre Perth',
    starts_at: daysFromNow(3, 19),
    price_type: 'paid',
    price_amount: 89,
    category: 'Arts & Culture',
    categoryEmoji: '🎨',
    description: 'The revolutionary musical finally arrives in Perth! Lin-Manuel Miranda\'s hip-hop retelling of Alexander Hamilton\'s life. Don\'t throw away your shot — tickets selling fast.',
    tickets: [
      { id: 't81-1', name: 'C-Reserve', price: 89, description: 'Upper balcony', available: 100 },
      { id: 't81-2', name: 'B-Reserve', price: 149, description: 'Dress circle', available: 80 },
      { id: 't81-3', name: 'A-Reserve', price: 219, description: 'Stalls centre block', available: 40 },
      { id: 't81-4', name: 'Premium', price: 329, description: 'Premium stalls, programme, interval champagne', available: 12 },
    ],
  },
  {
    id: '82',
    title: 'Adele — Weekends at Crown',
    location_name: 'Crown Theatre Perth',
    starts_at: weekend(20),
    price_type: 'paid',
    price_amount: 150,
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'Global superstar Adele performs at Crown Theatre for a limited run. Rolling in the Deep, Someone Like You, Easy On Me — an unforgettable evening of powerhouse vocals.',
    tickets: [
      { id: 't82-1', name: 'B-Reserve', price: 150, description: 'Dress circle', available: 80 },
      { id: 't82-2', name: 'A-Reserve', price: 249, description: 'Stalls seating', available: 50 },
      { id: 't82-3', name: 'Diamond', price: 499, description: 'Front 2 rows, meet & greet, signed vinyl', available: 6 },
    ],
  },
  {
    id: '83',
    title: 'Moulin Rouge! The Musical',
    location_name: 'Crown Theatre Perth',
    starts_at: daysFromNow(1, 19, 30),
    price_type: 'paid',
    price_amount: 75,
    category: 'Arts & Culture',
    categoryEmoji: '🎨',
    description: 'Enter a world of splendour and romance! The spectacular Moulin Rouge! The Musical brings Baz Luhrmann\'s cinematic masterpiece to the stage with over 70 songs remixed into a theatrical experience.',
    tickets: [
      { id: 't83-1', name: 'C-Reserve', price: 75, description: 'Upper balcony', available: 150 },
      { id: 't83-2', name: 'B-Reserve', price: 125, description: 'Dress circle', available: 100 },
      { id: 't83-3', name: 'A-Reserve', price: 185, description: 'Stalls centre', available: 50 },
      { id: 't83-4', name: 'Moulin Rouge VIP', price: 295, description: 'Premium seat, Moulin Rouge cocktail, programme, poster', available: 15 },
    ],
  },
  {
    id: '84',
    title: 'Ed Sheeran — Mathematics Tour',
    location_name: 'Crown Theatre Perth',
    starts_at: daysFromNow(6, 19, 30),
    price_type: 'paid',
    price_amount: 110,
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'Ed Sheeran brings his one-man-band magic to an intimate Crown Theatre setting. Just Ed, his guitar, and a loop pedal. Hits from +, x, ÷, =, and - all in one night.',
    tickets: [
      { id: 't84-1', name: 'B-Reserve', price: 110, description: 'Dress circle', available: 100 },
      { id: 't84-2', name: 'A-Reserve', price: 179, description: 'Stalls seating', available: 60 },
      { id: 't84-3', name: 'Gold Circle', price: 299, description: 'First 5 rows, limited edition poster', available: 10 },
    ],
  },
  {
    id: '85',
    title: 'Chicago — The Musical',
    location_name: 'Crown Theatre Perth',
    starts_at: daysFromNow(3, 14),
    price_type: 'paid',
    price_amount: 65,
    category: 'Arts & Culture',
    categoryEmoji: '🎨',
    description: 'All That Jazz! The longest-running American musical in Broadway history comes to Perth. Razzle-dazzle choreography, iconic songs, and a story of crime, corruption, and celebrity.',
    tickets: [
      { id: 't85-1', name: 'C-Reserve', price: 65, description: 'Upper balcony', available: 200 },
      { id: 't85-2', name: 'B-Reserve', price: 99, description: 'Dress circle', available: 120 },
      { id: 't85-3', name: 'A-Reserve', price: 149, description: 'Stalls centre', available: 60 },
    ],
  },
  {
    id: '86',
    title: 'Crown Live Lounge — Fleetwood Mac Tribute',
    location_name: 'Crown Towers Lobby Lounge',
    starts_at: tonight(20),
    price_type: 'free',
    category: 'Music',
    categoryEmoji: '🎵',
    description: 'Free live music at Crown Towers Lobby Lounge. Tonight: Rumours — Perth\'s premier Fleetwood Mac tribute band. Grab a cocktail and enjoy Dreams, The Chain, and Go Your Own Way.',
  },
  {
    id: '87',
    title: 'Crown Comedy Club — Ross Noble',
    location_name: 'Crown Ballroom',
    starts_at: tomorrow(20),
    price_type: 'paid',
    price_amount: 55,
    category: 'Nightlife',
    categoryEmoji: '🌙',
    description: 'British comedy legend Ross Noble brings his chaotic, improvisational brilliance to Crown. No two shows are the same. Warning: your face will hurt from laughing.',
    tickets: [
      { id: 't87-1', name: 'General Admission', price: 55, description: 'Seated in Crown Ballroom', available: 200 },
      { id: 't87-2', name: 'VIP', price: 95, description: 'Front 3 rows, meet & greet, signed photo', available: 20 },
    ],
  },
  {
    id: '88',
    title: 'Crown New Year\'s Eve Gala',
    location_name: 'Crown Perth Grand Ballroom',
    starts_at: daysFromNow(5, 19),
    price_type: 'paid',
    price_amount: 250,
    category: 'Nightlife',
    categoryEmoji: '🌙',
    description: 'Perth\'s most glamorous NYE party at Crown. 5-course dinner, premium open bar, live band, DJ until 3am, and fireworks over the Swan River at midnight. Black tie.',
    tickets: [
      { id: 't88-1', name: 'Individual', price: 250, description: '5-course dinner, premium drinks, entertainment', available: 100 },
      { id: 't88-2', name: 'Couples', price: 450, description: '2 tickets, champagne toast, premium table', available: 40 },
      { id: 't88-3', name: 'Table of 10', price: 2200, description: 'Premium table, 2 bottles champagne, priority seating', available: 8 },
    ],
  },
];

// In-memory saved events store
const savedEventIds = new Set<string>();

// In-memory purchased tickets
export interface PurchasedTicket {
  eventId: string;
  ticketTierId: string;
  tierName: string;
  quantity: number;
  totalPrice: number;
  purchasedAt: string;
  confirmationCode: string;
}

const purchasedTickets: PurchasedTicket[] = [];

export function purchaseTicket(eventId: string, tierId: string, quantity: number): PurchasedTicket {
  const event = getEventById(eventId);
  if (!event) throw new Error('Event not found');

  const tier = event.tickets?.find((t) => t.id === tierId);
  if (!tier) throw new Error('Ticket tier not found');
  if (tier.available < quantity) throw new Error('Not enough tickets available');

  tier.available -= quantity;

  const ticket: PurchasedTicket = {
    eventId,
    ticketTierId: tierId,
    tierName: tier.name,
    quantity,
    totalPrice: tier.price * quantity,
    purchasedAt: new Date().toISOString(),
    confirmationCode: 'OUTRR-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
  };

  purchasedTickets.push(ticket);
  return ticket;
}

export function getPurchasedTickets(): PurchasedTicket[] {
  return [...purchasedTickets];
}

export function getSavedEventIds(): Set<string> {
  return savedEventIds;
}

export function toggleSaveEvent(id: string): boolean {
  if (savedEventIds.has(id)) {
    savedEventIds.delete(id);
    return false;
  }
  savedEventIds.add(id);
  return true;
}

export function getSavedEvents(): Event[] {
  return mockEvents.filter((e) => savedEventIds.has(e.id));
}

export function getEventById(id: string): Event | undefined {
  return mockEvents.find((e) => e.id === id);
}

export function getSportsEvents(): Event[] {
  return mockEvents.filter((e) => e.category === 'Sport');
}

export function getTonightEvents(): Event[] {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  return mockEvents.filter((e) => {
    const d = new Date(e.starts_at);
    return d >= now && d <= endOfDay;
  });
}

export function getEventsByCategory(category: string): Event[] {
  return mockEvents.filter((e) => e.category === category);
}
