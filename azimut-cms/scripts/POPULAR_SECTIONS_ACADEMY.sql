-- ═══════════════════════════════════════════════════════════════
-- POPULAR SECTIONS PARA PÁGINA ACADEMY
-- Execute no Neon SQL Editor: https://console.neon.tech
-- ═══════════════════════════════════════════════════════════════

-- 1️⃣ SECTION: "Research" (order: 1)
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
  'research',
  'full-width',
  'Pesquisa & Desenvolvimento',
  'Research & Development',
  'Investigación y Desarrollo',
  'Recherche et Développement',
  'Laboratório de P&D e pesquisa experimental. Protótipos IA + XR, experimentos com IA generativa, publicações e artigos, parcerias acadêmicas.',
  'R&D lab and experimental research. AI + XR prototypes, generative AI experiments, publications and articles, academic partnerships.',
  'Laboratorio de I+D e investigación experimental. Prototipos IA + XR, experimentos con IA generativa, publicaciones y artículos, asociaciones académicas.',
  'Laboratoire de R&D et recherche expérimentale. Prototypes IA + XR, expériences d''IA générative, publications et articles, partenariats académiques.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "Page" p
WHERE p.slug = 'academy'
AND NOT EXISTS (
  SELECT 1 FROM "Section" s 
  WHERE s."pageId" = p.id 
  AND s.type = 'research'
)
ON CONFLICT DO NOTHING;

-- 2️⃣ SECTION: "Courses" (order: 2)
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
  'courses',
  'grid-3-columns',
  'Cursos & Workshops',
  'Courses & Workshops',
  'Cursos y Talleres',
  'Cours et Ateliers',
  'Workshops e formações presenciais/online. Workshops IA / VR / VFX / 3D, cursos de narrativas imersivas, formação prática para equipes, cronograma de cursos.',
  'In-person and online workshops and training. AI / VR / VFX / 3D workshops, immersive storytelling courses, practical training for teams, course schedule.',
  'Talleres y formaciones presenciales/en línea. Talleres IA / VR / VFX / 3D, cursos de narrativas inmersivas, formación práctica para equipos, cronograma de cursos.',
  'Ateliers et formations en présentiel/en ligne. Ateliers IA / VR / VFX / 3D, cours de narration immersive, formation pratique pour équipes, calendrier des cours.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "Page" p
WHERE p.slug = 'academy'
AND NOT EXISTS (
  SELECT 1 FROM "Section" s 
  WHERE s."pageId" = p.id 
  AND s.type = 'courses'
)
ON CONFLICT DO NOTHING;

-- 3️⃣ SECTION: "Corporate" (order: 3)
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
  'corporate',
  'full-width',
  'Treinamentos Corporativos',
  'Corporate Training',
  'Capacitación Corporativa',
  'Formation d''Entreprise',
  'Treinamentos corporativos customizados. Mentorias VR/IA, treinamentos in-company, consultoria educacional, programas customizados.',
  'Customized corporate training. VR/AI mentoring, in-company training, educational consulting, customized programs.',
  'Capacitación corporativa personalizada. Mentorías VR/IA, capacitación in-company, consultoría educativa, programas personalizados.',
  'Formation d''entreprise personnalisée. Mentorat VR/IA, formation en entreprise, conseil éducatif, programmes personnalisés.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "Page" p
WHERE p.slug = 'academy'
AND NOT EXISTS (
  SELECT 1 FROM "Section" s 
  WHERE s."pageId" = p.id 
  AND s.type = 'corporate'
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
WHERE p.slug = 'academy'
ORDER BY s."order";
