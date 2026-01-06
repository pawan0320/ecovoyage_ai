
import React, { useState, useEffect } from 'react';
import { ViewState, TicketAnalysis, LineItem } from '../types';
import { analyzeTicketContext } from '../services/geminiService';
import { 
  Upload, FileText, CheckCircle, ArrowRight, SkipForward, 
  Bed, Coffee, Car, ShoppingBag, Plane, Shield, Loader2, 
  MapPin, Calendar, Clock, CreditCard, ChevronLeft, Plus, Trash2,
  AlertCircle, Sparkles
} from 'lucide-react';
import { SmartPaymentGateway } from './SmartPaymentGateway';

interface Props {
  onNavigate: (view: ViewState) => void;
}

type FlowStep = 'UPLOAD' | 'ANALYZING' | 'STAY' | 'GROCERIES' | 'FOOD' | 'TRANSPORT' | 'RETURN' | 'SUMMARY' | 'PAYMENT';

export const SmartTravelFlow: React.FC<Props> = ({ onNavigate }) => {
  const [step, setStep] = useState<FlowStep>('UPLOAD');
  const [ticketData, setTicketData] = useState<TicketAnalysis | null>(null);
  const [cart, setCart] = useState<LineItem[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState<string[]>([]);

  // --- MOCK DATABASE (Contextually filtered in real app) ---
  const suggestions = {
    STAY: [
      { id: 'h1', name: 'Grand Bay Resort', category: 'Stay', price: 4500, meta: '2 Nights • Sea View', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
      { id: 'h2', name: 'City Center Hostel', category: 'Stay', price: 800, meta: '2 Nights • Bunk Bed', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400' },
    ],
    GROCERIES: [
      { id: 'g1', name: 'Travel Essentials Kit', category: 'Groceries', price: 450, meta: 'Water, Snacks, Sanitizer', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
      { id: 'g2', name: 'Local Fruits Basket', category: 'Groceries', price: 300, meta: 'Fresh Organic Produce', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400' },
    ],
    FOOD: [
      { id: 'f1', name: 'Welcome Thali', category: 'Food', price: 350, meta: 'Pre-order Dinner', image: 'https://images.unsplash.com/photo-1514362545857-3bc16549766b?w=400' },
      { id: 'f2', name: 'Breakfast Combo', category: 'Food', price: 200, meta: 'Idli, Vada, Coffee', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400' },
    ],
    TRANSPORT: [
      { id: 'c1', name: 'Pre-paid Cab', category: 'Transport', price: 650, meta: 'Station to Hotel', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400' },
      { id: 'c2', name: 'Scooter Rental', category: 'Transport', price: 400, meta: 'Per Day', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84f3d?w=400' },
    ],
    RETURN: [
      { id: 'r1', name: 'Return Flight (IndiGo)', category: 'Transport', price: 3200, meta: 'Economy Saver', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400' },
      { id: 'r2', name: 'Return Train (Vande Bharat)', category: 'Transport', price: 1800, meta: 'AC Chair Car', image: 'https://images.unsplash.com/photo-1532309831776-be3cf49e4933?w=400' },
    ]
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setStep('ANALYZING');
      
      // Simulate Upload Progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) clearInterval(interval);
      }, 200);

      // Simulate AI Analysis of the Ticket
      setTimeout(async () => {
        const mockText = "Flight to Visakhapatnam. Class: Economy. Date: 24 Oct. Duration: 3 Days.";
        // In real app, we send the file/text to Gemini here
        const analysis = await analyzeTicketContext(mockText);
        
        // Enrich mock analysis with details for the flow
        const fullAnalysis: TicketAnalysis = {
            ...analysis,
            origin: 'Hyderabad',
            destination: 'Visakhapatnam',
            date: '24 Oct 2023',
            durationDays: 3, // Change this to 1 to test skipping Groceries
            arrivalTime: '19:00',
            tier: analysis.tier || 'MID'
        };
        setTicketData(fullAnalysis);
        setStep('STAY'); 
      }, 2500);
    }
  };

  const toggleCartItem = (item: any) => {
    const exists = cart.find(c => c.id === item.id);
    if (exists) {
      setCart(cart.filter(c => c.id !== item.id));
    } else {
      setCart([...cart, { ...item, category: getCategoryFromStep(step) }]);
    }
  };

  const getCategoryFromStep = (s: FlowStep): LineItem['category'] => {
    switch(s) {
      case 'STAY': return 'Stay';
      case 'GROCERIES': return 'Groceries';
      case 'FOOD': return 'Food';
      case 'TRANSPORT': return 'Transport';
      case 'RETURN': return 'Transport';
      default: return 'Experience';
    }
  };

  const goNext = () => {
    // AI Skip Logic Engine
    switch (step) {
      case 'STAY': 
        // If trip is very short (< 2 days), AI decides to skip groceries
        if (ticketData?.durationDays && ticketData.durationDays < 2) {
            setSkippedSteps(prev => [...prev, 'GROCERIES']);
            setStep('FOOD');
        } else {
            setStep('GROCERIES');
        }
        break;
      case 'GROCERIES': 
        setStep('FOOD'); 
        break;
      case 'FOOD': 
        setStep('TRANSPORT'); 
        break;
      case 'TRANSPORT': 
        // AI Logic: If user already has a return ticket (detected in analysis), skip return
        // For demo, we assume return is needed.
        setStep('RETURN'); 
        break;
      case 'RETURN': 
        setStep('SUMMARY'); 
        break;
      case 'SUMMARY':
        setStep('PAYMENT');
        break;
      default: break;
    }
  };

  const handleSkip = () => {
    setSkippedSteps([...skippedSteps, step]);
    goNext();
  };

  const getTotal = () => cart.reduce((acc, item) => acc + item.price, 0);

  // Render a Generic Step Card
  const RenderStep = ({ 
    title, 
    subtitle, 
    icon, 
    items, 
    type 
  }: { 
    title: string, 
    subtitle: string, 
    icon: React.ReactNode, 
    items: any[], 
    type: string 
  }) => (
    <div className="max-w-md mx-auto animate-fade-in pb-20">
        <div className="text-center mb-8">
            <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-white">
                {icon}
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            <p className="text-slate-500 mt-2 text-sm">{subtitle}</p>
        </div>

        <div className="space-y-4 mb-8">
            {items.map((item) => {
                const isSelected = cart.some(c => c.id === item.id);
                return (
                    <div 
                        key={item.id} 
                        onClick={() => toggleCartItem(item)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex gap-4 items-center group relative ${
                            isSelected 
                            ? 'bg-teal-50 border-teal-500 shadow-md' 
                            : 'bg-white border-slate-100 hover:border-teal-200 hover:shadow-sm'
                        }`}
                    >
                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt={item.name} />
                        <div className="flex-1">
                            <h4 className={`font-bold transition ${isSelected ? 'text-teal-800' : 'text-slate-800'}`}>{item.name}</h4>
                            <p className="text-xs text-slate-500">{item.meta}</p>
                            <p className="text-sm font-bold text-teal-600 mt-1">₹{item.price}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                            isSelected ? 'bg-teal-500 border-teal-500' : 'border-slate-300'
                        }`}>
                            {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Footer Actions */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 z-20">
            <div className="max-w-md mx-auto flex gap-3">
                <button 
                    onClick={handleSkip}
                    className="flex-1 py-3 text-slate-500 font-bold bg-slate-100 rounded-xl hover:bg-slate-200 transition"
                >
                    Skip
                </button>
                <button 
                    onClick={goNext}
                    className="flex-[2] py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2 shadow-lg"
                >
                    {cart.some(c => c.category === getCategoryFromStep(step)) ? 'Continue' : 'Continue (None Selected)'} <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
  );

  const renderSummary = () => (
    <div className="max-w-lg mx-auto animate-fade-in pb-24">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Yatra Summary</h2>
        <p className="text-center text-slate-500 mb-8">Review your AI-curated itinerary for {ticketData?.destination}</p>
        
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-200 mb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-blue-500"></div>
            
            {/* Ticket Header */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="p-3 bg-teal-50 rounded-xl">
                    <FileText className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-lg">Trip to {ticketData?.destination}</h3>
                    <p className="text-sm text-slate-500">{ticketData?.date} • {ticketData?.durationDays} Days</p>
                </div>
            </div>

            <div className="space-y-4 mb-6">
                {cart.length === 0 ? (
                    <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                        <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-500 italic text-sm">No add-ons selected.</p>
                    </div>
                ) : (
                    cart.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center group">
                            <div className="flex items-center gap-3">
                                <button onClick={() => toggleCartItem(item)} className="text-slate-300 hover:text-red-500 transition">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div>
                                    <p className="text-sm font-bold text-slate-700">{item.name}</p>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{item.category}</p>
                                </div>
                            </div>
                            <span className="font-medium text-slate-900">₹{item.price}</span>
                        </div>
                    ))
                )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                <span className="text-slate-500 font-medium">Total Payable</span>
                <span className="text-3xl font-bold text-slate-900">₹{getTotal()}</span>
            </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 z-20">
            <div className="max-w-md mx-auto">
                <button 
                    onClick={() => setStep('PAYMENT')}
                    disabled={cart.length === 0}
                    className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition shadow-xl shadow-teal-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    Proceed to Payment <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-6 px-4">
      {/* Navigation Header */}
      <div className="max-w-md mx-auto mb-8 relative">
          <div className="flex justify-between items-center mb-4">
              <button onClick={() => onNavigate(ViewState.TOURIST)} className="p-2 hover:bg-slate-200 rounded-full transition">
                  <ChevronLeft className="w-6 h-6 text-slate-600" />
              </button>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-teal-500" /> Yatra Flow AI
              </span>
              <div className="w-9"></div> 
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-500 transition-all duration-500 ease-out"
                style={{ width: 
                    step === 'UPLOAD' ? '10%' : 
                    step === 'ANALYZING' ? '20%' :
                    step === 'STAY' ? '35%' : 
                    step === 'GROCERIES' ? '50%' :
                    step === 'FOOD' ? '65%' : 
                    step === 'TRANSPORT' ? '80%' : 
                    step === 'SUMMARY' ? '90%' : '100%' 
                }}
              ></div>
          </div>
      </div>

      {step === 'UPLOAD' && (
          <div className="max-w-md mx-auto text-center animate-fade-in pt-12">
              <div className="mb-8">
                  <h1 className="text-3xl font-bold text-slate-900 mb-3">One Ticket, Full Trip.</h1>
                  <p className="text-slate-500 text-lg">Upload your train or flight ticket. Our AI will plan your entire journey instantly.</p>
              </div>

              <label className="block w-full aspect-[4/3] border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-white hover:border-teal-500 hover:shadow-xl transition-all group bg-slate-100 relative overflow-hidden">
                  <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*,.pdf" />
                  <div className="p-5 bg-white rounded-full shadow-md mb-4 group-hover:scale-110 transition z-10">
                      <Upload className="w-10 h-10 text-teal-600" />
                  </div>
                  <span className="font-bold text-slate-700 text-lg z-10">Tap to Upload Ticket</span>
                  <span className="text-sm text-slate-400 mt-2 z-10">Supports PDF, JPG, PNG</span>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-100 rounded-full opacity-50 blur-2xl"></div>
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-2xl"></div>
              </label>
          </div>
      )}

      {step === 'ANALYZING' && (
          <div className="flex flex-col items-center justify-center pt-24 text-center animate-fade-in max-w-sm mx-auto">
              <div className="relative w-24 h-24 mb-8">
                  <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                  <div 
                    className="absolute inset-0 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"
                    style={{ animationDuration: '1.5s' }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-teal-600">
                      {Math.min(uploadProgress, 99)}%
                  </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Analyzing Trip Context...</h2>
              <p className="text-slate-500 mt-2">Extracting PNR, dates, destination, and checking weather patterns.</p>
              
              <div className="mt-8 flex flex-col gap-2 w-full">
                  <div className="flex items-center gap-3 text-sm text-slate-600 bg-white p-3 rounded-lg shadow-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" /> Reading Destination
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 bg-white p-3 rounded-lg shadow-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" /> Calculating Duration
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 bg-white p-3 rounded-lg shadow-sm">
                      <Loader2 className="w-4 h-4 animate-spin text-teal-500" /> Matching Budget Tier
                  </div>
              </div>
          </div>
      )}

      {step === 'STAY' && (
          <RenderStep 
            title="Need a place to crash?" 
            subtitle={`We found top rated stays in ${ticketData?.destination} matching your ${ticketData?.tier || 'Travel'} style.`} 
            icon={<Bed className="w-10 h-10"/>} 
            items={suggestions.STAY} 
            type="Stay"
          />
      )}

      {step === 'GROCERIES' && (
          <RenderStep 
            title="Stock up on essentials?" 
            subtitle="Since you're staying for 3 days, here's a starter kit so you don't have to shop later." 
            icon={<ShoppingBag className="w-10 h-10"/>} 
            items={suggestions.GROCERIES} 
            type="Groceries"
          />
      )}

      {step === 'FOOD' && (
          <RenderStep 
            title="Hungry upon arrival?" 
            subtitle={`Your flight lands at ${ticketData?.arrivalTime || 'dinner time'}. Pre-order a meal to your room.`} 
            icon={<Coffee className="w-10 h-10"/>} 
            items={suggestions.FOOD} 
            type="Food"
          />
      )}

      {step === 'TRANSPORT' && (
          <RenderStep 
            title="Ride to Hotel" 
            subtitle="Skip the taxi queue. Book a verified, safe cab waiting for you." 
            icon={<Car className="w-10 h-10"/>} 
            items={suggestions.TRANSPORT} 
            type="Transport"
          />
      )}

      {step === 'RETURN' && (
          <RenderStep 
            title="Return Journey" 
            subtitle="We didn't see a return ticket. Secure one now before prices rise?" 
            icon={<Plane className="w-10 h-10"/>} 
            items={suggestions.RETURN} 
            type="Transport"
          />
      )}

      {step === 'SUMMARY' && renderSummary()}

      {step === 'PAYMENT' && (
          <SmartPaymentGateway 
            items={cart} 
            onBack={() => setStep('SUMMARY')} 
            onSuccess={(txId) => {
                alert(`Booking Successful! TX: ${txId}`);
                onNavigate(ViewState.TOURIST);
            }} 
          />
      )}

    </div>
  );
};
