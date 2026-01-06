
import React, { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Compass, Info, Move, Glasses, Smartphone } from 'lucide-react';

interface Hotspot {
  id: string;
  yaw: number; // Horizontal angle (0-360)
  pitch: number; // Vertical angle (-90 to 90)
  label: string;
  description: string;
}

interface Props {
  image: string;
  hotspots?: Hotspot[];
  onClose: () => void;
}

export const EcoView360: React.FC<Props> = ({ image, hotspots = [], onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isVRMode, setIsVRMode] = useState(false); // New VR Mode state
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotation effect when idle (only in normal mode)
  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      if (!isDragging && !activeHotspot && !isVRMode) {
        setYaw(prev => (prev + 0.05) % 360);
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isDragging, activeHotspot, isVRMode]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    setYaw(prev => prev - deltaX * 0.15);
    setPitch(prev => Math.max(-60, Math.min(60, prev + deltaY * 0.15))); 

    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseUp = () => setIsDragging(false);

  // Helper to render a single view (used twice for VR mode)
  const renderView = (isLeftEye: boolean = false) => {
    // Offset yaw slightly for stereoscopic effect in VR mode
    const eyeYawOffset = isVRMode ? (isLeftEye ? -2 : 2) : 0;
    const currentYaw = yaw + eyeYawOffset;

    return (
      <div 
        className="relative w-full h-full overflow-hidden"
        onMouseDown={!isVRMode ? handleMouseDown : undefined}
        onMouseMove={!isVRMode ? handleMouseMove : undefined}
        onMouseUp={!isVRMode ? handleMouseUp : undefined}
        onMouseLeave={!isVRMode ? handleMouseUp : undefined}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* The 360 Image Layer */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-75 ease-out will-change-transform"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: `${currentYaw * 5}px ${50 + pitch}%`, 
            transform: `scale(${isVRMode ? 1.2 : zoom + 0.2})`, 
          }}
        />

        {/* Hotspots Layer */}
        {hotspots.map(spot => {
            // Projection logic
            let relYaw = (spot.yaw - yaw) % 360;
            if (relYaw < -180) relYaw += 360;
            if (relYaw > 180) relYaw -= 360;

            const isVisible = Math.abs(relYaw) < (isVRMode ? 45 : 60);

            if (!isVisible) return null;

            return (
                <div 
                    key={spot.id}
                    className="absolute flex flex-col items-center justify-center transition-all duration-300"
                    style={{
                        left: `calc(50% + ${relYaw * (isVRMode ? 8 : 10)}px)`,
                        top: `calc(50% + ${(spot.pitch - pitch) * 10}px)`,
                        transform: `scale(${zoom})`
                    }}
                >
                    <button 
                        onClick={(e) => { e.stopPropagation(); setActiveHotspot(activeHotspot === spot.id ? null : spot.id); }}
                        className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-lg transition-all ${
                            activeHotspot === spot.id ? 'bg-white text-emerald-600' : 'bg-emerald-500/80 text-white hover:bg-emerald-500'
                        }`}
                    >
                        {activeHotspot === spot.id ? <X className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                    </button>

                    {activeHotspot === spot.id && !isVRMode && (
                        <div className="mt-4 w-64 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-2xl animate-fade-in-up text-left pointer-events-auto cursor-auto z-50">
                            <h4 className="font-bold text-slate-900 text-sm mb-1">{spot.label}</h4>
                            <p className="text-xs text-slate-600">{spot.description}</p>
                        </div>
                    )}
                </div>
            );
        })}
        
        {/* VR Eye Crosshair */}
        {isVRMode && (
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full opacity-50 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden animate-fade-in">
      
      {/* Viewer Container */}
      <div ref={containerRef} className="relative w-full h-full cursor-move flex">
        {isVRMode ? (
            // VR Split Screen
            <>
                <div className="w-1/2 h-full border-r-2 border-black relative">
                    {renderView(true)}
                </div>
                <div className="w-1/2 h-full relative">
                    {renderView(false)}
                </div>
                {/* VR Warning / Instructions */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-xs font-bold pointer-events-none">
                    Place in Cardboard Viewer
                </div>
            </>
        ) : (
            renderView()
        )}
      </div>

      {/* HUD Controls (Hidden in VR Mode usually, but kept for toggling back) */}
      <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white z-50">
          <Compass className="w-5 h-5 text-emerald-400 animate-pulse" />
          <span className="font-mono text-sm">EcoLens 360™</span>
          <div className="h-4 w-px bg-white/20"></div>
          <span className="text-xs text-white/70">
              {Math.abs(Math.round(yaw % 360))}°
          </span>
      </div>

      <div className="absolute top-6 right-6 z-50 flex gap-3">
          <button 
            onClick={() => setIsVRMode(!isVRMode)}
            className={`p-3 rounded-full text-white backdrop-blur-md transition border border-white/10 ${
                isVRMode ? 'bg-emerald-600 border-emerald-500' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
              {isVRMode ? <Smartphone className="w-6 h-6" /> : <Glasses className="w-6 h-6" />}
          </button>
          <button onClick={onClose} className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition border border-white/10">
              <X className="w-6 h-6" />
          </button>
      </div>

      {!isVRMode && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 text-white z-50 shadow-2xl">
              <button 
                onClick={() => setZoom(z => Math.max(0.8, z - 0.2))}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                  <ZoomOut className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 px-2">
                  <Move className="w-4 h-4 text-white/50" />
                  <span className="text-xs font-medium text-white/80 uppercase tracking-wider">Drag to Look</span>
              </div>
              <button 
                onClick={() => setZoom(z => Math.min(2.0, z + 0.2))}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                  <ZoomIn className="w-5 h-5" />
              </button>
          </div>
      )}
    </div>
  );
};
