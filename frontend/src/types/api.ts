/**
 * mirrors the WeatherData interface from the backend.
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
