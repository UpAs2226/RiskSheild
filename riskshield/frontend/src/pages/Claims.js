import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Claims() {
  const [claims, setClaims] = useState([]);
  const [stats, setStats] = useState({ totalPaid: 0, claimCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchClaims(); }, []);

  const fetchClaims = async () => {
    try {
      const [claimsRes, statsRes] = await Promise.all([
        axios.get('/api/claims/my'),
        axios.get('/api/claims/stats')
      ]);
      setClaims(claimsRes.data);
      setStats(statsRes.data);
    } catch (err) { toast.error('Failed to load claims'); }
    finally { setLoading(false); }
  };

  const triggerIcon = { rain: 'thunderstorm', heat: 'thermostat', flood: 'water_damage' };
  const triggerColor = { rain: '#3b82f6', heat: '#f97316', flood: '#8b5cf6' };
  const statusColor = { paid: '#22c55e', processing: '#f97316', rejected: '#ef4444' };

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}><div className="spinner" style={{ width: 40, height: 40 }}></div></div>;

  return (
    <div className="slide-up">
      <div style={{ marginBottom: 36 }}>
        <h1 className="font-display" style={{ fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>Claims & Payouts</h1>
        <p style={{ color: '#4d4632', marginTop: 6 }}>All your parametric payout history.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
        {[
          { label: 'Total Received', value: `₹${stats.totalPaid?.toLocaleString() || 0}`, icon: 'account_balance_wallet', color: '#facc15' },
          { label: 'Claims Paid', value: stats.claimCount || 0, icon: 'check_circle', color: '#22c55e' },
          { label: 'Avg Payout', value: stats.claimCount ? `₹${Math.round(stats.totalPaid / stats.claimCount)}` : '₹0', icon: 'trending_up', color: '#3b82f6' },
        ].map(s => (
          <div key={s.label} className="glass-card" style={{ padding: 24, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, background: `${s.color}18`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: s.color, fontSize: 22 }}>{s.icon}</span>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#4d4632', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'JetBrains Mono' }}>{s.label}</div>
              <div className="font-display" style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 2 }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Claims List */}
      <div className="glass-card" style={{ padding: 28, borderRadius: 20 }}>
        <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 24 }}>All Payouts</h3>
        {claims.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 48, color: '#4d4632', display: 'block', marginBottom: 12 }}>payments</span>
            <p style={{ color: '#4d4632', fontSize: 16 }}>No payouts yet.</p>
            <p style={{ color: '#333', fontSize: 14, marginTop: 6 }}>Purchase a policy and trigger your first payout from the dashboard.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 16, padding: '0 0 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 8 }}>
              {['Trigger', 'Amount', 'Status', 'UPI', 'Date'].map(h => (
                <span key={h} style={{ fontSize: 11, color: '#4d4632', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'JetBrains Mono' }}>{h}</span>
              ))}
            </div>
            {claims.map((c, i) => (
              <div key={c._id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 16, alignItems: 'center', padding: '16px 0', borderBottom: i < claims.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, background: `${triggerColor[c.triggerType]}15`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: triggerColor[c.triggerType] }}>{triggerIcon[c.triggerType]}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#e2e2e2', textTransform: 'capitalize' }}>{c.triggerType} Trigger</div>
                    <div style={{ fontSize: 11, color: '#4d4632' }}>Value: {c.triggerValue?.toFixed(1)}</div>
                  </div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#facc15' }}>₹{c.amount}</div>
                <div>
                  <span style={{ fontSize: 12, color: statusColor[c.status], fontWeight: 600, padding: '3px 8px', background: `${statusColor[c.status]}15`, borderRadius: 6 }}>
                    {c.status}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: '#9a9078', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.upiId}</div>
                <div style={{ fontSize: 12, color: '#4d4632' }}>{new Date(c.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
