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

export default function MediaPage() {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<'IMAGE' | 'VIDEO'>('IMAGE');
  const [altPt, setAltPt] = useState('');
  const [altEn, setAltEn] = useState('');
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
    <main
      style={{
        minHeight: '100vh',
        background: '#0a0e18',
        color: '#d3cec3',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        padding: '24px',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ margin: 0, fontSize: 24 }}>Mídias</h1>
        <p style={{ margin: '6px 0 16px', color: '#c0bccf' }}>
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
            padding: 16,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
            display: 'grid',
            gap: 12,
          }}
        >
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14 }}>Tipo</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'IMAGE' | 'VIDEO')}
              style={inputStyle}
            >
              <option value="IMAGE">Imagem (otimiza e gera webp/avif)</option>
              <option value="VIDEO">Vídeo (mantém original)</option>
            </select>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14 }}>Arquivo (máx. 12MB)</label>
            <input
              type="file"
              accept={type === 'IMAGE' ? 'image/*' : 'video/*'}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{ color: '#fff' }}
            />
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14 }}>
              Alt (PT) <span style={{ color: '#8f8ba2' }}>(máx {MAX_ALT})</span>
            </label>
            <input
              value={altPt}
              onChange={(e) => setAltPt(e.target.value)}
              maxLength={MAX_ALT}
              style={inputStyle}
              placeholder="Descrição curta da imagem/vídeo em PT"
            />
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14 }}>
              Alt (EN) <span style={{ color: '#8f8ba2' }}>(máx {MAX_ALT})</span>
            </label>
            <input
              value={altEn}
              onChange={(e) => setAltEn(e.target.value)}
              maxLength={MAX_ALT}
              style={inputStyle}
              placeholder="Short alt text in EN"
            />
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
              height: 44,
              borderRadius: 10,
              border: 'none',
              background: '#c92337',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
              opacity: loading ? 0.8 : 1,
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
    </main>
  );
}

const inputStyle: React.CSSProperties = {
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

