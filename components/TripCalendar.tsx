
import React, { useState } from 'react';
import { ViewState } from '../types';
import { ArrowLeft, ChevronLeft, ChevronRight, MapPin, Plane, Hotel, Calendar as CalendarIcon, Clock, Leaf } from 'lucide-react';

interface Props {
  onNavigate: (view: ViewState) => void;
}

interface CalendarEvent {
  id: string;
  date: number; // Day of the month (simplified for demo)
  month: number; // 0-11
  title: string;
  type: 'FLIGHT' | 'HOTEL' | 'ACTIVITY';
  time: string;
  details: string;
  color: string;
}

export const TripCalendar: React.FC<Props> = ({ onNavigate }) => {
  const [currentMonth, setCurrentMonth] = useState(9); // October (0-indexed)
  const [selectedDate, setSelectedDate] = useState<number | null>(15); // Default to start of trip

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Mock Data: Kyoto Trip (Oct 15 - 20)
  const events: CalendarEvent[] = [
    { id: '1', date: 15, month: 9, title: 'Flight to Kyoto', type: 'FLIGHT', time: '08:30 AM', details: 'JAL 772 - Seat 14A', color: 'bg-blue-100 text-blue-700' },
    { id: '2', date: 15, month: 9, title: 'Check-in: Green Leaf Resort', type: 'HOTEL', time: '02:00 PM', details: 'Room 402 (Smart Key Ready)', color: 'bg-teal-100 text-teal-700' },
    { id: '3', date: 16, month: 9, title: 'Bamboo Forest Walk', type: 'ACTIVITY', time: '09:00 AM', details: 'Guided Eco-Tour', color: 'bg-green-100 text-green-700' },
    { id: '4', date: 16, month: 9, title: 'Pottery Workshop', type: 'ACTIVITY', time: '02:00 PM', details: 'With Master Kenji', color: 'bg-orange-100 text-orange-700' },
    { id: '5', date: 17, month: 9, title: 'Day Trip to Nara', type: 'ACTIVITY', time: '10:00 AM', details: 'Train from Kyoto Station', color: 'bg-purple-100 text-purple-700' },
    { id: '6', date: 20, month: 9, title: 'Check-out', type: 'HOTEL', time: '11:00 AM', details: 'Express Checkout enabled', color: 'bg-red-100 text-red-700' },
    { id: '7', date: 20, month: 9, title: 'Return Flight', type: 'FLIGHT', time: '06:45 PM', details: 'JAL 775', color: 'bg-blue-100 text-blue-700' },
  ];

  // Helper to render calendar grid
  const renderCalendarDays = () => {
    const daysInMonth = new Date(2023, currentMonth + 1, 0).getDate();
    const startDay = new Date(2023, currentMonth, 1).getDay(); // 0 = Sun
    
    const days = [];
    // Padding for empty start days
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-slate-50/50 border border-slate-100"></div>);
    }

    // Actual days
    for (let d = 1; d <= daysInMonth; d++) {
      const dayEvents = events.filter(e => e.date === d && e.month === currentMonth);
      // Check if day is part of the "Trip Span" (Oct 15-20)
      const isTripDay = currentMonth === 9 && d >= 15 && d <= 20;
      
      days.push(
        <div 
          key={d} 
          onClick={() => setSelectedDate(d)}
          className={`h-24 border border-slate-100 p-2 cursor-pointer transition-all relative group ${
            selectedDate === d ? 'bg-white ring-2 ring-teal-500 z-10 shadow-lg' : 'bg-white hover:bg-slate-50'
          } ${isTripDay ? 'bg-teal-50/30' : ''}`}
        >
          <span className={`text-sm font-bold ${
            selectedDate === d ? 'text-teal-600' : 'text-slate-500'
          } ${isTripDay ? 'text-teal-700' : ''}`}>{d}</span>
          
          {/* Trip Span Bar */}
          {isTripDay && (
             <div className="absolute top-8 left-0 right-0 h-1.5 bg-teal-200"></div>
          )}

          {/* Dots for events */}
          <div className="flex gap-1 mt-2 flex-wrap">
            {dayEvents.map(ev => (
              <div key={ev.id} className={`w-2 h-2 rounded-full ${
                ev.type === 'FLIGHT' ? 'bg-blue-400' : 
                ev.type === 'HOTEL' ? 'bg-teal-400' : 'bg-orange-400'
              }`}></div>
            ))}
          </div>
        </div>
      );
    }
    return days;
  };

  const selectedDayEvents = events.filter(e => e.date === selectedDate && e.month === currentMonth);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Main Calendar View */}
      <div className="flex-1 p-6 overflow-y-auto">
         <div className="flex items-center gap-4 mb-8">
             <button onClick={() => onNavigate(ViewState.TOURIST)} className="p-2 bg-white rounded-full hover:bg-slate-100 border border-slate-200 shadow-sm">
                 <ArrowLeft className="w-5 h-5 text-slate-600" />
             </button>
             <h1 className="text-2xl font-bold text-slate-900">Your Journey</h1>
         </div>

         {/* Calendar Header */}
         <div className="bg-white rounded-t-2xl border border-slate-200 p-4 flex justify-between items-center shadow-sm">
             <div className="flex items-center gap-4">
                 <h2 className="text-xl font-bold text-slate-800">{months[currentMonth]} 2023</h2>
                 <div className="flex gap-1">
                     <button onClick={() => setCurrentMonth(m => Math.max(0, m - 1))} className="p-1 hover:bg-slate-100 rounded"><ChevronLeft className="w-5 h-5 text-slate-500" /></button>
                     <button onClick={() => setCurrentMonth(m => Math.min(11, m + 1))} className="p-1 hover:bg-slate-100 rounded"><ChevronRight className="w-5 h-5 text-slate-500" /></button>
                 </div>
             </div>
             <div className="flex gap-4 text-xs font-medium text-slate-500">
                 <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-teal-400"></div> Trip</div>
                 <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-400"></div> Travel</div>
                 <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-400"></div> Activity</div>
             </div>
         </div>

         {/* Calendar Grid */}
         <div className="bg-white rounded-b-2xl border-x border-b border-slate-200 shadow-sm overflow-hidden">
             {/* Weekday Headers */}
             <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50">
                 {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                     <div key={day} className="py-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">{day}</div>
                 ))}
             </div>
             {/* Days */}
             <div className="grid grid-cols-7">
                 {renderCalendarDays()}
             </div>
         </div>
         
         {/* Eco Tip */}
         <div className="mt-6 bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-start gap-3">
             <div className="p-2 bg-white rounded-full text-emerald-600 shadow-sm">
                 <Leaf className="w-5 h-5" />
             </div>
             <div>
                 <h4 className="font-bold text-emerald-800 text-sm">Carbon Footprint Analysis</h4>
                 <p className="text-xs text-emerald-700 mt-1">
                     Your trip to Kyoto spans 5 days. By using trains instead of domestic flights, you've kept your carbon impact low for Oct 17.
                 </p>
             </div>
         </div>
      </div>

      {/* Agenda Sidebar */}
      <div className="w-full md:w-96 bg-white border-l border-slate-200 p-6 shadow-xl flex flex-col h-screen overflow-y-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-1">
              {months[currentMonth]} {selectedDate}
          </h3>
          <p className="text-sm text-slate-500 mb-6">Daily Agenda</p>

          {selectedDayEvents.length > 0 ? (
              <div className="space-y-4">
                  {selectedDayEvents.map(event => (
                      <div key={event.id} className="relative pl-6 pb-6 border-l-2 border-slate-100 last:border-0 last:pb-0">
                          <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                              event.type === 'FLIGHT' ? 'bg-blue-500' : 
                              event.type === 'HOTEL' ? 'bg-teal-500' : 'bg-orange-500'
                          }`}></div>
                          
                          <div className={`p-4 rounded-xl border border-slate-100 shadow-sm ${event.type === 'HOTEL' ? 'bg-teal-50/50' : 'bg-white'}`}>
                              <div className="flex justify-between items-start mb-2">
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${event.color}`}>
                                      {event.type}
                                  </span>
                                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                      <Clock className="w-3 h-3" /> {event.time}
                                  </span>
                              </div>
                              <h4 className="font-bold text-slate-800 text-sm mb-1">{event.title}</h4>
                              <p className="text-xs text-slate-500">{event.details}</p>
                              
                              {event.type === 'FLIGHT' && (
                                  <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
                                      <button className="flex-1 py-1.5 bg-slate-900 text-white text-xs font-bold rounded hover:bg-slate-800">
                                          Boarding Pass
                                      </button>
                                  </div>
                              )}
                              {event.type === 'HOTEL' && (
                                  <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
                                      <button 
                                        onClick={() => onNavigate(ViewState.SMART_ROOM)}
                                        className="flex-1 py-1.5 bg-teal-600 text-white text-xs font-bold rounded hover:bg-teal-700 flex items-center justify-center gap-1"
                                      >
                                          Room Controls
                                      </button>
                                  </div>
                              )}
                          </div>
                      </div>
                  ))}
              </div>
          ) : (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50">
                  <CalendarIcon className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-sm font-medium">No plans for this day.</p>
                  <button onClick={() => onNavigate(ViewState.SEARCH)} className="mt-2 text-xs text-teal-600 font-bold hover:underline">
                      + Add Activity
                  </button>
              </div>
          )}
      </div>
    </div>
  );
};
