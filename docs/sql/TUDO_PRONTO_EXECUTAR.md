# ✅ TUDO PRONTO - SÓ EXECUTAR OS SCRIPTS SQL

## 🎉 **STATUS: BACKOFFICE JÁ IMPLEMENTADO!**

✅ **Backoffice:** Campos Mobile/Desktop já estão no formulário  
✅ **Prisma Schema:** Campos adicionados  
✅ **API:** Salva os novos campos  
✅ **Scripts SQL:** Prontos para executar  

**Falta apenas:** Executar os 2 scripts SQL no banco de dados

---

## 📋 **SCRIPTS SQL - COPIAR E COLAR**

### **SCRIPT 1: Criar Campos no Banco**

**Copie TUDO abaixo e cole no Neon Console SQL Editor:**

```sql
ALTER TABLE "Page" 
ADD COLUMN IF NOT EXISTS "heroDescriptionMobilePt" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionMobileEn" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionMobileEs" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionMobileFr" TEXT;

ALTER TABLE "Page" 
ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopPt" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopEn" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopEs" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopFr" TEXT;

SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'Page' 
  AND column_name LIKE '%heroDescription%'
ORDER BY column_name;
```

**✅ Resultado esperado:** 8 colunas criadas

---

### **SCRIPT 2: Popular Dados Vancouver**

**Copie TUDO abaixo e cole no Neon Console SQL Editor:**

```sql
UPDATE "Page" SET
  "heroSloganPt" = 'Estudar em Vancouver',
  "heroSloganEn" = 'Study in Vancouver',
  "heroSloganEs" = 'Estudiar en Vancouver',
  "heroSloganFr" = 'Étudier à Vancouver',
  "heroSubtitlePt" = 'Sua carreira internacional começa aqui',
  "heroSubtitleEn" = 'Your international career starts here',
  "heroSubtitleEs" = 'Tu carrera internacional comienza aquí',
  "heroSubtitleFr" = 'Votre carrière internationale commence ici',
  "heroDescriptionMobilePt" = '1 ano. 90%+ empregabilidade. Residência permanente possível.',
  "heroDescriptionMobileEn" = '1 year. 90%+ employability. Permanent residence possible.',
  "heroDescriptionMobileEs" = '1 año. 90%+ empleabilidad. Residencia permanente posible.',
  "heroDescriptionMobileFr" = '1 an. 90%+ employabilité. Résidence permanente possible.',
  "heroDescriptionDesktopPt" = 'Forme-se em 1 ano nas melhores escolas de mídia do Canadá, com 90%+ de empregabilidade e possibilidade de residência permanente. Agente oficial VFS/VanArts para alunos de todo o mundo.',
  "heroDescriptionDesktopEn" = 'Graduate in 1 year at Canada''s best media schools, with 90%+ employability and possibility of permanent residence. Official VFS/VanArts agent for students worldwide.',
  "heroDescriptionDesktopEs" = 'Graduarse en 1 año en las mejores escuelas de medios de Canadá, con más del 90% de empleabilidad y posibilidad de residencia permanente. Agente oficial VFS/VanArts para estudiantes de todo el mundo.',
  "heroDescriptionDesktopFr" = 'Diplômez-vous en 1 an dans les meilleures écoles de médias du Canada, avec plus de 90% d''employabilité et possibilité de résidence permanente. Agent officiel VFS/VanArts pour étudiants du monde entier.',
  "updatedAt" = NOW()
WHERE slug = 'vancouver';

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
```

**✅ Resultado esperado:** 1 linha com todos os campos preenchidos

---

## 🎯 **ONDE EXECUTAR:**

1. Acesse: **Vercel Dashboard** → **Storage** → **Neon** → **SQL Editor**
2. Execute **Script 1** primeiro
3. Execute **Script 2** depois
4. Pronto! ✅

---

## 📝 **APÓS EXECUTAR OS SCRIPTS:**

1. Execute migração Prisma (opcional, mas recomendado):
   ```bash
   cd azimut-cms
   npx prisma migrate dev --name add_mobile_desktop_fields
   npx prisma generate
   ```

2. Teste no backoffice:
   - Acesse: `/admin/pages/edit/vancouver`
   - Você verá a seção **"📱💻 Hero Description (Mobile vs Desktop)"**
   - Campos Mobile (4 idiomas) e Desktop/Web (4 idiomas)

---

## ✅ **O QUE JÁ ESTÁ PRONTO:**

- ✅ Backoffice com campos Mobile/Desktop
- ✅ Prisma schema atualizado
- ✅ API que salva os campos
- ✅ Scripts SQL limpos e prontos

**Só falta executar os scripts SQL!** 🚀
