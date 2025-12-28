
import React, { useState } from 'react';
import { WageAnalysisInputs } from '../types';
import { fetchAIMarketData } from '../services/aiService';
import { CUMULATIVE_INFLATION, JOBS, LOCATIONS } from '../constants';

interface WageFormProps {
  onAnalyze: (inputs: WageAnalysisInputs) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const WageForm: React.FC<WageFormProps> = ({ onAnalyze, isLoading, setIsLoading }) => {
  const [inputs, setInputs] = useState<WageAnalysisInputs>({
    wage: 22.50,
    year: 2021,
    job: JOBS[0] || '',
    location: LOCATIONS[0] || '',
    hoursPerWeek: 40,
    wasPromotion: false
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.job || !inputs.location) {
      setError("Please select both a Job Title and a Location.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // We still call the AI service to get the most up-to-date inflation and specific market rates
      // even if the inputs are from a static list, to ensure high fidelity results.
      const aiData = await fetchAIMarketData(inputs.job, inputs.location, inputs.year);
      
      onAnalyze({
        ...inputs,
        job: aiData.standardJobTitle || inputs.job,
        location: aiData.standardLocation || inputs.location,
        aiMarketRate: aiData.hourlyRate,
        aiInflationRate: aiData.cumulativeInflation,
        aiYearContext: aiData.yearContext,
        aiExplanation: aiData.explanation
      });
    } catch (err) {
      console.error("AI Error:", err);
      setError("Real-time AI analysis is currently unavailable. Proceeding with high-accuracy historical fallbacks.");
      onAnalyze(inputs);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setInputs(prev => ({
      ...prev,
      [id]: type === 'number' ? parseFloat(value) : val
    }));
  };

  return (
    <section className="bg-light-adobe rounded-3xl shadow-2xl p-6 md:p-10 border border-warm-sand/50 relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-earth-brown/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 border-4 border-zacatecas-pink/20 rounded-full"></div>
            <div className="absolute inset-0 border-t-4 border-zacatecas-pink rounded-full animate-spin"></div>
          </div>
          <h3 className="text-3xl font-black text-off-white uppercase tracking-tighter mb-2 italic">Scanning Economic Horizon</h3>
          <p className="text-warm-sand font-bold max-w-xs text-sm uppercase tracking-widest opacity-80">Fetching BLS Datasets & CPI Indices...</p>
        </div>
      )}

      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-charcoal text-off-white rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3">
          <i className="fa-solid fa-radar text-xl"></i>
        </div>
        <div>
          <h2 className="text-3xl font-black text-charcoal uppercase tracking-tighter">Market Analysis</h2>
          <p className="text-xs font-bold text-ocean-teal uppercase tracking-widest">Economic Mapping System</p>
        </div>
      </div>
      
      <p className="text-charcoal/70 mb-10 font-medium leading-relaxed max-w-2xl border-l-4 border-warm-sand pl-6 italic">
        "Navigating the current labor landscape requires precision. Select your parameters below to see how your compensation aligns with the broader economy."
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-10">
        <div className="space-y-3">
          <label htmlFor="wage" className="flex justify-between items-center text-[10px] font-black text-charcoal/50 uppercase tracking-[0.2em]">
            <span>Current Hourly Wage</span>
            <span className="text-ocean-teal font-black">USD</span>
          </label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-teal font-bold">$</span>
            <input 
              type="number" id="wage" step="0.01" min="0" value={inputs.wage} onChange={handleChange} required
              className="w-full pl-10 pr-4 py-5 bg-white border-2 border-warm-sand/40 rounded-2xl focus:ring-4 focus:ring-ocean-teal/10 focus:border-ocean-teal outline-none transition-all font-black text-xl text-charcoal shadow-inner"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label htmlFor="year" className="flex justify-between items-center text-[10px] font-black text-charcoal/50 uppercase tracking-[0.2em]">
            <span>Last Raise Year</span>
            <span className="text-zacatecas-pink font-black">Live CPI-U Ref</span>
          </label>
          <select 
            id="year" value={inputs.year} onChange={handleChange} required
            className="w-full px-5 py-5 bg-white border-2 border-warm-sand/40 rounded-2xl focus:ring-4 focus:ring-zacatecas-pink/10 focus:border-zacatecas-pink outline-none transition-all font-black text-xl text-charcoal cursor-pointer appearance-none shadow-inner"
          >
            {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map(yr => (
              <option key={yr} value={yr}>
                {yr} {CUMULATIVE_INFLATION[yr] ? `(~${CUMULATIVE_INFLATION[yr]}% Inflation)` : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <label htmlFor="job" className="text-[10px] font-black text-charcoal/50 uppercase tracking-[0.2em]">Job Title / Field</label>
          <select 
            id="job" value={inputs.job} onChange={handleChange} required
            className="w-full px-5 py-5 bg-white border-2 border-warm-sand/40 rounded-2xl focus:ring-4 focus:ring-ocean-teal/10 focus:border-ocean-teal outline-none transition-all font-bold text-charcoal cursor-pointer appearance-none shadow-inner"
          >
            <option value="" disabled>Select a role...</option>
            {JOBS.map(job => (
              <option key={job} value={job}>{job}</option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <label htmlFor="location" className="text-[10px] font-black text-charcoal/50 uppercase tracking-[0.2em]">Geographic Location</label>
          <select 
            id="location" value={inputs.location} onChange={handleChange} required
            className="w-full px-5 py-5 bg-white border-2 border-warm-sand/40 rounded-2xl focus:ring-4 focus:ring-ocean-teal/10 focus:border-ocean-teal outline-none transition-all font-bold text-charcoal cursor-pointer appearance-none shadow-inner"
          >
            <option value="" disabled>Select a location...</option>
            {LOCATIONS.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-10 items-center pt-4">
          <div className="flex-1 w-full space-y-3">
            <label htmlFor="hoursPerWeek" className="text-[10px] font-black text-charcoal/50 uppercase tracking-[0.2em]">Weekly Hours</label>
            <input 
              type="number" id="hoursPerWeek" value={inputs.hoursPerWeek} onChange={handleChange} min="1" max="168"
              className="w-full px-5 py-5 bg-white border-2 border-warm-sand/40 rounded-2xl focus:ring-4 focus:ring-ocean-teal/10 focus:border-ocean-teal outline-none transition-all font-bold text-charcoal shadow-inner"
            />
          </div>
          <div className="flex-1 w-full">
            <label className="flex items-center gap-4 cursor-pointer group bg-off-white/50 p-5 rounded-2xl border-2 border-dashed border-warm-sand hover:border-zacatecas-pink transition-all">
              <input type="checkbox" id="wasPromotion" checked={inputs.wasPromotion} onChange={handleChange} className="sr-only" />
              <div className={`w-10 h-10 border-4 rounded-xl transition-all flex items-center justify-center shrink-0 ${inputs.wasPromotion ? 'bg-zacatecas-pink border-zacatecas-pink rotate-0' : 'bg-white border-warm-sand rotate-12'}`}>
                {inputs.wasPromotion && <i className="fa-solid fa-rocket text-white"></i>}
              </div>
              <div>
                <span className="block text-sm font-black text-charcoal uppercase leading-tight tracking-tight">Promotion Event?</span>
                <span className="text-[9px] font-bold text-charcoal/40 uppercase tracking-widest">Adjust priority to Market Parity</span>
              </div>
            </label>
          </div>
        </div>

        {error && (
          <div className="col-span-1 md:col-span-2 p-5 bg-lava-red/5 border-2 border-lava-red/20 rounded-2xl flex items-center gap-4 text-xs font-black text-lava-red uppercase tracking-tight animate-bounce">
            <i className="fa-solid fa-triangle-exclamation text-lg"></i>
            <span>{error}</span>
          </div>
        )}

        <button 
          type="submit" disabled={isLoading}
          className="col-span-1 md:col-span-2 bg-charcoal hover:bg-black text-off-white font-black py-6 px-10 rounded-2xl shadow-[0_20px_50px_rgba(45,27,27,0.3)] transition-all transform hover:-translate-y-1 active:scale-95 uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-6 group disabled:opacity-50"
        >
          <span className="relative z-10">Generate Paycheck GPS Report</span>
          <i className="fa-solid fa-location-arrow group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform text-ocean-teal"></i>
        </button>
      </form>
      
      <div className="mt-12 text-center opacity-20">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-charcoal">F5HRhhEC1Yvldsc • Secure Environment</p>
      </div>
    </section>
  );
};

export default WageForm;
