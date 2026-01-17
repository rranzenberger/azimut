-- ═══════════════════════════════════════════════════════════════
-- POPULAR TABELA "Page" - HOME (4 LÍNGUAS)
-- ═══════════════════════════════════════════════════════════════
-- 
-- INSTRUÇÕES:
-- 1. Abra https://console.neon.tech
-- 2. Selecione seu projeto Azimut
-- 3. Vá em "SQL Editor"
-- 4. Cole TODO este script
-- 5. Clique em "Run" (NÃO em "Explain"!)
-- 
-- ═══════════════════════════════════════════════════════════════

-- 1️⃣ INSERIR PÁGINA HOME
INSERT INTO "Page" (
  id,
  name,
  slug,
  status,
  -- SEO
  "seoTitlePt",
  "seoTitleEn",
  "seoTitleFr",
  "seoTitleEs",
  "seoDescPt",
  "seoDescEn",
  "seoDescFr",
  "seoDescEs",
  -- HERO
  "heroSloganPt",
  "heroSloganEn",
  "heroSloganFr",
  "heroSloganEs",
  "heroSubtitlePt",
  "heroSubtitleEn",
  "heroSubtitleFr",
  "heroSubtitleEs",
  -- PILLARS
  "pillar1Pt",
  "pillar1En",
  "pillar1Fr",
  "pillar1Es",
  "pillar2Pt",
  "pillar2En",
  "pillar2Fr",
  "pillar2Es",
  "pillar3Pt",
  "pillar3En",
  "pillar3Fr",
  "pillar3Es",
  -- MEDIA (URLs manuais por enquanto)
  "heroBackgroundImageUrl",
  "demoreelVideoUrl",
  "createdAt",
  "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'Home',
  'home',
  'PUBLISHED',
  -- SEO PT
  'Azimut – Experiências Imersivas, Interativas e Cinematográficas',
  -- SEO EN
  'Azimut – Immersive, Interactive and Cinematic Experiences',
  -- SEO FR
  'Azimut – Expériences Immersives, Interactives et Cinématographiques',
  -- SEO ES
  'Azimut – Experiencias Inmersivas, Interactivas y Cinematográficas',
  -- SEO DESC PT
  'Criamos experiências imersivas, interativas e cinematográficas para cultura, marcas e espaços híbridos – atuando entre Brasil e Canadá.',
  -- SEO DESC EN
  'We create immersive, interactive and cinematic experiences for culture, brands and hybrid spaces – operating between Brazil and Canada.',
  -- SEO DESC FR
  'Nous créons des expériences immersives, interactives et cinématographiques pour la culture, les marques et les espaces hybrides – entre le Brésil et le Canada.',
  -- SEO DESC ES
  'Creamos experiencias inmersivas, interactivas y cinematográficas para cultura, marcas y espacios híbridos – operando entre Brasil y Canadá.',
  -- HERO SLOGAN PT
  'EXPERIÊNCIAS QUE CONECTAM MUNDOS',
  -- HERO SLOGAN EN
  'EXPERIENCES THAT CONNECT WORLDS',
  -- HERO SLOGAN FR
  'EXPÉRIENCES QUI CONNECTENT LES MONDES',
  -- HERO SLOGAN ES
  'EXPERIENCIAS QUE CONECTAN MUNDOS',
  -- HERO SUBTITLE PT
  'Criamos experiências imersivas entre Brasil e Canadá.',
  -- HERO SUBTITLE EN
  'We create immersive experiences between Brazil and Canada.',
  -- HERO SUBTITLE FR
  'Nous créons des expériences immersives entre le Brésil et le Canada.',
  -- HERO SUBTITLE ES
  'Creamos experiencias inmersivas entre Brasil y Canadá.',
  -- PILLAR 1 PT
  'Museus & exposições',
  -- PILLAR 1 EN
  'Museums & exhibitions',
  -- PILLAR 1 FR
  'Musées & expositions',
  -- PILLAR 1 ES
  'Museos & exposiciones',
  -- PILLAR 2 PT
  'Ativações de marca & sazonais',
  -- PILLAR 2 EN
  'Brand & seasonal activations',
  -- PILLAR 2 FR
  'Activations de marque & saisonnières',
  -- PILLAR 2 ES
  'Activaciones de marca & estacionales',
  -- PILLAR 3 PT
  'Audiovisual híbrido & IA',
  -- PILLAR 3 EN
  'Hybrid AV & AI',
  -- PILLAR 3 FR
  'Audiovisuel hybride & IA',
  -- PILLAR 3 ES
  'Audiovisual híbrido & IA',
  -- MEDIA
  '/hero-background.jpg',
  '/videos/azimut-demoreel-2024.mp4',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (slug) DO UPDATE SET
  "seoTitlePt" = EXCLUDED."seoTitlePt",
  "seoTitleEn" = EXCLUDED."seoTitleEn",
  "seoTitleFr" = EXCLUDED."seoTitleFr",
  "seoTitleEs" = EXCLUDED."seoTitleEs",
  "seoDescPt" = EXCLUDED."seoDescPt",
  "seoDescEn" = EXCLUDED."seoDescEn",
  "seoDescFr" = EXCLUDED."seoDescFr",
  "seoDescEs" = EXCLUDED."seoDescEs",
  "heroSloganPt" = EXCLUDED."heroSloganPt",
  "heroSloganEn" = EXCLUDED."heroSloganEn",
  "heroSloganFr" = EXCLUDED."heroSloganFr",
  "heroSloganEs" = EXCLUDED."heroSloganEs",
  "heroSubtitlePt" = EXCLUDED."heroSubtitlePt",
  "heroSubtitleEn" = EXCLUDED."heroSubtitleEn",
  "heroSubtitleFr" = EXCLUDED."heroSubtitleFr",
  "heroSubtitleEs" = EXCLUDED."heroSubtitleEs",
  "pillar1Pt" = EXCLUDED."pillar1Pt",
  "pillar1En" = EXCLUDED."pillar1En",
  "pillar1Fr" = EXCLUDED."pillar1Fr",
  "pillar1Es" = EXCLUDED."pillar1Es",
  "pillar2Pt" = EXCLUDED."pillar2Pt",
  "pillar2En" = EXCLUDED."pillar2En",
  "pillar2Fr" = EXCLUDED."pillar2Fr",
  "pillar2Es" = EXCLUDED."pillar2Es",
  "pillar3Pt" = EXCLUDED."pillar3Pt",
  "pillar3En" = EXCLUDED."pillar3En",
  "pillar3Fr" = EXCLUDED."pillar3Fr",
  "pillar3Es" = EXCLUDED."pillar3Es",
  "heroBackgroundImageUrl" = EXCLUDED."heroBackgroundImageUrl",
  "demoreelVideoUrl" = EXCLUDED."demoreelVideoUrl",
  "updatedAt" = CURRENT_TIMESTAMP;

-- 2️⃣ ADICIONAR SEÇÃO "STUDIO SNAPSHOT"
INSERT INTO "Section" (
  id,
  "pageId",
  "order",
  type,
  layout,
  "titlePt",
  "titleEn",
  "titleFr",
  "titleEs",
  "bodyPt",
  "bodyEn",
  "bodyFr",
  "bodyEs",
  "createdAt",
  "updatedAt"
)
SELECT
  gen_random_uuid(),
  p.id,
  1,
  'text-block',
  'centered',
  'Retrato do estúdio',
  'Studio snapshot',
  'Aperçu du studio',
  'Vista del estudio',
  'Combinamos cinema, design interativo, storytelling espacial e pipelines com IA para criar instalações narrativas, ambientes híbridos e experiências temporais para museus, festivais, marcas e laboratórios de pesquisa.',
  'We combine cinema, interactive design, spatial storytelling and AI-driven pipelines to build narrative installations, hybrid environments and time-based experiences for museums, festivals, brands and research labs.',
  'Nous combinons cinéma, design interactif, narration spatiale et pipelines pilotés par l''IA pour créer des installations narratives, des environnements hybrides et des expériences temporelles pour musées, festivaux, marques et laboratoires de recherche.',
  'Combinamos cine, diseño interactivo, narrativa espacial y flujos impulsados por IA para crear instalaciones narrativas, entornos híbridos y experiencias temporales para museos, festivales, marcas y laboratorios de investigación.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "Page" p
WHERE p.slug = 'home'
ON CONFLICT DO NOTHING;

-- ✅ VERIFICAR SE FOI INSERIDO
SELECT 
  name,
  slug,
  status,
  "seoTitlePt",
  "seoTitleEn",
  "heroSloganPt",
  "heroSloganEn",
  "pillar1Pt",
  "pillar2Pt",
  "pillar3Pt"
FROM "Page"
WHERE slug = 'home';

-- ✅ VERIFICAR SEÇÕES
SELECT 
  s.type,
  s."order",
  s."titlePt",
  s."titleEn",
  LEFT(s."bodyPt", 50) || '...' as "bodyPreview"
FROM "Section" s
JOIN "Page" p ON s."pageId" = p.id
WHERE p.slug = 'home'
ORDER BY s."order";
