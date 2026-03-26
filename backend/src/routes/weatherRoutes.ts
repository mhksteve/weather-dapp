import { Router } from 'express';
import { getWeather } from '../controllers/weatherController';

const router = Router();

/**
 * @route  GET /weather/:city
 * @desc   Returns simulated weather data for a city, stored on Algorand.
 * @access Public
 */
router.get('/:city', getWeather);

export default router;
