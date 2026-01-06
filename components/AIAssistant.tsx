import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Languages, MapPin, Loader2 } from 'lucide-react';
import { chatWithAI } from '../services/geminiService';
import { ViewState } from '../types';

interface Props {
  currentView?: ViewState;
}

export const AIAssistant: React.FC<Props> = ({ currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hi! I\'m your EcoVoyage assistant. I can help with itineraries, translations, or finding local gems.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Effect to trigger proactive help when view changes
  useEffect(() => {
    if (isOpen && currentView) {
      // Optional: Add a subtle system message when navigating (commented out to avoid spamming)
      // setMessages(prev => [...prev, { role: 'ai', text: `I see you're on the ${currentView} page. How can I help?` }]);
    }
  }, [currentView, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    const context = `User is currently on the ${currentView || 'Home'} screen.`;
    const response = await chatWithAI(userMsg, context);
    
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setIsLoading(false);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-fade-in-up h-[500px]">
          {/* Header */}
          <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-teal-500 rounded-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">EcoVoyage AI</h3>
                <p className="text-[10px] text-slate-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-teal-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl p-3 rounded-bl-none shadow-sm flex items-center gap-2">
                   <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                   <span className="text-xs text-slate-500">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length < 3 && (
            <div className="px-4 py-2 bg-slate-50 flex gap-2 overflow-x-auto">
               <button onClick={() => handleQuickPrompt("Translate 'Thank you' to Japanese")} className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600 whitespace-nowrap hover:bg-slate-100">
                  <Languages className="w-3 h-3" /> Translate
               </button>
               <button onClick={() => handleQuickPrompt("Find vegan food nearby")} className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600 whitespace-nowrap hover:bg-slate-100">
                  <MapPin className="w-3 h-3" /> Local Food
               </button>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-slate-100 text-slate-900 text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="p-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
        </span>
      </button>
    </div>
  );
};