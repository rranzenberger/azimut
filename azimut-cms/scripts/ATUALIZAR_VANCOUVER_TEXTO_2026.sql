-- ═══════════════════════════════════════════════════════════════════════════
-- 🚀 ATUALIZAR TEXTOS VANCOUVER - JANEIRO 2026
-- ═══════════════════════════════════════════════════════════════════════════
-- Execute este SQL no Neon Console (Vercel → Storage → Neon → SQL Editor)
-- Data: 17 de Janeiro de 2026
-- ═══════════════════════════════════════════════════════════════════════════
-- 
-- ATUALIZAÇÕES:
-- ✅ Hero description simplificado (mobile)
-- ✅ Hero description completo (desktop)
-- ✅ Subtitle atualizado
-- ✅ Todos os idiomas (PT, EN, ES, FR)
-- ═══════════════════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════════════════
-- 1. INSERIR OU ATUALIZAR PÁGINA VANCOUVER
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO "Page" (
  id, 
  name, 
  slug, 
  status, 
  "heroSloganPt", 
  "heroSloganEn", 
  "heroSloganEs", 
  "heroSloganFr",
  "heroSubtitlePt",
  "heroSubtitleEn",
  "heroSubtitleEs",
  "heroSubtitleFr",
  "createdAt", 
  "updatedAt"
)
VALUES (
  COALESCE((SELECT id FROM "Page" WHERE slug = 'vancouver'), gen_random_uuid()),
  'Vancouver',
  'vancouver',
  'PUBLISHED',
  -- Hero Slogan (Title)
  'Estudar em Vancouver',
  'Study in Vancouver',
  'Estudiar en Vancouver',
  'Étudier à Vancouver',
  -- Hero Subtitle
  'Sua carreira internacional começa aqui',
  'Your international career starts here',
  'Tu carrera internacional comienza aquí',
  'Votre carrière internationale commence ici',
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  "heroSloganPt" = EXCLUDED."heroSloganPt",
  "heroSloganEn" = EXCLUDED."heroSloganEn",
  "heroSloganEs" = EXCLUDED."heroSloganEs",
  "heroSloganFr" = EXCLUDED."heroSloganFr",
  "heroSubtitlePt" = EXCLUDED."heroSubtitlePt",
  "heroSubtitleEn" = EXCLUDED."heroSubtitleEn",
  "heroSubtitleEs" = EXCLUDED."heroSubtitleEs",
  "heroSubtitleFr" = EXCLUDED."heroSubtitleFr",
  "updatedAt" = NOW();

-- ═══════════════════════════════════════════════════════════════════════════
-- 2. INSERIR OU ATUALIZAR SECTIONS DA VANCOUVER
-- ═══════════════════════════════════════════════════════════════════════════
-- Se a tabela sections existir e tiver campos para hero_description

-- Hero Description CURTO (Mobile) - UPDATE ou INSERT
DO $$
DECLARE
  v_page_id UUID;
  v_section_id UUID;
BEGIN
  -- Buscar ID da página Vancouver
  SELECT id INTO v_page_id FROM "Page" WHERE slug = 'vancouver';
  
  IF v_page_id IS NULL THEN
    RAISE EXCEPTION 'Página Vancouver não encontrada. Execute primeiro a inserção da página.';
  END IF;
  
  -- Verificar se section já existe
  SELECT id INTO v_section_id FROM "Section" WHERE "pageId" = v_page_id AND type = 'hero_description_short' LIMIT 1;
  
  IF v_section_id IS NOT NULL THEN
    -- UPDATE
    UPDATE "Section" SET
      "bodyPt" = '1 ano. 90%+ empregabilidade. Residência permanente possível.',
      "bodyEn" = '1 year. 90%+ employability. Permanent residence possible.',
      "bodyEs" = '1 año. 90%+ empleabilidad. Residencia permanente posible.',
      "bodyFr" = '1 an. 90%+ employabilité. Résidence permanente possible.',
      "updatedAt" = NOW()
    WHERE id = v_section_id;
  ELSE
    -- INSERT
    INSERT INTO "Section" (id, "pageId", type, "order", "bodyPt", "bodyEn", "bodyEs", "bodyFr", "createdAt", "updatedAt")
    VALUES (gen_random_uuid(), v_page_id, 'hero_description_short', 1,
      '1 ano. 90%+ empregabilidade. Residência permanente possível.',
      '1 year. 90%+ employability. Permanent residence possible.',
      '1 año. 90%+ empleabilidad. Residencia permanente posible.',
      '1 an. 90%+ employabilité. Résidence permanente possible.',
      NOW(), NOW());
  END IF;
END $$;

-- Hero Description COMPLETO (Desktop) - UPDATE ou INSERT
DO $$
DECLARE
  v_page_id UUID;
  v_section_id UUID;
BEGIN
  SELECT id INTO v_page_id FROM "Page" WHERE slug = 'vancouver';
  SELECT id INTO v_section_id FROM "Section" WHERE "pageId" = v_page_id AND type = 'hero_description_full' LIMIT 1;
  
  IF v_section_id IS NOT NULL THEN
    UPDATE "Section" SET
      "bodyPt" = 'Forme-se em 1 ano nas melhores escolas de mídia do Canadá, com 90%+ de empregabilidade e possibilidade de residência permanente. Agente oficial VFS/VanArts para alunos de todo o mundo.',
      "bodyEn" = 'Graduate in 1 year at Canada''s best media schools, with 90%+ employability and possibility of permanent residence. Official VFS/VanArts agent for students worldwide.',
      "bodyEs" = 'Graduarse en 1 año en las mejores escuelas de medios de Canadá, con más del 90% de empleabilidad y posibilidad de residencia permanente. Agente oficial VFS/VanArts para estudiantes de todo el mundo.',
      "bodyFr" = 'Diplômez-vous en 1 an dans les meilleures écoles de médias du Canada, avec plus de 90% d''employabilité et possibilité de résidence permanente. Agent officiel VFS/VanArts pour étudiants du monde entier.',
      "updatedAt" = NOW()
    WHERE id = v_section_id;
  ELSE
    INSERT INTO "Section" (id, "pageId", type, "order", "bodyPt", "bodyEn", "bodyEs", "bodyFr", "createdAt", "updatedAt")
    VALUES (gen_random_uuid(), v_page_id, 'hero_description_full', 2,
      'Forme-se em 1 ano nas melhores escolas de mídia do Canadá, com 90%+ de empregabilidade e possibilidade de residência permanente. Agente oficial VFS/VanArts para alunos de todo o mundo.',
      'Graduate in 1 year at Canada''s best media schools, with 90%+ employability and possibility of permanent residence. Official VFS/VanArts agent for students worldwide.',
      'Graduarse en 1 año en las mejores escuelas de medios de Canadá, con más del 90% de empleabilidad y posibilidad de residencia permanente. Agente oficial VFS/VanArts para estudiantes de todo el mundo.',
      'Diplômez-vous en 1 an dans les meilleures écoles de médias du Canada, avec plus de 90% d''employabilité et possibilité de résidence permanente. Agent officiel VFS/VanArts pour étudiants du monde entier.',
      NOW(), NOW());
  END IF;
END $$;

-- CTA Hero - UPDATE ou INSERT
DO $$
DECLARE
  v_page_id UUID;
  v_section_id UUID;
BEGIN
  SELECT id INTO v_page_id FROM "Page" WHERE slug = 'vancouver';
  SELECT id INTO v_section_id FROM "Section" WHERE "pageId" = v_page_id AND type = 'cta_hero' LIMIT 1;
  
  IF v_section_id IS NOT NULL THEN
    UPDATE "Section" SET
      "bodyPt" = 'Calcule seu investimento',
      "bodyEn" = 'Calculate your investment',
      "bodyEs" = 'Calcular mi inversión',
      "bodyFr" = 'Calculer mon investissement',
      "updatedAt" = NOW()
    WHERE id = v_section_id;
  ELSE
    INSERT INTO "Section" (id, "pageId", type, "order", "bodyPt", "bodyEn", "bodyEs", "bodyFr", "createdAt", "updatedAt")
    VALUES (gen_random_uuid(), v_page_id, 'cta_hero', 3,
      'Calcule seu investimento',
      'Calculate your investment',
      'Calcular mi inversión',
      'Calculer mon investissement',
      NOW(), NOW());
  END IF;
END $$;

-- ═══════════════════════════════════════════════════════════════════════════
-- 3. VERIFICAÇÃO FINAL
-- ═══════════════════════════════════════════════════════════════════════════

-- Verificar se foi atualizado corretamente
SELECT 
  slug,
  name,
  "heroSloganPt",
  "heroSubtitlePt",
  "updatedAt"
FROM "Page"
WHERE slug = 'vancouver';

-- Verificar sections criadas
SELECT 
  s.type,
  s."bodyPt",
  s."bodyEn",
  s."updatedAt"
FROM "Section" s
JOIN "Page" p ON s."pageId" = p.id
WHERE p.slug = 'vancouver'
ORDER BY s."order";

-- ═══════════════════════════════════════════════════════════════════════════
-- ✅ SCRIPT CONCLUÍDO
-- ═══════════════════════════════════════════════════════════════════════════
-- 
-- O que foi atualizado:
-- ✅ Hero Slogan (Title) - 4 idiomas
-- ✅ Hero Subtitle - 4 idiomas
-- ✅ Hero Description CURTO (Mobile) - 4 idiomas
-- ✅ Hero Description COMPLETO (Desktop) - 4 idiomas
-- ✅ CTA Hero - 4 idiomas
-- 
-- Próximos passos:
-- 1. Execute este script no Neon Console
-- 2. Verifique os resultados das queries de verificação
-- 3. Teste no backoffice se os textos aparecem corretamente
-- ═══════════════════════════════════════════════════════════════════════════
