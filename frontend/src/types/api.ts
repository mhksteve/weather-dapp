/**
 * Mirrors the WeatherData interface from the backend.
 * Kept in sync manually — in a monorepo you could share this directly.
 */
export interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  rain: boolean;
}

/**
 * The full response shape returned by GET /weather/:city.
 */
export interface WeatherApiResponse {
  data: WeatherData;
  txId: string;
  explorerUrl: string;
}
