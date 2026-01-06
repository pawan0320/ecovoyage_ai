
import React, { useState } from 'react';
import { ViewState } from '../types';
import { Globe, Smartphone, ArrowRight, Leaf, Search, MapPin, Users, Star, Compass, Coffee, Mountain, Sparkles, Rocket, Building, ShieldCheck, Zap, Glasses } from 'lucide-react';

interface Props {
  onNavigate: (view: ViewState) => void;
}

export const Landing: React.FC<Props> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate(ViewState.ANDHRA_THEMES);
  };

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white min-h-[600px] flex items-center">
        {/* Background Image: Andhra Temple / Landscape */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605634262688-924d2629b3c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        <div className="relative w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20 pb-20">
            <div className="space-y-8 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-sm font-medium">
                    <Star className="w-4 h-4 fill-orange-300" /> #1 Smart Tourism Platform
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                    Welcome to <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-500">Andhra Pradesh</span>
                </h1>
                <p className="text-xl text-slate-200 max-w-xl leading-relaxed font-serif italic">
                    "The Spiritual & Nature Capital of India"
                </p>
                <p className="text-slate-300 max-w-lg">
                    From the sacred hills of Tirumala to the wild tigers of Nallamala. 
                    Plan your Darshan, Jungle Safari, and Heritage Trek in one app.
                </p>
                
                {/* Smart Search Bar */}
                <form onSubmit={handleSearch} className="bg-white p-2 rounded-full shadow-2xl flex flex-col md:flex-row gap-2 max-w-lg">
                    <div className="flex-1 flex items-center px-4 md:border-r border-slate-100">
                        <MapPin className="w-5 h-5 text-slate-400 mr-2" />
                        <input 
                            type="text" 
                            placeholder="Try 'Srisailam', 'Araku', or 'Tirupati'" 
                            className="w-full py-3 bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-8 py-3 font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30">
                        <Search className="w-5 h-5" /> Explore AP
                    </button>
                </form>
            </div>
            
            {/* Visual Stats */}
            <div className="hidden lg:block relative">
                 <div className="absolute top-0 right-0 w-80 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500">
                     <div className="flex items-center gap-4 mb-4">
                         <div className="p-3 bg-orange-500 rounded-full"><Sparkles className="w-6 h-6 text-white"/></div>
                         <div>
                             <p className="text-xs text-orange-200">Live Darshan Status</p>
                             <p className="text-2xl font-bold">Tirumala: 4h Wait</p>
                         </div>
                     </div>
                     <div className="flex gap-2">
                        <span className="text-[10px] bg-green-500/20 text-green-300 px-2 py-1 rounded">SSD Available</span>
                        <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-1 rounded">VIP Full</span>
                     </div>
                 </div>

                 <div className="absolute bottom-10 left-10 w-72 bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl transform -rotate-3 hover:rotate-0 transition duration-500">
                     <div className="flex items-center gap-4 mb-2">
                         <div className="w-12 h-12 rounded-lg bg-[url('https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=100')] bg-cover"></div>
                         <div>
                             <p className="text-sm font-bold">Tiger Safari</p>
                             <p className="text-xs text-slate-400">Nallamala Forest</p>
                         </div>
                     </div>
                     <button className="w-full mt-2 bg-teal-600/80 hover:bg-teal-600 py-2 rounded text-xs font-bold transition">Book Permit</button>
                 </div>
            </div>
        </div>
      </section>

      {/* THEMATIC ENTRY POINTS */}
      <section className="py-16 max-w-7xl mx-auto px-6 relative z-10 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div onClick={() => onNavigate(ViewState.ANDHRA_THEMES)} className="bg-white p-6 rounded-2xl shadow-xl border-b-4 border-orange-500 cursor-pointer hover:-translate-y-2 transition duration-300">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
                    <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Spiritual Circuits</h3>
                <p className="text-sm text-slate-500">Pancharama, Jyotirlinga & Shakti Peethas. AI-planned divine journeys.</p>
            </div>
            
            <div onClick={() => onNavigate(ViewState.ANDHRA_THEMES)} className="bg-white p-6 rounded-2xl shadow-xl border-b-4 border-green-500 cursor-pointer hover:-translate-y-2 transition duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                    <Leaf className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Wildlife & Nature</h3>
                <p className="text-sm text-slate-500">Book permits for Nallamala Tiger Reserve, Papikondalu boat rides & more.</p>
            </div>

            <div onClick={() => onNavigate(ViewState.ANDHRA_THEMES)} className="bg-white p-6 rounded-2xl shadow-xl border-b-4 border-indigo-500 cursor-pointer hover:-translate-y-2 transition duration-300">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                    <Glasses className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">AP 360° VR</h3>
                <p className="text-sm text-slate-500">Virtual Darshan of Tirumala & Undavalli Caves before you visit.</p>
            </div>

            <div onClick={() => onNavigate(ViewState.ANDHRA_THEMES)} className="bg-white p-6 rounded-2xl shadow-xl border-b-4 border-yellow-500 cursor-pointer hover:-translate-y-2 transition duration-300">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-yellow-600">
                    <Building className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Heritage & Arts</h3>
                <p className="text-sm text-slate-500">Buddhist circuits, Lepakshi art, and GI-tagged handicrafts marketplace.</p>
            </div>
        </div>
      </section>

      {/* Featured Destinations (Focus on AP) */}
      <section className="py-10 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Trending in Andhra</h2>
                <p className="text-slate-500">Handpicked gems for this season.</p>
            </div>
            <button onClick={() => onNavigate(ViewState.ANDHRA_THEMES)} className="text-orange-600 font-semibold hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { title: 'Gandikota Canyon', img: 'https://images.unsplash.com/photo-1590417764956-628489433433?auto=format&fit=crop&w=800&q=80', score: 9.8, tag: 'Adventure' },
                { title: 'Araku Valley', img: 'https://images.unsplash.com/photo-1624892405624-94474e2c0792?auto=format&fit=crop&w=800&q=80', score: 9.6, tag: 'Nature' },
                { title: 'Srikalahasti', img: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Srikalahasti_Temple_Gopuram.jpg', score: 9.5, tag: 'Spiritual' }
            ].map((dest, i) => (
                <div key={i} onClick={() => onNavigate(ViewState.DETAILS)} className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 relative">
                    <img src={dest.img} alt={dest.title} className="w-full h-80 object-cover group-hover:scale-110 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {dest.tag}
                    </div>
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">{dest.title}</h3>
                                <div className="flex items-center gap-1 text-teal-300">
                                    <Globe className="w-4 h-4" /> Best Season: Winter
                                </div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg border border-white/30 text-white font-bold">
                                {dest.score} / 10
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Government & APTDC Integration Banner */}
      <section className="bg-white py-20 border-t border-slate-100">
         <div className="max-w-7xl mx-auto px-6">
            <div className="bg-slate-900 rounded-3xl p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 max-w-xl">
                     <div className="flex items-center gap-3 mb-6">
                        <ShieldCheck className="w-8 h-8 text-green-400" />
                        <span className="font-bold tracking-widest text-sm uppercase text-slate-400">Official Partner</span>
                     </div>
                     <h2 className="text-4xl font-bold mb-6">Government Verified Platform</h2>
                     <p className="text-slate-300 text-lg mb-8">
                         Integrated with APTDC for verified temple slots, authentic forest permits, and safe Haritha resorts booking.
                     </p>
                     <div className="flex gap-4">
                         <button onClick={() => onNavigate(ViewState.GOV)} className="bg-white text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-slate-100 transition">
                             Gov Dashboard
                         </button>
                         <button onClick={() => onNavigate(ViewState.ECO)} className="bg-transparent border border-white/30 px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition">
                             View Sustainability Report
                         </button>
                     </div>
                </div>
                <div className="relative z-10 grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center">
                        <Users className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                        <p className="font-bold text-2xl">2.4M</p>
                        <p className="text-xs text-slate-400">Yatris Served</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center">
                        <Leaf className="w-8 h-8 mx-auto mb-2 text-green-400" />
                        <p className="font-bold text-2xl">₹12Cr</p>
                        <p className="text-xs text-slate-400">Local Revenue</p>
                    </div>
                </div>
            </div>
         </div>
      </section>
    </div>
  );
};
