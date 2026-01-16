'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  slug: string;
  titlePt: string;
  titleEn: string;
  excerptPt: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';
  featured: boolean;
  publishedAt: string | null;
  createdAt: string;
  viewCount: number;
  category: {
    namePt: string;
    color: string;
  } | null;
  coverImage: {
    thumbnailUrl: string | null;
    originalUrl: string;
  } | null;
  coverImageUrl: string | null;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  DRAFT: { label: 'Rascunho', color: '#6b7280' },
  PUBLISHED: { label: 'Publicado', color: '#22c55e' },
  SCHEDULED: { label: 'Agendado', color: '#f59e0b' },
  ARCHIVED: { label: 'Arquivado', color: '#ef4444' },
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  async function fetchPosts() {
    try {
      const params = new URLSearchParams();
      if (filter) params.set('status', filter);
      
      const res = await fetch(`/api/admin/blog/posts?${params}`);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <>
      {/* Header */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24 
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>
            📝 Blog
          </h1>
          <p style={{ margin: '4px 0 0', color: '#a0a0a0' }}>
            Gerencie os artigos do blog
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          style={{
            padding: '12px 24px',
            borderRadius: 10,
            background: '#c92337',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          ✨ Novo Post
        </Link>
      </header>

      {/* Filtros */}
      <div style={{
        display: 'flex',
        gap: 12,
        marginBottom: 24,
        flexWrap: 'wrap',
      }}>
        {['', 'DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid',
              borderColor: filter === status ? '#c92337' : 'rgba(255,255,255,0.1)',
              background: filter === status ? 'rgba(201,35,55,0.15)' : 'rgba(255,255,255,0.03)',
              color: filter === status ? '#c92337' : '#a0a0a0',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            {status === '' ? 'Todos' : statusLabels[status]?.label || status}
          </button>
        ))}
      </div>

      {/* Lista de Posts */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#a0a0a0' }}>
          Carregando posts...
        </div>
      ) : posts.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: 60, 
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <p style={{ fontSize: 48, margin: 0 }}>📝</p>
          <h3 style={{ margin: '16px 0 8px', color: '#fff' }}>Nenhum post ainda</h3>
          <p style={{ color: '#a0a0a0', margin: 0 }}>
            Crie seu primeiro artigo clicando em "Novo Post"
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gap: 16,
        }}>
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/admin/blog/${post.id}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto',
                gap: 20,
                padding: 20,
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.03)',
                textDecoration: 'none',
                color: 'inherit',
                alignItems: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,35,55,0.4)';
                e.currentTarget.style.background = 'rgba(201,35,55,0.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              {/* Thumbnail */}
              <div style={{
                width: 80,
                height: 60,
                borderRadius: 8,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.05)',
              }}>
                {(post.coverImage?.thumbnailUrl || post.coverImage?.originalUrl || post.coverImageUrl) ? (
                  <img
                    src={post.coverImage?.thumbnailUrl || post.coverImage?.originalUrl || post.coverImageUrl || ''}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                  }}>
                    📄
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  {post.featured && (
                    <span style={{ fontSize: 14 }}>⭐</span>
                  )}
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#fff' }}>
                    {post.titlePt}
                  </h3>
                </div>
                <p style={{ 
                  margin: 0, 
                  fontSize: 13, 
                  color: '#a0a0a0',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: 500,
                }}>
                  {post.excerptPt || 'Sem resumo'}
                </p>
                <div style={{ 
                  display: 'flex', 
                  gap: 12, 
                  marginTop: 8,
                  fontSize: 12,
                  color: '#6b7280',
                }}>
                  {post.category && (
                    <span style={{ 
                      background: post.category.color + '20',
                      color: post.category.color,
                      padding: '2px 8px',
                      borderRadius: 4,
                    }}>
                      {post.category.namePt}
                    </span>
                  )}
                  <span>👁️ {post.viewCount}</span>
                  <span>📅 {formatDate(post.publishedAt || post.createdAt)}</span>
                </div>
              </div>

              {/* Status */}
              <div style={{
                padding: '6px 12px',
                borderRadius: 6,
                background: statusLabels[post.status]?.color + '20',
                color: statusLabels[post.status]?.color,
                fontSize: 12,
                fontWeight: 600,
              }}>
                {statusLabels[post.status]?.label || post.status}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
