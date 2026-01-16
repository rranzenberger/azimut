import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  seoTitle: string;
  seoDesc: string;
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
  shareCount: number;
}

interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  readingTime: number | null;
  publishedAt: string;
}

const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://azimut-backoffice.vercel.app';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const texts = {
    pt: {
      backToBlog: '← Voltar ao Blog',
      minRead: 'min de leitura',
      views: 'visualizações',
      shares: 'compartilhamentos',
      shareOn: 'Compartilhar em',
      relatedPosts: 'Artigos Relacionados',
      notFound: 'Artigo não encontrado',
      notFoundDesc: 'O artigo que você procura não existe ou foi removido.',
    },
    en: {
      backToBlog: '← Back to Blog',
      minRead: 'min read',
      views: 'views',
      shares: 'shares',
      shareOn: 'Share on',
      relatedPosts: 'Related Posts',
      notFound: 'Article not found',
      notFoundDesc: 'The article you are looking for does not exist or has been removed.',
    },
    es: {
      backToBlog: '← Volver al Blog',
      minRead: 'min de lectura',
      views: 'visualizaciones',
      shares: 'compartidos',
      shareOn: 'Compartir en',
      relatedPosts: 'Artículos Relacionados',
      notFound: 'Artículo no encontrado',
      notFoundDesc: 'El artículo que buscas no existe o ha sido eliminado.',
    },
    fr: {
      backToBlog: '← Retour au Blog',
      minRead: 'min de lecture',
      views: 'vues',
      shares: 'partages',
      shareOn: 'Partager sur',
      relatedPosts: 'Articles Connexes',
      notFound: 'Article non trouvé',
      notFoundDesc: "L'article que vous recherchez n'existe pas ou a été supprimé.",
    },
  };

  const t = texts[language] || texts.pt;

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug, language]);

  async function fetchPost() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKOFFICE_URL}/api/public/blog/${slug}?lang=${language}`);
      
      if (!res.ok) {
        setError('not_found');
        setLoading(false);
        return;
      }

      const data = await res.json();
      setPost(data.post);
      setRelated(data.related || []);

      // Update page title
      if (data.post?.seoTitle) {
        document.title = data.post.seoTitle;
      }
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('error');
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : 'pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post?.title || '';

  const isDark = theme === 'dark';

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#050814]' : 'bg-[#d3cec3]'}`}>
        <div className={`animate-pulse ${isDark ? 'text-white/50' : 'text-black/50'}`}>
          Carregando...
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#050814]' : 'bg-[#d3cec3]'}`}>
        <div className="text-center">
          <span className="text-8xl mb-6 block">📄</span>
          <h1 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>
            {t.notFound}
          </h1>
          <p className={`mb-8 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            {t.notFoundDesc}
          </p>
          <Link
            to="/blog"
            className="inline-block px-6 py-3 bg-[#c92337] text-white font-semibold rounded-full hover:bg-[#a51d2d] transition-colors"
          >
            {t.backToBlog}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#050814]' : 'bg-[#d3cec3]'}`}>
      {/* Hero with Cover Image */}
      <section className="relative">
        {post.coverImage && (
          <div className="absolute inset-0 h-[50vh] overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 ${
              isDark
                ? 'bg-gradient-to-b from-transparent via-[#050814]/70 to-[#050814]'
                : 'bg-gradient-to-b from-transparent via-[#d3cec3]/70 to-[#d3cec3]'
            }`} />
          </div>
        )}

        <div className="container mx-auto px-4 md:px-8 relative z-10 pt-32 pb-12">
          {/* Back Link */}
          <Link
            to="/blog"
            className={`inline-flex items-center gap-2 mb-8 text-sm font-medium hover:text-[#c92337] transition-colors ${
              isDark ? 'text-white/70' : 'text-black/70'
            }`}
          >
            {t.backToBlog}
          </Link>

          {/* Category */}
          {post.category && (
            <span
              className="inline-block px-4 py-1.5 text-white text-sm font-bold rounded-full mb-6"
              style={{ backgroundColor: post.category.color }}
            >
              {post.category.icon && <span className="mr-1">{post.category.icon}</span>}
              {post.category.name}
            </span>
          )}

          {/* Title */}
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl ${
              isDark ? 'text-white' : 'text-[#0f172a]'
            }`}
            style={{ fontFamily: 'HandelGothic, sans-serif' }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div className={`flex flex-wrap items-center gap-4 text-sm ${
            isDark ? 'text-white/60' : 'text-black/60'
          }`}>
            {post.author.name && (
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <img
                    src={post.author.image}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="font-medium">{post.author.name}</span>
              </div>
            )}
            <span>📅 {formatDate(post.publishedAt)}</span>
            {post.readingTime && (
              <span>⏱️ {post.readingTime} {t.minRead}</span>
            )}
            <span>👁️ {post.viewCount} {t.views}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="container mx-auto px-4 md:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Excerpt */}
          {post.excerpt && (
            <p className={`text-xl md:text-2xl mb-8 leading-relaxed ${
              isDark ? 'text-white/80' : 'text-black/80'
            }`}>
              {post.excerpt}
            </p>
          )}

          {/* Markdown Content */}
          <div
            className={`prose prose-lg max-w-none ${
              isDark
                ? 'prose-invert prose-headings:text-white prose-p:text-white/80 prose-a:text-[#c92337] prose-strong:text-white prose-code:text-[#c92337]'
                : 'prose-slate prose-headings:text-[#0f172a] prose-p:text-black/80 prose-a:text-[#c92337] prose-strong:text-[#0f172a] prose-code:text-[#c92337]'
            }`}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content || ''}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    to={`/blog?tag=${tag.slug}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isDark
                        ? 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                        : 'bg-black/5 text-black/70 hover:bg-black/10 hover:text-black'
                    }`}
                  >
                    #{tag.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className={`text-sm font-medium mb-4 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
              {t.shareOn}:
            </p>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1DA1F2] text-white hover:opacity-80 transition-opacity"
              >
                𝕏
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0A66C2] text-white hover:opacity-80 transition-opacity"
              >
                in
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:opacity-80 transition-opacity"
              >
                f
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#25D366] text-white hover:opacity-80 transition-opacity"
              >
                W
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className={`py-16 ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
          <div className="container mx-auto px-4 md:px-8">
            <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>
              {t.relatedPosts}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className={`group block rounded-2xl overflow-hidden transition-all duration-300 ${
                    isDark
                      ? 'bg-[#0a0f1a] hover:bg-[#101520]'
                      : 'bg-white hover:shadow-lg'
                  }`}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    {relatedPost.coverImage ? (
                      <img
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center text-4xl ${
                        isDark ? 'bg-white/5' : 'bg-black/5'
                      }`}>
                        📄
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className={`font-bold mb-2 line-clamp-2 group-hover:text-[#c92337] transition-colors ${
                      isDark ? 'text-white' : 'text-[#0f172a]'
                    }`}>
                      {relatedPost.title}
                    </h3>
                    <div className={`text-xs ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                      {relatedPost.readingTime && (
                        <span>⏱️ {relatedPost.readingTime} {t.minRead}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
