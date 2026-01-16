-- ═══════════════════════════════════════════════════════════════
-- POPULAR SUBPÁGINAS DE SOLUÇÕES (WHAT)
-- Execute este SQL no Neon Console (SQL Editor)
-- ═══════════════════════════════════════════════════════════════

-- INSERIR TODAS AS 16 SUBPÁGINAS DE SOLUÇÕES
-- Usando ON CONFLICT para não duplicar se já existir

INSERT INTO pages (id, name, slug, status, hero_slogan_pt, hero_slogan_en, hero_slogan_es, hero_slogan_fr, created_at, updated_at)
VALUES
  -- 1. Cinema & Audiovisual
  (gen_random_uuid(), 'Cinema & Audiovisual', 'what/cinema-audiovisual', 'PUBLISHED', 
   'Narrativas cinematográficas que conectam audiências',
   'Cinematic narratives that connect audiences',
   'Narrativas cinematográficas que conectan audiencias',
   'Récits cinématographiques qui connectent les audiences',
   NOW(), NOW()),
   
  -- 2. Pós-Produção & VFX
  (gen_random_uuid(), 'Pós-Produção & VFX', 'what/pos-producao-vfx', 'PUBLISHED',
   'Efeitos visuais que transformam imaginação em realidade',
   'Visual effects that transform imagination into reality',
   'Efectos visuales que transforman la imaginación en realidad',
   'Effets visuels qui transforment l''imagination en réalité',
   NOW(), NOW()),
   
  -- 3. Animação 2D & 3D
  (gen_random_uuid(), 'Animação 2D & 3D', 'what/animacao-2d-3d', 'PUBLISHED',
   'Personagens e mundos que ganham vida',
   'Characters and worlds that come to life',
   'Personajes y mundos que cobran vida',
   'Personnages et mondes qui prennent vie',
   NOW(), NOW()),
   
  -- 4. XR, Interatividade & Web3
  (gen_random_uuid(), 'XR, Interatividade & Web3', 'what/xr-interatividade-web3', 'PUBLISHED',
   'Experiências imersivas para o futuro digital',
   'Immersive experiences for the digital future',
   'Experiencias inmersivas para el futuro digital',
   'Expériences immersives pour l''avenir numérique',
   NOW(), NOW()),
   
  -- 5. Cenografia & Design Espacial
  (gen_random_uuid(), 'Cenografia & Design Espacial', 'what/cenografia-design-espacial', 'PUBLISHED',
   'Espaços que contam histórias',
   'Spaces that tell stories',
   'Espacios que cuentan historias',
   'Espaces qui racontent des histoires',
   NOW(), NOW()),
   
  -- 6. Games & Interativos
  (gen_random_uuid(), 'Games & Interativos', 'what/games-interativos', 'PUBLISHED',
   'Jogos e experiências interativas memoráveis',
   'Memorable games and interactive experiences',
   'Juegos y experiencias interactivas memorables',
   'Jeux et expériences interactives mémorables',
   NOW(), NOW()),
   
  -- 7. IA Criativa
  (gen_random_uuid(), 'IA Criativa', 'what/ia-criativa', 'PUBLISHED',
   'Inteligência artificial a serviço da criatividade',
   'Artificial intelligence at the service of creativity',
   'Inteligencia artificial al servicio de la creatividad',
   'L''intelligence artificielle au service de la créativité',
   NOW(), NOW()),
   
  -- 8. Direção de Arte Criativa
  (gen_random_uuid(), 'Direção de Arte Criativa', 'what/direcao-arte-criativa', 'PUBLISHED',
   'Visão artística que define experiências',
   'Artistic vision that defines experiences',
   'Visión artística que define experiencias',
   'Vision artistique qui définit les expériences',
   NOW(), NOW()),
   
  -- 9. Consultoria & Estratégia
  (gen_random_uuid(), 'Consultoria & Estratégia', 'what/consultoria-estrategia', 'PUBLISHED',
   'Estratégias criativas para resultados reais',
   'Creative strategies for real results',
   'Estrategias creativas para resultados reales',
   'Stratégies créatives pour des résultats réels',
   NOW(), NOW()),
   
  -- 10. Teatro & Espetáculos Imersivos
  (gen_random_uuid(), 'Teatro & Espetáculos Imersivos', 'what/teatro-espetaculos-imersivos', 'PUBLISHED',
   'Espetáculos que envolvem todos os sentidos',
   'Shows that engage all senses',
   'Espectáculos que involucran todos los sentidos',
   'Spectacles qui engagent tous les sens',
   NOW(), NOW()),
   
  -- 11. Branded Experiences & Ativações
  (gen_random_uuid(), 'Branded Experiences & Ativações', 'what/branded-experiences-ativacoes', 'PUBLISHED',
   'Experiências de marca que conectam pessoas',
   'Brand experiences that connect people',
   'Experiencias de marca que conectan personas',
   'Expériences de marque qui connectent les gens',
   NOW(), NOW()),
   
  -- 12. Museus & Exposições
  (gen_random_uuid(), 'Museus & Exposições', 'what/museus-exposicoes', 'PUBLISHED',
   'Experiências museológicas interativas e imersivas',
   'Interactive and immersive museum experiences',
   'Experiencias museológicas interactivas e inmersivas',
   'Expériences muséales interactives et immersives',
   NOW(), NOW()),
   
  -- 13. Festivais, Curadoria & Eventos
  (gen_random_uuid(), 'Festivais, Curadoria & Eventos', 'what/festivais-curadoria-eventos', 'PUBLISHED',
   'Curadoria e produção de eventos memoráveis',
   'Curation and production of memorable events',
   'Curaduría y producción de eventos memorables',
   'Curation et production d''événements mémorables',
   NOW(), NOW()),
   
  -- 14. Educação & Treinamento
  (gen_random_uuid(), 'Educação & Treinamento', 'what/educacao-treinamento', 'PUBLISHED',
   'Aprendizado imersivo e transformador',
   'Immersive and transformative learning',
   'Aprendizaje inmersivo y transformador',
   'Apprentissage immersif et transformateur',
   NOW(), NOW()),
   
  -- 15. Realidade Virtual (VR)
  (gen_random_uuid(), 'Realidade Virtual (VR)', 'what/realidade-virtual-vr', 'PUBLISHED',
   'Mundos virtuais para experiências reais',
   'Virtual worlds for real experiences',
   'Mundos virtuales para experiencias reales',
   'Mondes virtuels pour des expériences réelles',
   NOW(), NOW()),
   
  -- 16. Arquitetura Virtual & BIM
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

