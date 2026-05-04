'use client';

import { FormEvent, useState, useRef, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

type FAQItem = { question: string; answer: string };

function ensureFAQArray(val: unknown): FAQItem[] {
  if (!Array.isArray(val)) return [];
  return val.filter(
    (x): x is FAQItem =>
      x && typeof x === 'object' && 'question' in x && 'answer' in x
  );
}

export function ServiceEditForm({ service }: { service: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [cardImageUploading, setCardImageUploading] = useState(false);
  const cardImageFileRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    slug: service.slug || '',
    titlePt: service.titlePt || '',
    titleEn: service.titleEn || '',
    titleEs: service.titleEs || '',
    titleFr: service.titleFr || '',
    descriptionPt: service.descriptionPt || '',
    descriptionEn: service.descriptionEn || '',
    descriptionEs: service.descriptionEs || '',
    descriptionFr: service.descriptionFr || '',
    icon: service.icon || '',
    cardImageUrl: service.cardImageUrl || '',
    status: service.status || 'PUBLISHED',
    priority: service.priority || 0,
    segments: service.segments?.join(', ') || '',
    faqsPt: ensureFAQArray(service.faqsPt) as FAQItem[],
    faqsEn: ensureFAQArray(service.faqsEn) as FAQItem[],
    faqsEs: ensureFAQArray(service.faqsEs) as FAQItem[],
    faqsFr: ensureFAQArray(service.faqsFr) as FAQItem[],
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      // Converter segments de string para array
      const segmentsArray = formData.segments
        ? formData.segments.split(',').map((s: string) => s.trim()).filter((s: string) => s)
        : [];

      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          cardImageUrl: formData.cardImageUrl.trim() || null,
          segments: segmentsArray,
          faqsPt: formData.faqsPt.length ? formData.faqsPt : null,
          faqsEn: formData.faqsEn.length ? formData.faqsEn : null,
          faqsEs: formData.faqsEs.length ? formData.faqsEs : null,
          faqsFr: formData.faqsFr.length ? formData.faqsFr : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao atualizar serviço');
        setLoading(false);
        return;
      }

      setMessage({ type: 'success', text: 'Serviço atualizado com sucesso!' });
      router.refresh();
      setLoading(false);
    } catch (err) {
      setError('Erro de rede ao atualizar serviço');
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Tem certeza que deseja deletar este serviço?')) {
      return;
    }

    // Verificar se tem projetos vinculados
    if (service.projects && service.projects.length > 0) {
      alert(`Não é possível deletar serviço com ${service.projects.length} projeto(s) vinculado(s). Remova os projetos primeiro.`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro ao deletar serviço');
      }

      router.push('/admin/services');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  async function handleCardImageFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError(null);
      setMessage({
        type: 'error',
        text: 'Escolhe um ficheiro de imagem (JPEG, PNG, WebP ou GIF).',
      });
      return;
    }
    setCardImageUploading(true);
    setError(null);
    setMessage(null);
    try {
      const slug = (formData.slug || service.slug || '').trim();
      const fd = new FormData();
      fd.append('file', file);
      fd.append('pageSlug', slug ? `what/${slug}` : 'what/service-card');
      fd.append('sectionSlug', 'service-card-image');
      const res = await fetch('/api/admin/media/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro no upload');
      const media = data.media as {
        largeUrl?: string | null;
        mediumUrl?: string | null;
        originalUrl?: string | null;
      };
      const url =
        (media?.largeUrl && String(media.largeUrl)) ||
        (media?.mediumUrl && String(media.mediumUrl)) ||
        (media?.originalUrl && String(media.originalUrl));
      if (!url) throw new Error('Resposta sem URL da imagem');
      setFormData((prev) => ({ ...prev, cardImageUrl: url }));
      setMessage({
        type: 'success',
        text: 'Imagem enviada. Clica em «Salvar alterações» para publicar no site.',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro ao enviar imagem';
      setMessage({ type: 'error', text: msg });
    } finally {
      setCardImageUploading(false);
      if (cardImageFileRef.current) cardImageFileRef.current.value = '';
    }
  }

  return (
    <>
      <header style={{ marginBottom: 24 }}>
        <Link
          href="/admin/services"
          style={{
            color: '#9f9bb0',
            textDecoration: 'none',
            fontSize: 14,
            marginBottom: 8,
            display: 'inline-block',
          }}
        >
          ← Voltar para Serviços
        </Link>
        <h1 style={{ margin: '8px 0', fontSize: 32, fontWeight: 700, letterSpacing: '-0.5px' }}>
          {service.icon && <span style={{ marginRight: 12 }}>{service.icon}</span>}
          {service.titlePt}
        </h1>
        <p style={{ margin: 4, color: '#c0bccf' }}>Edite as informações do serviço.</p>
      </header>

      {service.projects && service.projects.length > 0 && (
        <div
          style={{
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid rgba(251,191,36,0.35)',
            background: 'rgba(251,191,36,0.12)',
            color: '#fde047',
            marginBottom: 16,
          }}
        >
          <strong>⚠️ Atenção:</strong> Este serviço está vinculado a {service.projects.length} projeto(s).
          Não é possível deletá-lo enquanto houver projetos vinculados.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          padding: 24,
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.03)',
          display: 'grid',
          gap: 20,
          maxWidth: 800,
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

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Slug *</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
            required
            style={inputStyle}
            placeholder="exemplo-servico"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Título PT *</label>
            <input
              type="text"
              value={formData.titlePt}
              onChange={(e) => setFormData({ ...formData, titlePt: e.target.value })}
              required
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Título EN *</label>
            <input
              type="text"
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              required
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Título ES</label>
            <input
              type="text"
              value={formData.titleEs}
              onChange={(e) => setFormData({ ...formData, titleEs: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Título FR</label>
            <input
              type="text"
              value={formData.titleFr}
              onChange={(e) => setFormData({ ...formData, titleFr: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Descrição PT</label>
          <textarea
            value={formData.descriptionPt}
            onChange={(e) => setFormData({ ...formData, descriptionPt: e.target.value })}
            style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Descrição EN</label>
          <textarea
            value={formData.descriptionEn}
            onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
            style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Descrição ES</label>
          <textarea
            value={formData.descriptionEs}
            onChange={(e) => setFormData({ ...formData, descriptionEs: e.target.value })}
            style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Descrição FR</label>
          <textarea
            value={formData.descriptionFr}
            onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
            style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Ícone (Emoji)</label>
          <input
            type="text"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            style={inputStyle}
            placeholder="🏛️"
            maxLength={10}
          />
          <small style={{ color: '#9f9bb0', fontSize: 12 }}>
            Use emojis ou ícones Unicode. Ex: 🏛️ 🎭 🗺️ ⚙️ 📚 🤖 (suporta até 10 caracteres)
          </small>
        </div>

        <div
          style={{
            display: 'grid',
            gap: 12,
            padding: 16,
            borderRadius: 12,
            border: '1px solid rgba(201, 35, 55, 0.25)',
            background: 'rgba(201, 35, 55, 0.06)',
          }}
        >
          <label style={{ fontSize: 14, fontWeight: 600 }}>
            Imagem do card (Solutions — /what)
          </label>
          <small style={{ color: '#9f9bb0', fontSize: 12, marginTop: -4, lineHeight: 1.45 }}>
            Cada <strong style={{ color: '#c8c4d4' }}>serviço</strong> na lista{' '}
            <strong style={{ color: '#c8c4d4' }}>Admin → Serviços</strong> é um card na página Solutions: editas aqui,
            nesta página, serviço a serviço. Podes <strong style={{ color: '#c8c4d4' }}>enviar um ficheiro</strong> para
            substituir a imagem, ou colar uma URL. Proporção ~16:10; imagens até 8&nbsp;MB. Se limpares o campo e
            guardares, o site volta à imagem padrão (por slug).
          </small>
          <input
            ref={cardImageFileRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            style={{ display: 'none' }}
            onChange={handleCardImageFileChange}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
            <button
              type="button"
              disabled={cardImageUploading}
              onClick={() => cardImageFileRef.current?.click()}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: '1px solid rgba(201,35,55,0.45)',
                background: cardImageUploading ? 'rgba(50,50,50,0.4)' : 'rgba(201,35,55,0.15)',
                color: '#fda4af',
                fontSize: 13,
                fontWeight: 600,
                cursor: cardImageUploading ? 'not-allowed' : 'pointer',
              }}
            >
              {cardImageUploading ? 'A enviar…' : 'Enviar imagem (substituir)'}
            </button>
            <button
              type="button"
              disabled={cardImageUploading || !formData.cardImageUrl.trim()}
              onClick={() => {
                setFormData({ ...formData, cardImageUrl: '' });
                setMessage({
                  type: 'success',
                  text: 'URL removida. Guarda para voltar à imagem padrão do site.',
                });
              }}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: '1px solid rgba(148,163,184,0.35)',
                background: 'rgba(255,255,255,0.05)',
                color: '#94a3b8',
                fontSize: 13,
                fontWeight: 600,
                cursor:
                  cardImageUploading || !formData.cardImageUrl.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              Limpar (padrão do site)
            </button>
          </div>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#b8b4c8' }}>Ou URL da imagem</label>
          <input
            type="text"
            value={formData.cardImageUrl}
            onChange={(e) => setFormData({ ...formData, cardImageUrl: e.target.value })}
            style={inputStyle}
            placeholder="https://… (opcional; preenchido automaticamente após enviar ficheiro)"
          />
          <div
            style={{
              borderRadius: 10,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.12)',
              aspectRatio: '16 / 10',
              maxWidth: 480,
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              position: 'relative',
            }}
          >
            {formData.cardImageUrl.trim() ? (
              <img
                src={formData.cardImageUrl.trim()}
                alt="Pré-visualização do card"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = '0.35';
                }}
              />
            ) : (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b',
                  fontSize: 13,
                  padding: 16,
                  textAlign: 'center',
                }}
              >
                Envia uma imagem ou cola uma URL para pré-visualizar — ou guarda com campo vazio para o padrão do site.
              </div>
            )}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 45%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                left: 12,
                right: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                pointerEvents: 'none',
              }}
            >
              {formData.icon && <span style={{ fontSize: 22 }}>{formData.icon}</span>}
              <span style={{ fontWeight: 700, fontSize: 12, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {formData.titleEn || formData.titlePt || 'Título'}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={inputStyle}
            >
              <option value="DRAFT">Rascunho</option>
              <option value="PUBLISHED">Publicado</option>
              <option value="ARCHIVED">Arquivado</option>
            </select>
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600 }}>Prioridade</label>
            <input
              type="number"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
              style={inputStyle}
              min={0}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Segmentos</label>
          <input
            type="text"
            value={formData.segments}
            onChange={(e) => setFormData({ ...formData, segments: e.target.value })}
            style={inputStyle}
            placeholder="Museus, VR, Tecnologia (separados por vírgula)"
          />
        </div>

        {/* FAQs por idioma */}
        {(['Pt', 'En', 'Es', 'Fr'] as const).map((lang) => {
          const key = `faqs${lang}` as 'faqsPt' | 'faqsEn' | 'faqsEs' | 'faqsFr';
          const faqs = formData[key];
          return (
            <div key={key} style={{ display: 'grid', gap: 12, padding: 16, background: 'rgba(0,0,0,0.15)', borderRadius: 10 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>FAQs ({lang === 'Pt' ? 'PT' : lang === 'En' ? 'EN' : lang === 'Es' ? 'ES' : 'FR'})</label>
              {faqs.map((faq, index) => (
                <div key={index} style={{ display: 'grid', gap: 8, padding: 12, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const next = [...faqs];
                      next[index] = { ...next[index], question: e.target.value };
                      setFormData({ ...formData, [key]: next });
                    }}
                    style={inputStyle}
                    placeholder="Pergunta"
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => {
                      const next = [...faqs];
                      next[index] = { ...next[index], answer: e.target.value };
                      setFormData({ ...formData, [key]: next });
                    }}
                    style={{ ...inputStyle, minHeight: 70, resize: 'vertical' }}
                    placeholder="Resposta"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, [key]: faqs.filter((_, i) => i !== index) })}
                    style={{ justifySelf: 'start', padding: '6px 12px', fontSize: 12, color: '#fca5a5', background: 'transparent', border: '1px solid rgba(252,165,165,0.3)', borderRadius: 6, cursor: 'pointer' }}
                  >
                    Remover FAQ
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, [key]: [...faqs, { question: '', answer: '' }] })}
                style={{ padding: '8px 14px', fontSize: 13, color: '#86efac', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8, cursor: 'pointer' }}
              >
                + Adicionar FAQ
              </button>
            </div>
          );
        })}

        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 24px',
              borderRadius: 10,
              border: 'none',
              background: loading ? 'rgba(201,35,55,0.5)' : '#c92337',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
          <Link
            href="/admin/services"
            style={{
              padding: '12px 24px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
              display: 'inline-block',
            }}
          >
            Cancelar
          </Link>
          {(!service.projects || service.projects.length === 0) && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              style={{
                padding: '12px 24px',
                borderRadius: 10,
                border: '1px solid rgba(239,68,68,0.3)',
                background: 'rgba(239,68,68,0.1)',
                color: '#fca5a5',
                fontSize: 14,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                marginLeft: 'auto',
              }}
            >
              Deletar
            </button>
          )}
        </div>
      </form>
    </>
  );
}

