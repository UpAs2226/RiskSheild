const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Policy = require('../models/Policy');

const PLANS = {
  basic: { name: 'Shield Basic', premium: 99, coverageAmount: 500 },
  standard: { name: 'Shield Standard', premium: 199, coverageAmount: 1250 },
  elite: { name: 'Shield Elite', premium: 399, coverageAmount: 3000 }
};

// Get all plans (public)
router.get('/plans', (req, res) => {
  res.json(PLANS);
});

// Get my policies
router.get('/my', auth, async (req, res) => {
  try {
    const policies = await Policy.find({ user: req.user._id }).sort('-createdAt');
    res.json(policies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create policy
router.post('/create', auth, async (req, res) => {
  try {
    const { planType, triggers } = req.body;
    const plan = PLANS[planType];
    if (!plan) return res.status(400).json({ message: 'Invalid plan type' });

    // Check if active policy exists
    const existing = await Policy.findOne({ user: req.user._id, status: 'active' });
    if (existing) return res.status(400).json({ message: 'You already have an active policy. Please wait for it to expire.' });

    const policy = await Policy.create({
      user: req.user._id,
      planName: plan.name,
      planType,
      premium: plan.premium,
      coverageAmount: plan.coverageAmount,
      triggers: triggers || {}
    });
    res.status(201).json(policy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single policy
router.get('/:id', auth, async (req, res) => {
  try {
    const policy = await Policy.findOne({ _id: req.params.id, user: req.user._id });
    if (!policy) return res.status(404).json({ message: 'Policy not found' });
    res.json(policy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update triggers
router.put('/:id/triggers', auth, async (req, res) => {
  try {
    const policy = await Policy.findOne({ _id: req.params.id, user: req.user._id });
    if (!policy) return res.status(404).json({ message: 'Policy not found' });
    policy.triggers = { ...policy.triggers, ...req.body };
    await policy.save();
    res.json(policy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
