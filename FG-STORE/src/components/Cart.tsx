import React, { useMemo } from "react";
import { X, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { useToast } from "../context/ToastContext";
import { Link } from "react-router-dom";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const { addToast } = useToast();

  // Memoized Subtotal

  const cartTotal = useMemo(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  // Memoized Total Quantity (counts 3 apples as 3 items, not 1)
  const totalQuantity = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const handleRemove = (id: number, title: string) => {
    dispatch(removeFromCart(id));
    addToast(`Removed ${title.substring(0, 15)}... from cart.`, "error");
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white dark:bg-gray-900 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col animate-in slide-in-from-right">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900 border-opacity-50">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Shopping Bag
            <span className="bg-primary-100 text-primary-700 text-xs py-1 px-2 rounded-full ml-2">
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"}{" "}
            </span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 space-y-4">
              <ShoppingBagIcon className="w-20 h-20 opacity-20" />
              <p className="text-lg font-medium text-gray-500">
                Your bag is empty.
              </p>
              <button
                onClick={onClose}
                className="mt-4 text-primary-600 hover:text-primary-700 font-semibold"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border border-gray-100 dark:border-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-24 h-24 flex-shrink-0 bg-white rounded-lg p-2 border border-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm">
                      {item.title}
                    </h3>
                    <p className="text-primary-600 font-black mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800">
                      <button
                        className="p-1.5 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity - 1,
                            }),
                          )
                        }
                      >
                        <Minus className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-gray-900 dark:text-white min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="p-1.5 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            }),
                          )
                        }
                      >
                        <Plus className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id, item.title)}
                      className="text-gray-400 p-2 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl">
            <div className="flex justify-between items-center mb-6 text-xl font-bold text-gray-900 dark:text-white">
              <span>Subtotal</span>
              <span className="text-primary-600">${cartTotal.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              onClick={onClose}
              className="w-full flex justify-center items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 px-4 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-transform active:scale-[0.98] shadow-xl"
            >
              Checkout Securely <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

function ShoppingBagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  );
}
