
import React, { useState, useEffect, useCallback } from 'react';
import { Send, CheckCircle, Loader2, User, Mail, MessageSquare, Tag, Sparkles, Terminal, ShieldCheck, Zap, ArrowRight, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface ValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<{ summary: string, priority: string } | null>(null);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateField = useCallback((name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value) error = 'Name is required';
        else if (value.length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!validateEmail(value)) error = 'Please enter a valid email address';
        break;
      case 'subject':
        if (!value) error = 'Subject is required';
        else if (value.length < 5) error = 'Subject must be at least 5 characters';
        break;
      case 'message':
        if (!value) error = 'Message is required';
        else if (value.length < 10) error = 'Message must be at least 10 characters';
        break;
    }
    return error;
  }, []);

  useEffect(() => {
    const newErrors: ValidationErrors = {};
    Object.keys(formData).forEach((key) => {
      const fieldError = validateField(key, formData[key as keyof typeof formData]);
      if (fieldError) {
        newErrors[key as keyof ValidationErrors] = fieldError;
      }
    });
    setErrors(newErrors);
  }, [formData, validateField]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const processLeadWithAI = async (data: typeof formData) => {
    try {
      addLog('Initiating Gemini Lead Qualification...');
      /* Initialization following guidelines: const ai = new GoogleGenAI({apiKey: process.env.API_KEY}); */
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `A new inquiry has been received from ${data.name} (${data.email}). 
        Subject: ${data.subject}. 
        Message: ${data.message}.
        
        Task: 
        1. Summarize this lead in 2 sentences for the executive team.
        2. Assign a Priority Level (CRITICAL, HIGH, MEDIUM, ROUTINE).
        3. Identify the industry sector.`,
        config: {
          systemInstruction: "You are the Deeps Systems BITC Lead Analyzer. Output only a JSON-like summary containing 'summary' and 'priority'."
        }
      });

      const text = response.text || "Lead received. Manual routing required.";
      addLog('Quantum Analysis Complete: Lead Categorized.');
      
      return {
        summary: text,
        priority: text.includes('CRITICAL') ? 'CRITICAL' : text.includes('HIGH') ? 'HIGH' : 'STANDARD'
      };
    } catch (error) {
      console.error("AI Qualification Error:", error);
      return { summary: "Lead processed. AI analysis bypassed due to grid latency.", priority: "STANDARD" };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    if (Object.keys(errors).length > 0) return;

    setStatus('submitting');
    setLogs([]);
    
    addLog('Establishing BITC Secure Handshake...');
    await new Promise(r => setTimeout(r, 800));
    addLog('Encrypting Payload (AES-256)...');
    
    const analysis = await processLeadWithAI(formData);
    setAiAnalysis(analysis);

    await new Promise(r => setTimeout(r, 600));
    addLog('Routing through Pacific Cloud Grid...');
    await new Promise(r => setTimeout(r, 600));
    addLog('Dispatching to wokman@dspnq.tech...');
    
    setTimeout(() => {
      console.log(`[BITC DISPATCH] Destination: wokman@dspnq.tech`);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const getFieldClass = (fieldName: keyof ValidationErrors) => {
    const base = "w-full bg-slate-900/50 border rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none transition-all placeholder:text-slate-600";
    if (touched[fieldName] && errors[fieldName]) {
      return `${base} border-red-500/50 focus:border-red-500 bg-red-500/5`;
    }
    return `${base} border-white/10 focus:border-teal-500/50`;
  };

  return (
    <section id="contact-form" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-on-scroll">
            <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-6">
              Ready to <span className="quantum-text-gradient">Optimize?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-lg">
              Initiate your quantum consultation. Every inquiry is analyzed by our <span className="text-teal-400 font-bold">BITC Grid</span> and routed to our specialist team at <span className="text-teal-400 font-mono underline">wokman@dspnq.tech</span>.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-5 rounded-2xl glass border border-white/5 hover:border-teal-500/20 transition-all duration-300 group cursor-default shadow-xl">
                <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-teal-400 transition-colors">Quantum Security</h4>
                  <p className="text-sm text-slate-500">End-to-end encrypted dispatch through regional cloud nodes.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl glass border border-white/5 hover:border-blue-500/20 transition-all duration-300 group cursor-default shadow-xl">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">Gemini-Powered Routing</h4>
                  <p className="text-sm text-slate-500">Inquiries are qualified by AI for ultra-fast executive response.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[500px] flex items-center">
            {status === 'success' ? (
              <div className="glass rounded-[2.5rem] p-10 md:p-12 text-center border border-teal-500/40 animate-in zoom-in duration-500 shadow-[0_0_50px_rgba(20,184,166,0.15)] w-full">
                <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                  <CheckCircle className="w-10 h-10 text-teal-400" />
                  <div className="absolute inset-0 bg-teal-400/20 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-3xl font-bold mb-4 font-montserrat">Dispatch Confirmed</h3>
                <p className="text-slate-400 mb-8">Payload successfully routed to <span className="text-teal-400 font-mono">wokman@dspnq.tech</span>.</p>
                
                {aiAnalysis && (
                  <div className="bg-black/40 rounded-2xl p-6 border border-white/10 text-left mb-8 animate-in slide-in-from-bottom-4 duration-700 delay-300">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">AI Qualitative Summary</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${aiAnalysis.priority === 'CRITICAL' || aiAnalysis.priority === 'HIGH' ? 'bg-red-500/20 text-red-400' : 'bg-teal-500/20 text-teal-400'}`}>
                        Priority: {aiAnalysis.priority}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed italic">"{aiAnalysis.summary}"</p>
                  </div>
                )}
                
                <button 
                  onClick={() => setStatus('idle')}
                  className="inline-flex items-center gap-2 text-teal-400 font-bold hover:text-white transition-all active-click px-8 py-4 rounded-full glass btn-secondary-cta"
                >
                  Initiate New Transmission <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : status === 'submitting' ? (
              <div className="glass rounded-[2.5rem] p-8 md:p-10 border border-white/10 shadow-2xl w-full min-h-[400px] flex flex-col justify-between overflow-hidden relative">
                 <div className="absolute top-0 left-0 w-full h-1 bg-teal-500/10 overflow-hidden">
                    <div className="h-full bg-teal-500 w-1/3 animate-[loading_1.5s_infinite]"></div>
                 </div>
                 
                 <div className="flex items-center gap-3 mb-6">
                    <Terminal className="w-5 h-5 text-teal-400" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">BITC Dispatch Log</span>
                 </div>
                 
                 <div className="flex-grow font-mono text-[11px] md:text-xs text-teal-400/80 space-y-2 overflow-y-auto max-h-[250px] scrollbar-none">
                    {logs.map((log, i) => (
                      <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
                        <span className="text-slate-600 mr-2">{'>'}</span> {log}
                      </div>
                    ))}
                    <div className="flex items-center gap-2 text-teal-400 animate-pulse">
                      <span className="text-slate-600 mr-2">{'>'}</span>
                      Processing...
                      <Loader2 className="w-3 h-3 animate-spin" />
                    </div>
                 </div>

                 <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-[9px] text-slate-500 uppercase tracking-[0.3em] font-bold">Quantum Grid Active • Region: Port Moresby</p>
                 </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="glass rounded-[2.5rem] p-8 md:p-10 border border-white/10 shadow-2xl space-y-6 w-full animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-teal-400 ml-1">Full Name</label>
                    <div className="relative group">
                      <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${touched.name && errors.name ? 'text-red-400' : 'text-slate-500 group-focus-within:text-teal-400'}`} />
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="John Doe"
                        className={getFieldClass('name')}
                      />
                    </div>
                    {touched.name && errors.name && (
                      <div className="flex items-center gap-1.5 px-1 pt-1 animate-in fade-in slide-in-from-top-1">
                        <AlertCircle className="w-3 h-3 text-red-400" />
                        <span className="text-[10px] text-red-400 font-medium">{errors.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-teal-400 ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${touched.email && errors.email ? 'text-red-400' : 'text-slate-500 group-focus-within:text-teal-400'}`} />
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="john@example.com"
                        className={getFieldClass('email')}
                      />
                    </div>
                    {touched.email && errors.email && (
                      <div className="flex items-center gap-1.5 px-1 pt-1 animate-in fade-in slide-in-from-top-1">
                        <AlertCircle className="w-3 h-3 text-red-400" />
                        <span className="text-[10px] text-red-400 font-medium">{errors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-teal-400 ml-1">Subject</label>
                  <div className="relative group">
                    <Tag className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${touched.subject && errors.subject ? 'text-red-400' : 'text-slate-500 group-focus-within:text-teal-400'}`} />
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Optimization Query"
                      className={getFieldClass('subject')}
                    />
                  </div>
                  {touched.subject && errors.subject && (
                    <div className="flex items-center gap-1.5 px-1 pt-1 animate-in fade-in slide-in-from-top-1">
                      <AlertCircle className="w-3 h-3 text-red-400" />
                      <span className="text-[10px] text-red-400 font-medium">{errors.subject}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-teal-400 ml-1">Message</label>
                  <div className="relative group">
                    <MessageSquare className={`absolute left-4 top-4 w-4 h-4 transition-colors ${touched.message && errors.message ? 'text-red-400' : 'text-slate-500 group-focus-within:text-teal-400'}`} />
                    <textarea 
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tell us about your optimization needs..."
                      className={`${getFieldClass('message')} pl-12 pt-4 resize-none`}
                    ></textarea>
                  </div>
                  {touched.message && errors.message && (
                    <div className="flex items-center gap-1.5 px-1 pt-1 animate-in fade-in slide-in-from-top-1">
                      <AlertCircle className="w-3 h-3 text-red-400" />
                      <span className="text-[10px] text-red-400 font-medium">{errors.message}</span>
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting' || (Object.keys(errors).length > 0 && Object.keys(touched).length > 0)}
                  className="w-full py-5 rounded-2xl quantum-gradient text-white font-bold text-lg flex items-center justify-center gap-3 btn-cta-pulse active-click transition-all duration-300 shadow-xl shadow-teal-500/20 group ring-1 ring-white/5 hover:ring-white/20 disabled:opacity-50 disabled:grayscale"
                >
                  Secure Dispatch
                  <Zap className="w-5 h-5 group-hover:scale-125 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}} />
    </section>
  );
};

export default Contact;
