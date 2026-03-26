import { useState, useCallback } from 'react';
import type { WeatherApiResponse } from '../types/api';

const API_BASE = 'http://localhost:3000';

/** All the state and behaviour the UI needs for a weather lookup. */
export interface UseWeatherReturn {
  result: WeatherApiResponse | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
  reset: () => void;
}

/**
 * Encapsulates the fetch lifecycle for the weather endpoint.
 *
 * Separating this into a hook means:
 *  - App.tsx stays a pure layout/composition component.
 *  - The fetch logic is independently testable.
 *  - State transitions (idle → loading → success/error) are in one place.
 */
export function useWeather(): UseWeatherReturn {
  const [result, setResult] = useState<WeatherApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (city: string): Promise<void> => {
    const trimmed = city.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `${API_BASE}/weather/${encodeURIComponent(trimmed)}`
      );

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(
          (body as { error?: string }).error ??
            `Server responded with status ${response.status}`
        );
      }

      const data: WeatherApiResponse = await response.json();
      setResult(data);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Network error — is the backend running?';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback((): void => {
    setResult(null);
    setError(null);
  }, []);

  return { result, loading, error, fetchWeather, reset };
}
