import React, { useState } from 'react';
import { useCart } from './CartContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Send,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { getApiUrl } from '../utils/api';

const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    taxAmount,
    grandTotal,
    totalItems,
    isCartOpen,
    setIsCartOpen,
    exchangeRate
  } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.business.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setSubmitError("Name, Business Name, Email, Phone, and Delivery Address are required.");
      setStatus('error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitError("Please enter a valid email address.");
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setSubmitError(null);

    try {
      const response = await fetch(getApiUrl('/api/orders'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          business: formData.business,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          notes: formData.message.trim() || null,
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          totalItems,
          totalPrice,
          taxRate: 0.10,
          taxAmount,
          grandTotal,
          exchangeRate
        })
      });

      if (response.ok) {
        setStatus('success');
        clearCart();
        setFormData({ name: '', business: '', email: '', phone: '', address: '', message: '' });
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

  const renderDrawerContent = () => {
    if (status === 'success') {
      return (
        <div className="text-center py-12 space-y-5 animate-in zoom-in duration-300">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto relative">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
          </div>
          <h4 className="text-2xl font-bold uppercase tracking-wide text-white font-montserrat">Order Sent!</h4>
          <p className="text-sm text-slate-400 max-w-xs mx-auto">
            Your order has been submitted successfully and routed to our sales team. We'll follow up with you shortly.
          </p>
          <button
            onClick={() => {
              setStatus('idle');
              setIsCartOpen(false);
            }}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-all text-white font-bold text-xs uppercase tracking-widest active-click"
          >
            Close Basket
          </button>
        </div>
      );
    }

    if (cart.length === 0) {
      return (
        <div className="text-center py-24 space-y-4">
          <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-slate-400 font-medium">Your basket is currently empty.</p>
          <button
            onClick={() => setIsCartOpen(false)}
            className="px-6 py-2.5 rounded-xl border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
          >
            Continue Browsing
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Cart Line Items */}
        <div className="space-y-4 max-h-[35vh] sm:max-h-[40vh] overflow-y-auto pr-1">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl gap-4 hover:border-emerald-500/20 transition-all duration-300"
            >
              <div className="flex-grow min-w-0">
                <h5 className="text-sm font-bold text-white truncate">{item.name}</h5>
                <p className="text-xs text-emerald-400 font-semibold">
                  K{item.price.toFixed(2)}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/5 rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-0.5 rounded text-slate-400 hover:text-white"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold w-6 text-center text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-0.5 rounded text-slate-400 hover:text-white"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary & Checkout Form */}
        <div className="border-t border-white/10 pt-6 space-y-4 bg-transparent">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Subtotal</span>
              <span className="text-sm font-bold text-white font-montserrat">
                K{totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tax (10% GST)</span>
              <span className="text-sm font-bold text-slate-300 font-montserrat">
                K{taxAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-sm text-white font-bold uppercase tracking-wider">Total</span>
              <span className="text-xl font-black text-emerald-400 font-montserrat">
                K{grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <form onSubmit={handleCheckoutSubmit} className="space-y-3 sm:space-y-4 pt-4 border-t border-white/5">
            <h4 className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-2 font-montserrat">
              Complete Checkout & Submit Inquiry
            </h4>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-500/50 transition-all text-white text-sm font-medium min-h-[44px]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">
                Business Name
              </label>
              <input
                type="text"
                name="business"
                required
                value={formData.business}
                onChange={handleInputChange}
                placeholder="e.g. PNG SME Ltd"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-500/50 transition-all text-white text-sm font-medium min-h-[44px]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-500/50 transition-all text-white text-sm font-medium min-h-[44px]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+675 7000 0000"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-500/50 transition-all text-white text-sm font-medium min-h-[44px]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">
                Delivery Address
              </label>
              <textarea
                name="address"
                rows={2}
                required
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Section 45, Lot 12, Port Moresby, NCD"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-500/50 transition-all text-white text-xs resize-none font-medium min-h-[50px]"
              ></textarea>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">
                Additional Message / Requirements (Optional)
              </label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Add special instructions or query info..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-500/50 transition-all text-white text-xs resize-none font-medium min-h-[60px]"
              ></textarea>
            </div>

            {status === 'error' && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
                {submitError || "Submission failed."}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-3 sm:py-3.5 rounded-xl bg-emerald-600 text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active-click disabled:opacity-50 font-montserrat min-h-[44px]"
            >
              {status === 'submitting' ? (
                <>
                  Sending Order...
                  <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Submit Inquiry & Order
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="h-full w-screen max-w-md">
          <div className="h-full flex flex-col bg-gray-950 border-l border-white/10 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">

            {/* Header */}
            <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between bg-white/2 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-white font-montserrat">
                  Your Basket
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all active-click"
                aria-label="Close basket"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content body */}
            <div className="flex-1 px-6 py-6 overflow-y-auto">
              {renderDrawerContent()}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
