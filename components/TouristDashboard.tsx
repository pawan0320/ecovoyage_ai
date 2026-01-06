
import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { ECO_IMPACT_DATA } from '../constants';
import { 
  Leaf, Award, Map, CreditCard, Download, CalendarDays, Heart, Star, 
  ArrowRight, TrendingDown, Key, Wifi, Scan, Compass, Bike, ChevronRight, 
  ShoppingBag, Hexagon, Music, Calendar, Sparkles, MapPin, Search, Smartphone, BookOpen,
  Utensils, Bed, DollarSign, Coffee, ShowerHead, Upload, FileText, Check, Loader2, Zap,
  Plane, Train, Bus, Car, Users, MessageCircle, ShieldCheck, Store, Ticket
} from 'lucide-react';
import { ViewState, BudgetTier, TransportOption, RoadTrip } from '../types';
import { analyzeTicketContext } from '../services/geminiService';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

interface BookedTrip {
  id: number;
  destination: string;
  date: string;
  duration: number;
  totalCost: number;
  ecoScore: number;
  carbonSaved: number;
  status: string;
}

interface Recommendation {
  id: number;
  name: string;
  type: string;
  tier: BudgetTier;
  price: string;
  rating: number;
  image: string;
  tags: string[];
  location: string;
}

interface Props {
  onNavigate?: (view: ViewState) => void;
  onFoodSelect?: (item: Recommendation) => void;
}

