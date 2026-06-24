// File: pages/index.js
// Page React qui appelle l'API route

import React, { useState } from 'react';
import { Copy, Loader } from 'lucide-react';

export default function ContentGenerator() {
  const [expertise, setExpertise] = useState('');
  const [facts, setFacts] = useState(['', '', '']);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('linkedin');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleFactChange = (index, value) => {
    const newFacts = [...facts];
    newFacts[index] = value;
    setFacts(newFacts);
  };

  const generateContent = async () => {
    setError('');
    
    if (!expertise.trim() || facts.some(f => !f.trim())) {
      setError('Remplis tous les champs');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expertise: expertise.trim(),
          facts: facts.map(f => f.trim())
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur de génération');
      }

      const data = await response.json();
      setContent(data);
    } catch (err) {
      setError(err.message || 'Erreur. Réessaie svp.');
      console.error('Error:', err);
    }
    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ backgroundColor: '#f8f7f4', minHeight: '100vh', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* HEADER */}
      <div style={{ background: 'linear-gradient(135deg, #2d3561 0%, #1a1f3a 100%)', color: 'white', padding: '50px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '44px', fontWeight: 700, margin: '0 0 8px 0' }}>ContentFlow</h1>
        <p style={{ fontSize: '18px', opacity: 0.9, margin: 0 }}>30 jours de contenu en 2 minutes ⚡</p>
      </div>

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '40px 20px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '40px' }}>
        
        {/* LEFT: FORM */}
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: 'fit-content' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 30px 0', color: '#2d3561' }}>Tes infos</h2>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#2d3561', marginBottom: '10px' }}>
              Domaine d'expertise
            </label>
            <input
              type="text"
              placeholder="Ex: Marketing digital, Freelancing, Python..."
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                border: '2px solid #eee',
                borderRadius: '8px',
                fontSize: '15px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                opacity: loading ? 0.6 : 1
              }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#2d3561', marginBottom: '10px' }}>
              3 faits clés
            </label>
            {facts.map((fact, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Fait ${idx + 1}: Un conseil, résultat, astuce...`}
                value={fact}
                onChange={(e) => handleFactChange(idx, e.target.value)}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #eee',
                  borderRadius: '8px',
                  fontSize: '14px',
                  marginBottom: '12px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  opacity: loading ? 0.6 : 1
                }}
              />
            ))}
          </div>

          {error && (
            <div style={{ backgroundColor: '#fee', color: '#c33', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '13px' }}>
              ⚠️ {error}
            </div>
          )}

          <button
            onClick={generateContent}
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: loading ? '#ccc' : '#ff6b35',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.3s'
            }}
          >
            {loading ? (
              <>
                <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
                Génération...
              </>
            ) : (
              '✨ Générer 30 jours'
            )}
          </button>
        </div>

        {/* RIGHT: CONTENT */}
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          {!content ? (
            <div style={{ textAlign: 'center', color: '#999', padding: '60px 20px' }}>
              <p style={{ fontSize: '18px', margin: '0 0 10px 0' }}>Ton contenu apparaîtra ici</p>
              <p style={{ fontSize: '14px', margin: 0 }}>👇 Remplis tes infos et clique "Générer"</p>
            </div>
          ) : (
            <>
              {/* TABS */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '2px solid #f0f0f0', paddingBottom: '16px' }}>
                {['linkedin', 'tiktok', 'email'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '8px 16px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: activeTab === tab ? '#ff6b35' : '#999',
                      cursor: 'pointer',
                      fontSize: '15px',
                      fontWeight: activeTab === tab ? 700 : 500,
                      borderBottom: activeTab === tab ? '3px solid #ff6b35' : 'none',
                      marginBottom: '-19px',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tab === 'linkedin' && '📱 LinkedIn'}
                    {tab === 'tiktok' && '🎬 TikTok'}
                    {tab === 'email' && '✉️ Email'}
                  </button>
                ))}
              </div>

              {/* CONTENT DISPLAY */}
              <div style={{ maxHeight: '700px', overflowY: 'auto', paddingRight: '12px' }}>
                {activeTab === 'linkedin' && content.linkedin?.map((item, idx) => (
                  <div key={idx} style={{ marginBottom: '18px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px', borderLeft: '4px solid #ff6b35' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#ff6b35', marginBottom: '8px' }}>JOUR {item.day}</div>
                    <p style={{ fontSize: '14px', margin: '0 0 8px 0', lineHeight: '1.5', color: '#333' }}>{item.post}</p>
                    <p style={{ fontSize: '12px', color: '#999', margin: '0 0 10px 0' }}>💡 {item.hook}</p>
                    <button
                      onClick={() => copyToClipboard(item.post)}
                      style={{
                        fontSize: '12px',
                        padding: '8px 12px',
                        backgroundColor: '#2d3561',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Copy size={14} /> {copied ? 'Copié!' : 'Copier'}
                    </button>
                  </div>
                ))}

                {activeTab === 'tiktok' && content.tiktok?.map((item, idx) => (
                  <div key={idx} style={{ marginBottom: '18px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px', borderLeft: '4px solid #ff6b35' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#ff6b35', marginBottom: '8px' }}>JOUR {item.day}</div>
                    <p style={{ fontSize: '14px', margin: '0 0 8px 0', lineHeight: '1.5', color: '#333', whiteSpace: 'pre-wrap' }}>{item.script}</p>
                    <p style={{ fontSize: '12px', color: '#999', margin: '0 0 10px 0' }}>🎥 {item.idea}</p>
                    <button
                      onClick={() => copyToClipboard(item.script)}
                      style={{
                        fontSize: '12px',
                        padding: '8px 12px',
                        backgroundColor: '#2d3561',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Copy size={14} /> {copied ? 'Copié!' : 'Copier'}
                    </button>
                  </div>
                ))}

                {activeTab === 'email' && content.email?.map((item, idx) => (
                  <div key={idx} style={{ marginBottom: '18px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px', borderLeft: '4px solid #ff6b35' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#ff6b35', marginBottom: '8px' }}>JOUR {item.day}</div>
                    <p style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 8px 0', color: '#333' }}>📧 {item.subject}</p>
                    <p style={{ fontSize: '14px', margin: '0 0 10px 0', lineHeight: '1.5', color: '#666' }}>{item.body}</p>
                    <button
                      onClick={() => copyToClipboard(`Sujet: ${item.subject}\n\n${item.body}`)}
                      style={{
                        fontSize: '12px',
                        padding: '8px 12px',
                        backgroundColor: '#2d3561',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Copy size={14} /> {copied ? 'Copié!' : 'Copier'}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-thumb {
          background: #ff6b35;
          border-radius: 4px;
        }

        @media (max-width: 900px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
