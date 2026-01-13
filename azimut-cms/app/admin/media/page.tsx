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

// Lista de serviços para o dropdown
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
  const [type, setType] = useState<'IMAGE' | 'VIDEO'>('IMAGE');
  const [altPt, setAltPt] = useState('');
  const [altEn, setAltEn] = useState('');
  const [pageSlug, setPageSlug] = useState('');
  const [sectionSlug, setSectionSlug] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);

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
    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Falha no upload');
      } else {
        setResult(data.media);
        setMsg('Mídia enviada com sucesso.');
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
        <p style={{ margin: '0 0 24px', color: '#c0bccf', fontSize: 16 }}>
          Envie imagens ou vídeos. Imagens até {MAX_IMAGE_MB}MB, vídeos até {MAX_VIDEO_MB}MB. Alt text até {MAX_ALT} caracteres.
          Imagens: JPEG/PNG/WebP recomendados. Vídeo: MP4/MOV.
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
            <label style={{ fontSize: 15, fontWeight: 600 }}>Arquivo (máx. 12MB)</label>
            <input
              type="file"
              accept={type === 'IMAGE' ? 'image/*' : 'video/*'}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{ color: '#fff', width: '100%', boxSizing: 'border-box' }}
            />
          </div>

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
                  {SERVICES.map((service) => (
                    <option key={service.slug} value={`what/${service.slug}`}>
                      {service.label}
                    </option>
                  ))}
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
                  <option value="hero">Hero (Banner principal)</option>
                  <option value="gallery">Galeria de imagens</option>
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
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            <h3 style={{ margin: '0 0 8px' }}>Resultado</h3>
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

