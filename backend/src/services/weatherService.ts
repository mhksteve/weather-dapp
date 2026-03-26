import { WeatherData, WeatherApiResponse } from '../types/global';
import { storeWeatherData } from '../helpers/helper';

// The Lora block explorer URL (AlgoKit LocalNet default port)
const EXPLORER_BASE_URL = 'https://lora.algokit.io/localnet';

/**
 * Generates a simulated weather reading for the given city,
 * persists it on the Algorand LocalNet blockchain, and returns
 * a combined response containing both the data and the on-chain receipt.
 *
 * @param city - The city name provided by the API caller.
 * @returns A WeatherApiResponse with the reading and its Algorand txId.
 */
export async function getWeatherData(city: string): Promise<WeatherApiResponse> {
  // Generate a realistic-looking weather snapshot
  const weatherData: WeatherData = {
    city,
    temperature: parseFloat((Math.random() * 35 + 2).toFixed(1)),   // 2–37 °C
    humidity: Math.floor(Math.random() * 60 + 30),                    // 30–90 %
    windSpeed: parseFloat((Math.random() * 60).toFixed(1)),           // 0–60 km/h
    rain: Math.random() > 0.6,
  };

  // Persist the reading on-chain and retrieve the proof
  const txId = await storeWeatherData(weatherData);

  return {
    data: weatherData,
    txId,
    explorerUrl: `${EXPLORER_BASE_URL}/transaction/${txId}`,
  };
}
