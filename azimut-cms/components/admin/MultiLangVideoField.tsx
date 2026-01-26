'use client'

import React, { useState, useRef, useEffect } from 'react'

interface MultiLangVideoFieldProps {
  label: string
  // Vídeos por idioma
  videoPt?: string
  videoEn?: string
  videoEs?: string
  videoFr?: string
  // Thumbnails por idioma  
  thumbPt?: string
  thumbEn?: string
  thumbEs?: string
  thumbFr?: string
  // Callbacks
  onVideoPtChange: (url: string) => void
  onVideoEnChange: (url: string) => void
  onVideoEsChange: (url: string) => void
  onVideoFrChange: (url: string) => void
  onThumbPtChange: (url: string) => void
  onThumbEnChange: (url: string) => void
  onThumbEsChange: (url: string) => void
  onThumbFrChange: (url: string) => void
  // Config
  specs?: {
    videoMaxSizeMB?: number
    thumbWidth?: number
    thumbHeight?: number
    description?: string
  }
}

const LANGS = [
  { code: 'pt', label: '🇧🇷 Português', flag: '🇧🇷' },
  { code: 'en', label: '🇺🇸 English', flag: '🇺🇸' },
  { code: 'es', label: '🇪🇸 Español', flag: '🇪🇸' },
  { code: 'fr', label: '🇫🇷 Français', flag: '🇫🇷' },
]

