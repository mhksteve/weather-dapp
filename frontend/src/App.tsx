/**
 * App.tsx — composition root.
 *
 * All data-fetching logic lives in useWeather().
 * All visual sub-sections live in their own component files under /components.
 * This file is intentionally thin: it wires state to UI, nothing more.
 */
import { useWeather } from './hooks/useWeather';
import { SearchForm } from './components/SearchForm';
import { StatusCard } from './components/StatusCard';
import { WeatherCard } from './components/WeatherCard';
import { ProofCard } from './components/ProofCard';

export default function App() {
  const { result, loading, error, fetchWeather } = useWeather();

  return (
    <div className="app">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="hero">
        <div className="algo-badge">⬡ ALGORAND LOCALNET</div>
        <h1>
          Weather <span className="accent">on Chain</span>
        </h1>
        <p className="tagline">
          Every reading encoded with MessagePack and stored immutably on the
          Algorand blockchain.
        </p>
      </header>

      {/* ── Main content ───────────────────────────────────── */}
      <main>
        <SearchForm onSearch={fetchWeather} disabled={loading} />

        {loading && <StatusCard kind="loading" />}

        {error && !loading && <StatusCard kind="error" message={error} />}

        {result && !loading && (
          <div className="result-grid">
            <WeatherCard data={result.data} />
            <ProofCard txId={result.txId} explorerUrl={result.explorerUrl} />
          </div>
        )}
      </main>
    </div>
  );
}
