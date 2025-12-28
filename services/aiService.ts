
import { GoogleGenAI, Type } from "@google/genai";

export interface AIMarketData {
  standardJobTitle: string;
  standardLocation: string;
  hourlyRate: number;
  cumulativeInflation: number;
  yearContext: string;
  explanation: string;
}

/**
 * Fetches standardized labor market data and inflation metrics using Gemini 3.
 * Uses process.env.API_KEY which is injected into the environment.
 */
export async function fetchAIMarketData(job: string, location: string, year: number): Promise<AIMarketData> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const currentYear = new Date().getFullYear();
  const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `As an expert labor economist, provide standardized market data and cumulative inflation analysis for:
    - Target Role: "${job}"
    - Geographic Market: "${location}"
    - Base Comparison Year: ${year}
    - Current Reference: ${currentMonth} ${currentYear}

    Required Steps:
    1. Standardize the Job Title to the most relevant SOC (Standard Occupational Classification) title.
    2. Normalize the Location (City, State or Region).
    3. Determine the current median hourly market rate based on BLS (Bureau of Labor Statistics) OEWS data and recent private sector benchmarks.
    4. Calculate the total cumulative inflation (CPI-U) percentage change from ${year} to ${currentYear}.
    5. Provide a one-sentence historical economic context for ${year}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          standardJobTitle: { type: Type.STRING, description: "Standardized professional title." },
          standardLocation: { type: Type.STRING, description: "Standardized City, State or Region." },
          hourlyRate: { type: Type.NUMBER, description: "Current median hourly rate in USD." },
          cumulativeInflation: { type: Type.NUMBER, description: "Total % inflation since the base year (e.g., 21.4)." },
          yearContext: { type: Type.STRING, description: "Short economic summary of the base year." },
          explanation: { type: Type.STRING, description: "Brief source or methodology attribution." }
        },
        required: ["standardJobTitle", "standardLocation", "hourlyRate", "cumulativeInflation", "yearContext", "explanation"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("The AI economic engine failed to return a response.");
  
  try {
    return JSON.parse(text) as AIMarketData;
  } catch (e) {
    console.error("Parse Error:", text);
    throw new Error("Data standardization failed. Please try again.");
  }
}
