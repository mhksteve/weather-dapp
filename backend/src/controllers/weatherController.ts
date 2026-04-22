import { Request, Response } from 'express';
import { getWeatherData } from '../services/weatherService';

/**
 * GET /weather/:city
 *
 * validates the city param, fetches live weather for a real location,
 * stores the weather reading on Algorand LocalNet, and returns the
 * full response
 */
export async function getWeather(req: Request, res: Response): Promise<void> {
  const { city } = req.params;

  if (!city || city.trim().length === 0) {
    res.status(400).json({ error: 'A city name is required.' });
    return;
  }

  try {
    const result = await getWeatherData(city.trim());
    res.status(200).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : '';

    if (message === 'CITY_NOT_FOUND') {
      res.status(404).json({
        error: `No matching city was found for "${city.trim()}".`,
      });
      return;
    }

    if (message === 'WEATHER_DATA_UNAVAILABLE' || message.startsWith('UPSTREAM_REQUEST_FAILED:')) {
      res.status(502).json({
        error: 'Could not retrieve live weather data from the weather provider.',
      });
      return;
    }

    console.error('[WeatherController] Failed to process request:', error);
    res.status(500).json({
      error:
        'Could not store weather data on Algorand. ' +
        'Make sure AlgoKit LocalNet is running',
    });
  }
}
