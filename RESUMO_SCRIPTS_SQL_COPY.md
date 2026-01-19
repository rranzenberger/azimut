# 📋 SCRIPTS SQL - PRONTOS PARA COPIAR

## ✅ **ORDEM DE EXECUÇÃO**

Execute os scripts **NESTA ORDEM** no Neon Console (Vercel → Storage → Neon → SQL Editor):

---

## 📄 **SCRIPT 1: Adicionar Campos**

**Arquivo:** `azimut-cms/scripts/01_ADICIONAR_CAMPOS_MOBILE_DESKTOP.sql`

**Copie e cole tudo abaixo:**

```sql
-- ═══════════════════════════════════════════════════════════════════════════
-- SCRIPT 1: ADICIONAR CAMPOS MOBILE/DESKTOP NA TABELA PAGE
-- ═══════════════════════════════════════════════════════════════════════════
-- Execute este script PRIMEIRO no Neon Console
-- Vercel → Storage → Neon → SQL Editor
-- ═══════════════════════════════════════════════════════════════════════════

-- Adicionar campos para Hero Description MOBILE (texto curto)
ALTER TABLE "Page" 
ADD COLUMN IF NOT EXISTS "heroDescriptionMobilePt" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionMobileEn" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionMobileEs" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionMobileFr" TEXT;

-- Adicionar campos para Hero Description DESKTOP (texto completo)
ALTER TABLE "Page" 
ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopPt" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopEn" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopEs" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopFr" TEXT;

-- Verificar se as colunas foram criadas
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'Page' 
  AND column_name LIKE '%heroDescription%'
ORDER BY column_name;

-- ═══════════════════════════════════════════════════════════════════════════
-- ✅ SCRIPT 1 CONCLUÍDO
-- ═══════════════════════════════════════════════════════════════════════════
-- Próximo passo: Execute o script 02_POPULAR_VANCOUVER_MOBILE_DESKTOP.sql
-- ═══════════════════════════════════════════════════════════════════════════
```

---

## 📄 **SCRIPT 2: Popular Dados**

**Arquivo:** `azimut-cms/scripts/02_POPULAR_VANCOUVER_MOBILE_DESKTOP.sql`

**Copie e cole tudo abaixo:**

