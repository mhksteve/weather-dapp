import { Request, Response } from 'express';
import { getWeatherData } from '../services/weatherService';

/**
 * GET /weather/:city
 *
 * Validates the city param, triggers the blockchain-backed weather lookup,
 * and returns the full response including the Algorand transaction ID.
 */
export async function getWeather(req: Request, res: Response): Promise<void> {
  const { city } = req.params;

  if (!city || city.trim().length === 0) {
    res.status(400).json({ error: 'A city name is required.' });
    return;
  }

  try {
    const result = await getWeatherData(city.trim()); //trims spaces
    res.status(200).json(result);
  } catch (error) {
    // Log the full error server-side; return a safe message to the client
    console.error('[WeatherController] Failed to process request:', error);
    res.status(500).json({
      error:
        'Could not fetch weather data or communicate with the Algorand node. ' +
        'Please ensure AlgoKit LocalNet is running.',
    });
  }
}
