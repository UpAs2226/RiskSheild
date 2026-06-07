const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Claim = require('../models/Claim');
const Policy = require('../models/Policy');
const User = require('../models/User');

// Get my claims
router.get('/my', auth, async (req, res) => {
  try {
    const claims = await Claim.find({ user: req.user._id }).sort('-createdAt');
    res.json(claims);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// File a claim (auto-trigger)
router.post('/trigger', auth, async (req, res) => {
  try {
    const { triggerType, triggerValue, weatherData } = req.body;
    const policy = await Policy.findOne({ user: req.user._id, status: 'active' });
    if (!policy) return res.status(404).json({ message: 'No active policy found. Please purchase a plan first.' });

    const user = await User.findById(req.user._id);
    if (!user.upiId) return res.status(400).json({ message: 'Please add your UPI ID in profile settings first.' });

    // Calculate payout based on trigger
    let amount = 0;
    if (triggerType === 'rain') amount = policy.coverageAmount * 0.6;
    else if (triggerType === 'heat') amount = policy.coverageAmount * 0.4;
    else if (triggerType === 'flood') amount = policy.coverageAmount;

    const claim = await Claim.create({
      user: req.user._id,
      policy: policy._id,
      triggerType,
      triggerValue,
      amount,
      upiId: user.upiId,
      weatherData,
      status: 'processing'
    });

    // Simulate instant payout after 2s (in real app, integrate payment gateway)
    setTimeout(async () => {
      claim.status = 'paid';
      claim.paidAt = new Date();
      await claim.save();
      user.totalEarned += amount;
      await user.save();
    }, 2000);

    res.status(201).json({ claim, message: `₹${amount} payout triggered! Funds being sent to ${user.upiId}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get claim stats
router.get('/stats', auth, async (req, res) => {
  try {
    const claims = await Claim.find({ user: req.user._id });
    const total = claims.reduce((acc, c) => acc + (c.status === 'paid' ? c.amount : 0), 0);
    const count = claims.filter(c => c.status === 'paid').length;
    res.json({ totalPaid: total, claimCount: count, claims });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
