
import React, { useState } from 'react';
import { Itinerary, ViewState, LineItem } from '../types';
import { 
  Train, Plane, TreePine, CheckCircle, 
  ArrowRight, ArrowLeft, Leaf, Scan, Shield, 
  Eye, Loader2, Sparkles, MapPin, Utensils
} from 'lucide-react';
import { SmartPaymentGateway } from './SmartPaymentGateway';

interface Props {
  itinerary: Itinerary | null;
  onComplete: () => void;
  onCancel: () => void;
}

type Step = 'TRANSPORT' | 'STAY' | 'EXTRAS' | 'PAY' | 'CONFIRMED';
type Currency = 'USD' | 'EUR' | 'JPY' | 'ETH';

export const BookingFlow: React.FC<Props> = ({ itinerary, onComplete, onCancel }) => {
  const [step, setStep] = useState<Step>('TRANSPORT');
  const [transport, setTransport] = useState<'train' | 'flight' | null>(null);
  const [hotel, setHotel] = useState<'eco' | 'standard' | null>(null);
  const [offsetCarbon, setOffsetCarbon] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [mealPlan, setMealPlan] = useState<'standard' | 'vegan' | 'none'>('none');
  const [showAR, setShowAR] = useState(false);
  const [currency, setCurrency] = useState<Currency>('USD');

  // Mock data if no itinerary passed (for testing)
  const dest = itinerary?.destination || "Kyoto, Japan";
  const duration = itinerary?.duration || 5;
  const basePrice = 850; // Mock base price

  const transportOptions = [
    {
      id: 'train',
      icon: <Train className="w-6 h-6" />,
      title: 'High-Speed Rail',
      duration: '4h 20m',
      co2: '12kg',
      price: 120,
      ecoTag: 'Best Choice',
      color: 'bg-emerald-50 border-emerald-500 text-emerald-700'
    },
    {
      id: 'flight',
      icon: <Plane className="w-6 h-6" />,
      title: 'Direct Flight',
      duration: '1h 15m',
      co2: '145kg',
      price: 180,
      ecoTag: 'High Impact',
      color: 'bg-white border-slate-200 text-slate-700'
    }
  ];

  const hotelOptions = [
    {
      id: 'eco',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Green Leaf Resort',
      rating: '4.9',
      features: ['Solar Power', 'Zero Waste', 'Farm-to-Table'],
      price: 220,
      badge: 'Certified Sustainable'
    },
    {
      id: 'standard',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Grand City Hotel',
      rating: '4.5',
      features: ['Pool', 'Gym', 'City View'],
      price: 180,
      badge: null
    }
  ];

  const generateLineItems = (): LineItem[] => {
    const items: LineItem[] = [];
    
    // Transport
    if (transport === 'train') items.push({ id: 't1', name: 'High-Speed Rail', category: 'Transport', price: 120, meta: 'Return Ticket' });
    else if (transport === 'flight') items.push({ id: 't2', name: 'Direct Flight', category: 'Transport', price: 180, meta: 'Economy Class' });
    
    // Stay
    const nights = duration;
    if (hotel === 'eco') items.push({ id: 'h1', name: 'Green Leaf Resort', category: 'Stay', price: 220 * nights, meta: `${nights} Nights` });
    else if (hotel === 'standard') items.push({ id: 'h2', name: 'Grand City Hotel', category: 'Stay', price: 180 * nights, meta: `${nights} Nights` });
    
    // Extras
    if (offsetCarbon) items.push({ id: 'e1', name: 'Carbon Offset', category: 'Experience', price: 15 });
    if (insurance) items.push({ id: 'e2', name: 'Travel Insurance', category: 'Fee', price: 45 });
    if (mealPlan !== 'none') {
        const mealPrice = (mealPlan === 'vegan' ? 35 : 40) * nights;
        items.push({ id: 'e3', name: `${mealPlan === 'vegan' ? 'Vegan' : 'Standard'} Meal Plan`, category: 'Food', price: mealPrice, meta: `${nights} Days` });
    }

    return items;
  };

  const calculateEcoScore = () => {
    let score = 50;
    if (transport === 'train') score += 30;
    if (hotel === 'eco') score += 20;
    if (offsetCarbon) score += 10;
    if (mealPlan === 'vegan') score += 5;
    return Math.min(score, 100); 
  };

  const handlePaymentSuccess = (transactionId: string) => {
    // Feature: Persistence - Save trip to localStorage
    const newTrip = {
      id: Date.now(),
      destination: dest,
      date: new Date().toLocaleDateString(),
      duration: duration,
      totalCost: generateLineItems().reduce((s, i) => s + i.price, 0),
      ecoScore: calculateEcoScore(),
      carbonSaved: transport === 'train' ? 133 : 0,
      status: 'Upcoming',
      transactionId
    };

    const existingTrips = JSON.parse(localStorage.getItem('myTrips') || '[]');
    localStorage.setItem('myTrips', JSON.stringify([newTrip, ...existingTrips]));
    
    setStep('CONFIRMED');
  };

  // AR Preview Modal
  const renderARPreview = () => (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-lg aspect-[9/16] bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
        <img 
          src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="AR View"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Scan className="w-16 h-16 text-white/50 animate-pulse mb-4" />
          <p className="text-white font-mono text-sm bg-black/50 px-3 py-1 rounded">AR MODE ACTIVE</p>
        </div>
        
        {/* AR Overlay Info */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg w-64 animate-bounce-slow">
            <h4 className="font-bold text-slate-900 text-sm">Superior Eco Suite</h4>
            <p className="text-xs text-slate-600 mt-1">100% Bamboo Linens • Natural Light</p>
            <div className="flex gap-2 mt-2">
                <span className="text-[10px] bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-bold">$220/night</span>
            </div>
        </div>

        <button 
          onClick={() => setShowAR(false)}
          className="absolute bottom-8 bg-white text-slate-900 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-slate-100 transition"
        >
          Close AR View
        </button>
      </div>
    </div>
  );

  const renderTransport = () => (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">How will you get there?</h2>
        <p className="text-slate-500">Choose a lower carbon option to earn bonus points.</p>
      </div>
      
      <div className="grid gap-4">
        {transportOptions.map((opt) => (
          <div 
            key={opt.id}
            onClick={() => setTransport(opt.id as any)}
            className={`cursor-pointer p-6 rounded-xl border-2 transition-all flex justify-between items-center ${
              transport === opt.id 
                ? opt.color 
                : 'bg-white border-slate-100 hover:border-slate-300'
            }`}
          >
             <div className="flex items-center gap-4">
               <div className={`p-3 rounded-full ${transport === opt.id ? 'bg-white/50' : 'bg-slate-100'}`}>
                 {opt.icon}
               </div>
               <div>
                 <div className="flex items-center gap-2">
                   <h3 className="font-bold text-lg">{opt.title}</h3>
                   {opt.id === 'train' && (
                     <span className="text-[10px] uppercase font-bold bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full">
                       Recommended
                     </span>
                   )}
                 </div>
                 <p className="text-sm opacity-80">{opt.duration} • <span className={opt.id === 'train' ? 'text-emerald-700 font-bold' : ''}>{opt.co2} CO2</span></p>
               </div>
             </div>
             <div className="text-right">
               <div className="font-bold text-xl">${opt.price}</div>
             </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <button 
          onClick={() => setStep('STAY')}
          disabled={!transport}
          className="bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Next: Accommodation <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderStay = () => (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-6">
         <div>
            <h2 className="text-2xl font-bold text-slate-800">Where will you stay?</h2>
            <p className="text-slate-500">We found these options matching your eco-preferences.</p>
         </div>
         <div className="flex gap-2">
            <button className="text-sm font-medium text-teal-600 flex items-center gap-1 hover:underline">
               <MapPin className="w-4 h-4" /> View Map
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {hotelOptions.map((opt) => (
           <div 
             key={opt.id}
             onClick={() => setHotel(opt.id as any)}
             className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all group ${
               hotel === opt.id ? 'border-teal-500 shadow-lg' : 'border-transparent shadow-md hover:shadow-xl'
             }`}
           >
             <div className="relative h-48">
               <img src={opt.image} alt={opt.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
               {opt.badge && (
                 <div className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                   <Shield className="w-3 h-3" /> {opt.badge}
                 </div>
               )}
               <button 
                 onClick={(e) => { e.stopPropagation(); setShowAR(true); }}
                 className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md text-white border border-white/50 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/30 transition"
               >
                 <Eye className="w-4 h-4" /> AR Preview
               </button>
             </div>
             <div className="p-5 bg-white">
               <div className="flex justify-between items-start mb-2">
                 <h3 className="font-bold text-lg text-slate-800">{opt.title}</h3>
                 <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                   ★ {opt.rating}
                 </div>
               </div>
               <div className="flex flex-wrap gap-2 mb-4">
                 {opt.features.map(f => (
                   <span key={f} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{f}</span>
                 ))}
               </div>
               <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                 <div className="text-sm text-slate-500">per night</div>
                 <div className="text-xl font-bold text-slate-900">${opt.price}</div>
               </div>
             </div>
           </div>
         ))}
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={() => setStep('TRANSPORT')} className="text-slate-500 hover:text-slate-800 font-medium">Back</button>
        <button 
          onClick={() => setStep('EXTRAS')}
          disabled={!hotel}
          className="bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Next: Add-ons <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderExtras = () => (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
       <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Complete Your Trip</h2>
        <p className="text-slate-500">Eco-conscious add-ons for a worry-free journey.</p>
      </div>

      {/* Carbon Offset */}
      <div 
        onClick={() => setOffsetCarbon(!offsetCarbon)}
        className={`cursor-pointer p-6 rounded-xl border-2 transition-all flex gap-6 items-center ${
            offsetCarbon ? 'bg-emerald-50 border-emerald-500' : 'bg-white border-slate-200 hover:border-emerald-200'
        }`}
      >
         <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${offsetCarbon ? 'bg-emerald-200 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>
            <TreePine className="w-6 h-6" />
         </div>
         <div className="flex-1">
             <h3 className="font-bold text-lg text-slate-800">Offset Trip Emissions</h3>
             <p className="text-sm text-slate-600 mt-1">
                 Contribute to local reforestation projects in {dest.split(',')[0]}. 
                 This calculates to approx <strong>24 trees</strong> planted.
             </p>
         </div>
         <div className="text-right">
             <div className="font-bold text-lg text-slate-900">+$15</div>
             {offsetCarbon && <div className="text-emerald-600 text-xs font-bold flex items-center justify-end gap-1"><CheckCircle className="w-3 h-3" /> Added</div>}
         </div>
      </div>

      {/* Travel Insurance */}
      <div 
        onClick={() => setInsurance(!insurance)}
        className={`cursor-pointer p-6 rounded-xl border-2 transition-all flex gap-6 items-center ${
            insurance ? 'bg-blue-50 border-blue-500' : 'bg-white border-slate-200 hover:border-blue-200'
        }`}
      >
         <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${insurance ? 'bg-blue-200 text-blue-800' : 'bg-slate-100 text-slate-400'}`}>
            <Shield className="w-6 h-6" />
         </div>
         <div className="flex-1">
             <h3 className="font-bold text-lg text-slate-800">Eco-Traveler Insurance</h3>
             <p className="text-sm text-slate-600 mt-1">
                 Comprehensive coverage including flight cancellations, medical, and lost baggage.
             </p>
         </div>
         <div className="text-right">
             <div className="font-bold text-lg text-slate-900">+$45</div>
             {insurance && <div className="text-blue-600 text-xs font-bold flex items-center justify-end gap-1"><CheckCircle className="w-3 h-3" /> Added</div>}
         </div>
      </div>

      {/* Meal Preferences */}
      <div className="p-6 rounded-xl border-2 border-slate-200 bg-white">
         <div className="flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
                <Utensils className="w-6 h-6" />
            </div>
            <div className="flex-1">
                 <h3 className="font-bold text-lg text-slate-800 mb-4">Meal Plan</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                     <button 
                        onClick={() => setMealPlan('none')}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${mealPlan === 'none' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}
                     >
                         No Meals
                     </button>
                     <button 
                        onClick={() => setMealPlan('standard')}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${mealPlan === 'standard' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}
                     >
                         Standard (+$40/day)
                     </button>
                     <button 
                        onClick={() => setMealPlan('vegan')}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${mealPlan === 'vegan' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400'}`}
                     >
                         Vegan (+$35/day)
                     </button>
                 </div>
                 {mealPlan === 'vegan' && (
                     <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                         <Leaf className="w-3 h-3" /> Vegan meals reduce your carbon footprint by ~20%.
                     </p>
                 )}
            </div>
         </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={() => setStep('STAY')} className="text-slate-500 hover:text-slate-800 font-medium">Back</button>
        <button 
          onClick={() => setStep('PAY')}
          className="bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 flex items-center gap-2"
        >
          Next: Payment <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderConfirmed = () => (
    <div className="text-center animate-fade-in py-12">
        <div className="relative inline-block mb-8">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                <CheckCircle className="w-12 h-12" />
            </div>
            <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
                +500 Points!
            </div>
        </div>
        
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8">
            Your eco-friendly trip to {dest} is booked. 
            A digital ID has been generated for your contactless check-in.
        </p>

        <div className="bg-slate-50 max-w-sm mx-auto p-4 rounded-xl border border-slate-200 mb-8 flex items-center gap-4">
             <div className="bg-white p-2 rounded border border-slate-100">
                 <Scan className="w-8 h-8 text-slate-800" />
             </div>
             <div className="text-left">
                 <p className="font-bold text-slate-900">Digital Trip ID</p>
                 <p className="text-xs text-slate-500 font-mono">#ECO-8823-XYZ</p>
             </div>
        </div>

        <button 
          onClick={onComplete}
          className="bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800"
        >
          Go to My Trips
        </button>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 p-6 relative">
      {showAR && renderARPreview()}

      {/* Full Page Payment Override */}
      {step === 'PAY' ? (
          <SmartPaymentGateway 
            items={generateLineItems()} 
            onBack={() => setStep('EXTRAS')} 
            onSuccess={handlePaymentSuccess} 
            currency={currency}
          />
      ) : (
          <div className="max-w-6xl mx-auto">
            {/* Steps Indicator */}
            {step !== 'CONFIRMED' && (
                <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
                {['Transport', 'Stay', 'Extras', 'Pay'].map((label, idx) => {
                    const stepIdx = ['TRANSPORT', 'STAY', 'EXTRAS', 'PAY'].indexOf(step);
                    return (
                    <React.Fragment key={label}>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                        idx <= stepIdx ? 'bg-teal-100 text-teal-800' : 'bg-white text-slate-400 border border-slate-200'
                        }`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                            idx <= stepIdx ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'
                        }`}>{idx + 1}</div>
                        {label}
                        </div>
                        {idx < 3 && <div className="w-4 h-0.5 bg-slate-200 shrink-0"></div>}
                    </React.Fragment>
                    );
                })}
                </div>
            )}

            {/* Back Button (Only for first step) */}
            {step === 'TRANSPORT' && (
                <button onClick={onCancel} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 font-medium">
                    <ArrowLeft className="w-4 h-4" /> Back to Planner
                </button>
            )}

            {step === 'TRANSPORT' && renderTransport()}
            {step === 'STAY' && renderStay()}
            {step === 'EXTRAS' && renderExtras()}
            {step === 'CONFIRMED' && renderConfirmed()}
          </div>
      )}
    </div>
  );
};
