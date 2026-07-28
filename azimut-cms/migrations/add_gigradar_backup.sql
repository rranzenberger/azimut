-- 27/jul/2026 — Backup/telemetria do app GigRadar no Neon (área própria do backoffice)
-- Motivo: o aparelho é a única cópia dos dados do motorista. Em 27/jul um toque sem
-- confirmação em "Apagar tudo" levou dias de abastecimento embora. Nada mais pode
-- depender só do telefone: o app sobe uma cópia sempre que houver internet.
--
-- Aplicar no Neon (SQL Editor) OU: npx prisma db execute --file migrations/add_gigradar_backup.sql
-- Seguro re-executar (IF NOT EXISTS em tudo).
--
-- CHAVE DO DESENHO: toda tabela de dados tem UNIQUE (deviceId, localId).
-- O app manda lotes com o id local do SQLite; o servidor faz ON CONFLICT DO UPDATE.
-- Assim reenviar o mesmo registro nunca duplica, e o app pode reenviar tudo sem medo.

-- ============================================================
-- 1. APARELHO (registro do beta tester)
-- ============================================================
CREATE TABLE IF NOT EXISTS "GigRadarDevice" (
  "deviceId"    TEXT NOT NULL,
  "contact"     TEXT,              -- whatsapp/email do tester (casar com o lead GIGRADAR_BETA)
  "nickname"    TEXT,              -- como o tester se identifica
  "appVersion"  TEXT,
  "androidVer"  TEXT,
  "phoneModel"  TEXT,
  "city"        TEXT,
  "vehicle"     TEXT,              -- ex.: "Fiat Uno GNV"
  "firstSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "lastSeenAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GigRadarDevice_pkey" PRIMARY KEY ("deviceId")
);

-- ============================================================
-- 2. GASTOS LANÇADOS — abastecimento, óleo, lavagem, multa, manutenção
--    (espelha gigradar_expenses.db / tabela exp)
--    É a base do custo por km real. A tabela mais crítica das duas dezenas.
-- ============================================================
CREATE TABLE IF NOT EXISTS "GigRadarExpense" (
  "id"        TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "deviceId"  TEXT NOT NULL,
  "localId"   BIGINT NOT NULL,     -- exp.id no SQLite do aparelho
  "type"      TEXT NOT NULL,       -- "🟢 GNV", "⛽ Gasolina", "Lavagem", "Multa", ...
  "value"     DOUBLE PRECISION NOT NULL,   -- R$
  "qty"       DOUBLE PRECISION,    -- litros / m³ / kWh — NUNCA misturar unidades
  "note"      TEXT,
  "ts"        TIMESTAMP(3) NOT NULL,       -- data do abastecimento (não do envio)
  "syncedAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GigRadarExpense_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "GigRadarExpense_device_local_key" UNIQUE ("deviceId", "localId")
);
CREATE INDEX IF NOT EXISTS "GigRadarExpense_device_ts_idx" ON "GigRadarExpense"("deviceId", "ts" DESC);
CREATE INDEX IF NOT EXISTS "GigRadarExpense_type_idx" ON "GigRadarExpense"("type");

-- ============================================================
-- 3. CUSTOS RECORRENTES — aluguel, parcela, IPVA, seguro, licenciamento
--    (espelha gigradar_costs.db / tabela cost) — define o break-even semanal
-- ============================================================
CREATE TABLE IF NOT EXISTS "GigRadarCostItem" (
  "id"        TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "deviceId"  TEXT NOT NULL,
  "localId"   BIGINT NOT NULL,
  "name"      TEXT NOT NULL,       -- "Aluguel", "Parcela financiamento", "Seguro / proteção"
  "value"     DOUBLE PRECISION NOT NULL,
  "period"    TEXT NOT NULL,       -- diaria | semanal | mensal | anual
  "enabled"   BOOLEAN NOT NULL DEFAULT FALSE,
  "ord"       INTEGER,
  "syncedAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GigRadarCostItem_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "GigRadarCostItem_device_local_key" UNIQUE ("deviceId", "localId")
);
CREATE INDEX IF NOT EXISTS "GigRadarCostItem_device_idx" ON "GigRadarCostItem"("deviceId");

