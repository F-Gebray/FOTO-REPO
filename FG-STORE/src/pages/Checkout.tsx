import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, ArrowLeft, Lock } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { clearCart } from '../store/cartSlice';

export const Checkout: React.FC = () => {
  const items = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15.00;
  const taxes = subtotal * 0.08;
  const total = subtotal + shipping + taxes;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setIsProcessing(true);
    
    // Simulate Stripe API delay
    setTimeout(() => {
      setIsProcessing(false);
      dispatch(clearCart());
      navigate('/tracking');
    }, 2500);
  };

  if (items.length === 0 && !isProcessing) {
    return (
      <div className="text-center py-24 px-4 h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your bag is empty</h2>
        <p className="text-gray-500 mb-8">You haven't added any items to checkout yet.</p>
        <Link to="/" className="text-white bg-primary-600 hover:bg-primary-700 px-6 py-3 rounded-xl font-bold transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center mb-8">
        <Link to="/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Link>
        <div className="flex items-center text-sm font-semibold text-green-600 dark:text-green-500">
          <Lock className="w-4 h-4 mr-1.5" /> Secure Checkout
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-7">
            <form onSubmit={handleCheckout} className="space-y-8 animate-in slide-in-from-left-4 duration-500">
              {/* Contact Info */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
                    <input type="email" required placeholder="you@example.com" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-gray-900 dark:text-white" />
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Shipping Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First name</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last name</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-gray-900 dark:text-white" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                    <input type="text" required placeholder="123 Main St" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-gray-900 dark:text-white" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-gray-900 dark:text-white" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Postal code</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-gray-900 dark:text-white" />
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <CreditCard className="w-32 h-32" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 relative z-10 flex items-center gap-2">
                  Payment Method
                </h2>
                <div className="space-y-4 relative z-10">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Card number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="text" required placeholder="0000 0000 0000 0000" maxLength={19} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-gray-900 dark:text-white font-mono" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry (MM/YY)</label>
                      <input type="text" required placeholder="MM/YY" maxLength={5} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-gray-900 dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CVC</label>
                      <input type="text" required placeholder="123" maxLength={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-gray-900 dark:text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 px-6 rounded-xl font-bold text-lg shadow-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex justify-center items-center gap-2 group disabled:opacity-75 disabled:cursor-wait"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 text-gray-400 group-hover:text-white dark:group-hover:text-gray-900 transition-colors" />
                    Pay ${total.toFixed(2)}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary Side */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm sticky top-24 animate-in slide-in-from-right-4 duration-500">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-white border border-gray-100 rounded-lg p-1 flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-6 border-t border-b border-gray-100 dark:border-gray-800 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-gray-900 dark:text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {shipping === 0 ? <span className="text-green-500 font-semibold">Free</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Estimated taxes</span>
                  <span className="text-gray-900 dark:text-white font-medium">${taxes.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-900 dark:text-white">Total</span>
                <span className="text-2xl font-black text-gray-900 dark:text-white">${total.toFixed(2)}</span>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-green-500 flex-shrink-0" />
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Payments are secure and encrypted. Lumina Retail respects your privacy and will not share your information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
