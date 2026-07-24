import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, X, MessageSquare, Loader2, Sparkles } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  showOptions?: boolean;
}

const QuantumAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: "Welcome to Deeps Systems. We are currently offline, but you can leave a message here or connect with us directly." }
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
        text: "We are currently offline. Please choose one of the direct channels below to securely dispatch your message to our team:",
        showOptions: true
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-center">
        {!isOpen && (
          <div className="mb-3 px-3 py-1.5 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-xl animate-bounce flex items-center gap-1.5 border border-emerald-500/50">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
            Leave a message
          </div>
        )}
        <button
          aria-label={isOpen ? "Close support chat" : "Open support chat"} onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full quantum-gradient shadow-[0_0_30px_rgba(5,150,105,0.4)] flex items-center justify-center text-white btn-cta-pulse active-click transition-all duration-300 group ring-4 ring-emerald-500/20 dark:ring-white/10"
        >
          {/* Pulsing outer ring */}
          {!isOpen && <span className="absolute inset-0 rounded-full quantum-gradient animate-ping-slow -z-10 opacity-60"></span>}

          {isOpen ? <X className="w-6 h-6" /> : (
            <>
              <MessageSquare className="w-6 h-6 group-hover:hidden" />
              <Sparkles className="w-6 h-6 hidden group-hover:block animate-pulse" />
            </>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[500px] bg-white dark:bg-[#0a0a0a] rounded-2xl shadow-2xl flex flex-col z-[60] border border-gray-100 dark:border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-white/10 flex items-center gap-3 bg-gray-50 dark:bg-white/5">
             <div className="w-8 h-8 rounded-lg quantum-gradient flex items-center justify-center shadow-lg">
                <MessageSquare className="w-4 h-4 text-white" />
             </div>
             <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">Deeps Offline Support</h3>
                <span className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                  Offline
                </span>
             </div>
             <button aria-label="Close chat" onClick={() => setIsOpen(false)} className="ml-auto text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:scale-110 active:scale-90 transition-all">
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
                  <p>{m.text}</p>
                  {m.showOptions && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10 flex flex-col gap-2 w-full">
                      <a
                        href={`mailto:wokman@dspng.tech?subject=Inquiry&body=${encodeURIComponent(messages[messages.length - 2]?.text || "")}`}
                        className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active-click"
                      >
                        Send via Email
                      </a>
                      <Link
                        to="/contact"
                        onClick={() => setIsOpen(false)}
                        className="w-full py-2.5 px-4 rounded-xl bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-800 dark:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active-click text-center"
                      >
                        Use Contact Form
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-slate-800/80 p-3 rounded-2xl rounded-bl-none border border-gray-200 dark:border-white/5 flex items-center gap-2 shadow-sm">
                  <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                  <span className="text-xs text-gray-600 italic">Processing...</span>
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
              className="flex-grow bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-all duration-300 placeholder:text-gray-600 dark:placeholder:text-slate-600"
            />
            <button 
              aria-label="Send message" onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="relative p-2 rounded-xl quantum-gradient text-white btn-cta-pulse active-click transition-all duration-300 disabled:opacity-50 disabled:grayscale disabled:scale-100 group shadow-md"
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
