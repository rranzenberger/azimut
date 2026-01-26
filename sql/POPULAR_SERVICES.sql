-- ═══════════════════════════════════════════════════════════════
-- POPULAR TABELA Service NO BACKOFFICE
-- ═══════════════════════════════════════════════════════════════
-- Descrição: Popula todos os serviços da Azimut com textos em 4 idiomas
--            e categorias de filtro (segments) para sistema de busca
-- 
-- Uso: psql -U postgres -d azimut_db -f sql/POPULAR_SERVICES.sql
-- ═══════════════════════════════════════════════════════════════

-- Limpar dados existentes (CUIDADO: só rodar se for recriar tudo)
-- DELETE FROM "Service";

-- ═══════════════════════════════════════════════════════════════
-- 1. CINEMA & AUDIOVISUAL
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Service" (
  id, slug, status, priority,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  icon, segments,
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'cinema-audiovisual',
  'PUBLISHED',
  1,
  'Cinema & Audiovisual',
  'Cinema & Audiovisual',
  'Cine & Audiovisual',
  'Cinéma & Audiovisuel',
  'Produção cinematográfica e audiovisual completa, da pré-produção à pós-produção. Criamos narrativas visuais impactantes para cinema, streaming, instituições culturais e marcas.',
  'Complete film and audiovisual production, from pre to post-production. We create impactful visual narratives for cinema, streaming, cultural institutions and brands.',
  'Producción cinematográfica y audiovisual completa, desde preproducción hasta posproducción. Creamos narrativas visuales impactantes para cine, streaming, instituciones culturales y marcas.',
  'Production cinématographique et audiovisuelle complète, de la pré à la post-production. Nous créons des récits visuels percutants pour cinéma, streaming, institutions culturelles et marques.',
  '🎬',
  ARRAY['cinema', 'audiovisual', 'production', 'narrative'],
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  "titlePt" = EXCLUDED."titlePt",
  "titleEn" = EXCLUDED."titleEn",
  "titleEs" = EXCLUDED."titleEs",
  "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt",
  "descriptionEn" = EXCLUDED."descriptionEn",
  "descriptionEs" = EXCLUDED."descriptionEs",
  "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon,
  segments = EXCLUDED.segments,
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════
-- 2. REALIDADE VIRTUAL & XR
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Service" (
  id, slug, status, priority,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  icon, segments,
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'realidade-virtual-vr',
  'PUBLISHED',
  2,
  'Realidade Virtual & XR',
  'Virtual Reality & XR',
  'Realidad Virtual & XR',
  'Réalité Virtuelle & XR',
  'Experiências imersivas em VR, AR e XR para eventos, museus, treinamentos e entretenimento. Desde narrativas 360° até aplicações interativas personalizadas.',
  'Immersive experiences in VR, AR and XR for events, museums, training and entertainment. From 360° narratives to custom interactive applications.',
  'Experiencias inmersivas en VR, AR y XR para eventos, museos, capacitación y entretenimiento. Desde narrativas 360° hasta aplicaciones interactivas personalizadas.',
  'Expériences immersives en VR, AR et XR pour événements, musées, formation et divertissement. Des récits 360° aux applications interactives personnalisées.',
  '🥽',
  ARRAY['vr', 'xr', 'ar', 'immersive', 'interactive', '360'],
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  "titlePt" = EXCLUDED."titlePt",
  "titleEn" = EXCLUDED."titleEn",
  "titleEs" = EXCLUDED."titleEs",
  "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt",
  "descriptionEn" = EXCLUDED."descriptionEn",
  "descriptionEs" = EXCLUDED."descriptionEs",
  "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon,
  segments = EXCLUDED.segments,
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════
-- 3. PÓS-PRODUÇÃO & VFX
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Service" (
  id, slug, status, priority,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  icon, segments,
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'pos-producao-vfx',
  'PUBLISHED',
  3,
  'Pós-Produção & VFX',
  'Post-Production & VFX',
  'Posproducción & VFX',
  'Post-Production & VFX',
  'VFX, motion design, animação 3D e compositing para projetos audiovisuais. Integramos IA generativa para otimizar pipelines e criar efeitos visuais inovadores.',
  'VFX, motion design, 3D animation and compositing for audiovisual projects. We integrate generative AI to optimize pipelines and create innovative visual effects.',
  'VFX, motion design, animación 3D y compositing para proyectos audiovisuales. Integramos IA generativa para optimizar pipelines y crear efectos visuales innovadores.',
  'VFX, motion design, animation 3D et compositing pour projets audiovisuels. Nous intégrons IA générative pour optimiser pipelines et créer effets visuels innovants.',
  '✨',
  ARRAY['vfx', 'motion', 'animation', '3d', 'compositing', 'post-production'],
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  "titlePt" = EXCLUDED."titlePt",
  "titleEn" = EXCLUDED."titleEn",
  "titleEs" = EXCLUDED."titleEs",
  "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt",
  "descriptionEn" = EXCLUDED."descriptionEn",
  "descriptionEs" = EXCLUDED."descriptionEs",
  "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon,
  segments = EXCLUDED.segments,
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════
-- 4. MUSEUS & EXPOSIÇÕES
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Service" (
  id, slug, status, priority,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  icon, segments,
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'museus-exposicoes',
  'PUBLISHED',
  4,
  'Museus & Exposições',
  'Museums & Exhibitions',
  'Museos & Exposiciones',
  'Musées & Expositions',
  'Conteúdo audiovisual e interativo para museus, exposições e espaços culturais. Integramos storytelling, tecnologia e design para criar experiências memoráveis.',
  'Audiovisual and interactive content for museums, exhibitions and cultural spaces. We integrate storytelling, technology and design to create memorable experiences.',
  'Contenido audiovisual e interactivo para museos, exposiciones y espacios culturales. Integramos storytelling, tecnología y diseño para crear experiencias memorables.',
  'Contenu audiovisuel et interactif pour musées, expositions et espaces culturels. Nous intégrons storytelling, technologie et design pour créer expériences mémorables.',
  '🏛️',
  ARRAY['museum', 'exhibition', 'cultural', 'interactive', 'installation'],
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  "titlePt" = EXCLUDED."titlePt",
  "titleEn" = EXCLUDED."titleEn",
  "titleEs" = EXCLUDED."titleEs",
  "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt",
  "descriptionEn" = EXCLUDED."descriptionEn",
  "descriptionEs" = EXCLUDED."descriptionEs",
  "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon,
  segments = EXCLUDED.segments,
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════
-- 5. INTELIGÊNCIA ARTIFICIAL
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Service" (
  id, slug, status, priority,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  icon, segments,
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'inteligencia-artificial',
  'PUBLISHED',
  5,
  'Inteligência Artificial',
  'Artificial Intelligence',
  'Inteligencia Artificial',
  'Intelligence Artificielle',
  'Integração de IA generativa em projetos audiovisuais e criativos. Otimizamos pipelines de produção, criamos conteúdo assistido por IA e desenvolvemos estratégias de adoção tecnológica.',
  'Integration of generative AI in audiovisual and creative projects. We optimize production pipelines, create AI-assisted content and develop technology adoption strategies.',
  'Integración de IA generativa en proyectos audiovisuales y creativos. Optimizamos pipelines de producción, creamos contenido asistido por IA y desarrollamos estrategias de adopción tecnológica.',
  'Intégration de l\'IA générative dans projets audiovisuels et créatifs. Nous optimisons pipelines de production, créons contenu assisté par IA et développons stratégies d\'adoption technologique.',
  '🤖',
  ARRAY['ai', 'generative', 'technology', 'innovation', 'automation'],
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  "titlePt" = EXCLUDED."titlePt",
  "titleEn" = EXCLUDED."titleEn",
  "titleEs" = EXCLUDED."titleEs",
  "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt",
  "descriptionEn" = EXCLUDED."descriptionEn",
  "descriptionEs" = EXCLUDED."descriptionEs",
  "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon,
  segments = EXCLUDED.segments,
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════
-- 6. CONSULTORIA & ESTRATÉGIA (COM CATEGORIAS DE EDUCAÇÃO)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Service" (
  id, slug, status, priority,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  icon, segments,
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'consultoria-estrategia',
  'PUBLISHED',
  6,
  'Consultoria & Estratégia',
  'Consulting & Strategy',
  'Consultoría & Estrategia',
  'Conseil & Stratégie',
  'Acompanhamos projetos desde a concepção até a execução. Nossa experiência em captação de recursos, estratégia de IA e treinamento corporativo permite que clientes realizem projetos inovadores e capacitem suas equipes.',
  'We accompany projects from conception to execution. Our experience in resource acquisition, AI strategy and corporate training allows clients to realize innovative projects and train their teams.',
  'Acompañamos proyectos desde la concepción hasta la ejecución. Nuestra experiencia en captación de recursos, estrategia de IA y capacitación corporativa permite que clientes realicen proyectos innovadores y capaciten sus equipos.',
  'Nous accompagnons les projets de la conception à l''exécution. Notre expérience en acquisition de ressources, stratégie IA et formation d''entreprise permet aux clients de réaliser des projets innovants et former leurs équipes.',
  '💡',
  ARRAY['consulting', 'strategy', 'funding', 'management', 'education', 'training', 'corporate'],
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  "titlePt" = EXCLUDED."titlePt",
  "titleEn" = EXCLUDED."titleEn",
  "titleEs" = EXCLUDED."titleEs",
  "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt",
  "descriptionEn" = EXCLUDED."descriptionEn",
  "descriptionEs" = EXCLUDED."descriptionEs",
  "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon,
  segments = EXCLUDED.segments,
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════
-- 7. EDUCAÇÃO & TREINAMENTO
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Service" (
  id, slug, status, priority,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  icon, segments,
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'educacao-treinamento',
  'PUBLISHED',
  7,
  'Educação & Treinamento',
  'Education & Training',
  'Educación & Capacitación',
  'Éducation & Formation',
  'Cursos profissionalizantes, workshops e treinamentos corporativos em tecnologias imersivas, IA e audiovisual. Com 30 anos de experiência, formamos profissionais e capacitamos equipes.',
  'Professional courses, workshops and corporate training in immersive technologies, AI and audiovisual. With 30 years of experience, we train professionals and qualify teams.',
  'Cursos profesionales, workshops y capacitación corporativa en tecnologías inmersivas, IA y audiovisual. Con 30 años de experiencia, formamos profesionales y capacitamos equipos.',
  'Cours professionnels, ateliers et formation d''entreprise en technologies immersives, IA et audiovisuel. Avec 30 ans d''expérience, nous formons professionnels et qualifions équipes.',
  '🎓',
  ARRAY['education', 'training', 'workshop', 'course', 'corporate', 'academy'],
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  "titlePt" = EXCLUDED."titlePt",
  "titleEn" = EXCLUDED."titleEn",
  "titleEs" = EXCLUDED."titleEs",
  "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt",
  "descriptionEn" = EXCLUDED."descriptionEn",
  "descriptionEs" = EXCLUDED."descriptionEs",
  "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon,
  segments = EXCLUDED.segments,
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════
-- 8. CURADORIA & FESTIVAIS
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Service" (
  id, slug, status, priority,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  icon, segments,
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'curadoria-festivais',
  'PUBLISHED',
  8,
  'Curadoria & Festivais',
  'Curation & Festivals',
  'Curaduría & Festivales',
  'Curation & Festivals',
  'Curadoria especializada em VR, cinema e arte digital para festivais e eventos culturais. Desde 2017, curamos conteúdo imersivo para o Festival de Gramado.',
  'Specialized curation in VR, cinema and digital art for festivals and cultural events. Since 2017, we curate immersive content for Festival de Gramado.',
  'Curaduría especializada en VR, cine y arte digital para festivales y eventos culturales. Desde 2017, curamos contenido inmersivo para Festival de Gramado.',
  'Curation spécialisée en VR, cinéma et art numérique pour festivals et événements culturels. Depuis 2017, nous curons contenu immersif pour Festival de Gramado.',
  '🎪',
  ARRAY['curation', 'festival', 'vr', 'cultural', 'event'],
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  "titlePt" = EXCLUDED."titlePt",
  "titleEn" = EXCLUDED."titleEn",
  "titleEs" = EXCLUDED."titleEs",
  "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt",
  "descriptionEn" = EXCLUDED."descriptionEn",
  "descriptionEs" = EXCLUDED."descriptionEs",
  "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon,
  segments = EXCLUDED.segments,
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════
-- 9. BRANDING & DIREÇÃO DE ARTE
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Service" (
  id, slug, status, priority,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  icon, segments,
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'branding-art-direction',
  'PUBLISHED',
  9,
  'Branding & Direção de Arte',
  'Branding & Art Direction',
  'Branding & Dirección de Arte',
  'Branding & Direction Artistique',
  'Identidade visual, direção de arte e design para projetos culturais, institucionais e corporativos. Criamos marcas memoráveis com storytelling visual consistente.',
  'Visual identity, art direction and design for cultural, institutional and corporate projects. We create memorable brands with consistent visual storytelling.',
  'Identidad visual, dirección de arte y diseño para proyectos culturales, institucionales y corporativos. Creamos marcas memorables con storytelling visual consistente.',
  'Identité visuelle, direction artistique et design pour projets culturels, institutionnels et corporatifs. Nous créons marques mémorables avec storytelling visuel cohérent.',
  '🎨',
  ARRAY['branding', 'art-direction', 'design', 'visual-identity'],
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  "titlePt" = EXCLUDED."titlePt",
  "titleEn" = EXCLUDED."titleEn",
  "titleEs" = EXCLUDED."titleEs",
  "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt",
  "descriptionEn" = EXCLUDED."descriptionEn",
  "descriptionEs" = EXCLUDED."descriptionEs",
  "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon,
  segments = EXCLUDED.segments,
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════
-- 10. TEATRO & ESPETÁCULOS IMERSIVOS
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Service" (
  id, slug, status, priority,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  icon, segments,
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'teatro-espetaculos-imersivos',
  'PUBLISHED',
  10,
  'Teatro & Espetáculos Imersivos',
  'Theater & Immersive Shows',
  'Teatro & Espectáculos Inmersivos',
  'Théâtre & Spectacles Immersifs',
  'Cenografias virtuais interativas para teatro e espetáculos ao vivo. Com animações IA, painéis LED sincronizados e compositing em tempo real, integramos atores com mundos virtuais.',
  'Interactive virtual scenographies for theater and live shows. With AI animations, synchronized LED panels and real-time compositing, we integrate actors with virtual worlds.',
  'Escenografías virtuales interactivas para teatro y espectáculos en vivo. Con animaciones IA, paneles LED sincronizados y compositing en tiempo real, integramos actores con mundos virtuales.',
  'Scénographies virtuelles interactives pour théâtre et spectacles en direct. Avec animations IA, panneaux LED synchronisés et compositing temps réel, nous intégrons acteurs avec mondes virtuels.',
  '🎭',
  ARRAY['theater', 'immersive', 'live-show', 'interactive', 'led'],
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  "titlePt" = EXCLUDED."titlePt",
  "titleEn" = EXCLUDED."titleEn",
  "titleEs" = EXCLUDED."titleEs",
  "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt",
  "descriptionEn" = EXCLUDED."descriptionEn",
  "descriptionEs" = EXCLUDED."descriptionEs",
  "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon,
  segments = EXCLUDED.segments,
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════
-- VERIFICAÇÃO FINAL
-- ═══════════════════════════════════════════════════════════════
SELECT 
  slug,
  "titlePt" AS "Título PT",
  "titleEn" AS "Título EN",
  icon AS "Ícone",
  array_length(segments, 1) AS "Qtd Categorias",
  segments AS "Categorias/Filtros",
  status AS "Status",
  priority AS "Prioridade",
  "updatedAt" AS "Atualizado"
FROM "Service"
ORDER BY priority, slug;
