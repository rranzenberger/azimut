-- ═══════════════════════════════════════════════════════════════
-- VERIFICAÇÃO FINAL COMPLETA - TUDO POPULADO?
-- Execute no Neon SQL Editor: https://console.neon.tech
-- ═══════════════════════════════════════════════════════════════

-- 1️⃣ RESUMO GERAL DE PÁGINAS E SECTIONS
SELECT 
  'RESUMO PÁGINAS E SECTIONS' as categoria,
  p.slug,
  p.name,
  p.status,
  CASE WHEN p."heroSloganPt" IS NOT NULL THEN '✅' ELSE '❌' END as tem_slogan,
  CASE WHEN p."heroSubtitlePt" IS NOT NULL THEN '✅' ELSE '❌' END as tem_subtitle,
  CASE WHEN p."seoTitlePt" IS NOT NULL THEN '✅' ELSE '❌' END as tem_seo,
  (SELECT COUNT(*) FROM "Section" s WHERE s."pageId" = p.id) as num_sections
FROM "Page" p
WHERE p.slug IN ('home', 'studio', 'academy', 'what', 'work', 'contact')
ORDER BY p.slug;

-- 2️⃣ DETALHAMENTO DE SECTIONS POR PÁGINA
SELECT 
  'SECTIONS DETALHADAS' as categoria,
  p.slug as pagina,
  s."order",
  s.type,
  s."titlePt",
  CASE WHEN s."bodyPt" IS NOT NULL THEN '✅' ELSE '❌' END as tem_conteudo
FROM "Section" s
JOIN "Page" p ON s."pageId" = p.id
WHERE p.slug IN ('home', 'studio', 'academy', 'what', 'work')
ORDER BY p.slug, s."order";

-- 3️⃣ CONTAGEM TOTAL
SELECT 
  'CONTAGEM TOTAL' as categoria,
  (SELECT COUNT(*) FROM "Page" WHERE status = 'PUBLISHED') as paginas_publicadas,
  (SELECT COUNT(*) FROM "Section") as total_sections,
  (SELECT COUNT(*) FROM "Section" s JOIN "Page" p ON s."pageId" = p.id WHERE p.slug = 'home') as sections_home,
  (SELECT COUNT(*) FROM "Section" s JOIN "Page" p ON s."pageId" = p.id WHERE p.slug = 'studio') as sections_studio,
  (SELECT COUNT(*) FROM "Section" s JOIN "Page" p ON s."pageId" = p.id WHERE p.slug = 'academy') as sections_academy,
  (SELECT COUNT(*) FROM "Section" s JOIN "Page" p ON s."pageId" = p.id WHERE p.slug = 'what') as sections_what,
  (SELECT COUNT(*) FROM "Section" s JOIN "Page" p ON s."pageId" = p.id WHERE p.slug = 'work') as sections_work;

-- 4️⃣ VERIFICAR SE FALTA ALGO
SELECT 
  'O QUE FALTA?' as categoria,
  CASE 
    WHEN (SELECT COUNT(*) FROM "Section" s JOIN "Page" p ON s."pageId" = p.id WHERE p.slug = 'home') < 3 
    THEN 'Home precisa de mais sections'
    ELSE 'Home OK'
  END as status_home,
  CASE 
    WHEN (SELECT COUNT(*) FROM "Section" s JOIN "Page" p ON s."pageId" = p.id WHERE p.slug = 'studio') < 2 
    THEN 'Studio precisa de mais sections'
    ELSE 'Studio OK'
  END as status_studio,
  CASE 
    WHEN (SELECT COUNT(*) FROM "Section" s JOIN "Page" p ON s."pageId" = p.id WHERE p.slug = 'academy') < 3 
    THEN 'Academy precisa de mais sections'
    ELSE 'Academy OK'
  END as status_academy,
  CASE 
    WHEN (SELECT COUNT(*) FROM "Section" s JOIN "Page" p ON s."pageId" = p.id WHERE p.slug = 'what') < 1 
    THEN 'What precisa de sections'
    ELSE 'What OK'
  END as status_what,
  CASE 
    WHEN (SELECT COUNT(*) FROM "Section" s JOIN "Page" p ON s."pageId" = p.id WHERE p.slug = 'work') < 1 
    THEN 'Work precisa de sections'
    ELSE 'Work OK'
  END as status_work;
