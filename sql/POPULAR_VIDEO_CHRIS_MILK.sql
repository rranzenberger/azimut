-- ═══════════════════════════════════════════════════════════════
-- VÍDEO CHRIS MILK - A Máquina de Empatia
-- ═══════════════════════════════════════════════════════════════
-- Cadastra o vídeo do Chris Milk na tabela Media
-- para ser gerenciado pelo backoffice
--
-- O vídeo aparece em 2 páginas:
--   1. /studio (página principal)
--   2. /studio/diferenciais (página de diferenciais)
--
-- Referência: TED Talk "How VR Can Create the Ultimate Empathy Machine" (2015)
-- Uso: Execute no console do Neon ou via psql
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- 1. VÍDEO PARA PÁGINA STUDIO PRINCIPAL
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
  'VIDEO',
  '/ChrisMilk.mp4',
  '/og-image.png',
  'mp4',
  'video/mp4',
  'Chris Milk - A Máquina de Empatia - TED Talk 2015 sobre como VR pode criar a máquina definitiva de empatia',
  'Chris Milk - The Empathy Machine - TED Talk 2015 on how VR can create the ultimate empathy machine',
  'Chris Milk - La Máquina de Empatía - TED Talk 2015 sobre cómo VR puede crear la máquina definitiva de empatía',
  'Chris Milk - La Machine à Empathie - TED Talk 2015 sur comment la VR peut créer la machine ultime d''empathie',
  'studio',
  'philosophy',
  'philosophy-video',
  NOW(),
  NOW()
)
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 2. VÍDEO PARA PÁGINA STUDIO/DIFERENCIAIS
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
  'VIDEO',
  '/ChrisMilk.mp4',
  '/og-image.png',
  'mp4',
  'video/mp4',
  'Chris Milk - A Máquina de Empatia - TED Talk 2015 sobre como VR pode criar a máquina definitiva de empatia',
  'Chris Milk - The Empathy Machine - TED Talk 2015 on how VR can create the ultimate empathy machine',
  'Chris Milk - La Máquina de Empatía - TED Talk 2015 sobre cómo VR puede crear la máquina definitiva de empatía',
  'Chris Milk - La Machine à Empathie - TED Talk 2015 sur comment la VR peut créer la machine ultime d''empathie',
  'studio/diferenciais',
  'philosophy',
  'philosophy-video',
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
  "altPt",
  "createdAt"
FROM "Media"
WHERE type = 'VIDEO' AND "sectionSlug" = 'philosophy'
ORDER BY "pageSlug";
