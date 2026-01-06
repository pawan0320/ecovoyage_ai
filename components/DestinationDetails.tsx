
import React, { useState } from 'react';
import { ViewState, TripSimulation } from '../types';
import { 
  ArrowLeft, Star, MapPin, Share2, Heart, Leaf, 
  Users, Thermometer, Calendar, PlayCircle, Eye, Scan,
  Glasses, Sparkles, Loader2, Sun, Moon, Sunset, Droplets, Wind, X
} from 'lucide-react';
import { EcoView360 } from './EcoView360';
import { simulateTripExperience } from '../services/geminiService';

interface Props {
  onNavigate: (view: ViewState) => void;
}

export const DestinationDetails: React.FC<Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'STAY' | 'ACTIVITIES'>('OVERVIEW');
  const [showEcoLens, setShowEcoLens] = useState(false);
  
  // FutureView AI State
  const [showSimulator, setShowSimulator] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulation, setSimulation] = useState<TripSimulation | null>(null);

  // Mock Data
  const destination = {
    name: 'Forest Retreat & Spa',
    location: 'Ubud, Bali, Indonesia',
    price: 240,
    rating: 4.9,
    reviews: 128,
    ecoScore: 9.8,
    description: "Experience the ultimate sustainable luxury in the heart of Bali's jungle. Our zero-waste resort is built entirely from renewable bamboo and powered by solar energy. Enjoy farm-to-table dining, traditional wellness treatments, and immersive nature treks.",
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=400&q=80'
    ],
    amenities: ['Solar Power', 'Bamboo Architecture', 'Permaculture Garden', 'Natural Spring Pool', 'Vegan Dining']
  };

  const ecoHotspots = [
      { id: '1', yaw: 20, pitch: -10, label: 'Bamboo Architecture', description: 'Locally sourced bamboo reduces construction carbon footprint by 80%.' },
      { id: '2', yaw: 140, pitch: 10, label: 'Solar Array', description: 'Hidden rooftop panels generate 120% of the resort\'s energy needs.' },
      { id: '3', yaw: -50, pitch: 0, label: 'Organic Permaculture', description: 'Guests can forage their own dinner from our on-site edible gardens.' }
  ];

  const handleSimulate = async () => {
    setShowSimulator(true);
    setIsSimulating(true);
    setSimulation(null);

    // Call AI Service
    const result = await simulateTripExperience(
        destination.name,
        destination.amenities,
        "Loves nature, quiet luxury, and vegan food. Dislikes crowds."
    );

    setSimulation(result);
    setIsSimulating(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {showEcoLens && (
          <EcoView360 
            image="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            hotspots={ecoHotspots}
            onClose={() => setShowEcoLens(false)} 
          />
      )}

      {/* Hero Gallery */}
      <div className="relative h-[500px] w-full group">
          <img src={destination.images[0]} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          
          <div className="absolute top-6 left-6 z-10">
              <button 
                onClick={() => onNavigate(ViewState.SEARCH)}
                className="bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white text-white hover:text-slate-900 transition border border-white/20"
              >
                  <ArrowLeft className="w-5 h-5" />
              </button>
          </div>

          <div className="absolute top-6 right-6 z-10 flex gap-3">
              <button className="bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white text-white hover:text-slate-900 transition border border-white/20">
                  <Share2 className="w-5 h-5" />
              </button>
              <button className="bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white text-white hover:text-red-500 transition border border-white/20">
                  <Heart className="w-5 h-5" />
              </button>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-8 text-white">
              <div className="max-w-7xl mx-auto">
                   <div className="flex items-center gap-2 mb-2 text-teal-300 font-bold tracking-wide text-sm uppercase">
                       <Leaf className="w-4 h-4" /> Eco-Certified Resort
                   </div>
                   <h1 className="text-4xl md:text-5xl font-bold mb-4">{destination.name}</h1>
                   <div className="flex flex-wrap items-center gap-6">
                       <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-slate-300" /> {destination.location}</span>
                       <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {destination.rating} ({destination.reviews} reviews)</span>
                   </div>
              </div>
          </div>
          
          <div className="absolute bottom-8 right-8 flex gap-3">
            <button 
                onClick={handleSimulate}
                className="bg-indigo-600/90 backdrop-blur-lg border border-indigo-400/50 text-white pl-5 pr-6 py-3 rounded-full font-bold flex items-center gap-3 hover:bg-indigo-600 transition shadow-lg group hover:scale-105"
            >
                <Sparkles className="w-5 h-5 text-indigo-200 animate-pulse" />
                <div className="text-left leading-tight">
                    <span className="block text-xs font-normal text-indigo-200">AI Preview</span>
                    <span className="block text-sm">FutureView™</span>
                </div>
            </button>
            <button 
                onClick={() => setShowEcoLens(true)}
                className="bg-white/20 backdrop-blur-lg border border-white/30 text-white pl-5 pr-6 py-3 rounded-full font-bold flex items-center gap-3 hover:bg-white/30 transition shadow-lg group hover:scale-105"
            >
                <div className="relative">
                    <Glasses className="w-6 h-6 text-teal-300" />
                </div>
                <div className="text-left leading-tight">
                    <span className="block text-xs font-normal text-teal-100">360° Tour</span>
                    <span className="block text-sm">EcoLens</span>
                </div>
            </button>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                  {/* Tabs */}
                  <div className="flex border-b border-slate-200">
                      {['OVERVIEW', 'STAY', 'ACTIVITIES'].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-6 py-4 font-bold text-sm tracking-wide transition relative ${
                                activeTab === tab ? 'text-teal-600' : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                              {tab}
                              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600"></div>}
                          </button>
                      ))}
                  </div>

                  <div className="prose prose-slate max-w-none">
                      <p className="text-lg text-slate-600 leading-relaxed">{destination.description}</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <h3 className="text-xl font-bold text-slate-900 mb-6">Sustainability Impact</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          <div>
                              <div className="text-3xl font-bold text-teal-600 mb-1">100%</div>
                              <div className="text-sm text-slate-500 font-medium">Renewable Energy</div>
                          </div>
                          <div>
                              <div className="text-3xl font-bold text-teal-600 mb-1">0</div>
                              <div className="text-sm text-slate-500 font-medium">Single-Use Plastic</div>
                          </div>
                          <div>
                              <div className="text-3xl font-bold text-teal-600 mb-1">Local</div>
                              <div className="text-sm text-slate-500 font-medium">Sourced Food</div>
                          </div>
                          <div>
                              <div className="text-3xl font-bold text-teal-600 mb-1">A+</div>
                              <div className="text-sm text-slate-500 font-medium">Waste Management</div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Booking Card */}
              <div className="lg:col-span-1">
                  <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 sticky top-24">
                      <div className="flex justify-between items-end mb-6">
                          <div>
                              <span className="text-3xl font-bold text-slate-900">${destination.price}</span>
                              <span className="text-slate-500"> / night</span>
                          </div>
                          <div className="flex items-center gap-1 text-teal-600 bg-teal-50 px-2 py-1 rounded text-xs font-bold">
                              <Leaf className="w-3 h-3" /> Best Price
                          </div>
                      </div>

                      <div className="space-y-4 mb-6">
                          <div className="grid grid-cols-2 gap-4">
                              <div className="border border-slate-200 p-3 rounded-lg">
                                  <label className="block text-xs text-slate-500 mb-1">Check-in</label>
                                  <div className="font-bold text-slate-800">Oct 24</div>
                              </div>
                              <div className="border border-slate-200 p-3 rounded-lg">
                                  <label className="block text-xs text-slate-500 mb-1">Check-out</label>
                                  <div className="font-bold text-slate-800">Oct 29</div>
                              </div>
                          </div>
                          <div className="border border-slate-200 p-3 rounded-lg flex items-center justify-between">
                               <div>
                                  <label className="block text-xs text-slate-500 mb-1">Guests</label>
                                  <div className="font-bold text-slate-800">2 Adults</div>
                               </div>
                               <Users className="w-5 h-5 text-slate-400" />
                          </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm text-slate-600">
                             <span>$240 x 5 nights</span>
                             <span>$1,200</span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-600">
                             <span>Cleaning fee</span>
                             <span>$50</span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-600">
                             <span>Service fee</span>
                             <span>$80</span>
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex justify-between font-bold text-lg text-slate-900">
                             <span>Total</span>
                             <span>$1,330</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => onNavigate(ViewState.BOOKING)}
                        className="w-full mt-6 bg-teal-600 text-white py-3.5 rounded-xl font-bold hover:bg-teal-700 transition flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
                      >
                          Reserve Now
                      </button>
                      <p className="text-center text-xs text-slate-400 mt-4">You won't be charged yet</p>
                  </div>
              </div>
          </div>
      </div>

      {/* FutureView™ Simulation Modal */}
      {showSimulator && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-fade-in">
              <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                  {/* Header */}
                  <div className="bg-indigo-600 p-6 text-white flex justify-between items-start relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                      <div className="relative z-10">
                          <h2 className="text-2xl font-bold flex items-center gap-2">
                              <Sparkles className="w-6 h-6" /> FutureView™
                          </h2>
                          <p className="text-indigo-100 text-sm opacity-90">AI-Predicted Travel Experience</p>
                      </div>
                      <button 
                        onClick={() => setShowSimulator(false)}
                        className="relative z-10 bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
                      >
                          <X className="w-5 h-5" />
                      </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6">
                      {isSimulating ? (
                          <div className="flex flex-col items-center justify-center h-64 space-y-4">
                              <div className="relative w-16 h-16">
                                  <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                                  <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                              </div>
                              <p className="text-slate-600 font-medium animate-pulse">Consulting the timeline...</p>
                              <p className="text-xs text-slate-400">Analyzing weather, amenities, and your vibe.</p>
                          </div>
                      ) : simulation ? (
                          <div className="space-y-6 animate-fade-in-up">
                              {/* Vibe Check */}
                              <div className="flex items-center gap-4 bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                                  <div className="relative w-16 h-16 flex items-center justify-center">
                                      <svg className="absolute w-full h-full transform -rotate-90">
                                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-indigo-200" />
                                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-indigo-600" strokeDasharray={`${simulation.matchScore * 1.75}, 1000`} />
                                      </svg>
                                      <span className="font-bold text-indigo-700 text-sm">{simulation.matchScore}%</span>
                                  </div>
                                  <div>
                                      <h3 className="font-bold text-indigo-900">Your Vibe: {simulation.vibeTag}</h3>
                                      <p className="text-xs text-indigo-700">This destination aligns perfectly with your "Quiet Luxury" and "Eco-Conscious" preferences.</p>
                                  </div>
                              </div>

                              {/* Timeline */}
                              <div className="space-y-6 relative">
                                  <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-200"></div>
                                  
                                  {simulation.timeline.map((segment, idx) => (
                                      <div key={idx} className="relative pl-14">
                                          <div className={`absolute left-3 top-0 w-6 h-6 rounded-full border-2 border-white shadow flex items-center justify-center z-10 ${
                                              segment.timeOfDay === 'Morning' ? 'bg-orange-400' :
                                              segment.timeOfDay === 'Afternoon' ? 'bg-yellow-500' :
                                              'bg-indigo-500'
                                          }`}>
                                              {segment.timeOfDay === 'Morning' && <Sun className="w-3 h-3 text-white" />}
                                              {segment.timeOfDay === 'Afternoon' && <Sun className="w-3 h-3 text-white" />}
                                              {segment.timeOfDay === 'Evening' && <Moon className="w-3 h-3 text-white" />}
                                          </div>
                                          
                                          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition">
                                              <div className="flex justify-between items-start mb-2">
                                                  <h4 className="font-bold text-slate-800">{segment.timeOfDay}</h4>
                                                  <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                                                      Sensory Highlight
                                                  </span>
                                              </div>
                                              <p className="text-sm text-slate-600 mb-3 leading-relaxed">{segment.narrative}</p>
                                              
                                              <div className="flex flex-col gap-2">
                                                  <div className="flex items-center gap-2 text-xs text-indigo-600 font-medium">
                                                      <Eye className="w-3 h-3" /> {segment.sensoryDetail}
                                                  </div>
                                                  <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
                                                      <Leaf className="w-3 h-3" /> {segment.impactHighlight}
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  ))}
                              </div>

                              {/* Projected Savings */}
                              <div className="grid grid-cols-3 gap-3">
                                  <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                                      <Wind className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                                      <div className="font-bold text-slate-800">{simulation.projectedSavings.co2}</div>
                                      <div className="text-[10px] text-slate-500">CO2 Saved</div>
                                  </div>
                                  <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                                      <Droplets className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                                      <div className="font-bold text-slate-800">{simulation.projectedSavings.water}</div>
                                      <div className="text-[10px] text-slate-500">Water Saved</div>
                                  </div>
                                  <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                                      <Leaf className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                                      <div className="font-bold text-slate-800">{simulation.projectedSavings.plastic}</div>
                                      <div className="text-[10px] text-slate-500">Plastic Avoided</div>
                                  </div>
                              </div>
                          </div>
                      ) : (
                          <div className="text-center text-red-500">Simulation failed. Please try again.</div>
                      )}
                  </div>
                  
                  {/* Footer Action */}
                  <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-3">
                      <button onClick={() => setShowSimulator(false)} className="flex-1 py-3 text-slate-600 font-bold text-sm hover:bg-slate-200 rounded-xl transition">
                          Close
                      </button>
                      <button onClick={() => onNavigate(ViewState.BOOKING)} className="flex-1 py-3 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20">
                          Book This Experience
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
