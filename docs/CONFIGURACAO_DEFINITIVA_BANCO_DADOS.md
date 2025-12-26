# 🗄️ CONFIGURAÇÃO DEFINITIVA - BANCO DE DADOS

## ✅ BANCO DE DADOS EM USO

### **PostgreSQL Gerenciado (Neon.tech)**

**Tipo**: PostgreSQL (Serverless)  
**Provider**: Neon - Serverless Postgres (https://neon.tech)  
**Host**: `ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech`  
**Usuário**: `neondb_owner`  
**Database**: `neondb`  
**Porta**: `5432`  
**SSL**: Obrigatório (`sslmode=require`)  
**Região**: `sa-east-1` (South America - São Paulo)

**String de Conexão (DATABASE_URL)**:
```
postgresql://neondb_owner:npg_W8VkhFvGTHj2@ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
```

**Onde encontrar**: 
- **Vercel**: azimut-backoffice → Settings → Environment Variables → `DATABASE_URL`
- **Painel Neon**: https://console.neon.tech → Seu projeto → Settings → Connection Details

---

## ❌ NÃO ESTAMOS USANDO (IGNORAR)

### **Supabase**
- ❌ NÃO está sendo usado para banco de dados
- ❌ `NEXT_PUBLIC_SUPABASE_URL` - NÃO é obrigatório
- ❌ `SUPABASE_SERVICE_ROLE_KEY` - NÃO é obrigatório
- ⚠️ **Pode ser usado apenas para storage de imagens** (opcional, não implementado)

### **Vercel Postgres**
- ❌ NÃO está sendo usado

### **Outros bancos**
- ❌ MySQL - NÃO está sendo usado
- ❌ SQLite - NÃO está sendo usado
- ❌ MongoDB - NÃO está sendo usado

---

## 📋 VARIÁVEIS DE AMBIENTE OBRIGATÓRIAS

### **No Vercel (azimut-backoffice):**

```bash
# Banco de dados (OBRIGATÓRIO)
DATABASE_URL=postgresql://neondb_owner:npg_W8VkhFvGTHj2@ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require

# Autenticação (OBRIGATÓRIO)
JWT_SECRET=seu-jwt-secret-aqui
NEXTAUTH_SECRET=seu-nextauth-secret-aqui
NEXTAUTH_URL=https://azimut-backoffice.vercel.app

# Site (OBRIGATÓRIO)
SITE_URL=https://azmt.com.br

# Ambiente (OBRIGATÓRIO)
NODE_ENV=production
```

### **Variáveis OPCIONAIS (não obrigatórias):**

```bash
# Storage de imagens (opcional - não implementado)
# NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
# SUPABASE_SERVICE_ROLE_KEY=eyJh...

# IA (opcional)
# AI_PROVIDER=deepseek
# DEEPSEEK_API_KEY=sk-...
```

---

## 🔍 ONDE VERIFICAR

### **1. No Vercel:**
- Projeto: `azimut-backoffice`
- Settings → Environment Variables
- Procure: `DATABASE_URL`

### **2. No Painel do Provedor:**
- Acesse o painel onde o banco foi criado (Locaweb, UOL Host, etc.)
- Procure: "Bancos de Dados" ou "PostgreSQL"
- Banco: `azimt_20255`

### **3. No Código:**
- Arquivo: `azimut-cms/prisma/schema.prisma`
- Linha 5-7: `provider = "postgresql"`

---

## ⚠️ REGRAS IMPORTANTES

1. **NUNCA** sugerir Supabase como banco de dados
2. **SEMPRE** usar PostgreSQL gerenciado (DBAAS) atual
3. **NUNCA** remover ou alterar `DATABASE_URL` sem confirmar
4. **SEMPRE** verificar no Vercel antes de sugerir mudanças
5. **NUNCA** assumir que Supabase está configurado

---

## 📝 HISTÓRICO

- ✅ **PostgreSQL Gerenciado (DBAAS)** - EM USO
- ❌ Supabase - Tentado, não funcionou, NÃO está em uso
- ❌ Outros bancos - Não foram testados ou não funcionaram

---

**Última atualização**: 2025-01-XX  
**Status**: CONFIGURAÇÃO DEFINITIVA - NÃO ALTERAR SEM CONFIRMAÇÃO

