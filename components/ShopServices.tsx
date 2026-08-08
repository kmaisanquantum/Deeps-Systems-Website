import React, { useState } from 'react';
import {
  Monitor,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Mail,
  Send,
  Loader2,
  Plus,
  Minus,
  ShoppingCart
} from 'lucide-react';
import { useCart } from './CartContext';
import { getApiUrl } from '../utils/api';

const ShopServices: React.FC = () => {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Quantities & visual feedback states per product id
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedFeedback, setAddedFeedback] = useState<Record<string, boolean>>({});

  // TODO: confirm real pricing with the site owner before final production release.
  const categories = [
    {
      id: "shop-microsoft",
      title: "Microsoft Office Applications",
      icon: <Monitor className="w-6 h-6" />,
      pricing_label: "Reseller Licenses — Pricing in PGK",
      services: [
        {
          id: "m365-basic",
          name: "Microsoft 365 Business Basic",
          price: 25.00, // TODO: confirm real pricing
          billing: "/ month",
          features: [
            "Web and mobile apps of Office",
            "Teams, Exchange, OneDrive (1 TB)",
            "Basic cloud security & compliance",
            "Professional business email included"
          ]
        },
        {
          id: "m365-standard",
          name: "Microsoft 365 Business Standard",
          price: 55.00, // TODO: confirm real pricing
          billing: "/ month",
          features: [
            "Premium desktop apps of Office",
            "Webinars with attendee registration",
            "1 TB secure cloud storage per user",
            "Advanced Teams collaboration features"
          ]
        },
        {
          id: "m365-premium",
          name: "Microsoft 365 Business Premium",
          price: 95.00, // TODO: confirm real pricing
          billing: "/ month",
          features: [
            "Advanced cyberthreat protection",
            "Comprehensive mobile device management",
            "Secure remote access with Intune",
            "Everything in Business Standard included"
          ]
        },
        {
          id: "m365-apps",
          name: "Microsoft 365 Apps for Business",
          price: 40.00, // TODO: confirm real pricing
          billing: "/ month",
          features: [
            "Desktop apps (Word, Excel, PPT, etc.)",
            "1 TB secure OneDrive storage per user",
            "Covers 5 phones, tablets, and PCs/user",
            "Does not include professional email"
          ]
        }
      ]
    },
    {
      id: "shop-starlink",
      title: "Starlink Kits",
      icon: <Rocket className="w-6 h-6" />,
      pricing_label: "Hardware & Subscriptions — Pricing in PGK",
      services: [
        {
          id: "starlink-standard",
          name: "Starlink Standard Kit",
          price: 2500.00, // TODO: confirm real pricing
          billing: " once",
          features: [
            "High-speed, low-latency satellite internet",
            "Easy self-install kit with base & cables",
            "Ideal for residential & basic SME setups",
            "All-weather durable performance"
          ]
        },
        {
          id: "starlink-mini",
          name: "Starlink Mini Kit",
          price: 1500.00, // TODO: confirm real pricing
          billing: " once",
          features: [
            "Ultra-portable high-speed internet design",
            "Low power consumption for field work",
            "Integrated router and kickstand built-in",
            "Fits perfectly in a backpack for travel"
          ]
        },
        {
          id: "starlink-business",
          name: "Starlink Business / High-Performance",
          price: 9500.00, // TODO: confirm real pricing
          billing: " once",
          features: [
            "High-gain flat panel satellite antenna",
            "Double the transmitter power output",
            "Prioritized network priority allocation",
            "Excellent connectivity in extreme weather"
          ]
        },
        {
          id: "starlink-monthly",
          name: "Starlink Monthly Service Plan",
          price: 350.00, // TODO: confirm real pricing
          billing: "/ month",
          features: [
            "High-priority data allocation options",
            "Unlimited standard high-speed data",
            "Flexible, commitment-free monthly plans",
            "Authorized local reseller technical support"
          ]
        }
      ]
    }
  ];

  const handleQuantityChange = (productId: string, val: number) => {
    if (val < 1) return;
    setQuantities(prev => ({ ...prev, [productId]: val }));
  };

  const handleAddToCartClick = (service: { id: string; name: string; price: number }) => {
    const qty = quantities[service.id] || 1;
    addToCart({ id: service.id, name: service.name, price: service.price }, qty);

    // Provide visual feedback
    setAddedFeedback(prev => ({ ...prev, [service.id]: true }));
    setTimeout(() => {
      setAddedFeedback(prev => ({ ...prev, [service.id]: false }));
    }, 1500);

    // Open Cart drawer for a smoother user experience
    setIsCartOpen(true);
  };

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

    try {
      const response = await fetch(getApiUrl('/api/inquiries'), {
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
            Authorized reseller storefront for Microsoft 365 and Starlink for the PNG market. Sourced for reliability, configured for performance.
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
                  <p className="text-emerald-500/80 font-bold text-sm uppercase tracking-wider">
                    {category.pricing_label}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.services.map((service, srvIdx) => {
                  const qty = quantities[service.id] || 1;
                  const isAdded = addedFeedback[service.id];
                  return (
                    <div
                      key={srvIdx}
                      className="group p-6 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 hover:border-emerald-500/50 transition-all duration-500 hover:bg-white/10 flex flex-col shadow-2xl relative overflow-hidden"
                    >
                      <h4 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2 min-h-[3.5rem] flex items-center">{service.name}</h4>

                      {/* Price Tag */}
                      <div className="mb-4">
                        <span className="text-2xl font-black text-emerald-400">
                          K{service.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-slate-400">{service.billing}</span>
                      </div>

                      <ul className="space-y-3 mb-6 flex-grow">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-400">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Quantity Stepper */}
                      <div className="flex items-center justify-between gap-2 mb-4 p-2 bg-white/5 rounded-xl border border-white/10">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider pl-2">Qty</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleQuantityChange(service.id, qty - 1)}
                            className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={qty}
                            onChange={(e) => handleQuantityChange(service.id, parseInt(e.target.value) || 1)}
                            className="w-10 bg-transparent text-center text-sm font-bold outline-none border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <button
                            onClick={() => handleQuantityChange(service.id, qty + 1)}
                            className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Add to Cart CTA */}
                      <button
                        onClick={() => handleAddToCartClick(service)}
                        className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn active-click ${
                          isAdded
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                            : 'bg-white/5 border border-white/10 text-white hover:bg-emerald-600 hover:border-emerald-500'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Added!
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5" />
                            Add to Cart
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleRequestService(service.name)}
                        className="mt-2 w-full py-2 rounded-lg text-[10px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                      >
                        or request quote
                      </button>
                    </div>
                  );
                })}
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
