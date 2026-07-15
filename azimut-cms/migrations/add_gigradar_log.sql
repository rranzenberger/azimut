-- 15/jul/2026 — Tabela de logs de diagnóstico enviados pelo app GigRadar (beta)
-- Aplicar no Neon (SQL Editor) OU: npx prisma db execute --file migrations/add_gigradar_log.sql
-- Seguro re-executar (IF NOT EXISTS).
CREATE TABLE IF NOT EXISTS "GigRadarLog" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "deviceId" TEXT NOT NULL,
  "contact" TEXT,
  "appVersion" TEXT,
  "logText" TEXT NOT NULL,
  "aiSummary" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GigRadarLog_pkey" PRIMARY KEY ("id")
);

-- Se a tabela já existia sem a coluna (deploy anterior), adiciona agora:
ALTER TABLE "GigRadarLog" ADD COLUMN IF NOT EXISTS "aiSummary" TEXT;

CREATE INDEX IF NOT EXISTS "GigRadarLog_deviceId_idx" ON "GigRadarLog"("deviceId");
CREATE INDEX IF NOT EXISTS "GigRadarLog_createdAt_idx" ON "GigRadarLog"("createdAt");
