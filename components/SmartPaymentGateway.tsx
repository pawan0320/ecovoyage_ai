
import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Smartphone, Wallet, Bitcoin, ShieldCheck, 
  Lock, AlertTriangle, CheckCircle, Loader2, Info, ChevronRight, 
  TrendingUp, Leaf, DollarSign
} from 'lucide-react';
import { LineItem, PaymentMethodType } from '../types';

interface Props {
  items: LineItem[];
  onSuccess: (transactionId: string) => void;
  onBack: () => void;
  currency?: string;
}

export const SmartPaymentGateway: React.FC<Props> = ({ items, onSuccess, onBack, currency = 'INR' }) => {
  const [method, setMethod] = useState<PaymentMethodType>('UPI');
  const [processing, setProcessing] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [upiId, setUpiId] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Calculate Totals
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.18; // 18% GST standard in India
  const ecoFee = 50; // Flat eco fee in INR
  const discount = subtotal > 5000 ? 500 : 0; 
  const total = subtotal + tax + ecoFee - discount;

  // AI Financial Guard Simulation
  useEffect(() => {
    // Simulate AI analyzing spending patterns
    const analyzeBudget = () => {
      if (total > 15000) {
        setAiInsight("This trip is 20% above your usual monthly travel spend. Consider using EMI options available on Credit Cards.");
      } else if (total < 500) {
        setAiInsight("For small transactions, UPI is the fastest method with 0% failure rate.");
      } else {
        setAiInsight("Using RuPay cards on this transaction earns you 2x Yatra Points.");
      }
    };
    analyzeBudget();
  }, [total]);

  const handlePay = () => {
    setProcessing(true);
    setError(null);

    // Simulate API Call & Idempotency
    setTimeout(() => {
      // Mock validation
      if (method === 'CARD' && cardNumber.length < 16) {
        setError("Invalid card number. Please check and try again.");
        setProcessing(false);
        return;
      }
      
      const transactionId = `TXN-${Math.floor(Math.random() * 1000000)}`;
      setProcessing(false);
      onSuccess(transactionId);
    }, 2500);
  };

  const getCurrencySymbol = (curr: string) => {
    switch(curr) {
        case 'EUR': return '€';
        case 'JPY': return '¥';
        case 'USD': return '$';
        default: return '₹';
    }
  };

  const symbol = getCurrencySymbol(currency);

  return (
    <div className="bg-slate-50 min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Payment Methods */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Header */}
            <div className="flex items-center gap-4 mb-2">
                <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition">
                    <ChevronRight className="w-5 h-5 rotate-180 text-slate-500" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Secure Payment</h2>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Lock className="w-3 h-3" /> 128-bit SSL Encrypted • Bharat BillPay
                    </div>
                </div>
            </div>

            {/* AI Insight Box */}
            {aiInsight && (
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex items-start gap-3 animate-fade-in">
                    <div className="p-2 bg-indigo-100 rounded-full text-indigo-600 mt-1">
                        <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-indigo-800">Smart Sahayak Note</h4>
                        <p className="text-sm text-indigo-700 leading-relaxed">{aiInsight}</p>
                    </div>
                </div>
            )}

            {/* Methods Selection */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="flex border-b border-slate-100 overflow-x-auto">
                    {[
                        { id: 'UPI', label: 'UPI / QR', icon: <Smartphone className="w-4 h-4"/> },
                        { id: 'CARD', label: 'Card', icon: <CreditCard className="w-4 h-4"/> },
                        { id: 'BNPL', label: 'EMI / Later', icon: <DollarSign className="w-4 h-4"/> },
                        { id: 'WALLET', label: 'Wallets', icon: <Wallet className="w-4 h-4"/> },
                    ].map(m => (
                        <button
                            key={m.id}
                            onClick={() => setMethod(m.id as PaymentMethodType)}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-all ${
                                method === m.id 
                                ? 'bg-slate-900 text-white' 
                                : 'bg-white text-slate-500 hover:bg-slate-50'
                            }`}
                        >
                            {m.icon} {m.label}
                        </button>
                    ))}
                </div>

                <div className="p-8 min-h-[300px]">
                    {method === 'CARD' && (
                        <div className="space-y-4 max-w-md mx-auto animate-fade-in">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Card Number</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <input 
                                        type="text" 
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                                        placeholder="0000 0000 0000 0000"
                                    />
                                    <div className="absolute right-3 top-3 flex gap-1">
                                        <div className="w-8 h-5 bg-blue-600 rounded"></div>
                                        <div className="w-8 h-5 bg-orange-500 rounded"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Expiry</label>
                                    <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 text-center" placeholder="MM / YY" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">CVV</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3.5 w-3 h-3 text-slate-400" />
                                        <input type="text" className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 text-center" placeholder="123" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Name on Card</label>
                                <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500" placeholder="Rahul Kumar" />
                            </div>
                        </div>
                    )}

                    {method === 'UPI' && (
                        <div className="text-center space-y-6 animate-fade-in">
                            <p className="text-sm text-slate-500">Scan QR with any UPI App (GPay, PhonePe, Paytm)</p>
                            <div className="w-48 h-48 bg-white border-2 border-slate-200 rounded-xl mx-auto flex items-center justify-center shadow-inner relative overflow-hidden group">
                                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition"></div>
                                {/* Mock QR Pattern */}
                                <div className="grid grid-cols-5 gap-1 p-2">
                                    {[...Array(25)].map((_, i) => (
                                        <div key={i} className={`w-full h-full rounded-sm ${Math.random() > 0.5 ? 'bg-slate-900' : 'bg-transparent'}`}></div>
                                    ))}
                                </div>
                                <div className="absolute bg-white p-1 rounded-full shadow-lg">
                                    <Smartphone className="w-6 h-6 text-teal-600" />
                                </div>
                            </div>
                            <div className="relative max-w-xs mx-auto">
                                <input 
                                    type="text" 
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    className="w-full pl-4 pr-20 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-teal-500 text-center"
                                    placeholder="e.g. mobile@upi"
                                />
                                <button className="absolute inset-y-0 right-0 px-3 bg-slate-100 text-xs font-bold text-slate-600 border-l border-slate-300 rounded-r-lg hover:bg-slate-200">
                                    Verify
                                </button>
                            </div>
                        </div>
                    )}

                    {method === 'BNPL' && (
                        <div className="space-y-4 animate-fade-in">
                            <div className="bg-pink-50 border border-pink-100 p-4 rounded-xl text-center mb-6">
                                <h3 className="text-pink-700 font-bold text-lg mb-1">No Cost EMI Available</h3>
                                <p className="text-pink-600/80 text-sm">Pay via HDFC, Bajaj Finserv, or ZestMoney.</p>
                            </div>
                            
                            <div className="space-y-3">
                                {[
                                    { date: 'Today', amount: total / 3, status: 'Due Now' },
                                    { date: 'Next Month', amount: total / 3, status: 'Scheduled' },
                                    { date: 'Month After', amount: total / 3, status: 'Scheduled' },
                                ].map((inst, i) => (
                                    <div key={i} className={`flex justify-between items-center p-3 rounded-lg border ${i === 0 ? 'bg-white border-slate-300 shadow-sm' : 'bg-slate-50 border-slate-100 opacity-70'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                                {i + 1}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">{inst.date}</p>
                                                <p className="text-[10px] text-slate-500">{inst.status}</p>
                                            </div>
                                        </div>
                                        <span className="font-mono font-bold text-slate-700">{symbol}{inst.amount.toFixed(0)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {method === 'WALLET' && (
                        <div className="text-center animate-fade-in pt-10">
                            <p className="text-slate-500 mb-6">Link your preferred wallet</p>
                            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                                <button className="p-4 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition font-bold text-slate-700">Paytm</button>
                                <button className="p-4 border border-slate-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition font-bold text-slate-700">PhonePe</button>
                                <button className="p-4 border border-slate-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition font-bold text-slate-700">Amazon Pay</button>
                                <button className="p-4 border border-slate-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition font-bold text-slate-700">Airtel Money</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Action */}
                <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center">
                    <div className="text-xs text-slate-500">
                        <span className="font-bold">Total:</span> {symbol}{total.toLocaleString('en-IN')}
                    </div>
                    <button 
                        onClick={handlePay}
                        disabled={processing}
                        className="bg-teal-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-700 transition shadow-lg shadow-teal-500/20 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm & Pay'}
                    </button>
                </div>
            </div>
        </div>

        {/* Right Col: Order Summary */}
        <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-6">
                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-teal-600" /> Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-slate-800">{item.name}</p>
                                <p className="text-xs text-slate-500">{item.meta}</p>
                            </div>
                            <span className="text-sm font-bold text-slate-700">{symbol}{item.price.toLocaleString('en-IN')}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-slate-500">
                        <span>Subtotal</span>
                        <span>{symbol}{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                        <span>GST (18%)</span>
                        <span>{symbol}{tax.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm text-emerald-600 font-medium">
                        <span className="flex items-center gap-1"><Leaf className="w-3 h-3" /> Green Cess</span>
                        <span>{symbol}{ecoFee}</span>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-between text-sm text-orange-600 font-medium">
                            <span>Promo (Incredible India)</span>
                            <span>-{symbol}{discount}</span>
                        </div>
                    )}
                </div>

                <div className="border-t border-slate-200 mt-4 pt-4">
                    <div className="flex justify-between items-end">
                        <span className="text-sm text-slate-500 font-medium">Payable Amount</span>
                        <span className="text-3xl font-bold text-slate-900">{symbol}{total.toLocaleString('en-IN')}</span>
                    </div>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        <p className="text-xs text-red-700 font-medium">{error}</p>
                    </div>
                )}

                <div className="mt-6 flex items-start gap-2 text-[10px] text-slate-400 bg-slate-50 p-3 rounded-lg">
                    <Info className="w-3 h-3 mt-0.5 shrink-0" />
                    <p>Cancellation allowed up to 24h before travel. Refunds to original source within 5-7 working days.</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
