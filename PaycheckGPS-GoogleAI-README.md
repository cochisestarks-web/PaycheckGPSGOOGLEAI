# PaycheckGPS + AI Analysis

An AI-enhanced wage gap calculator that combines BLS labor market data with Google Gemini AI for personalized market insights and negotiation strategies.

## Live Demo

👉 [paycheck-gpsgoogleai.vercel.app](https://paycheck-gpsgoogleai.vercel.app/)

> **Also available:** [Static version](https://paycheckgps.netlify.app/) (vanilla JS, no AI dependencies)

## What It Does

PaycheckGPS helps workers understand the real gap between their current wages and what they should be earning. This AI-enhanced version adds:

- **Inflation Analysis** — Calculates purchasing power loss using 2020-2024 CPI data
- **Market Comparison** — Benchmarks against current wages by job title and metro area
- **AI-Powered Insights** — Gemini analyzes your specific situation and generates actionable recommendations
- **Negotiation Scripts** — AI-generated talking points tailored to your industry and gap size

## Example Output

A grocery clerk in Atlanta earning $14/hr since 2022:
- Inflation-adjusted rate: $15.82/hr
- Market rate: $17.20/hr
- Annual gap: ~$6,656
- AI recommendation: Specific steps for wage negotiation based on role and market conditions

## Tech Stack

- **Frontend:** React + TypeScript
- **Build:** Vite
- **Styling:** Tailwind CSS
- **AI Integration:** Google Gemini API via AI Studio
- **Data:** BLS Occupational Employment Statistics (2023-2024)
- **Deployment:** Vercel

## Architecture

```
├── App.tsx              # Main application component
├── components/          # UI components
├── services/            # Gemini API integration
├── constants.ts         # BLS wage data, CPI values
├── types.ts             # TypeScript interfaces
└── index.html           # Entry point
```

## Two Versions, One Problem

| Feature | Static Version | AI Version |
|---------|---------------|------------|
| Wage calculation | ✓ | ✓ |
| Inflation adjustment | ✓ | ✓ |
| Market comparison | ✓ | ✓ |
| AI analysis | — | ✓ |
| Negotiation scripts | — | ✓ |
| API dependency | None | Gemini |
| Offline capable | ✓ | — |

The static version works anywhere with zero dependencies. The AI version provides deeper analysis when API access is available.

## Local Development

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Set your Gemini API key
echo "GEMINI_API_KEY=your_key_here" > .env.local

# Run development server
npm run dev
```

## Why This Exists

Most workers don't realize how much ground they've lost to inflation. Between 2020-2024, cumulative inflation exceeded 20% while median wage growth lagged behind. This tool makes that gap visible and actionable.

Built as part of a portfolio demonstrating practical AI integration—using LLMs to enhance traditional applications rather than replace human judgment.

## Part of the Human Infrastructure Operating System

This project treats workers as maintainable infrastructure rather than consumable resources. Other projects in this framework:

- **[FrostOptima](https://github.com/cochisestarks-web/frostoptima)** — Labor capacity optimization for retail operations

## Author

Built by Derek—20 years in retail operations, transitioning to AI/LLM development. Focused on tools that give workers leverage through better information.

## License

MIT
