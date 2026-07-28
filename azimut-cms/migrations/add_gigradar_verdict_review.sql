-- 27/jul/2026 — Acerto do veredito + histórico diário de logs (GigRadar)
--
-- Pergunta que isto responde: o 🟢🟡🔴 acertou?
--   FALSO_RUIM  = disse RED, mas a corrida era boa  → o motorista perdeu dinheiro obedecendo
--   FALSO_BOM   = disse GREEN, mas a corrida era ruim → o app queimou a confiança dele
-- Sem medir isso não dá pra afirmar que o app funciona — nem pra vender.
--
-- Também registra o que o app FEZ na hora: mostrou card? só falou? nem apareceu?
-- Em 27/jul a suspeita de "corridas sem card" não pôde ser confirmada porque o log é
-- rotativo e já tinha descartado o começo do turno. Com isto no banco, não se perde mais.
--
-- Aplicar no Neon (SQL Editor). Seguro re-executar (tudo IF NOT EXISTS / ADD COLUMN IF NOT EXISTS).
-- Depende de add_gigradar_backup.sql (já aplicado em 27/jul 01:14).

-- ============================================================
-- 1. O QUE O APP FEZ E SE ACERTOU (colunas novas em GigRadarRide)
-- ============================================================
ALTER TABLE "GigRadarRide" ADD COLUMN IF NOT EXISTS "shownAsCard"   BOOLEAN;
ALTER TABLE "GigRadarRide" ADD COLUMN IF NOT EXISTS "spokenOnly"    BOOLEAN;
ALTER TABLE "GigRadarRide" ADD COLUMN IF NOT EXISTS "cardMs"        INTEGER;   -- tempo até o card aparecer
ALTER TABLE "GigRadarRide" ADD COLUMN IF NOT EXISTS "generation"    BIGINT;    -- correlaciona com o log PERF

-- Veredito conferido depois pelo motorista
ALTER TABLE "GigRadarRide" ADD COLUMN IF NOT EXISTS "review"        TEXT;      -- ver domínio abaixo
ALTER TABLE "GigRadarRide" ADD COLUMN IF NOT EXISTS "reviewNote"    TEXT;
ALTER TABLE "GigRadarRide" ADD COLUMN IF NOT EXISTS "reviewAt"      TIMESTAMP(3);

-- O que a corrida rendeu DE VERDADE (só faz sentido se aceitou)
ALTER TABLE "GigRadarRide" ADD COLUMN IF NOT EXISTS "actualValue"   DOUBLE PRECISION;
ALTER TABLE "GigRadarRide" ADD COLUMN IF NOT EXISTS "actualMinutes" INTEGER;
ALTER TABLE "GigRadarRide" ADD COLUMN IF NOT EXISTS "actualKm"      DOUBLE PRECISION;

-- Domínio de "review" (texto simples de propósito: o app evolui mais rápido que um ENUM)
--   ACERTOU      — o veredito bateu com a realidade
--   FALSO_RUIM   — marcou RED/YELLOW e era boa (perdeu corrida boa)
--   FALSO_BOM    — marcou GREEN e era ruim (aceitou corrida ruim)
--   ATENCAO      — no limite, dependia do contexto (destino, hora, direção de casa)
--   NAO_APARECEU — a oferta existiu e o app não mostrou card
--   SO_FALOU     — falou por voz mas não desenhou o card
ALTER TABLE "GigRadarRide" DROP CONSTRAINT IF EXISTS "GigRadarRide_review_check";
ALTER TABLE "GigRadarRide" ADD CONSTRAINT "GigRadarRide_review_check"
  CHECK ("review" IS NULL OR "review" IN
    ('ACERTOU','FALSO_RUIM','FALSO_BOM','ATENCAO','NAO_APARECEU','SO_FALOU'));

CREATE INDEX IF NOT EXISTS "GigRadarRide_review_idx"   ON "GigRadarRide"("review");
CREATE INDEX IF NOT EXISTS "GigRadarRide_platform_idx" ON "GigRadarRide"("platform");

