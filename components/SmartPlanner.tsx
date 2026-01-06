
import React, { useState } from 'react';
import { generateSmartItinerary } from '../services/geminiService';
import { Itinerary } from '../types';
import { Loader2, Leaf, DollarSign, Calendar, MapPin, Sparkles, ArrowRight, Compass } from 'lucide-react';

interface Props {
  onBook: (itinerary: Itinerary) => void;
}

export const SmartPlanner: React.FC<Props> = ({ onBook }) => {
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [formData, setFormData] = useState({
    destination: 'Tirupati',
    days: 3,
    budget: 'Moderate',
    interests: ''
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setItinerary(null);
    
    // Split interests by comma
    const interestList = formData.interests.split(',').map(i => i.trim()).filter(i => i);
    
    // Add AP context to interests implicitly
    const enrichedInterests = [...interestList, 'Andhra Pradesh Tourism', 'Authentic Local Experience'];

    const result = await generateSmartItinerary(
      formData.destination, 
      formData.days, 
      formData.budget, 
      enrichedInterests
    );
    
    setItinerary(result);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-orange-500" /> AP Smart Sahayak
        </h2>
        <p className="text-slate-600">AI-powered pilgrimage and nature trip planner for Andhra Pradesh.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-slate-200 h-fit sticky top-6">
          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Primary Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <select 
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition bg-white"
                  value={formData.destination}
                  onChange={e => setFormData({...formData, destination: e.target.value})}
                >
                    <option value="Tirupati">Tirupati (Spiritual)</option>
                    <option value="Srisailam">Srisailam (Jyotirlinga & Nature)</option>
                    <option value="Visakhapatnam">Visakhapatnam (Beach & Hills)</option>
                    <option value="Vijayawada">Vijayawada (Kanaka Durga)</option>
                    <option value="Araku Valley">Araku Valley (Nature)</option>
                    <option value="Rajahmundry">Rajahmundry (River Godavari)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Duration (Days)</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input 
                  type="number"
                  min="1"
                  max="14"
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition"
                  value={formData.days}
                  onChange={e => setFormData({...formData, days: parseInt(e.target.value)})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Budget Level</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <select 
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition"
                  value={formData.budget}
                  onChange={e => setFormData({...formData, budget: e.target.value})}
                >
                  <option value="Budget">Budget (Dharamshalas/RTC)</option>
                  <option value="Moderate">Moderate (Hotels/Cabs)</option>
                  <option value="Luxury">Luxury (Resorts/Packages)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Specific Interests</label>
              <textarea 
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition"
                rows={3}
                placeholder="e.g., Tiger Safari, Pancharama Temples, Bamboo Chicken..."
                value={formData.interests}
                onChange={e => setFormData({...formData, interests: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Plan My Yatra'}
            </button>
          </form>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-2 space-y-6">
          {!itinerary && !loading && (
            <div className="flex flex-col items-center justify-center h-96 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 text-slate-500">
              <Compass className="w-12 h-12 mb-4 text-slate-400" />
              <p className="text-lg">Your spiritual journey starts here.</p>
              <p className="text-sm">Select a destination to get an AI-curated plan.</p>
            </div>
          )}

          {loading && (
             <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl shadow-sm">
                <div className="relative w-20 h-20">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-200 rounded-full animate-ping"></div>
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-t-orange-600 rounded-full animate-spin"></div>
                </div>
                <p className="mt-6 text-slate-600 font-medium">Consulting Knowledge Base...</p>
                <p className="text-slate-400 text-sm">Checking Darshan slots and Forest permits.</p>
             </div>
          )}

          {itinerary && (
            <div className="animate-fade-in space-y-6">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-2xl font-bold">{itinerary.destination}</h3>
                  <p className="opacity-90">{itinerary.duration} Days • {itinerary.totalCostEstimate}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl text-center">
                    <div className="text-sm opacity-80 uppercase tracking-wider">Eco Score</div>
                    <div className="text-3xl font-bold flex items-center gap-1">
                      {itinerary.ecoScore}<span className="text-lg text-orange-200">/10</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onBook(itinerary)}
                    className="bg-white text-orange-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition shadow-lg flex items-center gap-2"
                  >
                    Start Booking <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {itinerary.days.map((day) => (
                <div key={day.day} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                    <h4 className="font-bold text-slate-700">Day {day.day}: <span className="text-orange-600">{day.theme}</span></h4>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {day.activities.map((act, idx) => (
                      <div key={idx} className="p-4 hover:bg-slate-50 transition flex gap-4">
                        <div className="w-20 pt-1 text-sm font-semibold text-slate-500 text-right">{act.time}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h5 className="font-bold text-slate-800">{act.title}</h5>
                            <span className={`text-xs px-2 py-1 rounded-full border ${
                              act.carbonFootprint === 'Low' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              act.carbonFootprint === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                              'bg-red-50 text-red-700 border-red-200'
                            }`}>
                              {act.carbonFootprint}
                            </span>
                          </div>
                          <p className="text-slate-600 text-sm mt-1">{act.description}</p>
                          <div className="flex gap-3 mt-2 text-xs text-slate-400">
                            <span className="capitalize px-2 py-0.5 bg-slate-100 rounded">{act.type}</span>
                            <span>{act.cost}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
