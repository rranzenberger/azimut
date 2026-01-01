-- ════════════════════════════════════════════════════════════
-- SCRIPT SQL: POPULAR SERVIÇOS NO BACKOFFICE
-- ════════════════════════════════════════════════════════════
-- Data: 01/01/2026
-- Objetivo: Inserir os 6 serviços com textos em 4 idiomas (PT, EN, ES, FR)
-- ════════════════════════════════════════════════════════════

-- LIMPAR serviços existentes (CUIDADO! Só executar se quiser resetar)
-- DELETE FROM "Service";

-- ════════════════════════════════════════════════════════════
-- SERVIÇO 1: CINEMA & AUDIOVISUAL
-- ════════════════════════════════════════════════════════════
INSERT INTO "Service" (
  id,
  slug,
  "titlePt",
  "titleEn",
  "titleEs",
  "titleFr",
  "descriptionPt",
  "descriptionEn",
  "descriptionEs",
  "descriptionFr",
  icon,
  status,
  priority,
  segments,
  "createdAt",
  "updatedAt"
) VALUES (
  gen_random_uuid(),
  'cinema-audiovisual',
  'Cinema & Audiovisual',
  'Cinema & Audiovisual',
  'Cine & Audiovisual',
  'Cinéma & Audiovisuel',
  'Criamos narrativas cinematográficas que conectam audiências. Do conceito à finalização, entregamos conteúdo de alta qualidade para museus, festivais e marcas, com expertise técnica de 30 anos.',
  'We create cinematic narratives that connect audiences. From concept to finishing, we deliver high-quality content for museums, festivals and brands, with 30 years of technical expertise.',
  'Creamos narrativas cinematográficas que conectan audiencias. Del concepto a la finalización, entregamos contenido de alta calidad para museos, festivales y marcas, con expertise técnica de 30 años.',
  'Nous créons des narrations cinématographiques qui connectent les audiences. Du concept à la finalisation, nous livrons du contenu de haute qualité pour musées, festivals et marques, avec 30 ans d''expertise technique.',
  '🎬',
  'PUBLISHED',
  1,
  ARRAY['museums', 'festivals', 'brands']::text[],
  NOW(),
  NOW()
);

-- ════════════════════════════════════════════════════════════
-- SERVIÇO 2: ANIMAÇÃO 2D/3D
-- ════════════════════════════════════════════════════════════
INSERT INTO "Service" (
  id,
  slug,
  "titlePt",
  "titleEn",
  "titleEs",
  "titleFr",
  "descriptionPt",
  "descriptionEn",
  "descriptionEs",
  "descriptionFr",
  icon,
  status,
  priority,
  segments,
  "createdAt",
  "updatedAt"
) VALUES (
  gen_random_uuid(),
  'animacao-2d-3d',
  'Animação 2D/3D',
  '2D/3D Animation',
  'Animación 2D/3D',
  'Animation 2D/3D',
  'Damos vida a personagens e mundos através de animação 2D/3D. Nossa expertise técnica permite criar narrativas visuais envolventes, desde storyboards até finalização completa.',
  'We bring characters and worlds to life through 2D/3D animation. Our technical expertise enables us to create engaging visual narratives, from storyboards to complete finishing.',
  'Damos vida a personajes y mundos a través de animación 2D/3D. Nuestra expertise técnica nos permite crear narrativas visuales envolventes, desde storyboards hasta finalización completa.',
  'Nous donnons vie aux personnages et mondes grâce à l''animation 2D/3D. Notre expertise technique nous permet de créer des narrations visuelles engageantes, des storyboards à la finalisation complète.',
  '🎨',
  'PUBLISHED',
  2,
  ARRAY['museums', 'festivals', 'brands', 'education']::text[],
  NOW(),
  NOW()
);

-- ════════════════════════════════════════════════════════════
-- SERVIÇO 3: XR / INTERATIVIDADE
-- ════════════════════════════════════════════════════════════
INSERT INTO "Service" (
  id,
  slug,
  "titlePt",
  "titleEn",
  "titleEs",
  "titleFr",
  "descriptionPt",
  "descriptionEn",
  "descriptionEs",
  "descriptionFr",
  icon,
  status,
  priority,
  segments,
  "createdAt",
  "updatedAt"
) VALUES (
  gen_random_uuid(),
  'xr-interatividade',
  'XR / Interatividade',
  'XR / Interactive',
  'XR / Interactivo',
  'XR / Interactif',
  'Criamos experiências imersivas que transportam pessoas para novos mundos. De filmes VR 360° a instalações interativas, nossa curadoria em festivais nos dá uma visão única do que funciona em narrativas imersivas.',
  'We create immersive experiences that transport people to new worlds. From 360° VR films to interactive installations, our festival curation gives us unique insight into what works in immersive storytelling.',
  'Creamos experiencias inmersivas que transportan personas a nuevos mundos. De películas VR 360° a instalaciones interactivas, nuestra curaduría en festivales nos da una visión única de lo que funciona en narrativas inmersivas.',
  'Nous créons des expériences immersives qui transportent les gens vers de nouveaux mondes. Des films VR 360° aux installations interactives, notre curation de festivals nous donne un aperçu unique de ce qui fonctionne dans la narration immersive.',
  '🥽',
  'PUBLISHED',
  3,
  ARRAY['museums', 'festivals', 'brands']::text[],
  NOW(),
  NOW()
);

