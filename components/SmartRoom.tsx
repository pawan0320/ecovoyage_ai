
import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '../types';
import { 
  ArrowLeft, Power, Lock, Unlock, Thermometer, 
  Sun, Moon, Music, Wifi, BatteryCharging, ChevronUp, ChevronDown,
  Mic, LogOut, QrCode, ShieldCheck, Check, Tv, Blinds, Leaf, Activity,
  Fan, Zap, BarChart3
} from 'lucide-react';

interface Props {
  onNavigate: (view: ViewState) => void;
}

// Types for our IoT Simulation
type DeviceType = 'LIGHTS' | 'AC' | 'TV' | 'CURTAINS' | 'DOOR' | 'FAN';
interface NetworkLog {
  id: number;
  time: string;
  type: 'TX' | 'RX';
  message: string;
}

export const SmartRoom: React.FC<Props> = ({ onNavigate }) => {
  // Device State
  const [isLocked, setIsLocked] = useState(true);
  const [lightsOn, setLightsOn] = useState(true);
  const [tvOn, setTvOn] = useState(false);
  const [curtainsOpen, setCurtainsOpen] = useState(true);
  const [temp, setTemp] = useState(22);
  const [fanSpeed, setFanSpeed] = useState(1); // 0, 1, 2, 3
  const [ecoMode, setEcoMode] = useState(false);
  const [activeScene, setActiveScene] = useState<'FOCUS' | 'RELAX' | 'SLEEP'>('RELAX');
  
  // Voice State
  const [isListening, setIsListening] = useState(false);
  
  // UX State
  const [showCheckout, setShowCheckout] = useState(false);
  const [networkLogs, setNetworkLogs] = useState<NetworkLog[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [networkLogs]);

  // Simulated IoT Network Layer
  const sendCommand = (device: DeviceType, state: any) => {
    const timestamp = new Date().toLocaleTimeString().split(' ')[0];
    
    // 1. Log Transmission (TX)
    setNetworkLogs(prev => [...prev, {
      id: Date.now(),
      time: timestamp,
      type: 'TX',
      message: `POST /api/room/402/${device} { val: ${state} }`
    }]);

    // 2. Simulate Network Latency & Response (RX)
    setTimeout(() => {
      setNetworkLogs(prev => [...prev, {
        id: Date.now() + 1,
        time: new Date().toLocaleTimeString().split(' ')[0],
        type: 'RX',
        message: `ACK: ${device} state updated.`
      }]);
    }, Math.random() * 500 + 200); // Random latency 200-700ms
  };

  const handleToggleLight = () => {
    const newState = !lightsOn;
    setLightsOn(newState);
    if (newState) setEcoMode(false);
    sendCommand('LIGHTS', newState ? 'ON' : 'OFF');
  };

  const handleToggleTV = () => {
    setTvOn(!tvOn);
    sendCommand('TV', !tvOn ? 'ON' : 'OFF');
  };

  const handleCurtains = () => {
    setCurtainsOpen(!curtainsOpen);
    sendCommand('CURTAINS', !curtainsOpen ? 'OPEN' : 'CLOSE');
  };

  const handleTemp = (change: number) => {
    const newTemp = temp + change;
    setTemp(newTemp);
    sendCommand('AC', `${newTemp}C`);
  };

  const handleFanSpeed = () => {
    const newSpeed = (fanSpeed + 1) % 4; // Cycle 0-3
    setFanSpeed(newSpeed);
    sendCommand('FAN', `SPEED_${newSpeed}`);
  }

  const handleEcoMode = () => {
    const newMode = !ecoMode;
    setEcoMode(newMode);
    if (newMode) {
      // Eco Logic: Optimize devices
      setLightsOn(false);
      setTvOn(false);
      setTemp(24); // Efficient temp
      setFanSpeed(1); // Low fan
      setCurtainsOpen(true); // Natural light
      sendCommand('AC', 'ECO_PRESET');
    }
  };

  const toggleVoice = () => {
    setIsListening(true);
    // Simulate voice command processing
    setTimeout(() => {
      setIsListening(false);
      setCurtainsOpen(false);
      sendCommand('CURTAINS', 'CLOSE');
      setNetworkLogs(prev => [...prev, {
        id: Date.now(),
        time: new Date().toLocaleTimeString().split(' ')[0],
        type: 'RX',
        message: `VOICE_MATCH: "Close curtains"`
      }]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${lightsOn ? 'opacity-20' : 'opacity-5'}`}>
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 flex items-center justify-between bg-slate-900/50 backdrop-blur-sm sticky top-0">
        <button 
          onClick={() => onNavigate(ViewState.TOURIST)}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
            <h1 className="font-bold text-lg flex items-center justify-center gap-2">
                Room 402 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            </h1>
            <p className="text-xs text-slate-400">Green Leaf Resort</p>
        </div>
        <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
           <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
         
         {/* Master Status Card */}
         <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-6 rounded-3xl shadow-xl relative overflow-hidden">
            {/* Energy Monitor Visual */}
            <div className="absolute top-4 right-4 flex flex-col items-end">
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-1">
                   <Zap className="w-3 h-3 text-yellow-500" /> Power Usage
                </div>
                <div className="flex items-end gap-1 h-8">
                   <div className="w-1.5 bg-green-500/30 rounded-t-sm h-[40%]"></div>
                   <div className="w-1.5 bg-green-500/50 rounded-t-sm h-[60%]"></div>
                   <div className="w-1.5 bg-yellow-500 rounded-t-sm h-[80%] animate-pulse"></div>
                   <div className="w-1.5 bg-slate-700 rounded-t-sm h-[30%]"></div>
                </div>
            </div>

            <div className="flex justify-between items-start mb-8">
                <div>
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Entry Access</span>
                   <span className="text-2xl font-bold flex items-center gap-2">
                      {isLocked ? 'Locked' : 'Unlocked'}
                   </span>
                </div>
                <button 
                  onClick={() => { setIsLocked(!isLocked); sendCommand('DOOR', !isLocked ? 'LOCK' : 'UNLOCK'); }}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-lg transform active:scale-95 ${
                      isLocked ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-red-500 text-white shadow-red-500/20'
                  }`}
                >
                    {isLocked ? <Lock className="w-7 h-7" /> : <Unlock className="w-7 h-7" />}
                </button>
            </div>
            
            {/* Quick Toggles Grid */}
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={handleEcoMode}
                    className={`p-4 rounded-2xl flex flex-col items-start gap-3 transition-all border ${
                        ecoMode 
                        ? 'bg-green-500/20 border-green-500/50 text-green-400' 
                        : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
                    }`}
                >
                    <Leaf className="w-6 h-6" />
                    <div className="text-left">
                        <span className="font-bold block">Eco Mode</span>
                        <span className="text-[10px] opacity-70">{ecoMode ? 'Active' : 'Off'}</span>
                    </div>
                </button>

                <button 
                    onClick={handleToggleTV}
                    className={`p-4 rounded-2xl flex flex-col items-start gap-3 transition-all border ${
                        tvOn 
                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' 
                        : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
                    }`}
                >
                    <Tv className="w-6 h-6" />
                    <div className="text-left">
                        <span className="font-bold block">Smart TV</span>
                        <span className="text-[10px] opacity-70">{tvOn ? 'Netflix Ready' : 'Standby'}</span>
                    </div>
                </button>
            </div>
         </div>

         {/* Climate Control */}
         <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-3xl backdrop-blur-md">
             <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                     <div className="p-2 bg-slate-700 rounded-lg"><Thermometer className="w-5 h-5 text-white" /></div>
                     <span className="font-bold">Climate</span>
                 </div>
                 <button 
                    onClick={handleFanSpeed}
                    className="flex items-center gap-2 text-xs font-bold bg-slate-700 px-3 py-1.5 rounded-full text-slate-300 hover:bg-slate-600 transition"
                 >
                     <Fan className={`w-3 h-3 ${fanSpeed > 0 ? 'animate-spin' : ''}`} />
                     {fanSpeed === 0 ? 'OFF' : fanSpeed === 1 ? 'LOW' : fanSpeed === 2 ? 'MED' : 'HIGH'}
                 </button>
             </div>
             
             <div className="flex items-center justify-between">
                 <button 
                    onClick={() => handleTemp(-1)}
                    className="w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition active:scale-90"
                 >
                     <ChevronDown className="w-6 h-6" />
                 </button>
                 <div className="text-center">
                     <span className="text-5xl font-light block">{temp}°</span>
                     <span className="text-xs text-slate-400">Target Temp</span>
                 </div>
                 <button 
                    onClick={() => handleTemp(1)}
                    className="w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition active:scale-90"
                 >
                     <ChevronUp className="w-6 h-6" />
                 </button>
             </div>
         </div>

         {/* Room Automation */}
         <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-3xl backdrop-blur-md">
             <h3 className="font-bold mb-4">Automation</h3>
             
             {/* Lights */}
             <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-4">
                     <div className={`p-3 rounded-full ${lightsOn ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-700 text-slate-400'}`}>
                         <Sun className="w-6 h-6" />
                     </div>
                     <div>
                         <span className="block font-bold">Master Lights</span>
                         <span className="text-xs text-slate-400">{lightsOn ? '80% Brightness' : 'Off'}</span>
                     </div>
                 </div>
                 <div 
                    onClick={handleToggleLight}
                    className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors ${lightsOn ? 'bg-teal-500' : 'bg-slate-600'}`}
                 >
                     <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${lightsOn ? 'translate-x-6' : 'translate-x-0'}`}></div>
                 </div>
             </div>

             {/* Curtains */}
             <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                     <div className={`p-3 rounded-full ${curtainsOpen ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-700 text-slate-400'}`}>
                         <Blinds className="w-6 h-6" />
                     </div>
                     <div>
                         <span className="block font-bold">Smart Curtains</span>
                         <span className="text-xs text-slate-400">{curtainsOpen ? 'Open' : 'Closed'}</span>
                     </div>
                 </div>
                 <div 
                    onClick={handleCurtains}
                    className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors ${curtainsOpen ? 'bg-teal-500' : 'bg-slate-600'}`}
                 >
                     <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${curtainsOpen ? 'translate-x-6' : 'translate-x-0'}`}></div>
                 </div>
             </div>
         </div>

         {/* Mood Scenes */}
         <div className="grid grid-cols-3 gap-3">
             {[
                 { id: 'FOCUS', icon: <Sun className="w-5 h-5" />, label: 'Focus' },
                 { id: 'RELAX', icon: <Music className="w-5 h-5" />, label: 'Relax' },
                 { id: 'SLEEP', icon: <Moon className="w-5 h-5" />, label: 'Sleep' }
             ].map((scene) => (
                 <button
                    key={scene.id}
                    onClick={() => { setActiveScene(scene.id as any); sendCommand('LIGHTS', `SCENE_${scene.id}`); }}
                    className={`py-4 rounded-2xl flex flex-col items-center gap-2 transition border ${
                        activeScene === scene.id 
                        ? 'bg-slate-700 border-teal-500 text-teal-400' 
                        : 'bg-slate-800 border-transparent text-slate-400 hover:bg-slate-700'
                    }`}
                 >
                     {scene.icon}
                     <span className="text-xs font-bold">{scene.label}</span>
                 </button>
             ))}
         </div>

         {/* Floating Voice Button */}
         <div className="flex justify-center">
            <button 
                onClick={toggleVoice}
                className={`p-4 rounded-full shadow-lg transition-all ${
                    isListening ? 'bg-red-500 animate-pulse' : 'bg-teal-600 hover:bg-teal-500'
                }`}
            >
                <Mic className="w-6 h-6" />
            </button>
         </div>

         {/* Contactless Check-out */}
         <button 
           onClick={() => setShowCheckout(true)}
           className="w-full py-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 font-bold hover:bg-red-500 hover:text-white transition flex items-center justify-center gap-2"
         >
             <LogOut className="w-5 h-5" /> Express Check-out
         </button>

         {/* IoT Debug Console (For Demo/Hackathon) */}
         <div className="mt-8 border-t border-slate-800 pt-4">
             <div className="flex items-center gap-2 mb-2">
                 <Activity className="w-4 h-4 text-slate-500" />
                 <span className="text-xs font-mono text-slate-500 uppercase">IoT Network Stream</span>
             </div>
             <div ref={scrollRef} className="h-32 bg-black/50 rounded-lg p-3 overflow-y-auto font-mono text-[10px] space-y-1">
                 <div className="text-slate-500 italic">Connected to MQTT Broker: wss://iot.ecovoyage.com...</div>
                 {networkLogs.map(log => (
                     <div key={log.id} className="flex gap-2">
                         <span className="text-slate-500">[{log.time}]</span>
                         <span className={log.type === 'TX' ? 'text-blue-400' : 'text-green-400'}>{log.type} &gt;</span>
                         <span className="text-slate-300">{log.message}</span>
                     </div>
                 ))}
                 {isListening && (
                     <div className="flex gap-2">
                         <span className="text-slate-500">[NOW]</span>
                         <span className="text-purple-400">AUDIO &gt;</span>
                         <span className="text-slate-300 italic">Processing voice stream...</span>
                     </div>
                 )}
             </div>
         </div>

      </div>

      {/* QR Code Modal for Check-out */}
      {showCheckout && (
          <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
              <div className="bg-white text-slate-900 w-full max-w-sm rounded-3xl p-8 text-center">
                  <h3 className="text-2xl font-bold mb-2">Check-out Pass</h3>
                  <p className="text-slate-500 text-sm mb-6">Scan at the kiosk or gate to exit.</p>
                  
                  <div className="w-48 h-48 bg-slate-900 rounded-xl mx-auto mb-6 flex items-center justify-center shadow-inner">
                      <QrCode className="w-32 h-32 text-white" />
                  </div>
                  
                  <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 mb-6">
                      <Check className="w-4 h-4" /> Bill Paid: $1,330
                  </div>

                  <button 
                    onClick={() => { setShowCheckout(false); onNavigate(ViewState.TOURIST); }}
                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800"
                  >
                      Close & Return Home
                  </button>
              </div>
          </div>
      )}

    </div>
  );
};
