'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AZIMUT } from '../../theme';

type Course = {
  id: string;
  order: number;
  imageId: string | null;
  image: { id: string; originalUrl: string; thumbnailUrl?: string } | null;
  titlePt: string | null;
  titleEn: string | null;
  descriptionPt: string | null;
  pricePt: string | null;
  durationPt: string | null;
  levelPt: string | null;
  category: string | null;
  tags: string[];
  featured: boolean;
};

export default function AcademyCoursesBackofficePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/academy/courses');
      if (!res.ok) throw new Error('Falha ao carregar');
      const data = await res.json();
      setCourses(data.courses || []);
    } catch (e: any) {
      setError(e.message || 'Erro ao carregar cursos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const ensureSix = async () => {
    setSeeding(true);
    try {
      for (let i = courses.length; i < 6; i++) {
        await fetch('/api/admin/academy/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            titlePt: `Curso ${i + 1}`,
            titleEn: `Course ${i + 1}`,
            order: i,
            category: 'vr',
            tags: ['VR', 'Cinema'],
            featured: i < 2,
          }),
        });
      }
      await fetchCourses();
    } catch (e) {
      setError('Erro ao criar cards');
    } finally {
      setSeeding(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 32, color: AZIMUT.textSecondary }}>
        Carregando cursos...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 24, background: 'rgba(201,35,55,0.12)', border: '1px solid rgba(201,35,55,0.35)', borderRadius: 12, color: '#fca5a5' }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <header style={{ marginBottom: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <Link href="/admin/academy" style={{ color: AZIMUT.textMuted, fontSize: 14, textDecoration: 'underline', display: 'inline-block', marginBottom: 8 }}>
            ← Academy
          </Link>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>
            Cursos — como Projetos (adicionar quando quiser)
          </h1>
          <p style={{ margin: '8px 0 0', color: AZIMUT.textSecondary, fontSize: 15 }}>
            Cada card = um curso no site. Trocar imagem e EDITAR. Você pode adicionar mais cursos.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {courses.length < 6 && (
            <button
              type="button"
              onClick={ensureSix}
              disabled={seeding}
              style={{ padding: '10px 18px', borderRadius: 8, background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.5)', color: '#86efac', fontWeight: 600, cursor: seeding ? 'wait' : 'pointer' }}
            >
              {seeding ? 'Criando...' : 'Criar 6 iniciais'}
            </button>
          )}
          <button
            type="button"
            onClick={async () => {
              setSeeding(true);
              try {
                await fetch('/api/admin/academy/courses', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ titlePt: 'Novo curso', titleEn: 'New course', order: courses.length }),
                });
                await fetchCourses();
              } finally {
                setSeeding(false);
              }
            }}
            disabled={seeding}
            style={{ padding: '10px 20px', borderRadius: 8, background: AZIMUT.red, color: '#fff', fontWeight: 600, border: 'none', cursor: seeding ? 'wait' : 'pointer' }}
          >
            + Adicionar curso
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {courses.map((c) => {
          const imgUrl = c.image?.originalUrl || c.image?.thumbnailUrl;
          return (
            <div
              key={c.id}
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <div style={{ position: 'relative', paddingTop: '56%', background: '#0f172a' }}>
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt={c.titlePt || ''}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(201,35,55,0.15), rgba(10,14,26,0.9))' }}>
                    <span style={{ fontSize: 40, opacity: 0.5 }}>📚</span>
                  </div>
                )}
                <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
                  <Link
                    href={`/admin/academy/courses/${c.id}`}
                    style={{ background: 'rgba(168,85,247,0.9)', color: '#fff', padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, textDecoration: 'none' }}
                  >
                    📷 Trocar
                  </Link>
                  <Link
                    href={`/admin/academy/courses/${c.id}`}
                    style={{ background: '#22c55e', color: '#fff', padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}
                  >
                    ✏️ EDITAR
                  </Link>
                </div>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <h3 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 700, color: AZIMUT.text }}>
                  {c.titlePt || c.titleEn || `Card #${c.order + 1}`}
                </h3>
                <p style={{ margin: 0, fontSize: 12, color: AZIMUT.textMuted }}>
                  #{c.order + 1} · {c.category || '—'} {c.featured ? '· Destaque' : ''}
                </p>
                <Link
                  href={`/admin/academy/courses/${c.id}`}
                  style={{ display: 'inline-block', marginTop: 12, fontSize: 13, color: '#7dd3fc', textDecoration: 'underline', fontWeight: 600 }}
                >
                  Edição completa →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ marginTop: 16, color: AZIMUT.textMuted, fontSize: 13 }}>
        Total: {courses.length} curso(s). No site aparecem todos (ou os primeiros N, conforme a página). Igual a Projetos: pode adicionar quantos quiser.
      </p>
    </div>
  );
}
