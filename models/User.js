import Counter from '../models/Counter.js'
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_id: { type: Number, unique: true }, 
  cars_id: { type: [String], required: true }, 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  avatar_url: { type: String },
  points: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now },
  otp: { type: String },
  otpExpiresAt: { type: Date },
  confirmationCode: { type: String },
  codeGeneratedAt: { type: Date },
  resetCode: { type: String },
  resetCodeGeneratedAt: { type: Date },
  isVerified: { type: Boolean, default: false },
});

userSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'user_id' },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    this.user_id = counter.sequence_value;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);
export default User;
