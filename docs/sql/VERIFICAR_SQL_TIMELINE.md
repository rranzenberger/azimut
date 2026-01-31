# ✅ VERIFICAR SQL TIMELINE - GUIA RÁPIDO

**Data:** 2026-01-20

---

## 🔍 **1. VERIFICAR SE DADOS FORAM INSERIDOS**

Execute no SQL Editor (Neon/Vercel):

```sql
-- Contar total de registros
SELECT COUNT(*) as total_eventos FROM "CompanyHistory";

-- Deve retornar: ~30+ eventos
```

---

## 📊 **2. VERIFICAR DADOS POR PERÍODO**

```sql
-- Verificar eventos por década
SELECT 
  CASE 
    WHEN "year" < 1990 THEN '1980s'
    WHEN "year" < 2000 THEN '1990s'
    WHEN "year" < 2010 THEN '2000s'
    WHEN "year" < 2020 THEN '2010s'
    ELSE '2020s'
  END as decada,
  COUNT(*) as quantidade
FROM "CompanyHistory"
WHERE "isPublished" = true
GROUP BY decada
ORDER BY decada;
```

**Resultado esperado:**
- 1980s: 1 evento
- 1990s: 8-10 eventos
- 2000s: 10-12 eventos
- 2010s: 5-7 eventos
- 2020s: 1-2 eventos

---

## 🎯 **3. VERIFICAR DADOS POR TIPO**

```sql
-- Verificar distribuição por tipo
SELECT 
  "type",
  COUNT(*) as quantidade
FROM "CompanyHistory"
WHERE "isPublished" = true
GROUP BY "type"
ORDER BY quantidade DESC;
```

**Resultado esperado:**
- milestone: ~8-10
- partnership: ~10-12
- project: ~6-8
- award: ~3-4
- location: ~2-3

---

## ⭐ **4. VERIFICAR DESTAQUES (FEATURED)**

```sql
-- Verificar eventos destacados
SELECT 
  "year",
  "type",
  "titlePt",
  "isFeatured"
FROM "CompanyHistory"
WHERE "isFeatured" = true
ORDER BY "year" ASC;
```

**Deve retornar ~15-18 eventos destacados**

---

## 🔧 **5. VERIFICAR PROBLEMAS COMUNS**

### **A. Verificar campos obrigatórios faltando:**

```sql
-- Verificar se há registros com campos NULL obrigatórios
SELECT 
  "id",
  "year",
  "type",
  "titlePt",
  "titleEn",
  "displayOrder"
FROM "CompanyHistory"
WHERE "year" IS NULL 
   OR "type" IS NULL 
   OR "titlePt" IS NULL 
   OR "titleEn" IS NULL
   OR "displayOrder" IS NULL;
```

**Deve retornar 0 linhas** (nenhum erro)

---

### **B. Verificar tipos inválidos:**

```sql
-- Verificar se há tipos inválidos
SELECT DISTINCT "type"
FROM "CompanyHistory"
WHERE "type" NOT IN ('milestone', 'partnership', 'project', 'award', 'location', 'other');
```

**Deve retornar 0 linhas** (nenhum erro)

---

### **C. Verificar arrays (bullets):**

```sql
-- Verificar se arrays estão corretos
SELECT 
  "id",
  "titlePt",
  "bulletsPt",
  array_length("bulletsPt", 1) as num_bullets_pt
FROM "CompanyHistory"
WHERE "bulletsPt" IS NOT NULL
ORDER BY num_bullets_pt DESC
LIMIT 10;
```

**Deve retornar arrays válidos**

---

## 🚨 **6. SE HOUVER ERROS**

### **Erro: "duplicate key value"**
```sql
-- Limpar dados duplicados (se necessário)
DELETE FROM "CompanyHistory" 
WHERE "id" IN (
  SELECT "id" 
  FROM (
    SELECT "id", 
           ROW_NUMBER() OVER (PARTITION BY "year", "titlePt" ORDER BY "createdAt") as rn
    FROM "CompanyHistory"
  ) t
  WHERE rn > 1
);
```

---

### **Erro: "null value in column"**
```sql
-- Verificar e corrigir campos NULL obrigatórios
UPDATE "CompanyHistory"
SET "displayOrder" = "year" * 10
WHERE "displayOrder" IS NULL;
```

---

### **Erro: "invalid input syntax for type integer"**
- Verificar se `year` e `yearEnd` são números válidos
- Verificar se `displayOrder` é um número válido

---

## ✅ **7. TESTAR API DEPOIS DE POPULAR**

Após popular o SQL, teste a API:

```bash
# Testar API PT
curl https://backoffice.azmt.com.br/api/public/history?lang=pt

# Testar API EN
curl https://backoffice.azmt.com.br/api/public/history?lang=en

# Verificar total
curl https://backoffice.azmt.com.br/api/public/history?lang=pt | jq '.stats.total'
```

**Deve retornar:**
- `success: true`
- `total: 30+` (ou próximo disso)
- `data: [...]` com array de eventos

---

## 📋 **8. CHECKLIST FINAL**

Após executar o SQL:

- [ ] ✅ `SELECT COUNT(*)` retorna ~30+
- [ ] ✅ Eventos distribuídos por décadas (1980s-2020s)
- [ ] ✅ Tipos variados (milestone, partnership, project, award)
- [ ] ✅ ~15-18 eventos destacados (isFeatured = true)
- [ ] ✅ Nenhum campo obrigatório NULL
- [ ] ✅ API retorna dados corretamente
- [ ] ✅ Timeline aparece no site

---

## 🔄 **9. RE-EXECUTAR SQL (SE NECESSÁRIO)**

Se precisar limpar e re-executar:

```sql
-- ⚠️ CUIDADO: Isso apaga TODOS os dados!
BEGIN;

DELETE FROM "CompanyHistory";

-- Agora cole e execute o conteúdo completo de:
-- sql/populate_company_history_complete.sql

COMMIT;
```

---

## 📞 **10. PROBLEMAS PERSISTENTES**

Se ainda houver problemas:

1. **Verificar logs do banco** (Neon/Vercel)
2. **Verificar sintaxe SQL** (copiar linha por linha)
3. **Executar em partes** (dividir o SQL em blocos menores)
4. **Verificar permissões** (usuário tem INSERT?)

---

**Status:** ✅ SQL pronto para execução  
**Arquivo:** `sql/populate_company_history_complete.sql`  
**Total esperado:** ~30+ eventos históricos
