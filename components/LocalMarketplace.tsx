
import React, { useState } from 'react';
import { ViewState } from '../types';
import { 
  ArrowLeft, ShoppingBag, Star, ShieldCheck, Tag, 
  Utensils, Palette, Map, Heart, Hexagon, Coins, Search, Filter 
} from 'lucide-react';

interface Props {
  onNavigate: (view: ViewState) => void;
}

export const LocalMarketplace: React.FC<Props> = ({ onNavigate }) => {
  const [category, setCategory] = useState<'ALL' | 'ARTISAN' | 'FOOD' | 'GUIDE'>('ALL');
  const [showNFTModal, setShowNFTModal] = useState(false);

  // Mock Data: Indian Handicrafts Focus
  const products = [
    {
      id: 1,
      name: "Kalamkari Hand-Painted Saree",
      maker: "Srikalahasti Cooperative",
      type: "ARTISAN",
      price: 4500,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=400&q=80",
      description: "Authentic cotton saree painted with natural dyes depicting epics.",
      badge: "GI Tagged"
    },
    {
      id: 2,
      name: "Old City Food Walk",
      maker: "Hyderabad Trails",
      type: "GUIDE",
      price: 1200,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?auto=format&fit=crop&w=400&q=80",
      description: "Taste the best Irani Chai and Biryani near Charminar.",
      badge: "Best Seller"
    },
    {
      id: 3,
      name: "Etikoppaka Wooden Toys",
      maker: "Visakha Artisans",
      type: "ARTISAN",
      price: 850,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1598555845180-c9725f560e9f?auto=format&fit=crop&w=400&q=80",
      description: "Traditional lacquer toys from Andhra Pradesh. Non-toxic.",
      badge: "Eco-Friendly"
    },
    {
      id: 4,
      name: "Pootharekulu (Paper Sweet)",
      maker: "Atreyapuram Sweets",
      type: "FOOD",
      price: 350,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&w=400&q=80",
      description: "Famous dry fruit stuffed wafer sweet from East Godavari.",
      badge: "Local Delicacy"
    }
  ];

  const filteredProducts = category === 'ALL' ? products : products.filter(p => p.type === category);

  const handlePurchase = () => {
    // Simulate purchase logic
    setTimeout(() => setShowNFTModal(true), 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button onClick={() => onNavigate(ViewState.TOURIST)} className="p-2 hover:bg-slate-100 rounded-full">
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Handicrafts of India</h1>
                <p className="text-xs text-slate-500">Direct from Artisans • 0% Commission</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg">
                   <Coins className="w-4 h-4 text-yellow-500" />
                   <span className="text-sm font-bold text-slate-700">1,250 Pts</span>
               </div>
               <button className="relative p-2 bg-slate-100 rounded-full hover:bg-slate-200">
                  <ShoppingBag className="w-5 h-5 text-slate-600" />
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
               </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
             <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                {[
                  { id: 'ALL', label: 'All Items', icon: <Tag className="w-4 h-4"/> },
                  { id: 'ARTISAN', label: 'Handicrafts', icon: <Palette className="w-4 h-4"/> },
                  { id: 'FOOD', label: 'Local Eats', icon: <Utensils className="w-4 h-4"/> },
                  { id: 'GUIDE', label: 'Experiences', icon: <Map className="w-4 h-4"/> },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${
                      category === cat.id 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
             </div>
             
             <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search crafts..." className="w-full pl-9 pr-4 py-2 bg-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 pb-20">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition group">
                 <div className="relative h-48">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
                       <ShieldCheck className="w-3 h-3 text-teal-600" /> {item.badge}
                    </div>
                    <button className="absolute top-3 right-3 p-2 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition">
                       <Heart className="w-4 h-4" />
                    </button>
                 </div>
                 <div className="p-5">
                    <div className="flex justify-between items-start mb-1">
                       <h3 className="font-bold text-slate-900 leading-tight">{item.name}</h3>
                       <div className="flex items-center gap-1 text-xs font-bold bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded">
                          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" /> {item.rating}
                       </div>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mb-3">{item.maker}</p>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">{item.description}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                       <span className="text-lg font-bold text-slate-900">₹{item.price}</span>
                       <button 
                         onClick={handlePurchase}
                         className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition"
                       >
                         Buy Now
                       </button>
                    </div>
                 </div>
              </div>
            ))}
         </div>

         {/* Trust & Gamification Banner */}
         <div className="mt-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                 <div>
                     <h2 className="text-2xl font-bold mb-2">Vocal for Local</h2>
                     <p className="text-orange-100 max-w-xl">
                        Every purchase directly supports the local artisan community in Andhra Pradesh. 
                        Receive a <strong>Blockchain Certificate of Authenticity</strong> with every GI-tagged item.
                     </p>
                 </div>
                 <div className="flex items-center gap-4">
                     <div className="text-center">
                         <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-white/30">
                            <ShieldCheck className="w-6 h-6" />
                         </div>
                         <p className="text-xs font-bold">Govt Verified</p>
                     </div>
                     <div className="text-center">
                         <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-white/30">
                            <Hexagon className="w-6 h-6" />
                         </div>
                         <p className="text-xs font-bold">Cert. of Auth</p>
                     </div>
                 </div>
             </div>
             {/* Decor */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
         </div>
      </div>

      {/* Auth Certificate Modal */}
      {showNFTModal && (
         <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in">
             <div className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-2xl p-8 text-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent pointer-events-none"></div>
                 
                 <div className="relative z-10">
                     <div className="w-32 h-32 mx-auto mb-6 relative">
                         <div className="absolute inset-0 bg-orange-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                         <div className="relative w-full h-full bg-gradient-to-br from-orange-400 to-red-600 rounded-xl flex items-center justify-center border-2 border-white/20 shadow-2xl rotate-3">
                             <ShieldCheck className="w-16 h-16 text-white" />
                         </div>
                     </div>
                     
                     <h3 className="text-2xl font-bold text-white mb-2">Certificate Issued!</h3>
                     <p className="text-orange-200 text-sm mb-6">
                         Your purchase supports the <strong>Srikalahasti Artisans</strong>. A digital certificate of authenticity has been added to your profile.
                     </p>
                     
                     <div className="flex gap-3">
                         <button 
                            onClick={() => setShowNFTModal(false)}
                            className="flex-1 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition"
                         >
                             View Cert
                         </button>
                         <button 
                            onClick={() => setShowNFTModal(false)}
                            className="flex-1 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition"
                         >
                             Close
                         </button>
                     </div>
                 </div>
             </div>
         </div>
      )}
    </div>
  );
};
