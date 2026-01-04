-- ═══════════════════════════════════════════════════════════════
-- SCRIPT INCREMENTAL SEGURO - ETAPA 2: HOME (INGLÊS)
-- Executar APENAS se Etapa 1 funcionou!
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- PASSO 1: VERIFICAR SE PORTUGUÊS ESTÁ POPULADO
-- ═══════════════════════════════════════════════════════════════

SELECT "heroSloganPt", "heroSloganEn"
FROM "Page" 
WHERE slug = 'home';

-- RESULTADO ESPERADO:
-- heroSloganPt: "EXPERIÊNCIAS QUE CONECTAM MUNDOS"
-- heroSloganEn: NULL (vazio, vamos popular agora)

-- ⚠️ SE heroSloganPt ESTIVER VAZIO, VOLTE PARA ETAPA 1!

-- ═══════════════════════════════════════════════════════════════
-- PASSO 2: POPULAR HOME - INGLÊS
-- ═══════════════════════════════════════════════════════════════

UPDATE "Page"
SET 
  -- Hero (título e subtítulo)
  "heroSloganEn" = 'EXPERIENCES THAT CONNECT WORLDS',
  "heroSubtitleEn" = 'We create immersive experiences between Brazil and Canada.',
  
  -- Pillars (3 botões)
  "pillar1En" = 'Museums & Culture',
  "pillar2En" = 'Brands & Events',
  "pillar3En" = 'Education & Research',
  
  "updatedAt" = NOW()
WHERE slug = 'home';

-- VERIFICAR SE ATUALIZOU:
SELECT "heroSloganEn", "heroSubtitleEn", "pillar1En", "pillar2En", "pillar3En"
FROM "Page" 
WHERE slug = 'home';

-- RESULTADO ESPERADO:
-- heroSloganEn: "EXPERIENCES THAT CONNECT WORLDS"
-- heroSubtitleEn: "We create immersive experiences between Brazil and Canada."
-- pillar1En: "Museums & Culture"
-- pillar2En: "Brands & Events"
-- pillar3En: "Education & Research"

-- ═══════════════════════════════════════════════════════════════
-- PASSO 3: TESTAR API (INGLÊS)
-- ═══════════════════════════════════════════════════════════════

-- Copiar e colar no terminal:
-- curl "https://backoffice.azmt.com.br/api/public/content?lang=en&page=home"

-- RESULTADO ESPERADO (JSON):
-- {
--   "lang": "en",
--   "heroSlogan": "EXPERIENCES THAT CONNECT WORLDS",
--   "heroSubtitle": "We create immersive experiences between Brazil and Canada.",
--   "page": {
--     "heroSlogan": "EXPERIENCES THAT CONNECT WORLDS",
--     "heroSubtitle": "We create immersive experiences between Brazil and Canada.",
--     "pillars": [
--       "Museums & Culture",
--       "Brands & Events",
--       "Education & Research"
--     ]
--   }
-- }

-- ═══════════════════════════════════════════════════════════════
-- PASSO 4: TESTAR SITE AO VIVO
-- ═══════════════════════════════════════════════════════════════

-- Abrir no navegador: https://azimut.art/en
-- 
-- VERIFICAR:
-- ✅ Título hero aparece: "EXPERIENCES THAT CONNECT WORLDS"
-- ✅ Subtítulo aparece: "We create immersive experiences between Brazil and Canada."
-- ✅ 3 botões aparecem: "Museums & Culture", "Brands & Events", "Education & Research"

-- ═══════════════════════════════════════════════════════════════
-- ✅ SE TUDO FUNCIONOU ATÉ AQUI:
-- Pode executar o script da ETAPA 3 (adicionar francês e espanhol)
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- ❌ SE ALGO QUEBROU:
-- Execute o ROLLBACK abaixo para reverter
-- ═══════════════════════════════════════════════════════════════

-- ROLLBACK (REVERTER):
-- UPDATE "Page"
-- SET 
--   "heroSloganEn" = NULL,
--   "heroSubtitleEn" = NULL,
--   "pillar1En" = NULL,
--   "pillar2En" = NULL,
--   "pillar3En" = NULL,
--   "updatedAt" = NOW()
-- WHERE slug = 'home';

-- ═══════════════════════════════════════════════════════════════
-- FIM DA ETAPA 2
-- ═══════════════════════════════════════════════════════════════

