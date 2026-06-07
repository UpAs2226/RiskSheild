import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { path: '/policy', icon: 'shield', label: 'My Policy' },
  { path: '/claims', icon: 'payments', label: 'Claims' },
  { path: '/ai', icon: 'smart_toy', label: 'AI Assistant' },
  { path: '/profile', icon: 'person', label: 'Profile' },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0A' }}>
      {/* Sidebar */}
      <aside style={{
        width: 240, background: 'rgba(14,14,14,0.95)', borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column', padding: '24px 0', position: 'fixed',
        top: 0, left: 0, height: '100vh', zIndex: 100
      }}>
        {/* Logo */}
        <div style={{ padding: '0 20px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: '#facc15', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: '#3c2f00', fontSize: 20 }}>shield</span>
            </div>
            <span className="font-display" style={{ fontSize: 18, fontWeight: 800, color: '#facc15', letterSpacing: '-0.03em' }}>RiskShield</span>
          </Link>
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                borderRadius: 10, textDecoration: 'none',
                background: active ? 'rgba(250,204,21,0.12)' : 'transparent',
                color: active ? '#facc15' : '#9a9078',
                fontWeight: active ? 600 : 400, fontSize: 14,
                transition: 'all 0.2s', border: active ? '1px solid rgba(250,204,21,0.2)' : '1px solid transparent'
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div style={{ padding: '20px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', marginBottom: 8 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(250,204,21,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#facc15' }}>person</span>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e2e2' }}>{user?.name?.split(' ')[0]}</div>
              <div style={{ fontSize: 11, color: '#4d4632' }}>{user?.platform || 'No platform'}</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', borderRadius: 10, background: 'transparent',
            border: 'none', color: '#9a9078', cursor: 'pointer', fontSize: 14, transition: 'all 0.2s'
          }}
            onMouseOver={e => e.currentTarget.style.color = '#ef4444'}
            onMouseOut={e => e.currentTarget.style.color = '#9a9078'}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: 240, padding: '32px 40px', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  );
}
