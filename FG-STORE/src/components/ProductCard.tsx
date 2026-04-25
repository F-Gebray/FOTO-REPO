import React, { useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";
import type { Product } from "../types";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = React.memo(
  ({ product, onAddToCart }: ProductCardProps) => {
    // UI state (for button text + styling)
    const [isAdding, setIsAdding] = useState(false);

    // IMPORTANT: synchronous lock (prevents fast click stacking)
    const isAddingRef = useRef(false);

    const handleAddToCart = (e: React.MouseEvent) => {
      e.preventDefault();

      // hard stop for rapid clicks
      if (isAddingRef.current) return;

      isAddingRef.current = true;
      setIsAdding(true);

      onAddToCart(product);

      // reset after short delay (UX + safety)
      setTimeout(() => {
        isAddingRef.current = false;
        setIsAdding(false);
      }, 300);
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700/50 group">
        <Link
          to={`/product/${product.id}`}
          className="relative pt-[100%] bg-white p-4 block overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-contain p-8 mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </Link>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start gap-4 mb-3">
            <Link to={`/product/${product.id}`}>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 line-clamp-2 hover:text-primary-600 transition-colors">
                {product.title}
              </h3>
            </Link>
          </div>

          <div className="text-lg font-black text-gray-900 dark:text-white mb-4">
            ${product.price.toFixed(2)}
          </div>

          <div className="mt-auto">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full inline-flex justify-center items-center gap-x-2 rounded-xl px-3.5 py-3 text-sm font-bold shadow-sm transition-all active:scale-[0.98]
                ${
                  isAdding
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-primary-600 hover:text-white"
                }
              `}
            >
              <ShoppingBag className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              {isAdding ? "Adding..." : "Quick Add"}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";
