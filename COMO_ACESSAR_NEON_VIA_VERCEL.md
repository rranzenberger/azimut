# 🔧 COMO ACESSAR NEON VIA VERCEL - PASSO A PASSO
**Data:** 15/01/2026  
**Status:** 📋 **GUIA COMPLETO**

---

## 🎯 OBJETIVO

Acessar o banco Neon que está integrado na Vercel e executar o SQL para criar tabelas de metadados.

---

## 📋 OPÇÃO 1: VIA VERCEL (RECOMENDADO)

### **PASSO 1: Acessar Vercel Dashboard**

1. Abrir navegador
2. Acessar: **https://vercel.com**
3. Fazer login (se necessário)
4. Selecionar projeto **azimut-cms** (ou o projeto do backoffice)

### **PASSO 2: Encontrar Neon Database**

1. No projeto, ir em **"Storage"** (no menu lateral)
2. Ou procurar por **"Databases"**
3. Ou ir em **"Settings"** → **"Environment Variables"**
4. Procurar por **Neon** ou **PostgreSQL**

### **PASSO 3: Acessar Neon via Vercel**

**Opção A: Se aparecer botão "Open in Neon"**
1. Clicar em **"Open in Neon"** ou **"Manage"**
2. Isso abre o Neon Dashboard automaticamente
3. Pode pedir login (usar mesma conta ou conta do Neon)

**Opção B: Se aparecer "View Database"**
1. Clicar em **"View Database"**
2. Isso abre o console do banco

**Opção C: Via SQL Editor da Vercel**
1. Procurar por **"SQL Editor"** ou **"Query"**
2. Se existir, usar direto na Vercel

### **PASSO 4: Acessar SQL Editor**

1. No Neon Dashboard (aberto via Vercel ou direto)
2. Procurar por **"SQL Editor"** no menu lateral
3. Clicar para abrir
4. Aguardar carregar

### **PASSO 5: Executar SQL**

1. Abrir arquivo: `azimut-cms/scripts/populate-field-metadata.sql`
2. Selecionar **TODO** (Ctrl+A)
3. Copiar (Ctrl+C)
4. Voltar para SQL Editor
5. Colar (Ctrl+V)
6. Executar (Run ou Ctrl+Enter)

---

## 📋 OPÇÃO 2: VIA NEON DIRETO (ALTERNATIVA)

### **Se a Vercel não tiver acesso direto ao Neon:**

1. Acessar: **https://console.neon.tech** diretamente
2. Fazer login com a mesma conta da Vercel (ou conta do Neon)
3. Procurar o projeto que corresponde ao banco da Vercel
4. Abrir **SQL Editor**
5. Executar SQL

**Como identificar o projeto correto:**
- Ver variável `DATABASE_URL` na Vercel
- O host do banco está na URL (ex: `ep-xxx-xxx-pooler.neon.tech`)
- Procurar pelo host no Neon Dashboard

---

## 📋 OPÇÃO 3: VIA VARIÁVEL DE AMBIENTE (SE NADA FUNCIONAR)

### **PASSO 1: Pegar DATABASE_URL da Vercel**

1. Acessar: https://vercel.com
2. Projeto → **Settings** → **Environment Variables**
3. Procurar por `DATABASE_URL`
4. Copiar o valor (é uma string longa começando com `postgresql://`)

### **PASSO 2: Usar psql ou cliente PostgreSQL**

**Instalar psql (se não tiver):**
- Windows: Baixar PostgreSQL ou usar Git Bash
- Mac: `brew install postgresql`
- Linux: `sudo apt install postgresql-client`

**Conectar:**
```bash
# Usar a DATABASE_URL copiada da Vercel
psql "postgresql://usuario:senha@host:5432/database?sslmode=require"
```

**Executar SQL:**
```bash
# Ou executar arquivo SQL
psql "DATABASE_URL" -f azimut-cms/scripts/populate-field-metadata.sql
```

**⚠️ CUIDADO:** Não exponha a DATABASE_URL publicamente!

---

## 📋 PASSO A PASSO COMPLETO (RECOMENDADO)

### **MÉTODO MAIS FÁCIL:**

1. **Acessar Vercel:**
   ```
   https://vercel.com → Projeto azimut-cms → Storage/Databases
   ```

2. **Abrir Neon:**
   - Clicar em **"Open in Neon"** ou **"Manage"**
   - Ou acessar: https://console.neon.tech

3. **Abrir SQL Editor:**
   - No Neon Dashboard → **SQL Editor**

4. **Abrir Script SQL:**
   - No VS Code: `azimut-cms/scripts/populate-field-metadata.sql`
   - Selecionar TODO (Ctrl+A)
   - Copiar (Ctrl+C)

5. **Colar e Executar:**
   - Colar no SQL Editor (Ctrl+V)
   - Clicar em **"Run"** ou Ctrl+Enter

6. **Verificar:**
   ```sql
   SELECT COUNT(*) FROM field_metadata;
   ```
   **Esperado:** Número > 0

---

## 🔍 COMO ENCONTRAR O NEON NA VERCEL

### **Localização Possível:**

1. **Menu Lateral:**
   - Storage
   - Databases
   - Integrations
   - Settings → Databases

2. **Página do Projeto:**
   - Aba "Storage"
   - Aba "Databases"
   - Seção "Integrations"

3. **Environment Variables:**
   - Settings → Environment Variables
   - Ver `DATABASE_URL`
   - O host indica qual projeto Neon usar

---

## 🚨 SE NÃO ENCONTRAR NEON NA VERCEL

### **Opção 1: Acessar Neon Direto**
1. Ir direto: https://console.neon.tech
2. Fazer login
3. Procurar projeto pelo host (ver `DATABASE_URL`)
4. Abrir SQL Editor

### **Opção 2: Verificar Integrations**
1. Vercel → Project → Settings → Integrations
2. Ver se Neon está listado
3. Se não estiver, pode estar configurado direto

### **Opção 3: Usar Cliente PostgreSQL**
- Instalar cliente (psql, DBeaver, etc.)
- Conectar usando `DATABASE_URL`
- Executar SQL

---

## ✅ VERIFICAÇÃO APÓS EXECUTAR SQL

No SQL Editor (onde quer que esteja), executar:

```sql
-- Verificar tabelas criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('field_metadata', 'image_specifications');

-- Verificar dados populados
SELECT COUNT(*) FROM field_metadata;
SELECT COUNT(*) FROM image_specifications;

-- Ver alguns dados
SELECT field_key, field_label, max_length 
FROM field_metadata 
WHERE page_slug = 'home' 
LIMIT 5;
```

**Esperado:**
- 2 tabelas listadas
- COUNT > 0 para ambas
- Lista de campos da Home

---

## 📋 CHECKLIST

- [ ] Vercel Dashboard aberto
- [ ] Projeto azimut-cms selecionado
- [ ] Neon encontrado (Storage/Databases)
- [ ] SQL Editor aberto
- [ ] Script SQL copiado
- [ ] SQL executado
- [ ] Verificação executada (tabelas criadas e dados populados)

---

## 🎯 PRÓXIMO PASSO

Após executar SQL com sucesso:

**PASSO 2:** Gerar Migration Prisma

```bash
cd azimut-cms
npx prisma migrate dev --name add_field_metadata_and_image_specs
npx prisma generate
```

---

**✅ TENTE PRIMEIRO VIA VERCEL → STORAGE/DATABASES → NEON**

Se não encontrar, use Neon direto: https://console.neon.tech
