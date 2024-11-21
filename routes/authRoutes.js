import express from 'express';
import { register, login, verifyCode, forgotPassword, resetPassword, getMe } from '../controllers/authController.js';
import { generalLimiter, authLimiter } from '../utils/rateLimiter.js'
import checkAuth from '../utils/checkAuth.js'
const router = express.Router();

router.use(generalLimiter);

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/verify-code', authLimiter, verifyCode);
router.post('/reset-password', authLimiter, forgotPassword);
router.post('/reset-password/confirm', authLimiter, resetPassword);
router.get('/getme',checkAuth, getMe  )

export default router;
