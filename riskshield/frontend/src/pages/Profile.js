import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', city: user?.city || '', upiId: user?.upiId || '', platform: user?.platform || 'none', deliveryId: user?.deliveryId || '' });
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await axios.put('/api/user/profile', form);
      updateUser(form);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally { setSaving(false); }
  };

  const f = (field, val) => setForm({ ...form, [field]: val });

  return (
    <div className="slide-up">
      <div style={{ marginBottom: 36 }}>
        <h1 className="font-display" style={{ fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>Profile Settings</h1>
        <p style={{ color: '#4d4632', marginTop: 6 }}>Manage your account and delivery details.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
        {/* Avatar Card */}
        <div className="glass-card" style={{ padding: 32, borderRadius: 20, textAlign: 'center', height: 'fit-content' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(250,204,21,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 40, color: '#facc15' }}>person</span>
          </div>
          <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{user?.name}</h3>
          <p style={{ fontSize: 14, color: '#4d4632', marginBottom: 16 }}>{user?.email}</p>
          <div style={{ padding: '8px 16px', background: 'rgba(250,204,21,0.08)', borderRadius: 10, display: 'inline-block' }}>
            <span style={{ fontSize: 13, color: '#facc15', fontWeight: 600, textTransform: 'capitalize' }}>{user?.platform || 'No Platform'}</span>
          </div>
          <div style={{ marginTop: 24, padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 12 }}>
            <div style={{ fontSize: 11, color: '#4d4632', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total Earned</div>
            <div className="font-display" style={{ fontSize: 28, fontWeight: 800, color: '#facc15' }}>₹{user?.totalEarned?.toLocaleString() || 0}</div>
          </div>
        </div>

        {/* Form */}
        <div className="glass-card" style={{ padding: 36, borderRadius: 20 }}>
          <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Personal Information</h3>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <div>
                <label style={{ fontSize: 12, color: '#9a9078', display: 'block', marginBottom: 6 }}>Full Name</label>
                <input className="input-field" value={form.name} onChange={e => f('name', e.target.value)} placeholder="Your name" />
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#9a9078', display: 'block', marginBottom: 6 }}>Phone Number</label>
                <input className="input-field" value={form.phone} onChange={e => f('phone', e.target.value)} placeholder="+91 9876543210" />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <div>
                <label style={{ fontSize: 12, color: '#9a9078', display: 'block', marginBottom: 6 }}>Delivery Platform</label>
                <select className="input-field" value={form.platform} onChange={e => f('platform', e.target.value)}>
                  <option value="none">None</option>
                  <option value="swiggy">Swiggy</option>
                  <option value="zomato">Zomato</option>
                  <option value="blinkit">Blinkit</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#9a9078', display: 'block', marginBottom: 6 }}>City</label>
                <select className="input-field" value={form.city} onChange={e => f('city', e.target.value)}>
                  <option value="">Select City</option>
                  {['bengaluru','delhi','mumbai','hyderabad','chennai','pune','kolkata','ahmedabad'].map(c => (
                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#9a9078', display: 'block', marginBottom: 6 }}>
                UPI ID <span style={{ color: '#facc15' }}>*required for payouts</span>
              </label>
              <input className="input-field" value={form.upiId} onChange={e => f('upiId', e.target.value)} placeholder="yourname@upi" />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#9a9078', display: 'block', marginBottom: 6 }}>Delivery Partner ID</label>
              <input className="input-field" value={form.deliveryId} onChange={e => f('deliveryId', e.target.value)} placeholder="Your platform partner ID" />
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 18 }}>
              <button className="btn-primary" type="submit" disabled={saving} style={{ padding: '14px 32px', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                {saving ? <><div className="spinner"></div> Saving...</> : <><span className="material-symbols-outlined" style={{ fontSize: 18 }}>save</span> Save Changes</>}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Security */}
      <div className="glass-card" style={{ padding: 28, borderRadius: 20, marginTop: 24 }}>
        <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Account Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { label: 'Email', value: user?.email, icon: 'email' },
            { label: 'Account Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A', icon: 'calendar_today' },
            { label: 'Account Status', value: 'Verified', icon: 'verified' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#4d4632' }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 11, color: '#4d4632' }}>{item.label}</div>
                <div style={{ fontSize: 14, color: '#e2e2e2', fontWeight: 500, marginTop: 2 }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
