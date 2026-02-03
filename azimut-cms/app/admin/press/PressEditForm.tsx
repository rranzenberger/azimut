'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const inputStyle = { padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff', fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box' as const }

export function PressEditForm({ item }: { item?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    titlePt: item?.titlePt ?? '',
    titleEn: item?.titleEn ?? '',
    titleEs: item?.titleEs ?? '',
    titleFr: item?.titleFr ?? '',
    summaryPt: item?.summaryPt ?? '',
    summaryEn: item?.summaryEn ?? '',
    url: item?.url ?? '',
    publishedAt: item?.publishedAt ? item.publishedAt.slice(0, 10) : '',
    displayOrder: item?.displayOrder ?? 0,
    isPublished: item?.isPublished !== undefined ? item.isPublished : true
  })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const url = item ? `/api/admin/press/${item.id}` : '/api/admin/press'
      const method = item ? 'PUT' : 'POST'
      const body = { ...formData, publishedAt: formData.publishedAt || null }
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Erro ao salvar'); setLoading(false); return }
      router.push('/admin/press')
      router.refresh()
    } catch (err) {
      setError('Erro de rede')
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <Link href="/admin/press" style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16, display: 'inline-block' }}>← Voltar</Link>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {error && <div style={{ padding: 12, background: '#fee2e2', color: '#991b1b', borderRadius: 8 }}>{error}</div>}
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Título (PT) *
          <input style={inputStyle} value={formData.titlePt} onChange={e => setFormData({ ...formData, titlePt: e.target.value })} required />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Título (EN)
          <input style={inputStyle} value={formData.titleEn} onChange={e => setFormData({ ...formData, titleEn: e.target.value })} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Resumo (PT)
          <textarea style={{ ...inputStyle, minHeight: 80 }} value={formData.summaryPt} onChange={e => setFormData({ ...formData, summaryPt: e.target.value })} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          URL (link da matéria)
          <input style={inputStyle} type="url" value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Data publicação
          <input style={inputStyle} type="date" value={formData.publishedAt} onChange={e => setFormData({ ...formData, publishedAt: e.target.value })} />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={formData.isPublished} onChange={e => setFormData({ ...formData, isPublished: e.target.checked })} />
          Publicado
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Ordem
          <input style={inputStyle} type="number" value={formData.displayOrder} onChange={e => setFormData({ ...formData, displayOrder: parseInt(e.target.value, 10) || 0 })} />
        </label>
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={loading} style={{ padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: 6, fontWeight: 600, cursor: loading ? 'wait' : 'pointer' }}>
            {loading ? 'Salvando…' : 'Salvar'}
          </button>
          <Link href="/admin/press" style={{ padding: '10px 20px', color: '#94a3b8', borderRadius: 6 }}>Cancelar</Link>
        </div>
      </form>
    </div>
  )
}
