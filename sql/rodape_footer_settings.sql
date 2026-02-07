-- ═══════════════════════════════════════════════════════════════
-- RODAPÉ / FOOTER – Contato, WhatsApp e redes sociais
-- Rodar no Neon. Usar botão RUN (não Explain – Explain não suporta ALTER).
-- Rodar uma etapa por vez; depois fazer deploy (etapa 5).
-- ═══════════════════════════════════════════════════════════════

-- ---------------------------------------------------------------------------
-- ETAPA 3 – Criar colunas do rodapé (se ainda não existirem)
-- Registrar: executado em ___/___/_____ às _____
-- ---------------------------------------------------------------------------
ALTER TABLE "Settings" ADD COLUMN IF NOT EXISTS "whatsappNumber" TEXT;
ALTER TABLE "Settings" ADD COLUMN IF NOT EXISTS "vimeoUrl" TEXT;
ALTER TABLE "Settings" ADD COLUMN IF NOT EXISTS "behanceUrl" TEXT;


-- ---------------------------------------------------------------------------
-- ETAPA 4 – Garantir singleton + popular WhatsApp, email e redes
-- Registrar: executado em ___/___/_____ às _____
-- ---------------------------------------------------------------------------
INSERT INTO "Settings" (id, "siteName", "siteUrl", "createdAt", "updatedAt")
VALUES ('singleton', 'Azimut', 'https://azmt.com.br', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

UPDATE "Settings"
SET
  "contactEmail" = 'contact@azimutimmersive.com',
  "whatsappNumber" = '+55 48 999701301',
  "instagramUrl" = 'https://www.instagram.com/azimut_vr/',
  "youtubeUrl" = COALESCE("youtubeUrl", 'https://youtube.com/@azimutart'),
  "linkedinUrl" = COALESCE("linkedinUrl", 'https://linkedin.com/company/azimut-art'),
  "vimeoUrl" = COALESCE("vimeoUrl", 'https://vimeo.com/azimutart'),
  "behanceUrl" = COALESCE("behanceUrl", 'https://behance.net/azimutart'),
  "updatedAt" = NOW()
WHERE id = 'singleton';


-- ---------------------------------------------------------------------------
-- ETAPA 5 – Deploy (não é SQL)
-- No terminal: git add . && git commit -m "rodape settings" && git push origin main
-- Registrar: deploy em ___/___/_____ às _____
-- ---------------------------------------------------------------------------
