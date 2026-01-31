# 📋 SCRIPTS SQL - COPIAR E COLAR

## ⚠️ COPIAR APENAS O CÓDIGO SQL (sem os títulos)

---

## SCRIPT 1: CRIAR CAMPOS

Copie tudo abaixo e cole no SQL Editor:

```
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "heroDescriptionMobilePt" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "heroDescriptionMobileEn" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "heroDescriptionMobileEs" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "heroDescriptionMobileFr" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopPt" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopEn" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopEs" TEXT;
ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "heroDescriptionDesktopFr" TEXT;
```

---

## SCRIPT 2: POPULAR VANCOUVER

Copie tudo abaixo e cole no SQL Editor:

```
UPDATE "Page" SET "heroSloganPt" = 'Estudar em Vancouver', "heroSloganEn" = 'Study in Vancouver', "heroSloganEs" = 'Estudar en Vancouver', "heroSloganFr" = 'Étudier à Vancouver', "heroSubtitlePt" = 'Sua carreira internacional começa aqui', "heroSubtitleEn" = 'Your international career starts here', "heroSubtitleEs" = 'Tu carrera internacional comienza aquí', "heroSubtitleFr" = 'Votre carrière internationale commence ici', "heroDescriptionMobilePt" = '1 ano. 90%+ empregabilidade. Residência permanente possível.', "heroDescriptionMobileEn" = '1 year. 90%+ employability. Permanent residence possible.', "heroDescriptionMobileEs" = '1 año. 90%+ empleabilidad. Residencia permanente posible.', "heroDescriptionMobileFr" = '1 an. 90%+ employabilité. Résidence permanente possible.', "heroDescriptionDesktopPt" = 'Forme-se em 1 ano nas melhores escolas de mídia do Canadá, com 90%+ de empregabilidade e possibilidade de residência permanente. Agente oficial VFS/VanArts para alunos de todo o mundo.', "heroDescriptionDesktopEn" = 'Graduate in 1 year at Canada''s best media schools, with 90%+ employability and possibility of permanent residence. Official VFS/VanArts agent for students worldwide.', "heroDescriptionDesktopEs" = 'Graduarse en 1 año en las mejores escuelas de medios de Canadá, con más del 90% de empleabilidad y posibilidad de residencia permanente. Agente oficial VFS/VanArts para estudiantes de todo el mundo.', "heroDescriptionDesktopFr" = 'Diplômez-vous en 1 an dans les meilleures écoles de médias du Canada, avec plus de 90% d''employabilité et possibilité de résidence permanente. Agent officiel VFS/VanArts pour étudiants du monde entier.', "updatedAt" = NOW() WHERE slug = 'vancouver';
```

---

## ORDEM DE EXECUÇÃO:

1. Execute SCRIPT 1 primeiro
2. Depois execute SCRIPT 2
3. Pronto!
