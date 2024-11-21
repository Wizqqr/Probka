import express from 'express';
import { register, login, verifyCode, forgotPassword, resetPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/verify-code', verifyCode);

router.post('/reset-password', forgotPassword);

router.post('/reset-password/confirm', resetPassword);

export default router;
