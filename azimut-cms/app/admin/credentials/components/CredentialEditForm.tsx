'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const inputStyle = {
  padding: '10px 14px',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(0,0,0,0.2)',
  color: '#fff',
  fontSize: 14,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box' as const,
};

export function CredentialEditForm({ credential }: { credential?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    order: credential?.order || 0,
    icon: credential?.icon || '',
    textPt: credential?.textPt || '',
    textEn: credential?.textEn || '',
    textEs: credential?.textEs || '',
    textFr: credential?.textFr || '',
    isPublished: credential?.isPublished !== undefined ? credential.isPublished : true,
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const url = credential ? `/api/admin/credentials/${credential.id}` : '/api/admin/credentials';
      const method = credential ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao salvar credencial');
        setLoading(false);
        return;
      }

      setMessage({ type: 'success', text: credential ? 'Credencial atualizada com sucesso!' : 'Credencial criada com sucesso!' });
      setTimeout(() => {
        router.push('/admin/credentials');
        router.refresh();
      }, 1000);
      setLoading(false);
    } catch (err) {
      setError('Erro de rede ao salvar credencial');
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!credential || !confirm('Tem certeza que deseja deletar esta credencial?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/credentials/${credential.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro ao deletar credencial');
      }

      router.push('/admin/credentials');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <>
      <header style={{ marginBottom: 24 }}>
        <Link
          href="/admin/credentials"
          style={{
            color: '#9f9bb0',
            textDecoration: 'none',
            fontSize: 14,
            marginBottom: 8,
            display: 'inline-block',
          }}
        >
          ← Voltar para Credenciais
        </Link>
        <h1 style={{ margin: '8px 0', fontSize: 32, fontWeight: 700, letterSpacing: '-0.5px' }}>
          {credential ? (
            <>
              {credential.icon && <span style={{ marginRight: 12 }}>{credential.icon}</span>}
              Editar Credencial
            </>
          ) : (
            'Nova Credencial'
          )}
        </h1>
        <p style={{ margin: 4, color: '#c0bccf' }}>
          {credential ? 'Edite as informações da credencial.' : 'Preencha as informações da nova credencial.'}
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        style={{
          padding: 24,
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.03)',
          display: 'grid',
          gap: 20,
          maxWidth: 1000,
        }}
      >
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
            }}
          >
            {message?.text || error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Ordem *</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              required
              style={inputStyle}
              min={0}
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Ícone (emoji)</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              style={inputStyle}
              placeholder="🏆"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Texto PT *</label>
          <textarea
            value={formData.textPt}
            onChange={(e) => setFormData({ ...formData, textPt: e.target.value })}
            required
            style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Texto EN *</label>
          <textarea
            value={formData.textEn}
            onChange={(e) => setFormData({ ...formData, textEn: e.target.value })}
            required
            style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Texto ES</label>
            <textarea
              value={formData.textEs}
              onChange={(e) => setFormData({ ...formData, textEs: e.target.value })}
              style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Texto FR</label>
            <textarea
              value={formData.textFr}
              onChange={(e) => setFormData({ ...formData, textFr: e.target.value })}
              style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              style={{ width: 'auto' }}
            />
            Publicado
          </label>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
          {credential && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                fontWeight: 600,
                fontSize: 14,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
              }}
            >
              Deletar
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              fontWeight: 600,
              fontSize: 14,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
            }}
          >
            {loading ? 'Salvando...' : credential ? 'Atualizar' : 'Criar'}
          </button>
        </div>
      </form>
    </>
  );
}
