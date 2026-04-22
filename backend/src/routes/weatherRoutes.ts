import { Router } from 'express';
import { getWeather } from '../controllers/weatherController';

const router = Router();

/**
 * @route
 * @desc
 * @access
 */
router.get('/:city', getWeather);

export default router;