export const TouristDashboard: React.FC<Props> = ({ onNavigate, onFoodSelect }) => {
  const [trips, setTrips] = useState<BookedTrip[]>([]);
  const [plannerInput, setPlannerInput] = useState('');
  
  // VoyageContext AI State
  const [userBudgetTier, setUserBudgetTier] = useState<BudgetTier>('MID'); // Default
  const [isAnalyzingTicket, setIsAnalyzingTicket] = useState(false);
  const [ticketAnalysisReason, setTicketAnalysisReason] = useState<string>('');
  const [ticketFile, setTicketFile] = useState<File | null>(null);

  // Mobility Engine State
  const [mobilityTab, setMobilityTab] = useState<'BOOK' | 'ROADTRIP'>('BOOK');

  useEffect(() => {
    const savedTrips = localStorage.getItem('myTrips');
    if (savedTrips) {
      try {
        setTrips(JSON.parse(savedTrips));
      } catch (e) {
        console.error("Failed to parse trips", e);
      }
    }
  }, []);

  const handleQuickPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNavigate) onNavigate(ViewState.PLANNER);
  };

  // Simulate Ticket Analysis via Gemini
  const handleTicketUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTicketFile(file);
      setIsAnalyzingTicket(true);

      // Simulate reading file content (In real app, use OCR/PDF parser)
      let mockText = "Standard Flight Ticket";
      if (file.name.toLowerCase().includes('business')) mockText = "Vistara Flight 772. Class: Business / First. Price: ₹12,000";
      else if (file.name.toLowerCase().includes('hostel')) mockText = "Zostel Booking: Backpackers Hostel. Price: ₹800";
      else mockText = "IRCTC Ticket. Class: 3A. Price: ₹1,450";

      const analysis = await analyzeTicketContext(mockText);
      
      setUserBudgetTier(analysis.tier);
      setTicketAnalysisReason(analysis.reasoning);
      setIsAnalyzingTicket(false);
    }
  };

  // --- INDIAN CONTEXT DATA FOR MOBILITY ENGINE ---
  
  const transportOptions: TransportOption[] = [
    {
      id: 't1', mode: 'FLIGHT', provider: 'IndiGo', class: 'Economy', price: 4500, 
      duration: '1h 15m', departure: '09:00 AM', ecoTag: 'High Impact', tier: 'MID',
      aiReason: 'Fastest option for your schedule.'
    },
    {
      id: 't2', mode: 'TRAIN', provider: 'Vande Bharat Exp', class: 'Exec. Chair Car', price: 1800, 
      duration: '4h 30m', departure: '06:00 AM', ecoTag: 'Eco Choice', tier: 'MID',
      aiReason: 'Premium eco-friendly travel.'
    },
    {
      id: 't3', mode: 'BUS', provider: 'APSRTC (Dolphin)', class: 'AC Sleeper', price: 950, 
      duration: '8h 00m', departure: '10:00 PM', ecoTag: 'Eco Choice', tier: 'BUDGET',
      aiReason: 'Best value for overnight travel.'
    },
    {
      id: 't4', mode: 'CAB', provider: 'Uber Intercity', class: 'Sedan', price: 6500, 
      duration: '5h 00m', departure: 'On Demand', ecoTag: 'High Impact', tier: 'LUXURY',
      aiReason: 'Private and comfortable.'
    }
  ];

  const roadTrips: RoadTrip[] = [
    {
      id: 'r1', title: 'Vizag Coastal Ride', type: 'BIKE', organizer: 'Royal Enfield Club Vizag',
      route: 'Vizag > Bheemili > Rushikonda', date: 'Oct 28', slotsTotal: 15, slotsLeft: 5, pricePerPerson: 500,
      vibe: 'Chill', tier: 'BUDGET', verified: true,
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84f3d?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'r2', title: 'Grand Gandikota Canyon', type: 'CAR', organizer: 'AP Tourism Convoys',
      route: 'Bangalore > Gandikota', date: 'Nov 02', slotsTotal: 8, slotsLeft: 2, pricePerPerson: 4500,
      vibe: 'Adventure', tier: 'MID', verified: true,
      image: 'https://images.unsplash.com/photo-1590417764956-628489433433?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'r3', title: 'Hyderabad Heritage Drive', type: 'CAR', organizer: 'Deccan Drives',
      route: 'Charminar > Golconda', date: 'Oct 30', slotsTotal: 10, slotsLeft: 4, pricePerPerson: 1200,
      vibe: 'History', tier: 'MID', verified: true,
      image: 'https://images.unsplash.com/photo-1568283944365-c3f24302636f?auto=format&fit=crop&w=400&q=80'
    }
  ];

  // Sorting logic based on AI Tier
  const sortedTransport = [...transportOptions].sort((a, b) => {
    if (a.tier === userBudgetTier) return -1;
    if (b.tier === userBudgetTier) return 1;
    return 0;
  });

  const sortedRoadTrips = [...roadTrips].sort((a, b) => {
    if (a.tier === userBudgetTier) return -1;
    if (b.tier === userBudgetTier) return 1;
    return 0;
  });

  const restaurants: Recommendation[] = [
    { id: 1, name: "Dakshin (ITC Kakatiya)", type: "Fine Dining", tier: "LUXURY", price: "₹2500", rating: 4.9, location: "Hyderabad", image: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&w=400&q=80", tags: ["Authentic South", "Thali", "Luxury"] },
    { id: 2, name: "Sea Inn (Raju Gari Dhaba)", type: "Casual Dining", tier: "MID", price: "₹450", rating: 4.7, location: "Visakhapatnam", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80", tags: ["Spicy", "Seafood", "Local Legend"] },
    { id: 3, name: "Ram Bandi Dosa", type: "Street Food", tier: "BUDGET", price: "₹80", rating: 4.8, location: "Nampally", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80", tags: ["Late Night", "Quick", "Veg"] }
  ];

  const accommodations: Recommendation[] = [
    { id: 1, name: "Taj Falaknuma Palace", type: "Heritage Hotel", tier: "LUXURY", price: "₹35,000/night", rating: 5.0, location: "Hyderabad", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80", tags: ["Royal", "History", "Spa"] },
    { id: 2, name: "Haritha Hill Resort", type: "Govt Resort", tier: "MID", price: "₹3,500/night", rating: 4.2, location: "Araku Valley", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80", tags: ["View", "APTDC", "Nature"] },
    { id: 3, name: "Zostel Vizag", type: "Hostel", tier: "BUDGET", price: "₹850/night", rating: 4.5, location: "Beach Road", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80", tags: ["Backpacker", "Social", "Bunks"] }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'LUXURY': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'MID': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'BUDGET': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getActiveBorder = (tier: string) => {
    if (tier === userBudgetTier) {
      if (tier === 'LUXURY') return 'ring-2 ring-purple-500 shadow-lg shadow-purple-100 scale-[1.01] z-10';
      if (tier === 'MID') return 'ring-2 ring-blue-500 shadow-lg shadow-blue-100 scale-[1.01] z-10';
      if (tier === 'BUDGET') return 'ring-2 ring-green-500 shadow-lg shadow-green-100 scale-[1.01] z-10';
    }
    return 'opacity-90 hover:opacity-100 hover:shadow-md border-transparent';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 pb-20">
      {/* 1. Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Namaste, Rahul</h2>
          <p className="text-slate-500 flex items-center gap-2">
             <MapPin className="w-4 h-4 text-teal-600" /> Current Location: <span className="font-semibold text-slate-700">Visakhapatnam, Andhra Pradesh</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onNavigate && onNavigate(ViewState.TRAVEL_DIARY)}
            className="bg-white text-slate-700 border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50 transition flex items-center gap-2 font-medium shadow-sm"
          >
             <BookOpen className="w-4 h-4" /> Yatra Diary
          </button>
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-orange-500/20 flex items-center gap-2 cursor-default">
             <Award className="w-4 h-4" /> Desi Explorer Lvl 4
          </div>
        </div>
      </div>

      {/* 1.5 NEW FEATURE: YATRA FLOW ENTRY POINT */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 relative overflow-hidden text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-2 mb-2 text-indigo-200 font-bold uppercase tracking-wide text-sm">
                  <Ticket className="w-4 h-4" /> Smart Travel Engine
              </div>
              <h2 className="text-3xl font-bold mb-2">Have a Ticket? Let's Plan the Rest.</h2>
              <p className="text-indigo-100 text-lg">
                  Upload your Flight, Train, or Bus ticket. AI will automatically find the best Hotels, Cabs, and Food for your trip.
              </p>
          </div>
          <div className="relative z-10">
              <button 
                onClick={() => onNavigate && onNavigate(ViewState.SMART_FLOW)}
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition shadow-lg flex items-center gap-2 transform hover:scale-105"
              >
                  <Upload className="w-5 h-5" /> Upload & Auto-Plan
              </button>
          </div>
      </div>

      {/* 2. AI Budget Lens (VoyageContext AI) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-indigo-500" />
                      <h3 className="font-bold text-slate-800">Smart Sahayak (AI)</h3>
                      {userBudgetTier === 'LUXURY' && <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold">LUXURY YATRA</span>}
                      {userBudgetTier === 'MID' && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">COMFORT YATRA</span>}
                      {userBudgetTier === 'BUDGET' && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">BUDGET YATRA</span>}
                  </div>
                  <p className="text-sm text-slate-500 max-w-xl">
                      Your travel persona is set to <strong>{userBudgetTier}</strong>. Recommendations below are filtered to match this style.
                  </p>
                  {ticketAnalysisReason && (
                      <div className="mt-2 text-xs bg-indigo-50 text-indigo-700 p-2 rounded flex items-center gap-2 animate-fade-in">
                          <Zap className="w-3 h-3" /> {ticketAnalysisReason}
                      </div>
                  )}
              </div>
          </div>
      </div>

      {/* 3. NEW: VOYAGE MOBILITY ENGINE */}
      <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden text-white shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                  <div>
                      <div className="flex items-center gap-2 mb-2 text-teal-400 font-bold text-sm uppercase tracking-wide">
                          <Compass className="w-4 h-4" /> Gati Shakti Engine
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold">How would you like to travel?</h2>
                  </div>
                  <div className="flex bg-slate-800 p-1 rounded-lg">
                      <button 
                        onClick={() => setMobilityTab('BOOK')}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition ${mobilityTab === 'BOOK' ? 'bg-teal-500 text-white' : 'text-slate-400 hover:text-white'}`}
                      >
                          Book Travel
                      </button>
                      <button 
                        onClick={() => setMobilityTab('ROADTRIP')}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition ${mobilityTab === 'ROADTRIP' ? 'bg-teal-500 text-white' : 'text-slate-400 hover:text-white'}`}
                      >
                          Road Trip
                      </button>
                  </div>
              </div>

              {/* Sub-Feature 1: Transport Booking */}
              {mobilityTab === 'BOOK' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
                      {sortedTransport.map(opt => (
                          <div 
                            key={opt.id} 
                            onClick={() => onNavigate && onNavigate(ViewState.BOOKING)}
                            className={`bg-slate-800 border border-slate-700 p-4 rounded-xl hover:border-teal-500 transition group cursor-pointer relative ${
                              opt.tier === userBudgetTier ? 'ring-2 ring-teal-500 ring-offset-2 ring-offset-slate-900' : ''
                          }`}>
                              {opt.tier === userBudgetTier && (
                                  <div className="absolute -top-3 left-4 bg-teal-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                                      AI Recommended
                                  </div>
                              )}
                              <div className="flex justify-between items-start mb-3">
                                  <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-teal-500/20 group-hover:text-teal-400 transition">
                                      {opt.mode === 'FLIGHT' && <Plane className="w-6 h-6" />}
                                      {opt.mode === 'TRAIN' && <Train className="w-6 h-6" />}
                                      {opt.mode === 'BUS' && <Bus className="w-6 h-6" />}
                                      {opt.mode === 'CAB' && <Car className="w-6 h-6" />}
                                  </div>
                                  <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                                      opt.ecoTag === 'Eco Choice' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                  }`}>
                                      {opt.ecoTag}
                                  </span>
                              </div>
                              <h4 className="font-bold text-lg mb-1">{opt.provider}</h4>
                              <p className="text-xs text-slate-400 mb-3">{opt.class} • {opt.duration}</p>
                              <div className="flex justify-between items-center border-t border-slate-700 pt-3">
                                  <span className="font-bold text-xl">₹{opt.price}</span>
                                  <button className="text-teal-400 text-sm font-bold hover:underline flex items-center gap-1">
                                      Book <ChevronRight className="w-3 h-3" />
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
              )}

              {/* Sub-Feature 2: Road Trip Marketplace */}
              {mobilityTab === 'ROADTRIP' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                      {sortedRoadTrips.map(trip => (
                          <div 
                            key={trip.id} 
                            onClick={() => onNavigate && onNavigate(ViewState.BOOKING)}
                            className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:shadow-xl transition group cursor-pointer"
                          >
                              <div className="relative h-32">
                                  <img src={trip.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                                      {trip.type === 'BIKE' ? <Bike className="w-3 h-3" /> : <Car className="w-3 h-3" />}
                                      {trip.type === 'BIKE' ? 'Bike Trip' : 'Car Convoy'}
                                  </div>
                                  {trip.verified && (
                                      <div className="absolute top-2 right-2 bg-blue-500/80 backdrop-blur-sm p-1 rounded-full" title="Verified Organizer">
                                          <ShieldCheck className="w-3 h-3 text-white" />
                                      </div>
                                  )}
                              </div>
                              <div className="p-4">
                                  <div className="flex justify-between items-start mb-2">
                                      <h4 className="font-bold text-lg leading-tight">{trip.title}</h4>
                                      <span className="text-xs font-bold bg-slate-700 px-2 py-1 rounded text-slate-300">{trip.date}</span>
                                  </div>
                                  <p className="text-xs text-slate-400 mb-3 flex items-center gap-1">
                                      <Users className="w-3 h-3" /> Organized by {trip.organizer}
                                  </p>
                                  
                                  <div className="flex gap-2 mb-4">
                                      <span className="text-[10px] bg-slate-700 px-2 py-1 rounded text-slate-300">{trip.route}</span>
                                      <span className="text-[10px] bg-slate-700 px-2 py-1 rounded text-slate-300">{trip.slotsLeft} spots left</span>
                                  </div>

                                  <div className="flex gap-2">
                                      <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (onNavigate) onNavigate(ViewState.BOOKING);
                                        }}
                                        className="flex-1 bg-teal-600 hover:bg-teal-500 text-white py-2 rounded-lg text-sm font-bold transition">
                                          Join (₹{trip.pricePerPerson})
                                      </button>
                                      <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition text-slate-300">
                                          <MessageCircle className="w-4 h-4" />
                                      </button>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              )}
          </div>
      </div>

      {/* 4. Location-Based Context Grid */}
      <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-slate-500" /> Discover Near You
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* AR NAVIGATION CARD */}
            <div 
              onClick={() => onNavigate && onNavigate(ViewState.AR_NAV)}
              className="bg-gradient-to-br from-indigo-600 to-violet-700 p-5 rounded-2xl shadow-lg border border-indigo-500/50 hover:shadow-xl transition cursor-pointer group relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-8 bg-white/10 rounded-full blur-xl -mr-4 -mt-4"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm text-white">
                        <Scan className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-1 rounded-full flex items-center gap-1">
                        <Smartphone className="w-3 h-3" /> AR Ready
                    </span>
                </div>
                <h4 className="font-bold text-lg text-white mb-1 relative z-10">AR Heritage Guide</h4>
                <p className="text-indigo-100 text-xs relative z-10">Point camera at monuments for history.</p>
                <div className="mt-4 flex items-center text-sm font-bold text-white relative z-10 group-hover:translate-x-1 transition-transform">
                    Start AR View <ChevronRight className="w-4 h-4 ml-1" />
                </div>
            </div>

            {/* SMART MOBILITY CARD */}
            <div 
              onClick={() => onNavigate && onNavigate(ViewState.MOBILITY)}
              className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition cursor-pointer group relative overflow-hidden"
            >
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
                        <Bike className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">Yulu/SmartBike</span>
                </div>
                <h4 className="font-bold text-lg text-slate-900 mb-1">Rent EV / Bike</h4>
                <p className="text-slate-500 text-xs">Closest: 2 min walk • 98% Battery</p>
                <div className="mt-4 flex items-center text-sm font-bold text-orange-600 group-hover:text-orange-700">
                    Unlock Now <ChevronRight className="w-4 h-4 ml-1" />
                </div>
            </div>

            {/* EVENTS DISCOVERY CARD */}
            <div 
              onClick={() => onNavigate && onNavigate(ViewState.EVENTS)}
              className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition cursor-pointer group"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Calendar className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Tonight</span>
                </div>
                <h4 className="font-bold text-lg text-slate-900 mb-1">Nearby Melas</h4>
                <p className="text-slate-500 text-xs">Handicraft Expo • 0.8km away</p>
                <div className="mt-4 flex items-center text-sm font-bold text-purple-600 group-hover:text-purple-700">
                    View Details <ChevronRight className="w-4 h-4 ml-1" />
                </div>
            </div>

            {/* ACTIVE TRIP CARD */}
            <div 
              onClick={() => onNavigate && onNavigate(ViewState.SMART_ROOM)}
              className="bg-gradient-to-br from-emerald-500 to-teal-600 p-5 rounded-2xl shadow-lg text-white hover:scale-[1.02] transition cursor-pointer relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-12 bg-white/10 rounded-full blur-2xl -mr-6 -mt-6"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Key className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full animate-pulse">Active</span>
                </div>
                <h4 className="font-bold text-lg text-white mb-1 relative z-10">Room 402</h4>
                <p className="text-teal-100 text-xs relative z-10">Haritha Resort • Check-out 11AM</p>
                <div className="mt-4 flex items-center text-sm font-bold text-white relative z-10">
                    Room Controls <ChevronRight className="w-4 h-4 ml-1" />
                </div>
            </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
           
           {/* Dining & Accommodation (SmartBudget Sorted) */}
           <div className="space-y-8">
              {/* Restaurants */}
              <div>
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Utensils className="w-5 h-5 text-orange-500" /> Authentic Dining
                      </h3>
                      <span className="text-xs text-slate-400">Sorted by Class</span>
                  </div>
                  <div className="space-y-4">
                      {restaurants.map((place) => (
                          <div 
                            key={place.id} 
                            onClick={() => onFoodSelect && onFoodSelect(place)}
                            className={`bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex gap-4 items-center group cursor-pointer transition-all duration-300 ${getActiveBorder(place.tier)}`}
                          >
                              <img src={place.image} className="w-20 h-20 rounded-lg object-cover" alt={place.name} />
                              <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                      <div>
                                          <div className="flex items-center gap-2">
                                              <h4 className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors">{place.name}</h4>
                                              {place.tier === userBudgetTier && (
                                                  <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-bold animate-pulse">
                                                      Smart Match
                                                  </span>
                                              )}
                                          </div>
                                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${getTierColor(place.tier)}`}>
                                                  {place.tier === 'LUXURY' ? '5-Star' : place.tier === 'MID' ? 'Family Style' : 'Budget Eats'}
                                              </span>
                                              <span>• {place.location}</span>
                                          </div>
                                      </div>
                                      <div className="text-right">
                                          <span className="block font-bold text-slate-900">{place.price}</span>
                                          <span className="flex items-center gap-1 text-xs text-yellow-600 font-bold"><Star className="w-3 h-3 fill-yellow-500" /> {place.rating}</span>
                                      </div>
                                  </div>
                                  <div className="mt-2 flex justify-between items-center">
                                      <div className="flex gap-2 overflow-hidden">
                                          {place.tags.map((tag, i) => (
                                              <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{tag}</span>
                                          ))}
                                      </div>
                                      {/* Correct Nav Button */}
                                      <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (onFoodSelect) onFoodSelect(place);
                                        }}
                                        className="text-xs bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg font-bold hover:bg-orange-100 transition flex items-center gap-1"
                                      >
                                          <ShoppingBag className="w-3 h-3" /> Order Now
                                      </button>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Hostels & Hotels */}
              <div>
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Bed className="w-5 h-5 text-indigo-500" /> Where to Stay
                      </h3>
                      <span className="text-xs text-slate-400">Sorted by Class</span>
                  </div>
                  <div className="space-y-4">
                      {accommodations.map((place) => (
                          <div 
                            key={place.id} 
                            onClick={() => onNavigate && onNavigate(ViewState.DETAILS)}
                            className={`bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex gap-4 items-center group cursor-pointer transition-all duration-300 ${getActiveBorder(place.tier)}`}
                          >
                              <img src={place.image} className="w-20 h-20 rounded-lg object-cover" alt={place.name} />
                              <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                      <div>
                                          <div className="flex items-center gap-2">
                                              <h4 className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors">{place.name}</h4>
                                              {place.tier === userBudgetTier && (
                                                  <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-bold animate-pulse">
                                                      Smart Match
                                                  </span>
                                              )}
                                          </div>
                                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${getTierColor(place.tier)}`}>
                                                  {place.tier === 'LUXURY' ? 'Luxury' : place.tier === 'MID' ? 'Standard' : 'Dharamshala/Budget'}
                                              </span>
                                              <span>• {place.location}</span>
                                          </div>
                                      </div>
                                      <div className="text-right">
                                          <span className="block font-bold text-slate-900">{place.price}</span>
                                          <span className="flex items-center gap-1 text-xs text-yellow-600 font-bold"><Star className="w-3 h-3 fill-yellow-500" /> {place.rating}</span>
                                      </div>
                                  </div>
                                  <div className="mt-2 flex gap-2 overflow-hidden">
                                      {place.tags.map((tag, i) => (
                                          <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{tag}</span>
                                      ))}
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
           </div>

           {/* NEW: Local Economy & Marketplace Section */}
           <div className="bg-gradient-to-r from-teal-900 to-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
               <div className="absolute top-0 right-0 p-12 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                   <div className="flex-1">
                       <div className="flex items-center gap-2 mb-3 text-teal-300 font-bold text-xs uppercase tracking-wider">
                           <Store className="w-4 h-4" /> Vocal for Local
                       </div>
                       <h3 className="text-2xl font-bold mb-2">Buy Authentic Handicrafts</h3>
                       <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                           Support Andhra artisans directly. Purchase GI-tagged Kalamkari, Etikoppaka toys, and more with 0% commission.
                       </p>
                       <div className="flex gap-3">
                           <button 
                             onClick={() => onNavigate && onNavigate(ViewState.MARKETPLACE)}
                             className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition shadow-lg shadow-teal-500/20 flex items-center gap-2"
                           >
                               Visit Marketplace <ChevronRight className="w-4 h-4" />
                           </button>
                       </div>
                   </div>
                   
                   {/* Visual Preview of Items */}
                   <div className="flex gap-4">
                       <div className="w-32 h-40 bg-white/10 rounded-xl border border-white/20 p-2 backdrop-blur-md transform rotate-[-6deg] hover:rotate-0 transition duration-500 cursor-pointer" onClick={() => onNavigate && onNavigate(ViewState.MARKETPLACE)}>
                           <div className="w-full h-24 bg-slate-800 rounded-lg mb-2 overflow-hidden">
                               <img src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" />
                           </div>
                           <div className="h-2 w-16 bg-white/20 rounded-full mb-1"></div>
                           <div className="h-2 w-10 bg-white/10 rounded-full"></div>
                       </div>
                       <div className="w-32 h-40 bg-white/10 rounded-xl border border-white/20 p-2 backdrop-blur-md transform rotate-[6deg] hover:rotate-0 transition duration-500 cursor-pointer" onClick={() => onNavigate && onNavigate(ViewState.MARKETPLACE)}>
                           <div className="w-full h-24 bg-slate-800 rounded-lg mb-2 overflow-hidden">
                               <img src="https://images.unsplash.com/photo-1598555845180-c9725f560e9f?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" />
                           </div>
                           <div className="h-2 w-16 bg-white/20 rounded-full mb-1"></div>
                           <div className="h-2 w-10 bg-white/10 rounded-full"></div>
                       </div>
                   </div>
               </div>
           </div>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
            {/* Impact Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Your Eco Footprint</h3>
              {/* Added explicit style width/height to fix Recharts width(-1) error */}
              <div className="w-full h-48 min-h-[192px]" style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ECO_IMPACT_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {ECO_IMPACT_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius: '8px', fontSize: '12px'}} />
                    <Legend iconSize={8} fontSize={10} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                 <p className="text-xs text-emerald-800 font-medium">Top 5% Eco-Yatri! 🌿</p>
                 <p className="text-[10px] text-slate-500 mt-1">You save 12kg CO2 more than average.</p>
              </div>
            </div>
            
            {/* Gamification / Rewards Card */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Award className="w-32 h-32 transform rotate-12" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 text-yellow-400 text-sm font-bold uppercase tracking-wider">
                        <Star className="w-4 h-4" /> Rewards Program
                    </div>
                    <h3 className="text-xl font-bold mb-4">Level 4: Eco-Scout</h3>
                    
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full w-[85%]"></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 mb-6">
                        <span>2,450 pts</span>
                        <span>Goal: 3,000</span>
                    </div>

                    <div className="bg-slate-800 rounded-xl p-3 mb-4 flex items-center gap-3 border border-slate-700">
                       <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                          <Hexagon className="w-5 h-5 text-white" />
                       </div>
                       <div>
                          <p className="text-xs font-bold text-white">2 Certificates</p>
                          <p className="text-[10px] text-slate-400">View Authenticities</p>
                       </div>
                    </div>

                    <button 
                      onClick={() => onNavigate && onNavigate(ViewState.REWARDS)}
                      className="w-full bg-white text-slate-900 py-2 rounded-lg font-bold text-sm hover:bg-slate-100 transition"
                    >
                        View Rewards Store
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
