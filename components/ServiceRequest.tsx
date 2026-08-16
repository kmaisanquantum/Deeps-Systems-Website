import React, { useState } from 'react';
import {
  Send,
  Mail,
  User,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Zap,
  Terminal,
  Loader2,
  AlertCircle,
  Tag,
  FileText,
  LifeBuoy
} from 'lucide-react';
import { getApiUrl } from '../utils/api';

interface FormData {
  name: string;
  email: string;
  reference: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ServiceRequest: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    reference: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : '';
      case 'subject':
        return value.trim().length < 4 ? 'Subject must be at least 4 characters' : '';
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    ['name', 'email', 'subject', 'message'].forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, subject: true, message: true });
      return;
    }

    setStatus('submitting');
    setSubmitError(null);
    setLogs([]);
    addLog("Initializing after-sales support connection...");

    await new Promise(r => setTimeout(r, 400));
    addLog("Preparing support request payload...");
    await new Promise(r => setTimeout(r, 400));
    addLog("Routing to Service & Support queue...");
    await new Promise(r => setTimeout(r, 500));

    try {
      const response = await fetch(getApiUrl('/api/inquiries'), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          type: "service",
          name: formData.name,
          email: formData.email,
          reference: formData.reference,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        addLog("Support request submitted successfully.");
        await new Promise(r => setTimeout(r, 400));
        setStatus('success');
      } else {
        let errMsg = "Server returned error status.";
        try {
          const errData = await response.json();
          if (errData && errData.error) {
            errMsg = errData.error;
          }
        } catch (_) {}
        addLog(`Support request failed: ${errMsg}`);
        setSubmitError(errMsg);
        await new Promise(r => setTimeout(r, 600));
        setStatus('error');
      }
    } catch (error) {
      const connectionError = "Network connection failed. Please verify your connection.";
      addLog(`Request aborted: ${connectionError}`);
      setSubmitError(connectionError);
      await new Promise(r => setTimeout(r, 600));
      setStatus('error');
    }
  };

  const getFieldClass = (name: string) => {
    const base = "w-full bg-white dark:bg-white/5 border rounded-2xl px-12 py-4 text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all duration-300";
    if (touched[name] && errors[name as keyof FormErrors]) {
      return `${base} border-emerald-500/50 focus:ring-emerald-500/20`;
    }
    return `${base} border-gray-200 dark:border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20`;
  };

  return (
    <section id="service-support" className="py-24 relative overflow-hidden bg-white dark:bg-[#0a0a0a]">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/[0.02] dark:bg-emerald-500/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gray-100/50 dark:bg-emerald-500/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
              <LifeBuoy className="w-3.5 h-3.5" />
              After-Sales Support
            </div>

            <h2 className="text-4xl md:text-6xl font-montserrat font-bold mb-8 leading-tight text-gray-900 dark:text-white">
              Report an Issue or <span className="quantum-text-gradient">Claim Warranty</span>
            </h2>

            <p className="text-xl text-gray-600 dark:text-slate-300 mb-12 leading-relaxed max-w-xl font-medium">
              Have an issue with a product or service you purchased? Our technical engineering team is here to help resolve fault reports, warranty claims, and service inquiries.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <a href="mailto:service@dspng.tech" className="flex items-center gap-6 group">
                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 group-hover:border-emerald-500/30 transition-all shadow-sm">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-600 dark:text-slate-400 uppercase tracking-widest mb-1">Service & Support Channel</p>
                    <p className="text-gray-900 dark:text-white font-bold font-mono">service@dspng.tech</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
            {status === 'success' ? (
              <div className="bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] p-12 border border-emerald-500/20 shadow-2xl text-center animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                  <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-3xl font-bold mb-4 font-montserrat text-gray-900 dark:text-white">Support Ticket Submitted</h3>
                <p className="text-gray-600 dark:text-slate-300 mb-8">Your support request has been securely stored in our database and routed to our after-sales service team.</p>

                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData({ name: '', email: '', reference: '', subject: '', message: '' });
                  }}
                  className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-all active-click px-8 py-4 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm"
                >
                  Submit Another Support Request <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : status === 'submitting' ? (
              <div className="bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-white/10 shadow-2xl w-full min-h-[400px] flex flex-col justify-between overflow-hidden relative">
                 <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/10 overflow-hidden">
                    <div className="h-full bg-emerald-600 w-1/3 animate-[loading_1.5s_infinite]"></div>
                 </div>

                 <div className="flex items-center gap-3 mb-6">
                    <Terminal className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs font-bold text-gray-600 dark:text-slate-300 uppercase tracking-widest">Support Dispatch Log</span>
                 </div>

                 <div className="flex-grow font-mono text-xs text-emerald-600/80 space-y-2 overflow-y-auto max-h-[250px] scrollbar-none">
                    {logs.map((log, i) => (
                      <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
                        <span className="text-gray-300 dark:text-slate-600 mr-2">{'>'}</span> {log}
                      </div>
                    ))}
                    <div className="flex items-center gap-2 text-emerald-600 animate-pulse">
                      <span className="text-gray-300 dark:text-slate-600 mr-2">{'>'}</span>
                      Processing...
                      <Loader2 className="w-3 h-3 animate-spin" />
                    </div>
                 </div>

                 <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 text-center">
                    <p className="text-[9px] text-gray-600 dark:text-slate-400 uppercase tracking-[0.3em] font-bold">Service Queue Active • Region: Port Moresby</p>
                 </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-white/10 shadow-2xl space-y-6 w-full animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-emerald-600 ml-1">Full Name</label>
                    <div className="relative group">
                      <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${touched.name && errors.name ? 'text-emerald-500' : 'text-gray-600 dark:text-slate-400 group-focus-within:text-emerald-600'}`} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-label="Full Name" placeholder="John Doe"
                        className={getFieldClass('name')}
                      />
                    </div>
                    {touched.name && errors.name && (
                      <div className="flex items-center gap-1.5 px-1 pt-1 animate-in fade-in slide-in-from-top-1">
                        <AlertCircle className="w-3 h-3 text-emerald-500" />
                        <span className="text-xs text-emerald-500 font-medium">{errors.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-emerald-600 ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${touched.email && errors.email ? 'text-emerald-500' : 'text-gray-600 dark:text-slate-400 group-focus-within:text-emerald-600'}`} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-label="Email Address" placeholder="john@example.com"
                        className={getFieldClass('email')}
                      />
                    </div>
                    {touched.email && errors.email && (
                      <div className="flex items-center gap-1.5 px-1 pt-1 animate-in fade-in slide-in-from-top-1">
                        <AlertCircle className="w-3 h-3 text-emerald-500" />
                        <span className="text-xs text-emerald-500 font-medium">{errors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-emerald-600 ml-1">Order / Reference # (optional)</label>
                  <div className="relative group">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 dark:text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                    <input
                      type="text"
                      name="reference"
                      value={formData.reference}
                      onChange={handleChange}
                      aria-label="Order or Reference Number" placeholder="e.g. Order #1042 or Invoice REF-881"
                      className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-12 py-4 text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-emerald-600 ml-1">Issue Summary</label>
                  <div className="relative group">
                    <Tag className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${touched.subject && errors.subject ? 'text-emerald-500' : 'text-gray-600 dark:text-slate-400 group-focus-within:text-emerald-600'}`} />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-label="Issue Summary" placeholder="e.g. Starlink Mini Dish Fault / Warranty Inquiry"
                      className={getFieldClass('subject')}
                    />
                  </div>
                  {touched.subject && errors.subject && (
                    <div className="flex items-center gap-1.5 px-1 pt-1 animate-in fade-in slide-in-from-top-1">
                      <AlertCircle className="w-3 h-3 text-emerald-500" />
                      <span className="text-xs text-emerald-500 font-medium">{errors.subject}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-emerald-600 ml-1">Problem Description</label>
                  <div className="relative group">
                    <MessageSquare className={`absolute left-4 top-4 w-4 h-4 transition-colors ${touched.message && errors.message ? 'text-emerald-500' : 'text-gray-600 dark:text-slate-400 group-focus-within:text-emerald-600'}`} />
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-label="Problem Description" placeholder="Describe the issue or assistance required with your purchase..."
                      className={`${getFieldClass('message')} pl-12 pt-4 resize-none`}
                    ></textarea>
                  </div>
                  {touched.message && errors.message && (
                    <div className="flex items-center gap-1.5 px-1 pt-1 animate-in fade-in slide-in-from-top-1">
                      <AlertCircle className="w-3 h-3 text-emerald-500" />
                      <span className="text-xs text-emerald-500 font-medium">{errors.message}</span>
                    </div>
                  )}
                </div>

                {status === 'error' && (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-semibold">
                      Failed to submit support request: {submitError || "Unknown connection error."} Please check your connection or email us directly at service@dspng.tech.
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting' || Object.values(errors).some(error => error)}
                  className="w-full py-5 rounded-2xl quantum-gradient text-white font-bold text-lg flex items-center justify-center gap-3 relative btn-cta-pulse active-click transition-all duration-300 shadow-xl shadow-emerald-500/20 group disabled:opacity-50 disabled:grayscale"
                >
                  Submit Support Ticket
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

export default ServiceRequest;
