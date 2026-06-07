import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user } = useAuth();
  const [weather, setWeather] = useState(null);
  const [policy, setPolicy] = useState(null);
  const [claims, setClaims] = useState([]);
  const [riskAnalysis, setRiskAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const city = user?.city || 'mumbai';
      const [weatherRes, policyRes, claimsRes] = await Promise.all([
        axios.get(`/api/weather/${city}`),
        axios.get('/api/policy/my'),
        axios.get('/api/claims/stats')
      ]);
      setWeather(weatherRes.data);
      setPolicy(policyRes.data[0] || null);
      setClaims(claimsRes.data);

      // AI Risk Analysis
      const riskRes = await axios.post('/api/ai/risk-analysis', {
        city, platform: user?.platform, weatherData: weatherRes.data
      });
      setRiskAnalysis(riskRes.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const triggerClaim = async (type) => {
    if (!policy) { toast.error('No active policy! Purchase a plan first.'); return; }
    if (!user?.upiId) { toast.error('Add your UPI ID in Profile first!'); return; }
    setTriggering(true);
    try {
      const res = await axios.post('/api/claims/trigger', {
        triggerType: type,
        triggerValue: type === 'rain' ? weather?.rainfall : type === 'heat' ? weather?.temperature : weather?.floodRisk,
        weatherData: weather
      });
      toast.success(res.data.message);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Trigger failed');
    } finally { setTriggering(false); }
  };

  const riskColor = { low: '#22c55e', medium: '#f97316', high: '#ef4444', critical: '#dc2626', unknown: '#9a9078' };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <div className="spinner" style={{ width: 40, height: 40 }}></div>
    </div>
  );

  return (
    <div className="slide-up">
      <div style={{ marginBottom: 32 }}>
        <h1 className="font-display" style={{ fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>
          Good day, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p style={{ color: '#4d4632', marginTop: 6 }}>Here's your protection status for {user?.city || 'your city'}</p>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 28 }}>
        {[
          { label: 'Total Earned', value: `₹${(user?.totalEarned || claims?.totalPaid || 0).toLocaleString()}`, icon: 'payments', color: '#22c55e' },
          { label: 'Claims Paid', value: claims?.claimCount || 0, icon: 'check_circle', color: '#facc15' },
          { label: 'Active Policy', value: policy ? policy.planName : 'None', icon: 'shield', color: policy ? '#22c55e' : '#ef4444' },
          { label: 'Risk Level', value: riskAnalysis?.riskLevel?.toUpperCase() || 'N/A', icon: 'warning', color: riskColor[riskAnalysis?.riskLevel || 'unknown'] },
        ].map(s => (
          <div key={s.label} className="glass-card" style={{ padding: 24, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, background: `${s.color}18`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: s.color, fontSize: 22 }}>{s.icon}</span>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#4d4632', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'JetBrains Mono' }}>{s.label}</div>
              <div className="font-display" style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 2 }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Weather Card */}
        <div className="glass-card" style={{ padding: 28, borderRadius: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Live Weather</h3>
              <p style={{ color: '#4d4632', fontSize: 13, marginTop: 4 }}>{user?.city || 'Your city'} · Updated now</p>
            </div>
            <button onClick={fetchData} style={{ background: 'transparent', border: 'none', color: '#facc15', cursor: 'pointer' }}>
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
          {weather ? (
            <>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 20 }}>
                <span className="font-display" style={{ fontSize: 52, fontWeight: 900, color: '#fff' }}>{weather.temperature?.toFixed(0)}°</span>
                <span style={{ color: '#4d4632', fontSize: 16 }}>C · {weather.condition}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
                {[
                  { label: 'Rainfall', value: `${weather.rainfall?.toFixed(0)}mm`, icon: 'water_drop', alert: weather.rainfall > 50 },
                  { label: 'Humidity', value: `${weather.humidity}%`, icon: 'humidity_percentage', alert: false },
                  { label: 'Flood Risk', value: `${weather.floodRisk}/5`, icon: 'flood', alert: weather.floodRisk > 3 },
                ].map(w => (
                  <div key={w.label} style={{ background: w.alert ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: 10, border: w.alert ? '1px solid rgba(239,68,68,0.2)' : '1px solid transparent' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: w.alert ? '#ef4444' : '#4d4632', display: 'block', marginBottom: 4 }}>{w.icon}</span>
                    <div style={{ fontSize: 16, fontWeight: 700, color: w.alert ? '#ef4444' : '#fff' }}>{w.value}</div>
                    <div style={{ fontSize: 11, color: '#4d4632' }}>{w.label}</div>
                  </div>
                ))}
              </div>
              {/* Alerts */}
              {weather.alerts?.length > 0 && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
                  {weather.alerts.map((alert, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'rgba(239,68,68,0.08)', borderRadius: 8, marginBottom: 8 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#ef4444' }}>warning</span>
                      <span style={{ fontSize: 13, color: '#ef4444' }}>{alert.message}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : <p style={{ color: '#4d4632' }}>Loading weather...</p>}
        </div>

        {/* Trigger Payouts */}
        <div className="glass-card" style={{ padding: 28, borderRadius: 20 }}>
          <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Trigger a Payout</h3>
          <p style={{ color: '#4d4632', fontSize: 13, marginBottom: 24 }}>
            {policy ? `Active: ${policy.planName} · ₹${policy.coverageAmount} cover` : 'No active policy. Purchase one to trigger payouts.'}
          </p>
          {[
            { type: 'rain', icon: 'thunderstorm', label: 'Rain Payout', color: '#3b82f6', cond: weather?.rainfall > 30, desc: `${weather?.rainfall?.toFixed(0) || 0}mm rainfall detected` },
            { type: 'heat', icon: 'thermostat', label: 'Heatwave Payout', color: '#f97316', cond: weather?.temperature > 38, desc: `${weather?.temperature?.toFixed(1) || 0}°C temperature` },
            { type: 'flood', icon: 'water_damage', label: 'Flood Payout', color: '#8b5cf6', cond: weather?.floodRisk > 2, desc: `Risk level ${weather?.floodRisk || 0}/5` },
          ].map(t => (
            <div key={t.type} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, marginBottom: 10, border: `1px solid ${t.cond ? t.color + '30' : 'rgba(255,255,255,0.06)'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, background: `${t.color}15`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: t.color }}>{t.icon}</span>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#e2e2e2' }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: '#4d4632' }}>{t.desc}</div>
                </div>
              </div>
              <button onClick={() => triggerClaim(t.type)} disabled={!policy || triggering}
                style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: policy ? 'pointer' : 'not-allowed',
                  background: t.cond ? t.color : 'rgba(255,255,255,0.06)', color: t.cond ? '#fff' : '#4d4632', fontSize: 13, fontWeight: 600 }}>
                {triggering ? '...' : 'Trigger'}
              </button>
            </div>
          ))}
          {!policy && (
            <Link to="/policy" style={{ display: 'block', marginTop: 8 }}>
              <button className="btn-primary" style={{ width: '100%', fontSize: 14 }}>Purchase a Plan →</button>
            </Link>
          )}
        </div>

        {/* AI Risk Card */}
        {riskAnalysis && (
          <div className="glass-card" style={{ padding: 28, borderRadius: 20 }}>
            <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 20 }}>AI Risk Analysis</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ position: 'relative', width: 80, height: 80 }}>
                <svg viewBox="0 0 80 80" style={{ width: 80, height: 80, transform: 'rotate(-90deg)' }}>
                  <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="40" cy="40" r="30" fill="none" stroke={riskColor[riskAnalysis.riskLevel]} strokeWidth="8"
                    strokeDasharray={`${(riskAnalysis.riskScore / 100) * 188} 188`} strokeLinecap="round" />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: riskColor[riskAnalysis.riskLevel] }}>{riskAnalysis.riskScore}</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: riskColor[riskAnalysis.riskLevel], fontFamily: 'Hanken Grotesk' }}>
                  {riskAnalysis.riskLevel?.toUpperCase()}
                </div>
                <div style={{ fontSize: 13, color: '#4d4632', marginTop: 4 }}>Risk Score / 100</div>
                {riskAnalysis.triggered && (
                  <div style={{ fontSize: 12, color: '#facc15', marginTop: 6 }}>⚡ Payout Eligible: ₹{riskAnalysis.estimatedPayout}</div>
                )}
              </div>
            </div>
            <div style={{ padding: '14px', background: 'rgba(250,204,21,0.05)', borderRadius: 12, border: '1px solid rgba(250,204,21,0.1)' }}>
              <p style={{ fontSize: 14, color: '#9a9078', lineHeight: 1.6 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#facc15', verticalAlign: 'middle', marginRight: 6 }}>smart_toy</span>
                {riskAnalysis.recommendation}
              </p>
            </div>
          </div>
        )}

        {/* Recent Claims */}
        <div className="glass-card" style={{ padding: 28, borderRadius: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Recent Payouts</h3>
            <Link to="/claims" style={{ fontSize: 13, color: '#facc15', textDecoration: 'none' }}>View all →</Link>
          </div>
          {claims?.claims?.length > 0 ? (
            claims.claims.slice(0, 4).map(c => (
              <div key={c._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: c.triggerType === 'rain' ? '#3b82f6' : c.triggerType === 'heat' ? '#f97316' : '#8b5cf6' }}>
                    {c.triggerType === 'rain' ? 'thunderstorm' : c.triggerType === 'heat' ? 'thermostat' : 'water_damage'}
                  </span>
                  <div>
                    <div style={{ fontSize: 14, color: '#e2e2e2', fontWeight: 500, textTransform: 'capitalize' }}>{c.triggerType} trigger</div>
                    <div style={{ fontSize: 11, color: '#4d4632' }}>{new Date(c.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#facc15' }}>₹{c.amount}</div>
                  <div style={{ fontSize: 11, color: c.status === 'paid' ? '#22c55e' : '#f97316', textTransform: 'capitalize' }}>{c.status}</div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: '#4d4632', fontSize: 14 }}>No payouts yet. Get covered and trigger your first claim!</p>
          )}
        </div>
      </div>
    </div>
  );
}
