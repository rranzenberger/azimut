import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

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

const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://azimut-backoffice.vercel.app';

export default function Blog() {
  const { language } = useLanguage();
  const { theme } = useTheme();
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
    <div className={`min-h-screen ${isDark ? 'bg-[#050814]' : 'bg-[#d3cec3]'}`}>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Star */}
        <img
          src="/logo-azimut-star.svg"
          alt=""
          className="absolute -right-28 -bottom-40 md:-right-40 md:-bottom-60 h-[520px] w-[520px] md:h-[680px] md:w-[680px] opacity-30 pointer-events-none -z-5"
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 
              className={`text-5xl md:text-7xl font-bold mb-6 ${isDark ? 'text-white' : 'text-[#0f172a]'}`}
              style={{ fontFamily: 'HandelGothic, sans-serif' }}
            >
              {t.title}
            </h1>
            <p className={`text-xl md:text-2xl ${isDark ? 'text-[#d3cec3]' : 'text-[#1e3a5f]'}`}>
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      {categories.length > 0 && (
        <section className="container mx-auto px-4 md:px-8 mb-12">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === ''
                  ? 'bg-[#c92337] text-white'
                  : isDark
                    ? 'bg-white/5 text-white/70 hover:bg-white/10'
                    : 'bg-black/5 text-black/70 hover:bg-black/10'
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
                    : isDark
                      ? 'bg-white/5 text-white/70 hover:bg-white/10'
                      : 'bg-black/5 text-black/70 hover:bg-black/10'
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
      <section className="container mx-auto px-4 md:px-8 pb-20">
        {loading && posts.length === 0 ? (
          <div className="text-center py-20">
            <div className={`animate-pulse ${isDark ? 'text-white/50' : 'text-black/50'}`}>
              Carregando...
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">📝</span>
            <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>
              {t.noPosts}
            </h3>
            <p className={isDark ? 'text-white/60' : 'text-black/60'}>{t.noPostsDesc}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className={`group block rounded-2xl overflow-hidden transition-all duration-500 ${
                    isDark
                      ? 'bg-gradient-to-br from-[#0a0f1a] to-[#1a1f2e] hover:shadow-2xl hover:shadow-[#c92337]/10'
                      : 'bg-white hover:shadow-2xl hover:shadow-black/10'
                  } ${post.featured ? 'ring-2 ring-[#c92337]/50' : ''}`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.coverImageAlt || post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center text-6xl ${
                        isDark ? 'bg-white/5' : 'bg-black/5'
                      }`}>
                        📄
                      </div>
                    )}
                    {post.featured && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-[#c92337] text-white text-xs font-bold rounded-full">
                        ⭐ Destaque
                      </span>
                    )}
                    {post.category && (
                      <span
                        className="absolute top-4 right-4 px-3 py-1 text-white text-xs font-bold rounded-full"
                        style={{ backgroundColor: post.category.color }}
                      >
                        {post.category.name}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className={`text-xl font-bold mb-3 line-clamp-2 group-hover:text-[#c92337] transition-colors ${
                      isDark ? 'text-white' : 'text-[#0f172a]'
                    }`}>
                      {post.title}
                    </h2>
                    <p className={`text-sm mb-4 line-clamp-3 ${
                      isDark ? 'text-white/60' : 'text-black/60'
                    }`}>
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className={`flex items-center justify-between text-xs ${
                      isDark ? 'text-white/40' : 'text-black/40'
                    }`}>
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
              <div className="text-center mt-12">
                <button
                  onClick={() => fetchPosts(offset)}
                  disabled={loading}
                  className="px-8 py-4 bg-[#c92337] text-white font-semibold rounded-full hover:bg-[#a51d2d] transition-all duration-300 disabled:opacity-50"
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
