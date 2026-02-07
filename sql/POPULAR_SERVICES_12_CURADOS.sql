-- ═══════════════════════════════════════════════════════════════
-- POPULAR BACKOFFICE COM OS 12 SERVIÇOS CURADOS (CUADORIA 2026)
-- ═══════════════════════════════════════════════════════════════
-- - Insere/atualiza apenas os 12 slugs da grid (múltiplo de 4).
-- - Arquiva os demais (status = ARCHIVED) para a API pública retornar só estes.
-- - Subpáginas: conteúdo longo pode ser editado no backoffice (campos opcionais).
--
-- Uso: executar no Neon/Postgres do backoffice (ex.: psql ou interface SQL).
-- ═══════════════════════════════════════════════════════════════

-- 1. CINEMA & AUDIOVISUAL (Produção)
INSERT INTO "Service" (
  id, slug, status, priority,
  "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  icon, segments, "createdAt", "updatedAt"
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
  'Criamos narrativas cinematográficas que conectam audiências. Do conceito à finalização, entregamos conteúdo de alta qualidade para museus, festivais e marcas, com expertise técnica de 30 anos.',
  'We create cinematic narratives that connect audiences. From concept to completion, we deliver high-quality content for museums, festivals and brands, with 30 years of technical expertise.',
  'Creamos narrativas cinematográficas que conectan audiencias. Del concepto a la finalización, entregamos contenido de alta calidad para museos, festivales y marcas, con 30 años de expertise técnica.',
  'Nous créons des récits cinématographiques qui connectent les audiences. Du concept à la finalisation, nous livrons du contenu de haute qualité pour musées, festivals et marques, avec 30 ans d''expertise technique.',
  '🎬',
  ARRAY['cinema', 'audiovisual', 'production', 'narrative'],
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  "titlePt" = EXCLUDED."titlePt", "titleEn" = EXCLUDED."titleEn", "titleEs" = EXCLUDED."titleEs", "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt", "descriptionEn" = EXCLUDED."descriptionEn", "descriptionEs" = EXCLUDED."descriptionEs", "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon, segments = EXCLUDED.segments, status = 'PUBLISHED', priority = EXCLUDED.priority, "updatedAt" = NOW();

-- 2. PÓS-PRODUÇÃO & VFX (Produção)
INSERT INTO "Service" (id, slug, status, priority, "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr", icon, segments, "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'pos-producao-vfx', 'PUBLISHED', 2,
  'Pós-Produção & VFX', 'Post-Production & VFX', 'Posproducción & VFX', 'Post-Production & VFX',
  'Fazemos desde o básico até o complexo: composição de vídeo, edição, motion design, VFX e grafismo. Pipeline completo com padrão cinematográfico para projetos de alta exigência técnica.',
  'We do everything from basic to complex: video composition, editing, motion design, VFX and graphics. Complete pipeline with cinematic standard for technically demanding projects.',
  'Hacemos desde lo básico hasta lo complejo: composición de video, edición, motion design, VFX y grafismo. Pipeline completo con estándar cinematográfico para proyectos de alta exigencia técnica.',
  'Nous faisons du basique au complexe: composition vidéo, montage, motion design, VFX et graphisme. Pipeline complet avec standard cinématographique pour projets exigeants techniquement.',
  '🎞️', ARRAY['vfx', 'motion', 'animation', '3d', 'compositing', 'post-production'], NOW(), NOW())
ON CONFLICT (slug) DO UPDATE SET "titlePt" = EXCLUDED."titlePt", "titleEn" = EXCLUDED."titleEn", "titleEs" = EXCLUDED."titleEs", "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt", "descriptionEn" = EXCLUDED."descriptionEn", "descriptionEs" = EXCLUDED."descriptionEs", "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon, segments = EXCLUDED.segments, status = 'PUBLISHED', priority = EXCLUDED.priority, "updatedAt" = NOW();

-- 3. ANIMAÇÃO 2D/3D (Produção)
INSERT INTO "Service" (id, slug, status, priority, "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr", icon, segments, "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'animacao-2d-3d', 'PUBLISHED', 3,
  'Animação 2D/3D', '2D/3D Animation', 'Animación 2D/3D', 'Animation 2D/3D',
  'Damos vida a personagens e mundos através de animação 2D/3D. Nossa expertise técnica permite criar narrativas visuais envolventes, desde storyboards até finalização completa.',
  'We bring characters and worlds to life through 2D/3D animation. Our technical expertise allows us to create engaging visual narratives, from storyboards to complete finishing.',
  'Damos vida a personajes y mundos a través de animación 2D/3D. Nuestra expertise técnica permite crear narrativas visuales envolventes, desde storyboards hasta finalización completa.',
  'Nous donnons vie aux personnages et aux mondes à travers l''animation 2D/3D. Notre expertise technique nous permet de créer des récits visuels captivants, des storyboards à la finalisation complète.',
  '🎨', ARRAY['animation', '3d', 'motion-design', 'educational'], NOW(), NOW())
ON CONFLICT (slug) DO UPDATE SET "titlePt" = EXCLUDED."titlePt", "titleEn" = EXCLUDED."titleEn", "titleEs" = EXCLUDED."titleEs", "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt", "descriptionEn" = EXCLUDED."descriptionEn", "descriptionEs" = EXCLUDED."descriptionEs", "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon, segments = EXCLUDED.segments, status = 'PUBLISHED', priority = EXCLUDED.priority, "updatedAt" = NOW();

-- 4. XR, VR & EXPERIÊNCIAS IMERSIVAS (Marcas/Tecnologia)
INSERT INTO "Service" (id, slug, status, priority, "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr", icon, segments, "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'xr-interatividade-web3', 'PUBLISHED', 4,
  'XR, VR & Experiências Imersivas', 'XR, VR & Immersive Experiences', 'XR, VR y Experiencias inmersivas', 'XR, VR & Expériences immersives',
  'Criamos experiências imersivas que conectam mundos físicos, digitais e blockchain. De VR/AR a metaverso, NFTs e instalações interativas com sensores. Pioneiros em XR desde 2015, curadores do festival Immerso XR e desenvolvedores Web3.',
  'We create immersive experiences connecting physical, digital and blockchain worlds. From VR/AR to metaverse, NFTs and interactive installations with sensors. XR pioneers since 2015, Immerso XR festival curators and Web3 developers.',
  'Creamos experiencias inmersivas que conectan mundos físicos, digitales y blockchain. De VR/AR a metaverso, NFTs e instalaciones interactivas con sensores. Pioneros XR desde 2015, curadores festival Immerso XR y desarrolladores Web3.',
  'Nous créons des expériences immersives connectant mondes physiques, numériques et blockchain. De VR/AR au métavers, NFTs et installations interactives avec capteurs. Pionniers XR depuis 2015, curateurs festival Immerso XR et développeurs Web3.',
  '🌐', ARRAY['xr', 'vr', 'ar', 'interactive', 'immersive', 'web3', 'nft', 'metaverse', 'blockchain'], NOW(), NOW())
ON CONFLICT (slug) DO UPDATE SET "titlePt" = EXCLUDED."titlePt", "titleEn" = EXCLUDED."titleEn", "titleEs" = EXCLUDED."titleEs", "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt", "descriptionEn" = EXCLUDED."descriptionEn", "descriptionEs" = EXCLUDED."descriptionEs", "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon, segments = EXCLUDED.segments, status = 'PUBLISHED', priority = EXCLUDED.priority, "updatedAt" = NOW();

-- 5. CENOGRAFIA & DESIGN ESPACIAL (Cultura/Marcas)
INSERT INTO "Service" (id, slug, status, priority, "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr", icon, segments, "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'cenografia-design-espacial', 'PUBLISHED', 5,
  'Cenografia & Design Espacial', 'Scenography & Spatial Design', 'Escenografía & Diseño Espacial', 'Scénographie & Design Spatial',
  'Projetamos espaços que contam histórias: cenografia virtual, sinalética, design gráfico e direção de arte. Integramos tecnologia, audiovisual e design para criar ambientes memoráveis.',
  'We design spaces that tell stories: virtual scenography, signage, graphic design and art direction. We integrate technology, audiovisual and design to create memorable environments.',
  'Proyectamos espacios que cuentan historias: escenografía virtual, señalética, diseño gráfico y dirección de arte. Integramos tecnología, audiovisual y diseño para crear ambientes memorables.',
  'Nous concevons des espaces qui racontent des histoires: scénographie virtuelle, signalétique, design graphique et direction artistique. Nous intégrons technologie, audiovisuel et design pour créer des environnements mémorables.',
  '🏗️', ARRAY['spatial-design', 'scenography', 'museum', 'exhibition'], NOW(), NOW())
ON CONFLICT (slug) DO UPDATE SET "titlePt" = EXCLUDED."titlePt", "titleEn" = EXCLUDED."titleEn", "titleEs" = EXCLUDED."titleEs", "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt", "descriptionEn" = EXCLUDED."descriptionEn", "descriptionEs" = EXCLUDED."descriptionEs", "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon, segments = EXCLUDED.segments, status = 'PUBLISHED', priority = EXCLUDED.priority, "updatedAt" = NOW();

-- 6. GAMES & INTERATIVOS (Produção)
INSERT INTO "Service" (id, slug, status, priority, "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr", icon, segments, "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'games-interativos', 'PUBLISHED', 6,
  'Games & Interativos', 'Games & Interactives', 'Juegos & Interactivos', 'Jeux & Interactifs',
  'Desenvolvemos jogos e experiências interativas para museus, marcas e educação. De jogos sérios a narrativas não-lineares, criamos experiências que engajam e educam.',
  'We develop games and interactive experiences for museums, brands and education. From serious games to non-linear narratives, we create experiences that engage and educate.',
  'Desarrollamos juegos y experiencias interactivas para museos, marcas y educación. De juegos serios a narrativas no lineales, creamos experiencias que engajan y educan.',
  'Nous développons des jeux et expériences interactives pour musées, marques et éducation. Des jeux sérieux aux récits non-linéaires, nous créons des expériences qui engagent et éduquent.',
  '🎮', ARRAY['games', 'interactive', 'educational', 'gamification'], NOW(), NOW())
ON CONFLICT (slug) DO UPDATE SET "titlePt" = EXCLUDED."titlePt", "titleEn" = EXCLUDED."titleEn", "titleEs" = EXCLUDED."titleEs", "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt", "descriptionEn" = EXCLUDED."descriptionEn", "descriptionEs" = EXCLUDED."descriptionEs", "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon, segments = EXCLUDED.segments, status = 'PUBLISHED', priority = EXCLUDED.priority, "updatedAt" = NOW();

-- 7. IA CRIATIVA (Tecnologia)
INSERT INTO "Service" (id, slug, status, priority, "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr", icon, segments, "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'ia-criativa', 'PUBLISHED', 7,
  'IA Criativa', 'Creative AI', 'IA Creativa', 'IA Créative',
  'Exploramos o potencial da IA generativa para narrativas. Nossa pesquisa desde 1997 e experiência prática nos permite criar pipelines únicos que combinam IA com linguagem cinematográfica tradicional.',
  'We explore the potential of generative AI for narratives. Our research since 1997 and practical experience allows us to create unique pipelines that combine AI with traditional cinematic language.',
  'Exploramos el potencial de la IA generativa para narrativas. Nuestra investigación desde 1997 y experiencia práctica nos permite crear pipelines únicos que combinan IA con lenguaje cinematográfico tradicional.',
  'Nous explorons le potentiel de l''IA générative pour les récits. Notre recherche depuis 1997 et expérience pratique nous permettent de créer des pipelines uniques qui combinent l''IA avec le langage cinématographique traditionnel.',
  '🤖', ARRAY['ai', 'research', 'innovation', 'concept-art'], NOW(), NOW())
ON CONFLICT (slug) DO UPDATE SET "titlePt" = EXCLUDED."titlePt", "titleEn" = EXCLUDED."titleEn", "titleEs" = EXCLUDED."titleEs", "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt", "descriptionEn" = EXCLUDED."descriptionEn", "descriptionEs" = EXCLUDED."descriptionEs", "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon, segments = EXCLUDED.segments, status = 'PUBLISHED', priority = EXCLUDED.priority, "updatedAt" = NOW();

-- 8. DIREÇÃO DE ARTE & BRANDING (Tecnologia)
INSERT INTO "Service" (id, slug, status, priority, "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr", icon, segments, "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'direcao-arte-criativa', 'PUBLISHED', 8,
  'Direção de Arte & Criativa', 'Art & Creative Direction', 'Dirección de Arte & Creativa', 'Direction Artistique & Créative',
  'Lideramos a visão criativa de projetos complexos: direção de arte, direção criativa e identidade visual. Coordenamos equipes multidisciplinares para garantir coerência estética e narrativa.',
  'We lead the creative vision of complex projects: art direction, creative direction and visual identity. We coordinate multidisciplinary teams to ensure aesthetic and narrative coherence.',
  'Lideramos la visión creativa de proyectos complejos: dirección de arte, dirección creativa e identidad visual. Coordinamos equipos multidisciplinares para garantizar coherencia estética y narrativa.',
  'Nous dirigeons la vision créative de projets complexes: direction artistique, direction créative et identité visuelle. Nous coordonnons des équipes multidisciplinaires pour garantir cohérence esthétique et narrative.',
  '🎭', ARRAY['art-direction', 'branding', 'museum', 'cultural'], NOW(), NOW())
ON CONFLICT (slug) DO UPDATE SET "titlePt" = EXCLUDED."titlePt", "titleEn" = EXCLUDED."titleEn", "titleEs" = EXCLUDED."titleEs", "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt", "descriptionEn" = EXCLUDED."descriptionEn", "descriptionEs" = EXCLUDED."descriptionEs", "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon, segments = EXCLUDED.segments, status = 'PUBLISHED', priority = EXCLUDED.priority, "updatedAt" = NOW();

-- 9. TEATRO & ESPETÁCULOS IMERSIVOS (Cultura)
INSERT INTO "Service" (id, slug, status, priority, "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr", icon, segments, "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'teatro-espetaculos-imersivos', 'PUBLISHED', 9,
  'Teatro & Espetáculos Imersivos', 'Theater & Immersive Shows', 'Teatro & Espectáculos Inmersivos', 'Théâtre & Spectacles Immersifs',
  'Criamos cenografias virtuais interativas para teatro e espetáculos ao vivo. Com animações geradas por IA, painéis LED sincronizados e compositing em tempo real, integramos atores com mundos virtuais em camadas visuais inovadoras.',
  'We create interactive virtual scenographies for theater and live shows. With AI-generated animations, synchronized LED panels and real-time compositing, we integrate actors with virtual worlds in innovative visual layers.',
  'Creamos escenografías virtuales interactivas para teatro y espectáculos en vivo. Con animaciones generadas por IA, paneles LED sincronizados y compositing en tiempo real, integramos actores con mundos virtuales en capas visuales innovadoras.',
  'Nous créons des scénographies virtuelles interactives pour théâtre et spectacles en direct. Avec des animations générées par IA, panneaux LED synchronisés et compositing en temps réel, nous intégrons acteurs avec mondes virtuels en couches visuelles innovantes.',
  '🎭', ARRAY['theater', 'live-events', 'led-screens', 'ai-content', 'motion-design', 'interactive'], NOW(), NOW())
ON CONFLICT (slug) DO UPDATE SET "titlePt" = EXCLUDED."titlePt", "titleEn" = EXCLUDED."titleEn", "titleEs" = EXCLUDED."titleEs", "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt", "descriptionEn" = EXCLUDED."descriptionEn", "descriptionEs" = EXCLUDED."descriptionEs", "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon, segments = EXCLUDED.segments, status = 'PUBLISHED', priority = EXCLUDED.priority, "updatedAt" = NOW();

-- 10. BRANDED EXPERIENCES & ATIVAÇÕES (Marcas)
INSERT INTO "Service" (id, slug, status, priority, "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr", icon, segments, "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'branded-experiences-ativacoes', 'PUBLISHED', 10,
  'Branded Experiences & Ativações', 'Branded Experiences & Activations', 'Branded Experiences & Activaciones', 'Expériences de Marque & Activations',
  'Criamos experiências imersivas para marcas aumentarem engajamento e vendas. Do filme 360° do Flamengo distribuído em lojas a estandes com VR em shoppings, integramos tecnologia e narrativa para ativações que convertem.',
  'We create immersive experiences for brands to increase engagement and sales. From Flamengo''s 360° film distributed in stores to VR stands in malls, we integrate technology and narrative for activations that convert.',
  'Creamos experiencias inmersivas para marcas aumentar engagement y ventas. De la película 360° del Flamengo distribuida en tiendas a estands con VR en shoppings, integramos tecnología y narrativa para activaciones que convierten.',
  'Nous créons des expériences immersives pour que les marques augmentent engagement et ventes. Du film 360° de Flamengo distribué en magasins aux stands VR en centres commerciaux, nous intégrons technologie et récit pour activations qui convertissent.',
  '🎯', ARRAY['branded', 'activation', 'vr-360', 'retail', 'marketing', 'experiential'], NOW(), NOW())
ON CONFLICT (slug) DO UPDATE SET "titlePt" = EXCLUDED."titlePt", "titleEn" = EXCLUDED."titleEn", "titleEs" = EXCLUDED."titleEs", "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt", "descriptionEn" = EXCLUDED."descriptionEn", "descriptionEs" = EXCLUDED."descriptionEs", "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon, segments = EXCLUDED.segments, status = 'PUBLISHED', priority = EXCLUDED.priority, "updatedAt" = NOW();

-- 11. CONSULTORIA & ESTRATÉGIA (Educação)
INSERT INTO "Service" (id, slug, status, priority, "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr", icon, segments, "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'consultoria-estrategia', 'PUBLISHED', 11,
  'Consultoria & Estratégia', 'Consulting & Strategy', 'Consultoría & Estrategia', 'Conseil & Stratégie',
  'Consultoria estratégica e treinamento corporativo para projetos culturais e tecnológicos. Captação de recursos via editais, estratégia de IA e capacitação de equipes em tecnologias imersivas e audiovisuais.',
  'Strategic consulting and corporate training for cultural and technological projects. Resource acquisition through grants, AI strategy and team training in immersive and audiovisual technologies.',
  'Consultoría estratégica y capacitación corporativa para proyectos culturales y tecnológicos. Captación de recursos vía convocatorias, estrategia de IA y capacitación de equipos en tecnologías inmersivas y audiovisuales.',
  'Conseil stratégique et formation d''entreprise pour projets culturels et technologiques. Acquisition de ressources via subventions, stratégie IA et formation d''équipes en technologies immersives et audiovisuelles.',
  '💡', ARRAY['consulting', 'strategy', 'funding', 'management', 'education', 'training', 'corporate'], NOW(), NOW())
ON CONFLICT (slug) DO UPDATE SET "titlePt" = EXCLUDED."titlePt", "titleEn" = EXCLUDED."titleEn", "titleEs" = EXCLUDED."titleEs", "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt", "descriptionEn" = EXCLUDED."descriptionEn", "descriptionEs" = EXCLUDED."descriptionEs", "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon, segments = EXCLUDED.segments, status = 'PUBLISHED', priority = EXCLUDED.priority, "updatedAt" = NOW();

-- 12. EDUCAÇÃO & TREINAMENTO (Educação)
INSERT INTO "Service" (id, slug, status, priority, "titlePt", "titleEn", "titleEs", "titleFr", "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr", icon, segments, "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'educacao-treinamento', 'PUBLISHED', 12,
  'Educação & Treinamento', 'Education & Training', 'Educación & Capacitación', 'Éducation & Formation',
  'Oferecemos workshops, minicursos e treinamentos em arte, tecnologia, IA, VR/XR, audiovisual, Web3 e marketing para novas mídias. Da iniciação à masterclass, formamos profissionais em tecnologias imersivas, IA generativa, blockchain, NFC e integração criativa de tecnologias emergentes.',
  'We offer workshops, short courses and training in art, technology, AI, VR/XR, audiovisual, Web3 and marketing for new media. From beginner to masterclass, we train professionals in immersive technologies, generative AI, blockchain, NFC and creative integration of emerging technologies.',
  'Ofrecemos talleres, minicursos y capacitaciones en arte, tecnología, IA, VR/XR, audiovisual, Web3 y marketing para nuevos medios. De iniciación a masterclass, formamos profesionales en tecnologías inmersivas, IA generativa, blockchain, NFC e integración creativa de tecnologías emergentes.',
  'Nous offrons ateliers, mini-cours et formations en art, technologie, IA, VR/XR, audiovisuel, Web3 et marketing pour nouveaux médias. De l''initiation à la masterclass, nous formons professionnels en technologies immersives, IA générative, blockchain, NFC et intégration créative de technologies émergentes.',
  '🎓', ARRAY['education', 'training', 'workshop', 'course', 'corporate', 'academy'], NOW(), NOW())
ON CONFLICT (slug) DO UPDATE SET "titlePt" = EXCLUDED."titlePt", "titleEn" = EXCLUDED."titleEn", "titleEs" = EXCLUDED."titleEs", "titleFr" = EXCLUDED."titleFr",
  "descriptionPt" = EXCLUDED."descriptionPt", "descriptionEn" = EXCLUDED."descriptionEn", "descriptionEs" = EXCLUDED."descriptionEs", "descriptionFr" = EXCLUDED."descriptionFr",
  icon = EXCLUDED.icon, segments = EXCLUDED.segments, status = 'PUBLISHED', priority = EXCLUDED.priority, "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════
-- ARQUIVAR SERVIÇOS FORA DOS 12 CURADOS (API retorna só PUBLISHED)
-- ═══════════════════════════════════════════════════════════════
UPDATE "Service"
SET status = 'ARCHIVED', "updatedAt" = NOW()
WHERE slug NOT IN (
  'cinema-audiovisual', 'pos-producao-vfx', 'animacao-2d-3d', 'xr-interatividade-web3',
  'cenografia-design-espacial', 'games-interativos', 'ia-criativa', 'direcao-arte-criativa',
  'teatro-espetaculos-imersivos', 'branded-experiences-ativacoes', 'consultoria-estrategia', 'educacao-treinamento'
);

-- ═══════════════════════════════════════════════════════════════
-- VERIFICAÇÃO: listar os 12 publicados
-- ═══════════════════════════════════════════════════════════════
SELECT slug, "titlePt" AS "Título PT", icon, priority, status, "updatedAt"
FROM "Service"
WHERE status = 'PUBLISHED'
ORDER BY priority;
