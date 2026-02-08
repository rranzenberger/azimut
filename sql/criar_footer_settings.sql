-- ═══════════════════════════════════════════════════════════════
-- FOOTER SETTINGS – Tabela isolada para rodapé do site
-- Rodar no Neon. Usar botão RUN (não Explain).
-- ═══════════════════════════════════════════════════════════════

-- ---------------------------------------------------------------------------
-- ETAPA 1 – Criar tabela FooterSettings
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "FooterSettings" (
  "id"             TEXT PRIMARY KEY DEFAULT 'singleton',
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
  "updatedAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------------
-- ETAPA 2 – Migrar dados de Settings para FooterSettings
-- (copia se FooterSettings estiver vazio e Settings existir)
-- ---------------------------------------------------------------------------
INSERT INTO "FooterSettings" (
  "id", "contactEmail", "contactPhone", "whatsappNumber",
  "instagramUrl", "youtubeUrl", "linkedinUrl", "vimeoUrl", "behanceUrl",
  "facebookUrl", "twitterUrl", "createdAt", "updatedAt"
)
SELECT
  'singleton',
  "contactEmail", "contactPhone", "whatsappNumber",
  "instagramUrl", "youtubeUrl", "linkedinUrl", "vimeoUrl", "behanceUrl",
  "facebookUrl", "twitterUrl", NOW(), NOW()
FROM "Settings"
WHERE id = 'singleton'
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- ETAPA 3 – Verificar dados migrados
-- ---------------------------------------------------------------------------
SELECT * FROM "FooterSettings" WHERE id = 'singleton';
