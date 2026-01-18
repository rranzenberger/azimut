-- ═══════════════════════════════════════════════════════════════
-- VERIFICAR QUAIS SECTIONS A HOME TEM
-- Execute no Neon SQL Editor: https://console.neon.tech
-- ═══════════════════════════════════════════════════════════════

SELECT 
  s.id,
  s."order",
  s.type,
  s."titlePt",
  s."titleEn",
  s.layout,
  CASE WHEN s."bodyPt" IS NOT NULL THEN '✅' ELSE '❌' END as tem_conteudo,
  s."createdAt"
FROM "Section" s
JOIN "Page" p ON s."pageId" = p.id
WHERE p.slug = 'home'
ORDER BY s."order";
