'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AZIMUT } from '../../../theme';

export default function EditAcademyCoursePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    titlePt: '',
    titleEn: '',
    descriptionPt: '',
    descriptionEn: '',
    pricePt: '',
    priceEn: '',
    durationPt: '',
    durationEn: '',
    levelPt: '',
    levelEn: '',
    category: '',
    tags: [] as string[],
    featured: false,
    imageId: null as string | null,
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/academy/courses');
        if (!res.ok) throw new Error('Falha ao carregar');
        const data = await res.json();
        const course = (data.courses || []).find((c: any) => c.id === id);
        if (!course) {
          setError('Curso não encontrado');
          setLoading(false);
          return;
        }
        setForm({
          titlePt: course.titlePt ?? '',
          titleEn: course.titleEn ?? '',
          descriptionPt: course.descriptionPt ?? '',
          descriptionEn: course.descriptionEn ?? '',
          pricePt: course.pricePt ?? '',
          priceEn: course.priceEn ?? '',
          durationPt: course.durationPt ?? '',
          durationEn: course.durationEn ?? '',
          levelPt: course.levelPt ?? '',
          levelEn: course.levelEn ?? '',
          category: course.category ?? '',
          tags: Array.isArray(course.tags) ? course.tags : [],
          featured: !!course.featured,
          imageId: course.imageId ?? null,
        });
        setImageUrl(course.image?.originalUrl || course.image?.thumbnailUrl || null);
      } catch (e: any) {
        setError(e.message || 'Erro');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/academy/courses/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Falha ao salvar');
      router.push('/admin/academy/courses');
    } catch (e: any) {
      setError(e.message || 'Erro ao salvar');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: 32, color: AZIMUT.textSecondary }}>Carregando...</div>;
  if (error && !form.titlePt) return <div style={{ padding: 24, color: '#fca5a5' }}>{error}</div>;

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.12)',
    background: 'rgba(255,255,255,0.04)',
    color: '#fff',
    fontSize: 14,
  };

  return (
    <div style={{ maxWidth: 640 }}>
      <Link href="/admin/academy/courses" style={{ color: AZIMUT.textMuted, fontSize: 14, textDecoration: 'underline', marginBottom: 16, display: 'inline-block' }}>
        ← Cursos (6 cards)
      </Link>
      <h1 style={{ margin: '0 0 24px', fontSize: 24, fontWeight: 700 }}>Editar curso</h1>

      {error && <div style={{ marginBottom: 16, padding: 12, background: 'rgba(201,35,55,0.12)', borderRadius: 8, color: '#fca5a5' }}>{error}</div>}

      <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 12, color: AZIMUT.textSecondary }}>Título (PT)</label>
          <input style={inputStyle} value={form.titlePt} onChange={(e) => setForm({ ...form, titlePt: e.target.value })} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 12, color: AZIMUT.textSecondary }}>Título (EN)</label>
          <input style={inputStyle} value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 12, color: AZIMUT.textSecondary }}>Descrição (PT)</label>
          <textarea style={{ ...inputStyle, minHeight: 80 }} value={form.descriptionPt} onChange={(e) => setForm({ ...form, descriptionPt: e.target.value })} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 12, color: AZIMUT.textSecondary }}>Preço (PT)</label>
            <input style={inputStyle} value={form.pricePt} onChange={(e) => setForm({ ...form, pricePt: e.target.value })} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 12, color: AZIMUT.textSecondary }}>Duração (PT)</label>
            <input style={inputStyle} value={form.durationPt} onChange={(e) => setForm({ ...form, durationPt: e.target.value })} />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 12, color: AZIMUT.textSecondary }}>Categoria (vr, ai, motion, game)</label>
          <input style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="vr" />
        </div>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            <span style={{ fontSize: 14, color: AZIMUT.text }}>Destaque</span>
          </label>
        </div>
      </div>

      <p style={{ fontSize: 13, color: AZIMUT.textMuted, marginBottom: 16 }}>
        Para trocar a imagem do card: use <Link href="/admin/media" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Mídias</Link> para enviar, depois cole o ID da mídia aqui (em breve: seletor de mídia).
      </p>

      <div style={{ display: 'flex', gap: 12 }}>
        <button type="button" onClick={save} disabled={saving} style={{ padding: '12px 24px', borderRadius: 8, background: saving ? '#475569' : '#22c55e', color: '#fff', fontWeight: 600, border: 'none', cursor: saving ? 'wait' : 'pointer' }}>
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
        <Link href="/admin/academy/courses" style={{ padding: '12px 24px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', color: AZIMUT.textSecondary, fontWeight: 600, textDecoration: 'none' }}>
          Cancelar
        </Link>
      </div>
    </div>
  );
}
