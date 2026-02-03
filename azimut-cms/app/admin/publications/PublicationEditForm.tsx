'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const inputStyle = { padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff', fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box' as const }

export function PublicationEditForm({ item }: { item?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    titlePt: item?.titlePt ?? '',
    titleEn: item?.titleEn ?? '',
    titleEs: item?.titleEs ?? '',
    titleFr: item?.titleFr ?? '',
    authors: item?.authors ?? '',
    url: item?.url ?? '',
    year: item?.year ?? '',
    displayOrder: item?.displayOrder ?? 0,
    isPublished: item?.isPublished !== undefined ? item.isPublished : true
  })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const url = item ? `/api/admin/publications/${item.id}` : '/api/admin/publications'
      const method = item ? 'PUT' : 'POST'
      const body = { ...formData, year: formData.year ? parseInt(String(formData.year), 10) : null }
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Erro ao salvar'); setLoading(false); return }
      router.push('/admin/publications')
      router.refresh()
    } catch (err) {
      setError('Erro de rede')
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <Link href="/admin/publications" style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16, display: 'inline-block' }}>← Voltar</Link>
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
          Autores
          <input style={inputStyle} value={formData.authors} onChange={e => setFormData({ ...formData, authors: e.target.value })} placeholder="Ex: João Silva, Maria Santos" />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          URL (link do artigo/PDF)
          <input style={inputStyle} type="url" value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Ano
          <input style={inputStyle} type="number" min="1900" max="2100" value={formData.year || ''} onChange={e => setFormData({ ...formData, year: e.target.value })} placeholder="Ex: 2024" />
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
          <Link href="/admin/publications" style={{ padding: '10px 20px', color: '#94a3b8', borderRadius: 6 }}>Cancelar</Link>
        </div>
      </form>
    </div>
  )
}
