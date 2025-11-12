import React from 'react';
import { ShopDetails } from '../types';

const Header: React.FC<{ shopDetails: ShopDetails }> = ({ shopDetails }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {shopDetails.logo ? (
            <img src={shopDetails.logo} alt="Logo" className="h-10 w-10 rounded-full object-cover border-2 border-cyan-500" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879a5 5 0 007.07 7.07L19 19m-7-7l2.879-2.879a5 5 0 00-7.07-7.07L5 5m7 7l-7 7" /></svg>
            </div>
          )}
          <h1 className="text-xl md:text-2xl font-bold text-white font-serif tracking-wider">
            {shopDetails.name}
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;