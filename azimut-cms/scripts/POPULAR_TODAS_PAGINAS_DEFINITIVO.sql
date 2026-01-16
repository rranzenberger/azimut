-- ═══════════════════════════════════════════════════════════════════════════
-- 🚀 POPULAR TODAS AS PÁGINAS DO SITE AZIMUT - DEFINITIVO
-- ═══════════════════════════════════════════════════════════════════════════
-- Execute este SQL no Neon Console (Vercel → Storage → Neon → SQL Editor)
-- Data: 16 de Janeiro de 2026
-- ═══════════════════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════════════════
-- 1. PÁGINAS PRINCIPAIS (se não existirem)
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO pages (id, name, slug, status, hero_slogan_pt, hero_slogan_en, hero_slogan_es, hero_slogan_fr, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'Home', 'home', 'PUBLISHED', 
   'Experiências que Conectam Mundos', 
   'Experiences that Connect Worlds',
   'Experiencias que Conectan Mundos',
   'Expériences qui Connectent les Mondes',
   NOW(), NOW()),
  
  (gen_random_uuid(), 'Projetos', 'work', 'PUBLISHED', 
   'Nosso Portfólio', 
   'Our Portfolio',
   'Nuestro Portafolio',
   'Notre Portfolio',
   NOW(), NOW()),
  
  (gen_random_uuid(), 'Soluções', 'what', 'PUBLISHED', 
   'O Que Fazemos', 
   'What We Do',
   'Lo Que Hacemos',
   'Ce Que Nous Faisons',
   NOW(), NOW()),
  
  (gen_random_uuid(), 'Estúdio', 'studio', 'PUBLISHED', 
   'Nosso Estúdio', 
   'Our Studio',
   'Nuestro Estudio',
   'Notre Studio',
   NOW(), NOW()),
  
  (gen_random_uuid(), 'Academy', 'academy', 'PUBLISHED', 
   'Academia Azimut', 
   'Azimut Academy',
   'Academia Azimut',
   'Académie Azimut',
   NOW(), NOW()),
  
  (gen_random_uuid(), 'Contato', 'contact', 'PUBLISHED', 
   'Vamos Conversar', 
   'Let''s Talk',
   'Hablemos',
   'Parlons',
   NOW(), NOW()),
  
  (gen_random_uuid(), 'Vancouver', 'vancouver', 'PUBLISHED', 
   'Sua Jornada Começa Aqui', 
   'Your Journey Starts Here',
   'Tu Viaje Comienza Aquí',
   'Votre Voyage Commence Ici',
   NOW(), NOW())

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  updated_at = NOW();

