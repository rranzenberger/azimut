# Executar os 12 serviços no Neon – passo a passo

## Resumo
- **Total de cards na grid: 12** (3 linhas × 4).
- O backoffice está pronto para receber os dados: lista e edição (título, descrição, ícone, segmentos, FAQs).
- No Neon, o script inteiro pode ser truncado ou dar erro. Use os passos abaixo.

---

## Passo 0 (opcional): Colunas da subpágina
Se ainda não rodou a migração das colunas de conteúdo longo, execute no Neon:

```sql
-- Arquivo: sql/SERVICE_ADD_SUBPAGE_CONTENT_COLUMNS.sql
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "longDescPt"    JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "longDescEn"    JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "longDescEs"    JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "longDescFr"    JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "deliverablesPt" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "deliverablesEn" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "deliverablesEs" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "deliverablesFr" JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "processPt"     JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "processEn"     JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "processEs"     JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "processFr"     JSONB;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "technologies"  TEXT[] DEFAULT '{}';
```

---

## Passo 1: Garantir que os 12 estão PUBLICADOS
Se você já inseriu os serviços antes e só rodou o UPDATE (que arquiva o resto), pode ter ficado tudo ARCHIVED. Rode **só isto** para re-publicar os 12:

```sql
UPDATE "Service"
SET status = 'PUBLISHED', "updatedAt" = NOW()
WHERE slug IN (
  'cinema-audiovisual', 'pos-producao-vfx', 'animacao-2d-3d', 'xr-interatividade-web3',
  'cenografia-design-espacial', 'games-interativos', 'ia-criativa', 'direcao-arte-criativa',
  'teatro-espetaculos-imersivos', 'branded-experiences-ativacoes', 'consultoria-estrategia', 'educacao-treinamento'
);
```

---

## Passo 2: Arquivar quem não é um dos 12
Depois rode:

```sql
UPDATE "Service"
SET status = 'ARCHIVED', "updatedAt" = NOW()
WHERE slug NOT IN (
  'cinema-audiovisual', 'pos-producao-vfx', 'animacao-2d-3d', 'xr-interatividade-web3',
  'cenografia-design-espacial', 'games-interativos', 'ia-criativa', 'direcao-arte-criativa',
  'teatro-espetaculos-imersivos', 'branded-experiences-ativacoes', 'consultoria-estrategia', 'educacao-treinamento'
);
```

---

## Passo 3: Verificação
```sql
SELECT slug, "titlePt" AS "Título PT", icon, priority, status
FROM "Service"
WHERE status = 'PUBLISHED'
ORDER BY priority;
```
Deve retornar **12 linhas**.

---

## Se os 12 serviços ainda não existem na tabela
Use o arquivo `sql/POPULAR_SERVICES_12_CURADOS.sql`, mas **rode em partes** no Neon (por exemplo, 3–4 INSERTs por vez), pois o editor pode truncar ou falhar com o script inteiro. Depois rode o Passo 2 e o Passo 3.

---

## Erro comum: “ON CONFLICT” / constraint
Se der erro de constraint em `ON CONFLICT (slug)`, confira se a tabela tem constraint UNIQUE em `slug`. No Prisma isso costuma ser criado como `Service_slug_key`. Se a tabela for de outro projeto, pode ser que o nome da tabela ou do schema seja diferente (ex.: `service` em minúsculo). Nesse caso, ajuste no script: use o nome exato da tabela que aparece no Neon.
