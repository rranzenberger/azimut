"use client";

import { FormEvent, useState } from 'react';

type UploadResult = {
  id: string;
  type: string;
  originalUrl: string;
  width?: number | null;
  height?: number | null;
  sizeBytes?: number | null;
  format?: string | null;
};

const MAX_IMAGE_MB = 8;
const MAX_VIDEO_MB = 25;
const MAX_ALT = 160;

// Lista de páginas para o dropdown
const PAGES = [
  // ═══════════════════════════════════════════════════════════════
  // PÁGINAS PRINCIPAIS
  // ═══════════════════════════════════════════════════════════════
  { slug: 'home', label: '🏠 Home' },
  { slug: 'studio', label: '🎬 Studio (Sobre Nós)' },
  { slug: 'studio/diferenciais', label: '⭐ Studio - Diferenciais' },
  { slug: 'studio/timeline', label: '📅 Studio - Timeline' },
  { slug: 'studio/clientes', label: '🤝 Studio - Clientes' },
  { slug: 'studio/equipe', label: '👥 Studio - Equipe' },
  { slug: 'projects', label: '🎯 Projetos' },
  { slug: 'contact', label: '📧 Contato' },
  { slug: 'academy', label: '🎓 Academy' },
  
  // ═══════════════════════════════════════════════════════════════
  // SERVIÇOS (what/)
  // ═══════════════════════════════════════════════════════════════
  { slug: 'what/cinema-audiovisual', label: '🎥 Cinema & Audiovisual' },
  { slug: 'what/pos-producao-vfx', label: '✨ Pós-Produção & VFX' },
  { slug: 'what/animacao-2d-3d', label: '🎨 Animação 2D/3D' },
  { slug: 'what/xr-interatividade-web3', label: '🥽 XR, Interatividade & Web3' },
  { slug: 'what/cenografia-design-espacial', label: '🏛️ Cenografia & Design Espacial' },
  { slug: 'what/games-interativos', label: '🎮 Games Interativos' },
  { slug: 'what/ia-criativa', label: '🤖 IA Criativa' },
  { slug: 'what/direcao-arte-criativa', label: '🎭 Direção de Arte Criativa' },
  { slug: 'what/consultoria-estrategia', label: '💼 Consultoria & Estratégia' },
  { slug: 'what/teatro-espetaculos-imersivos', label: '🎪 Teatro & Espetáculos Imersivos' },
  { slug: 'what/branded-experiences-ativacoes', label: '🎉 Branded Experiences & Ativações' },
  { slug: 'what/museus-exposicoes', label: '🏛️ Museus & Exposições' },
  { slug: 'what/festivais-curadoria-eventos', label: '🎭 Festivais, Curadoria & Eventos' },
  { slug: 'what/educacao-treinamento', label: '📚 Educação & Treinamento' },
  { slug: 'what/realidade-virtual-vr', label: '🕶️ Realidade Virtual (VR)' },
  { slug: 'what/arquitetura-virtual-bim', label: '🏗️ Arquitetura Virtual & BIM' },
]

// Lista de serviços para tags (múltipla escolha)
const SERVICES = [
  { slug: 'cinema-audiovisual', label: 'Cinema & Audiovisual' },
  { slug: 'pos-producao-vfx', label: 'Pós-Produção & VFX' },
  { slug: 'animacao-2d-3d', label: 'Animação 2D/3D' },
  { slug: 'xr-interatividade-web3', label: 'XR, Interatividade & Web3' },
  { slug: 'cenografia-design-espacial', label: 'Cenografia & Design Espacial' },
  { slug: 'games-interativos', label: 'Games Interativos' },
  { slug: 'ia-criativa', label: 'IA Criativa' },
  { slug: 'direcao-arte-criativa', label: 'Direção de Arte Criativa' },
  { slug: 'consultoria-estrategia', label: 'Consultoria & Estratégia' },
  { slug: 'teatro-espetaculos-imersivos', label: 'Teatro & Espetáculos Imersivos' },
  { slug: 'branded-experiences-ativacoes', label: 'Branded Experiences & Ativações' },
  { slug: 'museus-exposicoes', label: 'Museus & Exposições' },
  { slug: 'festivais-curadoria-eventos', label: 'Festivais, Curadoria & Eventos' },
  { slug: 'educacao-treinamento', label: 'Educação & Treinamento' },
  { slug: 'realidade-virtual-vr', label: 'Realidade Virtual (VR)' },
  { slug: 'arquitetura-virtual-bim', label: 'Arquitetura Virtual & BIM' },
]

