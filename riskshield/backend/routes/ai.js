// const express = require('express');
// const router = express.Router();
// const Groq = require('groq-sdk');
// const auth = require('../middleware/auth');

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// // AI Chat Assistant
// router.post('/chat', auth, async (req, res) => {
//   try {
//     const { message, history = [] } = req.body;

//     const systemPrompt = `You are RiskShield AI Assistant, an expert insurance advisor for gig economy workers in India (Swiggy, Zomato, Blinkit delivery partners). 
//     You help users understand:
//     - Parametric insurance and how it works
//     - Weather-based payout triggers (rain > 50mm, heat > 42°C, urban flooding)
//     - Policy plans (Basic ₹99/mo, Standard ₹199/mo, Elite ₹399/mo)
//     - How to file claims and check payouts
//     - UPI payment setup
//     - Platform linking (Swiggy, Zomato, Blinkit)
    
//     Be friendly, concise, and use Indian English. Use ₹ for currency. Keep responses under 150 words. 
//     If asked about pricing: Basic=₹99 (₹500 cover), Standard=₹199 (₹1250 cover), Elite=₹399 (₹3000 cover).`;

//     const messages = [
//       ...history.map(h => ({ role: h.role, content: h.content })),
//       { role: 'user', content: message }
//     ];

//     const completion = await groq.chat.completions.create({
//       model: 'lllama-3.3-70b-versatile',
//       messages: [{ role: 'system', content: systemPrompt }, ...messages],
//       max_tokens: 200,
//       temperature: 0.7
//     });

//     res.json({ reply: completion.choices[0].message.content });
//   } catch (err) {
//     console.error('Groq error:', err);
//     res.status(500).json({ message: 'AI service temporarily unavailable', error: err.message });
//   }
// });

// // AI Risk Analysis
// router.post('/risk-analysis', auth, async (req, res) => {
//   try {
//     const { city, platform, weatherData } = req.body;

//     const prompt = `You are a parametric insurance risk analyst. 
//     Analyze weather risk for a delivery partner:
//     - City: ${city}
//     - Platform: ${platform}
//     - Weather: Temperature ${weatherData?.temperature}°C, Rainfall ${weatherData?.rainfall}mm, Humidity ${weatherData?.humidity}%, Condition: ${weatherData?.condition}
    
//     Provide a JSON response with:
//     {
//       "riskLevel": "low|medium|high|critical",
//       "riskScore": 0-100,
//       "recommendation": "short actionable advice",
//       "triggered": true|false,
//       "triggerType": "none|rain|heat|flood",
//       "estimatedPayout": number in rupees if triggered else 0
//     }
    
//     Only respond with valid JSON, no extra text.`;

//     const completion = await groq.chat.completions.create({
//       model: 'llama3-8b-8192',
//       messages: [{ role: 'user', content: prompt }],
//       max_tokens: 200,
//       temperature: 0.3
//     });

//     const raw = completion.choices[0].message.content;
//     const jsonMatch = raw.match(/\{[\s\S]*\}/);
//     const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : {
//       riskLevel: 'medium', riskScore: 50,
//       recommendation: 'Monitor weather conditions closely',
//       triggered: false, triggerType: 'none', estimatedPayout: 0
//     };

//     res.json(analysis);
//   } catch (err) {
//     console.error('Groq risk error:', err);
//     res.status(500).json({ riskLevel: 'unknown', riskScore: 0, recommendation: 'Unable to analyze at this time', triggered: false, triggerType: 'none', estimatedPayout: 0 });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// ── Groq client init ─────────────────────────────────────────────
function getGroqClient() {
  const key = process.env.GROQ_API_KEY;
  console.log('GROQ KEY check — length:', key ? key.length : 0, '| starts with:', key ? key.substring(0, 8) : 'MISSING');
  if (!key || key.trim() === '' || key === 'your_groq_api_key_here') {
    throw new Error('GROQ_API_KEY missing in .env file. Get free key at https://console.groq.com');
  }
  const Groq = require('groq-sdk');
  return new Groq({ apiKey: key.trim() });
}

const GROQ_MODEL = 'llama-3.1-8b-instant'; // stable free model as of 2026

