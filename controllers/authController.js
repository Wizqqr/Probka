import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { sendSMS } from '../config/twilio.js'
import jwt from 'jsonwebtoken';
import transporter from '../config/nodemailer.js';

const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, email: user.email },
    'secret123',
    { expiresIn: '30d' }
  );
};


export const register = async (req, res) => {
  const { name, email, phone, password, cars_id } = req.body;

  if (!cars_id || cars_id.length === 0) {
    return res.status(400).json({ message: 'You must provide at least one car number.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or phone already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmationCode = crypto.randomInt(100000, 999999).toString();

    const newUser = new User({
      name,
      email,
      phone,
      password_hash: hashedPassword,
      cars_id,
      confirmationCode,
      codeGeneratedAt: Date.now(),
    });

    await newUser.save();

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        html: `<h1>Confirmation Code</h1><p>Your confirmation code is: <strong>${confirmationCode}</strong></p>`,
      });
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
    

    const token = generateToken(newUser);

    res.status(201).json({
      message: 'User registered successfully. Confirmation code sent via SMS and Email.',
      user_id: newUser.user_id,
      confirmationCode: newUser.confirmationCode,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user', error });
  }
};

  
export const login = async (req, res) => {
    const { phone, password } = req.body;
  
    try {
      const user = await User.findOne({ phone });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
      }
  
      const loginCode = crypto.randomInt(100000, 999999).toString();
  
      user.loginCode = loginCode;
      user.loginCodeGeneratedAt = Date.now();
      await user.save();
  
  
      const token = generateToken(user);

      res.status(200).json({ message: 'Login successful. Code sent via SMS.', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging in', error });
    }
  };

  export const verifyCode = async (req, res) => {
    const { phone, email, code } = req.body;
  
    try {
      const user = await User.findOne({ $or: [{ phone }, { email }] });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isCodeValid =
        user.confirmationCode === code &&
        Date.now() - user.codeGeneratedAt < 10 * 60 * 1000;
  
      if (!isCodeValid) {
        return res.status(400).json({ message: 'Invalid or expired confirmation code' });
      }
  
      user.isVerified = true;
      user.confirmationCode = undefined;
      user.codeGeneratedAt = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Verification successful!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error verifying code', error });
    }
  };
  

  export const forgotPassword = async (req, res) => {
    const { phone } = req.body;
  
    try {
      const user = await User.findOne({ phone });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const resetCode = crypto.randomInt(100000, 999999).toString();
  
      user.resetCode = resetCode;
      user.resetCodeGeneratedAt = Date.now();
  
      await user.save();
  
      await sendSMS(
        phone,
        `Your password reset code is ${resetCode}. Valid for 10 minutes.`
      );
  
      res.status(200).json({ message: 'Password reset code sent via SMS.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending reset code', error });
    }
  };



  export const resetPassword = async (req, res) => {
    const { phone, resetCode, newPassword } = req.body;
  
    try {
      const user = await User.findOne({ phone });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.resetCode !== resetCode) {
        return res.status(400).json({ message: 'Invalid reset code' });
      }
  
      const isCodeExpired = Date.now() - user.resetCodeGeneratedAt > 10 * 60 * 1000;
      if (isCodeExpired) {
        return res.status(400).json({ message: 'Reset code has expired' });
      }
  
      user.password_hash = await bcrypt.hash(newPassword, 10);
      user.resetCode = null;
      user.resetCodeGeneratedAt = null;
  
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error resetting password', error });
    }
  };
  
  export const getMe = async (req, res) => {
    try {
      const user = await User.findById(req.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving user information', error });
    }
  };







  // HXUS5RFHP9DB8NRFHAGDS4EJ