-- ============================================================
-- 4. GANHOS POR DIA + REPASSES (espelha gigradar_earnings.db)
-- ============================================================
CREATE TABLE IF NOT EXISTS "GigRadarEarning" (
  "id"        TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "deviceId"  TEXT NOT NULL,
  "day"       DATE NOT NULL,       -- o dia é a própria chave natural aqui
  "gross"     DOUBLE PRECISION NOT NULL,
  "hours"     DOUBLE PRECISION NOT NULL,
  "syncedAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GigRadarEarning_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "GigRadarEarning_device_day_key" UNIQUE ("deviceId", "day")
);
CREATE INDEX IF NOT EXISTS "GigRadarEarning_device_day_idx" ON "GigRadarEarning"("deviceId", "day" DESC);

CREATE TABLE IF NOT EXISTS "GigRadarPayout" (
  "id"        TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "deviceId"  TEXT NOT NULL,
  "localId"   BIGINT NOT NULL,
  "platform"  TEXT NOT NULL,       -- Uber / 99 / iFood / ...
  "expected"  DOUBLE PRECISION,    -- o que o extrato prometeu
  "amount"    DOUBLE PRECISION NOT NULL,  -- o que caiu na conta
  "ts"        TIMESTAMP(3) NOT NULL,
  "syncedAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GigRadarPayout_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "GigRadarPayout_device_local_key" UNIQUE ("deviceId", "localId")
);
CREATE INDEX IF NOT EXISTS "GigRadarPayout_device_ts_idx" ON "GigRadarPayout"("deviceId", "ts" DESC);

-- ============================================================
-- 5. CORRIDAS / OFERTAS VISTAS (espelha gigradar_history.db)
--    Alimenta o aprendizado: o que foi ofertado, qual foi o veredito, o que rendeu
-- ============================================================
CREATE TABLE IF NOT EXISTS "GigRadarRide" (
  "id"         TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "deviceId"   TEXT NOT NULL,
  "localId"    BIGINT NOT NULL,
  "platform"   TEXT,               -- Uber Driver / 99 / ...
  "value"      DOUBLE PRECISION,   -- R$ da oferta
  "km"         DOUBLE PRECISION,
  "minutes"    INTEGER,
  "verdict"    TEXT,               -- GREEN | YELLOW | RED
  "perHour"    DOUBLE PRECISION,
  "perKm"      DOUBLE PRECISION,
  "netValue"   DOUBLE PRECISION,   -- líquido estimado
  "rating"     DOUBLE PRECISION,   -- nota do passageiro
  "address"    TEXT,               -- endereço/bairro do embarque
  "accepted"   BOOLEAN,            -- NULL = não sabemos
  "ts"         TIMESTAMP(3) NOT NULL,
  "syncedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GigRadarRide_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "GigRadarRide_device_local_key" UNIQUE ("deviceId", "localId")
);
CREATE INDEX IF NOT EXISTS "GigRadarRide_device_ts_idx" ON "GigRadarRide"("deviceId", "ts" DESC);
CREATE INDEX IF NOT EXISTS "GigRadarRide_verdict_idx" ON "GigRadarRide"("verdict");

-- ============================================================
-- 6. LOCAIS A EVITAR (espelha gigradar_places.db — este já foi apagado 1x por um bump)
-- ============================================================
CREATE TABLE IF NOT EXISTS "GigRadarPlace" (
  "id"        TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "deviceId"  TEXT NOT NULL,
  "localId"   BIGINT NOT NULL,
  "name"      TEXT NOT NULL,
  "reason"    TEXT,
  "lat"       DOUBLE PRECISION,
  "lng"       DOUBLE PRECISION,
  "radius"    DOUBLE PRECISION,
  "ts"        TIMESTAMP(3),
  "syncedAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GigRadarPlace_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "GigRadarPlace_device_local_key" UNIQUE ("deviceId", "localId")
);
CREATE INDEX IF NOT EXISTS "GigRadarPlace_device_idx" ON "GigRadarPlace"("deviceId");

