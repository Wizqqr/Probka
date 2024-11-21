import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  partner_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  api_endpoint: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const Partner = mongoose.model('Partner', partnerSchema);
export default Partner;
