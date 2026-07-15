-- 15/jul/2026 — Aba GigRadar Beta no backoffice
-- Adiciona o tipo de lead do app GigRadar (landing azimutimmersive.com/pt/gigradar).
-- Aplicar no Neon (SQL Editor) OU: npx prisma db execute --file migrations/add_gigradar_leadtype.sql
-- Seguro re-executar (IF NOT EXISTS).
ALTER TYPE "LeadType" ADD VALUE IF NOT EXISTS 'GIGRADAR_BETA';
