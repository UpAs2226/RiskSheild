const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Groq = require('groq-sdk');

// ── Chat ─────────────────────────────────────────────────────────
router.post('/chat', auth, async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!message || !message.trim()) return res.status(400).json({ message: 'Empty message' });

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await client.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are RiskShield AI, a helpful insurance assistant for Indian gig delivery workers (Swiggy, Zomato, Blinkit).
Help with: parametric insurance, weather payouts (rain over 50mm, heat over 42C, flood over level 3), plans (Basic Rs99, Standard Rs199, Elite Rs399), UPI setup.
Be friendly, brief under 100 words, use Indian English.`
        },
        ...history.slice(-6).map(h => ({ role: h.role, content: h.content })),
        { role: 'user', content: message.trim() }
      ],
      max_tokens: 200,
      temperature: 0.7
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error('[GROQ CHAT ERROR]', err.message);
    res.status(500).json({
      message: err.status === 401 ? 'Invalid Groq API key.' :
               err.status === 429 ? 'Rate limit — wait and retry.' :
               'Groq error: ' + err.message
    });
  }
});

// ── Risk Analysis ────────────────────────────────────────────────
router.post('/risk-analysis', auth, async (req, res) => {
  const { weatherData } = req.body;
  const rain = weatherData?.rainfall || 0;
  const temp = weatherData?.temperature || 30;
  const flood = weatherData?.floodRisk || 0;
  const triggered = rain > 50 || temp > 42 || flood > 3;
  let riskLevel = 'low', riskScore = 20;
  if (triggered) { riskLevel = 'high'; riskScore = 82; }
  else if (rain > 25 || temp > 38 || flood > 2) { riskLevel = 'medium'; riskScore = 52; }

  try {
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const { city, platform } = req.body;

    const completion = await client.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{
        role: 'user',
        content: `Risk analysis for gig delivery partner. City: ${city}, Platform: ${platform}, Temp: ${temp}C, Rain: ${rain}mm, Flood: ${flood}/5. Triggers: rain>50mm OR temp>42C OR flood>3. Reply ONLY valid JSON no markdown: {"riskLevel":"low","riskScore":20,"recommendation":"one sentence","triggered":false,"triggerType":"none","estimatedPayout":0}`
      }],
      max_tokens: 120,
      temperature: 0.1
    });

    const raw = completion.choices[0].message.content || '';
    const match = raw.match(/\{[\s\S]*?\}/);
    if (match) return res.json(JSON.parse(match[0]));
    throw new Error('No JSON in response');

  } catch (err) {
    console.error('[GROQ RISK ERROR]', err.message);
    res.json({
      riskLevel, riskScore,
      recommendation: triggered ? 'High risk! Take rest — payout is being processed.' : riskLevel === 'medium' ? 'Stay cautious, monitor weather.' : 'Safe to deliver today!',
      triggered,
      triggerType: rain > 50 ? 'rain' : temp > 42 ? 'heat' : flood > 3 ? 'flood' : 'none',
      estimatedPayout: triggered ? (rain > 50 ? 750 : temp > 42 ? 500 : 1250) : 0
    });
  }
});

// ── Status ───────────────────────────────────────────────────────
router.get('/status', auth, (req, res) => {
  const key = process.env.GROQ_API_KEY;
  const configured = !!(key && key !== 'your_groq_api_key_here' && key.length > 10);
  res.json({ configured, model: 'llama-3.1-8b-instant' });
});

module.exports = router;
