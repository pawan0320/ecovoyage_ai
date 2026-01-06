import React from 'react';
import { Leaf, Award, TrendingUp, Droplets, Wind, Zap, Share2, Info } from 'lucide-react';

export const EcoPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-emerald-900 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb7d5fa5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
             <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
                 <Leaf className="w-4 h-4 text-emerald-400" /> <span className="text-sm font-bold tracking-wide">YOUR IMPACT REPORT</span>
             </div>
             <h1 className="text-4xl md:text-6xl font-bold mb-6">Traveling for a Better World</h1>
             <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                 Every trip you take with EcoVoyage contributes to global reforestation and sustainable community development.
             </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-emerald-50 text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wind className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 mb-2">450 kg</h3>
                  <p className="text-slate-500 font-medium">CO2 Offset</p>
                  <p className="text-xs text-emerald-600 mt-2 font-bold">+12% vs last month</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-emerald-50 text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Droplets className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 mb-2">2,000 L</h3>
                  <p className="text-slate-500 font-medium">Water Conserved</p>
                  <p className="text-xs text-blue-600 mt-2 font-bold">Through eco-stays</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-emerald-50 text-center">
                  <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 mb-2">150 kWh</h3>
                  <p className="text-slate-500 font-medium">Renewable Energy Used</p>
                  <p className="text-xs text-yellow-600 mt-2 font-bold">Solar & Wind powered</p>
              </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Badges Section */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                  <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-slate-900">Your Eco Badges</h2>
                      <button className="text-emerald-600 font-bold text-sm hover:underline">View All</button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                          { name: 'Carbon Neutral', desc: 'Offset 1 ton CO2', unlocked: true, color: 'bg-emerald-500' },
                          { name: 'Plastic Free', desc: '5 stays without plastic', unlocked: true, color: 'bg-blue-500' },
                          { name: 'Local Hero', desc: 'Support 10 local biz', unlocked: false, color: 'bg-slate-300' },
                          { name: 'Train Trekker', desc: '500km by rail', unlocked: true, color: 'bg-orange-500' },
                      ].map((badge, i) => (
                          <div key={i} className={`p-4 rounded-xl text-center border-2 ${badge.unlocked ? 'border-transparent bg-slate-50' : 'border-dashed border-slate-200 opacity-60'}`}>
                              <div className={`w-12 h-12 mx-auto rounded-full mb-3 flex items-center justify-center text-white ${badge.color}`}>
                                  <Award className="w-6 h-6" />
                              </div>
                              <h4 className="font-bold text-slate-800 text-sm">{badge.name}</h4>
                              <p className="text-xs text-slate-500 mt-1">{badge.desc}</p>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Tips Section */}
              <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
                  <h2 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" /> Green Travel Tips
                  </h2>
                  <div className="space-y-4">
                      <div className="bg-white p-4 rounded-xl shadow-sm">
                          <h4 className="font-bold text-slate-800 text-sm mb-1">Pack Light</h4>
                          <p className="text-xs text-slate-600">Every kg counts. Reducing luggage weight by 15kg saves ~50kg CO2 on a long haul flight.</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl shadow-sm">
                          <h4 className="font-bold text-slate-800 text-sm mb-1">Eat Local & Veg</h4>
                          <p className="text-xs text-slate-600">One plant-based meal a day can reduce your food carbon footprint by up to 40%.</p>
                      </div>
                  </div>
                  <button className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition flex items-center justify-center gap-2">
                      <Share2 className="w-4 h-4" /> Share Tips
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};
