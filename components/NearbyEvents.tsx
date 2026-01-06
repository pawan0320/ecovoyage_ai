
import React, { useState } from 'react';
import { ViewState } from '../types';
import { 
  ArrowLeft, Calendar, MapPin, Search, Filter, 
  Music, Sparkles, Coffee, Heart, Plus, CheckCircle, Navigation 
} from 'lucide-react';

interface Props {
  onNavigate: (view: ViewState) => void;
}

interface Event {
  id: string;
  title: string;
  category: 'CULTURE' | 'MUSIC' | 'FOOD' | 'WORKSHOP';
  date: string;
  time: string;
  location: string;
  distance: string;
  price: string;
  image: string;
  tags: string[];
  attending: number;
}

export const NearbyEvents: React.FC<Props> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [addedEvents, setAddedEvents] = useState<string[]>([]);

  // Mock Data - Simulating a fetch based on user GPS coordinates (e.g. Kyoto)
  const events: Event[] = [
    {
      id: 'e1',
      title: 'Gion Matsuri Night Parade',
      category: 'CULTURE',
      date: 'Tonight',
      time: '19:00',
      location: 'Shijo Street',
      distance: '0.8 km',
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&w=800&q=80',
      tags: ['Festival', 'Crowded', 'Must-See'],
      attending: 1240
    },
    {
      id: 'e2',
      title: 'Jazz at the Old Mill',
      category: 'MUSIC',
      date: 'Sat, Oct 28',
      time: '20:30',
      location: 'Pontocho Alley',
      distance: '1.2 km',
      price: '$15',
      image: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&w=800&q=80',
      tags: ['Live Music', 'Drinks'],
      attending: 45
    },
    {
      id: 'e3',
      title: 'Organic Farmers Market',
      category: 'FOOD',
      date: 'Sun, Oct 29',
      time: '08:00',
      location: 'Umekoji Park',
      distance: '2.5 km',
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80',
      tags: ['Local Produce', 'Family'],
      attending: 320
    },
    {
      id: 'e4',
      title: 'Kintsugi Pottery Workshop',
      category: 'WORKSHOP',
      date: 'Mon, Oct 30',
      time: '14:00',
      location: 'Higashiyama Center',
      distance: '1.5 km',
      price: '$45',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
      tags: ['Art', 'Authentic'],
      attending: 8
    }
  ];

  const filteredEvents = activeCategory === 'ALL' ? events : events.filter(e => e.category === activeCategory);

  const handleAddToItinerary = (id: string) => {
    setAddedEvents([...addedEvents, id]);
    // Logic to persist to itinerary would go here
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => onNavigate(ViewState.TOURIST)} className="p-2 hover:bg-slate-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-slate-900">Events Near You</h1>
              <div className="flex items-center gap-1 text-xs text-teal-600 font-medium">
                <MapPin className="w-3 h-3" /> Kyoto, Japan (Current Location)
              </div>
            </div>
            <button className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
              <Search className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: 'ALL', label: 'All Events' },
              { id: 'CULTURE', label: 'Culture', icon: <Sparkles className="w-3 h-3"/> },
              { id: 'MUSIC', label: 'Music', icon: <Music className="w-3 h-3"/> },
              { id: 'FOOD', label: 'Food', icon: <Coffee className="w-3 h-3"/> },
              { id: 'WORKSHOP', label: 'Workshops', icon: <Calendar className="w-3 h-3"/> },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${
                  activeCategory === cat.id 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 w-full">
        {/* Recommendation Banner */}
        <div className="mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white flex justify-between items-center shadow-lg relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 text-purple-200 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" /> Recommended for you
                </div>
                <h3 className="text-xl font-bold mb-1">Gion Matsuri Festival</h3>
                <p className="text-sm text-purple-100 max-w-sm">
                    Based on your interest in "Heritage", this is a match! Happening tonight just 0.8km away.
                </p>
            </div>
            <div className="relative z-10 hidden sm:block">
                <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-50 transition">
                    View Details
                </button>
            </div>
            {/* Decor */}
            <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform origin-bottom-right"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition group">
              <div className="relative h-48">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-center shadow-sm">
                   <p className="text-xs text-slate-500 uppercase font-bold">{event.date.split(',')[0]}</p>
                   <p className="text-lg font-bold text-slate-900 leading-none">{event.time}</p>
                </div>
                <button className="absolute top-3 right-3 p-2 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition">
                   <Heart className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3 flex gap-2">
                    {event.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm px-2 py-1 rounded-md">{tag}</span>
                    ))}
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-900 leading-tight">{event.title}</h3>
                    <span className={`text-sm font-bold ${event.price === 'Free' ? 'text-green-600' : 'text-slate-900'}`}>
                        {event.price}
                    </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                    <span className="flex items-center gap-1"><Navigation className="w-3 h-3 text-teal-500" /> {event.distance}</span>
                </div>

                <div className="pt-4 border-t border-slate-100 flex gap-3">
                    <button className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition">
                        Details
                    </button>
                    <button 
                        onClick={() => handleAddToItinerary(event.id)}
                        className={`flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition ${
                            addedEvents.includes(event.id) 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                    >
                        {addedEvents.includes(event.id) ? (
                            <><CheckCircle className="w-4 h-4" /> Added</>
                        ) : (
                            <><Plus className="w-4 h-4" /> Add to Plan</>
                        )}
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
