import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Lang } from '../i18n';

interface SearchResult {
  type: 'page' | 'service' | 'project' | 'blog';
  title: string;
  description?: string;
  url: string;
  icon: string;
}

// Dados estáticos das páginas do site
const SITE_PAGES = {
  pt: [
    { type: 'page', title: 'Home', description: 'Página inicial', url: '/', icon: '🏠' },
    { type: 'page', title: 'O que fazemos', description: 'Nossos serviços', url: '/what', icon: '🎯' },
    { type: 'page', title: 'Projetos', description: 'Portfólio de trabalhos', url: '/work', icon: '🎬' },
    { type: 'page', title: 'Estúdio', description: 'Conheça nossa equipe', url: '/studio', icon: '🎨' },
    { type: 'page', title: 'Equipe', description: 'Nossos profissionais', url: '/studio/equipe', icon: '👥' },
    { type: 'page', title: 'Credibilidade', description: 'Nossa história e conquistas', url: '/studio/credibilidade', icon: '🏆' },
    { type: 'page', title: 'Diferenciais', description: 'O que nos torna únicos', url: '/studio/diferenciais', icon: '⭐' },
    { type: 'page', title: 'Academy', description: 'Educação e formação', url: '/academy', icon: '🎓' },
    { type: 'page', title: 'Cursos', description: 'Cursos de especialização', url: '/academy/courses', icon: '📚' },
    { type: 'page', title: 'Workshops', description: 'Workshops práticos', url: '/academy/workshops', icon: '🛠️' },
    { type: 'page', title: 'Corporativo', description: 'Treinamento empresarial', url: '/academy/corporate', icon: '🏢' },
    { type: 'page', title: 'Vancouver', description: 'Programa de estudos no Canadá', url: '/academy/vancouver', icon: '🇨🇦' },
    { type: 'page', title: 'Pesquisa', description: 'Pesquisa e inovação', url: '/academy/research', icon: '🔬' },
    { type: 'page', title: 'Blog', description: 'Artigos e novidades', url: '/blog', icon: '📝' },
    { type: 'page', title: 'Contato', description: 'Fale conosco', url: '/contact', icon: '📧' },
    { type: 'page', title: 'Imprensa', description: 'Sala de imprensa', url: '/press', icon: '📰' },
  ],
  en: [
    { type: 'page', title: 'Home', description: 'Home page', url: '/', icon: '🏠' },
    { type: 'page', title: 'What We Do', description: 'Our solutions and services', url: '/what', icon: '🎯' },
    { type: 'page', title: 'Work', description: 'Project portfolio', url: '/work', icon: '🎬' },
    { type: 'page', title: 'Studio', description: 'Meet our team', url: '/studio', icon: '🎨' },
    { type: 'page', title: 'Team', description: 'Our professionals', url: '/studio/equipe', icon: '👥' },
    { type: 'page', title: 'Credentials', description: 'Our history and achievements', url: '/studio/credibilidade', icon: '🏆' },
    { type: 'page', title: 'Differentials', description: 'What makes us unique', url: '/studio/diferenciais', icon: '⭐' },
    { type: 'page', title: 'Academy', description: 'Education and training', url: '/academy', icon: '🎓' },
    { type: 'page', title: 'Courses', description: 'Specialization courses', url: '/academy/courses', icon: '📚' },
    { type: 'page', title: 'Workshops', description: 'Hands-on workshops', url: '/academy/workshops', icon: '🛠️' },
    { type: 'page', title: 'Corporate', description: 'Corporate training', url: '/academy/corporate', icon: '🏢' },
    { type: 'page', title: 'Vancouver', description: 'Study program in Canada', url: '/academy/vancouver', icon: '🇨🇦' },
    { type: 'page', title: 'Research', description: 'Research and innovation', url: '/academy/research', icon: '🔬' },
    { type: 'page', title: 'Blog', description: 'Articles and news', url: '/blog', icon: '📝' },
    { type: 'page', title: 'Contact', description: 'Get in touch', url: '/contact', icon: '📧' },
    { type: 'page', title: 'Press', description: 'Press room', url: '/press', icon: '📰' },
  ],
  es: [
    { type: 'page', title: 'Inicio', description: 'Página principal', url: '/', icon: '🏠' },
    { type: 'page', title: 'Qué hacemos', description: 'Nuestras soluciones', url: '/what', icon: '🎯' },
    { type: 'page', title: 'Proyectos', description: 'Portafolio', url: '/work', icon: '🎬' },
    { type: 'page', title: 'Estudio', description: 'Conoce al equipo', url: '/studio', icon: '🎨' },
    { type: 'page', title: 'Academy', description: 'Educación', url: '/academy', icon: '🎓' },
    { type: 'page', title: 'Blog', description: 'Artículos y novedades', url: '/blog', icon: '📝' },
    { type: 'page', title: 'Contacto', description: 'Contáctenos', url: '/contact', icon: '📧' },
  ],
  fr: [
    { type: 'page', title: 'Accueil', description: 'Page d\'accueil', url: '/', icon: '🏠' },
    { type: 'page', title: 'Ce que nous faisons', description: 'Nos solutions', url: '/what', icon: '🎯' },
    { type: 'page', title: 'Projets', description: 'Portfolio', url: '/work', icon: '🎬' },
    { type: 'page', title: 'Studio', description: 'Rencontrez l\'équipe', url: '/studio', icon: '🎨' },
    { type: 'page', title: 'Academy', description: 'Formation', url: '/academy', icon: '🎓' },
    { type: 'page', title: 'Blog', description: 'Articles et actualités', url: '/blog', icon: '📝' },
    { type: 'page', title: 'Contact', description: 'Contactez-nous', url: '/contact', icon: '📧' },
  ],
};

