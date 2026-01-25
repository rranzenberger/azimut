import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { type Lang } from '../i18n';

interface BlogProps {
  lang: Lang;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  coverImageAlt: string | null;
  author: {
    name: string | null;
    image: string | null;
  };
  readingTime: number | null;
  featured: boolean;
  publishedAt: string;
  category: {
    slug: string;
    name: string;
    color: string;
    icon: string | null;
  } | null;
  tags: Array<{ slug: string; label: string }>;
  viewCount: number;
}

interface Category {
  slug: string;
  name: string;
  description: string | null;
  color: string;
  icon: string | null;
  postCount: number;
}

const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br';

export default function Blog({ lang }: BlogProps) {
  const language = lang;
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);

  const texts = {
    pt: {
      title: 'Blog',
      subtitle: 'Insights, tendências e novidades do mundo da tecnologia criativa',
      allCategories: 'Todas',
      readMore: 'Ler mais',
      minRead: 'min de leitura',
      loadMore: 'Carregar mais',
      noPosts: 'Nenhum artigo encontrado',
      noPostsDesc: 'Em breve novos conteúdos!',
      views: 'visualizações',
    },
    en: {
      title: 'Blog',
      subtitle: 'Insights, trends and news from the creative technology world',
      allCategories: 'All',
      readMore: 'Read more',
      minRead: 'min read',
      loadMore: 'Load more',
      noPosts: 'No articles found',
      noPostsDesc: 'New content coming soon!',
      views: 'views',
    },
    es: {
      title: 'Blog',
      subtitle: 'Insights, tendencias y novedades del mundo de la tecnología creativa',
      allCategories: 'Todas',
      readMore: 'Leer más',
      minRead: 'min de lectura',
      loadMore: 'Cargar más',
      noPosts: 'No se encontraron artículos',
      noPostsDesc: '¡Pronto nuevos contenidos!',
      views: 'visualizaciones',
    },
    fr: {
      title: 'Blog',
      subtitle: 'Insights, tendances et actualités du monde de la technologie créative',
      allCategories: 'Toutes',
      readMore: 'Lire plus',
      minRead: 'min de lecture',
      loadMore: 'Charger plus',
      noPosts: 'Aucun article trouvé',
      noPostsDesc: 'Bientôt du nouveau contenu!',
      views: 'vues',
    },
  };

  const t = texts[language] || texts.pt;

  useEffect(() => {
    fetchCategories();
  }, [language]);

  useEffect(() => {
    setOffset(0);
    setPosts([]);
    fetchPosts(0);
  }, [selectedCategory, language]);

  async function fetchCategories() {
    try {
      const res = await fetch(`${BACKOFFICE_URL}/api/public/blog/categories?lang=${language}`);
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  async function fetchPosts(currentOffset: number) {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        lang: language,
        limit: '9',
        offset: currentOffset.toString(),
      });
      if (selectedCategory) params.set('category', selectedCategory);

      const res = await fetch(`${BACKOFFICE_URL}/api/public/blog?${params}`);
      const data = await res.json();

      if (currentOffset === 0) {
        setPosts(data.posts || []);
      } else {
        setPosts((prev) => [...prev, ...(data.posts || [])]);
      }
      setHasMore(data.hasMore || false);
      setOffset(currentOffset + (data.posts?.length || 0));
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : 'pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen bg-theme-bg">
      {/* Hero Section - Compacto como outras páginas */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        {/* Background Star */}
        <img
          src="/logo-azimut-star.svg"
          alt=""
          className="absolute -right-28 -bottom-40 md:-right-40 md:-bottom-60 h-[520px] w-[520px] md:h-[680px] md:w-[680px] opacity-30 pointer-events-none -z-5"
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="section-title">
              {t.title}
            </h1>
            <p className="body-large">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      {categories.length > 0 && (
        <section className="container mx-auto px-4 md:px-8 mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === ''
                  ? 'bg-azimut-red text-white'
                  : 'bg-theme-card text-theme-text-secondary hover:bg-theme-card-hover'
              }`}
            >
              {t.allCategories}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === cat.slug
                    ? 'text-white'
                    : 'bg-theme-card text-theme-text-secondary hover:bg-theme-card-hover'
                }`}
                style={{
                  backgroundColor: selectedCategory === cat.slug ? cat.color : undefined,
                }}
              >
                {cat.icon && <span className="mr-1">{cat.icon}</span>}
                {cat.name} ({cat.postCount})
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="container mx-auto px-4 md:px-8 pb-16">
        {loading && posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-theme-text-secondary">
              Carregando...
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 card-dark-fixed rounded-2xl p-8">
            <span className="text-5xl mb-4 block">📝</span>
            <h3 className="text-xl font-bold mb-2 text-theme-text">
              {t.noPosts}
            </h3>
            <p className="text-theme-text-secondary">{t.noPostsDesc}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className={`group block rounded-2xl overflow-hidden transition-all duration-500 card-dark-fixed hover:shadow-2xl hover:shadow-azimut-red/10 ${post.featured ? 'ring-2 ring-azimut-red/50' : ''}`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-theme-card">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.coverImageAlt || post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl bg-theme-card">
                        📄
                      </div>
                    )}
                    {post.featured && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-azimut-red text-white text-xs font-bold rounded-full">
                        ⭐ Destaque
                      </span>
                    )}
                    {post.category && (
                      <span
                        className="absolute top-3 right-3 px-3 py-1 text-white text-xs font-bold rounded-full"
                        style={{ backgroundColor: post.category.color }}
                      >
                        {post.category.name}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-azimut-red transition-colors text-theme-text">
                      {post.title}
                    </h2>
                    <p className="text-sm mb-4 line-clamp-3 text-theme-text-secondary">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-theme-text-muted">
                      <div className="flex items-center gap-3">
                        <span>📅 {formatDate(post.publishedAt)}</span>
                        {post.readingTime && (
                          <span>⏱️ {post.readingTime} {t.minRead}</span>
                        )}
                      </div>
                      <span>👁️ {post.viewCount}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-10">
                <button
                  onClick={() => fetchPosts(offset)}
                  disabled={loading}
                  className="px-8 py-3 bg-azimut-red text-white font-semibold rounded-full hover:bg-azimut-red/90 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? '...' : t.loadMore}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
