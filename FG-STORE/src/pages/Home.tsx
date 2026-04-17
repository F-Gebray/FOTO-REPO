import React from 'react';
import { ProductList } from '../components/ProductList';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="relative overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center sm:text-left relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
                Redefining the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-500">
                  Modern Wardrobe.
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-lg text-gray-500 dark:text-gray-400 mb-8 mx-auto sm:mx-0">
                Experience unparalleled quality and cutting-edge operational design at Lumina Retail. Curated selections, perfect fits, and a seamless checkout experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                <button
                  onClick={() => window.scrollTo({ top: document.getElementById('shop-section')?.offsetTop || 500, behavior: 'smooth' })}
                  className="inline-flex justify-center items-center gap-2 px-8 py-3.5 border border-transparent text-base font-semibold rounded-lg text-white bg-primary-600 hover:bg-primary-700 shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Shop Collection
                </button>
                <Link
                  to="/contact"
                  className="inline-flex justify-center items-center gap-2 px-8 py-3.5 border border-gray-300 dark:border-gray-700 text-base font-semibold rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:scale-105 active:scale-95"
                >
                  Contact Us
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-[2rem] transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Fashion model" 
                className="relative rounded-[2rem] shadow-2xl object-cover h-[500px] w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div id="shop-section">
        <ProductList />
      </div>
    </div>
  );
};