-- ============================================================
-- 2. LOG DIÁRIO AUTOMÁTICO (o log do aparelho é rotativo e some)
--    Um registro por aparelho por dia. Reenviar o mesmo dia SUBSTITUI, não duplica.
-- ============================================================
CREATE TABLE IF NOT EXISTS "GigRadarDailyLog" (
  "id"          TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "deviceId"    TEXT NOT NULL,
  "logDate"     DATE NOT NULL,
  "appVersion"  TEXT,
  "logText"     TEXT NOT NULL,
  "lines"       INTEGER,
  "offers"      INTEGER,          -- quantas OFERTA no dia
  "cards"       INTEGER,          -- quantos DIAG card
  "greens"      INTEGER,
  "yellows"     INTEGER,
  "reds"        INTEGER,
  "truncated"   BOOLEAN DEFAULT FALSE,  -- log já tinha girado antes de subir
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GigRadarDailyLog_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "GigRadarDailyLog_device_date_key" UNIQUE ("deviceId", "logDate")
);
CREATE INDEX IF NOT EXISTS "GigRadarDailyLog_device_date_idx"
  ON "GigRadarDailyLog"("deviceId", "logDate" DESC);

-- ============================================================
-- 3. VISÕES — acerto por plataforma e por veredito
-- ============================================================

-- Placar do veredito por plataforma (Uber, 99, iFood, inDrive...)
CREATE OR REPLACE VIEW "GigRadarVerdictAccuracy" AS
SELECT
  "deviceId",
  COALESCE("platform", 'desconhecida')                              AS platform,
  COUNT(*)                                                          AS ofertas,
  COUNT(*) FILTER (WHERE "review" IS NOT NULL)                      AS conferidas,
  COUNT(*) FILTER (WHERE "review" = 'ACERTOU')                      AS acertou,
  COUNT(*) FILTER (WHERE "review" = 'FALSO_RUIM')                   AS falso_ruim,
  COUNT(*) FILTER (WHERE "review" = 'FALSO_BOM')                    AS falso_bom,
  COUNT(*) FILTER (WHERE "review" = 'ATENCAO')                      AS atencao,
  COUNT(*) FILTER (WHERE "review" = 'NAO_APARECEU')                 AS nao_apareceu,
  COUNT(*) FILTER (WHERE "review" = 'SO_FALOU')                     AS so_falou,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE "review" = 'ACERTOU')
    / NULLIF(COUNT(*) FILTER (WHERE "review" IS NOT NULL), 0)
  , 1)                                                              AS pct_acerto,
  -- Dinheiro que o motorista deixou na mesa obedecendo a um RED errado
  COALESCE(SUM("netValue") FILTER (WHERE "review" = 'FALSO_RUIM'), 0) AS perdido_falso_ruim
FROM "GigRadarRide"
GROUP BY "deviceId", COALESCE("platform", 'desconhecida');

-- Confiabilidade da exibição: de tudo que virou oferta, quanto virou card?
CREATE OR REPLACE VIEW "GigRadarCardReliability" AS
SELECT
  "deviceId",
  COALESCE("platform", 'desconhecida')                              AS platform,
  DATE("ts")                                                        AS dia,
  COUNT(*)                                                          AS ofertas,
  COUNT(*) FILTER (WHERE "shownAsCard" IS TRUE)                     AS com_card,
  COUNT(*) FILTER (WHERE "shownAsCard" IS FALSE)                    AS sem_card,
  COUNT(*) FILTER (WHERE "spokenOnly" IS TRUE)                      AS so_voz,
  ROUND(AVG("cardMs") FILTER (WHERE "cardMs" IS NOT NULL), 0)       AS card_ms_medio,
  MAX("cardMs")                                                     AS card_ms_pior
FROM "GigRadarRide"
GROUP BY "deviceId", COALESCE("platform", 'desconhecida'), DATE("ts");
