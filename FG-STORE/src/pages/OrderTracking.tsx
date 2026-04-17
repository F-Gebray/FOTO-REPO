import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Truck, CheckCircle, Package, ArrowRight } from "lucide-react";
import { useToast } from "../context/ToastContext";

export const OrderTracking: React.FC = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  const { addToast } = useToast();

  // Stages: 0 (Packing), 1 (Shipping), 2 (Delivered)
  const [shippingStage, setShippingStage] = useState(0);

  // Auto-progress the shipping state realistically
  useEffect(() => {
    const stage1Timer = setTimeout(() => {
      setShippingStage(1);
    }, 2000); // After 2s, switch to shipping

    const stage2Timer = setTimeout(() => {
      setShippingStage(2);
      addToast("Order Delivered Successfully!", "success");
    }, 6000); // 4s later, switch to delivered

    return () => {
      clearTimeout(stage1Timer);
      clearTimeout(stage2Timer);
    };
  }, [addToast]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-xl w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800 text-center animate-in zoom-in-95 duration-500 relative overflow-hidden">
        {/* Dynamic Header based on stage */}
        <div className="mb-12">
          {shippingStage === 0 && (
            <>
              <Package className="w-16 h-16 text-primary-500 mx-auto mb-4 animate-bounce" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Order Confirmed!
              </h1>
              <p className="text-gray-500 mt-2">
                We are packing your items right now.
              </p>
            </>
          )}
          {shippingStage === 1 && (
            <>
              <Truck className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-pulse" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Out for Delivery!
              </h1>
              <p className="text-gray-500 mt-2">
                Your package is en route to your destination.
              </p>
            </>
          )}
          {shippingStage === 2 && (
            <>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-[ping_1s_cubic-bezier(0,0,0.2,1)_1]" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-green-600 dark:text-green-400">
                Delivered!
              </h1>
              <p className="text-gray-500 mt-2">
                Your items have been securely delivered. Enjoy!
              </p>
            </>
          )}
        </div>

        {/* Animated Progress Bar */}
        <div className="relative pt-4 pb-12">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-200 dark:bg-gray-800">
            <div
              style={{
                width:
                  shippingStage === 0
                    ? "15%"
                    : shippingStage === 1
                      ? "60%"
                      : "100%",
              }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600 transition-all duration-1000 ease-in-out"
            ></div>
          </div>

          {/* Truck Icon following progress */}
          <div
            className="absolute top-0 transition-all duration-1000 ease-in-out transform -ml-4"
            style={{
              left:
                shippingStage === 0
                  ? "15%"
                  : shippingStage === 1
                    ? "60%"
                    : "100%",
            }}
          >
            {shippingStage !== 2 && (
              <Truck className="w-8 h-8 text-primary-600 flip-x filter drop-shadow-md" />
            )}
            {shippingStage === 2 && (
              <CheckCircle className="w-8 h-8 text-green-500 filter drop-shadow-md bg-white rounded-full" />
            )}
          </div>
        </div>

        {/* Action Button */}
        {shippingStage === 2 ? (
          <Link
            to="/"
            className="inline-flex justify-center items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 px-8 rounded-xl shadow-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all animate-in fade-in slide-in-from-bottom-2"
          >
            Continue Shopping <ArrowRight className="w-5 h-5" />
          </Link>
        ) : (
          <p className="text-sm font-medium text-gray-400 animate-pulse">
            Please wait, simulating delivery...
          </p>
        )}
      </div>
    </div>
  );
};
