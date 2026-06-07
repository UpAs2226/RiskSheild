# RiskSheild
Full-stack MERN insurance platform for gig workers with AI risk prediction, fraud detection, and automated payouts.



## 📱 Pages & Features

| Page | Route | Description |
|---|---|---|
| Landing | `/` | Marketing page with hero photo, plans, testimonials |
| Register | `/register` | Create account with platform + city selection |
| Login | `/login` | JWT-based authentication |
| Dashboard | `/dashboard` | Live weather, risk score, payout triggers |
| Policy | `/policy` | Buy or switch between 3 insurance plans |
| Claims | `/claims` | Full payout history with stats |
| AI Assistant | `/ai` | Groq-powered chatbot for insurance queries |
| Profile | `/profile` | Update UPI ID, platform, city |



## 🌦️ How Parametric Payouts Work

No claims process. Payouts are automatic based on weather triggers:

| Trigger | Threshold | Payout Amount |
|---|---|---|
| 🌧️ Heavy Rain | Rainfall > 50mm | 60% of coverage |
| 🌡️ Heatwave | Temperature > 42°C | 40% of coverage |
| 🌊 Urban Flood | Flood risk > Level 3 | 100% of coverage |

**Example:** On Shield Standard (₹1,250 cover):
- Rain trigger → ₹750 sent to UPI instantly
- Heat trigger → ₹500 sent to UPI instantly
- Flood trigger → ₹1,250 sent to UPI instantly

---

## 💳 Insurance Plans

| Plan | Monthly Premium | Max Coverage |
|---|---|---|
| Shield Basic | ₹99 | ₹500 |
| Shield Standard | ₹199 | ₹1,250 |
| Shield Elite | ₹399 | ₹3,000 |

- Switch plans anytime — old plan expires automatically
- Coverage starts immediately after purchase

---

## 🤖 AI Assistant

Powered by **Groq API** using **Llama 3.1 8B Instant** model.

The AI assistant helps delivery partners with:
- Understanding their coverage
- Explaining payout triggers
- Choosing the right plan
- Setting up UPI for payouts
- Answering insurance queries in Indian English

> If AI shows an error — check that `GROQ_API_KEY` is correctly set in `backend/.env`
> and restart the backend with `npm run dev`


## DEPLOYED WEBSITE LINK
Frontend opens at → http://localhost:3000
Backend runs at → http://localhost:5000

---

## 🔑 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | Backend port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/riskshield` |
| `JWT_SECRET` | Secret for signing tokens | `mysecretkey123` |
| `GROQ_API_KEY` | Groq AI API key | `gsk_xxxxxxxxxxxx` |

---

## 📱 Pages & Features

| Page | Route | Description |
|---|---|---|
| Landing | `/` | Marketing page with hero photo, plans, testimonials |
| Register | `/register` | Create account with platform + city selection |
| Login | `/login` | JWT-based authentication |
| Dashboard | `/dashboard` | Live weather, risk score, payout triggers |
| Policy | `/policy` | Buy or switch between 3 insurance plans |
| Claims | `/claims` | Full payout history with stats |
| AI Assistant | `/ai` | Groq-powered chatbot for insurance queries |
| Profile | `/profile` | Update UPI ID, platform, city |

---

## 🌦️ How Parametric Payouts Work

No claims process. Payouts are automatic based on weather triggers:

| Trigger | Threshold | Payout Amount |
|---|---|---|
| 🌧️ Heavy Rain | Rainfall > 50mm | 60% of coverage |
| 🌡️ Heatwave | Temperature > 42°C | 40% of coverage |
| 🌊 Urban Flood | Flood risk > Level 3 | 100% of coverage |

**Example:** On Shield Standard (₹1,250 cover):
- Rain trigger → ₹750 sent to UPI instantly
- Heat trigger → ₹500 sent to UPI instantly
- Flood trigger → ₹1,250 sent to UPI instantly

---

## 💳 Insurance Plans

| Plan | Monthly Premium | Max Coverage |
|---|---|---|
| Shield Basic | ₹99 | ₹500 |
| Shield Standard | ₹199 | ₹1,250 |
| Shield Elite | ₹399 | ₹3,000 |

- Switch plans anytime — old plan expires automatically
- Coverage starts immediately after purchase

---

## 🤖 AI Assistant

Powered by **Groq API** using **Llama 3.1 8B Instant** model.

The AI assistant helps delivery partners with:
- Understanding their coverage
- Explaining payout triggers
- Choosing the right plan
- Setting up UPI for payouts
- Answering insurance queries in Indian English

> If AI shows an error — check that `GROQ_API_KEY` is correctly set in `backend/.env`
> and restart the backend with `npm run dev`

---

## 🛠️ Common Errors & Fixes

https://risksheild-5.onrender.com