export default function MultiLangVideoField({
  label,
  videoPt, videoEn, videoEs, videoFr,
  thumbPt, thumbEn, thumbEs, thumbFr,
  onVideoPtChange, onVideoEnChange, onVideoEsChange, onVideoFrChange,
  onThumbPtChange, onThumbEnChange, onThumbEsChange, onThumbFrChange,
  specs
}: MultiLangVideoFieldProps) {
  const [activeLang, setActiveLang] = useState('pt')

  // Mapear valores por idioma
  const videos: Record<string, string | undefined> = { pt: videoPt, en: videoEn, es: videoEs, fr: videoFr }
  const thumbs: Record<string, string | undefined> = { pt: thumbPt, en: thumbEn, es: thumbEs, fr: thumbFr }
  
  const videoCallbacks: Record<string, (url: string) => void> = {
    pt: onVideoPtChange, en: onVideoEnChange, es: onVideoEsChange, fr: onVideoFrChange
  }
  const thumbCallbacks: Record<string, (url: string) => void> = {
    pt: onThumbPtChange, en: onThumbEnChange, es: onThumbEsChange, fr: onThumbFrChange
  }

  // Estilos
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 8,
    background: 'rgba(10, 15, 30, 0.95)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#ffffff',
    fontSize: 14,
    boxSizing: 'border-box',
  }

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '10px 16px',
    borderRadius: '8px 8px 0 0',
    border: 'none',
    background: isActive ? 'rgba(201, 35, 55, 0.2)' : 'rgba(255,255,255,0.05)',
    color: isActive ? '#fff' : '#8f8ba2',
    fontSize: 14,
    fontWeight: isActive ? 600 : 400,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderBottom: isActive ? '2px solid #c92337' : '2px solid transparent',
  })

  const currentVideo = videos[activeLang] || ''
  const currentThumb = thumbs[activeLang] || ''
  const fallbackVideo = videoPt || ''
  const fallbackThumb = thumbPt || ''

  return (
    <div style={{ marginBottom: 24 }}>
      {/* Header */}
      <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 600, color: '#e8e6f2' }}>
        🎬 {label}
      </h3>
      
      {/* Info */}
      <div style={{ 
        padding: '12px 16px', 
        borderRadius: 8, 
        background: 'rgba(125, 211, 252, 0.1)',
        border: '1px solid rgba(125, 211, 252, 0.2)',
        marginBottom: 16,
        fontSize: 12,
        color: '#7dd3fc'
      }}>
        <strong>💡 Dica:</strong> Se não tiver vídeo em um idioma, o sistema usa automaticamente o vídeo em Português.
        <br />
        <strong>📐 Tamanho máximo:</strong> {specs?.videoMaxSizeMB || 25}MB | <strong>Thumbnail:</strong> {specs?.thumbWidth || 1920}x{specs?.thumbHeight || 1080}px
      </div>

      {/* Tabs de Idioma */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 0 }}>
        {LANGS.map(lang => {
          const hasVideo = !!videos[lang.code]
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setActiveLang(lang.code)}
              style={{
                ...tabStyle(activeLang === lang.code),
                position: 'relative',
              }}
            >
              {lang.flag} {lang.code.toUpperCase()}
              {hasVideo && (
                <span style={{ 
                  position: 'absolute', 
                  top: 4, 
                  right: 4, 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  background: '#22c55e' 
                }} />
              )}
            </button>
          )
        })}
      </div>

      {/* Conteúdo da Tab */}
      <div style={{ 
        padding: 20, 
        borderRadius: '0 12px 12px 12px', 
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        {/* Status do idioma */}
        <div style={{ 
          padding: '8px 12px', 
          borderRadius: 6, 
          background: currentVideo ? 'rgba(34, 197, 94, 0.1)' : 'rgba(251, 191, 36, 0.1)',
          border: `1px solid ${currentVideo ? 'rgba(34, 197, 94, 0.3)' : 'rgba(251, 191, 36, 0.3)'}`,
          marginBottom: 16,
          fontSize: 12,
          color: currentVideo ? '#86efac' : '#fbbf24'
        }}>
          {currentVideo 
            ? `✅ Vídeo configurado para ${LANGS.find(l => l.code === activeLang)?.label}`
            : `⚠️ Sem vídeo - Usando fallback em Português`
          }
        </div>

        {/* Campo URL do Vídeo */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600, color: '#e8e6f2' }}>
            🎥 URL do Vídeo ({LANGS.find(l => l.code === activeLang)?.label})
          </label>
          <input
            type="url"
            value={currentVideo}
            onChange={(e) => videoCallbacks[activeLang](e.target.value)}
            placeholder={activeLang === 'pt' ? '/ChrisMilk.mp4' : `/ChrisMilk-${activeLang}.mp4`}
            style={inputStyle}
          />
          <p style={{ margin: '6px 0 0', fontSize: 11, color: '#8f8ba2' }}>
            Ex: /ChrisMilk-{activeLang}.mp4 ou URL do YouTube/Vimeo
          </p>
        </div>

        {/* Campo URL do Thumbnail */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600, color: '#a78bfa' }}>
            🖼️ URL do Thumbnail ({LANGS.find(l => l.code === activeLang)?.label})
          </label>
          <input
            type="url"
            value={currentThumb}
            onChange={(e) => thumbCallbacks[activeLang](e.target.value)}
            placeholder={activeLang === 'pt' ? '/chris-milk-thumbnail.png' : `/chris-milk-thumbnail-${activeLang}.png`}
            style={{ ...inputStyle, borderColor: 'rgba(147, 51, 234, 0.3)' }}
          />
          <p style={{ margin: '6px 0 0', fontSize: 11, color: '#8f8ba2' }}>
            Imagem que aparece antes de dar play. Deixe vazio para usar o thumbnail em Português.
          </p>
        </div>

        {/* Preview */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 16 
        }}>
          {/* Preview Thumbnail */}
          <div style={{ 
            padding: 12, 
            borderRadius: 8, 
            background: 'rgba(147, 51, 234, 0.08)',
            border: '1px solid rgba(147, 51, 234, 0.3)'
          }}>
            <h4 style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: '#a78bfa' }}>
              🖼️ Thumbnail
            </h4>
            <div style={{ 
              aspectRatio: '16/9', 
              borderRadius: 6, 
              overflow: 'hidden',
              background: '#000',
              border: '1px solid rgba(147, 51, 234, 0.4)'
            }}>
              <img 
                src={currentThumb || fallbackThumb || '/og-image.png'}
                alt="Thumbnail"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { (e.target as HTMLImageElement).src = '/og-image.png' }}
              />
            </div>
            {!currentThumb && fallbackThumb && (
              <p style={{ margin: '6px 0 0', fontSize: 10, color: '#fbbf24' }}>
                ⚠️ Usando thumbnail PT
              </p>
            )}
          </div>

          {/* Preview Vídeo */}
          <div style={{ 
            padding: 12, 
            borderRadius: 8, 
            background: 'rgba(46, 204, 113, 0.08)',
            border: '1px solid rgba(46, 204, 113, 0.3)'
          }}>
            <h4 style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: '#86efac' }}>
              📺 Vídeo
            </h4>
            <div style={{ 
              aspectRatio: '16/9', 
              borderRadius: 6, 
              overflow: 'hidden',
              background: '#000',
              border: '1px solid rgba(46, 204, 113, 0.4)'
            }}>
              {(currentVideo || fallbackVideo) ? (
                <video 
                  src={currentVideo || fallbackVideo}
                  poster={currentThumb || fallbackThumb || undefined}
                  controls
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#8f8ba2',
                  fontSize: 11
                }}>
                  Sem vídeo
                </div>
              )}
            </div>
            {!currentVideo && fallbackVideo && (
              <p style={{ margin: '6px 0 0', fontSize: 10, color: '#fbbf24' }}>
                ⚠️ Usando vídeo PT
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Resumo de todos os idiomas */}
      <div style={{ 
        marginTop: 16, 
        padding: 12, 
        borderRadius: 8, 
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        <h4 style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: '#c0bccf' }}>
          📊 Status por Idioma:
        </h4>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {LANGS.map(lang => {
            const hasVideo = !!videos[lang.code]
            const hasThumb = !!thumbs[lang.code]
            return (
              <div 
                key={lang.code}
                style={{ 
                  padding: '6px 10px', 
                  borderRadius: 6, 
                  background: hasVideo ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${hasVideo ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255,255,255,0.1)'}`,
                  fontSize: 11,
                  color: hasVideo ? '#86efac' : '#8f8ba2'
                }}
              >
                {lang.flag} {lang.code.toUpperCase()}: {hasVideo ? '✓ Vídeo' : '○ Fallback PT'} | {hasThumb ? '✓ Thumb' : '○ Fallback PT'}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
