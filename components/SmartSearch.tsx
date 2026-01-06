
import React, { useState } from 'react';
import { ViewState, Destination } from '../types';
import { useAuth } from './AuthContext';
import { ALL_STAYS, AP_TEMPLES } from '../constants';
import { Search, Map, List, Filter, Star, Leaf, Heart, Zap, Sparkles, Coffee, Palette, Compass, ShoppingBag, Mountain, Utensils, User as UserIcon } from 'lucide-react';

interface Props {
  onNavigate: (view: ViewState, destId?: string) => void;
}

interface SmartDestination extends Destination {
  aiMatch: number;
  aiReason: string;
}

interface SmartExperience {
  id: string;
  name: string;
  location: string;
  price: number | string;
  rating: number;
  image: string;
  tags: string[];
  host: string;
  type: string;
  category: 'CULTURE' | 'WELLNESS' | 'ADVENTURE' | 'ECO' | 'SPIRITUAL';
  duration: string;
  ecoImpact: string;
}

export const SmartSearch: React.FC<Props> = ({ onNavigate }) => {
  const { user, isAuthenticated } = useAuth();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [category, setCategory] = useState<'STAY' | 'EXPERIENCE'>('STAY');
  const [expFilter, setExpFilter] = useState<'ALL' | 'CULTURE' | 'SPIRITUAL' | 'ADVENTURE'>('ALL');
  const [filters, setFilters] = useState({
    priceRange: 15000,
    ecoCertified: false,
    rating: 4
  });

  // 1. Transform ALL_STAYS from constants.ts into SmartDestination format
  const stays: SmartDestination[] = ALL_STAYS.filter(s => s.price <= filters.priceRange).map(stay => ({
    id: stay.id,
    name: stay.name,
    location: stay.location,
    price: stay.price,
    rating: stay.rating,
    ecoScore: stay.type === 'VILLA' || stay.type === 'RESORT' ? 9.2 : 8.5, // Mock eco score logic
    aiMatch: isAuthenticated && user?.activeRole === 'TOURIST' ? 95 : 88,
    aiReason: stay.suitableFor.includes('FAMILY') ? 'Great for families.' : 'Budget friendly option.',
    image: stay.image,
    description: stay.description || `${stay.type} with ${stay.amenities.slice(0,3).join(', ')}...`,
    tags: [...stay.suitableFor, stay.type],
    reviews: Math.floor(Math.random() * 200) + 20
  }));

  // 2. Transform AP_TEMPLES from constants.ts into SmartExperience format
  const experiences: SmartExperience[] = AP_TEMPLES.map(temple => {
    // Map themes to category
    let cat: 'CULTURE' | 'SPIRITUAL' | 'ADVENTURE' = 'CULTURE';
    if (temple.themes.includes('SPIRITUAL_CIRCUIT') || temple.themes.includes('SHAKTI')) cat = 'SPIRITUAL';
    if (temple.themes.includes('ADVENTURE') || temple.themes.includes('WILDLIFE')) cat = 'ADVENTURE';

    return {
        id: temple.id,
        name: temple.name,
        location: temple.district,
        price: 'Free / Ticket', // Temples usually free or small ticket
        rating: 4.9,
        image: temple.image,
        tags: temple.themes,
        host: 'APTDC / Trust',
        type: temple.access === 'Trek' ? 'Trek' : 'Pilgrimage',
        category: cat,
        duration: '2-4 Hours',
        ecoImpact: 'Supports Heritage'
    };
  });

  const filteredExperiences = experiences.filter(e => expFilter === 'ALL' || e.category === expFilter);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
       {/* Search Header */}
       <div className="bg-white border-b border-slate-200 sticky top-16 z-30 px-6 py-4 shadow-sm">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder={category === 'STAY' ? "Search stays in AP..." : "Search temples, treks, safaris..."}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                </div>
                
                {/* Category Toggles */}
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button 
                        onClick={() => setCategory('STAY')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${category === 'STAY' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                    >
                        Stays
                    </button>
                    <button 
                        onClick={() => setCategory('EXPERIENCE')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${category === 'EXPERIENCE' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                    >
                        Experiences
                    </button>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 whitespace-nowrap bg-white text-sm font-medium text-slate-700">
                        <Filter className="w-4 h-4" /> Filters
                    </button>
                    <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
                    <div className="flex bg-slate-100 rounded-lg p-1">
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                        <button 
                             onClick={() => setViewMode('map')}
                             className={`p-2 rounded-md transition ${viewMode === 'map' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Map className="w-4 h-4" />
                        </button>
                    </div>
                </div>
           </div>
       </div>

       {/* Content Area */}
       <div className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full">
           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
               {/* Filters Sidebar */}
               <div className="hidden lg:block space-y-8">
                   {isAuthenticated && (
                       <div className="bg-indigo-600 rounded-xl p-4 text-white shadow-lg">
                           <div className="flex items-center gap-2 mb-2">
                               <Sparkles className="w-4 h-4 text-yellow-300" />
                               <span className="font-bold text-sm">For {user?.name}</span>
                           </div>
                           <p className="text-xs text-indigo-100 leading-relaxed">
                               We've filtered results based on your {user?.activeRole?.toLowerCase()} profile and AP preferences.
                           </p>
                       </div>
                   )}

                   <div>
                       <h3 className="font-bold text-slate-900 mb-4">Price Range</h3>
                       <input 
                            type="range" min="500" max="20000" step="500"
                            value={filters.priceRange}
                            onChange={(e) => setFilters({...filters, priceRange: parseInt(e.target.value)})}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                       />
                       <div className="flex justify-between text-sm text-slate-500 mt-2">
                           <span>₹500</span>
                           <span>₹{filters.priceRange.toLocaleString()}+</span>
                       </div>
                   </div>

                   {category === 'EXPERIENCE' && (
                       <div>
                           <h3 className="font-bold text-slate-900 mb-4">Interest</h3>
                           <div className="space-y-2">
                               {[
                                   { id: 'ALL', label: 'All Experiences', icon: <Compass className="w-4 h-4"/> },
                                   { id: 'SPIRITUAL', label: 'Spiritual & Temples', icon: <Palette className="w-4 h-4"/> },
                                   { id: 'CULTURE', label: 'Culture & Heritage', icon: <Sparkles className="w-4 h-4"/> },
                                   { id: 'ADVENTURE', label: 'Nature & Wildlife', icon: <Mountain className="w-4 h-4"/> },
                               ].map((type) => (
                                   <button 
                                     key={type.id}
                                     onClick={() => setExpFilter(type.id as any)}
                                     className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                                         expFilter === type.id 
                                         ? 'bg-teal-50 text-teal-700' 
                                         : 'text-slate-600 hover:bg-slate-50'
                                     }`}
                                   >
                                       {type.icon} {type.label}
                                   </button>
                               ))}
                           </div>
                       </div>
                   )}

                   <div>
                       <h3 className="font-bold text-slate-900 mb-4">{category === 'STAY' ? 'Amenities' : 'Access'}</h3>
                       {category === 'STAY' ? (
                           <>
                            <label className="flex items-center gap-3 mb-3 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500 border-slate-300" />
                                <span className="text-slate-700">WiFi & AC</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500 border-slate-300" />
                                <span className="text-slate-700">Family Friendly</span>
                            </label>
                           </>
                       ) : (
                           <>
                            <label className="flex items-center gap-3 mb-3 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500 border-slate-300" />
                                <span className="text-slate-700">Road Accessible</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500 border-slate-300" />
                                <span className="text-slate-700">Trek Required</span>
                            </label>
                           </>
                       )}
                   </div>

                   <div>
                       <h3 className="font-bold text-slate-900 mb-4">AI Suggestions</h3>
                       <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                           <div className="flex items-start gap-2">
                               <div className="mt-1"><Star className="w-4 h-4 text-teal-600 fill-teal-600" /></div>
                               <p className="text-sm text-teal-800">
                                   {category === 'STAY' 
                                     ? "Try Araku Valley resorts for a sustainable stay this winter."
                                     : "Don't miss the 360° VR preview before visiting Tirumala!"}
                               </p>
                           </div>
                       </div>
                   </div>
               </div>

               {/* Results Grid */}
               <div className="lg:col-span-3">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {category === 'STAY' && stays.map((place) => (
                           <div key={place.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg transition group">
                               <div className="relative h-48">
                                   <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                   <button className="absolute top-3 right-3 p-2 bg-white/30 backdrop-blur-md rounded-full hover:bg-white text-white hover:text-red-500 transition">
                                       <Heart className="w-4 h-4" />
                                   </button>
                                   
                                   {/* AI Match Badge */}
                                   <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md flex flex-col items-start gap-0.5 shadow-lg border border-white/10">
                                       <div className="flex items-center gap-1 text-yellow-400">
                                            <Zap className="w-3 h-3 fill-yellow-400" /> {place.aiMatch}% Match
                                       </div>
                                       <div className="text-[10px] text-slate-200 font-medium max-w-[120px] leading-tight">
                                           {place.aiReason}
                                       </div>
                                   </div>

                                   <div className="absolute bottom-3 left-3 flex gap-2">
                                        {place.tags.slice(0,3).map(tag => (
                                            <span key={tag} className="text-xs font-bold bg-black/50 text-white backdrop-blur-sm px-2 py-1 rounded-md uppercase">{tag}</span>
                                        ))}
                                   </div>
                               </div>
                               <div className="p-5">
                                   <div className="flex justify-between items-start mb-2">
                                       <h3 className="font-bold text-lg text-slate-900">{place.name}</h3>
                                       <div className="flex items-center gap-1 text-slate-700 font-bold text-sm">
                                           <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {place.rating}
                                       </div>
                                   </div>
                                   <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">
                                       <Map className="w-3 h-3" /> {place.location}
                                   </p>
                                   
                                   <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                       <div>
                                           <span className="text-2xl font-bold text-slate-900">₹{place.price.toLocaleString()}</span>
                                           <span className="text-sm text-slate-500">/night</span>
                                       </div>
                                       <div className="text-right">
                                           <div className="text-xs text-slate-400 mb-1">Eco Score</div>
                                           <div className="flex items-center gap-1 font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded">
                                               <Leaf className="w-3 h-3" /> {place.ecoScore}/10
                                           </div>
                                       </div>
                                   </div>

                                   <button 
                                        onClick={() => onNavigate(ViewState.DETAILS)}
                                        className="w-full mt-4 bg-slate-900 text-white py-2.5 rounded-lg font-medium hover:bg-slate-800 transition"
                                   >
                                       View Details
                                   </button>
                               </div>
                           </div>
                       ))}

                       {category === 'EXPERIENCE' && filteredExperiences.map((exp) => (
                           <div key={exp.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg transition group">
                                <div className="relative h-48">
                                   <img src={exp.image} alt={exp.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                   <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-slate-800 text-xs font-bold px-2 py-1 rounded-md shadow-lg border border-white">
                                       {exp.type}
                                   </div>
                                   <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                                       <Leaf className="w-3 h-3" /> {exp.ecoImpact}
                                   </div>
                                </div>
                                <div className="p-5">
                                   <div className="flex justify-between items-start mb-1">
                                       <h3 className="font-bold text-lg text-slate-900">{exp.name}</h3>
                                       <div className="flex items-center gap-1 text-slate-700 font-bold text-sm">
                                           <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {exp.rating}
                                       </div>
                                   </div>
                                   <p className="text-sm text-slate-500 mb-3 flex items-center gap-1">
                                       <UserIcon className="w-3 h-3" /> Host: {exp.host}
                                   </p>
                                   <div className="flex gap-2 mb-4 overflow-hidden">
                                       {exp.tags.slice(0,3).map(tag => (
                                           <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded whitespace-nowrap">{tag}</span>
                                       ))}
                                   </div>
                                   <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                       <div>
                                            <span className="text-xl font-bold text-slate-900">{typeof exp.price === 'number' ? `₹${exp.price}` : exp.price}</span>
                                            <span className="text-xs text-slate-500 ml-1">/ entry</span>
                                       </div>
                                       <button 
                                          onClick={() => onNavigate(ViewState.EXPERIENCE_DETAILS)}
                                          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg shadow-indigo-500/20"
                                       >
                                           <ShoppingBag className="w-3 h-3" /> Book Now
                                       </button>
                                   </div>
                                </div>
                           </div>
                       ))}
                   </div>
               </div>
           </div>
       </div>
    </div>
  );
};