-- ═══════════════════════════════════════════════════════════════
-- PÁGINAS FUTURAS (Blog, Newsletter)
-- ═══════════════════════════════════════════════════════════════

INSERT INTO pages (id, name, slug, status, hero_slogan_pt, hero_slogan_en, hero_slogan_es, hero_slogan_fr, created_at, updated_at)
VALUES
  -- Blog (futuro)
  (gen_random_uuid(), 'Blog', 'blog', 'DRAFT',
   'Novidades, insights e bastidores',
   'News, insights and behind the scenes',
   'Novedades, insights y bastidores',
   'Actualités, insights et coulisses',
   NOW(), NOW()),
   
  -- Newsletter (futuro)
  (gen_random_uuid(), 'Newsletter', 'newsletter', 'DRAFT',
   'Receba nossas novidades e projetos em primeira mão',
   'Get our news and projects first hand',
   'Recibe nuestras novedades y proyectos de primera mano',
   'Recevez nos actualités et projets en avant-première',
   NOW(), NOW())

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  hero_slogan_pt = EXCLUDED.hero_slogan_pt,
  hero_slogan_en = EXCLUDED.hero_slogan_en,
  hero_slogan_es = EXCLUDED.hero_slogan_es,
  hero_slogan_fr = EXCLUDED.hero_slogan_fr,
  updated_at = NOW();

-- ═══════════════════════════════════════════════════════════════
-- VERIFICAR RESULTADO
-- ═══════════════════════════════════════════════════════════════

SELECT slug, name, status FROM pages ORDER BY slug;
