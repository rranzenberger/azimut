import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import Link from 'next/link';
import { AZIMUT } from '../../../theme';

export const revalidate = 0;

/**
 * Galeria Past Events — imagens da seção "Past Events" no site (Workshops).
 * Placeholder: explicação e link para mídias; depois pode usar modelo/API específica.
 */
export default async function AcademyEventsGalleryPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <header style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <Link href="/admin/academy" style={{ color: AZIMUT.textMuted, fontSize: 14, textDecoration: 'underline' }}>
            ← Academy
          </Link>
        </div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px' }}>
          Past Events — galeria
        </h1>
        <p style={{ margin: '8px 0 0', color: AZIMUT.textSecondary, fontSize: 15 }}>
          Imagens exibidas na seção &quot;Past Events&quot; da página Workshops no site.
        </p>
      </header>

      <div style={{
        padding: 32,
        borderRadius: 16,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
          <span style={{ fontSize: 32 }}>🖼️</span>
          <div>
            <h2 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: AZIMUT.text }}>
              Como no site
            </h2>
            <p style={{ margin: 0, fontSize: 14, color: AZIMUT.textSecondary, lineHeight: 1.6 }}>
              A seção &quot;Past Events&quot; mostra uma grade de imagens (eventos e talks). Aqui você poderá trocar, reordenar e adicionar imagens que aparecem nessa grade — no mesmo padrão visual da galeria de projetos.
            </p>
          </div>
        </div>

        <div style={{
          padding: '16px 20px',
          borderRadius: 10,
          background: 'rgba(201,35,55,0.08)',
          border: '1px solid rgba(201,35,55,0.25)',
          fontSize: 13,
          color: AZIMUT.accentText,
        }}>
          <strong>Próximo passo:</strong> Enquanto a galeria dedicada não estiver ligada ao modelo de dados, use <Link href="/admin/media" style={{ color: '#fca5a5', textDecoration: 'underline' }}>Mídias</Link> para enviar as imagens. As páginas Academy/Workshops usam conteúdo da tabela <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: 4 }}>Page</code> e seções; a ligação &quot;Past Events ↔ galeria&quot; será feita em breve.
        </div>

        <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link
            href="/admin/media"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 20px',
              borderRadius: 10,
              background: AZIMUT.red,
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            📤 Ir para Mídias
          </Link>
          <Link
            href="/admin/pages/edit/academy/workshops"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 20px',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: AZIMUT.text,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            ✏️ Editar página Workshops
          </Link>
          <Link
            href="/admin/academy"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 20px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.15)',
              color: AZIMUT.textSecondary,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            ← Voltar ao hub Academy
          </Link>
        </div>
      </div>
    </div>
  );
}
