import { WeatherData, WeatherApiResponse } from '../types/global';
import { storeWeatherData } from '../helpers/helper';

const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const EXPLORER_BASE_URL = 'https://lora.algokit.io/localnet';

interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}

interface GeocodingResponse {
  results?: GeocodingResult[];
}

interface CurrentWeatherPayload {
  current?: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    rain: number;
  };
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`UPSTREAM_REQUEST_FAILED:${response.status}`);
  }

  return (await response.json()) as T;
}

/**
 * looks up a real city, fetches live weather for that location,
 * stores the reading on Algorand LocalNet, and returns the same
 * API shape already used by the frontend.
 */
export async function getWeatherData(city: string): Promise<WeatherApiResponse> {
  const geocodingUrl =
    `${GEOCODING_BASE_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

  const geocodingData = await fetchJson<GeocodingResponse>(geocodingUrl);
  const location = geocodingData.results?.[0];

  if (!location) {
    throw new Error('CITY_NOT_FOUND');
  }

  const weatherUrl =
    `${WEATHER_BASE_URL}` +
    `?latitude=${location.latitude}` +
    `&longitude=${location.longitude}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,rain` +
    `&wind_speed_unit=kmh`;

  const weatherApiData = await fetchJson<CurrentWeatherPayload>(weatherUrl);
  const current = weatherApiData.current;

  if (!current) {
    throw new Error('WEATHER_DATA_UNAVAILABLE');
  }

  const weatherData: WeatherData = {
    city: location.name,
    temperature: Number(current.temperature_2m.toFixed(1)),
    humidity: Math.round(current.relative_humidity_2m),
    windSpeed: Number(current.wind_speed_10m.toFixed(1)),
    rain: current.rain > 0,
  };

  const txId = await storeWeatherData(weatherData);

  return {
    data: weatherData,
    txId,
    explorerUrl: `${EXPLORER_BASE_URL}/transaction/${txId}`,
  };
}