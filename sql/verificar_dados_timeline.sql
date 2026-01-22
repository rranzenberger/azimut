-- ═══════════════════════════════════════════════════════════════
-- SCRIPT DE VERIFICAÇÃO - DADOS TIMELINE
-- Execute este script para verificar se os dados foram inseridos corretamente
-- ═══════════════════════════════════════════════════════════════

-- 1. CONTAGEM TOTAL
SELECT 
  'Total de eventos' as verificacao,
  COUNT(*) as valor
FROM "CompanyHistory"
WHERE "isPublished" = true;

-- 2. DISTRIBUIÇÃO POR DÉCADA
SELECT 
  'Distribuição por década' as verificacao,
  CASE 
    WHEN "year" < 1990 THEN '1980s'
    WHEN "year" < 2000 THEN '1990s'
    WHEN "year" < 2010 THEN '2000s'
    WHEN "year" < 2020 THEN '2010s'
    ELSE '2020s'
  END as decada,
  COUNT(*) as quantidade
FROM "CompanyHistory"
WHERE "isPublished" = true
GROUP BY decada
ORDER BY decada;

-- 3. DISTRIBUIÇÃO POR TIPO
SELECT 
  'Distribuição por tipo' as verificacao,
  "type",
  COUNT(*) as quantidade
FROM "CompanyHistory"
WHERE "isPublished" = true
GROUP BY "type"
ORDER BY quantidade DESC;

-- 4. EVENTOS DESTACADOS
SELECT 
  'Eventos destacados' as verificacao,
  COUNT(*) as total_featured
FROM "CompanyHistory"
WHERE "isFeatured" = true AND "isPublished" = true;

-- 5. PERÍODO COMPLETO
SELECT 
  'Período completo' as verificacao,
  MIN("year") as ano_inicial,
  MAX("year") as ano_final,
  MAX("year") - MIN("year") as anos_de_historia
FROM "CompanyHistory"
WHERE "isPublished" = true;

-- 6. VERIFICAR CAMPOS OBRIGATÓRIOS (deve retornar 0 linhas)
SELECT 
  'Erros: campos obrigatórios NULL' as verificacao,
  COUNT(*) as erros_encontrados
FROM "CompanyHistory"
WHERE "year" IS NULL 
   OR "type" IS NULL 
   OR "titlePt" IS NULL 
   OR "titleEn" IS NULL
   OR "displayOrder" IS NULL;

-- 7. VERIFICAR TIPOS INVÁLIDOS (deve retornar 0 linhas)
SELECT 
  'Erros: tipos inválidos' as verificacao,
  COUNT(*) as erros_encontrados
FROM "CompanyHistory"
WHERE "type" NOT IN ('milestone', 'partnership', 'project', 'award', 'location', 'other');

-- 8. LISTAR PRIMEIROS 10 EVENTOS (amostra)
SELECT 
  'Amostra: primeiros 10 eventos' as verificacao,
  "year",
  "type",
  "titlePt",
  "isFeatured"
FROM "CompanyHistory"
WHERE "isPublished" = true
ORDER BY "year" ASC, "displayOrder" ASC
LIMIT 10;

-- 9. VERIFICAR EVENTOS COM BULLETS
SELECT 
  'Eventos com bullets' as verificacao,
  COUNT(*) as total_com_bullets
FROM "CompanyHistory"
WHERE "bulletsPt" IS NOT NULL 
  AND array_length("bulletsPt", 1) > 0
  AND "isPublished" = true;

-- 10. RESUMO FINAL
SELECT 
  '═══════════════════════════════════════' as separador,
  'RESUMO FINAL' as titulo,
  '═══════════════════════════════════════' as separador2;

SELECT 
  (SELECT COUNT(*) FROM "CompanyHistory" WHERE "isPublished" = true) as total_eventos,
  (SELECT COUNT(*) FROM "CompanyHistory" WHERE "isFeatured" = true AND "isPublished" = true) as eventos_destacados,
  (SELECT MIN("year") FROM "CompanyHistory" WHERE "isPublished" = true) as ano_inicial,
  (SELECT MAX("year") FROM "CompanyHistory" WHERE "isPublished" = true) as ano_final,
  (SELECT COUNT(DISTINCT "type") FROM "CompanyHistory" WHERE "isPublished" = true) as tipos_diferentes,
  (SELECT COUNT(*) FROM "CompanyHistory" WHERE "bulletsPt" IS NOT NULL AND "isPublished" = true) as eventos_com_bullets;
