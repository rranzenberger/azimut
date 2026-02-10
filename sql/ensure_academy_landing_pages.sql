-- ═══════════════════════════════════════════════════════════════
-- Garantir que as 4 páginas dos cards da Academy existam no banco
-- para o backoffice e o site poderem usar (hero, imagens, textos).
-- Execute no Neon (ou no banco do backoffice) se os cards não
-- aparecerem no site mesmo após editar no backoffice.
-- ═══════════════════════════════════════════════════════════════

-- Inserir ou atualizar as 4 páginas (slug único)
INSERT INTO "Page" (
  "id",
  "name",
  "slug",
  "status",
  "createdAt",
  "updatedAt"
)
VALUES
  (gen_random_uuid()::text, 'CA Vancouver', 'academy/vancouver', 'PUBLISHED', NOW(), NOW()),
  (gen_random_uuid()::text, 'Cursos', 'academy/courses', 'PUBLISHED', NOW(), NOW()),
  (gen_random_uuid()::text, 'Workshops & Eventos', 'academy/workshops', 'PUBLISHED', NOW(), NOW()),
  (gen_random_uuid()::text, 'Corporate', 'academy/corporate', 'PUBLISHED', NOW(), NOW())
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "status" = 'PUBLISHED',
  "updatedAt" = NOW();

-- Depois de rodar: no backoffice, em Academy → "4 cards" → Trocar imagem / EDITAR
-- em cada card. O que for salvo (hero da página) passará a aparecer no site.
