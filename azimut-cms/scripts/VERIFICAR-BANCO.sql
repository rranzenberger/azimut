-- ═══════════════════════════════════════════════════════════════
-- VERIFICAR SE BANCO JÁ TEM DADOS
-- Execute este script ANTES de popular
-- ═══════════════════════════════════════════════════════════════

-- 1. VERIFICAR SE PÁGINAS EXISTEM
SELECT 
  id, 
  slug, 
  name, 
  status,
  "createdAt"
FROM "Page" 
WHERE slug IN ('home', 'what', 'work', 'studio', 'academy')
ORDER BY slug;

-- RESULTADO ESPERADO:
-- Se retornar 0 linhas: Banco vazio, precisa criar tudo
-- Se retornar 5 linhas: Páginas existem, só precisa popular

-- ═══════════════════════════════════════════════════════════════

-- 2. VERIFICAR SE HOME JÁ TEM CONTEÚDO MULTILÍNGUE
SELECT 
  slug,
  "heroSloganPt" as "PT",
  "heroSloganEn" as "EN",
  "heroSloganFr" as "FR",
  "heroSloganEs" as "ES"
FROM "Page" 
WHERE slug = 'home';

-- RESULTADO ESPERADO:
-- Se todos NULL: Precisa popular (executar scripts ETAPA-1, 2, 3)
-- Se PT preenchido: Já tem português, pode adicionar outros idiomas
-- Se todos preenchidos: JÁ ESTÁ COMPLETO! Integração funcionando!

-- ═══════════════════════════════════════════════════════════════

-- 3. VERIFICAR TODOS OS CAMPOS DA HOME (DIAGNÓSTICO COMPLETO)
SELECT 
  slug,
  -- Hero PT
  "heroSloganPt",
  "heroSubtitlePt",
  -- Hero EN
  "heroSloganEn",
  "heroSubtitleEn",
  -- Pillars PT
  "pillar1Pt",
  "pillar2Pt",
  "pillar3Pt",
  -- Pillars EN
  "pillar1En",
  "pillar2En",
  "pillar3En"
FROM "Page" 
WHERE slug = 'home';

-- RESULTADO ESPERADO:
-- Mostra exatamente quais campos estão preenchidos e quais estão vazios

-- ═══════════════════════════════════════════════════════════════
-- FIM DA VERIFICAÇÃO
-- ═══════════════════════════════════════════════════════════════

-- DECISÃO COM BASE NO RESULTADO:
-- 
-- ❌ Se tudo NULL → Executar ETAPA-1-home-pt.sql
-- ⚠️ Se só PT preenchido → Executar ETAPA-2-home-en.sql
-- ⚠️ Se PT e EN preenchidos → Executar ETAPA-3-home-fr-es.sql
-- ✅ Se tudo preenchido → JÁ ESTÁ PRONTO! Só testar API e site