-- ═══════════════════════════════════════════════════════════════════════════
-- 2. SOLUÇÕES - 16 SUBPÁGINAS (what/)
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO pages (id, name, slug, status, hero_slogan_pt, hero_slogan_en, hero_slogan_es, hero_slogan_fr, created_at, updated_at)
VALUES
  -- 🎬 1. Cinema & Audiovisual
  (gen_random_uuid(), 'Cinema & Audiovisual', 'what/cinema-audiovisual', 'PUBLISHED', 
   'Narrativas cinematográficas que conectam audiências',
   'Cinematic narratives that connect audiences',
   'Narrativas cinematográficas que conectan audiencias',
   'Récits cinématographiques qui connectent les audiences',
   NOW(), NOW()),
   
  -- 🎞️ 2. Pós-Produção & VFX
  (gen_random_uuid(), 'Pós-Produção & VFX', 'what/pos-producao-vfx', 'PUBLISHED',
   'Efeitos visuais que transformam imaginação em realidade',
   'Visual effects that transform imagination into reality',
   'Efectos visuales que transforman la imaginación en realidad',
   'Effets visuels qui transforment l''imagination en réalité',
   NOW(), NOW()),
   
  -- 🎨 3. Animação 2D & 3D
  (gen_random_uuid(), 'Animação 2D & 3D', 'what/animacao-2d-3d', 'PUBLISHED',
   'Personagens e mundos que ganham vida',
   'Characters and worlds that come to life',
   'Personajes y mundos que cobran vida',
   'Personnages et mondes qui prennent vie',
   NOW(), NOW()),
   
  -- 🌐 4. XR, Interatividade & Web3
  (gen_random_uuid(), 'XR, Interatividade & Web3', 'what/xr-interatividade-web3', 'PUBLISHED',
   'Experiências imersivas para o futuro digital',
   'Immersive experiences for the digital future',
   'Experiencias inmersivas para el futuro digital',
   'Expériences immersives pour l''avenir numérique',
   NOW(), NOW()),
   
  -- 🏗️ 5. Cenografia & Design Espacial
  (gen_random_uuid(), 'Cenografia & Design Espacial', 'what/cenografia-design-espacial', 'PUBLISHED',
   'Espaços que contam histórias',
   'Spaces that tell stories',
   'Espacios que cuentan historias',
   'Espaces qui racontent des histoires',
   NOW(), NOW()),
   
  -- 🎮 6. Games & Interativos
  (gen_random_uuid(), 'Games & Interativos', 'what/games-interativos', 'PUBLISHED',
   'Jogos e experiências interativas memoráveis',
   'Memorable games and interactive experiences',
   'Juegos y experiencias interactivas memorables',
   'Jeux et expériences interactives mémorables',
   NOW(), NOW()),
   
  -- 🤖 7. IA Criativa
  (gen_random_uuid(), 'IA Criativa', 'what/ia-criativa', 'PUBLISHED',
   'Inteligência artificial a serviço da criatividade',
   'Artificial intelligence at the service of creativity',
   'Inteligencia artificial al servicio de la creatividad',
   'L''intelligence artificielle au service de la créativité',
   NOW(), NOW()),
   
  -- 🎭 8. Direção de Arte Criativa
  (gen_random_uuid(), 'Direção de Arte Criativa', 'what/direcao-arte-criativa', 'PUBLISHED',
   'Visão artística que define experiências',
   'Artistic vision that defines experiences',
   'Visión artística que define experiencias',
   'Vision artistique qui définit les expériences',
   NOW(), NOW()),
   
  -- 💡 9. Consultoria & Estratégia
  (gen_random_uuid(), 'Consultoria & Estratégia', 'what/consultoria-estrategia', 'PUBLISHED',
   'Estratégias criativas para resultados reais',
   'Creative strategies for real results',
   'Estrategias creativas para resultados reales',
   'Stratégies créatives pour des résultats réels',
   NOW(), NOW()),
   
  -- 🎭 10. Teatro & Espetáculos Imersivos
  (gen_random_uuid(), 'Teatro & Espetáculos Imersivos', 'what/teatro-espetaculos-imersivos', 'PUBLISHED',
   'Espetáculos que envolvem todos os sentidos',
   'Shows that engage all senses',
   'Espectáculos que involucran todos los sentidos',
   'Spectacles qui engagent tous les sens',
   NOW(), NOW()),
   
  -- 🎯 11. Branded Experiences & Ativações
  (gen_random_uuid(), 'Branded Experiences & Ativações', 'what/branded-experiences-ativacoes', 'PUBLISHED',
   'Experiências de marca que conectam pessoas',
   'Brand experiences that connect people',
   'Experiencias de marca que conectan personas',
   'Expériences de marque qui connectent les gens',
   NOW(), NOW()),
   
  -- 🏛️ 12. Museus & Exposições
  (gen_random_uuid(), 'Museus & Exposições', 'what/museus-exposicoes', 'PUBLISHED',
   'Experiências museológicas interativas e imersivas',
   'Interactive and immersive museum experiences',
   'Experiencias museológicas interactivas e inmersivas',
   'Expériences muséales interactives et immersives',
   NOW(), NOW()),
   
  -- 🎪 13. Festivais, Curadoria & Eventos
  (gen_random_uuid(), 'Festivais, Curadoria & Eventos', 'what/festivais-curadoria-eventos', 'PUBLISHED',
   'Curadoria e produção de eventos memoráveis',
   'Curation and production of memorable events',
   'Curaduría y producción de eventos memorables',
   'Curation et production d''événements mémorables',
   NOW(), NOW()),
   
  -- 🎓 14. Educação & Treinamento
  (gen_random_uuid(), 'Educação & Treinamento', 'what/educacao-treinamento', 'PUBLISHED',
   'Aprendizado imersivo e transformador',
   'Immersive and transformative learning',
   'Aprendizaje inmersivo y transformador',
   'Apprentissage immersif et transformateur',
   NOW(), NOW()),
   
  -- 🥽 15. Realidade Virtual (VR)
  (gen_random_uuid(), 'Realidade Virtual (VR)', 'what/realidade-virtual-vr', 'PUBLISHED',
   'Mundos virtuais para experiências reais',
   'Virtual worlds for real experiences',
   'Mundos virtuales para experiencias reales',
   'Mondes virtuels pour des expériences réelles',
   NOW(), NOW()),
   
  -- 🏗️ 16. Arquitetura Virtual & BIM
  (gen_random_uuid(), 'Arquitetura Virtual & BIM', 'what/arquitetura-virtual-bim', 'PUBLISHED',
   'Visualização arquitetônica de alta fidelidade',
   'High-fidelity architectural visualization',
   'Visualización arquitectónica de alta fidelidad',
   'Visualisation architecturale haute fidélité',
   NOW(), NOW())

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  hero_slogan_pt = EXCLUDED.hero_slogan_pt,
  hero_slogan_en = EXCLUDED.hero_slogan_en,
  hero_slogan_es = EXCLUDED.hero_slogan_es,
  hero_slogan_fr = EXCLUDED.hero_slogan_fr,
  updated_at = NOW();

