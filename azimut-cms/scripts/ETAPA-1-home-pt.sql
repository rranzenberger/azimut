-- ═══════════════════════════════════════════════════════════════
-- SCRIPT INCREMENTAL SEGURO - ETAPA 1: HOME (PORTUGUÊS)
-- Executar linha por linha, testando cada etapa
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- PASSO 1: VERIFICAR SE HOME EXISTE (SÓ CONSULTA - SEM RISCO)
-- ═══════════════════════════════════════════════════════════════

SELECT id, slug, name, status, "heroSloganPt", "heroSloganEn"
FROM "Page" 
WHERE slug = 'home';

-- RESULTADO ESPERADO:
-- Se retornar 0 linhas: Precisa criar a página (passo 2)
-- Se retornar 1 linha: Página existe, ir direto para passo 3

-- ═══════════════════════════════════════════════════════════════
-- PASSO 2: CRIAR HOME (SÓ SE NÃO EXISTIR)
-- ═══════════════════════════════════════════════════════════════

INSERT INTO "Page" (id, name, slug, status)
VALUES (gen_random_uuid(), 'Home', 'home', 'PUBLISHED')
ON CONFLICT (slug) DO NOTHING;

-- VERIFICAR SE CRIOU:
SELECT id, slug, name FROM "Page" WHERE slug = 'home';

-- RESULTADO ESPERADO: 1 linha com a home

-- ═══════════════════════════════════════════════════════════════
-- PASSO 3: POPULAR HOME - APENAS PORTUGUÊS
-- ═══════════════════════════════════════════════════════════════

UPDATE "Page"
SET 
  -- Hero (título e subtítulo)
  "heroSloganPt" = 'EXPERIÊNCIAS QUE CONECTAM MUNDOS',
  "heroSubtitlePt" = 'Criamos experiências imersivas entre Brasil e Canadá.',
  
  -- Pillars (3 botões)
  "pillar1Pt" = 'Museus & Cultura',
  "pillar2Pt" = 'Marcas & Eventos',
  "pillar3Pt" = 'Educação & Pesquisa',
  
  "updatedAt" = NOW()
WHERE slug = 'home';

-- VERIFICAR SE ATUALIZOU:
SELECT "heroSloganPt", "heroSubtitlePt", "pillar1Pt", "pillar2Pt", "pillar3Pt"
FROM "Page" 
WHERE slug = 'home';

-- RESULTADO ESPERADO:
-- heroSloganPt: "EXPERIÊNCIAS QUE CONECTAM MUNDOS"
-- heroSubtitlePt: "Criamos experiências imersivas entre Brasil e Canadá."
-- pillar1Pt: "Museus & Cultura"
-- pillar2Pt: "Marcas & Eventos"
-- pillar3Pt: "Educação & Pesquisa"

-- ═══════════════════════════════════════════════════════════════
-- PASSO 4: TESTAR API (PORTUGUÊS)
-- ═══════════════════════════════════════════════════════════════

-- Copiar e colar no terminal:
-- curl "https://backoffice.azmt.com.br/api/public/content?lang=pt&page=home"

-- RESULTADO ESPERADO (JSON):
-- {
--   "lang": "pt",
--   "heroSlogan": "EXPERIÊNCIAS QUE CONECTAM MUNDOS",
--   "heroSubtitle": "Criamos experiências imersivas entre Brasil e Canadá.",
--   "page": {
--     "heroSlogan": "EXPERIÊNCIAS QUE CONECTAM MUNDOS",
--     "heroSubtitle": "Criamos experiências imersivas entre Brasil e Canadá.",
--     "pillars": [
--       "Museus & Cultura",
--       "Marcas & Eventos",
--       "Educação & Pesquisa"
--     ]
--   }
-- }

-- ═══════════════════════════════════════════════════════════════
-- PASSO 5: TESTAR SITE AO VIVO
-- ═══════════════════════════════════════════════════════════════

-- Abrir no navegador: https://azimut.art/pt
-- 
-- VERIFICAR:
-- ✅ Título hero aparece: "EXPERIÊNCIAS QUE CONECTAM MUNDOS"
-- ✅ Subtítulo aparece: "Criamos experiências imersivas entre Brasil e Canadá."
-- ✅ 3 botões aparecem: "Museus & Cultura", "Marcas & Eventos", "Educação & Pesquisa"

-- ═══════════════════════════════════════════════════════════════
-- ✅ SE TUDO FUNCIONOU ATÉ AQUI:
-- Pode executar o script da ETAPA 2 (adicionar inglês)
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- ❌ SE ALGO QUEBROU:
-- Execute o ROLLBACK abaixo para reverter
-- ═══════════════════════════════════════════════════════════════

-- ROLLBACK (REVERTER):
-- UPDATE "Page"
-- SET 
--   "heroSloganPt" = NULL,
--   "heroSubtitlePt" = NULL,
--   "pillar1Pt" = NULL,
--   "pillar2Pt" = NULL,
--   "pillar3Pt" = NULL,
--   "updatedAt" = NOW()
-- WHERE slug = 'home';

-- ═══════════════════════════════════════════════════════════════
-- FIM DA ETAPA 1
-- ═══════════════════════════════════════════════════════════════

