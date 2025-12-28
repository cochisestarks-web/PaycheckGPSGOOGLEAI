
import { MarketWages } from './types';

export const MONTHLY_INFLATION_RATES = {
  2020: { Jan: 2.5, Feb: 2.3, Mar: 1.5, Apr: 0.3, May: 0.1, Jun: 0.6, Jul: 1.0, Aug: 1.3, Sep: 1.4, Oct: 1.2, Nov: 1.2, Dec: 1.4 },
  2021: { Jan: 1.4, Feb: 1.7, Mar: 2.6, Apr: 4.2, May: 5.0, Jun: 5.4, Jul: 5.4, Aug: 5.3, Sep: 5.4, Oct: 6.2, Nov: 6.8, Dec: 7.0 },
  2022: { Jan: 7.5, Feb: 7.9, Mar: 8.5, Apr: 8.3, May: 8.6, Jun: 9.1, Jul: 8.5, Aug: 8.3, Sep: 8.2, Oct: 7.7, Nov: 7.1, Dec: 6.5 },
  2023: { Jan: 6.4, Feb: 6.0, Mar: 5.0, Apr: 4.9, May: 4.0, Jun: 3.0, Jul: 3.2, Aug: 3.7, Sep: 3.7, Oct: 3.2, Nov: 3.1, Dec: 3.4 },
  2024: { Jan: 3.1, Feb: 3.2, Mar: 3.5, Apr: 3.4, May: 3.3, Jun: 3.0, Jul: 2.9, Aug: 2.5, Sep: 2.4, Oct: 2.6, Nov: 2.6, Dec: 2.9 }
};

export const ANNUAL_INFLATION_RATES = {
  2020: 1.4,
  2021: 7.0,
  2022: 6.5,
  2023: 3.4,
  2024: 2.9
};

export const YEAR_CONTEXTS = {
  2020: "2020 saw low inflation (1.4%), but set the stage for the steepest 4-year price increases since the 1970s.",
  2021: "You started during a 40-year inflation record. 2021's 7.0% inflation was the highest since 1982.",
  2022: "2022 marked peak inflation - June hit 9.1%, the highest rate in 41 years.",
  2023: "Inflation began cooling in 2023 (3.4%), but prices remained 20%+ higher than 2020.",
  2024: "2024 inflation has moderated to 2.9%, but cumulative impact since 2020 remains at 23%."
};

export const CUMULATIVE_INFLATION: Record<number, number> = {
  2020: 22.9,
  2021: 21.2,
  2022: 13.4,
  2023: 6.4,
  2024: 2.9
};

export const MARKET_WAGES: MarketWages = {
  "Retail Salespersons": { "National Average": 16.35, "Atlanta, GA": 15.82, "New York, NY": 19.45, "Los Angeles, CA": 19.10, "Chicago, IL": 17.65, "Houston, TX": 15.50, "Phoenix, AZ": 16.90, "Dallas, TX": 16.20 },
  "Cashiers": { "National Average": 15.05, "Atlanta, GA": 14.10, "New York, NY": 17.20, "Los Angeles, CA": 18.40, "Chicago, IL": 15.90, "Houston, TX": 13.80, "Phoenix, AZ": 15.50, "Dallas, TX": 14.20 },
  "Retail Supervisors": { "National Average": 24.80, "Atlanta, GA": 23.95, "New York, NY": 28.50, "Los Angeles, CA": 27.90, "Chicago, IL": 25.40, "Houston, TX": 22.80, "Phoenix, AZ": 24.10, "Dallas, TX": 23.50 },
  "Stock Clerks": { "National Average": 18.30, "Atlanta, GA": 17.90, "New York, NY": 21.20, "Los Angeles, CA": 20.80, "Chicago, IL": 19.45, "Houston, TX": 17.50, "Phoenix, AZ": 18.60, "Dallas, TX": 18.10 },
  "Customer Service Representatives": { "National Average": 21.50, "Atlanta, GA": 21.10, "New York, NY": 24.80, "Los Angeles, CA": 23.90, "Chicago, IL": 22.50, "Houston, TX": 20.40, "Phoenix, AZ": 21.20, "Dallas, TX": 21.50 },
  "Waiters and Waitresses": { "National Average": 17.80, "Atlanta, GA": 15.40, "New York, NY": 22.10, "Los Angeles, CA": 21.50, "Chicago, IL": 18.20, "Houston, TX": 14.90, "Phoenix, AZ": 17.20, "Dallas, TX": 15.10 },
  "Warehouse Workers": { "National Average": 19.65, "Atlanta, GA": 18.85, "New York, NY": 21.40, "Los Angeles, CA": 20.90, "Chicago, IL": 20.10, "Houston, TX": 18.70, "Phoenix, AZ": 20.40, "Dallas, TX": 19.10 },
  "Delivery Drivers": { "National Average": 22.40, "Atlanta, GA": 21.80, "New York, NY": 25.10, "Los Angeles, CA": 24.50, "Chicago, IL": 23.20, "Houston, TX": 20.60, "Phoenix, AZ": 21.90, "Dallas, TX": 21.20 },
  "Administrative Assistants": { "National Average": 23.80, "Atlanta, GA": 23.10, "New York, NY": 27.40, "Los Angeles, CA": 26.80, "Chicago, IL": 24.20, "Houston, TX": 22.50, "Phoenix, AZ": 23.40, "Dallas, TX": 23.10 },
  "Data Entry Specialists": { "National Average": 19.15, "Atlanta, GA": 18.50, "New York, NY": 22.30, "Los Angeles, CA": 21.40, "Chicago, IL": 19.80, "Houston, TX": 18.20, "Phoenix, AZ": 19.50, "Dallas, TX": 18.90 },
  "Software Developers": { "National Average": 65.20, "Atlanta, GA": 62.40, "New York, NY": 78.10, "Los Angeles, CA": 72.50, "Chicago, IL": 61.80, "Houston, TX": 58.90, "Phoenix, AZ": 60.20, "Dallas, TX": 63.10 },
  "Computer Support Specialists": { "National Average": 29.40, "Atlanta, GA": 28.60, "New York, NY": 34.50, "Los Angeles, CA": 32.80, "Chicago, IL": 30.10, "Houston, TX": 27.40, "Phoenix, AZ": 28.90, "Dallas, TX": 29.20 },
  "Registered Nurses": { "National Average": 47.32, "Atlanta, GA": 46.50, "New York, NY": 56.35, "Los Angeles, CA": 61.20, "Chicago, IL": 48.65, "Houston, TX": 44.90, "Phoenix, AZ": 46.80, "Dallas, TX": 45.10 },
  "Construction Managers": { "National Average": 56.40, "Atlanta, GA": 54.80, "New York, NY": 71.20, "Los Angeles, CA": 65.40, "Chicago, IL": 58.20, "Houston, TX": 55.10, "Phoenix, AZ": 53.90, "Dallas, TX": 56.20 }
};

export const JOBS = Object.keys(MARKET_WAGES);
export const LOCATIONS = [
  "National Average",
  "Atlanta, GA",
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Dallas, TX"
];