-- ============================================================
-- 7. POSTOS DE PREFERÊNCIA (espelha gigradar_stations.db)
-- ============================================================
CREATE TABLE IF NOT EXISTS "GigRadarStation" (
  "id"        TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "deviceId"  TEXT NOT NULL,
  "localId"   BIGINT NOT NULL,
  "name"      TEXT NOT NULL,
  "fuelType"  TEXT,               -- GNV | Gasolina | Etanol | Diesel | Elétrico
  "price"     DOUBLE PRECISION,   -- R$ por L / m³ / kWh
  "lat"       DOUBLE PRECISION,
  "lng"       DOUBLE PRECISION,
  "favorite"  BOOLEAN NOT NULL DEFAULT FALSE,
  "ts"        TIMESTAMP(3),
  "syncedAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GigRadarStation_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "GigRadarStation_device_local_key" UNIQUE ("deviceId", "localId")
);
CREATE INDEX IF NOT EXISTS "GigRadarStation_device_idx" ON "GigRadarStation"("deviceId");

-- ============================================================
-- 8. ZONAS (espelha gigradar_zones.db) — mapa de bom/ruim aprendido pelo app
-- ============================================================
CREATE TABLE IF NOT EXISTS "GigRadarZone" (
  "id"         TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "deviceId"   TEXT NOT NULL,
  "cell"       TEXT NOT NULL,      -- código da célula geográfica (ZoneCellCodec)
  "label"      TEXT,               -- bairro/nome legível
  "score"      DOUBLE PRECISION,   -- quão boa a zona é
  "samples"    INTEGER,            -- quantas ofertas alimentaram o score
  "avgValue"   DOUBLE PRECISION,
  "updatedAt"  TIMESTAMP(3),
  "syncedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GigRadarZone_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "GigRadarZone_device_cell_key" UNIQUE ("deviceId", "cell")
);
CREATE INDEX IF NOT EXISTS "GigRadarZone_device_idx" ON "GigRadarZone"("deviceId");

-- ============================================================
-- 9. RISCOS TEMPORÁRIOS marcados pelo motorista (espelha gigradar_temp_risks.db)
-- ============================================================
CREATE TABLE IF NOT EXISTS "GigRadarRisk" (
  "id"         TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "deviceId"   TEXT NOT NULL,
  "localId"    BIGINT NOT NULL,
  "type"       TEXT,               -- assalto | alagamento | obra | buraco | ...
  "note"       TEXT,
  "lat"        DOUBLE PRECISION,
  "lng"        DOUBLE PRECISION,
  "createdTs"  TIMESTAMP(3),
  "expiresTs"  TIMESTAMP(3),
  "syncedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GigRadarRisk_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "GigRadarRisk_device_local_key" UNIQUE ("deviceId", "localId")
);
CREATE INDEX IF NOT EXISTS "GigRadarRisk_device_idx" ON "GigRadarRisk"("deviceId");

-- ============================================================
-- 10. TURNOS — tempo de trabalho pro cálculo semanal
-- ============================================================
CREATE TABLE IF NOT EXISTS "GigRadarShift" (
  "id"         TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "deviceId"   TEXT NOT NULL,
  "localId"    BIGINT NOT NULL,
  "startedAt"  TIMESTAMP(3) NOT NULL,
  "endedAt"    TIMESTAMP(3),
  "hours"      DOUBLE PRECISION,
  "km"         DOUBLE PRECISION,
  "offers"     INTEGER,            -- ofertas vistas no turno
  "accepted"   INTEGER,            -- quantas aceitou
  "gross"      DOUBLE PRECISION,
  "idleMin"    DOUBLE PRECISION,   -- OBD_TURNO idle_min
  "runMin"     DOUBLE PRECISION,   -- OBD_TURNO run_min
  "syncedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GigRadarShift_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "GigRadarShift_device_local_key" UNIQUE ("deviceId", "localId")
);
CREATE INDEX IF NOT EXISTS "GigRadarShift_device_start_idx" ON "GigRadarShift"("deviceId", "startedAt" DESC);

