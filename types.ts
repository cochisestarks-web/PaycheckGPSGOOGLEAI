
export interface WageAnalysisInputs {
  wage: number;
  year: number;
  job: string;
  location: string;
  hoursPerWeek: number;
  wasPromotion: boolean;
  aiMarketRate?: number;
  aiInflationRate?: number;
  aiExplanation?: string;
  aiYearContext?: string;
}

export interface WageAnalysisResults {
  wage: number;
  year: number;
  job: string;
  location: string;
  hoursPerWeek: number;
  annualWorkingHours: number;
  wasPromotion: boolean;
  
  inflationAdjustedWage: number;
  currentMarketRate: number;
  rawMarketRate: number;
  
  inflationGap: number;
  marketGap: number;
  totalGap: number;
  
  inflationImpact: number;
  marketImpact: number;
  totalImpact: number;
  
  targetWage: number;
  primaryBenchmark: 'inflation' | 'market' | 'market-only';
  
  yearContext: string;
  aiExplanation?: string;
}

export interface InflationData {
  [year: number]: {
    [month: string]: number;
  };
}

export interface MarketWages {
  [jobTitle: string]: {
    [location: string]: number;
  };
}
