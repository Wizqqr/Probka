import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  cars_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  start_location: { type: String, required: true },
  end_location: { type: String, required: true },
  distance: { type: Number, required: true },
  speed_data: { type: [Number], default: [] }, 
  points_earned: { type: Number, default: 0 },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true }
});

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;
