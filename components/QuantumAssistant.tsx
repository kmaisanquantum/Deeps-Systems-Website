
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, MessageSquare, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const QuantumAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([
    { role: 'assistant', text: "Welcome to Deeps Systems. I am your Quantum Optimization Assistant. How can I help you transform your business with Born-in-the-Cloud technology today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      /* Initialization following guidelines: const ai = new GoogleGenAI({apiKey: process.env.API_KEY}); */
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are the Deeps Systems AI Assistant. 
          Company Name: Deeps Systems. 
          Domain: dspng.tech. 
          Core focus: Born-in-the-Cloud (BITC), Quantum-Inspired Optimization. 
          Target: PNG SMEs, Financial Institutions, Energy/Logistics. 
          Values: Agile, Cloud-native, Outcome-driven, High-tech. 
          Keep your answers professional, forward-thinking, and helpful. 
          Highlight that we bring global muscle to local PNG problems.`
        }
      });

      const aiText = response.text || "I apologize, I'm having trouble connecting to the quantum grid. Please try again later.";
      setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: "Connection interruption. Please check your network or try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full quantum-gradient shadow-2xl flex items-center justify-center text-white z-[60] btn-cta-pulse active-click transition-all duration-300 group"
      >
        {isOpen ? <X className="w-6 h-6" /> : (
          <>
            <MessageSquare className="w-6 h-6 group-hover:hidden" />
            <Sparkles className="w-6 h-6 hidden group-hover:block animate-pulse" />
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[500px] glass rounded-2xl shadow-2xl flex flex-col z-[60] border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-white/5">
             <div className="w-8 h-8 rounded-lg quantum-gradient flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
             </div>
             <div>
                <h3 className="font-bold text-sm">Quantum Assistant</h3>
                <span className="flex items-center gap-1.5 text-[10px] text-teal-400 font-bold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                  Online
                </span>
             </div>
             <button onClick={() => setIsOpen(false)} className="ml-auto text-slate-400 hover:text-white hover:scale-110 active:scale-90 transition-all">
                <X className="w-4 h-4" />
             </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm transition-all duration-300 hover:brightness-105 ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-500/10' 
                    : 'bg-slate-800/80 text-slate-200 rounded-bl-none border border-white/5 shadow-md shadow-black/20'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800/80 p-3 rounded-2xl rounded-bl-none border border-white/5 flex items-center gap-2 shadow-md">
                  <Loader2 className="w-4 h-4 text-teal-400 animate-spin" />
                  <span className="text-xs text-slate-400 italic">Processing...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-white/10 flex gap-2 bg-white/5">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about BITC..."
              className="flex-grow bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-500 transition-all duration-300 placeholder:text-slate-600 focus:shadow-[0_0_15px_rgba(20,184,166,0.15)]"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-xl quantum-gradient text-white btn-cta-pulse active-click transition-all duration-300 disabled:opacity-50 disabled:grayscale disabled:scale-100 group shadow-md"
            >
              <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuantumAssistant;
