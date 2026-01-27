/**
 * Página de Marketing - Preview/Degustação
 * Gerencia e visualiza os previews personalizados
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MarketingPreviewPage() {
  const [generating, setGenerating] = useState(false)
  const [preview, setPreview] = useState<any>(null)

  async function generatePreview(interest: string) {
    setGenerating(true)
    try {
      const response = await fetch('/api/marketing/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interest }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setPreview(data)
      }
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div style={{ width: '100%', maxWidth: 1400 }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
          🎁 Sistema de Degustação/Preview
        </h1>
        <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
          Crie previews personalizados para empolgar clientes e fechar mais negócios
        </p>
      </header>

      {/* Objetivo */}
      <div style={{
        padding: 24,
        borderRadius: 12,
        background: 'rgba(139, 92, 246, 0.1)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        marginBottom: 32,
      }}>
        <h2 style={{ margin: '0 0 12px 0', fontSize: 20, fontWeight: 600, color: '#c4b5fd' }}>
          🎯 Objetivo
        </h2>
        <p style={{ margin: 0, color: '#c0bccf', fontSize: 16, lineHeight: 1.6 }}>
          Mostrar uma <strong>"provinha"</strong> do que podemos fazer para o cliente se <strong>empolgar</strong> e 
          <strong> fechar mais negócios</strong>. Foco em <strong>VR, NFT, Web3 e Marketing Imersivo</strong>.
        </p>
      </div>

      {/* Opções de Preview */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
          🎨 Gerar Preview Personalizado
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 16,
        }}>
          {[
            { id: 'vr', label: '🥽 VR', color: '#3b82f6' },
            { id: 'nft', label: '🎨 NFT', color: '#8b5cf6' },
            { id: 'web3', label: '⛓️ Web3', color: '#f59e0b' },
            { id: 'immersive', label: '🚀 Imersivo', color: '#ec4899' },
            { id: 'marketing', label: '📢 Marketing', color: '#10b981' },
            { id: 'all', label: '🎯 Completo', color: '#22c55e' },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => generatePreview(option.id)}
              disabled={generating}
              style={{
                padding: 24,
                borderRadius: 12,
                border: `2px solid ${option.color}40`,
                background: `rgba(${option.color === '#3b82f6' ? '59, 130, 246' : 
                  option.color === '#8b5cf6' ? '139, 92, 246' :
                  option.color === '#f59e0b' ? '245, 158, 11' :
                  option.color === '#ec4899' ? '236, 72, 153' :
                  option.color === '#10b981' ? '16, 185, 129' :
                  '34, 197, 94'}, 0.1)`,
                color: '#fff',
                fontSize: 18,
                fontWeight: 600,
                cursor: generating ? 'not-allowed' : 'pointer',
                opacity: generating ? 0.6 : 1,
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      {/* Preview Gerado */}
      {preview && (
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
            ✨ Preview Gerado
          </h2>
          <div style={{
            padding: 32,
            borderRadius: 12,
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
              {preview.preview.title}
            </h3>
            <p style={{ fontSize: 16, color: '#c0bccf', marginBottom: 24 }}>
              {preview.preview.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: '#86efac', marginBottom: 12 }}>
                  ✨ O Que Você Ganha:
                </h4>
                <ul style={{ margin: 0, paddingLeft: 20, color: '#c0bccf' }}>
                  {preview.preview.features.map((f: string, i: number) => (
                    <li key={i} style={{ marginBottom: 8 }}>{f}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: '#93c5fd', marginBottom: 12 }}>
                  🎯 Exemplos:
                </h4>
                <ul style={{ margin: 0, paddingLeft: 20, color: '#c0bccf' }}>
                  {preview.preview.examples.map((e: string, i: number) => (
                    <li key={i} style={{ marginBottom: 8 }}>{e}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{
              padding: 20,
              borderRadius: 8,
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: 18, fontWeight: 600, color: '#86efac', marginBottom: 16 }}>
                {preview.preview.cta}
              </p>
              <p style={{ fontSize: 14, color: '#c0bccf' }}>
                Este preview pode ser enviado por email ou mostrado em uma página especial
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Links Úteis */}
      <section>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
          🔗 Links e Recursos
        </h2>
        <div style={{
          padding: 24,
          borderRadius: 12,
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ fontSize: 14, color: '#c0bccf' }}>
              <strong style={{ color: '#fff' }}>Componente Frontend:</strong> <code>src/components/ExperiencePreview.tsx</code>
            </div>
            <div style={{ fontSize: 14, color: '#c0bccf' }}>
              <strong style={{ color: '#fff' }}>API:</strong> <code>/api/marketing/preview</code>
            </div>
            <div style={{ fontSize: 14, color: '#c0bccf' }}>
              <strong style={{ color: '#fff' }}>Página:</strong> <code>/experience-preview</code> (adicionar nas rotas)
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
