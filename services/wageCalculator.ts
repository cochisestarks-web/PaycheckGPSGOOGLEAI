
import { WageAnalysisInputs, WageAnalysisResults } from '../types';
import { CUMULATIVE_INFLATION, MARKET_WAGES, ANNUAL_INFLATION_RATES, YEAR_CONTEXTS } from '../constants';

export function calculateWageGaps(inputs: WageAnalysisInputs): WageAnalysisResults {
  const { 
    wage, 
    year, 
    job, 
    location, 
    hoursPerWeek, 
    wasPromotion, 
    aiMarketRate, 
    aiInflationRate,
    aiExplanation,
    aiYearContext
  } = inputs;
  
  // Calculate annual hours
  const annualWorkingHours = hoursPerWeek * 52;
  
  // Step 1: Calculate inflation-adjusted wage
  // Prioritize AI inflation rate if provided, else use static fallback
  const inflationRate = aiInflationRate !== undefined ? aiInflationRate : (CUMULATIVE_INFLATION[year] || 0);
  const inflationAdjustedWage = wage * (1 + inflationRate / 100);
  
  // Step 2: Get market rate
  let rawMarketRate = 0;
  if (aiMarketRate) {
    rawMarketRate = aiMarketRate;
  } else if (MARKET_WAGES[job] && MARKET_WAGES[job][location]) {
    rawMarketRate = MARKET_WAGES[job][location];
  } else {
    // Basic safety fallback if both AI and static data fail
    rawMarketRate = 18.50; 
  }
  
  // Step 3: Current Market Adjustments
  // If AI provided it, we treat it as live (0 adjustment). If static, we add 2024 projections.
  const marketDataInflation = aiMarketRate ? 0 : (ANNUAL_INFLATION_RATES[2024] || 2.9); 
  const currentMarketRate = rawMarketRate * (1 + marketDataInflation / 100);
  
  // Step 4: Calculate Gaps
  const inflationGap = inflationAdjustedWage - wage;
  const marketGap = currentMarketRate - wage;
  
  // Step 5: Determine Target Wage based on user's context (Promotion vs Standard)
  let targetWage: number;
  let primaryBenchmark: 'inflation' | 'market' | 'market-only';
  
  if (wasPromotion) {
    targetWage = currentMarketRate;
    primaryBenchmark = 'market-only';
  } else {
    targetWage = Math.max(inflationAdjustedWage, currentMarketRate);
    primaryBenchmark = (targetWage === inflationAdjustedWage) ? 'inflation' : 'market';
  }
  
  // Step 6: Final Metrics
  const totalGap = targetWage - wage;
  const inflationImpact = inflationGap * annualWorkingHours;
  const marketImpact = marketGap * annualWorkingHours;
  const totalImpact = totalGap * annualWorkingHours;
  
  return {
    ...inputs,
    annualWorkingHours,
    inflationAdjustedWage,
    currentMarketRate,
    rawMarketRate,
    inflationGap,
    marketGap,
    totalGap,
    inflationImpact,
    marketImpact,
    totalImpact,
    targetWage,
    primaryBenchmark,
    yearContext: aiYearContext || YEAR_CONTEXTS[year as keyof typeof YEAR_CONTEXTS] || "Historical economic data for this period is being approximated.",
    aiExplanation
  };
}
