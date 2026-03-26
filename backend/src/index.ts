import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weatherRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

// ── Middleware ────────────────────────────────────────────────────────────────

app.use(cors({ origin: 'http://localhost:5173' })); // Vite dev server
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────

app.use('/weather', weatherRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Start ─────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n🌤  Weather DApp API running on http://localhost:${PORT}`);
  console.log(`   Algorand LocalNet: http://localhost:4001`);
  console.log(`   Lora Explorer:     http://localhost:3900\n`);
});

export default app;
