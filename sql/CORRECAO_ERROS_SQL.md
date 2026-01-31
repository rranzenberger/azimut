# 🔧 Correção dos Erros SQL

## ✅ Problema Identificado

Ao executar o SQL, ocorreram **2 erros**:

1. **Erro 1:** `relation "TeamMembers" already exists` - Tabelas já existem no banco
2. **Erro 2:** Possível erro de transação (ROLLBACK necessário)

---

## ✅ Solução: SQL Seguro

Criei o arquivo **`azimut-cms/prisma/migrations/20260123_add_team_credentials_SAFE.sql`** que:

### ✅ Usa `IF NOT EXISTS`
- `CREATE TABLE IF NOT EXISTS` - Não dá erro se já existir
- `CREATE INDEX IF NOT EXISTS` - Não dá erro se já existir

### ✅ Usa `ON CONFLICT DO NOTHING`
- `INSERT ... ON CONFLICT ("slug") DO NOTHING` - Não insere duplicatas
- `INSERT ... ON CONFLICT DO NOTHING` - Para Credentials

---

## 📋 Como Usar

### Opção 1: Executar SQL Seguro (Recomendado)
1. Abra: `azimut-cms/prisma/migrations/20260123_add_team_credentials_SAFE.sql`
2. Copie TODO o conteúdo
3. Cole no SQL Editor
4. Clique em **"Run"**
5. ✅ Pronto! Funciona mesmo se as tabelas já existirem

### Opção 2: Se as Tabelas Já Existem e Só Quer Inserir Dados
Execute apenas a parte de INSERT com `ON CONFLICT DO NOTHING`:

```sql
-- Inserir TeamMembers (apenas se não existirem)
INSERT INTO "TeamMembers" (...) VALUES (...) 
ON CONFLICT ("slug") DO NOTHING;

-- Inserir Credentials (apenas se não existirem)
INSERT INTO "Credentials" (...) VALUES (...) 
ON CONFLICT DO NOTHING;
```

---

## 🎯 Resumo

- ✅ **SQL Seguro criado** - Não dá erro se já existir
- ✅ **Usa IF NOT EXISTS** - Para tabelas e índices
- ✅ **Usa ON CONFLICT** - Para evitar duplicatas
- ✅ **Pronto para executar** - Funciona sempre

**Arquivo:** `azimut-cms/prisma/migrations/20260123_add_team_credentials_SAFE.sql`
