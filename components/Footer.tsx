import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t-4 border-earth-brown bg-warm-sand/50 py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-charcoal/60 font-bold uppercase tracking-widest text-xs mb-6">
          Official Economic Data Sources
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-charcoal/50 mb-10">
          <a 
            href="https://www.bls.gov/oes/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-ocean-teal transition-colors"
          >
            <i className="fa-solid fa-building-columns"></i>
            <span>BLS Wage Data (OEWS)</span>
          </a>
          <a 
            href="https://www.bls.gov/cpi/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-zacatecas-pink transition-colors"
          >
            <i className="fa-solid fa-calculator"></i>
            <span>CPI Consumer Price Index</span>
          </a>
          <a 
            href="https://data.bls.gov/cgi-bin/cpicalc.pl" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-maguey-green transition-colors"
          >
            <i className="fa-solid fa-scale-balanced"></i>
            <span>Official Inflation Calculator</span>
          </a>
        </div>
        
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-earth-brown/5 rounded-xl border border-earth-brown/10">
          <p className="text-[10px] text-charcoal/40 uppercase font-black tracking-widest mb-2">Notice</p>
          <p className="text-xs text-charcoal/60 leading-relaxed italic">
            Market rates provided by AI are estimates based on aggregated 2024-2025 labor trends. 
            For official legal or collective bargaining purposes, please refer directly to the 
            <a href="https://www.bls.gov/" className="underline hover:text-ocean-teal mx-1">U.S. Bureau of Labor Statistics</a>.
          </p>
        </div>

        <p className="text-[10px] text-charcoal/30 font-bold uppercase tracking-tighter">
          &copy; {new Date().getFullYear()} PaycheckGPS • Wage Transparency & Economic Empowerment
        </p>
      </div>
    </footer>
  );
};

export default Footer;