// ── Chat ─────────────────────────────────────────────────────────
router.post('/chat', auth, async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!message || !message.trim()) return res.status(400).json({ message: 'Empty message' });

    console.log('[AI /chat] Using model:', GROQ_MODEL);
    const client = getGroqClient();

    const systemPrompt = `You are RiskShield AI, a helpful insurance assistant for Indian gig delivery workers (Swiggy, Zomato, Blinkit).
Help with: parametric insurance, weather payouts (rain>50mm, heat>42C, flood>3), plans (Basic Rs99, Standard Rs199, Elite Rs399), UPI setup.
Be friendly, brief (under 100 words), use Indian English.`;

    const completion = await client.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        ...history.slice(-6).map(h => ({ role: h.role, content: h.content })),
        { role: 'user', content: message.trim() }
      ],
      max_tokens: 200,
      temperature: 0.7
    });

    const reply = completion.choices?.[0]?.message?.content;
    if (!reply) throw new Error('Empty reply from Groq');
    console.log('[AI /chat] Success, reply length:', reply.length);
    res.json({ reply });

  } catch (err) {
    console.error('[AI /chat] ERROR:', err.status, err.message);
    const msg =
      err.message.includes('GROQ_API_KEY') ? err.message :
      err.status === 401 ? 'Invalid API key — please check GROQ_API_KEY in backend/.env' :
      err.status === 429 ? 'Rate limit hit — please wait 10 seconds and try again.' :
      err.status === 400 ? `Groq 400 error: ${err.message}` :
      `Groq error (${err.status || 'unknown'}): ${err.message}`;
    res.status(500).json({ message: msg });
  }
});

// ── Risk Analysis ────────────────────────────────────────────────
router.post('/risk-analysis', auth, async (req, res) => {
  const { weatherData } = req.body;

  // Always return smart fallback — keeps dashboard working even without AI
  const rain = weatherData?.rainfall || 0;
  const temp = weatherData?.temperature || 30;
  const flood = weatherData?.floodRisk || 0;
  const triggered = rain > 50 || temp > 42 || flood > 3;
  let riskLevel = 'low', riskScore = 20;
  if (rain > 50 || temp > 42 || flood > 3) { riskLevel = 'high'; riskScore = 82; }
  else if (rain > 25 || temp > 38 || flood > 2) { riskLevel = 'medium'; riskScore = 52; }

  const baseResult = {
    riskLevel, riskScore,
    recommendation:
      riskLevel === 'high' ? 'High risk! Take rest — your automatic payout is being processed.' :
      riskLevel === 'medium' ? 'Moderate conditions. Stay cautious and check weather updates.' :
      'Safe to deliver today. Stay hydrated and ride safely!',
    triggered,
    triggerType: rain > 50 ? 'rain' : temp > 42 ? 'heat' : flood > 3 ? 'flood' : 'none',
    estimatedPayout: triggered ? (rain > 50 ? 750 : temp > 42 ? 500 : 1250) : 0
  };

  // Try to enhance with Groq — silently fall back if it fails
  try {
    console.log('[AI /risk-analysis] Using model:', GROQ_MODEL);
    const client = getGroqClient();
    const { city, platform } = req.body;

    const prompt = `Risk analysis for gig delivery partner.
City: ${city || 'Unknown'}, Platform: ${platform || 'Unknown'}
Temp: ${temp}C, Rain: ${rain}mm, Flood: ${flood}/5
Triggers: rain>50mm OR temp>42C OR flood>3 = payout.
Reply ONLY valid JSON no markdown: {"riskLevel":"low","riskScore":20,"recommendation":"one sentence","triggered":false,"triggerType":"none","estimatedPayout":0}`;

    const completion = await client.chat.completions.create({
      model: GROQ_MODEL,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 120,
      temperature: 0.1
    });

    const raw = completion.choices?.[0]?.message?.content || '';
    const match = raw.match(/\{[\s\S]*?\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      console.log('[AI /risk-analysis] Groq success');
      return res.json(parsed);
    }
  } catch (err) {
    console.error('[AI /risk-analysis] Groq failed, using fallback:', err.status, err.message);
  }

  res.json(baseResult);
});

// ── Status ───────────────────────────────────────────────────────
router.get('/status', auth, (req, res) => {
  const key = process.env.GROQ_API_KEY;
  const configured = !!(key && key.trim() !== '' && key !== 'your_groq_api_key_here' && key.length > 10);
  console.log('[AI /status] configured:', configured, '| model:', GROQ_MODEL);
  res.json({ configured, model: GROQ_MODEL, message: configured ? 'Groq ready.' : 'GROQ_API_KEY not set in backend/.env' });
});

module.exports = router;
