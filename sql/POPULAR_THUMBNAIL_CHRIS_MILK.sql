-- ═══════════════════════════════════════════════════════════════
-- THUMBNAIL CHRIS MILK - Imagem de capa do vídeo
-- ═══════════════════════════════════════════════════════════════
-- Cadastra o thumbnail do vídeo Chris Milk na tabela Media
-- Uso: Execute no console do Neon ou via psql
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- 1. THUMBNAIL PARA PÁGINA STUDIO
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Media" (
  id,
  type,
  "originalUrl",
  "thumbnailUrl",
  format,
  "contentType",
  "altPt",
  "altEn",
  "altEs",
  "altFr",
  "pageSlug",
  "sectionSlug",
  "imageType",
  "createdAt",
  "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'IMAGE',
  '/chris-milk-thumbnail.png',
  '/chris-milk-thumbnail.png',
  'png',
  'image/png',
  'Chris Milk no palco do TED Talk 2015 - A Máquina de Empatia',
  'Chris Milk on stage at TED Talk 2015 - The Empathy Machine',
  'Chris Milk en el escenario de TED Talk 2015 - La Máquina de Empatía',
  'Chris Milk sur scène au TED Talk 2015 - La Machine à Empathie',
  'studio',
  'philosophy-thumbnail',
  'video-poster',
  NOW(),
  NOW()
)
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 2. THUMBNAIL PARA PÁGINA STUDIO/DIFERENCIAIS
-- ═══════════════════════════════════════════════════════════════
INSERT INTO "Media" (
  id,
  type,
  "originalUrl",
  "thumbnailUrl",
  format,
  "contentType",
  "altPt",
  "altEn",
  "altEs",
  "altFr",
  "pageSlug",
  "sectionSlug",
  "imageType",
  "createdAt",
  "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'IMAGE',
  '/chris-milk-thumbnail.png',
  '/chris-milk-thumbnail.png',
  'png',
  'image/png',
  'Chris Milk no palco do TED Talk 2015 - A Máquina de Empatia',
  'Chris Milk on stage at TED Talk 2015 - The Empathy Machine',
  'Chris Milk en el escenario de TED Talk 2015 - La Máquina de Empatía',
  'Chris Milk sur scène au TED Talk 2015 - La Machine à Empathie',
  'studio/diferenciais',
  'philosophy-thumbnail',
  'video-poster',
  NOW(),
  NOW()
)
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 3. VERIFICAÇÃO
-- ═══════════════════════════════════════════════════════════════
SELECT 
  id,
  type,
  "originalUrl",
  "pageSlug",
  "sectionSlug",
  "imageType",
  "altPt"
FROM "Media"
WHERE "imageType" = 'video-poster'
ORDER BY "createdAt" DESC;
