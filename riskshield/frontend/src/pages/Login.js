import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(250,204,21,0.05) 0%, transparent 60%)' }}>
      <div className="glass-card slide-up" style={{ width: '100%', maxWidth: 420, padding: 48, borderRadius: 24 }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
          <div style={{ width: 34, height: 34, background: '#facc15', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: '#3c2f00', fontSize: 18 }}>shield</span>
          </div>
          <span className="font-display" style={{ fontSize: 18, fontWeight: 800, color: '#facc15' }}>RiskShield AI</span>
        </Link>
        <h1 className="font-display" style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 8, letterSpacing: '-0.03em' }}>Welcome back</h1>
        <p style={{ color: '#4d4632', marginBottom: 32, fontSize: 15 }}>Sign in to your account</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, color: '#9a9078', display: 'block', marginBottom: 6 }}>Email</label>
            <input className="input-field" type="email" placeholder="you@example.com" required
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label style={{ fontSize: 13, color: '#9a9078', display: 'block', marginBottom: 6 }}>Password</label>
            <input className="input-field" type="password" placeholder="Your password" required
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          <button className="btn-primary" type="submit" disabled={loading} style={{ marginTop: 8, fontSize: 16, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {loading ? <><div className="spinner"></div> Signing in...</> : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 28, color: '#4d4632', fontSize: 14 }}>
          Don't have an account? <Link to="/register" style={{ color: '#facc15', textDecoration: 'none', fontWeight: 600 }}>Register</Link>
        </p>
      </div>
    </div>
  );
}