export default function MediaPage() {
  const [file, setFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null); // NOVO: Thumbnail para vídeos
  const [type, setType] = useState<'IMAGE' | 'VIDEO'>('IMAGE');
  const [altPt, setAltPt] = useState('');
  const [altEn, setAltEn] = useState('');
  const [thumbnailAltPt, setThumbnailAltPt] = useState(''); // NOVO: Alt do thumbnail
  const [pageSlug, setPageSlug] = useState('');
  const [sectionSlug, setSectionSlug] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [thumbnailResult, setThumbnailResult] = useState<UploadResult | null>(null); // NOVO: Resultado do thumbnail

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMsg(null);
    setError(null);
    setResult(null);

    if (!file) {
      setError('Selecione um arquivo.');
      return;
    }
    const maxMb = type === 'IMAGE' ? MAX_IMAGE_MB : MAX_VIDEO_MB;
    if (file.size > maxMb * 1024 * 1024) {
      setError(`Arquivo muito grande. Máximo ${maxMb}MB para ${type === 'IMAGE' ? 'imagem' : 'vídeo'}.`);
      return;
    }
    if (altPt.length > MAX_ALT || altEn.length > MAX_ALT) {
      setError(`Alt text máximo ${MAX_ALT} caracteres.`);
      return;
    }

    const form = new FormData();
    form.append('file', file);
    form.append('type', type);
    form.append('altPt', altPt);
    form.append('altEn', altEn);
    
    // Sistema de Tags (Opção 2)
    if (pageSlug) {
      form.append('pageSlug', pageSlug);
    }
    if (sectionSlug) {
      form.append('sectionSlug', sectionSlug);
    }
    if (selectedServices.length > 0) {
      form.append('servicesTags', selectedServices.join(','));
    }

    setLoading(true);
    setThumbnailResult(null);
    
    try {
      // 1. Upload do arquivo principal (vídeo ou imagem)
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Falha no upload');
        return;
      }
      setResult(data.media);

      // 2. Se for vídeo E tiver thumbnail, fazer upload do thumbnail também
      if (type === 'VIDEO' && thumbnailFile) {
        const thumbForm = new FormData();
        thumbForm.append('file', thumbnailFile);
        thumbForm.append('type', 'IMAGE');
        thumbForm.append('altPt', thumbnailAltPt || `Thumbnail: ${altPt}`);
        thumbForm.append('altEn', `Thumbnail: ${altEn}`);
        if (pageSlug) thumbForm.append('pageSlug', pageSlug);
        thumbForm.append('sectionSlug', sectionSlug ? `${sectionSlug}-thumbnail` : 'video-thumbnail');
        thumbForm.append('imageType', 'video-poster');

        const thumbRes = await fetch('/api/admin/media', {
          method: 'POST',
          body: thumbForm,
        });
        const thumbData = await thumbRes.json();
        if (thumbRes.ok) {
          setThumbnailResult(thumbData.media);
          setMsg('Vídeo e thumbnail enviados com sucesso! 🎬🖼️');
        } else {
          setMsg('Vídeo enviado, mas erro no thumbnail.');
        }
      } else {
        setMsg(type === 'VIDEO' 
          ? 'Vídeo enviado (sem thumbnail).' 
          : 'Mídia enviada com sucesso.'
        );
      }
    } catch (err) {
      setError('Erro de rede no upload.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.5px' }}>
          Mídias
        </h1>
        <p style={{ margin: '0 0 24px', color: '#c0bccf', fontSize: 16, lineHeight: 1.6 }}>
          Envie imagens ou vídeos aqui; depois use em <strong style={{ color: '#e8e6f2' }}>Páginas</strong> (ex.: Home — vídeo e capa do topo) e em <strong style={{ color: '#e8e6f2' }}>Projetos</strong> (imagem de capa e galeria) escolhendo &quot;Selecionar da Biblioteca&quot;. Imagens até {MAX_IMAGE_MB}MB, vídeos até {MAX_VIDEO_MB}MB. Alt text até {MAX_ALT} caracteres. Formatos: JPEG/PNG/WebP (imagem), MP4/MOV (vídeo).
        </p>

        <div
          style={{
            marginBottom: 16,
            padding: 12,
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.02)',
            color: '#c0bccf',
            fontSize: 14,
            lineHeight: 1.55,
          }}
        >
          <strong style={{ color: '#e8e6f2' }}>Guidelines por área do site</strong>
          <ul style={{ margin: '8px 0 0 16px', padding: 0 }}>
            <li>Hero (banner): 1920x1080 ou 2000x1125, até ~700KB (imagem); vídeo loop 10–20s, até ~10–15MB.</li>
            <li>Galeria/Projetos: 1600x900, até ~500KB; thumbs 600x600, até ~200KB.</li>
            <li>Cards pequenos: 800x600, até ~300KB.</li>
            <li>Vídeo full: até 60s, 1080p, ideal &lt; 25MB.</li>
            <li>Alt text: máx {MAX_ALT} caracteres (PT/EN).</li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            padding: '24px',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
            display: 'grid',
            gap: 16,
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'grid', gap: 10, width: '100%', boxSizing: 'border-box' }}>
            <label style={{ fontSize: 15, fontWeight: 600 }}>Tipo</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'IMAGE' | 'VIDEO')}
              style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
            >
              <option value="IMAGE">Imagem (otimiza e gera webp/avif)</option>
              <option value="VIDEO">Vídeo (mantém original)</option>
            </select>
          </div>

          <div style={{ display: 'grid', gap: 10, width: '100%', boxSizing: 'border-box' }}>
            <label style={{ fontSize: 15, fontWeight: 600 }}>
              {type === 'VIDEO' ? '🎬 Arquivo de Vídeo' : '🖼️ Arquivo de Imagem'} (máx. {type === 'VIDEO' ? MAX_VIDEO_MB : MAX_IMAGE_MB}MB)
            </label>
            <input
              type="file"
              accept={type === 'IMAGE' ? 'image/*' : 'video/*'}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{ color: '#fff', width: '100%', boxSizing: 'border-box' }}
            />
          </div>

          {/* ═══════════════════════════════════════════
              THUMBNAIL DO VÍDEO (aparece só quando tipo = VIDEO)
              ═══════════════════════════════════════════ */}
          {type === 'VIDEO' && (
            <div style={{ 
              display: 'grid', 
              gap: 16, 
              width: '100%', 
              boxSizing: 'border-box',
              padding: 16,
              borderRadius: 12,
              border: '1px solid rgba(147, 51, 234, 0.3)',
              background: 'rgba(147, 51, 234, 0.08)'
            }}>
              <div>
                <label style={{ fontSize: 15, fontWeight: 600, color: '#a78bfa' }}>
                  🖼️ Thumbnail do Vídeo (Capa) - Recomendado!
                </label>
                <p style={{ margin: '6px 0 12px', color: '#8f8ba2', fontSize: 12 }}>
                  Imagem que aparece antes de dar play. Recomendado: 1920x1080 (16:9), máx 2MB.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                  style={{ color: '#fff', width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              {thumbnailFile && (
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#c0bccf' }}>
                    Alt do Thumbnail (PT)
                  </label>
                  <input
                    type="text"
                    value={thumbnailAltPt}
                    onChange={(e) => setThumbnailAltPt(e.target.value)}
                    maxLength={MAX_ALT}
                    style={{ ...inputStyle, width: '100%', boxSizing: 'border-box', marginTop: 6 }}
                    placeholder="Ex: Chris Milk no palco do TED Talk"
                  />
                </div>
              )}

              {thumbnailFile && (
                <div style={{ 
                  padding: 12, 
                  borderRadius: 8, 
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}>
                  <p style={{ margin: '0 0 12px', fontSize: 12, color: '#86efac' }}>
                    ✓ Thumbnail selecionado: {thumbnailFile.name} ({(thumbnailFile.size / 1024 / 1024).toFixed(2)}MB)
                  </p>
                  {/* PREVIEW DO THUMBNAIL */}
                  <div style={{ 
                    aspectRatio: '16/9', 
                    maxWidth: 300, 
                    borderRadius: 8, 
                    overflow: 'hidden',
                    border: '2px solid rgba(147, 51, 234, 0.5)'
                  }}>
                    <img 
                      src={URL.createObjectURL(thumbnailFile)} 
                      alt="Preview thumbnail"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              )}

              {!thumbnailFile && (
                <div style={{ 
                  padding: 12, 
                  borderRadius: 8, 
                  background: 'rgba(251, 191, 36, 0.1)',
                  border: '1px solid rgba(251, 191, 36, 0.3)'
                }}>
                  <p style={{ margin: 0, fontSize: 12, color: '#fbbf24' }}>
                    ⚠️ Sem thumbnail, o vídeo mostrará o primeiro frame ou uma tela preta.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════
              PREVIEW DO VÍDEO (aparece quando arquivo selecionado)
              ═══════════════════════════════════════════ */}
          {file && type === 'VIDEO' && (
            <div style={{ 
              padding: 16, 
              borderRadius: 12, 
              border: '1px solid rgba(46, 204, 113, 0.3)',
              background: 'rgba(46, 204, 113, 0.08)'
            }}>
              <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: '#86efac' }}>
                📺 Preview do Vídeo
              </h4>
              <p style={{ margin: '0 0 12px', fontSize: 12, color: '#c0bccf' }}>
                Arquivo: {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
              </p>
              <div style={{ 
                aspectRatio: '16/9', 
                maxWidth: 400, 
                borderRadius: 8, 
                overflow: 'hidden',
                background: '#000',
                border: '2px solid rgba(46, 204, 113, 0.5)'
              }}>
                <video 
                  controls 
                  style={{ width: '100%', height: '100%' }}
                  poster={thumbnailFile ? URL.createObjectURL(thumbnailFile) : undefined}
                >
                  <source src={URL.createObjectURL(file)} type={file.type || 'video/mp4'} />
                </video>
              </div>
            </div>
          )}

          {/* PREVIEW DA IMAGEM (quando tipo = IMAGE) */}
          {file && type === 'IMAGE' && (
            <div style={{ 
              padding: 16, 
              borderRadius: 12, 
              border: '1px solid rgba(56, 189, 248, 0.3)',
              background: 'rgba(56, 189, 248, 0.08)'
            }}>
              <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: '#7dd3fc' }}>
                🖼️ Preview da Imagem
              </h4>
              <p style={{ margin: '0 0 12px', fontSize: 12, color: '#c0bccf' }}>
                Arquivo: {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
              </p>
              <div style={{ 
                maxWidth: 400, 
                borderRadius: 8, 
                overflow: 'hidden',
                border: '2px solid rgba(56, 189, 248, 0.5)'
              }}>
                <img 
                  src={URL.createObjectURL(file)} 
                  alt="Preview"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gap: 10, width: '100%', boxSizing: 'border-box' }}>
            <label style={{ fontSize: 15, fontWeight: 600 }}>
              Alt (PT) <span style={{ color: '#8f8ba2', fontWeight: 400 }}>(máx {MAX_ALT})</span>
            </label>
            <input
              value={altPt}
              onChange={(e) => setAltPt(e.target.value)}
              maxLength={MAX_ALT}
              style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
              placeholder="Descrição curta da imagem/vídeo em PT"
            />
          </div>

          <div style={{ display: 'grid', gap: 10, width: '100%', boxSizing: 'border-box' }}>
            <label style={{ fontSize: 15, fontWeight: 600 }}>
              Alt (EN) <span style={{ color: '#8f8ba2', fontWeight: 400 }}>(máx {MAX_ALT})</span>
            </label>
            <input
              value={altEn}
              onChange={(e) => setAltEn(e.target.value)}
              maxLength={MAX_ALT}
              style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
              placeholder="Short alt text in EN"
            />
          </div>

          {/* ═══════════════════════════════════════════
              SISTEMA DE TAGS (Opção 2)
              ═══════════════════════════════════════════ */}
          <div style={{ 
            marginTop: 8, 
            padding: '16px', 
            borderRadius: 12, 
            border: '1px solid rgba(201,35,55,0.3)', 
            background: 'rgba(201,35,55,0.05)' 
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#e8e6f2' }}>
              📍 Onde esta imagem será usada?
            </h3>
            
            <div style={{ display: 'grid', gap: 16 }}>
              {/* Para qual página? */}
              <div style={{ display: 'grid', gap: 10 }}>
                <label style={{ fontSize: 14, fontWeight: 600, color: '#c0bccf' }}>
                  Para qual página? <span style={{ color: '#8f8ba2', fontWeight: 400 }}>(opcional)</span>
                </label>
                <select
                  value={pageSlug}
                  onChange={(e) => setPageSlug(e.target.value)}
                  style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
                >
                  <option value="">Selecione uma página...</option>
                  <optgroup label="📍 Páginas Principais">
                    {PAGES.filter(p => !p.slug.startsWith('what/')).map((page) => (
                      <option key={page.slug} value={page.slug}>
                        {page.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🎯 Serviços">
                    {PAGES.filter(p => p.slug.startsWith('what/')).map((page) => (
                      <option key={page.slug} value={page.slug}>
                        {page.label}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Onde na página? */}
              <div style={{ display: 'grid', gap: 10 }}>
                <label style={{ fontSize: 14, fontWeight: 600, color: '#c0bccf' }}>
                  Onde na página? <span style={{ color: '#8f8ba2', fontWeight: 400 }}>(opcional)</span>
                </label>
                <select
                  value={sectionSlug}
                  onChange={(e) => setSectionSlug(e.target.value)}
                  style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
                >
                  <option value="">Selecione...</option>
                  <option value="hero">🎬 Hero (Banner principal)</option>
                  <option value="gallery">🖼️ Galeria de imagens</option>
                  <option value="philosophy">💡 Filosofia (Missão/Visão/Valores)</option>
                  <option value="team">👥 Equipe</option>
                  <option value="timeline">📅 Timeline</option>
                  <option value="testimonials">💬 Depoimentos</option>
                  <option value="clients">🤝 Clientes</option>
                  <option value="projects">🎯 Projetos em destaque</option>
                  <option value="cta">📢 Call to Action</option>
                  <option value="about">ℹ️ Sobre</option>
                </select>
              </div>

              {/* Qual(is) serviço(s)? */}
              <div style={{ display: 'grid', gap: 10 }}>
                <label style={{ fontSize: 14, fontWeight: 600, color: '#c0bccf' }}>
                  Qual(is) serviço(s)? <span style={{ color: '#8f8ba2', fontWeight: 400 }}>(opcional, múltipla escolha)</span>
                </label>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                  gap: 8,
                  maxHeight: '200px',
                  overflowY: 'auto',
                  padding: '8px',
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}>
                  {SERVICES.map((service) => (
                    <label
                      key={service.slug}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: 13,
                        cursor: 'pointer',
                        padding: '6px 8px',
                        borderRadius: 6,
                        background: selectedServices.includes(service.slug) 
                          ? 'rgba(201,35,55,0.2)' 
                          : 'transparent',
                        border: selectedServices.includes(service.slug)
                          ? '1px solid rgba(201,35,55,0.5)'
                          : '1px solid transparent',
                        transition: 'all 0.2s'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service.slug)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedServices([...selectedServices, service.slug])
                          } else {
                            setSelectedServices(selectedServices.filter(s => s !== service.slug))
                          }
                        }}
                        style={{ cursor: 'pointer' }}
                      />
                      <span style={{ color: '#c0bccf' }}>{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div
              style={{
                padding: '10px 12px',
                borderRadius: 10,
                background: 'rgba(201,35,55,0.12)',
                border: '1px solid rgba(201,35,55,0.35)',
                color: '#fca5a5',
              }}
            >
              {error}
            </div>
          )}
          {msg && (
            <div
              style={{
                padding: '10px 12px',
                borderRadius: 10,
                background: 'rgba(46,204,113,0.12)',
                border: '1px solid rgba(46,204,113,0.4)',
                color: '#b9f6ca',
              }}
            >
              {msg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              height: 48,
              borderRadius: 12,
              border: 'none',
              background: '#c92337',
              color: '#fff',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              opacity: loading ? 0.8 : 1,
              width: '100%',
              boxSizing: 'border-box',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = '#b01e2f';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background = '#c92337';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {loading ? 'Enviando...' : 'Enviar mídia'}
          </button>
        </form>

        {result && (
          <div
            style={{
              marginTop: 16,
              padding: 14,
              borderRadius: 10,
              border: '1px solid rgba(46, 204, 113, 0.3)',
              background: 'rgba(46, 204, 113, 0.08)',
            }}
          >
            <h3 style={{ margin: '0 0 8px', color: '#86efac' }}>
              {result.type === 'VIDEO' ? '🎬 Vídeo Enviado' : '🖼️ Imagem Enviada'}
            </h3>
            <div style={{ fontSize: 14, lineHeight: 1.5, color: '#c0bccf' }}>
              <div>ID: {result.id}</div>
              <div>Tipo: {result.type}</div>
              <div>URL: <a href={result.originalUrl} style={{ color: '#7dd3fc' }}>{result.originalUrl}</a></div>
              {result.width && result.height ? (
                <div>Dimensões: {result.width} x {result.height}</div>
              ) : null}
              {result.sizeBytes ? (
                <div>Tamanho: {(result.sizeBytes / (1024 * 1024)).toFixed(2)} MB</div>
              ) : null}
              {result.format ? <div>Formato: {result.format}</div> : null}
            </div>
          </div>
        )}

        {/* Resultado do Thumbnail (quando vídeo) */}
        {thumbnailResult && (
          <div
            style={{
              marginTop: 12,
              padding: 14,
              borderRadius: 10,
              border: '1px solid rgba(147, 51, 234, 0.3)',
              background: 'rgba(147, 51, 234, 0.08)',
            }}
          >
            <h3 style={{ margin: '0 0 8px', color: '#a78bfa' }}>🖼️ Thumbnail Enviado</h3>
            <div style={{ fontSize: 14, lineHeight: 1.5, color: '#c0bccf' }}>
              <div>ID: {thumbnailResult.id}</div>
              <div>URL: <a href={thumbnailResult.originalUrl} style={{ color: '#a78bfa' }}>{thumbnailResult.originalUrl}</a></div>
              {thumbnailResult.width && thumbnailResult.height ? (
                <div>Dimensões: {thumbnailResult.width} x {thumbnailResult.height}</div>
              ) : null}
            </div>
            <div style={{ marginTop: 12, borderRadius: 8, overflow: 'hidden', maxWidth: 300 }}>
              <img 
                src={thumbnailResult.originalUrl} 
                alt="Thumbnail preview"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: 44,
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.04)',
  color: '#fff',
  padding: '0 16px',
  outline: 'none',
  fontSize: 15,
  boxSizing: 'border-box',
};

