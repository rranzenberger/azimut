-- ═══════════════════════════════════════════════════════════════
-- POPULAR SECTIONS PARA OUTRAS PÁGINAS (Studio, What, Work)
-- Execute no Neon SQL Editor: https://console.neon.tech
-- ═══════════════════════════════════════════════════════════════

-- 1️⃣ STUDIO: Section "Heritage" (order: 1)
INSERT INTO "Section" (
  id,
  "pageId",
  "order",
  type,
  layout,
  "titlePt",
  "titleEn",
  "titleEs",
  "titleFr",
  "bodyPt",
  "bodyEn",
  "bodyEs",
  "bodyFr",
  "createdAt",
  "updatedAt"
)
SELECT
  gen_random_uuid(),
  p.id,
  1,
  'heritage',
  'full-width',
  'Desde 1996 | Brasil-Canadá',
  'Since 1996 | Brazil-Canada',
  'Desde 1996 | Brasil-Canadá',
  'Depuis 1996 | Brésil-Canada',
  'Estúdio binacional criando experiências imersivas entre Brasil e Canadá desde 1996.',
  'Binational studio creating immersive experiences between Brazil and Canada since 1996.',
  'Estudio binacional creando experiencias inmersivas entre Brasil y Canadá desde 1996.',
  'Studio binational créant des expériences immersives entre le Brésil et le Canada depuis 1996.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "Page" p
WHERE p.slug = 'studio'
AND NOT EXISTS (
  SELECT 1 FROM "Section" s 
  WHERE s."pageId" = p.id 
  AND s.type = 'heritage'
)
ON CONFLICT DO NOTHING;

-- 2️⃣ STUDIO: Section "Unique" (order: 2)
INSERT INTO "Section" (
  id,
  "pageId",
  "order",
  type,
  layout,
  "titlePt",
  "titleEn",
  "titleEs",
  "titleFr",
  "bodyPt",
  "bodyEn",
  "bodyEs",
  "bodyFr",
  "createdAt",
  "updatedAt"
)
SELECT
  gen_random_uuid(),
  p.id,
  2,
  'unique',
  'centered',
  'O que nos torna únicos',
  'What makes us unique',
  'Lo que nos hace únicos',
  'Ce qui nous rend uniques',
  'Combinamos cinema, design interativo, storytelling espacial e pipelines com IA para criar instalações narrativas, ambientes híbridos e experiências temporais.',
  'We combine cinema, interactive design, spatial storytelling and AI-driven pipelines to build narrative installations, hybrid environments and time-based experiences.',
  'Combinamos cine, diseño interactivo, narrativa espacial y pipelines con IA para crear instalaciones narrativas, entornos híbridos y experiencias temporales.',
  'Nous combinons cinéma, design interactif, narration spatiale et pipelines pilotés par l''IA pour créer des installations narratives, des environnements hybrides et des expériences temporelles.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "Page" p
WHERE p.slug = 'studio'
AND NOT EXISTS (
  SELECT 1 FROM "Section" s 
  WHERE s."pageId" = p.id 
  AND s.type = 'unique'
)
ON CONFLICT DO NOTHING;

-- 3️⃣ WHAT: Section "Services Overview" (order: 1)
INSERT INTO "Section" (
  id,
  "pageId",
  "order",
  type,
  layout,
  "titlePt",
  "titleEn",
  "titleEs",
  "titleFr",
  "bodyPt",
  "bodyEn",
  "bodyEs",
  "bodyFr",
  "createdAt",
  "updatedAt"
)
SELECT
  gen_random_uuid(),
  p.id,
  1,
  'services-overview',
  'grid-3-columns',
  'Nossas Soluções',
  'Our Solutions',
  'Nuestras Soluciones',
  'Nos Solutions',
  'Oferecemos soluções completas em experiências imersivas, desde cinema e audiovisual até IA criativa e educação.',
  'We offer complete solutions in immersive experiences, from cinema and audiovisual to creative AI and education.',
  'Ofrecemos soluciones completas en experiencias inmersivas, desde cine y audiovisual hasta IA creativa y educación.',
  'Nous offrons des solutions complètes en expériences immersives, du cinéma et de l''audiovisuel à l''IA créative et à l''éducation.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "Page" p
WHERE p.slug = 'what'
AND NOT EXISTS (
  SELECT 1 FROM "Section" s 
  WHERE s."pageId" = p.id 
  AND s.type = 'services-overview'
)
ON CONFLICT DO NOTHING;

-- 4️⃣ WORK: Section "Projects Overview" (order: 1)
INSERT INTO "Section" (
  id,
  "pageId",
  "order",
  type,
  layout,
  "titlePt",
  "titleEn",
  "titleEs",
  "titleFr",
  "bodyPt",
  "bodyEn",
  "bodyEs",
  "bodyFr",
  "createdAt",
  "updatedAt"
)
SELECT
  gen_random_uuid(),
  p.id,
  1,
  'projects-overview',
  'grid-3-columns',
  'Nossos Projetos',
  'Our Projects',
  'Nuestros Proyectos',
  'Nos Projets',
  'Conheça nossos projetos mais recentes e inovadores em experiências imersivas.',
  'Discover our latest and most innovative projects in immersive experiences.',
  'Conoce nuestros proyectos más recientes e innovadores en experiencias inmersivas.',
  'Découvrez nos projets les plus récents et innovants en expériences immersives.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "Page" p
WHERE p.slug = 'work'
AND NOT EXISTS (
  SELECT 1 FROM "Section" s 
  WHERE s."pageId" = p.id 
  AND s.type = 'projects-overview'
)
ON CONFLICT DO NOTHING;

-- ✅ VERIFICAR RESULTADO
SELECT 
  p.slug as pagina,
  s."order",
  s.type,
  s."titlePt",
  s."titleEn"
FROM "Section" s
JOIN "Page" p ON s."pageId" = p.id
WHERE p.slug IN ('studio', 'what', 'work')
ORDER BY p.slug, s."order";
