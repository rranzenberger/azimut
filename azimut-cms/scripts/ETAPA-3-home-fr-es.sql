-- ═══════════════════════════════════════════════════════════════
-- SCRIPT INCREMENTAL SEGURO - ETAPA 3: HOME (FRANCÊS E ESPANHOL)
-- Executar APENAS se Etapa 1 e 2 funcionaram!
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- PASSO 1: VERIFICAR SE PT E EN ESTÃO POPULADOS
-- ═══════════════════════════════════════════════════════════════

SELECT "heroSloganPt", "heroSloganEn", "heroSloganFr", "heroSloganEs"
FROM "Page" 
WHERE slug = 'home';

-- RESULTADO ESPERADO:
-- heroSloganPt: "EXPERIÊNCIAS QUE CONECTAM MUNDOS"
-- heroSloganEn: "EXPERIENCES THAT CONNECT WORLDS"
-- heroSloganFr: NULL (vamos popular agora)
-- heroSloganEs: NULL (vamos popular agora)

-- ⚠️ SE heroSloganPt OU heroSloganEn ESTIVEREM VAZIOS, VOLTE PARA ETAPAS ANTERIORES!

-- ═══════════════════════════════════════════════════════════════
-- PASSO 2: POPULAR HOME - FRANCÊS E ESPANHOL
-- ═══════════════════════════════════════════════════════════════

UPDATE "Page"
SET 
  -- Hero FRANCÊS
  "heroSloganFr" = 'EXPÉRIENCES QUI CONNECTENT LES MONDES',
  "heroSubtitleFr" = 'Nous créons des expériences immersives entre le Brésil et le Canada.',
  "pillar1Fr" = 'Musées & Culture',
  "pillar2Fr" = 'Marques & Événements',
  "pillar3Fr" = 'Éducation & Recherche',
  
  -- Hero ESPANHOL
  "heroSloganEs" = 'EXPERIENCIAS QUE CONECTAN MUNDOS',
  "heroSubtitleEs" = 'Creamos experiencias inmersivas entre Brasil y Canadá.',
  "pillar1Es" = 'Museos & Cultura',
  "pillar2Es" = 'Marcas & Eventos',
  "pillar3Es" = 'Educación & Investigación',
  
  "updatedAt" = NOW()
WHERE slug = 'home';

-- VERIFICAR SE ATUALIZOU:
SELECT "heroSloganFr", "heroSloganEs"
FROM "Page" 
WHERE slug = 'home';

-- RESULTADO ESPERADO:
-- heroSloganFr: "EXPÉRIENCES QUI CONNECTENT LES MONDES"
-- heroSloganEs: "EXPERIENCIAS QUE CONECTAN MUNDOS"

-- ═══════════════════════════════════════════════════════════════
-- PASSO 3: TESTAR API (FRANCÊS E ESPANHOL)
-- ═══════════════════════════════════════════════════════════════

-- Francês:
-- curl "https://backoffice.azmt.com.br/api/public/content?lang=fr&page=home"

-- Espanhol:
-- curl "https://backoffice.azmt.com.br/api/public/content?lang=es&page=home"

-- ═══════════════════════════════════════════════════════════════
-- PASSO 4: TESTAR SITE AO VIVO
-- ═══════════════════════════════════════════════════════════════

-- Francês: https://azimut.art/fr
-- Espanhol: https://azimut.art/es

-- ═══════════════════════════════════════════════════════════════
-- ✅ SE TUDO FUNCIONOU ATÉ AQUI:
-- HOME ESTÁ 100% MULTILÍNGUE!
-- Pode executar scripts para outras páginas (Academy, Studio, Work, What)
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- ❌ SE ALGO QUEBROU:
-- Execute o ROLLBACK abaixo para reverter
-- ═══════════════════════════════════════════════════════════════

-- ROLLBACK (REVERTER):
-- UPDATE "Page"
-- SET 
--   "heroSloganFr" = NULL,
--   "heroSubtitleFr" = NULL,
--   "pillar1Fr" = NULL,
--   "pillar2Fr" = NULL,
--   "pillar3Fr" = NULL,
--   "heroSloganEs" = NULL,
--   "heroSubtitleEs" = NULL,
--   "pillar1Es" = NULL,
--   "pillar2Es" = NULL,
--   "pillar3Es" = NULL,
--   "updatedAt" = NOW()
-- WHERE slug = 'home';

-- ═══════════════════════════════════════════════════════════════
-- FIM DA ETAPA 3 - HOME COMPLETA!
-- ═══════════════════════════════════════════════════════════════

