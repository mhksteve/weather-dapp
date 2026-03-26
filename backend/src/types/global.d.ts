/**
 * Core domain types for the Weather DApp.
 * Extending the original WeatherData interface to include:
 *  - `city`  — the queried location
 *  - `txId`  — the Algorand transaction ID that proves immutable storage
 */
export interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  rain: boolean;
}

/**
 * The shape of the full API response returned to the frontend.
 * It bundles the weather reading together with its blockchain receipt.
 */
export interface WeatherApiResponse {
  data: WeatherData;
  txId: string;
  explorerUrl: string;
}
