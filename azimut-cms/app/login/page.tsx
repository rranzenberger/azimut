"use client";

import { FormEvent, useState, Suspense, type CSSProperties } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [email, setEmail] = useState('admin@azimut.com.br');
  const [password, setPassword] = useState('Azimut2025!');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const next = search?.get('next') || '/admin';

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
        <div style={{ position: 'relative' }}>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            style={{...inputStyle, paddingRight: 40}}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#8f8ba2',
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(201,35,55,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? (
              // Ícone olho fechado
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              // Ícone olho aberto
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        </div>

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
  );
}

export default function LoginPage() {
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
      <Suspense fallback={<div style={{ color: '#d3cec3' }}>Carregando...</div>}>
        <LoginForm />
      </Suspense>
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

