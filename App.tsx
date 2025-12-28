
import React, { useState, useRef } from 'react';
import Header from './components/Header';
import WageForm from './components/WageForm';
import ResultsSection from './components/ResultsSection';
import Footer from './components/Footer';
import { calculateWageGaps } from './services/wageCalculator';
import { WageAnalysisInputs, WageAnalysisResults } from './types';

const App: React.FC = () => {
  const [results, setResults] = useState<WageAnalysisResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = (inputs: WageAnalysisInputs) => {
    const analysisResults = calculateWageGaps(inputs);
    setResults(analysisResults);
    
    // Smooth scroll to results after a short delay to allow React to render
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-zacatecas-pink selection:text-white">
      <Header />
      
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 space-y-12">
        <WageForm 
          onAnalyze={handleAnalyze} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
        />
        
        {results && (
          <div ref={resultsRef} className="pt-8">
            <ResultsSection results={results} />
          </div>
        )}

        {!results && !isLoading && (
          <div className="text-center py-20 opacity-30 select-none pointer-events-none">
            <i className="fa-solid fa-magnifying-glass-chart text-8xl text-charcoal mb-4"></i>
            <p className="text-xl font-black uppercase tracking-[0.2em] text-charcoal">
              Waiting for Data Map
            </p>
          </div>
        )}
      </main>

      <Footer />

      {/* Background decoration elements */}
      <div className="fixed -bottom-48 -left-48 w-96 h-96 bg-ocean-teal/10 rounded-full blur-[100px] -z-10"></div>
      <div className="fixed -top-48 -right-48 w-96 h-96 bg-zacatecas-pink/10 rounded-full blur-[100px] -z-10"></div>
    </div>
  );
};

export default App;
