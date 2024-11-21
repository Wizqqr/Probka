import express from 'express';
import { startTrip, endTrip, getTripHistory, getUserLevel } from '../controllers/tripController.js';
import checkAuth from '../utils/checkAuth.js'
const router = express.Router();

router.post('/start',checkAuth, startTrip);

router.post('/end', checkAuth, endTrip);

router.get('/level',checkAuth,  getUserLevel);

router.get('/history', checkAuth, getTripHistory);

export default router;
