
export enum ViewState {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  TOURIST = 'TOURIST',
  BUSINESS = 'BUSINESS',
  GOV = 'GOV',
  PLANNER = 'PLANNER',
  BOOKING = 'BOOKING',
  SEARCH = 'SEARCH',
  DETAILS = 'DETAILS',
  ECO = 'ECO',
  ADMIN = 'ADMIN',
  PROFILE = 'PROFILE',
  SMART_ROOM = 'SMART_ROOM',
  AR_NAV = 'AR_NAV',
  MOBILITY = 'MOBILITY',
  EXPERIENCE_DETAILS = 'EXPERIENCE_DETAILS',
  MARKETPLACE = 'MARKETPLACE',
  EVENTS = 'EVENTS',
  TRAVEL_DIARY = 'TRAVEL_DIARY',
  REWARDS = 'REWARDS',
  CALENDAR = 'CALENDAR',
  SMART_FLOW = 'SMART_FLOW',
  FOOD_ORDER = 'FOOD_ORDER',
  ANDHRA_THEMES = 'ANDHRA_THEMES',
  STAYS = 'STAYS' // New Unified Booking Page
}

export type UserTypeFilter = 'ALL' | 'STUDENT' | 'FAMILY' | 'BACHELOR' | 'LUXURY' | 'BUSINESS' | 'BUDGET';

export interface StayOption {
  id: string;
  name: string;
  type: 'VILLA' | 'RESORT' | 'APARTMENT' | 'PG' | 'HOSTEL' | 'HOTEL' | 'GOV';
  location: string;
  price: number;
  priceUnit: 'night' | 'month';
  rating: number;
  image: string;
  amenities: string[];
  suitableFor: UserTypeFilter[];
  deposit?: number; // Specific for PGs
  verified?: boolean;
  description?: string; // New field for highlights/features
}

// Unified User Role System
export type UserRole = 'TOURIST' | 'BUSINESS' | 'GOV' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roles: UserRole[]; // One user can have multiple roles
  activeRole: UserRole; // Current dashboard view
  points: number;
  preferences: {
    currency: string;
    language: string;
    theme: 'light' | 'dark';
  };
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

export type BudgetTier = 'LUXURY' | 'MID' | 'BUDGET';

// AP Tourism Specific Types
export type APTheme = '360_VR' | 'SPIRITUAL_CIRCUIT' | 'NATURE' | 'WILDLIFE' | 'ADVENTURE' | 'HERITAGE' | 'SHAKTI';

export interface APTemple {
  id: string;
  name: string;
  district: string;
  significance: string;
  deity: string;
  themes: APTheme[];
  image: string;
  access: 'Road' | 'Trek' | 'Boat' | 'Jeep' | 'Ropeway';
  darshanTypes: string[]; // e.g., 'Seeghra', 'Dharma', 'Special'
  bestSeason: string;
}

export interface APCircuit {
  id: string;
  name: string;
  temples: string[]; // List of Temple IDs
  durationDays: number;
  description: string;
  image: string;
}

export interface TicketAnalysis {
  tier: BudgetTier;
  confidence: number;
  reasoning: string;
  extractedPrice?: string;
  extractedClass?: string;
  origin?: string;
  destination?: string;
  date?: string;
  durationDays?: number;
  arrivalTime?: string;
  pnrStatus?: string;
}

export interface TransportOption {
  id: string;
  mode: 'FLIGHT' | 'TRAIN' | 'BUS' | 'CAB';
  provider: string;
  class: string;
  price: number;
  duration: string;
  departure: string;
  ecoTag: string; // 'High Impact' | 'Eco Choice'
  aiReason: string; // Why this was suggested
  tier: BudgetTier;
}

export interface RoadTrip {
  id: string;
  title: string;
  type: 'CAR' | 'BIKE';
  organizer: string;
  route: string;
  date: string;
  slotsTotal: number;
  slotsLeft: number;
  pricePerPerson: number; // Cost sharing
  vibe: 'Chill' | 'Adventure' | 'Fast' | 'History';
  tier: BudgetTier; // Target audience
  image: string;
  verified: boolean;
}

export interface Activity {
  time: string;
  title: string;
  description: string;
  type: 'sightseeing' | 'food' | 'adventure' | 'relaxation';
  carbonFootprint: 'Low' | 'Medium' | 'High';
  cost: string;
}

export interface DayPlan {
  day: number;
  theme: string;
  activities: Activity[];
}

export interface Itinerary {
  destination: string;
  duration: number;
  totalCostEstimate: string;
  ecoScore: number;
  days: DayPlan[];
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  ecoScore: number;
  image: string;
  description: string;
  tags: string[];
  reviews: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  uv?: number; // Secondary metric
  amt?: number; // Tertiary metric
}

export interface GeoPoint {
  id: string;
  lat: number;
  lng: number;
  intensity: number; // 0-1 for heatmap
  label: string;
}

// FutureView AI Types
export interface SimulationSegment {
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
  narrative: string;
  sensoryDetail: string; // e.g., "The smell of rain on bamboo"
  impactHighlight: string; // e.g., "Saved 2kg CO2 via solar shower"
}

export interface TripSimulation {
  matchScore: number;
  vibeTag: string; // e.g., "Serene Eco-Warrior"
  timeline: SimulationSegment[];
  projectedSavings: {
    co2: string;
    water: string;
    plastic: string;
  };
}

// Payment Types
export interface LineItem {
  id: string;
  name: string;
  category: 'Transport' | 'Stay' | 'Experience' | 'Fee' | 'Food' | 'Groceries';
  price: number;
  meta?: string; // e.g. "2 Nights" or "Insurance"
  image?: string;
}

export type PaymentMethodType = 'CARD' | 'UPI' | 'BNPL' | 'CRYPTO' | 'WALLET';
