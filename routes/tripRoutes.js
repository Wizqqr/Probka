import express from 'express';
import { startTrip, endTrip, getTripHistory } from '../controllers/tripController.js';

const router = express.Router();

router.post('/start', startTrip);

router.post('/end', endTrip);

router.get('/history', getTripHistory);

export default router;
