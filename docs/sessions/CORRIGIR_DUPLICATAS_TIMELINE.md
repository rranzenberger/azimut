# 🔧 CORRIGIR DUPLICATAS NA TIMELINE

**Data:** 2026-01-20  
**Problema:** Eventos duplicados na API  
**Solução:** Script SQL para remover duplicatas

---

## 🚨 **PROBLEMA IDENTIFICADO:**

A API está retornando **eventos duplicados**:
- 5 entradas idênticas para 1980
- 5 entradas idênticas para 1990
- 5 entradas idênticas para 1998
- 4 entradas idênticas para 2000
- E mais...

**Causa:** O SQL foi executado múltiplas vezes, criando duplicatas.

---

## ✅ **SOLUÇÃO:**

### **Passo 1: Verificar Duplicatas**

Execute no SQL Editor:

```sql
-- Ver quantos eventos duplicados existem
SELECT 
  "year",
  "titlePt",
  COUNT(*) as quantidade_duplicados
FROM "CompanyHistory"
WHERE "isPublished" = true
GROUP BY "year", "titlePt"
HAVING COUNT(*) > 1
ORDER BY quantidade_duplicados DESC, "year" ASC;
```

Isso mostrará quais eventos estão duplicados e quantas vezes.

---

### **Passo 2: Remover Duplicatas**

Execute o script completo: `sql/remover_duplicatas_timeline.sql`

Ou execute diretamente:

```sql
-- Remove duplicatas mantendo apenas o registro mais antigo
DELETE FROM "CompanyHistory"
WHERE "id" IN (
  SELECT "id"
  FROM (
    SELECT 
      "id",
      ROW_NUMBER() OVER (
        PARTITION BY "year", "titlePt", "type"
        ORDER BY "createdAt" ASC
      ) as rn
    FROM "CompanyHistory"
    WHERE "isPublished" = true
  ) t
  WHERE rn > 1
);
```

**O que faz:**
- Identifica duplicatas por `year`, `titlePt` e `type`
- Mantém apenas o registro mais antigo (menor `createdAt`)
- Remove todos os outros duplicados

---

### **Passo 3: Verificar Resultado**

```sql
-- Contar total após limpeza
SELECT COUNT(*) as total_eventos_unicos
FROM "CompanyHistory"
WHERE "isPublished" = true;

-- Verificar se ainda há duplicatas (deve retornar 0 linhas)
SELECT 
  "year",
  "titlePt",
  COUNT(*) as quantidade
FROM "CompanyHistory"
WHERE "isPublished" = true
GROUP BY "year", "titlePt"
HAVING COUNT(*) > 1;
```

**Esperado:**
- Total de eventos únicos: ~30-35 (não 93)
- Nenhuma duplicata restante (0 linhas)

---

## 📊 **RESULTADO ESPERADO:**

### **Antes:**
- Total: 93 eventos
- Muitos duplicados (5x, 4x, etc.)

### **Depois:**
- Total: ~30-35 eventos únicos
- Sem duplicatas
- API retorna apenas eventos únicos

---

## 🔍 **VERIFICAR API APÓS CORREÇÃO:**

Após remover duplicatas, teste a API novamente:

```bash
# Testar API PT
curl https://backoffice.azmt.com.br/api/public/history?lang=pt

# Verificar total
curl https://backoffice.azmt.com.br/api/public/history?lang=pt | jq '.stats.total'
```

**Esperado:**
- `success: true`
- `total: ~30-35` (eventos únicos)
- Sem duplicatas no array `data`

---

## ⚠️ **IMPORTANTE:**

### **Backup (Opcional):**

Se quiser fazer backup antes de remover:

```sql
-- Criar tabela de backup (opcional)
CREATE TABLE "CompanyHistory_backup" AS 
SELECT * FROM "CompanyHistory";
```

---

## 📋 **CHECKLIST:**

- [ ] ✅ Verificar duplicatas (Passo 1)
- [ ] ✅ Executar script de remoção (Passo 2)
- [ ] ✅ Verificar resultado (Passo 3)
- [ ] ✅ Testar API após correção
- [ ] ✅ Verificar timeline no site

---

## 🎯 **RESUMO:**

| Item | Antes | Depois |
|------|-------|--------|
| **Total de Eventos** | 93 (com duplicatas) | ~30-35 (únicos) |
| **Duplicatas** | Muitas (5x, 4x) | 0 |
| **API** | Retorna duplicatas | Retorna apenas únicos |

---

**Status:** ⚠️ **Duplicatas identificadas**  
**Ação:** Executar script de remoção  
**Arquivo:** `sql/remover_duplicatas_timeline.sql`
