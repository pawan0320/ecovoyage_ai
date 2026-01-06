
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';
import { CROWD_DENSITY_DATA, SUSTAINABILITY_METRICS, HOTSPOTS } from '../constants';
import { AlertTriangle, ShieldCheck, BarChart3, Radio, Droplets, Zap, Wind } from 'lucide-react';

export const GovDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 pb-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">City Control Center</h2>
          <p className="text-slate-500">Monitoring crowd density, sustainability, and safety.</p>
        </div>
        <button className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-100 transition flex items-center gap-2 font-bold shadow-sm">
          <AlertTriangle className="w-4 h-4" /> Emergency Broadcast
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Real-time Crowd Heatmap Simulator */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-800">Live Crowd Heatmap</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                    <Radio className="w-3 h-3 animate-pulse text-red-500" /> LIVE_FEED_CAM_04
                </div>
           </div>
           
           <div className="relative w-full h-80 bg-slate-100 rounded-lg overflow-hidden border border-slate-300 group">
                {/* Mock Map Background */}
                <div className="absolute inset-0 opacity-20" 
                     style={{ 
                         backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', 
                         backgroundSize: '20px 20px' 
                     }}>
                </div>
                <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center"></div>
                
                {/* Hotspots */}
                {HOTSPOTS.map((point) => (
                    <div 
                        key={point.id}
                        className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition duration-300"
                        style={{ left: `${point.lng}%`, top: `${point.lat}%` }}
                    >
                        <div className={`rounded-full animate-pulse blur-md absolute inset-0
                            ${point.intensity > 0.8 ? 'bg-red-500' : point.intensity > 0.5 ? 'bg-orange-400' : 'bg-green-400'}
                        `} style={{ width: '60px', height: '60px', opacity: 0.4 }}></div>
                        
                        <div className={`w-4 h-4 rounded-full border-2 border-white shadow-sm z-10
                             ${point.intensity > 0.8 ? 'bg-red-600' : point.intensity > 0.5 ? 'bg-orange-500' : 'bg-green-500'}
                        `}></div>

                        <div className="opacity-0 group-hover:opacity-100 absolute bottom-6 bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20 transition shadow-xl">
                            {point.label}: {(point.intensity * 100).toFixed(0)}% Capacity
                        </div>
                    </div>
                ))}
                
                <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-lg text-xs space-y-2 shadow-lg backdrop-blur-sm border border-slate-200">
                    <div className="font-bold text-slate-700 mb-1">Density Index</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> High (Critical)</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-400 rounded-full"></div> Moderate</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-400 rounded-full"></div> Low</div>
                </div>
           </div>
        </div>

        {/* Alerts Panel */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Active Alerts</h3>
            <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-md">
                    <h4 className="text-sm font-bold text-yellow-800 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> High Traffic
                    </h4>
                    <p className="text-xs text-yellow-700 mt-1">City Center approaching 90% capacity. Diverting tour buses via Route 4.</p>
                </div>
                 <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-md">
                    <h4 className="text-sm font-bold text-green-800 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> Air Quality
                    </h4>
                    <p className="text-xs text-green-700 mt-1">Air Quality Index is good (34). Optimal for walking tours.</p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-md">
                    <h4 className="text-sm font-bold text-blue-800 flex items-center gap-2">
                        <Droplets className="w-4 h-4" /> Water Usage
                    </h4>
                    <p className="text-xs text-blue-700 mt-1">Usage normalized in District 2 after maintenance.</p>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Hourly Crowd Forecast</h3>
            {/* Added explicit styles to container to prevent width(-1) error */}
            <div className="w-full h-64 min-h-[256px]" style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={CROWD_DENSITY_DATA}>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
         </div>

         {/* Resource Monitor (Enhanced from Sustainability Index) */}
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Resource Strain</h3>
             <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                    <div className="text-xs text-slate-500">Grid Load</div>
                    <div className="font-bold text-slate-800">65%</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <div className="text-xs text-slate-500">Water Res.</div>
                    <div className="font-bold text-slate-800">82%</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <Wind className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                    <div className="text-xs text-slate-500">AQI</div>
                    <div className="font-bold text-slate-800">34</div>
                </div>
             </div>
             {/* Added explicit styles to container */}
             <div className="w-full h-40 min-h-[160px]" style={{ width: '100%', height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={SUSTAINABILITY_METRICS} layout="vertical" margin={{left: 0}}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} fontSize={11} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} barSize={16} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
         </div>
      </div>
    </div>
  );
};
