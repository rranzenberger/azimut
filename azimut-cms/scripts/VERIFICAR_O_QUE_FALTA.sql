-- ═══════════════════════════════════════════════════════════════
-- VERIFICAÇÃO DETALHADA: O QUE ESTÁ POPULADO E O QUE FALTA
-- Execute no Neon SQL Editor: https://console.neon.tech
-- ═══════════════════════════════════════════════════════════════

-- 1️⃣ VERIFICAR PÁGINAS PRINCIPAIS E SEUS CONTEÚDOS
SELECT 
  'PÁGINAS PRINCIPAIS' as categoria,
  p.slug,
  p.name,
  p.status,
  CASE 
    WHEN p."heroSloganPt" IS NOT NULL THEN '✅'
    ELSE '❌'
  END as tem_hero_slogan,
  CASE 
    WHEN p."heroSubtitlePt" IS NOT NULL THEN '✅'
    ELSE '❌'
  END as tem_hero_subtitle,
  CASE 
    WHEN p."pillar1Pt" IS NOT NULL THEN '✅'
    ELSE '❌'
  END as tem_pillars,
  CASE 
    WHEN p."seoTitlePt" IS NOT NULL THEN '✅'
    ELSE '❌'
  END as tem_seo,
  (SELECT COUNT(*) FROM "Section" s WHERE s."pageId" = p.id) as num_sections
FROM "Page" p
WHERE p.slug IN ('home', 'studio', 'academy', 'what', 'work', 'contact')
ORDER BY p.slug;

-- 2️⃣ VERIFICAR SECTIONS POR PÁGINA
SELECT 
  'SECTIONS POR PÁGINA' as categoria,
  p.slug as pagina,
  s.type as tipo_section,
  s."order" as ordem,
  CASE 
    WHEN s."titlePt" IS NOT NULL THEN '✅'
    ELSE '❌'
  END as tem_titulo,
  CASE 
    WHEN s."bodyPt" IS NOT NULL THEN '✅'
    ELSE '❌'
  END as tem_conteudo
FROM "Section" s
JOIN "Page" p ON s."pageId" = p.id
WHERE p.slug IN ('home', 'studio', 'academy')
ORDER BY p.slug, s."order";

-- 3️⃣ VERIFICAR FIELD_METADATA
SELECT 
  'FIELD METADATA' as categoria,
  page_slug,
  section_key,
  field_key,
  field_label,
  field_type
FROM "field_metadata"
ORDER BY page_slug, section_key, field_key;

-- 4️⃣ VERIFICAR BLOG POSTS
SELECT 
  'BLOG POSTS' as categoria,
  COUNT(*) FILTER (WHERE status = 'PUBLISHED') as publicados,
  COUNT(*) FILTER (WHERE status = 'DRAFT') as rascunhos,
  COUNT(*) FILTER (WHERE featured = true) as em_destaque,
  COUNT(*) as total
FROM "BlogPost";

-- 5️⃣ VERIFICAR PROJETOS
SELECT 
  'PROJETOS' as categoria,
  COUNT(*) FILTER (WHERE status = 'PUBLISHED') as publicados,
  COUNT(*) FILTER (WHERE status = 'DRAFT') as rascunhos,
  COUNT(*) FILTER (WHERE featured = true) as em_destaque,
  COUNT(*) as total
FROM "Project";

-- 6️⃣ RESUMO FINAL
SELECT 
  'RESUMO GERAL' as categoria,
  (SELECT COUNT(*) FROM "Page" WHERE status = 'PUBLISHED') as paginas_publicadas,
  (SELECT COUNT(*) FROM "Section") as total_sections,
  (SELECT COUNT(*) FROM "field_metadata") as total_field_metadata,
  (SELECT COUNT(*) FROM "BlogPost" WHERE status = 'PUBLISHED') as blog_posts_publicados,
  (SELECT COUNT(*) FROM "Project" WHERE status = 'PUBLISHED') as projetos_publicados,
  (SELECT COUNT(*) FROM "Service" WHERE status = 'PUBLISHED') as servicos_publicados;
