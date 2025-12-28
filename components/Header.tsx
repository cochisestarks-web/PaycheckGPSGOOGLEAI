
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-earth-brown text-off-white py-8 shadow-xl border-b-4 border-zacatecas-pink">
      <div className="max-w-4xl mx-auto px-4 text-center md:text-left flex flex-col md:flex-row items-center gap-4">
        <div className="bg-zacatecas-pink p-3 rounded-full flex items-center justify-center w-16 h-16 shadow-lg transform -rotate-6">
          <i className="fa-solid fa-money-bill-trend-up text-3xl"></i>
        </div>
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Paycheck<span className="text-ocean-teal">GPS</span>
          </h1>
          <p className="text-warm-sand/80 mt-1 font-medium italic">Navigating the Gap between Wage, Market & Inflation</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