// Soluções/Serviços
const SERVICES = {
  pt: [
    { type: 'service', title: 'Realidade Virtual (VR)', description: 'Experiências imersivas em VR', url: '/what/vr-virtual-reality', icon: '🥽' },
    { type: 'service', title: 'Realidade Aumentada (AR)', description: 'Overlay digital no mundo real', url: '/what/ar-augmented-reality', icon: '📱' },
    { type: 'service', title: 'Inteligência Artificial', description: 'Serviços com IA generativa', url: '/what/ai-artificial-intelligence', icon: '🤖' },
    { type: 'service', title: 'Cinema e Audiovisual', description: 'Produção cinematográfica', url: '/what/cinema-audiovisual', icon: '🎬' },
    { type: 'service', title: 'Design de Exposições', description: 'Cenografia para museus', url: '/what/exhibition-design', icon: '🏛️' },
    { type: 'service', title: 'Instalações Interativas', description: 'Experiências interativas', url: '/what/interactive-installations', icon: '✨' },
    { type: 'service', title: 'Digital Signage', description: 'Sinalização digital', url: '/what/digital-signage', icon: '📺' },
    { type: 'service', title: 'Tecnologia para Eventos', description: 'Shows e eventos', url: '/what/event-technology', icon: '🎪' },
  ],
  en: [
    { type: 'service', title: 'Virtual Reality (VR)', description: 'Immersive VR experiences', url: '/what/vr-virtual-reality', icon: '🥽' },
    { type: 'service', title: 'Augmented Reality (AR)', description: 'Digital overlay on real world', url: '/what/ar-augmented-reality', icon: '📱' },
    { type: 'service', title: 'Artificial Intelligence', description: 'Generative AI solutions', url: '/what/ai-artificial-intelligence', icon: '🤖' },
    { type: 'service', title: 'Cinema & Audiovisual', description: 'Film production', url: '/what/cinema-audiovisual', icon: '🎬' },
    { type: 'service', title: 'Exhibition Design', description: 'Museum scenography', url: '/what/exhibition-design', icon: '🏛️' },
    { type: 'service', title: 'Interactive Installations', description: 'Interactive experiences', url: '/what/interactive-installations', icon: '✨' },
    { type: 'service', title: 'Digital Signage', description: 'Digital signage', url: '/what/digital-signage', icon: '📺' },
    { type: 'service', title: 'Event Technology', description: 'Shows and events', url: '/what/event-technology', icon: '🎪' },
  ],
};

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;  // Renomeado para consistência com App.tsx
  theme: 'light' | 'dark';
}

