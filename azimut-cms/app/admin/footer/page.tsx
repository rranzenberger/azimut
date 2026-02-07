'use client';

import { FormEvent, useEffect, useState } from 'react';

const inputStyle = {
  width: '100%',
  height: 42,
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.04)',
  color: '#fff',
  padding: '0 12px',
  outline: 'none',
  fontSize: 14,
  fontFamily: 'inherit',
  boxSizing: 'border-box' as const,
};

const sectionStyle = {
  padding: 24,
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.03)',
  marginBottom: 24,
};

interface FooterData {
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  instagramUrl: string;
  youtubeUrl: string;
  linkedinUrl: string;
  vimeoUrl: string;
  behanceUrl: string;
  facebookUrl: string;
  twitterUrl: string;
}

const EMPTY: FooterData = {
  contactEmail: '',
  contactPhone: '',
  whatsappNumber: '',
  instagramUrl: '',
  youtubeUrl: '',
  linkedinUrl: '',
  vimeoUrl: '',
  behanceUrl: '',
  facebookUrl: '',
  twitterUrl: '',
};

export default function FooterPage() {
  const [formData, setFormData] = useState<FooterData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/footer-settings')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setFormData({
            contactEmail: data.contactEmail || '',
            contactPhone: data.contactPhone || '',
            whatsappNumber: data.whatsappNumber || '',
            instagramUrl: data.instagramUrl || '',
            youtubeUrl: data.youtubeUrl || '',
            linkedinUrl: data.linkedinUrl || '',
            vimeoUrl: data.vimeoUrl || '',
            behanceUrl: data.behanceUrl || '',
            facebookUrl: data.facebookUrl || '',
            twitterUrl: data.twitterUrl || '',
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage(null);
    setSaving(true);
    try {
      const res = await fetch('/api/admin/footer-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Erro ao salvar' });
      } else {
        setMessage({ type: 'success', text: 'Rodapé salvo com sucesso!' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Erro de rede ao salvar' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: 40, color: '#c0bccf' }}>Carregando dados do rodapé...</div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: '-0.5px' }}>
          Rodapé do Site
        </h1>
        <p style={{ margin: '8px 0 0', color: '#c0bccf', fontSize: 16 }}>
          Gerencie os dados de contato e redes sociais que aparecem no rodapé do site.
        </p>
      </header>

      {message && (
        <div
          style={{
            padding: '12px 14px',
            borderRadius: 8,
            border: `1px solid ${message.type === 'success' ? 'rgba(34,197,94,0.35)' : 'rgba(201,35,55,0.35)'}`,
            background: message.type === 'success' ? 'rgba(34,197,94,0.12)' : 'rgba(201,35,55,0.12)',
            color: message.type === 'success' ? '#86efac' : '#fca5a5',
            marginBottom: 24,
          }}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Contato */}
        <div style={sectionStyle}>
          <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700 }}>
            Contato
          </h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ display: 'grid', gap: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 600 }}>Email de contato</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  style={inputStyle}
                  placeholder="contact@azimutimmersive.com"
                />
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 600 }}>Telefone de contato</label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  style={inputStyle}
                  placeholder="+55 48 99970-1301"
                />
              </div>
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>WhatsApp (número para link wa.me)</label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                style={inputStyle}
                placeholder="+55 48 999701301"
              />
              <small style={{ color: '#8f8ba2', fontSize: 12 }}>
                Formato: +55 48 999701301 (com DDI). Usado no botão do WhatsApp do site.
              </small>
            </div>
          </div>
        </div>

        {/* Redes Sociais */}
        <div style={sectionStyle}>
          <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700 }}>
            Redes Sociais
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 20 }}>
            URLs dos perfis. Aparecem como ícones no rodapé do site.
          </p>
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ display: 'grid', gap: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 600 }}>Instagram</label>
                <input
                  type="url"
                  value={formData.instagramUrl}
                  onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                  style={inputStyle}
                  placeholder="https://www.instagram.com/azimut_vr/"
                />
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 600 }}>YouTube</label>
                <input
                  type="url"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  style={inputStyle}
                  placeholder="https://youtube.com/@azimutart"
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ display: 'grid', gap: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 600 }}>LinkedIn</label>
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  style={inputStyle}
                  placeholder="https://linkedin.com/company/azimut-art"
                />
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 600 }}>Vimeo</label>
                <input
                  type="url"
                  value={formData.vimeoUrl}
                  onChange={(e) => setFormData({ ...formData, vimeoUrl: e.target.value })}
                  style={inputStyle}
                  placeholder="https://vimeo.com/azimutart"
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ display: 'grid', gap: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 600 }}>Behance</label>
                <input
                  type="url"
                  value={formData.behanceUrl}
                  onChange={(e) => setFormData({ ...formData, behanceUrl: e.target.value })}
                  style={inputStyle}
                  placeholder="https://behance.net/azimutart"
                />
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 600 }}>Facebook</label>
                <input
                  type="url"
                  value={formData.facebookUrl}
                  onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Twitter / X</label>
              <input
                type="url"
                value={formData.twitterUrl}
                onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '12px 24px',
              borderRadius: 10,
              border: 'none',
              background: saving ? 'rgba(201,35,55,0.5)' : '#c92337',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: saving ? 'not-allowed' : 'pointer',
            }}
          >
            {saving ? 'Salvando...' : 'Salvar Rodapé'}
          </button>
        </div>
      </form>
    </div>
  );
}