-- ═══════════════════════════════════════════════════════════════════════════
-- 3. ESTÚDIO - 3 SUBPÁGINAS (studio/)
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO pages (id, name, slug, status, hero_slogan_pt, hero_slogan_en, hero_slogan_es, hero_slogan_fr, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'Equipe', 'studio/team', 'PUBLISHED',
   'Nossa Equipe',
   'Our Team',
   'Nuestro Equipo',
   'Notre Équipe',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Sobre Nós', 'studio/about', 'PUBLISHED',
   'Sobre Nós',
   'About Us',
   'Sobre Nosotros',
   'À Propos de Nous',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Credenciais', 'studio/credentials', 'PUBLISHED',
   'Nossas Credenciais',
   'Our Credentials',
   'Nuestras Credenciales',
   'Nos Références',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Diferenciais', 'studio/diferenciais', 'PUBLISHED',
   'Nossos Diferenciais',
   'Our Differentials',
   'Nuestros Diferenciales',
   'Nos Différenciateurs',
   NOW(), NOW())

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  hero_slogan_pt = EXCLUDED.hero_slogan_pt,
  hero_slogan_en = EXCLUDED.hero_slogan_en,
  hero_slogan_es = EXCLUDED.hero_slogan_es,
  hero_slogan_fr = EXCLUDED.hero_slogan_fr,
  updated_at = NOW();

-- ═══════════════════════════════════════════════════════════════════════════
-- 4. ACADEMY - 5 SUBPÁGINAS (academy/)
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO pages (id, name, slug, status, hero_slogan_pt, hero_slogan_en, hero_slogan_es, hero_slogan_fr, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'Cursos', 'academy/courses', 'PUBLISHED',
   'Cursos de VR, VFX e Motion Design',
   'VR, VFX and Motion Design Courses',
   'Cursos de VR, VFX y Motion Design',
   'Cours de VR, VFX et Motion Design',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Workshops', 'academy/workshops', 'PUBLISHED',
   'Workshops Práticos e Imersivos',
   'Practical and Immersive Workshops',
   'Talleres Prácticos e Inmersivos',
   'Ateliers Pratiques et Immersifs',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Corporate', 'academy/corporate', 'PUBLISHED',
   'Treinamentos Corporativos Personalizados',
   'Customized Corporate Training',
   'Capacitaciones Corporativas Personalizadas',
   'Formations Corporate Sur Mesure',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Vancouver', 'academy/vancouver', 'PUBLISHED',
   'Estude em Vancouver',
   'Study in Vancouver',
   'Estudia en Vancouver',
   'Étudiez à Vancouver',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Pesquisa', 'academy/research', 'PUBLISHED',
   'Explorando Fronteiras da Narrativa',
   'Exploring Narrative Frontiers',
   'Explorando Fronteras de la Narrativa',
   'Explorer les Frontières du Récit',
   NOW(), NOW())

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  hero_slogan_pt = EXCLUDED.hero_slogan_pt,
  hero_slogan_en = EXCLUDED.hero_slogan_en,
  hero_slogan_es = EXCLUDED.hero_slogan_es,
  hero_slogan_fr = EXCLUDED.hero_slogan_fr,
  updated_at = NOW();

