import React, { useState } from 'react';
import { ViewState } from '../types';
import { 
  ArrowLeft, Star, MapPin, Share2, Heart, Leaf, 
  Users, Calendar, Clock, ShoppingBag, MessageSquare, 
  ShieldCheck, Globe, Medal
} from 'lucide-react';

interface Props {
  onNavigate: (view: ViewState) => void;
}

export const ExperienceDetails: React.FC<Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'ITINERARY' | 'HOST' | 'REVIEWS'>('ITINERARY');

  // Mock Data for a "Cultural Workshop"
  const experience = {
    name: 'Master Pottery Workshop',
    location: 'Kyoto, Japan',
    price: 45,
    rating: 4.9,
    reviews: 215,
    duration: '3 Hours',
    groupSize: 'Max 6',
    description: "Immerse yourself in the ancient art of Kyo-yaki pottery. Guided by Master Kenji, whose family has crafted ceramics for 400 years, you will learn traditional wheel throwing techniques using locally sourced clay.",
    host: {
      name: 'Kenji Tanaka',
      bio: 'Third-generation artisan potter dedicated to preserving sustainable crafting methods.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      badges: ['Heritage Keeper', 'Top Rated']
    },
    itinerary: [
      { time: '09:00', title: 'Welcome Tea', desc: 'Introduction to history of Kyoto ceramics over matcha.' },
      { time: '09:30', title: 'Clay Preparation', desc: 'Learn to wedge and center local organic clay.' },
      { time: '10:30', title: 'Wheel Throwing', desc: 'Hands-on practice shaping your own bowl or vase.' },
      { time: '11:30', title: 'Glazing & Firing', desc: 'Select natural glazes. Final pieces mailed after firing.' }
    ],
    ecoImpact: [
      'Solar-powered kiln',
      'Locally sourced clay (0 transport miles)',
      'Plastic-free packaging'
    ],
    images: [
      'https://images.unsplash.com/photo-1565193566173-7a646c9f6130?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=400&q=80'
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Hero Header */}
      <div className="relative h-[400px] w-full group">
          <img src={experience.images[0]} className="w-full h-full object-cover" />
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
                   <div className="flex items-center gap-2 mb-2 text-indigo-300 font-bold tracking-wide text-sm uppercase">
                       <Globe className="w-4 h-4" /> Cultural Immersion
                   </div>
                   <h1 className="text-3xl md:text-5xl font-bold mb-4">{experience.name}</h1>
                   <div className="flex flex-wrap items-center gap-6 text-sm md:text-base">
                       <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-slate-300" /> {experience.location}</span>
                       <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-slate-300" /> {experience.duration}</span>
                       <span className="flex items-center gap-1"><Users className="w-4 h-4 text-slate-300" /> {experience.groupSize}</span>
                   </div>
              </div>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                  {/* Host Section (Mini) */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-4">
                          <img src={experience.host.image} className="w-14 h-14 rounded-full object-cover border-2 border-indigo-100" />
                          <div>
                              <p className="text-xs text-slate-500 font-bold uppercase">Hosted by</p>
                              <h3 className="font-bold text-slate-900 text-lg">{experience.host.name}</h3>
                          </div>
                      </div>
                      <div className="flex gap-2">
                          {experience.host.badges.map(b => (
                              <span key={b} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-bold flex items-center gap-1">
                                  <Medal className="w-3 h-3" /> {b}
                              </span>
                          ))}
                      </div>
                  </div>

                  <div className="prose prose-slate max-w-none">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">About this Experience</h3>
                      <p className="text-slate-600 leading-relaxed">{experience.description}</p>
                  </div>

                  {/* Eco Impact */}
                  <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                      <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                          <Leaf className="w-5 h-5" /> Sustainability Impact
                      </h3>
                      <ul className="space-y-2">
                          {experience.ecoImpact.map((impact, i) => (
                              <li key={i} className="flex items-center gap-3 text-emerald-800 text-sm">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                  {impact}
                              </li>
                          ))}
                      </ul>
                  </div>

                  {/* Tabs */}
                  <div className="border-b border-slate-200">
                      <div className="flex gap-8">
                          {['ITINERARY', 'REVIEWS'].map((tab) => (
                              <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`pb-4 font-bold text-sm tracking-wide transition relative ${
                                    activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-800'
                                }`}
                              >
                                  {tab}
                              </button>
                          ))}
                      </div>
                  </div>

                  {activeTab === 'ITINERARY' && (
                      <div className="space-y-6 relative border-l-2 border-slate-200 ml-3 pl-8 py-2">
                          {experience.itinerary.map((item, i) => (
                              <div key={i} className="relative">
                                  <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-indigo-600 border-4 border-slate-50"></div>
                                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded mb-1 inline-block">{item.time}</span>
                                  <h4 className="font-bold text-slate-900 text-md">{item.title}</h4>
                                  <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                              </div>
                          ))}
                      </div>
                  )}

                  {activeTab === 'REVIEWS' && (
                      <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-4">
                              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                              <span className="text-2xl font-bold text-slate-900">{experience.rating}</span>
                              <span className="text-slate-500">({experience.reviews} reviews)</span>
                          </div>
                          {/* Mock Review */}
                          <div className="bg-white p-4 rounded-xl border border-slate-100">
                              <div className="flex items-center gap-3 mb-2">
                                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">S</div>
                                  <div>
                                      <p className="text-sm font-bold text-slate-900">Sarah Jenkins</p>
                                      <p className="text-xs text-slate-400">October 2023</p>
                                  </div>
                              </div>
                              <p className="text-sm text-slate-600">"Master Kenji was incredibly patient. Making my own bowl was a highlight of my trip!"</p>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-slate-100">
                              <div className="flex items-center gap-3 mb-2">
                                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">M</div>
                                  <div>
                                      <p className="text-sm font-bold text-slate-900">Mike Ross</p>
                                      <p className="text-xs text-slate-400">September 2023</p>
                                  </div>
                              </div>
                              <p className="text-sm text-slate-600">"Very authentic experience. The tea ceremony at the start set the mood perfectly."</p>
                          </div>
                          <button className="w-full py-2 text-sm text-slate-500 font-bold hover:text-indigo-600">View all reviews</button>
                      </div>
                  )}
              </div>

              {/* Booking Sidebar */}
              <div className="lg:col-span-1">
                  <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 sticky top-24">
                      <div className="flex justify-between items-end mb-6">
                          <div>
                              <span className="text-3xl font-bold text-slate-900">${experience.price}</span>
                              <span className="text-slate-500"> / person</span>
                          </div>
                          <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-bold">
                              <ShieldCheck className="w-3 h-3" /> Certified
                          </div>
                      </div>

                      <div className="space-y-4 mb-6">
                          <div className="border border-slate-200 p-3 rounded-lg flex items-center gap-3">
                              <Calendar className="w-5 h-5 text-slate-400" />
                              <div className="flex-1">
                                  <label className="block text-xs text-slate-500">Date</label>
                                  <div className="font-bold text-slate-800">Oct 26, 2023</div>
                              </div>
                              <span className="text-xs text-indigo-600 font-bold cursor-pointer">Change</span>
                          </div>
                          <div className="border border-slate-200 p-3 rounded-lg flex items-center gap-3">
                               <Users className="w-5 h-5 text-slate-400" />
                               <div className="flex-1">
                                  <label className="block text-xs text-slate-500">Guests</label>
                                  <div className="font-bold text-slate-800">2 Adults</div>
                               </div>
                          </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm text-slate-600">
                             <span>$45 x 2 guests</span>
                             <span>$90</span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-600">
                             <span>Service fee</span>
                             <span>$5</span>
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex justify-between font-bold text-lg text-slate-900">
                             <span>Total</span>
                             <span>$95</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => onNavigate(ViewState.BOOKING)}
                        className="w-full mt-6 bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                      >
                          <ShoppingBag className="w-4 h-4" /> Book Experience
                      </button>
                      
                      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                          <MessageSquare className="w-3 h-3" />
                          <span>Have questions? <span className="text-indigo-600 font-bold cursor-pointer hover:underline">Message Host</span></span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
