import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── NAV ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 48px',
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: '#facc15', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: '#3c2f00', fontSize: 20 }}>shield</span>
          </div>
          <span className="font-display" style={{ fontSize: 20, fontWeight: 900, color: '#facc15', letterSpacing: '-0.04em' }}>RiskShield AI</span>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Solutions', 'Risk Monitor', 'Pricing'].map(l => (
            <span key={l} style={{ color: '#9a9078', fontSize: 15, cursor: 'pointer', transition: 'color .2s' }}
              onMouseOver={e => e.target.style.color = '#e2e2e2'}
              onMouseOut={e => e.target.style.color = '#9a9078'}>{l}</span>
          ))}
          <Link to="/login" style={{ color: '#9a9078', textDecoration: 'none', fontSize: 15 }}>Sign In</Link>
          <Link to="/register">
            <button className="btn-primary" style={{ padding: '10px 24px', fontSize: 14 }}>Get Started</button>
          </Link>
        </nav>
      </header>

      {/* ── HERO — Real gig workers photo as full background ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

        {/* Real photo - fills entire section */}
        <img
          src="/images/hero-delivery.png"
          alt="Swiggy and Zomato delivery partners"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />

        {/* Dark overlay so text is readable */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(105deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.75) 45%, rgba(5,5,5,0.3) 100%)'
        }} />

        {/* Yellow glow from left */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 50% 70% at 15% 55%, rgba(250,204,21,0.15) 0%, transparent 65%)'
        }} />

        {/* Bottom fade to black */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 200,
          background: 'linear-gradient(to bottom, transparent, #0A0A0A)'
        }} />

        {/* ── Hero Content ── */}
        <div style={{ position: 'relative', zIndex: 10, padding: '0 60px', maxWidth: 760 }}>

          {/* Live badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px',
            background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.3)',
            borderRadius: 999, marginBottom: 32, backdropFilter: 'blur(10px)'
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: '#facc15', display: 'inline-block',
              boxShadow: '0 0 0 0 rgba(250,204,21,0.4)',
              animation: 'livePulse 2s infinite'
            }} />
            <span style={{ fontSize: 11, color: '#facc15', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace', fontWeight: 500 }}>
              Live Parametric Protection
            </span>
          </div>

          {/* Main heading */}
          <h1 style={{
            fontSize: 'clamp(52px, 6.5vw, 88px)',
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            marginBottom: 28,
            color: '#ffffff',
            fontFamily: 'Hanken Grotesk, sans-serif'
          }}>
            Bulletproof Your<br />
            <span style={{ color: '#facc15' }}>Gig Earnings.</span>
          </h1>

          {/* Subtext */}
          <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.65)', maxWidth: 540, lineHeight: 1.75, marginBottom: 40 }}>
            Instant payouts for <strong style={{ color: '#fff' }}>Swiggy, Zomato, and Blinkit</strong> partners.
            No claims, no paperwork. If the weather stops you,{' '}
            <strong style={{ color: '#facc15' }}>we pay you—instantly.</strong>
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 52 }}>
            <button
              onClick={() => navigate('/register')}
              style={{
                background: '#facc15', color: '#3c2f00', border: 'none', cursor: 'pointer',
                padding: '17px 42px', borderRadius: 12, fontSize: 17, fontWeight: 800,
                fontFamily: 'Hanken Grotesk, sans-serif',
                boxShadow: '0 0 32px rgba(250,204,21,0.35)',
                transition: 'all 0.2s'
              }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 48px rgba(250,204,21,0.5)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(250,204,21,0.35)'; }}
            >
              Get Covered Now
            </button>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'rgba(255,255,255,0.08)', color: '#fff', cursor: 'pointer',
                padding: '17px 38px', borderRadius: 12, fontSize: 17, fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
                fontFamily: 'Hanken Grotesk, sans-serif', transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: 8
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>login</span>
              Sign In
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', marginBottom: 40 }}>
            {[['150K+', 'Partners Protected'], ['₹2.4Cr', 'Payouts Sent'], ['< 60s', 'Avg Payout Time']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: 30, fontWeight: 900, color: '#facc15', fontFamily: 'Hanken Grotesk, sans-serif' }}>{v}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 4, letterSpacing: '0.02em' }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Platform badges */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              { name: 'Swiggy', color: '#f97316', emoji: '🛵' },
              { name: 'Zomato', color: '#ef4444', emoji: '🍕' },
              { name: 'Blinkit', color: '#facc15', emoji: '⚡' },
            ].map(p => (
              <div key={p.name} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px',
                background: 'rgba(255,255,255,0.07)', borderRadius: 10,
                border: `1px solid ${p.color}35`, backdropFilter: 'blur(8px)'
              }}>
                <span style={{ fontSize: 16 }}>{p.emoji}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#e2e2e2', fontFamily: 'Hanken Grotesk, sans-serif' }}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating payout card — right side over photo */}
        <div style={{
          position: 'absolute', right: '6%', top: '35%', zIndex: 20,
          background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(250,204,21,0.4)', borderRadius: 18,
          padding: '20px 24px', minWidth: 210,
          animation: 'floatY 4s ease-in-out infinite'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, background: 'rgba(250,204,21,0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: '#facc15', fontSize: 22 }}>payments</span>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#9a9078', marginBottom: 3 }}>Instant Payout</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#facc15', fontFamily: 'Hanken Grotesk, sans-serif' }}>₹1,250 Sent</div>
            </div>
          </div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 7, padding: '8px 12px', background: 'rgba(34,197,94,0.08)', borderRadius: 8, border: '1px solid rgba(34,197,94,0.2)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }} />
            <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 500 }}>UPI transfer complete</span>
          </div>
        </div>

        {/* Rain alert card */}
        <div style={{
          position: 'absolute', right: '6%', top: '58%', zIndex: 20,
          background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(239,68,68,0.35)', borderRadius: 16,
          padding: '16px 20px', minWidth: 190,
          animation: 'floatY 4s ease-in-out infinite',
          animationDelay: '1.5s'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, background: 'rgba(239,68,68,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: '#ef4444', fontSize: 20 }}>thunderstorm</span>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#9a9078', marginBottom: 3 }}>Rain Alert</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#ef4444' }}>68mm detected</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '100px 60px', background: '#0A0A0A', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 14, fontFamily: 'Hanken Grotesk, sans-serif' }}>
              Three Steps to Total Peace.
            </h2>
            <p style={{ color: '#4d4632', fontSize: 16, maxWidth: 460, margin: '0 auto' }}>
              From signup to your first payout in under 60 seconds.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
            {[
              { step: 1, icon: 'link', title: 'Connect Platform', desc: 'Securely link your Swiggy, Zomato, or Blinkit delivery profile in one tap via our encrypted API.' },
              { step: 2, icon: 'tune', title: 'Set Triggers', desc: 'Choose weather events that affect your earnings. Customize rain, heat and flood thresholds.' },
              { step: 3, icon: 'bolt', title: 'Instant Payout', desc: 'When a trigger hits, funds go directly to your UPI ID. No forms, no waiting, no questions.' },
            ].map(item => (
              <div key={item.step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 18 }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(250,204,21,0.08)', border: '2px solid rgba(250,204,21,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <span className="material-symbols-outlined" style={{ color: '#facc15', fontSize: 34 }}>{item.icon}</span>
                  <div style={{ position: 'absolute', top: -10, right: -10, width: 28, height: 28, borderRadius: '50%', background: '#facc15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: '#3c2f00', fontFamily: 'Hanken Grotesk, sans-serif' }}>{item.step}</div>
                </div>
                <h4 style={{ fontSize: 21, fontWeight: 700, color: '#fff', fontFamily: 'Hanken Grotesk, sans-serif' }}>{item.title}</h4>
                <p style={{ color: '#9a9078', lineHeight: 1.7, fontSize: 15, maxWidth: 260 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM CARDS ── */}
      <section style={{ padding: '100px 60px', maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 14, fontFamily: 'Hanken Grotesk, sans-serif' }}>
            Old Insurance is <span style={{ color: '#ef4444' }}>Broken.</span>
          </h2>
          <p style={{ color: '#9a9078', fontSize: 17, maxWidth: 540, margin: '0 auto' }}>
            Traditional insurers take weeks to verify claims. We use live weather data to trigger payouts the moment you're affected.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 24 }}>
          {[
            { icon: 'thunderstorm', color: '#ef4444', bg: 'rgba(239,68,68,0.08)', emoji: '🌧️', title: 'Rain Interruption', desc: 'Monsoon deluge halting deliveries? Our system detects precipitation levels and triggers payouts without a single phone call.', trigger: 'Trigger: > 50mm rainfall' },
            { icon: 'thermostat', color: '#f97316', bg: 'rgba(249,115,22,0.08)', emoji: '🌡️', title: 'Heatwave Defense', desc: 'When temperatures cross 42°C, gig work becomes hazardous. We compensate your rest time during peak sun hours.', trigger: 'Trigger: > 42°C temperature' },
            { icon: 'water_damage', color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', emoji: '🌊', title: 'Urban Flooding', desc: "Road closures due to waterlogging? We map local flood risk data so your income stays buoyant when the streets aren't.", trigger: 'Trigger: Flood risk > level 3' },
          ].map(item => (
            <div key={item.title} className="glass-card" style={{ padding: 36, borderRadius: 20, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 16, right: 20, fontSize: 72, opacity: 0.06, lineHeight: 1, userSelect: 'none' }}>{item.emoji}</div>
              <div style={{ width: 52, height: 52, background: item.bg, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <span className="material-symbols-outlined" style={{ color: item.color, fontSize: 26 }}>{item.icon}</span>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12, fontFamily: 'Hanken Grotesk, sans-serif' }}>{item.title}</h3>
              <p style={{ color: '#9a9078', lineHeight: 1.7, fontSize: 15, marginBottom: 20 }}>{item.desc}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: item.bg, borderRadius: 99, border: `1px solid ${item.color}30` }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: item.color, display: 'inline-block' }} />
                <span style={{ fontSize: 11, color: item.color, fontFamily: 'JetBrains Mono, monospace', fontWeight: 500 }}>{item.trigger}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANS ── */}
      <section style={{ padding: '100px 60px', background: 'linear-gradient(180deg,transparent,rgba(250,204,21,0.02),transparent)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, color: '#fff', textAlign: 'center', marginBottom: 12, letterSpacing: '-0.03em', fontFamily: 'Hanken Grotesk, sans-serif' }}>Simple Pricing.</h2>
          <p style={{ color: '#9a9078', textAlign: 'center', marginBottom: 56, fontSize: 17 }}>No hidden fees. Cancel anytime. Coverage starts immediately.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 24 }}>
            {[
              { name: 'Shield Basic', price: '₹99', cover: '₹500', type: 'basic', popular: false, features: ['Rain trigger payout', 'Heat trigger payout', 'UPI instant transfer', 'Basic risk dashboard'] },
              { name: 'Shield Standard', price: '₹199', cover: '₹1,250', type: 'standard', popular: true, features: ['All Basic features', 'Flood trigger payout', 'AI risk analysis', 'Custom thresholds', 'Priority support'] },
              { name: 'Shield Elite', price: '₹399', cover: '₹3,000', type: 'elite', popular: false, features: ['All Standard features', 'Maximum coverage', 'Dedicated account manager', 'Multi-platform linking', 'Advanced analytics'] },
            ].map(plan => (
              <div key={plan.type} className="glass-card" style={{ padding: 36, borderRadius: 20, position: 'relative', border: plan.popular ? '1px solid rgba(250,204,21,0.35)' : undefined }}>
                {plan.popular && (
                  <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#facc15', color: '#3c2f00', padding: '5px 20px', borderRadius: 99, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>⭐ Most Popular</div>
                )}
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8, fontFamily: 'Hanken Grotesk, sans-serif' }}>{plan.name}</h3>
                <div style={{ marginBottom: 16 }}>
                  <span style={{ fontSize: 48, fontWeight: 900, color: '#facc15', fontFamily: 'Hanken Grotesk, sans-serif' }}>{plan.price}</span>
                  <span style={{ color: '#4d4632', fontSize: 14 }}>/month</span>
                </div>
                <div style={{ padding: '10px 14px', background: 'rgba(250,204,21,0.06)', borderRadius: 10, marginBottom: 24 }}>
                  <span style={{ color: '#9a9078', fontSize: 13 }}>Coverage up to </span>
                  <span style={{ color: '#facc15', fontWeight: 700 }}>{plan.cover}</span>
                </div>
                <ul style={{ listStyle: 'none', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#9a9078' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#22c55e' }}>check</span>{f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/register')}
                  style={{
                    width: '100%', fontSize: 15, padding: '13px', borderRadius: 10, cursor: 'pointer', fontWeight: 700,
                    fontFamily: 'Hanken Grotesk, sans-serif', border: 'none', transition: 'all 0.2s',
                    background: plan.popular ? '#facc15' : 'rgba(255,255,255,0.06)',
                    color: plan.popular ? '#3c2f00' : '#e2e2e2',
                  }}>
                  Get {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '100px 60px', maxWidth: 1300, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, color: '#fff', marginBottom: 8, letterSpacing: '-0.03em', fontFamily: 'Hanken Grotesk, sans-serif' }}>Voices of the Fleet</h2>
        <p style={{ color: '#9a9078', marginBottom: 48, fontSize: 16 }}>Real stories from the backbone of Indian logistics.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px,1fr))', gap: 24 }}>
          {[
            { name: 'Rajesh Kumar', role: 'Zomato Partner • Bengaluru', initial: 'RK', color: '#ef4444', quote: '"Last month when Bengaluru flooded, I couldn\'t ride for 3 days. RiskShield deposited ₹2,400 into my account automatically before the rain even stopped. It saved my family\'s budget."' },
            { name: 'Amit Sharma', role: 'Swiggy Partner • Delhi', initial: 'AS', color: '#f97316', quote: '"The transparency is amazing. I can see the weather triggers live on my dashboard. When the heatwave hit Delhi, the Rest Day payout was in my bank by noon. Truly elite tech."' },
          ].map(t => (
            <div key={t.name} className="glass-card" style={{ padding: 40, borderRadius: 20 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 40, color: '#facc15', opacity: 0.15, float: 'right' }}>format_quote</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{ width: 54, height: 54, borderRadius: '50%', background: `${t.color}20`, border: `2px solid ${t.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: t.color, fontFamily: 'Hanken Grotesk, sans-serif' }}>{t.initial}</span>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 16 }}>{t.name}</div>
                  <div style={{ color: '#4d4632', fontSize: 13, marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
              <p style={{ color: '#9a9078', lineHeight: 1.8, fontStyle: 'italic', fontSize: 16 }}>{t.quote}</p>
              <div style={{ marginTop: 20, display: 'flex', gap: 3 }}>
                {'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: '#facc15', fontSize: 16 }}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '80px 60px', maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ background: '#facc15', borderRadius: 32, padding: '80px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, background: 'rgba(255,255,255,0.2)', borderRadius: '50%', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(50px)' }} />
          <div style={{ position: 'relative' }}>
            <h2 style={{ fontSize: 'clamp(36px,5vw,62px)', fontWeight: 900, color: '#3c2f00', marginBottom: 16, letterSpacing: '-0.04em', fontFamily: 'Hanken Grotesk, sans-serif' }}>
              Ready to Bulletproof<br />Your Income?
            </h2>
            <p style={{ color: '#574500', fontSize: 18, margin: '0 auto 40px', maxWidth: 480 }}>
              Join 150,000+ delivery partners who never worry about the weather again.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/register')}
                style={{ background: '#0A0A0A', color: '#facc15', padding: '18px 48px', borderRadius: 14, fontSize: 18, fontWeight: 800, border: 'none', cursor: 'pointer', fontFamily: 'Hanken Grotesk, sans-serif', transition: 'transform .2s' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                Start Your Protection
              </button>
              <button
                onClick={() => navigate('/login')}
                style={{ background: 'transparent', color: '#3c2f00', padding: '18px 48px', borderRadius: 14, fontSize: 18, fontWeight: 700, border: '2px solid rgba(0,0,0,0.2)', cursor: 'pointer', fontFamily: 'Hanken Grotesk, sans-serif' }}>
                Sign In
              </button>
            </div>
            <div style={{ marginTop: 52, display: 'flex', justifyContent: 'center', gap: 32, opacity: 0.3 }}>
              {['ZOMATO', 'SWIGGY', 'BLINKIT'].map(p => (
                <span key={p} style={{ fontWeight: 900, fontSize: 20, letterSpacing: '0.12em', color: '#3c2f00', fontFamily: 'Hanken Grotesk, sans-serif' }}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '40px 60px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 30, height: 30, background: '#facc15', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: '#3c2f00', fontSize: 16 }}>shield</span>
          </div>
          <span style={{ fontWeight: 800, color: '#facc15', fontSize: 16, fontFamily: 'Hanken Grotesk, sans-serif' }}>RiskShield AI</span>
          <span style={{ color: '#333', fontSize: 13 }}>© 2024 · IRDAI Sandbox Approved</span>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          {['Privacy Policy', 'Terms of Service', 'Carrier Info', 'Contact'].map(l => (
            <a key={l} href="#" style={{ color: '#4d4632', textDecoration: 'none', fontSize: 14 }}>{l}</a>
          ))}
        </div>
      </footer>

      <style>{`
        @keyframes livePulse {
          0% { box-shadow: 0 0 0 0 rgba(250,204,21,0.5); }
          70% { box-shadow: 0 0 0 8px rgba(250,204,21,0); }
          100% { box-shadow: 0 0 0 0 rgba(250,204,21,0); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
