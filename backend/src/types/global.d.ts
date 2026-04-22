/**
 * Core domain types for the Weather DApp.
 */
export interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  rain: boolean;
}

/**
 * the shape of the full API response returned to the frontend.
 * it bundles the weather reading together with its blockchain receipt.
 */
export interface WeatherApiResponse {
  data: WeatherData;
  txId: string;
  explorerUrl: string;
}
