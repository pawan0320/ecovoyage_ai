
import React, { useState } from 'react';
import { ViewState, APTheme, APTemple, APCircuit } from '../types';
import { AP_TEMPLES, AP_CIRCUITS } from '../constants';
import { 
  ArrowLeft, Compass, Eye, Map, Calendar, 
  Mountain, Info, ShieldCheck, Ticket, Users, 
  Leaf, Search, PlayCircle, Star, Sun, Anchor
} from 'lucide-react';

interface Props {
  onNavigate: (view: ViewState) => void;
}

export const AndhraThemes: React.FC<Props> = ({ onNavigate }) => {
  const [activeTheme, setActiveTheme] = useState<APTheme | 'ALL'>('ALL');
  
  // Filter logic
  const filteredTemples = activeTheme === 'ALL' 
    ? AP_TEMPLES 
    : AP_TEMPLES.filter(t => t.themes.includes(activeTheme));

  // Determine if we should show circuits (Only for ALL or SPIRITUAL)
  const showCircuits = activeTheme === 'ALL' || activeTheme === 'SPIRITUAL_CIRCUIT';

  const getThemeTitle = () => {
    switch(activeTheme) {
        case 'ALL': return 'Discover Andhra Pradesh';
        case 'SPIRITUAL_CIRCUIT': return 'Sacred Pilgrimage Circuits';
        case 'NATURE': return 'Eco & Nature Retreats';
        case 'WILDLIFE': return 'Tiger Reserves & Wildlife';
        case 'ADVENTURE': return 'Trekking & Adventure';
        case 'HERITAGE': return 'Ancient Heritage Sites';
        case '360_VR': return 'Virtual Reality Tours';
        case 'SHAKTI': return 'Divine Shakti Peethas';
        default: return 'Explore';
    }
  };

  const getThemeSubtitle = () => {
      switch(activeTheme) {
          case 'ALL': return 'The Spiritual & Nature Capital of India';
          case 'SPIRITUAL_CIRCUIT': return 'From the Big Three to Pancharama Kshetras';
          case 'NATURE': return 'Hill stations, Waterfalls, and Riverside Temples';
          case 'WILDLIFE': return 'Nallamala Forest, Sanctuaries & Safaris';
          case 'ADVENTURE': return 'Canyons, Caves, and Fort Treks';
          case 'HERITAGE': return 'Buddhist Stupas and Vijayanagara Architecture';
          case '360_VR': return 'Experience the divine before you visit';
          case 'SHAKTI': return 'Powerful Goddess Temples';
          default: return '';
      }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-slate-900 text-white pt-8 pb-24 px-6 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582555627768-3a9709d7a221?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
         
         <div className="max-w-7xl mx-auto relative z-10">
             <div className="flex items-center gap-4 mb-8">
                 <button onClick={() => onNavigate(ViewState.LANDING)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                     <ArrowLeft className="w-5 h-5" />
                 </button>
                 <div>
                    <h1 className="text-2xl font-bold">{getThemeTitle()}</h1>
                    <p className="text-slate-300 text-sm">{getThemeSubtitle()}</p>
                 </div>
             </div>
             
             {/* Theme Selector */}
             <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                 {[
                     { id: 'ALL', label: 'All', icon: <Compass className="w-4 h-4"/> },
                     { id: 'SPIRITUAL_CIRCUIT', label: 'Spiritual', icon: <Users className="w-4 h-4"/> },
                     { id: 'NATURE', label: 'Nature', icon: <Leaf className="w-4 h-4"/> },
                     { id: 'WILDLIFE', label: 'Wildlife', icon: <Eye className="w-4 h-4"/> },
                     { id: 'ADVENTURE', label: 'Adventure', icon: <Mountain className="w-4 h-4"/> },
                     { id: '360_VR', label: '360° VR', icon: <PlayCircle className="w-4 h-4"/> },
                     { id: 'HERITAGE', label: 'Heritage', icon: <ShieldCheck className="w-4 h-4"/> },
                     { id: 'SHAKTI', label: 'Shakti', icon: <Star className="w-4 h-4"/> },
                 ].map((theme) => (
                     <button
                        key={theme.id}
                        onClick={() => setActiveTheme(theme.id as any)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition border ${
                            activeTheme === theme.id 
                            ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30' 
                            : 'bg-white/10 border-white/20 text-slate-300 hover:bg-white/20'
                        }`}
                     >
                         {theme.icon} {theme.label}
                     </button>
                 ))}
             </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 space-y-12">
          
          {/* CIRCUITS SECTION (Only if ALL or SPIRITUAL) */}
          {showCircuits && (
              <section className="animate-fade-in-up">
                  <div className="flex justify-between items-end mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Map className="w-5 h-5 text-orange-500" /> Curated Circuits
                        </h2>
                        <p className="text-sm text-slate-500">Plan multi-day divine journeys</p>
                      </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {AP_CIRCUITS.map((circuit) => (
                          <div key={circuit.id} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden group cursor-pointer hover:-translate-y-1 transition duration-300">
                              <div className="relative h-48">
                                  <img src={circuit.image} alt={circuit.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                                      <Calendar className="w-3 h-3" /> {circuit.durationDays} Days
                                  </div>
                              </div>
                              <div className="p-5">
                                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{circuit.name}</h3>
                                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">{circuit.description}</p>
                                  <div className="flex items-center gap-1 mb-4">
                                      {circuit.temples.slice(0,5).map((t, i) => (
                                          <div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                                      ))}
                                      <span className="text-[10px] text-slate-400 ml-1">{circuit.temples.length} Stops</span>
                                  </div>
                                  <button onClick={() => onNavigate(ViewState.PLANNER)} className="w-full py-2.5 bg-orange-50 text-orange-700 font-bold rounded-xl hover:bg-orange-100 transition border border-orange-100 text-sm">
                                      Plan this Circuit
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
              </section>
          )}

          {/* MAIN LISTING GRID */}
          <section className="animate-fade-in-up">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-teal-500" /> 
                  {activeTheme === 'ALL' ? 'Top Destinations' : 'Explore Locations'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredTemples.map((temple) => (
                      <div key={temple.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition group flex flex-col">
                          <div className="relative h-52">
                              <img src={temple.image} alt={temple.name} className="w-full h-full object-cover" />
                              
                              {/* Overlay Badges */}
                              <div className="absolute top-3 left-3 flex flex-wrap gap-2 max-w-[80%]">
                                  <span className="bg-slate-900/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md border border-white/10">
                                      {temple.district}
                                  </span>
                                  {temple.themes.includes('WILDLIFE') && (
                                      <span className="bg-green-600/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md flex items-center gap-1">
                                          <Leaf className="w-3 h-3" /> Wildlife
                                      </span>
                                  )}
                                  {temple.themes.includes('360_VR') && (
                                      <span className="bg-indigo-600/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md flex items-center gap-1">
                                          <PlayCircle className="w-3 h-3" /> VR Ready
                                      </span>
                                  )}
                              </div>

                              {/* Access Type Badge */}
                              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md flex items-center gap-1">
                                  {temple.access === 'Boat' ? <Anchor className="w-3 h-3" /> : 
                                   temple.access === 'Trek' ? <Mountain className="w-3 h-3" /> : 
                                   temple.access === 'Jeep' ? <Compass className="w-3 h-3" /> : <Map className="w-3 h-3" />}
                                  {temple.access}
                              </div>
                          </div>
                          
                          <div className="p-5 flex-1 flex flex-col">
                              <div className="mb-2">
                                  <h3 className="font-bold text-lg text-slate-900 leading-tight">{temple.name}</h3>
                                  <p className="text-xs text-slate-500 font-medium mt-1">{temple.deity}</p>
                              </div>
                              
                              <p className="text-xs text-slate-500 mb-3 italic">"{temple.significance}"</p>

                              <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                                  {temple.darshanTypes.slice(0, 2).map((dt, i) => (
                                      <span key={i} className="text-[10px] bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-200">
                                          {dt}
                                      </span>
                                  ))}
                                  <span className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded border border-green-100 flex items-center gap-1">
                                      <Sun className="w-3 h-3" /> {temple.bestSeason}
                                  </span>
                              </div>

                              <div className="flex gap-2 pt-3 border-t border-slate-100">
                                  <button onClick={() => onNavigate(ViewState.DETAILS)} className="flex-1 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition">
                                      View
                                  </button>
                                  {temple.themes.includes('WILDLIFE') || temple.themes.includes('ADVENTURE') ? (
                                      <button onClick={() => onNavigate(ViewState.SMART_FLOW)} className="flex-1 py-2.5 bg-green-50 text-green-700 text-xs font-bold rounded-lg hover:bg-green-100 transition border border-green-200">
                                          Get Permit
                                      </button>
                                  ) : (
                                      <button onClick={() => onNavigate(ViewState.BOOKING)} className="flex-1 py-2.5 bg-orange-50 text-orange-700 text-xs font-bold rounded-lg hover:bg-orange-100 transition border border-orange-200">
                                          Book Darshan
                                      </button>
                                  )}
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </section>

          {/* AI Banner */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10 max-w-2xl">
                  <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 bg-white/20 rounded">
                          <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">Smart Sahayak</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Confused where to start?</h3>
                  <p className="text-indigo-100">
                      Our AI can plan a perfect spiritual & nature trip for you based on your interests. 
                      Try asking: "I want to visit Shiva temples and see waterfalls."
                  </p>
              </div>
              <div className="relative z-10">
                  <button onClick={() => onNavigate(ViewState.PLANNER)} className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition shadow-lg">
                      Ask AI to Plan
                  </button>
              </div>
          </div>

      </div>
    </div>
  );
};
