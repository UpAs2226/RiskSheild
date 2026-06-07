const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/policy', require('./routes/policy'));
app.use('/api/claims', require('./routes/claims'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/weather', require('./routes/weather'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'RiskShield API Running' }));

app.get('/', (req, res) => {
  res.send('RiskShield Backend Running Successfully 🚀');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
