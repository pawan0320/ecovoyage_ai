
import React, { useState } from 'react';
import { ViewState } from '../types';
import { ArrowLeft, Calendar, MapPin, Leaf, Sparkles, Share2, Camera, Loader2, Edit3, BookOpen } from 'lucide-react';
import { generateTripMemory } from '../services/geminiService';

interface Props {
  onNavigate: (view: ViewState) => void;
}

interface Memory {
  id: number;
  destination: string;
  date: string;
  image: string;
  stats: { co2: string; plastic: string; local: string };
  activities: string[];
  notes: string;
  aiGenerated: boolean;
}

export const TravelDiary: React.FC<Props> = ({ onNavigate }) => {
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Mock Past Trips Data
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: 1,
      destination: "Kyoto, Japan",
      date: "Oct 15 - Oct 20, 2023",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      stats: { co2: "145kg Saved", plastic: "0 Bottles", local: "$320 Support" },
      activities: ["Pottery Workshop", "Bamboo Forest Walk", "Vegan Kaiseki"],
      notes: "",
      aiGenerated: false
    },
    {
      id: 2,
      destination: "Reykjavik, Iceland",
      date: "Aug 02 - Aug 10, 2023",
      image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=800&q=80",
      stats: { co2: "80kg Saved", plastic: "12 Bottles", local: "$550 Support" },
      activities: ["Glacier Hike", "Geothermal Spa", "Northern Lights Tour"],
      notes: "The air was so crisp. I've never seen greens like that before.",
      aiGenerated: false
    }
  ]);

  const activeTrip = memories.find(m => m.id === selectedMemory) || memories[0];

  const handleAiWrite = async () => {
    if (!activeTrip) return;
    setIsGenerating(true);
    
    const story = await generateTripMemory(
      activeTrip.destination,
      activeTrip.activities,
      "Reflective and Grateful"
    );

    setMemories(prev => prev.map(m => 
      m.id === activeTrip.id ? { ...m, notes: story, aiGenerated: true } : m
    ));
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Left Sidebar: Timeline */}
      <div className="w-full md:w-80 bg-white border-r border-slate-200 flex flex-col h-screen overflow-y-auto">
        <div className="p-6 border-b border-slate-100">
           <button onClick={() => onNavigate(ViewState.TOURIST)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-4 text-sm font-medium">
               <ArrowLeft className="w-4 h-4" /> Back to Dashboard
           </button>
           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
               <BookOpen className="w-6 h-6 text-teal-600" /> Travel Diary
           </h1>
           <p className="text-xs text-slate-500 mt-1">Your journey, immortalized.</p>
        </div>
        
        <div className="flex-1 p-4 space-y-3">
            {memories.map(memory => (
                <div 
                    key={memory.id}
                    onClick={() => setSelectedMemory(memory.id)}
                    className={`p-3 rounded-xl cursor-pointer transition-all border ${
                        activeTrip.id === memory.id 
                        ? 'bg-teal-50 border-teal-200 shadow-sm' 
                        : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200'
                    }`}
                >
                    <div className="flex gap-3">
                        <img src={memory.image} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                            <h4 className={`font-bold text-sm ${activeTrip.id === memory.id ? 'text-teal-900' : 'text-slate-700'}`}>{memory.destination}</h4>
                            <p className="text-xs text-slate-500">{memory.date.split(' - ')[0]}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Main Content: The Entry */}
      <div className="flex-1 overflow-y-auto relative">
          {/* Hero Image */}
          <div className="relative h-64 w-full">
              <img src={activeTrip.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                  <div className="flex items-center gap-2 text-teal-300 font-bold text-xs uppercase tracking-wider mb-2">
                      <Calendar className="w-4 h-4" /> {activeTrip.date}
                  </div>
                  <h2 className="text-4xl font-bold">{activeTrip.destination}</h2>
              </div>
              <button className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition">
                  <Share2 className="w-5 h-5" />
              </button>
          </div>

          <div className="max-w-4xl mx-auto p-8 -mt-8 relative z-10">
              
              {/* Eco Receipt */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-100 flex flex-wrap gap-6 justify-between items-center">
                  <div className="text-center flex-1 min-w-[100px]">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mx-auto mb-2">
                          <Leaf className="w-5 h-5" />
                      </div>
                      <div className="font-bold text-slate-800">{activeTrip.stats.co2}</div>
                      <div className="text-xs text-slate-500">Carbon Offset</div>
                  </div>
                  <div className="w-px h-10 bg-slate-100 hidden md:block"></div>
                  <div className="text-center flex-1 min-w-[100px]">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-2">
                          <Leaf className="w-5 h-5" />
                      </div>
                      <div className="font-bold text-slate-800">{activeTrip.stats.plastic}</div>
                      <div className="text-xs text-slate-500">Plastic Avoided</div>
                  </div>
                  <div className="w-px h-10 bg-slate-100 hidden md:block"></div>
                  <div className="text-center flex-1 min-w-[100px]">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mx-auto mb-2">
                          <Leaf className="w-5 h-5" />
                      </div>
                      <div className="font-bold text-slate-800">{activeTrip.stats.local}</div>
                      <div className="text-xs text-slate-500">Local Economy</div>
                  </div>
              </div>

              {/* Journal Entry */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 min-h-[400px] relative">
                  <div className="flex justify-between items-start mb-6">
                      <h3 className="text-xl font-serif font-bold text-slate-800 flex items-center gap-2">
                          <Edit3 className="w-5 h-5 text-slate-400" /> Trip Journal
                      </h3>
                      {!activeTrip.notes && !isGenerating && (
                          <button 
                            onClick={handleAiWrite}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20"
                          >
                              <Sparkles className="w-4 h-4" /> AI Auto-Write
                          </button>
                      )}
                  </div>

                  <div className="font-serif text-lg leading-relaxed text-slate-700 whitespace-pre-wrap">
                      {isGenerating ? (
                          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                              <Loader2 className="w-8 h-8 animate-spin mb-3 text-indigo-500" />
                              <p className="text-sm">Weaving your memories together...</p>
                          </div>
                      ) : activeTrip.notes ? (
                          <>
                            {activeTrip.notes}
                            {activeTrip.aiGenerated && (
                                <div className="mt-4 text-xs text-indigo-400 flex items-center gap-1 font-sans">
                                    <Sparkles className="w-3 h-3" /> Written by EcoVoyage AI
                                </div>
                            )}
                          </>
                      ) : (
                          <div className="text-slate-400 italic text-center py-12">
                              No journal entry yet. Click "AI Auto-Write" to generate a story based on your activities!
                          </div>
                      )}
                  </div>

                  {/* Photo Grid Placeholder */}
                  <div className="mt-8 pt-8 border-t border-slate-100">
                      <h4 className="font-sans font-bold text-sm text-slate-500 uppercase mb-4 flex items-center gap-2">
                          <Camera className="w-4 h-4" /> Gallery
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                          <div className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 hover:border-slate-300 cursor-pointer transition">
                              <Camera className="w-6 h-6" />
                          </div>
                          {/* Placeholder images would go here */}
                      </div>
                  </div>
              </div>

          </div>
      </div>
    </div>
  );
};
