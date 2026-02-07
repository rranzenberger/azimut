import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { verifyAuthToken } from '@/src/lib/auth';
import { MENU_MANUAL_ITEMS } from '../config/menuManual';

export default async function HelpPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  return (
    <div style={{ width: '100%', maxWidth: 1000, margin: '0 auto' }}>
      {/* Header */}
      <header style={{ marginBottom: 40 }}>
        <h1
          style={{
            margin: 0,
            fontSize: 36,
            fontWeight: 700,
            color: '#e8e6f2',
            letterSpacing: '-0.5px',
          }}
        >
          📖 Manual do Backoffice
        </h1>
        <p style={{ margin: '12px 0 0', fontSize: 17, color: '#9f9bb0', lineHeight: 1.6 }}>
          Guia completo para usar o painel administrativo. Cada seção explica o que é, como usar e dicas importantes.
        </p>
      </header>

      {/* Quick Start */}
      <section
        style={{
          marginBottom: 40,
          padding: 24,
          borderRadius: 16,
          background: 'linear-gradient(135deg, rgba(240,165,165,0.1) 0%, rgba(240,165,165,0.05) 100%)',
          border: '1px solid rgba(240,165,165,0.2)',
        }}
      >
        <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 600, color: '#f0a5a5' }}>
          🚀 Início Rápido
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          <div style={{ padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 12 }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 600, color: '#e8e6f2' }}>
              Tarefas do dia a dia
            </h3>
            <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: 14, color: '#c0bccf', lineHeight: 1.8 }}>
              <li><strong>Verificar leads:</strong> Leads → ver novos → atualizar status</li>
              <li><strong>Publicar projeto:</strong> Projetos → Novo → preencher → Publicar</li>
              <li><strong>Criar post:</strong> Blog → Novo Post → escrever → Publicar</li>
              <li><strong>Editar página:</strong> Páginas → selecionar → editar → Salvar</li>
            </ul>
          </div>
          <div style={{ padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 12 }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 600, color: '#e8e6f2' }}>
              Dicas importantes
            </h3>
            <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: 14, color: '#c0bccf', lineHeight: 1.8 }}>
              <li>Sempre preencha o campo <strong>PT</strong> (obrigatório)</li>
              <li>Use <strong>slugs</strong> sem acentos (ex: "museu-olimpico")</li>
              <li>Otimize imagens antes do upload (max 500KB)</li>
              <li>Marque como <strong>"Publicado"</strong> para aparecer no site</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Onde fazer upload - UX para leigos */}
      <section
        style={{
          marginBottom: 40,
          padding: 24,
          borderRadius: 16,
          background: 'rgba(56, 189, 248, 0.06)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
        }}
      >
        <h2 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 600, color: '#7dd3fc' }}>
          📸 Onde fazer upload (imagens e vídeos)
        </h2>
        <p style={{ margin: '0 0 16px', fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>
          Use o <strong>Guia rápido</strong> no topo da edição de Páginas (ex.: Home) para ir direto à área desejada, sem rolar a página inteira.
        </p>
        <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: 14, color: '#c0bccf', lineHeight: 1.9 }}>
          <li><strong>Vídeo e capa do topo da Home:</strong> Páginas → Editar Home → botão &quot;Vídeo e capa do topo&quot; (ou role até &quot;Mídia da Página&quot;).</li>
          <li><strong>Imagens dos cards (Projetos em Destaque):</strong> Projetos → editar cada projeto → &quot;Imagem de capa&quot;. Não é na página Home.</li>
          <li><strong>Enviar arquivos primeiro:</strong> menu <strong>Mídias</strong> → upload. Depois selecione &quot;Da Biblioteca&quot; na página ou no projeto.</li>
        </ul>
      </section>

      {/* Mapa Site → Backoffice */}
      <section
        style={{
          marginBottom: 40,
          padding: 24,
          borderRadius: 16,
          background: 'rgba(34, 197, 94, 0.06)',
          border: '1px solid rgba(34, 197, 94, 0.25)',
        }}
      >
        <h2 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 600, color: '#86efac' }}>
          🗺️ Mapa: Onde cada parte do site é editada
        </h2>
        <p style={{ margin: '0 0 16px', fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>
          Relação direta entre o que o visitante vê no site e onde você edita no backoffice.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, color: '#c0bccf' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                <th style={{ textAlign: 'left', padding: '10px 12px', color: '#e8e6f2', fontWeight: 600 }}>No site (página / conteúdo)</th>
                <th style={{ textAlign: 'left', padding: '10px 12px', color: '#e8e6f2', fontWeight: 600 }}>Onde editar no backoffice</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <td style={{ padding: '10px 12px' }}>Home — slogan, subtítulo, vídeo e capa do topo</td>
                <td style={{ padding: '10px 12px' }}><Link href="/admin/pages/edit/home" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Páginas → Editar Home</Link></td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <td style={{ padding: '10px 12px' }}>Home — cards &quot;Projetos em Destaque&quot; (imagens)</td>
                <td style={{ padding: '10px 12px' }}><Link href="/admin/projects" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Projetos</Link> → editar cada projeto → Imagem de capa</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <td style={{ padding: '10px 12px' }}>Projetos (listagem e detalhe) — título, texto, galeria, imagem de capa</td>
                <td style={{ padding: '10px 12px' }}><Link href="/admin/projects" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Projetos</Link> → editar o projeto</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <td style={{ padding: '10px 12px' }}>Serviços (What) — cards e páginas de cada serviço</td>
                <td style={{ padding: '10px 12px' }}><Link href="/admin/services" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Serviços</Link></td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <td style={{ padding: '10px 12px' }}>Studio, Academy, Contato, outras páginas — textos e hero</td>
                <td style={{ padding: '10px 12px' }}><Link href="/admin/site-pages" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Páginas</Link> → escolher a página</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <td style={{ padding: '10px 12px' }}>Blog — posts e listagem</td>
                <td style={{ padding: '10px 12px' }}><Link href="/admin/blog" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Blog</Link></td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <td style={{ padding: '10px 12px' }}>Enviar imagens e vídeos (para usar em qualquer lugar)</td>
                <td style={{ padding: '10px 12px' }}><Link href="/admin/media" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Mídias</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Table of Contents */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 600, color: '#9f9bb0' }}>
          📑 Índice
        </h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            padding: 16,
            background: 'rgba(255,255,255,0.02)',
            borderRadius: 12,
          }}
        >
          {MENU_MANUAL_ITEMS.map((item) => (
            <a
              key={item.href}
              href={`#${item.href.replace(/\//g, '-').replace(/^-/, '')}`}
              style={{
                padding: '6px 12px',
                fontSize: 13,
                color: '#c0bccf',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 6,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </section>

      {/* Detailed Sections */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {MENU_MANUAL_ITEMS.map((item) => (
          <article
            key={item.href}
            id={item.href.replace(/\//g, '-').replace(/^-/, '')}
            style={{
              padding: 28,
              borderRadius: 16,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Title */}
            <Link
              href={item.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 12,
                fontSize: 20,
                fontWeight: 600,
                color: '#f0a5a5',
                textDecoration: 'none',
              }}
            >
              {item.label}
              <span style={{ fontSize: 14, color: '#6b6680', fontWeight: 400 }}>→</span>
            </Link>

            {/* Description */}
            <p
              style={{
                margin: '0 0 20px',
                fontSize: 15,
                color: '#c0bccf',
                lineHeight: 1.7,
              }}
            >
              {item.description}
            </p>

            {/* How To */}
            {item.howTo && item.howTo.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 600, color: '#9f9bb0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  📋 Como usar
                </h4>
                <ol
                  style={{
                    margin: 0,
                    padding: '0 0 0 24px',
                    fontSize: 14,
                    color: '#b8b4c7',
                    lineHeight: 1.9,
                  }}
                >
                  {item.howTo.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Fields */}
            {item.fields && item.fields.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 600, color: '#9f9bb0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  📝 Campos principais
                </h4>
                <ul
                  style={{
                    margin: 0,
                    padding: '0 0 0 24px',
                    fontSize: 14,
                    color: '#b8b4c7',
                    lineHeight: 1.9,
                  }}
                >
                  {item.fields.map((field, i) => (
                    <li key={i}>{field}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tips and Common Errors side by side */}
            {((item.tips && item.tips.length > 0) || (item.commonErrors && item.commonErrors.length > 0)) && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
                {/* Tips */}
                {item.tips && item.tips.length > 0 && (
                  <div
                    style={{
                      padding: 16,
                      background: 'rgba(74, 222, 128, 0.08)',
                      borderRadius: 12,
                      border: '1px solid rgba(74, 222, 128, 0.15)',
                    }}
                  >
                    <h4 style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 600, color: '#4ade80' }}>
                      💡 Dicas
                    </h4>
                    <ul
                      style={{
                        margin: 0,
                        padding: '0 0 0 20px',
                        fontSize: 13,
                        color: '#a7f3d0',
                        lineHeight: 1.8,
                      }}
                    >
                      {item.tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Common Errors */}
                {item.commonErrors && item.commonErrors.length > 0 && (
                  <div
                    style={{
                      padding: 16,
                      background: 'rgba(251, 146, 60, 0.08)',
                      borderRadius: 12,
                      border: '1px solid rgba(251, 146, 60, 0.15)',
                    }}
                  >
                    <h4 style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 600, color: '#fb923c' }}>
                      ⚠️ Erros comuns
                    </h4>
                    <ul
                      style={{
                        margin: 0,
                        padding: '0 0 0 20px',
                        fontSize: 13,
                        color: '#fed7aa',
                        lineHeight: 1.8,
                      }}
                    >
                      {item.commonErrors.map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </article>
        ))}
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: 48,
          padding: 24,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: '0 0 12px', fontSize: 15, color: '#9f9bb0' }}>
          Dúvidas? Passe o mouse sobre qualquer item do menu lateral para ver uma descrição curta.
        </p>
        <p style={{ margin: 0, fontSize: 13, color: '#6b6680' }}>
          Em caso de problemas técnicos, consulte o supervisor ou a documentação em <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4 }}>docs/</code>
        </p>
      </footer>
    </div>
  );
}
