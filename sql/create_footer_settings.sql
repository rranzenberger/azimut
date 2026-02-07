-- ═══════════════════════════════════════════════════════════════
-- FOOTER SETTINGS – Tabela isolada para dados do rodapé
-- Rodar no Neon (SQL Editor). Usar botão RUN.
-- ═══════════════════════════════════════════════════════════════

-- ETAPA 1 – Criar tabela FooterSettings
CREATE TABLE IF NOT EXISTS "FooterSettings" (
  "id"             TEXT NOT NULL DEFAULT 'singleton',
  "contactEmail"   TEXT,
  "contactPhone"   TEXT,
  "whatsappNumber" TEXT,
  "instagramUrl"   TEXT,
  "youtubeUrl"     TEXT,
  "linkedinUrl"    TEXT,
  "vimeoUrl"       TEXT,
  "behanceUrl"     TEXT,
  "facebookUrl"    TEXT,
  "twitterUrl"     TEXT,
  "createdAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "FooterSettings_pkey" PRIMARY KEY ("id")
);

-- ETAPA 2 – Migrar dados do Settings para FooterSettings (se existirem)
INSERT INTO "FooterSettings" ("id", "contactEmail", "contactPhone", "whatsappNumber",
  "instagramUrl", "youtubeUrl", "linkedinUrl", "vimeoUrl", "behanceUrl",
  "facebookUrl", "twitterUrl", "createdAt", "updatedAt")
SELECT
  'singleton',
  "contactEmail",
  "contactPhone",
  "whatsappNumber",
  "instagramUrl",
  "youtubeUrl",
  "linkedinUrl",
  "vimeoUrl",
  "behanceUrl",
  "facebookUrl",
  "twitterUrl",
  NOW(),
  NOW()
FROM "Settings"
WHERE "id" = 'singleton'
ON CONFLICT ("id") DO UPDATE SET
  "contactEmail"   = EXCLUDED."contactEmail",
  "contactPhone"   = EXCLUDED."contactPhone",
  "whatsappNumber" = EXCLUDED."whatsappNumber",
  "instagramUrl"   = EXCLUDED."instagramUrl",
  "youtubeUrl"     = EXCLUDED."youtubeUrl",
  "linkedinUrl"    = EXCLUDED."linkedinUrl",
  "vimeoUrl"       = EXCLUDED."vimeoUrl",
  "behanceUrl"     = EXCLUDED."behanceUrl",
  "facebookUrl"    = EXCLUDED."facebookUrl",
  "twitterUrl"     = EXCLUDED."twitterUrl",
  "updatedAt"      = NOW();

-- ETAPA 3 – Se Settings não tinha dados, popular com valores padrão
INSERT INTO "FooterSettings" ("id", "contactEmail", "whatsappNumber",
  "instagramUrl", "youtubeUrl", "linkedinUrl", "vimeoUrl", "behanceUrl",
  "createdAt", "updatedAt")
VALUES (
  'singleton',
  'contact@azimutimmersive.com',
  '+55 48 999701301',
  'https://www.instagram.com/azimut_vr/',
  'https://youtube.com/@azimutart',
  'https://linkedin.com/company/azimut-art',
  'https://vimeo.com/azimutart',
  'https://behance.net/azimutart',
  NOW(), NOW()
)
ON CONFLICT ("id") DO NOTHING;

-- VERIFICAR resultado:
-- SELECT * FROM "FooterSettings";
