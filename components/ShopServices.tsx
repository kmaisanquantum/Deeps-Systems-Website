import React, { useState } from 'react';
import {
  Shield,
  Cloud,
  Zap,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Mail,
  Send,
  Loader2
} from 'lucide-react';

const ShopServices: React.FC = () => {
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const categories = [
    {
      id: "shop-infra",
      title: "Infrastructure & Security",
      icon: <Shield className="w-6 h-6" />,
      price: "K 1,500",
      services: [
        { name: "Secure Office Setup", features: ["Zero-Trust Networking", "Encrypted Backups", "Managed Firewall"] },
        { name: "Cloud Migration", features: ["Legacy-to-Cloud Move", "Minimal Downtime", "Cost Optimization"] },
        { name: "Security Audit", features: ["Vulnerability Scan", "Compliance Check", "Remediation Roadmap"] }
      ]
    },
    {
      id: "shop-saas",
      title: "Cloud Platforms / SaaS",
      icon: <Cloud className="w-6 h-6" />,
      price: "K 2,500",
      services: [
        { name: "PNG Property Portal", features: ["Real Estate Aggregation", "Market Insights", "Lead Management"] },
        { name: "Our Finance SaaS", features: ["Automated Invoicing", "Expense Tracking", "Local Tax Compliance"] },
        { name: "Agri-Traceability", features: ["Supply Chain Visibility", "Farmer Management", "Export Compliance"] }
      ]
    },
    {
      id: "shop-automation",
      title: "Workflow Automation",
      icon: <Zap className="w-6 h-6" />,
      price: "K 3,000",
      services: [
        { name: "Form-to-DB Logic", features: ["Data Capture Automation", "Custom Dashboards", "API Integration"] },
        { name: "Legal Workflows", features: ["Document Management", "Case Tracking", "E-Signatures"] },
        { name: "Financial Recon", features: ["Bank Statement Matching", "Automated Ledgers", "Audit Ready Reports"] }
      ]
    },
    {
      id: "shop-advisory",
      title: "Strategic Advisory",
      icon: <Lightbulb className="w-6 h-6" />,
      price: "K 800",
      services: [
        { name: "Strategy Sessions", features: ["Digital Maturity Assessment", "Innovation Workshop", "Growth Framework"] },
        { name: "ICT Roadmaps", features: ["5-Year Tech Vision", "Budget Planning", "Vendor Selection"] },
        { name: "Quantum Consulting", features: ["Optimization Algorithms", "Complexity Mapping", "Future-Proof Logic"] }
      ]
    }
  ];

  const handleRequestService = (serviceName: string) => {
    setSelectedService(serviceName);
    const formElement = document.getElementById('inquiry-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.business.trim() || !selectedService || !formData.message.trim()) {
      setSubmitError("All fields are required.");
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setSubmitError(null);

    const apiUrl = import.meta.env.DEV
      ? 'http://localhost:3001/api/inquiries'
      : '/api/inquiries';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          type: 'shop',
          name: formData.name,
          business: formData.business,
          service: selectedService,
          message: formData.message
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', business: '', message: '' });
        setSelectedService('');
      } else {
        let errMsg = "Server returned error status.";
        try {
          const errData = await response.json();
          if (errData && errData.error) {
            errMsg = errData.error;
          }
        } catch (_) {}
        setSubmitError(errMsg);
        setStatus('error');
      }
    } catch (err) {
      setSubmitError("Network connection failed. Please verify your connection.");
      setStatus('error');
    }
  };

  return (
    <section id="shop-services" className="py-24 bg-gray-950 text-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-montserrat font-black mb-6 uppercase tracking-tight">
            Shop & <span className="text-emerald-500">Services</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">
            Productized IT 'Sachet' services designed for the PNG market. Sourced for reliability, configured for performance.
          </p>
        </div>

        {/* Categories & Pricing Grid */}
        <div className="space-y-24">
          {categories.map((category, catIdx) => (
            <div key={catIdx} id={category.id} className="scroll-mt-32 space-y-10 outline-none">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-emerald-500">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-widest">{category.title}</h3>
                  <p className="text-emerald-500 font-black">From {category.price}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {category.services.map((service, srvIdx) => (
                  <div
                    key={srvIdx}
                    className="group p-8 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 hover:border-emerald-500/50 transition-all duration-500 hover:bg-white/10 flex flex-col shadow-2xl"
                  >
                    <h4 className="text-xl font-bold mb-6 group-hover:text-emerald-400 transition-colors">{service.name}</h4>
                    <ul className="space-y-4 mb-10 flex-grow">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-400">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleRequestService(service.name)}
                      className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm uppercase tracking-widest hover:bg-emerald-600 hover:border-emerald-500 transition-all flex items-center justify-center gap-2 group/btn active-click"
                    >
                      Request Service
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact & Inquiry Form */}
        <div id="inquiry-form" className="mt-32 max-w-4xl mx-auto scroll-mt-32">
          <div className="p-8 md:p-16 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
             {/* Form Decoration */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -z-10"></div>

             {status === 'success' ? (
               <div className="text-center py-12 animate-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
                  </div>
                  <h3 className="text-3xl font-montserrat font-black uppercase mb-4">Inquiry Received</h3>
                  <p className="text-slate-300 mb-8 max-w-md mx-auto">Your service inquiry has been securely stored in our database and routed to <span className="text-emerald-500 font-mono">wokman@dspng.tech</span>.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 transition-all text-white font-bold text-sm uppercase tracking-wider active-click"
                  >
                    Submit Another Inquiry
                  </button>
               </div>
             ) : (
               <>
                 <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
                    <div className="p-6 rounded-[2rem] bg-emerald-600/20 border border-emerald-500/30 text-emerald-500">
                       <Mail className="w-12 h-12" />
                    </div>
                    <div className="text-center md:text-left">
                       <h3 className="text-3xl font-montserrat font-black uppercase mb-2">Service Inquiry</h3>
                       <p className="text-slate-400 font-medium">Ready to transform? Send us your requirements.</p>
                    </div>
                 </div>

                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-4">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. John Doe"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500/50 transition-all text-white font-medium"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-4">Business Name</label>
                          <input
                            type="text"
                            name="business"
                            required
                            value={formData.business}
                            onChange={handleInputChange}
                            placeholder="e.g. PNG Enterprises"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500/50 transition-all text-white font-medium"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-4">Selected Service</label>
                       <select
                         name="service"
                         value={selectedService}
                         onChange={(e) => setSelectedService(e.target.value)}
                         className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500/50 transition-all text-white font-medium appearance-none"
                       >
                          <option value="" disabled className="bg-gray-900">Choose a service</option>
                          {categories.flatMap(cat => cat.services).map(srv => (
                            <option key={srv.name} value={srv.name} className="bg-gray-900">{srv.name}</option>
                          ))}
                       </select>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-4">Message</label>
                       <textarea
                         name="message"
                         rows={5}
                         required
                         value={formData.message}
                         onChange={handleInputChange}
                         placeholder="Tell us about your requirements..."
                         className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 outline-none focus:border-emerald-500/50 transition-all text-white font-medium resize-none"
                       ></textarea>
                    </div>

                    {status === 'error' && (
                      <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold flex items-center gap-3 animate-in fade-in duration-300">
                        Failed to submit inquiry: {submitError || "Unknown connection error."} Please complete all fields and verify your network, or email us at wokman@dspng.tech.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-5 rounded-2xl bg-emerald-600 text-white font-black text-lg uppercase tracking-widest shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:bg-emerald-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-3 active-click disabled:opacity-50"
                    >
                      {status === 'submitting' ? (
                        <>
                          Submitting...
                          <Loader2 className="w-5 h-5 animate-spin" />
                        </>
                      ) : (
                        <>
                          Submit Inquiry
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                 </form>
               </>
             )}

             <p className="text-center mt-10 text-slate-500 text-xs font-medium">
                Alternatively, email us directly at <a href="mailto:wokman@dspng.tech" className="text-emerald-500 hover:underline">wokman@dspng.tech</a>
             </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopServices;