-- ═══════════════════════════════════════════════════════════════════════════
-- 5. PROJETOS - PRINCIPAIS (work/) - Expandir conforme novos projetos
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO pages (id, name, slug, status, hero_slogan_pt, hero_slogan_en, hero_slogan_es, hero_slogan_fr, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'Museu Olímpico do Rio', 'work/museu-olimpico-rio', 'PUBLISHED',
   'Experiência Imersiva Olímpica',
   'Olympic Immersive Experience',
   'Experiencia Inmersiva Olímpica',
   'Expérience Immersive Olympique',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Festival de Gramado - VR', 'work/festival-gramado-vr', 'PUBLISHED',
   'Curadoria VR desde 2017',
   'VR Curation since 2017',
   'Curaduría VR desde 2017',
   'Curation VR depuis 2017',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Exposição Digital Montreal', 'work/exposicao-digital-montreal', 'DRAFT',
   'Narrativa Espacial com AR',
   'Spatial Narrative with AR',
   'Narrativa Espacial con AR',
   'Narration Spatiale avec AR',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Filme VR 360°', 'work/filme-vr-360', 'DRAFT',
   'Experiência Virtual Imersiva',
   'Immersive Virtual Experience',
   'Experiencia Virtual Inmersiva',
   'Expérience Virtuelle Immersive',
   NOW(), NOW())

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  hero_slogan_pt = EXCLUDED.hero_slogan_pt,
  hero_slogan_en = EXCLUDED.hero_slogan_en,
  hero_slogan_es = EXCLUDED.hero_slogan_es,
  hero_slogan_fr = EXCLUDED.hero_slogan_fr,
  updated_at = NOW();

-- ═══════════════════════════════════════════════════════════════════════════
-- 6. OUTRAS PÁGINAS (Blog, Newsletter, Legal, etc.)
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO pages (id, name, slug, status, hero_slogan_pt, hero_slogan_en, hero_slogan_es, hero_slogan_fr, created_at, updated_at)
VALUES
  -- 📝 Blog
  (gen_random_uuid(), 'Blog', 'blog', 'DRAFT',
   'Novidades, Insights e Bastidores',
   'News, Insights and Behind the Scenes',
   'Novedades, Insights y Bastidores',
   'Actualités, Insights et Coulisses',
   NOW(), NOW()),
   
  -- 📬 Newsletter
  (gen_random_uuid(), 'Newsletter', 'newsletter', 'DRAFT',
   'Receba nossas novidades em primeira mão',
   'Get our news first hand',
   'Recibe nuestras novedades de primera mano',
   'Recevez nos actualités en avant-première',
   NOW(), NOW()),
   
  -- 📰 Imprensa
  (gen_random_uuid(), 'Imprensa', 'press', 'PUBLISHED',
   'Sala de Imprensa',
   'Press Room',
   'Sala de Prensa',
   'Salle de Presse',
   NOW(), NOW()),
   
  -- 📄 Privacidade
  (gen_random_uuid(), 'Privacidade', 'privacy', 'PUBLISHED',
   'Política de Privacidade',
   'Privacy Policy',
   'Política de Privacidad',
   'Politique de Confidentialité',
   NOW(), NOW()),
   
  -- 📄 Termos
  (gen_random_uuid(), 'Termos de Uso', 'terms', 'PUBLISHED',
   'Termos de Uso',
   'Terms of Use',
   'Términos de Uso',
   'Conditions d''Utilisation',
   NOW(), NOW()),
   
  -- 🎓 Webinars
  (gen_random_uuid(), 'Webinars', 'webinars', 'DRAFT',
   'Webinars e Eventos Online',
   'Webinars and Online Events',
   'Webinars y Eventos Online',
   'Webinaires et Événements en Ligne',
   NOW(), NOW()),
   
  -- ✅ Thank You
  (gen_random_uuid(), 'Obrigado', 'thank-you', 'PUBLISHED',
   'Mensagem Enviada com Sucesso!',
   'Message Sent Successfully!',
   '¡Mensaje Enviado con Éxito!',
   'Message Envoyé avec Succès!',
   NOW(), NOW())

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  hero_slogan_pt = EXCLUDED.hero_slogan_pt,
  hero_slogan_en = EXCLUDED.hero_slogan_en,
  hero_slogan_es = EXCLUDED.hero_slogan_es,
  hero_slogan_fr = EXCLUDED.hero_slogan_fr,
  updated_at = NOW();

