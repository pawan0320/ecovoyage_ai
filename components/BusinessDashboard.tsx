
import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { REVENUE_DATA } from '../constants';
import { TrendingUp, Users, DollarSign, Activity, MessageSquare, ThumbsUp, ThumbsDown, Edit, Home, Plus, Loader2, Sparkles } from 'lucide-react';
import { analyzeBusinessReviews, SentimentAnalysisResult } from '../services/geminiService';

const MOCK_REVIEWS = [
  "The room was spotless and the solar amenities were cool, but check-in took 45 minutes.",
  "Love the eco-friendly vibe! The food was amazing, especially the vegan options.",
  "Staff was friendly but the room service was slow.",
  "Great location, very quiet. The bed was super comfortable.",
  "Check-in was a nightmare, waited too long.",
  "Beautiful architecture, very sustainable. Will come again."
];

export const BusinessDashboard: React.FC = () => {
  const [liveVisitors, setLiveVisitors] = useState(324);
  const [activeBookings, setActiveBookings] = useState(1245);
  
  // AI Sentiment State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sentimentData, setSentimentData] = useState<SentimentAnalysisResult | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors(prev => prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAnalyzeSentiment = async () => {
    setIsAnalyzing(true);
    const result = await analyzeBusinessReviews(MOCK_REVIEWS);
    setSentimentData(result);
    setIsAnalyzing(false);
  };

  const listings = [
    { id: 1, name: "Sunset Ocean Villa", type: "Stay", price: 450, status: "Active", occupancy: "92%" },
    { id: 2, name: "Jungle Trek Experience", type: "Experience", price: 85, status: "Active", occupancy: "64%" },
    { id: 3, name: "Eco-Pod Glamping", type: "Stay", price: 120, status: "Maintenance", occupancy: "0%" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 pb-20">
       <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Business Analytics</h2>
          <p className="text-slate-500">Real-time insights for <span className="font-semibold text-slate-900">Green Leaf Resorts</span>.</p>
        </div>
        <div className="flex gap-3">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-2 animate-pulse">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Live Data
            </span>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition shadow-lg">
                Export Report
            </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2">
                <p className="text-slate-500 text-sm">Total Revenue</p>
                <div className="p-2 bg-emerald-100 rounded-lg"><DollarSign className="w-4 h-4 text-emerald-600" /></div>
            </div>
            <p className="text-2xl font-bold text-slate-900">$128,430</p>
            <p className="text-emerald-600 text-xs mt-1 font-medium">↑ 12.5% vs last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2">
                <p className="text-slate-500 text-sm">Active Bookings</p>
                <div className="p-2 bg-blue-100 rounded-lg"><TrendingUp className="w-4 h-4 text-blue-600" /></div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{activeBookings.toLocaleString()}</p>
            <p className="text-emerald-600 text-xs mt-1 font-medium">↑ 8.2% vs last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <div className="flex items-center justify-between mb-2">
                <p className="text-slate-500 text-sm">Net Sentiment</p>
                <div className="p-2 bg-purple-100 rounded-lg"><Activity className="w-4 h-4 text-purple-600" /></div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{sentimentData ? `${sentimentData.sentimentScore}%` : '--'}</p>
            <p className="text-slate-500 text-xs mt-1">Based on recent reviews</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2">
                <p className="text-slate-500 text-sm">Live Footfall</p>
                <div className="p-2 bg-orange-100 rounded-lg"><Users className="w-4 h-4 text-orange-600" /></div>
            </div>
            <p className="text-2xl font-bold text-slate-900 transition-all">{liveVisitors}</p>
            <p className="text-red-500 text-xs mt-1 font-medium">↓ 2.1% vs yesterday</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue Trend</h3>
          {/* Added explicit style with min-height to prevent width(-1) error */}
          <div className="w-full h-72 min-h-[288px]" style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Analysis (Live AI Feature) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-indigo-500" /> Review AI
              </h3>
              {!sentimentData && !isAnalyzing && (
                <button 
                  onClick={handleAnalyzeSentiment}
                  className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full font-bold hover:bg-indigo-100 transition flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Analyze
                </button>
              )}
            </div>
            
            {isAnalyzing && (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                 <Loader2 className="w-8 h-8 animate-spin mb-2 text-indigo-500" />
                 <p className="text-sm">Processing 150+ reviews...</p>
              </div>
            )}

            {!isAnalyzing && !sentimentData && (
               <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center p-4">
                  <p className="text-sm">Click "Analyze" to generate insights from customer feedback using AI.</p>
               </div>
            )}

            {sentimentData && (
              <div className="flex-1 space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-emerald-50 rounded-xl text-center">
                        <ThumbsUp className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                        <span className="block text-xl font-bold text-emerald-700">{sentimentData.positiveCount}</span>
                        <span className="text-xs text-emerald-600">Positive</span>
                    </div>
                    <div className="p-3 bg-red-50 rounded-xl text-center">
                        <ThumbsDown className="w-5 h-5 text-red-500 mx-auto mb-1" />
                        <span className="block text-xl font-bold text-red-700">{sentimentData.negativeCount}</span>
                        <span className="text-xs text-red-600">Negative</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-500 uppercase">Key Themes</p>
                    {sentimentData.keyThemes.slice(0, 3).map((theme, i) => (
                      <div key={i} className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded-lg">
                        <span className="font-medium text-slate-700">{theme.topic}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${theme.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {theme.sentiment === 'positive' ? '+' : '-'}{theme.count} mentions
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl">
                      <div className="flex gap-2 mb-1">
                          <Activity className="w-4 h-4 text-indigo-600" />
                          <span className="text-xs font-bold text-indigo-800 uppercase">Strategic Insight</span>
                      </div>
                      <p className="text-xs text-indigo-700 leading-relaxed">
                          {sentimentData.strategicRecommendation}
                      </p>
                  </div>
              </div>
            )}
        </div>
      </div>

      {/* Listing Management */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Home className="w-5 h-5 text-slate-600" /> Your Listings
            </h3>
            <button className="text-sm text-teal-600 font-bold hover:underline flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add New
            </button>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Property</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Type</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Occupancy</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {listings.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50 transition">
                            <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                            <td className="px-6 py-4 text-sm text-slate-500">{item.type}</td>
                            <td className="px-6 py-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-teal-500 h-full" style={{ width: item.occupancy }}></div>
                                    </div>
                                    <span className="text-slate-700 font-medium">{item.occupancy}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${
                                    item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>{item.status}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="p-2 hover:bg-slate-200 rounded-full transition text-slate-500 hover:text-slate-900">
                                    <Edit className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};
