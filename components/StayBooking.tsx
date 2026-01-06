
import React, { useState } from 'react';
import { ViewState, UserTypeFilter, StayOption } from '../types';
import { ALL_STAYS } from '../constants';
import { 
  Search, MapPin, Calendar, Filter, Users, GraduationCap, 
  Briefcase, Crown, Home, CheckCircle, Star, ShieldCheck, 
  ArrowRight, Heart, Loader2, Building, Palmtree, Landmark, School
} from 'lucide-react';

interface Props {
  onNavigate: (view: ViewState) => void;
}

interface RenderCardProps {
  stay: StayOption;
  isBooking: string | null;
  onBook: (stay: StayOption) => void;
}

const RenderCard: React.FC<RenderCardProps> = ({ stay, isBooking, onBook }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition group flex flex-col h-full">
        <div className="relative h-48 shrink-0">
            <img src={stay.image} alt={stay.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            <button className="absolute top-3 right-3 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition">
                <Heart className="w-4 h-4" />
            </button>
            <div className="absolute top-3 left-3 flex flex-col gap-1">
                <span className={`text-[10px] font-bold px-2 py-1 rounded shadow-sm backdrop-blur-md ${
                    stay.type === 'GOV' ? 'bg-green-600 text-white' : 'bg-white/90 text-slate-900'
                }`}>
                    {stay.type === 'GOV' ? 'APTDC / Haritha' : stay.type}
                </span>
                {stay.verified && (
                    <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                )}
            </div>
            <div className="absolute bottom-3 left-3 flex gap-1">
                {stay.suitableFor.includes('STUDENT') && <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded">Student Friendly</span>}
                {stay.suitableFor.includes('FAMILY') && <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded">Family Pick</span>}
            </div>
        </div>
        
        <div className="p-4 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-slate-900 text-lg leading-tight">{stay.name}</h3>
                <div className="flex items-center gap-1 text-xs font-bold bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded shrink-0">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" /> {stay.rating}
                </div>
            </div>
            
            <p className="text-sm text-slate-500 flex items-center gap-1 mb-2">
                <MapPin className="w-3 h-3" /> {stay.location}
            </p>

            {stay.description && (
                <p className="text-xs text-slate-600 mb-3 line-clamp-2 leading-relaxed h-8">
                    {stay.description}
                </p>
            )}

            <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                {stay.amenities.slice(0, 3).map((am, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded">{am}</span>
                ))}
                {stay.amenities.length > 3 && <span className="text-[10px] text-slate-400">+{stay.amenities.length - 3}</span>}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                    <span className="text-lg font-bold text-slate-900">₹{stay.price.toLocaleString()}</span>
                    <span className="text-xs text-slate-500"> / {stay.priceUnit}</span>
                    {stay.deposit && <p className="text-[10px] text-slate-400">Deposit: ₹{stay.deposit}</p>}
                </div>
                <button 
                    onClick={() => onBook(stay)}
                    disabled={!!isBooking}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition flex items-center gap-2"
                >
                    {isBooking === stay.id ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Book'}
                </button>
            </div>
        </div>
    </div>
);

export const StayBooking: React.FC<Props> = ({ onNavigate }) => {
  const [persona, setPersona] = useState<UserTypeFilter>('ALL');
  const [searchLocation, setSearchLocation] = useState('');
  const [isBooking, setIsBooking] = useState<string | null>(null);

  // Unified filtering logic
  const filterStays = (categoryType: string) => {
    return ALL_STAYS.filter(stay => {
      // 1. Basic Category Filter
      let matchCategory = false;
      if (categoryType === 'RESORT' && stay.type === 'RESORT') matchCategory = true;
      if (categoryType === 'VILLA' && stay.type === 'VILLA') matchCategory = true;
      if (categoryType === 'HOTEL' && stay.type === 'HOTEL') matchCategory = true;
      if (categoryType === 'GOV' && stay.type === 'GOV') matchCategory = true;
      if (categoryType === 'PG' && (stay.type === 'PG' || stay.type === 'HOSTEL')) matchCategory = true;

      if (!matchCategory) return false;

      // 2. Persona Filter (The "Smart" Logic)
      if (persona === 'ALL') return true;
      
      // If user is STUDENT, hide Luxury & Expensive Resorts
      if (persona === 'STUDENT' && (categoryType === 'VILLA' || categoryType === 'RESORT')) return false;
      
      // If user is FAMILY, hide PGs
      if (persona === 'FAMILY' && categoryType === 'PG') return false;

      // If stay is tagged for this persona, show it
      return stay.suitableFor.includes(persona);
    });
  };

  const getAIInsight = () => {
    switch (persona) {
      case 'STUDENT': return "Filtering for low deposits, WiFi availability, and monthly pricing near universities.";
      case 'FAMILY': return "Prioritizing entire homes, kid-friendly resorts, and safety ratings.";
      case 'BACHELOR': return "Showing flexible policies, hostels, and social apartments.";
      case 'LUXURY': return "Curating 5-star villas with private pools and concierge services.";
      default: return "Showing a balanced mix of stays across Andhra Pradesh.";
    }
  };

  const handleBook = (stay: StayOption) => {
    setIsBooking(stay.id);
    setTimeout(() => {
      setIsBooking(null);
      alert(`Booking request sent for ${stay.name}! Check your email.`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* 1. Header & Filters */}
      <div className="bg-white sticky top-0 z-30 shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 bg-slate-100 rounded-xl p-1 flex items-center">
                      <MapPin className="w-5 h-5 text-slate-400 ml-3" />
                      <input 
                        type="text" 
                        placeholder="Where do you want to stay?" 
                        className="bg-transparent w-full p-3 outline-none text-sm font-medium"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                      />
                  </div>
                  <div className="flex-1 bg-slate-100 rounded-xl p-1 flex items-center relative group cursor-pointer">
                      <Calendar className="w-5 h-5 text-slate-400 ml-3" />
                      <div className="p-3 text-sm font-medium text-slate-600">Check-in — Check-out</div>
                  </div>
                  <button className="bg-slate-900 text-white p-3.5 rounded-xl hover:bg-slate-800">
                      <Search className="w-5 h-5" />
                  </button>
              </div>

              {/* Persona Selector */}
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Traveling As</p>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                      <button 
                        onClick={() => setPersona('ALL')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${
                            persona === 'ALL' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600'
                        }`}
                      >
                          <Users className="w-4 h-4" /> Everyone
                      </button>
                      <button 
                        onClick={() => setPersona('STUDENT')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${
                            persona === 'STUDENT' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600'
                        }`}
                      >
                          <GraduationCap className="w-4 h-4" /> Student
                      </button>
                      <button 
                        onClick={() => setPersona('FAMILY')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${
                            persona === 'FAMILY' ? 'bg-orange-500 text-white' : 'bg-white border border-slate-200 text-slate-600'
                        }`}
                      >
                          <Home className="w-4 h-4" /> Family
                      </button>
                      <button 
                        onClick={() => setPersona('BACHELOR')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${
                            persona === 'BACHELOR' ? 'bg-blue-500 text-white' : 'bg-white border border-slate-200 text-slate-600'
                        }`}
                      >
                          <Briefcase className="w-4 h-4" /> Bachelor
                      </button>
                      <button 
                        onClick={() => setPersona('LUXURY')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${
                            persona === 'LUXURY' ? 'bg-purple-600 text-white' : 'bg-white border border-slate-200 text-slate-600'
                        }`}
                      >
                          <Crown className="w-4 h-4" /> Luxury
                      </button>
                  </div>
              </div>
          </div>
      </div>

      {/* 2. AI Recommendation Banner */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
          <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              persona === 'STUDENT' ? 'bg-indigo-50 border-indigo-100 text-indigo-800' :
              persona === 'FAMILY' ? 'bg-orange-50 border-orange-100 text-orange-800' :
              persona === 'LUXURY' ? 'bg-purple-50 border-purple-100 text-purple-800' :
              'bg-blue-50 border-blue-100 text-blue-800'
          }`}>
              <div className="p-1.5 bg-white/50 rounded-lg backdrop-blur-sm">
                  <Filter className="w-4 h-4" />
              </div>
              <div>
                  <h4 className="font-bold text-sm mb-0.5">Smart Sort Active</h4>
                  <p className="text-xs opacity-90">{getAIInsight()}</p>
              </div>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-12 pb-12 mt-8">
          
          {/* A) Resorts & Beach Stays */}
          {filterStays('RESORT').length > 0 && (
              <section>
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Palmtree className="w-5 h-5 text-teal-600" /> Resorts & Nature Retreats
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filterStays('RESORT').map(stay => <RenderCard key={stay.id} stay={stay} isBooking={isBooking} onBook={handleBook} />)}
                  </div>
              </section>
          )}

          {/* B) Villas & Luxury Homes */}
          {filterStays('VILLA').length > 0 && (
              <section>
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Crown className="w-5 h-5 text-purple-600" /> Private Villas & Luxury Homes
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filterStays('VILLA').map(stay => <RenderCard key={stay.id} stay={stay} isBooking={isBooking} onBook={handleBook} />)}
                  </div>
              </section>
          )}

          {/* C) Hotels (Premium & Mid-Range) */}
          {filterStays('HOTEL').length > 0 && (
              <section>
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Building className="w-5 h-5 text-blue-600" /> Popular Hotels (Premium & Mid-Range)
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filterStays('HOTEL').map(stay => <RenderCard key={stay.id} stay={stay} isBooking={isBooking} onBook={handleBook} />)}
                  </div>
              </section>
          )}

          {/* D) Government Stays (APTDC / Haritha) */}
          {filterStays('GOV').length > 0 && (
              <section>
                  <div className="flex items-center gap-2 mb-6">
                      <h2 className="text-xl font-bold text-slate-900">Government Stays</h2>
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded border border-green-200">
                          APTDC / Haritha
                      </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filterStays('GOV').map(stay => <RenderCard key={stay.id} stay={stay} isBooking={isBooking} onBook={handleBook} />)}
                  </div>
              </section>
          )}

          {/* E) PGs & Student Stays */}
          {filterStays('PG').length > 0 && (
              <section>
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <School className="w-5 h-5 text-indigo-600" /> Student PGs & Hostels
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filterStays('PG').map(stay => <RenderCard key={stay.id} stay={stay} isBooking={isBooking} onBook={handleBook} />)}
                  </div>
              </section>
          )}

          {/* Fallback if everything is filtered out */}
          {filterStays('RESORT').length === 0 && filterStays('VILLA').length === 0 && filterStays('HOTEL').length === 0 && filterStays('GOV').length === 0 && filterStays('PG').length === 0 && (
              <div className="text-center py-20 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300">
                  <p className="text-slate-500 font-medium">No stays match your current filters.</p>
                  <button onClick={() => setPersona('ALL')} className="mt-4 text-teal-600 font-bold hover:underline">Reset Filters</button>
              </div>
          )}

      </div>
    </div>
  );
};