export default function GlobalSearch({ isOpen, onClose, lang, theme }: GlobalSearchProps) {
  // Usar 'lang' diretamente, criar alias 'language' para compatibilidade interna
  const language = lang
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';

  // Combinar páginas e serviços
  const allItems = useMemo(() => {
    const pages = SITE_PAGES[language] || SITE_PAGES.pt;
    const services = SERVICES[language] || SERVICES.pt;
    return [...pages, ...services] as SearchResult[];
  }, [language]);

  // Filtrar resultados
  const results = useMemo(() => {
    if (!query.trim()) {
      // Mostrar páginas principais quando não há busca
      return allItems.slice(0, 8);
    }

    const lowerQuery = query.toLowerCase();
    return allItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(lowerQuery) ||
          item.description?.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 10);
  }, [query, allItems]);

  // Focus no input quando abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            handleSelect(results[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  // Scroll item selecionado para view
  useEffect(() => {
    if (resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const handleSelect = (item: SearchResult) => {
    const url = `/${language}${item.url}`;
    navigate(url);
    onClose();
  };

  const texts = {
    pt: {
      placeholder: 'Buscar páginas, serviços, projetos...',
      noResults: 'Nenhum resultado encontrado',
      tip: 'Pressione ↵ para selecionar, ↑↓ para navegar, Esc para fechar',
      pages: 'Páginas',
      services: 'Serviços',
    },
    en: {
      placeholder: 'Search pages, services, projects...',
      noResults: 'No results found',
      tip: 'Press ↵ to select, ↑↓ to navigate, Esc to close',
      pages: 'Pages',
      services: 'Services',
    },
    es: {
      placeholder: 'Buscar páginas, servicios, proyectos...',
      noResults: 'No se encontraron resultados',
      tip: 'Presione ↵ para seleccionar, ↑↓ para navegar, Esc para cerrar',
      pages: 'Páginas',
      services: 'Servicios',
    },
    fr: {
      placeholder: 'Rechercher pages, services, projets...',
      noResults: 'Aucun résultat trouvé',
      tip: 'Appuyez sur ↵ pour sélectionner, ↑↓ pour naviguer, Esc pour fermer',
      pages: 'Pages',
      services: 'Services',
    },
  };

  const t = texts[language] || texts.pt;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed inset-x-4 top-[15vh] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-[9999]"
      >
        <div
          className={`rounded-2xl overflow-hidden shadow-2xl ${
            isDark
              ? 'bg-[#0a0f1a] border border-white/10'
              : 'bg-white border border-black/10'
          }`}
          style={{
            animation: 'fadeInScale 0.2s ease-out',
          }}
        >
          {/* Search Input */}
          <div className={`flex items-center gap-3 px-5 py-4 border-b ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}>
            <svg
              className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-white/40' : 'text-black/40'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder={t.placeholder}
              className={`flex-1 bg-transparent border-none outline-none text-lg ${
                isDark ? 'text-white placeholder:text-white/40' : 'text-black placeholder:text-black/40'
              }`}
            />
            <kbd className={`hidden md:inline-flex items-center px-2 py-1 text-xs rounded ${
              isDark ? 'bg-white/10 text-white/50' : 'bg-black/10 text-black/50'
            }`}>
              Esc
            </kbd>
          </div>

          {/* Results */}
          <div
            ref={resultsRef}
            className="max-h-[50vh] overflow-y-auto"
          >
            {results.length === 0 ? (
              <div className={`px-5 py-8 text-center ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                {t.noResults}
              </div>
            ) : (
              results.map((item, index) => (
                <button
                  key={`${item.type}-${item.url}`}
                  onClick={() => handleSelect(item)}
                  className={`w-full flex items-center gap-4 px-5 py-3 text-left transition-colors ${
                    index === selectedIndex
                      ? isDark
                        ? 'bg-[#c92337]/20'
                        : 'bg-[#c92337]/10'
                      : isDark
                        ? 'hover:bg-white/5'
                        : 'hover:bg-black/5'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold truncate ${
                      isDark ? 'text-white' : 'text-black'
                    }`}>
                      {item.title}
                    </div>
                    {item.description && (
                      <div className={`text-sm truncate ${
                        isDark ? 'text-white/50' : 'text-black/50'
                      }`}>
                        {item.description}
                      </div>
                    )}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    item.type === 'service'
                      ? 'bg-[#c92337]/20 text-[#c92337]'
                      : isDark
                        ? 'bg-white/10 text-white/50'
                        : 'bg-black/10 text-black/50'
                  }`}>
                    {item.type === 'service' ? t.services : t.pages}
                  </span>
                </button>
              ))
            )}
          </div>

          {/* Footer Tip */}
          <div className={`px-5 py-3 text-xs border-t ${
            isDark ? 'border-white/10 text-white/40' : 'border-black/10 text-black/40'
          }`}>
            {t.tip}
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
}
