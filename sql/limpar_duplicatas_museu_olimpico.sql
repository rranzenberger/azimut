-- ═══════════════════════════════════════════════════════════════
-- LIMPAR DUPLICATAS DO MUSEU OLÍMPICO
-- ═══════════════════════════════════════════════════════════════
-- Execute no Neon SQL Editor: https://console.neon.tech
-- ═══════════════════════════════════════════════════════════════

-- 1. Verificar duplicatas do Museu Olímpico
SELECT id, year, "yearEnd", "titlePt", "titleEn", "createdAt"
FROM "CompanyHistory" 
WHERE ("titlePt" LIKE '%Museu Ol%' OR "titleEn" LIKE '%Olympic Museum%')
ORDER BY "createdAt" DESC;

-- 2. Manter apenas o registro mais recente e correto, deletar os outros
-- Primeiro, vamos identificar qual manter (o que tem o título correto "Rio Museu Olímpico - Direção Geral")
DELETE FROM "CompanyHistory"
WHERE ("titlePt" LIKE '%Museu Ol%' OR "titleEn" LIKE '%Olympic Museum%')
  AND "titlePt" != 'Rio Museu Olímpico - Direção Geral'
  AND "titleEn" != 'Rio Olympic Museum - General Direction';

-- 3. Se ainda houver duplicatas com o título correto, manter apenas o mais recente
WITH duplicatas AS (
  SELECT id,
    ROW_NUMBER() OVER (PARTITION BY "titlePt" ORDER BY "createdAt" DESC) as rn
  FROM "CompanyHistory"
  WHERE "titlePt" = 'Rio Museu Olímpico - Direção Geral'
)
DELETE FROM "CompanyHistory"
WHERE id IN (
  SELECT id FROM duplicatas WHERE rn > 1
);

-- 4. Verificar resultado final
SELECT id, year, "yearEnd", "titlePt", "titleEn", type, "isFeatured"
FROM "CompanyHistory" 
WHERE ("titlePt" LIKE '%Museu Ol%' OR "titleEn" LIKE '%Olympic Museum%')
ORDER BY year DESC;

-- ═══════════════════════════════════════════════════════════════
-- PRONTO! Duplicatas removidas.
-- Agora deve haver apenas 1 registro do Rio Museu Olímpico.
-- ═══════════════════════════════════════════════════════════════
