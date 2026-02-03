import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { verifyAuthToken } from '@/src/lib/auth';
import { MENU_MANUAL_ITEMS } from '../config/menuManual';

export default async function HelpPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  return (
    <div style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}>
      <header style={{ marginBottom: 32 }}>
        <h1
          style={{
            margin: 0,
            fontSize: 32,
            fontWeight: 700,
            color: '#e8e6f2',
            letterSpacing: '-0.5px',
          }}
        >
          📖 Manual do backoffice
        </h1>
        <p style={{ margin: '8px 0 0', fontSize: 16, color: '#9f9bb0', lineHeight: 1.5 }}>
          Descrição de cada área do painel: o que é, que dados contém e como usar. Passe o mouse nos itens do menu lateral para ver um resumo rápido.
        </p>
      </header>

      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {MENU_MANUAL_ITEMS.map((item) => (
          <article
            key={item.href}
            style={{
              padding: 24,
              borderRadius: 16,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Link
              href={item.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 12,
                fontSize: 18,
                fontWeight: 600,
                color: '#f0a5a5',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              {item.label}
              <span style={{ fontSize: 14, color: '#6b6680', fontWeight: 400 }}>
                →
              </span>
            </Link>
            <p
              style={{
                margin: 0,
                fontSize: 15,
                color: '#c0bccf',
                lineHeight: 1.6,
              }}
            >
              {item.description}
            </p>
          </article>
        ))}
      </section>

      <footer style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <p style={{ margin: 0, fontSize: 14, color: '#6b6680' }}>
          Dica: no menu à esquerda, passe o mouse sobre qualquer item para ver uma descrição curta antes de abrir a página.
        </p>
      </footer>
    </div>
  );
}
