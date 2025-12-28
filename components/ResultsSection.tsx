import React from 'react';
import { WageAnalysisResults } from '../types';
import WageChart from './WageChart';

interface ResultsSectionProps {
  results: WageAnalysisResults;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  const isPositive = results.totalGap <= 0;
  const absTotalImpact = Math.abs(results.totalImpact);
  const fiveYearImpact = results.totalImpact * 5;

  return (
    <section id="results" className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-off-white rounded-2xl shadow-2xl overflow-hidden border border-ocean-mist/50">
      {/* Header Splash */}
      <div className={`${isPositive ? 'bg-maguey-green' : 'bg-lava-red'} p-6 md:p-8 text-off-white text-center shadow-lg relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-4xl font-black mb-2 uppercase tracking-tighter leading-tight">
            {isPositive ? "Ahead of Benchmark" : "Wage Gap Detected"}
          </h2>
          <div className="text-4xl md:text-6xl font-extrabold flex items-center justify-center gap-1 md:gap-2">
            <span className="text-xl md:text-2xl opacity-80">$</span>
            {absTotalImpact.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            <span className="text-lg md:text-xl opacity-80">/ yr</span>
          </div>
          <p className="mt-2 md:mt-4 text-white/90 font-medium text-sm md:text-base">
            Job: <span className="underline decoration-off-white/30">{results.job}</span> • {results.location}
          </p>
        </div>
      </div>

      <div className="p-4 md:p-8 space-y-6 md:space-y-8">
        {/* Core Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          
          {/* Time-Based Purchasing Power Gap (Inflation) */}
          <div className="bg-ocean-mist rounded-2xl p-5 md:p-6 border-l-8 border-ocean-teal shadow-md flex flex-col h-full">
            <div className="flex flex-col mb-4 md:mb-6">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-clock-rotate-left text-ocean-teal text-xl"></i>
                <h3 className="text-lg md:text-xl font-bold text-charcoal leading-tight">Time-Based Purchasing Power Gap</h3>
              </div>
              <span className="text-[10px] uppercase font-black text-ocean-teal mt-1 ml-8 tracking-widest opacity-70">
                Inflation Comparison
              </span>
            </div>
            
            <div className="space-y-3 md:space-y-4 flex-grow">
              <div className="flex justify-between items-center text-sm">
                <span className="text-charcoal/60 font-medium uppercase tracking-wider">Historical Parity</span>
                <span className="font-bold text-charcoal text-base md:text-lg">${results.inflationAdjustedWage.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-charcoal/60 font-medium uppercase tracking-wider">Current Wage</span>
                <span className="font-bold text-charcoal text-base md:text-lg">${results.wage.toFixed(2)}</span>
              </div>
              
              <div className="pt-3 md:pt-4 mt-1 md:mt-2 border-t-2 border-ocean-teal/10">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-charcoal uppercase tracking-widest text-[10px]">Hourly Loss</span>
                  <span className={`text-lg md:text-xl font-black ${results.inflationGap > 0 ? 'text-lava-red' : 'text-maguey-green'}`}>
                    {results.inflationGap > 0 ? '-' : '+'}${Math.abs(results.inflationGap).toFixed(2)}
                  </span>
                </div>
                <p className="text-right text-[11px] font-bold text-charcoal/40 mt-1 uppercase">
                  ${Math.abs(results.inflationImpact).toLocaleString(undefined, { maximumFractionDigits: 0 })}/year impact
                </p>
              </div>
            </div>
          </div>

          {/* Market Position Gap (Peers) */}
          <div className="bg-light-adobe rounded-2xl p-5 md:p-6 border-l-8 border-zacatecas-pink shadow-md flex flex-col h-full">
            <div className="flex flex-col mb-4 md:mb-6">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-users-viewfinder text-zacatecas-pink text-xl"></i>
                <h3 className="text-lg md:text-xl font-bold text-charcoal leading-tight">Market Position Gap</h3>
              </div>
              <span className="text-[10px] uppercase font-black text-zacatecas-pink mt-1 ml-8 tracking-widest opacity-70">
                AI Peer Comparison
              </span>
            </div>
            
            <div className="space-y-3 md:space-y-4 flex-grow">
              <div className="flex justify-between items-center text-sm">
                <span className="text-charcoal/60 font-medium uppercase tracking-wider">AI Target Market Rate</span>
                <span className="font-bold text-charcoal text-base md:text-lg">${results.currentMarketRate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-charcoal/60 font-medium uppercase tracking-wider">Current Wage</span>
                <span className="font-bold text-charcoal text-base md:text-lg">${results.wage.toFixed(2)}</span>
              </div>
              
              <div className="pt-3 md:pt-4 mt-1 md:mt-2 border-t-2 border-zacatecas-pink/10">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-charcoal uppercase tracking-widest text-[10px]">Market Deficiency</span>
                  <span className={`text-lg md:text-xl font-black ${results.marketGap > 0 ? 'text-lava-red' : 'text-maguey-green'}`}>
                    {results.marketGap > 0 ? '-' : '+'}${Math.abs(results.marketGap).toFixed(2)}
                  </span>
                </div>
                <p className="text-right text-[11px] font-bold text-charcoal/40 mt-1 uppercase">
                  ${Math.abs(results.marketImpact).toLocaleString(undefined, { maximumFractionDigits: 0 })}/year impact
                </p>
              </div>
              
              {results.aiExplanation && (
                <div className="mt-4 p-3 bg-white/50 rounded-lg border border-zacatecas-pink/10 italic text-[10px] text-charcoal/70">
                  <i className="fa-solid fa-robot mr-2 text-zacatecas-pink"></i>
                  {results.aiExplanation}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chart Visualization Section */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-warm-sand/20 shadow-inner">
           <h3 className="text-xl md:text-2xl font-black text-charcoal mb-6 flex items-center gap-3 uppercase tracking-tighter">
            <i className="fa-solid fa-chart-area text-zacatecas-pink"></i>
            Visualizing the Impact
          </h3>
          <WageChart results={results} />
          <p className="mt-4 text-[11px] font-medium text-charcoal/50 italic text-center">
            * Projection assumes zero wage growth and static inflation/market trends over 60 months.
          </p>
        </div>

        {/* Wealth Education Section */}
        <div className="bg-ocean-mist/30 border-2 border-ocean-teal/20 rounded-3xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-black text-charcoal uppercase tracking-tight flex items-center gap-3 mb-4">
                <i className="fa-solid fa-graduation-cap text-ocean-teal"></i>
                Inflation Education
              </h3>
              <p className="text-sm text-charcoal/70 font-medium leading-relaxed mb-6">
                Understanding the difference between <span className="font-bold">nominal wages</span> (the dollar amount on your check) and <span className="font-bold">real wages</span> (what those dollars can actually buy) is critical for long-term financial health.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href="https://www.investopedia.com/terms/i/inflation.asp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white p-4 rounded-xl shadow-sm border border-ocean-teal/10 hover:border-ocean-teal hover:shadow-md transition-all group"
                >
                  <span className="block text-[10px] font-black text-ocean-teal uppercase mb-1">Article</span>
                  <span className="text-sm font-bold text-charcoal group-hover:text-ocean-teal">How Inflation Works &rarr;</span>
                </a>
                <a 
                  href="https://www.bls.gov/cpi/questions-and-answers.htm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white p-4 rounded-xl shadow-sm border border-zacatecas-pink/10 hover:border-zacatecas-pink hover:shadow-md transition-all group"
                >
                  <span className="block text-[10px] font-black text-zacatecas-pink uppercase mb-1">Official Guide</span>
                  <span className="text-sm font-bold text-charcoal group-hover:text-zacatecas-pink">Understanding the CPI &rarr;</span>
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-earth-brown rounded-2xl p-6 text-warm-sand">
               <h4 className="text-xs font-black uppercase tracking-widest text-zacatecas-pink mb-2">Did you know?</h4>
               <p className="text-xs font-medium leading-relaxed italic opacity-80">
                 "If your wage increases by 3% but inflation is 5%, you have actually received a 2% pay cut in terms of purchasing power."
               </p>
            </div>
          </div>
        </div>

        {/* 5-Year Projection Summary */}
        <div className="border-4 border-dashed border-warm-sand/40 rounded-3xl p-6 md:p-8 bg-warm-sand/5">
          <h3 className="text-xl md:text-2xl font-black text-charcoal mb-4 flex items-center gap-3 uppercase">
            <i className="fa-solid fa-hourglass-half text-ocean-teal"></i>
            Wealth Projection
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <p className="text-base md:text-lg text-charcoal font-medium leading-relaxed">
                Remaining at this level leads to a cumulative 
                <span className={`mx-2 font-black ${results.totalGap > 0 ? 'text-lava-red' : 'text-maguey-green'} underline decoration-wavy underline-offset-4`}>
                  ${Math.abs(fiveYearImpact).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span> 
                {results.totalGap > 0 ? 'loss in personal wealth' : 'net gain'} by year 5.
              </p>
              <p className="text-xs md:text-sm text-charcoal/60 mt-4 font-bold italic">
                {results.totalGap > 0 
                  ? `An hourly raise of $${results.totalGap.toFixed(2)} is required to restore parity.`
                  : `You are currently positioned $${Math.abs(results.totalGap).toFixed(2)} above standard benchmarks.`}
              </p>
            </div>
            
            <div className="w-40 h-40 md:w-48 md:h-48 bg-white rounded-full border-8 border-warm-sand flex flex-col items-center justify-center shadow-xl p-4 text-center shrink-0">
              <span className="text-[10px] uppercase font-black text-charcoal/40 mb-1">Total Gap</span>
              <span className={`text-xl md:text-2xl font-black ${results.totalGap > 0 ? 'text-lava-red' : 'text-maguey-green'}`}>
                {results.totalGap > 0 ? '-' : '+'}${Math.abs(results.totalGap).toFixed(2)}
              </span>
              <span className="text-[10px] font-bold text-charcoal/30">PER HOUR</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
          <button 
            onClick={() => window.print()} 
            className="flex-1 bg-charcoal text-off-white hover:bg-black py-4 rounded-xl font-black uppercase tracking-widest text-xs md:text-sm transition-all shadow-lg flex items-center justify-center gap-3"
          >
            <i className="fa-solid fa-file-pdf"></i>
            Export PDF Report
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="flex-1 border-4 border-ocean-teal text-ocean-teal hover:bg-ocean-teal hover:text-off-white py-4 rounded-xl font-black uppercase tracking-widest text-xs md:text-sm transition-all shadow-lg flex items-center justify-center gap-3"
          >
            <i className="fa-solid fa-rotate-right"></i>
            Recalculate
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;