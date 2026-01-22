-- ═══════════════════════════════════════════════════════════════
-- LIMPAR E POPULAR TIMELINE CORRETAMENTE
-- ═══════════════════════════════════════════════════════════════
-- Execute no Neon SQL Editor: https://console.neon.tech
-- ═══════════════════════════════════════════════════════════════

-- PASSO 1: LIMPAR DADOS ANTIGOS (antes de 1996)
DELETE FROM "CompanyHistory" WHERE year < 1996;

-- PASSO 2: LIMPAR DADOS DUPLICADOS OU INCORRETOS DE 1996
DELETE FROM "CompanyHistory" WHERE year = 1996;

-- PASSO 3: LIMPAR DADOS INCORRETOS DE 2000
DELETE FROM "CompanyHistory" WHERE year = 2000 AND "titlePt" LIKE '%Centro de Treinamento%';

-- VERIFICAR LIMPEZA
SELECT COUNT(*) as total_removido FROM "CompanyHistory" WHERE year < 2000;

-- ═══════════════════════════════════════════════════════════════
-- PASSO 4: INSERIR DADOS CORRETOS
-- ═══════════════════════════════════════════════════════════════

-- 1996: ArchiCAD Brasil (AINDA NÃO ERA CENTRO OFICIAL)
INSERT INTO "CompanyHistory" (
  "year", "type", "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn",
  "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn"
)
VALUES (
  1996, 'milestone',
  'ArchiCAD Brasil - Computação Gráfica',
  'ArchiCAD Brasil - Computer Graphics',
  'ArchiCAD Brasil - Computación Gráfica',
  'ArchiCAD Brasil - Infographie',
  'Início das atividades com ArchiCAD, computação gráfica, CAD e maquetes virtuais. Primeiro workshop de 3D Studio Max no Rio de Janeiro.',
  'Start of activities with ArchiCAD, computer graphics, CAD and virtual models. First 3D Studio Max workshop in Rio de Janeiro.',
  '🏗️', true, 20,
  ARRAY['ArchiCAD Brasil', 'Testou versão pré-lançamento do 3DS MAX', 'Primeiro workshop 3DS MAX no Rio', 'Pioneiros em Maquete Virtual no Brasil'],
  ARRAY['ArchiCAD Brasil', 'Tested pre-release version of 3DS MAX', 'First 3DS MAX workshop in Rio', 'Pioneers in Virtual Mockup in Brazil']
);

-- 2000-2018: AZMT Centro de Treinamento Autodesk (TORNOU-SE OFICIAL EM 2000)
INSERT INTO "CompanyHistory" (
  "year", "yearEnd", "type", "titlePt", "titleEn", "titleEs", "titleFr",
  "descriptionPt", "descriptionEn",
  "icon", "isFeatured", "displayOrder", "bulletsPt", "bulletsEn"
)
VALUES (
  2000, 2018, 'partnership',
  'AZMT - Centro de Treinamento Autodesk',
  'AZMT - Autodesk Training Center',
  'AZMT - Centro de Capacitación Autodesk',
  'AZMT - Centre de Formation Autodesk',
  'AZMT Computação e Produções Cinematográficas (nome fantasia Azimut) torna-se Centro de Treinamento Autodesk oficial na América do Sul por 18 anos.',
  'AZMT Computing and Cinematographic Productions (trade name Azimut) becomes official Autodesk Training Center in South America for 18 years.',
  '🎓', true, 25,
  ARRAY['Centro de Treinamento Autodesk Oficial (desde 2000)', 'Demo Artist Autodesk Discreet', 'Application Engineer América do Sul', 'Único Flame Trainer certificado no Brasil'],
  ARRAY['Official Autodesk Training Center (since 2000)', 'Demo Artist Autodesk Discreet', 'Application Engineer South America', 'Only certified Flame Trainer in Brazil']
);

-- ═══════════════════════════════════════════════════════════════
-- VERIFICAR RESULTADO FINAL
-- ═══════════════════════════════════════════════════════════════

-- Mostrar ano mais antigo (deve ser 1996)
SELECT MIN(year) as ano_mais_antigo FROM "CompanyHistory";

-- Mostrar eventos de 1996-2000
SELECT year, "titlePt", type FROM "CompanyHistory" WHERE year BETWEEN 1996 AND 2000 ORDER BY year, "displayOrder";

-- Total de eventos
SELECT COUNT(*) as total FROM "CompanyHistory";

-- ═══════════════════════════════════════════════════════════════
-- PRONTO! Agora a timeline está correta:
-- - 1996: ArchiCAD Brasil (computação gráfica, ainda não oficial)
-- - 2000-2018: AZMT Centro de Treinamento Autodesk (oficial)
-- ═══════════════════════════════════════════════════════════════
