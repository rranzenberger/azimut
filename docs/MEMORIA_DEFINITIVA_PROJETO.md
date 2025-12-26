# 🧠 MEMÓRIA DEFINITIVA DO PROJETO

## ✅ CONFIGURAÇÃO ATUAL (EM USO)

### **Banco de Dados:**
- **Tipo**: PostgreSQL Serverless (Neon.tech)
- **Provider**: Neon - https://neon.tech
- **Host**: `ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech`
- **Usuário**: `neondb_owner`
- **Database**: `neondb`
- **Porta**: `5432`
- **SSL**: Obrigatório (`sslmode=require`)
- **Região**: `sa-east-1` (São Paulo)
- **String**: `postgresql://neondb_owner:npg_W8VkhFvGTHj2@ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require`
- **Onde ver**: 
  - Vercel → azimut-backoffice → Settings → Environment Variables → `DATABASE_URL`
  - Painel Neon: https://console.neon.tech

### **Projetos no Vercel:**
- **Site Principal**: `azimut-site` (ou nome similar) - Root Directory = `/` (raiz)
- **Backoffice**: `azimut-backoffice` - Root Directory = `azimut-cms/`

### **Portas Locais:**
- **Site Principal**: `http://localhost:1753` (Vite)
- **Backoffice**: `http://localhost:3001` (Next.js)

### **Credenciais de Login (Site Principal):**
- **Usuário**: `azimut`
- **Senha**: `Azimut2025!Preview`

### **Credenciais de Login (Backoffice):**
- **Email**: `admin@azimut.com.br`
- **Senha**: `Azimut2025!`

---

## ❌ NÃO ESTÁ EM USO (IGNORAR)

### **Supabase:**
- ❌ **NÃO** está sendo usado para banco de dados
- ⚠️ **OPCIONAL**: Pode ser usado para storage de imagens (não implementado/obrigatório)
- ❌ `NEXT_PUBLIC_SUPABASE_URL` - NÃO é obrigatório
- ❌ `SUPABASE_SERVICE_ROLE_KEY` - NÃO é obrigatório

### **Outros Bancos:**
- ❌ Vercel Postgres - NÃO está em uso
- ❌ MySQL - NÃO está em uso
- ❌ SQLite - NÃO está em uso
- ❌ MongoDB - NÃO está em uso

### **Outros Provedores/Projetos:**
- ❌ Qualquer outro provedor de banco que foi testado e não funcionou

---

## 📋 VARIÁVEIS DE AMBIENTE OBRIGATÓRIAS

### **Vercel - azimut-backoffice:**

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
# NEXT_PUBLIC_SUPABASE_URL=...
# SUPABASE_SERVICE_ROLE_KEY=...

# IA (opcional)
# AI_PROVIDER=deepseek
# DEEPSEEK_API_KEY=...
```

---

## ⚠️ REGRAS IMPORTANTES

1. **NUNCA** sugerir Supabase como banco de dados
2. **SEMPRE** usar PostgreSQL gerenciado (DBAAS) atual
3. **NUNCA** remover ou alterar `DATABASE_URL` sem confirmar
4. **SEMPRE** verificar no Vercel antes de sugerir mudanças
5. **NUNCA** assumir que Supabase está configurado
6. **SEMPRE** lembrar que Supabase é apenas opcional para storage de imagens

---

## 📝 HISTÓRICO DE TENTATIVAS

### **Banco de Dados:**
- ✅ **Neon (PostgreSQL Serverless)** - EM USO (funcionando)
- ❌ **Supabase** - Tentado, não funcionou, NÃO está em uso
- ❌ **DBAAS (Locaweb/UOL/etc)** - Não está em uso

### **Outros:**
- ❌ Outros bancos/provedores - Não foram testados ou não funcionaram

---

## 🔍 ONDE VERIFICAR INFORMAÇÕES

### **Banco de Dados:**
- **Vercel**: azimut-backoffice → Settings → Environment Variables → `DATABASE_URL`
- **Código**: `azimut-cms/prisma/schema.prisma` (linha 5-7)

### **Projetos Vercel:**
- **Dashboard**: https://vercel.com/dashboard
- **Site Principal**: Projeto com Root Directory = `/`
- **Backoffice**: Projeto `azimut-backoffice` com Root Directory = `azimut-cms/`

---

## 📚 DOCUMENTOS DE REFERÊNCIA

- `CONFIGURACAO_DEFINITIVA_BANCO_DADOS.md` - Configuração completa do banco
- `REFERENCIA_RAPIDA_BANCO_DADOS.md` - Referência rápida
- `QUAL_BANCO_DADOS_USANDO.md` - Explicação detalhada
- `RESUMO_BANCO_DADOS.md` - Resumo executivo

---

**Última atualização**: 2025-01-XX  
**Status**: CONFIGURAÇÃO DEFINITIVA - NÃO ALTERAR SEM CONFIRMAÇÃO DO USUÁRIO

