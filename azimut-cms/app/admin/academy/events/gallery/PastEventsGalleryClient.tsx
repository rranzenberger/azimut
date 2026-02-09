'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AZIMUT } from '../../../theme';

type Slot = {
  id: string;
  order: number;
  mediaId: string | null;
  media: { id: string; originalUrl: string; thumbnailUrl?: string } | null;
  captionPt: string | null;
  captionEn: string | null;
};

export function PastEventsGalleryClient() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [mediaIdInput, setMediaIdInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [adding, setAdding] = useState(false);

  const fetchSlots = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/academy/past-events');
      if (!res.ok) throw new Error('Falha ao carregar');
      const data = await res.json();
      setSlots(data.slots || []);
    } catch (e: any) {
      setError(e.message || 'Erro ao carregar');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const saveMedia = async (slotId: string, mediaId: string) => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/academy/past-events/${slotId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaId: mediaId || null }),
      });
      if (!res.ok) throw new Error('Falha ao salvar');
      setEditingId(null);
      setMediaIdInput('');
      await fetchSlots();
    } catch (e: any) {
      setError(e.message || 'Erro ao salvar');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: 32, color: AZIMUT.textSecondary }}>Carregando slots...</div>;
  if (error && slots.length === 0) return <div style={{ padding: 24, color: '#fca5a5' }}>{error}</div>;

  return (
    <div style={{ width: '100%' }}>
      <header style={{ marginBottom: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <Link href="/admin/academy" style={{ color: AZIMUT.textMuted, fontSize: 14, textDecoration: 'underline', display: 'inline-block', marginBottom: 8 }}>
            ← Academy
          </Link>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>Past Events — expandível (como Projetos)</h1>
          <p style={{ margin: '8px 0 0', color: AZIMUT.textSecondary, fontSize: 15 }}>
            Cada slot = uma imagem na grade do site. Troque a imagem. Pode adicionar mais slots.
          </p>
        </div>
        <button
          type="button"
          onClick={async () => {
            setAdding(true);
            try {
              await fetch('/api/admin/academy/past-events', { method: 'POST' });
              await fetchSlots();
            } finally {
              setAdding(false);
            }
          }}
          disabled={adding}
          style={{ padding: '10px 20px', borderRadius: 8, background: AZIMUT.red, color: '#fff', fontWeight: 600, border: 'none', cursor: adding ? 'wait' : 'pointer' }}
        >
          {adding ? 'Adicionando...' : '+ Adicionar slot'}
        </button>
      </header>

      {error && <div style={{ marginBottom: 16, padding: 12, background: 'rgba(201,35,55,0.12)', borderRadius: 8, color: '#fca5a5' }}>{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {slots.map((slot) => {
          const imgUrl = slot.media?.originalUrl || slot.media?.thumbnailUrl;
          const isEditing = editingId === slot.id;
          return (
            <div
              key={slot.id}
              style={{
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <div style={{ position: 'relative', paddingTop: '100%', background: '#0f172a' }}>
                {imgUrl ? (
                  <img src={imgUrl} alt={slot.captionPt || ''} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(201,35,55,0.1), rgba(10,14,26,0.9))' }}>
                    <span style={{ fontSize: 32, opacity: 0.4 }}>📸</span>
                  </div>
                )}
                <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8 }}>
                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={() => { setEditingId(slot.id); setMediaIdInput(''); }}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 8, background: 'rgba(168,85,247,0.9)', color: '#fff', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                    >
                      📷 Trocar imagem
                    </button>
                  ) : (
                    <div style={{ background: 'rgba(0,0,0,0.85)', padding: 10, borderRadius: 8 }}>
                      <input
                        type="text"
                        placeholder="ID da mídia (cole da biblioteca)"
                        value={mediaIdInput}
                        onChange={(e) => setMediaIdInput(e.target.value)}
                        style={{ width: '100%', padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 12, marginBottom: 6 }}
                      />
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button type="button" onClick={() => saveMedia(slot.id, mediaIdInput)} disabled={saving} style={{ flex: 1, padding: '6px 10px', borderRadius: 6, background: '#22c55e', color: '#fff', fontSize: 11, fontWeight: 600, border: 'none', cursor: saving ? 'wait' : 'pointer' }}>
                          Salvar
                        </button>
                        <button type="button" onClick={() => { setEditingId(null); setMediaIdInput(''); }} style={{ padding: '6px 10px', borderRadius: 6, background: 'transparent', color: '#94a3b8', fontSize: 11, border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.7)', color: '#86efac', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                  #{slot.order + 1}
                </div>
              </div>
              <div style={{ padding: '8px 12px', fontSize: 11, color: AZIMUT.textMuted }}>
                {slot.captionPt || slot.captionEn || 'Sem legenda'}
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ marginTop: 20, fontSize: 13, color: AZIMUT.textMuted }}>
        Total: {slots.length} slot(s). Igual a galeria de projetos: pode adicionar quantos quiser. Para usar uma imagem: vá em <Link href="/admin/media" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Mídias</Link>, envie ou escolha uma, copie o ID e cole em &quot;Trocar imagem&quot; no slot.
      </p>
    </div>
  );
}