-- ============================================================
-- 11. AMOSTRAS OBD — o que o carro respondeu de verdade
--     Uno GNV: respondem RPM, velocidade, arrefecimento, tensão, MAP, temp ar,
--     carga do motor, tanque %. NÃO respondem fuel rate, MAF, temp óleo.
-- ============================================================
CREATE TABLE IF NOT EXISTS "GigRadarObdSample" (
  "id"         TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "deviceId"   TEXT NOT NULL,
  "ts"         TIMESTAMP(3) NOT NULL,
  "rpm"        INTEGER,
  "speedKmh"   INTEGER,
  "coolantC"   INTEGER,
  "voltage"    DOUBLE PRECISION,
  "mapKpa"     INTEGER,
  "airTempC"   INTEGER,
  "engineLoad" DOUBLE PRECISION,
  "fuelLevel"  DOUBLE PRECISION,   -- % — tanque de GASOLINA, nunca GNV
  "syncedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GigRadarObdSample_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "GigRadarObdSample_device_ts_key" UNIQUE ("deviceId", "ts")
);
CREATE INDEX IF NOT EXISTS "GigRadarObdSample_device_ts_idx" ON "GigRadarObdSample"("deviceId", "ts" DESC);

-- ============================================================
-- 12. DIÁRIO DE SYNC — o que subiu, quando, e o que falhou
--     Sem isto não dá pra afirmar "nada se perdeu" com prova.
-- ============================================================
CREATE TABLE IF NOT EXISTS "GigRadarSync" (
  "id"         TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "deviceId"   TEXT NOT NULL,
  "appVersion" TEXT,
  "tables"     JSONB,              -- {"expense":4,"cost":19,"ride":37,...}
  "totalRows"  INTEGER,
  "status"     TEXT NOT NULL,      -- OK | PARTIAL | FAIL
  "errorMsg"   TEXT,
  "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GigRadarSync_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "GigRadarSync_device_created_idx" ON "GigRadarSync"("deviceId", "createdAt" DESC);

-- ============================================================
-- VISÕES PRO BACKOFFICE (aba GigRadar, separada do site)
-- ============================================================

-- Custo por km REAL por aparelho e por combustível — o número que o veredito precisa.
CREATE OR REPLACE VIEW "GigRadarFuelStats" AS
SELECT
  "deviceId",
  "type"                                AS fuel_type,
  COUNT(*)                              AS fills,
  SUM("value")                          AS total_spent,
  SUM("qty")                            AS total_qty,
  CASE WHEN SUM("qty") > 0
       THEN SUM("value") / SUM("qty") END AS unit_price,   -- R$/L ou R$/m³
  MIN("ts")                             AS first_fill,
  MAX("ts")                             AS last_fill
FROM "GigRadarExpense"
WHERE "qty" > 0
GROUP BY "deviceId", "type";

-- Saúde do backup: quando cada aparelho subiu dados pela última vez.
CREATE OR REPLACE VIEW "GigRadarBackupHealth" AS
SELECT
  d."deviceId",
  d."nickname",
  d."contact",
  d."appVersion",
  d."lastSeenAt",
  (SELECT MAX("createdAt") FROM "GigRadarSync" s WHERE s."deviceId" = d."deviceId") AS last_sync,
  (SELECT COUNT(*) FROM "GigRadarExpense" e WHERE e."deviceId" = d."deviceId")      AS expenses,
  (SELECT COUNT(*) FROM "GigRadarRide"    r WHERE r."deviceId" = d."deviceId")      AS rides,
  (SELECT COUNT(*) FROM "GigRadarShift"   t WHERE t."deviceId" = d."deviceId")      AS shifts
FROM "GigRadarDevice" d;
