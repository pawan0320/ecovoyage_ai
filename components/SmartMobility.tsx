
import React, { useState } from 'react';
import { ViewState } from '../types';
import { 
  ArrowLeft, BatteryCharging, MapPin, Navigation, 
  Zap, Smartphone, Lock, Unlock, Leaf, Bike, Car, CloudLightning, Info, Clock
} from 'lucide-react';

interface Props {
  onNavigate: (view: ViewState) => void;
}

export const SmartMobility: React.FC<Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'BIKES' | 'CARS'>('BIKES');
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const [unlocking, setUnlocking] = useState(false);
  const [rentalDuration, setRentalDuration] = useState(1); // Hours
  const [routeInfo, setRouteInfo] = useState<{fast: string, eco: string} | null>(null);

  const vehicles = [
    { id: 1, type: 'BIKE', name: 'EcoRide X1', range: '45km', battery: 85, location: '2 min walk', price: '$0.15/min', lat: 30, lng: 40 },
    { id: 2, type: 'BIKE', name: 'EcoRide X1', range: '32km', battery: 60, location: '5 min walk', price: '$0.15/min', lat: 60, lng: 70 },
    { id: 3, type: 'CAR', name: 'Tesla Model 3', range: '320km', battery: 90, location: 'Parking A', price: '$12/hr', lat: 45, lng: 20 },
    { id: 4, type: 'CAR', name: 'Nissan Leaf', range: '150km', battery: 75, location: 'Parking B', price: '$10/hr', lat: 20, lng: 80 },
  ].filter(v => (activeTab === 'BIKES' ? v.type === 'BIKE' : v.type === 'CAR'));

  const handleUnlock = () => {
    setUnlocking(true);
    setTimeout(() => {
      setUnlocking(false);
      alert(`Vehicle Unlocked! You have booked for ${rentalDuration} hour(s). Ride safely.`);
      setSelectedVehicle(null);
    }, 2000);
  };

  const handleRoutePlan = () => {
    setRouteInfo({
      fast: "15 mins (2.4kg CO2)",
      eco: "18 mins (0.8kg CO2)"
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm z-10">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <button onClick={() => onNavigate(ViewState.TOURIST)} className="p-2 hover:bg-slate-100 rounded-full">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
                <div>
                    <h1 className="font-bold text-slate-800">Smart Mobility</h1>
                    <div className="flex items-center gap-1 text-xs text-teal-600 font-medium">
                        <MapPin className="w-3 h-3" /> Current Location: Kyoto Center
                    </div>
                </div>
            </div>
            <div className="w-9"></div>
        </div>

        {/* AI Recommendation Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-3">
            <div className="p-2 bg-white rounded-full text-blue-500 shadow-sm">
                <CloudLightning className="w-4 h-4" />
            </div>
            <div>
                <h4 className="text-xs font-bold text-blue-800 uppercase mb-0.5">AI Recommendation</h4>
                <p className="text-xs text-blue-700 leading-tight">
                    Traffic is heavy near Gion District. <strong>E-Bikes</strong> are 15 mins faster than Cars right now.
                </p>
            </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-slate-200">
         <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover opacity-10"></div>
         
         {/* Mock Pins */}
         {vehicles.map(v => (
             <button
                key={v.id}
                onClick={() => setSelectedVehicle(v.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 ${
                    selectedVehicle === v.id ? 'z-20 scale-125' : 'z-10'
                }`}
                style={{ top: `${v.lat}%`, left: `${v.lng}%` }}
             >
                 <div className={`p-3 rounded-full shadow-lg border-2 border-white ${
                     v.battery > 50 ? 'bg-teal-500' : 'bg-orange-500'
                 }`}>
                     {v.type === 'BIKE' ? <Bike className="w-6 h-6 text-white" /> : <Car className="w-6 h-6 text-white" />}
                 </div>
                 {selectedVehicle === v.id && (
                     <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-teal-500 rotate-45"></div>
                 )}
             </button>
         ))}

         {/* Filter Tabs */}
         <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg p-1 flex gap-1">
             <button 
                onClick={() => setActiveTab('BIKES')}
                className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition ${
                    activeTab === 'BIKES' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
             >
                 <Bike className="w-4 h-4" /> E-Bikes
             </button>
             <button 
                onClick={() => setActiveTab('CARS')}
                className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition ${
                    activeTab === 'CARS' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
             >
                 <Car className="w-4 h-4" /> EVs
             </button>
         </div>

         {/* Route Planner Overlay (Corner) */}
         <div className="absolute top-4 right-4 bg-white p-4 rounded-xl shadow-lg w-64 hidden md:block">
             <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Eco-Route Planner</h3>
             <div className="space-y-2">
                 <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                     <input type="text" placeholder="Current Location" className="bg-transparent text-sm w-full outline-none" disabled />
                 </div>
                 <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                     <MapPin className="w-3 h-3 text-red-500" />
                     <input type="text" placeholder="Where to?" className="bg-transparent text-sm w-full outline-none" />
                 </div>
                 <button onClick={handleRoutePlan} className="w-full bg-teal-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-teal-700">
                     Find Greenest Route
                 </button>
                 {routeInfo && (
                     <div className="mt-2 space-y-1">
                         <div className="flex justify-between text-xs p-2 bg-green-50 text-green-700 rounded border border-green-200">
                             <span className="font-bold flex items-center gap-1"><Leaf className="w-3 h-3" /> Eco</span>
                             <span>{routeInfo.eco}</span>
                         </div>
                         <div className="flex justify-between text-xs p-2 bg-slate-50 text-slate-500 rounded">
                             <span className="font-bold flex items-center gap-1"><Zap className="w-3 h-3" /> Fast</span>
                             <span>{routeInfo.fast}</span>
                         </div>
                     </div>
                 )}
             </div>
         </div>
      </div>

      {/* Vehicle Detail Sheet */}
      {selectedVehicle && (() => {
          const v = vehicles.find(veh => veh.id === selectedVehicle);
          if (!v) return null;
          return (
              <div className="bg-white border-t border-slate-200 p-6 animate-fade-in-up z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
                  <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-start justify-between gap-6">
                      <div className="flex items-center gap-4 flex-1">
                          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                              {v.type === 'BIKE' ? <Bike className="w-8 h-8 text-slate-700" /> : <Car className="w-8 h-8 text-slate-700" />}
                          </div>
                          <div>
                              <h2 className="text-xl font-bold text-slate-900">{v.name}</h2>
                              <div className="flex items-center gap-3 text-sm text-slate-500 mb-2">
                                  <span className="flex items-center gap-1"><BatteryCharging className="w-4 h-4 text-green-500" /> {v.battery}%</span>
                                  <span>•</span>
                                  <span>{v.range} range</span>
                              </div>
                              <span className="text-slate-800 text-xs bg-slate-100 px-2 py-1 rounded flex items-center gap-1 w-fit">
                                  <MapPin className="w-3 h-3" /> {v.location}
                              </span>
                          </div>
                      </div>

                      <div className="flex flex-col gap-4 w-full md:w-auto">
                           <div className="flex items-center justify-between md:justify-end gap-6">
                               <div className="text-right">
                                   <div className="text-2xl font-bold text-slate-900">{v.price}</div>
                                   <div className="text-xs text-slate-500">Inc. Insurance</div>
                               </div>
                               
                               {/* Duration Selector */}
                               <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1 border border-slate-200">
                                   <button 
                                     onClick={() => setRentalDuration(Math.max(1, rentalDuration - 1))}
                                     className="w-8 h-8 flex items-center justify-center hover:bg-white rounded font-bold text-slate-600"
                                   >-</button>
                                   <span className="text-sm font-bold w-12 text-center">{rentalDuration}h</span>
                                   <button 
                                     onClick={() => setRentalDuration(rentalDuration + 1)}
                                     className="w-8 h-8 flex items-center justify-center hover:bg-white rounded font-bold text-slate-600"
                                   >+</button>
                               </div>
                           </div>

                           <button 
                             onClick={handleUnlock}
                             disabled={unlocking}
                             className="w-full md:w-auto bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2 disabled:opacity-70"
                           >
                               {unlocking ? (
                                   <>Connecting <Navigation className="w-4 h-4 animate-spin" /></>
                               ) : (
                                   <>{activeTab === 'BIKES' ? 'Scan to Unlock' : 'Start Rental'} <Unlock className="w-4 h-4" /></>
                               )}
                           </button>
                      </div>
                  </div>
              </div>
          );
      })()}
    </div>
  );
};
