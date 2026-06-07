const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  policy: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy', required: true },
  triggerType: { type: String, enum: ['rain', 'heat', 'flood'], required: true },
  triggerValue: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['processing', 'paid', 'rejected'], default: 'processing' },
  upiId: { type: String, required: true },
  weatherData: {
    temperature: Number,
    rainfall: Number,
    humidity: Number,
    condition: String,
    city: String
  },
  paidAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Claim', claimSchema);
