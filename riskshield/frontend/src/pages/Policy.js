import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const PLANS = [
  { type: 'basic', name: 'Shield Basic', price: 99, cover: 500, features: ['Rain trigger payout', 'Heat trigger payout', 'UPI instant transfer', 'Basic risk dashboard'] },
  { type: 'standard', name: 'Shield Standard', price: 199, cover: 1250, popular: true, features: ['All Basic features', 'Flood trigger payout', 'AI risk analysis', 'Priority support', 'Custom thresholds'] },
  { type: 'elite', name: 'Shield Elite', price: 399, cover: 3000, features: ['All Standard features', 'Maximum coverage', 'Dedicated account manager', 'Multi-platform linking', 'Advanced analytics'] },
];

export default function Policy() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(null);
  const [activePolicy, setActivePolicy] = useState(null);

  useEffect(() => { fetchPolicies(); }, []);

  const fetchPolicies = async () => {
    try {
      const { data } = await axios.get('/api/policy/my');
      setPolicies(data);
      setActivePolicy(data.find(p => p.status === 'active') || null);
    } catch (err) { toast.error('Failed to load policies'); }
    finally { setLoading(false); }
  };

  const purchase = async (planType) => {
    if (activePolicy) { toast.error('You already have an active policy!'); return; }
    setPurchasing(planType);
    try {
      await axios.post('/api/policy/create', { planType });
      toast.success('Policy activated! You\'re now protected.');
      fetchPolicies();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Purchase failed');
    } finally { setPurchasing(null); }
  };

  const statusColor = { active: '#22c55e', expired: '#ef4444', pending: '#f97316' };

  return (
    <div className="slide-up">
      <div style={{ marginBottom: 36 }}>
        <h1 className="font-display" style={{ fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>My Policy</h1>
        <p style={{ color: '#4d4632', marginTop: 6 }}>Choose your protection plan or manage your existing policy.</p>
      </div>

      {/* Active Policy Banner */}
      {activePolicy && (
        <div style={{ padding: '24px 28px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 16, marginBottom: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, background: 'rgba(34,197,94,0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: '#22c55e' }}>verified_user</span>
            </div>
            <div>
              <div className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#22c55e' }}>{activePolicy.planName} · Active</div>
              <div style={{ fontSize: 13, color: '#4d4632', marginTop: 2 }}>
                Coverage: ₹{activePolicy.coverageAmount} · Expires: {new Date(activePolicy.endDate).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="font-display" style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>₹{activePolicy.premium}<span style={{ fontSize: 14, color: '#4d4632', fontWeight: 400 }}>/mo</span></div>
          </div>
        </div>
      )}

      {/* Plan Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 48 }}>
        {PLANS.map(plan => (
          <div key={plan.type} className="glass-card" style={{
            padding: 36, borderRadius: 20, position: 'relative',
            border: plan.popular ? '1px solid rgba(250,204,21,0.3)' : activePolicy?.planType === plan.type ? '1px solid rgba(34,197,94,0.3)' : undefined
          }}>
            {plan.popular && !activePolicy && (
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#facc15', color: '#3c2f00', padding: '4px 16px', borderRadius: 99, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Most Popular</div>
            )}
            {activePolicy?.planType === plan.type && (
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#22c55e', color: '#fff', padding: '4px 16px', borderRadius: 99, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>✓ Active Plan</div>
            )}
            <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{plan.name}</h3>
            <div style={{ marginBottom: 16 }}>
              <span className="font-display" style={{ fontSize: 44, fontWeight: 900, color: '#facc15' }}>₹{plan.price}</span>
              <span style={{ color: '#4d4632', fontSize: 14 }}>/month</span>
            </div>
            <div style={{ padding: '10px 14px', background: 'rgba(250,204,21,0.06)', borderRadius: 10, marginBottom: 24 }}>
              <span style={{ color: '#9a9078', fontSize: 13 }}>Coverage up to </span>
              <span style={{ color: '#facc15', fontWeight: 700 }}>₹{plan.cover.toLocaleString()}</span>
            </div>
            <ul style={{ listStyle: 'none', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {plan.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#9a9078' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#22c55e' }}>check</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={plan.popular ? 'btn-primary' : 'btn-ghost'}
              style={{ width: '100%', fontSize: 15 }}
              disabled={!!activePolicy || purchasing === plan.type}
              onClick={() => purchase(plan.type)}
            >
              {purchasing === plan.type ? 'Activating...' : activePolicy?.planType === plan.type ? 'Current Plan' : activePolicy ? 'Plan Active' : `Get ${plan.name}`}
            </button>
          </div>
        ))}
      </div>

      {/* Policy History */}
      {policies.length > 0 && (
        <div className="glass-card" style={{ padding: 28, borderRadius: 20 }}>
          <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Policy History</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
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
        </div>
      )}
    </div>
  );
}
