-- ═══════════════════════════════════════════════════════════════
-- POPULAR SECTIONS PARA PÁGINA HOME
-- Execute no Neon SQL Editor: https://console.neon.tech
-- ═══════════════════════════════════════════════════════════════

-- 1️⃣ SECTION: "Nossas Soluções" (order: 2)
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
  'services-grid',
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
WHERE p.slug = 'home'
AND NOT EXISTS (
  SELECT 1 FROM "Section" s 
  WHERE s."pageId" = p.id 
  AND s.type = 'services-grid'
)
ON CONFLICT DO NOTHING;

-- 2️⃣ SECTION: "Projeto em Destaque" (order: 3)
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
  3,
  'featured-project',
  'full-width',
  'Projeto em Destaque',
  'Featured Project',
  'Proyecto Destacado',
  'Projet en Vedette',
  'Conheça nossos projetos mais recentes e inovadores.',
  'Discover our latest and most innovative projects.',
  'Conoce nuestros proyectos más recientes e innovadores.',
  'Découvrez nos projets les plus récents et innovants.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "Page" p
WHERE p.slug = 'home'
AND NOT EXISTS (
  SELECT 1 FROM "Section" s 
  WHERE s."pageId" = p.id 
  AND s.type = 'featured-project'
)
ON CONFLICT DO NOTHING;

-- 3️⃣ SECTION: "Sugestões para Você" (order: 4)
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
  4,
  'project-suggestions',
  'grid-3-columns',
  'Sugestões para Você',
  'Suggestions for You',
  'Sugerencias para Ti',
  'Suggestions pour Vous',
  'Projetos selecionados especialmente para você.',
  'Projects specially selected for you.',
  'Proyectos seleccionados especialmente para ti.',
  'Projets spécialement sélectionnés pour vous.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "Page" p
WHERE p.slug = 'home'
AND NOT EXISTS (
  SELECT 1 FROM "Section" s 
  WHERE s."pageId" = p.id 
  AND s.type = 'project-suggestions'
)
ON CONFLICT DO NOTHING;

-- ✅ VERIFICAR RESULTADO
SELECT 
  s."order",
  s.type,
  s."titlePt",
  s."titleEn"
FROM "Section" s
JOIN "Page" p ON s."pageId" = p.id
WHERE p.slug = 'home'
ORDER BY s."order";
