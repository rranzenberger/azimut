-- 27/jul/2026 — Fechamento de turno com OBD + provas em imagem (GigRadar)
-- Depende de add_gigradar_backup.sql (aplicado 27/jul 01:14). Seguro re-executar.
--
-- PRIVACIDADE (ler antes de mexer em GigRadarShot):
-- Os prints são a tela da oferta da Uber/99 e contêm ENDEREÇO DE EMBARQUE E DESTINO de
-- passageiros reais — dado pessoal de terceiro que nunca consentiu. No aparelho do próprio
-- motorista isso é diagnóstico; num servidor vira tratamento de dado pessoal.
-- Por isso: `expiresAt` obrigatório (30 dias), `redacted` para marcar quando o endereço foi
-- borrado antes de subir, e purga periódica. Quando entrarem beta testers, revisar com o
-- jurídico ANTES de ligar o envio de imagem para eles.

-- ============================================================
-- 1. TURNO: resumo do OBD no fechamento
-- ============================================================
ALTER TABLE "GigRadarShift" ADD COLUMN IF NOT EXISTS "obdSamples"     INTEGER;
ALTER TABLE "GigRadarShift" ADD COLUMN IF NOT EXISTS "avgSpeedKmh"    DOUBLE PRECISION;
ALTER TABLE "GigRadarShift" ADD COLUMN IF NOT EXISTS "maxSpeedKmh"    INTEGER;
ALTER TABLE "GigRadarShift" ADD COLUMN IF NOT EXISTS "avgEngineLoad"  DOUBLE PRECISION;
ALTER TABLE "GigRadarShift" ADD COLUMN IF NOT EXISTS "fuelLevelStart" DOUBLE PRECISION;
ALTER TABLE "GigRadarShift" ADD COLUMN IF NOT EXISTS "fuelLevelEnd"   DOUBLE PRECISION;
ALTER TABLE "GigRadarShift" ADD COLUMN IF NOT EXISTS "obdConnected"   BOOLEAN;
ALTER TABLE "GigRadarShift" ADD COLUMN IF NOT EXISTS "platform"       TEXT;
ALTER TABLE "GigRadarShift" ADD COLUMN IF NOT EXISTS "notes"          TEXT;

-- Nota Uno GNV (teste real 26/jul): 012F devolve o tanque de GASOLINA, nunca o GNV.
-- 015E (fuel rate) e 0110 (MAF) NÃO respondem. Não usar fuelLevel como consumo de GNV.

-- ============================================================
-- 2. PROVAS EM IMAGEM — retenção curta e obrigatória
-- ============================================================
CREATE TABLE IF NOT EXISTS "GigRadarShot" (
  "id"           TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "deviceId"     TEXT NOT NULL,
  "localName"    TEXT NOT NULL,          -- nome do arquivo no aparelho (idempotência)
  "tag"          TEXT,                   -- oferta_GREEN, oferta_RED_CRITICO, empilhada, parcial
  "verdict"      TEXT,
  "platform"     TEXT,
  "rideLocalId"  BIGINT,                 -- amarra com GigRadarRide.localId
  "url"          TEXT,                   -- preferido: blob externo (Vercel Blob)
  "bytes"        BYTEA,                  -- alternativa p/ volume baixo (1 aparelho)
  "sizeBytes"    INTEGER,
  "redacted"     BOOLEAN NOT NULL DEFAULT FALSE,
  "ts"           TIMESTAMP(3) NOT NULL,
  "expiresAt"    TIMESTAMP(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL '30 days'),
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GigRadarShot_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "GigRadarShot_device_local_key" UNIQUE ("deviceId", "localName")
);
CREATE INDEX IF NOT EXISTS "GigRadarShot_device_ts_idx"  ON "GigRadarShot"("deviceId", "ts" DESC);
CREATE INDEX IF NOT EXISTS "GigRadarShot_expires_idx"    ON "GigRadarShot"("expiresAt");
CREATE INDEX IF NOT EXISTS "GigRadarShot_ride_idx"       ON "GigRadarShot"("rideLocalId");

-- ============================================================
-- 3. VISÃO: resumo do turno
-- ============================================================
CREATE OR REPLACE VIEW "GigRadarShiftSummary" AS
SELECT
  s."deviceId",
  s."localId",
  s."startedAt",
  s."endedAt",
  s."hours",
  s."km",
  s."offers",
  s."accepted",
  s."gross",
  ROUND((s."gross" / NULLIF(s."hours", 0))::numeric, 2)              AS bruto_por_hora,
  ROUND((100.0 * s."accepted" / NULLIF(s."offers", 0))::numeric, 1)  AS pct_aceite,
  s."idleMin",
  s."runMin",
  ROUND((100.0 * s."idleMin" / NULLIF(s."idleMin" + s."runMin", 0))::numeric, 1) AS pct_parado,
  s."obdConnected",
  s."obdSamples",
  s."avgSpeedKmh",
  (SELECT COUNT(*) FROM "GigRadarShot" h
    WHERE h."deviceId" = s."deviceId"
      AND h."ts" BETWEEN s."startedAt" AND COALESCE(s."endedAt", NOW()))        AS prints
FROM "GigRadarShift" s;

-- ============================================================
-- 4. PURGA — rodar periodicamente (ou o Codex agenda no cron da API)
-- ============================================================
-- DELETE FROM "GigRadarShot" WHERE "expiresAt" < NOW();
