import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart } from '../store/cartSlice';
import { ShoppingBag, ArrowLeft, Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import type { Product } from '../types';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  
  // Notice we can select from our global state. If someone navigates directly here,
  // we might need to fetch the product, but for now we pull it from the loaded store.
  const product = useAppSelector(state => 
    state.products.items.find(p => p.id === Number(id))
  );

  const [localLoading, setLocalLoading] = useState(!product);
  const [fetchedProduct, setFetchedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // If not in store (direct link), fetch it directly
    if (!product && id) {
      setLocalLoading(true);
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setFetchedProduct(data);
          setLocalLoading(false);
        })
        .catch(() => {
          setLocalLoading(false);
          addToast("Failed to load product details", "error");
        });
    }
  }, [id, product, addToast]);

  const displayProduct = product || fetchedProduct;

  if (localLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!displayProduct) {
    return (
      <div className="text-center py-20 animate-in fade-in">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product not found.</h2>
        <Link to="/" className="text-primary-600 hover:text-primary-500 mt-4 inline-block">Return to Shop</Link>
      </div>
    );
  }

  const handleAdd = () => {
    dispatch(addToCart(displayProduct));
    addToast(`Added ${displayProduct.title.substring(0, 20)}... to cart`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collection
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Image Gallery Mock */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-white rounded-2xl p-8 border border-gray-200 dark:border-gray-800 flex items-center justify-center transform transition-all hover:scale-[1.02]">
            <img 
              src={displayProduct.image} 
              alt={displayProduct.title} 
              className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-xl" 
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-sm font-semibold tracking-wider text-primary-600 uppercase bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full">
              {displayProduct.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
            {displayProduct.title}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.round(displayProduct.rating.rate) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({displayProduct.rating.count} reviews)
            </span>
          </div>
          
          <div className="text-4xl font-black text-gray-900 dark:text-white mb-8">
            ${displayProduct.price.toFixed(2)}
          </div>
          
          <p className="text-base text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            {displayProduct.description}
          </p>

          <div className="space-y-6 mb-10 pb-10 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              <span>2 Year Extended Warranty</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <Truck className="w-6 h-6 text-primary-500" />
              <span>Free Next-Day Shipping</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <RefreshCw className="w-6 h-6 text-blue-500" />
              <span>30-Day Free Returns</span>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 text-white font-bold py-4 px-8 rounded-xl shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <ShoppingBag className="w-6 h-6" /> Add to Shopping Bag
          </button>
        </div>
      </div>
    </div>
  );
};
