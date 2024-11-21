import express from 'express';
import { getRewards, redeemReward } from '../controllers/rewardController.js';
import checkAuth from '../utils/checkAuth.js';
const router = express.Router();

router.get('/rewards', checkAuth, getRewards);
router.post('/rewards/redeem', checkAuth, redeemReward);

export default router;
