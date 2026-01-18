-- ═══════════════════════════════════════════════════════════════
-- VERIFICAR INSCRITOS NO NEWSLETTER
-- Execute no Neon SQL Editor: https://console.neon.tech
-- ═══════════════════════════════════════════════════════════════

-- 1️⃣ RESUMO GERAL
SELECT 
  'RESUMO NEWSLETTER' as categoria,
  COUNT(*) FILTER (WHERE "wantsNewsletter" = true) as total_inscritos,
  COUNT(*) FILTER (WHERE "wantsNewsletter" = true AND "preferredLanguage" = 'pt') as inscritos_pt,
  COUNT(*) FILTER (WHERE "wantsNewsletter" = true AND "preferredLanguage" = 'en') as inscritos_en,
  COUNT(*) FILTER (WHERE "wantsNewsletter" = true AND "preferredLanguage" = 'es') as inscritos_es,
  COUNT(*) FILTER (WHERE "wantsNewsletter" = true AND "preferredLanguage" = 'fr') as inscritos_fr
FROM "Lead";

-- 2️⃣ LISTAR TODOS OS INSCRITOS
SELECT 
  'INSCRITOS DETALHADOS' as categoria,
  l.id,
  l.email,
  l.name,
  l."preferredLanguage" as idioma,
  l."newsletterSource" as origem,
  l."createdAt" as data_inscricao,
  l.status,
  l."leadScore",
  CASE WHEN l."wantsNewsletter" = true THEN '✅' ELSE '❌' END as ativo
FROM "Lead" l
WHERE l."wantsNewsletter" = true
ORDER BY l."createdAt" DESC;

-- 3️⃣ INSCRITOS POR ORIGEM
SELECT 
  'INSCRITOS POR ORIGEM' as categoria,
  COALESCE(l."newsletterSource", 'sem-origem') as origem,
  COUNT(*) as total
FROM "Lead" l
WHERE l."wantsNewsletter" = true
GROUP BY l."newsletterSource"
ORDER BY total DESC;

-- 4️⃣ INSCRITOS RECENTES (últimos 30 dias)
SELECT 
  'INSCRITOS RECENTES' as categoria,
  l.email,
  l.name,
  l."preferredLanguage" as idioma,
  l."newsletterSource" as origem,
  l."createdAt" as data_inscricao
FROM "Lead" l
WHERE l."wantsNewsletter" = true
  AND l."createdAt" >= NOW() - INTERVAL '30 days'
ORDER BY l."createdAt" DESC;

-- 5️⃣ VERIFICAR EMAILS DUPLICADOS OU SUSPEITOS
SELECT 
  'EMAILS SUSPEITOS' as categoria,
  l.email,
  COUNT(*) as ocorrencias,
  STRING_AGG(l.id::text, ', ') as ids,
  STRING_AGG(l."createdAt"::text, ', ') as datas
FROM "Lead" l
WHERE l."wantsNewsletter" = true
GROUP BY l.email
HAVING COUNT(*) > 1
ORDER BY ocorrencias DESC;

-- 6️⃣ RESUMO FINAL
SELECT 
  'RESUMO FINAL' as categoria,
  (SELECT COUNT(*) FROM "Lead" WHERE "wantsNewsletter" = true) as total_inscritos,
  (SELECT COUNT(*) FROM "Lead" WHERE "wantsNewsletter" = true AND "createdAt" >= NOW() - INTERVAL '7 days') as novos_7_dias,
  (SELECT COUNT(*) FROM "Lead" WHERE "wantsNewsletter" = true AND "createdAt" >= NOW() - INTERVAL '30 days') as novos_30_dias,
  (SELECT COUNT(DISTINCT "newsletterSource") FROM "Lead" WHERE "wantsNewsletter" = true) as total_origens;
