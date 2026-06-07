import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', platform: 'none', city: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      await register(form);
      toast.success('Account created! Welcome to RiskShield.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  const f = (field, value) => setForm({ ...form, [field]: value });

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(250,204,21,0.05) 0%, transparent 60%)' }}>
      <div className="glass-card slide-up" style={{ width: '100%', maxWidth: 480, padding: 48, borderRadius: 24 }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
          <div style={{ width: 34, height: 34, background: '#facc15', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: '#3c2f00', fontSize: 18 }}>shield</span>
          </div>
          <span className="font-display" style={{ fontSize: 18, fontWeight: 800, color: '#facc15' }}>RiskShield AI</span>
        </Link>
        <h1 className="font-display" style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 8, letterSpacing: '-0.03em' }}>Get Protected</h1>
        <p style={{ color: '#4d4632', marginBottom: 32, fontSize: 15 }}>Create your account in 60 seconds</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, color: '#9a9078', display: 'block', marginBottom: 5 }}>Full Name *</label>
              <input className="input-field" type="text" placeholder="Rajesh Kumar" required value={form.name} onChange={e => f('name', e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#9a9078', display: 'block', marginBottom: 5 }}>Phone</label>
              <input className="input-field" type="tel" placeholder="+91 9876543210" value={form.phone} onChange={e => f('phone', e.target.value)} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, color: '#9a9078', display: 'block', marginBottom: 5 }}>Email *</label>
            <input className="input-field" type="email" placeholder="you@example.com" required value={form.email} onChange={e => f('email', e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: '#9a9078', display: 'block', marginBottom: 5 }}>Password *</label>
            <input className="input-field" type="password" placeholder="Min 6 characters" required value={form.password} onChange={e => f('password', e.target.value)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, color: '#9a9078', display: 'block', marginBottom: 5 }}>Delivery Platform</label>
              <select className="input-field" value={form.platform} onChange={e => f('platform', e.target.value)}>
                <option value="none">Select Platform</option>
                <option value="swiggy">Swiggy</option>
                <option value="zomato">Zomato</option>
                <option value="blinkit">Blinkit</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#9a9078', display: 'block', marginBottom: 5 }}>City</label>
              <select className="input-field" value={form.city} onChange={e => f('city', e.target.value)}>
                <option value="">Select City</option>
                {['Bengaluru','Delhi','Mumbai','Hyderabad','Chennai','Pune','Kolkata','Ahmedabad'].map(c => (
                  <option key={c} value={c.toLowerCase()}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <button className="btn-primary" type="submit" disabled={loading} style={{ marginTop: 8, fontSize: 16, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {loading ? <><div className="spinner"></div> Creating Account...</> : 'Create Account'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 28, color: '#4d4632', fontSize: 14 }}>
          Already have an account? <Link to="/login" style={{ color: '#facc15', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
