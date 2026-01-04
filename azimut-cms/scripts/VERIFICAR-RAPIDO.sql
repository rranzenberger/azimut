-- ═══════════════════════════════════════════════════════════════
-- SCRIPT SUPER RÁPIDO - VERIFICAR SE HOME TEM CONTEÚDO
-- Copie TUDO, cole no Neon SQL Editor, execute (Ctrl+Enter)
-- Me diga o resultado que apareceu!
-- ═══════════════════════════════════════════════════════════════

SELECT 
  slug,
  "heroSloganPt" as "Português",
  "heroSloganEn" as "Inglês"
FROM "Page" 
WHERE slug = 'home';

-- ═══════════════════════════════════════════════════════════════
-- RESULTADO POSSÍVEL 1: "0 rows" ou tabela vazia
-- → Me diga: "Deu 0 linhas" ou "Vazio"
-- → Eu te digo: "Executar ETAPA 1"
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- RESULTADO POSSÍVEL 2: Mostra 1 linha, mas colunas NULL (vazias)
-- → Me diga: "Tem 1 linha mas tudo NULL"
-- → Eu te digo: "Executar ETAPA 1"
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- RESULTADO POSSÍVEL 3: Mostra 1 linha com texto em português
-- → Me diga: "Tem 1 linha com texto: EXPERIÊNCIAS..."
-- → Eu te digo: "Executar ETAPA 2" ou "JÁ ESTÁ PRONTO"
-- ═══════════════════════════════════════════════════════════════

