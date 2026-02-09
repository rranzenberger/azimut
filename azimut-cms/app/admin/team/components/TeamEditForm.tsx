'use client';

import { FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MediaPreviewBlock from '@/components/admin/MediaPreviewBlock';
import UnifiedMediaUpload from '@/components/admin/UnifiedMediaUpload';

const inputStyle = {
  padding: '10px 14px',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(0,0,0,0.2)',
  color: '#fff',
  fontSize: 14,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box' as const,
};

interface MediaItem {
  id: string;
  type: 'IMAGE' | 'VIDEO';
  originalUrl: string;
  thumbnailUrl?: string;
  altPt?: string;
}

export function TeamEditForm({ member }: { member?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [allMedia, setAllMedia] = useState<MediaItem[]>([]);
  const [formData, setFormData] = useState({
    slug: member?.slug || '',
    name: member?.name || '',
    rolePt: member?.rolePt || '',
    roleEn: member?.roleEn || '',
    roleEs: member?.roleEs || '',
    roleFr: member?.roleFr || '',
    credentialPt: member?.credentialPt || '',
    credentialEn: member?.credentialEn || '',
    credentialEs: member?.credentialEs || '',
    credentialFr: member?.credentialFr || '',
    bioPt: member?.bioPt || '',
    bioEn: member?.bioEn || '',
    bioEs: member?.bioEs || '',
    bioFr: member?.bioFr || '',
    photoUrl: member?.photoUrl || '',
    photoMediaId: member?.photoMediaId || '',
    displayOrder: member?.displayOrder || 0,
    isPublished: member?.isPublished !== undefined ? member.isPublished : true,
  });

  useEffect(() => {
    let cancelled = false;
    fetch('/api/admin/media?limit=100')
      .then((res) => res.ok ? res.json() : { media: [] })
      .then((data) => {
        if (cancelled) return;
        const list = (data.media || []).map((m: any) => ({
          id: m.id,
          type: m.type || 'IMAGE',
          originalUrl: m.originalUrl || '',
          thumbnailUrl: m.thumbnailUrl || m.mediumUrl || m.originalUrl,
          altPt: m.altPt,
        }));
        setAllMedia(list);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const url = member ? `/api/admin/team/${member.id}` : '/api/admin/team';
      const method = member ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao salvar membro');
        setLoading(false);
        return;
      }

      setMessage({ type: 'success', text: member ? 'Membro atualizado com sucesso!' : 'Membro criado com sucesso!' });
      setTimeout(() => {
        router.push('/admin/team');
        router.refresh();
      }, 1000);
      setLoading(false);
    } catch (err) {
      setError('Erro de rede ao salvar membro');
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!member || !confirm('Tem certeza que deseja deletar este membro?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/team/${member.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro ao deletar membro');
      }

      router.push('/admin/team');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <>
      <header style={{ marginBottom: 24 }}>
        <Link
          href="/admin/team"
          style={{
            color: '#9f9bb0',
            textDecoration: 'none',
            fontSize: 14,
            marginBottom: 8,
            display: 'inline-block',
          }}
        >
          ← Voltar para Equipe
        </Link>
        <h1 style={{ margin: '8px 0', fontSize: 32, fontWeight: 700, letterSpacing: '-0.5px' }}>
          {member ? `Editar: ${member.name}` : 'Novo Membro da Equipe'}
        </h1>
        <p style={{ margin: 4, color: '#c0bccf' }}>
          {member ? 'Edite as informações do membro.' : 'Preencha as informações do novo membro.'}
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        style={{
          padding: 24,
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.03)',
          display: 'grid',
          gap: 20,
          maxWidth: 1000,
        }}
      >
        {(error || message) && (
          <div
            style={{
              padding: '12px 14px',
              borderRadius: 8,
              border: `1px solid ${
                message?.type === 'success'
                  ? 'rgba(34,197,94,0.35)'
                  : 'rgba(201,35,55,0.35)'
              }`,
              background:
                message?.type === 'success'
                  ? 'rgba(34,197,94,0.12)'
                  : 'rgba(201,35,55,0.12)',
              color: message?.type === 'success' ? '#86efac' : '#fca5a5',
            }}
          >
            {message?.text || error}
          </div>
        )}

        {/* Preview: foto do membro — como aparece no site */}
        <MediaPreviewBlock
          title="Foto do membro — como aparece no site"
          mainLabel="Foto"
          mainImageUrl={formData.photoUrl || null}
          mainTitle={formData.name || 'Nome do membro'}
          mainOnly
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Slug *</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              style={inputStyle}
              placeholder="ranz"
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Nome *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={inputStyle}
              placeholder="Ranz Enberger"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Cargo PT *</label>
            <input
              type="text"
              value={formData.rolePt}
              onChange={(e) => setFormData({ ...formData, rolePt: e.target.value })}
              required
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Cargo EN *</label>
            <input
              type="text"
              value={formData.roleEn}
              onChange={(e) => setFormData({ ...formData, roleEn: e.target.value })}
              required
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Cargo ES</label>
            <input
              type="text"
              value={formData.roleEs}
              onChange={(e) => setFormData({ ...formData, roleEs: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Cargo FR</label>
            <input
              type="text"
              value={formData.roleFr}
              onChange={(e) => setFormData({ ...formData, roleFr: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Bio PT</label>
          <textarea
            value={formData.bioPt}
            onChange={(e) => setFormData({ ...formData, bioPt: e.target.value })}
            style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Bio EN</label>
          <textarea
            value={formData.bioEn}
            onChange={(e) => setFormData({ ...formData, bioEn: e.target.value })}
            style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Bio ES</label>
            <textarea
              value={formData.bioEs}
              onChange={(e) => setFormData({ ...formData, bioEs: e.target.value })}
              style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Bio FR</label>
            <textarea
              value={formData.bioFr}
              onChange={(e) => setFormData({ ...formData, bioFr: e.target.value })}
              style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Foto do membro</label>
          <UnifiedMediaUpload
            pageSlug="team"
            sectionSlug="photo"
            imageId={formData.photoMediaId || undefined}
            imageUrl={formData.photoUrl || undefined}
            onImageChange={(mediaId, url) => setFormData({ ...formData, photoMediaId: mediaId || '', photoUrl: url || '' })}
            allowVideo={false}
            allowExternalUrl={true}
            existingMedia={allMedia}
            imageLabel="Foto do membro (retrato recomendado)"
            imageSpecs={{ width: 600, height: 800, maxSizeMB: 2, description: 'Foto do membro (proporção 3:4)' }}
          />
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
            Ou cole a URL da imagem abaixo:
          </div>
          <input
            type="text"
            value={formData.photoUrl}
            onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
            style={inputStyle}
            placeholder="/Ranz.jpeg ou https://..."
          />
          {/* Orientação de upload de foto */}
          <div style={{
            padding: '12px 14px',
            borderRadius: 8,
            border: '1px solid rgba(99, 102, 241, 0.3)',
            background: 'rgba(99, 102, 241, 0.1)',
            color: '#a5b4fc',
            fontSize: 13,
            lineHeight: 1.5,
            marginTop: 4
          }}>
            <strong style={{ color: '#c7d2fe' }}>📸 Orientação para foto:</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
              <li><strong>Proporção ideal:</strong> Vertical 3:4 (ex: 600x800px ou 750x1000px)</li>
              <li><strong>Orientação:</strong> Retrato (pessoa de frente, rosto visível)</li>
              <li><strong>Fundo:</strong> Neutro ou relacionado ao trabalho</li>
              <li><strong>Formato:</strong> JPG ou PNG, máximo 500KB</li>
              <li><strong>Enquadramento:</strong> Do peito para cima ou meio corpo</li>
            </ul>
            <p style={{ margin: '8px 0 0 0', fontSize: 12, opacity: 0.8 }}>
              💡 Fotos horizontais serão exibidas com barras laterais. Fotos muito grandes podem ser cortadas.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Ordem de Exibição</label>
            <input
              type="number"
              value={formData.displayOrder}
              onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
              style={inputStyle}
              min={0}
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                style={{ width: 'auto' }}
              />
              Publicado
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
          {member && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                fontWeight: 600,
                fontSize: 14,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
              }}
            >
              Deletar
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              fontWeight: 600,
              fontSize: 14,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
            }}
          >
            {loading ? 'Salvando...' : member ? 'Atualizar' : 'Criar'}
          </button>
        </div>
      </form>
    </>
  );
}
