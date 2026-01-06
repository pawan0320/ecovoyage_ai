
import { ChartDataPoint, GeoPoint, APTemple, APCircuit, StayOption } from './types';

// --- STAYS DATABASE ---
export const ALL_STAYS: StayOption[] = [
  // 1. Top Resorts (Beach & Nature)
  { id: 'r1', name: 'The Bheemli Resort (Accor)', type: 'RESORT', location: 'Bheemili, Vizag', price: 12500, priceUnit: 'night', rating: 4.8, amenities: ['Infinity Pool', 'Bay View', 'Spa', '5-Star'], suitableFor: ['FAMILY', 'LUXURY'], image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80', verified: true, description: '5-star luxury with an infinity pool and bay views.' },
  { id: 'r2', name: 'Riviera Beach Resort', type: 'RESORT', location: 'Visakhapatnam', price: 7500, priceUnit: 'night', rating: 4.5, amenities: ['Beach Access', 'Family Suites', 'Restaurant'], suitableFor: ['FAMILY', 'BACHELOR'], image: 'https://images.unsplash.com/photo-1571896349842-760c5e31c8cd?auto=format&fit=crop&w=800&q=80', verified: true, description: 'Popular beachside resort with high family ratings.' },
  { id: 'r3', name: 'Sterling Palavelli Godavari', type: 'RESORT', location: 'Konaseema', price: 9000, priceUnit: 'night', rating: 4.7, amenities: ['Riverfront', 'Boating', 'Ayurveda Spa'], suitableFor: ['FAMILY', 'LUXURY'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', verified: true, description: 'Riverfront resort with a spa and water activities.' },
  { id: 'r4', name: 'ALA Beach Resort', type: 'RESORT', location: 'Chirala', price: 6500, priceUnit: 'night', rating: 4.4, amenities: ['Private Beach', 'Cottages', 'Bonfire'], suitableFor: ['FAMILY', 'BACHELOR'], image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80', description: 'Famous for serene beach access and modern amenities.' },
  { id: 'r5', name: 'Yanam Resorts', type: 'RESORT', location: 'Yanam', price: 5500, priceUnit: 'night', rating: 4.3, amenities: ['Delta View', 'Seafood', 'Quiet'], suitableFor: ['FAMILY', 'BACHELOR'], image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', description: 'A peaceful getaway near the Godavari delta.' },
  { id: 'r6', name: 'Mango Resort', type: 'RESORT', location: 'Vijayawada', price: 4800, priceUnit: 'night', rating: 4.2, amenities: ['Lush Greenery', 'Eco-Friendly', 'Pool'], suitableFor: ['FAMILY', 'STUDENT'], image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80', description: 'Known for its lush greenery and quiet atmosphere.' },

  // 2. Luxury & Private Villas
  { id: 'v1', name: 'KMV Vivaan Villas', type: 'VILLA', location: 'Vijayawada', price: 18000, priceUnit: 'night', rating: 4.9, amenities: ['Modern Architecture', 'Private Pool', 'Butler'], suitableFor: ['LUXURY', 'FAMILY'], image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80', verified: true, description: 'Premium luxury villas with modern architecture.' },
  { id: 'v2', name: 'Cabana Villa', type: 'VILLA', location: 'Visakhapatnam', price: 15000, priceUnit: 'night', rating: 4.8, amenities: ['Private Stay', 'Events', 'Sea View'], suitableFor: ['LUXURY', 'BACHELOR'], image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80', description: 'Highly-rated (4.8/5) for private stays and events.' },
  { id: 'v3', name: 'Aura Villas', type: 'VILLA', location: 'Vijayawada', price: 14000, priceUnit: 'night', rating: 4.7, amenities: ['Spacious Interiors', 'Garden', 'Gated'], suitableFor: ['FAMILY', 'LUXURY'], image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80', description: 'Upscale villa experience with spacious interiors.' },
  { id: 'v4', name: 'Vasundhara’s Brookfield', type: 'VILLA', location: 'Vijayawada', price: 12000, priceUnit: 'night', rating: 4.6, amenities: ['Community', 'Green Surroundings', 'Safe'], suitableFor: ['FAMILY'], image: 'https://images.unsplash.com/photo-1600596542815-22b489863863?auto=format&fit=crop&w=800&q=80', description: 'Peaceful villa community with green surroundings.' },
  { id: 'v5', name: 'Kaizen Homes Villas', type: 'VILLA', location: 'Guntur', price: 11000, priceUnit: 'night', rating: 4.5, amenities: ['Contemporary', 'Kitchen', '3BHK'], suitableFor: ['FAMILY', 'BUSINESS'], image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', description: 'Contemporary villa units for family vacations.' },

  // 3. Popular Hotels (Premium & Mid-Range)
  { id: 'h1', name: 'The Port Hotel', type: 'HOTEL', location: 'Visakhapatnam', price: 4500, priceUnit: 'night', rating: 4.6, amenities: ['Naval Theme', 'Chic Rooms', 'Fine Dining'], suitableFor: ['BUSINESS', 'BACHELOR', 'FAMILY'], image: 'https://images.unsplash.com/photo-1522771753035-4a504632a425?auto=format&fit=crop&w=800&q=80', verified: true, description: 'Naval-themed chic rooms and dining.' },
  { id: 'h2', name: 'Hotel Bluestone 2', type: 'HOTEL', location: 'Vijayawada', price: 3800, priceUnit: 'night', rating: 4.8, amenities: ['Budget Luxury', 'City Center', 'WiFi'], suitableFor: ['BUSINESS', 'FAMILY'], image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80', description: 'Top-rated budget luxury with a 4.8/5 rating.' },
  { id: 'h3', name: 'Mango Hotels Vybrant', type: 'HOTEL', location: 'Visakhapatnam', price: 3200, priceUnit: 'night', rating: 4.3, amenities: ['Trendy', 'City Access', 'Bar'], suitableFor: ['BACHELOR', 'BUSINESS'], image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80', description: 'Trendy 3-star hotel with great city access.' },
  { id: 'h4', name: 'Haian - An Olive Tree', type: 'HOTEL', location: 'Vijayawada', price: 4200, priceUnit: 'night', rating: 4.5, amenities: ['Great Food', 'Business Center', 'Modern'], suitableFor: ['BUSINESS', 'FAMILY'], image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80', description: 'Excellent for business travelers and food.' },
  { id: 'h5', name: 'Hotel MN Stays', type: 'HOTEL', location: 'Tirupati', price: 2500, priceUnit: 'night', rating: 4.4, amenities: ['Clean', 'Near Temple', 'Veg Food'], suitableFor: ['FAMILY', 'STUDENT'], image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?auto=format&fit=crop&w=800&q=80', description: 'Clean and modern, ideal for temple visitors.' },

  // 4. APTDC Haritha Hotels (Government Heritage)
  { id: 'g1', name: 'Haritha Beach Resort', type: 'GOV', location: 'Rushikonda, Vizag', price: 3500, priceUnit: 'night', rating: 4.3, amenities: ['Hilltop View', 'Ocean Facing', 'APTDC'], suitableFor: ['FAMILY', 'BUDGET'], image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', verified: true, description: 'Hilltop views of the ocean.' },
  { id: 'g2', name: 'Haritha Valley Resort', type: 'GOV', location: 'Araku Valley', price: 2800, priceUnit: 'night', rating: 4.4, amenities: ['Wooden Cottages', 'Cool Climate', 'Nature'], suitableFor: ['FAMILY', 'BACHELOR'], image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80', description: 'Famous for its wooden cottages and cool climate.' },
  { id: 'g3', name: 'Haritha Hill Resort', type: 'GOV', location: 'Horsley Hills', price: 3200, priceUnit: 'night', rating: 4.2, amenities: ['Panoramic Views', 'Altitude', 'Trek'], suitableFor: ['FAMILY', 'BACHELOR'], image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80', description: 'Located at a high altitude with panoramic views.' },
  { id: 'g4', name: 'Haritha Coconut Country', type: 'GOV', location: 'Dindi', price: 4000, priceUnit: 'night', rating: 4.5, amenities: ['Backwaters', 'Houseboat', 'Peaceful'], suitableFor: ['FAMILY', 'LUXURY'], image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c78?auto=format&fit=crop&w=800&q=80', description: 'Best for backwater stays and houseboat tours.' },

  // 5. PGs & Student Accommodations
  { id: 'p1', name: 'Stanza Living (Vijayawada)', type: 'PG', location: 'Benz Circle, Vijayawada', price: 8500, priceUnit: 'month', rating: 4.5, amenities: ['Meals', 'WiFi', 'Laundry', 'Security'], suitableFor: ['STUDENT', 'BACHELOR'], deposit: 4000, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80', verified: true, description: 'Popular in Vijayawada for students and professionals.' },
  { id: 'p2', name: 'ZoloStay (Vizag)', type: 'PG', location: 'MVP Colony, Vizag', price: 7500, priceUnit: 'month', rating: 4.3, amenities: ['Furnished', 'No Brokerage', 'Housekeeping'], suitableFor: ['STUDENT', 'BACHELOR'], deposit: 3000, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', description: 'Reliable for managed co-living spaces.' },
  { id: 'p3', name: 'Local Ladies PG', type: 'PG', location: 'Guntur', price: 5500, priceUnit: 'month', rating: 4.0, amenities: ['Home Food', 'CCTV', 'Biometric'], suitableFor: ['STUDENT'], deposit: 2000, image: 'https://images.unsplash.com/photo-1596276020587-8044fe049813?auto=format&fit=crop&w=800&q=80', description: 'Verified local owners with secure facilities.' }
];

// --- AP DATASETS (COMPREHENSIVE) ---

export const AP_TEMPLES: APTemple[] = [
  // 1. 360 VR & GLOBAL PROMOTION (Immersive)
  { id: 'vr1', name: 'Tirumala Venkateswara', district: 'Tirupati', significance: 'Richest Hindu Temple', deity: 'Lord Venkateswara', themes: ['360_VR', 'SPIRITUAL_CIRCUIT'], image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg', access: 'Road', darshanTypes: ['Special Entry', 'Sarva Darshan'], bestSeason: 'All Year' },
  { id: 'vr2', name: 'Srisailam Mallikarjuna', district: 'Nandyal', significance: 'Jyotirlinga + Shakti Peetha', deity: 'Shiva & Bhramaramba', themes: ['360_VR', 'SPIRITUAL_CIRCUIT', 'NATURE', 'SHAKTI'], image: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Srisailam_Temple.jpg', access: 'Road', darshanTypes: ['Seeghra', 'Sparsha'], bestSeason: 'Oct-Mar' },
  { id: 'vr3', name: 'Kanaka Durga', district: 'Vijayawada', significance: 'Powerful Shakti Peetha', deity: 'Kanaka Durga', themes: ['360_VR', 'SPIRITUAL_CIRCUIT', 'SHAKTI'], image: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Kanaka_Durga_Temple_Vijayawada.jpg', access: 'Road', darshanTypes: ['Mukhamandapa'], bestSeason: 'Sep-Feb' },
  { id: 'vr4', name: 'Lepakshi Veerabhadra', district: 'Sri Sathya Sai', significance: 'Hanging Pillar Marvel', deity: 'Veerabhadra', themes: ['360_VR', 'HERITAGE'], image: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Lepakshi_Nandi.jpg', access: 'Road', darshanTypes: ['Entry Ticket'], bestSeason: 'Aug-Feb' },
  { id: 'vr5', name: 'Simhachalam', district: 'Visakhapatnam', significance: 'Varaha Narasimha', deity: 'Narasimha', themes: ['360_VR', 'SPIRITUAL_CIRCUIT', 'NATURE'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Simhachalam_Temple_View.jpg/1280px-Simhachalam_Temple_View.jpg', access: 'Road', darshanTypes: ['Special'], bestSeason: 'Oct-Mar' },
  { id: 'vr6', name: 'Yaganti Uma Maheswara', district: 'Kurnool', significance: 'Growing Nandi', deity: 'Shiva', themes: ['360_VR', 'NATURE', 'HERITAGE'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Yaganti_Temple_Kurnool.jpg/1200px-Yaganti_Temple_Kurnool.jpg', access: 'Road', darshanTypes: ['General'], bestSeason: 'Winter' },
  { id: 'vr7', name: 'Belum Caves', district: 'Kurnool', significance: 'Meditation Zone', deity: 'Buddha (Statue)', themes: ['360_VR', 'ADVENTURE', 'HERITAGE'], image: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Belum_Caves_Inside_View.jpg', access: 'Road', darshanTypes: ['Ticket'], bestSeason: 'Aug-Feb' },

  // 2. PANCHARAMA KSHETRAS (Shiva Circuit)
  { id: 'pk1', name: 'Amararama', district: 'Guntur', significance: 'Pancharama', deity: 'Shiva', themes: ['SPIRITUAL_CIRCUIT', 'HERITAGE'], image: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Amaravati_Stupa.jpg', access: 'Road', darshanTypes: ['Abhishekam'], bestSeason: 'Winter' },
  { id: 'pk2', name: 'Draksharama', district: 'Konaseema', significance: 'Pancharama (Dakshina Kashi)', deity: 'Shiva', themes: ['SPIRITUAL_CIRCUIT', 'SHAKTI'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Draksharamam_Temple_East_Godavari.jpg/640px-Draksharamam_Temple_East_Godavari.jpg', access: 'Road', darshanTypes: ['General'], bestSeason: 'Winter' },
  { id: 'pk3', name: 'Somarama', district: 'Bhimavaram', significance: 'Pancharama (Moon Color Change)', deity: 'Shiva', themes: ['SPIRITUAL_CIRCUIT'], image: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Somaramam_Temple_Gunupudi.jpg', access: 'Road', darshanTypes: ['General'], bestSeason: 'Winter' },
  { id: 'pk4', name: 'Ksheerarama', district: 'Palakollu', significance: 'Pancharama (White Linga)', deity: 'Shiva', themes: ['SPIRITUAL_CIRCUIT'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Ksheerarama_Temple_Gopuram.jpg/1200px-Ksheerarama_Temple_Gopuram.jpg', access: 'Road', darshanTypes: ['General'], bestSeason: 'Winter' },
  { id: 'pk5', name: 'Kumararama', district: 'Samalkota', significance: 'Pancharama (Limestone Linga)', deity: 'Shiva', themes: ['SPIRITUAL_CIRCUIT'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Kumararama_Bheemeshwara_Swamy_Temple.jpg/1200px-Kumararama_Bheemeshwara_Swamy_Temple.jpg', access: 'Road', darshanTypes: ['General'], bestSeason: 'Winter' },

  // 3. WILDLIFE & TIGER RESERVE (Rare USP)
  { id: 'wl1', name: 'Ishta Kameshwari', district: 'Nallamala Forest', significance: 'Deep Forest Shakti', deity: 'Kameshwari', themes: ['WILDLIFE', 'ADVENTURE', 'SHAKTI'], image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=400&q=80', access: 'Jeep', darshanTypes: ['Forest Permit'], bestSeason: 'Feb-Jun' },
  { id: 'wl2', name: 'Akka Mahadevi Caves', district: 'Srisailam', significance: 'Natural Cave Shiva Linga', deity: 'Shiva', themes: ['WILDLIFE', 'ADVENTURE', 'NATURE'], image: 'https://images.unsplash.com/photo-1506260408121-e353d10b87c7?auto=format&fit=crop&w=400&q=80', access: 'Boat', darshanTypes: ['Boat Ticket'], bestSeason: 'Nov-Mar' },
  { id: 'wl3', name: 'Gundla Brahmeswaram', district: 'GBM Sanctuary', significance: 'Core Tiger Habitat', deity: 'Shiva', themes: ['WILDLIFE', 'NATURE'], image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=400&q=80', access: 'Trek', darshanTypes: ['Restricted'], bestSeason: 'Shivaratri' },
  { id: 'wl4', name: 'Talakona Siddeswara', district: 'Tirupati Forest', significance: 'Waterfall Temple', deity: 'Shiva', themes: ['WILDLIFE', 'NATURE', 'ADVENTURE'], image: 'https://images.unsplash.com/photo-1463693396721-8ca0cfa2b3b5?auto=format&fit=crop&w=400&q=80', access: 'Trek', darshanTypes: ['General'], bestSeason: 'Sep-Jan' },

  // 4. ADVENTURE & TREKKING
  { id: 'adv1', name: 'Ahobilam (Upper)', district: 'Nallamala', significance: 'Ugra Sthambham Trek', deity: 'Narasimha', themes: ['ADVENTURE', 'SPIRITUAL_CIRCUIT', 'NATURE'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Ahobilam_Ugra_Stambham.jpg/1200px-Ahobilam_Ugra_Stambham.jpg', access: 'Trek', darshanTypes: ['Guide Req'], bestSeason: 'Aug-Feb' },
  { id: 'adv2', name: 'Gandikota Fort', district: 'Kadapa', significance: 'Grand Canyon of India', deity: 'Madhavaraya', themes: ['ADVENTURE', 'HERITAGE', 'NATURE'], image: 'https://images.unsplash.com/photo-1590417764956-628489433433?auto=format&fit=crop&w=800&q=80', access: 'Road', darshanTypes: ['Free'], bestSeason: 'Sep-Feb' },
  { id: 'adv3', name: 'Kondaveedu Fort', district: 'Guntur', significance: 'Hill Fortress Trek', deity: 'Gopinatha', themes: ['ADVENTURE', 'HERITAGE'], image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Kondaveedu_Fort_Entrance.jpg', access: 'Trek', darshanTypes: ['Free'], bestSeason: 'Winter' },

  // 5. SHAKTI / GODDESS
  { id: 'sh1', name: 'Bhramaramba Devi', district: 'Srisailam', significance: 'Shakti Peetha (Neck)', deity: 'Bhramaramba', themes: ['SHAKTI', 'SPIRITUAL_CIRCUIT'], image: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Srisailam_Temple.jpg', access: 'Road', darshanTypes: ['Kumkumarchana'], bestSeason: 'All Year' },
  { id: 'sh2', name: 'Manikyamba Devi', district: 'Draksharama', significance: 'Shakti Peetha (Cheek)', deity: 'Manikyamba', themes: ['SHAKTI', 'SPIRITUAL_CIRCUIT'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Draksharamam_Temple_East_Godavari.jpg/640px-Draksharamam_Temple_East_Godavari.jpg', access: 'Road', darshanTypes: ['General'], bestSeason: 'All Year' },
  { id: 'sh3', name: 'Alamelu Mangapuram', district: 'Tirupati', significance: 'Padmavathi Ammavaru', deity: 'Padmavathi', themes: ['SHAKTI', 'SPIRITUAL_CIRCUIT'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Padmavathi_Temple_Tiruchanur.jpg/1200px-Padmavathi_Temple_Tiruchanur.jpg', access: 'Road', darshanTypes: ['General'], bestSeason: 'All Year' },

  // 6. HERITAGE & BUDDHIST
  { id: 'her1', name: 'Undavalli Caves', district: 'Guntur', significance: 'Monolithic Rock Cut', deity: 'Anantha Padmanabha', themes: ['HERITAGE', '360_VR'], image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Undavalli_Caves.jpg', access: 'Road', darshanTypes: ['Ticket'], bestSeason: 'Winter' },
  { id: 'her2', name: 'Arasavalli Sun Temple', district: 'Srikakulam', significance: 'Sun God (Suryanarayana)', deity: 'Surya', themes: ['HERITAGE', 'SPIRITUAL_CIRCUIT'], image: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Arasavalli_Temple.jpg', access: 'Road', darshanTypes: ['General'], bestSeason: 'Ratha Saptami' },
  { id: 'her3', name: 'Amaravati Stupa', district: 'Guntur', significance: 'Buddhist Mahachaitya', deity: 'Buddha', themes: ['HERITAGE'], image: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Amaravati_Stupa.jpg', access: 'Road', darshanTypes: ['Museum Ticket'], bestSeason: 'Winter' }
];

export const AP_CIRCUITS: APCircuit[] = [
  { id: 'c1', name: 'The Big Three (Trilinga)', temples: ['vr1', 'vr2', 'vr3'], durationDays: 4, description: 'The ultimate power triangle of Andhra Pradesh covering Tirupati (Hari), Srisailam (Hara), and Vijayawada (Shakti).', image: 'https://images.unsplash.com/photo-1605634262688-924d2629b3c4?auto=format&fit=crop&w=800&q=80' },
  { id: 'c2', name: 'Pancharama Kshetras', temples: ['pk1', 'pk2', 'pk3', 'pk4', 'pk5'], durationDays: 3, description: 'Visit the five elemental Shiva temples in a single spiritual journey across coastal Andhra.', image: 'https://images.unsplash.com/photo-1590417764956-628489433433?auto=format&fit=crop&w=800&q=80' },
  { id: 'c3', name: 'Nallamala Tiger & Temple', temples: ['vr2', 'wl1', 'wl2', 'adv1'], durationDays: 3, description: 'Deep jungle trek meets spirituality. Tiger reserve jeep safaris, boat rides to caves, and waterfall treks.', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80' },
  { id: 'c4', name: 'Narasimha Kshetra Circuit', temples: ['adv1', 'vr5', 'her3'], durationDays: 5, description: 'Covering the 9 forms of Lord Narasimha in Ahobilam, plus Panakala (Mangalagiri) and Varaha (Simhachalam).', image: 'https://images.unsplash.com/photo-1624892405624-94474e2c0792?auto=format&fit=crop&w=800&q=80' }
];

// --- STANDARD METRICS ---

export const REVENUE_DATA: ChartDataPoint[] = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

export const VISITOR_DEMOGRAPHICS: ChartDataPoint[] = [
  { name: 'Families', value: 35 },
  { name: 'Solo', value: 25 },
  { name: 'Couples', value: 30 },
  { name: 'Business', value: 10 },
];

export const ECO_IMPACT_DATA: ChartDataPoint[] = [
  { name: 'Transport', value: 65, uv: 80 },
  { name: 'Lodging', value: 20, uv: 15 },
  { name: 'Food', value: 10, uv: 5 },
  { name: 'Activities', value: 5, uv: 0 },
];

export const CROWD_DENSITY_DATA: ChartDataPoint[] = [
  { name: '08:00', value: 20 },
  { name: '10:00', value: 45 },
  { name: '12:00', value: 85 },
  { name: '14:00', value: 70 },
  { name: '16:00', value: 60 },
  { name: '18:00', value: 90 },
  { name: '20:00', value: 50 },
  { name: '22:00', value: 30 },
];

export const SUSTAINABILITY_METRICS: ChartDataPoint[] = [
  { name: 'Carbon Offset', value: 78 },
  { name: 'Water Usage', value: 65 },
  { name: 'Waste Mgmt', value: 82 },
  { name: 'Renewable Energy', value: 45 },
];

// AP Heatmap Points
export const HOTSPOTS: GeoPoint[] = [
  { id: '1', lat: 30, lng: 40, intensity: 0.9, label: 'Tirumala Queue' },
  { id: '2', lat: 35, lng: 45, intensity: 0.7, label: 'R.K. Beach' },
  { id: '3', lat: 60, lng: 20, intensity: 0.4, label: 'Amaravati' },
  { id: '4', lat: 20, lng: 70, intensity: 0.8, label: 'Srisailam Ghat' },
];
