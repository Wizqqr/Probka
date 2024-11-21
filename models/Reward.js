import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  points_required: { type: Number, required: true },
  partner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner', required: true }, 
  created_at: { type: Date, default: Date.now }
});

const Reward = mongoose.model('Reward', rewardSchema);
export default Reward;
