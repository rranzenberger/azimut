-- ═══════════════════════════════════════════════════════════════
-- VERIFICAÇÃO: Listar tabelas disponíveis no CMS
-- ═══════════════════════════════════════════════════════════════
-- Execute ESTE SQL primeiro para ver quais tabelas existem
-- Depois ajuste o SQL de atualização conforme necessário

SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND (table_name ILIKE '%team%' 
    OR table_name ILIKE '%member%' 
    OR table_name ILIKE '%credential%'
    OR table_name ILIKE '%studio%'
    OR table_name ILIKE '%content%'
    OR table_name ILIKE '%page%')
ORDER BY table_name;
