-- Garantir usuário admin para login no backoffice
-- Use quando "Falha ao autenticar" / "Credenciais inválidas" em produção.
-- Execute no Neon (ou seu Postgres) com a extensão pgcrypto ativa.
--
-- Credenciais após rodar: admin@azimut.com.br / Azimut2025!

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Inserir ou atualizar admin (senha = Azimut2025!)
INSERT INTO "User" (id, email, name, role, password, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  'admin@azimut.com.br',
  'Admin Azimut',
  'SUPER_ADMIN',
  crypt('Azimut2025!', gen_salt('bf', 10)),
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  password = crypt('Azimut2025!', gen_salt('bf', 10)),
  name = 'Admin Azimut',
  role = 'SUPER_ADMIN',
  "updatedAt" = NOW();
