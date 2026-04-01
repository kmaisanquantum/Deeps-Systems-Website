import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, Loader2, Sparkles } from 'lucide-react';

const QuantumAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([
    { role: 'assistant', text: "Welcome to Deeps Systems. How can we help you today?" }
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

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: "Thank you for your message. A member of our support team will get back to you shortly. For immediate assistance, please use the contact form or email us at wokman@dspng.tech."
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        aria-label={isOpen ? "Close support chat" : "Open support chat"} onClick={() => setIsOpen(!isOpen)}
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
        <div className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[500px] bg-white dark:bg-[#0a0a0a] rounded-2xl shadow-2xl flex flex-col z-[60] border border-gray-100 dark:border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-white/10 flex items-center gap-3 bg-gray-50 dark:bg-white/5">
             <div className="w-8 h-8 rounded-lg quantum-gradient flex items-center justify-center shadow-lg">
                <MessageSquare className="w-4 h-4 text-white" />
             </div>
             <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">Deeps Support</h3>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  Online
                </span>
             </div>
             <button aria-label="Close chat" onClick={() => setIsOpen(false)} className="ml-auto text-gray-400 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:scale-110 active:scale-90 transition-all">
                <X className="w-4 h-4" />
             </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm transition-all duration-300 hover:brightness-105 ${
                  m.role === 'user' 
                    ? 'bg-blue-600 dark:bg-blue-700 text-white rounded-br-none shadow-md'
                    : 'bg-gray-100 dark:bg-slate-800/80 text-gray-700 dark:text-slate-200 rounded-bl-none border border-gray-200 dark:border-white/5 shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-slate-800/80 p-3 rounded-2xl rounded-bl-none border border-gray-200 dark:border-white/5 flex items-center gap-2 shadow-sm">
                  <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                  <span className="text-xs text-gray-400 italic">Processing...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-gray-100 dark:border-white/10 flex gap-2 bg-gray-50 dark:bg-white/5">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              aria-label="Message for support" placeholder="How can we help?"
              className="flex-grow bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-slate-600"
            />
            <button 
              aria-label="Send message" onClick={handleSend}
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
