const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planName: { type: String, required: true },
  planType: { type: String, enum: ['basic', 'standard', 'elite'], required: true },
  premium: { type: Number, required: true },
  coverageAmount: { type: Number, required: true },
  triggers: {
    rain: { enabled: { type: Boolean, default: true }, threshold: { type: Number, default: 50 } },
    heat: { enabled: { type: Boolean, default: true }, threshold: { type: Number, default: 42 } },
    flood: { enabled: { type: Boolean, default: true }, threshold: { type: Number, default: 3 } }
  },
  status: { type: String, enum: ['active', 'expired', 'pending'], default: 'active' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Policy', policySchema);