-- ════════════════════════════════════════════════════════════
-- SERVIÇO 4: IA CRIATIVA
-- ════════════════════════════════════════════════════════════
INSERT INTO "Service" (
  id,
  slug,
  "titlePt",
  "titleEn",
  "titleEs",
  "titleFr",
  "descriptionPt",
  "descriptionEn",
  "descriptionEs",
  "descriptionFr",
  icon,
  status,
  priority,
  segments,
  "createdAt",
  "updatedAt"
) VALUES (
  gen_random_uuid(),
  'ia-criativa',
  'IA Criativa',
  'Creative AI',
  'IA Creativa',
  'IA Créative',
  'Exploramos o potencial da IA generativa para narrativas. Nossa pesquisa desde 1997 e experiência prática nos permite criar pipelines únicos que combinam IA com linguagem cinematográfica tradicional.',
  'We explore the potential of generative AI for storytelling. Our research since 1997 and practical experience enables us to create unique pipelines that combine AI with traditional cinematic language.',
  'Exploramos el potencial de la IA generativa para narrativas. Nuestra investigación desde 1997 y experiencia práctica nos permite crear pipelines únicos que combinan IA con lenguaje cinematográfico tradicional.',
  'Nous explorons le potentiel de l''IA générative pour la narration. Nos recherches depuis 1997 et notre expérience pratique nous permettent de créer des pipelines uniques qui combinent IA et langage cinématographique traditionnel.',
  '🤖',
  'PUBLISHED',
  4,
  ARRAY['museums', 'festivals', 'brands', 'research']::text[],
  NOW(),
  NOW()
);

-- ════════════════════════════════════════════════════════════
-- SERVIÇO 5: EDUCAÇÃO & FORMAÇÃO
-- ════════════════════════════════════════════════════════════
INSERT INTO "Service" (
  id,
  slug,
  "titlePt",
  "titleEn",
  "titleEs",
  "titleFr",
  "descriptionPt",
  "descriptionEn",
  "descriptionEs",
  "descriptionFr",
  icon,
  status,
  priority,
  segments,
  "createdAt",
  "updatedAt"
) VALUES (
  gen_random_uuid(),
  'educacao-formacao',
  'Educação & Formação',
  'Education & Training',
  'Educación & Formación',
  'Éducation & Formation',
  'Compartilhamos conhecimento acumulado em 30 anos. Nossos workshops e mentorias formaram centenas de profissionais, enquanto nossa curadoria em festivais nos permite identificar e apresentar as melhores práticas do setor.',
  'We share knowledge accumulated over 30 years. Our workshops and mentoring have trained hundreds of professionals, while our festival curation allows us to identify and present the industry''s best practices.',
  'Compartimos conocimiento acumulado en 30 años. Nuestros workshops y mentorías han formado cientos de profesionales, mientras nuestra curaduría en festivales nos permite identificar y presentar las mejores prácticas del sector.',
  'Nous partageons les connaissances accumulées sur 30 ans. Nos ateliers et mentorats ont formé des centaines de professionnels, tandis que notre curation de festivals nous permet d''identifier et présenter les meilleures pratiques de l''industrie.',
  '📚',
  'PUBLISHED',
  5,
  ARRAY['education', 'festivals']::text[],
  NOW(),
  NOW()
);

-- ════════════════════════════════════════════════════════════
-- SERVIÇO 6: CONSULTORIA & ESTRATÉGIA
-- ════════════════════════════════════════════════════════════
INSERT INTO "Service" (
  id,
  slug,
  "titlePt",
  "titleEn",
  "titleEs",
  "titleFr",
  "descriptionPt",
  "descriptionEn",
  "descriptionEs",
  "descriptionFr",
  icon,
  status,
  priority,
  segments,
  "createdAt",
  "updatedAt"
) VALUES (
  gen_random_uuid(),
  'consultoria-estrategia',
  'Consultoria & Estratégia',
  'Consulting & Strategy',
  'Consultoría & Estrategia',
  'Conseil & Stratégie',
  'Acompanhamos projetos desde a concepção até a execução. Nossa experiência em captação de recursos (editais nacionais e internacionais) e estratégia de IA permite que clientes realizem projetos que de outra forma não conseguiriam.',
  'We support projects from conception to execution. Our experience in funding (national and international grants) and AI strategy enables clients to realize projects they otherwise could not.',
  'Acompañamos proyectos desde la concepción hasta la ejecución. Nuestra experiencia en captación de recursos (editais nacionales e internacionales) y estrategia de IA permite que clientes realicen proyectos que de otra forma no podrían.',
  'Nous accompagnons les projets de la conception à l''exécution. Notre expérience en financement (subventions nationales et internationales) et stratégie IA permet aux clients de réaliser des projets qu''ils ne pourraient pas autrement.',
  '💡',
  'PUBLISHED',
  6,
  ARRAY['museums', 'brands', 'government']::text[],
  NOW(),
  NOW()
);

-- ════════════════════════════════════════════════════════════
-- VERIFICAÇÃO: Ver todos os serviços inseridos
-- ════════════════════════════════════════════════════════════
SELECT 
  slug,
  "titlePt",
  "titleEn",
  icon,
  status,
  priority
FROM "Service"
ORDER BY priority ASC;

-- ════════════════════════════════════════════════════════════
-- ✅ FIM DO SCRIPT
-- ════════════════════════════════════════════════════════════
-- 
-- COMO EXECUTAR:
-- 
-- OPÇÃO 1: Via Supabase SQL Editor
-- 1. Acessar: https://supabase.com/dashboard/project/[seu-projeto]/sql
-- 2. Colar todo este script
-- 3. Clicar em "Run"
-- 
-- OPÇÃO 2: Via PgAdmin / DBeaver
-- 1. Conectar no banco usando DATABASE_URL do .env
-- 2. Abrir SQL Query
-- 3. Colar e executar
-- 
-- OPÇÃO 3: Via linha de comando
-- psql $DATABASE_URL -f popular_servicos.sql
-- 
-- ════════════════════════════════════════════════════════════

