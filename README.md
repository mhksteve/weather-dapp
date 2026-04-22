# Weather DApp — Algorand Web3 Assignment

A Web3 Decentralized Application that fetches weather data and stores every
reading permanently on the **Algorand LocalNet** blockchain (via AlgoKit).
Built with Node.js / Express / TypeScript on the backend and React / Vite /
TypeScript on the frontend.

---

## Architecture

```
weather-dapp/
├── backend/           Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/config.ts          Algorand client + account (from .env)
│   │   ├── helpers/helper.ts         msgpack encode + on-chain storage
│   │   ├── services/weatherService.ts Generate data + call helper
│   │   ├── controllers/              HTTP layer
│   │   ├── routes/                   Express routes
│   │   └── types/global.d.ts         Shared domain types
│   └── .env                          ← secrets (gitignored)
└── frontend/          React + Vite + TypeScript
    └── src/
        ├── App.tsx                   UI: search, weather card, proof card
        ├── App.css                   Dark blockchain-themed styles
        └── types/api.ts              API response types
```

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18 |
| AlgoKit CLI | latest (`pip install algokit`) |
| npm | ≥ 9 |

---

## Quick Start

### 1. Algorand LocalNet

```bash
algokit localnet start
```

Local Algorand node at `http://localhost:4001` 

Lora block explorer at `http://localhost:3900`

### 2. Get a funded account mnemonic

Open the KMD API at `http://localhost:4002` (or use `algokit explore`),
export one of the pre-funded LocalNet accounts, and copy its 25-word mnemonic.

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
# Lint
npm run lint          # report issues
npm run lint:fix      # auto-fix

# Format
npm run format        # Prettier
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/weather/:city` | Returns weather data + Algorand txId |
| GET | `/health` | Health check |

### Example response

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
  "explorerUrl": "http://localhost:3900/transaction/TXID7EXAMPLE..."
}
```
