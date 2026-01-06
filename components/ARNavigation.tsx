
import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';
import { ArrowLeft, Navigation, MapPin, Compass, Scan, Map, Star, Clock, Utensils, Landmark, TreePine, Footprints } from 'lucide-react';

interface Props {
  onNavigate: (view: ViewState) => void;
}

interface POI {
  id: number;
  name: string;
  distance: number; // meters
  type: 'HISTORY' | 'FOOD' | 'ECO' | 'NATURE';
  rating: number;
  description: string;
  x: number; // Screen position %
  y: number; // Screen position %
  image: string;
}

export const ARNavigation: React.FC<Props> = ({ onNavigate }) => {
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(true);
  const [compassHeading, setCompassHeading] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'HISTORY' | 'FOOD' | 'ECO'>('ALL');
  const [showPath, setShowPath] = useState(false);

  // Simulating AR Calibration & Compass
  useEffect(() => {
    const timer = setTimeout(() => setIsCalibrating(false), 1500);
    const interval = setInterval(() => {
      setCompassHeading(prev => (prev + 1) % 360);
    }, 100);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const pointsOfInterest: POI[] = [
    { 
      id: 1, 
      name: 'Kyoto Imperial Palace', 
      distance: 150, 
      type: 'HISTORY', 
      rating: 4.8, 
      description: 'Former ruling palace of the Emperor of Japan. Features sustainable cedar architecture.',
      x: 25, 
      y: 35,
      image: 'https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?auto=format&fit=crop&w=400&q=80'
    },
    { 
      id: 2, 
      name: 'Zero-Waste Matcha Cafe', 
      distance: 85, 
      type: 'FOOD', 
      rating: 4.9, 
      description: 'Award-winning sustainable cafe serving locally sourced organic matcha.',
      x: 70, 
      y: 45,
      image: 'https://images.unsplash.com/photo-1542729779-11d291e604f6?auto=format&fit=crop&w=400&q=80'
    },
    { 
      id: 3, 
      name: 'Bamboo Forest Path', 
      distance: 320, 
      type: 'NATURE', 
      rating: 4.7, 
      description: 'Ancient walking trail preserved for 400 years.',
      x: 45, 
      y: 20,
      image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=400&q=80'
    },
    { 
      id: 4, 
      name: 'Eco-Charging Station', 
      distance: 50, 
      type: 'ECO', 
      rating: 4.5, 
      description: 'Solar powered device charging.',
      x: 85, 
      y: 60,
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const filteredPoints = pointsOfInterest.filter(p => activeFilter === 'ALL' || p.type === activeFilter || (activeFilter === 'ECO' && p.type === 'NATURE'));

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden font-sans">
      {/* Background Camera Simulation */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ 
           backgroundImage: "url('https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')",
           opacity: isCalibrating ? 0.5 : 1
        }}
      ></div>

      {/* AR Path Overlay (SVG) */}
      {showPath && !isCalibrating && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 animate-pulse" style={{ opacity: 0.7 }}>
              <path 
                d="M 50% 100% Q 50% 80% 45% 60% T 70% 45%" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="4" 
                strokeDasharray="10,5"
              />
              <circle cx="70%" cy="45%" r="5" fill="#10b981" />
          </svg>
      )}

      {/* Calibration Overlay */}
      {isCalibrating && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-50">
           <Scan className="w-16 h-16 text-teal-400 animate-pulse mb-4" />
           <p className="text-white font-bold text-lg">Calibrating AR Sensors...</p>
           <p className="text-teal-200 text-sm">Aligning with GPS & Gyroscope</p>
        </div>
      )}

      {/* HUD - Top Bar */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent z-40">
         <button 
           onClick={() => onNavigate(ViewState.TOURIST)}
           className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-white/20 transition"
         >
           <ArrowLeft className="w-6 h-6" />
         </button>

         <div className="flex flex-col items-center">
             <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-1 rounded-full border border-white/10 mb-2">
                 <Compass className="w-4 h-4 text-teal-400" />
                 <span className="text-white text-xs font-mono">NE {compassHeading}°</span>
             </div>
             {/* Filter Tabs */}
             <div className="flex gap-2 p-1 bg-black/30 backdrop-blur-md rounded-lg">
                 {['ALL', 'HISTORY', 'FOOD', 'ECO'].map(f => (
                     <button
                        key={f}
                        onClick={() => setActiveFilter(f as any)}
                        className={`text-[10px] font-bold px-3 py-1 rounded-md transition ${
                            activeFilter === f ? 'bg-teal-600 text-white' : 'text-white/60 hover:bg-white/10'
                        }`}
                     >
                         {f}
                     </button>
                 ))}
             </div>
         </div>

         <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-white/20 transition">
            <Map className="w-6 h-6" />
         </button>
      </div>

      {/* AR Markers */}
      {!isCalibrating && (
        <div className="absolute inset-0 pointer-events-none">
            {filteredPoints.map((poi) => (
                <div 
                    key={poi.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer pointer-events-auto transition-transform hover:scale-110 duration-300 z-20"
                    style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                    onClick={() => { setSelectedPOI(poi); setShowPath(true); }}
                >
                    {/* Distance Tag */}
                    <div className="bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 border border-teal-500/50 shadow-lg backdrop-blur-sm">
                        {poi.distance}m
                    </div>
                    
                    {/* Marker Icon */}
                    <div className={`w-12 h-12 rounded-full border-2 border-white shadow-xl flex items-center justify-center relative overflow-hidden ${
                        selectedPOI?.id === poi.id ? 'bg-teal-500 scale-110' : 'bg-white/90'
                    }`}>
                        <div className={`absolute inset-0 opacity-20 ${poi.type === 'ECO' || poi.type === 'NATURE' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                        {poi.type === 'HISTORY' && <Landmark className={`w-6 h-6 ${selectedPOI?.id === poi.id ? 'text-white' : 'text-slate-800'}`} />}
                        {(poi.type === 'ECO' || poi.type === 'NATURE') && <TreePine className={`w-6 h-6 ${selectedPOI?.id === poi.id ? 'text-white' : 'text-green-600'}`} />}
                        {poi.type === 'FOOD' && <Utensils className={`w-6 h-6 ${selectedPOI?.id === poi.id ? 'text-white' : 'text-orange-500'}`} />}
                    </div>
                    
                    {/* Name Label */}
                    <div className="mt-1 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
                        <span className="text-white text-xs font-bold whitespace-nowrap">{poi.name}</span>
                    </div>

                    {/* Connecting Line to ground (Visual Effect) */}
                    <div className="w-0.5 h-16 bg-gradient-to-b from-white/50 to-transparent absolute top-full"></div>
                </div>
            ))}
        </div>
      )}

      {/* Bottom Sheet - Details */}
      {selectedPOI && (
          <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl p-6 pb-8 shadow-2xl animate-fade-in-up z-50">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4"></div>
              
              <div className="flex gap-4">
                  <img src={selectedPOI.image} alt={selectedPOI.name} className="w-24 h-24 rounded-xl object-cover shadow-md" />
                  <div className="flex-1">
                      <div className="flex justify-between items-start">
                          <div>
                              <div className="flex items-center gap-2 mb-1">
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                      selectedPOI.type === 'ECO' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                  }`}>
                                      {selectedPOI.type}
                                  </span>
                                  <span className="text-slate-400 text-xs flex items-center gap-1">
                                      <Navigation className="w-3 h-3" /> {selectedPOI.distance}m away
                                  </span>
                              </div>
                              <h3 className="font-bold text-lg text-slate-900">{selectedPOI.name}</h3>
                          </div>
                          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                              <span className="text-xs font-bold text-yellow-700">{selectedPOI.rating}</span>
                          </div>
                      </div>
                      <p className="text-sm text-slate-500 mt-2 line-clamp-2">{selectedPOI.description}</p>
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                  <button onClick={() => { setSelectedPOI(null); setShowPath(false); }} className="py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition">
                      Cancel
                  </button>
                  <button className="py-3 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 transition flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20">
                      <Footprints className="w-4 h-4" /> Start AR Path
                  </button>
              </div>
          </div>
      )}

      {/* Radar / Minimap */}
      <div className="absolute bottom-8 right-6 w-20 h-20 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
         <div className="w-16 h-16 rounded-full border border-white/30 relative">
            <div className="absolute inset-0 bg-teal-500/20 rounded-full animate-ping"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
            {/* Radar dots based on filtered items */}
            {filteredPoints.map(p => (
                <div 
                    key={p.id}
                    className={`absolute w-1.5 h-1.5 rounded-full ${p.id === selectedPOI?.id ? 'bg-yellow-400 animate-ping' : 'bg-teal-400'}`}
                    style={{ top: `${p.y}%`, left: `${p.x}%` }}
                ></div>
            ))}
         </div>
         <p className="absolute -bottom-6 text-[10px] text-white font-bold">RADAR</p>
      </div>
    </div>
  );
};
