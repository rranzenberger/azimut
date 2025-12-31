'use client';

import { FormEvent, useState } from 'react';
import { PasswordField } from './PasswordField';

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

export function SettingsForm({ settings }: { settings: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    // Geral
    siteName: settings.siteName || '',
    siteUrl: settings.siteUrl || '',
    contactEmail: settings.contactEmail || '',
    contactPhone: settings.contactPhone || '',
    // SEO
    defaultMetaDescription: settings.defaultMetaDescription || '',
    defaultKeywords: settings.defaultKeywords || '',
    ogImageUrl: settings.ogImageUrl || '',
    // Social
    facebookUrl: settings.facebookUrl || '',
    instagramUrl: settings.instagramUrl || '',
    linkedinUrl: settings.linkedinUrl || '',
    twitterUrl: settings.twitterUrl || '',
    youtubeUrl: settings.youtubeUrl || '',
    // Integrações
    kabbamApiKey: settings.kabbamApiKey || '',
    kabbamApiUrl: settings.kabbamApiUrl || '',
    smtpHost: settings.smtpHost || '',
    smtpPort: settings.smtpPort?.toString() || '',
    smtpUser: settings.smtpUser || '',
    smtpPassword: settings.smtpPassword || '',
    smtpFromEmail: settings.smtpFromEmail || '',
    deepseekApiKey: settings.deepseekApiKey || '',
    notificationEmail: settings.notificationEmail || '',
    // Outros
    defaultLanguage: settings.defaultLanguage || 'pt',
    defaultCountry: settings.defaultCountry || 'BR',
    timezone: settings.timezone || 'America/Sao_Paulo',
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          smtpPort: formData.smtpPort ? parseInt(formData.smtpPort) : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao salvar configurações');
        setLoading(false);
        return;
      }

      setMessage({ type: 'success', text: 'Configurações salvas com sucesso!' });
      setLoading(false);
    } catch (err) {
      setError('Erro de rede ao salvar configurações');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {(error || message) && (
        <div
          style={{
            padding: '12px 14px',
            borderRadius: 8,
            border: `1px solid ${
              message?.type === 'success'
                ? 'rgba(34,197,94,0.35)'
                : 'rgba(201,35,55,0.35)'
            }`,
            background:
              message?.type === 'success'
                ? 'rgba(34,197,94,0.12)'
                : 'rgba(201,35,55,0.12)',
            color: message?.type === 'success' ? '#86efac' : '#fca5a5',
            marginBottom: 24,
          }}
        >
          {message?.text || error}
        </div>
      )}

      {/* Configurações Gerais */}
      <div style={sectionStyle}>
        <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700, letterSpacing: '-0.3px' }}>
          Configurações Gerais
        </h2>
        <div style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Nome do Site</label>
            <input
              type="text"
              value={formData.siteName}
              onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>URL do Site</label>
            <input
              type="url"
              value={formData.siteUrl}
              onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Email de Contato</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Telefone de Contato</label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                style={inputStyle}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SEO */}
      <div style={sectionStyle}>
        <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700, letterSpacing: '-0.3px' }}>
          SEO Global
        </h2>
        <div style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Meta Description Padrão</label>
            <textarea
              value={formData.defaultMetaDescription}
              onChange={(e) => setFormData({ ...formData, defaultMetaDescription: e.target.value })}
              style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
              maxLength={160}
            />
            <small style={{ color: '#8f8ba2', fontSize: 12 }}>
              {formData.defaultMetaDescription.length}/160 caracteres
            </small>
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Keywords Padrão</label>
            <input
              type="text"
              value={formData.defaultKeywords}
              onChange={(e) => setFormData({ ...formData, defaultKeywords: e.target.value })}
              style={inputStyle}
              placeholder="VR, AR, museus, tecnologia (separados por vírgula)"
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Open Graph Image URL</label>
            <input
              type="url"
              value={formData.ogImageUrl}
              onChange={(e) => setFormData({ ...formData, ogImageUrl: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* Redes Sociais */}
      <div style={sectionStyle}>
        <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700, letterSpacing: '-0.3px' }}>
          Redes Sociais
        </h2>
        <div style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Facebook URL</label>
              <input
                type="url"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Instagram URL</label>
              <input
                type="url"
                value={formData.instagramUrl}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>LinkedIn URL</label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Twitter/X URL</label>
              <input
                type="url"
                value={formData.twitterUrl}
                onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>YouTube URL</label>
            <input
              type="url"
              value={formData.youtubeUrl}
              onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* Integrações */}
      <div style={sectionStyle}>
        <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700, letterSpacing: '-0.3px' }}>
          Integrações
        </h2>
        <div style={{ display: 'grid', gap: 16 }}>
          <PasswordField
            label="Kabbam API Key"
            value={formData.kabbamApiKey}
            onChange={(value) => setFormData({ ...formData, kabbamApiKey: value })}
            placeholder="••••••••"
          />
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Kabbam API URL</label>
            <input
              type="url"
              value={formData.kabbamApiUrl}
              onChange={(e) => setFormData({ ...formData, kabbamApiUrl: e.target.value })}
              style={inputStyle}
            />
          </div>
          <PasswordField
            label="DeepSeek API Key"
            value={formData.deepseekApiKey}
            onChange={(value) => setFormData({ ...formData, deepseekApiKey: value })}
            placeholder="••••••••"
          />
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Email para Notificações</label>
            <input
              type="email"
              value={formData.notificationEmail}
              onChange={(e) => setFormData({ ...formData, notificationEmail: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* SMTP */}
      <div style={sectionStyle}>
        <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700, letterSpacing: '-0.3px' }}>
          Configurações de Email (SMTP)
        </h2>
        <div style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>SMTP Host</label>
              <input
                type="text"
                value={formData.smtpHost}
                onChange={(e) => setFormData({ ...formData, smtpHost: e.target.value })}
                style={inputStyle}
                placeholder="smtp.gmail.com"
              />
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>SMTP Port</label>
              <input
                type="number"
                value={formData.smtpPort}
                onChange={(e) => setFormData({ ...formData, smtpPort: e.target.value })}
                style={inputStyle}
                placeholder="587"
                min={1}
                max={65535}
              />
            </div>
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>SMTP User</label>
            <input
              type="text"
              value={formData.smtpUser}
              onChange={(e) => setFormData({ ...formData, smtpUser: e.target.value })}
              style={inputStyle}
            />
          </div>
          <PasswordField
            label="SMTP Password"
            value={formData.smtpPassword}
            onChange={(value) => setFormData({ ...formData, smtpPassword: value })}
            placeholder="••••••••"
          />
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Email Remetente</label>
            <input
              type="email"
              value={formData.smtpFromEmail}
              onChange={(e) => setFormData({ ...formData, smtpFromEmail: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* Outros */}
      <div style={sectionStyle}>
        <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700, letterSpacing: '-0.3px' }}>
          Outros
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Idioma Padrão</label>
            <select
              value={formData.defaultLanguage}
              onChange={(e) => setFormData({ ...formData, defaultLanguage: e.target.value })}
              style={{
                ...inputStyle,
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239f9bb0' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                paddingRight: '32px',
              }}
            >
              <option value="pt" style={{ background: '#0a0e18', color: '#fff' }}>Português</option>
              <option value="en" style={{ background: '#0a0e18', color: '#fff' }}>English</option>
              <option value="es" style={{ background: '#0a0e18', color: '#fff' }}>Español</option>
              <option value="fr" style={{ background: '#0a0e18', color: '#fff' }}>Français</option>
            </select>
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>País Padrão</label>
            <select
              value={formData.defaultCountry}
              onChange={(e) => setFormData({ ...formData, defaultCountry: e.target.value })}
              style={{
                ...inputStyle,
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239f9bb0' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                paddingRight: '32px',
              }}
            >
              <option value="BR" style={{ background: '#0a0e18', color: '#fff' }}>Brasil</option>
              <option value="CA" style={{ background: '#0a0e18', color: '#fff' }}>Canadá</option>
              <option value="US" style={{ background: '#0a0e18', color: '#fff' }}>Estados Unidos</option>
            </select>
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Timezone</label>
            <select
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
              style={{
                ...inputStyle,
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239f9bb0' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                paddingRight: '32px',
              }}
            >
              <option value="America/Sao_Paulo" style={{ background: '#0a0e18', color: '#fff' }}>America/Sao_Paulo (BRT)</option>
              <option value="America/New_York" style={{ background: '#0a0e18', color: '#fff' }}>America/New_York (EST)</option>
              <option value="America/Los_Angeles" style={{ background: '#0a0e18', color: '#fff' }}>America/Los_Angeles (PST)</option>
              <option value="America/Toronto" style={{ background: '#0a0e18', color: '#fff' }}>America/Toronto (EST)</option>
              <option value="Europe/London" style={{ background: '#0a0e18', color: '#fff' }}>Europe/London (GMT)</option>
              <option value="Europe/Paris" style={{ background: '#0a0e18', color: '#fff' }}>Europe/Paris (CET)</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 24px',
            borderRadius: 10,
            border: 'none',
            background: loading ? 'rgba(201,35,55,0.5)' : '#c92337',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Salvando...' : 'Salvar Configurações'}
        </button>
      </div>
    </form>
  );
}

