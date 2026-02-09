'use client';

import Link from 'next/link';
import { AZIMUT } from '../../theme';

/**
 * Hub Vancouver (VFS / VanArts) — edição visual e mídias
 * Igual ao padrão Academy: cards como no site, Trocar imagem, EDITAR.
 * Hero e textos da página = editar em Páginas. Vídeos e galeria = aqui (ou placeholders até implementar).
 */
export default function AcademyVancouverPage() {
  const editPageSlug = 'academy/vancouver';
  const editPath = `/admin/pages/edit/${editPageSlug}`;

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <header style={{ marginBottom: 32 }}>
        <Link
          href="/admin/academy"
          style={{ color: AZIMUT.textMuted, fontSize: 14, textDecoration: 'underline', display: 'inline-block', marginBottom: 8 }}
        >
          ← Academy
        </Link>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 8 }}>
          CA Vancouver — VFS & VanArts
        </h1>
        <p style={{ margin: 0, color: AZIMUT.textSecondary, fontSize: 16 }}>
          Página do site: hero, textos, vídeo e blocos (Live in Vancouver, depoimentos). Mídias centralizadas aqui.
        </p>
      </header>

      <div
        style={{
          padding: '16px 20px',
          marginBottom: 24,
          borderRadius: 12,
          background: 'rgba(34,197,94,0.08)',
          border: '1px solid rgba(34,197,94,0.3)',
          fontSize: 14,
          color: '#86efac',
        }}
      >
        <strong>Como Cursos e Past Events:</strong> esta área pode ter vídeos e galeria expandíveis (VFS, VanArts, Student Work). Por agora: edite a página para hero/textos/vídeo; use Mídias para uploads.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, marginBottom: 32 }}>
        <div
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <div style={{ position: 'relative', paddingTop: '56%', background: 'linear-gradient(135deg, rgba(201,35,55,0.15), rgba(10,14,26,0.9))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 48, opacity: 0.6 }}>📄</span>
          </div>
          <div style={{ padding: '16px 20px' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 700, color: AZIMUT.text }}>Página Vancouver</h3>
            <p style={{ margin: 0, fontSize: 12, color: AZIMUT.textMuted }}>Hero, título, SEO, vídeo de capa</p>
            <Link
              href={editPath}
              style={{
                display: 'inline-block',
                marginTop: 12,
                padding: '10px 18px',
                borderRadius: 8,
                background: AZIMUT.red,
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              ✏️ EDITAR PÁGINA
            </Link>
          </div>
        </div>

        <div
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <div style={{ position: 'relative', paddingTop: '56%', background: 'rgba(15,23,42,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 48, opacity: 0.6 }}>🎬</span>
          </div>
          <div style={{ padding: '16px 20px' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 700, color: AZIMUT.text }}>Vídeos VFS / VanArts</h3>
            <p style={{ margin: 0, fontSize: 12, color: AZIMUT.textMuted }}>Institucional, showreels, campus (em breve)</p>
            <Link
              href="/admin/media"
              style={{
                display: 'inline-block',
                marginTop: 12,
                padding: '10px 18px',
                borderRadius: 8,
                background: 'rgba(34,197,94,0.2)',
                border: '1px solid rgba(34,197,94,0.5)',
                color: '#86efac',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Ver Mídias →
            </Link>
          </div>
        </div>

        <div
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <div style={{ position: 'relative', paddingTop: '56%', background: 'rgba(15,23,42,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 48, opacity: 0.6 }}>🖼️</span>
          </div>
          <div style={{ padding: '16px 20px' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 700, color: AZIMUT.text }}>Galeria / Student Work</h3>
            <p style={{ margin: 0, fontSize: 12, color: AZIMUT.textMuted }}>Imagens Vancouver (em breve, como Past Events)</p>
            <Link
              href="/admin/media"
              style={{
                display: 'inline-block',
                marginTop: 12,
                padding: '10px 18px',
                borderRadius: 8,
                background: 'rgba(34,197,94,0.2)',
                border: '1px solid rgba(34,197,94,0.5)',
                color: '#86efac',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Ver Mídias →
            </Link>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 24px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600, color: AZIMUT.text }}>Onde editar no site</h3>
        <p style={{ margin: '0 0 12px', fontSize: 13, color: AZIMUT.textMuted }}>
          A página <strong>/academy/vancouver</strong> no site usa: hero e vídeo da página (edite em EDITAR PÁGINA), vídeos e imagens que podem vir de categorias ou de uma galeria Vancouver (VFS/VanArts). Para já: suba vídeos e imagens em <Link href="/admin/media" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Mídias</Link> e associe na edição da página quando houver campos específicos.
        </p>
        <ul style={{ margin: 0, paddingLeft: 20, color: AZIMUT.textSecondary, fontSize: 14, lineHeight: 1.8 }}>
          <li><Link href={editPath} style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Editar página Vancouver</Link> — hero, textos, vídeo de capa</li>
          <li><Link href="/admin/media" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Mídias</Link> — upload de vídeos e imagens (VFS, VanArts, Student Work)</li>
          <li><Link href="/admin/academy" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Academy</Link> — voltar ao hub</li>
        </ul>
      </div>
    </div>
  );
}
