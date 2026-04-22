# Weather DApp — Algorand Web3 Project



A Web3 Decentralized Application that fetches weather data and stores each weather
reading on Algorand LocalNet as confirmed on-chain transaction data.
Built with Node.js / Express / TypeScript on the backend and React / Vite /
TypeScript on the frontend.


## Architecture

```
weather-dapp/
├── backend/                              Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/config.ts           Algorand client + account (from .env)
│   │   ├── helpers/helper.ts                msgpack encode + on-chain storage
│   │   ├── services/weatherService.ts        Fetch live weather + call helper
│   │   ├── controllers/weatherController.ts     HTTP request handling + validation
│   │   ├── routes/weatherRoutes.ts         Express routes
│   │   ├── types/global.d.ts              Shared domain types
│   │   └── index.ts                     Backend entry point
│   ├── .env                             Secrets (gitignored)
│   └── eslint.config.js                 ESLint config
└── frontend/                            React + Vite + TypeScript
    ├── src/
    │   ├── components/
    │   │   ├── ProofCard.tsx            Blockchain proof UI
    │   │   ├── SearchForm.tsx           City input + submit
    │   │   ├── StatusCard.tsx           Loading + error states
    │   │   └── WeatherCard.tsx          Weather result display
    │   ├── hooks/useWeather.ts            Fetch lifecycle + state management
    │   ├── types/api.ts                   API response types
    │   ├── App.tsx                      Main UI composition
    │   └── App.css                      Dark blockchain-themed styles
    └── eslint.config.js                 ESLint config
```
---
## Prerequisites

| Tool           | Version                        |
|----------------|--------------------------------|
| Node.js        | ≥ 18                           |
| npm            | ≥ 9                            |
| AlgoKit CLI    | latest (`pip install algokit`) |
| Docker Desktop | -                              |
---
## Quick Start
- Start Docker Desktop
- Run `algokit localnet start`
- Get account address `algokit account list`
- Get 25-words mnemonic `algokit goal account export -a <ACCOUNT_ADDRESS>`
- Copy .env.example to .env
- Paste the mnemonic into ACCOUNT_MNEMONIC
- Run backend
- Run frontend

## Detailed Setup

### 1. Algorand LocalNet

```bash
algokit localnet start
```

Local Algorand API at `http://localhost:4001`
Lora block explorer at `http://localhost:3900`

### 2. Get a funded account mnemonic

Open the `algokit explore`, export one of the pre-funded LocalNet
accounts, and copy its 25-word mnemonic.

### 3. Configure the backend

```bash
cd backend
cp .env.example .env
# Edit .env and paste mnemonic as ACCOUNT_MNEMONIC
```

### 4. Run  backend

```bash
cd backend
npm install
npm run build:watch   # terminal 1 — watches for TS changes
npm run dev           # terminal 2 — starts the server
```

API available at: `http://localhost:3000`

### 5. Run frontend

```bash
cd frontend
npm install
npm run dev
```

UI at: `http://localhost:5173`

## Code Quality

```bash
# Lint on both /backend or /frontend
npm run lint          # report issues
npm run lint:fix      # auto-fix

# Format on both /backend or /frontend
npm run format        # Prettier
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/weather/:city` | Returns weather data + Algorand txId |
| GET | `/health` | Health check |

### Example response
http://localhost:3000/weather/:city
```json
{
  "data": {
    "city": "London",
    "temperature": 14.3,
    "humidity": 72,
    "windSpeed": 18.5,
    "rain": true
  },
  "txId": "TXID7EXAMPLEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "explorerUrl": "https://lora.algokit.io/localnet/transaction/..."
}
```
http://localhost:3000/health
```json
{
  "status": "ok",
  "timestamp": "2026-04-22T11:59:36.949Z"
}
