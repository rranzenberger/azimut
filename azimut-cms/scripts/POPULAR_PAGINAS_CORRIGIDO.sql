-- ═══════════════════════════════════════════════════════════════════════════
-- 🚀 POPULAR PÁGINAS AZIMUT - SQL CORRIGIDO PARA PRISMA
-- ═══════════════════════════════════════════════════════════════════════════
-- Tabela correta: "Page" (com P maiúsculo, padrão Prisma)
-- ═══════════════════════════════════════════════════════════════════════════

-- PÁGINAS PRINCIPAIS
INSERT INTO "Page" (id, name, slug, status, "heroSloganPt", "heroSloganEn", "heroSloganEs", "heroSloganFr", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'Home', 'home', 'PUBLISHED', 
   'Experiências que Conectam Mundos', 'Experiences that Connect Worlds',
   'Experiencias que Conectan Mundos', 'Expériences qui Connectent les Mondes',
   NOW(), NOW()),
  
  (gen_random_uuid(), 'Projetos', 'work', 'PUBLISHED', 
   'Nosso Portfólio', 'Our Portfolio', 'Nuestro Portafolio', 'Notre Portfolio',
   NOW(), NOW()),
  
  (gen_random_uuid(), 'Soluções', 'what', 'PUBLISHED', 
   'O Que Fazemos', 'What We Do', 'Lo Que Hacemos', 'Ce Que Nous Faisons',
   NOW(), NOW()),
  
  (gen_random_uuid(), 'Estúdio', 'studio', 'PUBLISHED', 
   'Nosso Estúdio', 'Our Studio', 'Nuestro Estudio', 'Notre Studio',
   NOW(), NOW()),
  
  (gen_random_uuid(), 'Academy', 'academy', 'PUBLISHED', 
   'Academia Azimut', 'Azimut Academy', 'Academia Azimut', 'Académie Azimut',
   NOW(), NOW()),
  
  (gen_random_uuid(), 'Contato', 'contact', 'PUBLISHED', 
   'Vamos Conversar', 'Let''s Talk', 'Hablemos', 'Parlons',
   NOW(), NOW()),
  
  (gen_random_uuid(), 'Vancouver', 'vancouver', 'PUBLISHED', 
   'Sua Jornada Começa Aqui', 'Your Journey Starts Here', 
   'Tu Viaje Comienza Aquí', 'Votre Voyage Commence Ici',
   NOW(), NOW())

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════════════════
-- SOLUÇÕES - 16 SUBPÁGINAS
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO "Page" (id, name, slug, status, "heroSloganPt", "heroSloganEn", "heroSloganEs", "heroSloganFr", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'Cinema & Audiovisual', 'what/cinema-audiovisual', 'PUBLISHED', 
   'Narrativas cinematográficas que conectam audiências',
   'Cinematic narratives that connect audiences',
   'Narrativas cinematográficas que conectan audiencias',
   'Récits cinématographiques qui connectent les audiences',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Pós-Produção & VFX', 'what/pos-producao-vfx', 'PUBLISHED',
   'Efeitos visuais que transformam imaginação em realidade',
   'Visual effects that transform imagination into reality',
   'Efectos visuales que transforman la imaginación en realidad',
   'Effets visuels qui transforment l''imagination en réalité',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Animação 2D & 3D', 'what/animacao-2d-3d', 'PUBLISHED',
   'Personagens e mundos que ganham vida',
   'Characters and worlds that come to life',
   'Personajes y mundos que cobran vida',
   'Personnages et mondes qui prennent vie',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'XR, Interatividade & Web3', 'what/xr-interatividade-web3', 'PUBLISHED',
   'Experiências imersivas para o futuro digital',
   'Immersive experiences for the digital future',
   'Experiencias inmersivas para el futuro digital',
   'Expériences immersives pour l''avenir numérique',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Cenografia & Design Espacial', 'what/cenografia-design-espacial', 'PUBLISHED',
   'Espaços que contam histórias',
   'Spaces that tell stories',
   'Espacios que cuentan historias',
   'Espaces qui racontent des histoires',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Games & Interativos', 'what/games-interativos', 'PUBLISHED',
   'Jogos e experiências interativas memoráveis',
   'Memorable games and interactive experiences',
   'Juegos y experiencias interactivas memorables',
   'Jeux et expériences interactives mémorables',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'IA Criativa', 'what/ia-criativa', 'PUBLISHED',
   'Inteligência artificial a serviço da criatividade',
   'Artificial intelligence at the service of creativity',
   'Inteligencia artificial al servicio de la creatividad',
   'L''intelligence artificielle au service de la créativité',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Direção de Arte Criativa', 'what/direcao-arte-criativa', 'PUBLISHED',
   'Visão artística que define experiências',
   'Artistic vision that defines experiences',
   'Visión artística que define experiencias',
   'Vision artistique qui définit les expériences',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Consultoria & Estratégia', 'what/consultoria-estrategia', 'PUBLISHED',
   'Estratégias criativas para resultados reais',
   'Creative strategies for real results',
   'Estrategias creativas para resultados reales',
   'Stratégies créatives pour des résultats réels',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Teatro & Espetáculos Imersivos', 'what/teatro-espetaculos-imersivos', 'PUBLISHED',
   'Espetáculos que envolvem todos os sentidos',
   'Shows that engage all senses',
   'Espectáculos que involucran todos los sentidos',
   'Spectacles qui engagent tous les sens',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Branded Experiences & Ativações', 'what/branded-experiences-ativacoes', 'PUBLISHED',
   'Experiências de marca que conectam pessoas',
   'Brand experiences that connect people',
   'Experiencias de marca que conectan personas',
   'Expériences de marque qui connectent les gens',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Museus & Exposições', 'what/museus-exposicoes', 'PUBLISHED',
   'Experiências museológicas interativas e imersivas',
   'Interactive and immersive museum experiences',
   'Experiencias museológicas interactivas e inmersivas',
   'Expériences muséales interactives et immersives',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Festivais, Curadoria & Eventos', 'what/festivais-curadoria-eventos', 'PUBLISHED',
   'Curadoria e produção de eventos memoráveis',
   'Curation and production of memorable events',
   'Curaduría y producción de eventos memorables',
   'Curation et production d''événements mémorables',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Educação & Treinamento', 'what/educacao-treinamento', 'PUBLISHED',
   'Aprendizado imersivo e transformador',
   'Immersive and transformative learning',
   'Aprendizaje inmersivo y transformador',
   'Apprentissage immersif et transformateur',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Realidade Virtual (VR)', 'what/realidade-virtual-vr', 'PUBLISHED',
   'Mundos virtuais para experiências reais',
   'Virtual worlds for real experiences',
   'Mundos virtuales para experiencias reales',
   'Mondes virtuels pour des expériences réelles',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Arquitetura Virtual & BIM', 'what/arquitetura-virtual-bim', 'PUBLISHED',
   'Visualização arquitetônica de alta fidelidade',
   'High-fidelity architectural visualization',
   'Visualización arquitectónica de alta fidelidad',
   'Visualisation architecturale haute fidélité',
   NOW(), NOW())

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  "heroSloganPt" = EXCLUDED."heroSloganPt",
  "heroSloganEn" = EXCLUDED."heroSloganEn",
  "heroSloganEs" = EXCLUDED."heroSloganEs",
  "heroSloganFr" = EXCLUDED."heroSloganFr",
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════════════════
-- ESTÚDIO - SUBPÁGINAS
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO "Page" (id, name, slug, status, "heroSloganPt", "heroSloganEn", "heroSloganEs", "heroSloganFr", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'Equipe', 'studio/team', 'PUBLISHED',
   'Nossa Equipe', 'Our Team', 'Nuestro Equipo', 'Notre Équipe',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Sobre Nós', 'studio/about', 'PUBLISHED',
   'Sobre Nós', 'About Us', 'Sobre Nosotros', 'À Propos de Nous',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Credenciais', 'studio/credentials', 'PUBLISHED',
   'Nossas Credenciais', 'Our Credentials', 'Nuestras Credenciales', 'Nos Références',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Diferenciais', 'studio/diferenciais', 'PUBLISHED',
   'Nossos Diferenciais', 'Our Differentials', 'Nuestros Diferenciales', 'Nos Différenciateurs',
   NOW(), NOW())

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  "heroSloganPt" = EXCLUDED."heroSloganPt",
  "heroSloganEn" = EXCLUDED."heroSloganEn",
  "heroSloganEs" = EXCLUDED."heroSloganEs",
  "heroSloganFr" = EXCLUDED."heroSloganFr",
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════════════════
-- ACADEMY - SUBPÁGINAS
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO "Page" (id, name, slug, status, "heroSloganPt", "heroSloganEn", "heroSloganEs", "heroSloganFr", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'Cursos', 'academy/courses', 'PUBLISHED',
   'Cursos de VR, VFX e Motion Design', 'VR, VFX and Motion Design Courses',
   'Cursos de VR, VFX y Motion Design', 'Cours de VR, VFX et Motion Design',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Workshops', 'academy/workshops', 'PUBLISHED',
   'Workshops Práticos e Imersivos', 'Practical and Immersive Workshops',
   'Talleres Prácticos e Inmersivos', 'Ateliers Pratiques et Immersifs',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Corporate', 'academy/corporate', 'PUBLISHED',
   'Treinamentos Corporativos Personalizados', 'Customized Corporate Training',
   'Capacitaciones Corporativas Personalizadas', 'Formations Corporate Sur Mesure',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Vancouver', 'academy/vancouver', 'PUBLISHED',
   'Estude em Vancouver', 'Study in Vancouver',
   'Estudia en Vancouver', 'Étudiez à Vancouver',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Pesquisa', 'academy/research', 'PUBLISHED',
   'Explorando Fronteiras da Narrativa', 'Exploring Narrative Frontiers',
   'Explorando Fronteras de la Narrativa', 'Explorer les Frontières du Récit',
   NOW(), NOW())

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  "heroSloganPt" = EXCLUDED."heroSloganPt",
  "heroSloganEn" = EXCLUDED."heroSloganEn",
  "heroSloganEs" = EXCLUDED."heroSloganEs",
  "heroSloganFr" = EXCLUDED."heroSloganFr",
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════════════════
-- PROJETOS - SUBPÁGINAS INICIAIS
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO "Page" (id, name, slug, status, "heroSloganPt", "heroSloganEn", "heroSloganEs", "heroSloganFr", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'Museu Olímpico do Rio', 'work/museu-olimpico-rio', 'PUBLISHED',
   'Experiência Imersiva Olímpica', 'Olympic Immersive Experience',
   'Experiencia Inmersiva Olímpica', 'Expérience Immersive Olympique',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Festival de Gramado - VR', 'work/festival-gramado-vr', 'PUBLISHED',
   'Curadoria VR desde 2017', 'VR Curation since 2017',
   'Curaduría VR desde 2017', 'Curation VR depuis 2017',
   NOW(), NOW())

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  "heroSloganPt" = EXCLUDED."heroSloganPt",
  "heroSloganEn" = EXCLUDED."heroSloganEn",
  "heroSloganEs" = EXCLUDED."heroSloganEs",
  "heroSloganFr" = EXCLUDED."heroSloganFr",
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════════════════
-- OUTRAS PÁGINAS
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO "Page" (id, name, slug, status, "heroSloganPt", "heroSloganEn", "heroSloganEs", "heroSloganFr", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'Blog', 'blog', 'DRAFT',
   'Novidades, Insights e Bastidores', 'News, Insights and Behind the Scenes',
   'Novedades, Insights y Bastidores', 'Actualités, Insights et Coulisses',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Newsletter', 'newsletter', 'DRAFT',
   'Receba nossas novidades em primeira mão', 'Get our news first hand',
   'Recibe nuestras novedades de primera mano', 'Recevez nos actualités en avant-première',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Imprensa', 'press', 'PUBLISHED',
   'Sala de Imprensa', 'Press Room', 'Sala de Prensa', 'Salle de Presse',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Privacidade', 'privacy', 'PUBLISHED',
   'Política de Privacidade', 'Privacy Policy',
   'Política de Privacidad', 'Politique de Confidentialité',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Termos de Uso', 'terms', 'PUBLISHED',
   'Termos de Uso', 'Terms of Use', 'Términos de Uso', 'Conditions d''Utilisation',
   NOW(), NOW()),
   
  (gen_random_uuid(), 'Obrigado', 'thank-you', 'PUBLISHED',
   'Mensagem Enviada com Sucesso!', 'Message Sent Successfully!',
   '¡Mensaje Enviado con Éxito!', 'Message Envoyé avec Succès!',
   NOW(), NOW())

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  "heroSloganPt" = EXCLUDED."heroSloganPt",
  "heroSloganEn" = EXCLUDED."heroSloganEn",
  "heroSloganEs" = EXCLUDED."heroSloganEs",
  "heroSloganFr" = EXCLUDED."heroSloganFr",
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════════════════
-- VERIFICAR RESULTADO
-- ═══════════════════════════════════════════════════════════════════════════

SELECT slug, name, status FROM "Page" ORDER BY slug;
