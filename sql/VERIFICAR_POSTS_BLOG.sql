-- ═══════════════════════════════════════════════════════════════
-- VERIFICAR POSTS DO BLOG
-- ═══════════════════════════════════════════════════════════════
-- Execute este SQL para verificar posts e status
-- ═══════════════════════════════════════════════════════════════

-- 1. Listar todos os posts com status
SELECT 
  slug, 
  "titlePt", 
  status, 
  "publishedAt",
  "createdAt",
  featured,
  "viewCount"
FROM "BlogPost"
ORDER BY "createdAt" DESC;

-- 2. Contar posts por status
SELECT 
  status,
  COUNT(*) as total
FROM "BlogPost"
GROUP BY status;

-- 3. Listar posts PUBLICADOS (que devem aparecer no site)
SELECT 
  slug, 
  "titlePt", 
  "publishedAt",
  "createdAt",
  featured,
  "viewCount",
  "categoryId"
FROM "BlogPost"
WHERE status = 'PUBLISHED'
  AND ("publishedAt" IS NULL OR "publishedAt" <= NOW())
ORDER BY featured DESC, "publishedAt" DESC, "createdAt" DESC;

-- 4. Verificar categorias
SELECT 
  slug,
  "namePt",
  "nameEn",
  color,
  icon,
  priority
FROM "BlogCategory"
ORDER BY priority DESC, "namePt" ASC;

-- 5. Contar posts por categoria
SELECT 
  c.slug,
  c."namePt",
  COUNT(p.id) as total_posts
FROM "BlogCategory" c
LEFT JOIN "BlogPost" p ON p."categoryId" = c.id 
  AND p.status = 'PUBLISHED'
  AND (p."publishedAt" IS NULL OR p."publishedAt" <= NOW())
GROUP BY c.id, c.slug, c."namePt"
ORDER BY total_posts DESC;

-- 6. PUBLICAR POSTS EM DRAFT (se necessário)
-- ⚠️ CUIDADO: Execute apenas se quiser publicar todos os drafts
-- UPDATE "BlogPost"
-- SET status = 'PUBLISHED', "publishedAt" = NOW()
-- WHERE status = 'DRAFT';
