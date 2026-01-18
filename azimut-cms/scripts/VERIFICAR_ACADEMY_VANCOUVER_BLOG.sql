-- ═══════════════════════════════════════════════════════════════
-- VERIFICAÇÃO: ACADEMY, VANCOUVER E BLOG
-- Execute no Neon SQL Editor: https://console.neon.tech
-- ═══════════════════════════════════════════════════════════════

-- 1️⃣ VERIFICAR PÁGINA ACADEMY
SELECT 
  'PÁGINA ACADEMY' as categoria,
  p.slug,
  p.name,
  p.status,
  CASE WHEN p."heroSloganPt" IS NOT NULL THEN '✅' ELSE '❌' END as tem_slogan,
  CASE WHEN p."heroSubtitlePt" IS NOT NULL THEN '✅' ELSE '❌' END as tem_subtitle,
  CASE WHEN p."seoTitlePt" IS NOT NULL THEN '✅' ELSE '❌' END as tem_seo,
  (SELECT COUNT(*) FROM "Section" s WHERE s."pageId" = p.id) as num_sections
FROM "Page" p
WHERE p.slug = 'academy';

-- 2️⃣ VERIFICAR TODAS AS PÁGINAS DE ACADEMY (incluindo Vancouver)
SELECT 
  'TODAS PÁGINAS ACADEMY' as categoria,
  p.slug,
  p.name,
  p.status,
  CASE WHEN p."heroSloganPt" IS NOT NULL THEN '✅' ELSE '❌' END as tem_slogan,
  CASE WHEN p."heroSubtitlePt" IS NOT NULL THEN '✅' ELSE '❌' END as tem_subtitle,
  CASE WHEN p."seoTitlePt" IS NOT NULL THEN '✅' ELSE '❌' END as tem_seo,
  (SELECT COUNT(*) FROM "Section" s WHERE s."pageId" = p.id) as num_sections
FROM "Page" p
WHERE p.slug LIKE '%academy%' 
   OR p.slug LIKE '%vancouver%'
   OR p.slug LIKE '%courses%'
   OR p.slug LIKE '%workshops%'
   OR p.slug LIKE '%corporate%'
   OR p.slug LIKE '%research%'
ORDER BY p.slug;

-- 3️⃣ VERIFICAR SECTIONS DE TODAS AS PÁGINAS ACADEMY
SELECT 
  'SECTIONS ACADEMY' as categoria,
  p.slug as pagina,
  s.type,
  s."order",
  s."titlePt",
  s."titleEn",
  CASE WHEN s."bodyPt" IS NOT NULL THEN '✅' ELSE '❌' END as tem_conteudo
FROM "Section" s
JOIN "Page" p ON s."pageId" = p.id
WHERE p.slug LIKE '%academy%' 
   OR p.slug LIKE '%vancouver%'
ORDER BY p.slug, s."order";

-- 4️⃣ VERIFICAR BLOG POSTS (DETALHADO)
SELECT 
  'BLOG POSTS' as categoria,
  bp.slug,
  bp."titlePt",
  bp."titleEn",
  bp.status,
  bp.featured,
  bp."publishedAt",
  CASE WHEN bp."excerptPt" IS NOT NULL THEN '✅' ELSE '❌' END as tem_excerpt,
  CASE WHEN bp."contentPt" IS NOT NULL THEN '✅' ELSE '❌' END as tem_conteudo,
  CASE WHEN bp."coverImageId" IS NOT NULL OR bp."coverImageUrl" IS NOT NULL THEN '✅' ELSE '❌' END as tem_imagem,
  CASE WHEN bp."seoTitlePt" IS NOT NULL THEN '✅' ELSE '❌' END as tem_seo,
  bc."namePt" as categoria_nome
FROM "BlogPost" bp
LEFT JOIN "BlogCategory" bc ON bp."categoryId" = bc.id
ORDER BY bp."publishedAt" DESC NULLS LAST, bp."createdAt" DESC;

-- 5️⃣ VERIFICAR CATEGORIAS DO BLOG
SELECT 
  'CATEGORIAS BLOG' as categoria,
  bc.slug,
  bc.namePt,
  bc.nameEn,
  (SELECT COUNT(*) FROM "BlogPost" WHERE "categoryId" = bc.id) as num_posts
FROM "BlogCategory" bc
ORDER BY bc.priority DESC, bc.namePt;

-- 6️⃣ VERIFICAR ACADEMY VIDEOS (se tabela existir)
SELECT 
  'ACADEMY VIDEOS' as categoria,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'AcademyVideo')
    THEN (SELECT COUNT(*)::text FROM "AcademyVideo" WHERE status = 'PUBLISHED')
    ELSE 'Tabela não existe'
  END as videos_publicados;

-- 7️⃣ VERIFICAR WEBINARS (se tabela existir)
SELECT 
  'WEBINARS' as categoria,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Webinar')
    THEN (SELECT COUNT(*)::text FROM "Webinar" WHERE status = 'SCHEDULED' OR status = 'LIVE')
    ELSE 'Tabela não existe'
  END as webinars_agendados;

-- 8️⃣ RESUMO FINAL
SELECT 
  'RESUMO ACADEMY/VANCOUVER/BLOG' as categoria,
  (SELECT COUNT(*) FROM "Page" WHERE slug = 'academy' AND status = 'PUBLISHED') as academy_page_principal,
  (SELECT COUNT(*) FROM "Page" WHERE (slug LIKE '%academy%' OR slug LIKE '%vancouver%' OR slug LIKE '%courses%' OR slug LIKE '%workshops%' OR slug LIKE '%corporate%' OR slug LIKE '%research%') AND status = 'PUBLISHED') as total_paginas_academy,
  (SELECT COUNT(*) FROM "Section" s JOIN "Page" p ON s."pageId" = p.id WHERE p.slug LIKE '%academy%' OR p.slug LIKE '%vancouver%') as total_sections_academy,
  (SELECT COUNT(*) FROM "BlogPost" WHERE status = 'PUBLISHED') as blog_posts_publicados,
  (SELECT COUNT(*) FROM "BlogCategory") as blog_categorias,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'AcademyVideo')
    THEN (SELECT COUNT(*)::text FROM "AcademyVideo" WHERE status = 'PUBLISHED')
    ELSE 'Tabela não existe'
  END as academy_videos;
