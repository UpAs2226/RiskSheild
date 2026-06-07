# RiskShield AI — MERN Stack Full Stack Application

Parametric insurance for Indian gig economy delivery workers (Swiggy, Zomato, Blinkit).

## 🏗 Project Structure

```
riskshield/
├── backend/          # Node.js + Express + MongoDB + Groq AI
└── frontend/         # React + React Router
```

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Groq API Key → https://console.groq.com

### 2. Backend Setup

```bash
cd backend
npm install
```

Edit `.env` and fill in your values:
```
GROQ_API_KEY=your_actual_groq_api_key_here
MONGO_URI=mongodb://localhost:27017/riskshield
JWT_SECRET=your_strong_secret_here
```

```bash
npm run dev     # Development with nodemon
# or
npm start       # Production
```

Backend runs on: http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on: http://localhost:3000  
(Proxies API calls to backend automatically via `"proxy": "http://localhost:5000"`)

---

## 🔑 Environment Variables (backend/.env)

| Variable | Description |
|---|---|
| `PORT` | Server port (default: 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for JWT tokens |
| `GROQ_API_KEY` | Your Groq API key (required for AI features) |

---

## 📱 Features

- **Landing Page** — Conversion-optimized marketing page
- **Auth** — Register/Login with JWT
- **Dashboard** — Live weather, risk analysis, payout triggers
- **Policy** — Purchase Basic/Standard/Elite plans
- **Claims** — Full payout history with stats
- **AI Assistant** — Groq-powered Llama 3 chatbot for insurance queries
- **Profile** — Manage UPI ID, platform, city

## 🌦 Weather Triggers

| Trigger | Threshold | Payout |
|---|---|---|
| Rain | > 50mm | 60% of coverage |
| Heatwave | > 42°C | 40% of coverage |
| Flood | Risk > 3/5 | 100% of coverage |

## 🛠 Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Groq SDK  
**Frontend:** React 18, React Router 6, Axios, React Hot Toast  
**AI:** Groq API (Llama 3 8B — ultra-fast inference)
