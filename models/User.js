import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  cars_id: { type: [String], required: true }, // Array of strings to store multiple car numbers
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

const User = mongoose.model('User', userSchema);
export default User;
