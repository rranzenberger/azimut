-- ═══════════════════════════════════════════════════════════════
-- ATUALIZAÇÃO: Credenciais e Equipe - Janeiro 2026
-- ═══════════════════════════════════════════════════════════════
-- VERSÃO EXECUTÁVEL - Execute apenas as queries que deseja
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- PASSO 1: VERIFICAR TABELAS DISPONÍVEIS (EXECUTÁVEL)
-- ═══════════════════════════════════════════════════════════════
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND (table_name ILIKE '%team%' 
    OR table_name ILIKE '%member%' 
    OR table_name ILIKE '%credential%'
    OR table_name ILIKE '%studio%'
    OR table_name ILIKE '%content%'
    OR table_name ILIKE '%page%'
    OR table_name ILIKE '%history%')
ORDER BY table_name;

-- ═══════════════════════════════════════════════════════════════
-- PASSO 2: ATUALIZAR BIO DO RANZ (se tabela TeamMembers existir)
-- ═══════════════════════════════════════════════════════════════
-- DESCOMENTE APENAS SE A TABELA EXISTIR:

/*
UPDATE "TeamMembers" 
SET 
  "bioPt" = '30+ anos em produção audiovisual, VR/XR e IA. Curador VR no Festival de Gramado. Especialista Autodesk certificado. 🏛️ Cidadão Canadense - Baseado em Vancouver, BC.',
  "bioEn" = '30+ years in audiovisual production, VR/XR and AI. VR Curator at Gramado Festival. Certified Autodesk specialist. 🏛️ Canadian Citizen - Based in Vancouver, BC.',
  "bioEs" = '30+ años en producción audiovisual, VR/XR e IA. Curador VR en el Festival de Gramado. Especialista Autodesk certificado. 🏛️ Ciudadano Canadiense - Basado en Vancouver, BC.',
  "bioFr" = '30+ ans en production audiovisuelle, VR/XR et IA. Conservateur VR au Festival de Gramado. Spécialiste Autodesk certifié. 🏛️ Citoyen Canadien - Basé à Vancouver, BC.',
  "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'ranz';
*/

-- ═══════════════════════════════════════════════════════════════
-- PASSO 3: ATUALIZAR CREDENCIAIS (se tabela Credentials existir)
-- ═══════════════════════════════════════════════════════════════
-- DESCOMENTE APENAS SE A TABELA EXISTIR:

-- Credencial 1: Membros fundadores XRBR
/*
INSERT INTO "Credentials" ("id", "order", "icon", "textPt", "textEn", "textEs", "textFr", "isPublished", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  1,
  '🏆',
  'Membros fundadores da Associação XRBR',
  'Founding members of XRBR Association',
  'Miembros fundadores de la Asociación XRBR',
  'Membres fondateurs de l''Association XRBR',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (id) DO UPDATE SET
  "textPt" = EXCLUDED."textPt",
  "textEn" = EXCLUDED."textEn",
  "textEs" = EXCLUDED."textEs",
  "textFr" = EXCLUDED."textFr",
  "updatedAt" = CURRENT_TIMESTAMP;
*/

-- ═══════════════════════════════════════════════════════════════
-- NOTA IMPORTANTE:
-- ═══════════════════════════════════════════════════════════════
-- Os dados de credenciais e equipe estão atualmente HARDCODED
-- no código React (src/pages/Studio.tsx), NÃO no banco de dados.
--
-- Para sincronizar com o backoffice, você tem 2 opções:
--
-- OPÇÃO 1: Manter hardcoded (atual)
--   - Mais rápido para mudanças
--   - Não precisa de banco
--   - Mas não sincroniza com CMS
--
-- OPÇÃO 2: Criar tabelas no banco
--   - Criar tabela "Credentials" e "TeamMembers"
--   - Atualizar código React para buscar do banco
--   - Permite edição via CMS
--
-- ═══════════════════════════════════════════════════════════════
