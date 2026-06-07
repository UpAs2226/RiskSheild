import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const QUICK_QUESTIONS = [
  'How does parametric insurance work?',
  'What triggers a rain payout?',
  'Which plan should I choose?',
  'How do I set up my UPI ID?',
  'What is the payout timeline?',
];

export default function AiAssistant() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Namaste, ${user?.name?.split(' ')[0] || 'Partner'}! 👋 I'm your RiskShield AI Assistant. I can help you understand your coverage, explain payout triggers, or guide you through setting up your policy. What would you like to know?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');
    const userMsg = { role: 'user', content: msg };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    try {
      const history = messages.slice(-6);
      const { data } = await axios.post('/api/ai/chat', { message: msg, history });
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I\'m having trouble connecting right now. Please check your Groq API key in the backend .env file.' }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="slide-up" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="font-display" style={{ fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>AI Assistant</h1>
        <p style={{ color: '#4d4632', marginTop: 4 }}>Powered by Groq · Llama 3</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, flex: 1, minHeight: 0 }}>
        {/* Chat */}
        <div className="glass-card" style={{ borderRadius: 20, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(250,204,21,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#facc15' }}>smart_toy</span>
                  </div>
                )}
                <div style={{
                  maxWidth: '75%', padding: '14px 18px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.role === 'user' ? '#facc15' : 'rgba(255,255,255,0.06)',
                  color: msg.role === 'user' ? '#3c2f00' : '#e2e2e2',
                  fontSize: 15, lineHeight: 1.65
                }}>
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#9a9078' }}>person</span>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(250,204,21,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#facc15' }}>smart_toy</span>
                </div>
                <div style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.06)', borderRadius: '18px 18px 18px 4px', display: 'flex', gap: 6, alignItems: 'center' }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#facc15', animation: 'pulse-yellow 1.2s infinite', animationDelay: `${i*0.2}s` }}></div>
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 12 }}>
            <input
              className="input-field"
              placeholder="Ask me anything about your coverage..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              disabled={loading}
              style={{ flex: 1 }}
            />
            <button className="btn-primary" onClick={() => sendMessage()} disabled={loading || !input.trim()} style={{ padding: '12px 20px', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>send</span>
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="glass-card" style={{ padding: 20, borderRadius: 16 }}>
            <h4 style={{ fontSize: 13, color: '#facc15', fontWeight: 600, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'JetBrains Mono' }}>Quick Questions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {QUICK_QUESTIONS.map(q => (
                <button key={q} onClick={() => sendMessage(q)} disabled={loading}
                  style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#9a9078', fontSize: 13, textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s', lineHeight: 1.4 }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(250,204,21,0.2)'; e.currentTarget.style.color = '#e2e2e2'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#9a9078'; }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: 20, borderRadius: 16 }}>
            <h4 style={{ fontSize: 13, color: '#facc15', fontWeight: 600, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'JetBrains Mono' }}>AI Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Model', value: 'Llama 3 8B' },
                { label: 'Provider', value: 'Groq API' },
                { label: 'Response', value: '< 2 seconds' },
                { label: 'Language', value: 'English / Hindi' },
              ].map(i => (
                <div key={i.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: '#4d4632' }}>{i.label}</span>
                  <span style={{ color: '#9a9078', fontFamily: 'JetBrains Mono' }}>{i.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
