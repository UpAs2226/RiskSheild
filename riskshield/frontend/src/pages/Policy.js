import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const PLANS = [
  {
    type: 'basic', name: 'Shield Basic', price: 99, cover: 500,
    features: ['Rain trigger payout', 'Heat trigger payout', 'UPI instant transfer', 'Basic risk dashboard']
  },
  {
    type: 'standard', name: 'Shield Standard', price: 199, cover: 1250, popular: true,
    features: ['All Basic features', 'Flood trigger payout', 'AI risk analysis', 'Custom thresholds', 'Priority support']
  },
  {
    type: 'elite', name: 'Shield Elite', price: 399, cover: 3000,
    features: ['All Standard features', 'Maximum coverage', 'Dedicated account manager', 'Multi-platform linking', 'Advanced analytics']
  },
];

export default function Policy() {
  const [policies, setPolicies]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [purchasing, setPurchasing]     = useState(null);
  const [activePolicy, setActivePolicy] = useState(null);
  const [confirm, setConfirm]           = useState(null);

  useEffect(() => { fetchPolicies(); }, []);

  const fetchPolicies = async () => {
    try {
      const { data } = await axios.get('/api/policy/my');
      setPolicies(data);
      setActivePolicy(data.find(p => p.status === 'active') || null);
    } catch { toast.error('Failed to load policies'); }
    finally { setLoading(false); }
  };

  const handlePlanClick = (plan) => {
    if (activePolicy && activePolicy.planType === plan.type) {
      toast('You are already on this plan!', { icon: '✅' });
      return;
    }
    if (activePolicy) {
      setConfirm(plan);
    } else {
      purchase(plan.type);
    }
  };

  const purchase = async (planType) => {
    setConfirm(null);
    setPurchasing(planType);
    try {
      const { data } = await axios.post('/api/policy/create', { planType });
      toast.success(data.message || 'Plan activated!');
      fetchPolicies();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Purchase failed');
    } finally { setPurchasing(null); }
  };

  const statusColor = { active: '#22c55e', expired: '#ef4444', pending: '#f97316' };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <div className="spinner" style={{ width: 40, height: 40 }} />
    </div>
  );

  return (
    <div className="slide-up">

      {confirm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="glass-card" style={{ padding: 40, borderRadius: 24, maxWidth: 420, width: '90%', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, background: 'rgba(250,204,21,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <span className="material-symbols-outlined" style={{ color: '#facc15', fontSize: 28 }}>swap_horiz</span>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 10, fontFamily: 'Hanken Grotesk, sans-serif' }}>Switch Plan?</h3>
            <p style={{ color: '#9a9078', fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>
              Your current <span style={{ color: '#facc15', fontWeight: 600 }}>{activePolicy?.planName}</span> will be cancelled
              and replaced with <span style={{ color: '#facc15', fontWeight: 600 }}>{confirm.name}</span> (₹{confirm.price}/mo).
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setConfirm(null)} style={{ flex: 1, padding: '12px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#9a9078', cursor: 'pointer', fontSize: 15, fontWeight: 600 }}>
                Cancel
              </button>
              <button onClick={() => purchase(confirm.type)} disabled={purchasing === confirm.type} style={{ flex: 1, padding: '12px', borderRadius: 10, background: '#facc15', border: 'none', color: '#3c2f00', cursor: 'pointer', fontSize: 15, fontWeight: 800, fontFamily: 'Hanken Grotesk, sans-serif' }}>
                {purchasing === confirm.type ? 'Switching...' : 'Yes, Switch'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', fontFamily: 'Hanken Grotesk, sans-serif' }}>My Policy</h1>
        <p style={{ color: '#4d4632', marginTop: 6 }}>Choose or switch your protection plan anytime.</p>
      </div>

      {activePolicy && (
        <div style={{ padding: '20px 28px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 16, marginBottom: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, background: 'rgba(34,197,94,0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: '#22c55e' }}>verified_user</span>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#22c55e', fontFamily: 'Hanken Grotesk, sans-serif' }}>{activePolicy.planName} · Active</div>
              <div style={{ fontSize: 13, color: '#4d4632', marginTop: 2 }}>Coverage: ₹{activePolicy.coverageAmount.toLocaleString()} · Expires: {new Date(activePolicy.endDate).toLocaleDateString()}</div>
            </div>
          </div>
          <span style={{ fontSize: 13, color: '#9a9078' }}>Click any plan below to switch</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 24, marginBottom: 48 }}>
        {PLANS.map(plan => {
          const isActive  = activePolicy?.planType === plan.type;
          const isLoading = purchasing === plan.type;
          return (
            <div key={plan.type} className="glass-card" style={{
              padding: 36, borderRadius: 20, position: 'relative',
              border: isActive ? '2px solid rgba(34,197,94,0.5)' : plan.popular ? '1px solid rgba(250,204,21,0.3)' : '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.2s', cursor: isLoading ? 'wait' : 'pointer',
              transform: isActive ? 'scale(1.02)' : 'scale(1)',
            }}>
              {isActive && (
                <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#22c55e', color: '#fff', padding: '5px 18px', borderRadius: 99, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>✓ Current Plan</div>
              )}
              {!isActive && plan.popular && (
                <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#facc15', color: '#3c2f00', padding: '5px 18px', borderRadius: 99, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>⭐ Most Popular</div>
              )}

              <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8, fontFamily: 'Hanken Grotesk, sans-serif' }}>{plan.name}</h3>
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontSize: 48, fontWeight: 900, color: '#facc15', fontFamily: 'Hanken Grotesk, sans-serif' }}>₹{plan.price}</span>
                <span style={{ color: '#4d4632', fontSize: 14 }}>/month</span>
              </div>
              <div style={{ padding: '10px 14px', background: 'rgba(250,204,21,0.06)', borderRadius: 10, marginBottom: 24 }}>
                <span style={{ color: '#9a9078', fontSize: 13 }}>Coverage up to </span>
                <span style={{ color: '#facc15', fontWeight: 700 }}>₹{plan.cover.toLocaleString()}</span>
              </div>
              <ul style={{ listStyle: 'none', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#9a9078' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#22c55e' }}>check</span>{f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePlanClick(plan)}
                disabled={isLoading}
                style={{
                  width: '100%', fontSize: 15, padding: '13px', borderRadius: 10,
                  cursor: isLoading ? 'wait' : 'pointer', fontWeight: 700, border: 'none',
                  transition: 'all 0.2s', fontFamily: 'Hanken Grotesk, sans-serif',
                  background: isActive ? 'rgba(34,197,94,0.15)' : plan.popular ? '#facc15' : 'rgba(255,255,255,0.06)',
                  color: isActive ? '#22c55e' : plan.popular ? '#3c2f00' : '#e2e2e2',
                }}>
                {isLoading ? 'Processing...' : isActive ? '✓ Current Plan' : activePolicy ? `Switch to ${plan.name}` : `Get ${plan.name}`}
              </button>
            </div>
          );
        })}
      </div>

      {policies.length > 0 && (
        <div className="glass-card" style={{ padding: 28, borderRadius: 20 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 20, fontFamily: 'Hanken Grotesk, sans-serif' }}>Policy History</h3>
          {policies.map((p, i) => (
            <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: i < policies.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#e2e2e2', fontSize: 15 }}>{p.planName}</div>
                <div style={{ fontSize: 12, color: '#4d4632', marginTop: 3 }}>{new Date(p.startDate).toLocaleDateString()} – {new Date(p.endDate).toLocaleDateString()}</div>
              </div>
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <span style={{ fontSize: 13, color: statusColor[p.status], fontWeight: 600, textTransform: 'capitalize' }}>● {p.status}</span>
                <span style={{ fontSize: 14, color: '#facc15', fontWeight: 700 }}>₹{p.premium}/mo</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
