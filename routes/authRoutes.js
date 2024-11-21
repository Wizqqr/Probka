import express from 'express';
import { register, login, verifyCode, forgotPassword, resetPassword, getMe } from '../controllers/authController.js';
import checkAuth from '../utils/checkAuth.js'
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/verify-code', verifyCode);
router.post('/reset-password', forgotPassword);
router.post('/reset-password/confirm', resetPassword);
router.get('/getme', checkAuth, getMe  )

export default router;
