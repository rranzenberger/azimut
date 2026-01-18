-- ═══════════════════════════════════════════════════════════════
-- VERIFICAÇÃO COMPLETA DO BLOG
-- Execute no Neon SQL Editor: https://console.neon.tech
-- ═══════════════════════════════════════════════════════════════

-- 1️⃣ RESUMO GERAL DO BLOG
SELECT 
  'RESUMO BLOG' as categoria,
  COUNT(*) FILTER (WHERE status = 'PUBLISHED') as posts_publicados,
  COUNT(*) FILTER (WHERE status = 'DRAFT') as posts_rascunhos,
  COUNT(*) FILTER (WHERE featured = true) as posts_em_destaque,
  COUNT(*) as total_posts
FROM "BlogPost";

-- 2️⃣ LISTAR TODOS OS POSTS (DETALHADO)
SELECT 
  'POSTS DETALHADOS' as categoria,
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

-- 3️⃣ VERIFICAR CATEGORIAS DO BLOG
SELECT 
  'CATEGORIAS BLOG' as categoria,
  bc.slug,
  bc."namePt",
  bc."nameEn",
  bc.priority,
  (SELECT COUNT(*) FROM "BlogPost" WHERE "categoryId" = bc.id) as num_posts
FROM "BlogCategory" bc
ORDER BY bc.priority DESC, bc."namePt";

-- 4️⃣ VERIFICAR POSTS SEM CATEGORIA
SELECT 
  'POSTS SEM CATEGORIA' as categoria,
  bp.slug,
  bp."titlePt",
  bp.status
FROM "BlogPost" bp
WHERE bp."categoryId" IS NULL
ORDER BY bp."createdAt" DESC;

-- 5️⃣ VERIFICAR POSTS SEM CONTEÚDO COMPLETO
SELECT 
  'POSTS INCOMPLETOS' as categoria,
  bp.slug,
  bp."titlePt",
  bp.status,
  CASE WHEN bp."excerptPt" IS NULL THEN '❌ Excerpt' ELSE '✅' END as excerpt,
  CASE WHEN bp."contentPt" IS NULL THEN '❌ Conteúdo' ELSE '✅' END as conteudo,
  CASE WHEN bp."coverImageId" IS NULL AND bp."coverImageUrl" IS NULL THEN '❌ Imagem' ELSE '✅' END as imagem,
  CASE WHEN bp."seoTitlePt" IS NULL THEN '❌ SEO' ELSE '✅' END as seo
FROM "BlogPost" bp
WHERE bp.status = 'PUBLISHED'
  AND (
    bp."excerptPt" IS NULL 
    OR bp."contentPt" IS NULL 
    OR (bp."coverImageId" IS NULL AND bp."coverImageUrl" IS NULL)
    OR bp."seoTitlePt" IS NULL
  )
ORDER BY bp."createdAt" DESC;

-- 6️⃣ VERIFICAR SE EXISTE PÁGINA BLOG NO BANCO
SELECT 
  'PÁGINA BLOG' as categoria,
  p.slug,
  p.name,
  p.status,
  CASE WHEN p."heroSloganPt" IS NOT NULL THEN '✅' ELSE '❌' END as tem_slogan,
  CASE WHEN p."seoTitlePt" IS NOT NULL THEN '✅' ELSE '❌' END as tem_seo,
  (SELECT COUNT(*) FROM "Section" s WHERE s."pageId" = p.id) as num_sections
FROM "Page" p
WHERE p.slug LIKE '%blog%'
ORDER BY p.slug;

-- 7️⃣ RESUMO FINAL
SELECT 
  'RESUMO FINAL BLOG' as categoria,
  (SELECT COUNT(*) FROM "BlogPost" WHERE status = 'PUBLISHED') as posts_publicados,
  (SELECT COUNT(*) FROM "BlogCategory") as total_categorias,
  (SELECT COUNT(*) FROM "BlogPost" WHERE "categoryId" IS NOT NULL) as posts_com_categoria,
  (SELECT COUNT(*) FROM "BlogPost" WHERE "categoryId" IS NULL) as posts_sem_categoria,
  (SELECT COUNT(*) FROM "BlogPost" WHERE status = 'PUBLISHED' AND "contentPt" IS NOT NULL) as posts_com_conteudo,
  (SELECT COUNT(*) FROM "BlogPost" WHERE status = 'PUBLISHED' AND ("coverImageId" IS NOT NULL OR "coverImageUrl" IS NOT NULL)) as posts_com_imagem;
