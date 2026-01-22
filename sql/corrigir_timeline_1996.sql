-- ═══════════════════════════════════════════════════════════════
-- CORRIGIR TIMELINE: Remover dados anteriores a 1996
-- ═══════════════════════════════════════════════════════════════
-- A história da EMPRESA Azimut começa em 1996 (ArchiCAD)
-- Dados de 1980 e 1990 eram sobre história pessoal, não da empresa
-- ═══════════════════════════════════════════════════════════════

-- 1. Ver quantos registros existem antes de 1996
SELECT COUNT(*) as total_antes_1996 FROM "CompanyHistory" WHERE year < 1996;

-- 2. Ver quais são esses registros
SELECT id, year, "titlePt", type FROM "CompanyHistory" WHERE year < 1996 ORDER BY year;

-- 3. REMOVER todos os registros anteriores a 1996
DELETE FROM "CompanyHistory" WHERE year < 1996;

-- 4. Verificar resultado
SELECT COUNT(*) as total_apos_limpeza FROM "CompanyHistory";

-- 5. Ver o ano mais antigo agora
SELECT MIN(year) as ano_mais_antigo FROM "CompanyHistory";

-- ═══════════════════════════════════════════════════════════════
-- RESULTADO ESPERADO:
-- - ano_mais_antigo = 1996
-- - Nenhum evento de 1980 ou 1990
-- ═══════════════════════════════════════════════════════════════
