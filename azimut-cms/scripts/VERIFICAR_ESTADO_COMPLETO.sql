-- ═══════════════════════════════════════════════════════════════
-- VERIFICAÇÃO COMPLETA DO ESTADO DO BACKOFFICE
-- Execute no Neon SQL Editor: https://console.neon.tech
-- Data: 17 de Janeiro de 2026
-- ═══════════════════════════════════════════════════════════════

-- ══════════════════════════════════════
-- 1. CONTAGEM GERAL DE TODAS AS TABELAS
-- ══════════════════════════════════════
SELECT '=== CONTAGEM GERAL ===' as info;

SELECT 'Markets' as tabela, COUNT(*) as total FROM "Market"
UNION ALL SELECT 'Media', COUNT(*) FROM "Media"
UNION ALL SELECT 'Projects', COUNT(*) FROM "Project"
UNION ALL SELECT 'Services', COUNT(*) FROM "Service"
UNION ALL SELECT 'Pages', COUNT(*) FROM "Page"
UNION ALL SELECT 'Leads', COUNT(*) FROM "Lead"
UNION ALL SELECT 'Tags', COUNT(*) FROM "Tag"
UNION ALL SELECT 'Users', COUNT(*) FROM "User"
UNION ALL SELECT 'Sessions', COUNT(*) FROM "VisitorSession"
ORDER BY tabela;

-- ══════════════════════════════════════
-- 2. PROJETOS - STATUS E DETALHES
-- ══════════════════════════════════════
SELECT '=== PROJETOS ===' as info;

SELECT 
  status,
  COUNT(*) as quantidade
FROM "Project"
GROUP BY status;

SELECT 
  slug,
  title,
  status,
  featured,
  "priorityHome",
  CASE WHEN "heroImageId" IS NOT NULL THEN '✅' ELSE '❌' END as tem_imagem
FROM "Project"
WHERE status = 'PUBLISHED'
ORDER BY "priorityHome" DESC
LIMIT 15;

-- ══════════════════════════════════════
-- 3. SERVIÇOS - STATUS E DETALHES
-- ══════════════════════════════════════
SELECT '=== SERVIÇOS ===' as info;

SELECT 
  status,
  COUNT(*) as quantidade
FROM "Service"
GROUP BY status;

SELECT 
  slug,
  "titlePt",
  status,
  priority
FROM "Service"
WHERE status = 'PUBLISHED'
ORDER BY priority ASC;

-- ══════════════════════════════════════
-- 4. PÁGINAS - STATUS E DETALHES
-- ══════════════════════════════════════
SELECT '=== PÁGINAS ===' as info;

SELECT 
  status,
  COUNT(*) as quantidade
FROM "Page"
GROUP BY status;

SELECT 
  slug,
  name,
  status,
  LEFT("heroSloganPt", 50) as slogan_preview
FROM "Page"
ORDER BY slug;

-- ══════════════════════════════════════
-- 5. MÍDIAS - RESUMO
-- ══════════════════════════════════════
SELECT '=== MÍDIAS ===' as info;

SELECT 
  type,
  COUNT(*) as quantidade
FROM "Media"
GROUP BY type;

-- ══════════════════════════════════════
-- 6. LEADS - RESUMO
-- ══════════════════════════════════════
SELECT '=== LEADS ===' as info;

SELECT 
  status,
  COUNT(*) as quantidade
FROM "Lead"
GROUP BY status;

-- ══════════════════════════════════════
-- 7. VERIFICAÇÃO DE PROBLEMAS
-- ══════════════════════════════════════
SELECT '=== VERIFICAÇÃO DE PROBLEMAS ===' as info;

-- Projetos sem imagem hero
SELECT 'Projetos sem imagem hero' as problema, COUNT(*) as quantidade
FROM "Project" 
WHERE "heroImageId" IS NULL AND status = 'PUBLISHED';

-- Serviços sem descrição
SELECT 'Serviços sem descrição PT' as problema, COUNT(*) as quantidade
FROM "Service"
WHERE ("descriptionPt" IS NULL OR "descriptionPt" = '') AND status = 'PUBLISHED';

-- Páginas sem slogan
SELECT 'Páginas sem slogan PT' as problema, COUNT(*) as quantidade
FROM "Page"
WHERE ("heroSloganPt" IS NULL OR "heroSloganPt" = '') AND status = 'PUBLISHED';

-- ══════════════════════════════════════
-- 8. RESUMO FINAL
-- ══════════════════════════════════════
SELECT '=== RESUMO FINAL ===' as info;

SELECT 
  (SELECT COUNT(*) FROM "Project" WHERE status = 'PUBLISHED') as projetos_publicados,
  (SELECT COUNT(*) FROM "Service" WHERE status = 'PUBLISHED') as servicos_publicados,
  (SELECT COUNT(*) FROM "Page" WHERE status = 'PUBLISHED') as paginas_publicadas,
  (SELECT COUNT(*) FROM "Media") as total_midias,
  (SELECT COUNT(*) FROM "Lead") as total_leads,
  (SELECT COUNT(*) FROM "User") as total_usuarios;
