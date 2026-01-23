-- ═══════════════════════════════════════════════════════════════
-- ADICIONAR: Vanarts (2014), VFS (2018), Maple Leaf (1999, 2017)
-- ═══════════════════════════════════════════════════════════════
-- Execute no Neon SQL Editor: https://console.neon.tech
-- ═══════════════════════════════════════════════════════════════

-- 1. ATUALIZAR 1999: Trocar emoji 🇨🇦 por Maple-Leaf-Canada.png
UPDATE "CompanyHistory"
SET "icon" = '/Maple-Leaf-Canada.png'
WHERE ("titlePt" LIKE '%Discreet%' OR "titleEn" LIKE '%Discreet%')
  AND "year" = 1999;

-- 2. ATUALIZAR 2017: Trocar emoji 🍁 por Maple-Leaf-Canada.png
UPDATE "CompanyHistory"
SET "icon" = '/Maple-Leaf-Canada.png'
WHERE ("titlePt" LIKE '%Vancouver%' OR "titleEn" LIKE '%Vancouver%')
  AND "year" = 2017
  AND "type" = 'milestone';

-- 3. ADICIONAR 2014: Vanarts - CA Agente Educacional
INSERT INTO "CompanyHistory" (
  "year", "yearEnd", "type", 
  "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  "icon", "isFeatured", "displayOrder", 
  "bulletsPt", "bulletsEn", "bulletsEs", "bulletsFr",
  "isPublished"
)
VALUES (
  2014, NULL, 'partnership',
  'Vanarts - CA Agente Educacional',
  'Vanarts - CA Educational Agent',
  'Vanarts - CA Agente Educacional',
  'Vanarts - CA Agent Éducatif',
  'Parceria como agente educacional da Vanarts (Vancouver Institute of Media Arts) no Canadá.',
  'Partnership as educational agent for Vanarts (Vancouver Institute of Media Arts) in Canada.',
  'Asociación como agente educacional de Vanarts (Vancouver Institute of Media Arts) en Canadá.',
  'Partenariat en tant qu''agent éducatif pour Vanarts (Vancouver Institute of Media Arts) au Canada.',
  '/vanarts.png',
  true,
  20140,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY[]::text[],
  true
);

-- 4. ADICIONAR 2018: VFS Vancouver Film School - Agente Educacional
INSERT INTO "CompanyHistory" (
  "year", "yearEnd", "type", 
  "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn", "descriptionEs", "descriptionFr",
  "icon", "isFeatured", "displayOrder", 
  "bulletsPt", "bulletsEn", "bulletsEs", "bulletsFr",
  "isPublished"
)
VALUES (
  2018, NULL, 'partnership',
  'VFS Vancouver Film School - Agente Educacional',
  'VFS Vancouver Film School - Educational Agent',
  'VFS Vancouver Film School - Agente Educacional',
  'VFS Vancouver Film School - Agent Éducatif',
  'Parceria como agente educacional da VFS (Vancouver Film School), uma das principais escolas de cinema e mídia do mundo.',
  'Partnership as educational agent for VFS (Vancouver Film School), one of the world''s leading film and media schools.',
  'Asociación como agente educacional de VFS (Vancouver Film School), una de las principales escuelas de cine y medios del mundo.',
  'Partenariat en tant qu''agent éducatif pour VFS (Vancouver Film School), l''une des principales écoles de cinéma et médias au monde.',
  '/vfs.png',
  true,
  20180,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY[]::text[],
  true
);

-- ═══════════════════════════════════════════════════════════════
-- VERIFICAR RESULTADO
-- ═══════════════════════════════════════════════════════════════

-- Verificar eventos adicionados/atualizados
SELECT 
  "year",
  "type",
  "titlePt",
  "icon",
  "isFeatured"
FROM "CompanyHistory"
WHERE "year" IN (1999, 2014, 2017, 2018)
  AND (
    "titlePt" LIKE '%Vanarts%' OR 
    "titlePt" LIKE '%VFS%' OR 
    "titlePt" LIKE '%Vancouver%' OR
    "titlePt" LIKE '%Discreet%'
  )
ORDER BY "year" ASC;

-- ═══════════════════════════════════════════════════════════════
-- PRONTO! Eventos adicionados/atualizados:
-- ✅ 1999: Discreet - Maple Leaf (atualizado)
-- ✅ 2014: Vanarts - Agente Educacional (novo)
-- ✅ 2017: Vancouver - Maple Leaf (atualizado)
-- ✅ 2018: VFS - Agente Educacional (novo)
-- ═══════════════════════════════════════════════════════════════
