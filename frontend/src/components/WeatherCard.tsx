import type { WeatherData } from '../types/api';

interface WeatherCardProps {
  data: WeatherData;
}

/**
 * Displays the weather reading for the queried city.
 * Temperature colour shifts based on value:
 *  ≥ 25°C → orange (hot)
 *  ≤  8°C → blue   (cold)
 *  else   → teal   (default accent)
 */
export function WeatherCard({ data }: WeatherCardProps) {
  const tempClass =
    data.temperature >= 25 ? 'hot' : data.temperature <= 8 ? 'cold' : '';

  return (
    <section className="card weather-card">
      <p className="card-eyebrow">Current conditions</p>
      <h2 className="city-name">{data.city}</h2>

      <div className={`big-temp ${tempClass}`}>
        {data.temperature}
        <span className="temp-unit">°C</span>
      </div>

      <div className="weather-stats">
        <Stat icon="💧" value={`${data.humidity}%`}        label="Humidity" />
        <Stat icon="🌬" value={`${data.windSpeed} km/h`}   label="Wind" />
        <Stat
          icon={data.rain ? '🌧' : '☀️'}
          value={data.rain ? 'Yes' : 'No'}
          label="Rain"
        />
      </div>
    </section>
  );
}

// ── Internal helper ───────────────────────────────────────────────────────────

interface StatProps {
  icon: string;
  value: string;
  label: string;
}

function Stat({ icon, value, label }: StatProps) {
  return (
    <div className="stat">
      <span className="stat-icon" aria-hidden="true">{icon}</span>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
