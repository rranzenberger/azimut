"use client";

import { FormEvent, useState, type CSSProperties } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const [email, setEmail] = useState('admin@azimut.com.br');
  const [password, setPassword] = useState('Azimut2025!');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const next = search.get('next') || '/admin';

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Falha ao autenticar');
        setLoading(false);
        return;
      }

      router.push(next);
      router.refresh();
    } catch (err) {
      setError('Erro de rede ao autenticar');
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0e18',
        color: '#d3cec3',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        padding: '24px',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: 420,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12,
          padding: '28px 24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
        }}
      >
        <h1 style={{ margin: 0, marginBottom: 16, fontSize: 22 }}>Login CMS</h1>
        <p style={{ margin: 0, marginBottom: 20, color: '#c0bccf' }}>
          Acesse com as credenciais seed ou seu usuário admin.
        </p>

        <label style={{ display: 'block', marginBottom: 8, fontSize: 14 }}>
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          required
          style={inputStyle}
        />

        <label
          style={{
            display: 'block',
            marginTop: 14,
            marginBottom: 8,
            fontSize: 14,
          }}
        >
          Senha
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
          required
          style={inputStyle}
        />

        {error && (
          <div
            style={{
              marginTop: 12,
              padding: '10px 12px',
              borderRadius: 8,
              background: 'rgba(201,35,55,0.1)',
              color: '#fca5a5',
              border: '1px solid rgba(201,35,55,0.35)',
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 18,
            width: '100%',
            height: 44,
            borderRadius: 10,
            border: 'none',
            background: '#c92337',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
            opacity: loading ? 0.75 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <p style={{ marginTop: 12, fontSize: 12, color: '#8f8ba2' }}>
          Default: admin@azimut.com.br / Azimut2025!
        </p>
      </form>
    </main>
  );
}

const inputStyle: CSSProperties = {
  width: '100%',
  height: 42,
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.04)',
  color: '#fff',
  padding: '0 12px',
  outline: 'none',
  fontSize: 14,
};

