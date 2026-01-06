
import React, { useState } from 'react';
import { ViewState } from '../types';
import { 
  ArrowLeft, Star, Gift, Ticket, TreePine, Hexagon, 
  CheckCircle, Lock, Coins, Sparkles, Zap
} from 'lucide-react';

interface Props {
  onNavigate: (view: ViewState) => void;
}

interface Reward {
  id: number;
  title: string;
  cost: number;
  type: 'VOUCHER' | 'DISCOUNT' | 'IMPACT' | 'NFT';
  image: string;
  description: string;
  code?: string;
}

export const RewardsStore: React.FC<Props> = ({ onNavigate }) => {
  const [userPoints, setUserPoints] = useState(2450);
  const [activeTab, setActiveTab] = useState<'ALL' | 'VOUCHER' | 'IMPACT' | 'NFT'>('ALL');
  const [redeemedItem, setRedeemedItem] = useState<Reward | null>(null);

  const rewards: Reward[] = [
    {
      id: 1,
      title: "Free Organic Coffee",
      cost: 500,
      type: "VOUCHER",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80",
      description: "Redeem at any GreenLeaf Cafe partner location.",
      code: "COFFEE-FREE-22"
    },
    {
      id: 2,
      title: "15% Off Rail Pass",
      cost: 1200,
      type: "DISCOUNT",
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=400&q=80",
      description: "Valid for JR Pass or Eurail bookings made in-app.",
      code: "RAIL-ECO-15"
    },
    {
      id: 3,
      title: "Plant 5 Trees",
      cost: 800,
      type: "IMPACT",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5fa5?auto=format&fit=crop&w=400&q=80",
      description: "We donate to reforestation projects in Indonesia on your behalf.",
    },
    {
      id: 4,
      title: "Kyoto Guardian NFT",
      cost: 2000,
      type: "NFT",
      image: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?auto=format&fit=crop&w=400&q=80",
      description: "Limited edition digital collectible for visiting 5 heritage sites.",
    },
    {
      id: 5,
      title: "$50 Hotel Credit",
      cost: 3000,
      type: "DISCOUNT",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
      description: "Apply to your next stay at any Eco-Certified resort.",
      code: "STAY-50-OFF"
    }
  ];

  const handleRedeem = (item: Reward) => {
    if (userPoints >= item.cost) {
      setUserPoints(prev => prev - item.cost);
      setRedeemedItem(item);
    }
  };

  const filteredRewards = activeTab === 'ALL' ? rewards : rewards.filter(r => r.type === activeTab || (activeTab === 'VOUCHER' && r.type === 'DISCOUNT'));

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header / Wallet Section */}
      <div className="bg-slate-900 text-white p-6 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute top-0 right-0 p-12 bg-teal-500 rounded-full blur-[80px] opacity-20"></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
              <div className="flex items-center gap-3 mb-8">
                  <button onClick={() => onNavigate(ViewState.TOURIST)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                      <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h1 className="font-bold text-lg">EcoRewards Store</h1>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                  <div>
                      <p className="text-slate-400 text-sm font-medium mb-1">Available Balance</p>
                      <div className="flex items-center gap-3">
                          <Coins className="w-10 h-10 text-yellow-400 fill-yellow-400" />
                          <span className="text-5xl font-bold tracking-tight">{userPoints.toLocaleString()}</span>
                          <span className="text-xl text-slate-400 font-medium">pts</span>
                      </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                          <Star className="w-6 h-6 text-white fill-white" />
                      </div>
                      <div>
                          <p className="font-bold text-sm">Level 4: Eco-Scout</p>
                          <div className="w-32 h-1.5 bg-slate-700 rounded-full mt-1.5 overflow-hidden">
                              <div className="h-full bg-teal-400 w-[85%]"></div>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">550 pts to next level</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20 pb-20">
          
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
              {[
                  { id: 'ALL', label: 'All Rewards', icon: <Gift className="w-4 h-4"/> },
                  { id: 'VOUCHER', label: 'Discounts & Food', icon: <Ticket className="w-4 h-4"/> },
                  { id: 'IMPACT', label: 'Eco Impact', icon: <TreePine className="w-4 h-4"/> },
                  { id: 'NFT', label: 'Collectibles', icon: <Hexagon className="w-4 h-4"/> },
              ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all whitespace-nowrap ${
                        activeTab === tab.id 
                        ? 'bg-white text-teal-600 ring-2 ring-teal-500' 
                        : 'bg-white/80 text-slate-600 hover:bg-white'
                    }`}
                  >
                      {tab.icon} {tab.label}
                  </button>
              ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {filteredRewards.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:shadow-lg transition-all group flex flex-col">
                      <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                              <Coins className="w-3 h-3 text-yellow-400" /> {item.cost}
                          </div>
                      </div>
                      
                      <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-slate-900 text-lg leading-tight">{item.title}</h3>
                              {item.type === 'NFT' && <Hexagon className="w-5 h-5 text-purple-500" />}
                          </div>
                          <p className="text-sm text-slate-500 line-clamp-2">{item.description}</p>
                      </div>

                      <button 
                        onClick={() => handleRedeem(item)}
                        disabled={userPoints < item.cost}
                        className={`w-full mt-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                            userPoints >= item.cost 
                            ? 'bg-slate-900 text-white hover:bg-teal-600 shadow-lg shadow-slate-900/20' 
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                          {userPoints >= item.cost ? (
                              <>Redeem <Sparkles className="w-4 h-4" /></>
                          ) : (
                              <><Lock className="w-4 h-4" /> Need {item.cost - userPoints} more</>
                          )}
                      </button>
                  </div>
              ))}
          </div>
      </div>

      {/* Redemption Success Modal */}
      {redeemedItem && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white w-full max-w-sm rounded-3xl p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-teal-500"></div>
                  
                  <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Gift className="w-10 h-10" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Reward Unlocked!</h2>
                  <p className="text-slate-500 text-sm mb-6">
                      You successfully redeemed <strong>{redeemedItem.title}</strong> for {redeemedItem.cost} pts.
                  </p>

                  {redeemedItem.code ? (
                      <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 mb-6">
                          <p className="text-xs text-slate-500 uppercase font-bold mb-1">Voucher Code</p>
                          <p className="text-2xl font-mono font-bold text-slate-800 tracking-wider select-all">{redeemedItem.code}</p>
                      </div>
                  ) : (
                      <div className="bg-green-50 p-4 rounded-xl border border-green-100 mb-6 flex items-center gap-3 text-left">
                          <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                          <p className="text-sm text-green-800 font-medium">
                              Your impact contribution has been recorded on the Eco-Ledger.
                          </p>
                      </div>
                  )}

                  <button 
                    onClick={() => setRedeemedItem(null)}
                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition"
                  >
                      Done
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};