-- ═══════════════════════════════════════════════════════════════════════════
-- 7. VERIFICAR RESULTADO FINAL
-- ═══════════════════════════════════════════════════════════════════════════

SELECT 
  slug, 
  name, 
  status,
  CASE 
    WHEN slug LIKE 'what/%' THEN '💡 Solução'
    WHEN slug LIKE 'work/%' THEN '🎬 Projeto'
    WHEN slug LIKE 'studio/%' THEN '🎨 Estúdio'
    WHEN slug LIKE 'academy/%' THEN '🎓 Academy'
    WHEN slug LIKE 'blog/%' THEN '📝 Blog'
    ELSE '📄 Página'
  END as tipo
FROM pages 
ORDER BY 
  CASE 
    WHEN slug = 'home' THEN 1
    WHEN slug = 'work' THEN 2
    WHEN slug LIKE 'work/%' THEN 3
    WHEN slug = 'what' THEN 4
    WHEN slug LIKE 'what/%' THEN 5
    WHEN slug = 'studio' THEN 6
    WHEN slug LIKE 'studio/%' THEN 7
    WHEN slug = 'academy' THEN 8
    WHEN slug LIKE 'academy/%' THEN 9
    WHEN slug = 'blog' THEN 10
    WHEN slug LIKE 'blog/%' THEN 11
    ELSE 99
  END,
  slug;

-- ═══════════════════════════════════════════════════════════════════════════
-- 📊 RESUMO DO QUE FOI CRIADO
-- ═══════════════════════════════════════════════════════════════════════════
-- 
-- PÁGINAS PRINCIPAIS: 7
--   • home, work, what, studio, academy, contact, vancouver
--
-- SOLUÇÕES (what/): 16
--   • cinema-audiovisual, pos-producao-vfx, animacao-2d-3d, 
--   • xr-interatividade-web3, cenografia-design-espacial, games-interativos,
--   • ia-criativa, direcao-arte-criativa, consultoria-estrategia,
--   • teatro-espetaculos-imersivos, branded-experiences-ativacoes,
--   • museus-exposicoes, festivais-curadoria-eventos, educacao-treinamento,
--   • realidade-virtual-vr, arquitetura-virtual-bim
--
-- ESTÚDIO (studio/): 4
--   • team, about, credentials, diferenciais
--
-- ACADEMY (academy/): 5
--   • courses, workshops, corporate, vancouver, research
--
-- PROJETOS (work/): 4 (expandir conforme novos projetos)
--   • museu-olimpico-rio, festival-gramado-vr, exposicao-digital-montreal, filme-vr-360
--
-- OUTRAS: 7
--   • blog, newsletter, press, privacy, terms, webinars, thank-you
--
-- TOTAL: 43 PÁGINAS
-- ═══════════════════════════════════════════════════════════════════════════
