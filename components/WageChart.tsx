
import React from 'react';
import { WageAnalysisResults } from '../types';

interface WageChartProps {
  results: WageAnalysisResults;
}

const WageChart: React.FC<WageChartProps> = ({ results }) => {
  const years = [0, 1, 2, 3, 4, 5];
  const annualHours = results.annualWorkingHours;
  
  // Calculate cumulative loss over 5 years
  const data = years.map(year => ({
    year: year === 0 ? 'Now' : `Year ${year}`,
    cumulativeLoss: results.totalGap * annualHours * year,
    inflationLoss: results.inflationGap * annualHours * year,
    marketLoss: results.marketGap * annualHours * year
  }));

  const maxVal = Math.max(...data.map(d => Math.abs(d.cumulativeLoss)), 1000);
  const chartHeight = 200;
  const chartWidth = 500;
  const padding = 40;

  const getX = (index: number) => (index / (years.length - 1)) * (chartWidth - padding * 2) + padding;
  const getY = (value: number) => {
    const normalized = value / maxVal;
    return (chartHeight / 2) + (normalized * (chartHeight / 2 - padding));
  };

  // Generate path for the total gap
  const pathD = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.cumulativeLoss)}`).join(' ');

  return (
    <div className="w-full bg-white/50 rounded-xl p-4 border border-warm-sand/30 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xs font-black uppercase tracking-widest text-charcoal/60">5-Year Cumulative Wealth Impact</h4>
        <div className="flex gap-4 text-[10px] font-bold uppercase">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-lava-red"></span>
            <span>Projected Gap</span>
          </div>
        </div>
      </div>
      
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
        {/* Baseline */}
        <line 
          x1={padding} y1={chartHeight / 2} 
          x2={chartWidth - padding} y2={chartHeight / 2} 
          stroke="#3C2F2F" strokeWidth="1" strokeDasharray="4 4" opacity="0.2"
        />
        
        {/* Trend Line */}
        <path 
          d={pathD} 
          fill="none" 
          stroke={results.totalGap > 0 ? "#C41E3A" : "#2E8B57"} 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="drop-shadow-sm"
        />

        {/* Data Points */}
        {data.map((d, i) => (
          <g key={i}>
            <circle 
              cx={getX(i)} cy={getY(d.cumulativeLoss)} r="5" 
              fill={results.totalGap > 0 ? "#C41E3A" : "#2E8B57"}
            />
            <text 
              x={getX(i)} y={getY(d.cumulativeLoss) - 12} 
              textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2D1B1B"
            >
              ${Math.abs(d.cumulativeLoss).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </text>
            <text 
              x={getX(i)} y={chartHeight - 5} 
              textAnchor="middle" fontSize="9" fontWeight="bold" fill="#2D1B1B" opacity="0.4"
            >
              {d.year}
            </text>
          </g>
        ))}
      </svg>
      
      <div className="mt-4 flex justify-between items-center text-[10px] font-bold text-charcoal/40 uppercase tracking-tighter">
        <span>Current Trajectory</span>
        <span>Future Liability</span>
      </div>
    </div>
  );
};

export default WageChart;
