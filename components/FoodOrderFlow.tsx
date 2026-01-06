
import React, { useState } from 'react';
import { ViewState, LineItem } from '../types';
import { 
  ArrowLeft, ShoppingBag, Plus, Minus, Utensils, 
  Clock, MapPin, Star, CheckCircle, ChevronRight, Truck
} from 'lucide-react';
import { SmartPaymentGateway } from './SmartPaymentGateway';

interface Props {
  foodItem: any;
  onNavigate: (view: ViewState) => void;
}

export const FoodOrderFlow: React.FC<Props> = ({ foodItem, onNavigate }) => {
  const [step, setStep] = useState<'ORDER' | 'PAYMENT' | 'SUCCESS'>('ORDER');
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState<'DINE_IN' | 'DELIVERY'>('DINE_IN');

  if (!foodItem) {
    // Fallback if state is lost
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <p>No item selected.</p>
            <button onClick={() => onNavigate(ViewState.TOURIST)} className="mt-4 text-teal-600">Go Back</button>
        </div>
    );
  }

  // Parse price string to number (e.g. "₹₹" or "₹350") - Mock logic for demo
  const basePrice = foodItem.price.includes('₹') && !isNaN(parseInt(foodItem.price.replace('₹', ''))) 
    ? parseInt(foodItem.price.replace('₹', '')) 
    : 450; // Default fallback price if symbol is generic

  const total = basePrice * quantity;

  const handleOrder = () => {
    setStep('PAYMENT');
  };

  const handlePaymentSuccess = (txId: string) => {
    setStep('SUCCESS');
  };

  const generateLineItems = (): LineItem[] => {
    return [{
      id: `food-${foodItem.id}`,
      name: foodItem.name,
      category: 'Food',
      price: total,
      meta: `${quantity}x ${orderType === 'DINE_IN' ? 'Dine-in' : 'Delivery'}`,
      image: foodItem.image
    }];
  };

  if (step === 'PAYMENT') {
    return (
      <SmartPaymentGateway 
        items={generateLineItems()} 
        onBack={() => setStep('ORDER')} 
        onSuccess={handlePaymentSuccess} 
        currency="INR"
      />
    );
  }

  if (step === 'SUCCESS') {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                <CheckCircle className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Order Confirmed!</h2>
            <p className="text-slate-500 max-w-sm mb-8">
                Your order for <strong>{foodItem.name}</strong> has been placed. 
                {orderType === 'DELIVERY' ? ' Arriving in ~35 mins.' : ' Table reserved.'}
            </p>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 w-full max-w-xs mb-8">
                <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-slate-500">Order ID</span>
                    <span className="font-mono font-bold">#ORD-{Math.floor(Math.random()*10000)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Amount Paid</span>
                    <span className="font-bold text-slate-900">₹{total}</span>
                </div>
            </div>
            <button 
                onClick={() => onNavigate(ViewState.TOURIST)}
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition"
            >
                Return to Dashboard
            </button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-72 w-full">
        <img src={foodItem.image} alt={foodItem.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <button 
            onClick={() => onNavigate(ViewState.TOURIST)}
            className="absolute top-6 left-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition"
        >
            <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="max-w-2xl mx-auto -mt-8 relative z-10 px-6 pb-24">
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-1">{foodItem.name}</h1>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <MapPin className="w-4 h-4" /> {foodItem.location}
                    </div>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-yellow-700">{foodItem.rating}</span>
                </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Authentic local cuisine prepared with traditional methods. 
                Experience the true taste of the region with this signature dish.
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl mb-6">
                <span className="font-bold text-slate-700">Quantity</span>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition"
                    >
                        <Minus className="w-4 h-4 text-slate-600" />
                    </button>
                    <span className="text-xl font-bold text-slate-900 w-8 text-center">{quantity}</span>
                    <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Order Type */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <button 
                    onClick={() => setOrderType('DINE_IN')}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition ${
                        orderType === 'DINE_IN' 
                        ? 'border-teal-500 bg-teal-50 text-teal-800' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-500'
                    }`}
                >
                    <Utensils className="w-6 h-6" />
                    <span className="font-bold text-sm">Dine-in</span>
                </button>
                <button 
                    onClick={() => setOrderType('DELIVERY')}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition ${
                        orderType === 'DELIVERY' 
                        ? 'border-teal-500 bg-teal-50 text-teal-800' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-500'
                    }`}
                >
                    <Truck className="w-6 h-6" />
                    <span className="font-bold text-sm">Delivery</span>
                </button>
            </div>

            {/* Total & Action */}
            <div className="border-t border-slate-100 pt-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-slate-500 text-sm">Total Price</p>
                        <h3 className="text-3xl font-bold text-slate-900">₹{total}</h3>
                    </div>
                    {orderType === 'DELIVERY' && (
                        <div className="text-right text-xs text-slate-400">
                            + ₹40 Delivery Fee
                        </div>
                    )}
                </div>

                <div className="flex gap-3">
                    <button 
                        onClick={() => onNavigate(ViewState.TOURIST)}
                        className="px-6 py-4 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition"
                    >
                        Skip
                    </button>
                    <button 
                        onClick={handleOrder}
                        className="flex-1 bg-teal-600 text-white py-4 rounded-xl font-bold hover:bg-teal-700 transition flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
                    >
                        Proceed to Pay <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