```sql
-- ═══════════════════════════════════════════════════════════════════════════
-- SCRIPT 2: POPULAR VANCOUVER COM VERSÕES MOBILE E DESKTOP
-- ═══════════════════════════════════════════════════════════════════════════
-- Execute este script DEPOIS do script 01
-- Vercel → Storage → Neon → SQL Editor
-- ═══════════════════════════════════════════════════════════════════════════

-- Atualizar página Vancouver com todos os campos
UPDATE "Page" SET
  -- Hero Slogan (Title)
  "heroSloganPt" = 'Estudar em Vancouver',
  "heroSloganEn" = 'Study in Vancouver',
  "heroSloganEs" = 'Estudiar en Vancouver',
  "heroSloganFr" = 'Étudier à Vancouver',
  
  -- Hero Subtitle
  "heroSubtitlePt" = 'Sua carreira internacional começa aqui',
  "heroSubtitleEn" = 'Your international career starts here',
  "heroSubtitleEs" = 'Tu carrera internacional comienza aquí',
  "heroSubtitleFr" = 'Votre carrière internationale commence ici',
  
  -- ═══ MOBILE: Texto CURTO (otimizado para telas pequenas) ═══
  "heroDescriptionMobilePt" = '1 ano. 90%+ empregabilidade. Residência permanente possível.',
  "heroDescriptionMobileEn" = '1 year. 90%+ employability. Permanent residence possible.',
  "heroDescriptionMobileEs" = '1 año. 90%+ empleabilidad. Residencia permanente posible.',
  "heroDescriptionMobileFr" = '1 an. 90%+ employabilité. Résidence permanente possible.',
  
  -- ═══ DESKTOP: Texto COMPLETO (mais detalhado) ═══
  "heroDescriptionDesktopPt" = 'Forme-se em 1 ano nas melhores escolas de mídia do Canadá, com 90%+ de empregabilidade e possibilidade de residência permanente. Agente oficial VFS/VanArts para alunos de todo o mundo.',
  "heroDescriptionDesktopEn" = 'Graduate in 1 year at Canada''s best media schools, with 90%+ employability and possibility of permanent residence. Official VFS/VanArts agent for students worldwide.',
  "heroDescriptionDesktopEs" = 'Graduarse en 1 año en las mejores escuelas de medios de Canadá, con más del 90% de empleabilidad y posibilidad de residencia permanente. Agente oficial VFS/VanArts para estudiantes de todo el mundo.',
  "heroDescriptionDesktopFr" = 'Diplômez-vous en 1 an dans les meilleures écoles de médias du Canada, avec plus de 90% d''employabilité et possibilité de résidence permanente. Agent officiel VFS/VanArts pour étudiants du monde entier.',
  
  "updatedAt" = NOW()
WHERE slug = 'vancouver';

-- Se a página não existir, criar
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
  "heroDescriptionMobilePt",
  "heroDescriptionMobileEn",
  "heroDescriptionMobileEs",
  "heroDescriptionMobileFr",
  "heroDescriptionDesktopPt",
  "heroDescriptionDesktopEn",
  "heroDescriptionDesktopEs",
  "heroDescriptionDesktopFr",
  "createdAt", 
  "updatedAt"
)
SELECT
  gen_random_uuid(),
  'Vancouver',
  'vancouver',
  'PUBLISHED',
  'Estudar em Vancouver',
  'Study in Vancouver',
  'Estudiar en Vancouver',
  'Étudier à Vancouver',
  'Sua carreira internacional começa aqui',
  'Your international career starts here',
  'Tu carrera internacional comienza aquí',
  'Votre carrière internationale commence ici',
  '1 ano. 90%+ empregabilidade. Residência permanente possível.',
  '1 year. 90%+ employability. Permanent residence possible.',
  '1 año. 90%+ empleabilidad. Residencia permanente posible.',
  '1 an. 90%+ employabilité. Résidence permanente possible.',
  'Forme-se em 1 ano nas melhores escolas de mídia do Canadá, com 90%+ de empregabilidade e possibilidade de residência permanente. Agente oficial VFS/VanArts para alunos de todo o mundo.',
  'Graduate in 1 year at Canada''s best media schools, with 90%+ employability and possibility of permanent residence. Official VFS/VanArts agent for students worldwide.',
  'Graduarse en 1 año en las mejores escuelas de medios de Canadá, con más del 90% de empleabilidad y posibilidad de residencia permanente. Agente oficial VFS/VanArts para estudiantes de todo el mundo.',
  'Diplômez-vous en 1 an dans les meilleures écoles de médias du Canada, avec plus de 90% d''employabilité et possibilité de résidence permanente. Agent officiel VFS/VanArts pour étudiants du monde entier.',
  NOW(),
  NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Page" WHERE slug = 'vancouver');

-- Verificar resultado
SELECT 
  slug,
  name,
  "heroSloganPt",
  "heroSubtitlePt",
  "heroDescriptionMobilePt" AS "Mobile",
  "heroDescriptionDesktopPt" AS "Desktop",
  "updatedAt"
FROM "Page"
WHERE slug = 'vancouver';

-- ═══════════════════════════════════════════════════════════════════════════
-- ✅ SCRIPT 2 CONCLUÍDO
-- ═══════════════════════════════════════════════════════════════════════════
-- Agora os campos estão no banco. Próximo passo: Atualizar Prisma schema e backoffice
-- ═══════════════════════════════════════════════════════════════════════════
```

---

## ✅ **O QUE FOI FEITO**

1. ✅ Scripts SQL criados e organizados
2. ✅ Prisma schema atualizado com novos campos
3. ⏳ Backoffice será atualizado em seguida

---

## 🎯 **PRÓXIMOS PASSOS**

1. Execute os 2 scripts SQL acima no Neon Console
2. Execute migração Prisma: `cd azimut-cms && npx prisma migrate dev && npx prisma generate`
3. Backoffice será atualizado automaticamente (campos já estão no schema)

---

**Data:** 19 de Janeiro de 2026
