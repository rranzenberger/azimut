'use client';

/**
 * Bloco reutilizável "Como aparece no site" para o backoffice.
 * Mostra preview do card principal (imagem/vídeo) + opcional faixa de galeria.
 * Usado em: Projetos, Páginas (home, academy), Blog, etc.
 */

export interface MediaPreviewBlockProps {
  title?: string;
  mainLabel?: string;
  mainImageUrl?: string | null;
  mainVideoUrl?: string | null;
  mainTitle?: string;
  imageFit?: 'contain' | 'cover';
  imagePosition?: string;
  galleryLabel?: string;
  galleryItems?: Array<{ id?: string; thumbUrl?: string | null; isVideo?: boolean }>;
  galleryEmptyMessage?: string;
  /** Se true, mostra apenas o card principal (uma coluna). */
  mainOnly?: boolean;
}

const defaultTitle = 'Como aparece no site';
const defaultMainLabel = 'Card principal';
const defaultGalleryLabel = 'Galeria';
const defaultEmptyMessage = 'Nenhuma mídia ainda. Adicione na seção de mídia abaixo.';

export default function MediaPreviewBlock({
  title = defaultTitle,
  mainLabel = defaultMainLabel,
  mainImageUrl,
  mainVideoUrl,
  mainTitle,
  imageFit = 'contain',
  imagePosition = 'center',
  galleryLabel = defaultGalleryLabel,
  galleryItems = [],
  galleryEmptyMessage = defaultEmptyMessage,
  mainOnly = false,
}: MediaPreviewBlockProps) {
  const hasMainMedia = !!(mainImageUrl || mainVideoUrl);
  const hasGallery = galleryItems.length > 0;

  return (
    <div
      style={{
        marginBottom: 24,
        padding: 20,
        borderRadius: 16,
        border: '1px solid rgba(56,189,248,0.25)',
        background: 'rgba(56,189,248,0.04)',
      }}
    >
      <h3
        style={{
          margin: '0 0 16px 0',
          fontSize: 14,
          fontWeight: 700,
          color: '#7dd3fc',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        👁 {title}
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: mainOnly ? '1fr' : 'minmax(0, 280px) 1fr',
          gap: 24,
          alignItems: 'start',
        }}
      >
        <div>
          <p style={{ margin: '0 0 8px 0', fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>
            {mainLabel}
          </p>
          <div
            style={{
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(0,0,0,0.3)',
              aspectRatio: '16/10',
            }}
          >
            {mainImageUrl ? (
              <img
                src={mainImageUrl}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: imageFit,
                  objectPosition: imagePosition || 'center',
                }}
              />
            ) : mainVideoUrl ? (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#0f172a',
                  color: '#94a3b8',
                  fontSize: 12,
                }}
              >
                🎬 Vídeo (edite abaixo para trocar)
              </div>
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b',
                  fontSize: 12,
                }}
              >
                Sem mídia
              </div>
            )}
            {mainTitle && (
              <div style={{ padding: '10px 12px', background: 'rgba(0,0,0,0.6)' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{mainTitle}</span>
              </div>
            )}
          </div>
        </div>
        {!mainOnly && (
          <div>
            <p style={{ margin: '0 0 8px 0', fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>
              {galleryLabel} ({galleryItems.length} itens)
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, minHeight: 72, alignItems: 'center' }}>
              {galleryItems.length === 0 ? (
                <span style={{ fontSize: 12, color: '#64748b' }}>{galleryEmptyMessage}</span>
              ) : (
                <>
                  {galleryItems.slice(0, 12).map((g, i) => (
                    <div
                      key={g.id || i}
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 8,
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: '#1e293b',
                        flexShrink: 0,
                      }}
                    >
                      {g.thumbUrl ? (
                        <img src={g.thumbUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 10,
                            color: '#64748b',
                          }}
                        >
                          {g.isVideo ? '🎬' : '🖼'}
                        </div>
                      )}
                    </div>
                  ))}
                  {galleryItems.length > 12 && (
                    <span style={{ fontSize: 11, color: '#64748b' }}>+{galleryItems.length - 12} mais</span>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
