const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Simulated weather data for Indian cities
const cityWeatherData = {
  bengaluru: { temperature: 28, rainfall: 15, humidity: 75, condition: 'Cloudy', floodRisk: 2 },
  delhi: { temperature: 38, rainfall: 0, humidity: 45, condition: 'Clear', floodRisk: 0 },
  mumbai: { temperature: 30, rainfall: 80, humidity: 90, condition: 'Heavy Rain', floodRisk: 4 },
  hyderabad: { temperature: 35, rainfall: 5, humidity: 60, condition: 'Partly Cloudy', floodRisk: 1 },
  chennai: { temperature: 36, rainfall: 20, humidity: 80, condition: 'Humid', floodRisk: 2 },
  pune: { temperature: 32, rainfall: 45, humidity: 70, condition: 'Rainy', floodRisk: 3 },
  kolkata: { temperature: 33, rainfall: 60, humidity: 85, condition: 'Heavy Rain', floodRisk: 4 },
  ahmedabad: { temperature: 44, rainfall: 0, humidity: 30, condition: 'Extreme Heat', floodRisk: 0 }
};

// Get weather for city
router.get('/:city', auth, async (req, res) => {
  try {
    const city = req.params.city.toLowerCase();
    const data = cityWeatherData[city] || {
      temperature: Math.floor(Math.random() * 20) + 25,
      rainfall: Math.floor(Math.random() * 60),
      humidity: Math.floor(Math.random() * 40) + 50,
      condition: 'Variable',
      floodRisk: Math.floor(Math.random() * 5)
    };

    // Add some randomness
    const weather = {
      ...data,
      temperature: data.temperature + (Math.random() * 4 - 2),
      rainfall: data.rainfall + (Math.random() * 10),
      city: req.params.city,
      timestamp: new Date(),
      alerts: []
    };

    if (weather.temperature > 42) weather.alerts.push({ type: 'heat', message: `Extreme heat warning: ${weather.temperature.toFixed(1)}°C` });
    if (weather.rainfall > 50) weather.alerts.push({ type: 'rain', message: `Heavy rainfall: ${weather.rainfall.toFixed(1)}mm` });
    if (weather.floodRisk > 3) weather.alerts.push({ type: 'flood', message: `Urban flooding risk: Level ${weather.floodRisk}` });

    res.json(weather);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all cities weather (risk map)
router.get('/', auth, async (req, res) => {
  try {
    const cities = Object.keys(cityWeatherData).map(city => ({
      city,
      ...cityWeatherData[city],
      riskLevel: cityWeatherData[city].rainfall > 50 || cityWeatherData[city].temperature > 42 ? 'high' :
                 cityWeatherData[city].rainfall > 25 ? 'medium' : 'low'
    }));
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
