import React, { useState, useEffect } from 'react';
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

interface Product {
  id: string;
  sku?: string;
  name: string;
  price: number | null;
  price_usd?: number;
  billing: string;
  features: string[];
  model?: string;
  description?: string;
  image_url?: string;
  whats_included?: string[];
  compatibility?: string[];
  tech_specs?: Record<string, any>;
  gst_status?: string;
  stock_status?: string;
  supplier?: string;
  source_type?: string;
  price_verified?: boolean;
  last_verified_at?: string | null;
  category?: string;
  product_type?: string;
}

const ShopServices: React.FC = () => {
  const { addToCart, setIsCartOpen, exchangeRate } = useCart();
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

  // Dynamic Starlink catalog states
  const [starlinkProducts, setStarlinkProducts] = useState<Product[]>([]);
  const [isLoadingStarlink, setIsLoadingStarlink] = useState(true);
  const [starlinkError, setStarlinkError] = useState<string | null>(null);

  const fallbackStarlinkProducts: Product[] = [
    {
      id: "starlink-standard",
      name: "Starlink Standard Kit",
      price: 2500.00,
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
      price: 1500.00,
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
      price: 9500.00,
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
      price: 350.00,
      billing: "/ month",
      features: [
        "High-priority data allocation options",
        "Unlimited standard high-speed data",
        "Flexible, commitment-free monthly plans",
        "Authorized local reseller technical support"
      ]
    }
  ];

  useEffect(() => {
    const fetchStarlinkProducts = async () => {
      try {
        const res = await fetch(getApiUrl('/api/products?provider=starlink'));
        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}`);
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          const normalized = data.map((p: any) => {
            let price: number | null = null;
            if (p.price !== undefined && p.price !== null) {
              const parsed = Number(p.price);
              if (!isNaN(parsed)) price = parsed;
            }

            let features: string[] = [];
            if (Array.isArray(p.features)) {
              features = p.features;
            } else if (typeof p.features === 'string') {
              try {
                const parsed = JSON.parse(p.features);
                if (Array.isArray(parsed)) features = parsed;
              } catch (_) {}
            }

            let whats_included: string[] = [];
            if (Array.isArray(p.whats_included)) {
              whats_included = p.whats_included;
            } else if (typeof p.whats_included === 'string') {
              try {
                const parsed = JSON.parse(p.whats_included);
                if (Array.isArray(parsed)) whats_included = parsed;
              } catch (_) {}
            }

            return {
              id: String(p.sku || p.id || ''),
              sku: String(p.sku || p.id || ''),
              name: String(p.name || ''),
              price,
              billing: String(p.billing || ''),
              features,
              model: p.model ? String(p.model) : undefined,
              description: p.description ? String(p.description) : undefined,
              image_url: p.image_url ? String(p.image_url) : undefined,
              whats_included,
              compatibility: Array.isArray(p.compatibility) ? p.compatibility : [],
              tech_specs: typeof p.tech_specs === 'object' && p.tech_specs !== null ? p.tech_specs : {},
              gst_status: p.gst_status || 'GST inclusive',
              stock_status: p.stock_status || 'in_stock',
              supplier: p.supplier ? String(p.supplier) : undefined,
              source_type: p.source_type ? String(p.source_type) : undefined,
              price_verified: Boolean(p.price_verified),
              last_verified_at: p.last_verified_at || null,
              category: p.category ? String(p.category) : 'shop-starlink',
              product_type: p.product_type ? String(p.product_type) : 'hardware'
            };
          });
          setStarlinkProducts(normalized);
        } else {
          throw new Error("Invalid product data format received.");
        }
      } catch (err: any) {
        console.error("Failed to load Starlink products:", err);
        setStarlinkError(err.message || "Failed to load products from server.");
      } finally {
        setIsLoadingStarlink(false);
      }
    };

    fetchStarlinkProducts();
  }, []);

  // TODO: confirm real pricing with the site owner before final production release. Prices are approximate PGK conversions to be confirmed.
  const microsoftServices: Product[] = [
    {
      id: "office-home-2024",
      name: "Office Home 2024",
      price: 680.00,
      price_usd: 171.72,
      billing: " once",
      features: [
        "Classic Word, Excel, and PowerPoint",
        "One-time purchase for 1 PC or Mac",
        "Includes classic 2024 features",
        "Authorized local reseller support"
      ]
    },
    {
      id: "office-home-business-2024",
      name: "Office Home & Business 2024",
      price: 1080.00,
      price_usd: 272.73,
      billing: " once",
      features: [
        "Classic apps including Outlook",
        "One-time purchase for 1 PC or Mac",
        "Licensed for home and commercial use",
        "Authorized local reseller support"
      ]
    }
  ];

  // Dynamically compute Kina prices from USD base using the backend exchange rate and internal markup (10%), with fallback to hardcoded PGK prices
  const computedMicrosoftServices = microsoftServices.map(service => {
    if (service.price_usd && exchangeRate) {
      const markupMultiplier = 1.10;
      const computedPrice = Math.round(service.price_usd * exchangeRate * markupMultiplier * 100) / 100;
      return { ...service, price: computedPrice };
    }
    return service;
  });

  const activeStarlinkList = starlinkProducts.length > 0 ? starlinkProducts : (isLoadingStarlink ? [] : fallbackStarlinkProducts);

  // Group Starlink products into structured categories/subgroups
  const starlinkSubgroups = [
    {
      title: "Starlink Terminal Kits & Hardware",
      description: "Official satellite terminals and user kits for PNG residential, business, and field deployments.",
      services: activeStarlinkList.filter(p => (p.category === 'shop-starlink' || p.product_type === 'hardware') && p.category !== 'mounting' && p.category !== 'networking' && p.category !== 'cables' && p.category !== 'power' && p.category !== 'installation' && p.category !== 'recurring')
    },
    {
      title: "Mounting Adapters & Brackets",
      description: "Corrosion-resistant pole adapters, pipe mounts, and wall brackets for secure installation.",
      services: activeStarlinkList.filter(p => p.category === 'mounting')
    },
    {
      title: "Networking Hardware",
      description: "Ethernet adapters and network integration modules for direct router/switch connection.",
      services: activeStarlinkList.filter(p => p.category === 'networking')
    },
    {
      title: "Cables & Power Accessories",
      description: "Replacement extension cables, 12V/24V DC vehicle power supplies, and accessories.",
      services: activeStarlinkList.filter(p => p.category === 'cables' || p.category === 'power')
    },
    {
      title: "On-Site Installation & Engineering Services",
      description: "Turnkey physical installation, cable routing, dish alignment, and firewall integration in PNG.",
      services: activeStarlinkList.filter(p => p.category === 'installation' || p.product_type === 'installation')
    },
    {
      title: "Connectivity Plans & Subscriptions",
      description: "High-priority satellite data packages and account management for enterprise continuity.",
      services: activeStarlinkList.filter(p => p.category === 'recurring' || p.product_type === 'recurring')
    }
  ].filter(group => group.services.length > 0);

  const categories = [
    {
      id: "shop-microsoft",
      title: "Microsoft Office Applications",
      icon: <Monitor className="w-6 h-6" />,
      pricing_label: "Perpetual Reseller Licenses — Pricing in PGK",
      subgroups: [
        {
          title: "Microsoft 365 / Office Reseller Licenses",
          description: "Authorized reseller perpetual office software licenses.",
          services: computedMicrosoftServices
        }
      ]
    },
    {
      id: "shop-starlink",
      title: "Starlink Satellite Catalogue & Services",
      icon: <Rocket className="w-6 h-6" />,
      pricing_label: "Cost-Based 10% Markup Benchmark Pricing in PGK",
      subgroups: starlinkSubgroups
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
    <section id="shop-services" className="py-12 sm:py-16 lg:py-24 bg-gray-950 text-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-14 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-montserrat font-black mb-6 uppercase tracking-tight">
            Shop & <span className="text-emerald-500">Services</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto font-medium">
            Authorized reseller storefront for Microsoft 365 and Starlink for the PNG market. Sourced for reliability, configured for performance.
          </p>
        </div>

        {/* Categories & Pricing Grid */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-24">
          {categories.map((category, catIdx) => (
            <div key={catIdx} id={category.id} className="scroll-mt-32 space-y-6 sm:space-y-10 outline-none">
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4">
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

              {category.id === "shop-starlink" && isLoadingStarlink && (
                <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                  <p className="text-sm font-medium">Loading Starlink products from catalog...</p>
                </div>
              )}

              {category.id === "shop-starlink" && starlinkError && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold mb-4">
                  Notice: Failed to load real-time catalog ({starlinkError}). Showing locally cached product specifications.
                </div>
              )}

              <div className="space-y-10">
                {category.subgroups.map((subgroup, subIdx) => (
                  <div key={subIdx} className="space-y-4">
                    <div className="border-l-2 border-emerald-500 pl-4 py-1">
                      <h4 className="text-xl font-bold uppercase tracking-wider text-white">{subgroup.title}</h4>
                      <p className="text-xs text-slate-400 font-medium">{subgroup.description}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                      {subgroup.services.map((service, srvIdx) => {
                        const qty = quantities[service.id] || 1;
                        const isAdded = addedFeedback[service.id];
                        const hasPrice = service.price !== null && service.price !== undefined && typeof service.price === 'number' && service.price > 0;

                        return (
                          <div
                            key={srvIdx}
                            className="group p-6 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 hover:border-emerald-500/50 transition-all duration-500 hover:bg-white/10 flex flex-col shadow-2xl relative overflow-hidden"
                          >
                            <h5 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2 min-h-[3.5rem] flex items-center">
                              {service.name}
                            </h5>

                            {/* Badges: Verified / GST / Stock */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {service.price_verified && service.last_verified_at && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                  Verified {new Date(service.last_verified_at).toLocaleDateString()}
                                </span>
                              )}
                              {service.gst_status && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 text-slate-300 border border-white/10">
                                  {service.gst_status}
                                </span>
                              )}
                              {service.stock_status && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                  {service.stock_status === 'in_stock' ? 'In Stock' : service.stock_status}
                                </span>
                              )}
                            </div>

                            {/* Price Tag */}
                            <div className="mb-4">
                              {hasPrice ? (
                                <div>
                                  <span className="text-2xl font-black text-emerald-400">
                                    K{Number(service.price).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                                  </span>
                                  <span className="text-xs text-slate-400">{service.billing}</span>
                                </div>
                              ) : (
                                <div>
                                  <span className="text-lg font-bold text-amber-400">
                                    Price: Contact Deeps Systems
                                  </span>
                                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Custom procurement & pricing available on request.</p>
                                </div>
                              )}
                            </div>

                            <ul className="space-y-2.5 mb-6 flex-grow">
                              {(Array.isArray(service.features) ? service.features : []).map((feature, fIdx) => (
                                <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-400">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>

                            {hasPrice ? (
                              <>
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
                                  onClick={() => handleAddToCartClick({ id: service.id, name: service.name, price: service.price! })}
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
                              </>
                            ) : (
                              <button
                                onClick={() => handleRequestService(service.name)}
                                className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active-click"
                              >
                                <Mail className="w-4 h-4" />
                                Request Quote
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact & Inquiry Form */}
        <div id="inquiry-form" className="mt-16 sm:mt-24 lg:mt-32 max-w-4xl mx-auto scroll-mt-32">
          <div className="p-6 sm:p-10 lg:p-16 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
             {/* Form Decoration */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -z-10"></div>

             {status === 'success' ? (
               <div className="text-center py-12 animate-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
                  </div>
                  <h3 className="text-3xl font-montserrat font-black uppercase mb-4">Inquiry Received</h3>
                  <p className="text-slate-300 mb-8 max-w-md mx-auto">Your sales inquiry has been securely stored in our database and routed to our sales team.</p>
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
                       <h3 className="text-3xl font-montserrat font-black uppercase mb-2">Sales Inquiry</h3>
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
                          {categories.flatMap(cat => cat.subgroups.flatMap(sg => sg.services)).map(srv => (
                            <option key={srv.id || srv.name} value={srv.name} className="bg-gray-900">{srv.name}</option>
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
